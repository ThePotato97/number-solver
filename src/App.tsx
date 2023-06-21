import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  Paper,
  FormControl,
  Button,
  FormLabel,
  TextField,
  Stack,
  Box,
  InputAdornment,
  IconButton,
  Chip,
  ListItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { format, solve } from "./math";
function App() {
  const [number, setNumber] = useState<string>("");
  const [answer, setAnswer] = useState<string[]>([]);
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
    if (!solved) return setAnswer(["No solution found"]);
    setAnswer(format(solved));
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
              {answer.map((ans, i) => {
                return (
                  <Typography
                    key={`${ans}-${i}`}
                    textAlign={"center"}
                    variant="h2"
                  >
                    {ans}
                  </Typography>
                );
              })}
            </FormControl>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default App;
