import { createModel } from "xstate/lib/model";
import { GameContext, GameStates, Player, PlayerColors } from "../types";
import { GridState } from "../types";
import { canChooseColorGuard, canDropTokenGuard, canJoinGuard, canLeaveGuard, canStartGameGuard } from "./guards";
import { joinGameAction, leaveGameAction } from "./actions";
import { InterpreterFrom, interpret } from "xstate";



export const GameModel = createModel({
    players: [] as Player[],
    currentPlayer: null as null | Player['id'],
    tokenLine: 4,
    grid : [
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ] as GridState,
}, {
    events: {
        join: (playerId: Player["id"], name: Player["name"] ) => ({ playerId, name }),
        leave: (playerId: Player["id"]) => ({ playerId }),
        chooseColor: (playerId: Player["id"], color: PlayerColors) => ({ playerId, color }),
        start: (playerId: Player["id"]) => ({ playerId }),
        dropToken: (playerId: Player["id"], column: number) => ({ playerId, column }),
        playAgain: (playerId: Player["id"]) => ({ playerId }),
    }
})

export const GameMachine = GameModel.createMachine({

    id: 'game',
    context: GameModel.initialContext,
    initial: GameStates.LOBBY,
    states: {
        [GameStates.LOBBY]: {
            on: {
                join: {
                    cond: canJoinGuard,
                    actions: [GameModel.assign(joinGameAction)],
                    target: GameStates.LOBBY
                },
                leave : {
                    cond: canLeaveGuard,
                    actions: [GameModel.assign(leaveGameAction)],
                    target: GameStates.LOBBY
                },
                chooseColor: {
                    cond: canChooseColorGuard,
                    target: GameStates.LOBBY
                },
                start: {
                    cond: canStartGameGuard,
                    target: GameStates.GAME
                }
            }
        },

        [GameStates.GAME]: {
            on: {
                dropToken: { 
                    cond: canDropTokenGuard,
                    target: GameStates.LOBBY
                },
            }
        },

        [GameStates.WIN]: {
            on: {
                playAgain: {
                    target: GameStates.LOBBY
                }
            }
        },

        [GameStates.DRAW]: {
            on: {
                playAgain: {
                    target: GameStates.LOBBY
                }
            }
        },
    }
})

export function makeGame (state: GameStates = GameStates.LOBBY, context: Partial<GameContext> = {}): InterpreterFrom<typeof GameMachine> {
    return interpret(GameMachine.withContext({
        ...GameModel.initialContext,
        ...context
    }).withConfig({
        ...GameMachine.config,
        initial: state
} as any)
        ).start()

}

