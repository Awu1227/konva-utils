import * as THREE from 'three'
/**@description 对Konva点进行平移 */
export function translateByMatrix(points: number[],translation: THREE.Vector3) {
    const vects = []
    for (let i = 0; i < points.length; i += 2) {
        vects.push(new THREE.Vector3(points[i], points[i + 1], 0));
    }

    const matrix = new THREE.Matrix4()
    matrix.makeTranslation(translation.x, translation.y, 0)

    vects.forEach(v => {
        v.applyMatrix4(matrix)
    })
    return vects.reduce((pre, nex) => {
        return pre.concat([nex.x, nex.y]);
    }, [] as number[]);
}