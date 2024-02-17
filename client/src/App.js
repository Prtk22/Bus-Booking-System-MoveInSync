import React, { lazy, Suspense, useState } from "react";
import "./index.css";
import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminBookings = lazy(() => import("./pages/Admin/AdminBookings"));
const AdminBuses = lazy(() => import("./pages/Admin/AdminBuses"));
const AdminUsers = lazy(() => import("./pages/Admin/AdminUsers"));
const Home = lazy(() => import("./pages/Home"));
const BookNow = lazy(() => import("./pages/BookNow"));
const Bookings = lazy(() => import("./pages/Bookings"));

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const showLoading = () => {
    setLoading(true);
  }
  const hideLoading = () => {
    setLoading(true);
  }
  return (
    <div className="App">
      {loading && <Loader />}
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute >
                  <Index showLoading={showLoading} hideLoading={hideLoading} />
                </PublicRoute>
              }
            />
            <Route
              path="/bus-booking"
              element={
                <ProtectedRoute user={user} setUser={setUser} showLoading={showLoading} hideLoading={hideLoading}>
                  <Home showLoading={showLoading} hideLoading={hideLoading}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings"
              element={
                <ProtectedRoute user={user} setUser={setUser} showLoading={showLoading} hideLoading={hideLoading}>
                  <Bookings showLoading={showLoading} hideLoading={hideLoading}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/book-now/:id"
              element={
                <ProtectedRoute user={user} setUser={setUser} showLoading={showLoading} hideLoading={hideLoading}>
                  <BookNow showLoading={showLoading} hideLoading={hideLoading}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute user={user} setUser={setUser} showLoading={showLoading} hideLoading={hideLoading}>
                  <AdminBookings showLoading={showLoading} hideLoading={hideLoading}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/buses"
              element={
                <ProtectedRoute user={user} setUser={setUser} showLoading={showLoading} hideLoading={hideLoading}>
                  <AdminBuses showLoading={showLoading} hideLoading={hideLoading}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute user={user} setUser={setUser} showLoading={showLoading} hideLoading={hideLoading}>
                  <AdminUsers showLoading={showLoading} hideLoading={hideLoading}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login showLoading={showLoading} hideLoading={hideLoading}/>
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register showLoading={showLoading} hideLoading={hideLoading}/>
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
