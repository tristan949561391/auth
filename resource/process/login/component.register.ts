/**
 * Created by Tristan on 16/10/2.
 */
import {Component, Input} from '@angular/core';
import {LoginService} from './service.login'
@Component({
    selector: '.register-container',
    templateUrl: '/resource/process/login/template/register.html',
    styleUrls: ['resource/process/login/template/login.css'],
})
export class RegisterComponent {
    @Input()
    registerModal
    mobile = ''
    mobileError = false
    validateCode = ''
    validateError = false
    cantSendNow = false
    longLime = null
    sendButtonTitle = 'send'
    countDown = null
    password=''
    passwordError=false
    passwordConfirm=''
    passwordConfirmError=false
    MOBILE_P = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;

    constructor(private loginService: LoginService) {
    }

    formatMobile() {
        this.mobile = this.mobile.replace(/[^0-9]/ig, "")
    }

    validateMobile() {
        this.mobileError = !this.MOBILE_P.test(this.mobile)
    }

    validatePassword() {
        this.passwordError = this.password.length<6
    }

    sendValidateCode() {
        if (!(this.mobileError = !this.MOBILE_P.test(this.mobile))) {
            this.loginService.sendVcode(this.mobile, (data)=> {
                    this.cantSendNow = true
                    this.longLime = 60
                    this.sendButtonTitle = '(' + this.longLime + 's)resend'
                    this.countDown = setInterval(()=> {
                        this.longLime--
                        this.sendButtonTitle = '(' + this.longLime + 's)resend'
                        if (this.longLime == 0) {
                            this.stopCountDown()
                        }
                    }, 1000)
                },
                (error)=> {
                    this.mobileError=true
                }
            )

        }
    }




    stopCountDown() {
        this.sendButtonTitle = 'send'
        this.cantSendNow = false
        clearInterval(this.countDown)
    }



    getRegisterCode() {
        this.validateMobile()
       this.validateError=this.validateCode.length<6
        this.validatePassword()
        this.passwordConfirmError=this.password!=this.passwordConfirm||this.passwordConfirm.length<=6
       if(this.mobileError||this.validateError||this.passwordError||this.passwordConfirmError){
           alert("检查表单")
           return
       }
       this.loginService.register(this.mobile,this.validateCode,this.password,(res)=>{
           alert("注册成功")
       },(err)=>{
           alert("注册失败")
       })
    }


}