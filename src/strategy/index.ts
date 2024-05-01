import inquirer from 'inquirer';
import { runExample as cepRunExample } from './cep';

export const StrategyExamples = {
  'cep': cepRunExample
};

export async function runStrategy() {
  const answers = await inquirer.prompt([
    {
      message: 'Select which example do you need',
      name: 'example',
      type: 'list',
      choices: Object.keys(StrategyExamples)
    }
  ]);

  const example = answers.example as keyof typeof StrategyExamples;
  const callback = StrategyExamples?.[example] ?? StrategyExamples.cep;

  await callback();
}