export interface User {
    id: number,
    photo?: string,
    name: string,
    surname: string,
    age: number,
    fav?: boolean,
    task_id?: number[]
}