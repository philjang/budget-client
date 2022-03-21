import { Link } from 'react-router-dom'

export default function Home () {
    return (
        <>
            <h1>Welcome to Your Budget</h1>
            <Link to='/categories'>Budget</Link>
            <Link to='/new'>Add New</Link>
        </>
    )
}