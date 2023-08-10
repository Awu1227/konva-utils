import Konva from 'konva';
import ClipperLib from "clipper-lib";
import { calCoord } from '../points';

import { Point } from '../../type';


/**
 * @description 将Konva Line的points进行内扩或者外扩
 * @param {Konva.Line} k_line
 * @param {number} [delta=10]
 * @returns {*}
 */
export function ku_expand(k_line: Konva.Line, delta: number = 10) {
  const k_points = k_line.points()
  if (!k_points) return
   const points = calCoord(k_points);
    const clipperPoints = points.map(item => {
        const obj = { X: 0, Y: 0 };
        obj.X = item.x;
        obj.Y = item.y;
        return obj;
    });
    const clipperOffset = new ClipperLib.ClipperOffset();
    const paths: Point[][] = new ClipperLib.Paths();
    clipperOffset.AddPaths([clipperPoints], ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
    clipperOffset.Execute(paths, delta);

    const ps = paths[0].reduce((prev, next) => {
        return prev.concat([next.X, next.Y]);
    }, [] as number[]);
    ps.push(ps[0], ps[1]);
    return ps;
}


