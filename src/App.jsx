import { useState } from "react"
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constans";

function App() {
  // Creamos un array con 9 elementos
  // con fill() damos a cada elemento el valor null(UNDEFAULT)
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  //Creamos un estado para iniciar el turno en X
  const [turn, setTurn] = useState(TURNS.X)
  // Creamos un estado para el ganador 
  // null => No hay ganador
  // false => Empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // Revisamos las combinaciones ganadoras
    // para verificar si X o O ganó
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

  }

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay mas espacios vacios
    // en el tablero
    return newBoard.every((square) => square !== null)
  }


  const updateBoard = (index) => {
    // no actualizacion la posición
    // Si ya tiene algo 
    if(board[index] || winner) return

    // Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn    
    setBoard(newBoard)

    // Cambiamos el turno de jugador
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti({
        particleCount: 350,
        spread: 180
      });
    setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) //Empate
    }
  }

  return (
    <main className="board">    
      <h1>TRES EN RAYA</h1>
      <button className="btnReset" onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {
          board.map((_ ,index) =>{
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Ganó'
                }
              </h2>

              <header className="win">                
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>

          </section>
        )
      }
    </main>
  )
}

export default App
