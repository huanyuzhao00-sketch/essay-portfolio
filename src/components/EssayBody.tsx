export default function EssayBody({ html }: { html: string }) {
  return (
    <div
      className="
        text-base text-ink-light leading-[2.2] max-w-reading mx-auto
        [&>p]:text-indent
        [&>p]:mb-0
        [&>p+p]:mt-0
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
