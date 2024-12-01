import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from "../../../../models/interfaces/proyecto.interface";
import { ProyectoService } from "../../../../core/services/api/proyecto.service";
import { ObjectId } from "mongodb";

@Component({
  selector: 'app-proyecto',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProyectoComponent implements OnInit {
  proyectos: Proyecto[] = [];
  proyectosFiltrados: Proyecto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  // Variables para filtros y búsqueda
  searchTerm: string = '';
  filtroEstado: string = '';
  ordenamiento: string = 'fecha';

  // Variables para paginación
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private proyectoService: ProyectoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProyectos();
  }

  loadProyectos(): void {
    this.isLoading = true;
    this.proyectoService.getAllProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.proyectosFiltrados = [...this.proyectos];
        this.aplicarFiltros();
        this.calcularPaginacion();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.errorMessage = 'No se pudieron cargar los proyectos. Por favor, intenta nuevamente más tarde.';
        this.isLoading = false;
      }
    });
  }

  imagen(id: ObjectId): string {
    return '/assets/images/default-project.jpg';
  }

  // Métodos de navegación
  verDetalleProyecto(id: ObjectId): void {
    this.router.navigate(['/proyectos', id]);
  }

  editarProyecto(id: ObjectId): void {
    this.router.navigate(['/proyectos/editar', id]);
  }

  crearNuevoProyecto(): void {
    this.router.navigate(['/proyectos/nuevo']);
  }

  // Métodos de filtrado y búsqueda
  onSearch(): void {
    this.aplicarFiltros();
  }

  filtrarProyectos(): void {
    this.aplicarFiltros();
  }

  ordenarProyectos(): void {
    this.aplicarFiltros();
  }

  private aplicarFiltros(): void {
    let proyectosFiltrados = [...this.proyectos];

    // Aplicar búsqueda por término
    if (this.searchTerm) {
      const termino = this.searchTerm.toLowerCase();
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(termino) ||
        proyecto.descripcion.toLowerCase().includes(termino)
      );
    }

    // Aplicar filtro por estado
    if (this.filtroEstado) {
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.estado === this.filtroEstado
      );
    }

    // Aplicar ordenamiento
    proyectosFiltrados.sort((a, b) => {
      switch (this.ordenamiento) {
        case 'fecha':
          return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime();
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'estado':
          return a.estado.localeCompare(b.estado);
        default:
          return 0;
      }
    });

    this.proyectosFiltrados = proyectosFiltrados;
    this.calcularPaginacion();
  }

  // Métodos de paginación
  calcularPaginacion(): void {
    this.totalPages = Math.ceil(this.proyectosFiltrados.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
    }
  }

  getProyectosPaginados(): Proyecto[] {
    const inicio = (this.currentPage - 1) * this.itemsPerPage;
    const fin = inicio + this.itemsPerPage;
    return this.proyectosFiltrados.slice(inicio, fin);
  }

  getProgresoProyecto(proyecto: any): number {
    const inicio = new Date(proyecto.fechaInicio).getTime();
    const fin = new Date(proyecto.fechaFin).getTime();
    const actual = new Date().getTime();

    if (actual < inicio) return 0;
    if (actual > fin) return 100;

    const progreso = ((actual - inicio) / (fin - inicio)) * 100;
    return Math.round(progreso);
  }

}
