import ClipperLib from "clipper-lib";
import { TKonva_ps, TPoint } from "../type.ts";
import { ps2Line } from "../utils/ps2Line.ts";




/**
 *
 * @description 判断两条线是否相交
 * @param {TKonva_ps} 第一条线段的点
 * @param {TKonva_ps} 第二条线段的点
 * @returns {number}
 */
export function ku_lineIntersects(k_ps1: TKonva_ps, k_ps2: TKonva_ps) {
  
  const c_line1 = new ClipperLib.Path() as TPoint[]
  ps2Line(k_ps1).forEach((item:any) => {
    c_line1.push(item)
  })

  const c_line2 = new ClipperLib.Path() as TPoint[]
  ps2Line(k_ps2).forEach((item:any) => {
    c_line2.push(item)
  })

  const solution = new ClipperLib.Path()

  const clip = new ClipperLib.Clipper();
  
  try {
      clip.AddPath(c_line1, ClipperLib.PolyType.ptSubject, true);
      clip.AddPath(c_line2, ClipperLib.PolyType.ptClip, true);
      clip.Execute(ClipperLib.ClipType.ctIntersection,solution)
  } catch (error) {
      console.log(error);
  }


  if (solution.length) {    
    return !polygonIsContain(c_line1,c_line2)
    } else {
    return false
  }
}

export function polygonIsContain(polygon1: TPoint[], polygon2: TPoint[]) {
      let isContain1 = true; 
      let isContain2 = true; 
  for(let point of polygon1){
  //PointInPolygon函数返回值： -1: 表示点在路径外部,0: 表示点在路径边界上,1: 表示点在路径内部
      if(ClipperLib.Clipper.PointInPolygon(point, polygon2) !== 1){
          isContain1 =false;
          break;
      }
    }
    
  for(let point of polygon2){
  //PointInPolygon函数返回值： -1: 表示点在路径外部,0: 表示点在路径边界上,1: 表示点在路径内部
      if(ClipperLib.Clipper.PointInPolygon(point, polygon1) !== 1){
          isContain2 =false;
          break;
      }
  }
  return isContain1 || isContain2
}