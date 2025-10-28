class CleanInfo {
	constructor(cleanInformation, currentIndex, rubble){
		this.clean = cleanInformation
		this.idx   = currentIndex
		if(rubble){this.rubble = rubble}else{rubble = false}
	}
}

class CalcInfo {
	constructor(calcValue, calcIndex){
		this.value = calcValue
		this.idx   = calcIndex
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
	let result = calculate(data, 0, 0)
	
	
	
	return result
}

function calculate(data, idx, priority){
	let altMode = false
	if( Array.isArray(data[idx])){
		let resultBrkt = calculate(data[idx], 0, priority)
		
	}else if( !isNaN( parseFloat( data[idx]) ) ){
		switch(data[idx + 1]){
			default: 
				Error("Somehow you managed to fuck up a mathematic formula!", false)
			break
			case undefined:
				return data[idx]
			break
			//Priorität 1
			case "-":
				altMode = true
			case "+":
				return addition(data[idx], calculate(data, idx + 2, 1), altMode)
			break
			//Priorität 2
			case "/":
				altMode = true
			case "*":
				return multiplication(data[idx], calculate(data, idx + 2, 2), altMode)
			break 
			case "%":
				return data[idx] % calculate(data, idx + 2, 2)
			break
			//Priorität 3
			case "^":
				return Math.pow(data[idx], data[idx + 2])
			break
			case "!":
				if(data[idx + 2] == "!"){
					return faculty(data[idx], true)
				}else{
					return faculty(data[idx], false)
				}
			break	
		}
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
		//this could never go wrong, right?
		result = result * i
		//right...?! 
		//PS: You people are friggin' lunatics
	}
	
	return result
}

//To-Do:
// - Scan der Formel und Priorisierung
// - Mathematische Verarbeitung
// - Error-Handling
// - Ausgabe in HTML