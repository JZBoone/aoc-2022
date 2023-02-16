import { expect, test } from '@oclif/test';
import { findHighestCalorieCount, findThreeHighestCalorieCounts } from './1';

const TEST_INPUT = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

describe('Day 1', () => {
  describe('Part 1', () => {
    describe('findHighestCalorieCount', () => {
      it('returns the correct value', () => {
        expect(findHighestCalorieCount(TEST_INPUT)).to.equal(24_000);
      });
      it('handles extra lines in between', () => {
        const input = `
    
        1000
        2000
        
    
        4000
        2000
        3000
    
        `;
        expect(findHighestCalorieCount(input)).to.equal(9_000);
      });
      it('handles invalid data', () => {
        const input = `
        1000
        2000
        
        asdfasdfasdf
    
        4000
        2000
        3000
    
        `;
        expect(findHighestCalorieCount(input)).to.equal(9_000);
      });
      it('handles no data', () => {
        const input = `
        asdfasdfasdf
        `;
        expect(findHighestCalorieCount(input)).to.equal(0);
      });
    });
    describe('command', () => {
      test
        .stdout()
        .command(['day 1'])
        .it('returns the correct value', (ctx) => {
          expect(ctx.stdout).to.contain('70509');
        });
    });
  });
  describe('Part 2', () => {
    describe('findThreeHighestCalorieCounts', () => {
      it('finds top 3 highest with test input', () => {
        expect(findThreeHighestCalorieCounts(TEST_INPUT)).to.equal(45_000);
      });
      it('finds top 3 highest with fewer than 3 elves', () => {
        const TEST_INPUT = `
    1000
    2000
    3000
    `;
        expect(findThreeHighestCalorieCounts(TEST_INPUT)).to.equal(6_000);
      });
    });
    describe('command', () => {
      test
        .stdout()
        .command(['day 1', '2'])
        .it('returns the correct value', (ctx) => {
          expect(ctx.stdout).to.contain('208567');
        });
    });
  });
});
