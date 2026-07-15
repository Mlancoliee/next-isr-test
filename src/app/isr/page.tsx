export const revalidate = 10

export default function ISRPage() {
  const now = new Date().toISOString()

  return (
    <main>
      <h1>ISR Page (revalidate = 10s)</h1>
      <p>This page is statically generated and revalidates every 10 seconds.</p>
      <div style={{ background: '#f0f8ff', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <strong>Rendered at:</strong> <code>{now}</code>
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Refresh multiple times — timestamp stays the same until 10s passes,
        then updates on the next request after stale.
      </p>
      <h3>Expected Headers</h3>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
{`eo-cdn-cache-control: s-maxage=10, stale-while-revalidate=31536000, durable
cache-control: public, max-age=0, must-revalidate
cache-tag: /layout,/isr/layout,/isr/page,/isr`}
      </pre>
    </main>
  )
}
