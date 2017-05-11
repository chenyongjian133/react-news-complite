import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import '../componentsCss/channel_news_block.css';
class ChannelNewsBlock extends React.Component{
    //初始化新闻列表
    constructor(props){
        super(props);
        this.state={
            newsArr:[]
        }
    }

    componentWillMount() {
        //接收父组件传过来的参数准备发请求
        let {type,count}=this.props;
        // console.log(type,count);
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        axios.get(url)
            .then(response=>{
                this.setState({
                    newsArr:response.data
                })
            })
            .catch(error=>{console.log(error);})
    }
    // 父组件传过来的属性值有改变时重新请求新闻
    componentWillReceiveProps() {
        this.componentWillMount()
    }
    render(){
        let {newsArr}=this.state;
        let newsList=newsArr.length>0
        ?(
                newsArr.map((item,index)=>{
                    return(
                        <li className="channelNews">
                            <img src={item.thumbnail_pic_s} alt={item.title}/>
                            <div >
                                <h3><Link to={`/news_detail/${item.uniquekey}`}>{item.title}</Link></h3>

                                <p>
                                    <span>{item.date}</span>
                                    <span>{item.author_name}</span>
                                </p>
                            </div>
                        </li>
                    )
                })
        ):'暂时没有新闻';
        return(
            <div>
                <ul>
                    {newsList}
                </ul>
            </div>
        )
    }
}
ChannelNewsBlock.propTypes={
    type:React.PropTypes.string.isRequired,
    count:React.PropTypes.number.isRequired,
};
export default ChannelNewsBlock;

