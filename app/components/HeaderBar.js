import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function HeaderBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Overfit Training</Typography>
        <Box>
          <SignedOut>
            <Button sx={{ color: "white" }} href="/sign-in">
              Sign In
            </Button>
            <Button sx={{ color: "white" }} href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
