import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
    const teste = useHistory();

    const [ user, setUser ] = useState(null);

    //Verifica se o usuário já está logado
    useEffect(() => {
        async function loadStorage() {
            //localStorage.clear();
            const storageUser = await localStorage.getItem("Auth_user");

            if(storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }
        loadStorage();
    }, []);

    async function storageUser(data) {
        await localStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function signIn(username, password, history) {    
        const data = {
            username,
            password
        }

        await api.post("logon", data).then(res => {
            const result = res.data[0];

            if(!!result) {
                storageUser(result);
                document.location.reload();
            } else {
                alert('Dados incorretos, tente novamente!');
            }
        });
    }

    async function userRegister(username, email, password, whats, uf, city, history) {
        const data = {
            username,
            email,
            password,
            whats,
            uf,
            city
        };

        if(uf.length <= 0 || city.length <= 0) {
            return alert("Favor preencher as localidades, estado e cidade.");
        }

        if(whats.length <= 7) {
            return alert("Número de celular deve possuir 8 ou mais caractéres!");
        }
        
        await api.post('users', data);
        
        alert("Cadastrado com sucesso!");
        history.push("/");
    }

    async function userLogout(history) {
        localStorage.clear();
        history.push("/");
        document.location.reload();
    }

    return(
        <AuthContext.Provider
            value={{ signed: !!user, user, signIn, userRegister, userLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}