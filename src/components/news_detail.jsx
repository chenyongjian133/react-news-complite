import React from 'react';
import axios from 'axios';
import NewsComments from './news_comments';
import NewsImageBlock from './news_image_block';
import {BackTop,Row,Col} from 'antd';
class NewsDetail extends React.Component {
    //初始化新闻为空数组
    constructor(props){
        super(props);
        this.state={
            news:[]
        }
    };
    //将挂载调用显示详情方法
    componentWillMount() {
        this.showDetail(this.props)
    }
    //重挂载调用显示详情方法
    componentWillReceiveProps(nextProps) {
        this.showDetail(nextProps)
    }
    showDetail=props=>{
        //取请求传过来的新闻ID
        let newsId=props.params.news_id;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`;
        axios.get(url)
            .then(response=>{
                let news=response.data;
                this.setState({news})
            })
            .catch(error=>{
                console.log(error.message);
            })
    };
    //渲染
    render(){
        let {news}=this.state;
        //44行让浏览器可以解析文本为html代码，45行让新闻id往评论模块传
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                        <NewsComments newsId={this.props.params.news_id}></NewsComments>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type='shehui' count={12} imgWidth='115px' width='300px'></NewsImageBlock>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop></BackTop>
            </div>
        )
    }
}
export default NewsDetail;