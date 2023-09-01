import React, { Component } from 'react'
import { Table, Button } from 'antd'
import ChooseDataset from './ChooseDataset'
import axios from 'axios';
const Columns = [
    {title: '序号',dataIndex: 'pk', fixed: 'left',class:'pk',width:'10%',onCell:()=>{
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
    {title: '发布时间',dataIndex: ['fields','submmitdate'], class:'submmitdate',width:'30%',onCell:()=>{
        return{
            style:{
                maxWidth:100,
                height:50,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
            }
        }
    }},
    {title: '被使用次数',dataIndex: ['fields','status'], class:'submmitdate',width:'30%',onCell:()=>{
        return{
            style:{
                maxWidth:100,
                height:50,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
            }
        }
    }},
    {title: '获得赔偿',dataIndex: ['fields','compensation'], class:'submmitdate',width:'30%',onCell:()=>{
        return{
            style:{
                maxWidth:100,
                height:50,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
            }
        }
    }},
];
export default class History extends Component{
    state = {
        dataset:'',
        allData:[],
    }
    
    render(){
        const column=Columns
        return (
            <div>
                <div className="boxall" style={{height:'40rem',width:'1230px'}}>
                    <div className='line'>
                        <ChooseDataset chosenDataset={this.getChosenDataset}/>
                    </div>
                    <div style={{'marginTop':'2rem'}}>
                        <Table  rowSelection={0} dataSource={this.state.allData} size='small' bordered
                        columns={column} scroll={{ x: 1150 }} 
                        pagination={{defaultPageSize: 10, pageSizeOptions:[5,10,20], style: {
                            position: "relative",pagination:['bottomCenter'],margin:['5px 5'],justifyContent:['center']
                          },}}
                /> 
            </div>
                    
                    <div className="boxfoot"></div>
                </div>
            </div>
        )
    }
    //接收组件返回的数据集名称
    getChosenDataset = (dataset) => {
        //console.log(dataset)
        //this.setState({dataset});//修改dataset
        this.getAllData(dataset);//获取数据集数据
        this.setState({
            submit:0
        })
    }
    getAllData = (dataset) => {
        this.setState({loadingTable:true});//开启加载表格
        axios.get(`/${dataset}/history`).then(
			response => {
                console.log(response.data.payload)
                this.setState({dataset:dataset, allData:response.data.payload});
            },
        )
    }
}