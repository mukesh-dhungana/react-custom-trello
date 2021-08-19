import Icon from "@material-ui/core/Icon";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { MdEdit } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteList, editTitle } from "./action";
import CardCreate from './cardCreate';
import TrelloCard from "./trelloCard";

const ListContainer = styled.div`
    // background-color: #dfe3e6;
    background-color: transparent;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin: 0 8px 0 0;
`;

const StyledInput = styled.input`
    width: 100%;
    border: none;
    outline-color: blue;
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 10px 5px;
    margin-bottom:20px;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding:10px 0;
    margin-bottom:10px;
    // justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const DeleteButton = styled(Icon)`
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
    }
`;
const EditButton = styled(Icon)`
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.4;
    margin-left:20px;
    &:hover {
        opacity: 0.8;
    }
`;
const ListTitle = styled.h4`
    transition: background 0.3s ease-in;
    color:#444;
    // ${TitleContainer}:hover & {
    //     background: #ccc;
    // }
    :hover{
        color:#666;
    }
`;

const DroppableCardList = styled.div`
    min-height:300px;
`

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [listTitle, setListTitle] = useState(title);

    const renderEditInput = () => {
        return (
            <form onSubmit={handleFinishEditing}>
                <StyledInput
                    type="text"
                    value={listTitle}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleFinishEditing}
                />
            </form>
        );
    };

    const handleFocus = e => {
        e.target.select();
    };

    const handleChange = e => {
        e.preventDefault();
        setListTitle(e.target.value);
    };

    const handleFinishEditing = e => {
        setIsEditing(false);
        dispatch(editTitle(listID, listTitle));
    };

    const handleDeleteList = () => {
        dispatch(deleteList(listID));
    };
    const handleEditList =(e)=>{
        handleFinishEditing()
    }
    return (
        <Draggable draggableId={String(listID)} index={index} isDragDisabled={true} >
            {provided => (
                <ListContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={String(listID)} type="card">
                        {provided => (
                            <div>
                                <div>
                                    {isEditing ? (
                                        renderEditInput()
                                    ) : (
                                        <TitleContainer
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <ListTitle>{listTitle}</ListTitle>
                                            {/* <DeleteButton
                                                onClick={handleDeleteList}
                                            >
                                                delete
                                            </DeleteButton> */}
                                            {/* <EditButton onClick={handleEditList}>
                                                edit
                                            </EditButton> */}
                                            <span
                                                style={{marginLeft:20}}
                                                onClick={handleEditList}
                                                className="change-btn btn-edit"
                                            >
                                                <MdEdit />
                                            </span>
                                        </TitleContainer>
                                    )}
                                </div>
                                <DroppableCardList
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    st={provided}
                                >
                                    <CardCreate listID={listID} />
                                    {cards.map((card, index) => (
                                        <TrelloCard
                                            key={card.id}
                                            text={card.TagName}
                                            id={card.id}
                                            index={index}
                                            listID={listID}
                                        />
                                    ))}
                                    {provided.placeholder}
                                    {/* <TrelloCreate listID={listID} /> */}
                                </DroppableCardList>
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    );
};

export default connect()(TrelloList);
