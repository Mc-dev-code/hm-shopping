// 存放所有登录相关的接口请求
import request from '@/utils/request'

// 外面使用时写这样 getPicCode(), 获取图形验证码的封装函数
const getPicCodeApi = () => {
  const res = request({
    url: 'index.php?s=/api/captcha/image',
    method: 'get'
  })
  return res
}
// 获取短信验证码的接口
const getMsgCodeApi = (captchaCode, captchaKey, mobile) => {
  const res = request({
    url: 'index.php?s=/api/captcha/sendSmsCaptcha',
    method: 'post',
    data: {
      form: {
        // 图形验证码
        captchaCode: captchaCode,
        // 图形验证码key
        captchaKey: captchaKey,
        // 接收验证码手机
        mobile: mobile
      }
    }
  })
  return res
}

// 登录的接口
const handleLoginApi = (isParty, mobile, smsCode) => {
  // console.log(isParty)
  // console.log(mobile)
  // console.log(smsCode)
  const res = request({
    url: 'index.php?s=/api/passport/login',
    method: 'post',
    data: {
      form: {
        // 是否是第三方登录,boolean
        isParty: isParty,
        // 手机号
        mobile: mobile,
        // 短信验证码,测试环境验证码为：246810
        smsCode: smsCode,
        partyData: {}
      }
    }

  })
  return res
}
export { getPicCodeApi, getMsgCodeApi, handleLoginApi }
