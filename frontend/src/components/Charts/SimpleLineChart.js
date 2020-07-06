import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import api from '../../services/api';


const Exampledata = [
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

export default function SimpleLineChart(props) {
  const jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    const screenId = props.screen;
    const objetoId = props.id;

    //Graph
    const agrupe = props.agrupe;
    const values = props.values.split('|');
    const title  = props.title;
    const tabl   = props.table;


    const [ data, setData ] = useState([]);

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
        }
    };

    useEffect(() => {
      api.get("graph", {
        headers: {
          Authorization: tabl
        }
      }).then(res => {
        setData(res.data);
      })
    }, [objetoId]);

    return (
        <div>
        <div style={styled.contenth1}>
            <h2 style={styled.title}>{title}</h2>
        </div>
        <div style={styled.boxGraph}>
            <LineChart
                width={400}
                height={200}

                data={data}

                margin={{
                    top: 0, right: 0, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={agrupe} />
                <YAxis />
                <Tooltip />
                <Legend width="auto" height={1}/>
                { values.map( value => {
                   return (<Line type="monotone" dataKey={value} stroke="#8884d8" />);    
                } ) }
            </LineChart>
        </div>
        </div>
        
    );
}

