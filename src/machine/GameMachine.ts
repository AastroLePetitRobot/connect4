import { createModel } from "xstate/lib/model";
import { GameContext, GameStates, Player, PlayerColors, Position } from "../types";
import { GridState } from "../types";
import { canChooseColorGuard, canDropTokenGuard, canJoinGuard, canLeaveGuard, canStartGameGuard, isDrawMoveGuard, isWiningMoveGuard } from "./guards";
import { chooseColorAction, dropTokenAction, joinGameAction, leaveGameAction, restartGameAction, saveWinningPositionAction, setFirstPlayerAction, switchPlayerAction } from "./actions";
import { InterpreterFrom, interpret } from "xstate";



export const GameModel = createModel({
    players: [] as Player[],
    currentPlayer: null as null | Player['id'],
    tokenLine: 4,
    winingPosition: [] as Position[],
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
                    target: GameStates.LOBBY,
                    actions: [GameModel.assign(chooseColorAction)]
                },
                start: {
                    cond: canStartGameGuard,
                    target: GameStates.GAME,
                    actions: [GameModel.assign(setFirstPlayerAction)]
                }
            }
        },

        [GameStates.GAME]: {
            on: {
                dropToken: [
                    {
                        cond: isDrawMoveGuard,
                        target: GameStates.DRAW,
                        actions: [GameModel.assign(dropTokenAction)]
                    },
                    {
                        cond: isWiningMoveGuard,
                        target: GameStates.WIN,
                        actions: [GameModel.assign(saveWinningPositionAction)]
                    },
                    { 
                    cond: canDropTokenGuard,
                    actions: [GameModel.assign(dropTokenAction), GameModel.assign(switchPlayerAction)],
                    target: GameStates.GAME
                }],
            }
        },

        [GameStates.WIN]: {
            on: {
                playAgain: {
                    target: GameStates.LOBBY,
                    actions: [GameModel.assign(restartGameAction)]
                }
            }
        },

        [GameStates.DRAW]: {
            on: {
                playAgain: {
                    target: GameStates.LOBBY,
                    actions: [GameModel.assign(restartGameAction)]
                }
            }
        },
    }
})

export function makeGame (state: GameStates = GameStates.LOBBY, context: Partial<GameContext> = {}): InterpreterFrom<typeof GameMachine> {
    const machine = interpret(GameMachine.withContext({
        ...GameModel.initialContext,
        ...context
    })).start()

    machine.getSnapshot().value = state     
    return machine  

}

