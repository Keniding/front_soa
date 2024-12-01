// src/app/shared/components/sidebar/sidebar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { ViewService } from "../../../core/services/utils/view/view.service";
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  readonly BASE_ROUTE = '/admin/dashboard/';
  currentView: string = 'activities';
  private destroy$ = new Subject<void>();

  menuSections: MenuSection[] = [
    {
      title: 'SERVICIOS',
      items: [
        { id: 'activities', label: 'Actividades', icon: 'fas fa-tasks' },
        { id: 'projects', label: 'Proyectos', icon: 'fas fa-project-diagram' },
        { id: 'milestones', label: 'Hitos', icon: 'fas fa-flag' },
        { id: 'posts', label: 'Cargos', icon: 'fas fa-newspaper' },
        { id: 'minio', label: 'Archivos', icon: 'fas fa-folder' }
      ]
    },
    {
      title: 'GESTIÓN',
      items: [
        { id: 'resources', label: 'Recursos', icon: 'fas fa-boxes' },
        { id: 'staff', label: 'Personal', icon: 'fas fa-users' },
        { id: 'suppliers', label: 'Proveedores', icon: 'fas fa-truck' },
        { id: 'risks', label: 'Riesgos', icon: 'fas fa-exclamation-triangle' }
      ]
    },
    {
      title: 'CONFIGURACIÓN',
      items: [
        { id: 'categories', label: 'Categorías', icon: 'fas fa-tags' },
        { id: 'locations', label: 'Ubicaciones', icon: 'fas fa-map-marker-alt' },
        { id: 'users', label: 'Usuarios', icon: 'fas fa-user-cog' },
        { id: 'types', label: 'Tipos', icon: 'fas fa-list' },
        { id: 'roles', label: 'Roles', icon: 'fas fa-user-shield' }
      ]
    }
  ];

  constructor(
    private viewService: ViewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viewService.currentView$
      .pipe(takeUntil(this.destroy$))
      .subscribe(view => {
        this.currentView = view;
      });

    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        const urlParts = event.url.split('/');
        const viewId = urlParts[urlParts.length - 1];
        if (this.currentView !== viewId) {
          this.viewService.changeView(viewId);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getRoute(item: MenuItem): string {
    return `${this.BASE_ROUTE}${item.id}`;
  }

  changeView(item: MenuItem) {
    try {
      this.viewService.changeView(item.id);
      this.router.navigate([this.getRoute(item)], {
        replaceUrl: false
      }).then(() => {
        console.log('Navegación exitosa a:', this.getRoute(item));
      }).catch(error => {
        console.error('Error en la navegación:', error);
      });
    } catch (error) {
      console.error('Error al cambiar de vista:', error);
    }
  }

  isActiveView(viewId: string): boolean {
    return this.currentView === viewId;
  }
}
