
const NATIVE_STORAGE= Symbol( 'NATIVE_STORAGE', );
const WRAP_KEY= Symbol( 'WRAP_KEY', );
const PREFIX= Symbol( 'PREFIX', );
const OWNS_KEY= Symbol( 'OWNS_KEY', );

export default class Storage
{
	constructor( native_storage, prefix, )
	{
		this[PREFIX]= prefix;
		this[NATIVE_STORAGE]= native_storage;
	}
	
	set( key, value, )
	{
		this[NATIVE_STORAGE].setItem( this[WRAP_KEY]( key, ), JSON.stringify( value, ), );
		
		return value;
	}
	
	get( key, defaults=null, )
	{
		return (
			this.has( key, )
			? JSON.parse( this[NATIVE_STORAGE].getItem( this[WRAP_KEY]( key, ), ), )
			: defaults
		);
	}
	
	has( key, )
	{
		const wrappedKey= this[WRAP_KEY]( key, );
		
		for( let i= this[NATIVE_STORAGE].length-1; i>=0; --i )
			if( wrappedKey===this[NATIVE_STORAGE].key( i, ) )
				return true;
		
		return false;
	}
	
	del( key, )
	{
		this[NATIVE_STORAGE].removeItem( this[WRAP_KEY]( key, ), );
	}
	
	clear()
	{
		for( let i= this[NATIVE_STORAGE].length-1; i>=0; --i )
		{
			let key= this[NATIVE_STORAGE].key( i, );

			if( [OWNS_KEY]( key, ) )
				this[NATIVE_STORAGE].removeItem( key, );
		}
	}
	
	[WRAP_KEY]( key, )
	{
		return `${this[PREFIX]}+${key}`;
	}
	
	[OWNS_KEY]( key, )
	{
		return `${key}`.slice( 0, this[PREFIX].length, ) === prefix;
	}
}
