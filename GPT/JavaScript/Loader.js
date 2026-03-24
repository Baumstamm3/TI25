const USER = "Baumstamm3"
const REPOSITORY = "TI25"
const DIRECTORY = "JavaScript/Executables"
const ACCESS_TOKEN = "github_pat_" + "11BWUI2XA0yd3GADKMC1rh_DbqWeE6by7gO00zWtoXguHNNcVL2v2dYL2DY9liyYe4OYW2GRUN2i2xar67"

const HEADER  = new Headers()
HEADER.append("Authorization", ACCESS_TOKEN)

const FETCH_REQUEST = {
	headers: HEADER
}

async function acquireData(map, names ,folder){
	
	let contents = await gitFetchContents(`StupidChess`,folder)
	console.log(contents)
	
	for(let i = 0; i < contents.length; i++){
		names[i] = contents[i].name.split(".", 1)[0]
		map.set(
			names[i],
			await gitFetchJSON(`StupidChess`, contents[i].path)
		)
		console.log(JSON.stringify(classes.get(classesNames[i])))
	}
}

async function gitHubFetchDirectory(repo, folder){
	let data = await fetch(
		`https://api.github.com/repos/${USER}/${REPOSITORY}/contents/${DIRECTORY}`,
		FETCH_REQUEST
	)
	 
	return await data.json()
}

async function gitFetchJSON(repo, path){
	let data = await gitFetchContents(repo, path)
	
	return JSON.parse( atob( data.content ) )
}