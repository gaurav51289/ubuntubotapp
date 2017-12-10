import React from 'react';

import Messages from './Messages';
import ChatInput from './ChatInput';

import '../styles/ChatApp.css';

import * as API from '../API/API';

class ChatApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.sendHandler = this.sendHandler.bind(this);

    }

    sendHandler(question) {
        const messageObject = {
            username: this.props.username,
            message: question
        };

        const questionObj = {
            question
        };

        API.ask(questionObj)
            .then((resJSON) => {
                let answerObj = {
                    username: 'Ubuntu Bot',
                    message: resJSON.answer,
                    fromMe: false
                };
                this.addMessage(answerObj);
            })
            .catch((error) => {
                console.error(error);
            });

        messageObject.fromMe = true;
        this.addMessage(messageObject);
    }

    addMessage(message) {
        // Append the message to the component state
        const messages = this.state.messages;
        messages.push(message);
        this.setState({ messages });
    }

    render() {
        return (
            <div className="container">
                <h3>Ubuntu Bot</h3>
                <Messages messages={this.state.messages} />
                <ChatInput onSend={this.sendHandler} />
            </div>
        );
    }

}
ChatApp.defaultProps = {
    username: 'Anonymous'
};

export default ChatApp;
