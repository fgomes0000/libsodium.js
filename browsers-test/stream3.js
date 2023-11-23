var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];if(typeof WebAssembly!="object"){abort("no native wasm support detected")}function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABSgtgA39/fwF/YAN/f38AYAF/AX9gBH9/f38Bf2AAAGACf38Bf2AEf35/fwF/YAV/f39/fwBgAn9/AGAGf39+f35/AX9gA39+fwF+AhMDAWEBYQADAWEBYgAAAWEBYwABAxQTBwEIAQQCAQAEBQECAwkGCgIABQQEAXAABgUHAQGAAoCAAgYIAX8BQfCdBAsHEQQBZAIAAWUACwFmABUBZwEACQsBAEEBCwUREBMUEgrgQxNuAQF/IwBBgAJrIgUkAAJAIAIgA0wNACAEQYDABHENACAFIAFB/wFxIAIgA2siA0GAAiADQYACSSIBGxAJIAFFBEADQCAAIAVBgAIQBCADQYACayIDQf8BSw0ACwsgACAFIAMQBAsgBUGAAmokAAsXACAALQAAQSBxRQRAIAEgAiAAEAoaCwsKACAAQQAgARAJC7cFASB/IAIoABQiFSELIAIoABgiFiEPIAIoABwiFyEQQfTKgdkGIQQgAigAECIYIQNBstqIywchDCABKAAMIhkhESABKAAIIhohCiABKAAEIhshBiABKAAAIhwhAUHuyIGZAyENIAIoAAwiHSEHIAIoAAgiHiEIIAIoAAQiHyEJIAIoAAAiICECQeXwwYsGIQUDQCACIA1qQQd3IBFzIg4gDWpBCXcgD3MiEyAFIAtqQQd3IAdzIgcgBWpBCXcgCnMiFCAHakENdyALcyIhIAggAyAEakEHd3MiCCAEakEJdyAGcyIGIAhqQQ13IANzIgogBmpBEncgBHMiBCABIAxqQQd3IBBzIgNqQQd3cyILIARqQQl3cyIPIAtqQQ13IANzIhAgD2pBEncgBHMhBCAKIAMgAyAMakEJdyAJcyIJakENdyABcyIiIAlqQRJ3IAxzIgEgDmpBB3dzIgMgAWpBCXcgFHMiCiADakENdyAOcyIRIApqQRJ3IAFzIQwgEyAOIBNqQQ13IAJzIg5qQRJ3IA1zIgIgB2pBB3cgInMiASACakEJdyAGcyIGIAFqQQ13IAdzIgcgBmpBEncgAnMhDSAUICFqQRJ3IAVzIgUgCGpBB3cgDnMiAiAFakEJdyAJcyIJIAJqQQ13IAhzIgggCWpBEncgBXMhBSASQQJqIhJBFEgNAAsgACAEQfTKgdkGajYAPCAAIBAgF2o2ADggACAPIBZqNgA0IAAgCyAVajYAMCAAIAMgGGo2ACwgACAMQbLaiMsHajYAKCAAIBEgGWo2ACQgACAKIBpqNgAgIAAgBiAbajYAHCAAIAEgHGo2ABggACANQe7IgZkDajYAFCAAIAcgHWo2ABAgACAIIB5qNgAMIAAgCSAfajYACCAAIAIgIGo2AAQgACAFQeXwwYsGajYAAAuEAQECfyMAQRBrIgAkACAAQQo6AA8CQAJAQegMKAIAIgEEfyABBUHYDBAIDQJB6AwoAgALQewMKAIAIgFGDQBBqA0oAgBBCkYNAEHsDCABQQFqNgIAIAFBCjoAAAwBC0HYDCAAQQ9qQQFB/AwoAgARAABBAUcNACAALQAPGgsgAEEQaiQAC1kBAX8gACAAKAJIIgFBAWsgAXI2AkggACgCACIBQQhxBEAgACABQSByNgIAQX8PCyAAQgA3AgQgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCEEEAC/ACAgJ/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBAWsgAToAACACQQNJDQAgACABOgACIAAgAToAASADQQNrIAE6AAAgA0ECayABOgAAIAJBB0kNACAAIAE6AAMgA0EEayABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIANgIAIAMgAiAEa0F8cSICaiIBQQRrIAA2AgAgAkEJSQ0AIAMgADYCCCADIAA2AgQgAUEIayAANgIAIAFBDGsgADYCACACQRlJDQAgAyAANgIYIAMgADYCFCADIAA2AhAgAyAANgIMIAFBEGsgADYCACABQRRrIAA2AgAgAUEYayAANgIAIAFBHGsgADYCACACIANBBHFBGHIiAWsiAkEgSQ0AIACtQoGAgIAQfiEFIAEgA2ohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkEgayICQR9LDQALCwuVBQEFfwJAIAEgAigCECIDBH8gAwUgAhAIDQEgAigCEAsgAigCFCIEa0sEQCACIAAgASACKAIkEQAADwsCQAJAIAIoAlBBAEgNACABRQ0AIAEhBQNAIAAgBWoiA0EBay0AAEEKRwRAIAVBAWsiBQ0BDAILCyACIAAgBSACKAIkEQAAIgQgBUkNAiABIAVrIQEgAigCFCEEDAELIAAhA0EAIQULIAQhAAJAIAFBgARPBEAgACADIAEQAgwBCyAAIAFqIQQCQCAAIANzQQNxRQRAAkAgAEEDcUUNACABRQ0AA0AgACADLQAAOgAAIANBAWohAyAAQQFqIgBBA3FFDQEgACAESQ0ACwsCQCAEQXxxIgZBwABJDQAgACAGQUBqIgdLDQADQCAAIAMoAgA2AgAgACADKAIENgIEIAAgAygCCDYCCCAAIAMoAgw2AgwgACADKAIQNgIQIAAgAygCFDYCFCAAIAMoAhg2AhggACADKAIcNgIcIAAgAygCIDYCICAAIAMoAiQ2AiQgACADKAIoNgIoIAAgAygCLDYCLCAAIAMoAjA2AjAgACADKAI0NgI0IAAgAygCODYCOCAAIAMoAjw2AjwgA0FAayEDIABBQGsiACAHTQ0ACwsgACAGTw0BA0AgACADKAIANgIAIANBBGohAyAAQQRqIgAgBkkNAAsMAQsgBEEESQ0AIAAgBEEEayIGSw0AA0AgACADLQAAOgAAIAAgAy0AAToAASAAIAMtAAI6AAIgACADLQADOgADIANBBGohAyAAQQRqIgAgBk0NAAsLIAAgBEkEQANAIAAgAy0AADoAACADQQFqIQMgAEEBaiIAIARHDQALCwsgAiACKAIUIAFqNgIUIAEgBWohBAsgBAsTAEG8FUHEFDYCAEH0FEEqNgIAC5cCACAARQRAQQAPCwJ/AkAgAAR/IAFB/wBNDQECQEG8FSgCACgCAEUEQCABQYB/cUGAvwNGDQMMAQsgAUH/D00EQCAAIAFBP3FBgAFyOgABIAAgAUEGdkHAAXI6AABBAgwECyABQYBAcUGAwANHIAFBgLADT3FFBEAgACABQT9xQYABcjoAAiAAIAFBDHZB4AFyOgAAIAAgAUEGdkE/cUGAAXI6AAFBAwwECyABQYCABGtB//8/TQRAIAAgAUE/cUGAAXI6AAMgACABQRJ2QfABcjoAACAAIAFBBnZBP3FBgAFyOgACIAAgAUEMdkE/cUGAAXI6AAFBBAwECwtBoBRBGTYCAEF/BUEBCwwBCyAAIAE6AABBAQsLtAIAAkACQAJAAkACQAJAAkACQAJAAkACQCABQQlrDhIACAkKCAkBAgMECgkKCggJBQYHCyACIAIoAgAiAUEEajYCACAAIAEoAgA2AgAPCyACIAIoAgAiAUEEajYCACAAIAEyAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEzAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEwAAA3AwAPCyACIAIoAgAiAUEEajYCACAAIAExAAA3AwAPCyACIAIoAgBBB2pBeHEiAUEIajYCACAAIAErAwA5AwAPCwALDwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMAC3IBA38gACgCACwAAEEwa0EKTwRAQQAPCwNAIAAoAgAhA0F/IQEgAkHMmbPmAE0EQEF/IAMsAABBMGsiASACQQpsIgJqIAEgAkH/////B3NKGyEBCyAAIANBAWo2AgAgASECIAMsAAFBMGtBCkkNAAsgAgu0FQIbfwJ+QYAIIQUjAEHQAGsiBiQAIAZBgAg2AkwgA0HAAWshFiACQYADayEXIAZBN2ohGCAGQThqIRICQAJAAkADQEEAIQQDQCAFIQsgBCARQf////8Hc0oNAiAEIBFqIRECQAJAAkAgBSIELQAAIgcEQANAAkACQCAHQf8BcSIFRQRAIAQhBQwBCyAFQSVHDQEgBCEHA0AgBy0AAUElRwRAIAchBQwCCyAEQQFqIQQgBy0AAiEaIAdBAmoiBSEHIBpBJUYNAAsLIAQgC2siBCARQf////8HcyIZSg0IIAAEQCAAIAsgBBAECyAEDQYgBiAFNgJMIAVBAWohBEF/IQ0CQCAFLAABQTBrIglBCk8NACAFLQACQSRHDQAgBUEDaiEEIAkhDUEBIRMLIAYgBDYCTEEAIQoCQCAELAAAIgdBIGsiBUEfSwRAIAQhCQwBCyAEIQlBASAFdCIFQYnRBHFFDQADQCAGIARBAWoiCTYCTCAFIApyIQogBCwAASIHQSBrIgVBIE8NASAJIQRBASAFdCIFQYnRBHENAAsLAkAgB0EqRgRAIAlBAWohBwJ/AkAgCSwAAUEwa0EKTw0AIAktAAJBJEcNACAHLAAAIQQgCUEDaiEHQQEhEwJ/IABFBEAgFiAEQQJ0akEKNgIAQQAMAQsgFyAEQQN0aigCAAsMAQsgEw0GIABFBEAgBiAHNgJMQQAhE0EAIQ4MAwsgASABKAIAIgRBBGo2AgBBACETIAQoAgALIQ4gBiAHNgJMIA5BAE4NAUEAIA5rIQ4gCkGAwAByIQoMAQsgBkHMAGoQDiIOQQBIDQkgBigCTCEHC0EAIQRBfyEIAn8gBy0AAEEuRwRAIAchBUEADAELIActAAFBKkYEQCAHQQJqIQUCQAJAIAcsAAJBMGtBCk8NACAHLQADQSRHDQAgBSwAACEFAn8gAEUEQCAWIAVBAnRqQQo2AgBBAAwBCyAXIAVBA3RqKAIACyEIIAdBBGohBQwBCyATDQYgAEUEQEEAIQgMAQsgASABKAIAIglBBGo2AgAgCSgCACEICyAGIAU2AkwgCEEATgwBCyAGIAdBAWo2AkwgBkHMAGoQDiEIIAYoAkwhBUEBCyEUA0AgBCEMQRwhDyAFIhAsAAAiBEH7AGtBRkkNCiAFQQFqIQUgBCAMQTpsai0A7wciBEEBa0EISQ0ACyAGIAU2AkwCQCAEQRtHBEAgBEUNCyANQQBOBEAgAEUEQCADIA1BAnRqIAQ2AgAMCwsgBiACIA1BA3RqKQMANwNADAILIABFDQcgBkFAayAEIAEQDQwBCyANQQBODQpBACEEIABFDQcLQX8hDyAALQAAQSBxDQogCkH//3txIgcgCiAKQYDAAHEbIQpBACENQYgIIRUgEiEJAkACQAJAAn8CQAJAAkACQAJ/AkACQAJAAkACQAJAAkAgECwAACIEQV9xIAQgBEEPcUEDRhsgBCAMGyIEQdgAaw4hBBQUFBQUFBQUDhQPBg4ODhQGFBQUFAIFAxQUCRQBFBQEAAsCQCAEQcEAaw4HDhQLFA4ODgALIARB0wBGDQkMEwsgBikDQCEfQYgIDAULQQAhBAJAAkACQAJAAkACQAJAIAxB/wFxDggAAQIDBBoFBhoLIAYoAkAgETYCAAwZCyAGKAJAIBE2AgAMGAsgBigCQCARrDcDAAwXCyAGKAJAIBE7AQAMFgsgBigCQCAROgAADBULIAYoAkAgETYCAAwUCyAGKAJAIBGsNwMADBMLQQggCCAIQQhNGyEIIApBCHIhCkH4ACEECyASIQUgBikDQCIfQgBSBEAgBEEgcSEHA0AgBUEBayIFIB+nQQ9xQYAMai0AACAHcjoAACAfQg9WIRsgH0IEiCEfIBsNAAsLIAUhCyAGKQNAUA0DIApBCHFFDQMgBEEEdkGICGohFUECIQ0MAwsgEiEEIAYpA0AiH0IAUgRAA0AgBEEBayIEIB+nQQdxQTByOgAAIB9CB1YhHCAfQgOIIR8gHA0ACwsgBCELIApBCHFFDQIgCCASIARrIgRBAWogBCAISBshCAwCCyAGKQNAIh9CAFMEQCAGQgAgH30iHzcDQEEBIQ1BiAgMAQsgCkGAEHEEQEEBIQ1BiQgMAQtBighBiAggCkEBcSINGwshFSASIQQCQCAfQoCAgIAQVARAIB8hIAwBCwNAIARBAWsiBCAfIB9CCoAiIEIKfn2nQTByOgAAIB9C/////58BViEdICAhHyAdDQALCyAgpyIFBEADQCAEQQFrIgQgBSAFQQpuIgtBCmxrQTByOgAAIAVBCUshHiALIQUgHg0ACwsgBCELCyAUIAhBAEhxDQ8gCkH//3txIAogFBshCgJAIAYpA0AiIEIAUg0AIAgNACASIQtBACEIDAwLIAggIFAgEiALa2oiBCAEIAhIGyEIDAsLAn9B/////wcgCCAIQf////8HTxsiCSIQQQBHIQoCQAJAAkAgBigCQCIEQaIIIAQbIgsiBSIMQQNxRQ0AIBBFDQADQCAMLQAARQ0CIBBBAWsiEEEARyEKIAxBAWoiDEEDcUUNASAQDQALCyAKRQ0BAkAgDC0AAEUNACAQQQRJDQADQCAMKAIAIgRBf3MgBEGBgoQIa3FBgIGChHhxDQIgDEEEaiEMIBBBBGsiEEEDSw0ACwsgEEUNAQsDQCAMIAwtAABFDQIaIAxBAWohDCAQQQFrIhANAAsLQQALIgQgBWsgCSAEGyIEIAtqIQkgCEEATgRAIAchCiAEIQgMCwsgByEKIAQhCCAJLQAADQ4MCgsgCARAIAYoAkAMAgtBACEEIABBICAOQQAgChADDAILIAZBADYCDCAGIAYpA0A+AgggBiAGQQhqIgQ2AkBBfyEIIAQLIQdBACEEAkADQCAHKAIAIgtFDQECQCAGQQRqIAsQDCIJQQBIIgsNACAJIAggBGtLDQAgB0EEaiEHIAQgCWoiBCAISQ0BDAILCyALDQ4LQT0hDyAEQQBIDQwgAEEgIA4gBCAKEAMgBEUEQEEAIQQMAQtBACEJIAYoAkAhBwNAIAcoAgAiC0UNASAGQQRqIgggCxAMIgsgCWoiCSAESw0BIAAgCCALEAQgB0EEaiEHIAQgCUsNAAsLIABBICAOIAQgCkGAwABzEAMgDiAEIAQgDkgbIQQMCAsgFCAIQQBIcQ0JQT0hDyAGKwNAGgALIAYgBikDQDwAN0EBIQggGCELIAchCgwECyAELQABIQcgBEEBaiEEDAALAAsgESEPIAANByATRQ0CQQEhBANAIAMgBEECdGooAgAiAARAIAIgBEEDdGogACABEA1BASEPIARBAWoiBEEKRw0BDAkLC0EBIQ8gBEEKTw0HA0AgAyAEQQJ0aigCAA0BIARBAWoiBEEKRw0ACwwHC0EcIQ8MBQsgCCAJIAtrIgkgCCAJShsiBSANQf////8Hc0oNA0E9IQ8gDiAFIA1qIgcgByAOSBsiBCAZSg0EIABBICAEIAcgChADIAAgFSANEAQgAEEwIAQgByAKQYCABHMQAyAAQTAgBSAJQQAQAyAAIAsgCRAEIABBICAEIAcgCkGAwABzEAMgBigCTCEFDAELCwtBACEPDAILQT0hDwtBoBQgDzYCAEF/IQ8LIAZB0ABqJAAgDwvqBAEGfyMAQfAAayIGJAAgAkIAUgRAIAYgBSkAGDcDGCAGIAUpABA3AxAgBiAFKQAANwMAIAYgBSkACDcDCCAGIAMpAAA3A2AgBiAEPABoIAYgBEI4iDwAbyAGIARCMIg8AG4gBiAEQiiIPABtIAYgBEIgiDwAbCAGIARCGIg8AGsgBiAEQhCIPABqIAYgBEIIiDwAaQJAIAJCwABaBEADQEEAIQUgBkEgaiAGQeAAaiAGEAYDQCAAIAVqIAZBIGoiByAFai0AACABIAVqLQAAczoAACAAIAVBAXIiA2ogAyAHai0AACABIANqLQAAczoAACAFQQJqIgVBwABHDQALIAYgBi0AaEEBaiIDOgBoIAYgBi0AaSADQQh2aiIDOgBpIAYgBi0AaiADQQh2aiIDOgBqIAYgBi0AayADQQh2aiIDOgBrIAYgBi0AbCADQQh2aiIDOgBsIAYgBi0AbSADQQh2aiIDOgBtIAYgBi0AbiADQQh2aiIDOgBuIAYgBi0AbyADQQh2ajoAbyABQUBrIQEgAEFAayEAIAJCQHwiAkI/Vg0ACyACUA0BC0EAIQUgBkEgaiAGQeAAaiAGEAYgAqciA0EBcSELIANBAUcEQCADQX5xIQlBACEDA0AgACAFaiAGQSBqIgogBWotAAAgASAFai0AAHM6AAAgACAFQQFyIgdqIAcgCmotAAAgASAHai0AAHM6AAAgBUECaiEFIANBAmoiAyAJRw0ACwsgC0UNACAAIAVqIAZBIGogBWotAAAgASAFai0AAHM6AAALIAZBIGpBwAAQBSAGQSAQBQsgBkHwAGokAEEAC4IEAgZ/AX4jAEHwAGsiBCQAIAFCAFIEQCAEIAMpABg3AxggBCADKQAQNwMQIAQgAykAADcDACAEIAMpAAg3AwggAikAACEKIARCADcDaCAEIAo3A2ACQCABQsAAWgRAA0AgACAEQeAAaiAEEAYgBCAELQBoQQFqIgI6AGggBCAELQBpIAJBCHZqIgI6AGkgBCAELQBqIAJBCHZqIgI6AGogBCAELQBrIAJBCHZqIgI6AGsgBCAELQBsIAJBCHZqIgI6AGwgBCAELQBtIAJBCHZqIgI6AG0gBCAELQBuIAJBCHZqIgI6AG4gBCAELQBvIAJBCHZqOgBvIABBQGshACABQkB8IgFCP1YNAAsgAVANAQtBACECIARBIGogBEHgAGogBBAGIAGnIgVBA3EhB0EAIQMgBUEBa0EDTwRAIAVBfHEhCEEAIQUDQCAAIANqIARBIGoiCSADai0AADoAACAAIANBAXIiBmogBiAJai0AADoAACAAIANBAnIiBmogBEEgaiAGai0AADoAACAAIANBA3IiBmogBEEgaiAGai0AADoAACADQQRqIQMgBUEEaiIFIAhHDQALCyAHRQ0AA0AgACADaiAEQSBqIANqLQAAOgAAIANBAWohAyACQQFqIgIgB0cNAAsLIARBIGpBwAAQBSAEQSAQBQsgBEHwAGokAEEACwQAQgALBABBAAv0AgEIfyMAQSBrIgMkACADIAAoAhwiBDYCECAAKAIUIQUgAyACNgIcIAMgATYCGCADIAUgBGsiATYCFCABIAJqIQVBAiEHAn8CQAJAAkAgACgCPCADQRBqIgFBAiADQQxqEAAiBAR/QaAUIAQ2AgBBfwVBAAsEQCABIQQMAQsDQCAFIAMoAgwiBkYNAiAGQQBIBEAgASEEDAQLIAEgBiABKAIEIghLIglBA3RqIgQgBiAIQQAgCRtrIgggBCgCAGo2AgAgAUEMQQQgCRtqIgEgASgCACAIazYCACAFIAZrIQUgACgCPCAEIgEgByAJayIHIANBDGoQACIGBH9BoBQgBjYCAEF/BUEAC0UNAAsLIAVBf0cNAQsgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCECACDAELIABBADYCHCAAQgA3AxAgACAAKAIAQSByNgIAQQAgB0ECRg0AGiACIAQoAgRrCyEKIANBIGokACAKC60MARd/IwBBEGsiDiQAQeMAIQBBgBQoAgAEf0EBBSMAQRBrIgEkACABQQA6AA9BjA4gAUEPakEAEAEaIAFBEGokAEEAIQEjAEEQayICJAADQCACQQA6AA8gAUGQFGpB6A0gAkEPakEAEAE6AAAgAUEBaiIBQRBHDQALIAJBEGokAEGAFEEBNgIAQQALRQRAIwBBIGsiACQAQfTKgdkGIQFBstqIywchBEHuyIGZAyEDQeXwwYsGIQVBnAwoAAAhEEGYDCgAACEHQZQMKAAAIQhBzAwoAAAhE0HIDCgAACERQRQhEkHEDCgAACEPQcAMKAAAIQlBvAwoAAAhCkG4DCgAACELQbQMKAAAIQJBkAwoAAAhBkGwDCgAACEMA0AgESAQIAMgDGpBB3dzIg0gA2pBCXdzIhQgBSAPakEHdyAKcyIKIAVqQQl3IAdzIhUgCmpBDXcgD3MiFiABIAlqQQd3IAtzIgsgAWpBCXcgCHMiCCALakENdyAJcyIJIAhqQRJ3IAFzIgEgEyAEIAZqQQd3cyIHakEHd3MiDyABakEJd3MiESAPakENdyAHcyITIBFqQRJ3IAFzIQEgCSAHIAQgB2pBCXcgAnMiAmpBDXcgBnMiBiACakESdyAEcyIEIA1qQQd3cyIJIARqQQl3IBVzIgcgCWpBDXcgDXMiECAHakESdyAEcyEEIAYgFCANIBRqQQ13IAxzIgxqQRJ3IANzIgMgCmpBB3dzIgYgA2pBCXcgCHMiCCAGakENdyAKcyIKIAhqQRJ3IANzIQMgDCAVIBZqQRJ3IAVzIgUgC2pBB3dzIgwgBWpBCXcgAnMiAiAMakENdyALcyILIAJqQRJ3IAVzIQUgEkECSyEXIBJBAmshEiAXDQALIAAgBTYAACAAIBA2ABwgACAHNgAYIAAgCDYAFCAAIAY2ABAgACABNgAMIAAgBDYACCAAIAM2AARB4BNCIEGgDCAAQdAMKAIAEQYAGiAAQSAQBSAAQSBqJABBACEAA0AgDiAAQeATai0AADYCACMAQRBrIgQkACAEIA42AgxBACECIwBB0AFrIgEkACABIA42AswBIAFBoAFqIgNBAEEoEAkgASABKALMATYCyAECQEEAIAFByAFqIAFB0ABqIAMQD0EASA0AQaQNKAIAQQBIIRhB2AxB2AwoAgAiBUFfcTYCAAJ/AkACQEGIDSgCAEUEQEGIDUHQADYCAEH0DEEANgIAQegMQgA3AwBBhA0oAgAhAkGEDSABNgIADAELQegMKAIADQELQX9B2AwQCA0BGgtB2AwgAUHIAWogAUHQAGogAUGgAWoQDwshBiACBH9B2AxBAEEAQfwMKAIAEQAAGkGIDUEANgIAQYQNIAI2AgBB9AxBADYCAEHsDCgCABpB6AxCADcDAEEABSAGCxpB2AxB2AwoAgAgBUEgcXI2AgAgGA0ACyABQdABaiQAIARBEGokACAAQQdxQQdGBEACQAJAQaQNKAIAIgFBAE4EQCABRQ0BQfQUKAIAIAFB/////3txRw0BCwJAQagNKAIAQQpGDQBB7AwoAgAiAUHoDCgCAEYNAEHsDCABQQFqNgIAIAFBCjoAAAwCCxAHDAELQaQNQaQNKAIAIgFB/////wMgARs2AgACQAJAQagNKAIAQQpGDQBB7AwoAgAiAUHoDCgCAEYNAEHsDCABQQFqNgIAIAFBCjoAAAwBCxAHC0GkDSgCABpBpA1BADYCAAsLIABBAWoiAEEgRw0AC0GkDSgCABoCQEF/QQACfwJ/AkACQEGSCCIAQQNxRQ0AQQBBkggtAABFDQIaA0AgAEEBaiIAQQNxRQ0BIAAtAAANAAsMAQsDQCAAIgFBBGohACABKAIAIgJBf3MgAkGBgoQIa3FBgIGChHhxRQ0ACwNAIAEiAEEBaiEBIAAtAAANAAsLIABBkghrCyIAIAACf0GkDSgCAEEASARAQZIIIABB2AwQCgwBC0GSCCAAQdgMEAoLIgFGDQAaIAELIABHG0EASA0AAkBBqA0oAgBBCkYNAEHsDCgCACIAQegMKAIARg0AQewMIABBAWo2AgAgAEEKOgAADAELEAcLQQAhAAsgDkEQaiQAIAALC/QDEgBBgAgLcSwweCUwMngALSsgICAwWDB4AC0tLSBTVUNDRVNTIC0tLQAobnVsbCkAAAAAAAAAABkACgAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQARChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZAEGBCQshDgAAAAAAAAAAGQAKDRkZGQANAAACAAkOAAAACQAOAAAOAEG7CQsBDABBxwkLFRMAAAAAEwAAAAAJDAAAAAAADAAADABB9QkLARAAQYEKCxUPAAAABA8AAAAACRAAAAAAABAAABAAQa8KCwESAEG7CgseEQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoaAEHyCgsOGgAAABoaGgAAAAAAAAkAQaMLCwEUAEGvCwsVFwAAAAAXAAAAAAkUAAAAAAAUAAAUAEHdCwsBFgBB6QsLJxUAAAAAFQAAAAAJFgAAAAAAFgAAFgAAMDEyMzQ1Njc4OUFCQ0RFRgBBkAwLSWlpbulVtitzzWK9qHX8c9aCGeADa3oLNwAAAAAAAAAAGydVZHPphdRizVEZeppGx2AJVJ6sZHTyBsTuCET2g4kBAAAAAgAAAAUAQeQMCwEDAEH8DAsOBAAAAAUAAADoCgAAAAQAQZQNCwEBAEGkDQsF/////wo=";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["d"];updateMemoryViews();addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1768:()=>Module.getRandomValue(),1804:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var SYSCALLS={varargs:undefined,get(){var ret=HEAP32[+SYSCALLS.varargs>>2];SYSCALLS.varargs+=4;return ret},getp(){return SYSCALLS.get()},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={b:_emscripten_asm_const_int,c:_emscripten_memcpy_js,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
