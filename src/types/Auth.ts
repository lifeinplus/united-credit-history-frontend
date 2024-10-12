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

export interface AuthResultLogin
    extends Pick<
        AuthState,
        "accessToken" | "avatarPath" | "roles" | "userId"
    > {}

export interface AuthResultRegister {
    message: string;
}

export interface AuthRequireProps {
    allowedRoles: number[];
}

export interface AuthState {
    accessToken?: string;
    avatarPath?: string;
    roles?: number[];
    userId?: string;
    userName?: string;
}

export type AuthSubmitHandler = (userName: string, password: string) => void;
