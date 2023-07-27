import { PlayerColors } from "../../types"
import { ColorSelector } from "../component/ColorSelector"
import { NameSelector } from "../component/NameSelector"
import { useGame } from "../hooks/useGame"

type LobbyScreenProps = {}

export function LobbyScreen ({}: LobbyScreenProps)
{   
    const{send, context,can} = useGame()
    const colors = [PlayerColors.YELLOW, PlayerColors.RED]

    const joinGame = (name:string) => send ({type: 'join', name: name, playerId: name})
    const chooseColor = (color: PlayerColors) => send({type: 'chooseColor', color, playerId: color === PlayerColors.YELLOW ? "John": "Mabite"})
    const startGame = () => send ({type:'start'})
    const canStart = can({type:'start'})

    return <div>
        
        <NameSelector onSelect={joinGame}/>

        <ColorSelector onSelect={chooseColor} players={context.players} colors={colors}/>
        <br />
        <button disabled={!canStart} className="button" onClick={startGame}>Start</button>
        <br />
    </div>
}

