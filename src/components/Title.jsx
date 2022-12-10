import styled from 'styled-components';

const CustomDiv = styled.div`
  font-family: 'noto-sans';
  font-weight: 600;
  justify-content: center;
  margin-top: 3%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
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
