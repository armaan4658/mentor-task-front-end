import {Link} from "react-router-dom"
export const Header = () => {
    const linkStyle = {
        textDecoration:'none',
        color:'black'
    }
    return(
        <h1><Link style={linkStyle} to="/">Mentor Student Task</Link></h1>
    )
}