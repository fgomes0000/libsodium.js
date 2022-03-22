var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}var fs;var nodePath;var requireNodeFS;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}requireNodeFS=(()=>{if(!nodePath){fs=require("fs");nodePath=require("path")}});read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}requireNodeFS();filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=(filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret});readAsync=((filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}requireNodeFS();filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})});if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=((status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)});Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}});if(ENVIRONMENT_IS_WORKER){readBinary=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}})}readAsync=((url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=(()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()});xhr.onerror=onerror;xhr.send(null)})}setWindowTitle=(title=>document.title=title)}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={3456:function(){return Module.getRandomValue()},3492:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func=="number"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function getWasmTableEntry(funcPtr){return wasmTable.get(funcPtr)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var readAsmConstArgsDouble=ch<105;if(readAsmConstArgsDouble&&buf&1)buf++;readAsmConstArgsArray.push(readAsmConstArgsDouble?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov>>2];var len=HEAP32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"d":___assert_fail,"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true);return ret}catch(e){return handleException(e)}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;if(keepRuntimeAlive()){}else{exitRuntime()}procExit(status)}function procExit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
