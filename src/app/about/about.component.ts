import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  inputEvent(event){
    // Return date object 
    console.log(event.value);
  }
  changeEvent(event){
    // Return date object
    console.log(event.value);
  }
 
}
