/**
 * Created by Tristan on 16/10/23.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  login(username, password, callbackSuccess, callbackErr) {
    let loginUrl = '/login'
    let timestamp = Date.now()
    this.http.post(loginUrl, {
      username: username,
      password: password,
      timestamp:timestamp
    })
      .map(res=>res.json())
      .subscribe(data=>callbackSuccess(data), error=>callbackErr(error))
  }

  sendVcode(mobile, callbackSuccess, callbackErr) {
    var sendVcodeUrl = '/sendVcode'
    this.http.post(sendVcodeUrl, {mobile: mobile})
      .subscribe(data=>callbackSuccess(data), error=>callbackErr(error))
  }

  register(mobile, vcode, password, callbackSuccess, callbackErr) {
    var registerUrl = "/register"
    this.http.post(registerUrl, {
      username: mobile,
      vcode: vcode,
      password: password
    }).subscribe(data=>callbackSuccess(data), error=>callbackErr(error))
  }
}
