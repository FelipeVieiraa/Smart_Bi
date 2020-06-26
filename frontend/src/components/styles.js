import styled from 'styled-components';

export const Container = styled.div`
    background: #FFF;
    width: calc(100% - 100px);
    margin: 0 auto;
    padding: 30px;
    margin-top: 30px;
    border-radius: 8px;

    @media (max-width: 900px) {
        div.responsive {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
    
    @media (min-width: 1700px) {
    }
    
    @media (max-height: 760px) {   
    }
`;

export const Title = styled.h1`
    color: #322a40;
    font-size: 24px;
    text-align: center;
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;


export const Ul = styled.ul`
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
`;

export const Inputs = styled.input`
    border: none;
    background: #f1f1f1;
    border-radius: 3px;
    height: 30px;
    margin-top: 10px;
    padding: 6px;
    box-shadow: 0px 0px 2px 0px #bfbfbf;
`;

export const Forms = styled.form`
    display: flex;
    flex-direction: column;
    margin: 30px;
    max-width: 300px;
    max-height: 300px;
    min-height: 175px;
    min-width: 300px;
    align-items: center;
    text-align: center;
    justify-content: center;
    box-shadow: rgb(138, 138, 138) 0px 0px 3px 0px;
    background: rgb(251, 251, 251);
    font-weight: bold;
    font-size: 20px;
    color: rgb(50, 42, 64);
    text-decoration: none;
    border-radius: 3px;
`;