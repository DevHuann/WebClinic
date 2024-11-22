import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../../models/clinic';
import {LandingPageService} from '../../../services/landing-page.service';
import {MatDialog} from '@angular/material/dialog';
import {ListRequest} from '../../../models/listRequest';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {DialogClinicComponent} from '../dialog-clinic/dialog-clinic.component';
import {DialogEditClinicComponent} from '../dialog-edit-clinic/dialog-edit-clinic.component';
import {FormsModule} from '@angular/forms';
import {MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-clinic-management',
  standalone: true,
  imports: [
    MatPaginator,
    FormsModule,
    MatButton,
    MatIcon,
    MatFabButton,
    MatMiniFabButton
  ],
  templateUrl: './clinic-management.component.html',
  styleUrl: './clinic-management.component.css'
})
export class ClinicManagementComponent implements OnInit {
  listClinic: Clinic[] = [];
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  search = '';
  pageCurrent = 1;


  constructor(private landingPageService: LandingPageService, private dialog: MatDialog) {
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

  handleAdd() {
    this.dialog.open(DialogClinicComponent, {
      width: '30%'
    }).afterClosed().subscribe(res => {
      this.getClinic();
    });
  }

  handleEdit(clinic: Clinic) {
    this.dialog.open(DialogEditClinicComponent, {
      width: "30%",
      data: clinic
    }).afterClosed().subscribe(res => {
      this.getClinic();
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

  handleDelete(id: string) {
    if (confirm("Bạn có chắc chắn muốn xóa ?")) {
      this.landingPageService.deleteClinic(id).subscribe(res => {
        this.getClinic()
      })
    }
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

  formatIsoDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }


}
