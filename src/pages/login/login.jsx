import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'

import './login.less'
import logo from './images/logo.png'
/*
登录的路由组件 
 */


class Login extends Component {


  /*
  1.前台验证表单
  2.收集表单数据发送ajax请求
   */

  handleSubmit = event => {
    //阻止表单的默认事件
    event.preventDefault();

    //该方法已经自动的获取了表单中的数据
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log("提交登录的ajax请求",values);
      } else {
        console.log("验证失败");
      }

    })


    //手动的获取表单中的内容
    // const form = this.props.form;
    // const values = form.getFieldsValue();
    // console.log('handleSubmit()',values);
  }

  validatePwd = (rule, value, callback) => {
    console.log("validataPwd", rule, value);
    if(!value) {
      callback("密码必须输入");
    } else if (value.length<4) {
      callback("密码的长度不能小于4");
    } else if (value.length>12) {
      callback("密码的长度不能大于12");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码应该由英语，数字或者下划线组成");
    } else {
      callback();
    }
  }


  render () {

    const form = this.props.form;
    const { getFieldDecorator } = form;
    
    return (
      <div className="login">
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section className='login-content'>
          <div>
            <h2>用户登录</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {
                  getFieldDecorator('username', {// 配置对象: 属性名是一些特定的名称
                    initialValue: '', // 初始值
                    rules: [ // 声明式验证: 使用插件已定义好的规则进行验证
                      // 1).必须输入
                      // 2). 必须大于等于4位
                      // 3). 必须小于等于12位
                      // 4). 必须是英文、数字或下划线组成
                      { required: true, whitespace: true, message: '用户名是必须' },
                      { min: 4, message: '用户名不能小于4位'},
                      { max: 12, message: '用户名不能大于12位'},
                      { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                    ]

                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Username"
                    />
                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('password', {
                    initialValue: '', // 初始值
                    //自定义式验证
                    rules: [
                      { validator: this.validatePwd}
                    ]
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />
                  )
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    )
  }
}


/*
包装From组件会生成新的组件From（Login）
新的组件会向From组件传递form对象
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin