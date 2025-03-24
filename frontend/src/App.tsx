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
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme"; // instead of importing a static 'theme'
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Box sx={{ p: 0 }}>
            <Navigation toggleTheme={toggleTheme} />
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
    </ThemeProvider>
  );
}

export default App;
