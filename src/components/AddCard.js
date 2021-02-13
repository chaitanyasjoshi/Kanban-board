import React, { useState } from "react";
import styled from "styled-components";
import { addCard } from "../state/boardData";
import AutoSizeTextArea from "./AutoSizeTextArea";
import Button from '@atlaskit/button';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';

const Wrapper = styled.div`
  padding: 8px;
  font-size: 16px;
`;

const TextAreaWrapper = styled.div`
  padding: 16px 24px 8px 8px;
  border-radius: 5px;
  font-size: inherit;
`;

const AddCard = ({ listId }) => {
  const [compose, setCompose] = useState(false);

  if (!compose) {
    return (
      <Wrapper>
        <Button
          onClick={() => setCompose(true)}
          shouldFitContainer
          iconBefore={<AddCircleIcon label="" size="medium" secondaryColor="rgb(52, 69, 99)" />}
          appearance="primary"
          style={{borderRadius: '5px', backgroundColor: '#4D977F'}}
        >
          Add a task
        </Button>
      </Wrapper>
    );
  }

  const onSave = content => {
    addCard(listId, content);
    setCompose(false);
  };

  const cancel = () => {
    setCompose(false);
  };

  return (
    <TextAreaWrapper>
      <AutoSizeTextArea
        onSave={onSave}
        updateValue=""
        onBlur={cancel}
        editMode={true}
        placeholder="Enter task desctiption..."
      ></AutoSizeTextArea>
    </TextAreaWrapper>
  );
};
export default AddCard;