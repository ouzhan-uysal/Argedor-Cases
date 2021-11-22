import styled from 'styled-components';
export const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
  margin: 1rem 0;
  .card-container {
    .card-item {
      img {
        max-height: 100%;
        max-width: 100%;
      }
      cursor: pointer;
      background-color: #fff;
      display: grid;
      margin: 1.5rem;
      padding: .7rem;
      border: 1px solid #fff;
      border-radius: 5px;
      justify-items: center;
      box-shadow: 2px 2px 2px 2px #000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  // responsive
  @media all and (max-width: 650px) {
    body {
      #root {
        display: grid;
        margin: 0 1rem;
      }
    }
  }
`;