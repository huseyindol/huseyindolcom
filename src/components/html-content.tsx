import DOMPurify from 'isomorphic-dompurify'
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from 'html-react-parser'
import React from 'react'
import { ImageWithFallback } from './image-with-fallback'

interface BlockProps {
  children?: React.ReactNode
}

const H1 = ({ children, ...rest }: BlockProps) => (
  <h1
    className="mb-4 mt-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
    {...rest}
  >
    {children}
  </h1>
)

const H2 = ({ children, ...rest }: BlockProps) => (
  <h2
    className="mb-4 mt-8 text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
    {...rest}
  >
    {children}
  </h2>
)

const H3 = ({ children, ...rest }: BlockProps) => (
  <h3
    className="mb-3 mt-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
    {...rest}
  >
    {children}
  </h3>
)

const P = ({ children, ...rest }: BlockProps) => (
  <p
    className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300"
    {...rest}
  >
    {children}
  </p>
)

const A = ({ href, children, ...rest }: BlockProps & { href?: string }) => (
  <a
    href={href}
    className="font-medium text-emerald-600 underline underline-offset-4 hover:text-emerald-500"
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  >
    {children}
  </a>
)

const UL = ({ children, ...rest }: BlockProps) => (
  <ul
    className="my-6 ml-6 list-disc text-slate-700 dark:text-slate-300 [&>li]:mt-2"
    {...rest}
  >
    {children}
  </ul>
)

const OL = ({ children, ...rest }: BlockProps) => (
  <ol
    className="my-6 ml-6 list-decimal text-slate-700 dark:text-slate-300 [&>li]:mt-2"
    {...rest}
  >
    {children}
  </ol>
)

const Blockquote = ({ children, ...rest }: BlockProps) => (
  <blockquote
    className="mt-6 border-l-4 border-emerald-500 pl-6 italic text-slate-800 dark:text-slate-200"
    {...rest}
  >
    {children}
  </blockquote>
)

const Pre = ({ children, ...rest }: BlockProps) => (
  <pre
    className="border-l-primary/60 my-6 overflow-x-auto rounded-lg border border-l-4 border-border bg-transparent p-4 font-mono text-sm text-foreground"
    {...rest}
  >
    {children}
  </pre>
)

const InlineCode = ({ children, ...rest }: BlockProps) => (
  <code
    className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-primary dark:bg-slate-800/60 dark:text-emerald-400"
    {...rest}
  >
    {children}
  </code>
)

const Img = ({ src, alt }: { src?: string; alt?: string }) => {
  if (!src) return null
  return <ImageWithFallback src={src} alt={alt || 'Blog Image'} />
}

const parserOptions: HTMLReactParserOptions = {
  replace: domNode => {
    if (!(domNode instanceof Element)) return undefined

    const kids = () => domToReact(domNode.children as DOMNode[], parserOptions)

    switch (domNode.tagName) {
      case 'h1':
        return <H1>{kids()}</H1>
      case 'h2':
        return <H2>{kids()}</H2>
      case 'h3':
        return <H3>{kids()}</H3>
      case 'p':
        return <P>{kids()}</P>
      case 'a':
        return <A href={domNode.attribs.href}>{kids()}</A>
      case 'ul':
        return <UL>{kids()}</UL>
      case 'ol':
        return <OL>{kids()}</OL>
      case 'blockquote':
        return <Blockquote>{kids()}</Blockquote>
      case 'pre':
        return <Pre>{kids()}</Pre>
      case 'code':
        // Block code stays as-is inside <pre>; only style inline <code>.
        if (
          domNode.parent &&
          'tagName' in domNode.parent &&
          domNode.parent.tagName === 'pre'
        ) {
          return undefined
        }
        return <InlineCode>{kids()}</InlineCode>
      case 'img':
        return <Img src={domNode.attribs.src} alt={domNode.attribs.alt} />
      default:
        return undefined
    }
  },
}

export function HtmlContent(props: Readonly<{ source: string }>) {
  const clean = DOMPurify.sanitize(props.source, {
    USE_PROFILES: { html: true },
  })

  return (
    <div className="prose-emerald prose-lg dark:prose-invert w-full max-w-none">
      {parse(clean, parserOptions)}
    </div>
  )
}
