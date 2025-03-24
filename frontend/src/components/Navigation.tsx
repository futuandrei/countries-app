import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Favorite, Lock, Brightness4, Brightness7 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

interface NavigationProps {
  toggleTheme: () => void;
  themeMode: "light" | "dark";
}

export const Navigation = ({ toggleTheme, themeMode }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                <ListItem
                  button
                  component={RouterLink}
                  to="/test"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Test" />
                </ListItem>
                <ListItem
                  button
                  component={RouterLink}
                  to="/countries"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Countries" />
                </ListItem>
                {user && (
                  <ListItem
                    button
                    component={RouterLink}
                    to="/favorites"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary="Favorites" />
                  </ListItem>
                )}
                <ListItem
                  button
                  component={RouterLink}
                  to="/protected"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Protected data" />
                </ListItem>
                <ListItem button onClick={toggleTheme}>
                  <ListItemText primary="Toggle Theme" />
                </ListItem>
                {user ? (
                  <ListItem button onClick={signOut}>
                    <ListItemText primary={`Logout (${user.email})`} />
                  </ListItem>
                ) : (
                  <ListItem
                    button
                    component={RouterLink}
                    to="/login"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary="Login" />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <Button color="inherit" component={RouterLink} to="/test">
              Test
            </Button>
            <Button color="inherit" component={RouterLink} to="/countries">
              Countries
            </Button>
            {user && (
              <Button
                color="inherit"
                component={RouterLink}
                to="/favorites"
                startIcon={<Favorite />}
              >
                Favorites
              </Button>
            )}
            <Button
              color="inherit"
              component={RouterLink}
              to="/protected"
              startIcon={<Lock />}
            >
              Protected data
            </Button>
            <Tooltip title="Toggle light/dark theme">
              <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleTheme}>
                {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            {user ? (
              <Button color="inherit" onClick={signOut}>
                Logout ({user.email})
              </Button>
            ) : (
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
