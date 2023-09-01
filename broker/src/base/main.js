import React,{Component} from "react";
import '../css/main.css'
import Homepage from './homepage'
import Modelclassify from './model/modelclassify'
import Provide from "./dataprovider/provide";
import News from './news/news'
import Aboutus from './aboutus/aboutus'
import Modal from "../base/dataprovider/Modal";
import Login from "./login";
import {message } from 'antd'

export default class Main extends Component{
    state={
        tab:["首页","模型购买","数据提供","新闻公告","关于我们"],
        current:0,
        dataset:'',
        bp: '',
        ps: '',
        showModal: false,
        username:'请登录'
    };
    handleDataset = (dataset) => {
        console.log("dataset",dataset);
        this.setState({dataset});
    }
    handleBp = (bp) => {
        this.setState({bp});
    }
    handlePs = (ps) => {
        this.setState({ps});
    }
    render(){
        const { dataset,bp,ps} = this.state;
        const modal = this.state.showModal ? (
            <Modal>
                <div className="modal">
                    <Login showModal={this.state.showModal} closeModal={this.handleHide} username={this.state.username} changeuser={this.changeuser}></Login>
                </div>
            </Modal>
        ) : null;
        return(
            <div>
                {modal}
                <div className="bg-menu">
                    <div className="userlogin">
                        {/* <img></img> */}
                        <span className="username" onClick={this.login}>{this.state.username}</span>
                    </div>
                </div>

                <header className="front-header">
                    <nav className="front-nav">
                        <img className="front-icon"></img>
                        <div className="front-title-container">
                            <div className="front-title">模型交易市场</div>
                        </div>
                        <ul className="front-menu">
                            {
                            this.state.tab.map((item,index)=>
                                <li key={index} className={this.state.current===index?'choosen':'normal'} onClick={()=>this.switchTab(index)}>{item}</li>)
                            }
                        </ul>
                        <div className="front-search el-input el-input-group el-input-group--append">
                            <input type="text" autoComplete="off" placeholder="请输入搜索内容" className="el-input__inner"></input>
                            <div className="el-input-group__append">
                            </div>
                        </div>
                        <img className="check" onClick={this.search}></img>
                    </nav>
                </header>
                <div>
                    {this.state.current==0&&<Homepage></Homepage>}
                    {this.state.current==1&&<Modelclassify dataset={dataset} bp={bp} ps={ps} username={this.state.username}></Modelclassify>}
                    {this.state.current==2&&<Provide handleDataset={this.handleDataset} handleBp={this.handleBp} handlePs={this.handlePs} username={this.state.username}></Provide>}
                    {this.state.current==3&&<News></News>}
                    {this.state.current==4&&<Aboutus></Aboutus>}
                </div>
                <div className="foot"></div>
            </div>
        )
    }
    switchTab(index){
        this.setState({
            current:index
        })
    }
    search=()=>{
        console.log("hello")
    }
    login=()=>{
        if(this.state.username!='请登录'){
            message.info("已退出登陆")
            this.setState({
                username:'请登录'
            })
        }
        if(this.state.showModal==false&&this.state.username=='请登录') {
            this.setState({showModal: true});
        }
        console.log(this.state.showModal)
    }
    handleHide = (flag) => {
        if(flag) {
            this.setState({showModal: false});
        }
    }
    changeuser=(username)=>{
        this.setState({
            username:username
        })
    }
}