
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from "./features/auth/pages/Login";
import PrivateRoute from "./components/Common/PrivteRoute";
import { store } from './app/store';
import AuthFeature from "./features/auth";
import { Provider } from "react-redux";
import NotFound from "components/Common/NotFound";
import Adminlayout from "components/Layout/AdminLayout";

import ThemeMuTiProvider from "components/Theme/ThemeProvider";
import RealTimeReloadData from "./components/Common/RealTimeReloadData";


function App() {
  return (
    <ThemeMuTiProvider >
      <CssBaseline />

      <Provider store={store}>
          <RealTimeReloadData />
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
    </ThemeMuTiProvider>
  );
}

export default App;
