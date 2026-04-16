export type User = {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    userRole: {
        id: number,
        roleName: string
    }
}