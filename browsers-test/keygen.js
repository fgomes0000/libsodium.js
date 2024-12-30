var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof WorkerGlobalScope!="undefined";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&process.type!="renderer";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?undefined:"utf8");return ret};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=async url=>{if(isFileURI(url)){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response);return}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];var wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,AGFzbQEAAAABQwtgA39/fwF/YAF/AGABfwF/YAAAYAN/f38AYAR/f39/AX9gAn9/AGACf38Bf2AEf39/fwBgBX9/f39/AGADf35/AX4CJQYBYQFhAAUBYQFiAAABYQFjAAIBYQFkAAQBYQFlAAMBYQFmAAgDGBcBCQIEAAIGAAMDAQMGBwQCBQEBCgIABwQEAXAAGgUHAQGCAoCAAgYIAX8BQYCkBAsHEQQBZwIAAWgADgFpAQABagAcCR8BAEEBCxkGBgYGBgYGBgYGBgYGBgYGGAYGBgYGGhsZCrN8FwgAIABBIBAMC2sBAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgASACIANrIgNBgAIgA0GAAkkiARsQChogAUUEQANAIAAgBUGAAhAJIANBgAJrIgNB/wFLDQALCyAAIAUgAxAJCyAFQYACaiQAC08BAn9B2A8oAgAiASAAQQdqQXhxIgJqIQACQCACQQAgACABTRtFBEAgAD8AQRB0TQ0BIAAQAg0BC0GwFkEwNgIAQX8PC0HYDyAANgIAIAELFwAgAC0AAEEgcUUEQCABIAIgABANGgsL8gICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBBGsgATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQQhrIAE2AgAgAkEMayABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkEQayABNgIAIAJBFGsgATYCACACQRhrIAE2AgAgAkEcayABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa1CgYCAgBB+IQUgAyAEaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLIAALWQEBfyAAIAAoAkgiAUEBayABcjYCSCAAKAIAIgFBCHEEQCAAIAFBIHI2AgBBfw8LIABCADcCBCAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQQQALQwECfyMAQRBrIgIkACABBEADQCACQQA6AA8gACADakHcDyACQQ9qQQAQAToAACADQQFqIgMgAUcNAAsLIAJBEGokAAuXBQEFfwJAIAIoAhAiAwR/IAMFIAIQCw0BIAIoAhALIAIoAhQiBGsgAUkEQCACIAAgASACKAIkEQAADwsCQAJAIAIoAlBBAEgNACABRQ0AIAEhBQNAIAAgBWoiA0EBay0AAEEKRwRAIAVBAWsiBQ0BDAILCyACIAAgBSACKAIkEQAAIgQgBUkNAiABIAVrIQEgAigCFCEEDAELIAAhA0EAIQULIAQhAAJAIAFBgARPBEAgACADIAEQAwwBCyAAIAFqIQQCQCAAIANzQQNxRQRAAkAgAEEDcUUNACABRQ0AA0AgACADLQAAOgAAIANBAWohAyAAQQFqIgBBA3FFDQEgACAESQ0ACwsgBEF8cSEGAkAgBEHAAEkNACAAIAZBQGoiB0sNAANAIAAgAygCADYCACAAIAMoAgQ2AgQgACADKAIINgIIIAAgAygCDDYCDCAAIAMoAhA2AhAgACADKAIUNgIUIAAgAygCGDYCGCAAIAMoAhw2AhwgACADKAIgNgIgIAAgAygCJDYCJCAAIAMoAig2AiggACADKAIsNgIsIAAgAygCMDYCMCAAIAMoAjQ2AjQgACADKAI4NgI4IAAgAygCPDYCPCADQUBrIQMgAEFAayIAIAdNDQALCyAAIAZPDQEDQCAAIAMoAgA2AgAgA0EEaiEDIABBBGoiACAGSQ0ACwwBCyAEQQRJDQAgBEEEayIGIABJDQADQCAAIAMtAAA6AAAgACADLQABOgABIAAgAy0AAjoAAiAAIAMtAAM6AAMgA0EEaiEDIABBBGoiACAGTQ0ACwsgACAESQRAA0AgACADLQAAOgAAIANBAWohAyAAQQFqIgAgBEcNAAsLCyACIAIoAhQgAWo2AhQgASAFaiEECyAECxMAQeAfQegeNgIAQZgfQSo2AgALBQAQBAALjBQBCX8jAEEQayIBJAACQAJAIAAEQCAAQRBrIgNBgIB8cSIEQYCACE0NASAEQYCACGsiACgCACECQbAWQTQ2AgAgASADNgIMIAFBoBY2AgggAUEAOgAHIAEgAS0AByABKAIMLQAAIAEoAggtAABzcjoAByABIAEtAAcgASgCDC0AASABKAIILQABc3I6AAcgASABLQAHIAEoAgwtAAIgASgCCC0AAnNyOgAHIAEgAS0AByABKAIMLQADIAEoAggtAANzcjoAByABIAEtAAcgASgCDC0ABCABKAIILQAEc3I6AAcgASABLQAHIAEoAgwtAAUgASgCCC0ABXNyOgAHIAEgAS0AByABKAIMLQAGIAEoAggtAAZzcjoAByABIAEtAAcgASgCDC0AByABKAIILQAHc3I6AAcgASABLQAHIAEoAgwtAAggASgCCC0ACHNyOgAHIAEgAS0AByABKAIMLQAJIAEoAggtAAlzcjoAByABIAEtAAcgASgCDC0ACiABKAIILQAKc3I6AAcgASABLQAHIAEoAgwtAAsgASgCCC0AC3NyOgAHIAEgAS0AByABKAIMLQAMIAEoAggtAAxzcjoAByABIAEtAAcgASgCDC0ADSABKAIILQANc3I6AAcgASABLQAHIAEoAgwtAA4gASgCCC0ADnNyOgAHIAEgAS0AByABKAIMLQAPIAEoAggtAA9zcjoAByABLQAHQQFrQYACcUUNAiABIAIgBGo2AgwgAUGgFjYCCCABQQA6AAcgASABLQAHIAEoAgwtAAAgASgCCC0AAHNyOgAHIAEgAS0AByABKAIMLQABIAEoAggtAAFzcjoAByABIAEtAAcgASgCDC0AAiABKAIILQACc3I6AAcgASABLQAHIAEoAgwtAAMgASgCCC0AA3NyOgAHIAEgAS0AByABKAIMLQAEIAEoAggtAARzcjoAByABIAEtAAcgASgCDC0ABSABKAIILQAFc3I6AAcgASABLQAHIAEoAgwtAAYgASgCCC0ABnNyOgAHIAEgAS0AByABKAIMLQAHIAEoAggtAAdzcjoAByABIAEtAAcgASgCDC0ACCABKAIILQAIc3I6AAcgASABLQAHIAEoAgwtAAkgASgCCC0ACXNyOgAHIAEgAS0AByABKAIMLQAKIAEoAggtAApzcjoAByABIAEtAAcgASgCDC0ACyABKAIILQALc3I6AAcgASABLQAHIAEoAgwtAAwgASgCCC0ADHNyOgAHIAEgAS0AByABKAIMLQANIAEoAggtAA1zcjoAByABIAEtAAcgASgCDC0ADiABKAIILQAOc3I6AAcgASABLQAHIAEoAgwtAA8gASgCCC0AD3NyOgAHIAEtAAdBAWtBgAJx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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){return{a:wasmImports}}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["g"];updateMemoryViews();addOnInit(wasmExports["h"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);receiveInstantiationResult(result);return result}var ASM_CONSTS={2012:()=>Module.getRandomValue(),2048:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;crypto_=crypto_===undefined?crypto:crypto_;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead=NaN)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"]);var __abort_js=()=>abort("");var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var getHeapMax=()=>2147483648;var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={f:___assert_fail,e:__abort_js,d:__emscripten_memcpy_js,b:_emscripten_asm_const_int,c:_emscripten_resize_heap,a:_fd_write};var wasmExports;createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["h"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["j"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
