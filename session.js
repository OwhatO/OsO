import Storage from './Storage.js';

const storages= new Map;

export default function session( channal='default', )
{
	if( typeof channal !== 'string' )
		throw 'The channal must be a string';
	
	if( storages.has( channal, ) )
		return storages.get( channal, );
	
	const storage= new Storage( sessionStorage, `SESSION<${channal}>`, );
	
	storages.set( channal, storage, );
	
	return storage;
}
