import { discColorClass } from "../../func/color"
import { PlayerColors } from "../../types"

type GameInfoProps = {
    color: PlayerColors;
    name: string
}

export function GameInfo ({color,name}: GameInfoProps){
    return <div>
        <h2 className="flex" style={{ gap: '.5rem' }}>Au tour de {name} <div className={discColorClass(color)}></div> de jouer </h2>
    </div>
}