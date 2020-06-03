import React, { useContext, useState } from "react"
import { Context } from "../Context"
import useHover from "../hooks/useHover"

function Algorithm(props) {

    const { start, sortType, setSortType, randomizeArray } = useContext(Context)
    const value = useContext(Context)
    const selectedId = sortType === props.name ? "selected" : ""

    function handleClick() {
        setSortType(props.name)
        randomizeArray()
    }
    return (
        <div className="algo-box">
            <button disabled={start} id={selectedId} onClick={handleClick}>{`${props.name} sort`}</button>
        </div>
    )
}

export default Algorithm