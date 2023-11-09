export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isSidebarOpen: boolean;
}

export interface User {
    name: string;
    email: string;
}
