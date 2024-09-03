import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Container>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Overfit Training</Typography>
          <Box>
            <Button>
              <Link sx={{ color: "white" }} href="/sign-in">
                Sign In
              </Link>
            </Button>
            <Button>
              <Link sx={{ color: "white" }} href="/sign-up">
                Sign Up
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <SignUp />
      </Box>
    </Container>
  );
}
