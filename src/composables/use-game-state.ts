import { reactive } from "vue"
import useGameTurn from "./use-game-turn"

export type GameConfig = {
    mode: 'cpu' | 'player' | 'off',
    playerRole: 'x' | 'o',
}

export type Score = {
    x: number,
    o: number,
    ties: number,
    lastWin: 'x' | 'o' | 'tie' | 'off'
}

export default (() => {
    const DEFAULT_CONFIG: GameConfig = {
        mode: 'off',
        playerRole: 'o',
    }
    const config = reactive<GameConfig>({ ...DEFAULT_CONFIG })

    const DEFAULT_SCORE: Score = {
        o: 0,
        ties: 0,
        x: 0,
        lastWin: 'off',
    }
    const score = reactive<Score>({ ...DEFAULT_SCORE })

    const incrementScore = (to: 'x' | 'o') => {
        score[to]++
        score.lastWin = to
    }

    const quit = () => {
        resetRound()
        resetScore()
        resetConfig()
        /* resetRound() */
    }

    const nextRound = () => {
        score.lastWin = 'off'
        resetRound()
    }

    // restore
    const resetConfig = () => {
        config.mode = DEFAULT_CONFIG.mode
        config.playerRole = DEFAULT_CONFIG.playerRole
    }

    const resetScore = () => {
        score.lastWin = DEFAULT_SCORE.lastWin
        score.o = DEFAULT_SCORE.o
        score.ties = DEFAULT_SCORE.ties
        score.x = DEFAULT_SCORE.x
    }

    // other composables
    const {
        resetRound: ugtResetRound,
        round,
        setTile,
        aiPickTile,
        checkWin,
    } = useGameTurn()

    const resetRound = () => {
        ugtResetRound()
        if (config.playerRole === 'o' && config.mode === 'cpu') {
            // have the cpu play their first move if necessary
            aiSetTile()
            round.turn = 'o'
        }
    }

    const aiSetTile = () => {
        let ok = false
        let picked = aiPickTile()
        if (round.board[Math.floor(picked / 3)][picked % 3] === 'off') ok = true

        while (!ok) {
            picked = aiPickTile()
            if (round.board[Math.floor(picked / 3)][picked % 3] === 'off') ok = true
        }
        let cpuRole: 'x' | 'o' = config.playerRole === 'x' ? 'o' : 'x'
        round.board[Math.floor(picked / 3)][picked % 3] = cpuRole
        let result = checkWin(
            Math.floor(picked / 3),
            picked % 3,
            cpuRole,
        )
        round.turn = round.turn === 'x' ? 'o' : 'x'
        return result
    }

    return {
        config,
        score,
        incrementScore,
        quit,
        nextRound,
        resetConfig,
        resetScore,
        // useGameTurn
        resetRound,
        round,
        setTile,
        aiSetTile,
        checkWin,
    }
})()