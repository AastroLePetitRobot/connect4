import { createPortal } from 'react-dom';
import { GameGuard, PlayerColors } from '../types';
import { freePositionY } from '../func/game';

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
export const canStartGameGuard: GameGuard<"start"> = (context, event) => {
  return context.players.filter(p => p.color).length === 2
}

export const canDropTokenGuard: GameGuard<"dropToken"> = (context, event) => {
  return event.column < context.grid[0].length &&
  event.column >= 0 &&
  context.currentPlayer === event.playerId &&
  freePositionY(context.grid, event.column) >= 0 
}

