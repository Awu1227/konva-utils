import { Line } from 'konva/lib/shapes/Line';
import ClipperLib from "clipper-lib";
import { ku_calCoord } from '../points';

import { TPoint, TKonva_ps } from '../../type';



/**
 *
 * @description 将Konva Line的points进行内扩或者外扩
 * @param {(Konva.Line | TKonva_ps)} k_lineOrPs
 * @param {number} [delta=10]
 * @returns {*}
 */
export function ku_expand(k_lineOrPs: Line | TKonva_ps, delta: number = 10) {
  let k_points: TKonva_ps
  if (k_lineOrPs instanceof Line) {
    k_points = k_lineOrPs.points()
  } else {
    k_points = k_lineOrPs
  }
  if (!k_points) return
   const points = ku_calCoord(k_points);
    const clipperPoints = points.map(item => {
        const obj = { X: 0, Y: 0 };
        obj.X = item.x;
        obj.Y = item.y;
        return obj;
    });
    const clipperOffset = new ClipperLib.ClipperOffset();
    const paths: TPoint[][] = new ClipperLib.Paths();
    clipperOffset.AddPaths([clipperPoints], ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
    clipperOffset.Execute(paths, delta);

    const ps = paths[0].reduce((prev, next) => {
        return prev.concat([next.X, next.Y]);
    }, [] as number[]);
    ps.push(ps[0], ps[1]);
    return ps;
}


