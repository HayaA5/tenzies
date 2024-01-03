import { useState, useEffect } from "react";
export default function Time({ running }) {
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            running && setDuration((prevDur) => prevDur + 1);
        }, 1000);
        if (running) {
            setDuration(0)
        } else {
            const prevDur = JSON.parse(localStorage.getItem("duration"));
            if (prevDur === null || Number(prevDur) > duration) {
                localStorage.setItem("duration", duration);
            }
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [running]);

    function displayDuration() {
        const sec = duration % 60;
        const min = Math.floor(duration / 60);
        const hours = Math.floor(duration / 3600);
        return (`  ${hours.toString().padStart(2, '0')} :   ${min.toString().padStart(2, '0')}:  ${sec.toString().padStart(2, '0')}`)
    }

    return (
        <div className="timer-container">
            <div className="timer">
                {displayDuration()}
                duration: {duration}
            </div>
        </div>
    )
}