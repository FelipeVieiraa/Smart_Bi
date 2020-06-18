import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

//IMGS:
import logoImg from '../../assets/teste.png';
import smartImg from '../../assets/smart.png';


//Style:
import './styles.css';

export default function Logon() {
    const history = useHistory();
    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();
    const [ iduser, setIduser ] = useState('');

    const dataTeste = [
        { id: '1234', name: 'felipe', username: 'felipe1', password: '123456', nick: 'FelipeVieira' },
        { id: '1234', name: 'laura', username: 'laura1', password: '123456', nick: 'Laurinha' },
        { id: '1234', name: 'Manueli', username: 'saviManu', password: '123456', nick: 'Manu' }
    ];

    async function logIn(e) {
        e.preventDefault();
        const testUsername = dataTeste.find( user => user.username == (username));
        const testPassword = dataTeste.find( user => {
                                                       // setIduser(user.id)
                                                       return user.password == (password)
                                                    });

        console.log(iduser);

        localStorage.setItem('name', username);
        localStorage.setItem('idUser', 1);
        
        if( testUsername && testPassword ) {    
            history.push('/default');
        } else {
            alert('Dados incorretos!')
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
