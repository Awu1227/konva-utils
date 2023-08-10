import { ku_calCoord } from '../index';
describe('ku_calCoord', () => { 
  it('偶数个点', () => {
    const points = [10, 20, 30, 40]
    const coord = ku_calCoord(points)
    const expectRs = [ { x: 10, y: 20 }, { x: 30, y: 40 } ]    
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