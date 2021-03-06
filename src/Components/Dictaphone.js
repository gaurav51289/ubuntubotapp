import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

const options = {
    autoStart: false
};

class Dictaphone extends Component {

    state = {
        isListening: false
    };

    toggleListen() {
        if(this.state.isListening){
            this.props.abortListening();
            this.setState({
                isListening: false
            });
        } else {
            this.props.resetTranscript();
            this.props.startListening();
            this.setState({
                isListening: true
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.isListening && nextProps.transcript !== '' && this.props.transcript !== nextProps.transcript){
            this.props.handleChange(nextProps.transcript);
        }
    }

    render() {
        const { browserSupportsSpeechRecognition } = this.props;

        let btnClass;
        if(this.state.isListening){
            btnClass = 'dict-btn-active';
        } else {
            btnClass = 'dict-btn';
        }

        if (!browserSupportsSpeechRecognition) {
            return (
                <input
                    alt="Send"
                    type="image"
                    src={'./btn1.png'}
                    className={'btnClass1'}
                    onClick = {(event) => this.props.handleSendBtn(event)}
                />
            )
        }



        return (
                <input
                    alt="Speak"
                    type="image"
                    src={'./btn.png'}
                    className={btnClass}
                    onClick = {() => (this.toggleListen())}
                />
        )
    }
}


export default SpeechRecognition(options)(Dictaphone)