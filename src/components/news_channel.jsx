import React, {Component} from 'react';
import axios from 'axios';
import {Row,Col} from 'antd';
import ChannelNewsBlock from './channel_news_block';
import NewsImageBlock from './news_image_block';
export default class NewsChannel extends Component{
    constructor(props){
        super(props);
        this.state={
            newsArr:''
        }
    }

    componentWillMount() {
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.params.channel_id}&count=6`;
        axios.get(url)
            .then(response=>{
                let newsArr=response.data[0];
                this.setState({newsArr});
                // console.log(newsArr.type,newsArr.realtype);
            })
            .catch(error=>{console.log(error);})
    }

    componentWillReceiveProps() {
        this.componentWillMount()
    }
    render(){
        let {type,realtype}=this.state.newsArr;
        // if(!type){
        //     type='新闻',
        //     realtype='暂无'
        // }
        return(

            <div>
                <Row>
                    <Col span={1}/>
                    <Col span={17}>
                        <ChannelNewsBlock type={this.props.params.channel_id} count={30} ></ChannelNewsBlock>
                    </Col>
                    <Col span={5}>
                        <NewsImageBlock title={`${realtype}${type}`} type={this.props.params.channel_id} count={20} imgWidth="115px" width="100%"></NewsImageBlock>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>
        )
    }
}