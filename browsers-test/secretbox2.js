var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof WorkerGlobalScope!="undefined";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&process.type!="renderer";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?undefined:"utf8");return ret};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=async url=>{if(isFileURI(url)){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response);return}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];var wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,AGFzbQEAAAABbxFgA39/fwF/YAN/f38AYAJ/fwF/YAR/f35/AX9gAABgAX8Bf2AEf39/fwF/YAR/fn9/AX9gBn9/fn9+fwF/YAN/f34AYAR/f39/AGAFf39/f38AYAF+AX9gAn9/AGABfwBgA39/fgF/YAN/fn8BfgIZBAFhAWEACgFhAWIABgFhAWMAAAFhAWQAAQMeHQELAQwBDQkABAUJBAIBBQYEDgIPAgMDEAUACAcCBAQBcAALBQcBAYICgIACBggBfwFB4KIECwcRBAFlAgABZgAPAWcAIAFoAQAJEAEAQQELChoZGBcWHx4cHRsK91od8AICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBBGsgADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQQhrIAA2AgAgAUEMayAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUEQayAANgIAIAFBFGsgADYCACABQRhrIAA2AgAgAUEcayAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK1CgYCAgBB+IQUgASADaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLC2oBAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgASACIANrIgNBgAIgA0GAAkkiARsQBCABRQRAA0AgACAFQYACEAYgA0GAAmsiA0H/AUsNAAsLIAAgBSADEAYLIAVBgAJqJAALFwAgAC0AAEEgcUUEQCABIAIgABALGgsLxAEBA38jAEEgayICJABBfyEDAkAgAEIgVA0AIwBBIGsiASQAIAEQFSACQiBBwA8gAUGEECgCABEHABogAUEAQSAQBCABQSBqJABBkA5BoA4gAEIgfSACQfQPKAIAEQMADQAjAEEgayIBJAAgARAVQdAXQYAOIABBwA9CACABQYgQKAIAEQgAGiABQQBBIBAEIAFBIGokAEHoF0IANwAAQeAXQgA3AABB2BdCADcAAEHQF0IANwAAQQAhAwsgAkEgaiQAIAMLtwUBH39B5fDBiwYhBCACKAAAIhUhBSACKAAEIhYhByACKAAIIhchCCACKAAMIhghCUHuyIGZAyENIAEoAAAiGSEKIAEoAAQiGiELIAEoAAgiGyEMIAEoAAwiHCEQQbLaiMsHIQEgAigAECIdIQNB9MqB2QYhBiACKAAcIh4hESACKAAYIh8hDyACKAAUIiAhAgNAIAUgDWpBB3cgEHMiDiANakEJdyAPcyITIAIgBGpBB3cgCXMiCSAEakEJdyAMcyIUIAlqQQ13IAJzIiEgCCADIAZqQQd3cyIIIAZqQQl3IAtzIgsgCGpBDXcgA3MiDCALakESdyAGcyIGIAEgCmpBB3cgEXMiA2pBB3dzIgIgBmpBCXdzIg8gAmpBDXcgA3MiESAPakESdyAGcyEGIAwgAyABIANqQQl3IAdzIgdqQQ13IApzIgogB2pBEncgAXMiASAOakEHd3MiAyABakEJdyAUcyIMIANqQQ13IA5zIhAgDGpBEncgAXMhASAKIBMgDiATakENdyAFcyIOakESdyANcyIFIAlqQQd3cyIKIAVqQQl3IAtzIgsgCmpBDXcgCXMiCSALakESdyAFcyENIBQgIWpBEncgBHMiBCAIakEHdyAOcyIFIARqQQl3IAdzIgcgBWpBDXcgCHMiCCAHakESdyAEcyEEIBJBAmoiEkEUSQ0ACyAAIAZB9MqB2QZqNgA8IAAgESAeajYAOCAAIA8gH2o2ADQgACACICBqNgAwIAAgAyAdajYALCAAIAFBstqIywdqNgAoIAAgECAcajYAJCAAIAwgG2o2ACAgACALIBpqNgAcIAAgCiAZajYAGCAAIA1B7siBmQNqNgAUIAAgCSAYajYAECAAIAggF2o2AAwgACAHIBZqNgAIIAAgBSAVajYABCAAIARB5fDBiwZqNgAAC64DAgx/A34gACkDOCIOQgBSBEAgAEFAayICIA6nIgNqQQE6AAAgDkIBfEIPWARAIAAgA2pBwQBqQQBBDyADaxAECyAAQQE6AFAgACACQhAQDgsgADUCNCEOIAA1AjAhDyAANQIsIRAgASAAKAIUIAAoAiQgACgCICAAKAIcIAAoAhgiA0EadmoiAkEadmoiBkEadmoiCUEadkEFbGoiBEH///8fcSIFQQVqIgdBGnYgA0H///8fcSAEQRp2aiIEaiIIQRp2IAJB////H3EiCmoiC0EadiAGQf///x9xIgZqIgxBGnYgCUH///8fcWoiDUGAgIAgayICQR91IgMgBHEgAkEfdkEBayIEQf///x9xIgIgCHFyIghBGnQgAiAHcSADIAVxcnIiBSAAKAIoaiIHNgAAIAEgBSAHS60gECADIApxIAIgC3FyIgVBFHQgCEEGdnKtfHwiED4ABCABIA8gAyAGcSACIAxxciICQQ50IAVBDHZyrXwgEEIgiHwiDz4ACCABIA4gBCANcSADIAlxckEIdCACQRJ2cq18IA9CIIh8PgAMIABBAEHYABAEC9kEAgZ+AX8CQCAAKQM4IgNCAFIEQCAAQhAgA30iBCACIAIgBFYbIgRCAFIEfiAAQUBrIQlCACEDIARCBFoEQCAEQnyDIQUDQCAJIAApAzggA3ynaiABIAOnai0AADoAACAJIANCAYQiCCAAKQM4fKdqIAEgCKdqLQAAOgAAIAkgA0IChCIIIAApAzh8p2ogASAIp2otAAA6AAAgCSADQgOEIgggACkDOHynaiABIAinai0AADoAACADQgR8IQMgBkIEfCIGIAVSDQALCyAEQgODIgZCAFIEQANAIAkgACkDOCADfKdqIAEgA6dqLQAAOgAAIANCAXwhAyAHQgF8IgcgBlINAAsLIAApAzgFIAMLIAR8IgM3AzggA0IQVA0BIAAgAEFAa0IQEA4gAEIANwM4IAIgBH0hAiABIASnaiEBCyACQhBaBEAgACABIAJCcIMiAxAOIAJCD4MhAiABIAOnaiEBCyACUA0AIABBQGshCUIAIQdCACEDIAJCBFoEQCACQgyDIQRCACEGA0AgCSAAKQM4IAN8p2ogASADp2otAAA6AAAgCSADQgGEIgUgACkDOHynaiABIAWnai0AADoAACAJIANCAoQiBSAAKQM4fKdqIAEgBadqLQAAOgAAIAkgA0IDhCIFIAApAzh8p2ogASAFp2otAAA6AAAgA0IEfCEDIAZCBHwiBiAEUg0ACwsgAkIDgyIEQgBSBEADQCAJIAApAzggA3ynaiABIAOnai0AADoAACADQgF8IQMgB0IBfCIHIARSDQALCyAAIAApAzggAnw3AzgLC5cFAQV/AkAgAigCECIDBH8gAwUgAhAN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DXMiDyAFakESdyACcyECIBMgDSATakENdyAMcyIMakESdyADcyIDIAlqQQd3IAdzIgcgA2pBCXcgBnMiBiAHakENdyAJcyIJIAZqQRJ3IANzIQMgFCAVakESdyAEcyIEIApqQQd3IAxzIgwgBGpBCXcgC3MiCyAMakENdyAKcyIKIAtqQRJ3IARzIQQgEUECSyARQQJrIRENAAsgACAENgAAIAAgDzYAHCAAIAU2ABggACAGNgAUIAAgBzYAECAAIAE2AAwgACACNgAIIAAgAzYABAsKACAAIAEQCUEACwwAIAAgASACEApBAAu0AQEBfyAAIAEoAABB////H3E2AgAgACABKAADQQJ2QYP+/x9xNgIEIAAgASgABkEEdkH/gf8fcTYCCCAAIAEoAAlBBnZB///AH3E2AgwgASgADCECIABCADcCFCAAQgA3AhwgAEEANgIkIAAgAkEIdkH//z9xNgIQIAAgASgAEDYCKCAAIAEoABQ2AiwgACABKAAYNgIwIAEoABwhASAAQQA6AFAgAEIANwM4IAAgATYCNEEAC+4FAQN/IwAiBUHAAWtBQHEiBCQAIAQgAygAAEH///8fcTYCQCAEIAMoAANBAnZBg/7/H3E2AkQgBCADKAAGQQR2Qf+B/x9xNgJIIAQgAygACUEGdkH//8AfcTYCTCADKAAMIQYgBEIANwJUIARCADcCXCAEQQA2AmQgBCAGQQh2Qf//P3E2AlAgBCADKAAQNgJoIAQgAygAFDYCbCAEIAMoABg2AnAgAygAHCEDIARBADoAkAEgBEIANwN4IAQgAzYCdCAEQUBrIgMgASACEAogAyAEQTBqIgMQCSMAQRBrIgEgADYCDCABIAM2AgggAUEAOwEGIAEgAS8BBiABKAIMLQAAIAEoAggtAABzcjsBBiABIAEvAQYgASgCDC0AASABKAIILQABc3I7AQYgASABLwEGIAEoAgwtAAIgASgCCC0AAnNyOwEGIAEgAS8BBiABKAIMLQADIAEoAggtAANzcjsBBiABIAEvAQYgASgCDC0ABCABKAIILQAEc3I7AQYgASABLwEGIAEoAgwtAAUgASgCCC0ABXNyOwEGIAEgAS8BBiABKAIMLQAGIAEoAggtAAZzcjsBBiABIAEvAQYgASgCDC0AByABKAIILQAHc3I7AQYgASABLwEGIAEoAgwt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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){return{a:wasmImports}}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["e"];updateMemoryViews();addOnInit(wasmExports["f"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);receiveInstantiationResult(result);return result}var ASM_CONSTS={2208:()=>Module.getRandomValue(),2244:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;crypto_=crypto_===undefined?crypto:crypto_;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead=NaN)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"]);var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={a:___assert_fail,d:__emscripten_memcpy_js,c:_emscripten_asm_const_int,b:_fd_write};var wasmExports;createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["f"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["g"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
