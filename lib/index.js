import ClipperLib from 'clipper-lib';

/**@description 图形偏移, 将Tpoint转换为Konva的points */
function offsetShape(points, delta) {
    if (delta === void 0) { delta = 10; }
    var clipperOffset = new ClipperLib.ClipperOffset();
    var paths = new ClipperLib.Paths();
    clipperOffset.AddPaths([points], ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
    clipperOffset.Execute(paths, delta);
    var ps = paths[0].reduce(function (prev, next) {
        return prev.concat([next.X, next.Y]);
    }, []);
    ps.push(ps[0], ps[1]);
    return ps;
}
var pow2 = function (num) {
    return Math.pow(num, 2);
};

export { offsetShape, pow2 };
