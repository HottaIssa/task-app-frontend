export interface TaskProject {
  columns: Column[];
  project: {
    id: string;
    name: string;
    totalTasks: number;
    completeTasks: number;
    roleMember: roleMember;
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
    avatar_url: string |null;
  } | null;
}

export interface TaskSimpleResponse {
  id: string;
  title: string;
  priority: string;
  dueDate: Date;
  isOverdue: boolean;
  assignedTo: {
    id: string;
    username: string;
    email: string;
    avatar_url: string |null;
  } | null;
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
  isActive: boolean;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  avatar_url: string | null;
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


export interface UserSimpleResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar_url: string | null;
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

export interface TaskRequest {
  title: string;
  description: string;
  projectId: string;
  status: string;
  priority: string;
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

export interface ProjectMembership {
  projectId: string;
  role: roleMember;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assignedTo: {
    id: string;
    username: string;
    email: string;
    avatar_url: string |null;
  } | null;
  status: Status;
  priority: string;
  dueDate: Date | null;
  isOverdue: boolean;
  actualHours: number;
  createdBy: UserSimpleResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentResponse {
  id: string;
  member: Member;
  content: string;
  timeAgo: string;
  isEdited: boolean;
}

export interface CommentRequest {
  content: string;
}

export type roleMember = 'MEMBER' | 'ADMIN' | 'VIEWER';
