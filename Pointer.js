
const BASE= Symbol( 'BASE', );
const POINTING= Symbol( 'POINTING', );

export default class Pointer
{
	constructor( base, key=undefined, )
	{
		this[POINTING]= false;
		
		if( key === undefined )
			this.baseOn( base, );
		else
			this.pointTo( base, key, );
	}
	
	baseOn( base, )
	{
		if(!( base instanceof Object ))
			throw 'A pointer must base on a object.';
		
		this[BASE]= base;
		pointToKey.call( this, undefined, );
	}
	
	pointTo( base, key, )
	{
		this.baseOn( base, );
		
		pointToKey.call( this, key, );
	}
	
	pointToMember( key, )
	{
		if(!( this[POINTING] ))
			return pointToKey.call( this, key, );
		
		if(!( this[BASE][this.key] instanceof Object ))
			this[BASE][this.key]= {};
		
		this.pointTo( this[BASE][this.key], key, );
	}
	
	get value()
	{
		checkPointing.call( this, );
		
		return this[BASE][this.key];
	}
	
	set value( value )
	{
		checkPointing.call( this, );
		
		this[BASE][this.key]= value;
	}
	
	get base()
	{
		return this[BASE];
	}
	
	set base( value )
	{
		// Do nothing.
	}
	
	get pointing()
	{
		return this[POINTING];
	}
	
	set pointing( value )
	{
		// Do nothing.
	}
}

function pointToKey( key, )
{
	this.key= key;
	this[POINTING]= (key !== undefined);
}

function checkPointing()
{
	if(!( this[POINTING] ))
		throw 'This pointer is not point to anything.'
}
