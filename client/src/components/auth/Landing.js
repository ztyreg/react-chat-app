import {Form, Input, Button, Card, Row} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import React from "react";
import {login, register} from '../../actions/auth';
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs} from 'antd';
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";

const {TabPane} = Tabs;


const Landing = ({login, register, isAuthenticated}) => {
    const onFinishLogin = values => {
        login(values.username, values.password);
    };

    const onFinishRegister = values => {
        register(values);
    };

    if (isAuthenticated) {
        return <Redirect to="/rooms"/>;
    }

    return (
        <Row justify="center">
            <Card style={{width: 300}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Login" key="1">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishLogin}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>


                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Register" key="2">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishRegister}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon"/>}
                                    type="email"
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
    );
};


Landing.propTypes = {
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login, register})(Landing);
