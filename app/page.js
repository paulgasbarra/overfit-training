"use client";

import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";

export default function Home() {
  const { isSignedIn, user } = useUser();

  const handleEnterButton = () => {
    if (isSignedIn) {
      window.location.href = "/generate";
    } else {
      alert("Please sign up or sign in to access this feature.");
    }
  };

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSessionJson.statusCode === 500) {
      console.error(checkoutSessionJson.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn("Error:", error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Head>
        <title>Overfit Training</title>
        <meta
          name="description"
          content="Generate a workout plan using OpenAI's GPT-4 model."
        />
      </Head>
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
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2">Welcome to Overfit AI Training</Typography>
        <Typography variant="h5">
          Personalized Fitness Regimens Powered by Artificial Intellegence
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleEnterButton}
        >
          Get Fit!
        </Button>
      </Box>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Typography variant="h6">Personalized Workouts</Typography>
            <Typography>
              Get a personalized weekly workout plan tailored to your fitness
              goals.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Nutrition Plans</Typography>
            <Typography>
              Get a personalized nutrition plan tailored to your fitness goals.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Progress Tracking</Typography>
            <Typography>
              Track your progress and see how you're improving over time.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                height: "100%",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                },
                "&:active": {
                  cursor: "pointer",
                  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                },
              }}
              onClick={handleSubmit}
            >
              <Typography variant="h6">$1/month</Typography>
              <Typography>
                Get one personalized workout plan tailored to your fitness
                goals.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                height: "100%",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                },
                "&:active": {
                  cursor: "pointer",
                  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                },
              }}
              onClick={handleSubmit}
            >
              <Typography variant="h6">$2/month</Typography>
              <Typography>
                Get two personalized workout plans tailored to your fitness
                goals.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                height: "100%",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                },
                "&:active": {
                  cursor: "pointer",
                  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                },
              }}
              onClick={handleSubmit}
            >
              <Typography variant="h6">$5/month</Typography>
              <Typography>
                Get unlimited personalized workout plans tailored to your
                fitness goals.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
