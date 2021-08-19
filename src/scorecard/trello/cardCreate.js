import React, { Component } from 'react';
import { connect } from "react-redux";
import { addCard } from "./action";
// import Icon from "@material-ui/core/Icon";
import TrelloButton from "./trelloButton";
import TrelloForm from "./trelloForm";

export class CardCreate extends Component {
    state = {
        text: ""
    };
    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    };
    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;

        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addCard(listID, text));
        }
    };
    onEnter=(e)=>{
        if(e.keyCode===13){
            this.handleAddCard()
        }
    }
    render() {
        const { text } = this.state;
        return (
            <TrelloForm
                text={text}
                onChange={this.handleInputChange}
                closeForm={this.closeForm}
                onEnter={this.onEnter}
            >
            <TrelloButton
                onClick={this.handleAddCard}
            >
                { "Add Card"}
            </TrelloButton>
        </TrelloForm>
        )
    }
}


export default connect()(CardCreate);
