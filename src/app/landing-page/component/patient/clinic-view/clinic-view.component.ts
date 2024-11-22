import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {LandingPageService} from '../../../services/landing-page.service';
import {Clinic} from '../../../models/clinic';
import {Doctor} from '../../../models/doctor';
import {MatIcon} from '@angular/material/icon';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-clinic-view',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './clinic-view.component.html',
  styleUrl: './clinic-view.component.css'
})
export class ClinicViewComponent implements OnInit {
  mapUrl:string = '';
  clinic: Clinic = {
    id: '',
    email: '',
    phoneNumber: '',
    address: '',
    clinicName: '',
    clinicUrl: '',
    openWeek: '',
    closeWeek: '',
    openSat: '',
    closeSat: '',
    openSun: '',
    closeSun: '',
    dateCreated: '',
    doctors: [{
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
    }]
  };
  clinicId = ''
  clinicQueueSubscription: Subscription | undefined

  constructor(
    private landingPageService: LandingPageService,
    private route: Router,
    protected sanitizer: DomSanitizer,

  ) {
  }


  ngOnInit(): void {
    this.clinicQueueSubscription = this.landingPageService.ClinicQueue.subscribe(clinicId => {
      if (clinicId != '') {
        this.clinicId = clinicId;
        this.getClinicById()

      }
      else this.route.navigate(['/patient/appointment'])
    })
  }

  private getClinicById() {
    this.landingPageService.getClinicById(this.clinicId).subscribe((res: any) => {
      this.clinic = res;
      this.mapUrl =
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyAGx-OjyNn10KsJ_OsE7cl2_qxg6mNBZyI&q=${this.clinic.address}+Việt+Nam`
    })
  }
  handleView(id:string) {
    this.landingPageService.DoctorQueue.next(id)
    this.route.navigate(['/patient/appointment/doctor-view'])
  }

}
