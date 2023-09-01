import React,{Component} from "react";
import axios from 'axios'
import moment from 'moment';
import { Table, Button } from 'antd'
const formatterTime = (val) => {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss ') : '';
};
const Columns = [
    {title: '新闻标题',dataIndex: 'headline', fixed: 'left',class:'headline',width:'80%',onCell:()=>{
        return{
            style:{
                maxWidth:10,
                height:50,
                overflow:'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
            }
        }
    }},
    {title: '发布时间',dataIndex: 'createTime',render: formatterTime},
];

export default class News1 extends Component{
    constructor(){
        super();
        this.state={
            alllist:[],
        }
        
        axios({
            url:"https://www.gzdex.com.cn/apaas/service/v3/news/document/reception/list?page=1&size=500&catId=17",
            headers:{
                // 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16803326442376452649517057"}',
                // 'X-Host': 'mall.film-ticket.cinema.list'
                //添加上x-run-as,不能使用*否则只会当做普通字符串
                //'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15',
            }
        }).then(res=>{
            console.log(res.data.data.list)
            this.setState({
                alllist:res.data.data.list
            })
        })
    }
    render(){

        const column=Columns
        return(
            <div>
                <Table  rowSelection={0} dataSource={this.state.alllist} size='small' bordered
                        columns={column} scroll={{ x: 1150 }} 
                        pagination={{defaultPageSize: 10, pageSizeOptions:[5,10,20], style: {
                            position: "relative",pagination:['bottomCenter'],margin:['5px 5'],justifyContent:['center']
                          },}}
                        onRow={(record)=>{
                            return {
                                onClick:this.clickRow.bind(this,record)
                            }
                        }}
                /> 
            </div>
        )
    }
    clickRow(num){
        console.log(num.digest)
    }
}