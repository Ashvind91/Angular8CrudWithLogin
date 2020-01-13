import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs-observable";
import {CommonService} from '../common/services/common.service'
import { UserlistViewModel } from "../common/models/userlist-view-model"
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // template: `
  //   <app-add-user [childMessage]="parentMessage"></app-add-user>    
  // `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //parentMessage = "message from parent"
  totalRec : number;
  page: number = 1;
  userlist: any;
  fullName:string;
  constructor(private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    let token = localStorage.getItem('token'); 
    let UserInfo=JSON.parse(localStorage.getItem('currentUser'));
    if (token) {
    this.bindList();
    this.fullName=UserInfo.Name;
    }
    else{
      this.logOut();
    }
  }

 bindList()
 {
  this._commonService.getAllItems().subscribe(data => { 
    console.log(data['data']);
    this.userlist=data['data'];
    this.totalRec = this.userlist.length;
  })
 }

  editUser(user: UserlistViewModel): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user._id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

  deleteUser(user: UserlistViewModel) {
    if(confirm("Are you sure to delete "+user.Name + "?")) {
      console.log("Implement delete functionality here");
    
      this._commonService.deleteRecord(user._id).subscribe(
      data => {
        this.bindList();
      },
      error => {
      });
    }
  }
  RedirectToInline()
  {
    this.router.navigate(['inline-edit']);
  }
  logOut()
  {
     // remove user from local storage to log user out
     localStorage.removeItem('token');
     this.router.navigate(['login']);
  }
}
