import { File } from "./file.interface"

export interface Post {
    title: string
    slug: string
    created_at: string
    images: { image: File }[]
}
