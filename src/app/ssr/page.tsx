export const dynamic = 'force-dynamic'

export default function SSRPage() {
  const now = new Date().toISOString()

  return (
    <main>
      <h1>SSR Page (dynamic)</h1>
      <p>This page is rendered fresh on every request.</p>
      <div style={{ background: '#fff0f0', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <strong>Rendered at:</strong> <code>{now}</code>
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Refresh — timestamp changes every time. No caching.
      </p>
    </main>
  )
}
