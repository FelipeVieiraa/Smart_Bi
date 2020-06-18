import React, { useState } from 'react';
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

export default function Screen(props) {
    const history = useHistory();
    const prop = props.match.params;

    const [ tableadd, setTableadd ] = useState('');
    const [ typeadd, setTypeadd ] = useState('');
    const [ model, setModel ] = useState('');
    const [ agrupe, setAgrupe ] = useState('');
    const [ values, setValues ] = useState('');
    const [ title, setTitle ] = useState();

    console.log(title);


    const objetos = [
        { id: '10', type: 'grafico', model: 'linha', agrupe: 'cd_estado', values: 'vl_faturamento|vl_inicial|vl_final', title: 'Faturamento por estado', userId: '1', screenId: '1' },
        { id: '11', type: 'grafico', model: 'pizza', agrupe: 'sexo', values: 'countSexo', title: 'Quantidade de masculino/feminino', userId: '1', screenId: '1' },
        { id: '12', type: 'grafico', model: 'linha', agrupe: 'cd_estado', values: 'countOcorrencias', title: 'Ocorrências de incêndio', userId: '1', screenId: '1' },
        { id: '13', type: 'grafico', model: 'linha', agrupe: 'cd_estado', values: 'vl_faturamento|vl_inicial|vl_final', title: 'Faturamento por estado', userId: '1', screenId: '1' },
        { id: '20', type: 'consulta', model: 'consulta', agrupe: 'cd_estado', values: 'vl_faturamento|vl_inicial|vl_final', title: 'Faturamento por estado', userId: '1', screenId: '1' },
        { id: '30', type: 'grafico', model: 'barra', agrupe: 'cd_estado', values: 'vl_faturamento|vl_inicial|vl_final', title: 'Faturamento por estado', userId: '1', screenId: '1' },
        
    ];

    function logOut() {
        if(window.confirm("Deseja sair?")) {
            localStorage.clear();

            history.push('/');
        }
        return;
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
                <Link className="button" title="Inserir novo dashboard" onClick={ () => newDashboard() }>Inserir um novo dashboard</Link>
            </div>

        </header>

        <div className="main">
        </div>

        <div className="screen-content">
            { objetos.map( objeto => { 
                let grafic = objeto.model;

                switch(grafic) {
                    case 'linha': return(<SimpleLineChart 
                                            key={objeto.id} 
                                            agrupe={objeto.agrupe} 
                                            values={objeto.values} 
                                            screen={objeto.screenId} 
                                            id={objeto.id} 
                                            title={objeto.title}
                                        />);

                    case 'pizza': return (<TwoSimplePieChart
                                            key={objeto.id} 
                                            agrupe={objeto.agrupe} 
                                            values={objeto.values} 
                                            screen={objeto.screenId} 
                                            id={objeto.id} 
                                            title={objeto.title}
                                        />);
                    case 'consulta': return (<Consulta 
                                                key={objeto.id} 
                                                agrupe={objeto.agrupe} 
                                                values={objeto.values} 
                                                screen={objeto.screenId} 
                                                id={objeto.id} 
                                                title={objeto.title}
                                                totalagrupe={objeto.agrupe+'|'+objeto.values}
                                            />);
                    case 'barra':   return (<SimpleBarChart
                                                key={objeto.id} 
                                                agrupe={objeto.agrupe} 
                                                values={objeto.values} 
                                                screen={objeto.screenId} 
                                                id={objeto.id} 
                                                title={objeto.title}
                                            />);
                }
                
            })}

        </div>
    </div>
    )


    function newDashboard() {
        const t = { id: '10', type: 'grafico', model: 'linha', agrupe: 'cd_estado', values: 'vl_faturamento|vl_inicial|vl_final', title: 'Faturamento por estado', userId: '1', screenId: '1' };

        const tables = [
            { table: 'vm_rh' },
            { table: 'vm_compras' }
        ];

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

        const agrupes = [
            { agrupe: 'cd_estado' },
            { agrupe: 'sexo' }
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

            const res = <div>
                            <a className="list listTables" onClick={ () => listTables() }>Selecionar tabela</a>
                            {tables.map( table => (
                                                    <span className={table.table+'-table'}
                                                        onClick={ () => selected(table.table+'-table')
                                                    }>
                                                        { table.table }
                                                    </span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.querySelector('.listTables') );
        }

        function listTypes() {
            const res = <div>
                            <a className="list listTypes" onClick={ () => listTypes() }>Selecionar tipo</a>
                            {types.map( type => (
                                                    <span className={type.type+'-type'}
                                                        onClick={ () => selected(type.type+'-type') }
                                                    >
                                                        { type.type }
                                                    </span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.querySelector('.listTypes') );
        }

        function listModels() {
            const res = <div>
                            <a className="list listModels" onClick={ () => listModels() }>Selecionar Modelo</a>
                            {models.map( model => (
                                                    <span className={model.model+'-model'}
                                                        onClick={ () => selected(model.model+'-model') }
                                                    >
                                                        { model.model }
                                                    </span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.querySelector('.listModels') );
        }

        function listAgrupe() {
            const res = <div>
                            <a className="list listAgrupe" onClick={ () => listAgrupe() }>Selecionar agrupador</a>
                            {agrupes.map( agrupe => (
                                                    <span className={agrupe.agrupe+'-agrupe'}
                                                        onClick={ () => selected(agrupe.agrupe+'-agrupe') }
                                                    >
                                                        { agrupe.agrupe }</span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.querySelector('.listAgrupe') );
        }

        function listValues() {
            const res = <div>
                            <a className="list listValues" onClick={ () => listValues() }>Selecionar valores</a>
                            {values.map( value => (
                                                    <span className={value.values+'-values'}
                                                        onClick={ () => selected(value.values+'-values') }
                                                    >
                                                        { value.values }</span>
                                                ) )}
                        </div>
            
            ReactDom.render( res, document.querySelector('.listValues') );
        }


        const newDash = (
            <div className="main-content">
                <ul>
                    <li>

                        <form>
                            <input 
                                placeholder="Título"
                                value={title}
                                onChange={ e => setTitle(e.target.title) }/>

                            <div className="mainconfigs">

                                <a className="list listTables" onClick={ () => listTables() }>Selecionar tabela</a>
                                
                                <a className="list listTypes" onClick={ () => listTypes() }>Selecionar tipo</a>

                                <a className="list listModels" onClick={ () => listModels() }>Selecionar Modelo</a>

                                <a className="list listAgrupe" onClick={ () => listAgrupe() }>Selecionar agrupador</a>

                                <a className="list listValues" onClick={ () => listValues() }>Selecionar valores</a>

                            </div>

                            <button className="button">Adicionar</button>

                        </form>

                    </li>
                </ul>
            </div>
        );

        ReactDom.render( newDash, document.querySelector('.main') );


    }
}
