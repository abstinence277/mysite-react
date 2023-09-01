import React,{Component} from "react";
import axios from 'axios'
export default class Tabtwo extends Component{
    constructor(){
        super();
        this.state={
            cinemalist:[],
            originlist:[]
        }
        // axios.get("https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=1133750").then(res=>{console.log(res)}).catch(err=>{console.log(err)})
        axios({
            url:"https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=1133750",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16803326442376452649517057"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            console.log(res.data.data.cinemas)
            this.setState({
                cinemalist:res.data.data.cinemas,
                originlist:res.data.data.cinemas
            })
        })
    }
    render(){
        return(
            <div>tab2
                <input onInput={this.handleInput}></input>
                {
                        this.state.cinemalist.map(item=>
                            <dl key={item.cinemaId}>
                                <dt>{item.name}</dt>
                                <dd>{item.address}</dd>
                            </dl>)
                }
            </div>
        )
    }
    handleInput=(event)=>{
        console.log(event.target.value)
        var newlist=this.state.originlist.filter(item=>(item.name.toUpperCase().includes(event.target.value.toUpperCase()))||(item.address.toUpperCase().includes(event.target.value.toUpperCase())))
        console.log(newlist)
        this.setState({
            cinemalist:newlist

        })
    }
}