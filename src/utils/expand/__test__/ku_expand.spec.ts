import { ku_expand } from '../index';
describe('ku_expand', () => { 
  it('外扩', () => {
    const points = [50, 50, 100, 50, 100, 100, 50, 100]    
    const expandPs = ku_expand(points, 10)
    const expectRs = [
        110, 110,
        40, 110,
        40, 40,
        110, 40,
        110, 110
    ]
    expect(expandPs).toEqual(expectRs)
  })
  it('内扩', () => {
    const points = [50, 50, 100, 50, 100, 100, 50, 100]    
    const expandPs = ku_expand(points, -10)    
    const expectRs = [
      90, 90,
      60, 90,
      60, 60,
      90, 60,
      90, 90
    ]
    expect(expandPs).toEqual(expectRs)
  })
})