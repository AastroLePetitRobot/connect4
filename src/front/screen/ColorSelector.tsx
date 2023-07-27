import { Player, PlayerColors } from "../../types"

type ColorSelectorProps = {
    onSelect: (color: PlayerColors) => void,
    players: Player[]
    colors: PlayerColors[]
}

function discColor (color: PlayerColors) {
    return "disc disc-" + color
}

export function ColorSelector({ onSelect, players, colors }: ColorSelectorProps) {
    return <> 
    <div className="players"> 
        {players.map(player => <div key={player.id} className="player">
            {player.name}
            {player.color}
            {player.color && <div className={discColor(player.color)}/>}
        </div>)}
    </div>
    <h3>Vous selectionnez une couleur</h3>
    <div className="selector">
        {colors.map(color => <button className={discColor(color)} key={color} onClick={() => onSelect(color)}></button>)}
    </div> 
</>
    
}
