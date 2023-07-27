import { Paginated } from "../interfaces/pagination.interface"
import { Post } from "../interfaces/post.interface"
import network from "./network"


const GET_POSTS = 'post?page={page}'
const GET_POST = 'post/{id}'
const CREATE_POST = 'post'

export const postService = {
    getPosts: (currentPage: number) => network.get<Paginated<Post>>(GET_POSTS.replace('{page}', currentPage.toString())),
    getPost: (id: number) => network.get<Post[]>(GET_POST.replace('{id}', id.toString())),

    createPost: (title: string, character_id: number, images: number[]) => network.post(CREATE_POST, {title, character_id, images})
}