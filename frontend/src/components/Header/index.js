import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiUserCheck, FiChevronDown } from 'react-icons/fi';

import './styles.css';

import { AuthContext } from '../../contexts/auth';


export default function Header(){
    const history = useHistory();

    const { userLogout, user } = useContext(AuthContext);

    function handleLogout() {
        if(window.confirm("Deseja sair da conta?")) {
            userLogout(history);
            return;
        }
    }

    return(
        <div className="header-container">
            <div/>
            <div/>
            <div>
                <div>
                    <p title="on-line"/>
                    <label>Usuário: </label>
                    <strong>{user.username}</strong>
                    <button 
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                        title="Configurações de usuário"
                        >
                        <FiUserCheck size={20} color="#E02041" />
                        <FiChevronDown size={14} color="#E02041" />
                    </button>
                </div>
                <button onClick={ handleLogout }>
                    <FiPower title="Logout" size={31} color="#E02041"/>
                </button>
            </div>
        </div>
    );
}