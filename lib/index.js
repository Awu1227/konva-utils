import ClipperLib from 'clipper-lib';

/**
 * @apiDescription points数组转换为坐标
 * @param {number[]} points
 * @returns {{}}
 */
function ku_calCoord(points, type) {
    if (type === void 0) { type = "upper"; }
    if (points.length % 2 !== 0) {
        return [];
    }
    var coordArr = [];
    for (var index = 0; index < points.length; index += 2) {
        var point = void 0;
        if (type === 'upper') {
            point = {
                X: points[index],
                Y: points[index + 1],
            };
        }
        else {
            point = {
                x: points[index],
                y: points[index + 1],
            };
        }
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

function ps2Line(ps) {
    return ku_calCoord(ps);
}

/**
 *
 * @description 判断两条线是否相交
 * @param {TKonva_ps} 第一条线段的点
 * @param {TKonva_ps} 第二条线段的点
 * @returns {number}
 */
function ku_lineIntersects(k_ps1, k_ps2) {
    var c_line1 = new ClipperLib.Path();
    ps2Line(k_ps1).forEach(function (item) {
        c_line1.push(item);
    });
    var c_line2 = new ClipperLib.Path();
    ps2Line(k_ps2).forEach(function (item) {
        c_line2.push(item);
    });
    var solution = new ClipperLib.Path();
    var clip = new ClipperLib.Clipper();
    try {
        clip.AddPath(c_line1, ClipperLib.PolyType.ptSubject, true);
        clip.AddPath(c_line2, ClipperLib.PolyType.ptClip, true);
        clip.Execute(ClipperLib.ClipType.ctIntersection, solution);
    }
    catch (error) {
        console.log(error);
    }
    if (solution.length) {
        return !polygonIsContain(c_line1, c_line2);
    }
    else {
        return false;
    }
}
function polygonIsContain(polygon1, polygon2) {
    var isContain1 = true;
    var isContain2 = true;
    for (var _i = 0, polygon1_1 = polygon1; _i < polygon1_1.length; _i++) {
        var point = polygon1_1[_i];
        //PointInPolygon函数返回值： -1: 表示点在路径外部,0: 表示点在路径边界上,1: 表示点在路径内部
        if (ClipperLib.Clipper.PointInPolygon(point, polygon2) !== 1) {
            isContain1 = false;
            break;
        }
    }
    for (var _a = 0, polygon2_1 = polygon2; _a < polygon2_1.length; _a++) {
        var point = polygon2_1[_a];
        //PointInPolygon函数返回值： -1: 表示点在路径外部,0: 表示点在路径边界上,1: 表示点在路径内部
        if (ClipperLib.Clipper.PointInPolygon(point, polygon1) !== 1) {
            isContain2 = false;
            break;
        }
    }
    return isContain1 || isContain2;
}

export { ku_calCoord, ku_expand, ku_lineIntersects };
