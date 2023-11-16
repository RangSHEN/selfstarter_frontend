import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntrepreneursService} from "../../services/entrepreneurs.service";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../../model/page.response.model";
import {Entrepreneur} from "../../model/entrepreneur.model";

@Component({
  selector: 'app-entrepreneurs',
  templateUrl: './entrepreneurs.component.html',
  styleUrls: ['./entrepreneurs.component.css']
})


export class EntrepreneursComponent implements OnInit {
  searchFormGroup!: FormGroup;
  entrepreneurFormGroup!: FormGroup;
  pageEntrepreneurs!: Observable<PageResponse<Entrepreneur>>
  errorMessage!: string;
  currentPage: number=0;
  pageSize: number=5;
  submitted: boolean = false;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private entrepreneurService : EntrepreneursService) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control('')
    })

    this.entrepreneurFormGroup = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      companyName: ["", Validators.required],
      user: this.fb.group({
        email:["",[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password:["",Validators.required]
      })
    })
    this.handleSearchEntrepreneur();
  }


  getModal(content: any){
    this.submitted=false;
    this.modalService.open(content, { size: 'xl' })

  }


  handleSearchEntrepreneur() {
    let keyword = this.searchFormGroup.value.keyword
    this.pageEntrepreneurs = this.entrepreneurService.searchEntrepreneurs(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchEntrepreneur();
  }

  handleDeleteEntrepreneur(i: Entrepreneur) {
    let conf = confirm("Are you sure?");
    if(!conf) return;

    this.entrepreneurService.deleteEntrepreneur(i.entrepreneurId).subscribe({
      next: ()=>{
        this.handleSearchEntrepreneur();
      },
      error: err => {
        alert(err.message());
        console.log(err)
      }
    })

  }

  onCloseModal(modal: any) {

  }

  onSaveEntrepreneur(modal: any) {

  }
}

