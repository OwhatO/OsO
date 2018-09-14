
export function current()

{
	return pathFromErrorStack();
}

export function traceBack( back=1, )
{
	return pathFromErrorStack( 2 - - back, );
}

export function currentPath()
{
	return new URL( pathFromErrorStack(), ).pathname;
}

export function currentDir()
{
	return dirname( new URL( pathFromErrorStack(), ).pathname, );
}

export function basename( path, ext='', )
{
	const filename= path.split( '/', ).pop();
	
	if( ext )
		return filename.slice( 0, -ext.length, );
	else
		return filename
}

export function dirname( path, )
{
	path= path.split( '/', );
	
	while( !path.pop() && path.length );
	
	return path.join( '/', );
}

export function extname( path, )
{
	const ext= path.split( '.', ).pop();
	
	if(!( path.length && path[0] ))
		return '';
	else
		return `.${ext}`;
}

export function isAbsolute( path, )
{
	return path.startsWith( '/', ) || !!path.match( /\w+:\/\//, );
}

export function resolve( ...paths )
{
	standardizeResolvingPaths( paths, );
	
	return paths
		.map( path=> path.split( '/', ), )
		.reduce( ( base, path, )=> {
			while( true )
				if( path[0]==='..' )
					base.pop(), path.shift();
				else
				if( path[0]==='.' )
					path.shift();
				else
					break;
			return base.concat( path, );
		}, [], )
		.join( '/', )
	;
}

function standardizeResolvingPaths( paths, )
{
	for( let i= paths.length - 1; i>=0; --i )
		if( isAbsolute( paths[i], ) )
			return (paths.splice( 0, i, ), undefined);
	
	paths.unshift( dirname( new URL( pathFromErrorStack( 3, ), ).pathname, ), );
}

export default {
	current,
	currentPath,
	currentDir,
	basename,
	dirname,
	extname,
	resolve,
};


function pathFromErrorStack( stackIndex=2, )
{
	return new Error().stack.split( '\n', ).map( x=> x.match( /(https?:\/\/.+):\d+:\d+/, ), ).filter( x=> x, )[stackIndex][1];
}
