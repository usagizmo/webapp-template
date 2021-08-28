import { ReactNode, VFC } from 'react'
import Head from 'next/head'

interface Props {
  children: ReactNode
  title: string
  description?: string
}

const Layout: VFC<Props> = ({
  children,
  title = 'Next.js Template',
  description = 'Next.js Template Description',
}) => {
  return (
    <div className="flex flex-col min-h-full">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextjs-template.io/" />
        <meta property="og:image" content="https://nextjs-template.io/images/ogp-fb.png" />
        <meta property="og:site_name" content="Next.js Template" />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://nextjs-template.io/images/ogp-tw.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* <link rel="canonical" href="https://nextjs-template.io/" /> */}
      </Head>
      <div className="flex-shrink-0">
        <header className="flex-center h-16">
          <h1 className="text-2xl font-medium">Next.js Template</h1>
        </header>
      </div>
      <div className="flex-shrink-0 flex-grow">
        <main>{children}</main>
      </div>
      <div className="flex-shrink-0">
        <footer className="flex-center h-10">
          <a
            className="text-xs"
            href="https://usagizmo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            @usagizmo
          </a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
