import styled from "styled-components";

const NewStyle = styled.div`
    display: block;
    background-color: black;
    margin: 5%;
    @media only screen and (min-width: 740px){
        background-color: rgba(0,0,0,.90);
        padding: 60px;
        max-width: 600px;
        min-height: 80vh;
        margin: auto;
    }
    h2{
        color: white;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    label{
        margin : 5px;
        font-size: 14px;
        font-weight: 600;
        color: white;
    }
    input{
        margin: 4px;
        border : none;
        border-radius: 3px;
        padding: 10px;
        color: #fff;
        background: #333;
        line-height: 18px;
    }
    .submitButton{
        margin-top: 0.83em;
        background-color: red;
        color: white;
        font-weight: 800;
        font-size: 20px;
    }
    .isUser{
        margin-top: 0.83em;;
        color: gray;
    }
`

export default NewStyle;