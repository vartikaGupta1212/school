import { Steps, Button, message } from 'antd';
import React from "react";
import Alert from '@material-ui/lab/Alert';
import Choices from "../components/Choices";
import { createGradedASNT } from "../store/actions/gradedAssignments";

import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

import CloseIcon from '@material-ui/icons/Close';
const { Step } = Steps;


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      usersAnswers: {},
      count:0,
      show:false,
      open:true
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  onChoiceChange = (e, qId) => {
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({ usersAnswers });
  };
  render() {
    const { current } = this.state;
    const { usersAnswers } = this.state;
    const ans=[];
    
  
    console.log(usersAnswers)
    if(this.state.show)
      {
      alert= 
      <Collapse in={this.state.open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                this.setState({open: false});
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          You answered {this.state.count} answers correct!
        </Alert>
      </Collapse>
      
     }
    return (
      <>
      {alert}
        <Steps progressDot current={current}>
          {this.props.questions.map(item => (
            <Step key={item.id} title={item.question} />
          ))}
        </Steps>
        <div className="steps-content"><Choices  choices={this.props.questions[current].choices} change={this.onChoiceChange} usersAnswers={usersAnswers} questionId={this.props.questions[current].order}/></div>
        <div className="steps-action">
          {current < this.props.questions.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === this.props.questions.length - 1 && (
            <Button type="primary"    onClick={() =>
              {
                const asnt = {
                  username: this.props.username,
                  asntId: this.props.asntId,
                  answers: usersAnswers
                };
                this.props.createGradedASNT(this.props.token, asnt);
              for(let i = 0; i < this.props.questions.length ; i += 1) 
              {
               
              if(this.props.questions[i].answer===usersAnswers[i+1])
              {
                
             
                ans.push("yp");
               

              }
              }
              const res = ans.length;
             
            
            message.success('Processing complete!')
            this.setState({count: res}, () => console.log(this.state.count));
            console.log(this.state.count)
            this.setState({show: true}, () => console.log(this.state.show));
    
              }
          }>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    
    
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
  
    createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt))
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);
