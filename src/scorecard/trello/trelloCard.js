import { CardContent, Icon, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteCard, editCard } from "./action";
import TrelloForm from "./trelloForm";
import { RiDeleteBin2Line } from "react-icons/ri";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;
const StyledCard = styled(Card)`
  box-shadow: unset !important;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  .MuiCardContent-root {
    flex-grow: 1;
    :last-child {
      padding-bottom: 16px !important;
    }
  }
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton2 = styled(Icon)`
  font-size: 20px;
  color: #c3c3c3;
  padding-top: 16px;
  margin-right: 10px;
  height: 100% !important;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
    color: #d64545;
  }
`;

const TrelloCard = React.memo(({ text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const closeForm = (e) => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveCard = (e) => {
    e.preventDefault();

    dispatch(editCard(id, listID, cardText));
    setIsEditing(false);
  };

  const handleDeleteCard = (e) => {
    console.log(listID);
    dispatch(deleteCard(id, listID));
  };
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      saveCard(e);
    }
  };
  const onBlur = (e) => {
    setIsEditing(false);
  };
  const renderEditForm = () => {
    return (
      <TrelloForm
        text={cardText}
        onBlur={onBlur}
        onEnter={onEnter}
        onChange={handleChange}
        closeForm={closeForm}
      >
        {/* <TrelloButton onClick={saveCard}>Save</TrelloButton> */}
      </TrelloForm>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // onDoubleClick={() => setIsEditing(true)}
          >
            <StyledCard>
              {/* <EditButton
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
                edit
              </EditButton> */}
              {/* <DeleteButton fontSize="small" onMouseDown={handleDeleteCard}>
                delete
              </DeleteButton> */}
              <DeleteButton2 onClick={handleDeleteCard}>
                <RiDeleteBin2Line/>
              </DeleteButton2>
              <CardContent>
                <Typography>{text}</Typography>
              </CardContent>
            </StyledCard>
          </CardContainer>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);
