import { discColorClass } from "../../func/color";
import { prevent } from "../../func/dom";
import { PlayerColors } from "../../types";

type VictoryProps = {
    color: PlayerColors;
    name: string
    onRestart?: () => void
}

export function Victory ({color, name, onRestart}: VictoryProps) {
    return <div className="flex" style={{justifyContent: 'space-between'}}>
    <h2 className="flex" style={{ gap: '.5rem' }}>Le gagnant est {name} <div className={discColorClass(color)}></div> </h2>
    <button className="button" onClick={prevent(onRestart)}>Rejouer</button>
</div>
}