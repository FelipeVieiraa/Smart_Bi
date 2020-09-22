import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactDom from 'react-dom';
import { FiFolderPlus } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import { AuthContext } from '../../contexts/auth';

//IMGs:
//import addIcon from '../../assets/add.svg';
import logoImg from '../../assets/teste.png';
import minibi from '../../assets/minibi.PNG';

//Components
import Header from '../../components/Header';
import BoxScreen from '../../components/BoxScreen';

export default function Default() {
    const history = useHistory();

    const { userLogout, user } = useContext(AuthContext);

    const [ name, setName ] = useState('');
    const [ image, setImage ] = useState('');
    const [ screens, setSreens ] = useState([]);

    useEffect(() => {
        api.get("screens")
        .then(res => {
            setSreens(res.data);
        })
    }, []);

    async function handleOpenForm() {

        const retorno = (<>
                            <input
                                placeholder="Nome"
                                title={name}
                                onChange={ e => setName(e.target.value) }
                            />
                            <input
                                placeholder="http:// URL-Img"
                                title={image}
                                onChange={ e => setImage(e.target.value) } 
                            />
                            <button 
                                className="button" 
                                type="submit" 
                                style={{ 
                                    maxWidth: '100px', 
                                    margin: '0', 
                                    marginTop: '10px'
                                }}
                            >
                                Adicionar
                            </button>
                        </>);

        ReactDom.render(retorno, document.getElementById('form'));
    }

    async function handleCreateScreen() {
        const data = {
            name,
            image,
            idUser: user.id
        };

        try{
            if(name.length <= 0) {
                return alert("Preencha o campo nome.");
            }
            api.post("screens", data);
        }catch {
            alert("Erro!");
        }

    }

    return(
        <div className="default-container">

            <Header />

            <div className="sub-header">
                <div>
                    <img src={logoImg} alt="Logotipo" />
                    <span>Bem vindo(a), acesse as telas disponíveis ou registre atividades.</span>
                </div>

                <div>
                    <Link className="button" to="/activities">
                        Registro de Atividades
                    </Link>
                </div>

            </div>

            <div className="grid-screens">

                { screens.map(screen => (
                    <BoxScreen 
                        class="box-content" 
                        idScreen={screen.id} 
                        screen={screen.name} 
                        image={screen.image}
                    />
                )) }

                <div className="box-content" style={{ justifyContent: 'center' }}>
                    <form 
                        id="form"
                        onSubmit={handleCreateScreen}    
                    >
                        <button onClick={() => handleOpenForm()}>
                            <FiFolderPlus size={50} color="#FFF"/>
                        </button>
                    </form>
                </div>

            </div>

            
        </div>
    );
}