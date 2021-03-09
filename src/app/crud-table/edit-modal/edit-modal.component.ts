import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/cliente.service';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  public cliente = {} as Cliente;
  @Input() products: Produto[] = new Array<Produto>();

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }, private prodService: ProdutoService, private service: ClienteService) { 
    
  }

  ngOnInit(): void {
    this.service.get(this.data.id).subscribe((value) => {
      this.cliente = value;
    });

    this.prodService.list().subscribe((value) => {
      this.products = value;
    });
  }

  onSubmit(form: NgForm) {
    var cli: Cliente = {
      name: form.value.name,
      company: form.value.company,
      phone: form.value.phone,
      mail: form.value.mail,
      notes: form.value.notes,
      produtoId: form.value.produtoId,
      id: form.value.id,
      createdAt: form.value.createdAt,
      updatedAt: form.value.updatedAt,
    };

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (form.value.name != '' && form.value.company != '' && form.value.phone != '' && form.value.mail != '' && re.test(String(form.value.mail).toLowerCase()))
      this.service.put(cli);

  }

}
