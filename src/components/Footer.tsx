export default function Footer() {
  return (
    <footer className="border-t border-warm-line py-8 text-center font-sans">
      <p className="text-xs text-text-muted tracking-wider mb-2">
        <span id="busuanzi_container_site_pv" style={{ display: 'none' }}>
          总访问 <span id="busuanzi_value_site_pv" /> 次
        </span>
        <span className="mx-2">·</span>
        <span id="busuanzi_container_site_uv" style={{ display: 'none' }}>
          <span id="busuanzi_value_site_uv" /> 位访客
        </span>
      </p>
      <p className="text-xs text-ink font-bold tracking-wider">
        &copy; {new Date().getFullYear()} 夜航船
      </p>
    </footer>
  )
}
