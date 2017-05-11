import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Row,Col,Tabs,Card,Modal,Icon,Upload,Button} from 'antd';
const TabPane=Tabs.TabPane;
class UserCenter extends React.Component{
    //初始化评论列表，收藏列表 上传图片固定结构
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
   // 图片上传固定方法 是否阅览 阅览路径或缩略图  改变时重置状态
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    //将挂载，根据本地用户id发送请求获取评论列表
    componentWillMount() {
        let {userId}=JSON.parse(localStorage.getItem('user_KEY'));
        if(!userId){return}
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
        axios.get(url)
            .then(response=>{
                this.setState({
                    comments:response.data
                })
            })
            .catch(error=>{
                console.log(error.message);
            });
        //再请求收藏列表数据
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
        axios.get(url)
            .then(response=>{
                this.setState({
                    collections:response.data
                })
            })
            .catch(error=>{
                console.log(error.message);
            });
    }
    //渲染
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
        //判断collections长度
        let collectionsList=collections.length>0
        ?(
            collections.map((item,index)=>{
                return(
                    <Card key={index} title={item.uniquekey} extra={<p><Link to={`/news_detail/${item.uniquekey}`}>查看</Link></p>}>
                        {item.Title}
                    </Card>
                )
            })
        )
        :'目前没有任何收藏';
        //判断comments长度
        let commentsList=comments.length>0
        ?(
            comments.map((item,index)=>{
                return(
                    <Card key={index} title={`与:${item.datetime}评论了文章:${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                        {item.Comments}
                    </Card>
                )
            })
        )
        :'您当前没有任何评论';
        return(
                <div>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Tabs>
                                <TabPane tab="文章列表" key="1">
                                    {collectionsList}
                                </TabPane>
                                <TabPane tab="评论列表" key="2">
                                    {commentsList}
                                </TabPane>

                                <TabPane tab="头像上传" key="3">
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

                            </Tabs>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </div>
        )
    }
}
export default UserCenter;
