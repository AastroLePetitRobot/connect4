import { PlayerColors } from "../types"
import { ColorSelector } from "./screen/ColorSelector"
import { Grid } from "./screen/Grid"
import { NameSelector } from "./screen/NameSelector"

function App() {
  
  return (
    <div className='container'>
      <Grid grid = {[
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.YELLOW],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.YELLOW],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.YELLOW, PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY',PlayerColors.YELLOW, PlayerColors.YELLOW],
                ]
            }/>
      <NameSelector disabled onSelect={() => null}/>
      <ColorSelector onSelect={() => null} players={[
        {id: '1', name: 'Joueur 1', color: PlayerColors.RED},
        {id: '2', name: 'Joueur 2', color: PlayerColors.YELLOW},
      ]} colors={[PlayerColors.RED,PlayerColors.YELLOW]}/>
    </div>
  )
}

export default App
