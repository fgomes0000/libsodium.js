var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}var fs;var nodePath;var requireNodeFS;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}requireNodeFS=(()=>{if(!nodePath){fs=require("fs");nodePath=require("path")}});read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}requireNodeFS();filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=(filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret});readAsync=((filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}requireNodeFS();filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})});if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=((status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)});Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}});if(ENVIRONMENT_IS_WORKER){readBinary=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}})}readAsync=((url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=(()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()});xhr.onerror=onerror;xhr.send(null)})}setWindowTitle=(title=>document.title=title)}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={2240:function(){return Module.getRandomValue()},2276:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func=="number"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function getWasmTableEntry(funcPtr){return wasmTable.get(funcPtr)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var readAsmConstArgsDouble=ch<105;if(readAsmConstArgsDouble&&buf&1)buf++;readAsmConstArgsArray.push(readAsmConstArgsDouble?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov>>2];var len=HEAP32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"d":___assert_fail,"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true);return ret}catch(e){return handleException(e)}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;if(keepRuntimeAlive()){}else{exitRuntime()}procExit(status)}function procExit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
