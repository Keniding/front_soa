// milestone.component.ts
import { Component, OnInit } from '@angular/core';
import {Hito} from "../../../../models/interfaces/hito.interface";
import {HitoService} from "../../../../core/services/api/hito.service";

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {
  hitos: Hito[] = [];
  loading: boolean = true;

  constructor(private hitoService: HitoService) {}

  ngOnInit(): void {
    this.loadHitos();
  }

  loadHitos(): void {
    this.hitoService.getAllHitos().subscribe({
      next: (data) => {
        this.hitos = data.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando hitos:', error);
        this.loading = false;
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
