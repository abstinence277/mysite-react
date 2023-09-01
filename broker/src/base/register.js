import React,{Component} from "react";
import {message } from 'antd'
import axios from 'axios'
import Modal from "../base/dataprovider/Modal";

export default class Register extends Component{
    state={
        username:'',
        password1:'',
        password2:''
    }

    render(){

        return(            
            <div className="loginbackground">
                <div className="login-box">
                    <div style={{width:'100%',marginTop:'10%'}}>
                        <input placeholder="用户名"className="loginusername" onChange={this.getname}></input>
                    </div>
                    <div style={{width:'100%',marginTop:'10%'}}>
                        <input placeholder="密码"className="loginuserpasw" type="password" onChange={this.getpasw1}></input>
                    </div>
                    <div style={{width:'100%',marginTop:'10%'}}>
                        <input placeholder="再次输入密码"className="loginuserpasw" type="password" onChange={this.getpasw2}></input>
                    </div>
                    <button type="button" className="loginbutton" style={{float:'left',width:'30%'}} onClick={this.handleSubmit}>注册</button>
                    <button type="button" className="loginbutton" style={{float:'left',width:'30%'}} onClick={this.back}>返回</button>
                </div>
            </div>
        )
    }
    getname=(name)=>{
        this.setState({
            username:name.target.value
        })
        console.log(this.state.username)
    }
    getpasw1=(pasw)=>{
        this.setState({
            password1:pasw.target.value
        })
        console.log(this.state.password1)
    }
    getpasw2=(pasw)=>{
        this.setState({
            password2:pasw.target.value
        })
        console.log(this.state.password2)
    }
    handleSubmit=()=>{
        if(!this.state.username || !this.state.password1 || !this.state.password2){
            message.info("用户名或密码为空")
            return
        }
        if(this.state.password1!=this.state.password2){
            message.info("两次输入密码不一致")
            return
        }
        let data = {username: this.state.username, password: this.state.password1}
        console.log(data)
        axios.post('/user/register', {
            username:this.state.username,
            pwd:this.state.password1
        }
          ).then(res=>{
            console.log(res)
            if(res.status === 200 && res.data.payload.code ===1){
                message.info("用户已存在")
            }
            else{
                message.info("注册成功")
                this.props.closeModal(true);
            }

        })
    }
    back=()=>{
        this.props.closeModal(true);
    }
}