import React,{Component} from 'react';
import axios from 'axios';
import NewsComments from './news_comments';
import {BackTop} from 'antd';
class MobileNewsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            news:''
        }
    }
    //挂载完成
    componentDidMount() {
        let newsId=this.props.params.news_id;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`;
        axios.get(url)
            .then(response=>{
                this.setState({news:response.data});
                document.title = response.data.title + " - React News | React驱动的新闻平台";
            })
    }
    render(){
        let {news}=this.state;
        return(
            <div>
                <div className='mobileDetailsContainer'
                  dangerouslySetInnerHTML={{__html:news.pagecontent}}>
                </div>
                <hr/>
                <NewsComments newsId={this.props.params.news_id}/>
                <span className="backTop"><BackTop/></span>
            </div>
        )
    }
}
export default MobileNewsDetail;