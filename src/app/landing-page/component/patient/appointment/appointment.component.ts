import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ListClinicComponent} from '../list-clinic/list-clinic.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    RouterOutlet,
    // ListClinicComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

}
