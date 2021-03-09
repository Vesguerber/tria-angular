import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/cliente.service';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {

  public cliente = {} as Cliente;
  public products: Produto[] = new Array<Produto>();


  constructor(@Inject(MAT_DIALOG_DATA) public data: { id : number }, private service: ClienteService, private prodService: ProdutoService) { }
  
  ngOnInit(): void {
    this.prodService.list().subscribe((value) => {
      this.products = value;
      
    });
    
    this.service.get(this.data.id).subscribe((value) => {
      this.cliente = value;
    });
  }

}
