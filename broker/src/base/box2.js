import React,{Component} from "react";
import axios from 'axios'
export default class Box2 extends Component{
    constructor(){
        super();
        this.state={
            alllist:[],
        }

        axios({
            url:"https://cms.bjidex.com/manage/content/getList?pageSize=12&current=1&categories=myGnJVbEZ",
            headers:{
                // 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16803326442376452649517057"}',
                // 'X-Host': 'mall.film-ticket.cinema.list'
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15'
            }
        }).then(res=>{
            console.log(res.data.data.docs)
            this.setState({
                alllist:res.data.data.docs
            })
        })
    }
    render(){
        return(
            <div>
                {
                    this.state.alllist.map(item=>
                        <dl className="dl">
                            <dt className="dt">{item.title}</dt>
                            <dd className="dd">{item.date}</dd>
                        </dl>)
                }
            </div>
        )
    }
}