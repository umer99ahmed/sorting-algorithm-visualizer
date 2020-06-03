import React, { useContext } from "react"
import './styles/display.css';
import { Context } from '../Context'

function Display() {

    const { array } = useContext(Context)
    // console.log(array)

    const bar = array.map((element, index) => {
        let barColor
        if (element.isSwitch) {
            barColor = "red"
        } else if (element.isCompared) {
            barColor = "blue"
        }
        else if (element.isSorted) {
            barColor = "green"
        }
        else {
            barColor = "white"
        }

        // element.isCompared ? "blue" : "white"
        return (
            <div
                key={index}
                className="bar"
                style={{
                    height: `${element.value}%`,
                    backgroundColor: barColor
                }}>
            </div>)
    })

    return (
        <div className="display-box">
            {bar}
        </div >
    )
}

export default Display 