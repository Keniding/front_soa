import { Component, OnInit } from '@angular/core';
import { Proveedor } from "../../../../models/interfaces/proveedor.interface";
import { ProveedorService } from "../../../../core/services/api/proveedor.service";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedoresFiltrados: Proveedor[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Variables para búsqueda y filtros
  searchTerm: string = '';
  filterOptions = {
    estado: 'todos', // 'todos', 'activo', 'inactivo'
    ordenar: 'nombre' // 'nombre', 'contacto', 'correo'
  };

  showFilterModal: boolean = false;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.getAllProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.proveedoresFiltrados = [...data];
        this.loading = false;
        this.aplicarFiltros();
      },
      error: (error) => {
        this.error = 'Error al cargar los proveedores';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  // Función de búsqueda
  buscarProveedores(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;
    this.aplicarFiltros();
  }

  // Aplicar todos los filtros
  aplicarFiltros(): void {
    let resultado = [...this.proveedores];

    // Aplicar búsqueda
    if (this.searchTerm) {
      resultado = resultado.filter(proveedor =>
        proveedor.nombre.toLowerCase().includes(this.searchTerm) ||
        proveedor.contacto.toLowerCase().includes(this.searchTerm) ||
        proveedor.correo.toLowerCase().includes(this.searchTerm) ||
        proveedor.telefono.includes(this.searchTerm)
      );
    }

    // Aplicar filtro de estado
    if (this.filterOptions.estado !== 'todos') {
      resultado = resultado.filter(proveedor =>
        this.filterOptions.estado === 'activo'
      );
    }

    // Aplicar ordenamiento
    resultado.sort((a, b) => {
      switch (this.filterOptions.ordenar) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'contacto':
          return a.contacto.localeCompare(b.contacto);
        case 'correo':
          return a.correo.localeCompare(b.correo);
        default:
          return 0;
      }
    });

    this.proveedoresFiltrados = resultado;
  }

  // Manejo de filtros
  toggleFilterModal(): void {
    this.showFilterModal = !this.showFilterModal;
  }

  actualizarFiltros(filtros: any): void {
    this.filterOptions = { ...filtros };
    this.aplicarFiltros();
    this.showFilterModal = false;
  }

  // Exportar a CSV
  exportarCSV(): void {
    const headers = ['Nombre', 'Contacto', 'Teléfono', 'Correo'];
    const data = this.proveedoresFiltrados.map(p => [
      p.nombre,
      p.contacto,
      p.telefono,
      p.correo
    ]);

    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'proveedores.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
