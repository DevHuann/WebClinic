import { Component } from '@angular/core';
import {DialogClinicComponent} from '../admin/dialog-clinic/dialog-clinic.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogAppointmentComponent} from './dialog-appointment/dialog-appointment.component';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {LoginService} from '../../../login/services/login.service';
import {LandingPageService} from '../../services/landing-page.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatIconButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  isOpen = true;
  isFuncAvatar = false;
  user: User = {
    id : '',
    email : '',
    phoneNumber : '',
    fullName : ''
  };
  constructor(private router: Router, private loginService: LoginService, private landingPageService: LandingPageService) { }
  ngOnInit(): void {
    const tokenObj = this.loginService.token();
    const userId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.landingPageService.getUserById(userId).subscribe(res => {
      this.user = res;
    })
  }

  handleClick() {
    this.isFuncAvatar = !this.isFuncAvatar;
  }

  handleLogout() {
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

}
