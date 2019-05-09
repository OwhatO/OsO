OsO
================================

There are some tools, polyfills of basic support. 



# async.js

This file provide some useful tools for async coding. All of these are global interface. 

## globalThis.timeout

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

## globalThis.nextFrame

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
And there is a global interface `globalThis.AsyncData` registered. 



# Interface

A implement of "duck type" interface. 

## Usage

### Basic

```js
import Interface from 'https://oxo.fenzland.com/OsO/0.1/Interface.js';

const IBalloon= new Interface( {
	size: Number,
	color: String,
	float: Function,
	bang: Function,
}, );

const foo= [];
const bar= true;
const baz= {
	size: '5',
	color: 'green',
	float(){},
	bang(){ this.size= 0; },
}
const qux= {
	size: 5,
	color: 'green',
	float(){},
	bang(){ this.size= 0; },
}
const quz= [];
quz.size= 5;
quz.color= 'green';
quz.float= ()=> {};
quz.bang= ()=> {};

console.log( foo instanceof IBalloon, ); // false
console.log( bar instanceof IBalloon, ); // false
console.log( baz instanceof IBalloon, ); // false
console.log( qux instanceof IBalloon, ); // true
console.log( quz instanceof IBalloon, ); // true

```

### Nesting

```js
import Interface from 'https://oxo.fenzland.com/OsO/0.1/Interface.js';

const IFinger= new Interface( {
	length: Number,
}, );

const IHand= new Interface( {
	thumb: IFinger,
	forefinger: IFinger,
	medius: IFinger,
	ring_finger: IFinger,
	pinkie: IFinger,
}, );

```

### Inheriting

```js
import Interface from 'https://oxo.fenzland.com/OsO/0.1/Interface.js';

const IPerson= new Interface( {
	age: Number,
	gender: String,
}, );

const ITeacher= new Interface( IPerson, {
	course: String,
	teaching_age: Number,
}, );

const IWolf= new Interface( {
	howl: Function,
	hunt: Function,
}, );

const IWerewolf= new Interface( IPerson, IWolf, {
	transform: Function,
}, );

```



# Storage

A JSON base, channelized local or session storage api wrapper. 

## Usage

```js
import Storage from 'https://oxo.fenzland.com/OsO/0.1/Storage.js';

const storageA= new Storage( localStorage, 'channelA', );
const storageB= new Storage( localStorage, 'channelB', );

storageA.set( 'foo', 5, );
storageB.set( 'foo', { name: 'Fool', age: 54, }, );

console.log( storageA.get( 'foo', ), );      // 5
console.log( storageB.get( 'foo', ).name, ); // Fool
console.log( storageA.has( 'foo', ), );      // true
console.log( storageA.has( 'bar', ), );      // false
console.log( storageA.get( 'bar', ), );      // null
console.log( storageA.get( 'bar', 22, ), );  // 22

storageA.clear();

console.log( storageA.has( 'foo', ), );      // false
console.log( storageB.has( 'foo', ), );      // true

```



# RePromise

A promise can only resolve or reject once. A repromise can resolve or reject multi-times. 

## Usage

```js
import RePromise from 'https://oxo.fenzland.com/OsO/0.1/RePromise.js';

const repromise= new RePromise( ( resolve, reject, )=> { /* ... */ }, );

repromise.then( ()=> {}, );
repromise.then( ()=> {}, ()=> {}, );
repromise.catch( ()=> {}, );
repromise.finally( ()=> {}, );

repromise.thenOnce( ()=> {}, );
repromise.thenOnce( ()=> {}, ()=> {}, );
repromise.catchOnce( ()=> {}, );
repromise.finallyOnce( ()=> {}, );

```



# Indicator

An indicator is a promise that never resolve or reject itself, but you can indicate what to do. 

## Usage

```js
import Indicator from 'https://oxo.fenzland.com/OsO/0.1/Indicator.js';

const indicator= new Indicator();

indicator.then( ()=> {}, );
indicator.then( ()=> {}, ()=> {}, );
indicator.catch( ()=> {}, );
indicator.finally( ()=> {}, );

if( youAreHappy() )
	indicator.resolve( 'happiness', );
else
	indicator.reject( 'unhappiness' );

```



