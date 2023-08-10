import ClipperLib from "clipper-lib";
import { ku_calCoord } from '../points/index.ts';

import { TPoint, TKonva_ps } from '../../type.ts';



/**
 * @description 将Konva Line的points进行内扩或者外扩
 * @param {TKonva_ps} k_points
 * @param {number} [delta=10]
 * @returns {*}
 */
export function ku_expand(k_points: TKonva_ps, delta: number = 10) {

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


