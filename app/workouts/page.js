"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import db from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import WorkoutCard from "../components/WorkoutCard";

export default function Workouts() {
  const { isLoaded, isSignedIn, user } = useUser() || {};
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;
      setLoading(true); // Start loading when the function is triggered
      try {
        if (user) {
          // Reference to the workoutSets subcollection for the specific user
          const workoutSetsRef = collection(db, `users/${user.id}/workoutSets`);

          const workoutSetsSnap = await getDocs(workoutSetsRef);
          // Check if we have documents in the sub  collection
          if (!workoutSetsSnap.empty) {
            const workoutSetsData = workoutSetsSnap.docs.map((doc) => {
              return { name: doc.id, workout: doc.data() };
            });
            setWorkouts(workoutSetsData);
          } else {
            setWorkouts([]);
            console.log("No workout sets found.");
          }
        }
      } catch (error) {
        console.error("Error fetching workout sets:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched or error occurs
      }
    };

    fetchWorkouts();
  }, [user]);

  return (
    <Container maxWidth="md">
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
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Workouts
        </Typography>
      </Box>
      {loading && (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {isLoaded && !isSignedIn && (
        <Typography variant="body1">
          Please sign in to view your workouts.
        </Typography>
      )}
      {workouts && workouts.length === 0 && (
        <Typography variant="body1">
          You have no workouts. Try creating a new workout.
        </Typography>
      )}
      {workouts && (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {workouts.map((workout, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6">{workout.name}</Typography>
                <Grid
                  container
                  spacing={2}
                  xs={{ display: "flex", flexDirection: "row" }}
                >
                  {workout.workout.workouts.days.map((day, index) => (
                    <WorkoutCard key={index} day={day} />
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
