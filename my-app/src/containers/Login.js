import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../store/actions/auth';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

class  NormalLoginForm  extends React.Component{
   onFinish = (values) => {
   
    this.props.onAuth(values.username, values.password);
    this.props.history.push('/');
    
    };
  render()
 {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }
  return (
   <div>
       {
       this.props.loading?
       <div ><Spin /></div>
        :      
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
         Login
        </Button>
        or
        <NavLink to='/signup/'>
            signup
        </NavLink>
      </Form.Item>
    </Form>
}
   </div> 
  )
}
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
