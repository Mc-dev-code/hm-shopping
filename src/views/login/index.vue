<template>
    <div class="login">
      <!-- 头部 -->
      <van-nav-bar title="会员登录" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

      <!-- 主体 -->
      <div class="container">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>

        <div class="form">
          <div class="form-item">
            <input v-model = "tel" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
          </div>
          <div class="form-item">
            <input v-model = "picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
            <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
          </div>
          <div class="form-item">
            <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
            <button @click="getCode">
              {{ second === totalSecond ? '获取验证码' : `${second}秒后重新发送` }}
            </button>
          </div>
        </div>
        <div class="login-btn" @click = "login">登录</div>
      </div>
    </div>
</template>

<script>
import { getPicCodeApi, getMsgCodeApi, handleLoginApi } from '@/api/login'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 图形验证码的图片地址
      totalSecond: 60, // 倒计时总秒数,从多少秒开始倒计时
      second: 60, // 当前秒数,开定时器对second--
      timer: null, // 定时器id
      tel: '', // 手机号
      smsCode: '', // 短信验证码(Short Message Service)
      isParty: false // 是否第三方登录
    }
  },
  methods: {
    ...mapMutations('user', ['setUser']),
    // 登录页左上角返回
    onClickLeft () {
      this.$router.back()
    },
    // 获取短信验证码和倒计时
    async getCode () {
      // 倒计时之前效验一下手机号和图片验证码,没通过就不会往下走了
      if (!this.validatePhonePicCode()) {
        return false
      }
      // 没有定时器,事件是60秒才会开启倒计时
      if (this.timer === null && this.second === this.totalSecond) {
        // 发送获取验证码的请求
        const res = await getMsgCodeApi(this.picCode, this.picKey, this.tel)
        if (res.data.status === 200) {
          this.$toast('短信发送成功,请注意查收')
          // 测试环境验证码为: 246810
          // 短信请求发送成功才开倒计时,开启倒计时
          this.timer = setInterval(() => {
            this.second--
            // 如果负数了,就清除定时器
            if (this.second <= 0) {
              clearInterval(this.timer)
              this.timer = null
              this.second = this.totalSecond
            }
          }, 1000)
        } else {
          this.$toast('短信发送失败')
        }
        // console.log(res.data)
      }
    },
    // 获取图形验证码
    async getPicCode () {
      const res = await getPicCodeApi()
      // console.log(res.data.data)
      this.picKey = res.data.data.key
      this.picUrl = res.data.data.base64
      // console.log(this.picKey)
      // console.log(this.picUrl)
    },
    // 离开页面时要清除短信验证码的定时器
    clearTimer () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.second = this.totalSecond
      }
    },
    // 手机号和图形验证码效验是否合法,通过true,不通过false,只效验格式
    validatePhonePicCode () {
      // console.log(this.tel)
      // console.log(this.picCode)
      // 手机号输入不对
      if (!(/^1[3-9]\d{9}$/.test(this.tel))) {
        this.$toast('请输入正确的手机号')
        return false
      }
      // 图形验证码输入不合法
      if (!(/^[A-Za-z0-9]{4}$/.test(this.picCode))) {
        this.$toast('请输入合法的验证码')
        return false
      }
      return true
    },
    // 效验短信验证码是否合法
    validateSmsCode () {
      // console.log(this.smsCode)
      // 6位数字效验
      if (!(/^\d{6}$/.test(this.smsCode))) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    // 登录
    async login () {
      // 再效验一遍手机号和图形验证码
      this.validatePhonePicCode()
      // 效验短信验证码是否合法
      this.validateSmsCode()
      // 登录的请求
      const res = await handleLoginApi(this.isParty, this.tel, this.smsCode)

      // console.log(res.data)
      if (res.data.status === 200) {
        this.$toast('登录成功')
        this.$router.push('/')
        const user = { userId: res.data.data.userId, token: res.data.data.token }
        this.setUser(user)
      } else {
        this.$toast('登录失败')
        this.$router.push('/login')
      }
      // console.log(this.userId)
      // console.log(this.token)
    }
  },
  created () {
    // 页面一出现就获取图片验证码
    this.getPicCode()
    // this.$toast()
  },
  destroyed () {
    // 离开页面清除定时器
    this.clearTimer()
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
