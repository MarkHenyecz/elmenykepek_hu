"use client";
import { postService } from '@/components/api/postService';
import { Post } from '@/components/interfaces/post.interface';
import PostElem from '@/components/post/post'
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const getData = async () => {
      const pageData = (await postService.getPosts(currentPage)).data

      const newPosts = posts || [];
      pageData.data.forEach(post => {
        newPosts.push(post)
      });
      const postIds: string[] = []
      setPosts(newPosts.filter(item => {
        if(!postIds.includes(item.slug)) {
          postIds.push(item.slug)
          return true;
        }
        return false;
      }))
    }

    getData()
  }, [currentPage, posts])

  if(!posts)
    return(
    <main>
      <PostElem isLoading />
    </main>
    )

  return (
    <main className='flex flex-col gap-4'>
      {posts?.map((post, key) => 
        <PostElem 
        key={post.slug} 
        post={post} 
        onVisible={key == (posts.length-1) ? () => setCurrentPage(currentPage+1) : undefined} 
        />
      )}
    </main>
  )
}
