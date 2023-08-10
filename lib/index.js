import ClipperLib from 'clipper-lib';

/**
 * @apiDescription points数组转换为坐标
 * @param {number[]} points
 * @returns {{}}
 */
function ku_calCoord(points) {
    if (points.length % 2 !== 0) {
        return [];
    }
    var coordArr = [];
    for (var index = 0; index < points.length; index += 2) {
        var point = {
            x: points[index],
            y: points[index + 1],
        };
        coordArr.push(point);
    }
    return coordArr;
}

/**
 * @description 将Konva Line的points进行内扩或者外扩
 * @param {TKonva_ps} k_points
 * @param {number} [delta=10]
 * @returns {*}
 */
function ku_expand(k_points, delta) {
    if (delta === void 0) { delta = 10; }
    var points = ku_calCoord(k_points);
    var clipperPoints = points.map(function (item) {
        var obj = { X: 0, Y: 0 };
        obj.X = item.x;
        obj.Y = item.y;
        return obj;
    });
    var clipperOffset = new ClipperLib.ClipperOffset();
    var paths = new ClipperLib.Paths();
    clipperOffset.AddPaths([clipperPoints], ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
    clipperOffset.Execute(paths, delta);
    var ps = paths[0].reduce(function (prev, next) {
        return prev.concat([next.X, next.Y]);
    }, []);
    ps.push(ps[0], ps[1]);
    return ps;
}

export { ku_calCoord, ku_expand };
