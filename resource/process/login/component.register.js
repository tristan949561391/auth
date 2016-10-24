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
var RegisterComponent = (function () {
    function RegisterComponent(loginService) {
        this.loginService = loginService;
        this.mobile = '';
        this.mobileError = false;
        this.validateCode = '';
        this.validateError = false;
        this.cantSendNow = false;
        this.longLime = null;
        this.sendButtonTitle = 'send';
        this.registerCode = '';
        this.countDown = null;
        this.MOBILE_P = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    }
    RegisterComponent.prototype.formatMobile = function () {
        this.mobile = this.mobile.replace(/[^0-9]/ig, "");
    };
    RegisterComponent.prototype.validateMobile = function () {
        this.mobileError = !this.MOBILE_P.test(this.mobile);
    };
    RegisterComponent.prototype.sendValidateCode = function () {
        var _this = this;
        if (!(this.mobileError = !this.MOBILE_P.test(this.mobile))) {
            this.loginService.sendVcode(this.mobile, function (data) {
                _this.cantSendNow = true;
                _this.longLime = 60;
                _this.sendButtonTitle = '(' + _this.longLime + 's)resend';
                _this.countDown = setInterval(function () {
                    _this.longLime--;
                    _this.sendButtonTitle = '(' + _this.longLime + 's)resend';
                    if (_this.longLime == 0) {
                        _this.stopCountDown();
                    }
                }, 1000);
            }, function (error) {
                _this.mobileError = true;
            });
        }
    };
    RegisterComponent.prototype.getRegisterCode = function () {
        if (this.registerCode.length == 0) {
            this.registerCode = 'asdasdasdasd';
            return;
        }
        else {
            this.registerCode = '';
            return;
        }
    };
    RegisterComponent.prototype.stopCountDown = function () {
        this.sendButtonTitle = 'send';
        this.cantSendNow = false;
        clearInterval(this.countDown);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RegisterComponent.prototype, "registerModal", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            selector: '.register-container',
            templateUrl: '/resource/process/login/template/register.html',
            styleUrls: ['resource/process/login/template/login.css'],
        }), 
        __metadata('design:paramtypes', [service_login_1.LoginService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=component.register.js.map