import React from 'react';
import NewsImageBlock from './news_image_block';
import NewsBlock from './news_block';
import NewsProduct from './news_product';
import {Row,Col,Tabs,Carousel} from 'antd';
const TabPane=Tabs.TabPane;

import '../componentsCss/news_container.css';

import img1 from '../images/carousel_1.jpg';
import img2 from '../images/carousel_2.jpg';
import img3 from '../images/carousel_3.jpg';
import img4 from '../images/carousel_4.jpg';
class NewsContainer extends React.Component{
    render(){
        return(
            <div className="newsContanier">
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className="leftContainer">
                            <Carousel autoplay>
                                <div><img src={img1} alt="轮播图"/></div>
                                <div><img src={img2} alt="轮播图"/></div>
                                <div><img src={img3} alt="轮播图"/></div>
                                <div><img src={img4} alt="轮播图"/></div>
                            </Carousel>
                            <NewsImageBlock title='国际头条' type='guoji' count={6} imgWidth='115px' width='100%'></NewsImageBlock>
                        </div>
                        <Tabs className='news_tab'>
                            <TabPane tab="国内" key="1">
                                <NewsBlock type='guonei' count={30}></NewsBlock>
                            </TabPane>
                            <TabPane tab="科技" key="2">
                                <NewsBlock type='keji' count={30}></NewsBlock>
                            </TabPane>
                        </Tabs>
                        <Tabs className='news_product'>
                            <TabPane tab="React产品" key="1">
                                <NewsProduct></NewsProduct>
                            </TabPane>
                        </Tabs>
                        <div>
                            <NewsImageBlock title="国内新闻" type="guonei" count={9} width="100%" imgWidth="115px"/>
                            <NewsImageBlock title="娱乐新闻" type="yule" count={18} width="100%" imgWidth="115px"/>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default NewsContainer;