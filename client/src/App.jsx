import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./pages/CreateListing"
import UpdateListing from "./pages/UpdateListing"
import Listing from './pages/Listing'
import Search from "./pages/Search"
import { Toaster } from 'react-hot-toast';
import ForgotPassword from "./pages/ForgotPassword"
import CheckOTP from "./pages/CheckOTP"
const App = () => {
  return (
  <BrowserRouter>
    <Toaster />
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/listing/:listingId" element={<Listing />}/>
      <Route path="/check-otp" element={<CheckOTP />}/>
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-listing" element={<CreateListing />}/>
        <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App