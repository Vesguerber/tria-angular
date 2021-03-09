import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:5000/api/Produto/';

  constructor(private http: HttpClient) { }

  list () {
    return this.http.get<Produto[]>(this.API);
  }

}
