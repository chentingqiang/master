import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() imageUrl:any;
  @Input() visibled:boolean;
  previewVisible:boolean = false;
  constructor() { }

  ngOnInit() {
    console.log(this.visibled);
  }
  showModal(){
  }
}
