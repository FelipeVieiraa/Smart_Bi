import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { AuthContext } from '../../contexts/auth';

import api from '../../services/api';
import './styles.css'; 

//IMGs
import logoImg from '../../assets/teste.png';

export default function Register() {
    const history = useHistory();

    const { userRegister } = useContext(AuthContext);

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ whats, setWhats ] = useState('');
    const [ uf, setUf ] = useState(null);
    const [ city, setCity ] = useState(null);

    useEffect(() => {
        async function populateUFs() {

            let inserts = [];
        
            await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
                .then( res => res.json())
                .then( data => {
                    data.map( value => {
                        let repeat = `<option value="${value.sigla}">${value.nome}</option>`;
                        inserts.push(repeat);
                    } )
                } );
        
            const junction = '<option value"" >Selecione o estado</option>' + inserts.join('');
            
            document.getElementById('states-select').innerHTML = junction; 
        }

        populateUFs();
    }, []);

    document.addEventListener('change', e => {
        let change = e.target;
    
        if(change.title == 'estados') {
            getCities(change.value);
    
            document.getElementById('city-select').removeAttribute('disabled');
        }
        
    });

    async function getCities(e) {

        if(e.length > 3) {
            e = '42';
        }
    
        let inserts = [];
    
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}/municipios`;
    
        await fetch(url)
        .then( res => res.json())
            .then( data => {
                data.map( value => {
                    let repeat = `<option value="${value.nome}">${value.nome}</option>`;
                    inserts.push(repeat);
                } )
            } );
    
        const jun = '<option value"">Selecione a cidade</option>' + inserts.join('');
    
        document.getElementById('city-select').innerHTML = jun ;
    
    }

    async function handleRegister(e) {
        e.preventDefault();

        userRegister(username, email, password, whats, uf, city, history);
    }

    return(
        <div className="register-container">
            <div className="content">
                <div>
                    <img src={logoImg} alt="logo"/>
                    <p>Faça seu cadastro, entre na plataforma e dê um UP! em sua empresa.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Fazer logon.
                    </Link>
                </div>


                <form onSubmit={handleRegister}>
                    <h1>Cadastro</h1>

                    <input
                        value={username}
                        placeholder="Usuário"
                        required="required"
                        onChange={ e => setUsername(e.target.value) }
                    />
                    
                    <input 
                        placeholder="E-mail"
                        required="required"
                        type="email"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />

                    <input 
                        placeholder="Senha"
                        required="required"
                        type="password"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />

                    <input 
                        placeholder="WhatsApp"
                        required="required"
                        type="tel"
                        value={whats}
                        onChange={ e => setWhats(e.target.value) }
                    />

                    <div className="input-group">

                        <div>
                            <select 
                                id="states-select" 
                                title="estados"
                                value={uf}
                                required
                                onChange={ e => setUf(e.target.value) }
                            >
                            </select>
                        </div>

                        <div >
                            <select
                                id="city-select" 
                                disabled="disabled" 
                                required
                                value={city}
                                onChange={ e => setCity(e.target.value) }
                            >
                                <option>Selecione a cidade</option>
                            </select>
                        </div>
                        

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        
        </div>  
    );

}