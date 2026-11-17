import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'
import { ImageWithFallback } from './image-with-fallback'

const components = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="mb-4 mt-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
      {...props}
    >
      {props.children}
    </h1>
  ),
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mb-4 mt-8 text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
      {...props}
    >
      {props.children}
    </h2>
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mb-3 mt-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
      {...props}
    >
      {props.children}
    </h3>
  ),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p
      className="mb-6 leading-relaxed text-slate-800 dark:text-slate-200"
      {...props}
    >
      {props.children}
    </p>
  ),
  a: (props: React.ComponentPropsWithoutRef<'a'>) => (
    <a
      className="font-medium text-emerald-600 underline underline-offset-4 hover:text-emerald-500"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
    </a>
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="my-6 ml-6 list-disc text-slate-700 dark:text-slate-300 [&>li]:mt-2"
      {...props}
    >
      {props.children}
    </ul>
  ),
  ol: (props: React.ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="my-6 ml-6 list-decimal text-slate-700 dark:text-slate-300 [&>li]:mt-2"
      {...props}
    >
      {props.children}
    </ol>
  ),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => (
    <li {...props}>{props.children}</li>
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="mt-6 border-l-4 border-emerald-500 pl-6 italic text-slate-800 dark:text-slate-200"
      {...props}
    >
      {props.children}
    </blockquote>
  ),
  img: (props: React.ComponentPropsWithoutRef<'img'>) => {
    const src = typeof props.src === 'string' ? props.src : ''
    if (!src) return null
    return <ImageWithFallback src={src} alt={props.alt || 'Blog Image'} />
  },
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm shadow-lg dark:border-slate-800"
      {...props}
    >
      {props.children}
    </pre>
  ),
  code: (props: React.ComponentPropsWithoutRef<'code'>) => {
    if (typeof props.children === 'string' && !props.className) {
      return (
        <code
          className="rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm text-emerald-600 dark:bg-slate-800 dark:text-emerald-400"
          {...props}
        >
          {props.children}
        </code>
      )
    }
    return (
      <code className={props.className} {...props}>
        {props.children}
      </code>
    )
  },
  table: (props: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-sm" {...props}>
        {props.children}
      </table>
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-slate-100 dark:bg-slate-800/60" {...props}>
      {props.children}
    </thead>
  ),
  tr: (props: React.ComponentPropsWithoutRef<'tr'>) => (
    <tr
      className="border-b border-slate-200 last:border-0 even:bg-slate-50/60 dark:border-slate-800 dark:even:bg-slate-900/30"
      {...props}
    >
      {props.children}
    </tr>
  ),
  th: (props: React.ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border-r border-slate-200 px-4 py-3 text-left align-top font-semibold text-slate-900 last:border-r-0 dark:border-slate-700 dark:text-white"
      {...props}
    >
      {props.children}
    </th>
  ),
  td: (props: React.ComponentPropsWithoutRef<'td'>) => (
    <td
      className="border-r border-slate-200 px-4 py-3 align-top text-slate-700 last:border-r-0 dark:border-slate-800 dark:text-slate-300"
      {...props}
    >
      {props.children}
    </td>
  ),
}

/**
 * MDX render — Pages Router sürümü.
 *
 * App Router'da `next-mdx-remote/rsc` async server component olarak MDX'i render
 * anında derliyordu. Pages Router'da derleme `getStaticProps` içinde `serializeMdx()`
 * ile BUILD ZAMANINDA yapılır; burada yalnız hazır çıktı render edilir
 * (istek başına MDX derleme yok → daha hızlı ve yüksek RPS).
 */
export function MdxContent({
  source,
}: Readonly<{ source: MDXRemoteSerializeResult }>) {
  return (
    <div className="prose-emerald prose-lg dark:prose-invert w-full max-w-none text-slate-800 dark:text-slate-200">
      <MDXRemote {...source} components={components} />
    </div>
  )
}
