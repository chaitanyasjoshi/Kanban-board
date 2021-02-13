import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { updateCard, deleteCard } from "../state/boardData";
import AutoSizeTextArea from "./AutoSizeTextArea";
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  text-align: center;
  display: none;
`;

const TextAreaWrapper = styled.div`
  padding: 8px 18px 2px 2px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  
`;

const TaskDraggable = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: ${props => props.editMode ? "none" : " 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)"};
  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  margin-bottom: 8px;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
  }

  &:hover ${Delete} {
    display: ${props => props.editMode ? "none" : "block"};
    cursor: pointer;
  }
`;

const Card = ({ listId, cardId, cardData }) => {
  const [editMode, setEditMode] = useState(false);

  const onSave = content => {
    updateCard(listId, cardId, content);
    setEditMode(false);
  };

  const contentClick = () => {
    setEditMode(true);
  };

  const deleteTaskClick = () => {
    deleteCard(listId, cardId);
  };

  return (
    <Draggable
      draggableId={cardId}
      index={cardData.position}
      disableInteractiveElementBlocking={!editMode}
    >
      {(draggableProvided, draggableSnapshot) => (
        <TaskDraggable
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          editMode={editMode}
        >
          <TextAreaWrapper onClick={contentClick}>
            <AutoSizeTextArea
              onSave={onSave}
              updateValue={cardData.card_content}
              onBlur={onSave}
              editMode={editMode}
            ></AutoSizeTextArea>
          </TextAreaWrapper>

          <Delete onClick={deleteTaskClick}><CrossCircleIcon label="Delete" /></Delete>
        </TaskDraggable>
      )}
    </Draggable>
  );
};
export default Card;