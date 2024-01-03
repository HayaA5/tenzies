import { useState, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Time from "./Time"

export default function Board() {
    const [running, setRunning] = useState(false);
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [clickCounter, setClickCounter] = useState(0)

    const prevNbClicks = Number(JSON.parse(localStorage.getItem("click")))

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true);
            setRunning(false);
            if (prevNbClicks === null || prevNbClicks > clickCounter) {
                localStorage.setItem("click", clickCounter)
            }
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
            setClickCounter(oldCounter => oldCounter + 1)
        } else {//starts a new game (not the first game)
            setRunning(true)
            setTenzies(false)
            setDice(allNewDice())
            setClickCounter(0)
        }
    }

    function holdDice(id) {
        (!running) && setRunning(prevRunning => !prevRunning)
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }));
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            <Time running={running} />
            {tenzies &&
                <div>
                    number of tries to win: {clickCounter}
                    <Confetti />
                </div>
            }
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}