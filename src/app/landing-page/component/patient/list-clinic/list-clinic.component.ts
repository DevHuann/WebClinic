import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Clinic} from '../../../models/clinic';
import {LandingPageService} from '../../../services/landing-page.service';
import {MatDialog} from '@angular/material/dialog';
import {ListRequest} from '../../../models/listRequest';
import {DialogClinicComponent} from '../../admin/dialog-clinic/dialog-clinic.component';
import {DialogEditClinicComponent} from '../../admin/dialog-edit-clinic/dialog-edit-clinic.component';
import {Router} from '@angular/router';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-list-clinic',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    MatPaginator,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule
  ],
  templateUrl: './list-clinic.component.html',
  styleUrl: './list-clinic.component.css'
})
export class ListClinicComponent implements OnInit{
  listClinic: Clinic[] = [];
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  search = '';
  pageCurrent = 1;
  displayedColumns: string[]= ['email', 'phoneNumber', 'clinicName', 'address','view'];

  constructor(private landingPageService: LandingPageService,
              private route:Router,
              ) {
  }

  ngOnInit() {
    this.getClinic()
  }

  getClinic() {
    let data: ListRequest = {
      search: this.search,
      pageIndex: this.pageCurrent,
      pageSize: this.pageSize
    };
    this.landingPageService.listClinic(data).subscribe(res => {
      this.listClinic = res.listClinic
      this.length = res.totalRecords
    })
  }

  handleSearch() {
    let data: ListRequest = {
      search: this.search,
      pageIndex: 1,
      pageSize: this.pageSize
    };
    this.landingPageService.listClinic(data).subscribe(res => {
      this.listClinic = res.listClinic;
      this.length = res.totalRecords
    })
  }

  change(event: PageEvent) {
    let data: ListRequest = {
      search: this.search,
      pageIndex: (event.pageIndex + 1),
      pageSize: event.pageSize
    };
    this.landingPageService.listClinic(data).subscribe(res => {
      this.listClinic = res.listClinic;
    })
    this.pageCurrent = event.pageIndex + 1
  }



  handleView(id:string) {
    this.landingPageService.ClinicQueue.next(id)
    this.route.navigate(['/patient/appointment/clinic-view'])
  }
}
