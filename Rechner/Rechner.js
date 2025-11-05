class CleanInfo {
	constructor(cleanInformation, currentIndex, rubble){
		this.clean = cleanInformation
		this.idx   = currentIndex
		if(rubble){this.rubble = rubble}else{rubble = false}
	}
}

class CalcInfo {
	constructor(calcValue, calcIndex, calcPrio){
		this.value = calcValue
		this.idx   = calcIndex
		this.prio  = calcPrio
	}
}

let errorOccured //Kontrollvariable für die Fehlermeldung

function acquireFormula(formula){
	
	errorOccured = false
	
	let formClean = sortFormula(String(formula))
	console.log(formClean)
	scanData(formClean)
	return false
}

function sortFormula(formula){
	
	let formApart = formula.split("")
	
	if(formApart.length != undefined){
		return cleanFormula(0, formApart, false).clean
	}else if(!isNaN(parseFloat(formApart))){
		return [formApart]
	}else{
		Error("So funktioniert das mit der Mathematik nicht!\nDu brauchst schon mehr als nur ein Zeichen!", formApart)
	}
	
}

function cleanFormula(idx, apart, brackets){
	let clean = []
	
	for(let i = idx; i < apart.length; i++){
		if(!isNaN(parseFloat(apart[i]))){
			if(!isNaN(parseFloat(clean[clean.length - 1]))){
				clean[clean.length - 1] = parseFloat(`${clean[clean.length - 1]}${apart[i]}`)
			}else{
				clean[clean.length] = parseFloat(apart[i])
			}
		}else{
			
			switch(apart[i]){
				case " ":
					//Ja, diese Zwei Zeilen kümmern sich um alle Leerzeichen. Mein Terror hat ein Ende!
				break
				case ".":
					if(Number.isInteger(clean[clean.length - 1])){
						clean[clean.length - 1] = `${clean[clean.length - 1]}.`
					}else{
						Error("Ein Punkt wurde falsch gesetzt!", false)
					}
				break
				case "+":
					
				case "-":
					
				case "*":
					
				case "/":
					
				case "^":
					
				case "!":
					
				case "%":
					clean[clean.length] = apart[i]
				break
				case "(":
					let brkt = cleanFormula(i+1, apart, true)
					clean[clean.length] = brkt.clean
					i = brkt.idx 
					if(brkt.rubble){
						brkt = cleanFormula(0, brkt.rubble, brackets)
						clean.concat(brkt.clean)
						
						if(brkt.rubble){
							return new CleanInfo(clean, i, brkt.rubble)
						}
					}
				break
				case ")":
					if(brackets){
						return new CleanInfo(clean, i, apart.slice(i + 1))
						break
					}else{
						Error("Klammern müssen geöffnet werden, bevor man sie schließen kann!", false)
					}
				default:
					Error("Folgendes Zeichen wird nicht unterstützt:", apart[i])
				break
			}
		}
	}
	
	return new CleanInfo(clean)
}

function Error(message, symbol){
	errorOccured = true
	if(symbol){
		console.log(`${message} ${symbol}`)
	}else{
		console.log(message)
	}
}

function scanData(data){
	let result = new CalcInfo(false, 0, 1)
	for(let table = data; result.idx != table.length -1; table.splice(0, result.idx, result.value)){
		result = calculate(table, result.idx, result.prio)
	}
	return result
}

function calculate(data, idx, priority){
	if(Array.isArray(data[idx])){

		return calculate(data[idx], 0, 1)

	}else if(data[idx] != undefined){
		if(data[idx + 1] != undefined){
			let result
			switch(priority){
				case 1:
					result = calcPrio1(data, idx)
					if(result){
						return result
					}

				case 2:
					result = calcPrio2(data, idx)
					if(result){
						return result
					}

				case 3:
					result = calcPrio3(data, idx)
					if(result){
						return result
					}

				default:
					return new CalcInfo(
						data[idx],
						idx + 1,
						priority
					)
			}
		}else{
			return data[idx]
		}
	}else{
		Error("Why would you just end the equation there? I need Numbers to calculate. I can't just guess!", false)
	}
}

function calcPrio1(data, idx){
	let alternative = false
	switch(data[idx]){
		case "-":
			alternative = true
		case "+":
			let result = calculate(data, idx + 1, 1)
			return new CalcInfo(
				addition(data[idx - 1], result.value, alternative),
				result.idx,
				1
			)
		default:
			return false
	}
}

function calcPrio2(data, idx){
	let alternative = false
	switch(data[idx]){
		case "/":
			alternative = true
		case "*":
			let result = calculate(data, idx + 1, 2)
			return new CalcInfo(
				multiplication(data[idx - 1], result.value, alternative),
				result.idx,
				2
			)
		case "%":
			let result = calculate(data, idx + 1, 2)
			return new CalcInfo(
				data[idx - 1] % result.value,
				result.idx,
				2
			)
		default:
			return false
	}
}

function calcPrio3(data, idx){
	switch(data[idx]){
		case "^":
			let result = calculate(data, idx + 1, 3)
			return new CalcInfo(
				Math.pow(data[idx - 1], result.value),
				result.idx,
				3
			)
		case "!":
			return data[idx + 1] === "!" ? new CalcInfo(
				faculty(data[idx - 1], true),
				idx + 1,
				3
			) : new CalcInfo(
				faculty(data[idx - 1], false),
				idx,
				3
			)
		default:
			return false
	}
}

function addition(a, b, subtraction){
	return subtraction ? a - b : a + b
}

function multiplication(a, b, division){
	return division ? a / b : a * b
}

function faculty(a, doppel){
	let result = 1;
	for(let i = a; i > 0; i -= doppel ? 2 : 1){
		//at least it's not going to cause a stack overflow...
		result = result * i
	}
	
	return result
}

//To-Do:
// - Scan der Formel und Priorisierung
// - Mathematische Verarbeitung
// - Error-Handling
// - Ausgabe in HTML