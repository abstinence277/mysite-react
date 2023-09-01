// main函数
import React,{Component} from "react";
import Dataprovider from "./dataprovider";
import History from "./hostory";
export default class Provide extends Component{
    state={
        tab:["历史数据","上传数据"],
        current:1,
        dataset:'',
        bp: '',
        ps: '',
        username:this.props.username
    };
    handleDataset = (dataset) => {
        //console.log("dataset",dataset);
        this.setState({dataset});
        this.props.handleDataset(dataset);
    }
    handleBp = (bp) => {
        this.setState({bp});
        this.props.handleBp(bp);
    }
    handlePs = (ps) => {
        this.setState({ps});
        this.props.handlePs(ps);
    }
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
                <div className="newsbox3">
                    {this.state.current==0&&this.state.username=='请登录'&&(
                        <div>暂无权限
                        <div className="homepageimg"></div>
                        </div>
                    )}
                    {this.state.current==0&&this.state.username!='请登录'&&(
                        <div>
                            <History></History>
                        <div className="homepageimg"></div>
                        </div>
                    )}
                    {this.state.current==1&&(
                        <div><Dataprovider handleDataset={this.handleDataset} handleBp={this.handleBp} handlePs={this.handlePs}></Dataprovider>
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