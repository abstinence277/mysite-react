import React,{Component} from "react";
//const Navbar = ()=>{
//    return <div>navbar</div>
//}
export default class Tabone extends Component{
    a="christy"
    myref=React.createRef();

    //数组
    state={
        list:[],
        tab:["111","222","333"],
        favour:{
            mytext:"收藏",
            myShow:true,
            myname:"christy"
        }
    };

    render(){
        var myname="christy"

        return(
            <div>tab1
                <h1>基本知识</h1>
                {277}-{myname}
                {10>20?'1':'2'}
                <div className="text">pink</div>
                <div id="yellow">yellow</div>
                <label htmlFor="username">name:</label>
                <input type="text" id="username"></input>

                <h1>input和add</h1>
                <div>
                    <input ref={this.myref}></input>
                    <button onClick={this.handleclick}>add</button>
                </div>

                <h1>数组加载在页面</h1>
                {/**
                <div>
                    <ul>
                        {this.state.list.map((item,index)=>(
                            <li key={index}>
                                {item}--{index}
                                <span dangerouslySetInnerHTML={
                                    {
                                        __html:item
                                    }
                                }></span>
                                <button onClick={this.delete.bind(this,index)}>del</button>
                            </li>
                        ))}
                    </ul>
                </div>
                */}

                {this.state.list.length===0?<div>结果为空1</div>:null}
                <div className={this.state.list.length===0?"":"hidden"}>结果为空2</div>

                <h1>收藏按钮-{this.state.favour.myname}</h1>
                <button onClick={this.favour}>{this.state.favour.myShow?"收藏":"取消收藏"}</button>
                

            </div>
            
        )
    }
    handleclick=()=>{
        console.log("y",this.myref.current.value)
        //this.state.list.push(this.myref.current.value)
        let newlist=this.state.list
        newlist.push(this.myref.current.value)
        this.setState({
            list:newlist
        })
        //清空input
        this.myref.current.value=""
    }
    delete=(index)=>{
        console.log(index)
        let newlist=this.state.list.slice()
        newlist.splice(index,1)
        this.setState({
            list:newlist
        })
    }
    favour=()=>{
        let newfavour=this.state.favour
        newfavour.myShow=!this.state.favour.myShow
        newfavour.myname="christy277"
        this.setState({
            favour:newfavour
        })
        if(this.state.favour.myShow){
            console.log("y")
        }
        else{
            console.log("n")
        }
    }
}