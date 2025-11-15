import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './Components/Context/AuthContext';
import { NewsProvider } from './Components/Context/NewsContext';

// Layout Components
import Header from './Components/Common/Header';
import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';

// Auth Components
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

// Pages
import Home from './Components/Pages/Home';
import NewsDetailPage from './Components/News/NewsDetail';
import CategoryPage from './Components/Pages/CategoryPage';
import SearchResults from './Components/Pages/SearchResults';
import AdminDashboard from './Components/Pages/AdminDashboard';
import NotFound from './Components/Pages/NotFound';

// ======================================
// Scroll To Top Component
// ======================================
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ======================================
// Layout Wrapper: hide header/navbar/footer on auth pages
// ======================================
const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const hideLayout =
    pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}

      <main className="flex-1">{children}</main>

      {!hideLayout && <Footer />}
    </>
  );
};

// ======================================
// MAIN APP COMPONENT
// ======================================
function App() {
  return (
    <Router>
      <AuthProvider>
        <NewsProvider>
          <ScrollToTop />

          <div className="App min-h-screen flex flex-col bg-gray-50">

            <Layout>
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/search" element={<SearchResults />} />

                {/* Auth Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Protected Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </NewsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
