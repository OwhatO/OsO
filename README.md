OsO
================================

There are some tools, polyfills of basic support.

# async.js

This file provide some useful tools for async coding. All of these are global interface.

## window.timeout

```js
import 'https://oxo.fenzland.com/OsO/0.1/async.js';

async function timer()
{
	while( true )
	{
		console.log( new Date(), );
		
		await timeout( 1000, );
	}
}

```

## window.nextFrame

```js
import 'https://oxo.fenzland.com/OsO/0.1/async.js';

async function animation()
{
	while( true )
	{
		// render the animation frame ...
		
		await nextFrame();
	}
}

```

# AsyncData

AsyncData is a class extends Promise, with temporary value and rejected fallbalk. 

## Usage

### Create with new keyword

The constructor of AsyncData accepts 3 parameters: 
The first can be a promise or a function like constructor of Promise accepted; 
The second is a temporary value for the time before the Promise resolved or rejected; 
The last can be a value or a function returns a value in case of the Promise rejected.

```js
import AsyncData from 'https://oxo.fenzland.com/OsO/0.1/AsyncData.js';

const foo= new AsyncData( ( resolve, reject, )=> { setTimeout( ()=> resolve( 'OK', ), 1000, ); }, 'Loading', 'There is something wrong', );
const bar= new AsyncData( Promise.reject(), 'Loading', ()=> 'There is something wrong', );

console.log( foo instanceof Promise, );   // true
console.log( foo instanceof AsyncData, ); // true

console.log( bar.temp, );     // Loading
console.log( bar.rejected, ); // There is something wrong


```


### Create from then, catch and finally of Promise

```js
import 'https://oxo.fenzland.com/OsO/0.1/AsyncData.js';

const temp= 'Loading';
const rejected= ()=> 'There is something wrong';

const foo= fetch( /* ... */ ).then( response=> { /* ... */ }, temp, rejected, );
const bar= fetch( /* ... */ ).then( response=> { /* ... */ }, err=> { /* ... */ }, temp, rejected, );
const baz= fetch( /* ... */ ).catch( err=> { /* ... */ }, temp, rejected, );
const qux= fetch( /* ... */ ).finally( ()=> { /* ... */ }, temp, rejected, );

console.log( foo instanceof Promise, );   // true
console.log( foo instanceof AsyncData, ); // true

console.log( bar.temp, );     // Loading
console.log( bar.rejected, ); // There is something wrong

```


### Work with Model

```js
import AsyncData from 'https://oxo.fenzland.com/OsO/0.1/AsyncData.js';
import Model from 'https://oxo.fenzland.com/OmO/0.1/Model.js';

const foo= new Model( new AsyncData( ( resolve, reject, )=> { setTimeout( ()=> resolve( 1, ), 1000, ); }, 0, -1, ), );
const bar= new Model( 0, );
bar.setValue( new AsyncData( ( resolve, reject, )=> { setTimeout( ()=> reject( 1, ), 1000, ); }, 0, -1, ), );

let baz, qux;

foo.observedBy( foo=> baz= foo, );
bar.observedBy( bar=> qux= bar, );

console.log( baz, ); //  0
console.log( qux, ); //  0

await new Promise( resolve=> setTimeout( resolve, 1001, ), );

console.log( baz, ); //  1
console.log( qux, ); //  -1

```


## Side effects

After import the AsyncData module, then, catch and finally of Promise are overridden. 
And there is a global interface `window.AsyncData` registered. 
