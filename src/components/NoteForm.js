import React, { Component } from 'react';
//import logo from './logo.svg';
import '../styles/noteForm.css';
import PropTypes from 'prop-types';
class noteForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			newNoteContent: ''
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.writeNote = this.writeNote.bind(this);

	}

	handleUserInput (e){
		this.setState({newNoteContent: e.target.value});
		console.log(this.state.newNoteContent);
	}

	writeNote(){
		this.props.addNote(this.state.newNoteContent);
		this.setState({newNoteContent: ''});
	}
	
  render() {
    return (
      <div className="formWrapper">
      	<input 
      		value={this.state.newNoteContent}
      		onChange={this.handleUserInput} 
      		className="noteInput"
      		placeholder="Write a new note..."/>
      	<button onClick={this.writeNote} className="noteButton">Add Note</button>
      </div>
    );
  }
}

noteForm.propTypes = {
}

export default noteForm;