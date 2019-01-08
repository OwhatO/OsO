export default function makePrivatizer()
{
	const privateMap= new WeakMap;
	const reverseMap= new WeakMap;
	
	return { _, $, };
	
	function _( object, )
	{
		if(!(  this===undefined ))
			throw '_ is a function but not method or constructor';
		
		let proxy;
		
		if( privateMap.has( object, ) )
		{
			proxy= privateMap.get( object, );
		}
		else
		{
			proxy= (
				object instanceof Function
				? (
					object.prototype
					? 
						function( ...args ){
							if( this===undefined )
								return object( ...args, );
							else
								return _(new object( ...args, ));
						}
					: ( ...args )=> object( ...args, )
				)
				: {}
			);
			
			privateMap.set( object, proxy, );
			reverseMap.set( proxy, object, );
			
			if( object.__proto__ )
			{
				proxy.__proto__= _( object.__proto__, );
			}
			
			if( object.constructor )
			{
				proxy.constructor= _( object.constructor, );
			}
			
			if( object.prototype )
			{
				proxy.prototype= _( object.prototype, );
			}
		}
		
		return proxy;
	}
	
	function $( proxy, )
	{
		return reverseMap.get( proxy, );
		
	}
}
