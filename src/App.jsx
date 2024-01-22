import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children, updateBoard, index}) =>{
  return (
    <div className="square">
      {children}
    </div>
  )
}

function App() {
  // Creamos un array con 9 elementos
  // con fill() damos a cada elemento el valor null(UNDEFAULT)
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  //Creamos un estado para saber de quien es el turno
  const [turn, setTurn] = useState(TURNS.X)

  return (
    <main className="board">
      <h1>TRES EN RAYA</h1>
      <section className="game">
        {
          board.map((index) =>{
            return(
              <Square
                key={index}
                index={index}
              >

              </Square>
            )
          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X }>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O }>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

export default App
