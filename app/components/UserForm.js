import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function UserForm({ handleSubmit }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [currentFitness, setCurrentFitness] = useState("");

  const onSubmit = () => {
    handleSubmit({
      height: height,
      weight: weight,
      goal: goal,
      age: age,
      sex: sex,
      currentFitness: currentFitness,
    });
    // store user info and send to the backend to create a workout plan
  };

  return (
    <Box sx={{ my: 4, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            label="Enter height"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            label="Enter weight"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={age}
            onChange={(e) => setAge(e.target.value)}
            label="Enter age"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-sex-label">Sex</InputLabel>
            <Select
              value={sex}
              labelId="select-sex-label"
              id="sex-select"
              label="Sex"
              onChange={(e) => setSex(e.target.value)}
              sx={{ mb: 2, width: "100%" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-fitness-label">Current Fitness</InputLabel>
            <Select
              value={currentFitness}
              labelId="select-fitness-label"
              id="fitness-select"
              label="Current Fitness"
              onChange={(e) => setCurrentFitness(e.target.value)}
              sx={{ mb: 2, width: "100%" }}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
              <MenuItem value="athlete">Athlete</MenuItem>
              <MenuItem value="elite">Elite</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-goal-label">Select Goal</InputLabel>
            <Select
              value={goal}
              labelId="select-goal-label"
              id="goal-select"
              label="Select goal"
              onChange={(e) => setGoal(e.target.value)}
              sx={{ mb: 2, width: "100%" }}
            >
              <MenuItem value="lose weight">Lose Weight</MenuItem>
              <MenuItem value="gain muscle">Gain Muscle</MenuItem>
              <MenuItem value="cardiovascular health">
                Improve Cardiovascular Health
              </MenuItem>
              <MenuItem value="athletic performance">
                Improve Athletic Performance
              </MenuItem>
              <MenuItem value="flexibility">
                Improve Flexibility and Mobility
              </MenuItem>
              <MenuItem value="get fit">Get Fit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button variant="contained" onClick={onSubmit}>
        Generate Workout Plan
      </Button>
    </Box>
  );
}

export default UserForm;
