import { useState } from "react";
import {
  Paper,
  FormControl,
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Chip,
  Typography,
  Collapse,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import { TransitionGroup } from "react-transition-group";
import { Solution, solve } from "./math";

function App() {
  const [number, setNumber] = useState<string>("");
  const [answer, setAnswer] = useState<Solution>();
  const [numbers, setNumbers] = useState<Array<number>>([]);

  const calculateNumber = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const target = data.get("target") as string;
    console.log(target);
    if (!target) return;
    const targetNumber = parseInt(target);
    console.log(targetNumber);
    if (isNaN(targetNumber)) return;
    const solved = solve(targetNumber, numbers);
    console.log(solved);
    if (!solved) return;
    setAnswer(solved);
  };

  const handleAddNumber = () => {
    const newNumber = parseInt(number);
    if (isNaN(newNumber)) return;
    setNumbers([...numbers, newNumber]);
    setNumber("");
  };
  const handleDelete = (chipToDelete: number) => () => {
    setNumbers((oldNumbers) => {
      const clone = [...oldNumbers];
      console.log("oldNumbers", chipToDelete);
      clone.splice(chipToDelete, 1);
      return clone;
    });
  };
  return (
    <>
      <Box
        id="root"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form onSubmit={calculateNumber}>
            <FormControl>
              <TextField
                sx={{
                  minWidth: "400px",
                }}
                InputProps={{ inputProps: { min: 0 } }}
                label="Target Number"
                name="target"
                type="number"
              />
              <br />
              <Paper
                elevation={2}
                sx={{
                  display: "flex",
                  direction: "row",
                  flexWrap: "wrap",
                  gap: 1,
                  maxWidth: "400px",
                  p: 1,
                }}
              >
                {numbers.map((num, i) => {
                  return (
                    <Chip
                      key={`${num}-${i}`}
                      onDelete={handleDelete(i)}
                      sx={{
                        px: 1,
                      }}
                      label={num}
                    />
                  );
                })}
              </Paper>
              <br />
              <TextField
                label="Add Number"
                id="target"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleAddNumber}
                        edge="end"
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <Button type="submit" variant="contained">
                Solve
              </Button>
            </FormControl>
          </form>
          <TransitionGroup>
            {answer?.steps.map(({ lhs, op, rhs }, i) => {
              const result = eval(`${lhs} ${op} ${rhs}`);
              return (
                <Collapse key={`${lhs} ${op} ${rhs} ${i}`}>
                  <Paper
                    elevation={2}
                    sx={{ flexGrow: 1, minWidth: "550px", mt: 5 }}
                  >
                    <Grid container spacing={3}>
                      <Grid xs={3}>
                        <Typography textAlign="center" variant="h2">
                          {lhs}
                        </Typography>
                      </Grid>
                      <Grid xs={1}>
                        <Typography textAlign="center" variant="h2">
                          {op}
                        </Typography>
                      </Grid>
                      <Grid xs={3}>
                        <Typography textAlign="center" variant="h2">
                          {rhs}
                        </Typography>
                      </Grid>
                      <Grid xs={1}>
                        <Typography textAlign="center" variant="h2">
                          {"="}
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Typography textAlign="center" variant="h2">
                          {result}
                        </Typography>
                      </Grid>
                      {/* {ans.split(" ").map((word) => (
                      <Typography key={`${ans}-${i}`} variant="h2">
                        {word}
                      </Typography>
                    ))} */}
                    </Grid>
                  </Paper>
                </Collapse>
              );
            })}
          </TransitionGroup>
        </Paper>
      </Box>
    </>
  );
}

export default App;
