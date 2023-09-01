import React, { Component } from 'react'
import {message } from 'antd'
import axios from 'axios'
export default class Testiris extends Component {
    state={
        modelid:this.props.modelid,
        length:'',
        width:'',
        result:'结果为：',
        dataset:this.props.dataset
    }


    render() {
        return (
            <div>
                <div className="modalBackModel" style={{'height':'25rem'}}>
                    <span className="close-pop" onClick={this.closeModal}></span>   
                    <div style={{width:'100%',marginTop:'7%'}}>
                        <input placeholder="花萼长(sepallength)"className="loginusername" onChange={this.getlength}></input>
                    </div>
                    <div style={{width:'100%',marginTop:'3%'}}>
                        <input placeholder="花萼宽 (sepalwidth)"className="loginusername" onChange={this.getwidth}></input>
                    </div>
                    <button type="button" className="loginbutton" style={{width:'50%','marginLeft':'25%','marginTop':'5%'}} onClick={this.handleSubmit}>提交</button>
                    <div style={{'color':'white','fontSize':'24px','marginTop':'3%','marginLeft':'5%'}}>{this.state.result}</div>
                </div>
            </div>
        )
    }
    //关闭Model
    closeModal = () => {
        console.log(this.state.modelid)
        this.props.closeModal(true);
    }
    getlength=(a)=>{
        this.setState({length:a.target.value})
        console.log(this.state.length)
    }
    getwidth=(a)=>{
        this.setState({width:a.target.value})
        console.log(this.state.width)
    }

    handleSubmit=()=>{
        if(!this.state.length || !this.state.width){
            message.info("输入不能为空")
            return
        }
        let data = {length: this.state.length, width: this.state.width}
        console.log(data)
        if(this.state.dataset=='iris') this.handleiris();
    }
    handleiris=()=>{
        axios.post('/iris/test', {
            length:this.state.length,
            width:this.state.width,
            choice:this.state.modelid
        }
          ).then(res=>{
            console.log(res)
            if(res.status === 200 && res.data.payload.code ===1){
                message.info("计算成功")
                console.log(res.data.payload.data.result)
                if(res.data.payload.data.result==0){
                    this.setState({result:'结果为：Iris Setosa（山鸢尾）'})
                }
                else{
                    this.setState({result:'结果为：Iris Versicolour（杂色鸢尾）'})
                }
            }
            else{
                message.info("计算错误")
            }
        })
    }
}
