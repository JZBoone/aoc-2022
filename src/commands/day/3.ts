import { sum } from 'lodash';
import { DayCommand, IDayCommand } from '../../shared/day-command';
import { getInput } from '../../shared/get-input';

type LineItems = [
  firstCompartmentItems: string,
  secondCompartmentItems: string
];

export function parseLine(line: string): LineItems {
  const { length } = line;
  const splitIndex = Math.floor(length / 2);
  return [line.slice(0, splitIndex), line.slice(splitIndex, length)];
}

export function findSharedType(lineItems: LineItems): string {
  const [firstCompartmentItems, secondCompartmentItems] = lineItems;
  for (let i = 0; i < firstCompartmentItems.length; i++) {
    if (secondCompartmentItems.includes(firstCompartmentItems[i])) {
      return firstCompartmentItems[i];
    }
  }
  throw new Error('They lied to us');
}

const a_CHAR_CODE = 97;
const A_CHAR_CODE = 65;

export function itemTypePriority(character: string): number {
  if (character.length !== 1) {
    throw new Error('Not a single character');
  }
  if (character.charCodeAt(0) >= a_CHAR_CODE) {
    return character.charCodeAt(0) - a_CHAR_CODE + 1;
  }
  if (character.charCodeAt(0) >= A_CHAR_CODE) {
    return character.charCodeAt(0) - A_CHAR_CODE + 27;
  }
  throw new Error('Unexpected character code');
}

function getDay3Input() {
  return getInput(3);
}

export function runPartOne(input: string): number {
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map(parseLine);
  return sum(lines.map(findSharedType).map(itemTypePriority));
}

export type GroupOfThree = [one: LineItems, two: LineItems, three: LineItems];

function lineItemsToLine(lineItems: LineItems): string {
  return lineItems[0] + lineItems[1];
}

export function findGroupBadgeItemType(groupOfThree: GroupOfThree): string {
  const [one, two, three] = groupOfThree.map(lineItemsToLine);
  for (let i = 0; i < one.length; i++) {
    const char = one[i];
    if (two.includes(char) && three.includes(char)) {
      return char;
    }
  }
  throw new Error('They lied to us');
}

export function runPartTwo(input: string): number {
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map(parseLine);
  const groupsOfThree: GroupOfThree[] = [];
  for (let i = 0; i < lines.length / 3; i += 1) {
    const index = i * 3;
    const group = [
      lines[index],
      lines[index + 1],
      lines[index + 2],
    ] as GroupOfThree;
    groupsOfThree.push(group);
  }
  return sum(groupsOfThree.map(findGroupBadgeItemType).map(itemTypePriority));
}

export default class Day3 extends DayCommand implements IDayCommand {
  public runPartOne() {
    const result = runPartOne(getDay3Input());
    this.log(`Result: ${result}`);
  }
  public runPartTwo() {
    const result = runPartTwo(getDay3Input());
    this.log(`Result: ${result}`);
  }
}
