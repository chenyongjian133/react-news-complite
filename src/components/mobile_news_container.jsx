import React,{Component} from 'react';
import MobileNewsImageBlock from './mobile_news_image_block';
import {Carousel,Tabs,BackTop} from 'antd';
import img1 from '../images/carousel_1.jpg';
import img2 from '../images/carousel_2.jpg';
import img3 from '../images/carousel_3.jpg';
import img4 from '../images/carousel_4.jpg';
const TabPane=Tabs.TabPane;
class MobileNewsContainer extends Component{
    render(){
        return(
            <div>
                <Tabs>
                  <TabPane tab="头条" key="top">
                      <div style={{width:'100%'}}>
                        <Carousel autoplay infinite>
                            <div><img src={img1} alt="轮播图"/></div>
                            <div><img src={img2} alt="轮播图"/></div>
                            <div><img src={img3} alt="轮播图"/></div>
                            <div><img src={img4} alt="轮播图"/></div>
                        </Carousel>
                          <MobileNewsImageBlock type="top" count={10}/>
                      </div>
                  </TabPane>
                  <TabPane tab="国内" key="guonei">
                      <MobileNewsImageBlock type="guonei" count={20}/>
                  </TabPane>
                    <TabPane tab="国际" key="guoji">
                        <MobileNewsImageBlock type="guoji" count={20}/>
                    </TabPane>
                    <TabPane tab="科技" key="keji">
                        <MobileNewsImageBlock type="keji" count={20}/>
                    </TabPane>
                    <TabPane tab="娱乐" key="yule">
                        <MobileNewsImageBlock type="yule" count={20}/>
                    </TabPane>
                </Tabs>
                <BackTop/>
            </div>
        )
    }
}
export default MobileNewsContainer;