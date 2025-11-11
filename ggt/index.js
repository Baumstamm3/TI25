function main(a,b){
    if(a < 1 || b < 1){return `So funtioniert das mit der Mathematik nicht!`}
        do{
            console.log(`a: ${a} | b: ${b} `)
            if(a > b){
                a -= b
            }else{
                b -= a
            }
        }while(b > 0)
    return a
}