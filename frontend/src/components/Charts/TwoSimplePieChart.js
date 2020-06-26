import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Legend, Tooltip,
} from 'recharts';

const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 },
];

export default function TwoSimplePieChart(props) {
  const jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

  const screenId = props.screen;
  const objetoId = props.id;

  //Graph
  const agrupe = props.agrupe;
  const values = props.values.split('|');
  const title  = props.title;


  const [ data, setData ] = useState([]);

  const styled = {
    boxGraph: {
        background: '#FFF',
        boxShadow: '0px 0px 3px 0px #cccccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '3px'
    },
    title: {
      color: 'rgb(136, 132, 216)',
      fontWeight: 'bold'
    },
    contenth1: {
      margin: '15px',
      top: 0,
      textAlign: 'center'
    }
  };

  const graficos2 = [
    { sexo: 'M' , countSexo: 15 },
    { sexo: 'F' , countSexo: 30 }
  ];
  
  useEffect(() => {
    if(objetoId == '11') {
        const dataObjeto = graficos2;
        setData(dataObjeto);
    } 
  }, [objetoId]);

  return (
    <div>
      <div style={styled.contenth1}>
        <h2 style={styled.title}>{title}</h2>
      </div>
      <div style={styled.boxGraph}>
          <PieChart width={400} height={400} margin={{ top: 0, bottom: 0, right: 0, left: 0 }}>
          { values.map( value => {
            return (<Pie dataKey={values[0]} isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />);    
          } ) }
            <Tooltip />
          </PieChart>
      </div>
    </div>
  );
  
}
