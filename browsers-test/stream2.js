var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof WorkerGlobalScope!="undefined";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&process.type!="renderer";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?undefined:"utf8");return ret};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=async url=>{if(isFileURI(url)){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response);return}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];var wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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QANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCwsCAAuJFAEJfyMAQRBrIgEkAAJAAkAgAARAIABBEGsiA0GAgHxxIgRBgIAITQ0BIARBgIAIayIAKAIAIQJBkBVBNDYCACABIAM2AgwgAUGAFTYCCCABQQA6AAcgASABLQAHIAEoAgwtAAAgASgCCC0AAHNyOgAHIAEgAS0AByABKAIMLQABIAEoAggtAAFzcjoAByABIAEtAAcgASgCDC0AAiABKAIILQACc3I6AAcgASABLQAHIAEoAgwtAAMgASgCCC0AA3NyOgAHIAEgAS0AByABKAIMLQAEIAEoAggtAARzcjoAByABIAEtAAcgASgCDC0ABSABKAIILQAFc3I6AAcgASABLQAHIAEoAgwtAAYgASgCCC0ABnNyOgAHIAEgAS0AByABKAIMLQAHIAEoAggtAAdzcjoAByABIAEtAAcgASgCDC0ACCABKAIILQAIc3I6AAcgASABLQAHIAEoAgwtAAkgASgCCC0ACXNyOgAHIAEgAS0AByABKAIMLQAKIAEoAggtAApzcjoAByABIAEtAAcgASgCDC0ACyABKAIILQALc3I6AAcgASABLQAHIAEoAgwtAAwgASgCCC0ADHNyOgAHIAEgAS0AByABKAIMLQANIAEoAggtAA1zcjoAByABIAEtAAcgASgCDC0ADiABKAIILQAOc3I6AAcgASABLQAHIAEoAgwtAA8gASgCCC0AD3NyOgAHIAEtAAdBAWtBgAJxRQ0CIAEgAiAEajYCDCABQYAVNgIIIAFBADoAByABIAEtAAcgASgCDC0AACABKAIILQAAc3I6AAcgASABLQAHIAEoAgwtAAEgASgCCC0AAXNyOgAHIAEgAS0AByABKAIMLQACIAEoAggtAAJzcjoAByABIAEtAAcgASgCDC0AAyABKAIILQADc3I6AAcgASABLQAHIAEoAgwtAAQgASgCCC0ABHNyOgAHIAEgAS0AByABKAIMLQAFIAEoAggtAAVzcjoAByABIAEtAAcgASgCDC0ABiABKAIILQAGc3I6AAcgASABLQAHIAEoAgwtAAcgASgCCC0AB3NyOgAHIAEgAS0AByABKAIMLQAIIAEoAggtAAhzcjoAByABIAEtAAcgASgCDC0ACSABKAIILQAJc3I6AAcgASABLQAH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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){return{a:wasmImports}}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["g"];updateMemoryViews();addOnInit(wasmExports["h"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);receiveInstantiationResult(result);return result}var ASM_CONSTS={1852:()=>Module.getRandomValue(),1888:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;crypto_=crypto_===undefined?crypto:crypto_;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead=NaN)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"]);var __abort_js=()=>abort("");var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var getHeapMax=()=>2147483648;var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={c:___assert_fail,f:__abort_js,e:__emscripten_memcpy_js,b:_emscripten_asm_const_int,d:_emscripten_resize_heap,a:_fd_write};var wasmExports;createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["h"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["i"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
