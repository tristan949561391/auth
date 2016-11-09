/**
 * Created by Tristan on 16/10/2.
 */
import {Component, Input} from '@angular/core';
import {LoginService} from '../../service/ser.login'
@Component({
  selector: '.registerModule',
  templateUrl: 'template/register.html',
  styleUrls: ['template/style.css'],
})
export class RegisterComponent {
  @Input()
  registerModal

  MOBILE_P = /^1[34578]\d{9}$/

  mobileError = ''
  validateCodeError = ''
  passwordError = ''
  passwordConfirmError = ''
  sendLimit = 0
  countDown
  resend = false
  sending = false


  constructor(private loginService: LoginService) {
  }

  sendValidateCode(mobile) {
    if (!this.MOBILE_P.test(mobile)) {
      this.mobileError = '输入手机号'
      return
    }
    this.resend = true
    this.loginService.sendVcode(mobile, (data)=> {
        this.resend = false
        this.sendLimit = 59
        this.countDown = setInterval(()=> {
          this.sendLimit--
          if (this.sendLimit == 0) {
            this.stopCountDown()
          }
        }, 1000)
      },
      (error)=> {
        this.resend = false
        switch (error.status) {
          case 462:
            this.mobileError = '输入手机号'
            break
          case 465:
            this.validateCodeError = '发送太频繁'
            break
          case 467:
            this.mobileError = '此用户已被注册'
            break
          default:
            this.validateCodeError = '未知错误'
            break
        }
      }
    )
  }

  stopCountDown() {
    clearInterval(this.countDown)
  }

  doRegiste(mobile, vcode, password, passwordConfirm) {
    if (!this.MOBILE_P.test(mobile)) {
      this.mobileError = '输入手机号'
      return
    }

    if (vcode.length < 6) {
      this.validateCodeError = '验证码为六位'
      return
    }

    if (password.length < 6) {
      this.passwordError = '密码过不能低于六位'
      return
    }

    if (password != passwordConfirm) {
      this.passwordConfirmError = '密码不相同'
      return
    }

    this.sending = true
    this.loginService.register(mobile, vcode, password, data=> {
        this.sending = false
        window.location.href = data.href || 'http://www.moondust.cc'
      },
      err=> {
        this.sending = false
        switch (err.status) {
          case 589:
            this.mobileError = '参数不合法'
            break
          case 467:
            this.mobileError = '此用户已被注册'
            break
          case 466:
            this.validateCodeError = '验证码不正确'
            break
          default:
            this.mobileError = '未知错误'
            break
        }
      })
  }
}
