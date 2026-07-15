export const revalidate = 120

async function getBlogPost(id: string) {
  // Simulate fetching from an API with the "posts" tag
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { tags: ['posts', `post-${id}`] },
  })
  return res.json()
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getBlogPost(id)
  const now = new Date().toISOString()

  return (
    <main>
      <h1>Blog Post #{id} (ISR 30s + tag "posts")</h1>
      <div style={{ background: '#fff8f0', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <strong>Rendered at:</strong> <code>{now}</code>
      </div>
      <article style={{ marginTop: '1rem' }}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </article>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        This page uses <code>fetch</code> with <code>next: {'{'} tags: ["posts", "post-{id}"] {'}'}</code>.
        <br />
        Calling <code>revalidateTag("posts")</code> will purge ALL blog pages.
        <br />
        Calling <code>revalidateTag("post-{id}")</code> will purge only this page.
      </p>
      <h3>Expected Headers</h3>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
{`eo-cdn-cache-control: s-maxage=30, stale-while-revalidate=31536000, durable
cache-tag: /layout,/blog/[id]/layout,/blog/[id]/page,posts,post-${id}`}
      </pre>
    </main>
  )
}
