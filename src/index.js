import { readFile } from 'fs'

const filePath = process.argv
const link = filePath[2]

if (!link) {
	console.log('Por favor, insira o caminho do arquivo')
	process.exit(1)
}

readFile(link, 'utf-8', (err, text) => {
	if (err) {
		console.log('Erro ao ler o arquivo')
	} else {
		countWords(text)
	}
})

function countWords(text) {
	const paragraphs = extractParagraphs(text)

	const paragraphsWrapped = paragraphs.flatMap(paragraph => {
		if (!paragraph) return []
		return findDuplicateWords(paragraph)
	})

	console.log(paragraphsWrapped)
}

function extractParagraphs(text) {
	return text.toLowerCase().split('\n')
}

function findDuplicateWords(text) {
	const words = text.split(' ')

	let wordsDuplicate = {}

	words.forEach(word => {
		if (word.length >= 3) {
			const cleanWord = processWord(word)
			wordsDuplicate = {
				...wordsDuplicate,
				[cleanWord]: wordsDuplicate[cleanWord] ? wordsDuplicate[cleanWord] + 1 : 1,
			}
		}
	})

	return wordsDuplicate
}

function processWord(word) {
	return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}