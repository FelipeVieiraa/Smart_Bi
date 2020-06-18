import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

//IMGs
import add from '../../assets/add.png';

//Styles
import { Title, Container, Content, Ul, Inputs } from '../styles'

export default function listScreens() {
    const nameUser = localStorage.getItem('name');

    const screens = [
        { id: '1', name: 'Recursos Humanos', description: 'RH', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', dashboards: '1|2|3|4' },
        { id: '2', name: 'Compras', description: 'Compras', image: 'https://images.unsplash.com/photo-1556742208-999815fca738?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', dashboards: '5|6|7|8' }
    ];

    const style = {
        lastBox: {
            minWidth: "215px",
            minHeight: "150px"
        },
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
            height: '50px',
            marginTop: 'calc( 100% - 240px )',
            opacity: '0.7'
        }
    }

    return (
        <Container className="container-listScreens">
            <Title>Telas disponíveis para o usuário {nameUser}</Title>

            <Content className="responsive">
                { screens.map(screen => (
                    <Link className="BoxA" key={screen.id} style={style.box} to={"/screen/"+screen.id}>
                        {screen.description}
                        <img style={style.boxImages} src={screen.image} />
                    </Link>
                )) }
                    <Link className="BoxA mainAdd" style={style.lastBox, style.box} onClick={ () => newScreen() }>
                        <img style={style.addImage} src={ add } />
                    </Link>
            </Content>
            
        </Container>
    );

}


async function newScreen() {

    const newSc = (
        <Ul>
            <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Inputs placeholder="Nome"/>
                <Inputs placeholder="http:// URL-Img" />
                <a className="button" style={{ maxWidth: '100px', margin: '0'}}>Adicionar</a>
            </li>
        </Ul>
    );

    ReactDom.render( newSc, document.querySelector('.mainAdd') );
}