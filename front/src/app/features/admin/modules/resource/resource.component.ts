import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recurso } from "../../../../models/interfaces/recurso.interface";
import { RecursoService } from "../../../../core/services/api/recurso.service";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.css'
})
export class ResourceComponent implements OnInit {
  recursos: Recurso[] = [];
  loading: boolean = true;
  selectedRecurso: Recurso | null = null;

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.loadRecursos();
  }

  loadRecursos(): void {
    this.recursoService.getAllRecursos().subscribe({
      next: (data) => {
        this.recursos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando recursos:', error);
        this.loading = false;
      }
    });
  }

  toggleDetails(recurso: Recurso): void {
    this.selectedRecurso = this.selectedRecurso === recurso ? null : recurso;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES');
  }

  getTotalItems(): number {
    return this.recursos.reduce((total, recurso) => total + recurso.cantidadDisponible, 0);
  }

  getTotalValor(): number {
    return this.recursos.reduce((total, recurso) =>
      total + (recurso.cantidadDisponible * recurso.costo), 0);
  }
}
