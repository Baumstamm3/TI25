const USER = "Baumstamm3"
const REPOSITORY = "TI25"
const DIRECTORY = "GPT/JavaScript/Executables"
const ACCESS_TOKEN = "github_pat_" + "11BWUI2XA0yd3GADKMC1rh_DbqWeE6by7gO00zWtoXguHNNcVL2v2dYL2DY9liyYe4OYW2GRUN2i2xar67"

const HEADER  = new Headers()
HEADER.append("Authorization", ACCESS_TOKEN)

const FETCH_REQUEST = {
	headers: HEADER
}

const NAMES = []
const MODULES = new Map()

main()

function main(){
	acquireModules()
}

function acquireModules(){
	
	gitHubFetchPath(DIRECTORY)
	.then( contents => {
		console.log(contents)
		for(let i = 0; i < contents.length; i++){
			NAMES[i] = contents[i].name.split(".", 1)[0]
			gitHubFetchContentRaw(contents[i].path)
			.then( rawModule => {createModuleObject(rawModule)})
			.then( parsedModule => {
				MODULES.set(
					NAMES[i],
					parsedModule
				)
			})
		}
	}).then(() => {
		console.log(NAMES)
		console.log(MODULES)
	})
}

function gitHubFetchPath(path){
	console.log(`Path: https://api.github.com/repos/${USER}/${REPOSITORY}/contents/${path}`)
	return fetch(
		//Test-Link: https://api.github.com/repos/Baumstamm3/TI25/contents/GPT/JavaScript/Executables
		`https://api.github.com/repos/${USER}/${REPOSITORY}/contents/${path}`,
		FETCH_REQUEST)
	.then(data => data.json())
}

function gitHubFetchContentParsed(path){
	return gitHubFetchPath(path)
	.then(encoded => atob(encoded.content) )
	.then(decoded => JSON.parse(decoded))
}

function gitHubFetchContentRaw(path){
	return gitHubFetchPath(path)
	.then(rawBase64 => rawBase64.content)
}

function decodeBase64Module(moduleString){
	snippets = moduleString.split("\\n")
	result = ""
	for(let i = 0; i < snippets.length; i++){
		result += atob(snippets[i]) + "\n"
	}
}

function createModuleObject(moduleData) {
	
 	if(globalThis.URL.createObjectURL){
    	const blob = new Blob([decodeBase64Module(moduleData)], { type: 'text/javascript' })
    	const url = URL.createObjectURL(blob)
    	let result = import(url)
		.then(URL.revokeObjectURL(url))
		return result
	}
  
  	const url = "data:text/javascript;base64," + moduleData
  	return import(url)
}