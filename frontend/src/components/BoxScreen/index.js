import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiXCircle } from 'react-icons/fi';

import './styles.css';


export default function BoxScreen(props) {


    return (
        <div className={props.class}>
            <header>
                <div/>
                <div>
                    <h1>{props.screen}</h1>
                </div>
                <div style={{ justifyContent: 'flex-end' }}>
                    <button
                        title="Configurações"
                    >
                        <FiSettings size={24} color="#FFF"/>
                    </button>
                    <button
                        title={`Excluir tela ${props.idScreen}`}
                    >
                        <FiXCircle size={24} color="#FFF"/>
                    </button>
                </div>

            </header>
            <div>
                <Link 
                    to={`/screen/${props.idScreen}`}
                    style={{ width: '100%', height: '100%', display: 'flex'}}
                >
                    <img src={props.image} />
                </Link>
            </div>
        </div>

    );

}


