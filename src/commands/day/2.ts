import { sum } from 'lodash';
import { DayCommand, IDayCommand } from '../../shared/day-command';
import { getInput } from '../../shared/get-input';

function getDay2Input() {
  return getInput(2);
}

enum Play {
  Rock,
  Paper,
  Scissors,
}

const playScoreMap: Record<Play, number> = {
  [Play.Rock]: 1,
  [Play.Paper]: 2,
  [Play.Scissors]: 3,
};

export const opponentPlayMap: Record<string, Play> = {
  A: Play.Rock,
  B: Play.Paper,
  C: Play.Scissors,
};

export const myPlayMap: Record<string, Play> = {
  X: Play.Rock,
  Y: Play.Paper,
  Z: Play.Scissors,
};

enum GameOutcome {
  Win,
  Lose,
  Draw,
}

const gameOutcomeScoreMap: Record<GameOutcome, number> = {
  [GameOutcome.Win]: 6,
  [GameOutcome.Lose]: 0,
  [GameOutcome.Draw]: 3,
};

const desiredOutcomeMap: Record<string, GameOutcome> = {
  X: GameOutcome.Lose,
  Y: GameOutcome.Draw,
  Z: GameOutcome.Win,
};

function determineWinningPlay(opponentPlay: Play): Play {
  switch (opponentPlay) {
    case Play.Rock:
      return Play.Paper;
    case Play.Paper:
      return Play.Scissors;
    case Play.Scissors:
      return Play.Rock;
    default:
      throw new Error('This should have been handled');
  }
}

function determineLosingPlay(opponentPlay: Play): Play {
  const winningPlay = determineWinningPlay(opponentPlay);
  return [Play.Rock, Play.Paper, Play.Scissors].find(
    (play) => play !== opponentPlay && play !== winningPlay
  ) as Play;
}

function determineGameOutcome(opponentPlay: Play, myPlay: Play): GameOutcome {
  if (opponentPlay === myPlay) {
    return GameOutcome.Draw;
  }
  return myPlay === determineWinningPlay(opponentPlay)
    ? GameOutcome.Win
    : GameOutcome.Lose;
}

function determinePlay(opponentPlay: Play, desiredOutcome: GameOutcome): Play {
  if (desiredOutcome === GameOutcome.Draw) {
    return opponentPlay;
  }
  if (desiredOutcome === GameOutcome.Win) {
    return determineWinningPlay(opponentPlay);
  }
  if (desiredOutcome === GameOutcome.Lose) {
    return determineLosingPlay(opponentPlay);
  }
  throw new Error('Unhandled game type');
}

function determineScore(play: Play, outcome: GameOutcome): number {
  return gameOutcomeScoreMap[outcome] + playScoreMap[play];
}

export function playGame(
  opponentPlay: Play,
  myPlay: Play
): { score: number; outcome: GameOutcome } {
  const outcome = determineGameOutcome(opponentPlay, myPlay);
  const score = determineScore(myPlay, outcome);
  return { outcome, score };
}

export function parseInput(
  input: string
): [opponentPlay: Play, myPlay: Play][] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length === 3)
    .map((line) => [opponentPlayMap[line[0]], myPlayMap[line[2]]]);
}

export function parseInput2(
  input: string
): [opponentPlay: Play, myPlay: Play][] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length === 3)
    .map((line) => {
      const oppponentPlay = opponentPlayMap[line[0]];
      const desiredOutcome = desiredOutcomeMap[line[2]];
      const myPlay = determinePlay(oppponentPlay, desiredOutcome);
      return [oppponentPlay, myPlay];
    });
}

export function runPartOne(input: string) {
  const gamePlays = parseInput(input);
  const gameResults = gamePlays.map(([opponentPlay, myPlay]) =>
    playGame(opponentPlay, myPlay)
  );
  return sum(gameResults.map(({ score }) => score));
}

export function runPartTwo(input: string) {
  const gamePlays = parseInput2(input);
  const gameResults = gamePlays.map(([opponentPlay, myPlay]) =>
    playGame(opponentPlay, myPlay)
  );
  return sum(gameResults.map(({ score }) => score));
}

export default class Day2 extends DayCommand implements IDayCommand {
  public runPartOne() {
    const result = runPartOne(getDay2Input());
    this.log(`Result: ${result}`);
  }
  public runPartTwo() {
    const result = runPartTwo(getDay2Input());
    this.log(`Result: ${result}`);
  }
}
