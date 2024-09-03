"use client";

import { useState } from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Grid,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import UserForm from "../components/UserForm";
import WorkoutCard from "../components/WorkoutCard";
import db from "@/firebase";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Generate() {
  const { user } = useUser();
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSubmit = async (userSettings) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: userSettings,
      });

      if (!response.ok) {
        throw new Error("Failed to generate workout plan");
      }

      const data = await response.json();
      setWorkouts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error generating workout plan:", error);
      alert(
        "An error occurred while generating workout plan. Please try again."
      );
    }
  };

  const saveWorkout = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your workout.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);
      if (userDocSnap.exists()) {
        if (userDocSnap.data().workoutSets) {
          const setExists = userDocSnap
            .data()
            .workoutSets.some((set) => set.name === setName);
          if (setExists) {
            alert("A workout set with this name already exists.");
            setSetName("");
            return;
          }
        } else {
          const userData = userDocSnap.data();
          const updatedSets = [
            ...(userData.workoutSets || []),
            { name: setName },
          ];
          console.log("Updated sets:", updatedSets);
          batch.update(userDocRef, { workoutSets: updatedSets });
        }
      } else {
        batch.set(userDocRef, { workoutSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "workoutSets"), setName);

      batch.set(setDocRef, { workouts });

      await batch.commit();

      alert("Workout saved successfully!!!!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving workouts:", error);
      alert("An error occurred while saving workouts. Please try again.");
    }
  };

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
          Create Workout Plan
        </Typography>
        <UserForm handleSubmit={handleSubmit} />
      </Box>
      {loading && (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {workouts && (
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Workout Plan
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Save Workout Plan
            </Button>
          </Box>
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Save Workout Program</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your workout program.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Program Name"
                type="text"
                fullWidth
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={saveWorkout} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {workouts.days.map((day, index) => (
              <WorkoutCard key={index} day={day} />
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
