const preGenerated = {
  poemOBrien1: `march into the end \nthe end of course a true war \nto do the things you know you know you know you are \nsisters who never \nout on a true war story is never \nis never about war story \nabout war story`,
  poemOBrien2: `on a true war story \ntrue war story \nwrite back and march into the end \nwho never about war story is never about war story \ndawn \nmountains \nmarch into the end of course \nmemory it's about war story \nknow you know`,
  poemFosterWallace1: `coming back for sure that \nsure that she says i do not \nreally does not care if you believe me or not \nclean light through \nwhich you believe me or not \ncarry me or not care \njust carry me`,
  poemFosterWallace2: `believe me \nit's early she says i do not \ni do not care if you believe me or not \nsun it is \nolder \nand believe me or not \nnot care \nthink \n i do not care \ncigarettes in light`,
  poemFrancisco1: `truth \nmy own haunting my own haunting my own \nuntil i am the \nvoice shakes \nin every chamber so i \ni am the house`,
  poemFrancisco2: `brain is \nstill sounds like this \nenough \nlike this i am the house and the house and \nsay it until i am the house and \ninto a revolver with \ngood enough in every chamber so i am the house \nthe house and the house and the \nhaunting`
}

const textSamples = {
  FRANCISCO: `On days like this I am the house and the ghost, responsible for my own haunting. My brain is a revolver with "Am I good enough?" in every chamber. So I turn into a factory that only makes the word "yes" and I say it until I can easily mistake it for the truth, but my voice shakes and the answer still sounds like a question`,
  OBRIEN: `In the end, of course, a true war story is never about war. It’s about the special way that dawn spreads out on a river when you know you must cross the river and march into the mountains and do things you are afraid to do. It’s about love and memory. It’s about sorrow. It’s about sisters who never write back and people who never listen.`,
  FOSTERWALLACE: `She says I do not care if you believe me or not, it is the truth, go on and believe what you want to. So it is for sure that she is lying. When it is the truth she will go crazy trying to get you to believe her. So I feel like I know. She lights up and looks off away from me, looking sly with her cigarette in light through a wet window, and I can not feel what to say. I say Mayfly I can not feel what to do or say or believe you any more. But there is things I know. I know I am older and you are not. And I give to you all I got to give you, with my hands and my heart both. Every thing that is inside me I have gave you. I have been keeping it together and working steady every day. I have made you the reason I got for what I always do. I have tried to make a home to give to you, for you to be in, and for it to be nice. I light up myself and I throw the match in the sink with other matches and dishes and a sponge and such things. I say Mayfly my heart has been down the road and back for you but I am forty-eight years old. It is time I have got to not let things just carry me by any more. I got to use some time that is still mine to try to make everything feel right. I got to try to feel how I need to. In me there is needs which you can not even see any more, because there is too many needs in you that are in the way. She does not say any thing and I look at her window and I can feel that she knows I know about it, and she shifts her self on my sofa lounger. She brings her legs up underneath her in some shorts. I say it really does not matter what I seen or what I think I seen. That is not it any more. I know I am older and you are not. But now I am feeling like there is all of me going in to you and nothing of you is coming back any more. Her hair is up with a barret and pins and her chin is in her hand, it’s early, she looks like she is dreaming out at the clean light through the wet window over my sofa lounger. Everything is green she says. Look how green it all is Mitch. How can you say the things you say you feel like when everything outside is green like it is. The window over the sink of my kitchenet is cleaned off from the hard rain last night and it is a morning with a sun, it is still early, and there is a mess of green out. The trees are green and some grass out past the speed bumps is green and slicked down. But every thing is not green. The other trailers are not green and my card table out with puddles in lines and beer cans and butts floating in the ash trays is not green, or my truck, or the gravel of the lot, or the big wheel toy that is on its side under a clothes line without clothes on it by the next trailer, where the guy has got him some kids. Everything is green she is saying. She is whispering it and the whisper is not to me no more I know. I chuck my smoke and turn hard from the morning with the taste of something true in my mouth. I turn hard toward her in the light on the sofa lounger. She is looking outside, from where she is sitting, and I look at her, and there is something in me that can not close up, in that looking. Mayfly has a body. And she is my morning. Say her name.`
}


function getPoem(poemId) {
  return preGenerated[poemId]
}

function parseText(text) {
	// first remove the special characters
	let noSpecials = text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
	// then convert to lowercase
	let lower = noSpecials.toLowerCase()
	// then split text along spaces and return
	return lower.split(' ')
}

function wordObjGenerator(text) {
	// call parseText to create a text array
	let textArray = parseText(text)
	// create an empty object
	let wordPairObj = {}


	// loop through our array of words
	for (let i = 0; i < (textArray.length - 1); i++) {
		// create variables for the current word and next word
		let curr = textArray[i]
		let next = textArray[i+1]

		// if curr is already a key then we add next as a value 
		if (curr in wordPairObj) {
			if (!wordPairObj[curr].includes(next)) {
				wordPairObj[curr].push(next)
			}

		// otherwise we create a new key for curr and add next as a value
		} else {
			wordPairObj[curr] = []
			wordPairObj[curr].push(next)
		}
	}

	// if the last word isn't in the object I guess it's only possible val is end of sentence?
	if (!(textArray[textArray.length-1] in wordPairObj)) {
		wordPairObj[textArray[textArray.length-1]] = ['.']

	}

	return wordPairObj  
}

function writeLine(wordPairObj, numWords) {
// generate a random first word
	// create an empty line
 	let line = ''
 	// create array of just the keys from wordPairObj
	let words = Object.keys(wordPairObj)
	// select random word to be first word and append to line
	let index = Math.floor(Math.random()*(words.length))
	let currentWord = words[index]
	line += currentWord + ' '
  
	// loop through our selected number of words in the line
	for (let i = 1; i < numWords; i++) {
		// find the possible next words in wordPairObj
    	let possibleNextWords = wordPairObj[currentWord]
    	// select a random word and append to line
    	let index = Math.floor(Math.random())*possibleNextWords.length
    	currentWord = possibleNextWords[index]
    	line += currentWord + ' '
	}
	
	return line
}

function generatePoem(textId) {
  let text = textSamples[textId]
  
  let wordPairObj = wordObjGenerator(text)



	let poem = ''
	// randomly select how many lines the poem will be
	// I think it should be between 3-15 lines
	let numLines = Math.floor(Math.random()*12) + 3

	// loop numLines times
	for (let i = 1; i <= numLines; i++) {
		// i want the number of words in each line to also be random
		// between 1 and 11
		let numWordsInLine = Math.floor(Math.random()*10) + 1

		// now we can call the writeLine function
		let line = writeLine(wordPairObj, numWordsInLine)
		// add line to poem and return
		poem += line + `\n`
		
	}
	return poem
  
  return text
}

function readPoem() {
  let poemId = document.querySelector('#poems').value
  
  let node = document.querySelector('#poem-output')
  
  let poem = getPoem(poemId)
  
  node.innerText = poem
  
}
document.getElementById("read-poem").addEventListener('click', readPoem)

function generatePoemText() {
  let textId = document.querySelector('#text').value
  
  let node = document.querySelector('#generated-text')
  
  let poem = generatePoem(textId)
  
  node.innerText = poem
  
}
document.getElementById("generate-poem").addEventListener('click', generatePoemText)





