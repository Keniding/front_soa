import { Component, OnInit } from '@angular/core';
import {Tipo} from "../../../../models/interfaces/tipo.interface";
import {TipoService} from "../../../../core/services/api/tipo.service";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent implements OnInit {
  tipos: Tipo[] = [];
  selectedTipo: Tipo | null = null;

  constructor(private tipoService: TipoService) {}

  ngOnInit() {
    this.loadTipos();
  }

  loadTipos() {
    this.tipoService.getAllTipos().subscribe(
      (data) => {
        this.tipos = data;
        if (data.length > 0) {
          this.selectedTipo = data[0];
        }
      }
    );
  }

  selectTipo(tipo: Tipo) {
    this.selectedTipo = tipo;
  }
}
