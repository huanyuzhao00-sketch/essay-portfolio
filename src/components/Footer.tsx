'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'admin_doremi_stats'

export default function Footer() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if already unlocked
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      setIsAdmin(true)
      loadScript()
      return
    }
    // Check if visiting with secret key
    const params = new URLSearchParams(window.location.search)
    if (params.get('stats') === 'doremi') {
      localStorage.setItem(STORAGE_KEY, '1')
      setIsAdmin(true)
      loadScript()
    }
  }, [])

  function loadScript() {
    const script = document.createElement('script')
    script.async = true
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    document.body.appendChild(script)
  }

  return (
    <footer className="border-t border-warm-line py-8 text-center font-sans">
      {isAdmin && (
        <p className="text-xs text-text-muted tracking-wider mb-2">
          <span id="busuanzi_container_site_pv" style={{ display: 'none' }}>
            总访问 <span id="busuanzi_value_site_pv" /> 次
          </span>
          <span className="mx-2">·</span>
          <span id="busuanzi_container_site_uv" style={{ display: 'none' }}>
            <span id="busuanzi_value_site_uv" /> 位访客
          </span>
        </p>
      )}
      <p className="text-xs text-ink font-bold tracking-wider">
        &copy; {new Date().getFullYear()} 夜航船
      </p>
    </footer>
  )
}
