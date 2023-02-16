import { Args, Command } from '@oclif/core';

export interface IDayCommand {
  runPartOne: () => void;
  runPartTwo: () => void;
}

export class DayCommand extends Command implements IDayCommand {
  static args = {
    part: Args.integer({ description: '1 (default) or 2' }),
  };

  public runPartOne() {
    throw new Error('Not implemented');
  }
  public runPartTwo() {
    throw new Error('Not implemented');
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(DayCommand);

    const part = args.part ?? 1;
    if (part === 1) {
      return this.runPartOne();
    } else if (part === 2) {
      return this.runPartTwo();
    }
    throw new Error(`Invalid part argument ${part}`);
  }
}
