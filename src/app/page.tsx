export default function Home() {
  return (
    <main>
      <h1>ISR Demo</h1>
      <p>This demo tests Incremental Static Regeneration on EdgeOne Pages.</p>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Route</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Type</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><code>/isr</code></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>ISR (10s)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp updates after 10s stale window</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><code>/blog/[id]</code></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>ISR (30s) + tag "posts"</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>revalidateTag("posts") purges all blog pages</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><code>/ssg</code></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>SSG (static)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Never changes after build</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><code>/ssr</code></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>SSR (dynamic)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Fresh render every request</td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginTop: '2rem' }}>Test Endpoints</h2>
      <ul>
        <li><code>GET /api/revalidate?tag=posts</code> — purge all pages tagged "posts"</li>
        <li><code>GET /api/revalidate?path=/isr</code> — purge a specific path</li>
      </ul>
    </main>
  )
}
