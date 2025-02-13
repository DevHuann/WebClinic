import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    MatFormField,
    MatIcon,
    MatButton,
    MatInput,
    MatIconButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  emergencyNumber = '0901 793 122';
  generalNumber = '0936 388 288';
  careNumber = '0936 245 499';

  navItems = [
    { label: 'Trang chủ', link: '' },
    { label: 'Giới thiệu', link: '' },
    { label: 'Chuyên khoa', link: '' },
    { label: 'Dịch vụ khám', link: '' },
    { label: 'Hỗ trợ khách hàng', link: '' },
    { label: 'Hỏi đáp chuyên gia', link: '' },
    { label: 'Tin tức', link: '' },
    { label: 'Sống khỏe', link: '' },
    { label: 'Liên hệ', link: '' }
  ];

  currentSlide = 0;

  services: any[] = [
    {
      id: 1,
      title: 'KHÁM CHỮA BỆNH',
      image: '/assets/images/medical-consultation.jpg',
      icon: 'medical_services',
      link: '/services/medical-consultation'
    },
    {
      id: 2,
      title: 'THAI SẢN TRỌN GÓI',
      image: '/assets/images/maternity-package.jpg',
      icon: 'pregnant_woman',
      link: '/services/maternity-package'
    },
    {
      id: 3,
      title: 'GÓI KHÁM ĐA KHOA',
      image: '/assets/images/multi-specialty.jpg',
      icon: 'local_hospital',
      link: '/services/multi-specialty'
    }
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.services.length;
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.services.length) % this.services.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
