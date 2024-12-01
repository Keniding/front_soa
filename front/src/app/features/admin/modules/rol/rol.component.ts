import { Component, OnInit } from '@angular/core';
import {Rol} from "../../../../models/interfaces/rol.interface";
import {RolService} from "../../../../core/services/api/rol.service";
import {ObjectId} from "mongodb";

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent implements OnInit {
  roles: Rol[] = [];
  isModalOpen = false;
  currentRol: Partial<Rol> = {
    permisos: []
  };
  isEditing = false;
  constructor(private rolService: RolService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.rolService.getAllRoles().subscribe(
      roles => {
        this.roles = roles;
      },
      error => {
        console.error('Error cargando roles:', error);
      }
    );
  }

  togglePermiso(permiso: string) {
    if (!this.currentRol.permisos) {
      this.currentRol.permisos = [];
    }

    const index = this.currentRol.permisos.indexOf(permiso);
    if (index > -1) {
      this.currentRol.permisos = this.currentRol.permisos.filter(p => p !== permiso);
    } else {
      this.currentRol.permisos.push(permiso);
    }
  }

  openModal(rol?: Rol) {
    this.isModalOpen = true;
    this.isEditing = !!rol;
    this.currentRol = rol ? {...rol} : {};
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentRol = {};
    this.isEditing = false;
  }

  saveRol() {
    if (this.isEditing && this.currentRol.id) {
      this.rolService.updateRol(this.currentRol.id, this.currentRol as Rol).subscribe(() => {
        this.loadRoles();
        this.closeModal();
      });
    } else {
      this.rolService.createRol(this.currentRol as Omit<Rol, 'id'>).subscribe(() => {
        this.loadRoles();
        this.closeModal();
      });
    }
  }

  deleteRol(id: ObjectId) {
    if (confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      this.rolService.deleteRol(id).subscribe(() => {
        this.loadRoles();
      });
    }
  }
}
