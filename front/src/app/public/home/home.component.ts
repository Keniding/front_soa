import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  noticias = [
    {
      titulo: 'Mantenimiento Vial en la Red Nacional',
      fecha: '18 Nov 2024',
      descripcion: 'Nuevos trabajos de mantenimiento en carreteras principales...'
    },
    {
      titulo: 'Inauguración de Puente Bailey',
      fecha: '17 Nov 2024',
      descripcion: 'Se inauguró nuevo puente que beneficiará a más de 5000 habitantes...'
    },
    {
      titulo: 'Mejoramiento de la Red Vial',
      fecha: '16 Nov 2024',
      descripcion: 'Avances en los trabajos de mejoramiento de la red vial departamental...'
    }
  ];

  proyectosDestacados = [
    {
      nombre: 'Carretera Central',
      estado: 'En ejecución',
      progreso: 75
    },
    {
      nombre: 'Puente Pachitea',
      estado: 'En licitación',
      progreso: 30
    },
    {
      nombre: 'Vía Evitamiento',
      estado: 'Planificación',
      progreso: 15
    }
  ];
}
