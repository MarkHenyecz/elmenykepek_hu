import { File } from "./file.interface"
import { Post } from "./post.interface"

export interface Character {
    id: number
    name: string
    profile_picture?: File
    posts: Post[]
}