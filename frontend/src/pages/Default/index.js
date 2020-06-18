import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';

//IMGs:
//import addIcon from '../../assets/add.svg';
import logoImg from '../../assets/teste.png';
import minibi from '../../assets/minibi.PNG';

//Components
import ListScreens from '../../components/Default/listScreens';

export default function Default() {
    const history = useHistory();

    function logOut() {
        if(window.confirm("Deseja sair?")) {
            localStorage.clear();

            history.push('/');
        }
        return;
    }

    return(
        <div className="default-container">
            <div className="menu">

                <div className="minMenu-right">
                    <img src={minibi} alt="Logo bi"/>
                </div>

                <div className="minMenu-left">
                    <button className="BoxA" onClick={ logOut }>
                        <FiPower title="Logout" size={18} color="#E02041"/>
                    </button>
                </div>

            </div>

            <header>
                <div>
                    <img src={logoImg} alt="Logotipo" />
                    <span>Bem vindo(a), acesse telas disponíveis ou cadastre suas atividades.</span>
                </div>

                <div>
                    <Link className="button" to="/activities">
                        Registro de Atividades
                    </Link>
                </div>

            </header>

            <ListScreens />
        </div>
    );
}