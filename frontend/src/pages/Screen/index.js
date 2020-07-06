import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';

import './styles.css';

//IMGs
import logoImg from '../../assets/teste.png';
import minibi from '../../assets/minibi.PNG';


//Components
import SimpleLineChart from '../../components/Charts/SimpleLineChart';
import TwoSimplePieChart from '../../components/Charts/TwoSimplePieChart';
import SimpleBarChart from '../../components/Charts/SimpleBarChart';
import Consulta from '../../components/Consulta/Consulta';
import api from '../../services/api';

export default function Screen(props) {
    const history = useHistory();
    const { id } = props.match.params;

    const idUser = localStorage.getItem('idUser');

    const [ tableadd, setTableadd ] = useState();
    const [ typeadd, setTypeadd ] = useState();
    const [ model, setModel ] = useState();
    const [ agrupe, setAgrupe ] = useState();
    const [ values, setValues ] = useState();
    const [ title, setTitle ] = useState();

    const [ ctable, setCtable ] = useState([]);
    const [ objects, setObjects ] = useState([]);

    const sets = [
        title,
        tableadd,
        typeadd,
        model,
        agrupe,
        values,
        idUser
    ];

    console.log(objects);

    useEffect(() => {
        api.get(`/objects/${id}`, {
            headers: {
                Authorization: idUser
            }
        })
        .then(res => {
            setObjects(res.data);
        })
    }, [idUser]);

    useEffect(() => {
        api.get("tables")
        .then(res => {
            setCtable(res.data);
        });
    }, [idUser]);

    function logOut() {
        if(window.confirm("Deseja sair?")) {
            localStorage.clear();

            history.push('/');
        }
        return;
    }

    async function handleDeleteScreen(id) {
        if(window.confirm("Deseja realmente excluir esta tela e todos os objetos vinculados?")){
            api.delete(`screens/${id}`, {
                headers: {
                    Authorization: idUser
                }
            });
            history.push("/default");
        }
    }

    function handleAddObject(e) {
        const title = document.getElementById("setTitle").value;
        const table = document.getElementById("setTable").querySelector(".selected").innerText;
        const type  = document.getElementById("setType").querySelector(".selected").innerText;
        const model = document.getElementById("setModel").querySelector(".selected").innerText;
        const agrupe = document.getElementById("setAgrupe").value;
        const values = document.getElementById("setValues").value;

        const sets = {
            title,
            table,
            type,
            model,
            agrupe,
            values,
            idUser
        }
        
        try{
            api.post(`/objects/${id}`, sets);
            return alert("Novo dashboard criado!");
        }catch{
            return alert("Tente novamente!");
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

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Link className="button" title="Inserir novo dashboard" onClick={ () => newDashboard() }>Inserir um novo dashboard</Link>
                <a className="button" style={{ cursor: 'pointer' }} title="Excluir tela atual" onClick={ () => handleDeleteScreen(id) }>Excluir tela</a>
            </div>

        </header>

        <div className="main">
        </div>

        <div className="screen-content">
            { objects.map( objeto => { 
                let grafic = objeto.model.toLowerCase();

                switch(grafic) {
                    case 'linha': return(<SimpleLineChart 
                                            key={objeto.id} 
                                            agrupe={objeto.agrupe} 
                                            values={objeto.valuess} 
                                            screen={objeto.screenId} 
                                            id={objeto.id} 
                                            title={objeto.title}
                                            table={objeto.tablee}
                                        />);

                    case 'pizza': return (<TwoSimplePieChart
                                            key={objeto.id} 
                                            agrupe={objeto.agrupe} 
                                            values={objeto.valuess} 
                                            screen={objeto.screenId} 
                                            id={objeto.id} 
                                            title={objeto.title}
                                            table={objeto.tablee}
                                        />);
                    case 'consulta': return (<Consulta 
                                                key={objeto.id} 
                                                agrupe={objeto.agrupe} 
                                                values={objeto.valuess} 
                                                screen={objeto.screenId} 
                                                id={objeto.id} 
                                                title={objeto.title}
                                                totalagrupe={objeto.agrupe+'|'+objeto.values}
                                                table={objeto.tablee}
                                            />);
                    case 'barra':   return (<SimpleBarChart
                                                key={objeto.id}
                                                agrupe={objeto.agrupe} 
                                                values={objeto.valuess} 
                                                screen={objeto.screenId} 
                                                id={objeto.id} 
                                                title={objeto.title}
                                                table={objeto.tablee}
                                            />);
                }
                
            })}

        </div>
    </div>
    )


    async function newDashboard() {
        
        const types = [
            { type: 'Gráfico' },
            { type: 'Consulta' }
        ];

        const models = [
            { model: 'Linha' },
            { model: 'Barra' },
            { model: 'Pizza' },
            { model: 'Consulta' }
        ];

        const values = [
            { values: 'vl_faturamento' },
            { values: 'vl_inicial' },
            { values: 'vl_final' }
        ];

        function selected(value) {
            
            if(value.indexOf('-table') != -1){
                const result = value.split('-')[0];
                
                document.querySelector('.'+value).classList.toggle('selected');

                setTableadd(result);
            }

            if(value.indexOf('-type') != -1){
                const result = value.split('-')[0];
                
                document.querySelector('.'+value).classList.toggle('selected');

                setTypeadd(result);
            }

            if(value.indexOf('-model') != -1){
                const result = value.split('-')[0];
                
                document.querySelector('.'+value).classList.toggle('selected');

                setModel(result);
            }

            if(value.indexOf('-agrupe') != -1){
                const result = value.split('-')[0];
                
                document.querySelector('.'+value).classList.toggle('selected');

                setAgrupe(result);
            }

            if(value.indexOf('-values') != -1){
                const result = value.split('-')[0];
                
                document.querySelector('.'+value).classList.toggle('selected');

                setValues(result);
            }


        }

        function listTables() {

            const res = <div id="setTable">
                            {ctable.map( table => (
                                                    <span className={table.tables+'-table'}
                                                        onClick={ () => selected(table.tables+'-table')
                                                    }>
                                                        { table.tables }
                                                    </span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.getElementById('listTables'));
        }

        function listTypes() {
            const res = <div id="setType">
                            {types.map( type => (
                                                    <span className={type.type+'-type'}
                                                        onClick={ () => selected(type.type+'-type') }
                                                    >
                                                        { type.type }
                                                    </span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.getElementById('listTypes') );
        }

        function listModels() {
            const res = <div id="setModel">
                            {models.map( model => (
                                                    <span className={model.model+'-model'}
                                                        onClick={ () => selected(model.model+'-model') }
                                                    >
                                                        { model.model }
                                                    </span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.getElementById('listModels') );
        }


        const newDash = (
            <div className="main-content-graphs">
                <ul>
                    <li>

                        <form onSubmit={handleAddObject}>
                            <input 
                                placeholder="Título"
                                title={title}
                                id="setTitle"
                                onChange={ e => setTitle(e.target.value) }/>

                            <div className="mainconfigs">

                                <li id="listTables" className="list button" onClick={ () => listTables() }>Selecionar tabela</li>
                                
                                
                                <li id="listTypes" className="list button" onClick={ () => listTypes() }>Selecionar tipo</li>
                                
                            
                                <li id="listModels" className="list button" onClick={ () => listModels() }>Selecionar Modelo</li>
                                
                                <span>Agrupador:</span>
                                <input 
                                    title={agrupe}
                                    required
                                    id="setAgrupe"
                                    onChange={ e => setAgrupe(e.target.value) }
                                />

                                <span>Values:</span>
                                <input
                                    title={values}
                                    required
                                    id="setValues"
                                    onChange={ e => setValues(e.target.value) }
                                />
                                

                            </div>

                            <button type="submit" className="button">Adicionar</button>

                        </form>

                    </li>
                </ul>
            </div>
        );

        ReactDom.render( newDash, document.querySelector('.main') );


    }
}
