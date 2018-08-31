
const PROTO= Symbol( 'PROTO', );

export default class Interface
{
	constructor( proto, )
	{
		this[PROTO]= proto;
	}
	
	[Symbol.hasInstance]( instance, )
	{
		for( let i in this[PROTO] )
			if(!( instance && instance[i] && instance[i] instanceof this[PROTO][i] ))
				return false;
		
		return true;
	}
}
