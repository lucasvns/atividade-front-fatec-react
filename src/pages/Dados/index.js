import React, { useState} from 'react'
//import { Row, Container, Col, Form, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import Menu from '../../components/menu';
import Alert from '../../components/alert'
import api from '../../utils/api';
import "./index.css"
 
const Dados = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const [alertDiv, setAlertDiv] = useState([])

    const handleUpdateSenha = async (e) => {
        e.preventDefault()
        console.log(e.target.senha.value)
        let data = {
            senha: e.target.senha.value
        }
        await api.put("/usuario/update/senha", data).then((res) => {
            setAlertDiv([<Alert tema="success" conteudo="Senha atualizada com sucesso." />])
        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            })
        })

    }

    const handleUpdateEmail = async (e) => {
        e.preventDefault()
        let data = {
            mail: e.target.mail.value
        }
        await api.put("/usuario/update/email", data).then((res) => {
            setAlertDiv([<Alert tema="success" conteudo="Email atualizado com sucesso." />])
            
        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            })
        })

    }
    
    return (

        <div>
            <Menu />
            <div className="container" id="update-dados" >
                    <form id="form-update-email" onSubmit={handleUpdateEmail}>
                        <label htmlFor="mail">Email:</label>
                        <input required name="mail" type="email" placeholder="email@email.com" aria-label="Email" aria-describedby="" />
                        <button className="primary" type="submit" id="btn-update-email">Atualizar</button>
                    </form>
                    <br />
                    <hr />
                    <form id="form-update-senha" onSubmit={handleUpdateSenha}>
                        <label htmlFor="senha">Senha:</label>
                        <input name="senha" required type="password" aria-label="Senha" aria-describedby="" />
                        <button className="primary" type="submit" id="btn-update-senha">Atualizar</button>
                    </form>
                {alertDiv.map(a => a)}

            </div>
        </div>
    )
}

export default Dados
