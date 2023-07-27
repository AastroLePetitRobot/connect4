import { GameStates } from "../types"
import { Grid } from "./component/Grid"
import { useGame } from "./hooks/useGame"
import { LobbyScreen } from "./screens/LobbyScreen"
import { PlayScreen } from "./screens/PlayScreen"
import { currentPlayer } from "../func/game"
import { VictoryScreen } from "./screens/VictoryScreen"
import { DrawScreen } from "./screens/DrawScreen"

function App() {
  const {state, context,send } = useGame()
  const canDrop = state === GameStates.GAME
  const player = canDrop ? currentPlayer(context) : undefined
  const dropToken = canDrop ? (x:number) => {
    send({type: 'dropToken', column: x })
  } : undefined

  return (
    <div className='container'>
        {state === GameStates.LOBBY && <LobbyScreen/>}
        {state === GameStates.GAME && <PlayScreen/>}
        {state === GameStates.WIN && <VictoryScreen/>}
        {state === GameStates.DRAW && <DrawScreen/>}
        <Grid grid = {context.grid} onDrop={dropToken} color={player?.color}/>
    </div>
  )
}

export default App
