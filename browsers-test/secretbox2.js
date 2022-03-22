var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}var fs;var nodePath;var requireNodeFS;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}requireNodeFS=(()=>{if(!nodePath){fs=require("fs");nodePath=require("path")}});read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}requireNodeFS();filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=(filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret});readAsync=((filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}requireNodeFS();filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})});if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=((status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)});Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}});if(ENVIRONMENT_IS_WORKER){readBinary=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}})}readAsync=((url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=(()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()});xhr.onerror=onerror;xhr.send(null)})}setWindowTitle=(title=>document.title=title)}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={2208:function(){return Module.getRandomValue()},2244:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func=="number"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function getWasmTableEntry(funcPtr){return wasmTable.get(funcPtr)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var readAsmConstArgsDouble=ch<105;if(readAsmConstArgsDouble&&buf&1)buf++;readAsmConstArgsArray.push(readAsmConstArgsDouble?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov>>2];var len=HEAP32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"a":___assert_fail,"c":_emscripten_asm_const_int,"d":_emscripten_memcpy_big,"b":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true);return ret}catch(e){return handleException(e)}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;if(keepRuntimeAlive()){}else{exitRuntime()}procExit(status)}function procExit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
