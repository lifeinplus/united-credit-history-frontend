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
    firstName?: string;
    lastName?: string;
    roles?: number[];
    userId?: string;
    username?: string;
}
