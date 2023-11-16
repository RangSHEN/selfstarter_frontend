import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})


export class ClientsComponent implements OnInit {


  // constructor() { }
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }


  getModal(content: any){
    this.modalService.open(content, { size: 'xl' })
    console.log("Hello world")
  }


}
