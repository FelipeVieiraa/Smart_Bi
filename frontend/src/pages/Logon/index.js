import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

//IMGS:
import logoImg from '../../assets/teste.png';
import smartImg from '../../assets/smart.png';


//Style:
import './styles.css';

export default function Logon() {
    const history = useHistory();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ iduser, setIduser ] = useState('');

    const data = {
        username,
        password
    };

    async function logIn(e) {
        e.preventDefault();
        
        try{
            await api.post("logon", data).then(res => console.log(res.data[0].username));

            localStorage.setItem('name', username);
            localStorage.setItem('idUser', 1);

            return history.push('/default'); 
        }catch{
            alert('Dados incorretos, tente novamente!');
        }
        
    }

    return(
        <div className="logon-container">
            <section className="form-content">
                <img src={logoImg} alt="smart" />

                <form onSubmit={ logIn }>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Usuário"
                        value={username}
                        onChange={ e => setUsername(e.target.value) }
                    />
                    <input
                        placeholder="Senha"
                        value={password}
                        type="password"
                        onChange={ e => setPassword(e.target.value) }
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="go-register" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro.
                    </Link>
                </form>

            </section>

            <img src={smartImg} alt="inteligence" />
        </div>
    );
}
