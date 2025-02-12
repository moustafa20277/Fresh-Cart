import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TokenContextprovider from './Context/TokenContext'
import Protectedroutes from './components/protectedRoutes/Protectedroutes'
import CartContextprovider from './Context/CartContext'
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Orders from './components/Orders/Orders'
import Cart from './components/cart/cart'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Payment from './components/Payment/Payment'
import LogIn from './components/LogIn/LogIn'
import NotFound from './components/NotFound/NotFound'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import WishList from './components/WishList/WishList'
import WishContextprovider from './Context/WishContext'
import { HelmetProvider } from 'react-helmet-async';








function App() {
  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Protectedroutes><Home /></Protectedroutes> },
        { path: 'products', element: <Protectedroutes><Products /></Protectedroutes> },
        { path: 'categories', element: <Protectedroutes><Categories /></Protectedroutes> },
        { path: 'brands', element: <Protectedroutes><Brands /></Protectedroutes> },
        { path: 'allorders', element: <Protectedroutes><Orders /></Protectedroutes> },
        { path: 'cart', element: <Protectedroutes><Cart /></Protectedroutes> },
        { path: 'productdetails/:id/:category', element: <Protectedroutes><ProductDetails /></Protectedroutes> },
        { path: 'payment/:cartId', element: <Protectedroutes><Payment /></Protectedroutes> },
        { path: 'washlist', element: <Protectedroutes><WishList /></Protectedroutes> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: 'verifycode', element: <VerifyCode /> },
        { path: 'login', element: <LogIn /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return (
    <TokenContextprovider>
      <CartContextprovider>
        <WishContextprovider>
          <HelmetProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
          </HelmetProvider>
        </WishContextprovider>
      </CartContextprovider>
    </TokenContextprovider>
  )
}

export default App
