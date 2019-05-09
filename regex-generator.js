
export class RegexGen
{
	#content= '';
	
	/**
	 * Construct a RegExp generator
	 * 
	 * @param content (string)
	 */
	constructor( content, )
	{
		this.#content= `${content}`;
	}
	
	/**
	 * Generate the regex.
	 * 
	 * @param flag (string)
	 * 
	 * @return {RegExp}
	 */
	toRegExp( flag=undefined, )
	{
		return new RegExp( this.#content, flag, );
	}
	
	/**
	 * Convert regex to string.
	 * 
	 * @return (string)
	 */
	toString()
	{
		return this.#content;
	}
	
	/**
	 * Generate the regex.
	 * 
	 * @return {RegExp}
	 */
	valueOf()
	{
		return this.toRegExp();
	}
	
	/**
	 * Add a {from,to} quantifier
	 * 
	 * @param from  (number)
	 * @param to    (number)
	 * @param eager (boolean)
	 * 
	 * @return {RegexGen}
	 */
	repeat( from=0, to='', eager=true, )
	{
		return new RegexGen( `${this.#content}{${from},${to}}${eager? '': '?'}`, );
	}
	
	/**
	 * Add a * quantifier
	 * 
	 * @param eager (boolean)
	 * 
	 * @return {RegexGen}
	 */
	noneOrMore( eager=true, )
	{
		return new RegexGen( `${this.#content}*${eager? '': '?'}`, );
	}
	
	/**
	 * Add an + quantifier
	 * 
	 * @param eager (boolean)
	 * 
	 * @return {RegexGen}
	 */
	oneOrMore( eager=true, )
	{
		return new RegexGen( `${this.#content}+${eager? '': '?'}`, );
	}
	
	/**
	 * Add a ? quantifier
	 * 
	 * @param eager (boolean)
	 * 
	 * @return {RegexGen}
	 */
	noneOrOne( eager=true, )
	{
		return new RegexGen( `${this.#content}?${eager? '': '?'}`, );
	}
	
	/**
	 * Add a look ahead assertion
	 * 
	 * @param content {RegexGen}
	 *                (string)
	 * 
	 * @return {RegexGen}
	 */
	followed( content, )
	{
		return new RegexGen( `${this.#content}(?=${escape( content, )})`, );
	}
	
	/**
	 * Add a negative look ahead assertion
	 * 
	 * @param content {RegexGen}
	 *                (string)
	 * 
	 * @return {RegexGen}
	 */
	notFollowed( content, )
	{
		return new RegexGen( `${this.#content}(?!${escape( content, )})`, );
	}
	
	/**
	 * Add a look behind assertion
	 * 
	 * @param content {RegexGen}
	 *                (string)
	 * 
	 * @return {RegexGen}
	 */
	led( content, )
	{
		return new RegexGen( `(?<=${escape( content, )})${this.#content}`, );
	}
	
	/**
	 * Add a negative look behind assertion
	 * 
	 * @param content {RegexGen}
	 *                (string)
	 * 
	 * @return {RegexGen}
	 */
	notLed( content, )
	{
		return new RegexGen( `(?<!${escape( content, )})${this.#content}`, );
	}
}

/**
 * Make a regex generator by raw string without escape
 * 
 * @param content (string)
 *                {RegexGen}
 *                {RegExp}
 * 
 * @return {RegexGen}
 */
export function make( content )
{
	return new RegexGen( escape( content, ), );
}

/**
 * Join many regexes together
 * 
 * @param  ...items []<{RegexGen}|(string)>
 * 
 * @return {RegexGen}
 */
export function join( ...items )
{
	return new RegexGen( items.map( escape, ).join( '', ), );
}

/**
 * One or others
 * 
 * @param  ...items []<{RegexGen}|(string)>
 * 
 * @return {RegexGen}
 */
export function or( ...items )
{
	return group( new RegexGen( items.map( escape, ).join( '|', ), ), );
}

/**
 * In a set
 * 
 * @param  ...items []<{RegexGen}|(string)>
 * 
 * @return {RegexGen}
 */
export function inSet( ...items )
{
	return new RegexGen( `[${items.map( escapeForSet, ).join()}]`, );
}

/**
 * Not in a set
 * 
 * @param  ...items []<{RegexGen}|(string)>
 * 
 * @return {RegexGen}
 */
export function notInSet( ...items )
{
	return new RegexGen( `[^${items.map( escapeForSet, ).join()}]`, );
}

/**
 * Make a non-capturing group
 * 
 * @param  ...items []<{RegexGen}|(string)>
 * 
 * @return {RegexGen}
 */
export function group( ...items )
{
	return new RegexGen( `(?:${join( ...items, )})`, );
}

/**
 * Make a capturing group
 * 
 * @param  ...items []<{RegexGen}|(string)>
 * 
 * @return {RegexGen}
 */
export function capture( ...items )
{
	return new RegexGen( `(${join( ...items, )})`, );
}

/**
 * Make a capturing group
 * 
 * @param  ...items []<{RegexGen}|(string)>
 * 
 * @return {RegexGen}
 */
export function named( name, ...items )
{
	return new RegexGen( `(?<${name}>${join( ...items, )})`, );
}

/**
 * Add a {from,to} quantifier
 * 
 * @param from  (number)
 * @param to    (number)
 * @param eager (boolean)
 * 
 * @return {RegexGen}
 */
export function repeat( content, from=0, to='', eager=true, )
{
	return new RegexGen( `${escape( content, )}{${from},${to}}${eager? '': '?'}`, );
}

/**
 * Add a * quantifier
 * 
 * @param eager (boolean)
 * 
 * @return {RegexGen}
 */
export function noneOrMore( content, eager=true, )
{
	return new RegexGen( `${escape( content, )}*${eager? '': '?'}`, );
}

/**
 * Add an + quantifier
 * 
 * @param eager (boolean)
 * 
 * @return {RegexGen}
 */
export function oneOrMore( content, eager=true, )
{
	return new RegexGen( `${escape( content, )}+${eager? '': '?'}`, );
}

/**
 * Add a ? quantifier
 * 
 * @param eager (boolean)
 * 
 * @return {RegexGen}
 */
export function noneOrOne( content, eager=true, )
{
	return new RegexGen( `${escape( content, )}?${eager? '': '?'}`, );
}

/**
 * Make a look ahead assertion
 * 
 * @param content {RegexGen}
 *                (string)
 * 
 * @return {RegexGen}
 */
export function followed( content, )
{
	return new RegexGen( `(?=${escape( content, )})`, );
}


/**
 * Make a negative look ahead assertion
 * 
 * @param content {RegexGen}
 *                (string)
 * 
 * @return {RegexGen}
 */
export function notFollowed( content, )
{
	return new RegexGen( `(?!${escape( content, )})`, );
}


/**
 * Make a look behind assertion
 * 
 * @param content {RegexGen}
 *                (string)
 * 
 * @return {RegexGen}
 */
export function led( content, )
{
	return new RegexGen( `(?<=${escape( content, )})`, );
}

/**
 * Make a negative look behind assertion
 * 
 * @param content {RegexGen}
 *                (string)
 * 
 * @return {RegexGen}
 */
export function notLed( content, )
{
	return new RegexGen( `(?<!${escape( content, )})`, );
}

export const any=               new RegexGen( '.',     );
export const tab=               new RegexGen( '\\t',   );
export const lineFeed=          new RegexGen( '\\n',   );
export const word=              new RegexGen( '\\w',   );
export const nonWord=           new RegexGen( '\\W',   );
export const digit=             new RegexGen( '\\d',   );
export const nonDigit=          new RegexGen( '\\D',   );
export const whiteSpace=        new RegexGen( '\\s',   );
export const nonWhiteSpace=     new RegexGen( '\\S',   );
export const edge=              new RegexGen( '\\b',   );
export const nonEdge=           new RegexGen( '\\B',   );
export const begin=             new RegexGen( '^',     );
export const end=               new RegexGen( '$',     );

export const indent=            new RegexGen( '^\\t*', );

/**
 * Escape for regex
 * 
 * @param  raw (string)
 *             {RegexGen}   do nothing
 * 
 * @return (string)
 */
function escape( raw, )
{
	if( raw instanceof RegexGen )
		return `${raw}`;
	else
	if( raw instanceof RegExp )
		return raw.source;
	else
		return `${raw}`.replace( /([\\\/\(\)\[\]\{\}\|\^\$\+\*\?\.\=\>\<])/g, '\\$1', );
}

/**
 * Escape for [] set, more single charactor '-'
 * 
 * @param  raw (string)
 *             {RegexGen}   do nothing
 * 
 * @return (string)
 */
function escapeForSet( raw, )
{
	if( raw instanceof RegexGen )
		return `${raw}`;
	else
		return escape( raw, ).replace( /^-$/, '\\-', );
}
