import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {User} from "../../../../models/interfaces/user.interface";
import {UserService} from "../../../../core/services/api/user.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  // Data original y filtrada
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  loading: boolean = true;

  // Paginación
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  // Búsqueda
  searchControl = new FormControl('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initializeSearchListener();
    this.loadUsers();
  }

  private initializeSearchListener(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm) => {
      this.filterUsers(searchTerm || '');
      this.currentPage = 1;
      this.updateDisplayedUsers();
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
        this.filterUsers(this.searchControl.value || '');
        this.updateDisplayedUsers();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  private filterUsers(searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase();
    this.filteredUsers = this.allUsers.filter(user =>
      user.username.toLowerCase().includes(searchTerm) ||
      user.rol.name.toLowerCase().includes(searchTerm)
    );
    this.totalItems = this.filteredUsers.length;
  }

  private updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(start, end);
  }

  onPageChange(page: number): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (page >= 1 && page <= totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updateDisplayedUsers();
    }
  }

  onDeleteUser(id: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id as any).subscribe({
        next: () => {
          this.loadUsers(); // Recargar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  // Getters para la plantilla
  get pages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    const pagesArray = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
