import test, { expect } from '@oclif/test';
import {
  sectionAssignmentPairFullyContains,
  runPartOne,
  runPartTwo,
  sectionAssignmentPairOverlaps,
} from './4';

const testInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

describe.only('Day 4', () => {
  describe('Part 1', () => {
    describe('sectionAssignmentPairFullyContains', () => {
      it('correctly determines if one assignment is contained by the other', () => {
        expect(
          sectionAssignmentPairFullyContains([
            [2, 4],
            [6, 8],
          ])
        ).to.be.false;
        expect(
          sectionAssignmentPairFullyContains([
            [2, 3],
            [4, 5],
          ])
        ).to.be.false;
        expect(
          sectionAssignmentPairFullyContains([
            [5, 7],
            [7, 9],
          ])
        ).to.be.false;
        expect(
          sectionAssignmentPairFullyContains([
            [2, 8],
            [3, 7],
          ])
        ).to.be.true;
        expect(
          sectionAssignmentPairFullyContains([
            [6, 6],
            [4, 6],
          ])
        ).to.be.true;
        expect(
          sectionAssignmentPairFullyContains([
            [2, 6],
            [4, 8],
          ])
        ).to.be.false;
      });
    });
    describe('runPartOne', () => {
      it('returns correct result for test input', () => {
        expect(runPartOne(testInput)).to.equal(2);
      });
    });
    describe('command', () => {
      test
        .stdout()
        .command(['day 4'])
        .it('returns the correct value', (ctx) => {
          expect(ctx.stdout).to.contain(528);
        });
    });
  });
  describe('Part Two', () => {
    describe('sectionAssignmentPairOverlaps', () => {
      expect(
        sectionAssignmentPairOverlaps([
          [2, 4],
          [6, 8],
        ])
      ).to.be.false;
      expect(
        sectionAssignmentPairOverlaps([
          [2, 3],
          [4, 5],
        ])
      ).to.be.false;
      expect(
        sectionAssignmentPairOverlaps([
          [5, 7],
          [7, 9],
        ])
      ).to.be.true;
      expect(
        sectionAssignmentPairOverlaps([
          [2, 8],
          [3, 7],
        ])
      ).to.be.true;
      expect(
        sectionAssignmentPairOverlaps([
          [6, 6],
          [4, 6],
        ])
      ).to.be.true;
      expect(
        sectionAssignmentPairOverlaps([
          [2, 6],
          [4, 8],
        ])
      ).to.be.true;
    });
  });
  describe('runPartTwo', () => {
    expect(runPartTwo(testInput)).to.equal(4);
  });
  describe('command', () => {
    test
      .stdout()
      .command(['day 4', '2'])
      .it('returns the correct value', (ctx) => {
        expect(ctx.stdout).to.contain(881);
      });
  });
});
