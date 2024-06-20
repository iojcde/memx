export enum Form {
    Initial,
    Loading,
    Success,
    Error,
}

export type FormState = {
    state: Form
    message?: string
}

export type Subscribers = {
    count: number
}

export type Views = {
    total: number
}

export type Gumroad = {
    sales: number
}
