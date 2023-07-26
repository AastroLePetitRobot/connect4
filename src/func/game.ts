import { GridState } from "../types";

/* function qui prend en paramétre l'état de la grille et la colomn pour regarder sur quel ligne on va placer le pion */
export function freePositionY (grid: GridState, x: number): number {
    for (let y = grid.length -1; y>=0; y--) {
        if (grid[y][x] === 'EMPTY') {
            return y
        }
    }
    return -1
}