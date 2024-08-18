function buildDuplicateWordsText(listWords: { [key: string]: number }[]) {
	let finalText = ''

	listWords.forEach((paragraph, index) => {
		const wordsDuplicates = getDuplicateWords(paragraph).join(', ')
		finalText += `Palavras repetidas no paragrafo ${index + 1}: ${wordsDuplicates}\n`
	})

	return finalText
}

function getDuplicateWords(paragraph: { [key: string]: number }) {
	const listaDePalavrasRepetidas = Object.keys(paragraph)
		.filter(key => paragraph[key] > 1)
	return listaDePalavrasRepetidas
}

export { buildDuplicateWordsText }