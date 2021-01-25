import React from 'react';
import Login from './login';
import { History } from 'history';
import API from '../../services/api_servise';
import * as crypto from 'crypto-js';

interface LoginProps {
    user: string;
    password: string;
    changeStateSession: any
    history: History

}

export default class LoginCtr extends React.Component<LoginProps>{

    api: API = new API();
    state = {
        userName: "user_test@gmail.com"
        , password: "123456"
        , showMessage: false
        , message: ""
    }

    handleChangeInput = (e: any) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRegister = () => {
        this.setState({ isRegister: !this.state })
    }

    handleLogin = async () => {
        if (this.state.password && this.state.password && this.state.password != "" && this.state.password != "") {
            let result: any = await this.api.post('api/login', {
                userName: this.state.userName
                , password: crypto.MD5(this.state.password).toString()
            })

            if (result.login) {
                this.props.changeStateSession();
                sessionStorage.setItem("session", "1");
                this.props.history.push('/client');
            }else{
                this.setState({showMessage:true, message:"Usuario o contraseña incorrectos."})
            }
        } else {
            this.setState({ showMessage: true, message: "Alguno de los campos requerido se encuentra vácio." });
        }
    }

    render = () => {
        return <Login {...this} />;
    }
}