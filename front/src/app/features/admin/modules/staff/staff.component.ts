import { Component, OnInit } from '@angular/core';
import { ObjectId } from 'mongodb';
import { Personal } from "../../../../models/interfaces/personal.interface";
import { PersonalService } from "../../../../core/services/api/personal.service";
import { Rango } from "../../../../models/enums/rango.enum";
import {Cargo} from "../../../../models/interfaces/cango.interface";
import {CargoService} from "../../../../core/services/api/cargo.service";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  personal: Personal[] = [];
  filteredPersonal: Personal[] = [];
  cargos: Cargo[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';
  rangos = Object.values(Rango);

  departamentos: string[] = [];
  cargosPorDepartamento: { [key: string]: Cargo[] } = {};

  selectedDepartamento: string = '';
  selectedCargoId: string = '';
  selectedCargo: Cargo | null = null;

  onDepartamentoChange(event: any): void {
    this.selectedDepartamento = event.target.value;
    this.selectedCargoId = ''; // Reset cargo selection
    this.selectedCargo = null;
    console.log('Departamento seleccionado:', this.selectedDepartamento);
    console.log('Cargos disponibles:', this.cargosPorDepartamento[this.selectedDepartamento]);
  }

  onCargoChange(event: any): void {
    const cargoId = event?.target?.value || event;

    console.log('Cargo ID recibido:', cargoId);

    this.selectedCargoId = String(cargoId);

    this.selectedCargo = this.cargos.find(cargo => cargo.id === this.selectedCargoId) || null;

    if (this.selectedCargo) {
      console.log('Cargo encontrado:', this.selectedCargo);
    } else {
      console.error('No se encontró el cargo con ID:', this.selectedCargoId);
      console.log('Cargos disponibles:', this.cargos);
    }
  }

  getCargosForDepartamento(): Cargo[] {
    return this.cargosPorDepartamento[this.selectedDepartamento] || [];
  }

  // Modal states
  showModal: boolean = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedPersonal: Personal | null = null;

  formatRango(rango: string): string {
    return String(rango).split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  getRangoBadgeColor(rango: Rango): string {
    const rangosColores = {
      [Rango.INTERN]: 'bg-gray-100 text-gray-800',
      [Rango.TRAINEE]: 'bg-blue-100 text-blue-800',
      [Rango.ASSOCIATE]: 'bg-green-100 text-green-800',
      [Rango.JUNIOR]: 'bg-yellow-100 text-yellow-800',
      [Rango.SENIOR]: 'bg-purple-100 text-purple-800',
      [Rango.LEAD]: 'bg-indigo-100 text-indigo-800',
      [Rango.SPECIALIST]: 'bg-pink-100 text-pink-800',
      [Rango.COORDINATOR]: 'bg-red-100 text-red-800',
      [Rango.MANAGER]: 'bg-orange-100 text-orange-800',
      [Rango.PRINCIPAL]: 'bg-teal-100 text-teal-800',
      [Rango.CONSULTANT]: 'bg-cyan-100 text-cyan-800',
      [Rango.DIRECTOR]: 'bg-emerald-100 text-emerald-800',
      [Rango.VICE_PRESIDENT]: 'bg-violet-100 text-violet-800',
      [Rango.EXECUTIVE]: 'bg-fuchsia-100 text-fuchsia-800',
      [Rango.CHIEF]: 'bg-rose-100 text-rose-800',
      [Rango.PRESIDENT]: 'bg-amber-100 text-amber-800',
      [Rango.PARTNER]: 'bg-lime-100 text-lime-800',
      [Rango.FELLOW]: 'bg-sky-100 text-sky-800'
    };
    return rangosColores[rango] || 'bg-gray-100 text-gray-800';
  }

  constructor(
    private personalService: PersonalService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    this.loadCargos();
    this.loadPersonal();
  }

  loadCargos(): void {
    this.cargoService.getAllCargos().subscribe({
      next: (data) => {
        this.cargos = data.map(cargo => ({
          ...cargo,
          id: String(cargo.id)
        }));
        this.organizarCargosPorDepartamento();
        console.log('Cargos cargados:', this.cargos);
      },
      error: (error) => {
        this.error = 'Error al cargar los cargos';
        console.error('Error:', error);
      }
    });
  }

  organizarCargosPorDepartamento(): void {
    this.departamentos = [...new Set(this.cargos.map(cargo => cargo.departamento))];

    this.cargosPorDepartamento = {};
    this.departamentos.forEach(depto => {
      this.cargosPorDepartamento[depto] = this.cargos.filter(
        cargo => cargo.departamento === depto
      );
    });
  }



  onSubmit(formData: any): void {
    if (!this.selectedCargo) {
      this.error = 'Por favor seleccione un cargo válido';
      return;
    }

    const personalData: Omit<Personal, 'id'> = {
      nombre: formData.nombre,
      cargo: {
        id: this.selectedCargo.id,
        nombre: this.selectedCargo.nombre,
        descripcion: this.selectedCargo.descripcion,
        rango: formData.rango,
        departamento: this.selectedCargo.departamento
      },
      telefono: formData.telefono,
      correo: formData.correo
    };

    console.log('Datos a enviar:', JSON.stringify(personalData, null, 2));

    if (this.modalMode === 'create') {
      this.personalService.createPersonal(personalData).subscribe({
        next: (personal) => {
          console.log('Personal creado exitosamente:', personal);
          this.loadPersonal();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear personal:', error);
          this.error = error.error?.message || 'Error al crear el personal';
        }
      });
    } else if (this.selectedPersonal && this.selectedPersonal.id) {
      this.personalService.updatePersonal(this.selectedPersonal.id, personalData).subscribe({
        next: (personal) => {
          console.log('Personal actualizado exitosamente:', personal);
          this.loadPersonal();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar personal:', error);
          this.error = error.error?.message || 'Error al actualizar el personal';
        }
      });
    }
  }

  loadPersonal(): void {
    this.loading = true;
    this.personalService.getAllPersonal().subscribe({
      next: (personal) => {
        this.personal = personal;
        this.filteredPersonal = personal;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar personal:', error);
        this.error = error.error?.message || 'Error al cargar el personal';
        this.loading = false;
      }
    });
  }

  searchPersonal(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPersonal = this.personal.filter(person =>
      person.nombre.toLowerCase().includes(searchTerm) ||
      person.cargo?.nombre.toLowerCase().includes(searchTerm) ||
      person.correo.toLowerCase().includes(searchTerm)
    );
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.selectedPersonal = null;
    this.selectedDepartamento = '';
    this.selectedCargoId = '';
    this.selectedCargo = null;
    this.showModal = true;
  }

  openEditModal(persona: Personal): void {
    this.modalMode = 'edit';
    this.selectedPersonal = { ...persona };

    if (persona.cargo) {
      this.selectedDepartamento = persona.cargo.departamento;
      this.selectedCargoId = persona.cargo.id;
      this.selectedCargo = persona.cargo;

      if (!this.cargosPorDepartamento[this.selectedDepartamento]) {
        this.organizarCargosPorDepartamento();
      }
    }

    console.log('Editando personal:', {
      persona: this.selectedPersonal,
      departamento: this.selectedDepartamento,
      cargoId: this.selectedCargoId,
      cargo: this.selectedCargo
    });

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPersonal = null;
    this.error = null;
  }

  deletePersonal(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar este personal?')) {
      this.personalService.deletePersonal(id).subscribe({
        next: () => {
          this.loadPersonal();
        },
        error: (error) => {
          this.error = 'Error al eliminar el personal';
          console.error('Error:', error);
        }
      });
    }
  }
}
