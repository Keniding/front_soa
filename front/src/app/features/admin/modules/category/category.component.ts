// category.component.ts
import { Component, OnInit } from '@angular/core';
import { Categoria } from "../../../../models/interfaces/categoria.interface";
import { CategoriaService } from "../../../../core/services/api/categoria.service";
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categorias: Categoria[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.loading = true;
    this.categoriaService.getAllCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        console.log('Categorías:', this.categorias);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las categorías';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  eliminarCategoria(id: ObjectId): void {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(cat => cat.id.toString() !== id.toString());
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
        }
      });
    }
  }
}
