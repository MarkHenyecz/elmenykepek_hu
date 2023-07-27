import { Character } from "./character.interface"
import { File } from "./file.interface"

export interface Post {
    title: string
    slug: string
    character: Character
    created_at: string
    images: { image: File }[]
}
