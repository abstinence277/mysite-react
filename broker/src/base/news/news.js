import React,{Component} from "react";
import News1 from "./new1";
import News2 from "./news2";
export default class News extends Component{
    state={
        tab:["国内新闻","前沿动态"],
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
                <div className="newsbox2">
                    {this.state.current==0&&(
                        <div><News1></News1>
                        <div className="homepageimg"></div>
                        </div>
                    )}
                    {this.state.current==1&&(
                        <div><News2></News2>
                        <div className="homepageimg"></div>
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