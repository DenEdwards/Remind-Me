import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [expand, setExpand] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAddNote(note);
    setNote({
      title: "",
      content: ""
    });

    axios.post("http://localhost:3001/add", note)
            .then(res => console.log(res.data));

    event.preventDefault();
  }

  function onExpand(){
    setExpand(true);
  }

  return (
    <div>
      <form className="create-note" >
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          style={{display: !expand ? "none":null}}
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={!expand ? "1":"3"}
          onClick={onExpand}
        />
        <Zoom in={!expand ? false:true}><Fab onClick={submitNote}><AddIcon/></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
