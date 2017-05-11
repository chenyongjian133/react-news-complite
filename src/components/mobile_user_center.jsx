import React,{Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {Card,Tabs,Modal,Upload,Icon} from 'antd';
const TabPane=Tabs.TabPane;
class MobileUserCenter extends Component{
    constructor(props){
        super(props);
        this.state={
            comments:[],
            collections:[],
            previewImage:'',
            fileList:[{
                uid:-1,
                name:'meinv.png',
                status:'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]

        }
    }
    //定义退出账号方法
    exit=()=>{
      localStorage.removeItem('user_KEY');
    };
    // 图片上传固定方法 是否阅览 阅览路径或缩略图  改变时重置状态
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });
    componentDidMount() {
        let {userId}=JSON.parse(localStorage.getItem('user_KEY') || '[]');
        if(!userId){return};
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + userId;
        // 请求成功跟新收藏列表状态
        axios.get(url)
            .then(response=>{
                let collections=response.data;
                this.setState({collections})
            })
            .catch(error=>{console.log(error.message);});
        "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + userId;
        // 请求成功跟新评论列表状态
        axios.get(url)
            .then(response=>{
                let comments=response.data;
                this.setState({comments})
            })
            .catch(error=>{console.log(error.message);});
    }
    render(){
        //图片上传固定
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let {comments,collections}=this.state;
        let collectionsList=collections.length>0
        ?(
                collections.map((item,index)=>{
                    return(
                        <Card key={index} title={item.uniquekey} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                            <p>{item.Title}</p>
                        </Card>
                    )
                })
        ):'您还没有收藏任何的新闻，快去收藏一些新闻吧';
        let commentsList=comments.length>0
            ?(
                comments.map((item,index)=>{
                    return(
                        <Card key={index} title={`于：${item.datetime}评论了文章：${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                            <p>{item.Comments}</p>
                        </Card>
                    )
                })
            ):'您还没有发表过任何评论';
        return(
            <div>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1" style={{padding:'10px'}}>
                        {collectionsList}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2" style={{padding:'10px'}}>
                        {commentsList}
                    </TabPane>
                    <TabPane tab="头像上传" key="3" style={{padding:'10px'}}>
                        <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange} multiple="true"
                        >
                            {uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </TabPane>
                    <TabPane tab="个人中心" key="4">
                        <Icon type="meh-o"/><a href="/" onClick={this.exit}>退出账号</a>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default MobileUserCenter