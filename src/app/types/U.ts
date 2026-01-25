export interface TaskProject {
  columns: Column[];
  project: {
    id: string;
    name: string;
    totalTasks: number;
    completeTasks: number;
  };
}

export interface Column {
  statusId: number;
  statusName: string;
  statusColor: string;
  orderIndex: number;
  taskCount: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
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
  user: User;
  roleMember: string;
  joinedAt: Date;
}

export interface User {
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

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar_url: string;
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
  createdBy: User;
}

export interface ProjectRequest {
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
}

