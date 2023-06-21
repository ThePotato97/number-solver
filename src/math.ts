type Step =
  | {
      op: "+";
      lhs: number;
      rhs: number;
    }
  | {
      op: "-";
      lhs: number;
      rhs: number;
    }
  | {
      op: "*";
      lhs: number;
      rhs: number;
    }
  | {
      op: "/";
      lhs: number;
      rhs: number;
    };

export type Solution = {
  steps: Step[];
  numbers: number[];
};

export function solve(target: number, numbers: number[]): Solution | null {
  const first: Solution = {
    numbers: numbers,
    steps: [],
  };

  const open: Solution[] = [first];

  let head = 0;
  let tail = 0;

  while (tail >= head) {
    const current = open[head];
    head += 1;

    const { numbers, steps } = current;

    for (const number of numbers) {
      if (number === target) {
        return current;
      }
    }

    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        const addNumbers = [...numbers];
        const addSteps = [...steps];
        addNumbers[i] = numbers[i] + numbers[j];
        addNumbers.splice(j, 1);
        addSteps.push({
          op: "+",
          lhs: numbers[i],
          rhs: numbers[j],
        });
        tail += 1;
        open[tail] = {
          numbers: addNumbers,
          steps: addSteps,
        };

        const mulNumbers = [...numbers];
        const mulSteps = [...steps];
        mulNumbers[i] = numbers[i] * numbers[j];
        mulNumbers.splice(j, 1);
        mulSteps.push({
          op: "*",
          lhs: numbers[i],
          rhs: numbers[j],
        });
        tail += 1;
        open[tail] = {
          numbers: mulNumbers,
          steps: mulSteps,
        };
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        if (i === j) {
          continue;
        }

        const number0 = numbers[i];
        const number1 = numbers[j];

        if (number0 >= number1) {
          const subNumbers = [...numbers];
          const subSteps = [...steps];
          subNumbers[i] = number0 - number1;
          subNumbers.splice(j, 1);
          subSteps.push({
            op: "-",
            lhs: number0,
            rhs: number1,
          });
          tail += 1;
          open[tail] = {
            numbers: subNumbers,
            steps: subSteps,
          };
        }

        if (number0 % number1 === 0) {
          const divNumbers = [...numbers];
          const divSteps = [...steps];
          divNumbers[i] = number0 / number1;
          divNumbers.splice(j, 1);
          divSteps.push({
            op: "/",
            lhs: number0,
            rhs: number1,
          });
          tail += 1;
          open[tail] = {
            numbers: divNumbers,
            steps: divSteps,
          };
        }
      }
    }
  }

  return null;
}

export function format(solution: Solution): string[] {
  const lines: string[] = [];

  for (let i = 0; i < solution.steps.length; i++) {
    const step = solution.steps[i];
    let res = 0;
    if (step.op === "+") {
      res = step.lhs + step.rhs;
    } else if (step.op === "-") {
      res = step.lhs - step.rhs;
    } else if (step.op === "*") {
      res = step.lhs * step.rhs;
    } else {
      res = step.lhs / step.rhs;
    }
    lines[i] = `${step.lhs} ${step.op} ${step.rhs} = ${res}`;
  }

  return lines;
}
