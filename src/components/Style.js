import styled from "styled-components";

const NewStyle = styled.div`
    h2{
        padding-left : 5rem;
    }
    form {
        display: flex;
        flex-direction: column;
        margin : auto;
        width: 80%;
        height: 80%;
        // border: 2px solid;
    }
    label{
        margin : 5px;
        font-size: 14px;
        font-weight: 600;
    }
    input{
        margin: 4px;
        border : 1px solid #d9d9d9;
        border-radius: 2px;
        padding: 10px
    }
    .submitButton{
        background-color: #d2e7e8;
    }
`

export default NewStyle;