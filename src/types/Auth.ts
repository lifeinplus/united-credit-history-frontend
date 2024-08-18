export interface AuthLoginResult {
    accessToken: string;
    roles: number[];
}

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

export interface AuthQueryArg {
    userName: string;
    password: string;
}

export interface AuthRegisterResult {
    message: string;
}

export interface AuthRequireProps {
    allowedRoles: number[];
}

export interface AuthState {
    accessToken?: string;
    roles?: number[];
    userName?: string;
}

export interface AuthSubmitHandler {
    (userName: string, password: string): void;
}
