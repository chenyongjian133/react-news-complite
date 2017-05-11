import React from 'react';
import axios from 'axios';
import {Card,Col,Row,Form,Input,Button,notification,message} from 'antd';
const FormItem=Form.Item;
class NewsComments extends React.Component {
    //初始化评论
    constructor(props){
        super(props);
        this.state={
            comments:[]
        }
    };
    //将挂载获取评论
    componentWillMount() {
        let {newsId}=this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`;
        axios.get(url)
            .then(response=>{
                let comments=response.data.map(item=>{
                    return{
                        username:item.UserName,
                        comment:item.Comments,
                        dateTime:item.datetime
                    }
                });
                this.setState({comments})
            })
            .catch(error=>{
                console.log(error.message);
            })
    }
    //提交评论--event参数
    handleSubmit=event=>{
        event.preventDefault();
        let userId = JSON.parse(localStorage.getItem('user_KEY') || '[]').userId;
        console.log(userId);
        if(!userId){
            message.warn('请先登录');
            return
        }
        let {newsId}=this.props;
        let comment=this.props.form.getFieldValue('comment');
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${comment}`;
        axios.get(url)
            .then(response=>{
                message.success('提交评论成功');
                //再挂载刷新评论
                this.componentWillMount();
                //清空表单输入项
                this.props.form.resetFields();
            })
            .catch(error=>{
                console.log(error.message);
            })
    };
    //收藏方法
    handleCollection=()=>{
        let userId = JSON.parse(localStorage.getItem('user_KEY') || '[]').userId;
        console.log(userId);
        if(!userId){
            message.warn('请先登录');
            return
        }
        let {newsId}=this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`;
        axios.get(url)
            .then(response=>{
                notification.success({
                    message:'ReactNews',
                    description:'文章收藏成功'
                })
            })
            .catch(error=>{
                console.log(error.message);
            })
    };
    //接收父组件传过来的最新属性，条用componentWillReceiveProps(nextProps)
    componentWillReceiveProps(nextProps) {
        this.componentWillMount()
    }
    //渲染
    render(){
        let {comments}=this.state;
        let {getFieldDecorator}=this.props.form;
        let commentsList=comments.map((item,index)=>{
            return (
                   <Card key={index} title={item.username} extra={<p style={{color:'blue'}}>{`发布于： ${item.dateTime}`}</p>}>
                       {item.comment}
                   </Card>
                )
            });
        return (
            <div>
                {commentsList}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="你的评论" labelCol={{span:12}}>
                        {
                            getFieldDecorator('comment')(
                                <Input type="textarea" placeholder="请输入您的评论内容"/>
                            )
                        }
                    </FormItem>
                    <Row>
                        <Col span={12} push={6}>
                            <Button type='primary' htmlType='submit'>提交</Button>&nbsp;&nbsp;
                            <Button type='primary' onClick={this.handleCollection}>收藏该文章</Button>&nbsp;&nbsp;
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(NewsComments);