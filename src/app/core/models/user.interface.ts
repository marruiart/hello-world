export interface User extends NewUser {
    id: number
}

export interface NewUser {
    user_id: number,
    nickname: string,
    avatar?: Avatar,
    name?: string,
    surname?: string,
    age?: string,
    fav?: boolean,
    assignments?: any
}

interface Avatar {
    data: {
        id: number,
        attributes: {
            name: string,
            alternativeText: string | null,
            caption: string | null,
            width: number,
            height: number,
            formats: {
                thumbnail: {
                    ext: string,
                    url: string,
                    hash: string,
                    mime: string,
                    name: string,
                    path: string | null,
                    size: number,
                    width: number,
                    height: number
                }
            },
            hash: string,
            ext: string,
            mime: string,
            size: number,
            url: string,
            previewUrl: string | null,
            provider: string,
            provider_metadata: string | null,
            createdAt: string,
            updatedAt: string
        }
    }
}