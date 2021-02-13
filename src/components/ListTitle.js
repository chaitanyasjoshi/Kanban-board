import React, { useState } from "react";
import styled from "styled-components";
import AutoSizeTextArea from "./AutoSizeTextArea";
import { updateListTitle, deleteList } from "../state/boardData";
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';

const Delete = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  text-align: center;
  display: none;
`;

const Container = styled.div`
  position: relative;
  && {
    cursor: pointer;
  }
  &:hover ${Delete} {
    display: ${props => props.editMode ? "none" : "block"};
  }
`;

const TextAreaWrapper = styled.div`
  padding: 10px 8px;
  padding-right: 36px;
  font-weight: bolder;
  font-size: 1.5rem;
  &textarea {
    font-weight: 600;
  }
`;

const ListTitle = ({ setDragBlocking, dragHandleProps, listId, title }) => {
  const [editMode, setEditMode] = useState(false);
  const [updateValue, setUpdateValue] = useState(title);

  const onSave = _title => {
    if (_title.trim() === "") {
      setUpdateValue("");
      setTimeout(() => setUpdateValue(title), 0);
    } else {
      updateListTitle(listId, _title);
    }

    setDragBlocking(false);
    setEditMode(false);
  };

  const titleClick = () => {
    setDragBlocking(true);
    setEditMode(true);
  };

  const deleteListClick = () => {
    deleteList(listId);
  };

  return (
    <Container {...dragHandleProps} editMode={editMode}>
      <TextAreaWrapper onClick={titleClick}>
        <AutoSizeTextArea
          onSave={onSave}
          updateValue={updateValue}
          onBlur={onSave}
          editMode={editMode}
        ></AutoSizeTextArea>
      </TextAreaWrapper>

      <Delete onClick={deleteListClick}><CrossCircleIcon label="Delete" size="large" /></Delete>
    </Container>
  );
};
export default ListTitle;