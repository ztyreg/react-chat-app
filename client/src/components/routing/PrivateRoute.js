import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import SideBar from "../layout/SideBar";
import {Layout} from "antd";

const PrivateRoute =
    ({
         component: Component,
         auth: {isAuthenticated, loading},
         ...rest
     }) => {
        const [collapsed, setCollapsed] = useState(false);

        const onCollapse = value => {
            setCollapsed(value);
        };

        return (
            <Route
                {...rest}
                render={props =>
                    loading ? (
                        <Spinner/>
                    ) : isAuthenticated ? (
                        <>
                            <Layout style={{minHeight: '100vh'}}>
                                <SideBar collapsed={collapsed} onCollapse={onCollapse}/>
                                <Component {...props} />
                            </Layout>
                        </>
                    ) : (
                        <Redirect to="/"/>
                    )
                }
            />
        )
    };

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
