
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div
            className={`die-face face-${props.value}`}
            style={styles}
            onClick={props.holdDice}
        >
            {(props.value >= 4)
                ? <>
                    <div class="column">
                        {Array(Math.floor(props.value / 2)).fill(<span class="dot"> </span>)}
                    </div>
                    {props.value === 5 && <div className="column"><span class="dot"> </span></div>}
                    <div class="column">
                        {Array(Math.floor(props.value / 2)).fill(<span class="dot"> </span>)}
                    </div>
                </>
                : Array(props.value).fill(<span class="dot"> </span>)
            }
        </div>
    )
}