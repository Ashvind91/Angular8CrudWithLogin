import { Component, OnInit,ViewChild } from '@angular/core';
import {CommonService} from '../common/services/common.service';
import {Router} from "@angular/router";
import { MatTableDataSource,MatPaginator,MatSort,MatDialog } from '@angular/material';
import { UserlistViewModel } from "../common/models/userlist-view-model"

import {AddComponent} from '../dialog-box/add/add.component';
import {EditComponent} from '../dialog-box/edit/edit.component';
import {DeleteComponent} from '../dialog-box/delete/delete.component';

export interface UserData {
  id: string;
  _id: string;
  Name: string;
  Designation: string;
  Salary:string;
}

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.css']
})
export class InlineEditComponent implements OnInit {
// Define columns which shown in table Grid
  displayedColumns: string[] = ['id','_id','Name', 'Designation', 'Salary','Action'];  
  // Define variables
  dataSource : MatTableDataSource<any>;
  users: UserData[] = [];
  id: number; 
  // Define view childs 
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;
  // Implement constructor
  constructor(private router: Router, private _commonService: CommonService,private dialog:MatDialog) { }

  ngOnInit() {
    this.bindList();
  }

  bindList()
  {
   this._commonService.getAllItems().subscribe(data => { 
     var listData=data['data'];
     
     for (let i = 0; i < listData.length; i++) {
        this.users.push(this.createNewUser(listData[i],i));
       }     
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);

    // Implement the pagination and sorting 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   })
  } 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

/** Builds and returns a new array as need to modify existing array. */
createNewUser(i:any,index:number): UserData {
    return {
    id: (index + 1).toString(),
    Name: i.Name,
    _id:i._id,
    Designation:i.Designation,
    Salary:i.Salary
  };
}
// Edit, Add and delete
addNew(user: UserlistViewModel) {
  const dialogRef = this.dialog.open(AddComponent, {
    data: {user: user }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.dataSource.data.push(this._commonService.getDialogData());
        this.refreshTable();
  }
  });  
}
startEdit(i: number, uniqueid: number, Name: string, Designation: string, Salary: string) {
  debugger;
  this.id = uniqueid;
  const dialogRef = this.dialog.open(EditComponent, {
    data: {id:i,_id: uniqueid, Name: Name, Designation: Designation, Salary: Salary} 
  });

  dialogRef.afterClosed().subscribe(result => {
    debugger;
    if (result === 1) {
      debugger;
      // When using an edit things are little different, firstly we find record inside DataService by id
      const foundIndex = this.dataSource.data.findIndex(x => x._id === this.id);
      // Then you update that record using data from dialogData (values you enetered)
      this.dataSource.data[foundIndex] = this._commonService.dialogData;
      // And lastly refresh table
      this.refreshTable();
    }
  });
}
private refreshTable() {
  // If there's no data in filter we do update using pagination, next page or previous page  
  this.paginator._changePageSize(this.paginator.pageSize);
    // If there's something in filter, we reset it to 0 and then put back old value
  
  }
}

