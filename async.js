
globalThis.timeout= ( time, value, )=> new Promise( ( resolve, reject, )=> setTimeout( ()=> resolve( value, ), time, ), );

globalThis.nextFrame= value=> new Promise( ( resolve, reject, )=> requestAnimationFrame( ()=> resolve( value, ), ), );
