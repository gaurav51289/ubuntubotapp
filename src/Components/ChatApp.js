import React from 'react';

import Messages from './Messages';
import ChatInput from './ChatInput';

import '../styles/ChatApp.css';

import * as API from '../API/API';

class ChatApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messages: [], thinking: false };
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

        this.setState({
            thinking: true
        });

        API.ask(questionObj)
            .then((resJSON) => {
                let answerObj = {
                    username: 'Ubuntu Bot',
                    message: resJSON.answer,
                    fromMe: false
                };
                this.setState({
                    thinking: false
                });
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
        this.setState({
            messages
        });
    }



    render() {

        let thinking = '';

        if(this.state.thinking){
            thinking = <div className='thinking'>
                            <p>Thinking... <img
                                alt="... wait"
                                src={'./thinking.gif'}
                                width={30}
                                height={20}
                                align={'middle'}
                            /></p>
                        </div>;
        }

        return (
            <div className="container">
                <h2>Bot Ubuntu</h2>
                <Messages messages={this.state.messages} />

                {thinking}
                <ChatInput onSend={this.sendHandler} />
            </div>
        );
    }

}
ChatApp.defaultProps = {
    username: 'Anonymous'
};

export default ChatApp;
