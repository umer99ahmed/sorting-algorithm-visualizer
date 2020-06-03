import React from "react"
import Algorithms from "../components/Algorithm"
import Display from "../components/Display"
import Control from "../components/Control"
function Home() {

    const styles = {
        backgroundColor: "tomato",
        color: "white"
    }

    return (
        <div className="algo-container">


            <Algorithms name="bubble" />
            <Algorithms name="selection" />
            <Algorithms name="insertion" />
            <Algorithms name="heap" />
            <Algorithms name="merge" />
            <Algorithms name="quick" />
            <Display />
            <Control />

        </div >
    )
}

export default Home