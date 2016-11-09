/**
 * Created by Tristan on 16/10/2.
 */
import {Component} from '@angular/core';
import {LoginService} from '../../service/ser.login'
@Component({
    selector: '.application',
    templateUrl: 'template/login.html',
    styleUrls: ['template/style.css'],
    providers: [LoginService]
})
export class LoginComponent {
    loading = false
    usernameError=''
    passwordError=''

    constructor(private loginService: LoginService) {}

    submitLogin(username, password) {
        if (this.loading) {
            return false
        }
        if (username.trim() == '' ) {
            this.usernameError='输入用户名'
            return
        }
        if(password.trim() == ''){
            this.passwordError='输入密码'
            return
        }

        this.loading = true
        this.loginService.login(username, password, data=> {
                window.location.href = data.href || 'http://www.moondust.cc'
            },
            err=> {
                switch (err.status){
                    case 464:
                        this.passwordError='密码错误'
                        break;
                    case 463:
                        this.usernameError='无该用户'
                        break;
                    default:
                        this.usernameError='未知错误'
                        this.passwordError='未知错误'
                        break
                }
                this.loading=false
            })
        return false
    }
}
