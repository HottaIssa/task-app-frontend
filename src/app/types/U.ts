export interface TaskProject {
  columns: Column[];
  project: {
    id: string;
    name: string;
    totalTasks: number;
    completeTasks: number;
    roleMember: string;
  };
}

export interface Column {
  statusId: number;
  statusName: string;
  statusColor: string;
  orderIndex: number;
  taskCount: number;
  tasks: TaskCardResponse[];
}

export interface TaskCardResponse {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: Status;
  dueDate: Date;
  isOverdue: boolean;
  assignedTo: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}

export interface Member {
  id: string;
  user: UserResponse;
  roleMember: string;
  joinedAt: Date;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar_url: null;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}


export interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  createdBy: UserResponse;
}

export interface ProjectRequest {
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
}

export interface MemberRequest {
  userId: string;
  role: roleMember;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

export interface TaskFilters {
  projectId?: string | null;
  status?: string | null;
  priority?: string | null;
  search?: string | null;
  dueFrom?: string | null;
  dueTo?: string | null;
  isOverdue?: boolean;
  isAssignedToMe?: boolean;
  isCreatedByMe?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export interface TaskPage {
  content: TaskCardResponse[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Status {
  id: number;
  name: string;
  color: string;
  orderIndex: number;
}

export type roleMember = 'MEMBER' | 'ADMIN' | 'VIEWER';
