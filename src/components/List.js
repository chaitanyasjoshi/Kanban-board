import React, { useState } from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import ListTitle from "./ListTitle";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  width: 260px;

  display: flex;
  flex-direction: column;
  flex: 0 0 260px;
`;

const ListContent = styled.div`
  background-color: #F8F7F6;
  border-radius: 5px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#A2CAC2' : '#F8F7F6')};
`;

const sortFn = data => (a, b) => {
  return data[a].position - data[b].position;
};

const List = ({ listId, listData }) => {
  const cardIds = Object.keys(listData.cards).sort(sortFn(listData.cards));

  const [dragBlocking, setDragBlocking] = useState(false);

  return (
    <Draggable
      disableInteractiveElementBlocking={!dragBlocking}
      draggableId={listId}
      index={listData.position}
    >
      {provided => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <ListContent>
            <ListTitle
              dragHandleProps={provided.dragHandleProps}
              listId={listId}
              title={listData.list_title}
              setDragBlocking={setDragBlocking}
            ></ListTitle>

            <Droppable droppableId={listId}>
              {(droppableProvided, droppableSnapshot) => (
                <TaskList
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  isDraggingOver={droppableSnapshot.isDraggingOver}
                >
                  {cardIds.map(id => {
                    return (
                      <Card
                        key={id}
                        cardId={id}
                        listId={listId}
                        cardData={listData.cards[id]}
                      ></Card>
                    );
                  })}
                  {droppableProvided.placeholder}
                </TaskList>
              )}
            </Droppable>
            <AddCard listId={listId}></AddCard>
          </ListContent>
        </Container>
      )}
    </Draggable>
  );
};
export default List;