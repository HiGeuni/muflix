import React from "react";
import styled from "styled-components";
import { Axios } from "axios";
import { api } from "../config/api";

const CustomButton = styled.button`
    font-weight: 600;
    font-size: 24px;
`

const testComponent = () => {

    const test = async (data) => {
        try{
            const token = localStorage.getItem("loging-token") || '';
            // const request = await Axios.post(`${api.url}/test`, {
            //     headers: {
            //         "Authorization" : token
            //     }
            // },
            // );
            // request();
        } catch (e) {
            console.log(e);
        }
        
        
    }
    
    return (
        <CustomButton onClick={test}>
            This is Test Button.
        </CustomButton>
    )
}

export default testComponent;