import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import {Ubicacion} from "../../../../models/interfaces/ubicacion.interface";
import {UbicacionService} from "../../../../core/services/api/ubicacion.service";

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  map!: L.Map;
  loading = true;
  error: string | null = null;

  // Añadir esta configuración del icono
  private defaultIcon: L.Icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  constructor(private ubicacionService: UbicacionService) {}

  ngOnInit() {
    L.Marker.prototype.options.icon = this.defaultIcon;

    this.initMap();
    this.loadUbicaciones();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-12.0464, -77.0428], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadUbicaciones(): void {
    this.ubicacionService.getAllUbicaciones().subscribe({
      next: (ubicaciones) => {
        this.ubicaciones = ubicaciones;
        this.addMarkers();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las ubicaciones';
        this.loading = false;
      }
    });
  }

  private addMarkers(): void {
    this.ubicaciones.forEach(ubicacion => {
      L.marker([ubicacion.latitud, ubicacion.longitud])
        .bindPopup(ubicacion.direccion)
        .addTo(this.map);
    });
  }
}
