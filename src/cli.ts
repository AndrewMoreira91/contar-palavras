import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import { handleError } from './errors/functionError.ts'
import { buildDuplicateWordsText, createUniqueFile } from './helpers.ts'
import { countWords } from './index.ts'

const program = new Command();

program
	.name('word-counter')
	.version('1.0.0')
	.description('Programa para contar palavras repetidas em um texto')

program.command('count')
	.arguments('<input> <output>')
	.option('-i, --input <string>', 'caminho do arquivo de entrada')
	.option('-o, --output <string>', 'caminho do arquivo de saída')
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
			const fileName = path.basename(input)
			createAndSaveFile(wordStatistics, output, fileName)
		} catch (error: any) {
			handleError(error)
		}
	})
}

async function createAndSaveFile(listWords: { [key: string]: number }[], path: string, fileName: string) {
	const outputFile = `${path}/${fileName}_resultado.txt`

	createUniqueFile(fileName, outputFile, path)

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
