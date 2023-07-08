import Link from "next/link"

function Nav() {
  return (
    <>
    <nav>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/product'>Product</Link>
    </nav>
    </>
  )
}

export default Nav