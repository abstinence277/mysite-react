import React, { Component } from 'react'
import '../../css/shapley.css'
import Echarts from './Echart'


export default class Shapleychart extends Component {
    render() {

        const { shapleyValue } = this.props;

        return (
            <div style={{height:'21rem'}}>
                <Echarts shapleyValue={shapleyValue}></Echarts>
            </div>
        )
    }
}
