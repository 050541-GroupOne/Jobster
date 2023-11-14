export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isSidebarOpen: boolean;
}

export interface User {
    name: string;
    email: string;
}
