
import { ku_lineIntersects } from '../index.ts';

describe('判断线段相交', () => {
  it('两条相交的线段', () => {
    const points1 = [
    1583,
    894,
    1090,
    894,
    1090,
    388,
    1583,
    388,
    1583,
    894
]
    const points2 = [
    1047,
    574,
    1177,
    574,
    1177,
    733,
    1047,
    733,
    1047,
    574
]
    let isIntersect = ku_lineIntersects(points1,points2)
    expect(isIntersect).toBe(1)
  })
  it('两条不相交的线段', () => {
    const points1 = [
      100, 0,
      100, 100
]
    const points2 = [
      50, 0,
      50, 100
]
  
    let isIntersect = ku_lineIntersects(points1,points2)
    expect(isIntersect).toBe(0)
  })
})