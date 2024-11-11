import chalk from "chalk";

export const logger = {
  info: (message: string) => {
    console.log(chalk.green(message));
  },
  error: (message: string) => {
    console.log(chalk.red(message));
  },
};
