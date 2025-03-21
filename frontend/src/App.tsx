import { AppBar, Box } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import { Login } from "./components/Auth/Login";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import ProtectedTestData from "./components/ProtectedTestData";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import Favorites from "./components/Favorites";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box sx={{ p: 0 }}>
          {/* Basic navigation */}
          <Navigation />
          <Box sx={{ mb: 3 }}>
            {/* <Link to="/" style={{ marginRight: "1rem" }}>
              Home
            </Link> */}
            {/* <Link to="/test">Test Data</Link> */}
          </Box>

          {/* Routes */}
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <AuthRedirect />
                  <Login />
                </>
              }
            />
            <Route path="/test" element={<TestData />} />
            <Route path="/countries" element={<CountriesList />} />
            <Route path="/countries/:name" element={<CountryDetail />} />
            {/* <Route path="/favorites" element={<Favorites />} /> */}
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <>
                    <ProtectedTestData />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <>
                    <Favorites />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
