import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { AppProvider, useApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { Home} from "./Home";
import { Users } from "./Users";
import { AppName } from "./AppName";
import atlasConfig from "../atlasConfig.json";
import "./App.css";
import {
  Link,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

const { appId } = atlasConfig;

export default function ProvidedApp() {
  return (
    <ThemeProvider>
      <AppProvider appId={appId}>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
}

function App() {
  const app = useApp();
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="sticky">
          <Toolbar>
            <AppName />
            {app.currentUser ? (
              <>
              {app.currentUser.customData.admin ? (
              <Link to={`/users`}>
                <Button variant="contained" color="primary">Users</Button>
              </Link>
              ): null}
              <Button
                variant="contained"
                color="secondary"
                onClick={async () => {
                  await app.logOut();
                }}
              >
                <Typography variant="button">Log Out</Typography>
              </Button>
              </>
            ) : null}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
