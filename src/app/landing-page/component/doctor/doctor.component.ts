import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {User} from '../../models/user';
import {LoginService} from '../../../login/services/login.service';
import {LandingPageService} from '../../services/landing-page.service';
import {Doctor} from '../../models/doctor';

@Component({
  selector: 'app-doctor',
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
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
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
