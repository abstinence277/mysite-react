import React,{Component} from "react";
import {message } from 'antd'
import axios from 'axios'
import Modal from "../base/dataprovider/Modal";
import Register from "./register";

export default class Login extends Component{
    state={
        username:'',
        password:'',
        modal:this.props.showModal,
        showModal: false,
    }
    getname=(name)=>{
        this.setState({
            username:name.target.value
        })
        console.log(this.state.username)
    }
    getpasw=(pasw)=>{
        this.setState({
            password:pasw.target.value
        })
        console.log(this.state.password)
    }
    handleSubmit=(e)=>{
        if(!this.state.username || !this.state.password){
            message.info("用户名或密码为空")
            return
        }
        let data = {username: this.state.username, password: this.state.password}
        console.log(data)
        axios.post('/user/login', {
            username:this.state.username,
            pwd:this.state.password
        }
          ).then(res=>{
            console.log(res)
            if(res.status === 200 && res.data.payload.code ===1){
                console.log("login",this.state.modal)
                message.info("登陆成功")
                this.props.closeModal(true);
                this.props.changeuser(this.state.username)
            }
            else{
                message.info("用户名或密码错误")
            }

        })
    }
    register=()=>{
        if(this.state.showModal==false) {
            this.setState({showModal: true});
        }
        console.log(this.state.showModal)
    }
    handleHide = (flag) => {
        if(flag) {
            this.setState({showModal: false});
        }
    }
    back=()=>{
        this.props.closeModal(true);
    }
    render(){
        const modal = this.state.showModal ? (
            <Modal>
                <div className="modal">
                    <Register closeModal={this.handleHide}></Register>
                </div>
            </Modal>
        ) : null;
        return(            
            <div className="loginbackground">
                {modal}
                <div className="login-box">
                    <div style={{color:'black',fontSize:'30px',marginLeft:'40%',marginTop:'5%'}}>数据交易平台</div>
                    <div style={{width:'100%',marginTop:'5%'}}>
                        <input placeholder="用户名"className="loginusername" onChange={this.getname}></input>
                    </div>
                    <div style={{width:'100%',marginTop:'10%'}}>
                        <input placeholder="密码"className="loginuserpasw" type="password" onChange={this.getpasw}></input>
                    </div>
                    <button type="button" className="loginbutton" style={{float:'left',width:'30%'}} onClick={this.handleSubmit}>登陆</button>
                    <button type="button" className="loginbutton" style={{float:'left',width:'30%'}} onClick={this.back}>返回</button>
                    <div style={{'width':'100%','height':'20%','marginTop':'20%'}}>
                        <div style={{width:'100%',marginTop: '5%',marginLeft:'20px',display:'flex',justifyContent: 'space-between',color:'#1890ff',fontSize:'24px'}} onClick={this.register}>注册用户</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}