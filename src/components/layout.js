// import Navbar from './navbar'
// import Footer from './footer'

const Navbar = ()=>{
    return <h2>Header</h2>
}

const Footer = ()=>{
    return <h2>Footer</h2>
}
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
