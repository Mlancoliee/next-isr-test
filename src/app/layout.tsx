export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <a href="/">Home</a>
          <a href="/isr">ISR (10s)</a>
          <a href="/ssg">SSG</a>
          <a href="/ssr">SSR</a>
          <a href="/blog/1">Blog 1</a>
          <a href="/blog/2">Blog 2</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
