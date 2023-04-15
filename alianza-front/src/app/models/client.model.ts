export interface ClientInfo {
    sharedKey?: string;
    name: string;
    phone: string;
    email: string;
    startDate: string;
    endDate: string;
}

export interface AddClientRequest {
    name: string;
    phone: string;
    email: string;
}