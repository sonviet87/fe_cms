
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from "./features/auth/pages/Login";
import PrivateRoute from "./components/Common/PrivteRoute";
import DashBoard from "./features/admin/dashboard/pages/DashBoard";
import { store } from './app/store';
import AuthFeature from "./features/auth";
import { Provider } from "react-redux";
import NotFound from "components/Common/NotFound";
import Adminlayout from "components/Layout/AdminLayout";
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<AuthFeature />} />
            <Route exact path="login" element={<Login />} />
            <Route exact path='/admin/*' element={<PrivateRoute><Adminlayout /> </PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider >
    </ThemeProvider>
  );
}

export default App;
