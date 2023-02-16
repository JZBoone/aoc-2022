import test, { expect } from '@oclif/test';
import {
  findGroupBadgeItemType,
  findSharedType,
  GroupOfThree,
  itemTypePriority,
  parseLine,
  runPartOne,
  runPartTwo,
} from './3';

describe.only('Day 3', () => {
  describe('Part 1', () => {
    describe('parseLine', () => {
      it('splits a line into 2 equal parts', () => {
        const line = 'vJrwpWtwJgWrhcsFMMfFFhFp';
        expect(parseLine(line)).to.deep.equal(['vJrwpWtwJgWr', 'hcsFMMfFFhFp']);
        const line2 = 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL';
        expect(parseLine(line2)).to.deep.equal([
          'jqHRNqRjqzjGDLGL',
          'rsFMfFZSrLrFZsSL',
        ]);
        const line3 = 'PmmdzqPrVvPwwTWBwg';
        expect(parseLine(line3)).to.deep.equal(['PmmdzqPrV', 'vPwwTWBwg']);
      });
    });
    describe('findSharedType', () => {
      it('finds the same character in 2 strings', () => {
        expect(findSharedType(['vJrwpWtwJgWr', 'hcsFMMfFFhFp'])).to.equal('p');
        expect(
          findSharedType(['jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL'])
        ).to.equal('L');
        expect(findSharedType(['PmmdzqPrV', 'vPwwTWBwg'])).to.equal('P');
      });
    });
    describe('itemTypePriority', () => {
      it('returns the correct number for a type', () => {
        expect(itemTypePriority('a')).to.equal(1);
        expect(itemTypePriority('z')).to.equal(26);
        expect(itemTypePriority('A')).to.equal(27);
        expect(itemTypePriority('Z')).to.equal(52);
      });
    });
    describe('runPartOne', () => {
      const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
      jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
      PmmdzqPrVvPwwTWBwg
      wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
      ttgJtRGJQctTZtZT
      CrZsJsPPZsGzwwsLwLmpwMDw`;
      expect(runPartOne(testInput)).to.equal(157);
    });
    describe('command', () => {
      test
        .stdout()
        .command(['day 3'])
        .it('returns the correct value', (ctx) => {
          expect(ctx.stdout).to.contain('8493');
        });
    });
  });
  describe('Part Two', () => {
    describe('findGroupBadgeItemType', () => {
      it('returns correct badge type', () => {
        expect(
          findGroupBadgeItemType(
            [
              'vJrwpWtwJgWrhcsFMMfFFhFp',
              'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
              'PmmdzqPrVvPwwTWBwg',
            ].map(parseLine) as GroupOfThree
          )
        ).to.equal('r');
        expect(
          findGroupBadgeItemType(
            [
              'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
              'ttgJtRGJQctTZtZT',
              'CrZsJsPPZsGzwwsLwLmpwMDw',
            ].map(parseLine) as GroupOfThree
          )
        ).to.equal('Z');
      });
    });
    describe('runPartTwo', () => {
      it('returns correct sum for test groups', () => {
        const testInput = `
        vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  ttgJtRGJQctTZtZT
  CrZsJsPPZsGzwwsLwLmpwMDw
        `;
        expect(runPartTwo(testInput)).to.equal(70);
      });
    });
    describe('command', () => {
      test
        .stdout()
        .command(['day 3', '2'])
        .it('returns the correct value', (ctx) => {
          expect(ctx.stdout).to.contain('2552');
        });
    });
  });
});
