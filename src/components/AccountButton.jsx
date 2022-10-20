import styled from "styled-components";

const CustomDiv = styled.div`
    .account_info {
        font-size: large;
        margin-top: 5px;
        padding-top: 5px;
    }
    .info_button {
        width: 764px;
        display: flex;
        justify-content: space-between;
    }
    button{
        display: inline-block;
    }
`

const Account_info = () => {
    return (
        <CustomDiv>
            <div className="info_button">
                <div className="account_info">
                    이름
                </div>
                <button>이름 변경</button>
            </div>
        </CustomDiv>
    )
}

export default Account_info;