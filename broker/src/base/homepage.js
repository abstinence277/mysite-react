import React,{Component} from "react";
import { Carousel } from 'antd'
import Box2 from "./box2";
import medicineimgURL from '../img/medicine.jpeg';
import financeimgURL from '../img/finance.jpeg'
import nlpimgURL from '../img/nlp.jpg'
import flowerimgURL from '../img/flower.jpeg'
export default class Homepage extends Component{
    
    render(){
        
        return(
            <div>
                <Carousel autoplay={true} autoplaySpeed={2000}>
                    <div>
                        <h3 >
                            <img className="homepageimg" src="https://p1.itc.cn/q_70/images03/20201014/fd2f188a3bb94ce2b855a0872c35e8aa.jpeg"></img>
                        </h3>
                    </div>
                    <div>
                        <h3 >
                            <img className="homepageimg" src="https://inews.gtimg.com/newsapp_bt/0/12118299252/1000.jpg"></img>
                        </h3>
                    </div>
                    <div>
                        <h3 >
                            <img className="homepageimg" src="https://p1.itc.cn/q_70/images03/20201014/fd2f188a3bb94ce2b855a0872c35e8aa.jpeg"></img>
                        </h3>
                    </div>
                    <div>
                        <h3 >
                            <img className="homepageimg" src="https://inews.gtimg.com/newsapp_bt/0/12118299252/1000.jpg"></img>
                        </h3>
                    </div>
                </Carousel>
                <div className="twoparts">
                    <section className="area">
                        <h2 className="header">
                            <div className="head">领域场景</div>
                        </h2>
                        <div className="box">
                            <div className="lefttop">
                                <img className="logo" src={medicineimgURL}></img>
                                <div className="midtext">医疗健康</div>
                                <div className="bgMian">
                                    <div className="hovertext">医疗图像识别</div>
                                </div>
                            </div>
                            <div className="righttop">
                                <img className="logo" src={financeimgURL}></img>
                                <div className="midtext">金融领域</div>
                                <div className="bgMian">
                                    <div className="hovertext">预测股市走势</div>
                                </div>
                            </div>
                            <div className="leftbottem">
                                <img className="logo" src={nlpimgURL}></img>
                                <div className="midtext">自然语言</div>
                                <div className="bgMian">
                                    <div className="hovertext">文本分析和生成</div>
                                </div>
                            </div>
                            <div className="rightbottem">
                                <img className="logo" src={flowerimgURL}></img>
                                <div className="midtext">自然风景</div>
                                <div className="bgMian">
                                    <div className="hovertext">图像分类、识别</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="area2">
                        <h2 className="header">
                            <div className="head">通知公告</div>
                        </h2>
                        <div className="box">
                            <div className="newsbox">
                                <Box2 style="height:10px"></Box2>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="homepageimg"></div>
            </div>
        )
    }
}