import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { addList } from "../state/boardData";
import Button from '@atlaskit/button';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import Textfield from '@atlaskit/textfield';

const Container = styled.div`
  width: 272px;
  flex: 0 0 272px;
  border-right: 8px solid transparent;
  margin-left: 4px;
`;

const Wrapper = styled.div`
  padding: 8px;
  font-size: 16px;
`;

const TextAreaWrapper = styled.div`
  border-radius: 5px;
  font-size: inherit;
`;


const CustomInput = styled(Textfield)`
  font-size: inherit !important;
  border-radius: 3px !important;
  border-color: #4D977F !important;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf !important;
    outline: 0 !important;
  }
`;

const AddList = () => {
  const [compose, setCompose] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const onChange = e => {
    setListTitle(e.target.value);
  };
  const refInput = useRef(null);

  useEffect(() => {
    if (compose) {
      refInput.current.focus();
    }
  }, [compose]);

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      // e.preventDefault();
      addList(listTitle);
      setListTitle("");
      setCompose(false);
    }
  };

  const onBlur = () => {
    if (listTitle.length > 0) {
      addList(listTitle);
      setListTitle("");
    }
    setCompose(false);
  };

  return (
    <Container>
      <Wrapper compose={compose}>
        {compose || (
          <Button
            onClick={() => setCompose(true)}
            shouldFitContainer
            iconBefore={<AddCircleIcon label="" size="medium" label="" secondaryColor="rgb(52, 69, 99)" />}
            appearance="primary"
            style={{borderRadius: '5px', padding: '0 6px', backgroundColor: '#4D977F'}}
          >
            Create new list
          </Button>
        )}
        {compose && (
          <TextAreaWrapper>
            <CustomInput
              ref={refInput}
              type="text"
              value={listTitle}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              placeholder="Enter list title..."
            />
          </TextAreaWrapper>
        )}
      </Wrapper>
    </Container>
  );
};
export default AddList;