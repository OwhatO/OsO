
const REJECTED= Symbol( 'rejected', );

export default class AsyncData extends Promise
{
	constructor( param, temp, rejected, )
	{
		if( param instanceof Promise )
		{
			super( ( resolve, reject, )=> param.then( resolve, reject, ), );
		}
		else
		if( param instanceof Function )
		{
			super( param, );
		}
		else
		{
			super( ( resolve, reject, )=> resolve( param, ), );
		}
		
		this.temp= temp;
		this[REJECTED]= rejected;
	}
	
	get rejected()
	{
		if( this[REJECTED] instanceof Function )
			return this[REJECTED]();
		else
			return this[REJECTED];
	}
	
	set rejected( rejected, )
	{
		this[REJECTED]= rejected
	}
}

window.AsyncData= AsyncData;

{
	const thenOrig= Promise.prototype.then;
	
	Promise.prototype.then= function( onResolve, onReject=undefined, temp=undefined, rejected=undefined, ) {
		
		if(!( onReject instanceof Function ))
			temp= onReject, rejected= temp;
		
		if( temp===undefined && rejected===undefined )
			return thenOrig.call( this, onResolve, onReject, );
		else
			return new AsyncData( thenOrig.call( this, onResolve, onReject, ), temp, rejected, );
	}
	
	const catchOrig= Promise.prototype.catch;
	
	Promise.prototype.catch= function( onReject, temp=undefined, rejected=undefined, ) {
		
		if( temp===undefined && rejected===undefined )
			return catchOrig.call( this, onReject, );
		else
			return new AsyncData( catchOrig.call( this, onReject, ), temp, rejected, );
	}
	
	const finallyOrig= Promise.prototype.finally || function( atLast ){ return thenOrig.call( this, ()=> atLast(), ()=> atLast(), ); };
	
	Promise.prototype.finally= function( atLast, temp=undefined, rejected=undefined, ) {
		
		if( temp===undefined && rejected===undefined )
			return finallyOrig.call( this, atLast, );
		else
			return new AsyncData( finallyOrig.call( this, atLast, ), temp, rejected, );
	}
}
