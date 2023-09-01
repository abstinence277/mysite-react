import React,{Component} from "react";
import Navibar from "./Navibar";
export default class TabFour extends Component{
    render(){
        return(
            <div>
                <div>
                    <h2>首页</h2>
                    <Navibar title="首页" showleft={false}></Navibar>
                </div>
                <div>
                    <h2>列表</h2>
                    <Navibar title="列表" showleft={true}></Navibar>
                </div>
                <div>
                    <h2>购物车</h2>
                    <Navibar title="购物车" showleft={true}></Navibar>
                </div>
            </div>
        )
    }
}