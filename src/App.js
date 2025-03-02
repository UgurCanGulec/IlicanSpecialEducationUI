import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css'
import Footer from './components/Footer';
import { AppProvider, useAppContext } from './context/AppContext';
import Spin from './components/Spin';

function App() {

  const {
    isLoading
  } = useAppContext()

  return (
    <Spin spinner={isLoading}>
      <Navbar />
      <Outlet />
      <Footer />
    </Spin>
  );
}

export default function Application(props) {
  return (
    <AppProvider>
      <App {...props} />
    </AppProvider>
  );
}
