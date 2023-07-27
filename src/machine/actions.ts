import { currentPlayer, freePositionY, winingTokenPosition } from "../func/game"
import { GameAction, GameContext, PlayerColors } from "../types"
import { GameModel } from "./GameMachine"

export const joinGameAction : GameAction<"join"> = (context, event) => ({
    players: [...context.players, { id: event.playerId, name: event.name }]
    })

export const leaveGameAction: GameAction<"leave"> = (context, event) => ({
    players: context.players.filter(p => p.id !== event.playerId)
})

export const chooseColorAction: GameAction<"chooseColor"> = (context, event) => ({
    players: context.players.map(p => {
      if (p.id === event.playerId) {
        return {...p, color: event.color}
      }
      return p
    })
})

export const dropTokenAction: GameAction<"dropToken"> = ({grid, players}, {column: eventX, playerId}) => {
  const playerColor = players.find(p => playerId === p.id)!.color!
  const eventY = freePositionY(grid, eventX)
  const newGrid = grid.map((row, y) => row.map((v, x) => x === eventX && y === eventY ? playerColor : v))
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

export const setFirstPlayerAction = (context: GameContext) => ({
    currentPlayer: context.players.find(p => p.color === PlayerColors.YELLOW)!.id
})

export const restartGameAction: GameAction<"playAgain"> = () => ({
    winingPosition: [],
    grid : GameModel.initialContext.grid,
    currentPlayer: null
})