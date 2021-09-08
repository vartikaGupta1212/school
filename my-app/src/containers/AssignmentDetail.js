

import React from "react";
import { connect } from "react-redux";
import { Card, Skeleton, message } from "antd";
import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail } from "../store/actions/assignments";
import { createGradedASNT } from "../store/actions/gradedAssignments";
import Hoc from "../hoc/hoc";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

class AssignmentDetail extends React.Component {
  

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getASNTSDetail(newProps.token, this.props.match.params.id);
      }
    }
  }
  
  render() {
    const { currentAssignment } = this.props;
    
    const { title } = currentAssignment;
    console.log(this.props.currentAssignment)
   
    return (
      <Hoc>
       {Object.keys(currentAssignment).length > 0 ? (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Card title={title}>
                  <Card type = "inner" >
                   <Questions  asntId={ currentAssignment.id} questions={currentAssignment.questions}></Questions>
                  
                   
                
                      </Card>
                   
               
              </Card>
            )}
          </Hoc>
       ):null}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id)),
    createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt))
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetail);
