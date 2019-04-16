
const encoder= new TextEncoder();
const decoder= new TextDecoder();

/**
 * Decode string into TypedArray
 * 
 * @param text (string)
 * 
 * @return {TypedArray}
 */
export function encode( text, )
{
	return encoder.encode( text, );
}

/**
 * Decode TypedArray to string
 * 
 * @param array {TypedArray}
 * 
 * @return (string)
 */
export function decode( array, )
{
	return decoder.decode( array, );
}
