export type User = {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    //role?: role
}

export type FlattenUser = {
    id: number;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
}