import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

export interface PeriodicElement {
  name: string;
  createdAt: Date;
  id: number;
  company: string;
  productId: string;
}


@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'company', 'productId', 'name', 'createdAt', 'action'];

  @Input() clientes: Cliente[] = new Array<Cliente>();
  @Input() products: Produto[] = new Array<Produto>();
  
  constructor(public dialog: MatDialog, private service: ClienteService, private prodService: ProdutoService) { }

  ngOnInit(): void {
    this.prodService.list().subscribe((value) => {
      this.products = value;
      
    });

    this.service.list().subscribe((value) => {
      this.clientes = value;
    });

  }

  openDetailDialog(id: number) {
    this.dialog.open(DetailModalComponent, {
      width: '900px',
      data:{id:id}
    });
  }

  openEditDialog(id: number) {
    this.dialog.open(EditModalComponent, {
      width: '900px',
      data:{id:id}
    });
  }

  openDeleteDialog(id: number, name: string) {
    this.dialog.open(DeleteModalComponent, {
      width: '900px',
      data: {id: id, name: name}
    });
  }


}

