import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Spin } from 'antd';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../store/actions/auth';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = ({loading,error,onAuth}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let is_student = false;
    if (values.userType === "student") is_student = true;
    
    onAuth(values.username,
      values.email,
      values.password1,
      values.confirm,
      is_student);
      this.props.history.push('/');
      
    
    
  };
  
  const onReset = () => {
    form.resetFields();
  };

  

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  
  
  
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="username"
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
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
         
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="userType" label="userType" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
         
          allowClear
        >
          <Option value="student">student</Option>
          <Option value="teacher">teacher</Option>
          
        </Select>
      </Form.Item>
      
      

      

      
      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>or
        <NavLink to='/login/'>
            login
        </NavLink>

      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
      loading: state.auth.loading,
      error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, email, password1, password2,is_student) => dispatch(actions.authSignup(username, email, password1, password2,is_student)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);