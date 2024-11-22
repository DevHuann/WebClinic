import {Component, OnInit} from '@angular/core';
import {Doctor} from '../../../models/doctor';
import {Subscription} from 'rxjs';
import {LandingPageService} from '../../../services/landing-page.service';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {DialogClinicComponent} from '../../admin/dialog-clinic/dialog-clinic.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogAppointmentComponent} from '../dialog-appointment/dialog-appointment.component';

@Component({
  selector: 'app-doctor-view',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './doctor-view.component.html',
  styleUrl: './doctor-view.component.css'
})
export class DoctorViewComponent implements OnInit{
  doctorId:string=''
  doctorQueueSubscription: Subscription|undefined;
  doctor:Doctor ={
    id: '',
    fullName: '',
    address: '',
    email: '',
    phoneNumber: '',
    doctorAvatar: '',
    doctorSpeciality: '',
    doctorExperience: '',
    doctorDescription: '',
    doctorSpokenLanguages: '',
    doctorGender: '',
    doctorDob: '',
    consultFee: '',
    dateCreated: '',
    clinicId: '',
  }


  constructor(
    private landingPageService:LandingPageService,
    private route:Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.doctorQueueSubscription = this.landingPageService.DoctorQueue.subscribe(doctorId => {
      if (doctorId != '') {
        this.doctorId = doctorId;
        this.getDoctorById()

      }
      else this.route.navigate(['/patient/appointment'])
    })
  }
  private getDoctorById() {
    this.landingPageService.getDoctorById(this.doctorId).subscribe((res: any) => {
      this.doctor = res;
    })
  }

  handleAdd(doctor:Doctor) {
    this.dialog.open(DialogAppointmentComponent, {
      width: '20%',
      data:doctor
    }).afterClosed().subscribe(res => {
      // this.getClinic();
    });
  }
  formatIsoDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();


    return `${day}/${month}/${year}`;
  }
}
