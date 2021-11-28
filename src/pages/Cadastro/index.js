import React, { useState} from 'react'
import { useHistory } from "react-router-dom";
//import { Button, Form, Container } from 'react-bootstrap';
import Alert from '../../components/alert'
import api from '../../utils/api';
import "./index.css"

const Cadastro = () => {
    const history = useHistory();
    const redirectLogin = () => history.push("/")
    const [usuario, setUsuario] = useState({ mail: "", senha: "", perfil: "" })
    const [alertDiv, setAlertDiv] = useState([])

    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleCadastro = (e) => {
        e.preventDefault()
        let data = { ...usuario }
        data.perfil = "user"
        api.post("/usuario/create", data).then((res) => {
            if (res.status === 200) {
                setAlertDiv([<Alert tema="success" conteudo="Usuário cadastrado com sucesso." />])
                setTimeout(() => {redirectLogin()},4000)
            }

        }).catch(err => {
            let errors = []

            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            })
            setAlertDiv(errors)
        })
    }

    return (
        
        <div className="container" id="cadastro">
            <form id="cadastro-form" onSubmit={handleCadastro}>
                <label htmlFor="mail">Email</label><br />
                <input type="email" name="mail" value={usuario.mail} onChange={handleChange} placeholder="email@email.com" /><br />
                <label htmlFor="senha">Senha</label><br />
                <input value={usuario.senha} name="senha" onChange={handleChange} type="password" />
                {alertDiv.map(a => a)}
                <button className="btn-full primary" type="submit">Cadastrar</button>
                <button className="btn-full" onClick={redirectLogin}>Voltar para o login</button>
            </form>
        </div>
    )
}

export default Cadastro
