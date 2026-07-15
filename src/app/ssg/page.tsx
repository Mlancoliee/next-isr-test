export default function SSGPage() {
  const buildTime = new Date().toISOString()

  return (
    <main>
      <h1>SSG Page (fully static)</h1>
      <p>This page is generated at build time and never revalidates.</p>
      <div style={{ background: '#f0fff0', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <strong>Built at:</strong> <code>{buildTime}</code>
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        This timestamp never changes — served directly from EdgeOne filesystem cache.
      </p>
    </main>
  )
}
