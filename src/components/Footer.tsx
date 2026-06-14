export default function Footer() {
  return (
    <footer className="border-t border-warm-line py-8 text-center">
      <p className="text-xs text-text-muted tracking-wider font-sans">
        &copy; {new Date().getFullYear()} 夜航船
      </p>
    </footer>
  )
}
