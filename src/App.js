import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './components/Note';
import NoteForm from './components/NoteForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [
        {noteId: 1, noteContent: "Note 1"},
        {noteId: 2, noteContent: "Note 2"}
      ]
    }
    this.addNote = this.addNote.bind(this);

  }

  addNote(note){
    const previousNotes = this.state.notes;
    previousNotes.push({id:previousNotes.lenght+1, noteContent:note});
    this.setState({notes: previousNotes});
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">
            <h1>React & firebase to do list</h1>
          </div>
        </div>
        <div className="notesBody">
        {
          this.state.notes.map( (note) =>{
            console.log(note);
            return (<Note noteContent={note.noteContent} noteId={note.noteId} key={note.noteId}/>);
          })
        }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
        
      </div>
    );
  }
}

export default App;
