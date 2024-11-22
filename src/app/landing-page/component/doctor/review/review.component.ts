import {Component, OnInit} from '@angular/core';
import {LandingPageService} from '../../../services/landing-page.service';
import {Review} from '../../../models/review';
import {LoginService} from '../../../../login/services/login.service';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    MatIcon,
    MatProgressBarModule
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

export class ReviewComponent implements OnInit{
  reviews:Review[]=[]
  avg:string=''
  percentFiveStart:number=0
  percentFourStart:number=0
  percentThreeStart:number=0
  percentTwoStart:number=0
  percentOneStart:number=0

  constructor(
    private landingPageService:LandingPageService,
    private loginService:LoginService
  ) {
  }
  ngOnInit(): void {
    const tokenObj = this.loginService.token();
    const doctorId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.landingPageService.getListReviewByDoctorId(doctorId).subscribe(res=>{
      this.reviews=res
      const count=res.length
      const totalRate = res.reduce((sum, review) => sum + review.rating, 0);
      this.avg =(totalRate/count).toFixed(1);
      this.percentFiveStart = Math.floor(res.filter(review => review.rating === 5).length/count*100);
      this.percentFourStart = Math.floor(res.filter(review => review.rating === 4).length/count*100);
      this.percentThreeStart = Math.floor(res.filter(review => review.rating === 3).length/count*100);
      this.percentTwoStart = Math.floor(res.filter(review => review.rating === 2).length/count*100);
      this.percentOneStart = Math.floor(res.filter(review => review.rating === 1).length/count*100);

    })
  }
  getArray(count: number): number[] {
    return Array(count);
  }
  formatIsoDate(isoDate: Date): string {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
