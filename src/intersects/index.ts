import ClipperLib from "clipper-lib";
import { TKonva_ps } from "../type.ts";
import { ps2Line } from "../utils/ps2Line.ts";




/**
 *
 * @description 判断两条线是否相交
 * @param {TKonva_ps} 第一条线段的点
 * @param {TKonva_ps} 第二条线段的点
 * @returns {number}
 */
export function ku_lineIntersects(k_ps1: TKonva_ps, k_ps2: TKonva_ps) {
  
  const c_line1 = new ClipperLib.Path()
  ps2Line(k_ps1).forEach((item:any) => {
    c_line1.push(item)
  })

  const c_line2= new ClipperLib.Path()
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



  return solution.length as number
  
}