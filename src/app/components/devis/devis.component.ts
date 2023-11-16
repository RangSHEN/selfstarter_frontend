import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DevisService} from "../../services/devis.service";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../../model/page.response.model";
import {Devis} from "../../model/devis.model";
import {Entrepreneur} from "../../model/entrepreneur.model";
import {Client} from "../../model/client.model";
import {EntrepreneursService} from "../../services/entrepreneurs.service";
import {ClientsService} from "../../services/clients.service";

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})

export class DevisComponent implements OnInit {

  searchFormGroup!: FormGroup;
  devisFormGroup!: FormGroup;
  updateDevisFormGroup!: FormGroup;
  pageDevis$!: Observable<PageResponse<Devis>>;
  entrepreneurs$!: Observable<Array<Entrepreneur>>
  clients$!:  Observable<Array<Client>>
  currentPage: number=0;
  pageSize: number=5;
  errorMessage!: string;
  errorEntrepreneursMessage!: string;
  errorClientsMessage!: string;
  submitted: boolean = false;
  defaultEntrepreneur!: Entrepreneur;
  defaultClient!:Client;
  constructor(private modalService: NgbModal, private fb:FormBuilder, private devisService: DevisService, private entrepreneurService: EntrepreneursService, private clientService: ClientsService) {
  }

  ngOnInit(): void {
    //generate SearchForm
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    })
    //generate addDevisForm
    this.devisFormGroup = this.fb.group({
      devisName: ["", Validators.required],
      total: [0, Validators.required],
      devisDescription: ["", Validators.required],
      entrepreneur: [null, Validators.required],
      client: [null, Validators.required]
    })
    // generate alldevis
    this.handleSearchDevis();
  }


  getModal(content: any) {
    this.submitted = false;
    this.fetchEntrepreneurs();
    this.fetchClients();
    this.modalService.open(content, {size: 'xl'})
  }


  handleSearchDevis() {
    let keyword = this.searchFormGroup.value.keyword
    this.pageDevis$ = this.devisService.searchDevis(keyword,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.fetchEntrepreneurs();
    this.handleSearchDevis();
    this.fetchClients();
  }

  handleDeleteDevis(d: Devis) {
    let conf = confirm("Are you sure?")
    if (!conf) return;
    this.devisService.deleteDevis(d.devisId).subscribe({
      next: () => {
        this.handleSearchDevis();
      },
      error: err => {
        alert(err.message)
        console.log(err)
      }
    })
  }

  fetchEntrepreneurs() {
    this.entrepreneurs$ = this.entrepreneurService.findAllEntrepreneurs().pipe(
      catchError(err => {
        this.errorEntrepreneursMessage = err.message;
        return throwError(err);
      })
    )
  }

  fetchClients() {
    this.clients$ = this.clientService.findAllClients().pipe(
      catchError(err => {
        this.errorClientsMessage = err.message;
        return throwError(err);
      })
    )
  }

  onCloseModal(modal: any) {
    modal.close();
    this.devisFormGroup.reset();
  }

  onSaveDevis(modal: any) {
    this.submitted = true;
    console.log(this.devisFormGroup)
    if (this.devisFormGroup.invalid) return;
    this.devisService.saveDevis(this.devisFormGroup.value).subscribe({
      next: () => {
        alert("success Saving Devis");
        this.handleSearchDevis();
        this.devisFormGroup.reset();
        this.submitted = false;
        modal.close()
      }, error: err => {
        alert(err.message);
      }
    })
  }

  getUpdateModel(d: Devis, updateContent: any) {
    this.fetchEntrepreneurs();
    this.fetchClients();
    this.updateDevisFormGroup = this.fb.group({
      devisId: [d.devisId, Validators.required],
      devisName: [d.devisName, Validators.required],
      total: [d.total, Validators.required],
      devisDescription: [d.devisDescription, Validators.required],
      entrepreneur: [d.entrepreneur, Validators.required],
      client: [d.client, Validators.required]
    })
    this.defaultEntrepreneur = this.updateDevisFormGroup.controls['entrepreneur'].value;
    this.defaultClient = this.updateDevisFormGroup.controls['client'].value
    this.modalService.open(updateContent, {size: 'xl'})
  }

  onUpdateDevis(updateModal: any) {
    this.submitted = true;
    if (this.updateDevisFormGroup.invalid) return; //return to the form
    this.devisService.updateDevis(this.updateDevisFormGroup.value, this.updateDevisFormGroup.value.devisId).subscribe({
      next: () => {
        alert("success updating devis");
        this.handleSearchDevis();
        this.submitted = false;
        updateModal.close();  //variable updateModal.dismiss/close, template updateContent
      }, error: err => {
        alert(err.message)
      }
    })
  }

}
