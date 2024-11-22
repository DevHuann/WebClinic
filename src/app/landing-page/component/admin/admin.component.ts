import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {User} from '../../models/user';
import {LoginService} from '../../../login/services/login.service';
import {LandingPageService} from '../../services/landing-page.service';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
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
