import { GameContext, GameEvents, GameStates } from "../../types"

type GameContextType = {
    state: GameStates,
    context: GameContext,
    send: (event: GameEvents) => void,
    can: (event:GameEvents) => boolean
}


export function useGame () {

}