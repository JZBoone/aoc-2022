import { DayCommand, IDayCommand } from '../../shared/day-command';
import { getInput } from '../../shared/get-input';

function getDay4Input() {
  return getInput(4);
}

type SectionAssignment = [start: number, end: number];

type SectionAssignmentPair = [
  first: SectionAssignment,
  second: SectionAssignment
];

function firstAssignmentContainsSecond(
  first: SectionAssignment,
  second: SectionAssignment
): boolean {
  const [firstStart, firstEnd] = first;
  const [secondStart, secondEnd] = second;
  return (
    secondStart >= firstStart &&
    secondStart <= firstEnd &&
    secondEnd <= firstEnd &&
    secondEnd >= firstStart
  );
}

export function sectionAssignmentPairFullyContains(
  pair: SectionAssignmentPair
): boolean {
  const [a, b] = pair;
  return (
    firstAssignmentContainsSecond(a, b) || firstAssignmentContainsSecond(b, a)
  );
}

export function sectionAssignmentPairOverlaps(
  pair: SectionAssignmentPair
): boolean {
  const [first, second] = pair;
  const [firstStart, firstEnd] = first;
  const [secondStart, secondEnd] = second;
  return !(firstEnd < secondStart || secondEnd < firstStart);
}

type AssignmentStartEndUnparsed = `${number}-${number}`;

function parseAssignmentStartEnd(
  assignmentRaw: AssignmentStartEndUnparsed
): SectionAssignment {
  const [first, second] = assignmentRaw.split('-');
  return [+first, +second];
}

type AssignmentPairUnparsed =
  `${AssignmentStartEndUnparsed},${AssignmentStartEndUnparsed}`;

function parseAssignmentPair(
  unparsedPair: AssignmentPairUnparsed
): SectionAssignmentPair {
  const [firstUnparsedAssignment, secondUnparsedAssignment] =
    unparsedPair.split(',') as [
      first: AssignmentStartEndUnparsed,
      second: AssignmentStartEndUnparsed
    ];
  return [
    parseAssignmentStartEnd(firstUnparsedAssignment),
    parseAssignmentStartEnd(secondUnparsedAssignment),
  ];
}

function parseInput(input: string): SectionAssignmentPair[] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => parseAssignmentPair(line as AssignmentPairUnparsed));
}

export function runPartOne(input: string): number {
  return parseInput(input).filter(sectionAssignmentPairFullyContains).length;
}
export function runPartTwo(input: string): number {
  return parseInput(input).filter(sectionAssignmentPairOverlaps).length;
}

export default class Day4 extends DayCommand implements IDayCommand {
  public runPartOne() {
    const result = runPartOne(getDay4Input());
    this.log(`Result: ${result}`);
  }
  public runPartTwo() {
    const result = runPartTwo(getDay4Input());
    this.log(`Result: ${result}`);
  }
}
