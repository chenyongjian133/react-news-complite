import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Modal,Button,Tabs,Form,Input,Icon,message} from 'antd';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;
import logo from '../images/logo.png';
class MobileNewsHeader extends Component{
    //初始化 用户名，用户id，对话框是否可见
    constructor(props){
        super(props);
        this.state={
            username:null,
            userId:null,
            show:false
        }
    }
    //挂载，查看本地是否有存储
    componentWillMount() {
        let {username,userId}=JSON.parse(localStorage.getItem('user_KEY') || '[]');
        if(username){
            this.setState({
                username:username,
                userId:userId
            })
        }
    }
    //对话框是否显示---show
    show=show=>{
        this.setState({show})
    };
    //提交表单--regist,event
    handleSubmit=(regist,event)=>{
        event.preventDefault();
        let action=regist?'register':'login';
        const formData=this.props.form.getFieldsValue();
        const url = "http://newsapi.gugujiankong.com/Handler.ashx?action=" + action
            + "&username="+formData.username+"&password="+formData.password
            +"&r_userName=" + formData.r_username + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.rc_password;
        axios.get(url)
            .then(response=>{
                console.log(response.data);
                console.log(formData.r_username);
                if(regist){
                    message.success('注册成功');
                    // return;
                    /*let username=formData.r_username;
                    this.setState({
                        username
                    })
                    this.componentWillMount()*/
                }else {
                    if(response.data){
                        message.success(('登录成功'));
                        this.setState({
                            username:response.data.NickUserName,
                            userId:response.data.userId,
                        });
                        let {username,userId}=this.state;
                        localStorage.setItem('user_KEY',JSON.stringify({username,userId}));
                    }else {
                        message.error('登录失败')
                    }
                }
                this.props.form.resetFields();
                this.setState({show:false})
            })
            .catch(error=>{console.log(error.message);})
    };
    login=()=>{
        this.show(true)
    };
    render(){
        let {getFieldDecorator}=this.props.form;
        let {username}=this.state;
        const user=username?username:'登录';
        const UserShow=username
        ?(
            <div>
                <span  className="userInfo">{user}</span>
                <Link to="/user_center"><Icon type="inbox"></Icon></Link>
            </div>
        )
        :(
            <div>
                <span onClick={this.show.bind(this,true)} className="userInfo" >{user}</span>
                <Icon type="setting" onClick={this.login.bind(this)}></Icon>
            </div>
        );
        return(
            <div id="mobileheader">
                <header>
                    <a href="/">
                        <img src={logo} alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                    {UserShow}
                </header>
                <Modal title='用户中心' visible={this.state.show} okText='Cancel'
                onOk={this.show.bind(this,false)} onCancel={this.show.bind(this,false)} wrapClassName='vertical-center-modal'>
                    <Tabs type="card" onTabClick={()=>this.props.form.resetFields()}>
                        <TabPane tab="登录" key="1">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this,false)}>
                                <FormItem label='账号'>
                                    {
                                        getFieldDecorator('username')(
                                            <Input type='text' placeholder='请输入账号'/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='密码'>
                                    {
                                        getFieldDecorator('password')(
                                            <Input type='password' placeholder='请输入密码'/>
                                        )
                                    }
                                </FormItem>
                                <Button type='primary' htmlType='submit'>登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this,true)}>
                                <FormItem label='账号'>
                                    {
                                        getFieldDecorator('r_username')(
                                            <Input type='text' placeholder='请输入账号'/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='密码'>
                                    {
                                        getFieldDecorator('r_password')(
                                            <Input type='password' placeholder='请输入密码'/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='确认密码'>
                                    {
                                        getFieldDecorator('rc_password')(
                                            <Input type='password' placeholder='请确认密码'/>
                                        )
                                    }
                                </FormItem>
                                <Button type='primary' htmlType='submit'>注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(MobileNewsHeader);