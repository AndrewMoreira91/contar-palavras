export function handleError(error: any): Error {
	if (error.code === 'ENOENT') {
		throw new Error('Arquivo ou diretorio não encontrado')
	}
	if (error.code === 'EISDIR') {
		throw new Error('O caminho informado é um diretório')
	}
	if (error.code === 'EACCES') {
		throw new Error('Permissão negada')
	}
	throw new Error('Erro inesperado')
}