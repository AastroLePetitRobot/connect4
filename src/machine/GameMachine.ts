import { createMachine } from "xstate";
import { createModel } from "xstate/lib/model";
import { Player } from "../types";
import { GridState } from "../types";

enum GameStates  {
    LOBBY = 'LOBBY',
    GAME = 'GAME', 
    WIN = 'WIN', 
    DRAW = 'DRAW',
}

export const GameModel = createModel({
    players: [] as Player[],
    currentPlayer: null as null | Player['id'],
    grid : [
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ] as GridState,
})

export const GameMachine = createMachine({

    id: 'game',
    initial: GameStates.LOBBY,
    states: {
        [GameStates.LOBBY]: {
            on: {
                join: {
                    target: GameStates.LOBBY
                },
                leave : {
                    target: GameStates.LOBBY
                },
                chooseColor: {
                    target: GameStates.LOBBY
                },
                start: {
                    target: GameStates.GAME
                }
            }
        },

        [GameStates.GAME]: {
            on: {
                dropToken: { 
                    target: '???'
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