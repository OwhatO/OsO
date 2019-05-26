
/**
 * The correct modulo. Works like % in Python rather than C.
 * 
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @param  {[type]}   [description]
 * @return {[type]}   [description]
 */
export function modulo( a, b, )
{
	return (a%b - - b)%b;
}
