import { ContextFrom, EventFrom } from "xstate";
import { GameModel } from "./machine/GameMachine";

export enum PlayerColors {
    RED = 'RED',
    YELLOW = 'YELLOW',
}

export type Player = {
    id: string;
    name: string;
    color?: PlayerColors;
}

export type CellEmpty = 'EMPTY'
export type CellState = PlayerColors.RED | PlayerColors.YELLOW | CellEmpty
export type GridState = CellState[][]
export type GameContext = ContextFrom<typeof GameModel>
export type GameEvents = EventFrom<typeof GameModel>
export type GameEvent<T extends GameEvents["type"]> = GameEvents & { type: T }
export type GameGuard<T extends GameEvents["type"]> = (
    context: GameContext,
    event: GameEvent<T>
  ) => boolean
