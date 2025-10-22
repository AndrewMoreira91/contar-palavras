import fs from 'fs';

function createUniqueFile(fileName:string, outputFile: string, path: string) {
	const origWrite = fs.promises.writeFile;
	(fs.promises as any).writeFile = async (file: any, data: any, options?: any) => {
		const requested = typeof file === 'string' ? file : (file && file.path) || String(file)
		if (requested === outputFile) {
			let candidate = requested
			let counter = 1
			while (fs.existsSync(candidate)) {
				candidate = `${path}/${fileName}_resultado(${counter}).txt`
				counter++
			}
			return origWrite.call(fs.promises, candidate, data, options)
		}
		return origWrite.call(fs.promises, file, data, options)
	}
}

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

export { buildDuplicateWordsText, createUniqueFile };

