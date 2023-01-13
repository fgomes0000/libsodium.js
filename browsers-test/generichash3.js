var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABXg5gA39/fwF/YAN/f38AYAAAYAF/AX9gBH9/f38Bf2AGf39/f39/AX9gA39/fgBgAn9/AGACf38Bf2AEf39/fwBgAX8AYAd/f39/f39/AX9gBX9/f39/AGADf35/AX4CHwUBYQFhAAkBYQFiAAQBYQFjAAABYQFkAAEBYQFlAAIDIB8BBQIKAAsGDAEBAwIGAAcCAwcCAQUIAwQBAwQNAwAIBAQBcAAEBQcBAYACgIACBggBfwFB8KcECwcRBAFmAgABZwAXAWgAIwFpAQAJCQEAQQELAyEiIArxfB/wAgICfwF+AkAgAkUNACAAIAE6AAAgACACaiIDQQFrIAE6AAAgAkEDSQ0AIAAgAToAAiAAIAE6AAEgA0EDayABOgAAIANBAmsgAToAACACQQdJDQAgACABOgADIANBBGsgAToAACACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiADYCACADIAIgBGtBfHEiAmoiAUEEayAANgIAIAJBCUkNACADIAA2AgggAyAANgIEIAFBCGsgADYCACABQQxrIAA2AgAgAkEZSQ0AIAMgADYCGCADIAA2AhQgAyAANgIQIAMgADYCDCABQRBrIAA2AgAgAUEUayAANgIAIAFBGGsgADYCACABQRxrIAA2AgAgAiADQQRxQRhyIgFrIgJBIEkNACAArUKBgICAEH4hBSABIANqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBIGsiAkEfSw0ACwsLXAEBf0F/IQYCQCADQcEAa0FASSACQcAAS3INAAJAIAFBACACG0UEQCAAIANB/wFxIAQgBRAcRQ0BDAILIAAgA0H/AXEgASACQf8BcSAEIAUQGQ0BC0EAIQYLIAYLxAEBAX8CQAJAQbwXKAIAIgBBAE4EQCAARQ0BQfQeKAIAIABB/////3txRw0BCwJAQcAXKAIAQQpGDQBBhBcoAgAiAEGAFygCAEYNAEGEFyAAQQFqNgIAIABBCjoAAAwCCxAUDAELQbwXQbwXKAIAIgBB/////wMgABs2AgACQAJAQcAXKAIAQQpGDQBBhBcoAgAiAEGAFygCAEYNAEGEFyAAQQFqNgIAIABBCjoAAAwBCxAUC0G8FygCABpBvBdBADYCAAsL1gIBBX8jAEEQayIDJAAgAyAANgIMIwBB0AFrIgEkACABIAA2AswBIAFBoAFqIgBBAEEoEAUgASABKALMATYCyAECQEEAIAFByAFqIAFB0ABqIAAQH0EASA0AQbwXKAIAQQBOIQRB8BYoAgAhAEG4FygCAEEATARAQfAWIABBX3E2AgALAn8CQAJAQaAXKAIARQRAQaAXQdAANgIAQYwXQQA2AgBBgBdCADcDAEGcFygCACECQZwXIAE2AgAMAQtBgBcoAgANAQtBf0HwFhAVDQEaC0HwFiABQcgBaiABQdAAaiABQaABahAfCyEFIAIEf0HwFkEAQQBBlBcoAgARAAAaQaAXQQA2AgBBnBcgAjYCAEGMF0EANgIAQYQXKAIAGkGAF0IANwMAQQAFIAULGkHwFkHwFigCACAAQSBxcjYCACAERQ0ACyABQdABaiQAIANBEGokAAuABAEDfyACQYAETwRAIAAgASACEAMgAA8LIAAgAmohAwJAIAAgAXNBA3FFBEACQCAAQQNxRQRAIAAhAgwBCyACRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAkEDcUUNASACIANJDQALCwJAIANBfHEiBEHAAEkNACACIARBQGoiBUsNAANAIAIgASgCADYCACACIAEoAgQ2AgQgAiABKAIINgIIIAIgASgCDDYCDCACIAEoAhA2AhAgAiABKAIUNgIUIAIgASgCGDYCGCACIAEoAhw2AhwgAiABKAIgNgIgIAIgASgCJDYCJCACIAEoAig2AiggAiABKAIsNgIsIAIgASgCMDYCMCACIAEoAjQ2AjQgAiABKAI4NgI4IAIgASgCPDYCPCABQUBrIQEgAkFAayICIAVNDQALCyACIARPDQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiAESQ0ACwwBCyADQQRJBEAgACECDAELIAAgA0EEayIESwRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAiABLQABOgABIAIgAS0AAjoAAiACIAEtAAM6AAMgAUEEaiEBIAJBBGoiAiAETQ0ACwsgAiADSQRAA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA0cNAAsLIAALpgEBAn8gAUHBAGtBQEkgBEHAAEtyBH9BfwUCfyMAIgchCCAHQYADa0FAcSIHJAAgAkUgAEUgAUH/AXEiAUHBAGtB/wFxQb8BTXJyIANBASAEQf8BcSIEG0UgBEHBAE9yckUEQAJAIAQEQCAHIAEgAyAEIAUgBhAZGgwBCyAHIAEgBSAGEBwaCyAHIAJCwAAQESAHIAAgARAYIAgkAEEADAELEBAACwsLCgAgACABIAIQEQtsAQF/IwBBgAJrIgUkACAEQYDABHEgAiADTHJFBEAgBSABQf8BcSACIANrIgNBgAIgA0GAAkkiARsQBSABRQRAA0AgACAFQYACEA4gA0GAAmsiA0H/AUsNAAsLIAAgBSADEA4LIAVBgAJqJAALJgAgAkGAAk8EQEH8CUG4CUHrAEHqCBAAAAsgACABIAJB/wFxEBgLFwAgAC0AAEEgcUUEQCABIAIgABASGgsLCgAgAEEwa0EKSQsXAQF/QYQeKAIAIgAEQCAAEQIACxAEAAvNAQIFfwJ+AkAgAlANACAAQeABaiEHIABB4ABqIQMgACgA4AIhBANAIAMgBGohBkGAAiAEayIFrSIIIAJaBEAgBiABIAKnIgEQCRogACAAKADgAiABajYA4AIMAgsgBiABIAUQCRogACAAKADgAiAFajYA4AIgACAAKQBAIglCgAF8NwBAIAAgACkASCAJQv9+Vq18NwBIIAAgAxATIAMgB0GAARAJGiAAIAAoAOACQYABayIENgDgAiABIAVqIQEgAiAIfSICQgBSDQALCwvAAQEDfwJAIAEgAigCECIDBH8gAwUgAhAVDQEgAigCEAsgAigCFCIFa0sEQCACIAAgASACKAIkEQAADwsCQCACKAJQQQBIBEBBACEDDAELIAEhBANAIAQiA0UEQEEAIQMMAgsgACADQQFrIgRqLQAAQQpHDQALIAIgACADIAIoAiQRAAAiBCADSQ0BIAAgA2ohACABIANrIQEgAigCFCEFCyAFIAAgARAJGiACIAIoAhQgAWo2AhQgASADaiEECyAEC/oyAid+A38jAEGAAWsiKSQAIAEpAGghFyABKQBgIREgASkASCEYIAEpAEAhGiABKQB4IRkgASkAcCEbIAEpAFghHyABKQA4ISAgASkAMCEcIAEpAFAhFSABKQAYISEgASkAECEiIAEpACghIyABKQAgIR0gASkACCEeIAEpAAAhJCApIABBwAAQCSIBICMgICAfIBcgISAZIBUgGiAZIBsgHyAd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oAJqIABqLQAANgLQASABQdABahAIIABBAWoiACADRw0ACxAHIANBAWohAyACQQFqIQIgCCIHQsAAUg0AC0EAIQAgAUGgAmoiA0EAQcAAEAUgAUHAA2oiAiABQeABakEAQcAAIAFBsANqIAFBoANqEAYaIAIgAUHgAmpCwAAQCyACIANBwAAQDQNAIAEgAUGgAmogAGotAAA2AsABIAFBwAFqEAggAEEBaiIAQcAARw0ACxAHQQAhACABQaACaiIDQQBBwAAQBSABQcADaiICQQBBAUHAACABQbADaiABQaADahAGGiACIAFB4AJqQsAAEAsgAiADQcAAEA0DQCABIAFBoAJqIABqLQAANgKwASABQbABahAIIABBAWoiAEHAAEcNAAsQB0EAIQAgAUGgAmoiA0EAQcAAEAUgAUHAA2oiAiABQeABakHAAEHAAEEAIAFBoANqEAYaIAIgAUHgAmpCwAAQCyACIANBwAAQDQNAIAEgAUGgAmogAGotAAA2AqABIAFBoAFqEAggAEEBaiIAQcAARw0ACxAHQQAhACABQaACaiIDQQBBwAAQBSABQcADaiICIAFB4AFqQcAAQcAAIAFBsANqQQAQBhogAiABQeACakLAABALIAIgA0HAABANA0AgASABQaACaiAAai0AADYCkAEgAUGQAWoQCCAAQQFqIgBBwABHDQALEAdBACEAIAFBoAJqIgJBAEHAABAFIAJBwAAgAUHgAmogAUHgAWpBACABQbADaiABQaADahAKGgNAIAEgAUGgAmogAGotAAA2AoABIAFBgAFqEAggAEEBaiIAQcAARw0ACxAHQQAhACABQaACaiICQQBBwAAQBSACQcAAIAFB4AJqQQBBACABQbADaiABQaADahAKGgNAIAEgAUGgAmogAGotAAA2AnAgAUHwAGoQCCAAQQFqIgBBwABHDQALEAdBACEAIAFBoAJqIgJBAEHAABAFIAJBwAAgAUHgAmogAUHgAWpBwAAgAUGwA2ogAUGgA2oQChoDQCABIAFBoAJqIABqLQAANgJgIAFB4ABqEAggAEEBaiIAQcAARw0ACxAHQQAhACABQaACaiICQQBBwAAQBSACQcAAIAFB4AJqIAFB4AFqQcAAQQAgAUGgA2oQChoDQCABIAFBoAJqIABqLQAANgJQIAFB0ABqEAggAEEBaiIAQcAARw0ACxAHQQAhACABQaACaiICQQBBwAAQBSACQcAAIAFB4AJqIAFB4AFqQcAAIAFBsANqQQAQChoDQCABIAFBoAJqIABqLQAANgJAIAFBQGsQCCAAQQFqIgBBwABHDQALEAcCQAJAAkACQAJAAkACQAJAQQBBACABQeACaiABQeABakHAAEEAQQAQCkF/RgRAQQBBwQAgAUHgAmogAUHgAWpBwABBAEEAEApBf0cNAUEAIQBBAEHAACABQeACaiABQeABakHBAEEAQQAQCkF/Rw0CIAFBwANqIgJBAEEAQSBBACABQaADahAGGiACIAFB4AJqQsAAEAsgAiABQaACakHAABANA0AgASABQaACaiAAai0AADYCMCABQTBqEAggAEEBaiIAQcAARw0ACxAHQQAhACABQcADaiICQQBBAEEgIAFBsANqQQAQBhogAiABQeACakLAABALIAIgAUGgAmpBwAAQDQNAIAEgAUGgAmogAGotAAA2AiAgAUEgahAIIABBAWoiAEHAAEcNAAsQByABQcADaiABQeABakHAAEEAQQBBABAGQX9HDQMgAUHAA2ogAUHgAWpBwABBwQBBAEEAEAZBf0cNBCABQcADaiABQeABakHBAEHAAEEAQQAQBkF/Rw0FIAFBwANqIAFB4AFqQcAAQSBBACABQaADahAGDQYgAUHAA2ogAUHgAWpBwABBICABQbADakEAEAYNByAFJAAMCAtBzQxB7QlBiAFB5AgQAAALQbILQe0JQYwBQeQIEAAAC0HGDkHtCUGQAUHkCBAAAAtB+g9B7QlBpQFB5AgQAAALQckNQe0JQacBQeQIEAAAC0GwCkHtCUGpAUHkCBAAAAtB0BBB7QlBrAFB5AgQAAALQb8RQe0JQa4BQeQIEAAAC0G8FygCABoCQEGqEiIBQQNxBEADQCABLQAARQ0CIAFBAWoiAUEDcQ0ACwsDQCABIgBBBGohASAAKAIAIgJBf3MgAkGBgoQIa3FBgIGChHhxRQ0ACwNAIAAiAUEBaiEAIAEtAAANAAsLAkBBf0EAAn8gAUGqEmsiAAJ/QbwXKAIAQQBIBEBBqhIgAEHwFhASDAELQaoSIABB8BYQEgsiASAARg0AGiABCyAARxtBAEgNAAJAQcAXKAIAQQpGDQBBhBcoAgAiAEGAFygCAEYNAEGEFyAAQQFqNgIAIABBCjoAAAwBCxAUC0EACwsLhA4TAEGACAvACjViNmI0MWVkOWIzNDNmZTA1MTI2ZmIyYTM3NDAwZDJhJTAyeAAtKyAgIDBYMHgAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfc3RhdGVieXRlcygpID49IHNpemVvZiBzdAB4bWFpbgBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9maW5hbABjcnlwdG9fZ2VuZXJpY2hhc2gvYmxha2UyYi9yZWYvYmxha2UyYi1yZWYuYwBjcnlwdG9fZ2VuZXJpY2hhc2gvYmxha2UyYi9yZWYvZ2VuZXJpY2hhc2hfYmxha2UyYi5jAGdlbmVyaWNoYXNoMy5jAG91dGxlbiA8PSBVSU5UOF9NQVgAUy0+YnVmbGVuIDw9IEJMQUtFMkJfQkxPQ0tCWVRFUwBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9pbml0X3NhbHRfcGVyc29uYWwgKCZzdCwgaywgY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfS0VZQllURVNfTUFYICsgMSwgc2l6ZW9mIG91dCwgTlVMTCwgTlVMTCkgPT0gLTEAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfc2FsdF9wZXJzb25hbCAoZ3VhcmRfcGFnZSwgY3J5cHRvX2dlbmVyaWNoYXNoX0JZVEVTX01BWCArIDEsIGluLCAodW5zaWduZWQgbG9uZyBsb25nKSBzaXplb2YgaW4sIGssIHNpemVvZiBrLCBOVUxMLCBOVUxMKSA9PSAtMQBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9zYWx0X3BlcnNvbmFsIChndWFyZF9wYWdlLCAwLCBpbiwgKHVuc2lnbmVkIGxvbmcgbG9uZykgc2l6ZW9mIGluLCBrLCBzaXplb2YgaywgTlVMTCwgTlVMTCkgPT0gLTEAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfaW5pdF9zYWx0X3BlcnNvbmFsICgmc3QsIGssIHNpemVvZiBrLCBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9CWVRFU19NQVggKyAxLCBOVUxMLCBOVUxMKSA9PSAtMQBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9zYWx0X3BlcnNvbmFsIChndWFyZF9wYWdlLCAodW5zaWduZWQgbG9uZyBsb25nKSBzaXplb2YgaW4sIGluLCAodW5zaWduZWQgbG9uZyBsb25nKSBzaXplb2YgaW4sIGssIGNyeXB0b19nZW5lcmljaGFzaF9LRVlCWVRFU19NQVggKyAxLCBOVUxMLCBOVUxMKSA9PSAtMQBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9pbml0X3NhbHRfcGVyc29uYWwgKCZzdCwgaywgc2l6ZW9mIGssIDAsIE5VTEwsIE5VTEwpID09IC0xAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX2luaXRfc2FsdF9wZXJzb25hbCgmc3QsIGssIHNpemVvZiBrLCBjcnlwdG9fZ2VuZXJpY2hhc2hfQllURVMsIE5VTEwsIHBlcnNvbmFsKSA9PSAwAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX2luaXRfc2FsdF9wZXJzb25hbCgmc3QsIGssIHNpemVvZiBrLCBjcnlwdG9fZ2VuZXJpY2hhc2hfQllURVMsIHNhbHQsIE5VTEwpID09IDAALS0tIFNVQ0NFU1MgLS0tAChudWxsKQBB0BILgQEIybzzZ+YJajunyoSFrme7K/iU/nLzbjzxNh1fOvVPpdGC5q1/Ug5RH2w+K4xoBZtrvUH7q9mDH3khfhMZzeBbGQAKABkZGQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAAZABEKGRkZAwoHAAEACQsYAAAJBgsAAAsABhkAAAAZGRkAQeETCyEOAAAAAAAAAAAZAAoNGRkZAA0AAAIACQ4AAAAJAA4AAA4AQZsUCwEMAEGnFAsVEwAAAAATAAAAAAkMAAAAAAAMAAAMAEHVFAsBEABB4RQLFQ8AAAAEDwAAAAAJEAAAAAAAEAAAEABBjxULARIAQZsVCx4RAAAAABEAAAAACRIAAAAAABIAABIAABoAAAAaGhoAQdIVCw4aAAAAGhoaAAAAAAAACQBBgxYLARQAQY8WCxUXAAAAABcAAAAACRQAAAAAABQAABQAQb0WCwEWAEHJFgsnFQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGAEHwFgsBBQBB/BYLAQEAQZQXCw4CAAAAAwAAAOgPAAAABABBrBcLAQEAQbwXCwX/////Cg==";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["f"];updateMemoryViews();wasmTable=Module["asm"]["i"];addOnInit(Module["asm"]["g"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={3072:()=>{return Module.getRandomValue()},3108:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}function _abort(){abort("")}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var ASSERTIONS=false;var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"a":___assert_fail,"e":_abort,"c":_emscripten_asm_const_int,"d":_emscripten_memcpy_big,"b":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["g"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["h"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
