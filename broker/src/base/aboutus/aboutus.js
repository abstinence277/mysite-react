import React,{Component} from "react";
import Introduction from './introduction'
import Contactus from './contactus'
export default class Aboutus extends Component{
    state={
        tab:["网站介绍","联系我们"],
        current:0
    };
    render(){
        return(
            <div>
                <div className="leftbox">
                    <ul className="left-menu">
                        {
                        this.state.tab.map((item,index)=>
                            <li key={index} className={this.state.current===index?'leftchoosen':'leftnormal'} onClick={()=>this.switchTab(index)}>{item}</li>)
                        }
                    </ul>
                </div>
                <div>
                    {this.state.current==0&&(
                        <div className="introduction">
                            <Introduction></Introduction>
                        </div>
                    )}
                    {this.state.current==1&&(
                        <div className="contactus">
                            <Contactus></Contactus>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    switchTab(index){
        this.setState({
            current:index
        })
    }
}