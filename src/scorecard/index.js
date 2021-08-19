import React, { Component } from "react";
import TrelloList from "./trello/trelloList";
import TrelloCreate from "./trello/trelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "./trello/action";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  // color:${(props) => console.log(props)}
`;

export class Scorecard extends Component {
  // componentDidMount = () => {
  //     this.props.getJobScorecard();
  // };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };
  render() {
    const { lists, cards } = this.props;
    return (
      <div className="scorecards">
        <h3 className="tertiary-title">Scorecard</h3>
        <div className="scorecards-container">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId="all-lists"
              direction="horizontal"
              type="list"
            >
              {(provided) => (
                <ListsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  nf={provided}
                >
                  {lists.map((list, index) => {
                    // const list = lists[listID];
                    // console.log(list,lists)
                    const listCards = list.cards.map((cardID) =>
                      cards.find((card) => card.id === cardID)
                    );
                    return (
                      <TrelloList
                        listID={list.ScorecardId}
                        key={list.ScorecardId}
                        title={list.ScorecardName}
                        cards={listCards}
                        index={index}
                      />
                    );
                    // if (list) {
                    //     const listCards = list.cards.map(
                    //         cardID => cards[cardID]
                    //     );
                    //     return (
                    //         <TrelloList
                    //             listID={list.id}
                    //             key={list.id}
                    //             title={list.title}
                    //             cards={listCards}
                    //             index={index}
                    //         />
                    //     );
                    // }
                  })}
                  {provided.placeholder}
                  {/* <TrelloCreate list /> */}
                </ListsContainer>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

Scorecard.propTypes = {
  sort: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  lists: state.trelloReducer.lists,
  cards: state.trelloReducer.cards,
});

export default connect(mapStateToProps, { sort })(Scorecard);
