import { GameGuard, PlayerColors } from '../types';
import { countEmptyCells, currentPlayer, freePositionY, winingTokenPosition } from '../func/game';

export const canJoinGuard: GameGuard<"join"> = (context, event) => {
    return context.players.length < 2 && (context.players.find(p => p.id === event.playerId) === undefined)
  }

export const canLeaveGuard: GameGuard<"leave"> = (context, event) =>{
  return (context.players.find(p => p.id === event.playerId) !== undefined)
}

export const canChooseColorGuard: GameGuard<"chooseColor"> = (context, event) =>{
  return [PlayerColors.RED,PlayerColors.YELLOW].includes(event.color) && 
  context.players.find(p => p.id === event.playerId) !== undefined &&
  context.players.find(p => p.color === event.color) === undefined
}

/* ici on regarde si les deux joueurs on choisis leur couleur avant de lancer la game */ 
export const canStartGameGuard: GameGuard<"start"> = (context) => {
  return context.players.filter(p => p.color).length === 2
}

export const canDropTokenGuard: GameGuard<"dropToken"> = (context, event) => {
  return event.column < context.grid[0].length &&
  event.column >= 0 &&
  context.currentPlayer === event.playerId &&
  freePositionY(context.grid, event.column) >= 0 
}


export const isWiningMoveGuard: GameGuard<"dropToken"> = (context, event) => {
  return canDropTokenGuard(context,event) && winingTokenPosition(context.grid, currentPlayer(context).color!, event.column, context.tokenLine).length > 0
}

export const isDrawMoveGuard: GameGuard<"dropToken"> = (context, event) => {
  return canDropTokenGuard(context,event) && countEmptyCells(context.grid) <= 1
}