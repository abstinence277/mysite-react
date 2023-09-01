import React,{Component} from "react";
export default class Introduction extends Component{

    render(){
        return(
            <div>
                <img className="introductionimg" src="https://p1.itc.cn/q_70/images03/20201014/fd2f188a3bb94ce2b855a0872c35e8aa.jpeg"></img>
                <span style={{'fontSize':'24px','marginLeft':'2rem','marginTop':'1rem'}}>
                在面向机器学习模型的数据市场中，数据所有者采集数据并通过平台进行提交，数据购买者选择需要的机器学习模型或提出需求，在数据交易平台中实现交互。其中，数据定价作为数据交易平台的重要组成部分，主要完成根据数据交易策略或数据定价算法确定模型出售价格及对数据所有者的补偿价格，决定数据交易平台的平稳、健康发展。出色的定价方法促进个人、平台和客户三方共同受益，并实现互利的数据交易生态系统，而错误的定价方法会使得数据丧失吸引力。因此，基于设计和优化数据定价算法，实现和开发数据交易平台对提高数据提供方、购买方及中间商之间的公平交互和有效协同具有重要作用。
                </span>
                <div className="homepageimg"></div>
            </div>
        )
    }
}