import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import { DB_CONFIG } from './config/config';
//import firebase from 'firebase/app';
import * as firebase from 'firebase';
import 'firebase/database';
var config = {
    apiKey: "AIzaSyCdjammAhJXZq0DWe4rUS0DVg-UvJEpr8U",
    authDomain: "reactnotes-92c3d.firebaseapp.com",
    databaseURL: "https://reactnotes-92c3d.firebaseio.com",
    projectId: "reactnotes-92c3d",
    storageBucket: "reactnotes-92c3d.appspot.com",
    messagingSenderId: "559019045439"
  };
  //firebase.initializeApp(config);
  var fb = firebase.initializeApp(DB_CONFIG);
class App extends Component {

  constructor(props){
    super(props);
    //firebase2.initializeApp(DB_CONFIG);
    //var fb = firebase.initializeApp(DB_CONFIG);
    this.app = fb;
    //this.app = firebase.initializeApp(config);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.database = this.app.database().ref().child('notes');

    this.state = {
      notes: []
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;
    
    this.database.on('child_added', snap =>{
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({
        notes: previousNotes
      });
    });

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    });
  }

  addNote(note){
    this.database.push().set({noteContent:note});
    //const previousNotes = this.state.notes;
    //previousNotes.push({id:previousNotes.lenght+1, noteContent:note});
    //this.setState({notes: previousNotes});
  }

  removeNote(noteId){
    console.log(noteId);
    this.database.child(noteId).remove();
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
            return (<Note 
                      noteContent={note.noteContent}
                      removeNote={this.removeNote}
                      noteId={note.id}
                      key={note.id}/>);
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
