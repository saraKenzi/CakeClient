import './App.css';
import { Routes, Route } from 'react-router-dom';
import AllProducts from './features/product/AllProducts';
import ProductDetails from './features/product/ProductDetails';
import NavBar from './features/navBar/NavBar';
import AddProduct from './features/product/AddProduct';
import { useEffect } from 'react';
import Login from './features/user/Login';
import SignUp from './features/user/SignUp';
import { useDispatch } from 'react-redux';
import { userIn } from './features/user/userSlice';
import Profile from './features/user/Profile';
import MultiStepForm from './features/order/MultiStepForm';
import { red, grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import EditProduct from './features/product/EditProduct';
import ProtectedRoute from './utils/ProtectedRoute';
import NotFound from './features/NotFound';
import Carrousel from './features/product/CarrouselImg';
const nightStyle = createTheme({
  palette: {
    primary: {
      // light: red[50],
      main: red[200],
      // dark: red[900],
      contrastText: '#000',
    },
    secondary: {
      light: grey[900],
      main: grey[800],
      dark: grey[900],
      contrastText: '#000',
    },
    background: {
      // default: orange[50],
      // paper: orange[50]
    }
  }
});

function App() {
  document.dir = 'rtl';


  let dispatch = useDispatch();
  useEffect(() => {
    let u = localStorage.getItem("currentUser");
    if (u) {
      dispatch(userIn(JSON.parse(u)));
    }
  }, [])

  return (<div>
    <ThemeProvider theme={nightStyle}>
      <CssBaseline />

      <NavBar />
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path='/basket' element={<MultiStepForm />} />
        <Route path='/addProduct' element={<ProtectedRoute element={AddProduct} />} />
        <Route path='/editProduct' element={<ProtectedRoute element={EditProduct} />} />
        <Route path='/logIn' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </ThemeProvider>
  </div>);
}

export default App;
