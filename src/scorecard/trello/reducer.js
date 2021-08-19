import { CONSTANTS } from "./types";
import shortid from "shortid";
import types from "../../helpers/types";
import isEmpty from "../../helpers/isEmpty";

const initialList = [
  {
    ScorecardId: 1,
    ScorecardName:"Block 1",
    id: shortid.generate(),
    cards: [],
    title: "Skills",
  },
  {
    ScorecardId: 2,
    ScorecardName:"Block 2",
    id: shortid.generate(),
    cards: [],
    title: "Personal Traits",
  },
  {
    ScorecardId: 3,
    ScorecardName:"Block 3",
    id: shortid.generate(),
    cards: [],
    title: "Qualifications",
  },
  {
    ScorecardId: 4,
    ScorecardName:"Block 4",
    id: shortid.generate(),
    cards: [],
    title: "Other Details",
  },
];

const initialState = {
  lists: [...initialList],
  //lists: [],
  cards: [],
};

const trelloReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_LISTS: {
      return {
        ...state,
        lists: action.payload,
      };
    }
    case types.UPDATE_TRELLO_CARDS: {
      const { lists, cards } = action.payload;
      let newList = lists.map((list) => {
        return {
          ScorecardId: list.ScorecardRef_Id,
          ScorecardName: list.ScorecardName,
          cards: isEmpty(cards)
            ? []
            : cards
                .filter((card) => card.ScorecardRef_Id === list.ScorecardRef_Id)
                .map((card) => card.Id),
        };
      });
      let newCard = isEmpty(cards)
        ? []
        : cards.map((card) => {
            return {
              TagName: card.TagName,
              ScorecardRef_Id: card.ScorecardRef_Id,
              id: card.Id,
            };
          });
      return {
        ...state,
        lists: newList,
        cards: newCard,
      };
    }
    case CONSTANTS.ADD_CARD: {
      const { text, listID, id } = action.payload;

      const newCard = {
        TagName: text,
        id: `card-${id}`,
        ScorecardRef_Id: listID,
      };

      return {
        ...state,
        cards: [newCard, ...state.cards],
        lists: state.lists.map((list) => {
          if (list.ScorecardId === listID) {
            list.cards.push(newCard.id);
            return list;
          }
          return list;
        }),
      };
    }
    case CONSTANTS.EDIT_CARD: {
      const { id, newText } = action.payload;
      // const card = state[id];
      // card.text = newText;
      return {
        ...state,
        cards: state.cards.map((item) => {
          if (item.id === id) {
            let a = item;
            a.TagName = newText;
            return a;
          }
          return item;
        }),
      };
    }

    case CONSTANTS.DELETE_CARD: {
      const { id, listID } = action.payload;
      // const newState = state;
      // delete newState[id];
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== id),
        lists: state.lists.map((list) => {
          if (list.ScorecardId === listID) {
            let a = {
              ...list,
              cards: list.cards.filter((cardID) => cardID !== id),
            };
            return a;
          }
          return list;
        }),
      };
    }
    case CONSTANTS.ADD_LIST: {
      const { title, id } = action.payload;
      const newList = {
        title: title,
        id: `list-${id}`,
        cards: [],
      };

      const newState = {
        ...state,
        lists: [newList, ...state.lists],
      };

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,

        type,
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const listStart = state.lists.find(
          (list) => list.ScorecardId === parseInt(droppableIdStart)
        );
        console.log(listStart);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        listStart.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.ScorecardId === listStart.ScorecardId) {
              return listStart;
            }
            return list;
          }),
        };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state.lists.find(
          (list) => list.ScorecardId === parseInt(droppableIdStart)
        );
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state.lists.find(
          (list) => list.ScorecardId === parseInt(droppableIdEnd)
        );
        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.ScorecardId === listEnd.ScorecardId) {
              return listEnd;
            } else if (list.ScorecardId === listStart.ScorecardId) {
              return listStart;
            }
            return list;
          }),
        };
      }
      return state;

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listID, newTitle } = action.payload;
      // const list = state[listID];
      // list.title = newTitle;
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.ScorecardId === listID) {
            list.ScorecardName = newTitle;
            return list;
          }
          return list;
        }),
      };
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      // const newState = state;
      // delete newState[listID];
      return {
        ...state,
        lists: state.lists.filter((list) => list.ScorecardId !== listID),
      };
    }

    default:
      return state;
  }
};

export default trelloReducer;
