import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runStrategy } from './strategy';
import { logger } from './utils/logger';

const PatternsExamples = {
  'strategy': runStrategy
}

yargs(hideBin(process.argv))
  .command('$0 [pattern]', 'select the pattern example', (yargs) => {
    return yargs
      .option('pattern', {
        default: 'ssdadasd'
      })
  }, async (argv) => {
    logger.info(`pattern selected is ${argv.pattern}`);
    if (!argv.pattern || !(argv.pattern in PatternsExamples)) return;

    const argPattern = argv.pattern as keyof typeof PatternsExamples;
    const pattern = PatternsExamples[argPattern] ?? PatternsExamples.strategy;

    await pattern();
  })
  .parse()
