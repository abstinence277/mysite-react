// 选择数据集
import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select

export default class ChooseDataset extends Component {

    state={
        dataset:''
    }
    
    //只要发生该表就运行
    handleChange = (dataset) => {
        console.log(dataset)
        // this.setState({dataset});
        this.props.chosenDataset(dataset);//运行tab3.js中的函数
    }

    render() {
        
        return (
            <div style={{marginTop:'0.9rem'}}>
                {/* <span className="lineTitle">Choose Dataset : </span> */}
                <span className="lineTitle">请选择数据集 :</span>
                <Select style={{ width: '56%' }} size="small" onChange={this.handleChange}>
                    <Option value="iris">Iris</Option>
                    <Option value="chess">Chess</Option>
                    <Option value="cancer">Breast Cancer</Option>
                </Select>
            </div>
        )
    }
}
