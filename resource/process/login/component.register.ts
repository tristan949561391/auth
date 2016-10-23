/**
 * Created by Tristan on 16/10/2.
 */
import {Component, Input} from '@angular/core';
import {el} from "@angular/platform-browser/testing/browser_util";

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
    registerCode = ''

    MOBILE_P = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;

    formatMobile() {
        this.mobile = this.mobile.replace(/[^0-9]/ig, "")
    }

    validateMobile() {
        this.mobileError = !this.MOBILE_P.test(this.mobile)
    }

    sendValidateCode() {
        if (!(this.mobileError = !this.MOBILE_P.test(this.mobile))) {
            this.cantSendNow = true
            this.longLime = 60
            this.sendButtonTitle = '(' + this.longLime + 's)resend'
            var timeLock = setInterval(()=> {
                this.longLime--
                this.sendButtonTitle = '(' + this.longLime + 's)resend'
                if (this.longLime == 0) {
                    this.sendButtonTitle = 'send'
                    this.cantSendNow = false
                    window.clearInterval(timeLock)
                }
            }, 1000)
        }
    }

    getRegisterCode() {
        if (this.registerCode.length==0) {
            this.registerCode = 'asdasdasdasd'
            return
        }else{
            this.registerCode = ''
            return
        }
    }


}