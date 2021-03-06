import React, {Component} from 'react';
import '../styles/App.css';
import '../styles/App.css';
import '../styles/Login.css';

import ChatApp from './ChatApp';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {username: ''};

        // Bind 'this' to event handlers. React ES6 does not do this by default
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    }

    usernameChangeHandler(event) {
        this.setState({ username: event.target.value });
    }

    usernameSubmitHandler(event) {
        event.preventDefault();
        this.setState({ submitted: true, username: this.state.username });
    }

    render() {
        if (this.state.submitted) {
            // Form was submitted, now show the main App
            return (
                <ChatApp username={this.state.username} />
            );
        }

        // Initial page load, show a simple login form
        return (
            <form onSubmit={this.usernameSubmitHandler} className="username-container">
                <h1>Bot Ubuntu</h1>
                <div>
                    <input
                        type="text"
                        onChange={this.usernameChangeHandler}
                        placeholder="Enter your name..."
                        required />
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default App;
