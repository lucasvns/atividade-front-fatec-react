import React from 'react'
//import { Row, Container, Col} from 'react-bootstrap';
import Menu from '../../components/menu';
import "./index.css"

const Home = () => {
    return (
        <div>
            <Menu />
            <div className="container">
                <h1>Home Carteira de Vacinação</h1>    
            </div>
        </div>
    )
}
export default Home
