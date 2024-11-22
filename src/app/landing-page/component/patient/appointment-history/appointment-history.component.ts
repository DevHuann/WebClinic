import {Component, OnInit} from '@angular/core';
import {Appointment} from '../../../models/appointment';
import {LandingPageService} from '../../../services/landing-page.service';
import {LoginService} from '../../../../login/services/login.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAppointmentComponent} from '../dialog-appointment/dialog-appointment.component';
import {StarRatingComponent} from '../star-rating/star-rating.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-appointment-history',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css'
})
export class AppointmentHistoryComponent implements OnInit {
  appointmentsCompleted: Appointment[] = []
  appointmentsActive: Appointment[] = []
  patientId:string=''

  constructor(
    private landingPageService: LandingPageService,
    private loginService:LoginService,
    private dialog:MatDialog,
  ) {
  }

  ngOnInit(): void {
    const tokenObj = this.loginService.token();
    this.patientId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.loadAppointment()

  }

  formatIsoDate(isoDate: Date): string {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();


    return `${day}/${month}/${year}`;
  }
  loadAppointment(){
    this.landingPageService.getListAppointmentCompletedByPatientId(this.patientId).subscribe(res=>{
      this.appointmentsCompleted = res;
    })
    this.landingPageService.getListAppointmentActiveByPatientId(this.patientId).subscribe(res=>{
      this.appointmentsActive = res;
    })
  }

  handleReview(app: Appointment) {
    this.dialog.open(StarRatingComponent,{
      data:app,
      width:"20%"
    }).afterClosed().subscribe(res=>{
      this.loadAppointment()
    })
  }
  getArray(count: number): number[] {
    return Array(count);
  }
}
