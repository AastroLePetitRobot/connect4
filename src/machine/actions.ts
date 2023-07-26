import { currentPlayer, freePositionY, winingTokenPosition } from "../func/game"
import { GameAction, GameContext } from "../types"

export const joinGameAction : GameAction<"join"> = (context, event) => ({
    players: [...context.players, { id: event.playerId, name: event.name }]
    })

export const leaveGameAction: GameAction<"leave"> = (context, event) => ({
    players: context.players.filter(p => p.id !== event.playerId)
})

export const dropTokenAction: GameAction<"dropToken"> = (context, event) => {
    const PlayerColor = context.players.find(p => event.playerId === p.id)!.color!
    const eventY = freePositionY(context.grid, event.column)
    const newGrid = context.grid.map((row, y) => row.map((initialValue , x) => x === event.column && y === eventY ? PlayerColor: initialValue))
    return {
        grid: newGrid
    }
}

export const switchPlayerAction = (context: GameContext) => ({
  currentPlayer: context.players.find(p => p.id !== context.currentPlayer)!.id  
})

export const saveWinningPositionAction: GameAction<"dropToken"> = (context,event) => ({
    winingPosition : winingTokenPosition(context.grid, currentPlayer(context).color!, event.column, context.tokenLine)
  })
