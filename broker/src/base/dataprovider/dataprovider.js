import React, { Component } from 'react'
import { Switch, message } from 'antd'
import axios from 'axios'
import ChooseDataset from './ChooseDataset';
import OwnerParams from './OwnerParams'
import SelectData from './SelectData';
import '../../css/general.css'
import Shapleychart from './shapleychart';
import {Tooltip} from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const cancerColumns = [
    'radius_mean',
    'texture_mean',
];

const chessColumns = [
    'arr1',
    'arr2',
];

const irisColumns = [
    'sepallength',
    'sepalwidth',
];
export default class Dataprovider extends Component{
    state = {
        dataset: null,//数据集
        allData: [],//数据集数据
        selectedData: [0, 1, 4, 5, 8, 9, 12, 13, 16, 17, 44, 45, 48, 49, 58, 59, 61, 63, 64, 65],    //预设值
        loadingTable: false,//是否加载表格
        bp: '',
        ps: '',
        ep: '',
        sn: '',
        bp: 1000,
        ps: 0.4,
        ep: 0.1,
        sn: 20,
        checked: false,
        loadingAlg: false,
        compensation: null,
        submit:0,
        shapleyValue:{},
    }
    render(){
        const { dataset, allData, loadingTable, selectedData, loadingAlg, checked} = this.state;
        
        const inputParams = this.formParams();
        const isDisabled = this.isDisabled();
        return (
            <div>
                <div className="boxall" style={{height:'65rem'}}>
                    {/* <div className="alltitle">数据拥有者</div> */}
                    <div className="line">
                        <ChooseDataset chosenDataset={this.getChosenDataset}/>
                    </div>
                    <div className="line">
                        <SelectData dataset={dataset} allData={allData} selectedData={selectedData} 
                        handleSelect={this.getSelectedData} loadingTable={loadingTable}/>
                    </div>
                    <div className="line">
                        <OwnerParams samplenum={this.state.selectedData.length} inputs={inputParams} handleInputBP={this.getInputBP} handleInputPS={this.getInputPS}
                            handleInputEP={this.getInputEP} handleInputSN={this.getInputSN}/>
                        <div className="inputLine">
                        <p className="inputP" data-tooltip-id='sn' data-tooltip-content='提交的数据数量'>{/*Sample Number*/}采样数 ：</p>
                        <Tooltip id="sn" />
                        <div style={{'float':'right','width':'39.5%','height':'1.5rem','marginRight':'20%','border':'1px solid rgba(26, 110, 146, 0.2)'}}>{selectedData.length}</div>
                    </div>
                    </div>
                    <div className="line" style={{'marginTop':'2rem'}}>
                        <span className="lineTitle" style={{marginTop:'-0.0rem'}}>
                            {/* Check Out the Compensation ： */}
                            数据价值评估 ：
                        </span>
                        <div className="inputLine switchLine">
                            <Switch className="switch" size="small" loading={loadingAlg} disabled={isDisabled}
                                checked={checked} onChange={this.calCompensation}/>
                            
                            {this.state.submit==1?<div style={{'marginLeft':'4rem','color':'red'}}>评估完成!</div>:null}
                            {/* <p>Submit my own data and options to gain direct insight into data valuation.</p> */}
                        </div>
                    </div>
                    <div style={{'marginTop':'2rem'}}>
                        <Shapleychart shapleyValue={this.state.shapleyValue}/>
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
        this.props.handleDataset(dataset);
        this.getAllData(dataset);//获取数据集数据
        this.setState({
            submit:0
        })
    }

    //发送请求获取数据
    getAllData = (dataset) => {
        this.setState({loadingTable:true});//开启加载表格
        axios.get(`/${dataset}/all`).then(
			response => {
                this.setState({dataset:dataset, allData:response.data.payload, loadingTable:false});
                console.log("请求成功，向数据表传入的数据 in getAllData", this.state.dataset, this.state.allData);
            },
		    error => {
                console.log("获取数据失败，向数据表传入的数据 in getAllData", this.state.dataset, this.state.allData);
            }
        )
    }

    //获取已选数据
    getSelectedData = (selectedData) => {
        // console.log("Owner收到选取的数据", selectedData);
        this.setState({selectedData});
    }

    获取输入的bp
    getInputBP = (bp) => {
        this.setState({bp});
        this.props.handleBp(bp);
    }

    获取输入的ps
    getInputPS = (ps) => {
        this.setState({ps});
        this.props.handlePs(ps);
    }

    获取输入的ep
    getInputEP = (ep) => {
        this.setState({ep})
    }

    获取输入的sn
    getInputSN = (sn) => {
        this.setState({sn})
    }

    计算compensation
    calCompensation = (checked) => {
        // console.log(checked);
        //设置开关
        this.setState({checked});
        if(!checked){
            return ;
        }
        //开关打开则发送请求
        this.setState({loadingAlg: true});
        const { dataset, selectedData, bp, ps, ep, sn } = this.state
        //未选中数据
        if(selectedData.length === 0) {
            // message.info("Please select the data");
            message.info("请选取数据")
            this.setState({loadingAlg:false, checked:false,});
            return ;
        }
        axios.post('/shapley', {
            "dataset": dataset,
            "id": selectedData,
            "bp": bp,
            "ps": ps,
            "eps": ep,
            "sample": sn
        }).then(
            response => {
                console.log("计算Compensation成功，返回值", response.data);
                this.setState({loadingAlg:false, checked:false, compensation: response.data.payload,submit:1});
                this.formSV(response.data.payload, selectedData);
            },
            error => {
                console.log("计算Compensation失败", error);
                this.setState({loadingAlg:false, checked:false});
            }
        );
    }

    判断每个参数是否都不为空
    isDisabled = () => {
        let isDisabled = false;
        const { dataset, bp, ps, ep, sn } = this.state
        if(dataset === null || bp === null || ps === null|| ep === null || sn === null ) {
            isDisabled = true;
        }
        return isDisabled;
    }

    //发送给子组件的参数
    formParams = () => {
        const { bp, ps, ep, sn } = this.state
        const inputParams = {
            bp: bp,
            ps: ps,
            ep: ep,
            sn: sn,
        }
        return inputParams;
    }

    //将Shapley图表需要的参数传过去
    formSV = (payload, selectedData) => {
        const { allData, dataset } = this.state;
        const column = (dataset === 'cancer'? cancerColumns : 
            dataset === 'chess' ? chessColumns : irisColumns);
        let items = [];
        selectedData.map((id, index) => {
            items = [ ...items, {
                x_axis: allData[id].fields[column[0]],
                y_axis: allData[id].fields[column[1]],
                id: id,
                sv: payload.sv[id],
                price: payload.price[id],
                label: allData[id].fields.label === 1 ? 'P':'N'
            }];
            return 0;
        });
        let shapv = {};
        shapv.x = column[0];
        shapv.y = column[1];
        shapv.items = items;
        this.setState({shapleyValue:shapv})
        console.log("Owner打包过去的ShapleyValue:", shapv);
    }
}