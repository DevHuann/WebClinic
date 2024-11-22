import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Clinic} from '../../../models/clinic';
import {LandingPageService} from '../../../services/landing-page.service';
import {MatDialog} from '@angular/material/dialog';
import {ListRequest} from '../../../models/listRequest';
import {DialogClinicComponent} from '../dialog-clinic/dialog-clinic.component';
import {DialogEditClinicComponent} from '../dialog-edit-clinic/dialog-edit-clinic.component';
import {Doctor} from '../../../models/doctor';
import {DialogDoctorComponent} from '../dialog-doctor/dialog-doctor.component';
import {DialogEditDoctorComponent} from '../dialog-edit-doctor/dialog-edit-doctor.component';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
    imports: [
      MatPaginator,
      FormsModule,
      MatButton,
      MatIcon,
      MatFabButton,
      MatMiniFabButton
    ],
  templateUrl: './doctor-management.component.html',
  styleUrl: './doctor-management.component.css'
})
export class DoctorManagementComponent implements OnInit{
  listDoctor: Doctor[] = [];
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  search = '';
  pageCurrent = 1;
  constructor(private landingPageService: LandingPageService, private dialog: MatDialog) { }
  ngOnInit(){
    this.getDoctor()
  }
  getDoctor(){
    let data: ListRequest = {
      search: this.search,
      pageIndex: this.pageCurrent,
      pageSize: this.pageSize
    };
    this.landingPageService.listDoctor(data).subscribe(res => {
      this.listDoctor = res.listDoctor
      this.length = res.totalRecords
    })
  }

  handleAdd() {
    this.dialog.open(DialogDoctorComponent, {
      width: '30%'
    }).afterClosed().subscribe(res => {
      this.getDoctor();
    });
  }
  handleEdit(doctor: Doctor) {
    this.dialog.open(DialogEditDoctorComponent,{
      width: "30%",
      data: doctor
    }).afterClosed().subscribe(res =>{
      this.getDoctor();
    })
  }
  handleSearch() {
    let data: ListRequest = {
      search: this.search,
      pageIndex: 1,
      pageSize: this.pageSize
    };
    this.landingPageService.listDoctor(data).subscribe(res => {
      this.listDoctor = res.listDoctor;
      this.length = res.totalRecords
    })
  }
  handleDelete(id: string) {
    if(confirm("Bạn có chắc chắn muốn xóa ?")){
      this.landingPageService.deleteDoctor(id).subscribe(res => {
        this.getDoctor()
      })
    }
  }
  change(event: PageEvent) {
    let data: ListRequest = {
      search: this.search,
      pageIndex: (event.pageIndex + 1),
      pageSize: event.pageSize
    };
    this.landingPageService.listDoctor(data).subscribe(res => {
      this.listDoctor = res.listDoctor;
    })
    this.pageCurrent = event.pageIndex + 1
  }

  formatIsoDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
