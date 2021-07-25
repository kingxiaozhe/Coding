// Prim算法
function prim(matrix) {
    const rows = matrix.length,
        cols = rows,
        result = [],
        savedNode = [0];//已选择的节点
    let minVex = -1,
        minWeight = MAX_INTEGER;
    for (let i = 0; i < rows; i++) {
        let row = savedNode[i],
            edgeArr = matrix[row];
        for (let j = 0; j < cols; j++) {
            if (edgeArr[j] < minWeight && edgeArr[j] !== MIN_INTEGER) {
                minWeight = edgeArr[j];
                minVex = j;
            }
        }

        //保证所有已保存节点的相邻边都遍历到
        if (savedNode.indexOf(minVex) === -1 && i === savedNode.length - 1) {
            savedNode.push(minVex);
            result.push(new Edge(row, minVex, minWeight));

            //重新在已加入的节点集中找权值最小的边的外部边
            i = -1;
            minWeight = MAX_INTEGER;

            //已加入的边，去掉，下次就不会选这条边了
            matrix[row][minVex] = MAX_INTEGER;
            matrix[minVex][row] = MAX_INTEGER;
        }
    }
    return result;
}


// Kruskal算法
function changeMatrixToEdgeArray(matrix) {
    const rows = matrix.length,
        cols = rows,
        result = [];
    for (let i = 0; i < rows; i++) {
        const row = matrix[i];
        for (let j = 0; j < cols; j++) {
            if (row[j] !== MIN_INTEGER && row[j] !== MAX_INTEGER) {
                result.push(new Edge(i, j, row[j]));
                matrix[i][j] = MAX_INTEGER;
                matrix[j][i] = MAX_INTEGER;
            }
        }
    }
    result.sort((a, b) => a.getWeight() - b.getWeight());
    return result;
}

function kruskal(matrix) {
    const edgeArray = changeMatrixToEdgeArray(matrix),
        result = [],
        //使用一个数组保存当前顶点的边的终点,0表示还没有已它为起点的边加入
        savedEdge = new Array(matrix.length).fill(0);

    for (let i = 0, len = edgeArray.length; i < len; i++) {
        const edge = edgeArray[i];
        const n = findEnd(savedEdge, edge.getBegin());
        const m = findEnd(savedEdge, edge.getEnd());
        console.log(savedEdge, n, m);
        //不相等表示这条边没有与现有生成树形成环路
        if (n !== m) {
            result.push(edge);
            //将这条边的结尾顶点加入数组中，表示顶点已在生成树中
            savedEdge[n] = m;
        }
    }
    return result;
}
