import { asteroidCollision } from "./asteroid-collision";

describe('asteroid collision 735', () => {
  test.each([
    [[5,10,-5], [5,10]],
    [[8,-8], []],
    [[10,2,-5], [10]]
  ])('solve for all asteroid collisions %s', (input, expectedOutput) => {
    expect(asteroidCollision(input)).toEqual(expectedOutput);
  })
})