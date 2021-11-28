import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
//import { Button, Form, Container } from 'react-bootstrap';

import { useUser } from "../../providers/user"
import api from '../../utils/api';
import Alert from '../../components/alert';
import "./index.css"

const Login = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const history = useHistory();
    const redirectHome = () => history.push("/home")
    const redirectCadastro = () => history.push("/cadastro")

    const { user, setUser } = useUser()
    const [usuario, setUsuario] = useState({ mail: "", senha: ""})
    const [alertDiv, setAlertDiv] = useState([])

    
    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        api.post("/usuario/login", usuario).then((res) => {
            let token = res.data.token
            let perfil = res.data.perfil
            let idusuario = res.data.idusuario
            localStorage.setItem("token", token)
            localStorage.setItem("perfil", perfil)
            localStorage.setItem("idusuario", idusuario)

            setUser({ token: token, perfil: perfil, idusuario: idusuario })
            redirectHome()

        }).catch(err => {
            let errors = []

            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            })
            setAlertDiv(errors)
        })
    }
    return (

        <div className="container" id="login" >
            <form id="login-form" onSubmit={handleLogin}>
                <label htmlFor="mail">Email</label><br />
                <input type="email" name="mail" value={usuario.mail} onChange={handleChange} placeholder="email@email.com" /> <br />
                <label htmlFor="senha">Senha</label><br />
                <input type="password" name="senha" value={usuario.senha} onChange={handleChange} placeholder="Sua senha aqui" />
                {alertDiv.map(a => a)}
                <button className="btn-full primary" type="submit">Entrar</button>
                <button onClick={redirectCadastro} className="btn-full">Cadastrar-se</button>
            </form>

        </div>
    )
}

export default Login
