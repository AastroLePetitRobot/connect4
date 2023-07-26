import { GameContext, GridState, Player, PlayerColors } from "../types";

/* function qui prend en paramétre l'état de la grille et la colomn pour regarder sur quel ligne on va placer le pion */
export function freePositionY (grid: GridState, x: number): number {
    for (let y = grid.length -1; y>=0; y--) {
        if (grid[y][x] === 'EMPTY') {
            return y
        }
    }
    return -1
}

/* Function qui va vérifier si le joueur gagne en placant son pion, on va prendre l'index du pion placé à l'instant T de la partie et regarder toute les cases autours si une ligne de N pions de la même couleur existe*/

export function winingTokenPosition (grid: GridState, color: PlayerColors, x: number, n: number) {
    const directions = [
        [1,0],
        [0,1],
        [1,1],
        [1,-1],
    ]

    const position = {
        y: freePositionY(grid, x),
        x: x
    }

    for (let direction of directions) {
        let items = [position]
        for (let forward of [1,-1]) {
            for (let i = 1; i <n; i++) {
                const x = position.x + (i * direction[0] * forward)
                const y = position.y + (i * direction[1] * forward)
                if(grid?.[y]?.[x] !== color) {
                    break;
                }
                items.push({x,y})
            }
        }
        if(items.length >= n){
            console.log(items)
            return items;
        }
    }
    return []
}

export function currentPlayer(context: GameContext): Player {
    const player = context.players.find(p => p.id === context.currentPlayer)
    if (player === undefined){
        throw new Error('Pas de joueur courant')
    }
    return player
}