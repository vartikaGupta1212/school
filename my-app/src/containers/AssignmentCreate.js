

import React, { useState } from  'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { createASNT } from "../store/actions/assignments";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';


import Collapse from '@material-ui/core/Collapse';

import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function AssignmentCreate(props) {
  const classes = useStyles()
  const [title, settitle] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [inputFields, setInputFields] = useState([
    {index: Math.random(),Question: '', Answer: '',Choice1:'',Choice2:'',Choice3:'',Choice4:''},
    
  ]);
   
  const handleSubmit = (e) => {
    e.preventDefault();
   setShow(true)
    
    const questions = [];
    for (let i = 0; i < inputFields.length; i += 1) {
      questions.push({
        title:inputFields[i].Question,
        "choices": [
          inputFields[i].Choice1,
          inputFields[i].Choice2,
          inputFields[i].Choice3,
          inputFields[i].Choice4
         
      ],
        answer: inputFields[i].Answer
      });
    }
     
    
    const asnt = {
      teacher:props.username,
      title,
      questions
    };
    console.log(asnt)
    props.createASNT(props.token, asnt);
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { Question: '', Answer: '',Choice1:'',Choice2:'',Choice3:'',Choice4:''}])
  }

  const handleRemoveFields = (index) => {
    const values  = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  }
  if(show)
      {
      alert= <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        Submitted Successfully!
      </Alert>
    </Collapse>
     }
  return (
    <Container>

      {alert}
      <form className={classes.root} onSubmit={handleSubmit}>
      <TextField 
      
        value={title}
        onChange={e => settitle(e.target.value)}
        placeholder="Enter title"
        type="text"
        name="title"
        required
      />
        { inputFields.map((inputField, index) => (
          <div key={index}>
            <TextField 
              name="Question"
              label="Question"
              variant="filled"
              value={inputField.Question}
              onChange={event => handleChangeInput(index, event)}
              fullWidth
            />
            
            <TextField 
              name="Answer"
              label="Answer"
              variant="filled"
              value={inputField.Answer}
              onChange={event => handleChangeInput(index, event)}
             
            />
             <TextField 
              name="Choice1"
              label="Choice1"
              variant="filled"
              value={inputField.Choice1}
              onChange={event => handleChangeInput(index, event)}
            />
             <TextField 
              name="Choice2"
              label="Choice2"
              variant="filled"
              value={inputField.Choice2}
              onChange={event => handleChangeInput(index, event)}
            />
            <TextField 
            name="Choice3"
            label="Choice3"
            variant="filled"
            value={inputField.Choice3}
            onChange={event => handleChangeInput(index, event)}
          /><TextField 
          name="Choice4"
          label="Choice4"
          variant="filled"
          value={inputField.Choice4}
          onChange={event => handleChangeInput(index, event)}
        />
            <IconButton
              onClick={() => handleRemoveFields(index)}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={() => handleAddFields()}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Send</Button>
      </form>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createASNT: (token, asnt) => dispatch(createASNT(token, asnt))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentCreate);
