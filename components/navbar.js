import Head from 'next/head'
import Link from 'next/link'

export default function NavBar() {
  return (
    <>
    <h2 className="navigation">
      <nav>
        <Link href="/">
            <a className="nav-tab">Home</a>
        </Link>
        <Link href="/zoom">
            <a className="nav-tab">Zoom</a>
        </Link>
        <Link href="/jitsi">
            <a className="nav-tab">Jitsi</a>
        </Link>
      </nav>
    </h2>

    <style jsx>{`
      .nav-tab {
        margin-right: 15px;
      }
      .navigation {
        display: flex;
        justify-content: center;
      }
    `}</style>
    </>
  )
}
