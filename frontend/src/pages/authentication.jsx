import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Snackbar,
  Alert,
  Typography,
  Slide,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";

const theme = createTheme();

/* Snackbar animation */
function SlideDownTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function Authentication() {
  const { Login, handleRegister } = useContext(AuthContext);

  const [formState, setFormState] = useState(0); // 0 = login, 1 = register
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState === 0) {
      const ok = await Login(formData.username, formData.password);
      ok
        ? showSnack("Login successful 🎉", "success")
        : showSnack("Invalid username or password", "error");
    } else {
      const msg = await handleRegister(
        formData.fullname,
        formData.username,
        formData.password
      );
      msg
        ? showSnack(msg, "success")
        : showSnack("Registration failed", "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ROOT CONTAINER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // 🔥 mobile vs desktop
          height: "100vh",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {/* IMAGE SECTION */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "35vh", md: "100%" },
            flexShrink: 0,
          }}
        >
          <img
            src="https://picsum.photos/id/1015/1600/900"
            alt="auth"
            loading="eager"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        {/* FORM SECTION */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fafafa",
            overflowY: "auto",
            px: { xs: 2, sm: 4 },
          }}
        >
          <Paper
            elevation={4}
            sx={{
              width: "100%",
              maxWidth: 420,
              p: { xs: 3, sm: 4 },
            }}
          >
            <Avatar sx={{ mx: "auto", bgcolor: "secondary.main", mb: 1 }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5" align="center" mb={2}>
              {formState === 0 ? "Sign In" : "Sign Up"}
            </Typography>

            {/* Toggle Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Button
                size="small"
                variant={formState === 0 ? "contained" : "text"}
                onClick={() => setFormState(0)}
              >
                Login
              </Button>
              <Button
                size="small"
                variant={formState === 1 ? "contained" : "text"}
                onClick={() => setFormState(1)}
              >
                Register
              </Button>
            </Box>

            {/* FORM */}
            <Box component="form" onSubmit={handleSubmit}>
              {formState === 1 && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              )}

              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                {formState === 0 ? "Sign In" : "Sign Up"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* 🔔 IMPROVED SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideDownTransition}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack({ ...snack, open: false })}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
