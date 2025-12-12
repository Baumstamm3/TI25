let elements = ["a","b","c","d","e","f"]

function perm(list, ignore, current){
    for(let i = 0; i < list.length; i++){
        //console.log(`Testing: i - ${i}; current - |${current}|; list[i] - ${list[i]}; ignore - ${ignore}`)
        if(ignore.includes(i)){
            continue
        }else if(list.length - ignore.length == 1){
            console.log(current + list[i])
            break
        }else{
            let newIgnore = [i]
            newIgnore = newIgnore.concat(ignore)
            perm(list, newIgnore, current + list[i])
        }
    }
}



function main(){
    perm(elements, [], "")
}