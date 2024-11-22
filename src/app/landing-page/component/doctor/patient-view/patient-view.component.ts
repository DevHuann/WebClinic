import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Patient} from '../../../models/patient';
import {LandingPageService} from '../../../services/landing-page.service';
import { Router} from '@angular/router';
import {Appointment} from '../../../models/appointment';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {DialogRef} from '@angular/cdk/dialog';
import {MatDialog} from '@angular/material/dialog';
import {DialogAppointmentComponent} from '../dialog-appointment/dialog-appointment.component';

@Component({
  selector: 'app-patient-view',
  standalone: true,
  imports: [MatTabsModule, MatIcon, MatMiniFabButton],
  templateUrl: './patient-view.component.html',
  styleUrl: './patient-view.component.css'
})
export class PatientViewComponent implements OnInit {
  patient: Patient = {
    id: '',
    fullName: '',
    address: '',
    email: '',
    phoneNumber: '',
    patientAvatar: '',
    patientIdentity: '',
    patientNationality: '',
    patientGender: '',
    patientMaritalStatus: '',
    patientDob: '',
    patientAge: '',
    dateCreated: '',
  }
  patientId: string = ''
  patientQueueSubscription: Subscription | undefined
  appointmentsHistory: Appointment[] = []

  constructor(
    private landingPageService: LandingPageService,
    private route: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.patientQueueSubscription = this.landingPageService.PatientQueue.subscribe(patientId => {
      if (patientId != '') {
        this.patientId = patientId;
        this.getPatientById()
        this.getAppointmentsHistory()
      } else this.route.navigate(['/doctor/patient-management'])
    })
  }

  private getPatientById() {
    this.landingPageService.getPatientById(this.patientId).subscribe(res => {
      this.patient = res;
    })
  }

  private getAppointmentsHistory() {
    this.landingPageService.getListAppointmentCompletedByPatientId(this.patientId).subscribe(res =>
      this.appointmentsHistory = res)
  }

  handleAddAppointment(patient: Patient) {
    this.dialog.open(DialogAppointmentComponent, {
      width: '20%',
      data: patient
    }).afterClosed().subscribe(res => {
      // this.getClinic();
    });
  }

  formatIsoDate(isoDate: Date): string {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
