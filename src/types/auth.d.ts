export interface FormSignUpUser {
    username: string;
    email: string;
    password: string;
}
export interface FormSignInUser {
    username: string;
    password: string;
}
export interface FormConfirmSignUpUser {
    username: string;
    confirmationCode: string;
}
export interface FormConfirmResetPasswordUser {
    username: string;
    newPassword: string;
    confirmationCode: string;
}