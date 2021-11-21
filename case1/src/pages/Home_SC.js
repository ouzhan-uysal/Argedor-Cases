import styled from 'styled-components';

export const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  background-color: #fff;
  margin: 1rem 0;
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
    .card-item {
      display: grid;
      margin: 1.5rem;
      padding: .7rem;
      border: 1px solid #fff;
      border-radius: 5px;
      justify-items: center;
      box-shadow: 2px 2px 2px 2px #000;
    }
  }
`;