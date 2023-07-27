import { GameStates, PlayerColors } from "../types"
import { ColorSelector } from "./component/ColorSelector"
import { Grid } from "./component/Grid"
import { NameSelector } from "./component/NameSelector"
import { GameInfo } from "./component/GameInfo"
import { Victory} from "./component/VictoryScreen"
import { useGame } from "./hooks/useGame"
import { LobbyScreen } from "./screens/LobbyScreen"

function App() {
  const {state} = useGame()

  return (
    <div className='container'>
        {state === GameStates.LOBBY && <LobbyScreen/>}
    </div>
  )
}

export default App
