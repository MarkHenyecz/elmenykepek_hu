import { Post } from "../interfaces/post.interface"
import network from "./network"


const GET_POSTS = 'post'
const GET_POST = 'post/{id}'
const CREATE_POST = 'post'

export const postService = {
    getPosts: () => network.get<Post[]>(GET_POSTS),
    getPost: (id: number) => network.get<Post[]>(GET_POST.replace('{id}', id.toString())),

    createPost: (title: string, character_id: number, images: number[]) => network.post(CREATE_POST, {title, character_id, images})
}