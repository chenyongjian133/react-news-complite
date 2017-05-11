import React,{Component} from 'react';
import {Link} from 'react-router';
import {Card} from 'antd';
import axios from 'axios';
class MobileNewsImageBlock extends Component{
    constructor(props){
        super(props);
        this.state={
            newsArr:''
        }
    }

    componentWillMount() {
        let {type,count}=this.props;
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        axios.get(url)
            .then(response=>{
                let newsArr=response.data;
                this.setState({newsArr})
            })
            .catch(error=>{console.log(error.message);})
    };
    render(){
        let {newsArr}=this.state;
        let NewsList=newsArr.length>0
        ?(
               newsArr.map((it,i)=>{
                    return(
                        <Card key={i} className="m_article list-item special_section clearfix">
                            <Link to={`/news_detail/${it.uniquekey}`}>
                                <div className="m_article_img">
                                    <img src={it.thumbnail_pic_s} alt={it.title}/>
                                </div>
                                <div className="m_article_info">
                                    <div className="m_article_title">
                                        <span>{it.title}</span>
                                    </div>
                                    <div className="m_article_desc clearfix">
                                        <div className="m_article_desc_l">
                                            <span className="m_article_channel">{it.realtype}</span>
                                            <span className="m_article_time">{it.date}</span>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Card>
                    )
               })
        )
        :'没有加载到任何新闻';
        return(
            <div>
                {NewsList}
            </div>
        )
    }
}
MobileNewsImageBlock.propTypes={
    type:React.PropTypes.string.isRequired,
    count:React.PropTypes.number.isRequired
};
export default MobileNewsImageBlock