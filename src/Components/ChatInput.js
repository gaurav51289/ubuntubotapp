import React from 'react';
import Dictaphone from './Dictaphone';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chatInput: ''};

        // React ES6 does not bind 'this' to event handlers by default
        this.submitHandler = this.submitHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
    }

    submitHandler(event) {
        // Stop the form from refreshing the page on submit
        event.preventDefault();

        if(this.state.chatInput !== ''){
            // Call the onSend callback with the chatInput message
            this.props.onSend(this.state.chatInput);

            // Clear the input box
            this.setState({chatInput: ''});
        }

    }

    textChangeHandler(event) {
        this.setState({chatInput: event.target.value});
    }

    speechHandler(newText){
        this.setState({chatInput: newText});
    }

    render() {
        return (
            <form className="chat-input" onSubmit={this.submitHandler}>
                <div className="chat-input-box">
                    <input type="text"
                           onChange={this.textChangeHandler}
                           value={this.state.chatInput}
                           placeholder="Write a message..."
                    />
                </div>
                <div className="dict-btn-box">
                    <Dictaphone
                        handleSendBtn = { (event) => this.submitHandler(event)}
                        handleChange={
                        (newText) => {
                            this.speechHandler(newText)
                        }
                    } />
                </div>
            </form>
        );
    }
}

ChatInput.defaultProps = {};

export default ChatInput;
