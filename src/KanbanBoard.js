import React, { useState, useEffect } from "react";
import { boardDataSubject } from "./state/boardData";
import '@atlaskit/css-reset'
import Board from "./components/Board";
import styled, { createGlobalStyle } from "styled-components";
import emptybg from './img/no_tasks.svg'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
  * {
    font-family: 'Roboto', sans-serif;
  }
`;

const Parent = styled.div`
  display: flex;
  height: 100vh;
  background-image: ${props => (props.isNewUser ? `url(${emptybg})` : '')};
  background-repeat: no-repeat;
  background-size: 35%;
  background-position-x: 10%;
  background-position-y: 90%;
`;

const Container = styled.div`
  padding: 100px 100px;
  display: flex;
  flex-direction: column;
`;

const NewUserSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25%;
  margin-right: 3%;

  p {
    font-size: 3rem;
    font-weight: 200;
  }

  h1 {
    font-size: 6rem;
  }
`;

const KanbanBoard = () => {
  const [boardData, setBoardData] = useState(null);
  useEffect(() => {
    const sub = boardDataSubject.subscribe(bd => setBoardData(bd));
    return () => sub.unsubscribe();
  }, []);

  const isNewUser = boardData && Object.keys(boardData).length === 0 && boardData.constructor === Object;
  
  return (
    <Parent isNewUser={isNewUser}>
      <GlobalStyles />
      <Container>
        <Board />
      </Container>
      { isNewUser &&
        <NewUserSection>
              <div id="intro" class="intro">
                  <h1>Welcome to Kanban board</h1>
                  <p>A kanban board is  designed to help visualize work, limit work-in-progress, and maximize efficiency.</p>
                  <p>Start by creating a new list</p>
              </div>
        </NewUserSection>
      }
    </Parent>
  );
}

export default KanbanBoard;