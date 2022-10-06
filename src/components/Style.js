import styled from "styled-components";

const NewStyle = styled.div`
    border: 2px;

    input {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
    }

    form {
        background: white;
        // border: 1px solid #dedede;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 auto;
        // max-width: 800px;
        padding: 30px 50px;
    }

    label {
        color: #3d3d3d;
        display: block;
        font-family: sans-serif;
        font-size: 16px;
        font-weight: 500;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .submitButton{
        margin-top: 1rem;
        background-color: #d2e7e8;
    }
`;

export default NewStyle;