import { PlayerColors } from "../types"
import { ColorSelector } from "./screen/ColorSelector"
import { NameSelector } from "./screen/NameSelector"

function App() {
  
  return (
    <div className='container'>
      <NameSelector disabled onSelect={() => null}/>
      <ColorSelector onSelect={() => null} players={[
        {id: '1', name: 'Joueur 1', color: PlayerColors.RED},
        {id: '2', name: 'Joueur 2', color: PlayerColors.YELLOW},
      ]} colors={[PlayerColors.RED,PlayerColors.YELLOW]}/>
    </div>
  )
}

export default App
