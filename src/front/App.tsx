import { PlayerColors } from "../types"
import { ColorSelector } from "./component/ColorSelector"
import { Grid } from "./component/Grid"
import { NameSelector } from "./component/NameSelector"
import { GameInfo } from "./component/GameInfo"
import { Victory} from "./component/VictoryScreen"

function App() {
  
  return (
    <div className='container'>
      <NameSelector  onSelect={() => null}/>
      <ColorSelector onSelect={() => null} players={[
        {id: '1', name: 'Joueur 1', color: PlayerColors.RED},
        {id: '2', name: 'Joueur 2', color: PlayerColors.YELLOW},
      ]} colors={[PlayerColors.RED,PlayerColors.YELLOW]}/>
      <GameInfo color= {PlayerColors.RED} name="player1" />
      <Victory color= {PlayerColors.RED} name="player1" onRestart={()=>null}/>
      <Grid

      color = {PlayerColors.YELLOW}
      onDrop ={() => null}
      grid = {[
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.YELLOW],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.YELLOW],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.YELLOW, PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY',PlayerColors.YELLOW, PlayerColors.YELLOW],
                ]
            }/>
    </div>
  )
}

export default App