# ReIndicator

Promise -> Indicator ∽ RePromise -> ReIndicator



# path.js

In Node.js, there is a standard library named "path", and this is the same thing for web enviroment. 

## Apis

```js
// Apis same as path of Node.js

basename( path, );
dirname( path, );
extname( path, );
resolve( [...paths], );


// Apis base on current path.

current();            // returns the full url of current js file.
currentPath();        // returns the path of the url of current js file.
currentDir();         // returns the dirname of the path of the url of current js file.

```

## Usage

```js
import { current, currentPath, currentDir, basename, dirname, extname, resolveHere, resolve, } from 'https://oxo.fenzland.com/OsO/0.1/path.js';

// Supposing that here is https://oxo.fenzland.com/utopia/goats-wool/404.js

console.log( current(), );                   // https://oxo.fenzland.com/utopia/goats-wool/404.js
console.log( currentPath(), );               // /utopia/goats-wool/404.js
console.log( currentDir(), );                // /utopia/goats-wool
console.log( resolve( '/foo.js' ), );        // /foo.js
console.log( resolve( 'foo.js' ), );         // /utopia/goats-wool/foo.js
console.log( resolve( '../foo.js' ), );      // /utopia/foo.js


```



# Pointer

ECMAScript dose not support pointer, but sometimes we need it. So class Pointer is here. 
Unfortunately, it only support point to a property of object, but not a variable. 

## Usage

```js
import Pointer from 'https://oxo.fenzland.com/OsO/0.1/Pointer.js';

const object= { foo: 2, bar: 5, };

const pointer= new Pointer( object, 'foo' );

console.log( pointer.value, );   // 2
pointer.value= 8;
console.log( object.foo, );      // 8

```


# Privatizer

Before we can use #private property, we can use this module to make properties private. 
This module is collect from [JsPr](https://github.com/Fenzland/JsPr). 

## Usage

```js
import makePrivatizer from 'https://oxo.fenzland.com/OsO/0.1/privatizer.js';

const { _, $, }= makePrivatizer();

class Foo
{
	constructor( pub, pri, )
	{
		this.pub= pub;
		
		// access to a private property
		_(this).pri= pri;
		
		// call a private method
		_(this).init();
	}
}

// define a private method
_(Foo.prototype).init= function(){
	
	// access to a private property in private method
	this.pri;
	
	// access to a public property in private method
	$(this).pub;
};

// if you don't like _ and $
const { _:toPrivate, $:toPublic, }= makePrivatizer();
```



# Encoder

Encode and decode with singletons of TextEncoder and TextDecoder.

## Usage

```js
import { encode, decode, } from 'https://oxo.fenzland.com/OsO/0.1/text-encoder.js';

const array= encode( 'Hello World', );
const string= decode( array, );
```



# Deep Assign

Deep copy version of Object.assign.

## Usage

```js
import deepAssign from 'https://oxo.fenzland.com/OsO/0.1/deepAssign.js';

deepAssign( target, source0, source1, ...moreSources, );
```



# Regex Generator

Write complex regex in a readable way.

## Usage

```js
import * as rg from 'https://oxo.fenzland.com/OsO/0.1/regex-generator.js';

const generator= rg.join(
	rg.begin,
	rg.or( 'orange', 'apple', ),
	':',
	rg.whiteSpace.noneOrMore(),
	rg.capture(
		rg.oneOrMore( '0', ),
		rg.digit.oneOrMore(),
		rg.group( '-', rg.digit.oneOrMore(), ).noneOrOne(),
	),
	/\s+/,
	rg.named( 'link',
		'http',
		noneOrOne( 's', ),
		'://',
		rg.any.noneOrMore(),
	)
	rg.end,
);
const regex= generator.toRegExp();
/^(?:orange|apple):\s*(0+\d+(?:\-\d+)?)\s+(?<link>https?:\/\/.*)$/
const globalRegex= generator.toRegExp( 'g', );
/^(?:orange|apple):\s*(0+\d+(?:\-\d+)?)\s+(?<link>https?:\/\/.*)$/g
```
