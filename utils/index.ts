import ClipperLib from "clipper-lib";

type TPoint = {
  X: number,
  Y:number
}

/**@description 图形偏移, 将Tpoint转换为Konva的points */
export function offsetShape(points: TPoint[], delta: number = 10) {
    const clipperOffset = new ClipperLib.ClipperOffset();
    const paths: TPoint[][] = new ClipperLib.Paths();
    clipperOffset.AddPaths([points], ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
    clipperOffset.Execute(paths, delta);

    const ps = paths[0].reduce((prev, next) => {
        return prev.concat([next.X, next.Y]);
    }, [] as number[]);
    ps.push(ps[0], ps[1]);
    return ps;
}

export const pow2 = (num: number) => {
  return num**2
}
