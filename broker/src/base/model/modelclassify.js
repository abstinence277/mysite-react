import React,{Component} from "react";
import Survey from "./survey";
import Design from "./design";
import Buymodel from "./buymodel";
export default class Modelclassify extends Component{
    state={
        tab:["价格调研","设计模型","购买模型"],
        current:0,
        price:[],
        bp:'',
        ps:'',
        username:this.props.username
    };
    //处理survey传过来的price
    handlePrice = (price) => {
        this.setState({price});
    }
    handleBp = (bp) => {
        this.setState({bp});
    }
    handlePs = (ps) => {
        this.setState({ps});
    }
    render(){
        const { price } = this.state;
        const { dataset,bp,ps } = this.props;
        return(
            <div>
                <div className="leftbox2">
                    <ul className="left-menu">
                        {
                        this.state.tab.map((item,index)=>
                            <li key={index} className={this.state.current===index?'leftchoosen':'leftnormal'} onClick={()=>this.switchTab(index)}>{item}</li>)
                        }
                    </ul>
                </div>
                <div className="newsbox3">
                    {this.state.current==0&&this.state.username!='请登录'&&(
                        <div><Survey handlePrice={this.handlePrice}></Survey>
                        <div className="homepageimg"></div>
                        </div>
                    )}
                    {this.state.current==0&&this.state.username=='请登录'&&(
                        <div>暂无权限
                        <div className="homepageimg"></div>
                        </div>
                    )}
                    {this.state.current==1&&this.state.username!='请登录'&&(
                        <div><Design price={price} dataset={dataset} bp={bp} ps={ps}></Design>
                        <div className="homepageimg"></div>
                        </div>
                    )}
                    {this.state.current==1&&this.state.username=='请登录'&&(
                        <div>暂无权限
                        <div className="homepageimg"></div>
                        </div>
                    )}
                    {this.state.current==2&&(
                        <div><Buymodel></Buymodel>
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