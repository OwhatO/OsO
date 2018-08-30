
window.timeout= ( time, value, )=> new Promise( ( resolve, reject, )=> setTimeout( ()=> resolve( value, ), time, ), );

window.nextFrame= value=> new Promise( ( resolve, reject, )=> requestAnimationFrame( ()=> resolve( value, ), ), );
