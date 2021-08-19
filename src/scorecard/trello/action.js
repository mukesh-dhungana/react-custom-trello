import { CONSTANTS } from "./types";
import shortid from "shortid";

export const addList = title => {
    return (dispatch, getState) => {
        const boardID = getState().activeBoard;
        const id = shortid.generate();
        dispatch({
            type: CONSTANTS.ADD_LIST,
            payload: { title, boardID, id }
        });
    };
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return (dispatch, getState) => {
        const boardID = getState().activeBoard;
        dispatch({
            type: CONSTANTS.DRAG_HAPPENED,
            payload: {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                draggableId,
                type,
                boardID
            }
        });
    };
};

export const editTitle = (listID, newTitle) => {
    return {
        type: CONSTANTS.EDIT_LIST_TITLE,
        payload: {
            listID,
            newTitle
        }
    };
};

export const deleteList = listID => {
    return (dispatch, getState) => {
        const boardID = getState().activeBoard;
        return dispatch({
            type: CONSTANTS.DELETE_LIST,
            payload: {
                listID,
                boardID
            }
        });
    };
};

export const addCard = (listID, text) => {
    const id = shortid.generate();
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID, id }
    };
};

export const editCard = (id, listID, newText) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: { id, listID, newText }
    };
};

export const deleteCard = (id, listID) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: { id, listID }
    };
};
