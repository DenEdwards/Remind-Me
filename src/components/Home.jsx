import React, { Component } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";

const Note = props => (
  <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{ props.deleteNote(props.note._id) }}><DeleteIcon/></button>
    </div>
)

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.deleteNote= this.deleteNote.bind(this)
    this.addNote= this.addNote.bind(this)

    this.state = {notes: []};
  }



  componentDidMount() {
    axios.get('http://localhost:3001/')
      .then(response => {
        this.setState({ notes: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  addNote(note){
    var joined = this.state.notes.concat(note);
    this.setState({ notes: joined })
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.filter(el => el._id !== id)
    })    

    axios.delete('http://localhost:3001/'+id)
      .then(response => { console.log(response.data)})
      .catch((error) => {
        console.log(error);
      })
  }

  noteList() {
    return this.state.notes.map(currentnote => {
      return <Note
        note={currentnote}
        key={currentnote._id}
        id={currentnote._id}
        title={currentnote.title}
        content={currentnote.content}
        deleteNote={this.deleteNote}
      />      
    })
  }

  render() {
    return (
      <div>
        <Header />
        <CreateArea onAddNote={this.addNote} />
        { this.noteList() }
        <Footer />
      </div>
    )
  }
}

