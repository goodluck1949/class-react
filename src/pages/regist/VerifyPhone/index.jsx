import React, { Component } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  Button,
  WhiteSpace,
  Toast,
} from "antd-mobile";
import { createForm } from "rc-form";
import "./index.css";
import { reqVerifyPhone } from "@api/regist";
import { reqVerifyCode } from "@api/common";
class VerifyPhone extends Component {
  state = {
    isDisabled: true,
  };
  componentDidMount() {
    window.verifyCallback = async (res) => {
      console.log(res);
      if (res.ret === 0) {
        try {
          //服务器验证
          await reqVerifyCode(res.randstr, res.ticket);
          //做其他事
          // this.props.callback()
          this.verifyPhone()
          console.log("验证成功");
        } catch (error) {
          Toast.fail(error, 3);
        }
      }
    };
  }

  //用户输入手机号,表单验证
  validator = (rule, value, callback) => {
    const regPhone = /^[1]([1-9])[0-9]{9}$/;
    let isDisabled = true;
    if (regPhone.test(value)) {
      isDisabled = false;
    }
    this.setState({ isDisabled });
    callback();
  };
  //验证用户手机是否注册
  verifyPhone = async () => {
    try {
      const phone = this.props.form.getFieldValue("phone");
      await reqVerifyPhone(phone);
      console.log("success");
    } catch (error) {
      Toast.fail(error, 3);
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <WhiteSpace />
          <InputItem
            clear
            placeholder="请输入手机号"
            {...getFieldProps("phone", {
              rules: [{ validator: this.validator }],
            })}
          >
            <span>+86</span>
            <Icon type="down" />
          </InputItem>
        </WingBlank>
        <WingBlank>
          <WhiteSpace />
          <Button
            type="warning"
            className="warning-btn"
            disabled
            style={{ display: this.state.isDisabled ? "block" : "none" }}
          >
            下一步
          </Button>
          <Button
            type="warning"
            className="warning-btn"
            style={{ display: !this.state.isDisabled ? "block" : "none" }}
            id="TencentCaptcha"
            data-appid="2030765311"
            data-cbfn="verifyCallback"
          >
            下一步
          </Button>
        </WingBlank>
      </div>
    );
  }
}
export default createForm()(VerifyPhone);
