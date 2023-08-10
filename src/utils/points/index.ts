

/**
 * @apiDescription points数组转换为坐标
 * @param {number[]} points
 * @returns {{}}
 */
export function calCoord(points: number[]) {
    let coordArr = [];
    for (let index = 0; index < points.length; index += 2) {
        let point = {
            x: points[index],
            y: points[index + 1],
        };
        coordArr.push(point);
    }
    return coordArr;
}