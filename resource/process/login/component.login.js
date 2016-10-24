"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Tristan on 16/10/2.
 */
var core_1 = require('@angular/core');
var service_login_1 = require('./service.login');
var LoginCompone = (function () {
    function LoginCompone(loginService) {
        this.loginService = loginService;
        this.loginPage = true;
        this.username = '';
        this.password = '';
        this.usernameError = false;
        this.passwordError = false;
        this.usernameErrorMsg = '';
        this.passwordErrorMsg = '';
    }
    LoginCompone.prototype.submitRegister = function () {
        var _this = this;
        this.usernameError = this.username.length <= 6;
        this.passwordError = this.password.length <= 6;
        if (this.usernameError == false && this.passwordError == false) {
            //执行登录的逻辑
            this.loginService.login(this.username, this.password, function (data) {
                window.location.href = '/';
            }, function (err) {
                if (err.status == 463) {
                    _this.usernameErrorMsg = '无该用户';
                    _this.passwordErrorMsg = '';
                    return;
                }
                if (err.status = 464) {
                    _this.usernameErrorMsg = '';
                    _this.passwordErrorMsg = '密码错误';
                    return;
                }
            });
        }
        return false;
    };
    LoginCompone = __decorate([
        core_1.Component({
            selector: '.application',
            templateUrl: '/resource/process/login/template/login.html',
            styleUrls: ['resource/process/login/template/login.css'],
            providers: [service_login_1.LoginService]
        }), 
        __metadata('design:paramtypes', [service_login_1.LoginService])
    ], LoginCompone);
    return LoginCompone;
}());
exports.LoginCompone = LoginCompone;
//# sourceMappingURL=component.login.js.map