import React, { Component } from 'react'
import { App, InputNumber } from 'antd'
import {Tooltip} from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default class OwnerParams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bp: props.inputs.bp, 
            ps: props.inputs.ps, 
            ep: props.inputs.ep, 
            sn: props.inputs.sn, 
            selectedData: props.inputs.selectedData,
        }
    }

    componentDidMount() {
        const { bp, ps } = this.props.inputs
        this.onChangeBP(bp);
        this.onChangePS(ps);
    }

    onChangeBP = (value) => {
        this.setState({bp:value});
        this.props.handleInputBP(value);
    }

    onChangePS = (value) => {
        this.setState({ps:value});
        this.props.handleInputPS(value);
    }
    
    onChangeEP = (value) => {
        this.setState({ep:value});
        this.props.handleInputEP(value);
    }

    onChangeSN = (value) => {
        this.setState({sn:value});
        this.props.handleInputSN(value);
    }
    
    render() {

        const { bp, ps, ep, sn } = this.state;

        return (
            <div>
                <span className="lineTitle" style={{marginTop:'1.0rem'}}>
                    {/* Enter the Options ： */}
                    请输入参数 ：
                </span>
                <div style={{padding:'1%'}}>
                    <div className="inputLine">
                        <p className="inputP" data-tooltip-id='basicprice'  data-tooltip-content='基准价格，即未受差分隐私干扰的价格'>{/*Base Price*/}基本价 ：</p>
                        <Tooltip id="basicprice" />
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} precision={2}
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/￥\s?|(,*)/g, '')} defaultValue={bp}
                            onChange={this.onChangeBP} />
                    </div>
                    <div className="inputLine">
                        <p className="inputP" data-tooltip-id='ps' data-tooltip-content='用户隐私敏感度，通常选择在[0,1]区间，敏感度越高补偿函数越高，但太高可能导致不会被选用'>{/*Privacy Sensitivity*/}隐私敏感度 ：</p>
                        <Tooltip id="ps" />
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={ps}
                            onChange={this.onChangePS} />
                    </div>
                    <div className="inputLine">
                        <p className="inputP" data-tooltip-id='noise' data-tooltip-content='差分隐私参数，噪声越大隐私保护越少，获得赔偿越高'>{/*Epsilon*/}噪声 ：</p>
                        <Tooltip id="noise" />
                        <InputNumber className="inputNumber" size="small" min={0} step={0.01} defaultValue={ep}
                            onChange={this.onChangeEP} />
                    </div>
                </div>
            </div>
        )
    }
}
