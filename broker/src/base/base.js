import React,{Component} from "react";
import '../css/base.css'
import Tabone from './tab1'
import Tabtwo from './tab2'
import TabFour from "./tab4";
import Main from "./main";

class App extends Component{
    //数组
    state={
        tab:["111","222","333","首页"],
        current:0
    };
    render(){
        return (
        <div>
            {/*或者使用{this.which()}*/}
            {this.state.current===0&&<Tabone></Tabone>}
            {this.state.current===1&&<Tabtwo></Tabtwo>}
            {this.state.current===2&&<TabFour></TabFour>}
            {this.state.current===3&&<Main></Main>}
            <div>
                <ul className="ul">
                    {
                        this.state.tab.map((item,index)=>
                            <li key={index} className={this.state.current===index?'active':'li'} onClick={()=>this.switchTab(index)}>{item}</li>)
                    }
                </ul>
            </div>        

        </div>
        )
    }

    
    switchTab(index){
        console.log(index)
        this.setState({
            current:index
        })
    }
}
export default App