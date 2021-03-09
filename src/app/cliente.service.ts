import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:5000/api/Cliente/';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Cliente[]>(this.API);
  }

  get(id:number) {
    var cli = this.http.get<Cliente>(this.API+id);
    return cli;
  }

  listNome() {
    return this.http.get<Cliente[]>(this.API+'names');

  }

  post(cli: Cliente) {

    var data = {
      "name": cli.name,
      "company": cli.company,
      "phone": cli.phone,
      "mail": cli.mail,
      "notes": cli.notes,
      "produtoId": cli.produtoId,
      "createdAt": new Date().toLocaleString(),
      "updatedAt": new Date().toLocaleString(),
    }

    return this.http.post(this.API, data).toPromise().then((data: any) => {
      location.reload();
    });

  }

  put(cli: Cliente) {

    var data = {
      "name": cli.name,
      "company": cli.company,
      "phone": cli.phone,
      "mail": cli.mail,
      "notes": cli.notes,
      "produtoId": cli.produtoId,
      "id": cli.id,
      "updatedAt": new Date().toLocaleString(),
    }


    return this.http.put(this.API+data.id, data).toPromise().then((data: any) => {
      location.reload();
    });

  }

  delete (id: number){
    this.http.delete(this.API+id).toPromise();
    location.reload();
  }

}
