
if(!( String.prototype.matching ))
{
	Object.defineProperty( String.prototype, 'matching', {
		value( pattern, group=0, )
		{
			const matches= (pattern instanceof RegExp)? pattern.exec( this, ) : this.match( pattern, );
			
			return matches && matches[group] || null;
		},
	} );
}

if(!( String.prototype.padStart ))
{
	Object.defineProperty( String.prototype, 'padStart', {
		value( length, paddingUnit=' ', )
		{
			if( this.length >= length )
				return this.toString();
			
			const paddingLength= this.length - length
			
			return `${paddingUnit.repeat( paddingLength/paddingUnit.length, )}${paddingUnit.substr( 0, paddingLength%paddingUnit.length, )}${this}`;
		},
	}, );
}

if(!( String.prototype.padEnd ))
{
	Object.defineProperty( String.prototype, 'padEnd', {
		value( length, paddingUnit=' ', )
		{
			if( this.length >= length )
				return this.toString();
			
			const paddingLength= this.length - length
			
			return `${this}${paddingUnit.repeat( paddingLength/paddingUnit.length, )}${paddingUnit.substr( 0, paddingLength%paddingUnit.length, )}`;
		},
	}, );
}

if(!( Object.map ))
{
	Object.defineProperty( Object, 'map', {
		value( object, callback, )
		{
			const result= {};
			
			for( let key in object )
				result[key]= callback( key, object[key], );
			
			return result;
		},
	}, );
}

if(!( Object.entries ))
{
	Object.defineProperty( Object, 'entries', {

		value( object, )
		{
			const result= [];
			
			for( let key in object )
				result.push( [ key, object[key], ], )
			
			return result;
		},
	}, );
}

if(!( Object.values ))
{
	Object.defineProperty( Object, 'values', {
		value( object, )
		{
			const result= [];
			
			for( let key in object )
				result.push( object[key], )
			
			return result;
		},
	}, );
}

if(!( Map.prototype.achieve ))
{
	Object.defineProperty( Map.prototype, 'achieve', {
		value( key, fallback, )
		{
			if( this.has( key, ) )
				return this.get( key, );
			else
			{
				if( fallback instanceof Function )
					fallback= fallback();
				
				this.set( key, fallback, );
				
				return fallback;
			}
		},
	}, );
}
