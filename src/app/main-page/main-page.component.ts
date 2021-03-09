import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewModalComponent } from './new-modal/new-modal.component';
import { jsPDF } from 'jspdf';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>();
  products: Produto[] = new Array<Produto>();


  constructor(public dialog: MatDialog, private service: ClienteService, private prodService: ProdutoService) { }

  ngOnInit(): void {
    this.prodService.list().subscribe((value) => {
      this.products = value;
      
    });
  }

  async gerarPdf() {
    var hoje = new Date();
    const doc = new jsPDF();
    doc.text("Relatório de Clientes - Tria Software", 10, 10);
    doc.setFontSize(12);
    doc.text('Gerado em: '+('0' + hoje.getDate()).slice(-2) + '/' + ('0' + (hoje.getMonth() + 1)).slice(-2) + '/' + hoje.getFullYear(), 10, 17);
    doc.setFontSize(10);
    doc.text('Cliente', 10, 30);
    doc.text('Empresa', 50, 30);
    doc.text('Telefone', 100, 30);
    doc.text('E-mail', 135, 30);
    doc.text('Produto/Serviço', 170, 30);
    doc.setFontSize(8);
    var yPos = 30;
    await this.service.listNome().subscribe((value) => {
      value.map((valueM) => {
        yPos = yPos + 5;
        doc.text(valueM.name, 10, yPos);
        doc.text(valueM.company, 50, yPos);
        doc.text(valueM.phone, 100, yPos);
        doc.text(valueM.mail, 135, yPos);
        doc.text(this.products[valueM.produtoId-1].name, 170, yPos);

      });
      doc.save("ClientesTria.pdf");

    });
  }

  openNewDialog() {
    this.dialog.open(NewModalComponent, {
      width: '900px'
    });
  }

}
