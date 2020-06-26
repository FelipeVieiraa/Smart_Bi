import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

import api from '../../services/api';

//IMGs
import add from '../../assets/add.png';

//Styles
import { Title, Container, Content, Forms, Inputs } from '../styles'

export default function ListScreens() {
    const nameUser = localStorage.getItem('name');
    const idUser = localStorage.getItem('idUser');

    const [ screens, setSreens ] = useState([]);

    useEffect(() => {
        api.get("screens")
        .then(res => {
            setSreens(res.data);
        })
    }, [nameUser]);


    const [ name, setName ] = useState('');
    const [ image, setImage ] = useState('');

    const data = {
        name,
        image,
        idUser
    };

    async function createScreen() {

        try{
            if(name.length <= 0) {
                return alert("Preencha o campo nome.");
            }
            api.post("screens", data);
        }catch {
            alert("Erro!");
        }

    }

    const style = {
        box: {
            margin: '30px',
            maxWidth: '300px',
            maxHeight: '300px',
            minHeight: '175px',
            minWidth: '300px',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            boxShadow: '0px 0px 3px 0px #8a8a8a',
            background: '#fbfbfb',
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#322a40',
            textDecoration: 'none',
            borderRadius: '3px'
        },
        boxImages: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
        },
        addImage: {
            width: '50px',
            cursor: 'pointer',
            height: '50px',
            opacity: '0.7'
        }
    }

    async function openAdd() {

        const retorno = (<div>
                          <Inputs
                            placeholder="Nome"
                            title={name}
                            onChange={ e => setName(e.target.value) }
                          />
                          <Inputs
                            placeholder="http:// URL-Img"
                            title={image}
                            onChange={ e => setImage(e.target.value) } 
                          />
                          <button className="button" type="submit" style={{ maxWidth: '100px', margin: '0', marginTop: '10px'}}>Adicionar</button>
                        </div>);

        ReactDom.render(retorno, document.querySelector(".mainAdd"));
    }

    return (
        <Container className="container-listScreens">
            <Title>Telas disponíveis para o usuário {nameUser}</Title>

            <Content className="responsive">
                { screens.map(screen => (
                    <Link className="BoxA" key={screen.id} style={style.box} to={"/screen/"+screen.id}>
                        {screen.name}
                        <img style={style.boxImages} src={screen.image} />
                    </Link>
                )) }
                    
                <Forms onSubmit={ createScreen } className="mainAdd" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img style={style.addImage} onClick={() => openAdd()} src={add} alt="adicionar tela" />
                </Forms>
                                
                   
            </Content>
            
        </Container>
    );

}


