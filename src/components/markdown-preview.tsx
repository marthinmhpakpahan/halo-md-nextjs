export function MarkdownPreview({ markdown }: { markdown: string }) {
  return <pre className="markdown-preview">{markdown}</pre>;
}
