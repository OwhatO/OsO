
export function current()
{
	return pathFromErrorStack();
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

export function resolveHere( path, )
{
	return resolve( dirname( new URL( pathFromErrorStack(), ).pathname, ), path, );
}

export function resolve( base, path, )
{
	path= path.split( '/', );
	base= base.split( '/', );
	
	while( true )
		if( path[0]==='..' )
			base.pop(), path.shift();
		else
		if( path[0]==='.' )
			path.shift();
		else
			break;
	
	return base.concat( path, ).join( '/', );
}


function pathFromErrorStack()
{
	return new Error().stack.split( '\n', ).map( x=> x.match( /(https?:\/\/.+):\d+:\d+/, ), ).filter( x=> x, )[2][1];
}
