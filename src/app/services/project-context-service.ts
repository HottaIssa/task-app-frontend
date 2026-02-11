import { computed, Injectable, signal } from '@angular/core';
import { ProjectMembership, roleMember } from '../types/U';

@Injectable({
  providedIn: 'root',
})
export class ProjectContextService {
  private _membership = signal<ProjectMembership | null>(null);

  membership = this._membership.asReadonly();

  projectId = computed(() => this._membership()?.projectId ?? null);
  projectRole = computed<roleMember | null>(() => this._membership()?.role ?? null);
  projectStatus = computed(() => this._membership()?.status ?? null);

  isProjectOwner = computed(() => this.projectRole() === 'OWNER');
  isProjectAdmin = computed(() => this.projectRole() === 'ADMIN');
  isProjectMember = computed(() => this.projectRole() === 'MEMBER');
  isProjectViewer = computed(() => this.projectRole() === 'VIEWER');

  canEdit = computed(() => this.isProjectOwner() || this.isProjectAdmin());

  isProjectActive = computed(() => this.projectStatus() === 'ACTIVE');
  isProjectArchived = computed(() => this.projectStatus() === 'ARCHIVED');
  isProjectOnHold = computed(() => this.projectStatus() === 'ON_HOLD');
  isProjectCompleted = computed(() => this.projectStatus() === 'COMPLETED');
  isProjectCancelled = computed(() => this.projectStatus() === 'CANCELLED');

  setMembership(membership: ProjectMembership) {
    this._membership.set(membership);
  }

  clear() {
    this._membership.set(null);
  }
}
