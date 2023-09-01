import React,{Component} from "react";
export default class Navibar extends Component{
    state={}
    render(){
        console.log(this.props)
        let {title,showleft}=this.props
        return(
            <div>
                {showleft && <button>显示</button>}
                Navibar-{title}
            </div>
        )
    }
}