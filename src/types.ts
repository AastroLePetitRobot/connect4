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
