function main(){
	let n = parseInt(prompt("Geben Sie die Gesammtzahl der Elemente ein"))
	let k = parseInt(prompt("Geben Sie die Anzahl der Elemente ein, für welche sie die Potenzmenge erhalten möchten"))
	
	let gesammtanzahl = 0
	
	for(let i = 0; i <= Math.pow(2, n); i++){
		let binary = i.toString(2).split("")
		let limit = String(Math.pow(2, n)).split("").length
		let counter = 0
		
		for(let j = 0; j < binary.length; j++){
			if(binary[j] === "1"){
				counter++
			}
		}
		
		if(counter === k){
			console.log(String(binary))
			gesammtanzahl++
		}
	}
	
	console.log(`Elemente n : ${n}\nElemente k : ${k}\nGesammtzahl: ${gesammtanzahl}`)
	setTimeout(main, 1000)
}