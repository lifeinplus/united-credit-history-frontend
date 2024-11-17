export interface AuthQueryLogin {
    username: string;
    password: string;
}

export interface AuthQueryRegister {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResultLogin
    extends Pick<
        AuthState,
        | "accessToken"
        | "avatarName"
        | "isPasswordChangeRequired"
        | "roles"
        | "userId"
    > {}

export interface AuthResultRegister {
    message: string;
}

export interface AuthRequireProps {
    allowedRoles: number[];
}

export interface AuthState {
    accessToken?: string;
    avatarName?: string;
    avatarVersion?: number;
    firstName?: string;
    lastName?: string;
    isPasswordChangeRequired?: boolean;
    roles?: number[];
    userId?: string;
    username?: string;
}
