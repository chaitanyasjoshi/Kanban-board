import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TextArea from '@atlaskit/textarea';

const CustomTextArea = styled(TextArea)`
  cursor: ${props => (props.editMode ? "text" : "grab")} !important;
  height: auto !important;
  overflow-y: hidden !important;
  border: none !important;
  resize: none !important;
  border-radius: 3px !important;
  width: 100% !important;
  background: transparent !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
  margin: -4px 0px !important;
  padding: 4px 8px !important;
  &:focus {
    background: white !important;
    box-shadow: inset 0 0 0 2px #0079bf !important;
    outline: 0 !important;
  }
`;

const AutoSizeTextArea = ({
  placeholder,
  editMode,
  onSave,
  updateValue,
  onBlur }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    setTextAreaValue(updateValue);
  }, [updateValue]);

  useEffect(() => {
    resizeTextArea();
  }, [textAreaValue]);

  useEffect(() => {
    if (editMode) {
      textAreaRef.current.focus();
      textAreaRef.current.select();
    }
  }, [editMode]);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };
  const onChange = e => {
    setTextAreaValue(e.target.value);
  };

  const onKeyDown = e => {
    // enter pressed
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(textAreaValue);
      textAreaRef.current.blur();
    }
  };

  return (
    <CustomTextArea
      ref={textAreaRef}
      value={textAreaValue}
      onChange={onChange}
      rows={1}
      onKeyDown={onKeyDown}
      onBlur={() => onBlur(textAreaValue)}
      spellCheck="false"
      editMode={editMode}
      placeholder={placeholder}
    />
  );
};
export default AutoSizeTextArea;