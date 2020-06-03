import React, { useContext } from "react"
import useHover from "../hooks/useHover"
import { Context } from "../Context"
import './styles/control.css'

function Control() {

    const { start, setStart, startSort, stopSort, arraySize, setArraySize, sortSpeed, setSortSpeed } = useContext(Context)
    const [playHover, playRef] = useHover()
    const [resetHover, resetRef] = useHover()
    const playIcon = playHover || start ? "ri-play-fill" : "ri-play-line"
    const resetIcon = resetHover ? "ri-refresh-fill" : "ri-refresh-line"

    function handleSizeChange(event) {
        setArraySize(event.target.value)
    }
    function handleSpeedChange(event) {
        const speed = 500 - event.target.value
        setSortSpeed(speed)
    }

    return (
        <div className="ctrl-box">
            <div className="media-left">
                <i ref={playRef} className={playIcon} onClick={startSort}></i>
                <i ref={resetRef} className={resetIcon} onClick={stopSort}></i>
            </div>
            <div className="size-media">
                <h1>n = {arraySize} |</h1>
                <input disabled={start} onChange={handleSizeChange} type="range" min="2" max="200" value={`${arraySize}`} className="slider"></input>
            </div>
            <div className="speed-media">
                <i className="ri-speed-line"></i>
                <h1> |</h1>
                <input disabled={start} onChange={handleSpeedChange} type="range" min="0" max="500" value={`${500 - sortSpeed}`} className="slider"></input>
            </div>

        </div >
    )
}

export default Control 