import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import api from '../../services/api';


export default function SimpleBarChart(props) {
    const jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    const screenId = props.screen;
    const objetoId = props.id;

    //Graph
    const agrupe = props.agrupe;
    const values = props.values.split('|');
    const title  = props.title;
    const tabl   = props.table;


    const [ data, setData ] = useState([]);

    useEffect(() => {
      api.get("graph", {
        headers: {
          Authorization: tabl
        }
      }).then(res => {
        setData(res.data);
      })
    }, [objetoId]);

    console.log(data);

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
                        <XAxis dataKey={agrupe} />
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
