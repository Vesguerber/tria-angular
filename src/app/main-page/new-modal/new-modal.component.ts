import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/produto.service';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from 'src/app/cliente';


@Component({
  selector: 'app-new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.scss']
})
export class NewModalComponent implements OnInit {

  @Input() products: Produto[] = new Array<Produto>();
  @Input() selected : string = '1';
  constructor(private service: ProdutoService, private cliService: ClienteService) { }

  onSubmit(form: NgForm) {
    var cli : Cliente = {
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
    
    if(form.value.name != '' && form.value.company != '' && form.value.phone != '' && form.value.mail != '' && re.test(String(form.value.mail).toLowerCase()))
      this.cliService.post(cli);
    
  }

  ngOnInit(): void {
    this.service.list().subscribe((value) => {
      this.products = value;
    });
  }

}
