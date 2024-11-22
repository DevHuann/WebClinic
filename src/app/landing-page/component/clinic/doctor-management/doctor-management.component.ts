import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {Doctor} from '../../../models/doctor';
import {LandingPageService} from '../../../services/landing-page.service';
import {MatDialog} from '@angular/material/dialog';
import {ListRequest} from '../../../models/listRequest';
import {DialogDoctorComponent} from '../dialog-doctor/dialog-doctor.component';
import {DialogEditDoctorComponent} from '../dialog-edit-doctor/dialog-edit-doctor.component';
import {LoginService} from '../../../../login/services/login.service';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
    imports: [
        MatIcon,
        MatMiniFabButton,
        MatPaginator,
        ReactiveFormsModule
    ],
  templateUrl: './doctor-management.component.html',
  styleUrl: './doctor-management.component.css'
})
export class DoctorManagementComponent {
  listDoctor: Doctor[] = [];
  constructor(private landingPageService: LandingPageService,
              private dialog: MatDialog,
              private loginService:LoginService
              ) { }
  ngOnInit(){
    this.getDoctor()
  }
  getDoctor(){
    const tokenObj = this.loginService.token();
    const clinicId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.landingPageService.listDoctorByClinicId(clinicId).subscribe(res => {
      this.listDoctor = res
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

  handleDelete(id: string) {
    if(confirm("Bạn có chắc chắn muốn xóa ?")){
      this.landingPageService.deleteDoctor(id).subscribe(res => {
        this.getDoctor()
      })
    }
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
