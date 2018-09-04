
const PROMISE= Symbol( 'PROMISE', );

export default class Indicator extends Promise
{
	constructor()
	{
		super( ()=> {}, );
		
		this[PROMISE]= new Promise( ( resolve, reject, )=> { this.resolve= resolve; this.reject= reject; }, );
	}
	
	then( ...args )
	{
		return this[PROMISE].then( ...args, );
	}
	
	catch( ...args )
	{
		return this[PROMISE].catch( ...args, );
	}
	
	finally( ...args )
	{
		return this[PROMISE].finally( ...args, );
	}
}
