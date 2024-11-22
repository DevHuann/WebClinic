import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingPageService} from '../../../services/landing-page.service';
import {CreateDoctorRequest} from '../../../models/createDoctorRequest';
import {CreateReviewRequest} from '../../../models/createReviewRequest';
import {DialogRef} from '@angular/cdk/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatIconModule, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, MatDialogActions, MatDialogClose],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit{

  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  dataForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private landingPageService :LandingPageService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: DialogRef<StarRatingComponent>
  ) {
  }
  ngOnInit(): void {
    this.dataForm= this.fb.group({
      appointmentId:[''],
      rating:[''],
      reviewText:[''],
    })

  }
  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;

  }
  handleSubmit() {
    this.dataForm.get('appointmentId')?.setValue(this.data.id);
    this.dataForm.get('rating')?.setValue(this.rating);

    const data: CreateReviewRequest = this.dataForm.value;
    this.landingPageService.createReview(data).subscribe(res => {
      this.dialogRef.close();
    })

  }
}
