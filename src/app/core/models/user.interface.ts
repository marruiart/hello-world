export interface User {
    id: number,
    avatar?: string,
    name: string,
    surname: string,
    age: number,
    fav?: boolean,
    task_id?: number[]
}