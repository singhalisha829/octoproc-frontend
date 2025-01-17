export interface CommonType {
    name: string,
    code: string,
    id: number
}
export interface City extends CommonType {
    postal_code: unknown,
    state_id: number,
}
export interface State extends CommonType {
    country_id: number,
}
export interface Country extends CommonType {
    phone_code: number,
    statecurrency_code_id: string,
}