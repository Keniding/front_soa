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
  route: string;
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
  currentView: string = 'activities';
  private destroy$ = new Subject<void>();

  menuSections: MenuSection[] = [
    {
      title: 'SERVICIOS',
      items: [
        { id: 'activities', label: 'Actividades', icon: 'fas fa-tasks', route: '/admin/activities' },
        { id: 'projects', label: 'Proyectos', icon: 'fas fa-project-diagram', route: '/admin/projects' },
        { id: 'milestones', label: 'Hitos', icon: 'fas fa-flag', route: '/admin/milestones' },
        { id: 'posts', label: 'Publicaciones', icon: 'fas fa-newspaper', route: '/admin/posts' },
        { id: 'minio', label: 'Archivos', icon: 'fas fa-folder', route: '/admin/minio' }
      ]
    },
    {
      title: 'GESTIÓN',
      items: [
        { id: 'resources', label: 'Recursos', icon: 'fas fa-boxes', route: '/admin/resources' },
        { id: 'staff', label: 'Personal', icon: 'fas fa-users', route: '/admin/staff' },
        { id: 'suppliers', label: 'Proveedores', icon: 'fas fa-truck', route: '/admin/suppliers' },
        { id: 'risks', label: 'Riesgos', icon: 'fas fa-exclamation-triangle', route: '/admin/risks' }
      ]
    },
    {
      title: 'CONFIGURACIÓN',
      items: [
        { id: 'categories', label: 'Categorías', icon: 'fas fa-tags', route: '/admin/categories' },
        { id: 'locations', label: 'Ubicaciones', icon: 'fas fa-map-marker-alt', route: '/admin/locations' },
        { id: 'users', label: 'Usuarios', icon: 'fas fa-user-cog', route: '/admin/users' },
        { id: 'types', label: 'Tipos', icon: 'fas fa-list', route: '/admin/types' },
        { id: 'roles', label: 'Roles', icon: 'fas fa-user-shield', route: '/admin/roles' }
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

  changeView(item: MenuItem) {
    try {
      this.viewService.changeView(item.id);
      this.router.navigate([item.route], {
        replaceUrl: false
      }).then(() => {
        console.log('Navegación exitosa a:', item.route);
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
