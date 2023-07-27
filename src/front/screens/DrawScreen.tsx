import { Draw } from "../component/Draw"
import { useGame } from "../hooks/useGame"


type DrawScreenProps = {}

export function DrawScreen ({}: DrawScreenProps){
    const {send} = useGame()
    const restart = () => send({type: 'playAgain'})
    return <div>
        <Draw onRestart={restart}/>
    </div>
}