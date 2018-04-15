import '../../styles/css/modal.css';
import React from 'react';
import Pubsub from 'pubsub-js';
import {
	Tabs,
	Form,
	Icon,
	Button,
	Checkbox,
	Input,
	Select,
	notification
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

// 登录表单
class FormLogin extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		var form = this.props.form;
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				var localData = JSON.parse(localStorage.getItem('foxNewsData'));
				var user = localData.user;
				var password = localData.password;
				if (user == values.username && password == values.password) {
					// 重置表单
					form.resetFields();

					// 关闭模态框
					Pubsub.publish('CLOSE', false);

					// 登录成功提示
					notification['success']({
						message: '恭喜',
						description: '登录成功'
					})
					// 发布登录成功信息给header
					Pubsub.publish('LOGIN', true);

				}
			}
		});
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form;

		// 各种校验规则
		const userRules = {
			rules: [{
				required: true,
				message: '必填项'
			}]
		}

		const passwordRules = {
			rules: [{
				required: true,
				message: '必填项',
			}, {
				pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
				message: '用户名必须包含数字和字母'
			}, {
				min: 6,
				message: '最小长度不得少于6'
			}]
		};

		const rememberRules = {
			valuePropName: 'checked',
			initialValue: true,
		}



		return (
			<Form className="login" onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('username', userRules)(<Input key='user' prefix={<Icon type='user' />} type='text' placeholder='用户名' />)}
				</FormItem>

				<FormItem>
					{getFieldDecorator('password', passwordRules)(<Input key='pass' prefix={<Icon type='lock' />} type='password' placeholder='密码' />)}
				</FormItem>

				<FormItem>
					{getFieldDecorator('remember', rememberRules)(<Checkbox>记住密码</Checkbox>)}
          			<a className='login-form-forgot' href="" style={{
        fontSize: '.8rem'
      }}>忘记密码</a>
				</FormItem>

				<FormItem>
					<Button type='primary' htmlType='submit' className='login-form-button'>
           				登录
          			</Button>
				</FormItem>
			</Form>
		)
	}
}
const WrappedLoginForm = Form.create()(FormLogin);

// 注册表单
// 注册表单
// 注册表单
// 注册表单

class RegisterForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	// 比较两次密码输入是否一致
	compareToFirstPassword = (rules, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('两次密码输入不一致');
		} else {
			callback();
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		var form = this.props.form;
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				// 重置表单
				form.resetFields();

				// 因为没有远程服务器接口，所以本地存储
				let foxNewsData = {
					user: values.username,
					password: values.password
				}

				localStorage.setItem('foxNewsData', JSON.stringify(foxNewsData));

				// 注册成功提示
				notification['success']({
					message: '恭喜您',
					description: '注册成功'
				})

				// 关闭模态框
				Pubsub.publish('CLOSE', false);
			} else {
				notification['error']({
					message: '出错了',
					description: '注册失败！'
				})

				form.resetFields();
			}
		})
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form;

		// 各种校验规则
		const userRules = {
			rules: [{
				required: true,
				message: '必填项'
			}, {
				pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
				message: '用户名必须包含数字和字母'
			}]
		}

		const passwordRules = {
			rules: [{
				required: true,
				message: '必填项'
			}, {
				pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
				message: '密码必须包含数字和字母'
			}, {
				min: 6,
				message: '最小长度不得少于6'
			}]
		}

		const confirmRules = {
			rules: [{
				required: true,
				message: '必填项'
			}, {
				validator: this.compareToFirstPassword
			}]
		}

		const phoneRules = {
			rules: [{
				required: true,
				message: '必填项'
			}, {
				len: 11,
				message: '非有效手机号码'
			}]
		};

		const emailRules = {
			rules: [{
				required: true,
				message: '必填项'
			}, {
				type: 'email',
				message: '格式不正确'
			}]
		};

		const agreeRules = {
			valuePropName: 'checked',
			rules: [{
				required: true,
				message: '必选项'
			}]
		}

		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '86',
		})(
			<Select style={{
        width: 70
      }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
		);
		return (
			<Form className="regiterForm" onSubmit={this.handleSubmit}>
				<FormItem label='用户名'>
					{getFieldDecorator('username', userRules)(<Input key='usernmae' prefix={<Icon type='user' />} type='text' placeholder='请输入您的用户名' />)}
				</FormItem>
				<FormItem label='密码'>
					{getFieldDecorator('password', passwordRules)(<Input key='password' prefix={<Icon type='lock' />} type='password' placeholder='请输入您的密码' />)}
				</FormItem>
				<FormItem label='确认密码' key='confirm'>
					{getFieldDecorator('confirm', confirmRules)(<Input prefix={<Icon type='lock' />} type='password' placeholder='请确认您的密码' />)}
				</FormItem>
				<FormItem label='手机'>
    				{getFieldDecorator('phone', phoneRules)(<Input addonBefore={prefixSelector} type='number' placeholder='请输入您的手机号码' />)}
        		</FormItem>
        		<FormItem label='邮箱'>
        			{getFieldDecorator('email', emailRules)(<Input prefix={<Icon type='mail' />} type='email' placeholder='请输入您的邮箱' />)}
        		</FormItem>
        		<FormItem>
          			{getFieldDecorator('agreement', agreeRules)(<Checkbox>我同意相关 <a href="">协议</a></Checkbox>)}
        		</FormItem>
        		<FormItem>
          			<Button type="primary" htmlType="submit">注册</Button>
        		</FormItem>
			</Form>
		)
	}
}
const WrappedRegisterForm = Form.create()(RegisterForm);


// 整个模态组件
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false
		};
		this.closeHandler = this.closeHandler.bind(this);
	}

	closeHandler() {
		this.setState({
			isShow: false
		})
	}

	componentDidMount() {
		Pubsub.subscribe('OPEN', (msg, data) => {
			this.setState({
				isShow: data
			})
		})
		Pubsub.subscribe('CLOSE', (msg, data) => {
			this.setState({
				isShow: data
			})
		})
	}

	render() {
		let modalClassName = this.state.isShow ? 'modal-container' : 'modal-hidden';
		return (
			<div className={modalClassName}>
				<div className="modal-content">
					<Tabs defaultActiveKey="login">
    					<TabPane tab="登录" key="login">
    						<WrappedLoginForm></WrappedLoginForm>
    					</TabPane>
    					<TabPane tab="注册" key="register">
    						<WrappedRegisterForm></WrappedRegisterForm>
    					</TabPane>
					</Tabs>
					<Icon type='close' onClick={this.closeHandler}/>
				</div>
			</div>
		)
	}
}

export default Modal;