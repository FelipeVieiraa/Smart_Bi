import React, { useState, useEffect } from 'react';

export default function Consulta(props) {

    const screenId = props.screen;
    const objetoId = props.id;

    //Graph
    const agrupe = props.agrupe;
    const values = props.values.split('|');
    const totalagrupe = props.totalagrupe.split('|');
    const title  = props.title;

    const [ data, setData ] = useState([]);

    const consul = [
        { cd_estado: '1' , vl_faturamento: '1200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '2' , vl_faturamento: '2200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '3' , vl_faturamento: '4100', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '4' , vl_faturamento: '5200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '5' , vl_faturamento: '4000', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '6' , vl_faturamento: '3200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '7' , vl_faturamento: '2100', vl_inicial: '100', vl_final: '10000' }
    ];

    useEffect(() => {
        if(objetoId == '20') {
            const dataObjeto = consul;
            setData(dataObjeto);
        }
    }, [objetoId]);

    const styled = {
        boxGraph: {
            background: '#FFF',
            boxShadow: '0px 0px 3px 0px #cccccc',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '75px 75px 125px 75px',
            borderRadius: '3px'
        },
        title: {
            color: 'rgb(136, 132, 216)',
            fontWeight: 'bold',
        },
        contenth1: {
            top: 0,
            position: 'relative',
            margin: 15,
            textAlign: 'center'
        },
        table: {
            width: '100%',
            height: '100%',
            background: '#fbfbfb',
            borderRadius: '6px'
        },
        thead: {
            background: '#8884d8',
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: '16px',
            lineHeight: '34px',
        },
        tbody: {
            textAlign: 'center'
        },
        tbodyline: {
            padding: '10px',
            fontSize: '16px'
        },
        theadline: {
        }

    };

    return(
        <div>
            <div style={styled.contenth1}>
                <h2 style={styled.title}>TESTANDO</h2>
            </div>
            <div style={styled.boxGraph}>
                <table style={styled.table}>
                    <thead style={styled.thead}>
                        <tr>
                            <th style={styled.theadline}>{agrupe}</th>
                            { values.map( value => (
                                <th style={styled.theadline}>{value}</th>
                            ) ) }
                        </tr>
                    </thead>

                    <tbody style={styled.tbody}>

                    <h2 style={{ textAlign: 'center', color: '#322a40' }}>Tabela de consulta não está pronto</h2>


                    </tbody>



                </table>
            </div>
        </div>
    )
}