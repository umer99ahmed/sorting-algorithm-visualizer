import React, { useContext } from "react"
import { Link } from 'react-router-dom'

function Header() {

    return (
        <header>
            <Link to="/"><h2>Sorting Algorithms</h2></Link>
        </header >
    )
}

export default Header