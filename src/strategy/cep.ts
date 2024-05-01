import inquirer from 'inquirer';
import { logger, loggerJson } from '../utils/logger';

type StrategyFindResponse = Promise<Record<string, string | number>>
abstract class Strategy {
  public abstract find(cep: string): StrategyFindResponse
}

class ViaCepStrategy implements Strategy {
  public async find(cep: string): StrategyFindResponse {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const viaCepData = await response.json();

    return viaCepData;
  }
}

class BrasilAbertoStrategy implements Strategy {
  public async find(cep: string): StrategyFindResponse {
    const response = await fetch(`https://api.brasilaberto.com/v1/zipcode/${cep}`);
    const brasilAbertoData = await response.json();

    return brasilAbertoData;
  }
}

class OpenCepStrategy implements Strategy {
  public async find(cep: string): StrategyFindResponse {
    const response = await fetch(`https://opencep.com/v1/${cep}`);
    const openCepData = await response.json();

    return openCepData;
  }
}

const strategiesList = {
  'via-cep': ViaCepStrategy,
  'brasil-aberto': BrasilAbertoStrategy,
  'open-cep': OpenCepStrategy,
}

class CepApi {
  private readonly DefaultStrategy = strategiesList['via-cep'];
  private currentStrategy: Strategy;

  constructor(currentStrategy: keyof typeof strategiesList) {
    this.currentStrategy = new this.DefaultStrategy();

    if (!!strategiesList[currentStrategy]) {
      const CurrentStrategy = strategiesList[currentStrategy];
      this.currentStrategy = new CurrentStrategy();
    }
  }

  public async find(cep: string) {
    return this.currentStrategy.find(cep);
  }
}

export async function runExample() {
  const answers = await inquirer.prompt([
    {
      message: 'Select CEP Strategy to find',
      name: 'strategy',
      type: 'list',
      choices: Object.keys(strategiesList)
    },
    {
      message: 'What CEP do you what to find?',
      name: 'cep',
      type: 'number'
    }
  ]);
  
  const strategy = answers.strategy;
  const cep = answers.cep;

  const cepContext = new CepApi(strategy);
  const cepData = await cepContext.find(cep);

  loggerJson.info({ strategy, ...cepData});
}