import './index.css'
import {interpret} from 'xstate'
import {GameModel, GameMachine} from './machine/GameMachine'


/*ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)*/

const machine = interpret(GameMachine).start()
console.log(machine.send(GameModel.events.join('player1', 'player2')).changed)
console.log(machine.send(GameModel.events.join('player1', 'player2')).changed)
