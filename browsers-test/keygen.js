var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}var fs;var nodePath;var requireNodeFS;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}requireNodeFS=(()=>{if(!nodePath){fs=require("fs");nodePath=require("path")}});read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}requireNodeFS();filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=(filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret});readAsync=((filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}requireNodeFS();filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})});if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=((status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)});Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}});if(ENVIRONMENT_IS_WORKER){readBinary=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}})}readAsync=((url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=(()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()});xhr.onerror=onerror;xhr.send(null)})}setWindowTitle=(title=>document.title=title)}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["g"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["j"];addOnInit(Module["asm"]["h"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={2012:function(){return Module.getRandomValue()},2048:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func=="number"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function getWasmTableEntry(funcPtr){return wasmTable.get(funcPtr)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}function _abort(){abort("")}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var readAsmConstArgsDouble=ch<105;if(readAsmConstArgsDouble&&buf&1)buf++;readAsmConstArgsArray.push(readAsmConstArgsDouble?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function _emscripten_get_heap_max(){return 2147483648}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=_emscripten_get_heap_max();if(requestedSize>maxHeapSize){return false}let alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov>>2];var len=HEAP32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"f":___assert_fail,"b":_abort,"c":_emscripten_asm_const_int,"e":_emscripten_memcpy_big,"d":_emscripten_resize_heap,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["h"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["i"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true);return ret}catch(e){return handleException(e)}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;if(keepRuntimeAlive()){}else{exitRuntime()}procExit(status)}function procExit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
