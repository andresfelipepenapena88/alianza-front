export interface ClientInfo {
    sharedKey: string;
    name: string;
    phone: string;
    email: string;
    addedDate: string;
}

export interface AddClientRequest {
    name: string;
    phone: string;
    email: string;
}