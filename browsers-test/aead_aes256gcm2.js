var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];if(typeof WebAssembly!="object"){abort("no native wasm support detected")}function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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Rw0ACyABQRBqJABBsMEAQQE2AgBBAAsEf0HjAAUjAEEwayIAJABB2hAQBCAAQTBqJABBmBoQBEEACwsLvzETAEGACAuBFC0rICAgMFgweAB0dgBfdW5wcm90ZWN0ZWRfcHRyX2Zyb21fdXNlcl9wdHIodXNlcl9wdHIpID09IHVucHJvdGVjdGVkX3B0cgBzdHJsZW4odGVzdHNbaV0uZGV0YWNoZWRfY2lwaGVydGV4dF9oZXgpID09IDIgKiBtZXNzYWdlX2xlbgAwMDAwMDAwMGZmZmZmZmZmAGFhYmJjY2RkZWVmZgA5NzJhYjRlMDYzOTBjYWFlOGY5OWRkNmUyMTg3YmU2YzdmZjJjMDhhMjRiZTE2ZWYANTYxMDA4ZmEwN2E2OGY1YzYxMjg1Y2QwMTM0NjRlYWYAMjAyMTIyMjMyNDI1MjYyNzI4MjkyYTJiMmMyZDJlMmYAM2ZmMTUxNGIxYzUwMzkxNTkxOGYwYzBjMzEwOTRhNmUxZgAwMDAxMDIwMzA0MDUwNjA3MDgwOTBhMGIwYzBkMGUwZjEwMTExMjEzMTQxNTE2MTcxODE5MWExYjFjMWQxZTFmADAwMTEyMjMzNDQ1NTY2Nzc4ODk5YWFiYmNjZGRlZWZmMTAyMTMyNDM1NDY1NzY4Nzk4YTliYWNiZGNlZGZlMGYAMDg0M2ZmZjUyZDkzNGZjN2EwNzFlYTYyYzBiZDM1MWNlODU2NzhjZGUzZWEyYzllADQzODkxYmNjYjUyMmIxZTcyYTZiNTNjZjMxYzA3NGU5ZDZjMmRmOGUANDNmYzEwMWJmZjRiMzJiZmFkZDNkYWY1N2E1OTBlAGludmFsaWQAYmUzMzA4ZjcyYTJjNmFlZAA5NTY4NDZhMjA5ZTA4N2VkAF9zb2RpdW1fbWFsbG9jAHNvZGl1bS91dGlscy5jAGFlYWRfYWVzMjU2Z2NtMi5jADY3MTE5NjI3YmQ5ODhlZGE5MDYyMTllMDhjMGQwZDc3OWEwN2QyMDhjZThhNGZlMDcwOWFmNzU1ZWVlYzZkY2IAZTI3YWJkZDJkMmE1M2QyZjEzNmIAYzYxNTIyNDRjZWExOTc4ZDNlMGJjMjc0Y2Y4YzBiM2IAY2YzMzJhMTJmZGVlODAwYgBiMjA2MTQ1N2MwNzU5ZmMxNzQ5ZjE3NGVlMWNjYWRmYQBmNThjMTY2OTAxMjJkNzUzNTY5MDdmZDk2YjU3MGZjYQA1OWQ0ZWFmYjRkZTBjZmM3ZDNkYjk5YThmNTRiMTVkN2IzOWYwYWNjOGRhNjk3NjNiMDE5YzE2OTlmODc2NzRhADJhAHN0cmxlbih0ZXN0c1tpXS5rZXlfaGV4KSA9PSAyICogY3J5cHRvX2FlYWRfYWVzMjU2Z2NtX0tFWUJZVEVTAHN0cmxlbih0ZXN0c1tpXS5ub25jZV9oZXgpID09IDIgKiBjcnlwdG9fYWVhZF9hZXMyNTZnY21fTlBVQkJZVEVTAHN0cmxlbih0ZXN0c1tpXS5tYWNfaGV4KSA9PSAyICogY3J5cHRvX2FlYWRfYWVzMjU2Z2NtX0FCWVRFUwBPSwAwMDAxMDIwMzA0MDUwNjA3MDgwOQA1NDliMzY1YWY5MTNmM2IwODExMzFjY2I2YjgyNTU4OAA0M2RkYTgzMmU5NDJlMjg2ZGEzMTRkYWE5OWJlZjUwNzFkOWQyYzc4ADAyMTJhOGRlNTAwN2VkODdiMzNmMWE3MDkwYjYxMTRmOWUwOGNlZmQ5NjA3ZjJjMjc2YmRjZmRiYzVjZTljZDcAY2RjY2ZlM2Y0NmQ3ODJlZjQ3ZGY0ZTcyZjBjMDJkOWM3Zjc3NGRlZjk3MGQyMzQ4NmYxMWE1N2Y1NDI0N2YxNwA1MWY4YzFmNzMxZWExNGFjZGIyMTBhNmQ5NzNlMDcANzNhNmI2ZjQ1ZjZjY2M1MTMxZTA3ZjJjYWExZjJlMmY1NgAwNgBlMjhlMGU5ZjlkMjI0NjNhYzBlNDI2MzliNTMwZjQyMTAyZmRlZDc1AGE5MjllZTdlNjdjN2EyZjkxYmJjZWM2Mzg5YTNjYWY0M2FiNDkzMDUAYjI3OWY1N2UxOWM4ZjUzZjJmOTYzZjVmMjUxOWZkYjdjMTc3OWJlMmNhMmIzYWU4ZTExMjhiN2Q2YzYyN2ZjNABmMzIzNjRiMWQzMzlkODJlNGYxMzJkOGY0YTBlYzFmZjdlNzQ2NTE3ZmEwN2VmMWE3ZjQyMmY0ZTI1YTQ4MTk0AGFiMmFjN2M0NGM2MGJkZjgyMjhjNzg4NGFkYjIwMTg0ADc0OGIyODAzMTYyMWQ5NWVlNjE4MTJiNGI0ZjQ3ZDA0YzZmYzJmZjMAMjMyOTNlOWIwN2NhN2QxYjBjYWU3Y2M0ODlhOTczYjMAY2M1NmI2ODA1NTJlYjc1MDA4ZjU0ODRiNGNiODAzZmE1MDYzZWJkNmVhYjkxZjZhYjZhZWY0OTE2YTc2NjI3MwAyOWQzYTQ0Zjg3MjNkYzY0MDIzOTEwMGMzNjU0MjNhMzEyOTM0YWM4MDIzOTIxMmFjM2RmMzQyMWEyMDk4MTIzAGZlY2E0NDk1MjQ0NzAxNWI1ZGYxZjQ1NmRmOGNhNGJiNGVlZTJjZTIANTFlNGJmMmJhZDkyYjdhZmYxYTRiYzA1NTUwYmE4MWRmNGI5NmZhYmY0MWMxMmM3YjAwZTYwZTQ4ZGI3ZTE1MgBmZjAwODllZTg3MGE0YTM5ZjY0NWIwYTVkYTc3NGY3YTU5MTFlOTY5NmZjOWNhZDY0NjQ1MmMyYWE4NTk1YTEyAGZjYzUxNWIyOTQ0MDhjODY0NWM5MTgzZTNmNGVjZWU1MTI3ODQ2ZDEAZWI1NTAwZTM4MjU5NTI4NjZkOTExMjUzZjhkZTg2MGMwMDgzMWM4MQA3Y2I2ZmM3YzZhYmMwMDllZmU5NTUxYTk5ZjM2YTQyMQAxMGYxZWNmOWM2MDU4NDY2NWQ5YWU1ZWZlMjc5ZTdmNzM3N2VlYTY5MTZkMmIxMTEAM2IyNDU4ZDgxNzZlMTYyMWMwY2MyNGMwYzBlMjRjMWU4MGQ3MmY3ZWU5MTQ5YTRiMTY2MTc2NjI5NjE2ZDAxMQBjMAA5MmFjZTNlMzQ4Y2Q4MjEwOTJjZDkyMWFhMzU0NjM3NDI5OWFiNDYyMDk2OTFiYzI4Yjg3NTJkMTdmMTIzYzIwAC0tLSBTVUNDRVNTIC0tLQAobnVsbCkASW5jb3JyZWN0IGRlY3J5cHRpb24gb2YgdGVzdCB2ZWN0b3IgIyV1CgAqKiogdGVzdCBjYXNlICV1IGZhaWxlZCwgd2FzIHN1cHBvc2VkIHRvIGJlICVzCgAqKiogdGVzdCBjYXNlICV1IHN1Y2NlZWRlZCwgd2FzIHN1cHBvc2VkIHRvIGJlICVzCgAAAAAAABkACgAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQARChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZAEGRHAshDgAAAAAAAAAAGQAKDRkZGQANAAACAAkOAAAACQAOAAAOAEHLHAsBDABB1xwLFRMAAAAAEwAAAAAJDAAAAAAA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NTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDlhYjFiZjFiZjg4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZGFhYjFiZjFiZjg4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiNzFiZjg4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZTg4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjEzZjg4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZmE4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzMzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzIzMmViYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzIzMmU4YjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzIzMjZhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzIzMmVhYjU5MGRjAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzIzMmVhYjU5MGRmAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzIzMmVhYjU5MDlkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiZjFiZjg4NzIzMmVhYjU5MDVkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADlkZThmZWY2ZDhhYjFiZjFiZTg4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZTc2ZDhhYjFiNzFiZjg4NzIzMmVhYjU5MGRkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADljZThmZWY2ZDhhYjFiNzFiZjg4NzIzMmVhYjU5MDVkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADYzMTcwMTA5Mjc1NGU0MGU0MDc3OGRjZDE1NGE2ZjIyAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAAGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADFjNjg3ZTc2NTgyYjliNzEzZjA4ZjJiMjZhMzUxMDVkAAAAADQGAAA5BQAANTA1MTUyNTM1NDU1NTY1NzU4NTk1YTViAAAAALoNAAD1BAAAFgcAADlkZTlmZmY3ZDlhYTFhZjBiZTg5NzMzM2ViYjQ5MWRjAAAAADQGAAAAAAAABQBBpDoLAQEAQbw6Cw4CAAAAAwAAAOggAAAABABB1DoLAQEAQeQ6CwX/////CgBBqDsLA6AnAQ==";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["d"];updateMemoryViews();addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={7596:()=>Module.getRandomValue(),7632:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var SYSCALLS={varargs:undefined,get(){var ret=HEAP32[+SYSCALLS.varargs>>2];SYSCALLS.varargs+=4;return ret},getp(){return SYSCALLS.get()},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={b:_emscripten_asm_const_int,c:_emscripten_memcpy_js,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
