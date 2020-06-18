import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

const data01 = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];

export default function SimpleBarChart(props) {
    const jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    const screenId = props.screen;
    const objetoId = props.id;

    //Graph
    const agrupe = props.agrupe;
    const values = props.values.split('|');
    const title  = props.title;


    const [ data, setData ] = useState([]);

    const graficos1 = [
        { cd_estado: '1' , vl_faturamento: '1200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '2' , vl_faturamento: '2200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '3' , vl_faturamento: '4100', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '4' , vl_faturamento: '5200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '5' , vl_faturamento: '4000', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '6' , vl_faturamento: '3200', vl_inicial: '100', vl_final: '10000' },
        { cd_estado: '7' , vl_faturamento: '2100', vl_inicial: '100', vl_final: '10000' }
    ];

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
    }

    useEffect(() => {
        if(objetoId == '30') {
            const dataObjeto = graficos1;
            setData(dataObjeto);
        }
    }, [objetoId]);

    return(
            <div>
                <div style={styled.contenth1}>
                    <h2 style={styled.title}>{title}</h2>
                </div>
                <div style={styled.boxGraph}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 0, right: 0, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="cd_estado" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        { values.map( value => (
                            <Bar dataKey={value} fill="#8884d8" />
                        ) ) }
                        
                    </BarChart>
                </div>
            </div>
    )
}
