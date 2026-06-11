import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Products from './components/Products'
import Stats from './components/Stats'
import Gallery from './components/Gallery'
import OrderCTA from './components/OrderCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Notifications from './components/Notifications'
import AuthModal from './components/AuthModal'
import CartDrawer from './components/CartDrawer'

function App() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Products />
        <Stats />
        <Gallery />
        <OrderCTA />
        <Contact />
      </main>
      <Footer />
      <Notifications />
      <AuthModal />
      <CartDrawer />
    </>
  )
}

export default App
