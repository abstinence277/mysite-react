import React, { Component } from 'react'
import { Table, Tag, Tooltip } from 'antd'
import Modal from '../dataprovider/Modal';
import Testiris from './testiris';

export default class ModelPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingTable: props.loadingTable,
            showModal:false,
            modelid:0
        }
    }

    //购买模型
    buyModel = (id) => {
        console.log(id)
        this.setState({showModal:true,modelid:id})
    }
    //处理传来的数据
    handleData = () => {
        const { modelData } = this.props;
        let handled = [];
        modelData.map((item) => {
            item.suggestion === true ?
            handled = [...handled, {
                id: item.id,
                key: item.id,
                epsilon: item.epsilon,
                coverage: item.coverage,
                price: item.price,
                suggestion: 'true',
            }] :
            handled = [...handled, {
                id: item.id,
                key: item.id,
                epsilon: item.epsilon,
                coverage: item.coverage,
                price: item.price,
                suggestion: 'false',
            }];
            return 0;
        })
        return handled;
    }

    //关闭Model
    closeModal = () => {
        this.props.closeModal(true);
    }
    closetest=(flag)=>{
        if(flag) {
            this.setState({showModal: false});
        }
    }
    render() {
        const { dataset } = this.props
        const handled = this.handleData();
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            },
            {
                title: '噪声',
                dataIndex: 'epsilon',
                key: 'epsilon',
                width: '17%',
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render: value => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: '覆盖率',
                dataIndex: 'coverage',
                key: 'coverage',
                width: '21%',
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render: value => (
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                ),
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                width: '13%',
                align: 'center',
                ellipsis: {
                    showTitle: false,
                },
                render:(text, value) => {
                    <Tooltip placement="topLeft" title={value}>
                        {value}
                    </Tooltip>
                    // return '$ ' + text;
                    return '￥ ' + text;
                }
            },
            {
                title: '建议',
                key: 'suggestion',
                dataIndex: 'suggestion',
                width: '23%',
                align: 'center',
                render: (text, record) => (
                    <Tag color={ record.suggestion === 'true'? 'green':'volcano'} key={record.suggestion}>
                        {/* {record.suggestion.toUpperCase()} */}
                        { record.suggestion === 'true'? "是": "否" }
                    </Tag>
                ),
            },
            {
                title: '操作',
                key: 'action',
                width: '15%',
                align: 'center',
                render: (text, record) => (
                    <button className="btn-a-blue" onClick={() => this.buyModel(record.id)}>购买</button>
                ),
            },
        ];
        const modal = this.state.showModal ? (
            <Modal>
                <div className="modal">
                    <Testiris closeModal={this.closetest} modelid={this.state.modelid} dataset={dataset}></Testiris>
                </div>
            </Modal>
        ) : null;
        return (
            <div>
                {modal}
                <div className="modalBackModel" style={{'height':'25rem'}}>
                    <span className="close-pop" onClick={this.closeModal}></span>   
                    <h2 className="popTitle">模型</h2>
                    <Table columns={columns} dataSource={handled} size='small' pagination={{defaultPageSize: 5, style: {
                            position: "relative",pagination:['bottomCenter'],background:['white'],height:['30px'],margin:['0px 0'],justifyContent:['center']
                          },}}/>
                </div>
            </div>
        )
    }
}
