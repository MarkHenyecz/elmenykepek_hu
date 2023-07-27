import { Character } from "./character.interface"
import { File } from "./file.interface"

export interface User {
    id: number
    name: string
    email: string
    profile_picture?: File
    characters: Character[]
}