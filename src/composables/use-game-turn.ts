import { reactive } from "vue"

export type BoardTile = 'x' | 'o' | 'off'
export type Board = BoardTile[][]
export type Round = {
    turn: 'x' | 'o',
    board: Board,
    winningPlay: Record<number, boolean>,
}

export default () => {
    const round: Round = reactive<Round>({
        turn: 'x',
        board: [
            ['off', 'off', 'off',],
            ['off', 'off', 'off',],
            ['off', 'off', 'off',],
        ] as Board,
        winningPlay: {}
    })

    const resetRound = () => {
        // .board
        for (let i = 0; i < round.board.length; i++) {
            for (let o = 0; o < round.board[i].length; o++) {
                round.board[i][o] = 'off'
            }
        }
        round.winningPlay = {}
    }

    const setTile = (y: number, x: number, to: 'x' | 'o') => {
        round.board[y][x] = to
        let result = checkWin(y, x, to)
        if (result !== 'off') return result

        // go to next turn
        if (round.turn === 'x') round.turn = 'o'
        else round.turn = 'x'
        return result
    }

    const checkWin = (y: number, x: number, player: 'x' | 'o'): 'off' | 'x' | 'o' | 'tie' => {

        const score = {
            diagScore: 1,
            diagScore2: 1,
            rowScore: 1,
            colScore: 1,
        }
        let winningPlay: Record<number, boolean> = {}

        type DfsTuple = [number, number, keyof typeof score]

        const dfs = (y: number, x: number, _: keyof typeof score) => {
            if (y < 0 || y > 2) return false
            if (x < 0 || x > 2) return false

            if (round.board[y][x] === player) return true
            return false
        }

        const stack: Array<DfsTuple> = []
        // add tuples
        // row
        stack.push(
            [y, x - 1, 'rowScore'], [y, x - 2, 'rowScore'],
            [y, x + 1, 'rowScore'], [y, x + 2, 'rowScore'],
        )
        stack.push(
            [y - 2, x, 'colScore'], [y - 1, x, 'colScore'],
            [y + 1, x, 'colScore'], [y + 2, x, 'colScore'],
        )
        stack.push(
            [y - 2, x - 2, 'diagScore'], [y - 1, x - 1, 'diagScore'],
            [y + 1, x + 1, 'diagScore'], [y + 2, x + 2, 'diagScore'],
        )
        stack.push(
            [y - 2, x + 2, 'diagScore2'], [y - 1, x + 1, 'diagScore2'],
            [y + 1, x - 1, 'diagScore2'], [y + 2, x - 2, 'diagScore2'],
        )

        let solved = false
        let last = ''
        while (stack.length > 0 && !solved) {
            let item = stack.pop()
            if (!item) break
            if (last !== item[2]) { // reset winning play arr
                winningPlay = {
                    [y * 3 + x]: true,
                }
                last = item[2]
            }
            let res = dfs(...item)
            if (res) {
                score[item[2]]++
                winningPlay[
                    item[0] * 3 + item[1]
                ] = true
                if (score[item[2]] >= 3) {
                    round.winningPlay = winningPlay
                    return player
                }
            }
        }

        // tie
        let cnt = 0
        winningPlay = []
        for (let i = 0; i < 3; i++) {
            for (let o = 0; o < 3; o++) {
                if (round.board[i][o] !== 'off') cnt++
            }
        }
        if (cnt >= 9) return 'tie'
        return 'off'
    }

    const aiPickTile = () => {
        // start with center
        let pick = 4
        if (round.board[Math.floor(pick / 3)][pick % 3] === 'off') return pick
        // pick a random one for now
        let r = Math.floor(Math.random() * 9)
        return r
    }

    return {
        resetRound,
        round,
        setTile,
        aiPickTile,
        checkWin,
    }
}