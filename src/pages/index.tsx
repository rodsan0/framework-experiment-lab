import { createClient } from "@supabase/supabase-js"
import { Database } from '../supabase'
import { useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

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

function MarkdownRender({ body_text }: { body_text: string | null }) {
  const [myBody, setBody] = useState<string>('');
  async function formatBody() {
    let processed_body = await remark()
      .use(html)
      .process(body_text || "");
      const contentHTML = processed_body.toString();
      setBody(contentHTML);
  }
  formatBody();
  return (
    <div dangerouslySetInnerHTML={{ __html: myBody }}></div>
  );
}

function Blog() {
  const [myPosts, setMyPosts] = useState<Post[] | null>(null);
  async function getBooks() {
    let { data: posts } = await supabase
      .from('posts')
      .select('*')
      .order('id',  { ascending: false })
    setMyPosts(posts);
  }
  getBooks();

  if (!myPosts) {
    return (<p>No posts found.</p>);
  }

  return (
    <main className="flex flex-col items-center p-24 space-y-10 h-full bg-gradient-to-b from-slate-100">
      <div className="max-w-screen-lg content-stretch w-screen mx-7">
        <h1 className="text-5xl lg:text-8xl font-bold leading-none tracking-tight text-[#0c7fd8] mb-10 mx-7">Welcome to my blog!</h1>
        <ul className="flex flex-col space-y-5 h-full justify-around mx-7">
          {myPosts.map((post) => (
            <article key={post.id} className="prose prose-2xl prose-slate dark:prose-invert border-b border-blue-500">
              <div className="flex justify-between items-baseline font-light mt-5">
                <h1 className="text-5xl lg:text-6xl font-light mb-0">{post.title}</h1>
                <p className="text-2xl lg:text-3xl font-light tracking-tight mb-0">by {post.author}</p>
              </div>
              <div>
                <MarkdownRender body_text={post.body}></MarkdownRender>
              </div>
            </article>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Blog;