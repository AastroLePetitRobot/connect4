import { prevent } from "../../func/dom";

type DrawProps = {
    onRestart?: () => void
}

export function Draw ({onRestart}: DrawProps) {
    return <div className="flex" style={{justifyContent: 'space-between'}}>
    <h2 >Egalité</h2>
    <button className="button" onClick={prevent(onRestart)}>Rejouer</button>
</div>
}