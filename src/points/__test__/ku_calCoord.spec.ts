import { ku_calCoord } from '../index';
describe('ku_calCoord', () => { 
  it('偶数个点', () => {
    const points = [10, 20, 30, 40]
    const coord = ku_calCoord(points)
    const expectRs = [ { X: 10, Y: 20 }, { X: 30, Y: 40 } ]    
    expect(coord).toEqual(expectRs)
  })
  
  it('奇数个点', () => {
    const points = [10, 20, 30, 40, 50]
    try {
      ku_calCoord(points)      
    } catch (error) {
      expect(error).toEqual([])
    }
  })
 })