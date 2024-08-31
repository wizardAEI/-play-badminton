// 定义顶点接口
interface Vertex {
    x: number;
    y: number;
}
// 定义抛物线接口
interface Parabola {
    f: (x: number) => number;
    vertex: Vertex;
    direction: string;
    roots: number[] | null;
}
/**
 * // 示例使用
const p = createParabola(1, -3, 2);
console.log(p.f(0));  // 输出 f(0) 的值
console.log(p.vertex);  // 输出顶点坐标
console.log(p.direction);  // 输出开口方向
console.log(p.roots);  // 输出零点
 * @param a 
 * @param b 
 * @param c 
 * @returns 
 */
export function createParabola(a: number, b: number, c: number): Parabola {
    // 返回抛物线函数
    const parabola = (x: number): number => {
        return a * x * x + b * x + c;
    };

    // 计算顶点
    const vertexX = -b / (2 * a);
    const vertexY = parabola(vertexX); // 使用已定义的parabola函数来计算y坐标
    const vertex: Vertex = { x: vertexX, y: vertexY };

    // 判断开口方向
    const direction = a > 0 ? 'up' : 'down';

    // 计算零点
    const discriminant = b * b - 4 * a * c;
    let roots: number[] = [];
    if (discriminant >= 0) {
        const sqrtDiscriminant = Math.sqrt(discriminant);
        roots = [
            (-b + sqrtDiscriminant) / (2 * a),
            (-b - sqrtDiscriminant) / (2 * a)
        ];
    }


    // 返回一个对象，包含抛物线函数和相关信息
    return {
        f: parabola,
        vertex: vertex,
        direction: direction,
        roots: roots
    };
}



