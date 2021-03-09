import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/cliente.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, name: string}, private service: ClienteService) { }

  ngOnInit(): void {
  }

  onDeleteClick() {
    this.service.delete(this.data.id);
  }

}
