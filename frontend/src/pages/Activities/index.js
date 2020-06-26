import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { parseISO, format } from 'date-fns';

import api from '../../services/api';


import './styles.css';

//IMGs
import logoImg from '../../assets/teste.png';
import minibi from '../../assets/minibi.PNG';

export default function Activities() {
    const history = useHistory();

    const [ activities, setActivities ] = useState([]);

    const idUser = localStorage.getItem('idUser');

    async function createActivitie(e) {

        const title = document.querySelector(".title").value;
        const description = document.querySelector(".description").value;
        const date = document.querySelector(".date").value;
        const time = document.querySelector(".time").value;
        const formatDate = date +' '+ time+':00';

        const data = {
            title,
            description,
            formatDate,
            idUser
        }
        console.log(data);
        api.post("activities", data);

    }
    
    useEffect(() => {
        api.get("activities", {
            headers: {
                Authorization: idUser,
            }
        }).then(res => {
            setActivities(res.data);
        });
    }, [idUser]);

    function logOut() {
        if(window.confirm("Deseja sair?")) {
            localStorage.clear();

            history.push('/');
        }
        return;
    };
    

    async function handleDeleteActivities(id) {
        if(window.confirm("Você realmente deseja excluir esta atividade?")){
            try {
                setActivities(activities.filter(activities => activities.id !== id));
                api.delete(`activities/${id}`, {
                    headers: {
                        Authorization: idUser
                    }
                });
            }catch(err) {
                alert('Erro ao deletar caso, tente novamente.');
            }
        }
    }

    async function NewActivitie() {

        let newActivitie = (
            <form onSubmit={createActivitie} className="main-content">
                    <ul>
                            
                        <li>
                            <strong>TÍTULO:</strong>
                            <input 
                                className="title"
                            />
    
                            <strong>DESCRIÇÃO:</strong>
                            <textarea
                                className="description"
                            />
    
                            <strong>DATA:</strong>
                            <div>
                                <input 
                                    type="date"
                                    className="date"
                                />
                                <input
                                    type="time"
                                    className="time"
                                />
                            </div>
    
                            <button type="submit" className="button">Cadastrar</button>
    
                        </li>
    
                    </ul>
                
            </form>
        );
    
        if(document.querySelector('.main-content')) {
            newActivitie = '';
        }
    
        return ReactDom.render(newActivitie, document.querySelector('.main'));
    };


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
                                <p>{format(parseISO(activitie.dt_activities), "'Dia' dd 'do' MM 'de' yyyy', às ' HH:mm'hrs'")}</p>

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
