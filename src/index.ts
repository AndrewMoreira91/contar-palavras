export function countWords(text: string): { [key: string]: number }[] {
	const paragraphs = extractParagraphs(text)

	const paragraphsWrapped = paragraphs
		.filter(paragraph => paragraph)
		.map(paragraphs => {
			const words = findDuplicateWords(paragraphs)
			return words
		})

	return paragraphsWrapped
}

function extractParagraphs(text: string): string[] {
	return text.toLowerCase().split('\n')
}

function findDuplicateWords(text: string): { [key: string]: number } {
	const words = text.split(' ')

	let wordsDuplicate: { [key: string]: number } = {}

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

function processWord(word: string): string {
	return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}