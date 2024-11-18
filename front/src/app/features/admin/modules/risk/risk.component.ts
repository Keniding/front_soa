import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Riesgo } from "../../../../models/interfaces/riesgo.interface";
import { RiesgoService } from "../../../../core/services/api/riesgo.service";

interface HeatMapCell {
  probabilidad: number;
  impacto: number;
  count: number;
  color: string;
  riesgos: Riesgo[];
}

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class RiskComponent implements OnInit {
  riesgos: Riesgo[] = [];
  heatMapData: HeatMapCell[][] = [];
  isLoading = true;
  error: string | null = null;
  selectedCell: HeatMapCell | null = null;
  selectedRiesgo: Riesgo | null = null;
  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;

  constructor(private riesgoService: RiesgoService) {}

  ngOnInit() {
    this.loadRiesgos();
  }

  loadRiesgos() {
    this.isLoading = true;
    this.error = null;
    this.riesgoService.getAllRiesgos().subscribe({
      next: (data) => {
        this.riesgos = data;
        this.initializeHeatMap();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los riesgos:', error);
        this.error = 'Error al cargar los datos. Por favor, intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  selectRiesgo(riesgo: Riesgo) {
    this.selectedRiesgo = riesgo;
  }

  getNivelClass(nivel: string): string {
    const classes = {
      'BAJO': 'text-green-600 bg-green-100 px-2 py-1 rounded',
      'MEDIO': 'text-orange-600 bg-orange-100 px-2 py-1 rounded',
      'ALTO': 'text-red-600 bg-red-100 px-2 py-1 rounded'
    };
    return classes[nivel as keyof typeof classes] || '';
  }

  initializeHeatMap() {
    this.heatMapData = Array(5).fill(null).map(() =>
      Array(5).fill(null).map(() => ({
        probabilidad: 0, impacto: 0, count: 0,
        color: '', riesgos: []
      }))
    );

    this.riesgos.forEach(riesgo => {
      const row = 5 - riesgo.probabilidad;
      const col = riesgo.impacto - 1;
      this.heatMapData[row][col].count++;
      this.heatMapData[row][col].riesgos.push(riesgo);
    });

    this.heatMapData.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.probabilidad = 5 - i;
        cell.impacto = j + 1;
        cell.color = this.getHeatMapColor(cell.probabilidad, cell.impacto);
      });
    });
  }

  getHeatMapColor(probabilidad: number, impacto: number): string {
    const riesgoTotal = probabilidad * impacto;
    if (riesgoTotal >= 15) return '#ef4444';
    if (riesgoTotal >= 8) return '#f59e0b';
    return '#22c55e';
  }

  showTooltip(event: MouseEvent, cell: HeatMapCell) {
    this.selectedCell = cell;
    const pos = this.adjustTooltipPosition(event.pageX, event.pageY);
    this.tooltipX = pos.x;
    this.tooltipY = pos.y;
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  adjustTooltipPosition(x: number, y: number) {
    const tooltipWidth = 300, tooltipHeight = 200;
    const windowWidth = window.innerWidth, windowHeight = window.innerHeight;
    const padding = 20;
    let adjustedX = x + padding, adjustedY = y + padding;

    if (x + tooltipWidth + padding > windowWidth) adjustedX = x - tooltipWidth - padding;
    if (y + tooltipHeight + padding > windowHeight) adjustedY = y - tooltipHeight - padding;

    return { x: adjustedX, y: adjustedY };
  }
}
