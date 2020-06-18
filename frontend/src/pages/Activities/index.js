import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiArrowLeft } from 'react-icons/fi';


import './styles.css';

//IMGs
import logoImg from '../../assets/teste.png';
import minibi from '../../assets/minibi.PNG';

export default function Activities() {
    const [ activities, setActivities ] = useState([]);

    const history = useHistory();
    const idUser = localStorage.getItem('idUser');

    const data = [
        { id: '1', title: 'teste1', description: 'teste1', date: '10/10/2010' },
        { id: '2', title: 'teste2', description: 'teste2', date: '10/10/2010' },
        { id: '3', title: 'teste3', description: 'teste3', date: '10/10/2010' },
        { id: '4', title: 'teste4', description: 'teste4', date: '10/10/2010' },
        { id: '5', title: 'teste5', description: 'teste5', date: '10/10/2010' },
        { id: '6', title: 'teste6', description: 'teste6', date: '10/10/2010' },
        { id: '7', title: 'teste7', description: 'teste7', date: '10/10/2010' },
    ];

    useEffect( () => {
        setActivities(data);
    }, [idUser] );

    function logOut() {
        if(window.confirm("Deseja sair?")) {
            localStorage.clear();

            history.push('/');
        }
        return;
    }

    async function handleDeleteActivities(id) {
        if(window.confirm("Você realmente deseja excluir esta atividade?")){
            try {
                setActivities(activities.filter(activities => activities.id !== id));
            }catch(err) {
                alert('Erro ao deletar caso, tente novamente.');
            }
        }
    }


    return(
        <div className="screen-container">
            <div className="menu">

                <div className="minMenu-right">
                    <img src={minibi} alt="Logo bi"/>
                </div>

                <div className="minMenu-left">
                    <button onClick={ logOut }>
                        <FiPower title="Logout" size={18} color="#E02041"/>
                    </button>
                </div>

            </div>

            <header>

                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
                    <Link className="return" to="/default">
                        <FiArrowLeft size={35} color="#E02041" title="Voltar" />
                    </Link>
                    <img src={logoImg} alt="Logotipo" />
                </div>

                <div>
                    <Link className="button" title="Cadastrar nova atividade" onClick={ () => NewActivitie(true) }>Cadastrar nova atividade</Link>
                </div>

            </header>

            <div className="main">
            </div>

            <div className="content-activities">
                <h1>Atividades</h1>
                <ul>
                    {activities.map(activitie => (
                        <li key={activitie.id}>
                            <strong>TÍTULO:</strong>
                                <p>{activitie.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                                <p>{activitie.description}</p>

                            <strong>DATA:</strong>
                                <p>{activitie.date}</p>

                            <button type="button" onClick={() => handleDeleteActivities(activitie.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>

                        </li>
                    ))}
                </ul>

            </div>
        </div>

    )
}

async function NewActivitie() {

    let newActivitie = (
        <div className="main-content">
                <ul>
                        
                    <li>
                        <strong>TÍTULO:</strong>
                        <input />

                        <strong>DESCRIÇÃO:</strong>
                        <textarea />

                        <strong>DATA:</strong>
                        <input type="date" />

                        <button className="button">Cadastrar</button>

                    </li>

                </ul>
            
        </div>
    );

    if(document.querySelector('.main-content')) {
        newActivitie = '';
    }

    return ReactDom.render(newActivitie, document.querySelector('.main'));



};