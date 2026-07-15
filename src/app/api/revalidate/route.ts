import { NextRequest } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  const path = request.nextUrl.searchParams.get('path')
  const debug = request.nextUrl.searchParams.get('debug')

  // Debug endpoint: /api/revalidate?debug=1
  if (debug) {
    return Response.json({
      env: {
        PURGE_TOKEN: process.env.PURGE_TOKEN ? `${process.env.PURGE_TOKEN}` : 'NOT SET',
        IS_MAINLAND: process.env.IS_MAINLAND ?? 'NOT SET',
        SITE_HOST: process.env.SITE_HOST ?? 'NOT SET',
      },
      headers: {
        host: request.headers.get('host'),
        'eo-pages-host': request.headers.get('eo-pages-host'),
        'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
      },
    })
  }

  if (!tag && !path) {
    return Response.json({
      error: 'Missing "tag" or "path" query parameter',
      usage: {
        byTag: '/api/revalidate?tag=posts',
        byPath: '/api/revalidate?path=/isr',
        debug: '/api/revalidate?debug=1',
      },
    }, { status: 400 })
  }

  if (tag) {
    console.log(`[ISR-DEBUG] revalidateTag("${tag}") called`)
    console.log(`[ISR-DEBUG] PURGE_TOKEN=${process.env.PURGE_TOKEN ? 'SET' : 'NOT SET'}`)
    console.log(`[ISR-DEBUG] IS_MAINLAND=${process.env.IS_MAINLAND}`)
    console.log(`[ISR-DEBUG] host=${request.headers.get('host')}`)
    console.log(`[ISR-DEBUG] eo-pages-host=${request.headers.get('eo-pages-host')}`)
    revalidateTag(tag)
    return Response.json({
      revalidated: true,
      type: 'tag',
      tag,
      now: Date.now(),
    })
  }

  if (path) {
    console.log(`[ISR-DEBUG] revalidatePath("${path}") called`)
    console.log(`[ISR-DEBUG] PURGE_TOKEN=${process.env.PURGE_TOKEN ? 'SET' : 'NOT SET'}`)
    console.log(`[ISR-DEBUG] IS_MAINLAND=${process.env.IS_MAINLAND}`)
    console.log(`[ISR-DEBUG] host=${request.headers.get('host')}`)
    console.log(`[ISR-DEBUG] eo-pages-host=${request.headers.get('eo-pages-host')}`)
    revalidatePath(path)
    return Response.json({
      revalidated: true,
      type: 'path',
      path,
      now: Date.now(),
    })
  }

  return Response.json({ error: 'unexpected' }, { status: 500 })
}
