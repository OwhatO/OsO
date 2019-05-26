
/**
 * Reduce throw several arraies
 * 
 * @param 0.compare ()=> {}
 *                  @param valueX <any>    one value to compare
 *                  @param valueY <any>    another value to compare
 *                  @param nX     (number) which array x from
 *                  @param nY     (number) which array y from
 *                  
 *                  @return (boolean) true to choose x, false to choose y
 * 
 * @param 0.proceed ()=> {}
 *                  @param value   <any>    the reduced value
 *                  @param current <any>    current value
 *                  @param n       (number) which array the value from
 *                  @param i       (number) the index of value in it's array
 *                  
 *                  @return <any>
 * 
 * @param 0.init    <any>
 * @param ...arrays [][]
 * 
 * @return <any>
 */
export function multipleReduce( { compare, proceed, init=undefined, }, ...arrays )
{
	const indexes= arrays.map( ()=> 0, );
	let value= init;
	
	while( indexes.some( ( i, n, )=> i < arrays[n].length, ) )
	{
		const candidates= arrays.reduce( ( candidates, array, n, )=> (indexes[n] < array.length && candidates.push( { n, value:array[indexes[n]], }, ), candidates), [], );
		const n= candidates.length === 1? candidates[0].n: candidates.reduce( ( x, y, )=> compare( x.value, y.value, x.n, y.n, )? x: y, ).n;
		const i= indexes[n]++;
		const item= arrays[n][i];
		
		value= proceed( value, item, n, i, arrays[n], arrays, );
	}
}
