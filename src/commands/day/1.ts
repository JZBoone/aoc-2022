import { orderBy, sum } from 'lodash';
import { getInput } from '../../shared/get-input';
import { DayCommand, IDayCommand } from '../../shared/day-command';

function parseElfCalorieCounts(input: string): number[][] {
  const lines: string[] = input.split('\n');
  const elfCalorieCounts: Array<number[]> = [];
  let newElf = true;
  for (const line of lines) {
    if (!/^\d+$/.test(line.trim())) {
      newElf = true;
      continue;
    }
    if (newElf) {
      elfCalorieCounts.push([]);
    }
    newElf = false;
    elfCalorieCounts[elfCalorieCounts.length - 1].push(Number(line));
  }
  return elfCalorieCounts;
}

function getSortedElfCalorieTotals(input: string): {
  sum: number;
  counts: number[];
}[] {
  const elfCalorieCounts = parseElfCalorieCounts(input);
  const elfCalorieCountsWithSum: { sum: number; counts: number[] }[] =
    elfCalorieCounts.flatMap((counts) => ({ sum: sum(counts), counts }));
  return orderBy(elfCalorieCountsWithSum, (countsWithSum) => countsWithSum.sum);
}

export function findHighestCalorieCount(input: string): number {
  const sortedElfCalorieTotals = getSortedElfCalorieTotals(input);
  return sortedElfCalorieTotals[sortedElfCalorieTotals.length - 1]?.sum || 0;
}

export function findThreeHighestCalorieCounts(input: string): number {
  const sortedElfCalorieTotals = getSortedElfCalorieTotals(input);
  let total = 0;
  for (
    let i = sortedElfCalorieTotals.length - 1;
    i >= 0 && i >= sortedElfCalorieTotals.length - 3;
    i--
  ) {
    total += sortedElfCalorieTotals[i]?.sum || 0;
  }
  return total;
}

function getDay1Input() {
  return getInput(1);
}

export default class Day1 extends DayCommand implements IDayCommand {
  public runPartOne() {
    const result = findHighestCalorieCount(getDay1Input());
    this.log(`Result: ${result}`);
  }
  public runPartTwo() {
    const result = findThreeHighestCalorieCounts(getDay1Input());
    this.log(`Result: ${result}`);
  }
}
