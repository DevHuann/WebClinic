import {Component, model, ModelSignal, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {Appointment} from '../../../models/appointment';
import {LandingPageService} from '../../../services/landing-page.service';
import {LoginService} from '../../../../login/services/login.service';
import {
  ListAppointmentByIdAndDateRequest
} from '../../../models/listAppointmentByIdAndDateRequest';
import {Patient} from '../../../models/patient';
import {NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, MatIcon, MatMiniFabButton, NgClass],
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.css'
})
export class AppointmentManagementComponent implements OnInit{
  selected = model<Date | null>(null);
  selectedDateISO:string | undefined=''
  doctorId:string=''
  listAppointment:Appointment[]=[]
  patient!:Patient
  data:ListAppointmentByIdAndDateRequest={
    id:'',
    date:''
  }
  constructor(private landingPageService: LandingPageService,
              private loginService:LoginService,
              private dialog: MatDialog) {
  }
  ngOnInit() {
    const tokenObj = this.loginService.token();
    this.doctorId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.data.id=this.doctorId
  }

  onDateSelected(date: Date) {
    const newDate = new Date(this.selected()||'');
    newDate.setHours(newDate.getHours() + 7);
    this.selectedDateISO = newDate.toISOString();
    this.data.date=this.selectedDateISO;
    this.landingPageService.getListAppointmentByClinicIdAndDateAndNotYetConfirmed(this.data).subscribe(res=>{
      this.listAppointment = res;

    })
  }
  formatIsoDate(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  handleConfirmArriveStatus(appointment: Appointment) {
    if (confirm("Bệnh nhân đã đến?")){
      this.landingPageService.confirmArriveStatus(appointment.id).subscribe(res =>{
        this.onDateSelected(appointment.appDate)
      })
    }
  }
}
