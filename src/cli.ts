import fs from 'fs'
import path from 'path'
import { handleError } from './errors/functionError.ts'
import { countWords } from './index.ts'
import { buildDuplicateWordsText } from './helpers.ts'
import { Command } from 'commander';
const program = new Command();

program
	.name('word-counter')
	.version('1.0.0')
	.description('Programa para contar palavras repetidas em um texto')

program.command('count')
	.arguments('<input> <output>')
	.option('-i, --input <string>', 'caminho do arquivo de entrada')
	.option('-o, --output <string>', 'camino do arquivo de saída')
	.action((input, output) => {
		const pathOutput = path.resolve(output)
		const pathInput = path.resolve(input)

		try {
			processFile(pathInput, pathOutput)
		} catch (error) {
			console.log('Erro ao processar arquivo', error)
		}
	})

function processFile(input: string, output: string) {
	fs.readFile(input, 'utf-8', (err, text) => {
		try {
			if (err) throw err
			const wordStatistics = countWords(text)
			createAndSaveFile(wordStatistics, output)
		} catch (error: any) {
			handleError(error)
		}
	})
}

async function createAndSaveFile(listWords, path) {
	const outputFile = `${path}/resultado.txt`
	const textWords = buildDuplicateWordsText(listWords)
	try {
		await fs.promises.writeFile(outputFile, textWords)
			.then(() => console.log('Arquivo criado com sucesso'))
			.catch((error) => handleError(error))
	} catch (error: any) {
		throw error
	}
}

program.parse()