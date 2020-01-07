/**
 * Created by Shehz on 18-Jun-18.
 */
import React from 'react';
import AppContext from './../context/cart-context';
import axios from 'axios';
import {loaderDisplay} from "../utils/methods";

export default function(ComposedClass) {
    class AuthenticationCheck extends React.Component {
        static contextType = AppContext;

        state = {
            loading: false,
            user: null,
            error: '',
            error_messages: '',
            success_messages: '',


        };


        componentWillMount() {
            let cachedUser = localStorage.getItem('User');

            if (cachedUser) {
                this.setState({user: JSON.parse(cachedUser)});
            }

            this.initAxiosInterceptors();
        }

        initAxiosInterceptors = () => {
            // Add a request interceptor
            axios.interceptors.request.use(function (config) {
                // Do something before request is sen
                return config;
            }, function (error) {
                loaderDisplay('none');
                // Do something with request error
                return Promise.reject(error);
            });

            // Add a response interceptor
            axios.interceptors.response.use(function (response) {
                // Do something with response data
                return response;
            }, function (error) {
                loaderDisplay('none');
                // Do something with response error
                return Promise.reject(error);
            });
        };

        handleAuthState = object => this.setState({...object});

        render () {
            return (
                <>
                    <ComposedClass
                        {...this.props}
                        {...this.state}
                        handleAuthState={this.handleAuthState}
                    />
                </>
            )
        }
    }

    return AuthenticationCheck
}
