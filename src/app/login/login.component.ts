import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonService} from '../common/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder,private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this._commonService.login(this.loginForm.controls.username.value).subscribe(data => {
      console.log(data);
      if(data['status'] === 200) {
        window.localStorage.setItem('currentUser', JSON.stringify(data['data']));
        window.localStorage.setItem('token', data['token']);
        this.router.navigate(['home']);
      }else {
        this.invalidLogin = true;
        alert('User is not found. Please check credentials.');
      }
    },
    error  => {
      this.invalidLogin = true;
      console.log("Rrror", error);      
      }    
    );
  }

}
