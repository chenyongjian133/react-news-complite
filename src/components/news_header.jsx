import React from 'react';
import {Link} from "react-router";
import axios from 'axios';
import {Row,Col,Tabs,Button,message, Modal,Form,Input, Menu ,Icon} from 'antd';
const MenuItem=Menu.Item;
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;
import logo from '../images/logo.png';
class NewsHeader extends React.Component{
    //初始化用户名，用户id，key默认值和是否显示模态框
    constructor(props){
        super(props);
        this.state={
            username:null,
            userId:null,
            key:'top',
            show:false
        }
    }
    //切换key方法，参数event，判断event.key是否登录注册，清空表单值
    changeKey=event=>{
        if(event.key==="logAndReg"){
            this.setState({
                key:event.key,
                show:true,
            });
        this.props.form.resetFields();
        }
        this.setState({key:event.key});
    };
    //对话框显/隐--show，event
    handleShow=(show,event)=>{
        this.setState({show})
    };
    //用户退出
    handleOut=()=>{
        this.setState({
            username:null,
            userId:null
        });
        localStorage.removeItem('user_KEY');
        /*var a= document.createElement('a');
        a.setAttribute("href","/");
        a.onClick()*/
    };
    //将要挂载时读取用户信息

    componentWillMount() {
        //getItem方法，键值存在则取回对应的值，不存在则返回null
        let user = JSON.parse(localStorage.getItem('user_KEY'));
        //判断用户是否空，不空跟新状态
        if(user){
            this.setState({
                username:user.username,
                userId:user.userId
            })
        }
    }

    //表单提交--register，event
    handleSubmit=(register,event)=>{
        //阻止提交默认行为
        event.preventDefault();
        //判断action是否注册
        let action=register?'register':'login';
        //获取表单内容准备发请求
        let {username,password,r_username,r_password,rc_password}=this.props.form.getFieldsValue();
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_username=${r_username}&r_password=${r_password}&r_confirmPassword=${rc_password}`;
        axios.get(url)
            .then(response=>{
                if(register){
                    message.success('恭喜你，注册成功');
                }else if(response.data){
                    message.success('恭喜你，登录成功');
                    this.setState({
                        username:response.data.NickUserName,
                        userId:response.data.UserId
                    });
                    let {username,userId}=this.state;

                    localStorage.setItem('user_KEY', JSON.stringify({username, userId}));
                }else {
                    message.error('很遗憾，登录失败')
                }
            })
            .catch(error=>{
                console.log(error.message);
            });
        //隐藏对话框
        this.setState({
            show:false
        })
    };
    //渲染
    render(){
        //解构出state的所有属性
        let {username,userId,key,show}=this.state;
        //解构form表单的getFiledDecorator属性(方法)---参1标识必传，参2对象可传
        let {getFieldDecorator}=this.props.form;
        //判断用户名是否有渲染出虚拟DOM用UserMenu接收
        let UserMenu=username
        ?(
            <MenuItem key="person" className="person-center">
                <Button type='primary'>{username}</Button>&nbsp;&nbsp;
                <Button type='dashed'><Link to="/user_center">个人中心</Link></Button>&nbsp;&nbsp;
                <Button type='Ghost' onClick={this.handleOut}><Link to="/">退出</Link></Button>
            </MenuItem>
        )
        :(
          <MenuItem key="logAndReg" className="person-center">
              <Icon type="appstore">登录/注册</Icon>
          </MenuItem>
        );
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <Link to="/">
                            <div className="logo">
                                <img src={logo} alt="logo"/>
                                <span>ReactNews</span>
                            </div>
                        </Link>
                    </Col>
                    <Col span={19}>
                        <Menu onClick={this.changeKey} mode='horizontal' selectedKeys={[key]}>
                            <MenuItem key="top">
                                <Link to="/news_channel/top"><Icon type="appstore"></Icon>头条</Link>
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Link to={`/news_channel/guonei`}><Icon type="appstore"></Icon>国内</Link>
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Link to={`/news_channel/guoji`}><Icon type="appstore"></Icon>国际</Link>
                            </MenuItem>
                            <MenuItem key="yule">
                                <Link to={`/news_channel/yule`}><Icon type="appstore"></Icon>娱乐</Link>
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Link to={`/news_channel/yule`}><Icon type="appstore"></Icon>体育</Link>
                            </MenuItem>
                            <MenuItem key="keji">
                                <Link to={`/news_channel/keji`}><Icon type="appstore"></Icon>科技</Link>
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Link to={`/news_channel/shishang`}><Icon type="appstore"></Icon>时尚</Link>
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Link to={`/news_channel/shehui`}><Icon type="appstore"></Icon>社会</Link>
                            </MenuItem>
                            {UserMenu}
                        </Menu>
                        <Modal title='亲爱的用户' visible={show} okText="Cancel"
                        onOk={this.handleShow.bind(this,false)} onCancel={this.handleShow.bind(this,false)}>
                            <Tabs onChange={()=>this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this,false)}>
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
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
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
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(NewsHeader)