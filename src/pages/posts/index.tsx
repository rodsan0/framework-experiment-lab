import { createClient } from "@supabase/supabase-js"
import { Database } from './supabase'
import { useState } from 'react';

const supabaseUrl = 'https://dpjxeujgrsnsqygvxwag.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwanhldWpncnNuc3F5Z3Z4d2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExODE5NjgsImV4cCI6MTk5Njc1Nzk2OH0.XDGbcz5_XcABlLVtVlH2TLrOwgEtn2iBkoKZ5-qhv3U'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

type Post = {
  author: string | null
  body: string | null
  created_at: string | null
  id: number
  title: string | null
}

function Blog() {
  const [myPosts, setMyPosts] = useState<Post[] | null>(null);
  async function getBooks() {
    let { data: posts } = await supabase
      .from('posts')
      .select('*')
    setMyPosts(posts);
  }
  getBooks();

  if (!myPosts) {
    return (<p>No posts found.</p>);
  }

  return (
    <main className="flex flex-col items-center p-24 space-y-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">Welcome to my blog!</h1>
        <ul className="flex flex-col space-y-10">
          {myPosts.map((post) => (
            <div className="flex flex-col space-around">
              <h1 className="space-10 border-b border-gray-300 font-bold leading-none tracking-tight text-gray-900">{post.title}</h1>
              <p>by: {post.author}</p>
              <p>{post.body}</p>
            </div>
          ))}
        </ul>
    </main>
  );
}

export default Blog;