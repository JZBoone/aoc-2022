import { expect, test } from '@oclif/test';
import { runPartOne, runPartTwo } from './2';

const testInput = `
A Y
B X
C Z`;

describe('Day 2', () => {
  describe('runPartOne', () => {
    it('returns correct result for test input', () => {
      expect(runPartOne(testInput)).to.equal(15);
    });
  });
  describe('Part 1', () => {
    describe('command', () => {
      test
        .stdout()
        .command(['day 2'])
        .it('returns the correct value', (ctx) => {
          expect(ctx.stdout).to.contain('12772');
        });
    });
  });
});
describe('Part 2', () => {
  describe('runPartTwo', () => {
    it('returns correct result for test input', () => {
      expect(runPartTwo(testInput)).to.equal(12);
    });
  });
  describe('command', () => {
    test
      .stdout()
      .command(['day 2', '2'])
      .it('returns the correct value', (ctx) => {
        expect(ctx.stdout).to.contain('11618');
      });
  });
});
