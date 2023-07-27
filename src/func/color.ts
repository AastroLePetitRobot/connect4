import { CellState } from "../types";

export function discColorClass (color: CellState) {
    if (color ==='EMPTY'){
        return 'disc'
    }

    return "disc disc-" + color
}