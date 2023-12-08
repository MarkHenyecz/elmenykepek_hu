import { Character } from "./character.interface"
import { File } from "./file.interface"

export interface Post {
    id: number
    title: string
    slug: string
    likes: number
    isLiked: boolean
    character: Character
    created_at: string
    images: { image: File }[]
}
