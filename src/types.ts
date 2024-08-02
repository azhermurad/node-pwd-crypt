export interface HashPasswordType {
    password: string;
    salt: string;
    iterations?: number;
    keylen?: number;
    digest?: string;
}

export interface comparePasswordType extends HashPasswordType {
    hash: string;
}
