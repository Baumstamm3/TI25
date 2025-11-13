class Matrix {
    constructor(array){
        this.matrix = array
    }

    transpone(matrixA){

    }

    static mul(matrixA, matrixB){
        let aM = matrixA.length
        let aN = matrixA[0].length

        let bM = matrixB.length
        let bN = matrixB[0].length

        if(aN != bM){
            return undefined
        }

        let matrixC = []

        for(let cM = 0; cM < aM; cM++){
            matrixC[cM] = []
            for(let cN = 0; cN < bN; cN++){
                let result = 0

                for(let i = 0; i < aM; i++){
                    result += matrixA[cN][i] * matrixB[i][cN]
                }

                matrixC[cM][cN] = result
            }
        }

        return matrixC
    }

    get trans(){
        return this.transpone(this.matrix)
    }
}

let matrix1 = [
    [3,2,1],
    [1,0,2]
]

let matrix2 = [
    [1,2],
    [0,1],
    [4,0]
]

let matrix3 = Matrix.mul(matrix1, matrix2)
console.log(matrix3)