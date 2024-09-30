export interface AuthProps {
    buttonText: string;
    handleSubmit: AuthSubmitHandler;
    question: {
        link: string;
        linkText: string;
        text: string;
    };
    title: string;
}

export interface AuthQuery {
    userName: string;
    password: string;
}
export interface AuthQueryChangePassword {
    id: string;
    currentPassword: string;
    newPassword: string;
}

export interface AuthResultLogin {
    accessToken: string;
    roles: number[];
}

export interface AuthResultRegister {
    message: string;
}

export interface AuthRequireProps {
    allowedRoles: number[];
}

export interface AuthState {
    accessToken?: string;
    roles?: number[];
    userId?: string;
    userName?: string;
}

export interface AuthSubmitHandler {
    (userName: string, password: string): void;
}
