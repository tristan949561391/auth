/**
 * Created by Tristan on 16/10/2.
 */
import {Component} from '@angular/core';
import {LoginService} from './service.login'

@Component({
    selector: '.application',
    templateUrl: '/resource/process/login/template/login.html',
    styleUrls: ['resource/process/login/template/login.css'],
    providers: [LoginService]
})
export class LoginCompone {
    loginPage=true
    username = ''
    password = ''
    usernameError = false
    passwordError = false
    usernameErrorMsg = ''
    passwordErrorMsg = ''

    constructor(private loginService: LoginService) {}

    submitRegister() {
        this.usernameError = this.username.length <= 6
        this.passwordError = this.password.length <= 6
        if (this.usernameError == false && this.passwordError == false) {
            //执行登录的逻辑
            this.loginService.login(this.username, this.password,
                (data)=> {
                    window.location.href = '/'
                },
                (err)=> {
                    if (err.status == 463) {
                        this.usernameErrorMsg = '无该用户'
                        this.passwordErrorMsg = ''
                        return
                    }
                    if (err.status = 464) {
                        this.usernameErrorMsg = ''
                        this.passwordErrorMsg = '密码错误'
                        return
                    }
                })
        }
        return false
    }
}