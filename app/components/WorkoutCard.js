import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const WorkoutCard = ({ day }) => {
  return (
    <Grid item xs={4}>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h5">{day.day}</Typography>
          <List>
            {day.exercises.map((exercise, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={exercise.name}
                  secondary={
                    <>
                      {exercise.duration
                        ? `Duration: ${exercise.duration}`
                        : exercise.sets && exercise.reps
                        ? `Sets: ${exercise.sets}, Reps: ${exercise.reps}`
                        : null}
                      <br />
                      {exercise.weight ? `Weight: ${exercise.weight}` : null}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WorkoutCard;
