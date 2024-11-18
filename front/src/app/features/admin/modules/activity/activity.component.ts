// activity.component.ts
import { Component, OnInit } from '@angular/core';
import {Actividad} from "../../../../models/interfaces/actividad.interface";
import {Estado} from "../../../../models/enums/estado.enum";
import {ActividadService} from "../../../../core/services/api/actividad.service";

@Component({
  selector: 'app-activities',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  actividades: Actividad[] = [];
  loading: boolean = true;
  error: string | null = null;
  Estado = Estado;

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.loading = true;
    this.actividadService.getAllActividades()
      .subscribe({
        next: (data) => {
          this.actividades = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar las actividades';
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }

  calcularProgreso(actividad: Actividad): number {
    if (actividad.estado === Estado.COMPLETADA || actividad.estado === Estado.FINALIZADO) {
      return 100;
    }
    if (actividad.estado === Estado.CANCELADA) {
      return 0;
    }

    const ahora = new Date().getTime();
    const inicio = new Date(actividad.fechaInicio).getTime();
    const fin = new Date(actividad.fechaFin).getTime();

    if (ahora < inicio) return 0;
    if (ahora > fin) return 100;

    return Math.round(((ahora - inicio) / (fin - inicio)) * 100);
  }

  getEstadoClasses(estado: Estado): string {
    const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full';
    switch (estado) {
      case Estado.PENDIENTE:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case Estado.EN_PROGRESO:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case Estado.COMPLETADA:
        return `${baseClasses} bg-green-100 text-green-800`;
      case Estado.CANCELADA:
        return `${baseClasses} bg-red-100 text-red-800`;
      case Estado.ACTIVO:
        return `${baseClasses} bg-emerald-100 text-emerald-800`;
      case Estado.FINALIZADO:
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getEstadoIcon(estado: Estado): string {
    switch (estado) {
      case Estado.PENDIENTE:
        return `M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z`; // Reloj
      case Estado.EN_PROGRESO:
        return `M13 10V3L4 14h7v7l9-11h-7z`; // Rayo
      case Estado.COMPLETADA:
        return `M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z`; // Check en círculo
      case Estado.CANCELADA:
        return `M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z`; // X en círculo
      case Estado.ACTIVO:
        return `M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z`; // Estrella
      case Estado.FINALIZADO:
        return `M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2`; // Documento
      default:
        return `M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z`; // Info
    }
  }
}
