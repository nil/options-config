import { rangeTest } from '../utils';

/*
 * rangeTest([test id],
 *   [input],
 *   [range object],
 *   [expected output]);
 */

const min = { min: 100 };
const max = { max: 0 };
const minMax = { min: -10, max: 10 };
const step = { step: 10 };
const minStep = { min: -10, step: 0.5 };
const maxStep = { max: 200, step: 100 };
const minMaxStep = { min: -500, max: 0, step: 5 };

describe('inRange', () => {
  describe('min', () => {
    rangeTest(1,
      345,
      min,
      true);

    rangeTest(2,
      100,
      min,
      true);

    rangeTest(3,
      30,
      min,
      false);
  });

  describe('max', () => {
    rangeTest(1,
      -12,
      max,
      true);

    rangeTest(2,
      0,
      max,
      true);

    rangeTest(3,
      -100,
      max,
      true);

    rangeTest(4,
      840,
      max,
      false);
  });

  describe('min, max', () => {
    rangeTest(1,
      0,
      minMax,
      true);

    rangeTest(2,
      -3.28930,
      minMax,
      true);
  });

  describe('step', () => {
    rangeTest(1,
      0,
      step,
      true);

    rangeTest(2,
      93973,
      step,
      false);

    rangeTest(3,
      120380,
      step,
      true);
  });

  describe('min, step', () => {
    rangeTest(1,
      0.5,
      minStep,
      true);

    rangeTest(2,
      2393.5,
      minStep,
      true);

    rangeTest(3,
      -3.4,
      minStep,
      false);
  });

  describe('max, step', () => {
    rangeTest(1,
      100,
      maxStep,
      true);

    rangeTest(2,
      50,
      maxStep,
      false);

    rangeTest(3,
      -1000,
      maxStep,
      true);
  });

  describe('min, max, step', () => {
    rangeTest(1,
      -25,
      minMaxStep,
      true);

    rangeTest(2,
      -40,
      minMaxStep,
      true);

    rangeTest(3,
      0,
      minMaxStep,
      true);

    rangeTest(3,
      -53,
      minMaxStep,
      false);
  });
});
