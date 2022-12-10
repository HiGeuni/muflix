import styled from 'styled-components';

const CustomDiv = styled.div`
  font-family: 'noto-sans';
  font-weight: 600;
  justify-content: center;
  margin-top: 3%;
  margin-left: 21%;
  margin-right: 21%;
  // color: gray;
`;

function Title({ name }) {
  return (
    <CustomDiv>
      <h2>{name}</h2>
    </CustomDiv>
  );
}

export default Title;
