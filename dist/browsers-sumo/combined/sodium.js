var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports === 'object' &&
               typeof exports.nodeName !== 'string') {
        factory(exports);
    } else {
        factory(root.libsodium = {});
    }
})(this, (function (exports) {
    var Module = exports;
var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function shell_read(){throw"no read() available"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status,toThrow){quit(status)})}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return xhr.response}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function shell_print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function shell_printErr(x){console.warn(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){abort("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}if(!Module["quit"]){Module["quit"]=(function(status,toThrow){throw toThrow})}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var Runtime={setTempRet0:(function(value){tempRet0=value;return value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[null,null,null,null,null,null,null,null],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 1*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-1)/1]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];if(!func){abort("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};cwrap=function cwrap(ident,returnType,argTypes){return(function(){return ccall(ident,returnType,argTypes,arguments)})}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function demangle(func){var __cxa_demangle_func=Module["___cxa_demangle"]||Module["__cxa_demangle"];if(__cxa_demangle_func){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=__cxa_demangle_func(buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}return func}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}Module["stackTrace"]=stackTrace;var PAGE_SIZE=16384;var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||67108864;if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(TOTAL_MEMORY)}}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=(function(x){return x<0?Math.ceil(x):Math.floor(x)});Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[(function(){{return Module.getRandomValue()}}),(function(){{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self,crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto,randomValuesStandard=(function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0});randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto"),randomValueNodeJS=(function(){var buf=crypto.randomBytes(4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0});randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}})];function _emscripten_asm_const_i(code){return ASM_CONSTS[code]()}function _emscripten_asm_const_v(code){return ASM_CONSTS[code]()}STATIC_BASE=Runtime.GLOBAL_BASE;STATICTOP=STATIC_BASE+36e3;__ATINIT__.push();allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,5,199,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,122,19,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,133,180,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,250,236,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,237,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,238,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,217,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,218,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,219,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,8,201,188,243,103,230,9,106,59,167,202,132,133,174,103,187,43,248,148,254,114,243,110,60,241,54,29,95,58,245,79,165,209,130,230,173,127,82,14,81,31,108,62,43,140,104,5,155,107,189,65,251,171,217,131,31,121,33,126,19,25,205,224,91,34,174,40,215,152,47,138,66,205,101,239,35,145,68,55,113,47,59,77,236,207,251,192,181,188,219,137,129,165,219,181,233,56,181,72,243,91,194,86,57,25,208,5,182,241,17,241,89,155,79,25,175,164,130,63,146,24,129,109,218,213,94,28,171,66,2,3,163,152,170,7,216,190,111,112,69,1,91,131,18,140,178,228,78,190,133,49,36,226,180,255,213,195,125,12,85,111,137,123,242,116,93,190,114,177,150,22,59,254,177,222,128,53,18,199,37,167,6,220,155,148,38,105,207,116,241,155,193,210,74,241,158,193,105,155,228,227,37,79,56,134,71,190,239,181,213,140,139,198,157,193,15,101,156,172,119,204,161,12,36,117,2,43,89,111,44,233,45,131,228,166,110,170,132,116,74,212,251,65,189,220,169,176,92,181,83,17,131,218,136,249,118,171,223,102,238,82,81,62,152,16,50,180,45,109,198,49,168,63,33,251,152,200,39,3,176,228,14,239,190,199,127,89,191,194,143,168,61,243,11,224,198,37,167,10,147,71,145,167,213,111,130,3,224,81,99,202,6,112,110,14,10,103,41,41,20,252,47,210,70,133,10,183,39,38,201,38,92,56,33,27,46,237,42,196,90,252,109,44,77,223,179,149,157,19,13,56,83,222,99,175,139,84,115,10,101,168,178,119,60,187,10,106,118,230,174,237,71,46,201,194,129,59,53,130,20,133,44,114,146,100,3,241,76,161,232,191,162,1,48,66,188,75,102,26,168,145,151,248,208,112,139,75,194,48,190,84,6,163,81,108,199,24,82,239,214,25,232,146,209,16,169,101,85,36,6,153,214,42,32,113,87,133,53,14,244,184,209,187,50,112,160,106,16,200,208,210,184,22,193,164,25,83,171,65,81,8,108,55,30,153,235,142,223,76,119,72,39,168,72,155,225,181,188,176,52,99,90,201,197,179,12,28,57,203,138,65,227,74,170,216,78,115,227,99,119,79,202,156,91,163,184,178,214,243,111,46,104,252,178,239,93,238,130,143,116,96,47,23,67,111,99,165,120,114,171,240,161,20,120,200,132,236,57,100,26,8,2,199,140,40,30,99,35,250,255,190,144,233,189,130,222,235,108,80,164,21,121,198,178,247,163,249,190,43,83,114,227,242,120,113,198,156,97,38,234,206,62,39,202,7,194,192,33,199,184,134,209,30,235,224,205,214,125,218,234,120,209,110,238,127,79,125,245,186,111,23,114,170,103,240,6,166,152,200,162,197,125,99,10,174,13,249,190,4,152,63,17,27,71,28,19,53,11,113,27,132,125,4,35,245,119,219,40,147,36,199,64,123,171,202,50,188,190,201,21,10,190,158,60,76,13,16,156,196,103,29,67,182,66,62,203,190,212,197,76,42,126,101,252,156,41,127,89,236,250,214,58,171,111,203,95,23,88,71,74,140,25,68,108,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,182,120,89,255,133,114,211,0,189,110,21,255,15,10,106,0,41,192,1,0,152,232,121,255,188,60,160,255,153,113,206,255,0,183,226,254,180,13,72,255,176,160,14,254,211,201,134,255,158,24,143,0,127,105,53,0,96,12,189,0,167,215,251,255,159,76,128,254,106,101,225,255,30,252,4,0,146,12,174,0,89,241,178,254,10,229,166,255,123,221,42,254,30,20,212,0,82,128,3,0,48,209,243,0,119,121,64,255,50,227,156,255,0,110,197,1,103,27,144,0,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,47,99,168,254,170,226,153,255,102,179,216,0,226,141,122,255,122,66,153,254,182,245,134,0,227,228,25,1,214,57,235,255,216,173,56,255,181,231,210,0,119,128,157,255,129,95,136,255,110,126,51,0,2,169,183,255,7,130,98,254,69,176,94,255,116,4,227,1,217,242,145,255,202,173,31,1,105,1,39,255,46,175,69,0,228,47,58,255,215,224,69,254,207,56,69,255,16,254,139,255,23,207,212,255,202,20,126,255,95,213,96,255,9,176,33,0,200,5,207,255,241,42,128,254,35,33,192,255,248,229,196,1,129,17,120,0,251,103,151,255,7,52,112,255,140,56,66,255,40,226,245,255,217,70,37,254,172,214,9,255,72,67,134,1,146,192,214,255,44,38,112,0,68,184,75,255,206,90,251,0,149,235,141,0,181,170,58,0,116,244,239,0,92,157,2,0,102,173,98,0,233,137,96,1,127,49,203,0,5,155,148,0,23,148,9,255,211,122,12,0,34,134,26,255,219,204,136,0,134,8,41,255,224,83,43,254,85,25,247,0,109,127,0,254,169,136,48,0,238,119,219,255,231,173,213,0,206,18,254,254,8,186,7,255,126,9,7,1,111,42,72,0,111,52,236,254,96,63,141,0,147,191,127,254,205,78,192,255,14,106,237,1,187,219,76,0,175,243,187,254,105,89,173,0,85,25,89,1,162,243,148,0,2,118,209,254,33,158,9,0,139,163,46,255,93,70,40,0,108,42,142,254,111,252,142,255,155,223,144,0,51,229,167,255,73,252,155,255,94,116,12,255,152,160,218,255,156,238,37,255,179,234,207,255,197,0,179,255,154,164,141,0,225,196,104,0,10,35,25,254,209,212,242,255,97,253,222,254,184,101,229,0,222,18,127,1,164,136,135,255,30,207,140,254,146,97,243,0,129,192,26,254,201,84,33,255,111,10,78,255,147,81,178,255,4,4,24,0,161,238,215,255,6,141,33,0,53,215,14,255,41,181,208,255,231,139,157,0,179,203,221,255,255,185,113,0,189,226,172,255,113,66,214,255,202,62,45,255,102,64,8,255,78,174,16,254,133,117,68,255,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,234,113,60,255,37,255,57,255,69,178,182,254,128,208,179,0,118,26,125,254,3,7,214,255,241,50,77,255,85,203,197,255,211,135,250,255,25,48,100,255,187,213,180,254,17,88,105,0,83,209,158,1,5,115,98,0,4,174,60,254,171,55,110,255,217,181,17,255,20,188,170,0,146,156,102,254,87,214,174,255,114,122,155,1,233,44,170,0,127,8,239,1,214,236,234,0,175,5,219,0,49,106,61,255,6,66,208,255,2,106,110,255,81,234,19,255,215,107,192,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,178,9,252,254,100,110,212,0,14,5,167,0,233,239,163,255,28,151,157,1,101,146,10,255,254,158,70,254,71,249,228,0,88,30,50,0,68,58,160,255,191,24,104,1,129,66,129,255,192,50,85,255,8,179,138,255,38,250,201,0,115,80,160,0,131,230,113,0,125,88,147,0,90,68,199,0,253,76,158,0,28,255,118,0,113,250,254,0,66,75,46,0,230,218,43,0,229,120,186,1,148,68,43,0,136,124,238,1,187,107,197,255,84,53,246,255,51,116,254,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,68,113,21,255,222,186,59,255,66,7,241,1,69,6,72,0,86,156,108,254,55,167,89,0,109,52,219,254,13,176,23,255,196,44,106,255,239,149,71,255,164,140,125,255,159,173,1,0,51,41,231,0,145,62,33,0,138,111,93,1,185,83,69,0,144,115,46,0,97,151,16,255,24,228,26,0,49,217,226,0,113,75,234,254,193,153,12,255,182,48,96,255,14,13,26,0,128,195,249,254,69,193,59,0,132,37,81,254,125,106,60,0,214,240,169,1,164,227,66,0,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,143,62,221,0,129,89,214,255,55,139,5,254,68,20,191,255,14,204,178,1,35,195,217,0,47,51,206,1,38,246,165,0,206,27,6,254,158,87,36,0,217,52,146,255,125,123,215,255,85,60,31,255,171,13,7,0,218,245,88,254,252,35,60,0,55,214,160,255,133,101,56,0,224,32,19,254,147,64,234,0,26,145,162,1,114,118,125,0,248,252,250,0,101,94,196,255,198,141,226,254,51,42,182,0,135,12,9,254,109,172,210,255,197,236,194,1,241,65,154,0,48,156,47,255,153,67,55,255,218,165,34,254,74,180,179,0,218,66,71,1,88,122,99,0,212,181,219,255,92,42,231,255,239,0,154,0,245,77,183,255,94,81,170,1,18,213,216,0,171,93,71,0,52,94,248,0,18,151,161,254,197,209,66,255,174,244,15,254,162,48,183,0,49,61,240,254,182,93,195,0,199,228,6,1,200,5,17,255,137,45,237,255,108,148,4,0,90,79,237,255,39,63,77,255,53,82,207,1,142,22,118,255,101,232,18,1,92,26,67,0,5,200,88,255,33,168,138,255,149,225,72,0,2,209,27,255,44,245,168,1,220,237,17,255,30,211,105,254,141,238,221,0,128,80,245,254,111,254,14,0,222,95,190,1,223,9,241,0,146,76,212,255,108,205,104,255,63,117,153,0,144,69,48,0,35,228,111,0,192,33,193,255,112,214,190,254,115,152,151,0,23,102,88,0,51,74,248,0,226,199,143,254,204,162,101,255,208,97,189,1,245,104,18,0,230,246,30,255,23,148,69,0,110,88,52,254,226,181,89,255,208,47,90,254,114,161,80,255,33,116,248,0,179,152,87,255,69,144,177,1,88,238,26,255,58,32,113,1,1,77,69,0,59,121,52,255,152,238,83,0,52,8,193,0,231,39,233,255,199,34,138,0,222,68,173,0,91,57,242,254,220,210,127,255,192,7,246,254,151,35,187,0,195,236,165,0,111,93,206,0,212,247,133,1,154,133,209,255,155,231,10,0,64,78,38,0,122,249,100,1,30,19,97,255,62,91,249,1,248,133,77,0,197,63,168,254,116,10,82,0,184,236,113,254,212,203,194,255,61,100,252,254,36,5,202,255,119,91,153,255,129,79,29,0,103,103,171,254,237,215,111,255,216,53,69,0,239,240,23,0,194,149,221,255,38,225,222,0,232,255,180,254,118,82,133,255,57,209,177,1,139,232,133,0,158,176,46,254,194,115,46,0,88,247,229,1,28,103,191,0,221,222,175,254,149,235,44,0,151,228,25,254,218,105,103,0,142,85,210,0,149,129,190,255,213,65,94,254,117,134,224,255,82,198,117,0,157,221,220,0,163,101,36,0,197,114,37,0,104,172,166,254,11,182,0,0,81,72,188,255,97,188,16,255,69,6,10,0,199,147,145,255,8,9,115,1,65,214,175,255,217,173,209,0,80,127,166,0,247,229,4,254,167,183,124,255,90,28,204,254,175,59,240,255,11,41,248,1,108,40,51,255,144,177,195,254,150,250,126,0,138,91,65,1,120,60,222,255,245,193,239,0,29,214,189,255,128,2,25,0,80,154,162,0,77,220,107,1,234,205,74,255,54,166,103,255,116,72,9,0,228,94,47,255,30,200,25,255,35,214,89,255,61,176,140,255,83,226,163,255,75,130,172,0,128,38,17,0,95,137,152,255,215,124,159,1,79,93,0,0,148,82,157,254,195,130,251,255,40,202,76,255,251,126,224,0,157,99,62,254,207,7,225,255,96,68,195,0,140,186,157,255,131,19,231,255,42,128,254,0,52,219,61,254,102,203,72,0,141,7,11,255,186,164,213,0,31,122,119,0,133,242,145,0,208,252,232,255,91,213,182,255,143,4,250,254,249,215,74,0,165,30,111,1,171,9,223,0,229,123,34,1,92,130,26,255,77,155,45,1,195,139,28,255,59,224,78,0,136,17,247,0,108,121,32,0,79,250,189,255,96,227,252,254,38,241,62,0,62,174,125,255,155,111,93,255,10,230,206,1,97,197,40,255,0,49,57,254,65,250,13,0,18,251,150,255,220,109,210,255,5,174,166,254,44,129,189,0,235,35,147,255,37,247,141,255,72,141,4,255,103,107,255,0,247,90,4,0,53,44,42,0,2,30,240,0,4,59,63,0,88,78,36,0,113,167,180,0,190,71,193,255,199,158,164,255,58,8,172,0,77,33,12,0,65,63,3,0,153,77,33,255,172,254,102,1,228,221,4,255,87,30,254,1,146,41,86,255,138,204,239,254,108,141,17,255,187,242,135,0,210,208,127,0,68,45,14,254,73,96,62,0,81,60,24,255,170,6,36,255,3,249,26,0,35,213,109,0,22,129,54,255,21,35,225,255,234,61,56,255,58,217,6,0,143,124,88,0,236,126,66,0,209,38,183,255,34,238,6,255,174,145,102,0,95,22,211,0,196,15,153,254,46,84,232,255,117,34,146,1,231,250,74,255,27,134,100,1,92,187,195,255,170,198,112,0,120,28,42,0,209,70,67,0,29,81,31,0,29,168,100,1,169,173,160,0,107,35,117,0,62,96,59,255,81,12,69,1,135,239,190,255,220,252,18,0,163,220,58,255,137,137,188,255,83,102,109,0,96,6,76,0,234,222,210,255,185,174,205,1,60,158,213,255,13,241,214,0,172,129,140,0,93,104,242,0,192,156,251,0,43,117,30,0,225,81,158,0,127,232,218,0,226,28,203,0,233,27,151,255,117,43,5,255,242,14,47,255,33,20,6,0,137,251,44,254,27,31,245,255,183,214,125,254,40,121,149,0,186,158,213,255,89,8,227,0,69,88,0,254,203,135,225,0,201,174,203,0,147,71,184,0,18,121,41,254,94,5,78,0,224,214,240,254,36,5,180,0,251,135,231,1,163,138,212,0,210,249,116,254,88,129,187,0,19,8,49,254,62,14,144,255,159,76,211,0,214,51,82,0,109,117,228,254,103,223,203,255,75,252,15,1,154,71,220,255,23,13,91,1,141,168,96,255,181,182,133,0,250,51,55,0,234,234,212,254,175,63,158,0,39,240,52,1,158,189,36,255,213,40,85,1,32,180,247,255,19,102,26,1,84,24,97,255,69,21,222,0,148,139,122,255,220,213,235,1,232,203,255,0,121,57,147,0,227,7,154,0,53,22,147,1,72,1,225,0,82,134,48,254,83,60,157,255,145,72,169,0,34,103,239,0,198,233,47,0,116,19,4,255,184,106,9,255,183,129,83,0,36,176,230,1,34,103,72,0,219,162,134,0,245,42,158,0,32,149,96,254,165,44,144,0,202,239,72,254,215,150,5,0,42,66,36,1,132,215,175,0,86,174,86,255,26,197,156,255,49,232,135,254,103,182,82,0,253,128,176,1,153,178,122,0,245,250,10,0,236,24,178,0,137,106,132,0,40,29,41,0,50,30,152,255,124,105,38,0,230,191,75,0,143,43,170,0,44,131,20,255,44,13,23,255,237,255,155,1,159,109,100,255,112,181,24,255,104,220,108,0,55,211,131,0,99,12,213,255,152,151,145,255,238,5,159,0,97,155,8,0,33,108,81,0,1,3,103,0,62,109,34,255,250,155,180,0,32,71,195,255,38,70,145,1,159,95,245,0,69,229,101,1,136,28,240,0,79,224,25,0,78,110,121,255,248,168,124,0,187,128,247,0,2,147,235,254,79,11,132,0,70,58,12,1,181,8,163,255,79,137,133,255,37,170,11,255,141,243,85,255,176,231,215,255,204,150,164,255,239,215,39,255,46,87,156,254,8,163,88,255,172,34,232,0,66,44,102,255,27,54,41,254,236,99,87,255,41,123,169,1,52,114,43,0,117,134,40,0,155,134,26,0,231,207,91,254,35,132,38,255,19,102,125,254,36,227,133,255,118,3,113,255,29,13,124,0,152,96,74,1,88,146,206,255,167,191,220,254,162,18,88,255,182,100,23,0,31,117,52,0,81,46,106,1,12,2,7,0,69,80,201,1,209,246,172,0,12,48,141,1,224,211,88,0,116,226,159,0,122,98,130,0,65,236,234,1,225,226,9,255,207,226,123,1,89,214,59,0,112,135,88,1,90,244,203,255,49,11,38,1,129,108,186,0,89,112,15,1,101,46,204,255,127,204,45,254,79,255,221,255,51,73,18,255,127,42,101,255,241,21,202,0,160,227,7,0,105,50,236,0,79,52,197,255,104,202,208,1,180,15,16,0,101,197,78,255,98,77,203,0,41,185,241,1,35,193,124,0,35,155,23,255,207,53,192,0,11,125,163,1,249,158,185,255,4,131,48,0,21,93,111,255,61,121,231,1,69,200,36,255,185,48,185,255,111,238,21,255,39,50,25,255,99,215,163,255,87,212,30,255,164,147,5,255,128,6,35,1,108,223,110,255,194,76,178,0,74,101,180,0,243,47,48,0,174,25,43,255,82,173,253,1,54,114,192,255,40,55,91,0,215,108,176,255,11,56,7,0,224,233,76,0,209,98,202,254,242,25,125,0,44,193,93,254,203,8,177,0,135,176,19,0,112,71,213,255,206,59,176,1,4,67,26,0,14,143,213,254,42,55,208,255,60,67,120,0,193,21,163,0,99,164,115,0,10,20,118,0,156,212,222,254,160,7,217,255,114,245,76,1,117,59,123,0,176,194,86,254,213,15,176,0,78,206,207,254,213,129,59,0,233,251,22,1,96,55,152,255,236,255,15,255,197,89,84,255,93,149,133,0,174,160,113,0,234,99,169,255,152,116,88,0,144,164,83,255,95,29,198,255,34,47,15,255,99,120,134,255,5,236,193,0,249,247,126,255,147,187,30,0,50,230,117,255,108,217,219,255,163,81,166,255,72,25,169,254,155,121,79,255,28,155,89,254,7,126,17,0,147,65,33,1,47,234,253,0,26,51,18,0,105,83,199,255,163,196,230,0,113,248,164,0,226,254,218,0,189,209,203,255,164,247,222,254,255,35,165,0,4,188,243,1,127,179,71,0,37,237,254,255,100,186,240,0,5,57,71,254,103,72,73,255,244,18,81,254,229,210,132,255,238,6,180,255,11,229,174,255,227,221,192,1,17,49,28,0,163,215,196,254,9,118,4,255,51,240,71,0,113,129,109,255,76,240,231,0,188,177,127,0,125,71,44,1,26,175,243,0,94,169,25,254,27,230,29,0,15,139,119,1,168,170,186,255,172,197,76,255,252,75,188,0,137,124,196,0,72,22,96,255,45,151,249,1,220,145,100,0,64,192,159,255,120,239,226,0,129,178,146,0,0,192,125,0,235,138,234,0,183,157,146,0,83,199,192,255,184,172,72,255,73,225,128,0,77,6,250,255,186,65,67,0,104,246,207,0,188,32,138,255,218,24,242,0,67,138,81,254,237,129,121,255,20,207,150,1,41,199,16,255,6,20,128,0,159,118,5,0,181,16,143,255,220,38,15,0,23,64,147,254,73,26,13,0,87,228,57,1,204,124,128,0,43,24,223,0,219,99,199,0,22,75,20,255,19,27,126,0,157,62,215,0,110,29,230,0,179,167,255,1,54,252,190,0,221,204,182,254,179,158,65,255,81,157,3,0,194,218,159,0,170,223,0,0,224,11,32,255,38,197,98,0,168,164,37,0,23,88,7,1,164,186,110,0,96,36,134,0,234,242,229,0,250,121,19,0,242,254,112,255,3,47,94,1,9,239,6,255,81,134,153,254,214,253,168,255,67,124,224,0,245,95,74,0,28,30,44,254,1,109,220,255,178,89,89,0,252,36,76,0,24,198,46,255,76,77,111,0,134,234,136,255,39,94,29,0,185,72,234,255,70,68,135,255,231,102,7,254,77,231,140,0,167,47,58,1,148,97,118,255,16,27,225,1,166,206,143,255,110,178,214,255,180,131,162,0,143,141,225,1,13,218,78,255,114,153,33,1,98,104,204,0,175,114,117,1,167,206,75,0,202,196,83,1,58,64,67,0,138,47,111,1,196,247,128,255,137,224,224,254,158,112,207,0,154,100,255,1,134,37,107,0,198,128,79,255,127,209,155,255,163,254,185,254,60,14,243,0,31,219,112,254,29,217,65,0,200,13,116,254,123,60,196,255,224,59,184,254,242,89,196,0,123,16,75,254,149,16,206,0,69,254,48,1,231,116,223,255,209,160,65,1,200,80,98,0,37,194,184,254,148,63,34,0,139,240,65,255,217,144,132,255,56,38,45,254,199,120,210,0,108,177,166,255,160,222,4,0,220,126,119,254,165,107,160,255,82,220,248,1,241,175,136,0,144,141,23,255,169,138,84,0,160,137,78,255,226,118,80,255,52,27,132,255,63,96,139,255,152,250,39,0,188,155,15,0,232,51,150,254,40,15,232,255,240,229,9,255,137,175,27,255,75,73,97,1,218,212,11,0,135,5,162,1,107,185,213,0,2,249,107,255,40,242,70,0,219,200,25,0,25,157,13,0,67,82,80,255,196,249,23,255,145,20,149,0,50,72,146,0,94,76,148,1,24,251,65,0,31,192,23,0,184,212,201,255,123,233,162,1,247,173,72,0,162,87,219,254,126,134,89,0,159,11,12,254,166,105,29,0,73,27,228,1,113,120,183,255,66,163,109,1,212,143,11,255,159,231,168,1,255,128,90,0,57,14,58,254,89,52,10,255,253,8,163,1,0,145,210,255,10,129,85,1,46,181,27,0,103,136,160,254,126,188,209,255,34,35,111,0,215,219,24,255,212,11,214,254,101,5,118,0,232,197,133,255,223,167,109,255,237,80,86,255,70,139,94,0,158,193,191,1,155,15,51,255,15,190,115,0,78,135,207,255,249,10,27,1,181,125,233,0,95,172,13,254,170,213,161,255,39,236,138,255,95,93,87,255,190,128,95,0,125,15,206,0,166,150,159,0,227,15,158,255,206,158,120,255,42,141,128,0,101,178,120,1,156,109,131,0,218,14,44,254,247,168,206,255,212,112,28,0,112,17,228,255,90,16,37,1,197,222,108,0,254,207,83,255,9,90,243,255,243,244,172,0,26,88,115,255,205,116,122,0,191,230,193,0,180,100,11,1,217,37,96,255,154,78,156,0,235,234,31,255,206,178,178,255,149,192,251,0,182,250,135,0,246,22,105,0,124,193,109,255,2,210,149,255,169,17,170,0,0,96,110,255,117,9,8,1,50,123,40,255,193,189,99,0,34,227,160,0,48,80,70,254,211,51,236,0,45,122,245,254,44,174,8,0,173,37,233,255,158,65,171,0,122,69,215,255,90,80,2,255,131,106,96,254,227,114,135,0,205,49,119,254,176,62,64,255,82,51,17,255,241,20,243,255,130,13,8,254,128,217,243,255,162,27,1,254,90,118,241,0,246,198,246,255,55,16,118,255,200,159,157,0,163,17,1,0,140,107,121,0,85,161,118,255,38,0,149,0,156,47,238,0,9,166,166,1,75,98,181,255,50,74,25,0,66,15,47,0,139,225,159,0,76,3,142,255,14,238,184,0,11,207,53,255,183,192,186,1,171,32,174,255,191,76,221,1,247,170,219,0,25,172,50,254,217,9,233,0,203,126,68,255,183,92,48,0,127,167,183,1,65,49,254,0,16,63,127,1,254,21,170,255,59,224,127,254,22,48,63,255,27,78,130,254,40,195,29,0,250,132,112,254,35,203,144,0,104,169,168,0,207,253,30,255,104,40,38,254,94,228,88,0,206,16,128,255,212,55,122,255,223,22,234,0,223,197,127,0,253,181,181,1,145,102,118,0,236,153,36,255,212,217,72,255,20,38,24,254,138,62,62,0,152,140,4,0,230,220,99,255,1,21,212,255,148,201,231,0,244,123,9,254,0,171,210,0,51,58,37,255,1,255,14,255,244,183,145,254,0,242,166,0,22,74,132,0,121,216,41,0,95,195,114,254,133,24,151,255,156,226,231,255,247,5,77,255,246,148,115,254,225,92,81,255,222,80,246,254,170,123,89,255,74,199,141,0,29,20,8,255,138,136,70,255,93,75,92,0,221,147,49,254,52,126,226,0,229,124,23,0,46,9,181,0,205,64,52,1,131,254,28,0,151,158,212,0,131,64,78,0,206,25,171,0,0,230,139,0,191,253,110,254,103,247,167,0,64,40,40,1,42,165,241,255,59,75,228,254,124,243,189,255,196,92,178,255,130,140,86,255,141,89,56,1,147,198,5,255,203,248,158,254,144,162,141,0,11,172,226,0,130,42,21,255,1,167,143,255,144,36,36,255,48,88,164,254,168,170,220,0,98,71,214,0,91,208,79,0,159,76,201,1,166,42,214,255,69,255,0,255,6,128,125,255,190,1,140,0,146,83,218,255,215,238,72,1,122,127,53,0,189,116,165,255,84,8,66,255,214,3,208,255,213,110,133,0,195,168,44,1,158,231,69,0,162,64,200,254,91,58,104,0,182,58,187,254,249,228,136,0,203,134,76,254,99,221,233,0,75,254,214,254,80,69,154,0,64,152,248,254,236,136,202,255,157,105,153,254,149,175,20,0,22,35,19,255,124,121,233,0,186,250,198,254,132,229,139,0,137,80,174,255,165,125,68,0,144,202,148,254,235,239,248,0,135,184,118,0,101,94,17,255,122,72,70,254,69,130,146,0,127,222,248,1,69,127,118,255,30,82,215,254,188,74,19,255,229,167,194,254,117,25,66,255,65,234,56,254,213,22,156,0,151,59,93,254,45,28,27,255,186,126,164,255,32,6,239,0,127,114,99,1,219,52,2,255,99,96,166,254,62,190,126,255,108,222,168,1,75,226,174,0,230,226,199,0,60,117,218,255,252,248,20,1,214,188,204,0,31,194,134,254,123,69,192,255,169,173,36,254,55,98,91,0,223,42,102,254,137,1,102,0,157,90,25,0,239,122,64,255,252,6,233,0,7,54,20,255,82,116,174,0,135,37,54,255,15,186,125,0,227,112,175,255,100,180,225,255,42,237,244,255,244,173,226,254,248,18,33,0,171,99,150,255,74,235,50,255,117,82,32,254,106,168,237,0,207,109,208,1,228,9,186,0,135,60,169,254,179,92,143,0,244,170,104,255,235,45,124,255,70,99,186,0,117,137,183,0,224,31,215,0,40,9,100,0,26,16,95,1,68,217,87,0,8,151,20,255,26,100,58,255,176,165,203,1,52,118,70,0,7,32,254,254,244,254,245,255,167,144,194,255,125,113,23,255,176,121,181,0,136,84,209,0,138,6,30,255,89,48,28,0,33,155,14,255,25,240,154,0,141,205,109,1,70,115,62,255,20,40,107,254,138,154,199,255,94,223,226,255,157,171,38,0,163,177,25,254,45,118,3,255,14,222,23,1,209,190,81,255,118,123,232,1,13,213,101,255,123,55,123,254,27,246,165,0,50,99,76,255,140,214,32,255,97,65,67,255,24,12,28,0,174,86,78,1,64,247,96,0,160,135,67,0,66,55,243,255,147,204,96,255,26,6,33,255,98,51,83,1,153,213,208,255,2,184,54,255,25,218,11,0,49,67,246,254,18,149,72,255,13,25,72,0,42,79,214,0,42,4,38,1,27,139,144,255,149,187,23,0,18,164,132,0,245,84,184,254,120,198,104,255,126,218,96,0,56,117,234,255,13,29,214,254,68,47,10,255,167,154,132,254,152,38,198,0,66,178,89,255,200,46,171,255,13,99,83,255,210,187,253,255,170,45,42,1,138,209,124,0,214,162,141,0,12,230,156,0,102,36,112,254,3,147,67,0,52,215,123,255,233,171,54,255,98,137,62,0,247,218,39,255,231,218,236,0,247,191,127,0,195,146,84,0,165,176,92,255,19,212,94,255,17,74,227,0,88,40,153,1,198,147,1,255,206,67,245,254,240,3,218,255,61,141,213,255,97,183,106,0,195,232,235,254,95,86,154,0,209,48,205,254,118,209,241,255,240,120,223,1,213,29,159,0,163,127,147,255,13,218,93,0,85,24,68,254,70,20,80,255,189,5,140,1,82,97,254,255,99,99,191,255,132,84,133,255,107,218,116,255,112,122,46,0,105,17,32,0,194,160,63,255,68,222,39,1,216,253,92,0,177,105,205,255,149,201,195,0,42,225,11,255,40,162,115,0,9,7,81,0,165,218,219,0,180,22,0,254,29,146,252,255,146,207,225,1,180,135,96,0,31,163,112,0,177,11,219,255,133,12,193,254,43,78,50,0,65,113,121,1,59,217,6,255,110,94,24,1,112,172,111,0,7,15,96,0,36,85,123,0,71,150,21,255,208,73,188,0,192,11,167,1,213,245,34,0,9,230,92,0,162,142,39,255,215,90,27,0,98,97,89,0,94,79,211,0,90,157,240,0,95,220,126,1,102,176,226,0,36,30,224,254,35,31,127,0,231,232,115,1,85,83,130,0,210,73,245,255,47,143,114,255,68,65,197,0,59,72,62,255,183,133,173,254,93,121,118,255,59,177,81,255,234,69,173,255,205,128,177,0,220,244,51,0,26,244,209,1,73,222,77,255,163,8,96,254,150,149,211,0,158,254,203,1,54,127,139,0,161,224,59,0,4,109,22,255,222,42,45,255,208,146,102,255,236,142,187,0,50,205,245,255,10,74,89,254,48,79,142,0,222,76,130,255,30,166,63,0,236,12,13,255,49,184,244,0,187,113,102,0,218,101,253,0,153,57,182,254,32,150,42,0,25,198,146,1,237,241,56,0,140,68,5,0,91,164,172,255,78,145,186,254,67,52,205,0,219,207,129,1,109,115,17,0,54,143,58,1,21,248,120,255,179,255,30,0,193,236,66,255,1,255,7,255,253,192,48,255,19,69,217,1,3,214,0,255,64,101,146,1,223,125,35,255,235,73,179,255,249,167,226,0,225,175,10,1,97,162,58,0,106,112,171,1,84,172,5,255,133,140,178,255,134,245,142,0,97,90,125,255,186,203,185,255,223,77,23,255,192,92,106,0,15,198,115,255,217,152,248,0,171,178,120,255,228,134,53,0,176,54,193,1,250,251,53,0,213,10,100,1,34,199,106,0,151,31,244,254,172,224,87,255,14,237,23,255,253,85,26,255,127,39,116,255,172,104,100,0,251,14,70,255,212,208,138,255,253,211,250,0,176,49,165,0,15,76,123,255,37,218,160,255,92,135,16,1,10,126,114,255,70,5,224,255,247,249,141,0,68,20,60,1,241,210,189,255,195,217,187,1,151,3,113,0,151,92,174,0,231,62,178,255,219,183,225,0,23,23,33,255,205,181,80,0,57,184,248,255,67,180,1,255,90,123,93,255,39,0,162,255,96,248,52,255,84,66,140,0,34,127,228,255,194,138,7,1,166,110,188,0,21,17,155,1,154,190,198,255,214,80,59,255,18,7,143,0,72,29,226,1,199,217,249,0,232,161,71,1,149,190,201,0,217,175,95,254,113,147,67,255,138,143,199,255,127,204,1,0,29,182,83,1,206,230,155,255,186,204,60,0,10,125,85,255,232,96,25,255,255,89,247,255,213,254,175,1,232,193,81,0,28,43,156,254,12,69,8,0,147,24,248,0,18,198,49,0,134,60,35,0,118,246,18,255,49,88,254,254,228,21,186,255,182,65,112,1,219,22,1,255,22,126,52,255,189,53,49,255,112,25,143,0,38,127,55,255,226,101,163,254,208,133,61,255,137,69,174,1,190,118,145,255,60,98,219,255,217,13,245,255,250,136,10,0,84,254,226,0,201,31,125,1,240,51,251,255,31,131,130,255,2,138,50,255,215,215,177,1,223,12,238,255,252,149,56,255,124,91,68,255,72,126,170,254,119,255,100,0,130,135,232,255,14,79,178,0,250,131,197,0,138,198,208,0,121,216,139,254,119,18,36,255,29,193,122,0,16,42,45,255,213,240,235,1,230,190,169,255,198,35,228,254,110,173,72,0,214,221,241,255,56,148,135,0,192,117,78,254,141,93,207,255,143,65,149,0,21,18,98,255,95,44,244,1,106,191,77,0,254,85,8,254,214,110,176,255,73,173,19,254,160,196,199,255,237,90,144,0,193,172,113,255,200,155,136,254,228,90,221,0,137,49,74,1,164,221,215,255,209,189,5,255,105,236,55,255,42,31,129,1,193,255,236,0,46,217,60,0,138,88,187,255,226,82,236,255,81,69,151,255,142,190,16,1,13,134,8,0,127,122,48,255,81,64,156,0,171,243,139,0,237,35,246,0,122,143,193,254,212,122,146,0,95,41,255,1,87,132,77,0,4,212,31,0,17,31,78,0,39,45,173,254,24,142,217,255,95,9,6,255,227,83,6,0,98,59,130,254,62,30,33,0,8,115,211,1,162,97,128,255,7,184,23,254,116,28,168,255,248,138,151,255,98,244,240,0,186,118,130,0,114,248,235,255,105,173,200,1,160,124,71,255,94,36,164,1,175,65,146,255,238,241,170,254,202,198,197,0,228,71,138,254,45,246,109,255,194,52,158,0,133,187,176,0,83,252,154,254,89,189,221,255,170,73,252,0,148,58,125,0,36,68,51,254,42,69,177,255,168,76,86,255,38,100,204,255,38,53,35,0,175,19,97,0,225,238,253,255,81,81,135,0,210,27,255,254,235,73,107,0,8,207,115,0,82,127,136,0,84,99,21,254,207,19,136,0,100,164,101,0,80,208,77,255,132,207,237,255,15,3,15,255,33,166,110,0,156,95,85,255,37,185,111,1,150,106,35,255,166,151,76,0,114,87,135,255,159,194,64,0,12,122,31,255,232,7,101,254,173,119,98,0,154,71,220,254,191,57,53,255,168,232,160,255,224,32,99,255,218,156,165,0,151,153,163,0,217,13,148,1,197,113,89,0,149,28,161,254,207,23,30,0,105,132,227,255,54,230,94,255,133,173,204,255,92,183,157,255,88,144,252,254,102,33,90,0,159,97,3,0,181,218,155,255,240,114,119,0,106,214,53,255,165,190,115,1,152,91,225,255,88,106,44,255,208,61,113,0,151,52,124,0,191,27,156,255,110,54,236,1,14,30,166,255,39,127,207,1,229,199,28,0,188,228,188,254,100,157,235,0,246,218,183,1,107,22,193,255,206,160,95,0,76,239,147,0,207,161,117,0,51,166,2,255,52,117,10,254,73,56,227,255,152,193,225,0,132,94,136,255,101,191,209,0,32,107,229,255,198,43,180,1,100,210,118,0,114,67,153,255,23,88,26,255,89,154,92,1,220,120,140,255,144,114,207,255,252,115,250,255,34,206,72,0,138,133,127,255,8,178,124,1,87,75,97,0,15,229,92,254,240,67,131,255,118,123,227,254,146,120,104,255,145,213,255,1,129,187,70,255,219,119,54,0,1,19,173,0,45,150,148,1,248,83,72,0,203,233,169,1,142,107,56,0,247,249,38,1,45,242,80,255,30,233,103,0,96,82,70,0,23,201,111,0,81,39,30,255,161,183,78,255,194,234,33,255,68,227,140,254,216,206,116,0,70,27,235,255,104,144,79,0,164,230,93,254,214,135,156,0,154,187,242,254,188,20,131,255,36,109,174,0,159,112,241,0,5,110,149,1,36,165,218,0,166,29,19,1,178,46,73,0,93,43,32,254,248,189,237,0,102,155,141,0,201,93,195,255,241,139,253,255,15,111,98,255,108,65,163,254,155,79,190,255,73,174,193,254,246,40,48,255,107,88,11,254,202,97,85,255,253,204,18,255,113,242,66,0,110,160,194,254,208,18,186,0,81,21,60,0,188,104,167,255,124,166,97,254,210,133,142,0,56,242,137,254,41,111,130,0,111,151,58,1,111,213,141,255,183,172,241,255,38,6,196,255,185,7,123,255,46,11,246,0,245,105,119,1,15,2,161,255,8,206,45,255,18,202,74,255,83,124,115,1,212,141,157,0,83,8,209,254,139,15,232,255,172,54,173,254,50,247,132,0,214,189,213,0,144,184,105,0,223,254,248,0,255,147,240,255,23,188,72,0,7,51,54,0,188,25,180,254,220,180,0,255,83,160,20,0,163,189,243,255,58,209,194,255,87,73,60,0,106,24,49,0,245,249,220,0,22,173,167,0,118,11,195,255,19,126,237,0,110,159,37,255,59,82,47,0,180,187,86,0,188,148,208,1,100,37,133,255,7,112,193,0,129,188,156,255,84,106,129,255,133,225,202,0,14,236,111,255,40,20,101,0,172,172,49,254,51,54,74,255,251,185,184,255,93,155,224,255,180,249,224,1,230,178,146,0,72,57,54,254,178,62,184,0,119,205,72,0,185,239,253,255,61,15,218,0,196,67,56,255,234,32,171,1,46,219,228,0,208,108,234,255,20,63,232,255,165,53,199,1,133,228,5,255,52,205,107,0,74,238,140,255,150,156,219,254,239,172,178,255,251,189,223,254,32,142,211,255,218,15,138,1,241,196,80,0,28,36,98,254,22,234,199,0,61,237,220,255,246,57,37,0,142,17,142,255,157,62,26,0,43,238,95,254,3,217,6,255,213,25,240,1,39,220,174,255,154,205,48,254,19,13,192,255,244,34,54,254,140,16,155,0,240,181,5,254,155,193,60,0,166,128,4,255,36,145,56,255,150,240,219,0,120,51,145,0,82,153,42,1,140,236,146,0,107,92,248,1,189,10,3,0,63,136,242,0,211,39,24,0,19,202,161,1,173,27,186,255,210,204,239,254,41,209,162,255,182,254,159,255,172,116,52,0,195,103,222,254,205,69,59,0,53,22,41,1,218,48,194,0,80,210,242,0,210,188,207,0,187,161,161,254,216,17,1,0,136,225,113,0,250,184,63,0,223,30,98,254,77,168,162,0,59,53,175,0,19,201,10,255,139,224,194,0,147,193,154,255,212,189,12,254,1,200,174,255,50,133,113,1,94,179,90,0,173,182,135,0,94,177,113,0,43,89,215,255,136,252,106,255,123,134,83,254,5,245,66,255,82,49,39,1,220,2,224,0,97,129,177,0,77,59,89,0,61,29,155,1,203,171,220,255,92,78,139,0,145,33,181,255,169,24,141,1,55,150,179,0,139,60,80,255,218,39,97,0,2,147,107,255,60,248,72,0,173,230,47,1,6,83,182,255,16,105,162,254,137,212,81,255,180,184,134,1,39,222,164,255,221,105,251,1,239,112,125,0,63,7,97,0,63,104,227,255,148,58,12,0,90,60,224,255,84,212,252,0,79,215,168,0,248,221,199,1,115,121,1,0,36,172,120,0,32,162,187,255,57,107,49,255,147,42,21,0,106,198,43,1,57,74,87,0,126,203,81,255,129,135,195,0,140,31,177,0,221,139,194,0,3,222,215,0,131,68,231,0,177,86,178,254,124,151,180,0,184,124,38,1,70,163,17,0,249,251,181,1,42,55,227,0,226,161,44,0,23,236,110,0,51,149,142,1,93,5,236,0,218,183,106,254,67,24,77,0,40,245,209,255,222,121,153,0,165,57,30,0,83,125,60,0,70,38,82,1,229,6,188,0,109,222,157,255,55,118,63,255,205,151,186,0,227,33,149,255,254,176,246,1,227,177,227,0,34,106,163,254,176,43,79,0,106,95,78,1,185,241,122,255,185,14,61,0,36,1,202,0,13,178,162,255,247,11,132,0,161,230,92,1,65,1,185,255,212,50,165,1,141,146,64,255,158,242,218,0,21,164,125,0,213,139,122,1,67,71,87,0,203,158,178,1,151,92,43,0,152,111,5,255,39,3,239,255,217,255,250,255,176,63,71,255,74,245,77,1,250,174,18,255,34,49,227,255,246,46,251,255,154,35,48,1,125,157,61,255,106,36,78,255,97,236,153,0,136,187,120,255,113,134,171,255,19,213,217,254,216,94,209,255,252,5,61,0,94,3,202,0,3,26,183,255,64,191,43,255,30,23,21,0,129,141,77,255,102,120,7,1,194,76,140,0,188,175,52,255,17,81,148,0,232,86,55,1,225,48,172,0,134,42,42,255,238,50,47,0,169,18,254,0,20,147,87,255,14,195,239,255,69,247,23,0,238,229,128,255,177,49,112,0,168,98,251,255,121,71,248,0,243,8,145,254,246,227,153,255,219,169,177,254,251,139,165,255,12,163,185,255,164,40,171,255,153,159,27,254,243,109,91,255,222,24,112,1,18,214,231,0,107,157,181,254,195,147,0,255,194,99,104,255,89,140,190,255,177,66,126,254,106,185,66],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([49,218,31,0,252,174,158,0,188,79,230,1,238,41,224,0,212,234,8,1,136,11,181,0,166,117,83,255,68,195,94,0,46,132,201,0,240,152,88,0,164,57,69,254,160,224,42,255,59,215,67,255,119,195,141,255,36,180,121,254,207,47,8,255,174,210,223,0,101,197,68,255,255,82,141,1,250,137,233,0,97,86,133,1,16,80,69,0,132,131,159,0,116,93,100,0,45,141,139,0,152,172,157,255,90,43,91,0,71,153,46,0,39,16,112,255,217,136,97,255,220,198,25,254,177,53,49,0,222,88,134,255,128,15,60,0,207,192,169,255,192,116,209,255,106,78,211,1,200,213,183,255,7,12,122,254,222,203,60,255,33,110,199,254,251,106,117,0,228,225,4,1,120,58,7,255,221,193,84,254,112,133,27,0,189,200,201,255,139,135,150,0,234,55,176,255,61,50,65,0,152,108,169,255,220,85,1,255,112,135,227,0,162,26,186,0,207,96,185,254,244,136,107,0,93,153,50,1,198,97,151,0,110,11,86,255,143,117,174,255,115,212,200,0,5,202,183,0,237,164,10,254,185,239,62,0,236,120,18,254,98,123,99,255,168,201,194,254,46,234,214,0,191,133,49,255,99,169,119,0,190,187,35,1,115,21,45,255,249,131,72,0,112,6,123,255,214,49,181,254,166,233,34,0,92,197,102,254,253,228,205,255,3,59,201,1,42,98,46,0,219,37,35,255,169,195,38,0,94,124,193,1,156,43,223,0,95,72,133,254,120,206,191,0,122,197,239,255,177,187,79,255,254,46,2,1,250,167,190,0,84,129,19,0,203,113,166,255,249,31,189,254,72,157,202,255,208,71,73,255,207,24,72,0,10,16,18,1,210,81,76,255,88,208,192,255,126,243,107,255,238,141,120,255,199,121,234,255,137,12,59,255,36,220,123,255,148,179,60,254,240,12,29,0,66,0,97,1,36,30,38,255,115,1,93,255,96,103,231,255,197,158,59,1,192,164,240,0,202,202,57,255,24,174,48,0,89,77,155,1,42,76,215,0,244,151,233,0,23,48,81,0,239,127,52,254,227,130,37,255,248,116,93,1,124,132,118,0,173,254,192,1,6,235,83,255,110,175,231,1,251,28,182,0,129,249,93,254,84,184,128,0,76,181,62,0,175,128,186,0,100,53,136,254,109,29,226,0,221,233,58,1,20,99,74,0,0,22,160,0,134,13,21,0,9,52,55,255,17,89,140,0,175,34,59,0,84,165,119,255,224,226,234,255,7,72,166,255,123,115,255,1,18,214,246,0,250,7,71,1,217,220,185,0,212,35,76,255,38,125,175,0,189,97,210,0,114,238,44,255,41,188,169,254,45,186,154,0,81,92,22,0,132,160,193,0,121,208,98,255,13,81,44,255,203,156,82,0,71,58,21,255,208,114,191,254,50,38,147,0,154,216,195,0,101,25,18,0,60,250,215,255,233,132,235,255,103,175,142,1,16,14,92,0,141,31,110,254,238,241,45,255,153,217,239,1,97,168,47,255,249,85,16,1,28,175,62,255,57,254,54,0,222,231,126,0,166,45,117,254,18,189,96,255,228,76,50,0,200,244,94,0,198,152,120,1,68,34,69,255,12,65,160,254,101,19,90,0,167,197,120,255,68,54,185,255,41,218,188,0,113,168,48,0,88,105,189,1,26,82,32,255,185,93,164,1,228,240,237,255,66,182,53,0,171,197,92,255,107,9,233,1,199,120,144,255,78,49,10,255,109,170,105,255,90,4,31,255,28,244,113,255,74,58,11,0,62,220,246,255,121,154,200,254,144,210,178,255,126,57,129,1,43,250,14,255,101,111,28,1,47,86,241,255,61,70,150,255,53,73,5,255,30,26,158,0,209,26,86,0,138,237,74,0,164,95,188,0,142,60,29,254,162,116,248,255,187,175,160,0,151,18,16,0,209,111,65,254,203,134,39,255,88,108,49,255,131,26,71,255,221,27,215,254,104,105,93,255,31,236,31,254,135,0,211,255,143,127,110,1,212,73,229,0,233,67,167,254,195,1,208,255,132,17,221,255,51,217,90,0,67,235,50,255,223,210,143,0,179,53,130,1,233,106,198,0,217,173,220,255,112,229,24,255,175,154,93,254,71,203,246,255,48,66,133,255,3,136,230,255,23,221,113,254,235,111,213,0,170,120,95,254,251,221,2,0,45,130,158,254,105,94,217,255,242,52,180,254,213,68,45,255,104,38,28,0,244,158,76,0,161,200,96,255,207,53,13,255,187,67,148,0,170,54,248,0,119,162,178,255,83,20,11,0,42,42,192,1,146,159,163,255,183,232,111,0,77,229,21,255,71,53,143,0,27,76,34,0,246,136,47,255,219,39,182,255,92,224,201,1,19,142,14,255,69,182,241,255,163,118,245,0,9,109,106,1,170,181,247,255,78,47,238,255,84,210,176,255,213,107,139,0,39,38,11,0,72,21,150,0,72,130,69,0,205,77,155,254,142,133,21,0,71,111,172,254,226,42,59,255,179,0,215,1,33,128,241,0,234,252,13,1,184,79,8,0,110,30,73,255,246,141,189,0,170,207,218,1,74,154,69,255,138,246,49,255,155,32,100,0,125,74,105,255,90,85,61,255,35,229,177,255,62,125,193,255,153,86,188,1,73,120,212,0,209,123,246,254,135,209,38,255,151,58,44,1,92,69,214,255,14,12,88,255,252,153,166,255,253,207,112,255,60,78,83,255,227,124,110,0,180,96,252,255,53,117,33,254,164,220,82,255,41,1,27,255,38,164,166,255,164,99,169,254,61,144,70,255,192,166,18,0,107,250,66,0,197,65,50,0,1,179,18,255,255,104,1,255,43,153,35,255,80,111,168,0,110,175,168,0,41,105,45,255,219,14,205,255,164,233,140,254,43,1,118,0,233,67,195,0,178,82,159,255,138,87,122,255,212,238,90,255,144,35,124,254,25,140,164,0,251,215,44,254,133,70,107,255,101,227,80,254,92,169,55,0,215,42,49,0,114,180,85,255,33,232,27,1,172,213,25,0,62,176,123,254,32,133,24,255,225,191,62,0,93,70,153,0,181,42,104,1,22,191,224,255,200,200,140,255,249,234,37,0,149,57,141,0,195,56,208,255,254,130,70,255,32,173,240,255,29,220,199,0,110,100,115,255,132,229,249,0,228,233,223,255,37,216,209,254,178,177,209,255,183,45,165,254,224,97,114,0,137,97,168,255,225,222,172,0,165,13,49,1,210,235,204,255,252,4,28,254,70,160,151,0,232,190,52,254,83,248,93,255,62,215,77,1,175,175,179,255,160,50,66,0,121,48,208,0,63,169,209,255,0,210,200,0,224,187,44,1,73,162,82,0,9,176,143,255,19,76,193,255,29,59,167,1,24,43,154,0,28,190,190,0,141,188,129,0,232,235,203,255,234,0,109,255,54,65,159,0,60,88,232,255,121,253,150,254,252,233,131,255,198,110,41,1,83,77,71,255,200,22,59,254,106,253,242,255,21,12,207,255,237,66,189,0,90,198,202,1,225,172,127,0,53,22,202,0,56,230,132,0,1,86,183,0,109,190,42,0,243,68,174,1,109,228,154,0,200,177,122,1,35,160,183,255,177,48,85,255,90,218,169,255,248,152,78,0,202,254,110,0,6,52,43,0,142,98,65,255,63,145,22,0,70,106,93,0,232,138,107,1,110,179,61,255,211,129,218,1,242,209,92,0,35,90,217,1,182,143,106,255,116,101,217,255,114,250,221,255,173,204,6,0,60,150,163,0,73,172,44,255,239,110,80,255,237,76,153,254,161,140,249,0,149,232,229,0,133,31,40,255,174,164,119,0,113,51,214,0,129,228,2,254,64,34,243,0,107,227,244,255,174,106,200,255,84,153,70,1,50,35,16,0,250,74,216,254,236,189,66,255,153,249,13,0,230,178,4,255,221,41,238,0,118,227,121,255,94,87,140,254,254,119,92,0,73,239,246,254,117,87,128,0,19,211,145,255,177,46,252,0,229,91,246,1,69,128,247,255,202,77,54,1,8,11,9,255,153,96,166,0,217,214,173,255,134,192,2,1,0,207,0,0,189,174,107,1,140,134,100,0,158,193,243,1,182,102,171,0,235,154,51,0,142,5,123,255,60,168,89,1,217,14,92,255,19,214,5,1,211,167,254,0,44,6,202,254,120,18,236,255,15,113,184,255,184,223,139,0,40,177,119,254,182,123,90,255,176,165,176,0,247,77,194,0,27,234,120,0,231,0,214,255,59,39,30,0,125,99,145,255,150,68,68,1,141,222,248,0,153,123,210,255,110,127,152,255,229,33,214,1,135,221,197,0,137,97,2,0,12,143,204,255,81,41,188,0,115,79,130,255,94,3,132,0,152,175,187,255,124,141,10,255,126,192,179,255,11,103,198,0,149,6,45,0,219,85,187,1,230,18,178,255,72,182,152,0,3,198,184,255,128,112,224,1,97,161,230,0,254,99,38,255,58,159,197,0,151,66,219,0,59,69,143,255,185,112,249,0,119,136,47,255,123,130,132,0,168,71,95,255,113,176,40,1,232,185,173,0,207,93,117,1,68,157,108,255,102,5,147,254,49,97,33,0,89,65,111,254,247,30,163,255,124,217,221,1,102,250,216,0,198,174,75,254,57,55,18,0,227,5,236,1,229,213,173,0,201,109,218,1,49,233,239,0,30,55,158,1,25,178,106,0,155,111,188,1,94,126,140,0,215,31,238,1,77,240,16,0,213,242,25,1,38,71,168,0,205,186,93,254,49,211,140,255,219,0,180,255,134,118,165,0,160,147,134,255,110,186,35,255,198,243,42,0,243,146,119,0,134,235,163,1,4,241,135,255,193,46,193,254,103,180,79,255,225,4,184,254,242,118,130,0,146,135,176,1,234,111,30,0,69,66,213,254,41,96,123,0,121,94,42,255,178,191,195,255,46,130,42,0,117,84,8,255,233,49,214,254,238,122,109,0,6,71,89,1,236,211,123,0,244,13,48,254,119,148,14,0,114,28,86,255,75,237,25,255,145,229,16,254,129,100,53,255,134,150,120,254,168,157,50,0,23,72,104,255,224,49,14,0,255,123,22,255,151,185,151,255,170,80,184,1,134,182,20,0,41,100,101,1,153,33,16,0,76,154,111,1,86,206,234,255,192,160,164,254,165,123,93,255,1,216,164,254,67,17,175,255,169,11,59,255,158,41,61,255,73,188,14,255,195,6,137,255,22,147,29,255,20,103,3,255,246,130,227,255,122,40,128,0,226,47,24,254,35,36,32,0,152,186,183,255,69,202,20,0,195,133,195,0,222,51,247,0,169,171,94,1,183,0,160,255,64,205,18,1,156,83,15,255,197,58,249,254,251,89,110,255,50,10,88,254,51,43,216,0,98,242,198,1,245,151,113,0,171,236,194,1,197,31,199,255,229,81,38,1,41,59,20,0,253,104,230,0,152,93,14,255,246,242,146,254,214,169,240,255,240,102,108,254,160,167,236,0,154,218,188,0,150,233,202,255,27,19,250,1,2,71,133,255,175,12,63,1,145,183,198,0,104,120,115,255,130,251,247,0,17,212,167,255,62,123,132,255,247,100,189,0,155,223,152,0,143,197,33,0,155,59,44,255,150,93,240,1,127,3,87,255,95,71,207,1,167,85,1,255,188,152,116,255,10,23,23,0,137,195,93,1,54,98,97,0,240,0,168,255,148,188,127,0,134,107,151,0,76,253,171,0,90,132,192,0,146,22,54,0,224,66,54,254,230,186,229,255,39,182,196,0,148,251,130,255,65,131,108,254,128,1,160,0,169,49,167,254,199,254,148,255,251,6,131,0,187,254,129,255,85,82,62,0,178,23,58,255,254,132,5,0,164,213,39,0,134,252,146,254,37,53,81,255,155,134,82,0,205,167,238,255,94,45,180,255,132,40,161,0,254,111,112,1,54,75,217,0,179,230,221,1,235,94,191,255,23,243,48,1,202,145,203,255,39,118,42,255,117,141,253,0,254,0,222,0,43,251,50,0,54,169,234,1,80,68,208,0,148,203,243,254,145,7,135,0,6,254,0,0,252,185,127,0,98,8,129,255,38,35,72,255,211,36,220,1,40,26,89,0,168,64,197,254,3,222,239,255,2,83,215,254,180,159,105,0,58,115,194,0,186,116,106,255,229,247,219,255,129,118,193,0,202,174,183,1,166,161,72,0,201,107,147,254,237,136,74,0,233,230,106,1,105,111,168,0,64,224,30,1,1,229,3,0,102,151,175,255,194,238,228,255,254,250,212,0,187,237,121,0,67,251,96,1,197,30,11,0,183,95,204,0,205,89,138,0,64,221,37,1,255,223,30,255,178,48,211,255,241,200,90,255,167,209,96,255,57,130,221,0,46,114,200,255,61,184,66,0,55,182,24,254,110,182,33,0,171,190,232,255,114,94,31,0,18,221,8,0,47,231,254,0,255,112,83,0,118,15,215,255,173,25,40,254,192,193,31,255,238,21,146,255,171,193,118,255,101,234,53,254,131,212,112,0,89,192,107,1,8,208,27,0,181,217,15,255,231,149,232,0,140,236,126,0,144,9,199,255,12,79,181,254,147,182,202,255,19,109,182,255,49,212,225,0,74,163,203,0,175,233,148,0,26,112,51,0,193,193,9,255,15,135,249,0,150,227,130,0,204,0,219,1,24,242,205,0,238,208,117,255,22,244,112,0,26,229,34,0,37,80,188,255,38,45,206,254,240,90,225,255,29,3,47,255,42,224,76,0,186,243,167,0,32,132,15,255,5,51,125,0,139,135,24,0,6,241,219,0,172,229,133,255,246,214,50,0,231,11,207,255,191,126,83,1,180,163,170,255,245,56,24,1,178,164,211,255,3,16,202,1,98,57,118,255,141,131,89,254,33,51,24,0,243,149,91,255,253,52,14,0,35,169,67,254,49,30,88,255,179,27,36,255,165,140,183,0,58,189,151,0,88,31,0,0,75,169,66,0,66,101,199,255,24,216,199,1,121,196,26,255,14,79,203,254,240,226,81,255,94,28,10,255,83,193,240,255,204,193,131,255,94,15,86,0,218,40,157,0,51,193,209,0,0,242,177,0,102,185,247,0,158,109,116,0,38,135,91,0,223,175,149,0,220,66,1,255,86,60,232,0,25,96,37,255,225,122,162,1,215,187,168,255,158,157,46,0,56,171,162,0,232,240,101,1,122,22,9,0,51,9,21,255,53,25,238,255,217,30,232,254,125,169,148,0,13,232,102,0,148,9,37,0,165,97,141,1,228,131,41,0,222,15,243,255,254,18,17,0,6,60,237,1,106,3,113,0,59,132,189,0,92,112,30,0,105,208,213,0,48,84,179,255,187,121,231,254,27,216,109,255,162,221,107,254,73,239,195,255,250,31,57,255,149,135,89,255,185,23,115,1,3,163,157,255,18,112,250,0,25,57,187,255,161,96,164,0,47,16,243,0,12,141,251,254,67,234,184,255,41,18,161,0,175,6,96,255,160,172,52,254,24,176,183,255,198,193,85,1,124,121,137,255,151,50,114,255,220,203,60,255,207,239,5,1,0,38,107,255,55,238,94,254,70,152,94,0,213,220,77,1,120,17,69,255,85,164,190,255,203,234,81,0,38,49,37,254,61,144,124,0,137,78,49,254,168,247,48,0,95,164,252,0,105,169,135,0,253,228,134,0,64,166,75,0,81,73,20,255,207,210,10,0,234,106,150,255,94,34,90,255,254,159,57,254,220,133,99,0,139,147,180,254,24,23,185,0,41,57,30,255,189,97,76,0,65,187,223,255,224,172,37,255,34,62,95,1,231,144,240,0,77,106,126,254,64,152,91,0,29,98,155,0,226,251,53,255,234,211,5,255,144,203,222,255,164,176,221,254,5,231,24,0,179,122,205,0,36,1,134,255,125,70,151,254,97,228,252,0,172,129,23,254,48,90,209,255,150,224,82,1,84,134,30,0,241,196,46,0,103,113,234,255,46,101,121,254,40,124,250,255,135,45,242,254,9,249,168,255,140,108,131,255,143,163,171,0,50,173,199,255,88,222,142,255,200,95,158,0,142,192,163,255,7,117,135,0,111,124,22,0,236,12,65,254,68,38,65,255,227,174,254,0,244,245,38,0,240,50,208,255,161,63,250,0,60,209,239,0,122,35,19,0,14,33,230,254,2,159,113,0,106,20,127,255,228,205,96,0,137,210,174,254,180,212,144,255,89,98,154,1,34,88,139,0,167,162,112,1,65,110,197,0,241,37,169,0,66,56,131,255,10,201,83,254,133,253,187,255,177,112,45,254,196,251,0,0,196,250,151,255,238,232,214,255,150,209,205,0,28,240,118,0,71,76,83,1,236,99,91,0,42,250,131,1,96,18,64,255,118,222,35,0,113,214,203,255,122,119,184,255,66,19,36,0,204,64,249,0,146,89,139,0,134,62,135,1,104,233,101,0,188,84,26,0,49,249,129,0,208,214,75,255,207,130,77,255,115,175,235,0,171,2,137,255,175,145,186,1,55,245,135,255,154,86,181,1,100,58,246,255,109,199,60,255,82,204,134,255,215,49,230,1,140,229,192,255,222,193,251,255,81,136,15,255,179,149,162,255,23,39,29,255,7,95,75,254,191,81,222,0,241,81,90,255,107,49,201,255,244,211,157,0,222,140,149,255,65,219,56,254,189,246,90,255,178,59,157,1,48,219,52,0,98,34,215,0,28,17,187,255,175,169,24,0,92,79,161,255,236,200,194,1,147,143,234,0,229,225,7,1,197,168,14,0,235,51,53,1,253,120,174,0,197,6,168,255,202,117,171,0,163,21,206,0,114,85,90,255,15,41,10,255,194,19,99,0,65,55,216,254,162,146,116,0,50,206,212,255,64,146,29,255,158,158,131,1,100,165,130,255,172,23,129,255,125,53,9,255,15,193,18,1,26,49,11,255,181,174,201,1,135,201,14,255,100,19,149,0,219,98,79,0,42,99,143,254,96,0,48,255,197,249,83,254,104,149,79,255,235,110,136,254,82,128,44,255,65,41,36,254,88,211,10,0,187,121,187,0,98,134,199,0,171,188,179,254,210,11,238,255,66,123,130,254,52,234,61,0,48,113,23,254,6,86,120,255,119,178,245,0,87,129,201,0,242,141,209,0,202,114,85,0,148,22,161,0,103,195,48,0,25,49,171,255,138,67,130,0,182,73,122,254,148,24,130,0,211,229,154,0,32,155,158,0,84,105,61,0,177,194,9,255,166,89,86,1,54,83,187,0,249,40,117,255,109,3,215,255,53,146,44,1,63,47,179,0,194,216,3,254,14,84,136,0,136,177,13,255,72,243,186,255,117,17,125,255,211,58,211,255,93,79,223,0,90,88,245,255,139,209,111,255,70,222,47,0,10,246,79,255,198,217,178,0,227,225,11,1,78,126,179,255,62,43,126,0,103,148,35,0,129,8,165,254,245,240,148,0,61,51,142,0,81,208,134,0,15,137,115,255,211,119,236,255,159,245,248,255,2,134,136,255,230,139,58,1,160,164,254,0,114,85,141,255,49,166,182,255,144,70,84,1,85,182,7,0,46,53,93,0,9,166,161,255,55,162,178,255,45,184,188,0,146,28,44,254,169,90,49,0,120,178,241,1,14,123,127,255,7,241,199,1,189,66,50,255,198,143,101,254,189,243,135,255,141,24,24,254,75,97,87,0,118,251,154,1,237,54,156,0,171,146,207,255,131,196,246,255,136,64,113,1,151,232,57,0,240,218,115,0,49,61,27,255,64,129,73,1,252,169,27,255,40,132,10,1,90,201,193,255,252,121,240,1,186,206,41,0,43,198,97,0,145,100,183,0,204,216,80,254,172,150,65,0,249,229,196,254,104,123,73,255,77,104,96,254,130,180,8,0,104,123,57,0,220,202,229,255,102,249,211,0,86,14,232,255,182,78,209,0,239,225,164,0,106,13,32,255,120,73,17,255,134,67,233,0,83,254,181,0,183,236,112,1,48,64,131,255,241,216,243,255,65,193,226,0,206,241,100,254,100,134,166,255,237,202,197,0,55,13,81,0,32,124,102,255,40,228,177,0,118,181,31,1,231,160,134,255,119,187,202,0,0,142,60,255,128,38,189,255,166,201,150,0,207,120,26,1,54,184,172,0,12,242,204,254,133,66,230,0,34,38,31,1,184,112,80,0,32,51,165,254,191,243,55,0,58,73,146,254,155,167,205,255,100,104,152,255,197,254,207,255,173,19,247,0,238,10,202,0,239,151,242,0,94,59,39,255,240,29,102,255,10,92,154,255,229,84,219,255,161,129,80,0,208,90,204,1,240,219,174,255,158,102,145,1,53,178,76,255,52,108,168,1,83,222,107,0,211,36,109,0,118,58,56,0,8,29,22,0,237,160,199,0,170,209,157,0,137,71,47,0,143,86,32,0,198,242,2,0,212,48,136,1,92,172,186,0,230,151,105,1,96,191,229,0,138,80,191,254,240,216,130,255,98,43,6,254,168,196,49,0,253,18,91,1,144,73,121,0,61,146,39,1,63,104,24,255,184,165,112,254,126,235,98,0,80,213,98,255,123,60,87,255,82,140,245,1,223,120,173,255,15,198,134,1,206,60,239,0,231,234,92,255,33,238,19,255,165,113,142,1,176,119,38,0,160,43,166,254,239,91,105,0,107,61,194,1,25,4,68,0,15,139,51,0,164,132,106,255,34,116,46,254,168,95,197,0,137,212,23,0,72,156,58,0,137,112,69,254,150,105,154,255,236,201,157,0,23,212,154,255,136,82,227,254,226,59,221,255,95,149,192,0,81,118,52,255,33,43,215,1,14,147,75,255,89,156,121,254,14,18,79,0,147,208,139,1,151,218,62,255,156,88,8,1,210,184,98,255,20,175,123,255,102,83,229,0,220,65,116,1,150,250,4,255,92,142,220,255,34,247,66,255,204,225,179,254,151,81,151,0,71,40,236,255,138,63,62,0,6,79,240,255,183,185,181,0,118,50,27,0,63,227,192,0,123,99,58,1,50,224,155,255,17,225,223,254,220,224,77,255,14,44,123,1,141,128,175,0,248,212,200,0,150,59,183,255,147,97,29,0,150,204,181,0,253,37,71,0,145,85,119,0,154,200,186,0,2,128,249,255,83,24,124,0,14,87,143,0,168,51,245,1,124,151,231,255,208,240,197,1,124,190,185,0,48,58,246,0,20,233,232,0,125,18,98,255,13,254,31,255,245,177,130,255,108,142,35,0,171,125,242,254,140,12,34,255,165,161,162,0,206,205,101,0,247,25,34,1,100,145,57,0,39,70,57,0,118,204,203,255,242,0,162,0,165,244,30,0,198,116,226,0,128,111,153,255,140,54,182,1,60,122,15,255,155,58,57,1,54,50,198,0,171,211,29,255,107,138,167,255,173,107,199,255,109,161,193,0,89,72,242,255,206,115,89,255,250,254,142,254,177,202,94,255,81,89,50,0,7,105,66,255,25,254,255,254,203,64,23,255,79,222,108,255,39,249,75,0,241,124,50,0,239,152,133,0,221,241,105,0,147,151,98,0,213,161,121,254,242,49,137,0,233,37,249,254,42,183,27,0,184,119,230,255,217,32,163,255,208,251,228,1,137,62,131,255,79,64,9,254,94,48,113,0,17,138,50,254,193,255,22,0,247,18,197,1,67,55,104,0,16,205,95,255,48,37,66,0,55,156,63,1,64,82,74,255,200,53,71,254,239,67,125,0,26,224,222,0,223,137,93,255,30,224,202,255,9,220,132,0,198,38,235,1,102,141,86,0,60,43,81,1,136,28,26,0,233,36,8,254,207,242,148,0,164,162,63,0,51,46,224,255,114,48,79,255,9,175,226,0,222,3,193,255,47,160,232,255,255,93,105,254,14,42,230,0,26,138,82,1,208,43,244,0,27,39,38,255,98,208,127,255,64,149,182,255,5,250,209,0,187,60,28,254,49,25,218,255,169,116,205,255,119,18,120,0,156,116,147,255,132,53,109,255,13,10,202,0,110,83,167,0,157,219,137,255,6,3,130,255,50,167,30,255,60,159,47,255,129,128,157,254,94,3,189,0,3,166,68,0,83,223,215,0,150,90,194,1,15,168,65,0,227,83,51,255,205,171,66,255,54,187,60,1,152,102,45,255,119,154,225,0,240,247,136,0,100,197,178,255,139,71,223,255,204,82,16,1,41,206,42,255,156,192,221,255,216,123,244,255,218,218,185,255,187,186,239,255,252,172,160,255,195,52,22,0,144,174,181,254,187,100,115,255,211,78,176,255,27,7,193,0,147,213,104,255,90,201,10,255,80,123,66,1,22,33,186,0,1,7,99,254,30,206,10,0,229,234,5,0,53,30,210,0,138,8,220,254,71,55,167,0,72,225,86,1,118,190,188,0,254,193,101,1,171,249,172,255,94,158,183,254,93,2,108,255,176,93,76,255,73,99,79,255,74,64,129,254,246,46,65,0,99,241,127,254,246,151,102,255,44,53,208,254,59,102,234,0,154,175,164,255,88,242,32,0,111,38,1,0,255,182,190,255,115,176,15,254,169,60,129,0,122,237,241,0,90,76,63,0,62,74,120,255,122,195,110,0,119,4,178,0,222,242,210,0,130,33,46,254,156,40,41,0,167,146,112,1,49,163,111,255,121,176,235,0,76,207,14,255,3,25,198,1,41,235,213,0,85,36,214,1,49,92,109,255,200,24,30,254,168,236,195,0,145,39,124,1,236,195,149,0,90,36,184,255,67,85,170,255,38,35,26,254,131,124,68,255,239,155,35,255,54,201,164,0,196,22,117,255,49,15,205,0,24,224,29,1,126,113,144,0,117,21,182,0,203,159,141,0,223,135,77,0,176,230,176,255,190,229,215,255,99,37,181,255,51,21,138,255,25,189,89,255,49,48,165,254,152,45,247,0,170,108,222,0,80,202,5,0,27,69,103,254,204,22,129,255,180,252,62,254,210,1,91,255,146,110,254,255,219,162,28,0,223,252,213,1,59,8,33,0,206,16,244,0,129,211,48,0,107,160,208,0,112,59,209,0,109,77,216,254,34,21,185,255,246,99,56,255,179,139,19,255,185,29,50,255,84,89,19,0,74,250,98,255,225,42,200,255,192,217,205,255,210,16,167,0,99,132,95,1,43,230,57,0,254,11,203,255,99,188,63,255,119,193,251,254,80,105,54,0,232,181,189,1,183,69,112,255,208,171,165,255,47,109,180,255,123,83,165,0,146,162,52,255,154,11,4,255,151,227,90,255,146,137,97,254,61,233,41,255,94,42,55,255,108,164,236,0,152,68,254,0,10,140,131,255,10,106,79,254,243,158,137,0,67,178,66,254,177,123,198,255,15,62,34,0,197,88,42,255,149,95,177,255,152,0,198,255,149,254,113,255,225,90,163,255,125,217,247,0,18,17,224,0,128,66,120,254,192,25,9,255,50,221,205,0,49,212,70,0,233,255,164,0,2,209,9,0,221,52,219,254,172,224,244,255,94,56,206,1,242,179,2,255,31,91,164,1,230,46,138,255,189,230,220,0,57,47,61,255,111,11,157,0,177,91,152,0,28,230,98,0,97,87,126,0,198,89,145,255,167,79,107,0,249,77,160,1,29,233,230,255,150,21,86,254,60,11,193,0,151,37,36,254,185,150,243,255,228,212,83,1,172,151,180,0,201,169,155,0,244,60,234,0,142,235,4,1,67,218,60,0,192,113,75,1,116,243,207,255,65,172,155,0,81,30,156,255,80,72,33,254,18,231,109,255,142,107,21,254,125,26,132,255,176,16,59,255,150,201,58,0,206,169,201,0,208,121,226,0,40,172,14,255,150,61,94,255,56,57,156,255,141,60,145,255,45,108,149,255,238,145,155,255,209,85,31,254,192,12,210,0,99,98,93,254,152,16,151,0,225,185,220,0,141,235,44,255,160,172,21,254,71,26,31,255,13,64,93,254,28,56,198,0,177,62,248,1,182,8,241,0,166,101,148,255,78,81,133,255,129,222,215,1,188,169,129,255,232,7,97,0,49,112,60,255,217,229,251,0,119,108,138,0,39,19,123,254,131,49,235,0,132,84,145,0,130,230,148,255,25,74,187,0,5,245,54,255,185,219,241,1,18,194,228,255,241,202,102,0,105,113,202,0,155,235,79,0,21,9,178,255,156,1,239,0,200,148,61,0,115,247,210,255,49,221,135,0,58,189,8,1,35,46,9,0,81,65,5,255,52,158,185,255,125,116,46,255,74,140,13,255,210,92,172,254,147,23,71,0,217,224,253,254,115,108,180,255,145,58,48,254,219,177,24,255,156,255,60,1,154,147,242,0,253,134,87,0,53,75,229,0,48,195,222,255,31,175,50,255,156,210,120,255,208,35,222,255,18,248,179,1,2,10,101,255,157,194,248,255,158,204,101,255,104,254,197,255,79,62,4,0,178,172,101,1,96,146,251,255,65,10,156,0,2,137,165,255,116,4,231,0,242,215,1,0,19,35,29,255,43,161,79,0,59,149,246,1,251,66,176,0,200,33,3,255,80,110,142,255,195,161,17,1,228,56,66,255,123,47,145,254,132,4,164,0,67,174,172,0,25,253,114,0,87,97,87,1,250,220,84,0,96,91,200,255,37,125,59,0,19,65,118,0,161,52,241,255,237,172,6,255,176,191,255,255,1,65,130,254,223,190,230,0,101,253,231,255,146,35,109,0,250,29,77,1,49,0,19,0,123,90,155,1,22,86,32,255,218,213,65,0,111,93,127,0,60,93,169,255,8,127,182,0,17,186,14,254,253,137,246,255,213,25,48,254,76,238,0,255,248,92,70,255,99,224,139,0,184,9,255,1,7,164,208,0,205,131,198,1,87,214,199,0,130,214,95,0,221,149,222,0,23,38,171,254,197,110,213,0,43,115,140,254,215,177,118,0,96,52,66,1,117,158,237,0,14,64,182,255,46,63,174,255,158,95,190,255,225,205,177,255,43,5,142,255,172,99,212,255,244,187,147,0,29,51,153,255,228,116,24,254,30,101,207,0,19,246,150,255,134,231,5,0,125,134,226,1,77,65,98,0,236,130,33,255,5,110,62,0,69,108,127,255,7,113,22,0,145,20,83,254,194,161,231,255,131,181,60,0,217,209,177,255,229,148,212,254,3,131,184,0,117,177,187,1,28,14,31,255,176,102,80,0,50,84,151,255,125,31,54,255,21,157,133,255,19,179,139,1,224,232,26,0,34,117,170,255,167,252,171,255,73,141,206,254,129,250,35,0,72,79,236,1,220,229,20,255,41,202,173,255,99,76,238,255,198,22,224,255,108,198,195,255,36,141,96,1,236,158,59,255,106,100,87,0,110,226,2,0,227,234,222,0,154,93,119,255,74,112,164,255,67,91,2,255,21,145,33,255,102,214,137,255,175,230,103,254,163,246,166,0,93,247,116,254,167,224,28,255,220,2,57,1,171,206,84,0,123,228,17,255,27,120,119,0,119,11,147,1,180,47,225,255,104,200,185,254,165,2,114,0,77,78,212,0,45,154,177,255,24,196,121,254,82,157,182,0,90,16,190,1,12,147,197,0,95,239,152,255,11,235,71,0,86,146,119,255,172,134,214,0,60,131,196,0,161,225,129,0,31,130,120,254,95,200,51,0,105,231,210,255,58,9,148,255,43,168,221,255,124,237,142,0,198,211,50,254,46,245,103,0,164,248,84,0,152,70,208,255,180,117,177,0,70,79,185,0,243,74,32,0,149,156,207,0,197,196,161,1,245,53,239,0,15,93,246,254,139,240,49,255,196,88,36,255,162,38,123,0,128,200,157,1,174,76,103,255,173,169,34,254,216,1,171,255,114,51,17,0,136,228,194,0,110,150,56,254,106,246,159,0,19,184,79,255,150,77,240,255,155,80,162,0,0,53,169,255,29,151,86,0,68,94,16,0,92,7,110,254,98,117,149,255,249,77,230,255,253,10,140,0,214,124,92,254,35,118,235,0,89,48,57,1,22,53,166,0,184,144,61,255,179,255,194,0,214,248,61,254,59,110,246,0,121,21,81,254,166,3,228,0,106,64,26,255,69,232,134,255,242,220,53,254,46,220,85,0,113,149,247,255,97,179,103,255,190,127,11,0,135,209,182,0,95,52,129,1,170,144,206,255,122,200,204,255,168,100,146,0,60,144,149,254,70,60,40,0,122,52,177,255,246,211,101,255,174,237,8,0,7,51,120,0,19,31,173,0,126,239,156,255,143,189,203,0,196,128,88,255,233,133,226,255,30,125,173,255,201,108,50,0,123,100,59,255,254,163,3,1,221,148,181,255,214,136,57,254,222,180,137,255,207,88,54,255,28,33,251,255,67,214,52,1,210,208,100,0,81,170,94,0,145,40,53,0,224,111,231,254,35,28,244,255,226,199,195,254,238,17,230,0,217,217,164,254,169,157,221,0,218,46,162,1,199,207,163,255,108,115,162,1,14,96,187,255,118,60,76,0,184,159,152,0,209,231,71,254,42,164,186,255,186,153,51,254,221,171,182,255,162,142,173,0,235,47,193,0,7,139,16,1,95,164,64,255,16,221,166,0,219,197,16,0,132,29,44,255,100,69,117,255,60,235,88,254,40,81,173,0,71,190,61,255,187,88,157,0,231,11,23,0,237,117,164,0,225,168,223,255,154,114,116,255,163,152,242,1,24,32,170,0,125,98,113,254,168,19,76,0,17,157,220,254,155,52,5,0,19,111,161,255,71,90,252,255,173,110,240,0,10,198,121,255,253,255,240,255,66,123,210,0,221,194,215,254,121,163,17,255,225,7,99,0,190,49,182,0,115,9,133,1,232,26,138,255,213,68,132,0,44,119,122,255,179,98,51,0,149,90,106,0,71,50,230,255,10,153,118,255,177,70,25,0,165,87,205,0,55,138,234,0,238,30,97,0,113,155,207,0,98,153,127,0,34,107,219,254,117,114,172,255,76,180,255,254,242,57,179,255,221,34,172,254,56,162,49,255,83,3,255,255,113,221,189,255,188,25,228,254,16,88,89,255,71,28,198,254,22,17,149,255,243,121,254,255,107,202,99,255,9,206,14,1,220,47,153,0,107,137,39,1,97,49,194,255,149,51,197,254,186,58,11,255,107,43,232,1,200,6,14,255,181,133,65,254,221,228,171,255,123,62,231,1,227,234,179,255,34,189,212,254,244,187,249,0,190,13,80,1,130,89,1,0,223,133,173,0,9,222,198,255,66,127,74,0,167,216,93,255,155,168,198,1,66,145,0,0,68,102,46,1,172,90,154,0,216,128,75,255,160,40,51,0,158,17,27,1,124,240,49,0,236,202,176,255,151,124,192,255,38,193,190,0,95,182,61,0,163,147,124,255,255,165,51,255,28,40,17,254,215,96,78,0,86,145,218,254,31,36,202,255,86,9,5,0,111,41,200,255,237,108,97,0,57,62,44,0,117,184,15,1,45,241,116,0,152,1,220,255,157,165,188,0,250,15,131,1,60,44,125,255,65,220,251,255,75,50,184,0,53,90,128,255,231,80,194,255,136,129,127,1,21,18,187,255,45,58,161,255,71,147,34,0,174,249,11,254,35,141,29,0,239,68,177,255,115,110,58,0,238,190,177,1,87,245,166,255,190,49,247,255,146,83,184,255,173,14,39,255,146,215,104,0,142,223,120,0,149,200,155,255,212,207,145,1,16,181,217,0,173,32,87,255,255,35,181,0,119,223,161,1,200,223,94,255,70,6,186,255,192,67,85,255,50,169,152,0,144,26,123,255,56,243,179,254,20,68,136,0,39,140,188,254,253,208,5,255,200,115,135,1,43,172,229,255,156,104,187,0,151,251,167,0,52,135,23,0,151,153,72,0,147,197,107,254,148,158,5,255,238,143,206,0,126,153,137,255,88,152,197,254,7,68,167,0,252,159,165,255,239,78,54,255,24,63,55,255,38,222,94,0,237,183,12,255,206,204,210,0,19,39,246,254,30,74,231,0,135,108,29,1,179,115,0,0,117,118,116,1,132,6,252,255,145,129,161,1,105,67,141,0,82,37,226,255,238,226,228,255,204,214,129,254,162,123,100,255,185,121,234,0,45,108,231,0,66,8,56,255,132,136,128,0,172,224,66,254,175,157,188,0,230,223,226,254,242,219,69,0,184,14,119,1,82,162,56,0,114,123,20,0,162,103,85,255,49,239,99,254,156,135,215,0,111,255,167,254,39,196,214,0,144,38,79,1,249,168,125,0,155,97,156,255,23,52,219,255,150,22,144,0,44,149,165,255,40,127,183,0,196,77,233,255,118,129,210,255,170,135,230,255,214,119,198,0,233,240,35,0,253,52,7,255,117,102,48,255,21,204,154,255,179,136,177,255,23,2,3,1,149,130,89,255,252,17,159,1,70,60,26,0,144,107,17,0,180,190,60,255,56,182,59,255,110,71,54,255,198,18,129,255,149,224,87,255,223,21,152,255,138,22,182,255,250,156,205,0,236,45,208,255,79,148,242,1,101,70,209,0,103,78,174,0,101,144,172,255,152,136,237,1,191,194,136,0,113,80,125,1,152,4,141,0,155,150,53,255,196,116,245,0,239,114,73,254,19,82,17,255,124,125,234,255,40,52,191,0,42,210,158,255,155,132,165,0,178,5,42,1,64,92,40,255,36,85,77,255,178,228,118,0,137,66,96,254,115,226,66,0,110,240,69,254,151,111,80,0,167,174,236,255,227,108,107,255,188,242,65,255,183,81,255,0,57,206,181,255,47,34,181,255,213,240,158,1,71,75,95,0,156,40,24,255,102,210,81,0,171,199,228,255,154,34,41,0,227,175,75,0,21,239,195,0,138,229,95,1,76,192,49,0,117,123,87,1,227,225,130,0,125,62,63,255,2,198,171,0,254,36,13,254,145,186,206,0,148,255,244,255,35,0,166,0,30,150,219,1,92,228,212,0,92,198,60,254,62,133,200,255,201,41,59,0,125,238,109,255,180,163,238,1,140,122,82,0,9,22,88,255,197,157,47,255,153,94,57,0,88,30,182,0,84,161,85,0,178,146,124,0,166,166,7,255,21,208,223,0,156,182,242,0,155,121,185,0,83,156,174,254,154,16,118,255,186,83,232,1,223,58,121,255,29,23,88,0,35,125,127,255,170,5,149,254,164,12,130,255,155,196,29,0,161,96,136,0,7,35,29,1,162,37,251,0,3,46,242,255,0,217,188,0,57,174,226,1,206,233,2,0,57,187,136,254,123,189,9,255,201,117,127,255,186,36,204,0,231,25,216,0,80,78,105,0,19,134,129,255,148,203,68,0,141,81,125,254,248,165,200,255,214,144,135,0,151,55,166,255,38,235,91,0,21,46,154,0,223,254,150,255,35,153,180,255,125,176,29,1,43,98,30,255,216,122,230,255,233,160,12,0,57,185,12,254,240,113,7,255,5,9,16,254,26,91,108,0,109,198,203,0,8,147,40,0,129,134,228,255,124,186,40,255,114,98,132,254,166,132,23,0,99,69,44,0,9,242,238,255,184,53,59,0,132,129,102,255,52,32,243,254,147,223,200,255,123,83,179,254,135,144,201,255,141,37,56,1,151,60,227,255,90,73,156,1,203,172,187,0,80,151,47,255,94,137,231,255,36,191,59,255,225,209,181,255,74,215,213,254,6,118,179,255,153,54,193,1,50,0,231,0,104,157,72,1,140,227,154,255,182,226,16,254,96,225,92,255,115,20,170,254,6,250,78,0,248,75,173,255,53,89,6,255,0,180,118,0,72,173,1,0,64,8,206,1,174,133,223,0,185,62,133,255,214,11,98,0,197,31,208,0,171,167,244,255,22,231,181,1,150,218,185,0,247,169,97,1,165,139,247,255,47,120,149,1,103,248,51,0,60,69,28,254,25,179,196,0,124,7,218,254,58,107,81,0,184,233,156,255,252,74,36,0,118,188,67,0,141,95,53,255,222,94,165,254,46,61,53,0,206,59,115,255,47,236,250,255,74,5,32,1,129,154,238,255,106,32,226,0,121,187,61,255,3,166,241,254,67,170,172,255,29,216,178,255,23,201,252,0,253,110,243,0,200,125,57,0,109,192,96,255,52,115,238,0,38,121,243,255,201,56,33,0,194,118,130,0,75,96,25,255,170,30,230,254,39,63,253,0,36,45,250,255,251,1,239,0,160,212,92,1,45,209,237,0,243,33,87,254,237,84,201,255,212,18,157,254,212,99,127,255,217,98,16,254,139,172,239,0,168,201,130,255,143,193,169,255,238,151,193,1,215,104,41,0,239,61,165,254,2,3,242,0,22,203,177,254,177,204,22,0,149,129,213,254,31,11,41,255,0,159,121,254,160,25,114,255,162,80,200,0,157,151,11,0,154,134,78,1,216,54,252,0,48,103,133,0,105,220,197,0,253,168,77,254,53,179,23,0,24,121,240,1,255,46,96,255,107,60,135,254,98,205,249,255,63,249,119,255,120,59,211,255,114,180,55,254,91,85,237,0,149,212,77,1,56,73,49,0,86,198,150,0,93,209,160,0,69,205,182,255,244,90,43,0,20,36,176,0,122,116,221,0,51,167,39,1,231,1,63,255,13,197,134,0,3,209,34,255,135,59,202,0,167,100,78,0,47,223,76,0,185,60,62,0,178,166,123,1,132,12,161,255,61,174,43,0,195,69,144,0,127,47,191,1,34,44,78,0,57,234,52,1,255,22,40,255,246,94,146,0,83,228,128,0,60,78,224,255,0,96,210,255,153,175,236,0,159,21,73,0,180,115,196,254,131,225,106,0,255,167,134,0,159,8,112,255,120,68,194,255,176,196,198,255,118,48,168,255,93,169,1,0,112,200,102,1,74,24,254,0,19,141,4,254,142,62,63,0,131,179,187,255,77,156,155,255,119,86,164,0,170,208,146,255,208,133,154,255,148,155,58,255,162,120,232,254,252,213,155,0,241,13,42,0,94,50,131,0,179,170,112,0,140,83,151,255,55,119,84,1,140,35,239,255,153,45,67,1,236,175,39,0,54,151,103,255,158,42,65,255,196,239,135,254,86,53,203,0,149,97,47,254,216,35,17,255,70,3,70,1,103,36,90,255,40,26,173,0,184,48,13,0,163,219,217,255,81,6,1,255,221,170,108,254,233,208,93,0,100,201,249,254,86,36,35,255,209,154,30,1,227,201,251,255,2,189,167,254,100,57,3,0,13,128,41,0,197,100,75,0,150,204,235,255,145,174,59,0,120,248,149,255,85,55,225,0,114,210,53,254,199,204,119,0,14,247,74,1,63,251,129,0,67,104,151,1,135,130,80,0,79,89,55,255,117,230,157,255,25,96,143,0,213,145,5,0,69,241,120,1,149,243,95,255,114,42,20,0,131,72,2,0,154,53,20,255,73,62,109,0,196,102,152,0,41,12,204,255,122,38,11,1,250,10,145,0,207,125,148,0,246,244,222,255,41,32,85,1,112,213,126,0,162,249,86,1,71,198,127,255,81,9,21,1,98,39,4,255,204,71,45,1,75,111,137,0,234,59,231,0,32,48,95,255,204,31,114,1,29,196,181,255,51,241,167,254,93,109,142,0,104,144,45,0,235,12,181,255,52,112,164,0,76,254,202,255,174,14,162,0,61,235,147,255,43,64,185,254,233,125,217,0,243,88,167,254,74,49,8,0,156,204,66,0,124,214,123,0,38,221,118,1,146,112,236,0,114,98,177,0,151,89,199,0,87,197,112,0,185,149,161,0,44,96,165,0,248,179,20,255,188,219,216,254,40,62,13,0,243,142,141,0,229,227,206,255,172,202,35,255,117,176,225,255,82,110,38,1,42,245,14,255,20,83,97,0,49,171,10,0,242,119,120,0,25,232,61,0,212,240,147,255,4,115,56,255,145,17,239,254,202,17,251,255,249,18,245,255,99,117,239,0,184,4,179,255,246,237,51,255,37,239,137,255,166,112,166,255,81,188,33,255,185,250,142,255,54,187,173,0,208,112,201,0,246,43,228,1,104,184,88,255,212,52,196,255,51,117,108,255,254,117,155,0,46,91,15,255,87,14,144,255,87,227,204,0,83,26,83,1,159,76,227,0,159,27,213,1,24,151,108,0,117,144,179,254,137,209,82,0,38,159,10,0,115,133,201,0,223,182,156,1,110,196,93,255,57,60,233,0,5,167,105,255,154,197,164,0,96,34,186,255,147,133,37,1,220,99,190,0,1,167,84,255,20,145,171,0,194,197,251,254,95,78,133,255,252,248,243,255,225,93,131,255,187,134,196,255,216,153,170,0,20,118,158,254,140,1,118,0,86,158,15,1,45,211,41,255,147,1,100,254,113,116,76,255,211,127,108,1,103,15,48,0,193,16,102,1,69,51,95,255,107,128,157,0,137,171,233,0,90,124,144,1,106,161,182,0,175,76,236,1,200,141,172,255,163,58,104,0,233,180,52,255,240,253,14,255,162,113,254,255,38,239,138,254,52,46,166,0,241,101,33,254,131,186,156,0,111,208,62,255,124,94,160,255,31,172,254,0,112,174,56,255,188,99,27,255,67,138,251,0,125,58,128,1,156,152,174,255,178,12,247,255,252,84,158,0,82,197,14,254,172,200,83,255,37,39,46,1,106,207,167,0,24,189,34,0,131,178,144,0,206,213,4,0,161,226,210,0,72,51,105,255,97,45,187,255,78,184,223,255,176,29,251,0,79,160,86,255,116,37,178,0,82,77,213,1,82,84,141,255,226,101,212,1,175,88,199,255,245,94,247,1,172,118,109,255,166,185,190,0,131,181,120,0,87,254,93,255,134,240,73,255,32,245,143,255,139,162,103,255,179,98,18,254,217,204,112,0,147,223,120,255,53,10,243,0,166,140,150,0,125,80,200,255,14,109,219,255,91,218,1,255,252,252,47,254,109,156,116,255,115,49,127,1,204,87,211,255,148,202,217,255,26,85,249,255,14,245,134,1,76,89,169,255,242,45,230,0,59,98,172,255,114,73,132,254,78,155,49,255,158,126,84,0,49,175,43,255,16,182,84,255,157,103,35,0,104,193,109,255,67,221,154],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([201,172,1,254,8,162,88,0,165,1,29,255,125,155,229,255,30,154,220,1,103,239,92,0,220,1,109,255,202,198,1,0,94,2,142,1,36,54,44,0,235,226,158,255,170,251,214,255,185,77,9,0,97,74,242,0,219,163,149,255,240,35,118,255,223,114,88,254,192,199,3,0,106,37,24,255,201,161,118,255,97,89,99,1,224,58,103,255,101,199,147,254,222,60,99,0,234,25,59,1,52,135,27,0,102,3,91,254,168,216,235,0,229,232,136,0,104,60,129,0,46,168,238,0,39,191,67,0,75,163,47,0,143,97,98,255,56,216,168,1,168,233,252,255,35,111,22,255,92,84,43,0,26,200,87,1,91,253,152,0,202,56,70,0,142,8,77,0,80,10,175,1,252,199,76,0,22,110,82,255,129,1,194,0,11,128,61,1,87,14,145,255,253,222,190,1,15,72,174,0,85,163,86,254,58,99,44,255,45,24,188,254,26,205,15,0,19,229,210,254,248,67,195,0,99,71,184,0,154,199,37,255,151,243,121,255,38,51,75,255,201,85,130,254,44,65,250,0,57,147,243,254,146,43,59,255,89,28,53,0,33,84,24,255,179,51,18,254,189,70,83,0,11,156,179,1,98,134,119,0,158,111,111,0,119,154,73,255,200,63,140,254,45,13,13,255,154,192,2,254,81,72,42,0,46,160,185,254,44,112,6,0,146,215,149,1,26,176,104,0,68,28,87,1,236,50,153,255,179,128,250,254,206,193,191,255,166,92,137,254,53,40,239,0,210,1,204,254,168,173,35,0,141,243,45,1,36,50,109,255,15,242,194,255,227,159,122,255,176,175,202,254,70,57,72,0,40,223,56,0,208,162,58,255,183,98,93,0,15,111,12,0,30,8,76,255,132,127,246,255,45,242,103,0,69,181,15,255,10,209,30,0,3,179,121,0,241,232,218,1,123,199,88,255,2,210,202,1,188,130,81,255,94,101,208,1,103,36,45,0,76,193,24,1,95,26,241,255,165,162,187,0,36,114,140,0,202,66,5,255,37,56,147,0,152,11,243,1,127,85,232,255,250,135,212,1,185,177,113,0,90,220,75,255,69,248,146,0,50,111,50,0,92,22,80,0,244,36,115,254,163,100,82,255,25,193,6,1,127,61,36,0,253,67,30,254,65,236,170,255,161,17,215,254,63,175,140,0,55,127,4,0,79,112,233,0,109,160,40,0,143,83,7,255,65,26,238,255,217,169,140,255,78,94,189,255,0,147,190,255,147,71,186,254,106,77,127,255,233,157,233,1,135,87,237,255,208,13,236,1,155,109,36,255,180,100,218,0,180,163,18,0,190,110,9,1,17,63,123,255,179,136,180,255,165,123,123,255,144,188,81,254,71,240,108,255,25,112,11,255,227,218,51,255,167,50,234,255,114,79,108,255,31,19,115,255,183,240,99,0,227,87,143,255,72,217,248,255,102,169,95,1,129,149,149,0,238,133,12,1,227,204,35,0,208,115,26,1,102,8,234,0,112,88,143,1,144,249,14,0,240,158,172,254,100,112,119,0,194,141,153,254,40,56,83,255,121,176,46,0,42,53,76,255,158,191,154,0,91,209,92,0,173,13,16,1,5,72,226,255,204,254,149,0,80,184,207,0,100,9,122,254,118,101,171,255,252,203,0,254,160,207,54,0,56,72,249,1,56,140,13,255,10,64,107,254,91,101,52,255,225,181,248,1,139,255,132,0,230,145,17,0,233,56,23,0,119,1,241,255,213,169,151,255,99,99,9,254,185,15,191,255,173,103,109,1,174,13,251,255,178,88,7,254,27,59,68,255,10,33,2,255,248,97,59,0,26,30,146,1,176,147,10,0,95,121,207,1,188,88,24,0,185,94,254,254,115,55,201,0,24,50,70,0,120,53,6,0,142,66,146,0,228,226,249,255,104,192,222,1,173,68,219,0,162,184,36,255,143,102,137,255,157,11,23,0,125,45,98,0,235,93,225,254,56,112,160,255,70,116,243,1,153,249,55,255,129,39,17,1,241,80,244,0,87,69,21,1,94,228,73,255,78,66,65,255,194,227,231,0,61,146,87,255,173,155,23,255,112,116,219,254,216,38,11,255,131,186,133,0,94,212,187,0,100,47,91,0,204,254,175,255,222,18,215,254,173,68,108,255,227,228,79,255,38,221,213,0,163,227,150,254,31,190,18,0,160,179,11,1,10,90,94,255,220,174,88,0,163,211,229,255,199,136,52,0,130,95,221,255,140,188,231,254,139,113,128,255,117,171,236,254,49,220,20,255,59,20,171,255,228,109,188,0,20,225,32,254,195,16,174,0,227,254,136,1,135,39,105,0,150,77,206,255,210,238,226,0,55,212,132,254,239,57,124,0,170,194,93,255,249,16,247,255,24,151,62,255,10,151,10,0,79,139,178,255,120,242,202,0,26,219,213,0,62,125,35,255,144,2,108,255,230,33,83,255,81,45,216,1,224,62,17,0,214,217,125,0,98,153,153,255,179,176,106,254,131,93,138,255,109,62,36,255,178,121,32,255,120,252,70,0,220,248,37,0,204,88,103,1,128,220,251,255,236,227,7,1,106,49,198,255,60,56,107,0,99,114,238,0,220,204,94,1,73,187,1,0,89,154,34,0,78,217,165,255,14,195,249,255,9,230,253,255,205,135,245,0,26,252,7,255,84,205,27,1,134,2,112,0,37,158,32,0,231,91,237,255,191,170,204,255,152,7,222,0,109,192,49,0,193,166,146,255,232,19,181,255,105,142,52,255,103,16,27,1,253,200,165,0,195,217,4,255,52,189,144,255,123,155,160,254,87,130,54,255,78,120,61,255,14,56,41,0,25,41,125,255,87,168,245,0,214,165,70,0,212,169,6,255,219,211,194,254,72,93,164,255,197,33,103,255,43,142,141,0,131,225,172,0,244,105,28,0,68,68,225,0,136,84,13,255,130,57,40,254,139,77,56,0,84,150,53,0,54,95,157,0,144,13,177,254,95,115,186,0,117,23,118,255,244,166,241,255,11,186,135,0,178,106,203,255,97,218,93,0,43,253,45,0,164,152,4,0,139,118,239,0,96,1,24,254,235,153,211,255,168,110,20,255,50,239,176,0,114,41,232,0,193,250,53,0,254,160,111,254,136,122,41,255,97,108,67,0,215,152,23,255,140,209,212,0,42,189,163,0,202,42,50,255,106,106,189,255,190,68,217,255,233,58,117,0,229,220,243,1,197,3,4,0,37,120,54,254,4,156,134,255,36,61,171,254,165,136,100,255,212,232,14,0,90,174,10,0,216,198,65,255,12,3,64,0,116,113,115,255,248,103,8,0,231,125,18,255,160,28,197,0,30,184,35,1,223,73,249,255,123,20,46,254,135,56,37,255,173,13,229,1,119,161,34,255,245,61,73,0,205,125,112,0,137,104,134,0,217,246,30,255,237,142,143,0,65,159,102,255,108,164,190,0,219,117,173,255,34,37,120,254,200,69,80,0,31,124,218,254,74,27,160,255,186,154,199,255,71,199,252,0,104,81,159,1,17,200,39,0,211,61,192,1,26,238,91,0,148,217,12,0,59,91,213,255,11,81,183,255,129,230,122,255,114,203,145,1,119,180,66,255,72,138,180,0,224,149,106,0,119,82,104,255,208,140,43,0,98,9,182,255,205,101,134,255,18,101,38,0,95,197,166,255,203,241,147,0,62,208,145,255,133,246,251,0,2,169,14,0,13,247,184,0,142,7,254,0,36,200,23,255,88,205,223,0,91,129,52,255,21,186,30,0,143,228,210,1,247,234,248,255,230,69,31,254,176,186,135,255,238,205,52,1,139,79,43,0,17,176,217,254,32,243,67,0,242,111,233,0,44,35,9,255,227,114,81,1,4,71,12,255,38,105,191,0,7,117,50,255,81,79,16,0,63,68,65,255,157,36,110,255,77,241,3,255,226,45,251,1,142,25,206,0,120,123,209,1,28,254,238,255,5,128,126,255,91,222,215,255,162,15,191,0,86,240,73,0,135,185,81,254,44,241,163,0,212,219,210,255,112,162,155,0,207,101,118,0,168,72,56,255,196,5,52,0,72,172,242,255,126,22,157,255,146,96,59,255,162,121,152,254,140,16,95,0,195,254,200,254,82,150,162,0,119,43,145,254,204,172,78,255,166,224,159,0,104,19,237,255,245,126,208,255,226,59,213,0,117,217,197,0,152,72,237,0,220,31,23,254,14,90,231,255,188,212,64,1,60,101,246,255,85,24,86,0,1,177,109,0,146,83,32,1,75,182,192,0,119,241,224,0,185,237,27,255,184,101,82,1,235,37,77,255,253,134,19,0,232,246,122,0,60,106,179,0,195,11,12,0,109,66,235,1,125,113,59,0,61,40,164,0,175,104,240,0,2,47,187,255,50,12,141,0,194,139,181,255,135,250,104,0,97,92,222,255,217,149,201,255,203,241,118,255,79,151,67,0,122,142,218,255,149,245,239,0,138,42,200,254,80,37,97,255,124,112,167,255,36,138,87,255,130,29,147,255,241,87,78,255,204,97,19,1,177,209,22,255,247,227,127,254,99,119,83,255,212,25,198,1,16,179,179,0,145,77,172,254,89,153,14,255,218,189,167,0,107,233,59,255,35,33,243,254,44,112,112,255,161,127,79,1,204,175,10,0,40,21,138,254,104,116,228,0,199,95,137,255,133,190,168,255,146,165,234,1,183,99,39,0,183,220,54,254,255,222,133,0,162,219,121,254,63,239,6,0,225,102,54,255,251,18,246,0,4,34,129,1,135,36,131,0,206,50,59,1,15,97,183,0,171,216,135,255,101,152,43,255,150,251,91,0,38,145,95,0,34,204,38,254,178,140,83,255,25,129,243,255,76,144,37,0,106,36,26,254,118,144,172,255,68,186,229,255,107,161,213,255,46,163,68,255,149,170,253,0,187,17,15,0,218,160,165,255,171,35,246,1,96,13,19,0,165,203,117,0,214,107,192,255,244,123,177,1,100,3,104,0,178,242,97,255,251,76,130,255,211,77,42,1,250,79,70,255,63,244,80,1,105,101,246,0,61,136,58,1,238,91,213,0,14,59,98,255,167,84,77,0,17,132,46,254,57,175,197,255,185,62,184,0,76,64,207,0,172,175,208,254,175,74,37,0,138,27,211,254,148,125,194,0,10,89,81,0,168,203,101,255,43,213,209,1,235,245,54,0,30,35,226,255,9,126,70,0,226,125,94,254,156,117,20,255,57,248,112,1,230,48,64,255,164,92,166,1,224,214,230,255,36,120,143,0,55,8,43,255,251,1,245,1,106,98,165,0,74,107,106,254,53,4,54,255,90,178,150,1,3,120,123,255,244,5,89,1,114,250,61,255,254,153,82,1,77,15,17,0,57,238,90,1,95,223,230,0,236,52,47,254,103,148,164,255,121,207,36,1,18,16,185,255,75,20,74,0,187,11,101,0,46,48,129,255,22,239,210,255,77,236,129,255,111,77,204,255,61,72,97,255,199,217,251,255,42,215,204,0,133,145,201,255,57,230,146,1,235,100,198,0,146,73,35,254,108,198,20,255,182,79,210,255,82,103,136,0,246,108,176,0,34,17,60,255,19,74,114,254,168,170,78,255,157,239,20,255,149,41,168,0,58,121,28,0,79,179,134,255,231,121,135,255,174,209,98,255,243,122,190,0,171,166,205,0,212,116,48,0,29,108,66,255,162,222,182,1,14,119,21,0,213,39,249,255,254,223,228,255,183,165,198,0,133,190,48,0,124,208,109,255,119,175,85,255,9,209,121,1,48,171,189,255,195,71,134,1,136,219,51,255,182,91,141,254,49,159,72,0,35,118,245,255,112,186,227,255,59,137,31,0,137,44,163,0,114,103,60,254,8,213,150,0,162,10,113,255,194,104,72,0,220,131,116,255,178,79,92,0,203,250,213,254,93,193,189,255,130,255,34,254,212,188,151,0,136,17,20,255,20,101,83,255,212,206,166,0,229,238,73,255,151,74,3,255,168,87,215,0,155,188,133,255,166,129,73,0,240,79,133,255,178,211,81,255,203,72,163,254,193,168,165,0,14,164,199,254,30,255,204,0,65,72,91,1,166,74,102,255,200,42,0,255,194,113,227,255,66,23,208,0,229,216,100,255,24,239,26,0,10,233,62,255,123,10,178,1,26,36,174,255,119,219,199,1,45,163,190,0,16,168,42,0,166,57,198,255,28,26,26,0,126,165,231,0,251,108,100,255,61,229,121,255,58,118,138,0,76,207,17,0,13,34,112,254,89,16,168,0,37,208,105,255,35,201,215,255,40,106,101,254,6,239,114,0,40,103,226,254,246,127,110,255,63,167,58,0,132,240,142,0,5,158,88,255,129,73,158,255,94,89,146,0,230,54,146,0,8,45,173,0,79,169,1,0,115,186,247,0,84,64,131,0,67,224,253,255,207,189,64,0,154,28,81,1,45,184,54,255,87,212,224,255,0,96,73,255,129,33,235,1,52,66,80,255,251,174,155,255,4,179,37,0,234,164,93,254,93,175,253,0,198,69,87,255,224,106,46,0,99,29,210,0,62,188,114,255,44,234,8,0,169,175,247,255,23,109,137,255,229,182,39,0,192,165,94,254,245,101,217,0,191,88,96,0,196,94,99,255,106,238,11,254,53,126,243,0,94,1,101,255,46,147,2,0,201,124,124,255,141,12,218,0,13,166,157,1,48,251,237,255,155,250,124,255,106,148,146,255,182,13,202,0,28,61,167,0,217,152,8,254,220,130,45,255,200,230,255,1,55,65,87,255,93,191,97,254,114,251,14,0,32,105,92,1,26,207,141,0,24,207,13,254,21,50,48,255,186,148,116,255,211,43,225,0,37,34,162,254,164,210,42,255,68,23,96,255,182,214,8,255,245,117,137,255,66,195,50,0,75,12,83,254,80,140,164,0,9,165,36,1,228,110,227,0,241,17,90,1,25,52,212,0,6,223,12,255,139,243,57,0,12,113,75,1,246,183,191,255,213,191,69,255,230,15,142,0,1,195,196,255,138,171,47,255,64,63,106,1,16,169,214,255,207,174,56,1,88,73,133,255,182,133,140,0,177,14,25,255,147,184,53,255,10,227,161,255,120,216,244,255,73,77,233,0,157,238,139,1,59,65,233,0,70,251,216,1,41,184,153,255,32,203,112,0,146,147,253,0,87,101,109,1,44,82,133,255,244,150,53,255,94,152,232,255,59,93,39,255,88,147,220,255,78,81,13,1,32,47,252,255,160,19,114,255,93,107,39,255,118,16,211,1,185,119,209,255,227,219,127,254,88,105,236,255,162,110,23,255,36,166,110,255,91,236,221,255,66,234,116,0,111,19,244,254,10,233,26,0,32,183,6,254,2,191,242,0,218,156,53,254,41,60,70,255,168,236,111,0,121,185,126,255,238,142,207,255,55,126,52,0,220,129,208,254,80,204,164,255,67,23,144,254,218,40,108,255,127,202,164,0,203,33,3,255,2,158,0,0,37,96,188,255,192,49,74,0,109,4,0,0,111,167,10,254,91,218,135,255,203,66,173,255,150,194,226,0,201,253,6,255,174,102,121,0,205,191,110,0,53,194,4,0,81,40,45,254,35,102,143,255,12,108,198,255,16,27,232,255,252,71,186,1,176,110,114,0,142,3,117,1,113,77,142,0,19,156,197,1,92,47,252,0,53,232,22,1,54,18,235,0,46,35,189,255,236,212,129,0,2,96,208,254,200,238,199,255,59,175,164,255,146,43,231,0,194,217,52,255,3,223,12,0,138,54,178,254,85,235,207,0,232,207,34,0,49,52,50,255,166,113,89,255,10,45,216,255,62,173,28,0,111,165,246,0,118,115,91,255,128,84,60,0,167,144,203,0,87,13,243,0,22,30,228,1,177,113,146,255,129,170,230,254,252,153,129,255,145,225,43,0,70,231,5,255,122,105,126,254,86,246,148,255,110,37,154,254,209,3,91,0,68,145,62,0,228,16,165,255,55,221,249,254,178,210,91,0,83,146,226,254,69,146,186,0,93,210,104,254,16,25,173,0,231,186,38,0,189,122,140,255,251,13,112,255,105,110,93,0,251,72,170,0,192,23,223,255,24,3,202,1,225,93,228,0,153,147,199,254,109,170,22,0,248,101,246,255,178,124,12,255,178,254,102,254,55,4,65,0,125,214,180,0,183,96,147,0,45,117,23,254,132,191,249,0,143,176,203,254,136,183,54,255,146,234,177,0,146,101,86,255,44,123,143,1,33,209,152,0,192,90,41,254,83,15,125,255,213,172,82,0,215,169,144,0,16,13,34,0,32,209,100,255,84,18,249,1,197,17,236,255,217,186,230,0,49,160,176,255,111,118,97,255,237,104,235,0,79,59,92,254,69,249,11,255,35,172,74,1,19,118,68,0,222,124,165,255,180,66,35,255,86,174,246,0,43,74,111,255,126,144,86,255,228,234,91,0,242,213,24,254,69,44,235,255,220,180,35,0,8,248,7,255,102,47,92,255,240,205,102,255,113,230,171,1,31,185,201,255,194,246,70,255,122,17,187,0,134,70,199,255,149,3,150,255,117,63,103,0,65,104,123,255,212,54,19,1,6,141,88,0,83,134,243,255,136,53,103,0,169,27,180,0,177,49,24,0,111,54,167,0,195,61,215,255,31,1,108,1,60,42,70,0,185,3,162,255,194,149,40,255,246,127,38,254,190,119,38,255,61,119,8,1,96,161,219,255,42,203,221,1,177,242,164,255,245,159,10,0,116,196,0,0,5,93,205,254,128,127,179,0,125,237,246,255,149,162,217,255,87,37,20,254,140,238,192,0,9,9,193,0,97,1,226,0,29,38,10,0,0,136,63,255,229,72,210,254,38,134,92,255,78,218,208,1,104,36,84,255,12,5,193,255,242,175,61,255,191,169,46,1,179,147,147,255,113,190,139,254,125,172,31,0,3,75,252,254,215,36,15,0,193,27,24,1,255,69,149,255,110,129,118,0,203,93,249,0,138,137,64,254,38,70,6,0,153,116,222,0,161,74,123,0,193,99,79,255,118,59,94,255,61,12,43,1,146,177,157,0,46,147,191,0,16,255,38,0,11,51,31,1,60,58,98,255,111,194,77,1,154,91,244,0,140,40,144,1,173,10,251,0,203,209,50,254,108,130,78,0,228,180,90,0,174,7,250,0,31,174,60,0,41,171,30,0,116,99,82,255,118,193,139,255,187,173,198,254,218,111,56,0,185,123,216,0,249,158,52,0,52,180,93,255,201,9,91,255,56,45,166,254,132,155,203,255,58,232,110,0,52,211,89,255,253,0,162,1,9,87,183,0,145,136,44,1,94,122,245,0,85,188,171,1,147,92,198,0,0,8,104,0,30,95,174,0,221,230,52,1,247,247,235,255,137,174,53,255,35,21,204,255,71,227,214,1,232,82,194,0,11,48,227,255,170,73,184,255,198,251,252,254,44,112,34,0,131,101,131,255,72,168,187,0,132,135,125,255,138,104,97,255,238,184,168,255,243,104,84,255,135,216,226,255,139,144,237,0,188,137,150,1,80,56,140,255,86,169,167,255,194,78,25,255,220,17,180,255,17,13,193,0,117,137,212,255,141,224,151,0,49,244,175,0,193,99,175,255,19,99,154,1,255,65,62,255,156,210,55,255,242,244,3,255,250,14,149,0,158,88,217,255,157,207,134,254,251,232,28,0,46,156,251,255,171,56,184,255,239,51,234,0,142,138,131,255,25,254,243,1,10,201,194,0,63,97,75,0,210,239,162,0,192,200,31,1,117,214,243,0,24,71,222,254,54,40,232,255,76,183,111,254,144,14,87,255,214,79,136,255,216,196,212,0,132,27,140,254,131,5,253,0,124,108,19,255,28,215,75,0,76,222,55,254,233,182,63,0,68,171,191,254,52,111,222,255,10,105,77,255,80,170,235,0,143,24,88,255,45,231,121,0,148,129,224,1,61,246,84,0,253,46,219,255,239,76,33,0,49,148,18,254,230,37,69,0,67,134,22,254,142,155,94,0,31,157,211,254,213,42,30,255,4,228,247,254,252,176,13,255,39,0,31,254,241,244,255,255,170,45,10,254,253,222,249,0,222,114,132,0,255,47,6,255,180,163,179,1,84,94,151,255,89,209,82,254,229,52,169,255,213,236,0,1,214,56,228,255,135,119,151,255,112,201,193,0,83,160,53,254,6,151,66,0,18,162,17,0,233,97,91,0,131,5,78,1,181,120,53,255,117,95,63,255,237,117,185,0,191,126,136,255,144,119,233,0,183,57,97,1,47,201,187,255,167,165,119,1,45,100,126,0,21,98,6,254,145,150,95,255,120,54,152,0,209,98,104,0,143,111,30,254,184,148,249,0,235,216,46,0,248,202,148,255,57,95,22,0,242,225,163,0,233,247,232,255,71,171,19,255,103,244,49,255,84,103,93,255,68,121,244,1,82,224,13,0,41,79,43,255,249,206,167,255,215,52,21,254,192,32,22,255,247,111,60,0,101,74,38,255,22,91,84,254,29,28,13,255,198,231,215,254,244,154,200,0,223,137,237,0,211,132,14,0,95,64,206,255,17,62,247,255,233,131,121,1,93,23,77,0,205,204,52,254,81,189,136,0,180,219,138,1,143,18,94,0,204,43,140,254,188,175,219,0,111,98,143,255,151,63,162,255,211,50,71,254,19,146,53,0,146,45,83,254,178,82,238,255,16,133,84,255,226,198,93,255,201,97,20,255,120,118,35,255,114,50,231,255,162,229,156,255,211,26,12,0,114,39,115,255,206,212,134,0,197,217,160,255,116,129,94,254,199,215,219,255,75,223,249,1,253,116,181,255,232,215,104,255,228,130,246,255,185,117,86,0,14,5,8,0,239,29,61,1,237,87,133,255,125,146,137,254,204,168,223,0,46,168,245,0,154,105,22,0,220,212,161,255,107,69,24,255,137,218,181,255,241,84,198,255,130,122,211,255,141,8,153,255,190,177,118,0,96,89,178,0,255,16,48,254,122,96,105,255,117,54,232,255,34,126,105,255,204,67,166,0,232,52,138,255,211,147,12,0,25,54,7,0,44,15,215,254,51,236,45,0,190,68,129,1,106,147,225,0,28,93,45,254,236,141,15,255,17,61,161,0,220,115,192,0,236,145,24,254,111,168,169,0,224,58,63,255,127,164,188,0,82,234,75,1,224,158,134,0,209,68,110,1,217,166,217,0,70,225,166,1,187,193,143,255,16,7,88,255,10,205,140,0,117,192,156,1,17,56,38,0,27,124,108,1,171,215,55,255,95,253,212,0,155,135,168,255,246,178,153,254,154,68,74,0,232,61,96,254,105,132,59,0,33,76,199,1,189,176,130,255,9,104,25,254,75,198,102,255,233,1,112,0,108,220,20,255,114,230,70,0,140,194,133,255,57,158,164,254,146,6,80,255,169,196,97,1,85,183,130,0,70,158,222,1,59,237,234,255,96,25,26,255,232,175,97,255,11,121,248,254,88,35,194,0,219,180,252,254,74,8,227,0,195,227,73,1,184,110,161,255,49,233,164,1,128,53,47,0,82,14,121,255,193,190,58,0,48,174,117,255,132,23,32,0,40,10,134,1,22,51,25,255,240,11,176,255,110,57,146,0,117,143,239,1,157,101,118,255,54,84,76,0,205,184,18,255,47,4,72,255,78,112,85,255,193,50,66,1,93,16,52,255,8,105,134,0,12,109,72,255,58,156,251,0,144,35,204,0,44,160,117,254,50,107,194,0,1,68,165,255,111,110,162,0,158,83,40,254,76,214,234,0,58,216,205,255,171,96,147,255,40,227,114,1,176,227,241,0,70,249,183,1,136,84,139,255,60,122,247,254,143,9,117,255,177,174,137,254,73,247,143,0,236,185,126,255,62,25,247,255,45,64,56,255,161,244,6,0,34,57,56,1,105,202,83,0,128,147,208,0,6,103,10,255,74,138,65,255,97,80,100,255,214,174,33,255,50,134,74,255,110,151,130,254,111,84,172,0,84,199,75,254,248,59,112,255,8,216,178,1,9,183,95,0,238,27,8,254,170,205,220,0,195,229,135,0,98,76,237,255,226,91,26,1,82,219,39,255,225,190,199,1,217,200,121,255,81,179,8,255,140,65,206,0,178,207,87,254,250,252,46,255,104,89,110,1,253,189,158,255,144,214,158,255,160,245,54,255,53,183,92,1,21,200,194,255,146,33,113,1,209,1,255,0,235,106,43,255,167,52,232,0,157,229,221,0,51,30,25,0,250,221,27,1,65,147,87,255,79,123,196,0,65,196,223,255,76,44,17,1,85,241,68,0,202,183,249,255,65,212,212,255,9,33,154,1,71,59,80,0,175,194,59,255,141,72,9,0,100,160,244,0,230,208,56,0,59,25,75,254,80,194,194,0,18,3,200,254,160,159,115,0,132,143,247,1,111,93,57,255,58,237,11,1,134,222,135,255,122,163,108,1,123,43,190,255,251,189,206,254,80,182,72,255,208,246,224,1,17,60,9,0,161,207,38,0,141,109,91,0,216,15,211,255,136,78,110,0,98,163,104,255,21,80,121,255,173,178,183,1,127,143,4,0,104,60,82,254,214,16,13,255,96,238,33,1,158,148,230,255,127,129,62,255,51,255,210,255,62,141,236,254,157,55,224,255,114,39,244,0,192,188,250,255,228,76,53,0,98,84,81,255,173,203,61,254,147,50,55,255,204,235,191,0,52,197,244,0,88,43,211,254,27,191,119,0,188,231,154,0,66,81,161,0,92,193,160,1,250,227,120,0,123,55,226,0,184,17,72,0,133,168,10,254,22,135,156,255,41,25,103,255,48,202,58,0,186,149,81,255,188,134,239,0,235,181,189,254,217,139,188,255,74,48,82,0,46,218,229,0,189,253,251,0,50,229,12,255,211,141,191,1,128,244,25,255,169,231,122,254,86,47,189,255,132,183,23,255,37,178,150,255,51,137,253,0,200,78,31,0,22,105,50,0,130,60,0,0,132,163,91,254,23,231,187,0,192,79,239,0,157,102,164,255,192,82,20,1,24,181,103,255,240,9,234,0,1,123,164,255,133,233,0,255,202,242,242,0,60,186,245,0,241,16,199,255,224,116,158,254,191,125,91,255,224,86,207,0,121,37,231,255,227,9,198,255,15,153,239,255,121,232,217,254,75,112,82,0,95,12,57,254,51,214,105,255,148,220,97,1,199,98,36,0,156,209,12,254,10,212,52,0,217,180,55,254,212,170,232,255,216,20,84,255,157,250,135,0,157,99,127,254,1,206,41,0,149,36,70,1,54,196,201,255,87,116,0,254,235,171,150,0,27,163,234,0,202,135,180,0,208,95,0,254,123,156,93,0,183,62,75,0,137,235,182,0,204,225,255,255,214,139,210,255,2,115,8,255,29,12,111,0,52,156,1,0,253,21,251,255,37,165,31,254,12,130,211,0,106,18,53,254,42,99,154,0,14,217,61,254,216,11,92,255,200,197,112,254,147,38,199,0,36,252,120,254,107,169,77,0,1,123,159,255,207,75,102,0,163,175,196,0,44,1,240,0,120,186,176,254,13,98,76,255,237,124,241,255,232,146,188,255,200,96,224,0,204,31,41,0,208,200,13,0,21,225,96,255,175,156,196,0,247,208,126,0,62,184,244,254,2,171,81,0,85,115,158,0,54,64,45,255,19,138,114,0,135,71,205,0,227,47,147,1,218,231,66,0,253,209,28,0,244,15,173,255,6,15,118,254,16,150,208,255,185,22,50,255,86,112,207,255,75,113,215,1,63,146,43,255,4,225,19,254,227,23,62,255,14,255,214,254,45,8,205,255,87,197,151,254,210,82,215,255,245,248,247,255,128,248,70,0,225,247,87,0,90,120,70,0,213,245,92,0,13,133,226,0,47,181,5,1,92,163,105,255,6,30,133,254,232,178,61,255,230,149,24,255,18,49,158,0,228,100,61,254,116,243,251,255,77,75,92,1,81,219,147,255,76,163,254,254,141,213,246,0,232,37,152,254,97,44,100,0,201,37,50,1,212,244,57,0,174,171,183,255,249,74,112,0,166,156,30,0,222,221,97,255,243,93,73,254,251,101,100,255,216,217,93,255,254,138,187,255,142,190,52,255,59,203,177,255,200,94,52,0,115,114,158,255,165,152,104,1,126,99,226,255,118,157,244,1,107,200,16,0,193,90,229,0,121,6,88,0,156,32,93,254,125,241,211,255,14,237,157,255,165,154,21,255,184,224,22,255,250,24,152,255,113,77,31,0,247,171,23,255,237,177,204,255,52,137,145,255,194,182,114,0,224,234,149,0,10,111,103,1,201,129,4,0,238,142,78,0,52,6,40,255,110,213,165,254,60,207,253,0,62,215,69,0,96,97,0,255,49,45,202,0,120,121,22,255,235,139,48,1,198,45,34,255,182,50,27,1,131,210,91,255,46,54,128,0,175,123,105,255,198,141,78,254,67,244,239,255,245,54,103,254,78,38,242,255,2,92,249,254,251,174,87,255,139,63,144,0,24,108,27,255,34,102,18,1,34,22,152,0,66,229,118,254,50,143,99,0,144,169,149,1,118,30,152,0,178,8,121,1,8,159,18,0,90,101,230,255,129,29,119,0,68,36,11,1,232,183,55,0,23,255,96,255,161,41,193,255,63,139,222,0,15,179,243,0,255,100,15,255,82,53,135,0,137,57,149,1,99,240,170,255,22,230,228,254,49,180,82,255,61,82,43,0,110,245,217,0,199,125,61,0,46,253,52,0,141,197,219,0,211,159,193,0,55,121,105,254,183,20,129,0,169,119,170,255,203,178,139,255,135,40,182,255,172,13,202,255,65,178,148,0,8,207,43,0,122,53,127,1,74,161,48,0,227,214,128,254,86,11,243,255,100,86,7,1,245,68,134,255,61,43,21,1,152,84,94,255,190,60,250,254,239,118,232,255,214,136,37,1,113,76,107,255,93,104,100,1,144,206,23,255,110,150,154,1,228,103,185,0,218,49,50,254,135,77,139,255,185,1,78,0,0,161,148,255,97,29,233,255,207,148,149,255,160,168,0,0,91,128,171,255,6,28,19,254,11,111,247,0,39,187,150,255,138,232,149,0,117,62,68,255,63,216,188,255,235,234,32,254,29,57,160,255,25,12,241,1,169,60,191,0,32,131,141,255,237,159,123,255,94,197,94,254,116,254,3,255,92,179,97,254,121,97,92,255,170,112,14,0,21,149,248,0,248,227,3,0,80,96,109,0,75,192,74,1,12,90,226,255,161,106,68,1,208,114,127,255,114,42,255,254,74,26,74,255,247,179,150,254,121,140,60,0,147,70,200,255,214,40,161,255,161,188,201,255,141,65,135,255,242,115,252,0,62,47,202,0,180,149,255,254,130,55,237,0,165,17,186,255,10,169,194,0,156,109,218,255,112,140,123,255,104,128,223,254,177,142,108,255,121,37,219,255,128,77,18,255,111,108,23,1,91,192,75,0,174,245,22,255,4,236,62,255,43,64,153,1,227,173,254,0,237,122,132,1,127,89,186,255,142,82,128,254,252,84,174,0,90,179,177,1,243,214,87,255,103,60,162,255,208,130,14,255,11,130,139,0,206,129,219,255,94,217,157,255,239,230,230,255,116,115,159,254,164,107,95,0,51,218,2,1,216,125,198,255,140,202,128,254,11,95,68,255,55,9,93,254,174,153,6,255,204,172,96,0,69,160,110,0,213,38,49,254,27,80,213,0,118,125,114,0,70,70,67,255,15,142,73,255,131,122,185,255,243,20,50,254,130,237,40,0,210,159,140,1,197,151,65,255,84,153,66,0,195,126,90,0,16,238,236,1,118,187,102,255,3,24,133,255,187,69,230,0,56,197,92,1,213,69,94,255,80,138,229,1,206,7,230,0,222,111,230,1,91,233,119,255,9,89,7,1,2,98,1,0,148,74,133,255,51,246,180,255,228,177,112,1,58,189,108,255,194,203,237,254,21,209,195,0,147,10,35,1,86,157,226,0,31,163,139,254,56,7,75,255,62,90,116,0,181,60,169,0,138,162,212,254,81,167,31,0,205,90,112,255,33,112,227,0,83,151,117,1,177,224,73,255,174,144,217,255,230,204,79,255,22,77,232,255,114,78,234,0,224,57,126,254,9,49,141,0,242,147,165,1,104,182,140,255,167,132,12,1,123,68,127,0,225,87,39,1,251,108,8,0,198,193,143,1,121,135,207,255,172,22,70,0,50,68,116,255,101,175,40,255,248,105,233,0,166,203,7,0,110,197,218,0,215,254,26,254,168,226,253,0,31,143,96,0,11,103,41,0,183,129,203,254,100,247,74,255,213,126,132,0,210,147,44,0,199,234,27,1,148,47,181,0,155,91,158,1,54,105,175,255,2,78,145,254,102,154,95,0,128,207,127,254,52,124,236,255,130,84,71,0,221,243,211,0,152,170,207,0,222,106,199,0,183,84,94,254,92,200,56,255,138,182,115,1,142,96,146,0,133,136,228,0,97,18,150,0,55,251,66,0,140,102,4,0,202,103,151,0,30,19,248,255,51,184,207,0,202,198,89,0,55,197,225,254,169,95,249,255,66,65,68,255,188,234,126,0,166,223,100,1,112,239,244,0,144,23,194,0,58,39,182,0,244,44,24,254,175,68,179,255,152,118,154,1,176,162,130,0,217,114,204,254,173,126,78,255,33,222,30,255,36,2,91,255,2,143,243,0,9,235,215,0,3,171,151,1,24,215,245,255,168,47,164,254,241,146,207,0,69,129,180,0,68,243,113,0,144,53,72,254,251,45,14,0,23,110,168,0,68,68,79,255,110,70,95,254,174,91,144,255,33,206,95,255,137,41,7,255,19,187,153,254,35,255,112,255,9,145,185,254,50,157,37,0,11,112,49,1,102,8,190,255,234,243,169,1,60,85,23,0,74,39,189,0,116,49,239,0,173,213,210,0,46,161,108,255,159,150,37,0,196,120,185,255,34,98,6,255,153,195,62,255,97,230,71,255,102,61,76,0,26,212,236,255,164,97,16,0,198,59,146,0,163,23,196,0,56,24,61,0,181,98,193,0,251,147,229,255,98,189,24,255,46,54,206,255,234,82,246,0,183,103,38,1,109,62,204,0,10,240,224,0,146,22,117,255,142,154,120,0,69,212,35,0,208,99,118,1,121,255,3,255,72,6,194,0,117,17,197,255,125,15,23,0,154,79,153,0,214,94,197,255,185,55,147,255,62,254,78,254,127,82,153,0,110,102,63,255,108,82,161,255,105,187,212,1,80,138,39,0,60,255,93,255,72,12,186,0,210,251,31,1,190,167,144,255,228,44,19,254,128,67,232,0,214,249,107,254,136,145,86,255,132,46,176,0,189,187,227,255,208,22,140,0,217,211,116,0,50,81,186,254,139,250,31,0,30,64,198,1,135,155,100,0,160,206,23,254,187,162,211,255,16,188,63,0,254,208,49,0,85,84,191,0,241,192,242,255,153,126,145,1,234,162,162,255,230,97,216,1,64,135,126,0,190,148,223,1,52,0,43,255,28,39,189,1,64,136,238,0,175,196,185,0,98,226,213,255,127,159,244,1,226,175,60,0,160,233,142,1,180,243,207,255,69,152,89,1,31,101,21,0,144,25,164,254,139,191,209,0,91,25,121,0,32,147,5,0,39,186,123,255,63,115,230,255,93,167,198,255,143,213,220,255,179,156,19,255,25,66,122,0,214,160,217,255,2,45,62,255,106,79,146,254,51,137,99,255,87,100,231,255,175,145,232,255,101,184,1,255,174,9,125,0,82,37,161,1,36,114,141,255,48,222,142,255,245,186,154,0,5,174,221,254,63,114,155,255,135,55,160,1,80,31,135,0,126,250,179,1,236,218,45,0,20,28,145,1,16,147,73,0,249,189,132,1,17,189,192,255,223,142,198,255,72,20,15,255,250,53,237,254,15,11,18,0,27,211,113,254,213,107,56,255,174,147,146,255,96,126,48,0,23,193,109,1,37,162,94,0,199,157,249,254,24,128,187,255,205,49,178,254,93,164,42,255,43,119,235,1,88,183,237,255,218,210,1,255,107,254,42,0,230,10,99,255,162,0,226,0,219,237,91,0,129,178,203,0,208,50,95,254,206,208,95,255,247,191,89,254,110,234,79,255,165,61,243,0,20,122,112,255,246,246,185,254,103,4,123,0,233,99,230,1,219,91,252,255,199,222,22,255,179,245,233,255,211,241,234,0,111,250,192,255,85,84,136,0,101,58,50,255,131,173,156,254,119,45,51,255,118,233,16,254,242,90,214,0,94,159,219,1,3,3,234,255,98,76,92,254,80,54,230,0,5,228,231,254,53,24,223,255,113,56,118,1,20,132,1,255,171,210,236,0,56,241,158,255,186,115,19,255,8,229,174,0,48,44,0,1,114,114,166,255,6,73,226,255,205,89,244,0,137,227,75,1,248,173,56,0,74,120,246,254,119,3,11,255,81,120,198,255,136,122,98,255,146,241,221,1,109,194,78,255,223,241,70,1,214,200,169,255,97,190,47,255,47,103,174,255,99,92,72,254,118,233,180,255,193,35,233,254,26,229,32,255,222,252,198,0,204,43,71,255,199,84,172,0,134,102,190,0,111,238,97,254,230,40,230,0,227,205,64,254,200,12,225,0,166,25,222,0,113,69,51,255,143,159,24,0,167,184,74,0,29,224,116,254,158,208,233,0,193,116,126,255,212,11,133,255,22,58,140,1,204,36,51,255,232,30,43,0,235,70,181,255,64,56,146,254,169,18,84,255,226,1,13,255,200,50,176,255,52,213,245,254,168,209,97,0,191,71,55,0,34,78,156,0,232,144,58,1,185,74,189,0,186,142,149,254,64,69,127,255,161,203,147,255,176,151,191,0,136,231,203,254,163,182,137,0,161,126,251,254,233,32,66,0,68,207,66,0,30,28,37,0,93,114,96,1,254,92,247,255,44,171,69,0,202,119,11,255,188,118,50,1,255,83,136,255,71,82,26,0,70,227,2,0,32,235,121,1,181,41,154,0,71,134,229,254,202,255,36,0,41,152,5,0,154,63,73,255,34,182,124,0,121,221,150,255,26,204,213,1,41,172,87,0,90,157,146,255,109,130,20,0,71,107,200,255,243,102,189,0,1,195,145,254,46,88,117,0,8,206,227,0,191,110,253,255,109,128,20,254,134,85,51,255,137,177,112,1,216,34,22,255,131,16,208,255,121,149,170,0,114,19,23,1,166,80,31,255,113,240,122,0,232,179,250,0,68,110,180,254,210,170,119,0,223,108,164,255,207,79,233,255,27,229,226,254,209,98,81,255,79,68,7,0,131,185,100,0,170,29,162,255,17,162,107,255,57,21,11,1,100,200,181,255,127,65,166,1,165,134,204,0,104,167,168,0,1,164,79,0,146,135,59,1,70,50,128,255,102,119,13,254,227,6,135,0,162,142,179,255,160,100,222,0,27,224,219,1,158,93,195,255,234,141,137,0,16,24,125,255,238,206,47,255,97,17,98,255,116,110,12,255,96,115,77,0,91,227,232,255,248,254,79,255,92,229,6,254,88,198,139,0,206,75,129,0,250,77,206,255,141,244,123,1,138,69,220,0,32,151,6,1,131,167,22,255,237,68,167,254,199,189,150,0,163,171,138,255,51,188,6,255,95,29,137,254,148,226,179,0,181,107,208,255,134,31,82,255,151,101,45,255,129,202,225,0,224,72,147,0,48,138,151,255,195,64,206,254,237,218,158,0,106,29,137,254,253,189,233,255,103,15,17,255,194,97,255,0,178,45,169,254,198,225,155,0,39,48,117,255,135,106,115,0,97,38,181,0,150,47,65,255,83,130,229,254,246,38,129,0,92,239,154,254,91,99,127,0,161,111,33,255,238,217,242,255,131,185,195,255,213,191,158,255,41,150,218,0,132,169,131,0,89,84,252,1,171,70,128,255,163,248,203,254,1,50,180,255,124,76,85,1,251,111,80,0,99,66,239,255,154,237,182,255,221,126,133,254,74,204,99,255,65,147,119,255,99,56,167,255,79,248,149,255,116,155,228,255,237,43,14,254,69,137,11,255,22,250,241,1,91,122,143,255,205,249,243,0,212,26,60,255,48,182,176,1,48,23,191,255,203,121,152,254,45,74,213,255,62,90,18,254,245,163,230,255,185,106,116,255,83,35,159,0,12,33,2,255,80,34,62,0,16,87,174,255,173,101,85,0,202,36,81,254,160,69,204,255,64,225,187,0,58,206,94,0,86,144,47,0,229,86,245,0,63,145,190,1,37,5,39,0,109,251,26,0,137,147,234,0,162,121,145,255,144,116,206,255,197,232,185,255,183,190,140,255,73,12,254,255,139,20,242,255,170,90,239,255,97,66,187,255,245,181,135,254,222,136,52,0,245,5,51,254,203,47,78,0,152,101,216,0,73,23,125,0,254,96,33,1,235,210,73,255,43,209,88,1,7,129,109,0,122,104,228,254,170,242,203,0,242,204,135,255,202,28,233,255,65,6,127,0,159,144,71,0,100,140,95,0,78,150,13,0,251,107,118,1,182,58,125,255,1,38,108,255,141,189,209,255,8,155,125,1,113,163,91,255,121,79,190,255,134,239,108,255,76,47,248,0,163,228,239,0,17,111,10,0,88,149,75,255,215,235,239,0,167,159,24,255,47,151,108,255,107,209,188,0,233,231,99,254,28,202,148,255,174,35,138,255,110,24,68,255,2,69,181,0,107,102,82,0,102,237,7,0,92,36,237,255,221,162,83,1,55,202,6,255,135,234,135,255,24,250,222,0,65,94,168,254,245,248,210,255,167,108,201,254,255,161,111,0,205,8,254,0,136,13,116,0,100,176,132,255,43,215,126,255,177,133,130,255,158,79,148,0,67,224,37,1,12,206,21,255,62,34,110,1,237,104,175,255,80,132,111,255,142,174,72,0,84,229,180,254,105,179,140,0,64,248,15,255,233,138,16,0,245,67,123,254,218,121,212,255,63,95,218,1,213,133,137,255,143,182,82,255,48,28,11,0,244,114,141,1,209,175,76,255,157,181,150,255,186,229,3,255,164,157,111,1,231,189,139,0,119,202,190,255,218,106,64,255,68,235,63,254,96,26,172,255,187,47,11,1,215,18,251,255,81,84,89,0,68,58,128,0,94,113,5,1,92,129,208,255,97,15,83,254,9,28,188,0,239,9,164,0,60,205,152,0,192,163,98,255,184,18,60,0,217,182,139,0,109,59,120,255,4,192,251,0,169,210,240,255,37,172,92,254,148,211,245,255,179,65,52,0,253,13,115,0,185,174,206,1,114,188,149,255,237,90,173,0,43,199,192,255,88,108,113,0,52,35,76,0,66,25,148,255,221,4,7,255,151,241,114,255,190,209,232,0,98,50,199,0,151,150,213,255,18,74,36,1,53,40,7,0,19,135,65,255,26,172,69,0,174,237,85,0,99,95,41,0,3,56,16,0,39,160,177,255,200,106,218,254,185,68,84,255,91,186,61,254,67,143,141,255,13,244,166,255,99,114,198,0,199,110,163,255,193,18,186,0,124,239,246,1,110,68,22,0,2,235,46,1,212,60,107,0,105,42,105,1,14,230,152,0,7,5,131,0,141,104,154,255,213,3,6,0,131,228,162,255,179,100,28,1,231,123,85,255,206,14,223,1,253,96,230,0,38,152,149,1,98,137,122,0,214,205,3,255,226,152,179,255,6,133,137,0,158,69,140,255,113,162,154,255,180,243,172,255,27,189,115,255,143,46,220,255,213,134,225,255,126,29,69,0,188,43,137,1,242,70,9,0,90,204,255,255,231,170,147,0,23,56,19,254,56,125,157,255,48,179,218,255,79,182,253,255,38,212,191,1,41,235,124,0,96,151,28,0,135,148,190,0,205,249,39,254,52,96,136,255,212,44,136,255,67,209,131,255,252,130,23,255,219,128,20,255,198,129,118,0,108,101,11,0,178,5,146,1,62,7,100,255,181,236,94,254,28,26,164,0,76,22,112,255,120,102,79,0,202,192,229,1,200,176,215,0,41,64,244,255,206,184,78,0,167,45,63,1,160,35,0,255,59,12,142,255,204,9,144,255,219,94,229,1,122,27,112,0,189,105,109,255,64,208,74,255,251,127,55,1,2,226,198,0,44,76,209,0,151,152,77,255,210,23,46,1,201,171,69,255,44,211,231,0,190,37,224,255,245,196,62,255,169,181,222,255,34,211,17,0,119,241,197,255,229,35,152,1,21,69,40,255,178,226,161,0,148,179,193,0,219,194,254,1,40,206,51,255,231,92,250,1,67,153,170,0,21,148,241,0,170,69,82,255,121,18,231,255,92,114,3,0,184,62,230,0,225,201,87,255,146,96,162,255,181,242,220,0,173,187,221,1,226,62,170,255,56,126,217,1,117,13,227,255,179,44,239,0,157,141,155,255,144,221,83,0,235,209,208,0,42,17,165,1,251,81,133,0,124,245,201,254,97,211,24,255,83,214,166,0,154,36,9,255,248,47,127,0,90,219,140,255,161,217,38,254,212,147,63,255,66,84,148,1,207,3,1,0,230,134,89,1,127,78,122,255,224,155,1,255,82,136,74,0,178,156,208,255,186,25,49,255,222,3,210,1,229,150,190,255,85,162,52,255,41,84,141,255,73,123,84,254,93,17,150,0,119,19,28,1,32,22,215,255,28,23,204,255,142,241,52,255,228,52,125,0,29,76,207,0,215,167,250,254,175,164,230,0,55,207,105,1,109,187,245,255,161,44,220,1,41,101,128,255,167,16,94,0,93,214,107,255,118,72,0,254,80,61,234,255,121,175,125,0,139,169,251,0,97,39,147,254,250,196,49,255,165,179,110,254,223,70,187,255,22,142,125,1,154,179,138,255,118,176,42,1,10,174,153,0,156,92,102,0,168,13,161,255,143,16,32,0,250,197,180,255,203,163,44,1,87,32,36,0,161,153,20,255,123,252,15,0,25,227,80,0,60,88,142,0,17,22,201,1,154,205,77,255,39,63,47,0,8,122,141,0,128,23,182,254,204,39,19,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+20480);allocate([4,112,29,255,23,36,140,255,210,234,116,254,53,50,63,255,121,171,104,255,160,219,94,0,87,82,14,254,231,42,5,0,165,139,127,254,86,78,38,0,130,60,66,254,203,30,45,255,46,196,122,1,249,53,162,255,136,143,103,254,215,210,114,0,231,7,160,254,169,152,42,255,111,45,246,0,142,131,135,255,131,71,204,255,36,226,11,0,0,28,242,255,225,138,213,255,247,46,216,254,245,3,183,0,108,252,74,1,206,26,48,255,205,54,246,255,211,198,36,255,121,35,50,0,52,216,202,255,38,139,129,254,242,73,148,0,67,231,141,255,42,47,204,0,78,116,25,1,4,225,191,255,6,147,228,0,58,88,177,0,122,165,229,255,252,83,201,255,224,167,96,1,177,184,158,255,242,105,179,1,248,198,240,0,133,66,203,1,254,36,47,0,45,24,115,255,119,62,254,0,196,225,186,254,123,141,172,0,26,85,41,255,226,111,183,0,213,231,151,0,4,59,7,255,238,138,148,0,66,147,33,255,31,246,141,255,209,141,116,255,104,112,31,0,88,161,172,0,83,215,230,254,47,111,151,0,45,38,52,1,132,45,204,0,138,128,109,254,233,117,134,255,243,190,173,254,241,236,240,0,82,127,236,254,40,223,161,255,110,182,225,255,123,174,239,0,135,242,145,1,51,209,154,0,150,3,115,254,217,164,252,255,55,156,69,1,84,94,255,255,232,73,45,1,20,19,212,255,96,197,59,254,96,251,33,0,38,199,73,1,64,172,247,255,117,116,56,255,228,17,18,0,62,138,103,1,246,229,164,255,244,118,201,254,86,32,159,255,109,34,137,1,85,211,186,0,10,193,193,254,122,194,177,0,122,238,102,255,162,218,171,0,108,217,161,1,158,170,34,0,176,47,155,1,181,228,11,255,8,156,0,0,16,75,93,0,206,98,255,1,58,154,35,0,12,243,184,254,67,117,66,255,230,229,123,0,201,42,110,0,134,228,178,254,186,108,118,255,58,19,154,255,82,169,62,255,114,143,115,1,239,196,50,255,173,48,193,255,147,2,84,255,150,134,147,254,95,232,73,0,109,227,52,254,191,137,10,0,40,204,30,254,76,52,97,255,164,235,126,0,254,124,188,0,74,182,21,1,121,29,35,255,241,30,7,254,85,218,214,255,7,84,150,254,81,27,117,255,160,159,152,254,66,24,221,255,227,10,60,1,141,135,102,0,208,189,150,1,117,179,92,0,132,22,136,255,120,199,28,0,21,129,79,254,182,9,65,0,218,163,169,0,246,147,198,255,107,38,144,1,78,175,205,255,214,5,250,254,47,88,29,255,164,47,204,255,43,55,6,255,131,134,207,254,116,100,214,0,96,140,75,1,106,220,144,0,195,32,28,1,172,81,5,255,199,179,52,255,37,84,203,0,170,112,174,0,11,4,91,0,69,244,27,1,117,131,92,0,33,152,175,255,140,153,107,255,251,135,43,254,87,138,4,255,198,234,147,254,121,152,84,255,205,101,155,1,157,9,25,0,72,106,17,254,108,153,0,255,189,229,186,0,193,8,176,255,174,149,209,0,238,130,29,0,233,214,126,1,61,226,102,0,57,163,4,1,198,111,51,255,45,79,78,1,115,210,10,255,218,9,25,255,158,139,198,255,211,82,187,254,80,133,83,0,157,129,230,1,243,133,134,255,40,136,16,0,77,107,79,255,183,85,92,1,177,204,202,0,163,71,147,255,152,69,190,0,172,51,188,1,250,210,172,255,211,242,113,1,89,89,26,255,64,66,111,254,116,152,42,0,161,39,27,255,54,80,254,0,106,209,115,1,103,124,97,0,221,230,98,255,31,231,6,0,178,192,120,254,15,217,203,255,124,158,79,0,112,145,247,0,92,250,48,1,163,181,193,255,37,47,142,254,144,189,165,255,46,146,240,0,6,75,128,0,41,157,200,254,87,121,213,0,1,113,236,0,5,45,250,0,144,12,82,0,31,108,231,0,225,239,119,255,167,7,189,255,187,228,132,255,110,189,34,0,94,44,204,1,162,52,197,0,78,188,241,254,57,20,141,0,244,146,47,1,206,100,51,0,125,107,148,254,27,195,77,0,152,253,90,1,7,143,144,255,51,37,31,0,34,119,38,255,7,197,118,0,153,188,211,0,151,20,116,254,245,65,52,255,180,253,110,1,47,177,209,0,161,99,17,255,118,222,202,0,125,179,252,1,123,54,126,255,145,57,191,0,55,186,121,0,10,243,138,0,205,211,229,255,125,156,241,254,148,156,185,255,227,19,188,255,124,41,32,255,31,34,206,254,17,57,83,0,204,22,37,255,42,96,98,0,119,102,184,1,3,190,28,0,110,82,218,255,200,204,192,255,201,145,118,0,117,204,146,0,132,32,98,1,192,194,121,0,106,161,248,1,237,88,124,0,23,212,26,0,205,171,90,255,248,48,216,1,141,37,230,255,124,203,0,254,158,168,30,255,214,248,21,0,112,187,7,255,75,133,239,255,74,227,243,255,250,147,70,0,214,120,162,0,167,9,179,255,22,158,18,0,218,77,209,1,97,109,81,255,244,33,179,255,57,52,57,255,65,172,210,255,249,71,209,255,142,169,238,0,158,189,153,255,174,254,103,254,98,33,14,0,141,76,230,255,113,139,52,255,15,58,212,0,168,215,201,255,248,204,215,1,223,68,160,255,57,154,183,254,47,231,121,0,106,166,137,0,81,136,138,0,165,43,51,0,231,139,61,0,57,95,59,254,118,98,25,255,151,63,236,1,94,190,250,255,169,185,114,1,5,250,58,255,75,105,97,1,215,223,134,0,113,99,163,1,128,62,112,0,99,106,147,0,163,195,10,0,33,205,182,0,214,14,174,255,129,38,231,255,53,182,223,0,98,42,159,255,247,13,40,0,188,210,177,1,6,21,0,255,255,61,148,254,137,45,129,255,89,26,116,254,126,38,114,0,251,50,242,254,121,134,128,255,204,249,167,254,165,235,215,0,202,177,243,0,133,141,62,0,240,130,190,1,110,175,255,0,0,20,146,1,37,210,121,255,7,39,130,0,142,250,84,255,141,200,207,0,9,95,104,255,11,244,174,0,134,232,126,0,167,1,123,254,16,193,149,255,232,233,239,1,213,70,112,255,252,116,160,254,242,222,220,255,205,85,227,0,7,185,58,0,118,247,63,1,116,77,177,255,62,245,200,254,63,18,37,255,107,53,232,254,50,221,211,0,162,219,7,254,2,94,43,0,182,62,182,254,160,78,200,255,135,140,170,0,235,184,228,0,175,53,138,254,80,58,77,255,152,201,2,1,63,196,34,0,5,30,184,0,171,176,154,0,121,59,206,0,38,99,39,0,172,80,77,254,0,134,151,0,186,33,241,254,94,253,223,255,44,114,252,0,108,126,57,255,201,40,13,255,39,229,27,255,39,239,23,1,151,121,51,255,153,150,248,0,10,234,174,255,118,246,4,254,200,245,38,0,69,161,242,1,16,178,150,0,113,56,130,0,171,31,105,0,26,88,108,255,49,42,106,0,251,169,66,0,69,93,149,0,20,57,254,0,164,25,111,0,90,188,90,255,204,4,197,0,40,213,50,1,212,96,132,255,88,138,180,254,228,146,124,255,184,246,247,0,65,117,86,255,253,102,210,254,254,121,36,0,137,115,3,255,60,24,216,0,134,18,29,0,59,226,97,0,176,142,71,0,7,209,161,0,189,84,51,254,155,250,72,0,213,84,235,255,45,222,224,0,238,148,143,255,170,42,53,255,78,167,117,0,186,0,40,255,125,177,103,255,69,225,66,0,227,7,88,1,75,172,6,0,169,45,227,1,16,36,70,255,50,2,9,255,139,193,22,0,143,183,231,254,218,69,50,0,236,56,161,1,213,131,42,0,138,145,44,254,136,229,40,255,49,63,35,255,61,145,245,255,101,192,2,254,232,167,113,0,152,104,38,1,121,185,218,0,121,139,211,254,119,240,35,0,65,189,217,254,187,179,162,255,160,187,230,0,62,248,14,255,60,78,97,0,255,247,163,255,225,59,91,255,107,71,58,255,241,47,33,1,50,117,236,0,219,177,63,254,244,90,179,0,35,194,215,255,189,67,50,255,23,135,129,0,104,189,37,255,185,57,194,0,35,62,231,255,220,248,108,0,12,231,178,0,143,80,91,1,131,93,101,255,144,39,2,1,255,250,178,0,5,17,236,254,139,32,46,0,204,188,38,254,245,115,52,255,191,113,73,254,191,108,69,255,22,69,245,1,23,203,178,0,170,99,170,0,65,248,111,0,37,108,153,255,64,37,69,0,0,88,62,254,89,148,144,255,191,68,224,1,241,39,53,0,41,203,237,255,145,126,194,255,221,42,253,255,25,99,151,0,97,253,223,1,74,115,49,255,6,175,72,255,59,176,203,0,124,183,249,1,228,228,99,0,129,12,207,254,168,192,195,255,204,176,16,254,152,234,171,0,77,37,85,255,33,120,135,255,142,194,227,1,31,214,58,0,213,187,125,255,232,46,60,255,190,116,42,254,151,178,19,255,51,62,237,254,204,236,193,0,194,232,60,0,172,34,157,255,189,16,184,254,103,3,95,255,141,233,36,254,41,25,11,255,21,195,166,0,118,245,45,0,67,213,149,255,159,12,18,255,187,164,227,1,160,25,5,0,12,78,195,1,43,197,225,0,48,142,41,254,196,155,60,255,223,199,18,1,145,136,156,0,252,117,169,254,145,226,238,0,239,23,107,0,109,181,188,255,230,112,49,254,73,170,237,255,231,183,227,255,80,220,20,0,194,107,127,1,127,205,101,0,46,52,197,1,210,171,36,255,88,3,90,255,56,151,141,0,96,187,255,255,42,78,200,0,254,70,70,1,244,125,168,0,204,68,138,1,124,215,70,0,102,66,200,254,17,52,228,0,117,220,143,254,203,248,123,0,56,18,174,255,186,151,164,255,51,232,208,1,160,228,43,255,249,29,25,1,68,190,63,0,103,230,9,106,133,174,103,187,114,243,110,60,58,245,79,165,127,82,14,81,140,104,5,155,171,217,131,31,25,205,224,91,152,47,138,66,145,68,55,113,207,251,192,181,165,219,181,233,91,194,86,57,241,17,241,89,164,130,63,146,213,94,28,171,152,170,7,216,1,91,131,18,190,133,49,36,195,125,12,85,116,93,190,114,254,177,222,128,167,6,220,155,116,241,155,193,193,105,155,228,134,71,190,239,198,157,193,15,204,161,12,36,111,44,233,45,170,132,116,74,220,169,176,92,218,136,249,118,82,81,62,152,109,198,49,168,200,39,3,176,199,127,89,191,243,11,224,198,71,145,167,213,81,99,202,6,103,41,41,20,133,10,183,39,56,33,27,46,252,109,44,77,19,13,56,83,84,115,10,101,187,10,106,118,46,201,194,129,133,44,114,146,161,232,191,162,75,102,26,168,112,139,75,194,163,81,108,199,25,232,146,209,36,6,153,214,133,53,14,244,112,160,106,16,22,193,164,25,8,108,55,30,76,119,72,39,181,188,176,52,179,12,28,57,74,170,216,78,79,202,156,91,243,111,46,104,238,130,143,116,111,99,165,120,20,120,200,132,8,2,199,140,250,255,190,144,235,108,80,164,247,163,249,190,242,120,113,198,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,138,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,109,97,99,115,104,97,53,49,50,50,53,54,0,99,117,114,118,101,50,53,53,49,57,120,115,97,108,115,97,50,48,112,111,108,121,49,51,48,53,0,83,45,62,98,117,102,108,101,110,32,60,61,32,66,76,65,75,69,50,66,95,66,76,79,67,75,66,89,84,69,83,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,98,47,114,101,102,47,98,108,97,107,101,50,98,45,114,101,102,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,95,102,105,110,97,108,0,111,117,116,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,98,47,114,101,102,47,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,0,107,101,121,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,115,97,108,116,95,112,101,114,115,111,110,97,108,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,105,110,105,116,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,105,110,105,116,95,115,97,108,116,95,112,101,114,115,111,110,97,108,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,102,105,110,97,108,0,115,104,97,53,49,50,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,108,97,107,101,50,98,0,120,50,53,53,49,57,98,108,97,107,101,50,98,0,112,111,108,121,49,51,48,53,0,36,97,114,103,111,110,50,105,0,36,118,61,0,36,109,61,0,44,116,61,0,44,112,61,0,36,97,114,103,111,110,50,105,36,118,61,0,36,97,114,103,111,110,50,105,36,0,97,114,103,111,110,50,105,0,46,47,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,0,36,55,36,0,99,117,114,118,101,50,53,53,49,57,0,120,115,97,108,115,97,50,48,112,111,108,121,49,51,48,53,0,115,105,112,104,97,115,104,50,52,0,101,100,50,53,53,49,57,0,237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,83,105,103,69,100,50,53,53,49,57,32,110,111,32,69,100,50,53,53,49,57,32,99,111,108,108,105,115,105,111,110,115,1,0,120,115,97,108,115,97,50,48,0,106,115,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,40,41,59,32,125,0,123,32,105,102,32,40,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,61,61,32,117,110,100,101,102,105,110,101,100,41,32,123,32,116,114,121,32,123,32,118,97,114,32,119,105,110,100,111,119,95,32,61,32,34,111,98,106,101,99,116,34,32,61,61,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,32,63,32,119,105,110,100,111,119,32,58,32,115,101,108,102,44,32,99,114,121,112,116,111,95,32,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,33,61,61,32,34,117,110,100,101,102,105,110,101,100,34,32,63,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,58,32,119,105,110,100,111,119,95,46,109,115,67,114,121,112,116,111,44,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,110,101,119,32,85,105,110,116,51,50,65,114,114,97,121,40,49,41,59,32,99,114,121,112,116,111,95,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,115,40,98,117,102,41,59,32,114,101,116,117,114,110,32,98,117,102,91,48,93,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,114,121,32,123,32,118,97,114,32,99,114,121,112,116,111,32,61,32,114,101,113,117,105,114,101,40,39,99,114,121,112,116,111,39,41,44,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,99,114,121,112,116,111,46,114,97,110,100,111,109,66,121,116,101,115,40,52,41,59,32,114,101,116,117,114,110,32,40,98,117,102,91,48,93,32,60,60,32,50,52,32,124,32,98,117,102,91,49,93,32,60,60,32,49,54,32,124,32,98,117,102,91,50,93,32,60,60,32,56,32,124,32,98,117,102,91,51,93,41,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,104,114,111,119,32,39,78,111,32,115,101,99,117,114,101,32,114,97,110,100,111,109,32,110,117,109,98,101,114,32,103,101,110,101,114,97,116,111,114,32,102,111,117,110,100,39,59,32,125,32,125,32,125,32,125,0,76,105,98,115,111,100,105,117,109,68,82,71,98,117,102,95,108,101,110,32,60,61,32,83,73,90,69,95,77,65,88,0,114,97,110,100,111,109,98,121,116,101,115,47,114,97,110,100,111,109,98,121,116,101,115,46,99,0,114,97,110,100,111,109,98,121,116,101,115,0,49,46,48,46,49,50,0,0,0,0,12,0,0,0,0,0,0,0,4,0,0,0,8,15,11,7,3,14,10,6,2,13,9,5,1,12,8,4,0,3,3,3,3,7,7,7,7,11,11,11,11,15,15,15,15,3,2,1,0,7,6,5,4,11,10,9,8,15,14,13,12,12,8,4,0,13,9,5,1,14,10,6,2,15,11,7,3,1,2,3,0,6,7,4,5,11,8,9,10,12,13,14,15,15,10,5,0,14,9,4,3,13,8,7,2,12,11,6,1],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+30720);var tempDoublePtr=STATICTOP;STATICTOP+=16;Module["_bitshift64Ashr"]=_bitshift64Ashr;Module["_i64Subtract"]=_i64Subtract;Module["_i64Add"]=_i64Add;Module["_memset"]=_memset;Module["_bitshift64Lshr"]=_bitshift64Lshr;Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]()}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC);Module["_llvm_cttz_i32"]=_llvm_cttz_i32;Module["___udivmoddi4"]=___udivmoddi4;Module["___udivdi3"]=___udivdi3;Module["___muldsi3"]=___muldsi3;Module["___muldi3"]=___muldi3;function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:var maxHeapSize=2*1024*1024*1024-16777216;maxHeapSize=HEAPU8.length;return maxHeapSize/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(ERRNO_CODES.EINVAL);return-1}Module["_sbrk"]=_sbrk;Module["_memmove"]=_memmove;Module["___uremdi3"]=___uremdi3;DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"_emscripten_asm_const_i":_emscripten_asm_const_i,"_sysconf":_sysconf,"_abort":_abort,"___setErrNo":___setErrNo,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_emscripten_asm_const_v":_emscripten_asm_const_v,"___assert_fail":___assert_fail,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"cttz_i8":cttz_i8};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.DYNAMICTOP_PTR|0;var j=env.tempDoublePtr|0;var k=env.ABORT|0;var l=env.STACKTOP|0;var m=env.STACK_MAX|0;var n=env.cttz_i8|0;var o=0;var p=0;var q=0;var r=0;var s=global.NaN,t=global.Infinity;var u=0,v=0,w=0,x=0,y=0.0;var z=0;var A=global.Math.floor;var B=global.Math.abs;var C=global.Math.sqrt;var D=global.Math.pow;var E=global.Math.cos;var F=global.Math.sin;var G=global.Math.tan;var H=global.Math.acos;var I=global.Math.asin;var J=global.Math.atan;var K=global.Math.atan2;var L=global.Math.exp;var M=global.Math.log;var N=global.Math.ceil;var O=global.Math.imul;var P=global.Math.min;var Q=global.Math.max;var R=global.Math.clz32;var S=env.abort;var T=env.assert;var U=env.enlargeMemory;var V=env.getTotalMemory;var W=env.abortOnCannotGrowMemory;var X=env._emscripten_asm_const_i;var Y=env._sysconf;var Z=env._abort;var _=env.___setErrNo;var $=env._emscripten_memcpy_big;var aa=env._emscripten_asm_const_v;var ba=env.___assert_fail;var ca=0.0;
// EMSCRIPTEN_START_FUNCS
function ga(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0;f=l;g=l=l+63&-64;l=l+256|0;d=0;do{h=Te(b+(d<<3)|0)|0;e=g+128+(d<<3)|0;c[e>>2]=h;c[e+4>>2]=z;d=d+1|0}while((d|0)!=16);d=g;b=a;e=d+64|0;do{c[d>>2]=c[b>>2];d=d+4|0;b=b+4|0}while((d|0)<(e|0));c[g+88>>2]=1595750129;c[g+88+4>>2]=-1521486534;ca=c[a+64>>2]^-1377402159;r=c[a+64+4>>2]^1359893119;h=c[a+72>>2]^725511199;w=c[a+72+4>>2]^-1694144372;n=c[a+80>>2]^-79577749;s=c[a+80+4>>2]^528734635;K=c[a+88>>2]^327033209;ba=c[a+88+4>>2]^1541459225;c[g+120>>2]=K;c[g+120+4>>2]=ba;u=c[g+32>>2]|0;e=c[g+32+4>>2]|0;N=fg(u|0,e|0,c[g>>2]|0,c[g+4>>2]|0)|0;N=fg(N|0,z|0,c[g+128>>2]|0,c[g+128+4>>2]|0)|0;d=z;r=Ze(ca^N,r^d,32)|0;ca=z;V=fg(r|0,ca|0,-205731576,1779033703)|0;O=z;e=Ze(u^V,e^O,24)|0;u=z;d=fg(N|0,d|0,e|0,u|0)|0;N=g+128+8|0;d=fg(d|0,z|0,c[N>>2]|0,c[N+4>>2]|0)|0;R=z;c[g>>2]=d;c[g+4>>2]=R;ca=Ze(r^d,ca^R,16)|0;r=z;c[g+96>>2]=ca;c[g+96+4>>2]=r;r=fg(V|0,O|0,ca|0,r|0)|0;ca=z;c[g+64>>2]=r;c[g+64+4>>2]=ca;ca=Ze(e^r,u^ca,63)|0;c[g+32>>2]=ca;c[g+32+4>>2]=z;ca=c[g+40>>2]|0;u=c[g+40+4>>2]|0;r=fg(ca|0,u|0,c[g+8>>2]|0,c[g+8+4>>2]|0)|0;e=g+128+16|0;r=fg(r|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;O=z;w=Ze(h^r,w^O,32)|0;h=z;V=fg(w|0,h|0,-2067093701,-1150833019)|0;D=z;u=Ze(ca^V,u^D,24)|0;ca=z;O=fg(r|0,O|0,u|0,ca|0)|0;r=g+128+24|0;O=fg(O|0,z|0,c[r>>2]|0,c[r+4>>2]|0)|0;x=z;h=Ze(w^O,h^x,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;D=fg(V|0,D|0,h|0,w|0)|0;V=z;c[g+72>>2]=D;c[g+72+4>>2]=V;V=Ze(u^D,ca^V,63)|0;ca=z;D=c[g+48>>2]|0;u=c[g+48+4>>2]|0;t=fg(D|0,u|0,c[g+16>>2]|0,c[g+16+4>>2]|0)|0;X=g+128+32|0;t=fg(t|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;i=z;s=Ze(n^t,s^i,32)|0;n=z;C=fg(s|0,n|0,-23791573,1013904242)|0;b=z;u=Ze(D^C,u^b,24)|0;D=z;i=fg(t|0,i|0,u|0,D|0)|0;t=g+128+40|0;i=fg(i|0,z|0,c[t>>2]|0,c[t+4>>2]|0)|0;P=z;n=Ze(s^i,n^P,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;b=fg(C|0,b|0,n|0,s|0)|0;C=z;D=Ze(u^b,D^C,63)|0;u=z;m=c[g+56>>2]|0;o=c[g+56+4>>2]|0;v=fg(m|0,o|0,c[g+24>>2]|0,c[g+24+4>>2]|0)|0;q=g+128+48|0;v=fg(v|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;aa=z;ba=Ze(K^v,ba^aa,32)|0;K=z;B=fg(c[g+88>>2]|0,c[g+88+4>>2]|0,ba|0,K|0)|0;F=z;o=Ze(m^B,o^F,24)|0;m=z;aa=fg(v|0,aa|0,o|0,m|0)|0;v=g+128+56|0;aa=fg(aa|0,z|0,c[v>>2]|0,c[v+4>>2]|0)|0;y=z;K=Ze(ba^aa,K^y,16)|0;ba=z;F=fg(B|0,F|0,K|0,ba|0)|0;B=z;m=Ze(o^F,m^B,63)|0;o=z;R=fg(V|0,ca|0,d|0,R|0)|0;d=g+128+64|0;R=fg(R|0,z|0,c[d>>2]|0,c[d+4>>2]|0)|0;S=z;ba=Ze(K^R,ba^S,32)|0;K=z;C=fg(b|0,C|0,ba|0,K|0)|0;b=z;ca=Ze(V^C,ca^b,24)|0;V=z;S=fg(R|0,S|0,ca|0,V|0)|0;R=g+128+72|0;S=fg(S|0,z|0,c[R>>2]|0,c[R+4>>2]|0)|0;$=z;K=Ze(ba^S,K^$,16)|0;ba=z;c[g+120>>2]=K;c[g+120+4>>2]=ba;ba=fg(C|0,b|0,K|0,ba|0)|0;K=z;c[g+80>>2]=ba;c[g+80+4>>2]=K;K=Ze(ca^ba,V^K,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;x=fg(D|0,u|0,O|0,x|0)|0;O=g+128+80|0;ba=c[O>>2]|0;ca=c[O+4>>2]|0;x=fg(x|0,z|0,ba|0,ca|0)|0;b=z;C=Ze(c[g+96>>2]^x,c[g+96+4>>2]^b,32)|0;A=z;B=fg(F|0,B|0,C|0,A|0)|0;F=z;u=Ze(D^B,u^F,24)|0;D=z;b=fg(x|0,b|0,u|0,D|0)|0;x=g+128+88|0;b=fg(b|0,z|0,c[x>>2]|0,c[x+4>>2]|0)|0;M=z;A=Ze(C^b,A^M,16)|0;C=z;F=fg(B|0,F|0,A|0,C|0)|0;B=z;c[g+88>>2]=F;c[g+88+4>>2]=B;B=Ze(u^F,D^B,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;P=fg(m|0,o|0,i|0,P|0)|0;i=g+128+96|0;P=fg(P|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;F=z;w=Ze(h^P,w^F,32)|0;h=z;u=fg(c[g+64>>2]|0,c[g+64+4>>2]|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;F=fg(P|0,F|0,o|0,m|0)|0;P=g+128+104|0;da=c[P>>2]|0;_=c[P+4>>2]|0;F=fg(F|0,z|0,da|0,_|0)|0;E=z;h=Ze(w^F,h^E,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;k=c[g+32>>2]|0;ga=c[g+32+4>>2]|0;y=fg(k|0,ga|0,aa|0,y|0)|0;aa=g+128+112|0;T=c[aa>>2]|0;j=c[aa+4>>2]|0;y=fg(y|0,z|0,T|0,j|0)|0;ia=z;s=Ze(n^y,s^ia,32)|0;n=z;I=fg(c[g+72>>2]|0,c[g+72+4>>2]|0,s|0,n|0)|0;U=z;ga=Ze(k^I,ga^U,24)|0;k=z;ia=fg(y|0,ia|0,ga|0,k|0)|0;y=g+128+120|0;H=c[y>>2]|0;fa=c[y+4>>2]|0;ia=fg(ia|0,z|0,H|0,fa|0)|0;Q=z;n=Ze(s^ia,n^Q,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;k=Ze(ga^U,k^I,63)|0;ga=z;$=fg(S|0,$|0,k|0,ga|0)|0;j=fg($|0,z|0,T|0,j|0)|0;T=z;C=Ze(A^j,C^T,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;ga=Ze(k^u,ga^p,24)|0;k=z;T=fg(j|0,T|0,ga|0,k|0)|0;ca=fg(T|0,z|0,ba|0,ca|0)|0;ba=z;A=Ze(C^ca,A^ba,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;k=Ze(ga^p,k^u,63)|0;c[g+32>>2]=k;c[g+32+4>>2]=z;M=fg(K|0,V|0,b|0,M|0)|0;M=fg(M|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;b=z;w=Ze(h^M,w^b,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;b=fg(M|0,b|0,V|0,K|0)|0;b=fg(b|0,z|0,c[d>>2]|0,c[d+4>>2]|0)|0;M=z;h=Ze(w^b,h^M,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;E=fg(B|0,D|0,F|0,E|0)|0;E=fg(E|0,z|0,c[R>>2]|0,c[R+4>>2]|0)|0;F=z;s=Ze(n^E,s^F,32)|0;n=z;k=fg(c[g+80>>2]|0,c[g+80+4>>2]|0,s|0,n|0)|0;ga=z;D=Ze(B^k,D^ga,24)|0;B=z;F=fg(E|0,F|0,D|0,B|0)|0;fa=fg(F|0,z|0,H|0,fa|0)|0;H=z;n=Ze(s^fa,n^H,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;ga=fg(k|0,ga|0,n|0,s|0)|0;k=z;B=Ze(D^ga,B^k,63)|0;D=z;Q=fg(m|0,o|0,ia|0,Q|0)|0;_=fg(Q|0,z|0,da|0,_|0)|0;da=z;Q=Ze(c[g+120>>2]^_,c[g+120+4>>2]^da,32)|0;ia=z;F=fg(c[g+88>>2]|0,c[g+88+4>>2]|0,Q|0,ia|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;da=fg(_|0,da|0,o|0,m|0)|0;da=fg(da|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;_=z;ia=Ze(Q^da,ia^_,16)|0;Q=z;E=fg(F|0,E|0,ia|0,Q|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;ba=fg(K|0,V|0,ca|0,ba|0)|0;ba=fg(ba|0,z|0,c[N>>2]|0,c[N+4>>2]|0)|0;ca=z;Q=Ze(ia^ba,Q^ca,32)|0;ia=z;k=fg(ga|0,k|0,Q|0,ia|0)|0;ga=z;V=Ze(K^k,V^ga,24)|0;K=z;ca=fg(ba|0,ca|0,V|0,K|0)|0;ba=c[i>>2]|0;T=c[i+4>>2]|0;ca=fg(ca|0,z|0,ba|0,T|0)|0;j=z;ia=Ze(Q^ca,ia^j,16)|0;Q=z;c[g+120>>2]=ia;c[g+120+4>>2]=Q;Q=fg(k|0,ga|0,ia|0,Q|0)|0;ia=z;c[g+80>>2]=Q;c[g+80+4>>2]=ia;K=Ze(V^Q,K^ia,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;M=fg(B|0,D|0,b|0,M|0)|0;b=c[g+128>>2]|0;ga=c[g+128+4>>2]|0;M=fg(M|0,z|0,b|0,ga|0)|0;k=z;C=Ze(A^M,C^k,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;k=fg(M|0,k|0,D|0,B|0)|0;M=c[e>>2]|0;$=c[e+4>>2]|0;k=fg(k|0,z|0,M|0,$|0)|0;S=z;A=Ze(C^k,A^S,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;H=fg(m|0,o|0,fa|0,H|0)|0;fa=c[x>>2]|0;ha=c[x+4>>2]|0;H=fg(H|0,z|0,fa|0,ha|0)|0;L=z;w=Ze(h^H,w^L,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;L=fg(H|0,L|0,o|0,m|0)|0;L=fg(L|0,z|0,c[v>>2]|0,c[v+4>>2]|0)|0;H=z;h=Ze(w^L,h^H,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;Z=c[g+32>>2]|0;W=c[g+32+4>>2]|0;_=fg(Z|0,W|0,da|0,_|0)|0;da=c[t>>2]|0;G=c[t+4>>2]|0;_=fg(_|0,z|0,da|0,G|0)|0;ea=z;s=Ze(n^_,s^ea,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;W=Ze(Z^I,W^U,24)|0;Z=z;ea=fg(_|0,ea|0,W|0,Z|0)|0;_=c[r>>2]|0;J=c[r+4>>2]|0;ea=fg(ea|0,z|0,_|0,J|0)|0;Y=z;n=Ze(s^ea,n^Y,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;Z=Ze(W^U,Z^I,63)|0;W=z;j=fg(ca|0,j|0,Z|0,W|0)|0;ha=fg(j|0,z|0,fa|0,ha|0)|0;fa=z;C=Ze(A^ha,C^fa,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;W=Ze(Z^u,W^p,24)|0;Z=z;fa=fg(ha|0,fa|0,W|0,Z|0)|0;fa=fg(fa|0,z|0,c[d>>2]|0,c[d+4>>2]|0)|0;ha=z;A=Ze(C^fa,A^ha,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;Z=Ze(W^p,Z^u,63)|0;c[g+32>>2]=Z;c[g+32+4>>2]=z;S=fg(K|0,V|0,k|0,S|0)|0;T=fg(S|0,z|0,ba|0,T|0)|0;ba=z;w=Ze(h^T,w^ba,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;ba=fg(T|0,ba|0,V|0,K|0)|0;ga=fg(ba|0,z|0,b|0,ga|0)|0;b=z;h=Ze(w^ga,h^b,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;H=fg(B|0,D|0,L|0,H|0)|0;G=fg(H|0,z|0,da|0,G|0)|0;da=z;s=Ze(n^G,s^da,32)|0;n=z;ia=fg(Q|0,ia|0,s|0,n|0)|0;Q=z;D=Ze(B^ia,D^Q,24)|0;B=z;da=fg(G|0,da|0,D|0,B|0)|0;$=fg(da|0,z|0,M|0,$|0)|0;M=z;n=Ze(s^$,n^M,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;Q=fg(ia|0,Q|0,n|0,s|0)|0;ia=z;B=Ze(D^Q,B^ia,63)|0;D=z;Y=fg(m|0,o|0,ea|0,Y|0)|0;Y=fg(Y|0,z|0,c[y>>2]|0,c[y+4>>2]|0)|0;ea=z;da=Ze(c[g+120>>2]^Y,c[g+120+4>>2]^ea,32)|0;G=z;F=fg(E|0,F|0,da|0,G|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;ea=fg(Y|0,ea|0,o|0,m|0)|0;ea=fg(ea|0,z|0,c[P>>2]|0,c[P+4>>2]|0)|0;Y=z;G=Ze(da^ea,G^Y,16)|0;da=z;E=fg(F|0,E|0,G|0,da|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;ha=fg(K|0,V|0,fa|0,ha|0)|0;ha=fg(ha|0,z|0,c[O>>2]|0,c[O+4>>2]|0)|0;fa=z;da=Ze(G^ha,da^fa,32)|0;G=z;ia=fg(Q|0,ia|0,da|0,G|0)|0;Q=z;V=Ze(K^ia,V^Q,24)|0;K=z;fa=fg(ha|0,fa|0,V|0,K|0)|0;fa=fg(fa|0,z|0,c[aa>>2]|0,c[aa+4>>2]|0)|0;ha=z;G=Ze(da^fa,G^ha,16)|0;da=z;c[g+120>>2]=G;c[g+120+4>>2]=da;da=fg(ia|0,Q|0,G|0,da|0)|0;G=z;c[g+80>>2]=da;c[g+80+4>>2]=G;K=Ze(V^da,K^G,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;b=fg(B|0,D|0,ga|0,b|0)|0;J=fg(b|0,z|0,_|0,J|0)|0;_=z;C=Ze(A^J,C^_,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;_=fg(J|0,_|0,D|0,B|0)|0;_=fg(_|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;J=z;A=Ze(C^_,A^J,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;M=fg(m|0,o|0,$|0,M|0)|0;$=c[v>>2]|0;b=c[v+4>>2]|0;M=fg(M|0,z|0,$|0,b|0)|0;ga=z;w=Ze(h^M,w^ga,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;ga=fg(M|0,ga|0,o|0,m|0)|0;M=c[N>>2]|0;Q=c[N+4>>2]|0;ga=fg(ga|0,z|0,M|0,Q|0)|0;ia=z;h=Ze(w^ga,h^ia,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;H=c[g+32>>2]|0;L=c[g+32+4>>2]|0;Y=fg(H|0,L|0,ea|0,Y|0)|0;ea=c[R>>2]|0;ba=c[R+4>>2]|0;Y=fg(Y|0,z|0,ea|0,ba|0)|0;T=z;s=Ze(n^Y,s^T,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;L=Ze(H^I,L^U,24)|0;H=z;T=fg(Y|0,T|0,L|0,H|0)|0;T=fg(T|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;Y=z;n=Ze(s^T,n^Y,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;H=Ze(L^U,H^I,63)|0;L=z;ha=fg(fa|0,ha|0,H|0,L|0)|0;b=fg(ha|0,z|0,$|0,b|0)|0;$=z;C=Ze(A^b,C^$,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;L=Ze(H^u,L^p,24)|0;H=z;$=fg(b|0,$|0,L|0,H|0)|0;ba=fg($|0,z|0,ea|0,ba|0)|0;ea=z;A=Ze(C^ba,A^ea,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;H=Ze(L^p,H^u,63)|0;c[g+32>>2]=H;c[g+32+4>>2]=z;J=fg(K|0,V|0,_|0,J|0)|0;J=fg(J|0,z|0,c[r>>2]|0,c[r+4>>2]|0)|0;_=z;w=Ze(h^J,w^_,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;_=fg(J|0,_|0,V|0,K|0)|0;Q=fg(_|0,z|0,M|0,Q|0)|0;M=z;h=Ze(w^Q,h^M,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;ia=fg(B|0,D|0,ga|0,ia|0)|0;ia=fg(ia|0,z|0,c[P>>2]|0,c[P+4>>2]|0)|0;ga=z;s=Ze(n^ia,s^ga,32)|0;n=z;G=fg(da|0,G|0,s|0,n|0)|0;da=z;D=Ze(B^G,D^da,24)|0;B=z;ga=fg(ia|0,ga|0,D|0,B|0)|0;ga=fg(ga|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;ia=z;n=Ze(s^ga,n^ia,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;da=fg(G|0,da|0,n|0,s|0)|0;G=z;B=Ze(D^da,B^G,63)|0;D=z;Y=fg(m|0,o|0,T|0,Y|0)|0;Y=fg(Y|0,z|0,c[x>>2]|0,c[x+4>>2]|0)|0;T=z;_=Ze(c[g+120>>2]^Y,c[g+120+4>>2]^T,32)|0;J=z;F=fg(E|0,F|0,_|0,J|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;T=fg(Y|0,T|0,o|0,m|0)|0;T=fg(T|0,z|0,c[aa>>2]|0,c[aa+4>>2]|0)|0;Y=z;J=Ze(_^T,J^Y,16)|0;_=z;E=fg(F|0,E|0,J|0,_|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;ea=fg(K|0,V|0,ba|0,ea|0)|0;ea=fg(ea|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;ba=z;_=Ze(J^ea,_^ba,32)|0;J=z;G=fg(da|0,G|0,_|0,J|0)|0;da=z;V=Ze(K^G,V^da,24)|0;K=z;ba=fg(ea|0,ba|0,V|0,K|0)|0;ba=fg(ba|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;ea=z;J=Ze(_^ba,J^ea,16)|0;_=z;c[g+120>>2]=J;c[g+120+4>>2]=_;_=fg(G|0,da|0,J|0,_|0)|0;J=z;c[g+80>>2]=_;c[g+80+4>>2]=J;K=Ze(V^_,K^J,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;M=fg(B|0,D|0,Q|0,M|0)|0;Q=c[t>>2]|0;da=c[t+4>>2]|0;M=fg(M|0,z|0,Q|0,da|0)|0;G=z;C=Ze(A^M,C^G,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;G=fg(M|0,G|0,D|0,B|0)|0;M=c[O>>2]|0;H=c[O+4>>2]|0;G=fg(G|0,z|0,M|0,H|0)|0;L=z;A=Ze(C^G,A^L,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;ia=fg(m|0,o|0,ga|0,ia|0)|0;ga=c[X>>2]|0;$=c[X+4>>2]|0;ia=fg(ia|0,z|0,ga|0,$|0)|0;b=z;w=Ze(h^ia,w^b,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;b=fg(ia|0,b|0,o|0,m|0)|0;ia=c[g+128>>2]|0;ha=c[g+128+4>>2]|0;b=fg(b|0,z|0,ia|0,ha|0)|0;fa=z;h=Ze(w^b,h^fa,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;S=c[g+32>>2]|0;k=c[g+32+4>>2]|0;Y=fg(S|0,k|0,T|0,Y|0)|0;T=c[y>>2]|0;Z=c[y+4>>2]|0;Y=fg(Y|0,z|0,T|0,Z|0)|0;W=z;s=Ze(n^Y,s^W,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;k=Ze(S^I,k^U,24)|0;S=z;W=fg(Y|0,W|0,k|0,S|0)|0;W=fg(W|0,z|0,c[d>>2]|0,c[d+4>>2]|0)|0;Y=z;n=Ze(s^W,n^Y,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;S=Ze(k^U,S^I,63)|0;k=z;ea=fg(ba|0,ea|0,S|0,k|0)|0;ea=fg(ea|0,z|0,c[R>>2]|0,c[R+4>>2]|0)|0;ba=z;C=Ze(A^ea,C^ba,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;k=Ze(S^u,k^p,24)|0;S=z;ba=fg(ea|0,ba|0,k|0,S|0)|0;ha=fg(ba|0,z|0,ia|0,ha|0)|0;ia=z;A=Ze(C^ha,A^ia,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;S=Ze(k^p,S^u,63)|0;c[g+32>>2]=S;c[g+32+4>>2]=z;L=fg(K|0,V|0,G|0,L|0)|0;da=fg(L|0,z|0,Q|0,da|0)|0;Q=z;w=Ze(h^da,w^Q,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;Q=fg(da|0,Q|0,V|0,K|0)|0;Q=fg(Q|0,z|0,c[v>>2]|0,c[v+4>>2]|0)|0;da=z;h=Ze(w^Q,h^da,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;fa=fg(B|0,D|0,b|0,fa|0)|0;fa=fg(fa|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;b=z;s=Ze(n^fa,s^b,32)|0;n=z;J=fg(_|0,J|0,s|0,n|0)|0;_=z;D=Ze(B^J,D^_,24)|0;B=z;b=fg(fa|0,b|0,D|0,B|0)|0;$=fg(b|0,z|0,ga|0,$|0)|0;ga=z;n=Ze(s^$,n^ga,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;_=fg(J|0,_|0,n|0,s|0)|0;J=z;B=Ze(D^_,B^J,63)|0;D=z;Y=fg(m|0,o|0,W|0,Y|0)|0;H=fg(Y|0,z|0,M|0,H|0)|0;M=z;Y=Ze(c[g+120>>2]^H,c[g+120+4>>2]^M,32)|0;W=z;F=fg(E|0,F|0,Y|0,W|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;M=fg(H|0,M|0,o|0,m|0)|0;Z=fg(M|0,z|0,T|0,Z|0)|0;T=z;W=Ze(Y^Z,W^T,16)|0;Y=z;E=fg(F|0,E|0,W|0,Y|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;ia=fg(K|0,V|0,ha|0,ia|0)|0;ia=fg(ia|0,z|0,c[aa>>2]|0,c[aa+4>>2]|0)|0;ha=z;Y=Ze(W^ia,Y^ha,32)|0;W=z;J=fg(_|0,J|0,Y|0,W|0)|0;_=z;V=Ze(K^J,V^_,24)|0;K=z;ha=fg(ia|0,ha|0,V|0,K|0)|0;ha=fg(ha|0,z|0,c[N>>2]|0,c[N+4>>2]|0)|0;ia=z;W=Ze(Y^ha,W^ia,16)|0;Y=z;c[g+120>>2]=W;c[g+120+4>>2]=Y;Y=fg(J|0,_|0,W|0,Y|0)|0;W=z;c[g+80>>2]=Y;c[g+80+4>>2]=W;K=Ze(V^Y,K^W,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;da=fg(B|0,D|0,Q|0,da|0)|0;Q=c[x>>2]|0;_=c[x+4>>2]|0;da=fg(da|0,z|0,Q|0,_|0)|0;J=z;C=Ze(A^da,C^J,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;J=fg(da|0,J|0,D|0,B|0)|0;da=c[i>>2]|0;M=c[i+4>>2]|0;J=fg(J|0,z|0,da|0,M|0)|0;H=z;A=Ze(C^J,A^H,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;ga=fg(m|0,o|0,$|0,ga|0)|0;$=c[q>>2]|0;b=c[q+4>>2]|0;ga=fg(ga|0,z|0,$|0,b|0)|0;fa=z;w=Ze(h^ga,w^fa,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;fa=fg(ga|0,fa|0,o|0,m|0)|0;ga=c[d>>2]|0;L=c[d+4>>2]|0;fa=fg(fa|0,z|0,ga|0,L|0)|0;G=z;h=Ze(w^fa,h^G,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;S=c[g+32>>2]|0;k=c[g+32+4>>2]|0;T=fg(S|0,k|0,Z|0,T|0)|0;Z=c[r>>2]|0;ba=c[r+4>>2]|0;T=fg(T|0,z|0,Z|0,ba|0)|0;ea=z;s=Ze(n^T,s^ea,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;k=Ze(S^I,k^U,24)|0;S=z;ea=fg(T|0,ea|0,k|0,S|0)|0;T=c[P>>2]|0;j=c[P+4>>2]|0;ea=fg(ea|0,z|0,T|0,j|0)|0;ca=z;n=Ze(s^ea,n^ca,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;S=Ze(k^U,S^I,63)|0;k=z;ia=fg(ha|0,ia|0,S|0,k|0)|0;ia=fg(ia|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;ha=z;C=Ze(A^ia,C^ha,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;k=Ze(S^u,k^p,24)|0;S=z;ha=fg(ia|0,ha|0,k|0,S|0)|0;M=fg(ha|0,z|0,da|0,M|0)|0;da=z;A=Ze(C^M,A^da,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;S=Ze(k^p,S^u,63)|0;c[g+32>>2]=S;c[g+32+4>>2]=z;H=fg(K|0,V|0,J|0,H|0)|0;b=fg(H|0,z|0,$|0,b|0)|0;$=z;w=Ze(h^b,w^$,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;$=fg(b|0,$|0,V|0,K|0)|0;$=fg($|0,z|0,c[O>>2]|0,c[O+4>>2]|0)|0;b=z;h=Ze(w^$,h^b,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;G=fg(B|0,D|0,fa|0,G|0)|0;G=fg(G|0,z|0,c[g+128>>2]|0,c[g+128+4>>2]|0)|0;fa=z;s=Ze(n^G,s^fa,32)|0;n=z;W=fg(Y|0,W|0,s|0,n|0)|0;Y=z;D=Ze(B^W,D^Y,24)|0;B=z;fa=fg(G|0,fa|0,D|0,B|0)|0;_=fg(fa|0,z|0,Q|0,_|0)|0;Q=z;n=Ze(s^_,n^Q,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;Y=fg(W|0,Y|0,n|0,s|0)|0;W=z;B=Ze(D^Y,B^W,63)|0;D=z;ca=fg(m|0,o|0,ea|0,ca|0)|0;L=fg(ca|0,z|0,ga|0,L|0)|0;ga=z;ca=Ze(c[g+120>>2]^L,c[g+120+4>>2]^ga,32)|0;ea=z;F=fg(E|0,F|0,ca|0,ea|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;ga=fg(L|0,ga|0,o|0,m|0)|0;ba=fg(ga|0,z|0,Z|0,ba|0)|0;Z=z;ea=Ze(ca^ba,ea^Z,16)|0;ca=z;E=fg(F|0,E|0,ea|0,ca|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;da=fg(K|0,V|0,M|0,da|0)|0;da=fg(da|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;M=z;ca=Ze(ea^da,ca^M,32)|0;ea=z;W=fg(Y|0,W|0,ca|0,ea|0)|0;Y=z;V=Ze(K^W,V^Y,24)|0;K=z;M=fg(da|0,M|0,V|0,K|0)|0;j=fg(M|0,z|0,T|0,j|0)|0;T=z;ea=Ze(ca^j,ea^T,16)|0;ca=z;c[g+120>>2]=ea;c[g+120+4>>2]=ca;ca=fg(W|0,Y|0,ea|0,ca|0)|0;ea=z;c[g+80>>2]=ca;c[g+80+4>>2]=ea;K=Ze(V^ca,K^ea,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;b=fg(B|0,D|0,$|0,b|0)|0;b=fg(b|0,z|0,c[v>>2]|0,c[v+4>>2]|0)|0;$=z;C=Ze(A^b,C^$,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;$=fg(b|0,$|0,D|0,B|0)|0;b=c[t>>2]|0;Y=c[t+4>>2]|0;$=fg($|0,z|0,b|0,Y|0)|0;W=z;A=Ze(C^$,A^W,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;Q=fg(m|0,o|0,_|0,Q|0)|0;_=c[y>>2]|0;M=c[y+4>>2]|0;Q=fg(Q|0,z|0,_|0,M|0)|0;da=z;w=Ze(h^Q,w^da,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;da=fg(Q|0,da|0,o|0,m|0)|0;Q=c[aa>>2]|0;ga=c[aa+4>>2]|0;da=fg(da|0,z|0,Q|0,ga|0)|0;L=z;h=Ze(w^da,h^L,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;fa=c[g+32>>2]|0;G=c[g+32+4>>2]|0;Z=fg(fa|0,G|0,ba|0,Z|0)|0;ba=c[N>>2]|0;H=c[N+4>>2]|0;Z=fg(Z|0,z|0,ba|0,H|0)|0;J=z;s=Ze(n^Z,s^J,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;G=Ze(fa^I,G^U,24)|0;fa=z;J=fg(Z|0,J|0,G|0,fa|0)|0;J=fg(J|0,z|0,c[R>>2]|0,c[R+4>>2]|0)|0;Z=z;n=Ze(s^J,n^Z,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;fa=Ze(G^U,fa^I,63)|0;G=z;T=fg(j|0,T|0,fa|0,G|0)|0;T=fg(T|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;j=z;C=Ze(A^T,C^j,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;G=Ze(fa^u,G^p,24)|0;fa=z;j=fg(T|0,j|0,G|0,fa|0)|0;Y=fg(j|0,z|0,b|0,Y|0)|0;b=z;A=Ze(C^Y,A^b,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;fa=Ze(G^p,fa^u,63)|0;c[g+32>>2]=fa;c[g+32+4>>2]=z;W=fg(K|0,V|0,$|0,W|0)|0;H=fg(W|0,z|0,ba|0,H|0)|0;ba=z;w=Ze(h^H,w^ba,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;ba=fg(H|0,ba|0,V|0,K|0)|0;M=fg(ba|0,z|0,_|0,M|0)|0;_=z;h=Ze(w^M,h^_,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;L=fg(B|0,D|0,da|0,L|0)|0;ga=fg(L|0,z|0,Q|0,ga|0)|0;Q=z;s=Ze(n^ga,s^Q,32)|0;n=z;ea=fg(ca|0,ea|0,s|0,n|0)|0;ca=z;D=Ze(B^ea,D^ca,24)|0;B=z;Q=fg(ga|0,Q|0,D|0,B|0)|0;ga=c[P>>2]|0;L=c[P+4>>2]|0;Q=fg(Q|0,z|0,ga|0,L|0)|0;da=z;n=Ze(s^Q,n^da,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;ca=fg(ea|0,ca|0,n|0,s|0)|0;ea=z;B=Ze(D^ca,B^ea,63)|0;D=z;Z=fg(m|0,o|0,J|0,Z|0)|0;Z=fg(Z|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;J=z;ba=Ze(c[g+120>>2]^Z,c[g+120+4>>2]^J,32)|0;H=z;F=fg(E|0,F|0,ba|0,H|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;J=fg(Z|0,J|0,o|0,m|0)|0;J=fg(J|0,z|0,c[O>>2]|0,c[O+4>>2]|0)|0;Z=z;H=Ze(ba^J,H^Z,16)|0;ba=z;E=fg(F|0,E|0,H|0,ba|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;b=fg(K|0,V|0,Y|0,b|0)|0;b=fg(b|0,z|0,c[g+128>>2]|0,c[g+128+4>>2]|0)|0;Y=z;ba=Ze(H^b,ba^Y,32)|0;H=z;ea=fg(ca|0,ea|0,ba|0,H|0)|0;ca=z;V=Ze(K^ea,V^ca,24)|0;K=z;Y=fg(b|0,Y|0,V|0,K|0)|0;b=c[v>>2]|0;W=c[v+4>>2]|0;Y=fg(Y|0,z|0,b|0,W|0)|0;$=z;H=Ze(ba^Y,H^$,16)|0;ba=z;c[g+120>>2]=H;c[g+120+4>>2]=ba;ba=fg(ea|0,ca|0,H|0,ba|0)|0;H=z;c[g+80>>2]=ba;c[g+80+4>>2]=H;K=Ze(V^ba,K^H,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;_=fg(B|0,D|0,M|0,_|0)|0;_=fg(_|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;M=z;C=Ze(A^_,C^M,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;M=fg(_|0,M|0,D|0,B|0)|0;_=c[r>>2]|0;ca=c[r+4>>2]|0;M=fg(M|0,z|0,_|0,ca|0)|0;ea=z;A=Ze(C^M,A^ea,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;da=fg(m|0,o|0,Q|0,da|0)|0;Q=c[R>>2]|0;fa=c[R+4>>2]|0;da=fg(da|0,z|0,Q|0,fa|0)|0;G=z;w=Ze(h^da,w^G,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;G=fg(da|0,G|0,o|0,m|0)|0;G=fg(G|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;da=z;h=Ze(w^G,h^da,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;j=c[g+32>>2]|0;T=c[g+32+4>>2]|0;Z=fg(j|0,T|0,J|0,Z|0)|0;Z=fg(Z|0,z|0,c[d>>2]|0,c[d+4>>2]|0)|0;J=z;s=Ze(n^Z,s^J,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;T=Ze(j^I,T^U,24)|0;j=z;J=fg(Z|0,J|0,T|0,j|0)|0;Z=c[x>>2]|0;S=c[x+4>>2]|0;J=fg(J|0,z|0,Z|0,S|0)|0;k=z;n=Ze(s^J,n^k,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;j=Ze(T^U,j^I,63)|0;T=z;$=fg(Y|0,$|0,j|0,T|0)|0;L=fg($|0,z|0,ga|0,L|0)|0;ga=z;C=Ze(A^L,C^ga,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;T=Ze(j^u,T^p,24)|0;j=z;ga=fg(L|0,ga|0,T|0,j|0)|0;S=fg(ga|0,z|0,Z|0,S|0)|0;Z=z;A=Ze(C^S,A^Z,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;j=Ze(T^p,j^u,63)|0;c[g+32>>2]=j;c[g+32+4>>2]=z;ea=fg(K|0,V|0,M|0,ea|0)|0;W=fg(ea|0,z|0,b|0,W|0)|0;b=z;w=Ze(h^W,w^b,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;b=fg(W|0,b|0,V|0,K|0)|0;b=fg(b|0,z|0,c[aa>>2]|0,c[aa+4>>2]|0)|0;W=z;h=Ze(w^b,h^W,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;da=fg(B|0,D|0,G|0,da|0)|0;da=fg(da|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;G=z;s=Ze(n^da,s^G,32)|0;n=z;H=fg(ba|0,H|0,s|0,n|0)|0;ba=z;D=Ze(B^H,D^ba,24)|0;B=z;G=fg(da|0,G|0,D|0,B|0)|0;G=fg(G|0,z|0,c[N>>2]|0,c[N+4>>2]|0)|0;da=z;n=Ze(s^G,n^da,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;ba=fg(H|0,ba|0,n|0,s|0)|0;H=z;B=Ze(D^ba,B^H,63)|0;D=z;k=fg(m|0,o|0,J|0,k|0)|0;ca=fg(k|0,z|0,_|0,ca|0)|0;_=z;k=Ze(c[g+120>>2]^ca,c[g+120+4>>2]^_,32)|0;J=z;F=fg(E|0,F|0,k|0,J|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;_=fg(ca|0,_|0,o|0,m|0)|0;fa=fg(_|0,z|0,Q|0,fa|0)|0;Q=z;J=Ze(k^fa,J^Q,16)|0;k=z;E=fg(F|0,E|0,J|0,k|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;Z=fg(K|0,V|0,S|0,Z|0)|0;Z=fg(Z|0,z|0,c[t>>2]|0,c[t+4>>2]|0)|0;S=z;k=Ze(J^Z,k^S,32)|0;J=z;H=fg(ba|0,H|0,k|0,J|0)|0;ba=z;V=Ze(K^H,V^ba,24)|0;K=z;S=fg(Z|0,S|0,V|0,K|0)|0;S=fg(S|0,z|0,c[g+128>>2]|0,c[g+128+4>>2]|0)|0;Z=z;J=Ze(k^S,J^Z,16)|0;k=z;c[g+120>>2]=J;c[g+120+4>>2]=k;k=fg(H|0,ba|0,J|0,k|0)|0;J=z;c[g+80>>2]=k;c[g+80+4>>2]=J;K=Ze(V^k,K^J,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;W=fg(B|0,D|0,b|0,W|0)|0;b=c[y>>2]|0;ba=c[y+4>>2]|0;W=fg(W|0,z|0,b|0,ba|0)|0;H=z;C=Ze(A^W,C^H,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;H=fg(W|0,H|0,D|0,B|0)|0;H=fg(H|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;W=z;A=Ze(C^H,A^W,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;da=fg(m|0,o|0,G|0,da|0)|0;G=c[d>>2]|0;_=c[d+4>>2]|0;da=fg(da|0,z|0,G|0,_|0)|0;ca=z;w=Ze(h^da,w^ca,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;ca=fg(da|0,ca|0,o|0,m|0)|0;da=c[q>>2]|0;ea=c[q+4>>2]|0;ca=fg(ca|0,z|0,da|0,ea|0)|0;M=z;h=Ze(w^ca,h^M,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;j=c[g+32>>2]|0;T=c[g+32+4>>2]|0;Q=fg(j|0,T|0,fa|0,Q|0)|0;fa=c[e>>2]|0;ga=c[e+4>>2]|0;Q=fg(Q|0,z|0,fa|0,ga|0)|0;L=z;s=Ze(n^Q,s^L,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;T=Ze(j^I,T^U,24)|0;j=z;L=fg(Q|0,L|0,T|0,j|0)|0;L=fg(L|0,z|0,c[O>>2]|0,c[O+4>>2]|0)|0;Q=z;n=Ze(s^L,n^Q,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;j=Ze(T^U,j^I,63)|0;T=z;Z=fg(S|0,Z|0,j|0,T|0)|0;ea=fg(Z|0,z|0,da|0,ea|0)|0;da=z;C=Ze(A^ea,C^da,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;T=Ze(j^u,T^p,24)|0;j=z;da=fg(ea|0,da|0,T|0,j|0)|0;ba=fg(da|0,z|0,b|0,ba|0)|0;b=z;A=Ze(C^ba,A^b,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;j=Ze(T^p,j^u,63)|0;c[g+32>>2]=j;c[g+32+4>>2]=z;W=fg(K|0,V|0,H|0,W|0)|0;W=fg(W|0,z|0,c[aa>>2]|0,c[aa+4>>2]|0)|0;H=z;w=Ze(h^W,w^H,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;H=fg(W|0,H|0,V|0,K|0)|0;H=fg(H|0,z|0,c[R>>2]|0,c[R+4>>2]|0)|0;W=z;h=Ze(w^H,h^W,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;M=fg(B|0,D|0,ca|0,M|0)|0;M=fg(M|0,z|0,c[x>>2]|0,c[x+4>>2]|0)|0;ca=z;s=Ze(n^M,s^ca,32)|0;n=z;J=fg(k|0,J|0,s|0,n|0)|0;k=z;D=Ze(B^J,D^k,24)|0;B=z;ca=fg(M|0,ca|0,D|0,B|0)|0;ca=fg(ca|0,z|0,c[r>>2]|0,c[r+4>>2]|0)|0;M=z;n=Ze(s^ca,n^M,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;k=fg(J|0,k|0,n|0,s|0)|0;J=z;B=Ze(D^k,B^J,63)|0;D=z;Q=fg(m|0,o|0,L|0,Q|0)|0;Q=fg(Q|0,z|0,c[g+128>>2]|0,c[g+128+4>>2]|0)|0;L=z;j=Ze(c[g+120>>2]^Q,c[g+120+4>>2]^L,32)|0;T=z;F=fg(E|0,F|0,j|0,T|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;L=fg(Q|0,L|0,o|0,m|0)|0;_=fg(L|0,z|0,G|0,_|0)|0;G=z;T=Ze(j^_,T^G,16)|0;j=z;E=fg(F|0,E|0,T|0,j|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;b=fg(K|0,V|0,ba|0,b|0)|0;b=fg(b|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;ba=z;j=Ze(T^b,j^ba,32)|0;T=z;J=fg(k|0,J|0,j|0,T|0)|0;k=z;V=Ze(K^J,V^k,24)|0;K=z;ba=fg(b|0,ba|0,V|0,K|0)|0;ga=fg(ba|0,z|0,fa|0,ga|0)|0;fa=z;T=Ze(j^ga,T^fa,16)|0;j=z;c[g+120>>2]=T;c[g+120+4>>2]=j;j=fg(J|0,k|0,T|0,j|0)|0;T=z;c[g+80>>2]=j;c[g+80+4>>2]=T;K=Ze(V^j,K^T,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;W=fg(B|0,D|0,H|0,W|0)|0;W=fg(W|0,z|0,c[P>>2]|0,c[P+4>>2]|0)|0;H=z;C=Ze(A^W,C^H,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;H=fg(W|0,H|0,D|0,B|0)|0;W=c[v>>2]|0;k=c[v+4>>2]|0;H=fg(H|0,z|0,W|0,k|0)|0;J=z;A=Ze(C^H,A^J,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;M=fg(m|0,o|0,ca|0,M|0)|0;ca=c[N>>2]|0;ba=c[N+4>>2]|0;M=fg(M|0,z|0,ca|0,ba|0)|0;b=z;w=Ze(h^M,w^b,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;b=fg(M|0,b|0,o|0,m|0)|0;M=c[X>>2]|0;L=c[X+4>>2]|0;b=fg(b|0,z|0,M|0,L|0)|0;Q=z;h=Ze(w^b,h^Q,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;da=c[g+32>>2]|0;ea=c[g+32+4>>2]|0;G=fg(da|0,ea|0,_|0,G|0)|0;_=c[O>>2]|0;Z=c[O+4>>2]|0;G=fg(G|0,z|0,_|0,Z|0)|0;S=z;s=Ze(n^G,s^S,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;ea=Ze(da^I,ea^U,24)|0;da=z;S=fg(G|0,S|0,ea|0,da|0)|0;G=c[t>>2]|0;$=c[t+4>>2]|0;S=fg(S|0,z|0,G|0,$|0)|0;Y=z;n=Ze(s^S,n^Y,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;da=Ze(ea^U,da^I,63)|0;ea=z;fa=fg(ga|0,fa|0,da|0,ea|0)|0;Z=fg(fa|0,z|0,_|0,Z|0)|0;_=z;C=Ze(A^Z,C^_,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;ea=Ze(da^u,ea^p,24)|0;da=z;_=fg(Z|0,_|0,ea|0,da|0)|0;_=fg(_|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;Z=z;A=Ze(C^_,A^Z,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;da=Ze(ea^p,da^u,63)|0;c[g+32>>2]=da;c[g+32+4>>2]=z;J=fg(K|0,V|0,H|0,J|0)|0;J=fg(J|0,z|0,c[d>>2]|0,c[d+4>>2]|0)|0;H=z;w=Ze(h^J,w^H,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;H=fg(J|0,H|0,V|0,K|0)|0;L=fg(H|0,z|0,M|0,L|0)|0;M=z;h=Ze(w^L,h^M,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;Q=fg(B|0,D|0,b|0,Q|0)|0;k=fg(Q|0,z|0,W|0,k|0)|0;W=z;s=Ze(n^k,s^W,32)|0;n=z;T=fg(j|0,T|0,s|0,n|0)|0;j=z;D=Ze(B^T,D^j,24)|0;B=z;W=fg(k|0,W|0,D|0,B|0)|0;W=fg(W|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;k=z;n=Ze(s^W,n^k,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;j=fg(T|0,j|0,n|0,s|0)|0;T=z;B=Ze(D^j,B^T,63)|0;D=z;Y=fg(m|0,o|0,S|0,Y|0)|0;ba=fg(Y|0,z|0,ca|0,ba|0)|0;ca=z;Y=Ze(c[g+120>>2]^ba,c[g+120+4>>2]^ca,32)|0;S=z;F=fg(E|0,F|0,Y|0,S|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;ca=fg(ba|0,ca|0,o|0,m|0)|0;$=fg(ca|0,z|0,G|0,$|0)|0;G=z;S=Ze(Y^$,S^G,16)|0;Y=z;E=fg(F|0,E|0,S|0,Y|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;Z=fg(K|0,V|0,_|0,Z|0)|0;Z=fg(Z|0,z|0,c[y>>2]|0,c[y+4>>2]|0)|0;_=z;Y=Ze(S^Z,Y^_,32)|0;S=z;T=fg(j|0,T|0,Y|0,S|0)|0;j=z;V=Ze(K^T,V^j,24)|0;K=z;_=fg(Z|0,_|0,V|0,K|0)|0;_=fg(_|0,z|0,c[x>>2]|0,c[x+4>>2]|0)|0;Z=z;S=Ze(Y^_,S^Z,16)|0;Y=z;c[g+120>>2]=S;c[g+120+4>>2]=Y;Y=fg(T|0,j|0,S|0,Y|0)|0;S=z;c[g+80>>2]=Y;c[g+80+4>>2]=S;K=Ze(V^Y,K^S,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;M=fg(B|0,D|0,L|0,M|0)|0;M=fg(M|0,z|0,c[R>>2]|0,c[R+4>>2]|0)|0;L=z;C=Ze(A^M,C^L,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;L=fg(M|0,L|0,D|0,B|0)|0;L=fg(L|0,z|0,c[aa>>2]|0,c[aa+4>>2]|0)|0;M=z;A=Ze(C^L,A^M,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;k=fg(m|0,o|0,W|0,k|0)|0;W=c[r>>2]|0;j=c[r+4>>2]|0;k=fg(k|0,z|0,W|0,j|0)|0;T=z;w=Ze(h^k,w^T,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;T=fg(k|0,T|0,o|0,m|0)|0;T=fg(T|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;k=z;h=Ze(w^T,h^k,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;ca=c[g+32>>2]|0;ba=c[g+32+4>>2]|0;G=fg(ca|0,ba|0,$|0,G|0)|0;G=fg(G|0,z|0,c[P>>2]|0,c[P+4>>2]|0)|0;$=z;s=Ze(n^G,s^$,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;ba=Ze(ca^I,ba^U,24)|0;ca=z;$=fg(G|0,$|0,ba|0,ca|0)|0;G=c[g+128>>2]|0;Q=c[g+128+4>>2]|0;$=fg($|0,z|0,G|0,Q|0)|0;b=z;n=Ze(s^$,n^b,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;ca=Ze(ba^U,ca^I,63)|0;ba=z;Z=fg(_|0,Z|0,ca|0,ba|0)|0;Q=fg(Z|0,z|0,G|0,Q|0)|0;G=z;C=Ze(A^Q,C^G,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;ba=Ze(ca^u,ba^p,24)|0;ca=z;G=fg(Q|0,G|0,ba|0,ca|0)|0;G=fg(G|0,z|0,c[N>>2]|0,c[N+4>>2]|0)|0;Q=z;A=Ze(C^G,A^Q,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;ca=Ze(ba^p,ca^u,63)|0;c[g+32>>2]=ca;c[g+32+4>>2]=z;M=fg(K|0,V|0,L|0,M|0)|0;M=fg(M|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;L=z;w=Ze(h^M,w^L,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;L=fg(M|0,L|0,V|0,K|0)|0;j=fg(L|0,z|0,W|0,j|0)|0;W=z;h=Ze(w^j,h^W,16)|0;w=z;c[g+104>>2]=h;c[g+104+4>>2]=w;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;K=Ze(V^U,K^I,63)|0;V=z;k=fg(B|0,D|0,T|0,k|0)|0;k=fg(k|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;T=z;s=Ze(n^k,s^T,32)|0;n=z;S=fg(Y|0,S|0,s|0,n|0)|0;Y=z;D=Ze(B^S,D^Y,24)|0;B=z;T=fg(k|0,T|0,D|0,B|0)|0;T=fg(T|0,z|0,c[t>>2]|0,c[t+4>>2]|0)|0;k=z;n=Ze(s^T,n^k,16)|0;s=z;c[g+112>>2]=n;c[g+112+4>>2]=s;Y=fg(S|0,Y|0,n|0,s|0)|0;S=z;B=Ze(D^Y,B^S,63)|0;D=z;b=fg(m|0,o|0,$|0,b|0)|0;b=fg(b|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;$=z;L=Ze(c[g+120>>2]^b,c[g+120+4>>2]^$,32)|0;M=z;F=fg(E|0,F|0,L|0,M|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;$=fg(b|0,$|0,o|0,m|0)|0;$=fg($|0,z|0,c[v>>2]|0,c[v+4>>2]|0)|0;b=z;M=Ze(L^$,M^b,16)|0;L=z;E=fg(F|0,E|0,M|0,L|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;Q=fg(K|0,V|0,G|0,Q|0)|0;G=c[d>>2]|0;d=c[d+4>>2]|0;Q=fg(Q|0,z|0,G|0,d|0)|0;ca=z;L=Ze(M^Q,L^ca,32)|0;M=z;S=fg(Y|0,S|0,L|0,M|0)|0;Y=z;V=Ze(K^S,V^Y,24)|0;K=z;ca=fg(Q|0,ca|0,V|0,K|0)|0;Q=c[R>>2]|0;R=c[R+4>>2]|0;ca=fg(ca|0,z|0,Q|0,R|0)|0;ba=z;M=Ze(L^ca,M^ba,16)|0;L=z;c[g+120>>2]=M;c[g+120+4>>2]=L;L=fg(S|0,Y|0,M|0,L|0)|0;M=z;c[g+80>>2]=L;c[g+80+4>>2]=M;K=Ze(V^L,K^M,63)|0;V=z;c[g+40>>2]=K;c[g+40+4>>2]=V;W=fg(B|0,D|0,j|0,W|0)|0;j=c[O>>2]|0;O=c[O+4>>2]|0;W=fg(W|0,z|0,j|0,O|0)|0;Y=z;C=Ze(A^W,C^Y,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;Y=fg(W|0,Y|0,D|0,B|0)|0;Y=fg(Y|0,z|0,c[x>>2]|0,c[x+4>>2]|0)|0;W=z;A=Ze(C^Y,A^W,16)|0;C=z;E=fg(F|0,E|0,A|0,C|0)|0;F=z;c[g+88>>2]=E;c[g+88+4>>2]=F;B=Ze(D^E,B^F,63)|0;D=z;c[g+48>>2]=B;c[g+48+4>>2]=D;k=fg(m|0,o|0,T|0,k|0)|0;k=fg(k|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;T=z;w=Ze(h^k,w^T,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;T=fg(k|0,T|0,o|0,m|0)|0;k=c[P>>2]|0;P=c[P+4>>2]|0;T=fg(T|0,z|0,k|0,P|0)|0;S=z;h=Ze(w^T,h^S,16)|0;w=z;p=fg(u|0,p|0,h|0,w|0)|0;u=z;m=Ze(o^p,m^u,63)|0;o=z;c[g+56>>2]=m;c[g+56+4>>2]=o;Z=c[g+32>>2]|0;_=c[g+32+4>>2]|0;b=fg(Z|0,_|0,$|0,b|0)|0;$=c[aa>>2]|0;aa=c[aa+4>>2]|0;b=fg(b|0,z|0,$|0,aa|0)|0;H=z;s=Ze(n^b,s^H,32)|0;n=z;I=fg(U|0,I|0,s|0,n|0)|0;U=z;_=Ze(Z^I,_^U,24)|0;Z=z;H=fg(b|0,H|0,_|0,Z|0)|0;b=c[y>>2]|0;y=c[y+4>>2]|0;H=fg(H|0,z|0,b|0,y|0)|0;J=z;n=Ze(s^H,n^J,16)|0;s=z;U=fg(I|0,U|0,n|0,s|0)|0;I=z;Z=Ze(_^U,Z^I,63)|0;_=z;ba=fg(ca|0,ba|0,Z|0,_|0)|0;aa=fg(ba|0,z|0,$|0,aa|0)|0;$=z;C=Ze(A^aa,C^$,32)|0;A=z;u=fg(p|0,u|0,C|0,A|0)|0;p=z;_=Ze(Z^u,_^p,24)|0;Z=z;$=fg(aa|0,$|0,_|0,Z|0)|0;O=fg($|0,z|0,j|0,O|0)|0;j=z;A=Ze(C^O,A^j,16)|0;C=z;p=fg(u|0,p|0,A|0,C|0)|0;u=z;c[g+64>>2]=p;c[g+64+4>>2]=u;Z=Ze(_^p,Z^u,63)|0;c[g+32>>2]=Z;c[g+32+4>>2]=z;W=fg(K|0,V|0,Y|0,W|0)|0;X=fg(W|0,z|0,c[X>>2]|0,c[X+4>>2]|0)|0;W=z;w=Ze(h^X,w^W,32)|0;h=z;I=fg(U|0,I|0,w|0,h|0)|0;U=z;V=Ze(K^I,V^U,24)|0;K=z;W=fg(X|0,W|0,V|0,K|0)|0;d=fg(W|0,z|0,G|0,d|0)|0;G=z;h=Ze(w^d,h^G,16)|0;w=z;U=fg(I|0,U|0,h|0,w|0)|0;I=z;c[g+72>>2]=U;c[g+72+4>>2]=I;I=Ze(V^U,K^I,63)|0;K=z;S=fg(B|0,D|0,T|0,S|0)|0;R=fg(S|0,z|0,Q|0,R|0)|0;Q=z;s=Ze(n^R,s^Q,32)|0;n=z;M=fg(L|0,M|0,s|0,n|0)|0;L=z;D=Ze(B^M,D^L,24)|0;B=z;Q=fg(R|0,Q|0,D|0,B|0)|0;y=fg(Q|0,z|0,b|0,y|0)|0;b=z;n=Ze(s^y,n^b,16)|0;s=z;L=fg(M|0,L|0,n|0,s|0)|0;M=z;B=Ze(D^L,B^M,63)|0;D=z;J=fg(m|0,o|0,H|0,J|0)|0;P=fg(J|0,z|0,k|0,P|0)|0;k=z;J=Ze(c[g+120>>2]^P,c[g+120+4>>2]^k,32)|0;H=z;F=fg(E|0,F|0,J|0,H|0)|0;E=z;o=Ze(m^F,o^E,24)|0;m=z;k=fg(P|0,k|0,o|0,m|0)|0;q=fg(k|0,z|0,c[q>>2]|0,c[q+4>>2]|0)|0;k=z;H=Ze(J^q,H^k,16)|0;J=z;E=fg(F|0,E|0,H|0,J|0)|0;F=z;m=Ze(o^E,m^F,63)|0;o=z;j=fg(I|0,K|0,O|0,j|0)|0;N=fg(j|0,z|0,c[N>>2]|0,c[N+4>>2]|0)|0;j=z;J=Ze(H^N,J^j,32)|0;H=z;M=fg(L|0,M|0,J|0,H|0)|0;L=z;K=Ze(I^M,K^L,24)|0;I=z;j=fg(N|0,j|0,K|0,I|0)|0;i=fg(j|0,z|0,c[i>>2]|0,c[i+4>>2]|0)|0;j=z;c[g>>2]=i;c[g+4>>2]=j;H=Ze(J^i,H^j,16)|0;J=z;c[g+120>>2]=H;c[g+120+4>>2]=J;J=fg(M|0,L|0,H|0,J|0)|0;H=z;c[g+80>>2]=J;c[g+80+4>>2]=H;H=Ze(K^J,I^H,63)|0;c[g+40>>2]=H;c[g+40+4>>2]=z;G=fg(B|0,D|0,d|0,G|0)|0;G=fg(G|0,z|0,c[g+128>>2]|0,c[g+128+4>>2]|0)|0;d=z;C=Ze(A^G,C^d,32)|0;A=z;F=fg(E|0,F|0,C|0,A|0)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;d=fg(G|0,d|0,D|0,B|0)|0;e=fg(d|0,z|0,c[e>>2]|0,c[e+4>>2]|0)|0;d=z;c[g+8>>2]=e;c[g+8+4>>2]=d;A=Ze(C^e,A^d,16)|0;C=z;c[g+96>>2]=A;c[g+96+4>>2]=C;C=fg(F|0,E|0,A|0,C|0)|0;A=z;c[g+88>>2]=C;c[g+88+4>>2]=A;A=Ze(D^C,B^A,63)|0;c[g+48>>2]=A;c[g+48+4>>2]=z;b=fg(m|0,o|0,y|0,b|0)|0;x=fg(b|0,z|0,c[x>>2]|0,c[x+4>>2]|0)|0;b=z;w=Ze(h^x,w^b,32)|0;h=z;u=fg(p|0,u|0,w|0,h|0)|0;p=z;o=Ze(m^u,o^p,24)|0;m=z;b=fg(x|0,b|0,o|0,m|0)|0;v=fg(b|0,z|0,c[v>>2]|0,c[v+4>>2]|0)|0;b=z;c[g+16>>2]=v;c[g+16+4>>2]=b;b=Ze(w^v,h^b,16)|0;h=z;c[g+104>>2]=b;c[g+104+4>>2]=h;h=fg(u|0,p|0,b|0,h|0)|0;b=z;c[g+64>>2]=h;c[g+64+4>>2]=b;m=Ze(o^h,m^b,63)|0;c[g+56>>2]=m;c[g+56+4>>2]=z;m=c[g+32>>2]|0;o=c[g+32+4>>2]|0;k=fg(m|0,o|0,q|0,k|0)|0;t=fg(k|0,z|0,c[t>>2]|0,c[t+4>>2]|0)|0;k=z;s=Ze(n^t,s^k,32)|0;n=z;q=fg(c[g+72>>2]|0,c[g+72+4>>2]|0,s|0,n|0)|0;p=z;o=Ze(m^q,o^p,24)|0;m=z;k=fg(t|0,k|0,o|0,m|0)|0;r=fg(k|0,z|0,c[r>>2]|0,c[r+4>>2]|0)|0;k=z;c[g+24>>2]=r;c[g+24+4>>2]=k;k=Ze(s^r,n^k,16)|0;n=z;c[g+112>>2]=k;c[g+112+4>>2]=n;n=fg(q|0,p|0,k|0,n|0)|0;k=z;c[g+72>>2]=n;c[g+72+4>>2]=k;k=Ze(o^n,m^k,63)|0;c[g+32>>2]=k;c[g+32+4>>2]=z;b=j^c[a+4>>2]^b;c[a>>2]=i^c[a>>2]^h;c[a+4>>2]=b;b=1;while(1){ia=a+(b<<3)|0;ha=g+(b+8<<3)|0;d=d^c[ia+4>>2]^c[ha+4>>2];c[ia>>2]=e^c[ia>>2]^c[ha>>2];c[ia+4>>2]=d;d=b+1|0;if((d|0)==8)break;b=d;e=c[g+(d<<3)>>2]|0;d=c[g+(d<<3)+4>>2]|0}l=f;return}function ha(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0;Za=df(a[c>>0]|0,a[c+1>>0]|0,a[c+2>>0]|0)|0;nb=Qd(c+2|0)|0;nb=yf(nb|0,z|0,5)|0;A=df(a[c+5>>0]|0,a[c+6>>0]|0,a[c+7>>0]|0)|0;A=yf(A|0,z|0,2)|0;kb=Qd(c+7|0)|0;kb=yf(kb|0,z|0,7)|0;l=Qd(c+10|0)|0;l=yf(l|0,z|0,4)|0;J=df(a[c+13>>0]|0,a[c+14>>0]|0,a[c+15>>0]|0)|0;J=yf(J|0,z|0,1)|0;F=Qd(c+15|0)|0;F=yf(F|0,z|0,6)|0;ea=df(a[c+18>>0]|0,a[c+19>>0]|0,a[c+20>>0]|0)|0;ea=yf(ea|0,z|0,3)|0;ib=df(a[c+21>>0]|0,a[c+22>>0]|0,a[c+23>>0]|0)|0;I=Qd(c+23|0)|0;I=yf(I|0,z|0,5)|0;qc=df(a[c+26>>0]|0,a[c+27>>0]|0,a[c+28>>0]|0)|0;qc=yf(qc|0,z|0,2)|0;n=Qd(c+28|0)|0;n=yf(n|0,z|0,7)|0;ua=z;ub=df(a[d>>0]|0,a[d+1>>0]|0,a[d+2>>0]|0)|0;Ia=Qd(d+2|0)|0;Ia=yf(Ia|0,z|0,5)|0;Wa=df(a[d+5>>0]|0,a[d+6>>0]|0,a[d+7>>0]|0)|0;Wa=yf(Wa|0,z|0,2)|0;ca=Qd(d+7|0)|0;ca=yf(ca|0,z|0,7)|0;P=Qd(d+10|0)|0;P=yf(P|0,z|0,4)|0;ta=df(a[d+13>>0]|0,a[d+14>>0]|0,a[d+15>>0]|0)|0;ta=yf(ta|0,z|0,1)|0;xa=Qd(d+15|0)|0;xa=yf(xa|0,z|0,6)|0;rb=df(a[d+18>>0]|0,a[d+19>>0]|0,a[d+20>>0]|0)|0;rb=yf(rb|0,z|0,3)|0;na=df(a[d+21>>0]|0,a[d+22>>0]|0,a[d+23>>0]|0)|0;O=Qd(d+23|0)|0;O=yf(O|0,z|0,5)|0;Ja=df(a[d+26>>0]|0,a[d+27>>0]|0,a[d+28>>0]|0)|0;Ja=yf(Ja|0,z|0,2)|0;w=Qd(d+28|0)|0;w=yf(w|0,z|0,7)|0;qa=z;V=df(a[e>>0]|0,a[e+1>>0]|0,a[e+2>>0]|0)|0;oa=Qd(e+2|0)|0;oa=yf(oa|0,z|0,5)|0;sa=df(a[e+5>>0]|0,a[e+6>>0]|0,a[e+7>>0]|0)|0;sa=yf(sa|0,z|0,2)|0;Na=Qd(e+7|0)|0;Na=yf(Na|0,z|0,7)|0;ma=Qd(e+10|0)|0;ma=yf(ma|0,z|0,4)|0;Da=df(a[e+13>>0]|0,a[e+14>>0]|0,a[e+15>>0]|0)|0;Da=yf(Da|0,z|0,1)|0;fb=Qd(e+15|0)|0;fb=yf(fb|0,z|0,6)|0;g=df(a[e+18>>0]|0,a[e+19>>0]|0,a[e+20>>0]|0)|0;g=yf(g|0,z|0,3)|0;Ra=df(a[e+21>>0]|0,a[e+22>>0]|0,a[e+23>>0]|0)|0;E=Qd(e+23|0)|0;E=yf(E|0,z|0,5)|0;Qa=df(a[e+26>>0]|0,a[e+27>>0]|0,a[e+28>>0]|0)|0;Qa=yf(Qa|0,z|0,2)|0;c=Qd(e+28|0)|0;c=yf(c|0,z|0,7)|0;h=z;pa=af(ub&2097151|0,0,Za&2097151|0,0)|0;pa=fg(V&2097151|0,0,pa|0,z|0)|0;V=z;pc=af(Ia&2097151|0,0,Za&2097151|0,0)|0;oc=z;nc=af(ub&2097151|0,0,nb&2097151|0,0)|0;t=z;ja=af(Wa&2097151|0,0,Za&2097151|0,0)|0;ra=z;ka=af(Ia&2097151|0,0,nb&2097151|0,0)|0;ic=z;S=af(ub&2097151|0,0,A&2097151|0,0)|0;S=fg(ka|0,ic|0,S|0,z|0)|0;ra=fg(S|0,z|0,ja|0,ra|0)|0;sa=fg(ra|0,z|0,sa&2097151|0,0)|0;ra=z;ja=af(ca&2097151|0,0,Za&2097151|0,0)|0;S=z;ic=af(Wa&2097151|0,0,nb&2097151|0,0)|0;ka=z;mc=af(Ia&2097151|0,0,A&2097151|0,0)|0;lc=z;kc=af(ub&2097151|0,0,kb&2097151|0,0)|0;jc=z;Ca=af(P&2097151|0,0,Za&2097151|0,0)|0;la=z;$b=af(ca&2097151|0,0,nb&2097151|0,0)|0;_=z;bc=af(Wa&2097151|0,0,A&2097151|0,0)|0;Ba=z;cc=af(Ia&2097151|0,0,kb&2097151|0,0)|0;dc=z;ac=af(ub&2097151|0,0,l&2097151|0,0)|0;ac=fg(cc|0,dc|0,ac|0,z|0)|0;Ba=fg(ac|0,z|0,bc|0,Ba|0)|0;_=fg(Ba|0,z|0,$b|0,_|0)|0;la=fg(_|0,z|0,Ca|0,la|0)|0;ma=fg(la|0,z|0,ma&2097151|0,0)|0;la=z;Ca=af(ta&2097151|0,0,Za&2097151|0,0)|0;_=z;$b=af(P&2097151|0,0,nb&2097151|0,0)|0;Ba=z;bc=af(ca&2097151|0,0,A&2097151|0,0)|0;ac=z;dc=af(Wa&2097151|0,0,kb&2097151|0,0)|0;cc=z;hc=af(Ia&2097151|0,0,l&2097151|0,0)|0;gc=z;fc=af(ub&2097151|0,0,J&2097151|0,0)|0;ec=z;Y=af(xa&2097151|0,0,Za&2097151|0,0)|0;$a=z;Ob=af(ta&2097151|0,0,nb&2097151|0,0)|0;B=z;Qb=af(P&2097151|0,0,A&2097151|0,0)|0;X=z;Sb=af(ca&2097151|0,0,kb&2097151|0,0)|0;Pb=z;Ub=af(Wa&2097151|0,0,l&2097151|0,0)|0;Rb=z;Vb=af(Ia&2097151|0,0,J&2097151|0,0)|0;Wb=z;Tb=af(ub&2097151|0,0,F&2097151|0,0)|0;Tb=fg(Vb|0,Wb|0,Tb|0,z|0)|0;Rb=fg(Tb|0,z|0,Ub|0,Rb|0)|0;Pb=fg(Rb|0,z|0,Sb|0,Pb|0)|0;X=fg(Pb|0,z|0,Qb|0,X|0)|0;B=fg(X|0,z|0,Ob|0,B|0)|0;$a=fg(B|0,z|0,Y|0,$a|0)|0;fb=fg($a|0,z|0,fb&2097151|0,0)|0;$a=z;Y=af(rb&2097151|0,0,Za&2097151|0,0)|0;B=z;Ob=af(xa&2097151|0,0,nb&2097151|0,0)|0;X=z;Qb=af(ta&2097151|0,0,A&2097151|0,0)|0;Pb=z;Sb=af(P&2097151|0,0,kb&2097151|0,0)|0;Rb=z;Ub=af(ca&2097151|0,0,l&2097151|0,0)|0;Tb=z;Wb=af(Wa&2097151|0,0,J&2097151|0,0)|0;Vb=z;_b=af(Ia&2097151|0,0,F&2097151|0,0)|0;Zb=z;Yb=af(ub&2097151|0,0,ea&2097151|0,0)|0;Xb=z;zb=af(na&2097151|0,0,Za&2097151|0,0)|0;e=z;i=af(rb&2097151|0,0,nb&2097151|0,0)|0;Sa=z;xb=af(xa&2097151|0,0,A&2097151|0,0)|0;yb=z;Bb=af(ta&2097151|0,0,kb&2097151|0,0)|0;va=z;Db=af(P&2097151|0,0,l&2097151|0,0)|0;Ab=z;Fb=af(ca&2097151|0,0,J&2097151|0,0)|0;Cb=z;Hb=af(Wa&2097151|0,0,F&2097151|0,0)|0;Eb=z;Ib=af(Ia&2097151|0,0,ea&2097151|0,0)|0;Jb=z;Gb=af(ub&2097151|0,0,ib&2097151|0,0)|0;Gb=fg(Ib|0,Jb|0,Gb|0,z|0)|0;Eb=fg(Gb|0,z|0,Hb|0,Eb|0)|0;Cb=fg(Eb|0,z|0,Fb|0,Cb|0)|0;Ab=fg(Cb|0,z|0,Db|0,Ab|0)|0;va=fg(Ab|0,z|0,Bb|0,va|0)|0;yb=fg(va|0,z|0,xb|0,yb|0)|0;e=fg(yb|0,z|0,zb|0,e|0)|0;Sa=fg(e|0,z|0,i|0,Sa|0)|0;Ra=fg(Sa|0,z|0,Ra&2097151|0,0)|0;Sa=z;i=af(O&2097151|0,0,Za&2097151|0,0)|0;e=z;zb=af(na&2097151|0,0,nb&2097151|0,0)|0;yb=z;xb=af(rb&2097151|0,0,A&2097151|0,0)|0;va=z;Bb=af(xa&2097151|0,0,kb&2097151|0,0)|0;Ab=z;Db=af(ta&2097151|0,0,l&2097151|0,0)|0;Cb=z;Fb=af(P&2097151|0,0,J&2097151|0,0)|0;Eb=z;Hb=af(ca&2097151|0,0,F&2097151|0,0)|0;Gb=z;Jb=af(Wa&2097151|0,0,ea&2097151|0,0)|0;Ib=z;Nb=af(Ia&2097151|0,0,ib&2097151|0,0)|0;Mb=z;Lb=af(ub&2097151|0,0,I&2097151|0,0)|0;Kb=z;_a=af(Ja&2097151|0,0,Za&2097151|0,0)|0;Pa=z;ab=af(O&2097151|0,0,nb&2097151|0,0)|0;gb=z;$=af(na&2097151|0,0,A&2097151|0,0)|0;aa=z;U=af(rb&2097151|0,0,kb&2097151|0,0)|0;T=z;mb=af(xa&2097151|0,0,l&2097151|0,0)|0;lb=z;Ma=af(ta&2097151|0,0,J&2097151|0,0)|0;La=z;eb=af(P&2097151|0,0,F&2097151|0,0)|0;db=z;Ga=af(ca&2097151|0,0,ea&2097151|0,0)|0;Fa=z;Ua=af(Wa&2097151|0,0,ib&2097151|0,0)|0;Ta=z;wb=af(Ia&2097151|0,0,I&2097151|0,0)|0;L=z;Q=af(ub&2097151|0,0,qc&2097151|0,0)|0;Q=fg(wb|0,L|0,Q|0,z|0)|0;Ta=fg(Q|0,z|0,Ua|0,Ta|0)|0;Fa=fg(Ta|0,z|0,Ga|0,Fa|0)|0;db=fg(Fa|0,z|0,eb|0,db|0)|0;La=fg(db|0,z|0,Ma|0,La|0)|0;lb=fg(La|0,z|0,mb|0,lb|0)|0;aa=fg(lb|0,z|0,$|0,aa|0)|0;T=fg(aa|0,z|0,U|0,T|0)|0;gb=fg(T|0,z|0,ab|0,gb|0)|0;Pa=fg(gb|0,z|0,_a|0,Pa|0)|0;Qa=fg(Pa|0,z|0,Qa&2097151|0,0)|0;Pa=z;Za=af(w|0,qa|0,Za&2097151|0,0)|0;_a=z;gb=af(Ja&2097151|0,0,nb&2097151|0,0)|0;ab=z;T=af(O&2097151|0,0,A&2097151|0,0)|0;U=z;aa=af(na&2097151|0,0,kb&2097151|0,0)|0;$=z;lb=af(rb&2097151|0,0,l&2097151|0,0)|0;mb=z;La=af(xa&2097151|0,0,J&2097151|0,0)|0;Ma=z;db=af(ta&2097151|0,0,F&2097151|0,0)|0;eb=z;Fa=af(P&2097151|0,0,ea&2097151|0,0)|0;Ga=z;Ta=af(ca&2097151|0,0,ib&2097151|0,0)|0;Ua=z;Q=af(Wa&2097151|0,0,I&2097151|0,0)|0;L=z;wb=af(Ia&2097151|0,0,qc&2097151|0,0)|0;vb=z;ub=af(ub&2097151|0,0,n|0,ua|0)|0;tb=z;nb=af(w|0,qa|0,nb&2097151|0,0)|0;ob=z;bb=af(Ja&2097151|0,0,A&2097151|0,0)|0;v=z;M=af(O&2097151|0,0,kb&2097151|0,0)|0;cb=z;pb=af(na&2097151|0,0,l&2097151|0,0)|0;u=z;p=af(rb&2097151|0,0,J&2097151|0,0)|0;hb=z;q=af(xa&2097151|0,0,F&2097151|0,0)|0;qb=z;ha=af(ta&2097151|0,0,ea&2097151|0,0)|0;y=z;da=af(P&2097151|0,0,ib&2097151|0,0)|0;ia=z;Ha=af(ca&2097151|0,0,I&2097151|0,0)|0;R=z;jb=af(Wa&2097151|0,0,qc&2097151|0,0)|0;Va=z;Ia=af(Ia&2097151|0,0,n|0,ua|0)|0;Ia=fg(jb|0,Va|0,Ia|0,z|0)|0;R=fg(Ia|0,z|0,Ha|0,R|0)|0;ia=fg(R|0,z|0,da|0,ia|0)|0;y=fg(ia|0,z|0,ha|0,y|0)|0;qb=fg(y|0,z|0,q|0,qb|0)|0;u=fg(qb|0,z|0,pb|0,u|0)|0;hb=fg(u|0,z|0,p|0,hb|0)|0;cb=fg(hb|0,z|0,M|0,cb|0)|0;v=fg(cb|0,z|0,bb|0,v|0)|0;ob=fg(v|0,z|0,nb|0,ob|0)|0;nb=z;A=af(w|0,qa|0,A&2097151|0,0)|0;v=z;bb=af(Ja&2097151|0,0,kb&2097151|0,0)|0;cb=z;M=af(O&2097151|0,0,l&2097151|0,0)|0;hb=z;p=af(na&2097151|0,0,J&2097151|0,0)|0;u=z;pb=af(rb&2097151|0,0,F&2097151|0,0)|0;qb=z;q=af(xa&2097151|0,0,ea&2097151|0,0)|0;y=z;ha=af(ta&2097151|0,0,ib&2097151|0,0)|0;ia=z;da=af(P&2097151|0,0,I&2097151|0,0)|0;R=z;Ha=af(ca&2097151|0,0,qc&2097151|0,0)|0;Ia=z;Wa=af(Wa&2097151|0,0,n|0,ua|0)|0;Va=z;kb=af(w|0,qa|0,kb&2097151|0,0)|0;jb=z;Xa=af(Ja&2097151|0,0,l&2097151|0,0)|0;j=z;m=af(O&2097151|0,0,J&2097151|0,0)|0;Ya=z;W=af(na&2097151|0,0,F&2097151|0,0)|0;G=z;Z=af(rb&2097151|0,0,ea&2097151|0,0)|0;f=z;za=af(xa&2097151|0,0,ib&2097151|0,0)|0;r=z;wa=af(ta&2097151|0,0,I&2097151|0,0)|0;k=z;sb=af(P&2097151|0,0,qc&2097151|0,0)|0;o=z;ca=af(ca&2097151|0,0,n|0,ua|0)|0;ca=fg(sb|0,o|0,ca|0,z|0)|0;k=fg(ca|0,z|0,wa|0,k|0)|0;r=fg(k|0,z|0,za|0,r|0)|0;G=fg(r|0,z|0,W|0,G|0)|0;f=fg(G|0,z|0,Z|0,f|0)|0;Ya=fg(f|0,z|0,m|0,Ya|0)|0;j=fg(Ya|0,z|0,Xa|0,j|0)|0;jb=fg(j|0,z|0,kb|0,jb|0)|0;kb=z;l=af(w|0,qa|0,l&2097151|0,0)|0;j=z;Xa=af(Ja&2097151|0,0,J&2097151|0,0)|0;Ya=z;m=af(O&2097151|0,0,F&2097151|0,0)|0;f=z;Z=af(na&2097151|0,0,ea&2097151|0,0)|0;G=z;W=af(rb&2097151|0,0,ib&2097151|0,0)|0;r=z;za=af(xa&2097151|0,0,I&2097151|0,0)|0;k=z;wa=af(ta&2097151|0,0,qc&2097151|0,0)|0;ca=z;P=af(P&2097151|0,0,n|0,ua|0)|0;o=z;J=af(w|0,qa|0,J&2097151|0,0)|0;sb=z;fa=af(Ja&2097151|0,0,F&2097151|0,0)|0;Ka=z;Ea=af(O&2097151|0,0,ea&2097151|0,0)|0;C=z;ba=af(na&2097151|0,0,ib&2097151|0,0)|0;s=z;D=af(rb&2097151|0,0,I&2097151|0,0)|0;Aa=z;K=af(xa&2097151|0,0,qc&2097151|0,0)|0;ya=z;d=af(ta&2097151|0,0,n|0,ua|0)|0;d=fg(K|0,ya|0,d|0,z|0)|0;s=fg(d|0,z|0,ba|0,s|0)|0;Aa=fg(s|0,z|0,D|0,Aa|0)|0;C=fg(Aa|0,z|0,Ea|0,C|0)|0;Ka=fg(C|0,z|0,fa|0,Ka|0)|0;sb=fg(Ka|0,z|0,J|0,sb|0)|0;J=z;F=af(w|0,qa|0,F&2097151|0,0)|0;Ka=z;fa=af(Ja&2097151|0,0,ea&2097151|0,0)|0;C=z;Ea=af(O&2097151|0,0,ib&2097151|0,0)|0;Aa=z;D=af(na&2097151|0,0,I&2097151|0,0)|0;s=z;ba=af(rb&2097151|0,0,qc&2097151|0,0)|0;d=z;xa=af(xa&2097151|0,0,n|0,ua|0)|0;ya=z;ea=af(w|0,qa|0,ea&2097151|0,0)|0;K=z;ta=af(Ja&2097151|0,0,ib&2097151|0,0)|0;N=z;Oa=af(O&2097151|0,0,I&2097151|0,0)|0;H=z;x=af(na&2097151|0,0,qc&2097151|0,0)|0;ga=z;rb=af(rb&2097151|0,0,n|0,ua|0)|0;ga=fg(rb|0,z|0,x|0,ga|0)|0;H=fg(ga|0,z|0,Oa|0,H|0)|0;N=fg(H|0,z|0,ta|0,N|0)|0;K=fg(N|0,z|0,ea|0,K|0)|0;ea=z;ib=af(w|0,qa|0,ib&2097151|0,0)|0;N=z;ta=af(Ja&2097151|0,0,I&2097151|0,0)|0;H=z;Oa=af(O&2097151|0,0,qc&2097151|0,0)|0;ga=z;na=af(na&2097151|0,0,n|0,ua|0)|0;x=z;I=af(w|0,qa|0,I&2097151|0,0)|0;rb=z;sc=af(Ja&2097151|0,0,qc&2097151|0,0)|0;rc=z;O=af(O&2097151|0,0,n|0,ua|0)|0;O=fg(sc|0,rc|0,O|0,z|0)|0;rb=fg(O|0,z|0,I|0,rb|0)|0;I=z;qc=af(w|0,qa|0,qc&2097151|0,0)|0;O=z;Ja=af(Ja&2097151|0,0,n|0,ua|0)|0;Ja=fg(qc|0,O|0,Ja|0,z|0)|0;O=z;ua=af(w|0,qa|0,n|0,ua|0)|0;n=z;qa=fg(pa|0,V|0,1048576,0)|0;qa=yf(qa|0,z|0,21)|0;w=z;t=fg(pc|0,oc|0,nc|0,t|0)|0;oa=fg(t|0,z|0,oa&2097151|0,0)|0;oa=fg(oa|0,z|0,qa|0,w|0)|0;t=z;w=vf(qa|0,w|0,21)|0;w=cg(pa|0,V|0,w|0,z|0)|0;V=z;pa=fg(sa|0,ra|0,1048576,0)|0;pa=yf(pa|0,z|0,21)|0;qa=z;jc=fg(mc|0,lc|0,kc|0,jc|0)|0;ka=fg(jc|0,z|0,ic|0,ka|0)|0;S=fg(ka|0,z|0,ja|0,S|0)|0;Na=fg(S|0,z|0,Na&2097151|0,0)|0;Na=fg(Na|0,z|0,pa|0,qa|0)|0;S=z;qa=vf(pa|0,qa|0,21)|0;pa=z;ja=fg(ma|0,la|0,1048576,0)|0;ja=Xe(ja|0,z|0,21)|0;ka=z;ec=fg(hc|0,gc|0,fc|0,ec|0)|0;cc=fg(ec|0,z|0,dc|0,cc|0)|0;ac=fg(cc|0,z|0,bc|0,ac|0)|0;Ba=fg(ac|0,z|0,$b|0,Ba|0)|0;_=fg(Ba|0,z|0,Ca|0,_|0)|0;Da=fg(_|0,z|0,Da&2097151|0,0)|0;Da=fg(Da|0,z|0,ja|0,ka|0)|0;_=z;ka=vf(ja|0,ka|0,21)|0;ja=z;Ca=fg(fb|0,$a|0,1048576,0)|0;Ca=Xe(Ca|0,z|0,21)|0;Ba=z;Xb=fg(_b|0,Zb|0,Yb|0,Xb|0)|0;Vb=fg(Xb|0,z|0,Wb|0,Vb|0)|0;Tb=fg(Vb|0,z|0,Ub|0,Tb|0)|0;Rb=fg(Tb|0,z|0,Sb|0,Rb|0)|0;Pb=fg(Rb|0,z|0,Qb|0,Pb|0)|0;X=fg(Pb|0,z|0,Ob|0,X|0)|0;B=fg(X|0,z|0,Y|0,B|0)|0;g=fg(B|0,z|0,g&2097151|0,0)|0;g=fg(g|0,z|0,Ca|0,Ba|0)|0;B=z;Ba=vf(Ca|0,Ba|0,21)|0;Ca=z;Y=fg(Ra|0,Sa|0,1048576,0)|0;Y=Xe(Y|0,z|0,21)|0;X=z;Kb=fg(Nb|0,Mb|0,Lb|0,Kb|0)|0;Ib=fg(Kb|0,z|0,Jb|0,Ib|0)|0;Gb=fg(Ib|0,z|0,Hb|0,Gb|0)|0;Eb=fg(Gb|0,z|0,Fb|0,Eb|0)|0;Cb=fg(Eb|0,z|0,Db|0,Cb|0)|0;Ab=fg(Cb|0,z|0,Bb|0,Ab|0)|0;yb=fg(Ab|0,z|0,zb|0,yb|0)|0;va=fg(yb|0,z|0,xb|0,va|0)|0;e=fg(va|0,z|0,i|0,e|0)|0;e=fg(e|0,z|0,E&2097151|0,0)|0;e=fg(e|0,z|0,Y|0,X|0)|0;E=z;X=vf(Y|0,X|0,21)|0;Y=z;i=fg(Qa|0,Pa|0,1048576,0)|0;i=Xe(i|0,z|0,21)|0;va=z;tb=fg(wb|0,vb|0,ub|0,tb|0)|0;L=fg(tb|0,z|0,Q|0,L|0)|0;Ua=fg(L|0,z|0,Ta|0,Ua|0)|0;Ga=fg(Ua|0,z|0,Fa|0,Ga|0)|0;eb=fg(Ga|0,z|0,db|0,eb|0)|0;Ma=fg(eb|0,z|0,La|0,Ma|0)|0;$=fg(Ma|0,z|0,aa|0,$|0)|0;mb=fg($|0,z|0,lb|0,mb|0)|0;U=fg(mb|0,z|0,T|0,U|0)|0;_a=fg(U|0,z|0,Za|0,_a|0)|0;ab=fg(_a|0,z|0,gb|0,ab|0)|0;h=fg(ab|0,z|0,c|0,h|0)|0;h=fg(h|0,z|0,i|0,va|0)|0;c=z;va=vf(i|0,va|0,21)|0;i=z;ab=fg(ob|0,nb|0,1048576,0)|0;ab=Xe(ab|0,z|0,21)|0;gb=z;Va=fg(Ha|0,Ia|0,Wa|0,Va|0)|0;R=fg(Va|0,z|0,da|0,R|0)|0;ia=fg(R|0,z|0,ha|0,ia|0)|0;y=fg(ia|0,z|0,q|0,y|0)|0;u=fg(y|0,z|0,p|0,u|0)|0;qb=fg(u|0,z|0,pb|0,qb|0)|0;hb=fg(qb|0,z|0,M|0,hb|0)|0;cb=fg(hb|0,z|0,bb|0,cb|0)|0;v=fg(cb|0,z|0,A|0,v|0)|0;v=fg(v|0,z|0,ab|0,gb|0)|0;A=z;gb=vf(ab|0,gb|0,21)|0;ab=z;cb=fg(jb|0,kb|0,1048576,0)|0;cb=Xe(cb|0,z|0,21)|0;bb=z;o=fg(wa|0,ca|0,P|0,o|0)|0;k=fg(o|0,z|0,za|0,k|0)|0;G=fg(k|0,z|0,Z|0,G|0)|0;r=fg(G|0,z|0,W|0,r|0)|0;f=fg(r|0,z|0,m|0,f|0)|0;Ya=fg(f|0,z|0,Xa|0,Ya|0)|0;j=fg(Ya|0,z|0,l|0,j|0)|0;j=fg(j|0,z|0,cb|0,bb|0)|0;l=z;bb=vf(cb|0,bb|0,21)|0;cb=z;Ya=fg(sb|0,J|0,1048576,0)|0;Ya=Xe(Ya|0,z|0,21)|0;Xa=z;ya=fg(D|0,s|0,xa|0,ya|0)|0;d=fg(ya|0,z|0,ba|0,d|0)|0;Aa=fg(d|0,z|0,Ea|0,Aa|0)|0;C=fg(Aa|0,z|0,fa|0,C|0)|0;Ka=fg(C|0,z|0,F|0,Ka|0)|0;Ka=fg(Ka|0,z|0,Ya|0,Xa|0)|0;F=z;Xa=vf(Ya|0,Xa|0,21)|0;Ya=z;C=fg(K|0,ea|0,1048576,0)|0;C=Xe(C|0,z|0,21)|0;fa=z;x=fg(Oa|0,ga|0,na|0,x|0)|0;H=fg(x|0,z|0,ta|0,H|0)|0;N=fg(H|0,z|0,ib|0,N|0)|0;N=fg(N|0,z|0,C|0,fa|0)|0;ib=z;fa=vf(C|0,fa|0,21)|0;fa=cg(K|0,ea|0,fa|0,z|0)|0;ea=z;K=fg(rb|0,I|0,1048576,0)|0;K=Xe(K|0,z|0,21)|0;C=z;O=fg(Ja|0,O|0,K|0,C|0)|0;Ja=z;C=vf(K|0,C|0,21)|0;C=cg(rb|0,I|0,C|0,z|0)|0;I=z;rb=fg(ua|0,n|0,1048576,0)|0;rb=Xe(rb|0,z|0,21)|0;K=z;H=vf(rb|0,K|0,21)|0;H=cg(ua|0,n|0,H|0,z|0)|0;n=z;ua=fg(oa|0,t|0,1048576,0)|0;ua=yf(ua|0,z|0,21)|0;ta=z;x=vf(ua|0,ta|0,21)|0;x=cg(oa|0,t|0,x|0,z|0)|0;t=z;oa=fg(Na|0,S|0,1048576,0)|0;oa=Xe(oa|0,z|0,21)|0;na=z;ga=vf(oa|0,na|0,21)|0;ga=cg(Na|0,S|0,ga|0,z|0)|0;S=z;Na=fg(Da|0,_|0,1048576,0)|0;Na=Xe(Na|0,z|0,21)|0;Oa=z;Aa=vf(Na|0,Oa|0,21)|0;Aa=cg(Da|0,_|0,Aa|0,z|0)|0;_=z;Da=fg(g|0,B|0,1048576,0)|0;Da=Xe(Da|0,z|0,21)|0;Ea=z;d=vf(Da|0,Ea|0,21)|0;ba=z;ya=fg(e|0,E|0,1048576,0)|0;ya=Xe(ya|0,z|0,21)|0;xa=z;s=vf(ya|0,xa|0,21)|0;D=z;f=fg(h|0,c|0,1048576,0)|0;f=Xe(f|0,z|0,21)|0;m=z;r=vf(f|0,m|0,21)|0;W=z;G=fg(v|0,A|0,1048576,0)|0;G=Xe(G|0,z|0,21)|0;Z=z;k=vf(G|0,Z|0,21)|0;za=z;o=fg(j|0,l|0,1048576,0)|0;o=Xe(o|0,z|0,21)|0;P=z;ca=vf(o|0,P|0,21)|0;wa=z;hb=fg(Ka|0,F|0,1048576,0)|0;hb=Xe(hb|0,z|0,21)|0;M=z;ea=fg(hb|0,M|0,fa|0,ea|0)|0;fa=z;M=vf(hb|0,M|0,21)|0;M=cg(Ka|0,F|0,M|0,z|0)|0;F=z;Ka=fg(N|0,ib|0,1048576,0)|0;Ka=Xe(Ka|0,z|0,21)|0;hb=z;I=fg(Ka|0,hb|0,C|0,I|0)|0;C=z;hb=vf(Ka|0,hb|0,21)|0;hb=cg(N|0,ib|0,hb|0,z|0)|0;ib=z;N=fg(O|0,Ja|0,1048576,0)|0;N=Xe(N|0,z|0,21)|0;Ka=z;n=fg(N|0,Ka|0,H|0,n|0)|0;H=z;Ka=vf(N|0,Ka|0,21)|0;Ka=cg(O|0,Ja|0,Ka|0,z|0)|0;Ja=z;O=af(rb|0,K|0,666643,0)|0;N=z;qb=af(rb|0,K|0,470296,0)|0;pb=z;u=af(rb|0,K|0,654183,0)|0;p=z;y=af(rb|0,K|0,-997805,-1)|0;q=z;ia=af(rb|0,K|0,136657,0)|0;ha=z;K=af(rb|0,K|0,-683901,-1)|0;K=fg(sb|0,J|0,K|0,z|0)|0;Ya=cg(K|0,z|0,Xa|0,Ya|0)|0;P=fg(Ya|0,z|0,o|0,P|0)|0;o=z;Ya=af(n|0,H|0,666643,0)|0;Xa=z;K=af(n|0,H|0,470296,0)|0;J=z;sb=af(n|0,H|0,654183,0)|0;rb=z;R=af(n|0,H|0,-997805,-1)|0;da=z;Va=af(n|0,H|0,136657,0)|0;Wa=z;H=af(n|0,H|0,-683901,-1)|0;n=z;Ia=af(Ka|0,Ja|0,666643,0)|0;Ha=z;_a=af(Ka|0,Ja|0,470296,0)|0;Za=z;U=af(Ka|0,Ja|0,654183,0)|0;T=z;mb=af(Ka|0,Ja|0,-997805,-1)|0;lb=z;$=af(Ka|0,Ja|0,136657,0)|0;aa=z;Ja=af(Ka|0,Ja|0,-683901,-1)|0;Ka=z;q=fg(jb|0,kb|0,y|0,q|0)|0;Wa=fg(q|0,z|0,Va|0,Wa|0)|0;Ka=fg(Wa|0,z|0,Ja|0,Ka|0)|0;cb=cg(Ka|0,z|0,bb|0,cb|0)|0;Z=fg(cb|0,z|0,G|0,Z|0)|0;G=z;cb=af(I|0,C|0,666643,0)|0;bb=z;Ka=af(I|0,C|0,470296,0)|0;Ja=z;Wa=af(I|0,C|0,654183,0)|0;Va=z;q=af(I|0,C|0,-997805,-1)|0;y=z;kb=af(I|0,C|0,136657,0)|0;jb=z;C=af(I|0,C|0,-683901,-1)|0;I=z;Ma=af(hb|0,ib|0,666643,0)|0;La=z;eb=af(hb|0,ib|0,470296,0)|0;db=z;Ga=af(hb|0,ib|0,654183,0)|0;Fa=z;Ua=af(hb|0,ib|0,-997805,-1)|0;Ta=z;L=af(hb|0,ib|0,136657,0)|0;Q=z;ib=af(hb|0,ib|0,-683901,-1)|0;hb=z;pb=fg(sb|0,rb|0,qb|0,pb|0)|0;nb=fg(pb|0,z|0,ob|0,nb|0)|0;lb=fg(nb|0,z|0,mb|0,lb|0)|0;jb=fg(lb|0,z|0,kb|0,jb|0)|0;hb=fg(jb|0,z|0,ib|0,hb|0)|0;ab=cg(hb|0,z|0,gb|0,ab|0)|0;m=fg(ab|0,z|0,f|0,m|0)|0;f=z;ab=af(ea|0,fa|0,666643,0)|0;ab=fg(fb|0,$a|0,ab|0,z|0)|0;Oa=fg(ab|0,z|0,Na|0,Oa|0)|0;Ca=cg(Oa|0,z|0,Ba|0,Ca|0)|0;Ba=z;Oa=af(ea|0,fa|0,470296,0)|0;Na=z;ab=af(ea|0,fa|0,654183,0)|0;$a=z;bb=fg(eb|0,db|0,cb|0,bb|0)|0;$a=fg(bb|0,z|0,ab|0,$a|0)|0;Sa=fg($a|0,z|0,Ra|0,Sa|0)|0;Ea=fg(Sa|0,z|0,Da|0,Ea|0)|0;Y=cg(Ea|0,z|0,X|0,Y|0)|0;X=z;Ea=af(ea|0,fa|0,-997805,-1)|0;Da=z;Sa=af(ea|0,fa|0,136657,0)|0;Ra=z;Xa=fg(_a|0,Za|0,Ya|0,Xa|0)|0;Va=fg(Xa|0,z|0,Wa|0,Va|0)|0;Ta=fg(Va|0,z|0,Ua|0,Ta|0)|0;Ra=fg(Ta|0,z|0,Sa|0,Ra|0)|0;Pa=fg(Ra|0,z|0,Qa|0,Pa|0)|0;xa=fg(Pa|0,z|0,ya|0,xa|0)|0;i=cg(xa|0,z|0,va|0,i|0)|0;va=z;fa=af(ea|0,fa|0,-683901,-1)|0;ea=z;xa=fg(Ca|0,Ba|0,1048576,0)|0;xa=Xe(xa|0,z|0,21)|0;ya=z;La=fg(Oa|0,Na|0,Ma|0,La|0)|0;B=fg(La|0,z|0,g|0,B|0)|0;ba=cg(B|0,z|0,d|0,ba|0)|0;ba=fg(ba|0,z|0,xa|0,ya|0)|0;d=z;ya=vf(xa|0,ya|0,21)|0;xa=z;B=fg(Y|0,X|0,1048576,0)|0;B=Xe(B|0,z|0,21)|0;g=z;Ha=fg(Ka|0,Ja|0,Ia|0,Ha|0)|0;Fa=fg(Ha|0,z|0,Ga|0,Fa|0)|0;Da=fg(Fa|0,z|0,Ea|0,Da|0)|0;E=fg(Da|0,z|0,e|0,E|0)|0;D=cg(E|0,z|0,s|0,D|0)|0;D=fg(D|0,z|0,B|0,g|0)|0;s=z;g=vf(B|0,g|0,21)|0;B=z;E=fg(i|0,va|0,1048576,0)|0;E=Xe(E|0,z|0,21)|0;e=z;N=fg(K|0,J|0,O|0,N|0)|0;T=fg(N|0,z|0,U|0,T|0)|0;y=fg(T|0,z|0,q|0,y|0)|0;Q=fg(y|0,z|0,L|0,Q|0)|0;ea=fg(Q|0,z|0,fa|0,ea|0)|0;c=fg(ea|0,z|0,h|0,c|0)|0;W=cg(c|0,z|0,r|0,W|0)|0;W=fg(W|0,z|0,E|0,e|0)|0;r=z;e=vf(E|0,e|0,21)|0;E=z;c=fg(m|0,f|0,1048576,0)|0;c=Xe(c|0,z|0,21)|0;h=z;p=fg(R|0,da|0,u|0,p|0)|0;aa=fg(p|0,z|0,$|0,aa|0)|0;I=fg(aa|0,z|0,C|0,I|0)|0;A=fg(I|0,z|0,v|0,A|0)|0;za=cg(A|0,z|0,k|0,za|0)|0;za=fg(za|0,z|0,c|0,h|0)|0;k=z;h=vf(c|0,h|0,21)|0;h=cg(m|0,f|0,h|0,z|0)|0;f=z;m=fg(Z|0,G|0,1048576,0)|0;m=Xe(m|0,z|0,21)|0;c=z;ha=fg(H|0,n|0,ia|0,ha|0)|0;l=fg(ha|0,z|0,j|0,l|0)|0;wa=cg(l|0,z|0,ca|0,wa|0)|0;wa=fg(wa|0,z|0,m|0,c|0)|0;ca=z;c=vf(m|0,c|0,21)|0;c=cg(Z|0,G|0,c|0,z|0)|0;G=z;Z=fg(P|0,o|0,1048576,0)|0;Z=Xe(Z|0,z|0,21)|0;m=z;F=fg(Z|0,m|0,M|0,F|0)|0;M=z;m=vf(Z|0,m|0,21)|0;m=cg(P|0,o|0,m|0,z|0)|0;o=z;P=fg(ba|0,d|0,1048576,0)|0;P=Xe(P|0,z|0,21)|0;Z=z;l=vf(P|0,Z|0,21)|0;j=z;ha=fg(D|0,s|0,1048576,0)|0;ha=Xe(ha|0,z|0,21)|0;ia=z;n=vf(ha|0,ia|0,21)|0;H=z;A=fg(W|0,r|0,1048576,0)|0;A=Xe(A|0,z|0,21)|0;v=z;f=fg(A|0,v|0,h|0,f|0)|0;h=z;v=vf(A|0,v|0,21)|0;v=cg(W|0,r|0,v|0,z|0)|0;r=z;W=fg(za|0,k|0,1048576,0)|0;W=Xe(W|0,z|0,21)|0;A=z;G=fg(W|0,A|0,c|0,G|0)|0;c=z;A=vf(W|0,A|0,21)|0;A=cg(za|0,k|0,A|0,z|0)|0;k=z;za=fg(wa|0,ca|0,1048576,0)|0;za=Xe(za|0,z|0,21)|0;W=z;o=fg(za|0,W|0,m|0,o|0)|0;m=z;W=vf(za|0,W|0,21)|0;W=cg(wa|0,ca|0,W|0,z|0)|0;ca=z;wa=af(F|0,M|0,666643,0)|0;wa=fg(Aa|0,_|0,wa|0,z|0)|0;_=z;Aa=af(F|0,M|0,470296,0)|0;za=z;I=af(F|0,M|0,654183,0)|0;C=z;aa=af(F|0,M|0,-997805,-1)|0;$=z;p=af(F|0,M|0,136657,0)|0;u=z;M=af(F|0,M|0,-683901,-1)|0;M=fg(i|0,va|0,M|0,z|0)|0;ia=fg(M|0,z|0,ha|0,ia|0)|0;E=cg(ia|0,z|0,e|0,E|0)|0;e=z;ia=af(o|0,m|0,666643,0)|0;ha=z;M=af(o|0,m|0,470296,0)|0;M=fg(wa|0,_|0,M|0,z|0)|0;_=z;wa=af(o|0,m|0,654183,0)|0;va=z;i=af(o|0,m|0,-997805,-1)|0;F=z;da=af(o|0,m|0,136657,0)|0;R=z;m=af(o|0,m|0,-683901,-1)|0;o=z;ea=af(W|0,ca|0,666643,0)|0;ea=fg(ga|0,S|0,ea|0,z|0)|0;S=z;ga=af(W|0,ca|0,470296,0)|0;fa=z;Q=af(W|0,ca|0,654183,0)|0;Q=fg(M|0,_|0,Q|0,z|0)|0;_=z;M=af(W|0,ca|0,-997805,-1)|0;L=z;y=af(W|0,ca|0,136657,0)|0;q=z;ca=af(W|0,ca|0,-683901,-1)|0;W=z;$=fg(Y|0,X|0,aa|0,$|0)|0;Z=fg($|0,z|0,P|0,Z|0)|0;R=fg(Z|0,z|0,da|0,R|0)|0;W=fg(R|0,z|0,ca|0,W|0)|0;B=cg(W|0,z|0,g|0,B|0)|0;g=z;W=af(G|0,c|0,666643,0)|0;ca=z;R=af(G|0,c|0,470296,0)|0;R=fg(ea|0,S|0,R|0,z|0)|0;S=z;ea=af(G|0,c|0,654183,0)|0;da=z;Z=af(G|0,c|0,-997805,-1)|0;Z=fg(Q|0,_|0,Z|0,z|0)|0;_=z;Q=af(G|0,c|0,136657,0)|0;P=z;c=af(G|0,c|0,-683901,-1)|0;G=z;$=af(A|0,k|0,666643,0)|0;aa=z;X=af(A|0,k|0,470296,0)|0;Y=z;T=af(A|0,k|0,654183,0)|0;U=z;N=af(A|0,k|0,-997805,-1)|0;O=z;J=af(A|0,k|0,136657,0)|0;K=z;k=af(A|0,k|0,-683901,-1)|0;A=z;za=fg(Ca|0,Ba|0,Aa|0,za|0)|0;xa=cg(za|0,z|0,ya|0,xa|0)|0;va=fg(xa|0,z|0,wa|0,va|0)|0;L=fg(va|0,z|0,M|0,L|0)|0;P=fg(L|0,z|0,Q|0,P|0)|0;A=fg(P|0,z|0,k|0,A|0)|0;k=z;P=af(f|0,h|0,666643,0)|0;V=fg(P|0,z|0,w|0,V|0)|0;w=z;P=af(f|0,h|0,470296,0)|0;Q=z;L=af(f|0,h|0,654183,0)|0;M=z;ra=fg(ua|0,ta|0,sa|0,ra|0)|0;pa=cg(ra|0,z|0,qa|0,pa|0)|0;ca=fg(pa|0,z|0,W|0,ca|0)|0;M=fg(ca|0,z|0,L|0,M|0)|0;Y=fg(M|0,z|0,X|0,Y|0)|0;X=z;M=af(f|0,h|0,-997805,-1)|0;L=z;ca=af(f|0,h|0,136657,0)|0;W=z;la=fg(oa|0,na|0,ma|0,la|0)|0;ja=cg(la|0,z|0,ka|0,ja|0)|0;ha=fg(ja|0,z|0,ia|0,ha|0)|0;fa=fg(ha|0,z|0,ga|0,fa|0)|0;da=fg(fa|0,z|0,ea|0,da|0)|0;W=fg(da|0,z|0,ca|0,W|0)|0;O=fg(W|0,z|0,N|0,O|0)|0;N=z;h=af(f|0,h|0,-683901,-1)|0;f=z;W=fg(V|0,w|0,1048576,0)|0;W=Xe(W|0,z|0,21)|0;ca=z;Q=fg(x|0,t|0,P|0,Q|0)|0;aa=fg(Q|0,z|0,$|0,aa|0)|0;aa=fg(aa|0,z|0,W|0,ca|0)|0;$=z;ca=vf(W|0,ca|0,21)|0;ca=cg(V|0,w|0,ca|0,z|0)|0;w=z;V=fg(Y|0,X|0,1048576,0)|0;V=Xe(V|0,z|0,21)|0;W=z;L=fg(R|0,S|0,M|0,L|0)|0;U=fg(L|0,z|0,T|0,U|0)|0;U=fg(U|0,z|0,V|0,W|0)|0;T=z;W=vf(V|0,W|0,21)|0;V=z;L=fg(O|0,N|0,1048576,0)|0;L=Xe(L|0,z|0,21)|0;M=z;f=fg(Z|0,_|0,h|0,f|0)|0;K=fg(f|0,z|0,J|0,K|0)|0;K=fg(K|0,z|0,L|0,M|0)|0;J=z;M=vf(L|0,M|0,21)|0;L=z;f=fg(A|0,k|0,1048576,0)|0;f=Xe(f|0,z|0,21)|0;h=z;C=fg(ba|0,d|0,I|0,C|0)|0;F=fg(C|0,z|0,i|0,F|0)|0;j=cg(F|0,z|0,l|0,j|0)|0;q=fg(j|0,z|0,y|0,q|0)|0;G=fg(q|0,z|0,c|0,G|0)|0;G=fg(G|0,z|0,f|0,h|0)|0;c=z;h=vf(f|0,h|0,21)|0;h=cg(A|0,k|0,h|0,z|0)|0;k=z;A=fg(B|0,g|0,1048576,0)|0;A=Xe(A|0,z|0,21)|0;f=z;u=fg(m|0,o|0,p|0,u|0)|0;s=fg(u|0,z|0,D|0,s|0)|0;H=cg(s|0,z|0,n|0,H|0)|0;H=fg(H|0,z|0,A|0,f|0)|0;n=z;f=vf(A|0,f|0,21)|0;f=cg(B|0,g|0,f|0,z|0)|0;g=z;B=fg(E|0,e|0,1048576,0)|0;B=Xe(B|0,z|0,21)|0;A=z;r=fg(v|0,r|0,B|0,A|0)|0;v=z;A=vf(B|0,A|0,21)|0;B=z;s=fg(aa|0,$|0,1048576,0)|0;s=Xe(s|0,z|0,21)|0;D=z;u=vf(s|0,D|0,21)|0;p=z;o=fg(U|0,T|0,1048576,0)|0;o=Xe(o|0,z|0,21)|0;m=z;q=vf(o|0,m|0,21)|0;y=z;j=fg(K|0,J|0,1048576,0)|0;j=Xe(j|0,z|0,21)|0;l=z;k=fg(h|0,k|0,j|0,l|0)|0;h=z;l=vf(j|0,l|0,21)|0;j=z;F=fg(G|0,c|0,1048576,0)|0;F=Xe(F|0,z|0,21)|0;i=z;g=fg(f|0,g|0,F|0,i|0)|0;f=z;i=vf(F|0,i|0,21)|0;i=cg(G|0,c|0,i|0,z|0)|0;c=z;G=fg(H|0,n|0,1048576,0)|0;G=Xe(G|0,z|0,21)|0;F=z;C=vf(G|0,F|0,21)|0;C=cg(H|0,n|0,C|0,z|0)|0;n=z;H=fg(r|0,v|0,1048576,0)|0;H=Xe(H|0,z|0,21)|0;I=z;d=vf(H|0,I|0,21)|0;d=cg(r|0,v|0,d|0,z|0)|0;v=z;r=af(H|0,I|0,666643,0)|0;r=fg(ca|0,w|0,r|0,z|0)|0;w=z;ca=af(H|0,I|0,470296,0)|0;ba=z;_=af(H|0,I|0,654183,0)|0;Z=z;S=af(H|0,I|0,-997805,-1)|0;R=z;Q=af(H|0,I|0,136657,0)|0;P=z;I=af(H|0,I|0,-683901,-1)|0;H=z;t=Xe(r|0,w|0,21)|0;x=z;$=fg(ca|0,ba|0,aa|0,$|0)|0;p=cg($|0,z|0,u|0,p|0)|0;p=fg(p|0,z|0,t|0,x|0)|0;u=z;x=vf(t|0,x|0,21)|0;x=cg(r|0,w|0,x|0,z|0)|0;w=z;r=Xe(p|0,u|0,21)|0;t=z;X=fg(_|0,Z|0,Y|0,X|0)|0;V=cg(X|0,z|0,W|0,V|0)|0;D=fg(V|0,z|0,s|0,D|0)|0;D=fg(D|0,z|0,r|0,t|0)|0;s=z;t=vf(r|0,t|0,21)|0;t=cg(p|0,u|0,t|0,z|0)|0;u=z;p=Xe(D|0,s|0,21)|0;r=z;R=fg(U|0,T|0,S|0,R|0)|0;y=cg(R|0,z|0,q|0,y|0)|0;y=fg(y|0,z|0,p|0,r|0)|0;q=z;r=vf(p|0,r|0,21)|0;r=cg(D|0,s|0,r|0,z|0)|0;s=z;D=Xe(y|0,q|0,21)|0;p=z;N=fg(Q|0,P|0,O|0,N|0)|0;L=cg(N|0,z|0,M|0,L|0)|0;m=fg(L|0,z|0,o|0,m|0)|0;m=fg(m|0,z|0,D|0,p|0)|0;o=z;p=vf(D|0,p|0,21)|0;p=cg(y|0,q|0,p|0,z|0)|0;q=z;y=Xe(m|0,o|0,21)|0;D=z;H=fg(K|0,J|0,I|0,H|0)|0;j=cg(H|0,z|0,l|0,j|0)|0;j=fg(j|0,z|0,y|0,D|0)|0;l=z;D=vf(y|0,D|0,21)|0;D=cg(m|0,o|0,D|0,z|0)|0;o=z;m=Xe(j|0,l|0,21)|0;y=z;h=fg(k|0,h|0,m|0,y|0)|0;k=z;y=vf(m|0,y|0,21)|0;y=cg(j|0,l|0,y|0,z|0)|0;l=z;j=Xe(h|0,k|0,21)|0;m=z;c=fg(j|0,m|0,i|0,c|0)|0;i=z;m=vf(j|0,m|0,21)|0;m=cg(h|0,k|0,m|0,z|0)|0;k=z;h=Xe(c|0,i|0,21)|0;j=z;f=fg(g|0,f|0,h|0,j|0)|0;g=z;j=vf(h|0,j|0,21)|0;j=cg(c|0,i|0,j|0,z|0)|0;i=z;c=Xe(f|0,g|0,21)|0;h=z;n=fg(c|0,h|0,C|0,n|0)|0;C=z;h=vf(c|0,h|0,21)|0;h=cg(f|0,g|0,h|0,z|0)|0;g=z;f=Xe(n|0,C|0,21)|0;c=z;e=fg(G|0,F|0,E|0,e|0)|0;B=cg(e|0,z|0,A|0,B|0)|0;B=fg(B|0,z|0,f|0,c|0)|0;A=z;c=vf(f|0,c|0,21)|0;c=cg(n|0,C|0,c|0,z|0)|0;C=z;n=Xe(B|0,A|0,21)|0;f=z;v=fg(n|0,f|0,d|0,v|0)|0;d=z;f=vf(n|0,f|0,21)|0;f=cg(B|0,A|0,f|0,z|0)|0;A=z;B=Xe(v|0,d|0,21)|0;n=z;e=vf(B|0,n|0,21)|0;e=cg(v|0,d|0,e|0,z|0)|0;d=z;v=af(B|0,n|0,666643,0)|0;w=fg(v|0,z|0,x|0,w|0)|0;x=z;v=af(B|0,n|0,470296,0)|0;v=fg(t|0,u|0,v|0,z|0)|0;u=z;t=af(B|0,n|0,654183,0)|0;t=fg(r|0,s|0,t|0,z|0)|0;s=z;r=af(B|0,n|0,-997805,-1)|0;r=fg(p|0,q|0,r|0,z|0)|0;q=z;p=af(B|0,n|0,136657,0)|0;p=fg(D|0,o|0,p|0,z|0)|0;o=z;n=af(B|0,n|0,-683901,-1)|0;n=fg(y|0,l|0,n|0,z|0)|0;l=z;y=Xe(w|0,x|0,21)|0;B=z;u=fg(v|0,u|0,y|0,B|0)|0;v=z;B=vf(y|0,B|0,21)|0;B=cg(w|0,x|0,B|0,z|0)|0;x=z;w=Xe(u|0,v|0,21)|0;y=z;s=fg(t|0,s|0,w|0,y|0)|0;t=z;y=vf(w|0,y|0,21)|0;y=cg(u|0,v|0,y|0,z|0)|0;v=z;u=Xe(s|0,t|0,21)|0;w=z;q=fg(r|0,q|0,u|0,w|0)|0;r=z;w=vf(u|0,w|0,21)|0;w=cg(s|0,t|0,w|0,z|0)|0;t=z;s=Xe(q|0,r|0,21)|0;u=z;o=fg(p|0,o|0,s|0,u|0)|0;p=z;u=vf(s|0,u|0,21)|0;u=cg(q|0,r|0,u|0,z|0)|0;r=z;q=Xe(o|0,p|0,21)|0;s=z;l=fg(n|0,l|0,q|0,s|0)|0;n=z;s=vf(q|0,s|0,21)|0;s=cg(o|0,p|0,s|0,z|0)|0;p=z;o=Xe(l|0,n|0,21)|0;q=z;k=fg(o|0,q|0,m|0,k|0)|0;m=z;q=vf(o|0,q|0,21)|0;q=cg(l|0,n|0,q|0,z|0)|0;n=z;l=Xe(k|0,m|0,21)|0;o=z;i=fg(l|0,o|0,j|0,i|0)|0;j=z;o=vf(l|0,o|0,21)|0;o=cg(k|0,m|0,o|0,z|0)|0;m=z;k=Xe(i|0,j|0,21)|0;l=z;g=fg(k|0,l|0,h|0,g|0)|0;h=z;l=vf(k|0,l|0,21)|0;l=cg(i|0,j|0,l|0,z|0)|0;j=z;i=Xe(g|0,h|0,21)|0;k=z;C=fg(i|0,k|0,c|0,C|0)|0;c=z;k=vf(i|0,k|0,21)|0;k=cg(g|0,h|0,k|0,z|0)|0;h=z;g=Xe(C|0,c|0,21)|0;i=z;A=fg(g|0,i|0,f|0,A|0)|0;f=z;i=vf(g|0,i|0,21)|0;i=cg(C|0,c|0,i|0,z|0)|0;c=z;C=Xe(A|0,f|0,21)|0;g=z;d=fg(C|0,g|0,e|0,d|0)|0;e=z;g=vf(C|0,g|0,21)|0;g=cg(A|0,f|0,g|0,z|0)|0;f=z;a[b>>0]=B;A=yf(B|0,x|0,8)|0;a[b+1>>0]=A;x=yf(B|0,x|0,16)|0;B=z;A=vf(y|0,v|0,5)|0;a[b+2>>0]=A|x;x=yf(y|0,v|0,3)|0;a[b+3>>0]=x;x=yf(y|0,v|0,11)|0;a[b+4>>0]=x;v=yf(y|0,v|0,19)|0;y=z;x=vf(w|0,t|0,2)|0;a[b+5>>0]=x|v;v=yf(w|0,t|0,6)|0;a[b+6>>0]=v;t=yf(w|0,t|0,14)|0;w=z;v=vf(u|0,r|0,7)|0;a[b+7>>0]=v|t;t=yf(u|0,r|0,1)|0;a[b+8>>0]=t;t=yf(u|0,r|0,9)|0;a[b+9>>0]=t;r=yf(u|0,r|0,17)|0;u=z;t=vf(s|0,p|0,4)|0;a[b+10>>0]=t|r;r=yf(s|0,p|0,4)|0;a[b+11>>0]=r;r=yf(s|0,p|0,12)|0;a[b+12>>0]=r;p=yf(s|0,p|0,20)|0;s=z;r=vf(q|0,n|0,1)|0;a[b+13>>0]=r|p;p=yf(q|0,n|0,7)|0;a[b+14>>0]=p;n=yf(q|0,n|0,15)|0;q=z;p=vf(o|0,m|0,6)|0;a[b+15>>0]=p|n;n=yf(o|0,m|0,2)|0;a[b+16>>0]=n;n=yf(o|0,m|0,10)|0;a[b+17>>0]=n;m=yf(o|0,m|0,18)|0;o=z;n=vf(l|0,j|0,3)|0;a[b+18>>0]=n|m;m=yf(l|0,j|0,5)|0;a[b+19>>0]=m;j=yf(l|0,j|0,13)|0;a[b+20>>0]=j;a[b+21>>0]=k;j=yf(k|0,h|0,8)|0;a[b+22>>0]=j;h=yf(k|0,h|0,16)|0;k=z;j=vf(i|0,c|0,5)|0;a[b+23>>0]=j|h;h=yf(i|0,c|0,3)|0;a[b+24>>0]=h;h=yf(i|0,c|0,11)|0;a[b+25>>0]=h;c=yf(i|0,c|0,19)|0;i=z;h=vf(g|0,f|0,2)|0;a[b+26>>0]=h|c;c=yf(g|0,f|0,6)|0;a[b+27>>0]=c;f=yf(g|0,f|0,14)|0;g=z;c=vf(d|0,e|0,7)|0;a[b+28>>0]=f|c;c=yf(d|0,e|0,1)|0;a[b+29>>0]=c;c=yf(d|0,e|0,9)|0;a[b+30>>0]=c;e=yf(d|0,e|0,17)|0;a[b+31>>0]=e;return}function ia(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;I=l;n=l=l+63&-64;l=l+16|0;do if(a>>>0<245){s=a>>>0<11?16:a+11&-8;r=c[8850]|0;if(r>>>(s>>>3)&3|0){a=35440+((r>>>(s>>>3)&1^1)+(s>>>3)<<1<<2)|0;b=c[a+8>>2]|0;d=c[b+8>>2]|0;do if((a|0)!=(d|0)){if(d>>>0<(c[8854]|0)>>>0)Z();if((c[d+12>>2]|0)==(b|0)){c[d+12>>2]=a;c[a+8>>2]=d;break}else Z()}else c[8850]=r&~(1<<(r>>>(s>>>3)&1^1)+(s>>>3));while(0);H=(r>>>(s>>>3)&1^1)+(s>>>3)<<3;c[b+4>>2]=H|3;c[b+H+4>>2]=c[b+H+4>>2]|1;H=b+8|0;l=I;return H|0}q=c[8852]|0;if(s>>>0>q>>>0){if(r>>>(s>>>3)|0){a=r>>>(s>>>3)<<(s>>>3)&(2<<(s>>>3)|0-(2<<(s>>>3)));e=((a&0-a)+-1|0)>>>(((a&0-a)+-1|0)>>>12&16);d=e>>>(e>>>5&8)>>>(e>>>(e>>>5&8)>>>2&4);d=(e>>>5&8|((a&0-a)+-1|0)>>>12&16|e>>>(e>>>5&8)>>>2&4|d>>>1&2|d>>>(d>>>1&2)>>>1&1)+(d>>>(d>>>1&2)>>>(d>>>(d>>>1&2)>>>1&1))|0;e=c[35440+(d<<1<<2)+8>>2]|0;a=c[e+8>>2]|0;do if((35440+(d<<1<<2)|0)!=(a|0)){if(a>>>0<(c[8854]|0)>>>0)Z();if((c[a+12>>2]|0)==(e|0)){c[a+12>>2]=35440+(d<<1<<2);c[35440+(d<<1<<2)+8>>2]=a;f=r;break}else Z()}else{c[8850]=r&~(1<<d);f=r&~(1<<d)}while(0);c[e+4>>2]=s|3;c[e+s+4>>2]=(d<<3)-s|1;c[e+s+((d<<3)-s)>>2]=(d<<3)-s;if(q|0){b=c[8855]|0;if(f&1<<(q>>>3)){a=c[35440+(q>>>3<<1<<2)+8>>2]|0;if(a>>>0<(c[8854]|0)>>>0)Z();else{h=a;i=35440+(q>>>3<<1<<2)+8|0}}else{c[8850]=f|1<<(q>>>3);h=35440+(q>>>3<<1<<2)|0;i=35440+(q>>>3<<1<<2)+8|0}c[i>>2]=b;c[h+12>>2]=b;c[b+8>>2]=h;c[b+12>>2]=35440+(q>>>3<<1<<2)}c[8852]=(d<<3)-s;c[8855]=e+s;H=e+8|0;l=I;return H|0}k=c[8851]|0;if(k){b=((k&0-k)+-1|0)>>>(((k&0-k)+-1|0)>>>12&16);a=b>>>(b>>>5&8)>>>(b>>>(b>>>5&8)>>>2&4);a=c[35704+((b>>>5&8|((k&0-k)+-1|0)>>>12&16|b>>>(b>>>5&8)>>>2&4|a>>>1&2|a>>>(a>>>1&2)>>>1&1)+(a>>>(a>>>1&2)>>>(a>>>(a>>>1&2)>>>1&1))<<2)>>2]|0;b=(c[a+4>>2]&-8)-s|0;d=c[a+16+(((c[a+16>>2]|0)==0&1)<<2)>>2]|0;if(!d){j=a;h=b}else{do{G=(c[d+4>>2]&-8)-s|0;H=G>>>0<b>>>0;b=H?G:b;a=H?d:a;d=c[d+16+(((c[d+16>>2]|0)==0&1)<<2)>>2]|0}while((d|0)!=0);j=a;h=b}f=c[8854]|0;if(j>>>0<f>>>0)Z();i=j+s|0;if(j>>>0>=i>>>0)Z();g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){m=0;break}}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<f>>>0)Z();else{c[b>>2]=0;m=a;break}}else{b=c[j+8>>2]|0;if(b>>>0<f>>>0)Z();if((c[b+12>>2]|0)!=(j|0))Z();if((c[a+8>>2]|0)==(j|0)){c[b+12>>2]=a;c[a+8>>2]=b;m=a;break}else Z()}while(0);a:do if(g|0){a=c[j+28>>2]|0;do if((j|0)==(c[35704+(a<<2)>>2]|0)){c[35704+(a<<2)>>2]=m;if(!m){c[8851]=k&~(1<<a);break a}}else if(g>>>0>=(c[8854]|0)>>>0){c[g+16+(((c[g+16>>2]|0)!=(j|0)&1)<<2)>>2]=m;if(!m)break a;else break}else Z();while(0);b=c[8854]|0;if(m>>>0<b>>>0)Z();c[m+24>>2]=g;a=c[j+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)Z();else{c[m+16>>2]=a;c[a+24>>2]=m;break}while(0);a=c[j+20>>2]|0;if(a|0)if(a>>>0<(c[8854]|0)>>>0)Z();else{c[m+20>>2]=a;c[a+24>>2]=m;break}}while(0);if(h>>>0<16){H=h+s|0;c[j+4>>2]=H|3;H=j+H+4|0;c[H>>2]=c[H>>2]|1}else{c[j+4>>2]=s|3;c[i+4>>2]=h|1;c[i+h>>2]=h;if(q|0){b=c[8855]|0;if(r&1<<(q>>>3)){a=c[35440+(q>>>3<<1<<2)+8>>2]|0;if(a>>>0<(c[8854]|0)>>>0)Z();else{o=a;p=35440+(q>>>3<<1<<2)+8|0}}else{c[8850]=r|1<<(q>>>3);o=35440+(q>>>3<<1<<2)|0;p=35440+(q>>>3<<1<<2)+8|0}c[p>>2]=b;c[o+12>>2]=b;c[b+8>>2]=o;c[b+12>>2]=35440+(q>>>3<<1<<2)}c[8852]=h;c[8855]=i}H=j+8|0;l=I;return H|0}}}else if(a>>>0<=4294967231){s=a+11&-8;k=c[8851]|0;if(k){if((a+11|0)>>>8)if(s>>>0>16777215)i=31;else{i=(a+11|0)>>>8<<((((a+11|0)>>>8)+1048320|0)>>>16&8);i=14-((i+520192|0)>>>16&4|(((a+11|0)>>>8)+1048320|0)>>>16&8|((i<<((i+520192|0)>>>16&4))+245760|0)>>>16&2)+(i<<((i+520192|0)>>>16&4)<<(((i<<((i+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;i=s>>>(i+7|0)&1|i<<1}else i=0;b=c[35704+(i<<2)>>2]|0;b:do if(!b){b=0;a=0;d=0-s|0;A=81}else{a=0;d=0-s|0;h=s<<((i|0)==31?0:25-(i>>>1)|0);f=0;while(1){e=(c[b+4>>2]&-8)-s|0;if(e>>>0<d>>>0)if(!e){a=b;d=0;e=b;A=85;break b}else{a=b;d=e}e=c[b+20>>2]|0;b=c[b+16+(h>>>31<<2)>>2]|0;f=(e|0)==0|(e|0)==(b|0)?f:e;e=(b|0)==0;if(e){b=f;A=81;break}else h=h<<((e^1)&1)}}while(0);if((A|0)==81){if((b|0)==0&(a|0)==0){a=2<<i;if(!(k&(a|0-a)))break;o=(k&(a|0-a)&0-(k&(a|0-a)))+-1|0;p=o>>>(o>>>12&16)>>>(o>>>(o>>>12&16)>>>5&8);b=p>>>(p>>>2&4)>>>(p>>>(p>>>2&4)>>>1&2);a=0;b=c[35704+((o>>>(o>>>12&16)>>>5&8|o>>>12&16|p>>>2&4|p>>>(p>>>2&4)>>>1&2|b>>>1&1)+(b>>>(b>>>1&1))<<2)>>2]|0}if(!b){j=a;i=d}else{e=b;A=85}}if((A|0)==85)while(1){A=0;b=(c[e+4>>2]&-8)-s|0;p=b>>>0<d>>>0;b=p?b:d;a=p?e:a;e=c[e+16+(((c[e+16>>2]|0)==0&1)<<2)>>2]|0;if(!e){j=a;i=b;break}else{d=b;A=85}}if((j|0)!=0?i>>>0<((c[8852]|0)-s|0)>>>0:0){f=c[8854]|0;if(j>>>0<f>>>0)Z();h=j+s|0;if(j>>>0>=h>>>0)Z();g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){q=0;break}}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<f>>>0)Z();else{c[b>>2]=0;q=a;break}}else{b=c[j+8>>2]|0;if(b>>>0<f>>>0)Z();if((c[b+12>>2]|0)!=(j|0))Z();if((c[a+8>>2]|0)==(j|0)){c[b+12>>2]=a;c[a+8>>2]=b;q=a;break}else Z()}while(0);c:do if(g){a=c[j+28>>2]|0;do if((j|0)==(c[35704+(a<<2)>>2]|0)){c[35704+(a<<2)>>2]=q;if(!q){c[8851]=k&~(1<<a);x=k&~(1<<a);break c}}else if(g>>>0>=(c[8854]|0)>>>0){c[g+16+(((c[g+16>>2]|0)!=(j|0)&1)<<2)>>2]=q;if(!q){x=k;break c}else break}else Z();while(0);b=c[8854]|0;if(q>>>0<b>>>0)Z();c[q+24>>2]=g;a=c[j+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)Z();else{c[q+16>>2]=a;c[a+24>>2]=q;break}while(0);a=c[j+20>>2]|0;if(a)if(a>>>0<(c[8854]|0)>>>0)Z();else{c[q+20>>2]=a;c[a+24>>2]=q;x=k;break}else x=k}else x=k;while(0);do if(i>>>0>=16){c[j+4>>2]=s|3;c[h+4>>2]=i|1;c[h+i>>2]=i;b=i>>>3;if(i>>>0<256){a=c[8850]|0;if(a&1<<b){a=c[35440+(b<<1<<2)+8>>2]|0;if(a>>>0<(c[8854]|0)>>>0)Z();else{r=a;w=35440+(b<<1<<2)+8|0}}else{c[8850]=a|1<<b;r=35440+(b<<1<<2)|0;w=35440+(b<<1<<2)+8|0}c[w>>2]=h;c[r+12>>2]=h;c[h+8>>2]=r;c[h+12>>2]=35440+(b<<1<<2);break}a=i>>>8;if(a)if(i>>>0>16777215)a=31;else{H=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);a=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(H+245760|0)>>>16&2)+(H<<((H+245760|0)>>>16&2)>>>15)|0;a=i>>>(a+7|0)&1|a<<1}else a=0;d=35704+(a<<2)|0;c[h+28>>2]=a;c[h+16+4>>2]=0;c[h+16>>2]=0;b=1<<a;if(!(x&b)){c[8851]=x|b;c[d>>2]=h;c[h+24>>2]=d;c[h+12>>2]=h;c[h+8>>2]=h;break}b=i<<((a|0)==31?0:25-(a>>>1)|0);e=c[d>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(i|0)){A=139;break}d=e+16+(b>>>31<<2)|0;a=c[d>>2]|0;if(!a){A=136;break}else{b=b<<1;e=a}}if((A|0)==136)if(d>>>0<(c[8854]|0)>>>0)Z();else{c[d>>2]=h;c[h+24>>2]=e;c[h+12>>2]=h;c[h+8>>2]=h;break}else if((A|0)==139){a=e+8|0;b=c[a>>2]|0;H=c[8854]|0;if(b>>>0>=H>>>0&e>>>0>=H>>>0){c[b+12>>2]=h;c[a>>2]=h;c[h+8>>2]=b;c[h+12>>2]=e;c[h+24>>2]=0;break}else Z()}}else{H=i+s|0;c[j+4>>2]=H|3;H=j+H+4|0;c[H>>2]=c[H>>2]|1}while(0);H=j+8|0;l=I;return H|0}}}else s=-1;while(0);d=c[8852]|0;if(d>>>0>=s>>>0){a=d-s|0;b=c[8855]|0;if(a>>>0>15){H=b+s|0;c[8855]=H;c[8852]=a;c[H+4>>2]=a|1;c[H+a>>2]=a;c[b+4>>2]=s|3}else{c[8852]=0;c[8855]=0;c[b+4>>2]=d|3;c[b+d+4>>2]=c[b+d+4>>2]|1}H=b+8|0;l=I;return H|0}f=c[8853]|0;if(f>>>0>s>>>0){F=f-s|0;c[8853]=F;H=c[8856]|0;G=H+s|0;c[8856]=G;c[G+4>>2]=F|1;c[H+4>>2]=s|3;H=H+8|0;l=I;return H|0}if(!(c[8968]|0)){c[8970]=4096;c[8969]=4096;c[8971]=-1;c[8972]=-1;c[8973]=0;c[8961]=0;c[n>>2]=n&-16^1431655768;c[8968]=n&-16^1431655768;a=4096}else a=c[8970]|0;h=s+48|0;i=s+47|0;k=a+i|0;j=0-a|0;if((k&j)>>>0<=s>>>0){H=0;l=I;return H|0}a=c[8960]|0;if(a|0?(x=c[8958]|0,(x+(k&j)|0)>>>0<=x>>>0?1:(x+(k&j)|0)>>>0>a>>>0):0){H=0;l=I;return H|0}d:do if(!(c[8961]&4)){d=c[8856]|0;e:do if(d){b=35848;while(1){a=c[b>>2]|0;if(a>>>0<=d>>>0?(t=b+4|0,(a+(c[t>>2]|0)|0)>>>0>d>>>0):0)break;a=c[b+8>>2]|0;if(!a){A=163;break e}else b=a}if((k-f&j)>>>0<2147483647){a=jd(k-f&j|0)|0;if((a|0)==((c[b>>2]|0)+(c[t>>2]|0)|0))if((a|0)==(-1|0))a=k-f&j;else{h=k-f&j;g=a;A=180;break d}else{e=a;d=k-f&j;A=171}}else a=0}else A=163;while(0);do if((A|0)==163){b=jd(0)|0;if((b|0)!=(-1|0)?(v=c[8969]|0,v=((v+-1&b|0)==0?0:(v+-1+b&0-v)-b|0)+(k&j)|0,u=c[8958]|0,v>>>0>s>>>0&v>>>0<2147483647):0){x=c[8960]|0;if(x|0?(v+u|0)>>>0<=u>>>0|(v+u|0)>>>0>x>>>0:0){a=0;break}a=jd(v|0)|0;if((a|0)==(b|0)){h=v;g=b;A=180;break d}else{e=a;d=v;A=171}}else a=0}while(0);do if((A|0)==171){b=0-d|0;if(!(h>>>0>d>>>0&(d>>>0<2147483647&(e|0)!=(-1|0))))if((e|0)==(-1|0)){a=0;break}else{h=d;g=e;A=180;break d}a=c[8970]|0;a=i-d+a&0-a;if(a>>>0>=2147483647){h=d;g=e;A=180;break d}if((jd(a|0)|0)==(-1|0)){jd(b|0)|0;a=0;break}else{h=a+d|0;g=e;A=180;break d}}while(0);c[8961]=c[8961]|4;A=178}else{a=0;A=178}while(0);if(((A|0)==178?(k&j)>>>0<2147483647:0)?(g=jd(k&j|0)|0,y=jd(0)|0,z=(y-g|0)>>>0>(s+40|0)>>>0,!((g|0)==(-1|0)|z^1|g>>>0<y>>>0&((g|0)!=(-1|0)&(y|0)!=(-1|0))^1)):0){h=z?y-g|0:a;A=180}if((A|0)==180){a=(c[8958]|0)+h|0;c[8958]=a;if(a>>>0>(c[8959]|0)>>>0)c[8959]=a;i=c[8856]|0;do if(i){a=35848;while(1){b=c[a>>2]|0;d=a+4|0;e=c[d>>2]|0;if((g|0)==(b+e|0)){A=190;break}f=c[a+8>>2]|0;if(!f)break;else a=f}if(((A|0)==190?(c[a+12>>2]&8|0)==0:0)?i>>>0<g>>>0&i>>>0>=b>>>0:0){c[d>>2]=e+h;G=(i+8&7|0)==0?0:0-(i+8)&7;H=(c[8853]|0)+(h-G)|0;c[8856]=i+G;c[8853]=H;c[i+G+4>>2]=H|1;c[i+G+H+4>>2]=40;c[8857]=c[8972];break}a=c[8854]|0;if(g>>>0<a>>>0){c[8854]=g;j=g}else j=a;d=g+h|0;a=35848;while(1){if((c[a>>2]|0)==(d|0)){A=198;break}b=c[a+8>>2]|0;if(!b)break;else a=b}if((A|0)==198?(c[a+12>>2]&8|0)==0:0){c[a>>2]=g;m=a+4|0;c[m>>2]=(c[m>>2]|0)+h;m=g+8|0;m=g+((m&7|0)==0?0:0-m&7)|0;a=d+((d+8&7|0)==0?0:0-(d+8)&7)|0;k=m+s|0;f=a-m-s|0;c[m+4>>2]=s|3;do if((a|0)!=(i|0)){if((a|0)==(c[8855]|0)){H=(c[8852]|0)+f|0;c[8852]=H;c[8855]=k;c[k+4>>2]=H|1;c[k+H>>2]=H;break}i=c[a+4>>2]|0;if((i&3|0)==1){f:do if(i>>>0>=256){h=c[a+24>>2]|0;b=c[a+12>>2]|0;do if((b|0)==(a|0)){b=c[a+16+4>>2]|0;if(!b){b=c[a+16>>2]|0;if(!b){F=0;break}else g=a+16|0}else g=a+16+4|0;while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;g=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;g=d}}if(g>>>0<j>>>0)Z();else{c[g>>2]=0;F=b;break}}else{d=c[a+8>>2]|0;if(d>>>0<j>>>0)Z();if((c[d+12>>2]|0)!=(a|0))Z();if((c[b+8>>2]|0)==(a|0)){c[d+12>>2]=b;c[b+8>>2]=d;F=b;break}else Z()}while(0);if(!h)break;b=c[a+28>>2]|0;do if((a|0)!=(c[35704+(b<<2)>>2]|0))if(h>>>0>=(c[8854]|0)>>>0){c[h+16+(((c[h+16>>2]|0)!=(a|0)&1)<<2)>>2]=F;if(!F)break f;else break}else Z();else{c[35704+(b<<2)>>2]=F;if(F|0)break;c[8851]=c[8851]&~(1<<b);break f}while(0);d=c[8854]|0;if(F>>>0<d>>>0)Z();c[F+24>>2]=h;b=c[a+16>>2]|0;do if(b|0)if(b>>>0<d>>>0)Z();else{c[F+16>>2]=b;c[b+24>>2]=F;break}while(0);b=c[a+16+4>>2]|0;if(!b)break;if(b>>>0<(c[8854]|0)>>>0)Z();else{c[F+20>>2]=b;c[b+24>>2]=F;break}}else{b=c[a+8>>2]|0;d=c[a+12>>2]|0;do if((b|0)!=(35440+(i>>>3<<1<<2)|0)){if(b>>>0<j>>>0)Z();if((c[b+12>>2]|0)==(a|0))break;Z()}while(0);if((d|0)==(b|0)){c[8850]=c[8850]&~(1<<(i>>>3));break}do if((d|0)==(35440+(i>>>3<<1<<2)|0))E=d+8|0;else{if(d>>>0<j>>>0)Z();if((c[d+8>>2]|0)==(a|0)){E=d+8|0;break}Z()}while(0);c[b+12>>2]=d;c[E>>2]=b}while(0);a=a+(i&-8)|0;f=(i&-8)+f|0}b=a+4|0;c[b>>2]=c[b>>2]&-2;c[k+4>>2]=f|1;c[k+f>>2]=f;b=f>>>3;if(f>>>0<256){a=c[8850]|0;do if(!(a&1<<b)){c[8850]=a|1<<b;G=35440+(b<<1<<2)|0;H=35440+(b<<1<<2)+8|0}else{a=c[35440+(b<<1<<2)+8>>2]|0;if(a>>>0>=(c[8854]|0)>>>0){G=a;H=35440+(b<<1<<2)+8|0;break}Z()}while(0);c[H>>2]=k;c[G+12>>2]=k;c[k+8>>2]=G;c[k+12>>2]=35440+(b<<1<<2);break}a=f>>>8;do if(!a)a=0;else{if(f>>>0>16777215){a=31;break}H=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);a=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(H+245760|0)>>>16&2)+(H<<((H+245760|0)>>>16&2)>>>15)|0;a=f>>>(a+7|0)&1|a<<1}while(0);e=35704+(a<<2)|0;c[k+28>>2]=a;c[k+16+4>>2]=0;c[k+16>>2]=0;b=c[8851]|0;d=1<<a;if(!(b&d)){c[8851]=b|d;c[e>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}b=f<<((a|0)==31?0:25-(a>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){A=265;break}d=e+16+(b>>>31<<2)|0;a=c[d>>2]|0;if(!a){A=262;break}else{b=b<<1;e=a}}if((A|0)==262)if(d>>>0<(c[8854]|0)>>>0)Z();else{c[d>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}else if((A|0)==265){a=e+8|0;b=c[a>>2]|0;H=c[8854]|0;if(b>>>0>=H>>>0&e>>>0>=H>>>0){c[b+12>>2]=k;c[a>>2]=k;c[k+8>>2]=b;c[k+12>>2]=e;c[k+24>>2]=0;break}else Z()}}else{H=(c[8853]|0)+f|0;c[8853]=H;c[8856]=k;c[k+4>>2]=H|1}while(0);H=m+8|0;l=I;return H|0}a=35848;while(1){b=c[a>>2]|0;if(b>>>0<=i>>>0?(B=b+(c[a+4>>2]|0)|0,B>>>0>i>>>0):0)break;a=c[a+8>>2]|0}f=B+-47+((B+-47+8&7|0)==0?0:0-(B+-47+8)&7)|0;f=f>>>0<(i+16|0)>>>0?i:f;a=g+8|0;a=(a&7|0)==0?0:0-a&7;H=g+a|0;a=h+-40-a|0;c[8856]=H;c[8853]=a;c[H+4>>2]=a|1;c[H+a+4>>2]=40;c[8857]=c[8972];c[f+4>>2]=27;c[f+8>>2]=c[8962];c[f+8+4>>2]=c[8963];c[f+8+8>>2]=c[8964];c[f+8+12>>2]=c[8965];c[8962]=g;c[8963]=h;c[8965]=0;c[8964]=f+8;a=f+24|0;do{H=a;a=a+4|0;c[a>>2]=7}while((H+8|0)>>>0<B>>>0);if((f|0)!=(i|0)){c[f+4>>2]=c[f+4>>2]&-2;c[i+4>>2]=f-i|1;c[f>>2]=f-i;if((f-i|0)>>>0<256){b=35440+((f-i|0)>>>3<<1<<2)|0;a=c[8850]|0;if(a&1<<((f-i|0)>>>3)){a=c[b+8>>2]|0;if(a>>>0<(c[8854]|0)>>>0)Z();else{C=a;D=b+8|0}}else{c[8850]=a|1<<((f-i|0)>>>3);C=b;D=b+8|0}c[D>>2]=i;c[C+12>>2]=i;c[i+8>>2]=C;c[i+12>>2]=b;break}if((f-i|0)>>>8)if((f-i|0)>>>0>16777215)a=31;else{a=(f-i|0)>>>8<<((((f-i|0)>>>8)+1048320|0)>>>16&8);a=14-((a+520192|0)>>>16&4|(((f-i|0)>>>8)+1048320|0)>>>16&8|((a<<((a+520192|0)>>>16&4))+245760|0)>>>16&2)+(a<<((a+520192|0)>>>16&4)<<(((a<<((a+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;a=(f-i|0)>>>(a+7|0)&1|a<<1}else a=0;e=35704+(a<<2)|0;c[i+28>>2]=a;c[i+20>>2]=0;c[i+16>>2]=0;b=c[8851]|0;d=1<<a;if(!(b&d)){c[8851]=b|d;c[e>>2]=i;c[i+24>>2]=e;c[i+12>>2]=i;c[i+8>>2]=i;break}b=f-i<<((a|0)==31?0:25-(a>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f-i|0)){A=292;break}d=e+16+(b>>>31<<2)|0;a=c[d>>2]|0;if(!a){A=289;break}else{b=b<<1;e=a}}if((A|0)==289)if(d>>>0<(c[8854]|0)>>>0)Z();else{c[d>>2]=i;c[i+24>>2]=e;c[i+12>>2]=i;c[i+8>>2]=i;break}else if((A|0)==292){a=e+8|0;b=c[a>>2]|0;H=c[8854]|0;if(b>>>0>=H>>>0&e>>>0>=H>>>0){c[b+12>>2]=i;c[a>>2]=i;c[i+8>>2]=b;c[i+12>>2]=e;c[i+24>>2]=0;break}else Z()}}}else{H=c[8854]|0;if((H|0)==0|g>>>0<H>>>0)c[8854]=g;c[8962]=g;c[8963]=h;c[8965]=0;c[8859]=c[8968];c[8858]=-1;a=0;do{H=35440+(a<<1<<2)|0;c[H+12>>2]=H;c[H+8>>2]=H;a=a+1|0}while((a|0)!=32);H=g+8|0;H=(H&7|0)==0?0:0-H&7;G=g+H|0;H=h+-40-H|0;c[8856]=G;c[8853]=H;c[G+4>>2]=H|1;c[G+H+4>>2]=40;c[8857]=c[8972]}while(0);a=c[8853]|0;if(a>>>0>s>>>0){F=a-s|0;c[8853]=F;H=c[8856]|0;G=H+s|0;c[8856]=G;c[G+4>>2]=F|1;c[H+4>>2]=s|3;H=H+8|0;l=I;return H|0}}c[8326]=12;H=0;l=I;return H|0}function ja(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;De(d,b);b=e;f=a;g=b+64|0;do{c[b>>2]=c[f>>2];b=b+4|0;f=f+4|0}while((b|0)<(g|0));s=0;b=c[d>>2]|0;f=c[d+4>>2]|0;while(1){A=c[e+32>>2]|0;q=c[e+32+4>>2]|0;i=Ze(A,q,14)|0;C=z;y=Ze(A,q,18)|0;C=z^C;D=Ze(A,q,41)|0;r=c[e+40>>2]|0;l=c[e+40+4>>2]|0;k=c[e+48>>2]|0;M=c[e+48+4>>2]|0;o=464+(s<<3)|0;m=c[o>>2]|0;o=c[o+4>>2]|0;w=c[e+56>>2]|0;u=c[e+56+4>>2]|0;C=fg(b|0,f|0,y^i^D|0,C^z|0)|0;o=fg(C|0,z|0,m|0,o|0)|0;o=fg(o|0,z|0,(k^r)&A^k|0,(M^l)&q^M|0)|0;u=fg(o|0,z|0,w|0,u|0)|0;w=z;o=fg(u|0,w|0,c[e+24>>2]|0,c[e+24+4>>2]|0)|0;m=z;c[e+24>>2]=o;c[e+24+4>>2]=m;C=c[e>>2]|0;D=c[e+4>>2]|0;i=Ze(C,D,28)|0;y=z;j=Ze(C,D,34)|0;y=z^y;v=Ze(C,D,39)|0;B=c[e+8>>2]|0;H=c[e+8+4>>2]|0;E=c[e+16>>2]|0;I=c[e+16+4>>2]|0;y=fg(u|0,w|0,j^i^v|0,y^z|0)|0;y=fg(y|0,z|0,(E|B)&C|E&B|0,(I|H)&D|I&H|0)|0;v=z;c[e+56>>2]=y;c[e+56+4>>2]=v;i=Ze(o,m,14)|0;j=z;w=Ze(o,m,18)|0;j=z^j;u=Ze(o,m,41)|0;h=s|1;x=c[464+(h<<3)>>2]|0;L=c[464+(h<<3)+4>>2]|0;j=fg(c[d+(h<<3)>>2]|0,c[d+(h<<3)+4>>2]|0,w^i^u|0,j^z|0)|0;L=fg(j|0,z|0,x|0,L|0)|0;L=fg(L|0,z|0,(r^A)&o^r|0,(l^q)&m^l|0)|0;M=fg(L|0,z|0,k|0,M|0)|0;k=z;I=fg(M|0,k|0,E|0,I|0)|0;E=z;c[e+16>>2]=I;c[e+16+4>>2]=E;L=Ze(y,v,28)|0;x=z;j=Ze(y,v,34)|0;x=z^x;u=Ze(y,v,39)|0;x=fg(M|0,k|0,j^L^u|0,x^z|0)|0;x=fg(x|0,z|0,(B|C)&y|B&C|0,(H|D)&v|H&D|0)|0;u=z;c[e+48>>2]=x;c[e+48+4>>2]=u;L=Ze(I,E,14)|0;j=z;k=Ze(I,E,18)|0;j=z^j;M=Ze(I,E,41)|0;i=s|2;w=c[464+(i<<3)>>2]|0;n=c[464+(i<<3)+4>>2]|0;j=fg(c[d+(i<<3)>>2]|0,c[d+(i<<3)+4>>2]|0,k^L^M|0,j^z|0)|0;n=fg(j|0,z|0,w|0,n|0)|0;q=fg(n|0,z|0,(A^o)&I^A|0,(q^m)&E^q|0)|0;l=fg(q|0,z|0,r|0,l|0)|0;r=z;H=fg(l|0,r|0,B|0,H|0)|0;B=z;c[e+8>>2]=H;c[e+8+4>>2]=B;q=Ze(x,u,28)|0;A=z;n=Ze(x,u,34)|0;A=z^A;w=Ze(x,u,39)|0;A=fg(l|0,r|0,n^q^w|0,A^z|0)|0;A=fg(A|0,z|0,(C|y)&x|C&y|0,(D|v)&u|D&v|0)|0;w=z;c[e+40>>2]=A;c[e+40+4>>2]=w;q=Ze(H,B,14)|0;n=z;r=Ze(H,B,18)|0;n=z^n;l=Ze(H,B,41)|0;j=s|3;M=c[464+(j<<3)>>2]|0;L=c[464+(j<<3)+4>>2]|0;k=c[e+32>>2]|0;p=c[e+32+4>>2]|0;n=fg(c[d+(j<<3)>>2]|0,c[d+(j<<3)+4>>2]|0,r^q^l|0,n^z|0)|0;L=fg(n|0,z|0,M|0,L|0)|0;m=fg(L|0,z|0,(o^I)&H^o|0,(m^E)&B^m|0)|0;p=fg(m|0,z|0,k|0,p|0)|0;k=z;D=fg(p|0,k|0,C|0,D|0)|0;C=z;c[e>>2]=D;c[e+4>>2]=C;m=Ze(A,w,28)|0;o=z;L=Ze(A,w,34)|0;o=z^o;M=Ze(A,w,39)|0;o=fg(p|0,k|0,L^m^M|0,o^z|0)|0;v=fg(o|0,z|0,(y|x)&A|y&x|0,(v|u)&w|v&u|0)|0;y=z;c[e+32>>2]=v;c[e+32+4>>2]=y;o=Ze(D,C,14)|0;M=z;m=Ze(D,C,18)|0;M=z^M;L=Ze(D,C,41)|0;k=s|4;p=c[464+(k<<3)>>2]|0;n=c[464+(k<<3)+4>>2]|0;l=c[e+24>>2]|0;q=c[e+24+4>>2]|0;M=fg(c[d+(k<<3)>>2]|0,c[d+(k<<3)+4>>2]|0,m^o^L|0,M^z|0)|0;n=fg(M|0,z|0,p|0,n|0)|0;E=fg(n|0,z|0,(I^H)&D^I|0,(E^B)&C^E|0)|0;q=fg(E|0,z|0,l|0,q|0)|0;l=z;E=fg(q|0,l|0,c[e+56>>2]|0,c[e+56+4>>2]|0)|0;I=z;c[e+56>>2]=E;c[e+56+4>>2]=I;n=Ze(v,y,28)|0;p=z;M=Ze(v,y,34)|0;p=z^p;L=Ze(v,y,39)|0;p=fg(q|0,l|0,M^n^L|0,p^z|0)|0;u=fg(p|0,z|0,(x|A)&v|x&A|0,(u|w)&y|u&w|0)|0;x=z;c[e+24>>2]=u;c[e+24+4>>2]=x;p=Ze(E,I,14)|0;L=z;n=Ze(E,I,18)|0;L=z^L;M=Ze(E,I,41)|0;l=s|5;q=c[464+(l<<3)>>2]|0;o=c[464+(l<<3)+4>>2]|0;m=c[e+16>>2]|0;r=c[e+16+4>>2]|0;L=fg(c[d+(l<<3)>>2]|0,c[d+(l<<3)+4>>2]|0,n^p^M|0,L^z|0)|0;o=fg(L|0,z|0,q|0,o|0)|0;B=fg(o|0,z|0,(H^D)&E^H|0,(B^C)&I^B|0)|0;r=fg(B|0,z|0,m|0,r|0)|0;m=z;B=fg(r|0,m|0,c[e+48>>2]|0,c[e+48+4>>2]|0)|0;H=z;c[e+48>>2]=B;c[e+48+4>>2]=H;o=Ze(u,x,28)|0;q=z;L=Ze(u,x,34)|0;q=z^q;M=Ze(u,x,39)|0;q=fg(r|0,m|0,L^o^M|0,q^z|0)|0;w=fg(q|0,z|0,(A|v)&u|A&v|0,(w|y)&x|w&y|0)|0;A=z;c[e+16>>2]=w;c[e+16+4>>2]=A;q=Ze(B,H,14)|0;M=z;o=Ze(B,H,18)|0;M=z^M;L=Ze(B,H,41)|0;m=s|6;r=c[464+(m<<3)>>2]|0;p=c[464+(m<<3)+4>>2]|0;n=c[e+8>>2]|0;b=c[e+8+4>>2]|0;M=fg(c[d+(m<<3)>>2]|0,c[d+(m<<3)+4>>2]|0,o^q^L|0,M^z|0)|0;p=fg(M|0,z|0,r|0,p|0)|0;C=fg(p|0,z|0,(D^E)&B^D|0,(C^I)&H^C|0)|0;b=fg(C|0,z|0,n|0,b|0)|0;n=z;C=fg(b|0,n|0,c[e+40>>2]|0,c[e+40+4>>2]|0)|0;D=z;c[e+40>>2]=C;c[e+40+4>>2]=D;p=Ze(w,A,28)|0;r=z;M=Ze(w,A,34)|0;r=z^r;L=Ze(w,A,39)|0;r=fg(b|0,n|0,M^p^L|0,r^z|0)|0;y=fg(r|0,z|0,(v|u)&w|v&u|0,(y|x)&A|y&x|0)|0;v=z;c[e+8>>2]=y;c[e+8+4>>2]=v;r=Ze(C,D,14)|0;L=z;p=Ze(C,D,18)|0;L=z^L;M=Ze(C,D,41)|0;n=s|7;b=c[464+(n<<3)>>2]|0;q=c[464+(n<<3)+4>>2]|0;o=c[e>>2]|0;f=c[e+4>>2]|0;L=fg(c[d+(n<<3)>>2]|0,c[d+(n<<3)+4>>2]|0,p^r^M|0,L^z|0)|0;q=fg(L|0,z|0,b|0,q|0)|0;I=fg(q|0,z|0,(E^B)&C^E|0,(I^H)&D^I|0)|0;f=fg(I|0,z|0,o|0,f|0)|0;o=z;I=fg(f|0,o|0,c[e+32>>2]|0,c[e+32+4>>2]|0)|0;E=z;c[e+32>>2]=I;c[e+32+4>>2]=E;q=Ze(y,v,28)|0;b=z;L=Ze(y,v,34)|0;b=z^b;M=Ze(y,v,39)|0;b=fg(f|0,o|0,L^q^M|0,b^z|0)|0;x=fg(b|0,z|0,(u|w)&y|u&w|0,(x|A)&v|x&A|0)|0;u=z;c[e>>2]=x;c[e+4>>2]=u;b=Ze(I,E,14)|0;M=z;q=Ze(I,E,18)|0;M=z^M;L=Ze(I,E,41)|0;o=s|8;f=c[464+(o<<3)>>2]|0;r=c[464+(o<<3)+4>>2]|0;p=c[e+56>>2]|0;g=c[e+56+4>>2]|0;M=fg(c[d+(o<<3)>>2]|0,c[d+(o<<3)+4>>2]|0,q^b^L|0,M^z|0)|0;r=fg(M|0,z|0,f|0,r|0)|0;H=fg(r|0,z|0,(B^C)&I^B|0,(H^D)&E^H|0)|0;g=fg(H|0,z|0,p|0,g|0)|0;p=z;H=fg(g|0,p|0,c[e+24>>2]|0,c[e+24+4>>2]|0)|0;B=z;c[e+24>>2]=H;c[e+24+4>>2]=B;r=Ze(x,u,28)|0;f=z;M=Ze(x,u,34)|0;f=z^f;L=Ze(x,u,39)|0;f=fg(g|0,p|0,M^r^L|0,f^z|0)|0;A=fg(f|0,z|0,(w|y)&x|w&y|0,(A|v)&u|A&v|0)|0;w=z;c[e+56>>2]=A;c[e+56+4>>2]=w;f=Ze(H,B,14)|0;L=z;r=Ze(H,B,18)|0;L=z^L;M=Ze(H,B,41)|0;p=s|9;g=c[464+(p<<3)>>2]|0;b=c[464+(p<<3)+4>>2]|0;q=c[e+48>>2]|0;t=c[e+48+4>>2]|0;L=fg(c[d+(p<<3)>>2]|0,c[d+(p<<3)+4>>2]|0,r^f^M|0,L^z|0)|0;b=fg(L|0,z|0,g|0,b|0)|0;D=fg(b|0,z|0,(C^I)&H^C|0,(D^E)&B^D|0)|0;t=fg(D|0,z|0,q|0,t|0)|0;q=z;D=fg(t|0,q|0,c[e+16>>2]|0,c[e+16+4>>2]|0)|0;C=z;c[e+16>>2]=D;c[e+16+4>>2]=C;b=Ze(A,w,28)|0;g=z;L=Ze(A,w,34)|0;g=z^g;M=Ze(A,w,39)|0;g=fg(t|0,q|0,L^b^M|0,g^z|0)|0;v=fg(g|0,z|0,(y|x)&A|y&x|0,(v|u)&w|v&u|0)|0;y=z;c[e+48>>2]=v;c[e+48+4>>2]=y;g=Ze(D,C,14)|0;M=z;b=Ze(D,C,18)|0;M=z^M;L=Ze(D,C,41)|0;q=s|10;t=c[464+(q<<3)>>2]|0;f=c[464+(q<<3)+4>>2]|0;r=c[e+40>>2]|0;F=c[e+40+4>>2]|0;M=fg(c[d+(q<<3)>>2]|0,c[d+(q<<3)+4>>2]|0,b^g^L|0,M^z|0)|0;f=fg(M|0,z|0,t|0,f|0)|0;E=fg(f|0,z|0,(I^H)&D^I|0,(E^B)&C^E|0)|0;F=fg(E|0,z|0,r|0,F|0)|0;r=z;E=fg(F|0,r|0,c[e+8>>2]|0,c[e+8+4>>2]|0)|0;I=z;c[e+8>>2]=E;c[e+8+4>>2]=I;f=Ze(v,y,28)|0;t=z;M=Ze(v,y,34)|0;t=z^t;L=Ze(v,y,39)|0;t=fg(F|0,r|0,M^f^L|0,t^z|0)|0;u=fg(t|0,z|0,(x|A)&v|x&A|0,(u|w)&y|u&w|0)|0;x=z;c[e+40>>2]=u;c[e+40+4>>2]=x;t=Ze(E,I,14)|0;L=z;f=Ze(E,I,18)|0;L=z^L;M=Ze(E,I,41)|0;r=s|11;F=c[464+(r<<3)>>2]|0;g=c[464+(r<<3)+4>>2]|0;b=c[e+32>>2]|0;O=c[e+32+4>>2]|0;L=fg(c[d+(r<<3)>>2]|0,c[d+(r<<3)+4>>2]|0,f^t^M|0,L^z|0)|0;g=fg(L|0,z|0,F|0,g|0)|0;B=fg(g|0,z|0,(H^D)&E^H|0,(B^C)&I^B|0)|0;O=fg(B|0,z|0,b|0,O|0)|0;b=z;B=fg(O|0,b|0,c[e>>2]|0,c[e+4>>2]|0)|0;H=z;c[e>>2]=B;c[e+4>>2]=H;g=Ze(u,x,28)|0;F=z;L=Ze(u,x,34)|0;F=z^F;M=Ze(u,x,39)|0;F=fg(O|0,b|0,L^g^M|0,F^z|0)|0;w=fg(F|0,z|0,(A|v)&u|A&v|0,(w|y)&x|w&y|0)|0;A=z;c[e+32>>2]=w;c[e+32+4>>2]=A;F=Ze(B,H,14)|0;M=z;g=Ze(B,H,18)|0;M=z^M;L=Ze(B,H,41)|0;b=s|12;O=c[464+(b<<3)>>2]|0;t=c[464+(b<<3)+4>>2]|0;f=c[e+24>>2]|0;J=c[e+24+4>>2]|0;M=fg(c[d+(b<<3)>>2]|0,c[d+(b<<3)+4>>2]|0,g^F^L|0,M^z|0)|0;t=fg(M|0,z|0,O|0,t|0)|0;C=fg(t|0,z|0,(D^E)&B^D|0,(C^I)&H^C|0)|0;J=fg(C|0,z|0,f|0,J|0)|0;f=z;C=fg(J|0,f|0,c[e+56>>2]|0,c[e+56+4>>2]|0)|0;D=z;c[e+56>>2]=C;c[e+56+4>>2]=D;t=Ze(w,A,28)|0;O=z;M=Ze(w,A,34)|0;O=z^O;L=Ze(w,A,39)|0;O=fg(J|0,f|0,M^t^L|0,O^z|0)|0;y=fg(O|0,z|0,(v|u)&w|v&u|0,(y|x)&A|y&x|0)|0;v=z;c[e+24>>2]=y;c[e+24+4>>2]=v;O=Ze(C,D,14)|0;L=z;t=Ze(C,D,18)|0;L=z^L;M=Ze(C,D,41)|0;f=s|13;J=c[464+(f<<3)>>2]|0;F=c[464+(f<<3)+4>>2]|0;g=c[e+16>>2]|0;N=c[e+16+4>>2]|0;L=fg(c[d+(f<<3)>>2]|0,c[d+(f<<3)+4>>2]|0,t^O^M|0,L^z|0)|0;F=fg(L|0,z|0,J|0,F|0)|0;I=fg(F|0,z|0,(E^B)&C^E|0,(I^H)&D^I|0)|0;N=fg(I|0,z|0,g|0,N|0)|0;g=z;I=fg(N|0,g|0,c[e+48>>2]|0,c[e+48+4>>2]|0)|0;E=z;c[e+48>>2]=I;c[e+48+4>>2]=E;F=Ze(y,v,28)|0;J=z;L=Ze(y,v,34)|0;J=z^J;M=Ze(y,v,39)|0;J=fg(N|0,g|0,L^F^M|0,J^z|0)|0;x=fg(J|0,z|0,(u|w)&y|u&w|0,(x|A)&v|x&A|0)|0;u=z;c[e+16>>2]=x;c[e+16+4>>2]=u;J=Ze(I,E,14)|0;M=z;F=Ze(I,E,18)|0;M=z^M;L=Ze(I,E,41)|0;g=s|14;N=c[464+(g<<3)>>2]|0;O=c[464+(g<<3)+4>>2]|0;t=c[e+8>>2]|0;K=c[e+8+4>>2]|0;M=fg(c[d+(g<<3)>>2]|0,c[d+(g<<3)+4>>2]|0,F^J^L|0,M^z|0)|0;O=fg(M|0,z|0,N|0,O|0)|0;H=fg(O|0,z|0,(B^C)&I^B|0,(H^D)&E^H|0)|0;K=fg(H|0,z|0,t|0,K|0)|0;t=z;H=fg(K|0,t|0,c[e+40>>2]|0,c[e+40+4>>2]|0)|0;B=z;c[e+40>>2]=H;c[e+40+4>>2]=B;O=Ze(x,u,28)|0;N=z;M=Ze(x,u,34)|0;N=z^N;L=Ze(x,u,39)|0;N=fg(K|0,t|0,M^O^L|0,N^z|0)|0;A=fg(N|0,z|0,(w|y)&x|w&y|0,(A|v)&u|A&v|0)|0;w=z;c[e+8>>2]=A;c[e+8+4>>2]=w;N=Ze(H,B,14)|0;L=z;O=Ze(H,B,18)|0;L=z^L;M=Ze(H,B,41)|0;t=s|15;K=c[464+(t<<3)>>2]|0;J=c[464+(t<<3)+4>>2]|0;F=c[e>>2]|0;G=c[e+4>>2]|0;L=fg(c[d+(t<<3)>>2]|0,c[d+(t<<3)+4>>2]|0,O^N^M|0,L^z|0)|0;J=fg(L|0,z|0,K|0,J|0)|0;D=fg(J|0,z|0,(C^I)&H^C|0,(D^E)&B^D|0)|0;G=fg(D|0,z|0,F|0,G|0)|0;F=z;D=fg(G|0,F|0,c[e+32>>2]|0,c[e+32+4>>2]|0)|0;c[e+32>>2]=D;c[e+32+4>>2]=z;D=Ze(A,w,28)|0;B=z;E=Ze(A,w,34)|0;B=z^B;C=Ze(A,w,39)|0;B=fg(G|0,F|0,E^D^C|0,B^z|0)|0;u=fg(B|0,z|0,(y|x)&A|y&x|0,(v|u)&w|v&u|0)|0;c[e>>2]=u;c[e+4>>2]=z;if((s|0)==64){b=0;break}K=c[d+(g<<3)>>2]|0;I=c[d+(g<<3)+4>>2]|0;N=Ze(K,I,19)|0;C=z;H=Ze(K,I,61)|0;J=z;I=yf(K|0,I|0,6)|0;J=fg(I^N^H|0,z^C^J|0,c[d+(p<<3)>>2]|0,c[d+(p<<3)+4>>2]|0)|0;C=z;H=c[d+(h<<3)>>2]|0;N=c[d+(h<<3)+4>>2]|0;I=Ze(H,N,1)|0;K=z;G=Ze(H,N,8)|0;L=z;E=yf(H|0,N|0,7)|0;L=z^K^L;K=d+(s<<3)|0;K=fg(J|0,C|0,c[K>>2]|0,c[K+4>>2]|0)|0;L=fg(K|0,z|0,E^I^G|0,L|0)|0;G=z;s=s+16|0;I=d+(s<<3)|0;c[I>>2]=L;c[I+4>>2]=G;I=c[d+(t<<3)>>2]|0;E=c[d+(t<<3)+4>>2]|0;K=Ze(I,E,19)|0;C=z;J=Ze(I,E,61)|0;F=z;E=yf(I|0,E|0,6)|0;F=fg(E^K^J|0,z^C^F|0,c[d+(h+9<<3)>>2]|0,c[d+(h+9<<3)+4>>2]|0)|0;C=z;J=c[d+(h+1<<3)>>2]|0;K=c[d+(h+1<<3)+4>>2]|0;E=Ze(J,K,1)|0;I=z;O=Ze(J,K,8)|0;M=z;D=yf(J|0,K|0,7)|0;M=z^I^M;N=fg(F|0,C|0,H|0,N|0)|0;M=fg(N|0,z|0,D^E^O|0,M|0)|0;O=z;c[d+(h+16<<3)>>2]=M;c[d+(h+16<<3)+4>>2]=O;E=Ze(L,G,19)|0;D=z;N=Ze(L,G,61)|0;H=z;G=yf(L|0,G|0,6)|0;H=fg(G^E^N|0,z^D^H|0,c[d+(r<<3)>>2]|0,c[d+(r<<3)+4>>2]|0)|0;D=z;N=c[d+(j<<3)>>2]|0;E=c[d+(j<<3)+4>>2]|0;G=Ze(N,E,1)|0;L=z;C=Ze(N,E,8)|0;F=z;I=yf(N|0,E|0,7)|0;F=z^L^F;K=fg(H|0,D|0,J|0,K|0)|0;F=fg(K|0,z|0,I^G^C|0,F|0)|0;C=z;c[d+(i+16<<3)>>2]=F;c[d+(i+16<<3)+4>>2]=C;G=Ze(M,O,19)|0;I=z;K=Ze(M,O,61)|0;J=z;O=yf(M|0,O|0,6)|0;J=fg(O^G^K|0,z^I^J|0,c[d+(j+9<<3)>>2]|0,c[d+(j+9<<3)+4>>2]|0)|0;I=z;K=c[d+(j+1<<3)>>2]|0;G=c[d+(j+1<<3)+4>>2]|0;O=Ze(K,G,1)|0;M=z;D=Ze(K,G,8)|0;H=z;L=yf(K|0,G|0,7)|0;H=z^M^H;E=fg(J|0,I|0,N|0,E|0)|0;H=fg(E|0,z|0,L^O^D|0,H|0)|0;D=z;c[d+(j+16<<3)>>2]=H;c[d+(j+16<<3)+4>>2]=D;O=Ze(F,C,19)|0;L=z;E=Ze(F,C,61)|0;N=z;C=yf(F|0,C|0,6)|0;N=fg(C^O^E|0,z^L^N|0,c[d+(f<<3)>>2]|0,c[d+(f<<3)+4>>2]|0)|0;L=z;E=c[d+(l<<3)>>2]|0;O=c[d+(l<<3)+4>>2]|0;C=Ze(E,O,1)|0;F=z;I=Ze(E,O,8)|0;J=z;M=yf(E|0,O|0,7)|0;J=z^F^J;G=fg(N|0,L|0,K|0,G|0)|0;J=fg(G|0,z|0,M^C^I|0,J|0)|0;I=z;c[d+(k+16<<3)>>2]=J;c[d+(k+16<<3)+4>>2]=I;C=Ze(H,D,19)|0;M=z;G=Ze(H,D,61)|0;K=z;D=yf(H|0,D|0,6)|0;K=fg(D^C^G|0,z^M^K|0,c[d+(l+9<<3)>>2]|0,c[d+(l+9<<3)+4>>2]|0)|0;M=z;G=c[d+(l+1<<3)>>2]|0;C=c[d+(l+1<<3)+4>>2]|0;D=Ze(G,C,1)|0;H=z;L=Ze(G,C,8)|0;N=z;F=yf(G|0,C|0,7)|0;N=z^H^N;O=fg(K|0,M|0,E|0,O|0)|0;N=fg(O|0,z|0,F^D^L|0,N|0)|0;L=z;c[d+(l+16<<3)>>2]=N;c[d+(l+16<<3)+4>>2]=L;D=Ze(J,I,19)|0;F=z;O=Ze(J,I,61)|0;E=z;I=yf(J|0,I|0,6)|0;E=fg(I^D^O|0,z^F^E|0,c[d+(t<<3)>>2]|0,c[d+(t<<3)+4>>2]|0)|0;F=z;O=c[d+(n<<3)>>2]|0;D=c[d+(n<<3)+4>>2]|0;I=Ze(O,D,1)|0;J=z;M=Ze(O,D,8)|0;K=z;H=yf(O|0,D|0,7)|0;K=z^J^K;C=fg(E|0,F|0,G|0,C|0)|0;K=fg(C|0,z|0,H^I^M|0,K|0)|0;M=z;c[d+(m+16<<3)>>2]=K;c[d+(m+16<<3)+4>>2]=M;I=Ze(N,L,19)|0;H=z;C=Ze(N,L,61)|0;G=z;L=yf(N|0,L|0,6)|0;G=fg(L^I^C|0,z^H^G|0,c[d+(n+9<<3)>>2]|0,c[d+(n+9<<3)+4>>2]|0)|0;H=z;C=c[d+(n+1<<3)>>2]|0;I=c[d+(n+1<<3)+4>>2]|0;L=Ze(C,I,1)|0;N=z;F=Ze(C,I,8)|0;E=z;J=yf(C|0,I|0,7)|0;E=z^N^E;D=fg(G|0,H|0,O|0,D|0)|0;E=fg(D|0,z|0,J^L^F|0,E|0)|0;F=z;c[d+(n+16<<3)>>2]=E;c[d+(n+16<<3)+4>>2]=F;L=Ze(K,M,19)|0;J=z;D=Ze(K,M,61)|0;O=z;M=yf(K|0,M|0,6)|0;O=fg(M^L^D|0,z^J^O|0,c[d+(o+9<<3)>>2]|0,c[d+(o+9<<3)+4>>2]|0)|0;J=z;D=c[d+(p<<3)>>2]|0;L=c[d+(p<<3)+4>>2]|0;M=Ze(D,L,1)|0;K=z;H=Ze(D,L,8)|0;G=z;N=yf(D|0,L|0,7)|0;G=z^K^G;I=fg(O|0,J|0,C|0,I|0)|0;G=fg(I|0,z|0,N^M^H|0,G|0)|0;H=z;c[d+(o+16<<3)>>2]=G;c[d+(o+16<<3)+4>>2]=H;M=Ze(E,F,19)|0;N=z;I=Ze(E,F,61)|0;C=z;F=yf(E|0,F|0,6)|0;C=fg(F^M^I|0,z^N^C|0,c[d+(p+9<<3)>>2]|0,c[d+(p+9<<3)+4>>2]|0)|0;N=z;I=c[d+(p+1<<3)>>2]|0;M=c[d+(p+1<<3)+4>>2]|0;F=Ze(I,M,1)|0;E=z;J=Ze(I,M,8)|0;O=z;K=yf(I|0,M|0,7)|0;O=z^E^O;L=fg(C|0,N|0,D|0,L|0)|0;O=fg(L|0,z|0,K^F^J|0,O|0)|0;J=z;c[d+(p+16<<3)>>2]=O;c[d+(p+16<<3)+4>>2]=J;F=Ze(G,H,19)|0;K=z;L=Ze(G,H,61)|0;D=z;H=yf(G|0,H|0,6)|0;D=fg(H^F^L|0,z^K^D|0,c[d+(q+9<<3)>>2]|0,c[d+(q+9<<3)+4>>2]|0)|0;K=z;L=c[d+(r<<3)>>2]|0;F=c[d+(r<<3)+4>>2]|0;H=Ze(L,F,1)|0;G=z;N=Ze(L,F,8)|0;C=z;E=yf(L|0,F|0,7)|0;C=z^G^C;M=fg(D|0,K|0,I|0,M|0)|0;C=fg(M|0,z|0,E^H^N|0,C|0)|0;N=z;c[d+(q+16<<3)>>2]=C;c[d+(q+16<<3)+4>>2]=N;H=Ze(O,J,19)|0;E=z;M=Ze(O,J,61)|0;I=z;J=yf(O|0,J|0,6)|0;I=fg(J^H^M|0,z^E^I|0,c[d+(r+9<<3)>>2]|0,c[d+(r+9<<3)+4>>2]|0)|0;E=z;M=c[d+(r+1<<3)>>2]|0;H=c[d+(r+1<<3)+4>>2]|0;J=Ze(M,H,1)|0;O=z;K=Ze(M,H,8)|0;D=z;G=yf(M|0,H|0,7)|0;D=z^O^D;F=fg(I|0,E|0,L|0,F|0)|0;D=fg(F|0,z|0,G^J^K|0,D|0)|0;K=z;c[d+(r+16<<3)>>2]=D;c[d+(r+16<<3)+4>>2]=K;J=Ze(C,N,19)|0;G=z;F=Ze(C,N,61)|0;L=z;N=yf(C|0,N|0,6)|0;L=fg(N^J^F|0,z^G^L|0,c[d+(b+9<<3)>>2]|0,c[d+(b+9<<3)+4>>2]|0)|0;G=z;F=c[d+(f<<3)>>2]|0;J=c[d+(f<<3)+4>>2]|0;N=Ze(F,J,1)|0;C=z;E=Ze(F,J,8)|0;I=z;O=yf(F|0,J|0,7)|0;I=z^C^I;H=fg(L|0,G|0,M|0,H|0)|0;I=fg(H|0,z|0,O^N^E|0,I|0)|0;E=z;c[d+(b+16<<3)>>2]=I;c[d+(b+16<<3)+4>>2]=E;N=Ze(D,K,19)|0;b=z;O=Ze(D,K,61)|0;H=z;K=yf(D|0,K|0,6)|0;H=fg(K^N^O|0,z^b^H|0,c[d+(f+9<<3)>>2]|0,c[d+(f+9<<3)+4>>2]|0)|0;b=z;O=c[d+(f+1<<3)>>2]|0;N=c[d+(f+1<<3)+4>>2]|0;K=Ze(O,N,1)|0;D=z;M=Ze(O,N,8)|0;G=z;L=yf(O|0,N|0,7)|0;G=z^D^G;J=fg(H|0,b|0,F|0,J|0)|0;G=fg(J|0,z|0,L^K^M|0,G|0)|0;M=z;c[d+(f+16<<3)>>2]=G;c[d+(f+16<<3)+4>>2]=M;K=Ze(I,E,19)|0;L=z;J=Ze(I,E,61)|0;F=z;b=yf(I|0,E|0,6)|0;F=fg(b^K^J|0,z^L^F|0,c[d+(g+9<<3)>>2]|0,c[d+(g+9<<3)+4>>2]|0)|0;L=z;J=c[d+(t<<3)>>2]|0;K=c[d+(t<<3)+4>>2]|0;b=Ze(J,K,1)|0;E=z;I=Ze(J,K,8)|0;f=z;H=yf(J|0,K|0,7)|0;f=z^E^f;N=fg(F|0,L|0,O|0,N|0)|0;f=fg(N|0,z|0,H^b^I|0,f|0)|0;c[d+(g+16<<3)>>2]=f;c[d+(g+16<<3)+4>>2]=z;f=Ze(G,M,19)|0;I=z;b=Ze(G,M,61)|0;H=z;M=yf(G|0,M|0,6)|0;H=fg(M^f^b|0,z^I^H|0,c[d+(t+9<<3)>>2]|0,c[d+(t+9<<3)+4>>2]|0)|0;I=z;b=c[d+(t+1<<3)>>2]|0;f=c[d+(t+1<<3)+4>>2]|0;M=Ze(b,f,1)|0;G=z;N=Ze(b,f,8)|0;O=z;L=yf(b|0,f|0,7)|0;O=z^G^O;K=fg(H|0,I|0,J|0,K|0)|0;O=fg(K|0,z|0,L^M^N|0,O|0)|0;c[d+(t+16<<3)>>2]=O;c[d+(t+16<<3)+4>>2]=z;if((s|0)>=80){b=0;break}}do{N=e+(b<<3)|0;O=a+(b<<3)|0;N=fg(c[O>>2]|0,c[O+4>>2]|0,c[N>>2]|0,c[N+4>>2]|0)|0;c[O>>2]=N;c[O+4>>2]=z;b=b+1|0}while((b|0)!=8);return}function ka(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0;R=df(a[b>>0]|0,a[b+1>>0]|0,a[b+2>>0]|0)|0;d=Qd(b+2|0)|0;d=yf(d|0,z|0,5)|0;S=df(a[b+5>>0]|0,a[b+6>>0]|0,a[b+7>>0]|0)|0;S=yf(S|0,z|0,2)|0;V=Qd(b+7|0)|0;V=yf(V|0,z|0,7)|0;w=Qd(b+10|0)|0;w=yf(w|0,z|0,4)|0;X=df(a[b+13>>0]|0,a[b+14>>0]|0,a[b+15>>0]|0)|0;X=yf(X|0,z|0,1)|0;Q=Qd(b+15|0)|0;Q=yf(Q|0,z|0,6)|0;fa=df(a[b+18>>0]|0,a[b+19>>0]|0,a[b+20>>0]|0)|0;fa=yf(fa|0,z|0,3)|0;ma=df(a[b+21>>0]|0,a[b+22>>0]|0,a[b+23>>0]|0)|0;ca=Qd(b+23|0)|0;ca=yf(ca|0,z|0,5)|0;la=df(a[b+26>>0]|0,a[b+27>>0]|0,a[b+28>>0]|0)|0;la=yf(la|0,z|0,2)|0;t=Qd(b+28|0)|0;t=yf(t|0,z|0,7)|0;qa=Qd(b+31|0)|0;qa=yf(qa|0,z|0,4)|0;u=df(a[b+34>>0]|0,a[b+35>>0]|0,a[b+36>>0]|0)|0;u=yf(u|0,z|0,1)|0;A=Qd(b+36|0)|0;A=yf(A|0,z|0,6)|0;o=df(a[b+39>>0]|0,a[b+40>>0]|0,a[b+41>>0]|0)|0;o=yf(o|0,z|0,3)|0;Z=df(a[b+42>>0]|0,a[b+43>>0]|0,a[b+44>>0]|0)|0;O=Qd(b+44|0)|0;O=yf(O|0,z|0,5)|0;$=df(a[b+47>>0]|0,a[b+48>>0]|0,a[b+49>>0]|0)|0;$=yf($|0,z|0,2)|0;ra=Qd(b+49|0)|0;ra=yf(ra|0,z|0,7)|0;v=Qd(b+52|0)|0;v=yf(v|0,z|0,4)|0;s=df(a[b+55>>0]|0,a[b+56>>0]|0,a[b+57>>0]|0)|0;s=yf(s|0,z|0,1)|0;g=Qd(b+57|0)|0;g=yf(g|0,z|0,6)|0;H=Qd(b+60|0)|0;H=yf(H|0,z|0,3)|0;c=z;h=af(H|0,c|0,666643,0)|0;e=z;ha=af(H|0,c|0,470296,0)|0;k=z;P=af(H|0,c|0,654183,0)|0;l=z;F=af(H|0,c|0,-997805,-1)|0;K=z;j=af(H|0,c|0,136657,0)|0;o=fg(j|0,z|0,o&2097151|0,0)|0;j=z;c=af(H|0,c|0,-683901,-1)|0;Z=fg(c|0,z|0,Z&2097151|0,0)|0;c=z;H=af(g&2097151|0,0,666643,0)|0;C=z;r=af(g&2097151|0,0,470296,0)|0;D=z;f=af(g&2097151|0,0,654183,0)|0;n=z;B=af(g&2097151|0,0,-997805,-1)|0;I=z;Y=af(g&2097151|0,0,136657,0)|0;G=z;g=af(g&2097151|0,0,-683901,-1)|0;g=fg(o|0,j|0,g|0,z|0)|0;j=z;o=af(s&2097151|0,0,666643,0)|0;m=z;J=af(s&2097151|0,0,470296,0)|0;x=z;y=af(s&2097151|0,0,654183,0)|0;U=z;na=af(s&2097151|0,0,-997805,-1)|0;ga=z;p=af(s&2097151|0,0,136657,0)|0;_=z;s=af(s&2097151|0,0,-683901,-1)|0;A=fg(s|0,z|0,A&2097151|0,0)|0;K=fg(A|0,z|0,F|0,K|0)|0;G=fg(K|0,z|0,Y|0,G|0)|0;Y=z;K=af(v&2097151|0,0,666643,0)|0;F=z;A=af(v&2097151|0,0,470296,0)|0;s=z;ia=af(v&2097151|0,0,654183,0)|0;i=z;N=af(v&2097151|0,0,-997805,-1)|0;q=z;pa=af(v&2097151|0,0,136657,0)|0;oa=z;v=af(v&2097151|0,0,-683901,-1)|0;W=z;E=af(ra&2097151|0,0,666643,0)|0;T=z;da=af(ra&2097151|0,0,470296,0)|0;ea=z;ba=af(ra&2097151|0,0,654183,0)|0;aa=z;ka=af(ra&2097151|0,0,-997805,-1)|0;ja=z;L=af(ra&2097151|0,0,136657,0)|0;M=z;ra=af(ra&2097151|0,0,-683901,-1)|0;qa=fg(ra|0,z|0,qa&2097151|0,0)|0;oa=fg(qa|0,z|0,pa|0,oa|0)|0;ga=fg(oa|0,z|0,na|0,ga|0)|0;k=fg(ga|0,z|0,ha|0,k|0)|0;n=fg(k|0,z|0,f|0,n|0)|0;f=z;k=af($&2097151|0,0,666643,0)|0;Q=fg(k|0,z|0,Q&2097151|0,0)|0;k=z;ha=af($&2097151|0,0,470296,0)|0;ga=z;na=af($&2097151|0,0,654183,0)|0;ma=fg(na|0,z|0,ma&2097151|0,0)|0;ea=fg(ma|0,z|0,da|0,ea|0)|0;F=fg(ea|0,z|0,K|0,F|0)|0;K=z;ea=af($&2097151|0,0,-997805,-1)|0;da=z;ma=af($&2097151|0,0,136657,0)|0;la=fg(ma|0,z|0,la&2097151|0,0)|0;ja=fg(la|0,z|0,ka|0,ja|0)|0;i=fg(ja|0,z|0,ia|0,i|0)|0;x=fg(i|0,z|0,J|0,x|0)|0;C=fg(x|0,z|0,H|0,C|0)|0;H=z;$=af($&2097151|0,0,-683901,-1)|0;x=z;J=fg(Q|0,k|0,1048576,0)|0;J=yf(J|0,z|0,21)|0;i=z;fa=fg(ha|0,ga|0,fa&2097151|0,0)|0;T=fg(fa|0,z|0,E|0,T|0)|0;T=fg(T|0,z|0,J|0,i|0)|0;E=z;i=vf(J|0,i|0,21)|0;i=cg(Q|0,k|0,i|0,z|0)|0;k=z;Q=fg(F|0,K|0,1048576,0)|0;Q=yf(Q|0,z|0,21)|0;J=z;ca=fg(ea|0,da|0,ca&2097151|0,0)|0;aa=fg(ca|0,z|0,ba|0,aa|0)|0;s=fg(aa|0,z|0,A|0,s|0)|0;m=fg(s|0,z|0,o|0,m|0)|0;m=fg(m|0,z|0,Q|0,J|0)|0;o=z;J=vf(Q|0,J|0,21)|0;Q=z;s=fg(C|0,H|0,1048576,0)|0;s=Xe(s|0,z|0,21)|0;A=z;t=fg($|0,x|0,t&2097151|0,0)|0;M=fg(t|0,z|0,L|0,M|0)|0;q=fg(M|0,z|0,N|0,q|0)|0;U=fg(q|0,z|0,y|0,U|0)|0;e=fg(U|0,z|0,h|0,e|0)|0;D=fg(e|0,z|0,r|0,D|0)|0;D=fg(D|0,z|0,s|0,A|0)|0;r=z;A=vf(s|0,A|0,21)|0;s=z;e=fg(n|0,f|0,1048576,0)|0;e=Xe(e|0,z|0,21)|0;h=z;u=fg(v|0,W|0,u&2097151|0,0)|0;_=fg(u|0,z|0,p|0,_|0)|0;l=fg(_|0,z|0,P|0,l|0)|0;I=fg(l|0,z|0,B|0,I|0)|0;I=fg(I|0,z|0,e|0,h|0)|0;B=z;h=vf(e|0,h|0,21)|0;h=cg(n|0,f|0,h|0,z|0)|0;f=z;n=fg(G|0,Y|0,1048576,0)|0;n=Xe(n|0,z|0,21)|0;e=z;j=fg(g|0,j|0,n|0,e|0)|0;g=z;e=vf(n|0,e|0,21)|0;e=cg(G|0,Y|0,e|0,z|0)|0;Y=z;G=fg(Z|0,c|0,1048576,0)|0;G=Xe(G|0,z|0,21)|0;n=z;O=fg(G|0,n|0,O&2097151|0,0)|0;l=z;n=vf(G|0,n|0,21)|0;n=cg(Z|0,c|0,n|0,z|0)|0;c=z;Z=fg(T|0,E|0,1048576,0)|0;Z=yf(Z|0,z|0,21)|0;G=z;P=vf(Z|0,G|0,21)|0;P=cg(T|0,E|0,P|0,z|0)|0;E=z;T=fg(m|0,o|0,1048576,0)|0;T=Xe(T|0,z|0,21)|0;_=z;p=vf(T|0,_|0,21)|0;u=z;W=fg(D|0,r|0,1048576,0)|0;W=Xe(W|0,z|0,21)|0;v=z;f=fg(W|0,v|0,h|0,f|0)|0;h=z;v=vf(W|0,v|0,21)|0;v=cg(D|0,r|0,v|0,z|0)|0;r=z;D=fg(I|0,B|0,1048576,0)|0;D=Xe(D|0,z|0,21)|0;W=z;Y=fg(D|0,W|0,e|0,Y|0)|0;e=z;W=vf(D|0,W|0,21)|0;W=cg(I|0,B|0,W|0,z|0)|0;B=z;I=fg(j|0,g|0,1048576,0)|0;I=Xe(I|0,z|0,21)|0;D=z;c=fg(I|0,D|0,n|0,c|0)|0;n=z;D=vf(I|0,D|0,21)|0;D=cg(j|0,g|0,D|0,z|0)|0;g=z;j=af(O|0,l|0,666643,0)|0;X=fg(j|0,z|0,X&2097151|0,0)|0;j=z;I=af(O|0,l|0,470296,0)|0;I=fg(i|0,k|0,I|0,z|0)|0;k=z;i=af(O|0,l|0,654183,0)|0;i=fg(P|0,E|0,i|0,z|0)|0;E=z;P=af(O|0,l|0,-997805,-1)|0;U=z;y=af(O|0,l|0,136657,0)|0;q=z;l=af(O|0,l|0,-683901,-1)|0;H=fg(l|0,z|0,C|0,H|0)|0;_=fg(H|0,z|0,T|0,_|0)|0;s=cg(_|0,z|0,A|0,s|0)|0;A=z;_=af(c|0,n|0,666643,0)|0;w=fg(_|0,z|0,w&2097151|0,0)|0;_=z;T=af(c|0,n|0,470296,0)|0;T=fg(X|0,j|0,T|0,z|0)|0;j=z;X=af(c|0,n|0,654183,0)|0;X=fg(I|0,k|0,X|0,z|0)|0;k=z;I=af(c|0,n|0,-997805,-1)|0;I=fg(i|0,E|0,I|0,z|0)|0;E=z;i=af(c|0,n|0,136657,0)|0;H=z;n=af(c|0,n|0,-683901,-1)|0;c=z;C=af(D|0,g|0,666643,0)|0;V=fg(C|0,z|0,V&2097151|0,0)|0;C=z;l=af(D|0,g|0,470296,0)|0;l=fg(w|0,_|0,l|0,z|0)|0;_=z;w=af(D|0,g|0,654183,0)|0;w=fg(T|0,j|0,w|0,z|0)|0;j=z;T=af(D|0,g|0,-997805,-1)|0;T=fg(X|0,k|0,T|0,z|0)|0;k=z;X=af(D|0,g|0,136657,0)|0;X=fg(I|0,E|0,X|0,z|0)|0;E=z;g=af(D|0,g|0,-683901,-1)|0;D=z;K=fg(Z|0,G|0,F|0,K|0)|0;Q=cg(K|0,z|0,J|0,Q|0)|0;U=fg(Q|0,z|0,P|0,U|0)|0;H=fg(U|0,z|0,i|0,H|0)|0;D=fg(H|0,z|0,g|0,D|0)|0;g=z;H=af(Y|0,e|0,666643,0)|0;S=fg(H|0,z|0,S&2097151|0,0)|0;H=z;i=af(Y|0,e|0,470296,0)|0;i=fg(V|0,C|0,i|0,z|0)|0;C=z;V=af(Y|0,e|0,654183,0)|0;V=fg(l|0,_|0,V|0,z|0)|0;_=z;l=af(Y|0,e|0,-997805,-1)|0;l=fg(w|0,j|0,l|0,z|0)|0;j=z;w=af(Y|0,e|0,136657,0)|0;w=fg(T|0,k|0,w|0,z|0)|0;k=z;e=af(Y|0,e|0,-683901,-1)|0;e=fg(X|0,E|0,e|0,z|0)|0;E=z;X=af(W|0,B|0,666643,0)|0;Y=z;T=af(W|0,B|0,470296,0)|0;U=z;P=af(W|0,B|0,654183,0)|0;Q=z;J=af(W|0,B|0,-997805,-1)|0;K=z;F=af(W|0,B|0,136657,0)|0;G=z;B=af(W|0,B|0,-683901,-1)|0;B=fg(w|0,k|0,B|0,z|0)|0;k=z;w=af(f|0,h|0,666643,0)|0;R=fg(w|0,z|0,R&2097151|0,0)|0;w=z;W=af(f|0,h|0,470296,0)|0;Z=z;I=af(f|0,h|0,654183,0)|0;I=fg(S|0,H|0,I|0,z|0)|0;U=fg(I|0,z|0,T|0,U|0)|0;T=z;I=af(f|0,h|0,-997805,-1)|0;H=z;S=af(f|0,h|0,136657,0)|0;S=fg(V|0,_|0,S|0,z|0)|0;K=fg(S|0,z|0,J|0,K|0)|0;J=z;h=af(f|0,h|0,-683901,-1)|0;f=z;S=fg(R|0,w|0,1048576,0)|0;S=Xe(S|0,z|0,21)|0;_=z;d=fg(W|0,Z|0,d&2097151|0,0)|0;Y=fg(d|0,z|0,X|0,Y|0)|0;Y=fg(Y|0,z|0,S|0,_|0)|0;X=z;_=vf(S|0,_|0,21)|0;_=cg(R|0,w|0,_|0,z|0)|0;w=z;R=fg(U|0,T|0,1048576,0)|0;R=Xe(R|0,z|0,21)|0;S=z;H=fg(i|0,C|0,I|0,H|0)|0;Q=fg(H|0,z|0,P|0,Q|0)|0;Q=fg(Q|0,z|0,R|0,S|0)|0;P=z;S=vf(R|0,S|0,21)|0;R=z;H=fg(K|0,J|0,1048576,0)|0;H=Xe(H|0,z|0,21)|0;I=z;f=fg(l|0,j|0,h|0,f|0)|0;G=fg(f|0,z|0,F|0,G|0)|0;G=fg(G|0,z|0,H|0,I|0)|0;F=z;I=vf(H|0,I|0,21)|0;H=z;f=fg(B|0,k|0,1048576,0)|0;f=Xe(f|0,z|0,21)|0;h=z;E=fg(e|0,E|0,f|0,h|0)|0;e=z;h=vf(f|0,h|0,21)|0;h=cg(B|0,k|0,h|0,z|0)|0;k=z;B=fg(D|0,g|0,1048576,0)|0;B=Xe(B|0,z|0,21)|0;f=z;o=fg(y|0,q|0,m|0,o|0)|0;u=cg(o|0,z|0,p|0,u|0)|0;c=fg(u|0,z|0,n|0,c|0)|0;c=fg(c|0,z|0,B|0,f|0)|0;n=z;f=vf(B|0,f|0,21)|0;f=cg(D|0,g|0,f|0,z|0)|0;g=z;D=fg(s|0,A|0,1048576,0)|0;D=Xe(D|0,z|0,21)|0;B=z;r=fg(D|0,B|0,v|0,r|0)|0;v=z;B=vf(D|0,B|0,21)|0;B=cg(s|0,A|0,B|0,z|0)|0;A=z;s=fg(Y|0,X|0,1048576,0)|0;s=Xe(s|0,z|0,21)|0;D=z;u=vf(s|0,D|0,21)|0;p=z;o=fg(Q|0,P|0,1048576,0)|0;o=Xe(o|0,z|0,21)|0;m=z;q=vf(o|0,m|0,21)|0;y=z;j=fg(G|0,F|0,1048576,0)|0;j=Xe(j|0,z|0,21)|0;l=z;k=fg(h|0,k|0,j|0,l|0)|0;h=z;l=vf(j|0,l|0,21)|0;j=z;C=fg(E|0,e|0,1048576,0)|0;C=Xe(C|0,z|0,21)|0;i=z;g=fg(f|0,g|0,C|0,i|0)|0;f=z;i=vf(C|0,i|0,21)|0;i=cg(E|0,e|0,i|0,z|0)|0;e=z;E=fg(c|0,n|0,1048576,0)|0;E=Xe(E|0,z|0,21)|0;C=z;A=fg(B|0,A|0,E|0,C|0)|0;B=z;C=vf(E|0,C|0,21)|0;C=cg(c|0,n|0,C|0,z|0)|0;n=z;c=fg(r|0,v|0,1048576,0)|0;c=Xe(c|0,z|0,21)|0;E=z;d=vf(c|0,E|0,21)|0;d=cg(r|0,v|0,d|0,z|0)|0;v=z;r=af(c|0,E|0,666643,0)|0;r=fg(_|0,w|0,r|0,z|0)|0;w=z;_=af(c|0,E|0,470296,0)|0;Z=z;W=af(c|0,E|0,654183,0)|0;V=z;O=af(c|0,E|0,-997805,-1)|0;N=z;M=af(c|0,E|0,136657,0)|0;L=z;E=af(c|0,E|0,-683901,-1)|0;c=z;t=Xe(r|0,w|0,21)|0;x=z;X=fg(_|0,Z|0,Y|0,X|0)|0;p=cg(X|0,z|0,u|0,p|0)|0;p=fg(p|0,z|0,t|0,x|0)|0;u=z;x=vf(t|0,x|0,21)|0;x=cg(r|0,w|0,x|0,z|0)|0;w=z;r=Xe(p|0,u|0,21)|0;t=z;T=fg(W|0,V|0,U|0,T|0)|0;R=cg(T|0,z|0,S|0,R|0)|0;D=fg(R|0,z|0,s|0,D|0)|0;D=fg(D|0,z|0,r|0,t|0)|0;s=z;t=vf(r|0,t|0,21)|0;t=cg(p|0,u|0,t|0,z|0)|0;u=z;p=Xe(D|0,s|0,21)|0;r=z;N=fg(Q|0,P|0,O|0,N|0)|0;y=cg(N|0,z|0,q|0,y|0)|0;y=fg(y|0,z|0,p|0,r|0)|0;q=z;r=vf(p|0,r|0,21)|0;r=cg(D|0,s|0,r|0,z|0)|0;s=z;D=Xe(y|0,q|0,21)|0;p=z;J=fg(M|0,L|0,K|0,J|0)|0;H=cg(J|0,z|0,I|0,H|0)|0;m=fg(H|0,z|0,o|0,m|0)|0;m=fg(m|0,z|0,D|0,p|0)|0;o=z;p=vf(D|0,p|0,21)|0;p=cg(y|0,q|0,p|0,z|0)|0;q=z;y=Xe(m|0,o|0,21)|0;D=z;c=fg(G|0,F|0,E|0,c|0)|0;j=cg(c|0,z|0,l|0,j|0)|0;j=fg(j|0,z|0,y|0,D|0)|0;l=z;D=vf(y|0,D|0,21)|0;D=cg(m|0,o|0,D|0,z|0)|0;o=z;m=Xe(j|0,l|0,21)|0;y=z;h=fg(k|0,h|0,m|0,y|0)|0;k=z;y=vf(m|0,y|0,21)|0;y=cg(j|0,l|0,y|0,z|0)|0;l=z;j=Xe(h|0,k|0,21)|0;m=z;e=fg(j|0,m|0,i|0,e|0)|0;i=z;m=vf(j|0,m|0,21)|0;m=cg(h|0,k|0,m|0,z|0)|0;k=z;h=Xe(e|0,i|0,21)|0;j=z;f=fg(g|0,f|0,h|0,j|0)|0;g=z;j=vf(h|0,j|0,21)|0;j=cg(e|0,i|0,j|0,z|0)|0;i=z;e=Xe(f|0,g|0,21)|0;h=z;n=fg(e|0,h|0,C|0,n|0)|0;C=z;h=vf(e|0,h|0,21)|0;h=cg(f|0,g|0,h|0,z|0)|0;g=z;f=Xe(n|0,C|0,21)|0;e=z;B=fg(A|0,B|0,f|0,e|0)|0;A=z;e=vf(f|0,e|0,21)|0;e=cg(n|0,C|0,e|0,z|0)|0;C=z;n=Xe(B|0,A|0,21)|0;f=z;v=fg(n|0,f|0,d|0,v|0)|0;d=z;f=vf(n|0,f|0,21)|0;f=cg(B|0,A|0,f|0,z|0)|0;A=z;B=Xe(v|0,d|0,21)|0;n=z;c=vf(B|0,n|0,21)|0;c=cg(v|0,d|0,c|0,z|0)|0;d=z;v=af(B|0,n|0,666643,0)|0;w=fg(v|0,z|0,x|0,w|0)|0;x=z;v=af(B|0,n|0,470296,0)|0;v=fg(t|0,u|0,v|0,z|0)|0;u=z;t=af(B|0,n|0,654183,0)|0;t=fg(r|0,s|0,t|0,z|0)|0;s=z;r=af(B|0,n|0,-997805,-1)|0;r=fg(p|0,q|0,r|0,z|0)|0;q=z;p=af(B|0,n|0,136657,0)|0;p=fg(D|0,o|0,p|0,z|0)|0;o=z;n=af(B|0,n|0,-683901,-1)|0;n=fg(y|0,l|0,n|0,z|0)|0;l=z;y=Xe(w|0,x|0,21)|0;B=z;u=fg(v|0,u|0,y|0,B|0)|0;v=z;B=vf(y|0,B|0,21)|0;B=cg(w|0,x|0,B|0,z|0)|0;x=z;w=Xe(u|0,v|0,21)|0;y=z;s=fg(t|0,s|0,w|0,y|0)|0;t=z;y=vf(w|0,y|0,21)|0;y=cg(u|0,v|0,y|0,z|0)|0;v=z;u=Xe(s|0,t|0,21)|0;w=z;q=fg(r|0,q|0,u|0,w|0)|0;r=z;w=vf(u|0,w|0,21)|0;w=cg(s|0,t|0,w|0,z|0)|0;t=z;s=Xe(q|0,r|0,21)|0;u=z;o=fg(p|0,o|0,s|0,u|0)|0;p=z;u=vf(s|0,u|0,21)|0;u=cg(q|0,r|0,u|0,z|0)|0;r=z;q=Xe(o|0,p|0,21)|0;s=z;l=fg(n|0,l|0,q|0,s|0)|0;n=z;s=vf(q|0,s|0,21)|0;s=cg(o|0,p|0,s|0,z|0)|0;p=z;o=Xe(l|0,n|0,21)|0;q=z;k=fg(o|0,q|0,m|0,k|0)|0;m=z;q=vf(o|0,q|0,21)|0;q=cg(l|0,n|0,q|0,z|0)|0;n=z;l=Xe(k|0,m|0,21)|0;o=z;i=fg(l|0,o|0,j|0,i|0)|0;j=z;o=vf(l|0,o|0,21)|0;o=cg(k|0,m|0,o|0,z|0)|0;m=z;k=Xe(i|0,j|0,21)|0;l=z;g=fg(k|0,l|0,h|0,g|0)|0;h=z;l=vf(k|0,l|0,21)|0;l=cg(i|0,j|0,l|0,z|0)|0;j=z;i=Xe(g|0,h|0,21)|0;k=z;C=fg(i|0,k|0,e|0,C|0)|0;e=z;k=vf(i|0,k|0,21)|0;k=cg(g|0,h|0,k|0,z|0)|0;h=z;g=Xe(C|0,e|0,21)|0;i=z;A=fg(g|0,i|0,f|0,A|0)|0;f=z;i=vf(g|0,i|0,21)|0;i=cg(C|0,e|0,i|0,z|0)|0;e=z;C=Xe(A|0,f|0,21)|0;g=z;d=fg(C|0,g|0,c|0,d|0)|0;c=z;g=vf(C|0,g|0,21)|0;g=cg(A|0,f|0,g|0,z|0)|0;f=z;a[b>>0]=B;A=yf(B|0,x|0,8)|0;a[b+1>>0]=A;x=yf(B|0,x|0,16)|0;B=z;A=vf(y|0,v|0,5)|0;a[b+2>>0]=A|x;x=yf(y|0,v|0,3)|0;a[b+3>>0]=x;x=yf(y|0,v|0,11)|0;a[b+4>>0]=x;v=yf(y|0,v|0,19)|0;y=z;x=vf(w|0,t|0,2)|0;a[b+5>>0]=x|v;v=yf(w|0,t|0,6)|0;a[b+6>>0]=v;t=yf(w|0,t|0,14)|0;w=z;v=vf(u|0,r|0,7)|0;a[b+7>>0]=v|t;t=yf(u|0,r|0,1)|0;a[b+8>>0]=t;t=yf(u|0,r|0,9)|0;a[b+9>>0]=t;r=yf(u|0,r|0,17)|0;u=z;t=vf(s|0,p|0,4)|0;a[b+10>>0]=t|r;r=yf(s|0,p|0,4)|0;a[b+11>>0]=r;r=yf(s|0,p|0,12)|0;a[b+12>>0]=r;p=yf(s|0,p|0,20)|0;s=z;r=vf(q|0,n|0,1)|0;a[b+13>>0]=r|p;p=yf(q|0,n|0,7)|0;a[b+14>>0]=p;n=yf(q|0,n|0,15)|0;q=z;p=vf(o|0,m|0,6)|0;a[b+15>>0]=p|n;n=yf(o|0,m|0,2)|0;a[b+16>>0]=n;n=yf(o|0,m|0,10)|0;a[b+17>>0]=n;m=yf(o|0,m|0,18)|0;o=z;n=vf(l|0,j|0,3)|0;a[b+18>>0]=n|m;m=yf(l|0,j|0,5)|0;a[b+19>>0]=m;j=yf(l|0,j|0,13)|0;a[b+20>>0]=j;a[b+21>>0]=k;j=yf(k|0,h|0,8)|0;a[b+22>>0]=j;h=yf(k|0,h|0,16)|0;k=z;j=vf(i|0,e|0,5)|0;a[b+23>>0]=j|h;h=yf(i|0,e|0,3)|0;a[b+24>>0]=h;h=yf(i|0,e|0,11)|0;a[b+25>>0]=h;e=yf(i|0,e|0,19)|0;i=z;h=vf(g|0,f|0,2)|0;a[b+26>>0]=h|e;e=yf(g|0,f|0,6)|0;a[b+27>>0]=e;f=yf(g|0,f|0,14)|0;g=z;e=vf(d|0,c|0,7)|0;a[b+28>>0]=f|e;e=yf(d|0,c|0,1)|0;a[b+29>>0]=e;e=yf(d|0,c|0,9)|0;a[b+30>>0]=e;c=yf(d|0,c|0,17)|0;a[b+31>>0]=c;return}function la(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0;o=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;fa=c[b+12>>2]|0;N=c[b+16>>2]|0;M=c[b+20>>2]|0;g=c[b+24>>2]|0;ea=c[b+28>>2]|0;L=c[b+32>>2]|0;q=c[b+36>>2]|0;I=c[d>>2]|0;Oc=c[d+4>>2]|0;cc=c[d+8>>2]|0;sb=c[d+12>>2]|0;Ia=c[d+16>>2]|0;jc=c[d+20>>2]|0;Db=c[d+24>>2]|0;Ta=c[d+28>>2]|0;ga=c[d+32>>2]|0;Pc=c[d+36>>2]|0;Mc=af(I|0,((I|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Lc=z;wc=af(Oc|0,((Oc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;vc=z;ub=af(cc|0,((cc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;tb=z;Ka=af(sb|0,((sb|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Ja=z;mc=af(Ia|0,((Ia|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;lc=z;Gb=af(jc|0,((jc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Fb=z;Wa=af(Db|0,((Db|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Va=z;ja=af(Ta|0,((Ta|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;ia=z;P=af(ga|0,((ga|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;O=z;o=af(Pc|0,((Pc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;l=z;dc=af(I|0,((I|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ec=z;yb=af(Oc|0,((Oc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;xb=z;Ma=af(cc|0,((cc|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;La=z;oc=af(sb|0,((sb|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;nc=z;Ib=af(Ia|0,((Ia|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;Hb=z;Ya=af(jc|0,((jc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Xa=z;la=af(Db|0,((Db|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ka=z;R=af(Ta|0,((Ta|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Q=z;t=af(ga|0,((ga|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;s=z;d=((Pc*19|0)<0)<<31>>31;n=af(Pc*19|0,d|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;p=z;wb=af(I|0,((I|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;vb=z;Qa=af(Oc|0,((Oc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=z;qc=af(cc|0,((cc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;pc=z;Kb=af(sb|0,((sb|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Jb=z;_a=af(Ia|0,((Ia|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Za=z;na=af(jc|0,((jc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ma=z;T=af(Db|0,((Db|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;S=z;v=af(Ta|0,((Ta|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;u=z;ha=((ga*19|0)<0)<<31>>31;yc=af(ga*19|0,ha|0,k|0,((k|0)<0)<<31>>31|0)|0;xc=z;k=af(Pc*19|0,d|0,k|0,((k|0)<0)<<31>>31|0)|0;j=z;Oa=af(I|0,((I|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Na=z;uc=af(Oc|0,((Oc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;tc=z;Mb=af(cc|0,((cc|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Lb=z;ab=af(sb|0,((sb|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;$a=z;pa=af(Ia|0,((Ia|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;oa=z;V=af(jc|0,((jc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;U=z;x=af(Db|0,((Db|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;w=z;Ua=((Ta*19|0)<0)<<31>>31;Ac=af(Ta*19|0,Ua|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;zc=z;Sb=af(ga*19|0,ha|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Rb=z;fa=af(Pc*19|0,d|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;f=z;sc=af(I|0,((I|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;rc=z;Qb=af(Oc|0,((Oc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;Pb=z;cb=af(cc|0,((cc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;bb=z;ra=af(sb|0,((sb|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;qa=z;X=af(Ia|0,((Ia|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;W=z;A=af(jc|0,((jc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;y=z;Eb=((Db*19|0)<0)<<31>>31;Cc=af(Db*19|0,Eb|0,N|0,((N|0)<0)<<31>>31|0)|0;Bc=z;Ub=af(Ta*19|0,Ua|0,N|0,((N|0)<0)<<31>>31|0)|0;Tb=z;ib=af(ga*19|0,ha|0,N|0,((N|0)<0)<<31>>31|0)|0;hb=z;N=af(Pc*19|0,d|0,N|0,((N|0)<0)<<31>>31|0)|0;e=z;Ob=af(I|0,((I|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;Nb=z;gb=af(Oc|0,((Oc|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;fb=z;ta=af(cc|0,((cc|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;sa=z;Z=af(sb|0,((sb|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Y=z;C=af(Ia|0,((Ia|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;B=z;kc=((jc*19|0)<0)<<31>>31;Ec=af(jc*19|0,kc|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Dc=z;Wb=af(Db*19|0,Eb|0,M|0,((M|0)<0)<<31>>31|0)|0;Vb=z;kb=af(Ta*19|0,Ua|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;jb=z;Aa=af(ga*19|0,ha|0,M|0,((M|0)<0)<<31>>31|0)|0;za=z;b=af(Pc*19|0,d|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;M=z;eb=af(I|0,((I|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;db=z;xa=af(Oc|0,((Oc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;wa=z;$=af(cc|0,((cc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;_=z;E=af(sb|0,((sb|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;D=z;Gc=af(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Fc=z;Yb=af(jc*19|0,kc|0,g|0,((g|0)<0)<<31>>31|0)|0;Xb=z;mb=af(Db*19|0,Eb|0,g|0,((g|0)<0)<<31>>31|0)|0;lb=z;Ca=af(Ta*19|0,Ua|0,g|0,((g|0)<0)<<31>>31|0)|0;Ba=z;m=af(ga*19|0,ha|0,g|0,((g|0)<0)<<31>>31|0)|0;r=z;g=af(Pc*19|0,d|0,g|0,((g|0)<0)<<31>>31|0)|0;ya=z;va=af(I|0,((I|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;ua=z;da=af(Oc|0,((Oc|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;ca=z;G=af(cc|0,((cc|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;F=z;Ic=af(sb*19|0,((sb*19|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;Hc=z;_b=af(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Zb=z;ob=af(jc*19|0,kc|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;nb=z;Ea=af(Db*19|0,Eb|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Da=z;gc=af(Ta*19|0,Ua|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;fc=z;Ab=af(ga*19|0,ha|0,ea|0,((ea|0)<0)<<31>>31|0)|0;zb=z;ea=af(Pc*19|0,d|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;i=z;ba=af(I|0,((I|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;aa=z;K=af(Oc|0,((Oc|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;J=z;Kc=af(cc*19|0,((cc*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;Jc=z;ac=af(sb*19|0,((sb*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;$b=z;qb=af(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;pb=z;Ga=af(jc*19|0,kc|0,L|0,((L|0)<0)<<31>>31|0)|0;Fa=z;ic=af(Db*19|0,Eb|0,L|0,((L|0)<0)<<31>>31|0)|0;hc=z;Cb=af(Ta*19|0,Ua|0,L|0,((L|0)<0)<<31>>31|0)|0;Bb=z;Sa=af(ga*19|0,ha|0,L|0,((L|0)<0)<<31>>31|0)|0;Ra=z;L=af(Pc*19|0,d|0,L|0,((L|0)<0)<<31>>31|0)|0;h=z;I=af(I|0,((I|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;H=z;Oc=af(Oc*19|0,((Oc*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Nc=z;cc=af(cc*19|0,((cc*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;bc=z;sb=af(sb*19|0,((sb*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;rb=z;Ia=af(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;Ha=z;kc=af(jc*19|0,kc|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;jc=z;Eb=af(Db*19|0,Eb|0,q|0,((q|0)<0)<<31>>31|0)|0;Db=z;Ua=af(Ta*19|0,Ua|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Ta=z;ha=af(ga*19|0,ha|0,q|0,((q|0)<0)<<31>>31|0)|0;ga=z;q=af(Pc*19|0,d|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;d=z;Lc=fg(Oc|0,Nc|0,Mc|0,Lc|0)|0;Jc=fg(Lc|0,z|0,Kc|0,Jc|0)|0;Hc=fg(Jc|0,z|0,Ic|0,Hc|0)|0;Fc=fg(Hc|0,z|0,Gc|0,Fc|0)|0;Dc=fg(Fc|0,z|0,Ec|0,Dc|0)|0;Bc=fg(Dc|0,z|0,Cc|0,Bc|0)|0;zc=fg(Bc|0,z|0,Ac|0,zc|0)|0;xc=fg(zc|0,z|0,yc|0,xc|0)|0;p=fg(xc|0,z|0,n|0,p|0)|0;n=z;ec=fg(wc|0,vc|0,dc|0,ec|0)|0;dc=z;rc=fg(uc|0,tc|0,sc|0,rc|0)|0;pc=fg(rc|0,z|0,qc|0,pc|0)|0;nc=fg(pc|0,z|0,oc|0,nc|0)|0;lc=fg(nc|0,z|0,mc|0,lc|0)|0;jc=fg(lc|0,z|0,kc|0,jc|0)|0;hc=fg(jc|0,z|0,ic|0,hc|0)|0;fc=fg(hc|0,z|0,gc|0,fc|0)|0;r=fg(fc|0,z|0,m|0,r|0)|0;M=fg(r|0,z|0,b|0,M|0)|0;b=z;r=fg(p|0,n|0,33554432,0)|0;r=Xe(r|0,z|0,26)|0;m=z;bc=fg(ec|0,dc|0,cc|0,bc|0)|0;$b=fg(bc|0,z|0,ac|0,$b|0)|0;Zb=fg($b|0,z|0,_b|0,Zb|0)|0;Xb=fg(Zb|0,z|0,Yb|0,Xb|0)|0;Vb=fg(Xb|0,z|0,Wb|0,Vb|0)|0;Tb=fg(Vb|0,z|0,Ub|0,Tb|0)|0;Rb=fg(Tb|0,z|0,Sb|0,Rb|0)|0;j=fg(Rb|0,z|0,k|0,j|0)|0;j=fg(j|0,z|0,r|0,m|0)|0;k=z;m=vf(r|0,m|0,26)|0;m=cg(p|0,n|0,m|0,z|0)|0;n=z;p=fg(M|0,b|0,33554432,0)|0;p=Xe(p|0,z|0,26)|0;r=z;Nb=fg(Qb|0,Pb|0,Ob|0,Nb|0)|0;Lb=fg(Nb|0,z|0,Mb|0,Lb|0)|0;Jb=fg(Lb|0,z|0,Kb|0,Jb|0)|0;Hb=fg(Jb|0,z|0,Ib|0,Hb|0)|0;Fb=fg(Hb|0,z|0,Gb|0,Fb|0)|0;Db=fg(Fb|0,z|0,Eb|0,Db|0)|0;Bb=fg(Db|0,z|0,Cb|0,Bb|0)|0;zb=fg(Bb|0,z|0,Ab|0,zb|0)|0;ya=fg(zb|0,z|0,g|0,ya|0)|0;ya=fg(ya|0,z|0,p|0,r|0)|0;g=z;r=vf(p|0,r|0,26)|0;r=cg(M|0,b|0,r|0,z|0)|0;b=z;M=fg(j|0,k|0,16777216,0)|0;M=Xe(M|0,z|0,25)|0;p=z;vb=fg(yb|0,xb|0,wb|0,vb|0)|0;tb=fg(vb|0,z|0,ub|0,tb|0)|0;rb=fg(tb|0,z|0,sb|0,rb|0)|0;pb=fg(rb|0,z|0,qb|0,pb|0)|0;nb=fg(pb|0,z|0,ob|0,nb|0)|0;lb=fg(nb|0,z|0,mb|0,lb|0)|0;jb=fg(lb|0,z|0,kb|0,jb|0)|0;hb=fg(jb|0,z|0,ib|0,hb|0)|0;f=fg(hb|0,z|0,fa|0,f|0)|0;f=fg(f|0,z|0,M|0,p|0)|0;fa=z;p=vf(M|0,p|0,25)|0;p=cg(j|0,k|0,p|0,z|0)|0;k=z;j=fg(ya|0,g|0,16777216,0)|0;j=Xe(j|0,z|0,25)|0;M=z;db=fg(gb|0,fb|0,eb|0,db|0)|0;bb=fg(db|0,z|0,cb|0,bb|0)|0;$a=fg(bb|0,z|0,ab|0,$a|0)|0;Za=fg($a|0,z|0,_a|0,Za|0)|0;Xa=fg(Za|0,z|0,Ya|0,Xa|0)|0;Va=fg(Xa|0,z|0,Wa|0,Va|0)|0;Ta=fg(Va|0,z|0,Ua|0,Ta|0)|0;Ra=fg(Ta|0,z|0,Sa|0,Ra|0)|0;i=fg(Ra|0,z|0,ea|0,i|0)|0;i=fg(i|0,z|0,j|0,M|0)|0;ea=z;M=vf(j|0,M|0,25)|0;M=cg(ya|0,g|0,M|0,z|0)|0;g=z;ya=fg(f|0,fa|0,33554432,0)|0;ya=Xe(ya|0,z|0,26)|0;j=z;Na=fg(Qa|0,Pa|0,Oa|0,Na|0)|0;La=fg(Na|0,z|0,Ma|0,La|0)|0;Ja=fg(La|0,z|0,Ka|0,Ja|0)|0;Ha=fg(Ja|0,z|0,Ia|0,Ha|0)|0;Fa=fg(Ha|0,z|0,Ga|0,Fa|0)|0;Da=fg(Fa|0,z|0,Ea|0,Da|0)|0;Ba=fg(Da|0,z|0,Ca|0,Ba|0)|0;za=fg(Ba|0,z|0,Aa|0,za|0)|0;e=fg(za|0,z|0,N|0,e|0)|0;e=fg(e|0,z|0,ya|0,j|0)|0;N=z;j=vf(ya|0,j|0,26)|0;j=cg(f|0,fa|0,j|0,z|0)|0;fa=fg(i|0,ea|0,33554432,0)|0;fa=Xe(fa|0,z|0,26)|0;f=z;ua=fg(xa|0,wa|0,va|0,ua|0)|0;sa=fg(ua|0,z|0,ta|0,sa|0)|0;qa=fg(sa|0,z|0,ra|0,qa|0)|0;oa=fg(qa|0,z|0,pa|0,oa|0)|0;ma=fg(oa|0,z|0,na|0,ma|0)|0;ka=fg(ma|0,z|0,la|0,ka|0)|0;ia=fg(ka|0,z|0,ja|0,ia|0)|0;ga=fg(ia|0,z|0,ha|0,ga|0)|0;h=fg(ga|0,z|0,L|0,h|0)|0;h=fg(h|0,z|0,fa|0,f|0)|0;L=z;f=vf(fa|0,f|0,26)|0;f=cg(i|0,ea|0,f|0,z|0)|0;ea=fg(e|0,N|0,16777216,0)|0;ea=Xe(ea|0,z|0,25)|0;i=z;b=fg(ea|0,i|0,r|0,b|0)|0;r=z;i=vf(ea|0,i|0,25)|0;i=cg(e|0,N|0,i|0,z|0)|0;N=fg(h|0,L|0,16777216,0)|0;N=Xe(N|0,z|0,25)|0;e=z;aa=fg(da|0,ca|0,ba|0,aa|0)|0;_=fg(aa|0,z|0,$|0,_|0)|0;Y=fg(_|0,z|0,Z|0,Y|0)|0;W=fg(Y|0,z|0,X|0,W|0)|0;U=fg(W|0,z|0,V|0,U|0)|0;S=fg(U|0,z|0,T|0,S|0)|0;Q=fg(S|0,z|0,R|0,Q|0)|0;O=fg(Q|0,z|0,P|0,O|0)|0;d=fg(O|0,z|0,q|0,d|0)|0;d=fg(d|0,z|0,N|0,e|0)|0;q=z;e=vf(N|0,e|0,25)|0;e=cg(h|0,L|0,e|0,z|0)|0;L=fg(b|0,r|0,33554432,0)|0;L=Xe(L|0,z|0,26)|0;h=z;g=fg(M|0,g|0,L|0,h|0)|0;h=vf(L|0,h|0,26)|0;h=cg(b|0,r|0,h|0,z|0)|0;r=fg(d|0,q|0,33554432,0)|0;r=Xe(r|0,z|0,26)|0;b=z;H=fg(K|0,J|0,I|0,H|0)|0;F=fg(H|0,z|0,G|0,F|0)|0;D=fg(F|0,z|0,E|0,D|0)|0;B=fg(D|0,z|0,C|0,B|0)|0;y=fg(B|0,z|0,A|0,y|0)|0;w=fg(y|0,z|0,x|0,w|0)|0;u=fg(w|0,z|0,v|0,u|0)|0;s=fg(u|0,z|0,t|0,s|0)|0;l=fg(s|0,z|0,o|0,l|0)|0;l=fg(l|0,z|0,r|0,b|0)|0;o=z;b=vf(r|0,b|0,26)|0;b=cg(d|0,q|0,b|0,z|0)|0;q=fg(l|0,o|0,16777216,0)|0;q=Xe(q|0,z|0,25)|0;d=z;r=af(q|0,d|0,19,0)|0;n=fg(r|0,z|0,m|0,n|0)|0;m=z;d=vf(q|0,d|0,25)|0;d=cg(l|0,o|0,d|0,z|0)|0;o=fg(n|0,m|0,33554432,0)|0;o=Xe(o|0,z|0,26)|0;l=z;k=fg(p|0,k|0,o|0,l|0)|0;l=vf(o|0,l|0,26)|0;l=cg(n|0,m|0,l|0,z|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=b;c[a+36>>2]=d;return}function ma(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=l;f=l=l+63&-64;l=l+2048|0;uh(f+1024|0,b);Ud(f+1024|0,a);uh(f,f+1024|0);Ud(f,d);a=0;do{b=a<<4;u=c[f+1024+((b|4)<<3)>>2]|0;x=c[f+1024+((b|4)<<3)+4>>2]|0;A=ce(c[f+1024+(b<<3)>>2]|0,c[f+1024+(b<<3)+4>>2]|0,u,x)|0;G=z;y=Ze(c[f+1024+((b|12)<<3)>>2]^A,c[f+1024+((b|12)<<3)+4>>2]^G,32)|0;t=z;D=ce(c[f+1024+((b|8)<<3)>>2]|0,c[f+1024+((b|8)<<3)+4>>2]|0,y,t)|0;q=z;x=Ze(u^D,x^q,24)|0;u=z;G=ce(A,G,x,u)|0;A=z;t=Ze(y^G,t^A,16)|0;y=z;c[f+1024+((b|12)<<3)>>2]=t;c[f+1024+((b|12)<<3)+4>>2]=y;q=ce(D,q,t,y)|0;D=z;c[f+1024+((b|8)<<3)>>2]=q;c[f+1024+((b|8)<<3)+4>>2]=D;D=Ze(x^q,u^D,63)|0;c[f+1024+((b|4)<<3)>>2]=D;c[f+1024+((b|4)<<3)+4>>2]=z;D=c[f+1024+((b|5)<<3)>>2]|0;u=c[f+1024+((b|5)<<3)+4>>2]|0;q=ce(c[f+1024+((b|1)<<3)>>2]|0,c[f+1024+((b|1)<<3)+4>>2]|0,D,u)|0;x=z;s=Ze(c[f+1024+((b|13)<<3)>>2]^q,c[f+1024+((b|13)<<3)+4>>2]^x,32)|0;m=z;B=ce(c[f+1024+((b|9)<<3)>>2]|0,c[f+1024+((b|9)<<3)+4>>2]|0,s,m)|0;p=z;u=Ze(D^B,u^p,24)|0;D=z;x=ce(q,x,u,D)|0;q=z;m=Ze(s^x,m^q,16)|0;s=z;p=ce(B,p,m,s)|0;B=z;c[f+1024+((b|9)<<3)>>2]=p;c[f+1024+((b|9)<<3)+4>>2]=B;B=Ze(u^p,D^B,63)|0;D=z;p=c[f+1024+((b|6)<<3)>>2]|0;u=c[f+1024+((b|6)<<3)+4>>2]|0;h=ce(c[f+1024+((b|2)<<3)>>2]|0,c[f+1024+((b|2)<<3)+4>>2]|0,p,u)|0;r=z;o=Ze(c[f+1024+((b|14)<<3)>>2]^h,c[f+1024+((b|14)<<3)+4>>2]^r,32)|0;i=z;F=ce(c[f+1024+((b|10)<<3)>>2]|0,c[f+1024+((b|10)<<3)+4>>2]|0,o,i)|0;E=z;u=Ze(p^F,u^E,24)|0;p=z;r=ce(h,r,u,p)|0;h=z;i=Ze(o^r,i^h,16)|0;o=z;E=ce(F,E,i,o)|0;F=z;p=Ze(u^E,p^F,63)|0;u=z;j=c[f+1024+((b|7)<<3)>>2]|0;k=c[f+1024+((b|7)<<3)+4>>2]|0;g=ce(c[f+1024+((b|3)<<3)>>2]|0,c[f+1024+((b|3)<<3)+4>>2]|0,j,k)|0;n=z;H=Ze(c[f+1024+((b|15)<<3)>>2]^g,c[f+1024+((b|15)<<3)+4>>2]^n,32)|0;C=z;w=ce(c[f+1024+((b|11)<<3)>>2]|0,c[f+1024+((b|11)<<3)+4>>2]|0,H,C)|0;v=z;k=Ze(j^w,k^v,24)|0;j=z;n=ce(g,n,k,j)|0;g=z;C=Ze(H^n,C^g,16)|0;H=z;v=ce(w,v,C,H)|0;w=z;j=Ze(k^v,j^w,63)|0;k=z;A=ce(G,A,B,D)|0;G=z;H=Ze(C^A,H^G,32)|0;C=z;F=ce(E,F,H,C)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;G=ce(A,G,D,B)|0;A=z;c[f+1024+(b<<3)>>2]=G;c[f+1024+(b<<3)+4>>2]=A;A=Ze(H^G,C^A,16)|0;C=z;c[f+1024+((b|15)<<3)>>2]=A;c[f+1024+((b|15)<<3)+4>>2]=C;C=ce(F,E,A,C)|0;A=z;c[f+1024+((b|10)<<3)>>2]=C;c[f+1024+((b|10)<<3)+4>>2]=A;A=Ze(D^C,B^A,63)|0;c[f+1024+((b|5)<<3)>>2]=A;c[f+1024+((b|5)<<3)+4>>2]=z;q=ce(x,q,p,u)|0;x=z;y=Ze(t^q,y^x,32)|0;t=z;w=ce(v,w,y,t)|0;v=z;u=Ze(p^w,u^v,24)|0;p=z;x=ce(q,x,u,p)|0;q=z;c[f+1024+((b|1)<<3)>>2]=x;c[f+1024+((b|1)<<3)+4>>2]=q;q=Ze(y^x,t^q,16)|0;t=z;c[f+1024+((b|12)<<3)>>2]=q;c[f+1024+((b|12)<<3)+4>>2]=t;t=ce(w,v,q,t)|0;q=z;c[f+1024+((b|11)<<3)>>2]=t;c[f+1024+((b|11)<<3)+4>>2]=q;q=Ze(u^t,p^q,63)|0;c[f+1024+((b|6)<<3)>>2]=q;c[f+1024+((b|6)<<3)+4>>2]=z;h=ce(r,h,j,k)|0;r=z;s=Ze(m^h,s^r,32)|0;m=z;q=ce(c[f+1024+((b|8)<<3)>>2]|0,c[f+1024+((b|8)<<3)+4>>2]|0,s,m)|0;p=z;k=Ze(j^q,k^p,24)|0;j=z;r=ce(h,r,k,j)|0;h=z;c[f+1024+((b|2)<<3)>>2]=r;c[f+1024+((b|2)<<3)+4>>2]=h;h=Ze(s^r,m^h,16)|0;m=z;c[f+1024+((b|13)<<3)>>2]=h;c[f+1024+((b|13)<<3)+4>>2]=m;m=ce(q,p,h,m)|0;h=z;c[f+1024+((b|8)<<3)>>2]=m;c[f+1024+((b|8)<<3)+4>>2]=h;h=Ze(k^m,j^h,63)|0;c[f+1024+((b|7)<<3)>>2]=h;c[f+1024+((b|7)<<3)+4>>2]=z;h=c[f+1024+((b|4)<<3)>>2]|0;j=c[f+1024+((b|4)<<3)+4>>2]|0;g=ce(n,g,h,j)|0;n=z;o=Ze(i^g,o^n,32)|0;i=z;m=ce(c[f+1024+((b|9)<<3)>>2]|0,c[f+1024+((b|9)<<3)+4>>2]|0,o,i)|0;k=z;j=Ze(h^m,j^k,24)|0;h=z;n=ce(g,n,j,h)|0;g=z;c[f+1024+((b|3)<<3)>>2]=n;c[f+1024+((b|3)<<3)+4>>2]=g;g=Ze(o^n,i^g,16)|0;i=z;c[f+1024+((b|14)<<3)>>2]=g;c[f+1024+((b|14)<<3)+4>>2]=i;i=ce(m,k,g,i)|0;g=z;c[f+1024+((b|9)<<3)>>2]=i;c[f+1024+((b|9)<<3)+4>>2]=g;g=Ze(j^i,h^g,63)|0;c[f+1024+((b|4)<<3)>>2]=g;c[f+1024+((b|4)<<3)+4>>2]=z;a=a+1|0}while((a|0)!=8);a=0;do{H=a<<1;p=f+1024+(H+32<<3)|0;s=c[p>>2]|0;p=c[p+4>>2]|0;m=ce(c[f+1024+(H<<3)>>2]|0,c[f+1024+(H<<3)+4>>2]|0,s,p)|0;g=z;o=f+1024+(H+96<<3)|0;o=Ze(c[o>>2]^m,c[o+4>>2]^g,32)|0;t=z;j=f+1024+(H+64<<3)|0;j=ce(c[j>>2]|0,c[j+4>>2]|0,o,t)|0;x=z;p=Ze(s^j,p^x,24)|0;s=z;g=ce(m,g,p,s)|0;m=z;t=Ze(o^g,t^m,16)|0;o=z;u=f+1024+(H+96<<3)|0;c[u>>2]=t;c[u+4>>2]=o;x=ce(j,x,t,o)|0;j=z;u=f+1024+(H+64<<3)|0;c[u>>2]=x;c[u+4>>2]=j;j=Ze(p^x,s^j,63)|0;s=f+1024+(H+32<<3)|0;c[s>>2]=j;c[s+4>>2]=z;s=f+1024+(H+33<<3)|0;j=c[s>>2]|0;s=c[s+4>>2]|0;x=ce(c[f+1024+((H|1)<<3)>>2]|0,c[f+1024+((H|1)<<3)+4>>2]|0,j,s)|0;p=z;u=f+1024+(H+97<<3)|0;u=Ze(c[u>>2]^x,c[u+4>>2]^p,32)|0;B=z;n=f+1024+(H+65<<3)|0;n=ce(c[n>>2]|0,c[n+4>>2]|0,u,B)|0;F=z;s=Ze(j^n,s^F,24)|0;j=z;p=ce(x,p,s,j)|0;x=z;B=Ze(u^p,B^x,16)|0;u=z;F=ce(n,F,B,u)|0;n=z;w=f+1024+(H+65<<3)|0;c[w>>2]=F;c[w+4>>2]=n;n=Ze(s^F,j^n,63)|0;j=z;F=f+1024+(H+16<<3)|0;s=f+1024+(H+48<<3)|0;w=c[s>>2]|0;s=c[s+4>>2]|0;F=ce(c[F>>2]|0,c[F+4>>2]|0,w,s)|0;v=z;y=f+1024+(H+112<<3)|0;y=Ze(c[y>>2]^F,c[y+4>>2]^v,32)|0;E=z;h=f+1024+(H+80<<3)|0;h=ce(c[h>>2]|0,c[h+4>>2]|0,y,E)|0;i=z;s=Ze(w^h,s^i,24)|0;w=z;v=ce(F,v,s,w)|0;F=z;E=Ze(y^v,E^F,16)|0;y=z;i=ce(h,i,E,y)|0;h=z;w=Ze(s^i,w^h,63)|0;s=z;G=f+1024+(H+17<<3)|0;C=f+1024+(H+49<<3)|0;D=c[C>>2]|0;C=c[C+4>>2]|0;G=ce(c[G>>2]|0,c[G+4>>2]|0,D,C)|0;A=z;b=f+1024+(H+113<<3)|0;b=Ze(c[b>>2]^G,c[b+4>>2]^A,32)|0;k=z;q=f+1024+(H+81<<3)|0;q=ce(c[q>>2]|0,c[q+4>>2]|0,b,k)|0;r=z;C=Ze(D^q,C^r,24)|0;D=z;A=ce(G,A,C,D)|0;G=z;k=Ze(b^A,k^G,16)|0;b=z;r=ce(q,r,k,b)|0;q=z;D=Ze(C^r,D^q,63)|0;C=z;m=ce(g,m,n,j)|0;g=z;b=Ze(k^m,b^g,32)|0;k=z;h=ce(i,h,b,k)|0;i=z;j=Ze(n^h,j^i,24)|0;n=z;g=ce(m,g,j,n)|0;m=z;c[f+1024+(H<<3)>>2]=g;c[f+1024+(H<<3)+4>>2]=m;m=Ze(b^g,k^m,16)|0;k=z;g=f+1024+(H+113<<3)|0;c[g>>2]=m;c[g+4>>2]=k;k=ce(h,i,m,k)|0;m=z;i=f+1024+(H+80<<3)|0;c[i>>2]=k;c[i+4>>2]=m;m=Ze(j^k,n^m,63)|0;n=f+1024+(H+33<<3)|0;c[n>>2]=m;c[n+4>>2]=z;x=ce(p,x,w,s)|0;p=z;o=Ze(t^x,o^p,32)|0;t=z;q=ce(r,q,o,t)|0;r=z;s=Ze(w^q,s^r,24)|0;w=z;p=ce(x,p,s,w)|0;x=z;c[f+1024+((H|1)<<3)>>2]=p;c[f+1024+((H|1)<<3)+4>>2]=x;x=Ze(o^p,t^x,16)|0;t=z;p=f+1024+(H+96<<3)|0;c[p>>2]=x;c[p+4>>2]=t;t=ce(q,r,x,t)|0;x=z;r=f+1024+(H+81<<3)|0;c[r>>2]=t;c[r+4>>2]=x;x=Ze(s^t,w^x,63)|0;w=f+1024+(H+48<<3)|0;c[w>>2]=x;c[w+4>>2]=z;F=ce(v,F,D,C)|0;v=z;u=Ze(B^F,u^v,32)|0;B=z;w=f+1024+(H+64<<3)|0;w=ce(c[w>>2]|0,c[w+4>>2]|0,u,B)|0;x=z;C=Ze(D^w,C^x,24)|0;D=z;v=ce(F,v,C,D)|0;F=z;t=f+1024+(H+16<<3)|0;c[t>>2]=v;c[t+4>>2]=F;F=Ze(u^v,B^F,16)|0;B=z;v=f+1024+(H+97<<3)|0;c[v>>2]=F;c[v+4>>2]=B;B=ce(w,x,F,B)|0;F=z;x=f+1024+(H+64<<3)|0;c[x>>2]=B;c[x+4>>2]=F;F=Ze(C^B,D^F,63)|0;D=f+1024+(H+49<<3)|0;c[D>>2]=F;c[D+4>>2]=z;D=f+1024+(H+32<<3)|0;F=c[D>>2]|0;D=c[D+4>>2]|0;G=ce(A,G,F,D)|0;A=z;y=Ze(E^G,y^A,32)|0;E=z;B=f+1024+(H+65<<3)|0;B=ce(c[B>>2]|0,c[B+4>>2]|0,y,E)|0;C=z;D=Ze(F^B,D^C,24)|0;F=z;A=ce(G,A,D,F)|0;G=z;x=f+1024+(H+17<<3)|0;c[x>>2]=A;c[x+4>>2]=G;G=Ze(y^A,E^G,16)|0;E=z;A=f+1024+(H+112<<3)|0;c[A>>2]=G;c[A+4>>2]=E;E=ce(B,C,G,E)|0;G=z;C=f+1024+(H+65<<3)|0;c[C>>2]=E;c[C+4>>2]=G;G=Ze(D^E,F^G,63)|0;H=f+1024+(H+32<<3)|0;c[H>>2]=G;c[H+4>>2]=z;a=a+1|0}while((a|0)!=8);uh(d,f);Ud(d,f+1024|0);l=e;return}function na(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=l;f=l=l+63&-64;l=l+2048|0;uh(f+1024|0,b);Ud(f+1024|0,a);uh(f,f+1024|0);a=0;do{b=a<<4;u=c[f+1024+((b|4)<<3)>>2]|0;x=c[f+1024+((b|4)<<3)+4>>2]|0;A=ce(c[f+1024+(b<<3)>>2]|0,c[f+1024+(b<<3)+4>>2]|0,u,x)|0;G=z;y=Ze(c[f+1024+((b|12)<<3)>>2]^A,c[f+1024+((b|12)<<3)+4>>2]^G,32)|0;t=z;D=ce(c[f+1024+((b|8)<<3)>>2]|0,c[f+1024+((b|8)<<3)+4>>2]|0,y,t)|0;q=z;x=Ze(u^D,x^q,24)|0;u=z;G=ce(A,G,x,u)|0;A=z;t=Ze(y^G,t^A,16)|0;y=z;c[f+1024+((b|12)<<3)>>2]=t;c[f+1024+((b|12)<<3)+4>>2]=y;q=ce(D,q,t,y)|0;D=z;c[f+1024+((b|8)<<3)>>2]=q;c[f+1024+((b|8)<<3)+4>>2]=D;D=Ze(x^q,u^D,63)|0;c[f+1024+((b|4)<<3)>>2]=D;c[f+1024+((b|4)<<3)+4>>2]=z;D=c[f+1024+((b|5)<<3)>>2]|0;u=c[f+1024+((b|5)<<3)+4>>2]|0;q=ce(c[f+1024+((b|1)<<3)>>2]|0,c[f+1024+((b|1)<<3)+4>>2]|0,D,u)|0;x=z;s=Ze(c[f+1024+((b|13)<<3)>>2]^q,c[f+1024+((b|13)<<3)+4>>2]^x,32)|0;m=z;B=ce(c[f+1024+((b|9)<<3)>>2]|0,c[f+1024+((b|9)<<3)+4>>2]|0,s,m)|0;p=z;u=Ze(D^B,u^p,24)|0;D=z;x=ce(q,x,u,D)|0;q=z;m=Ze(s^x,m^q,16)|0;s=z;p=ce(B,p,m,s)|0;B=z;c[f+1024+((b|9)<<3)>>2]=p;c[f+1024+((b|9)<<3)+4>>2]=B;B=Ze(u^p,D^B,63)|0;D=z;p=c[f+1024+((b|6)<<3)>>2]|0;u=c[f+1024+((b|6)<<3)+4>>2]|0;h=ce(c[f+1024+((b|2)<<3)>>2]|0,c[f+1024+((b|2)<<3)+4>>2]|0,p,u)|0;r=z;o=Ze(c[f+1024+((b|14)<<3)>>2]^h,c[f+1024+((b|14)<<3)+4>>2]^r,32)|0;i=z;F=ce(c[f+1024+((b|10)<<3)>>2]|0,c[f+1024+((b|10)<<3)+4>>2]|0,o,i)|0;E=z;u=Ze(p^F,u^E,24)|0;p=z;r=ce(h,r,u,p)|0;h=z;i=Ze(o^r,i^h,16)|0;o=z;E=ce(F,E,i,o)|0;F=z;p=Ze(u^E,p^F,63)|0;u=z;j=c[f+1024+((b|7)<<3)>>2]|0;k=c[f+1024+((b|7)<<3)+4>>2]|0;g=ce(c[f+1024+((b|3)<<3)>>2]|0,c[f+1024+((b|3)<<3)+4>>2]|0,j,k)|0;n=z;H=Ze(c[f+1024+((b|15)<<3)>>2]^g,c[f+1024+((b|15)<<3)+4>>2]^n,32)|0;C=z;w=ce(c[f+1024+((b|11)<<3)>>2]|0,c[f+1024+((b|11)<<3)+4>>2]|0,H,C)|0;v=z;k=Ze(j^w,k^v,24)|0;j=z;n=ce(g,n,k,j)|0;g=z;C=Ze(H^n,C^g,16)|0;H=z;v=ce(w,v,C,H)|0;w=z;j=Ze(k^v,j^w,63)|0;k=z;A=ce(G,A,B,D)|0;G=z;H=Ze(C^A,H^G,32)|0;C=z;F=ce(E,F,H,C)|0;E=z;D=Ze(B^F,D^E,24)|0;B=z;G=ce(A,G,D,B)|0;A=z;c[f+1024+(b<<3)>>2]=G;c[f+1024+(b<<3)+4>>2]=A;A=Ze(H^G,C^A,16)|0;C=z;c[f+1024+((b|15)<<3)>>2]=A;c[f+1024+((b|15)<<3)+4>>2]=C;C=ce(F,E,A,C)|0;A=z;c[f+1024+((b|10)<<3)>>2]=C;c[f+1024+((b|10)<<3)+4>>2]=A;A=Ze(D^C,B^A,63)|0;c[f+1024+((b|5)<<3)>>2]=A;c[f+1024+((b|5)<<3)+4>>2]=z;q=ce(x,q,p,u)|0;x=z;y=Ze(t^q,y^x,32)|0;t=z;w=ce(v,w,y,t)|0;v=z;u=Ze(p^w,u^v,24)|0;p=z;x=ce(q,x,u,p)|0;q=z;c[f+1024+((b|1)<<3)>>2]=x;c[f+1024+((b|1)<<3)+4>>2]=q;q=Ze(y^x,t^q,16)|0;t=z;c[f+1024+((b|12)<<3)>>2]=q;c[f+1024+((b|12)<<3)+4>>2]=t;t=ce(w,v,q,t)|0;q=z;c[f+1024+((b|11)<<3)>>2]=t;c[f+1024+((b|11)<<3)+4>>2]=q;q=Ze(u^t,p^q,63)|0;c[f+1024+((b|6)<<3)>>2]=q;c[f+1024+((b|6)<<3)+4>>2]=z;h=ce(r,h,j,k)|0;r=z;s=Ze(m^h,s^r,32)|0;m=z;q=ce(c[f+1024+((b|8)<<3)>>2]|0,c[f+1024+((b|8)<<3)+4>>2]|0,s,m)|0;p=z;k=Ze(j^q,k^p,24)|0;j=z;r=ce(h,r,k,j)|0;h=z;c[f+1024+((b|2)<<3)>>2]=r;c[f+1024+((b|2)<<3)+4>>2]=h;h=Ze(s^r,m^h,16)|0;m=z;c[f+1024+((b|13)<<3)>>2]=h;c[f+1024+((b|13)<<3)+4>>2]=m;m=ce(q,p,h,m)|0;h=z;c[f+1024+((b|8)<<3)>>2]=m;c[f+1024+((b|8)<<3)+4>>2]=h;h=Ze(k^m,j^h,63)|0;c[f+1024+((b|7)<<3)>>2]=h;c[f+1024+((b|7)<<3)+4>>2]=z;h=c[f+1024+((b|4)<<3)>>2]|0;j=c[f+1024+((b|4)<<3)+4>>2]|0;g=ce(n,g,h,j)|0;n=z;o=Ze(i^g,o^n,32)|0;i=z;m=ce(c[f+1024+((b|9)<<3)>>2]|0,c[f+1024+((b|9)<<3)+4>>2]|0,o,i)|0;k=z;j=Ze(h^m,j^k,24)|0;h=z;n=ce(g,n,j,h)|0;g=z;c[f+1024+((b|3)<<3)>>2]=n;c[f+1024+((b|3)<<3)+4>>2]=g;g=Ze(o^n,i^g,16)|0;i=z;c[f+1024+((b|14)<<3)>>2]=g;c[f+1024+((b|14)<<3)+4>>2]=i;i=ce(m,k,g,i)|0;g=z;c[f+1024+((b|9)<<3)>>2]=i;c[f+1024+((b|9)<<3)+4>>2]=g;g=Ze(j^i,h^g,63)|0;c[f+1024+((b|4)<<3)>>2]=g;c[f+1024+((b|4)<<3)+4>>2]=z;a=a+1|0}while((a|0)!=8);a=0;do{H=a<<1;p=f+1024+(H+32<<3)|0;s=c[p>>2]|0;p=c[p+4>>2]|0;m=ce(c[f+1024+(H<<3)>>2]|0,c[f+1024+(H<<3)+4>>2]|0,s,p)|0;g=z;o=f+1024+(H+96<<3)|0;o=Ze(c[o>>2]^m,c[o+4>>2]^g,32)|0;t=z;j=f+1024+(H+64<<3)|0;j=ce(c[j>>2]|0,c[j+4>>2]|0,o,t)|0;x=z;p=Ze(s^j,p^x,24)|0;s=z;g=ce(m,g,p,s)|0;m=z;t=Ze(o^g,t^m,16)|0;o=z;u=f+1024+(H+96<<3)|0;c[u>>2]=t;c[u+4>>2]=o;x=ce(j,x,t,o)|0;j=z;u=f+1024+(H+64<<3)|0;c[u>>2]=x;c[u+4>>2]=j;j=Ze(p^x,s^j,63)|0;s=f+1024+(H+32<<3)|0;c[s>>2]=j;c[s+4>>2]=z;s=f+1024+(H+33<<3)|0;j=c[s>>2]|0;s=c[s+4>>2]|0;x=ce(c[f+1024+((H|1)<<3)>>2]|0,c[f+1024+((H|1)<<3)+4>>2]|0,j,s)|0;p=z;u=f+1024+(H+97<<3)|0;u=Ze(c[u>>2]^x,c[u+4>>2]^p,32)|0;B=z;n=f+1024+(H+65<<3)|0;n=ce(c[n>>2]|0,c[n+4>>2]|0,u,B)|0;F=z;s=Ze(j^n,s^F,24)|0;j=z;p=ce(x,p,s,j)|0;x=z;B=Ze(u^p,B^x,16)|0;u=z;F=ce(n,F,B,u)|0;n=z;w=f+1024+(H+65<<3)|0;c[w>>2]=F;c[w+4>>2]=n;n=Ze(s^F,j^n,63)|0;j=z;F=f+1024+(H+16<<3)|0;s=f+1024+(H+48<<3)|0;w=c[s>>2]|0;s=c[s+4>>2]|0;F=ce(c[F>>2]|0,c[F+4>>2]|0,w,s)|0;v=z;y=f+1024+(H+112<<3)|0;y=Ze(c[y>>2]^F,c[y+4>>2]^v,32)|0;E=z;h=f+1024+(H+80<<3)|0;h=ce(c[h>>2]|0,c[h+4>>2]|0,y,E)|0;i=z;s=Ze(w^h,s^i,24)|0;w=z;v=ce(F,v,s,w)|0;F=z;E=Ze(y^v,E^F,16)|0;y=z;i=ce(h,i,E,y)|0;h=z;w=Ze(s^i,w^h,63)|0;s=z;G=f+1024+(H+17<<3)|0;C=f+1024+(H+49<<3)|0;D=c[C>>2]|0;C=c[C+4>>2]|0;G=ce(c[G>>2]|0,c[G+4>>2]|0,D,C)|0;A=z;b=f+1024+(H+113<<3)|0;b=Ze(c[b>>2]^G,c[b+4>>2]^A,32)|0;k=z;q=f+1024+(H+81<<3)|0;q=ce(c[q>>2]|0,c[q+4>>2]|0,b,k)|0;r=z;C=Ze(D^q,C^r,24)|0;D=z;A=ce(G,A,C,D)|0;G=z;k=Ze(b^A,k^G,16)|0;b=z;r=ce(q,r,k,b)|0;q=z;D=Ze(C^r,D^q,63)|0;C=z;m=ce(g,m,n,j)|0;g=z;b=Ze(k^m,b^g,32)|0;k=z;h=ce(i,h,b,k)|0;i=z;j=Ze(n^h,j^i,24)|0;n=z;g=ce(m,g,j,n)|0;m=z;c[f+1024+(H<<3)>>2]=g;c[f+1024+(H<<3)+4>>2]=m;m=Ze(b^g,k^m,16)|0;k=z;g=f+1024+(H+113<<3)|0;c[g>>2]=m;c[g+4>>2]=k;k=ce(h,i,m,k)|0;m=z;i=f+1024+(H+80<<3)|0;c[i>>2]=k;c[i+4>>2]=m;m=Ze(j^k,n^m,63)|0;n=f+1024+(H+33<<3)|0;c[n>>2]=m;c[n+4>>2]=z;x=ce(p,x,w,s)|0;p=z;o=Ze(t^x,o^p,32)|0;t=z;q=ce(r,q,o,t)|0;r=z;s=Ze(w^q,s^r,24)|0;w=z;p=ce(x,p,s,w)|0;x=z;c[f+1024+((H|1)<<3)>>2]=p;c[f+1024+((H|1)<<3)+4>>2]=x;x=Ze(o^p,t^x,16)|0;t=z;p=f+1024+(H+96<<3)|0;c[p>>2]=x;c[p+4>>2]=t;t=ce(q,r,x,t)|0;x=z;r=f+1024+(H+81<<3)|0;c[r>>2]=t;c[r+4>>2]=x;x=Ze(s^t,w^x,63)|0;w=f+1024+(H+48<<3)|0;c[w>>2]=x;c[w+4>>2]=z;F=ce(v,F,D,C)|0;v=z;u=Ze(B^F,u^v,32)|0;B=z;w=f+1024+(H+64<<3)|0;w=ce(c[w>>2]|0,c[w+4>>2]|0,u,B)|0;x=z;C=Ze(D^w,C^x,24)|0;D=z;v=ce(F,v,C,D)|0;F=z;t=f+1024+(H+16<<3)|0;c[t>>2]=v;c[t+4>>2]=F;F=Ze(u^v,B^F,16)|0;B=z;v=f+1024+(H+97<<3)|0;c[v>>2]=F;c[v+4>>2]=B;B=ce(w,x,F,B)|0;F=z;x=f+1024+(H+64<<3)|0;c[x>>2]=B;c[x+4>>2]=F;F=Ze(C^B,D^F,63)|0;D=f+1024+(H+49<<3)|0;c[D>>2]=F;c[D+4>>2]=z;D=f+1024+(H+32<<3)|0;F=c[D>>2]|0;D=c[D+4>>2]|0;G=ce(A,G,F,D)|0;A=z;y=Ze(E^G,y^A,32)|0;E=z;B=f+1024+(H+65<<3)|0;B=ce(c[B>>2]|0,c[B+4>>2]|0,y,E)|0;C=z;D=Ze(F^B,D^C,24)|0;F=z;A=ce(G,A,D,F)|0;G=z;x=f+1024+(H+17<<3)|0;c[x>>2]=A;c[x+4>>2]=G;G=Ze(y^A,E^G,16)|0;E=z;A=f+1024+(H+112<<3)|0;c[A>>2]=G;c[A+4>>2]=E;E=ce(B,C,G,E)|0;G=z;C=f+1024+(H+65<<3)|0;c[C>>2]=E;c[C+4>>2]=G;G=Ze(D^E,F^G,63)|0;H=f+1024+(H+32<<3)|0;c[H>>2]=G;c[H+4>>2]=z;a=a+1|0}while((a|0)!=8);uh(d,f);Ud(d,f+1024|0);l=e;return}function oa(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;u=c[b+16>>2]|0;t=c[b+20>>2]|0;g=c[b+24>>2]|0;v=c[b+28>>2]|0;s=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=af(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=z;o=((l<<1|0)<0)<<31>>31;Ua=af(l<<1|0,o|0,n|0,((n|0)<0)<<31>>31|0)|0;Ta=z;Oa=af(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=z;Ea=af(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Da=z;sa=af(u|0,((u|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ra=z;ia=af(t|0,((t|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ha=z;_=af(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Z=z;Q=af(v|0,((v|0)<0)<<31>>31|0,l<<1|0,o|0)|0;P=z;G=af(s|0,((s|0)<0)<<31>>31|0,l<<1|0,o|0)|0;F=z;o=af(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=z;p=((n<<1|0)<0)<<31>>31;Ma=af(n<<1|0,p|0,n|0,((n|0)<0)<<31>>31|0)|0;La=z;Ca=af(n<<1|0,p|0,k|0,((k|0)<0)<<31>>31|0)|0;Ba=z;w=((f<<1|0)<0)<<31>>31;wa=af(f<<1|0,w|0,n<<1|0,p|0)|0;va=z;ma=af(u|0,((u|0)<0)<<31>>31|0,n<<1|0,p|0)|0;la=z;aa=af(t<<1|0,((t<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;$=z;S=af(g|0,((g|0)<0)<<31>>31|0,n<<1|0,p|0)|0;R=z;I=af(v<<1|0,((v<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;H=z;m=af(s|0,((s|0)<0)<<31>>31|0,n<<1|0,p|0)|0;r=z;b=((q*38|0)<0)<<31>>31;p=af(q*38|0,b|0,n<<1|0,p|0)|0;n=z;ua=af(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ta=z;ka=af(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;ja=z;ca=af(u|0,((u|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ba=z;W=af(t|0,((t|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;V=z;O=af(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;N=z;A=af(v|0,((v|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;y=z;Y=((s*19|0)<0)<<31>>31;Ya=af(s*19|0,Y|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=z;k=af(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=z;ea=af(f<<1|0,w|0,f|0,((f|0)<0)<<31>>31|0)|0;da=z;U=af(f<<1|0,w|0,u|0,((u|0)<0)<<31>>31|0)|0;T=z;K=af(t<<1|0,((t<<1|0)<0)<<31>>31|0,f<<1|0,w|0)|0;J=z;E=af(g|0,((g|0)<0)<<31>>31|0,f<<1|0,w|0)|0;D=z;qa=((v*38|0)<0)<<31>>31;_a=af(v*38|0,qa|0,f<<1|0,w|0)|0;Za=z;Qa=af(s*19|0,Y|0,f<<1|0,w|0)|0;Pa=z;w=af(q*38|0,b|0,f<<1|0,w|0)|0;f=z;M=af(u|0,((u|0)<0)<<31>>31|0,u|0,((u|0)<0)<<31>>31|0)|0;L=z;C=af(u<<1|0,((u<<1|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;B=z;ab=af(g*19|0,((g*19|0)<0)<<31>>31|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;$a=z;Sa=af(v*38|0,qa|0,u|0,((u|0)<0)<<31>>31|0)|0;Ra=z;Ga=af(s*19|0,Y|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;Fa=z;u=af(q*38|0,b|0,u|0,((u|0)<0)<<31>>31|0)|0;e=z;eb=af(t*38|0,((t*38|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;db=z;Wa=af(g*19|0,((g*19|0)<0)<<31>>31|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Va=z;Ia=af(v*38|0,qa|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Ha=z;ya=af(s*19|0,Y|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;xa=z;t=af(q*38|0,b|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;d=z;Ka=af(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Ja=z;Aa=af(v*38|0,qa|0,g|0,((g|0)<0)<<31>>31|0)|0;za=z;oa=af(s*19|0,Y|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;na=z;g=af(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;x=z;qa=af(v*38|0,qa|0,v|0,((v|0)<0)<<31>>31|0)|0;pa=z;ga=af(s*19|0,Y|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;fa=z;v=af(q*38|0,b|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;i=z;Y=af(s*19|0,Y|0,s|0,((s|0)<0)<<31>>31|0)|0;X=z;s=af(q*38|0,b|0,s|0,((s|0)<0)<<31>>31|0)|0;h=z;q=af(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=z;bb=fg(eb|0,db|0,cb|0,bb|0)|0;$a=fg(bb|0,z|0,ab|0,$a|0)|0;Za=fg($a|0,z|0,_a|0,Za|0)|0;Xa=fg(Za|0,z|0,Ya|0,Xa|0)|0;n=fg(Xa|0,z|0,p|0,n|0)|0;p=z;Ta=fg(Wa|0,Va|0,Ua|0,Ta|0)|0;Ra=fg(Ta|0,z|0,Sa|0,Ra|0)|0;Pa=fg(Ra|0,z|0,Qa|0,Pa|0)|0;j=fg(Pa|0,z|0,k|0,j|0)|0;k=z;La=fg(Oa|0,Na|0,Ma|0,La|0)|0;Ja=fg(La|0,z|0,Ka|0,Ja|0)|0;Ha=fg(Ja|0,z|0,Ia|0,Ha|0)|0;Fa=fg(Ha|0,z|0,Ga|0,Fa|0)|0;f=fg(Fa|0,z|0,w|0,f|0)|0;w=z;Ba=fg(Ea|0,Da|0,Ca|0,Ba|0)|0;za=fg(Ba|0,z|0,Aa|0,za|0)|0;xa=fg(za|0,z|0,ya|0,xa|0)|0;e=fg(xa|0,z|0,u|0,e|0)|0;u=z;ta=fg(wa|0,va|0,ua|0,ta|0)|0;ra=fg(ta|0,z|0,sa|0,ra|0)|0;pa=fg(ra|0,z|0,qa|0,pa|0)|0;na=fg(pa|0,z|0,oa|0,na|0)|0;d=fg(na|0,z|0,t|0,d|0)|0;t=z;ja=fg(ma|0,la|0,ka|0,ja|0)|0;ha=fg(ja|0,z|0,ia|0,ha|0)|0;fa=fg(ha|0,z|0,ga|0,fa|0)|0;x=fg(fa|0,z|0,g|0,x|0)|0;g=z;ba=fg(ea|0,da|0,ca|0,ba|0)|0;$=fg(ba|0,z|0,aa|0,$|0)|0;Z=fg($|0,z|0,_|0,Z|0)|0;X=fg(Z|0,z|0,Y|0,X|0)|0;i=fg(X|0,z|0,v|0,i|0)|0;v=z;T=fg(W|0,V|0,U|0,T|0)|0;R=fg(T|0,z|0,S|0,R|0)|0;P=fg(R|0,z|0,Q|0,P|0)|0;h=fg(P|0,z|0,s|0,h|0)|0;s=z;L=fg(O|0,N|0,M|0,L|0)|0;J=fg(L|0,z|0,K|0,J|0)|0;H=fg(J|0,z|0,I|0,H|0)|0;F=fg(H|0,z|0,G|0,F|0)|0;b=fg(F|0,z|0,q|0,b|0)|0;q=z;B=fg(E|0,D|0,C|0,B|0)|0;y=fg(B|0,z|0,A|0,y|0)|0;r=fg(y|0,z|0,m|0,r|0)|0;l=fg(r|0,z|0,o|0,l|0)|0;o=z;p=vf(n|0,p|0,1)|0;n=z;k=vf(j|0,k|0,1)|0;j=z;w=vf(f|0,w|0,1)|0;f=z;u=vf(e|0,u|0,1)|0;e=z;t=vf(d|0,t|0,1)|0;d=z;g=vf(x|0,g|0,1)|0;x=z;v=vf(i|0,v|0,1)|0;i=z;s=vf(h|0,s|0,1)|0;h=z;q=vf(b|0,q|0,1)|0;b=z;o=vf(l|0,o|0,1)|0;l=z;r=fg(p|0,n|0,33554432,0)|0;r=Xe(r|0,z|0,26)|0;m=z;j=fg(r|0,m|0,k|0,j|0)|0;k=z;m=vf(r|0,m|0,26)|0;m=cg(p|0,n|0,m|0,z|0)|0;n=z;p=fg(t|0,d|0,33554432,0)|0;p=Xe(p|0,z|0,26)|0;r=z;x=fg(p|0,r|0,g|0,x|0)|0;g=z;r=vf(p|0,r|0,26)|0;r=cg(t|0,d|0,r|0,z|0)|0;d=z;t=fg(j|0,k|0,16777216,0)|0;t=Xe(t|0,z|0,25)|0;p=z;f=fg(t|0,p|0,w|0,f|0)|0;w=z;p=vf(t|0,p|0,25)|0;p=cg(j|0,k|0,p|0,z|0)|0;k=z;j=fg(x|0,g|0,16777216,0)|0;j=Xe(j|0,z|0,25)|0;t=z;i=fg(j|0,t|0,v|0,i|0)|0;v=z;t=vf(j|0,t|0,25)|0;t=cg(x|0,g|0,t|0,z|0)|0;g=z;x=fg(f|0,w|0,33554432,0)|0;x=Xe(x|0,z|0,26)|0;j=z;e=fg(x|0,j|0,u|0,e|0)|0;u=z;j=vf(x|0,j|0,26)|0;j=cg(f|0,w|0,j|0,z|0)|0;w=fg(i|0,v|0,33554432,0)|0;w=Xe(w|0,z|0,26)|0;f=z;h=fg(w|0,f|0,s|0,h|0)|0;s=z;f=vf(w|0,f|0,26)|0;f=cg(i|0,v|0,f|0,z|0)|0;v=fg(e|0,u|0,16777216,0)|0;v=Xe(v|0,z|0,25)|0;i=z;d=fg(v|0,i|0,r|0,d|0)|0;r=z;i=vf(v|0,i|0,25)|0;i=cg(e|0,u|0,i|0,z|0)|0;u=fg(h|0,s|0,16777216,0)|0;u=Xe(u|0,z|0,25)|0;e=z;b=fg(u|0,e|0,q|0,b|0)|0;q=z;e=vf(u|0,e|0,25)|0;e=cg(h|0,s|0,e|0,z|0)|0;s=fg(d|0,r|0,33554432,0)|0;s=Xe(s|0,z|0,26)|0;h=z;g=fg(t|0,g|0,s|0,h|0)|0;h=vf(s|0,h|0,26)|0;h=cg(d|0,r|0,h|0,z|0)|0;r=fg(b|0,q|0,33554432,0)|0;r=Xe(r|0,z|0,26)|0;d=z;l=fg(r|0,d|0,o|0,l|0)|0;o=z;d=vf(r|0,d|0,26)|0;d=cg(b|0,q|0,d|0,z|0)|0;q=fg(l|0,o|0,16777216,0)|0;q=Xe(q|0,z|0,25)|0;b=z;r=af(q|0,b|0,19,0)|0;n=fg(r|0,z|0,m|0,n|0)|0;m=z;b=vf(q|0,b|0,25)|0;b=cg(l|0,o|0,b|0,z|0)|0;o=fg(n|0,m|0,33554432,0)|0;o=Xe(o|0,z|0,26)|0;l=z;k=fg(p|0,k|0,o|0,l|0)|0;l=vf(o|0,l|0,26)|0;l=cg(n|0,m|0,l|0,z|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function pa(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;tf(d,b);c[e>>2]=c[a>>2];c[e+4>>2]=c[a+4>>2];c[e+8>>2]=c[a+8>>2];c[e+12>>2]=c[a+12>>2];c[e+16>>2]=c[a+16>>2];c[e+20>>2]=c[a+20>>2];c[e+24>>2]=c[a+24>>2];c[e+28>>2]=c[a+28>>2];s=0;b=c[d>>2]|0;while(1){w=c[e+16>>2]|0;m=Ah(w,6)|0;m=(Ah(w,11)|0)^m;m=m^(Ah(w,25)|0);k=c[e+20>>2]|0;j=c[e+24>>2]|0;m=b+m+(c[32984+(s<<2)>>2]|0)+((j^k)&w^j)+(c[e+28>>2]|0)|0;l=m+(c[e+12>>2]|0)|0;c[e+12>>2]=l;i=c[e>>2]|0;v=Ah(i,2)|0;v=(Ah(i,13)|0)^v;v=v^(Ah(i,22)|0);h=c[e+4>>2]|0;g=c[e+8>>2]|0;c[e+28>>2]=m+v+((g|h)&i|g&h);u=Ah(l,6)|0;u=(Ah(l,11)|0)^u;u=u^(Ah(l,25)|0);q=s|1;j=(c[d+(q<<2)>>2]|0)+u+(c[32984+(q<<2)>>2]|0)+((k^w)&l^k)+j|0;c[e+8>>2]=j+g;u=Ah(m+v+((g|h)&i|g&h)|0,2)|0;u=(Ah(m+v+((g|h)&i|g&h)|0,13)|0)^u;u=j+(u^(Ah(m+v+((g|h)&i|g&h)|0,22)|0))+((h|i)&m+v+((g|h)&i|g&h)|h&i)|0;c[e+24>>2]=u;f=Ah(j+g|0,6)|0;f=(Ah(j+g|0,11)|0)^f;f=f^(Ah(j+g|0,25)|0);r=s|2;k=(c[d+(r<<2)>>2]|0)+f+(c[32984+(r<<2)>>2]|0)+((w^l)&j+g^w)+k|0;c[e+4>>2]=k+h;w=Ah(u,2)|0;w=(Ah(u,13)|0)^w;w=k+(w^(Ah(u,22)|0))+((i|m+v+((g|h)&i|g&h))&u|i&m+v+((g|h)&i|g&h))|0;c[e+20>>2]=w;f=Ah(k+h|0,6)|0;f=(Ah(k+h|0,11)|0)^f;f=f^(Ah(k+h|0,25)|0);b=s|3;l=(c[d+(b<<2)>>2]|0)+f+(c[32984+(b<<2)>>2]|0)+((l^j+g)&k+h^l)+(c[e+16>>2]|0)|0;c[e>>2]=l+i;f=Ah(w,2)|0;f=(Ah(w,13)|0)^f;v=l+(f^(Ah(w,22)|0))+((m+v+((g|h)&i|g&h)|u)&w|m+v+((g|h)&i|g&h)&u)|0;c[e+16>>2]=v;m=Ah(l+i|0,6)|0;m=(Ah(l+i|0,11)|0)^m;m=m^(Ah(l+i|0,25)|0);f=s|4;g=(c[d+(f<<2)>>2]|0)+m+(c[32984+(f<<2)>>2]|0)+((j+g^k+h)&l+i^j+g)+(c[e+12>>2]|0)|0;j=g+(c[e+28>>2]|0)|0;c[e+28>>2]=j;m=Ah(v,2)|0;m=(Ah(v,13)|0)^m;u=g+(m^(Ah(v,22)|0))+((u|w)&v|u&w)|0;c[e+12>>2]=u;m=Ah(j,6)|0;m=(Ah(j,11)|0)^m;m=m^(Ah(j,25)|0);g=s|5;h=(c[d+(g<<2)>>2]|0)+m+(c[32984+(g<<2)>>2]|0)+((k+h^l+i)&j^k+h)+(c[e+8>>2]|0)|0;k=h+(c[e+24>>2]|0)|0;c[e+24>>2]=k;m=Ah(u,2)|0;m=(Ah(u,13)|0)^m;w=h+(m^(Ah(u,22)|0))+((w|v)&u|w&v)|0;c[e+8>>2]=w;m=Ah(k,6)|0;m=(Ah(k,11)|0)^m;m=m^(Ah(k,25)|0);h=s|6;i=(c[d+(h<<2)>>2]|0)+m+(c[32984+(h<<2)>>2]|0)+((l+i^j)&k^l+i)+(c[e+4>>2]|0)|0;l=i+(c[e+20>>2]|0)|0;c[e+20>>2]=l;m=Ah(w,2)|0;m=(Ah(w,13)|0)^m;v=i+(m^(Ah(w,22)|0))+((v|u)&w|v&u)|0;c[e+4>>2]=v;m=Ah(l,6)|0;m=(Ah(l,11)|0)^m;m=m^(Ah(l,25)|0);i=s|7;j=(c[d+(i<<2)>>2]|0)+m+(c[32984+(i<<2)>>2]|0)+((j^k)&l^j)+(c[e>>2]|0)|0;m=j+(c[e+16>>2]|0)|0;c[e+16>>2]=m;n=Ah(v,2)|0;n=(Ah(v,13)|0)^n;u=j+(n^(Ah(v,22)|0))+((u|w)&v|u&w)|0;c[e>>2]=u;n=Ah(m,6)|0;n=(Ah(m,11)|0)^n;n=n^(Ah(m,25)|0);j=s|8;k=(c[d+(j<<2)>>2]|0)+n+(c[32984+(j<<2)>>2]|0)+((k^l)&m^k)+(c[e+28>>2]|0)|0;n=k+(c[e+12>>2]|0)|0;c[e+12>>2]=n;o=Ah(u,2)|0;o=(Ah(u,13)|0)^o;w=k+(o^(Ah(u,22)|0))+((w|v)&u|w&v)|0;c[e+28>>2]=w;o=Ah(n,6)|0;o=(Ah(n,11)|0)^o;o=o^(Ah(n,25)|0);k=s|9;l=(c[d+(k<<2)>>2]|0)+o+(c[32984+(k<<2)>>2]|0)+((l^m)&n^l)+(c[e+24>>2]|0)|0;o=l+(c[e+8>>2]|0)|0;c[e+8>>2]=o;p=Ah(w,2)|0;p=(Ah(w,13)|0)^p;v=l+(p^(Ah(w,22)|0))+((v|u)&w|v&u)|0;c[e+24>>2]=v;p=Ah(o,6)|0;p=(Ah(o,11)|0)^p;p=p^(Ah(o,25)|0);l=s|10;m=(c[d+(l<<2)>>2]|0)+p+(c[32984+(l<<2)>>2]|0)+((m^n)&o^m)+(c[e+20>>2]|0)|0;p=m+(c[e+4>>2]|0)|0;c[e+4>>2]=p;t=Ah(v,2)|0;t=(Ah(v,13)|0)^t;u=m+(t^(Ah(v,22)|0))+((u|w)&v|u&w)|0;c[e+20>>2]=u;t=Ah(p,6)|0;t=(Ah(p,11)|0)^t;t=t^(Ah(p,25)|0);m=s|11;n=(c[d+(m<<2)>>2]|0)+t+(c[32984+(m<<2)>>2]|0)+((n^o)&p^n)+(c[e+16>>2]|0)|0;t=n+(c[e>>2]|0)|0;c[e>>2]=t;y=Ah(u,2)|0;y=(Ah(u,13)|0)^y;w=n+(y^(Ah(u,22)|0))+((w|v)&u|w&v)|0;c[e+16>>2]=w;y=Ah(t,6)|0;y=(Ah(t,11)|0)^y;y=y^(Ah(t,25)|0);n=s|12;o=(c[d+(n<<2)>>2]|0)+y+(c[32984+(n<<2)>>2]|0)+((o^p)&t^o)+(c[e+12>>2]|0)|0;y=o+(c[e+28>>2]|0)|0;c[e+28>>2]=y;z=Ah(w,2)|0;z=(Ah(w,13)|0)^z;v=o+(z^(Ah(w,22)|0))+((v|u)&w|v&u)|0;c[e+12>>2]=v;z=Ah(y,6)|0;z=(Ah(y,11)|0)^z;z=z^(Ah(y,25)|0);o=s|13;p=(c[d+(o<<2)>>2]|0)+z+(c[32984+(o<<2)>>2]|0)+((p^t)&y^p)+(c[e+8>>2]|0)|0;z=p+(c[e+24>>2]|0)|0;c[e+24>>2]=z;x=Ah(v,2)|0;x=(Ah(v,13)|0)^x;u=p+(x^(Ah(v,22)|0))+((u|w)&v|u&w)|0;c[e+8>>2]=u;x=Ah(z,6)|0;x=(Ah(z,11)|0)^x;x=x^(Ah(z,25)|0);p=s|14;t=(c[d+(p<<2)>>2]|0)+x+(c[32984+(p<<2)>>2]|0)+((t^y)&z^t)+(c[e+4>>2]|0)|0;x=t+(c[e+20>>2]|0)|0;c[e+20>>2]=x;A=Ah(u,2)|0;A=(Ah(u,13)|0)^A;w=t+(A^(Ah(u,22)|0))+((w|v)&u|w&v)|0;c[e+4>>2]=w;A=Ah(x,6)|0;A=(Ah(x,11)|0)^A;A=A^(Ah(x,25)|0);t=s|15;y=(c[d+(t<<2)>>2]|0)+A+(c[32984+(t<<2)>>2]|0)+((y^z)&x^y)+(c[e>>2]|0)|0;c[e+16>>2]=y+(c[e+16>>2]|0);x=Ah(w,2)|0;x=(Ah(w,13)|0)^x;c[e>>2]=y+(x^(Ah(w,22)|0))+((v|u)&w|v&u);if((s|0)==48){b=0;break}z=c[d+(p<<2)>>2]|0;y=Ah(z,17)|0;z=z>>>10^y^(Ah(z,19)|0);z=z+(c[d+(k<<2)>>2]|0)|0;y=c[d+(q<<2)>>2]|0;x=Ah(y,7)|0;x=y>>>3^x^(Ah(y,18)|0);x=z+(c[d+(s<<2)>>2]|0)+x|0;s=s+16|0;c[d+(s<<2)>>2]=x;z=c[d+(t<<2)>>2]|0;A=Ah(z,17)|0;z=z>>>10^A^(Ah(z,19)|0);z=z+(c[d+(q+9<<2)>>2]|0)|0;A=c[d+(q+1<<2)>>2]|0;w=Ah(A,7)|0;w=z+y+(A>>>3^w^(Ah(A,18)|0))|0;c[d+(q+16<<2)>>2]=w;y=Ah(x,17)|0;x=x>>>10^y^(Ah(x,19)|0);x=x+(c[d+(m<<2)>>2]|0)|0;y=c[d+(b<<2)>>2]|0;z=Ah(y,7)|0;z=x+A+(y>>>3^z^(Ah(y,18)|0))|0;c[d+(r+16<<2)>>2]=z;A=Ah(w,17)|0;w=w>>>10^A^(Ah(w,19)|0);w=w+(c[d+(b+9<<2)>>2]|0)|0;A=c[d+(b+1<<2)>>2]|0;x=Ah(A,7)|0;x=w+y+(A>>>3^x^(Ah(A,18)|0))|0;c[d+(b+16<<2)>>2]=x;b=Ah(z,17)|0;b=z>>>10^b^(Ah(z,19)|0);b=b+(c[d+(o<<2)>>2]|0)|0;z=c[d+(g<<2)>>2]|0;y=Ah(z,7)|0;y=b+A+(z>>>3^y^(Ah(z,18)|0))|0;c[d+(f+16<<2)>>2]=y;A=Ah(x,17)|0;x=x>>>10^A^(Ah(x,19)|0);x=x+(c[d+(g+9<<2)>>2]|0)|0;A=c[d+(g+1<<2)>>2]|0;b=Ah(A,7)|0;b=x+z+(A>>>3^b^(Ah(A,18)|0))|0;c[d+(g+16<<2)>>2]=b;z=Ah(y,17)|0;y=y>>>10^z^(Ah(y,19)|0);y=y+(c[d+(t<<2)>>2]|0)|0;z=c[d+(i<<2)>>2]|0;x=Ah(z,7)|0;x=y+A+(z>>>3^x^(Ah(z,18)|0))|0;c[d+(h+16<<2)>>2]=x;A=Ah(b,17)|0;b=b>>>10^A^(Ah(b,19)|0);b=b+(c[d+(i+9<<2)>>2]|0)|0;A=c[d+(i+1<<2)>>2]|0;y=Ah(A,7)|0;y=b+z+(A>>>3^y^(Ah(A,18)|0))|0;c[d+(i+16<<2)>>2]=y;z=Ah(x,17)|0;x=x>>>10^z^(Ah(x,19)|0);x=x+(c[d+(j+9<<2)>>2]|0)|0;z=c[d+(k<<2)>>2]|0;b=Ah(z,7)|0;b=x+A+(z>>>3^b^(Ah(z,18)|0))|0;c[d+(j+16<<2)>>2]=b;A=Ah(y,17)|0;y=y>>>10^A^(Ah(y,19)|0);y=y+(c[d+(k+9<<2)>>2]|0)|0;A=c[d+(k+1<<2)>>2]|0;x=Ah(A,7)|0;x=y+z+(A>>>3^x^(Ah(A,18)|0))|0;c[d+(k+16<<2)>>2]=x;z=Ah(b,17)|0;b=b>>>10^z^(Ah(b,19)|0);b=b+(c[d+(l+9<<2)>>2]|0)|0;z=c[d+(m<<2)>>2]|0;y=Ah(z,7)|0;y=b+A+(z>>>3^y^(Ah(z,18)|0))|0;c[d+(l+16<<2)>>2]=y;A=Ah(x,17)|0;x=x>>>10^A^(Ah(x,19)|0);x=x+(c[d+(m+9<<2)>>2]|0)|0;A=c[d+(m+1<<2)>>2]|0;b=Ah(A,7)|0;b=x+z+(A>>>3^b^(Ah(A,18)|0))|0;c[d+(m+16<<2)>>2]=b;z=Ah(y,17)|0;y=y>>>10^z^(Ah(y,19)|0);y=y+(c[d+(n+9<<2)>>2]|0)|0;z=c[d+(o<<2)>>2]|0;x=Ah(z,7)|0;x=y+A+(z>>>3^x^(Ah(z,18)|0))|0;c[d+(n+16<<2)>>2]=x;A=Ah(b,17)|0;b=b>>>10^A^(Ah(b,19)|0);b=b+(c[d+(o+9<<2)>>2]|0)|0;A=c[d+(o+1<<2)>>2]|0;y=Ah(A,7)|0;y=b+z+(A>>>3^y^(Ah(A,18)|0))|0;c[d+(o+16<<2)>>2]=y;z=Ah(x,17)|0;x=x>>>10^z^(Ah(x,19)|0);x=x+(c[d+(p+9<<2)>>2]|0)|0;z=c[d+(t<<2)>>2]|0;b=Ah(z,7)|0;c[d+(p+16<<2)>>2]=x+A+(z>>>3^b^(Ah(z,18)|0));b=Ah(y,17)|0;y=y>>>10^b^(Ah(y,19)|0);y=y+(c[d+(t+9<<2)>>2]|0)|0;b=c[d+(t+1<<2)>>2]|0;A=Ah(b,7)|0;c[d+(t+16<<2)>>2]=y+z+(b>>>3^A^(Ah(b,18)|0));if((s|0)>=64){b=0;break}}do{A=a+(b<<2)|0;c[A>>2]=(c[A>>2]|0)+(c[e+(b<<2)>>2]|0);b=b+1|0}while((b|0)!=8);return}function qa(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;p=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;D=c[b+16>>2]|0;d=c[b+20>>2]|0;g=c[b+24>>2]|0;O=c[b+28>>2]|0;B=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=af(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=z;o=((l<<1|0)<0)<<31>>31;Ia=af(l<<1|0,o|0,p|0,((p|0)<0)<<31>>31|0)|0;Ha=z;Wa=af(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Va=z;Ua=af(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Ta=z;Oa=af(D|0,((D|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=z;ya=af(d|0,((d|0)<0)<<31>>31|0,l<<1|0,o|0)|0;xa=z;ga=af(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;fa=z;R=af(O|0,((O|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Q=z;F=af(B|0,((B|0)<0)<<31>>31|0,l<<1|0,o|0)|0;E=z;o=af(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=z;n=((p<<1|0)<0)<<31>>31;ta=af(p<<1|0,n|0,p|0,((p|0)<0)<<31>>31|0)|0;ua=z;ba=af(p<<1|0,n|0,k|0,((k|0)<0)<<31>>31|0)|0;ca=z;P=((f<<1|0)<0)<<31>>31;Sa=af(f<<1|0,P|0,p<<1|0,n|0)|0;Ra=z;Ca=af(D|0,((D|0)<0)<<31>>31|0,p<<1|0,n|0)|0;Ba=z;ia=af(d<<1|0,((d<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;ha=z;T=af(g|0,((g|0)<0)<<31>>31|0,p<<1|0,n|0)|0;S=z;H=af(O<<1|0,((O<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;G=z;t=af(B|0,((B|0)<0)<<31>>31|0,p<<1|0,n|0)|0;s=z;b=((q*38|0)<0)<<31>>31;n=af(q*38|0,b|0,p<<1|0,n|0)|0;p=z;Qa=af(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=z;Aa=af(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;za=z;ka=af(D|0,((D|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ja=z;X=af(d|0,((d|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;W=z;N=af(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;M=z;v=af(O|0,((O|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;u=z;ea=((B*19|0)<0)<<31>>31;Ya=af(B*19|0,ea|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=z;k=af(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=z;ma=af(f<<1|0,P|0,f|0,((f|0)<0)<<31>>31|0)|0;la=z;V=af(f<<1|0,P|0,D|0,((D|0)<0)<<31>>31|0)|0;U=z;J=af(d<<1|0,((d<<1|0)<0)<<31>>31|0,f<<1|0,P|0)|0;I=z;A=af(g|0,((g|0)<0)<<31>>31|0,f<<1|0,P|0)|0;y=z;Ma=((O*38|0)<0)<<31>>31;_a=af(O*38|0,Ma|0,f<<1|0,P|0)|0;Za=z;Ea=af(B*19|0,ea|0,f<<1|0,P|0)|0;Da=z;P=af(q*38|0,b|0,f<<1|0,P|0)|0;f=z;L=af(D|0,((D|0)<0)<<31>>31|0,D|0,((D|0)<0)<<31>>31|0)|0;K=z;x=af(D<<1|0,((D<<1|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;w=z;ab=af(g*19|0,((g*19|0)<0)<<31>>31|0,D<<1|0,((D<<1|0)<0)<<31>>31|0)|0;$a=z;Ga=af(O*38|0,Ma|0,D|0,((D|0)<0)<<31>>31|0)|0;Fa=z;oa=af(B*19|0,ea|0,D<<1|0,((D<<1|0)<0)<<31>>31|0)|0;na=z;D=af(q*38|0,b|0,D|0,((D|0)<0)<<31>>31|0)|0;e=z;eb=af(d*38|0,((d*38|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;db=z;Ka=af(g*19|0,((g*19|0)<0)<<31>>31|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Ja=z;qa=af(O*38|0,Ma|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;pa=z;_=af(B*19|0,ea|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Z=z;d=af(q*38|0,b|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;C=z;sa=af(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;ra=z;aa=af(O*38|0,Ma|0,g|0,((g|0)<0)<<31>>31|0)|0;$=z;m=af(B*19|0,ea|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;r=z;g=af(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;Y=z;Ma=af(O*38|0,Ma|0,O|0,((O|0)<0)<<31>>31|0)|0;La=z;wa=af(B*19|0,ea|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;va=z;O=af(q*38|0,b|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;i=z;ea=af(B*19|0,ea|0,B|0,((B|0)<0)<<31>>31|0)|0;da=z;B=af(q*38|0,b|0,B|0,((B|0)<0)<<31>>31|0)|0;h=z;q=af(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=z;bb=fg(eb|0,db|0,cb|0,bb|0)|0;$a=fg(bb|0,z|0,ab|0,$a|0)|0;Za=fg($a|0,z|0,_a|0,Za|0)|0;Xa=fg(Za|0,z|0,Ya|0,Xa|0)|0;p=fg(Xa|0,z|0,n|0,p|0)|0;n=z;ua=fg(Wa|0,Va|0,ta|0,ua|0)|0;ta=z;ca=fg(Ua|0,Ta|0,ba|0,ca|0)|0;ba=z;Pa=fg(Sa|0,Ra|0,Qa|0,Pa|0)|0;Na=fg(Pa|0,z|0,Oa|0,Na|0)|0;La=fg(Na|0,z|0,Ma|0,La|0)|0;r=fg(La|0,z|0,m|0,r|0)|0;C=fg(r|0,z|0,d|0,C|0)|0;d=z;r=fg(p|0,n|0,33554432,0)|0;r=Xe(r|0,z|0,26)|0;m=z;Ha=fg(Ka|0,Ja|0,Ia|0,Ha|0)|0;Fa=fg(Ha|0,z|0,Ga|0,Fa|0)|0;Da=fg(Fa|0,z|0,Ea|0,Da|0)|0;j=fg(Da|0,z|0,k|0,j|0)|0;j=fg(j|0,z|0,r|0,m|0)|0;k=z;m=vf(r|0,m|0,26)|0;m=cg(p|0,n|0,m|0,z|0)|0;n=z;p=fg(C|0,d|0,33554432,0)|0;p=Xe(p|0,z|0,26)|0;r=z;za=fg(Ca|0,Ba|0,Aa|0,za|0)|0;xa=fg(za|0,z|0,ya|0,xa|0)|0;va=fg(xa|0,z|0,wa|0,va|0)|0;Y=fg(va|0,z|0,g|0,Y|0)|0;Y=fg(Y|0,z|0,p|0,r|0)|0;g=z;r=vf(p|0,r|0,26)|0;r=cg(C|0,d|0,r|0,z|0)|0;d=z;C=fg(j|0,k|0,16777216,0)|0;C=Xe(C|0,z|0,25)|0;p=z;ra=fg(ua|0,ta|0,sa|0,ra|0)|0;pa=fg(ra|0,z|0,qa|0,pa|0)|0;na=fg(pa|0,z|0,oa|0,na|0)|0;f=fg(na|0,z|0,P|0,f|0)|0;f=fg(f|0,z|0,C|0,p|0)|0;P=z;p=vf(C|0,p|0,25)|0;p=cg(j|0,k|0,p|0,z|0)|0;k=z;j=fg(Y|0,g|0,16777216,0)|0;j=Xe(j|0,z|0,25)|0;C=z;ja=fg(ma|0,la|0,ka|0,ja|0)|0;ha=fg(ja|0,z|0,ia|0,ha|0)|0;fa=fg(ha|0,z|0,ga|0,fa|0)|0;da=fg(fa|0,z|0,ea|0,da|0)|0;i=fg(da|0,z|0,O|0,i|0)|0;i=fg(i|0,z|0,j|0,C|0)|0;O=z;C=vf(j|0,C|0,25)|0;C=cg(Y|0,g|0,C|0,z|0)|0;g=z;Y=fg(f|0,P|0,33554432,0)|0;Y=Xe(Y|0,z|0,26)|0;j=z;$=fg(ca|0,ba|0,aa|0,$|0)|0;Z=fg($|0,z|0,_|0,Z|0)|0;e=fg(Z|0,z|0,D|0,e|0)|0;e=fg(e|0,z|0,Y|0,j|0)|0;D=z;j=vf(Y|0,j|0,26)|0;j=cg(f|0,P|0,j|0,z|0)|0;P=fg(i|0,O|0,33554432,0)|0;P=Xe(P|0,z|0,26)|0;f=z;U=fg(X|0,W|0,V|0,U|0)|0;S=fg(U|0,z|0,T|0,S|0)|0;Q=fg(S|0,z|0,R|0,Q|0)|0;h=fg(Q|0,z|0,B|0,h|0)|0;h=fg(h|0,z|0,P|0,f|0)|0;B=z;f=vf(P|0,f|0,26)|0;f=cg(i|0,O|0,f|0,z|0)|0;O=fg(e|0,D|0,16777216,0)|0;O=Xe(O|0,z|0,25)|0;i=z;d=fg(O|0,i|0,r|0,d|0)|0;r=z;i=vf(O|0,i|0,25)|0;i=cg(e|0,D|0,i|0,z|0)|0;D=fg(h|0,B|0,16777216,0)|0;D=Xe(D|0,z|0,25)|0;e=z;K=fg(N|0,M|0,L|0,K|0)|0;I=fg(K|0,z|0,J|0,I|0)|0;G=fg(I|0,z|0,H|0,G|0)|0;E=fg(G|0,z|0,F|0,E|0)|0;b=fg(E|0,z|0,q|0,b|0)|0;b=fg(b|0,z|0,D|0,e|0)|0;q=z;e=vf(D|0,e|0,25)|0;e=cg(h|0,B|0,e|0,z|0)|0;B=fg(d|0,r|0,33554432,0)|0;B=Xe(B|0,z|0,26)|0;h=z;g=fg(C|0,g|0,B|0,h|0)|0;h=vf(B|0,h|0,26)|0;h=cg(d|0,r|0,h|0,z|0)|0;r=fg(b|0,q|0,33554432,0)|0;r=Xe(r|0,z|0,26)|0;d=z;w=fg(A|0,y|0,x|0,w|0)|0;u=fg(w|0,z|0,v|0,u|0)|0;s=fg(u|0,z|0,t|0,s|0)|0;l=fg(s|0,z|0,o|0,l|0)|0;l=fg(l|0,z|0,r|0,d|0)|0;o=z;d=vf(r|0,d|0,26)|0;d=cg(b|0,q|0,d|0,z|0)|0;q=fg(l|0,o|0,16777216,0)|0;q=Xe(q|0,z|0,25)|0;b=z;r=af(q|0,b|0,19,0)|0;n=fg(r|0,z|0,m|0,n|0)|0;m=z;b=vf(q|0,b|0,25)|0;b=cg(l|0,o|0,b|0,z|0)|0;o=fg(n|0,m|0,33554432,0)|0;o=Xe(o|0,z|0,26)|0;l=z;k=fg(p|0,k|0,o|0,l|0)|0;l=vf(o|0,l|0,26)|0;l=cg(n|0,m|0,l|0,z|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function ra(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if(!a)return;h=c[8854]|0;if((a+-8|0)>>>0<h>>>0)Z();b=c[a+-4>>2]|0;if((b&3|0)==1)Z();o=a+-8+(b&-8)|0;a:do if(!(b&1)){e=c[a+-8>>2]|0;if(!(b&3))return;k=a+-8+(0-e)|0;j=e+(b&-8)|0;if(k>>>0<h>>>0)Z();if((k|0)==(c[8855]|0)){a=c[o+4>>2]|0;if((a&3|0)!=3){r=k;f=j;m=k;break}c[8852]=j;c[o+4>>2]=a&-2;c[k+4>>2]=j|1;c[k+j>>2]=j;return}if(e>>>0<256){a=c[k+8>>2]|0;b=c[k+12>>2]|0;if((a|0)!=(35440+(e>>>3<<1<<2)|0)){if(a>>>0<h>>>0)Z();if((c[a+12>>2]|0)!=(k|0))Z()}if((b|0)==(a|0)){c[8850]=c[8850]&~(1<<(e>>>3));r=k;f=j;m=k;break}if((b|0)!=(35440+(e>>>3<<1<<2)|0)){if(b>>>0<h>>>0)Z();if((c[b+8>>2]|0)!=(k|0))Z();else d=b+8|0}else d=b+8|0;c[a+12>>2]=b;c[d>>2]=a;r=k;f=j;m=k;break}g=c[k+24>>2]|0;a=c[k+12>>2]|0;do if((a|0)==(k|0)){a=c[k+16+4>>2]|0;if(!a){a=c[k+16>>2]|0;if(!a){i=0;break}else e=k+16|0}else e=k+16+4|0;while(1){b=a+20|0;d=c[b>>2]|0;if(d|0){a=d;e=b;continue}b=a+16|0;d=c[b>>2]|0;if(!d)break;else{a=d;e=b}}if(e>>>0<h>>>0)Z();else{c[e>>2]=0;i=a;break}}else{b=c[k+8>>2]|0;if(b>>>0<h>>>0)Z();if((c[b+12>>2]|0)!=(k|0))Z();if((c[a+8>>2]|0)==(k|0)){c[b+12>>2]=a;c[a+8>>2]=b;i=a;break}else Z()}while(0);if(g){a=c[k+28>>2]|0;do if((k|0)==(c[35704+(a<<2)>>2]|0)){c[35704+(a<<2)>>2]=i;if(!i){c[8851]=c[8851]&~(1<<a);r=k;f=j;m=k;break a}}else if(g>>>0>=(c[8854]|0)>>>0){c[g+16+(((c[g+16>>2]|0)!=(k|0)&1)<<2)>>2]=i;if(!i){r=k;f=j;m=k;break a}else break}else Z();while(0);b=c[8854]|0;if(i>>>0<b>>>0)Z();c[i+24>>2]=g;a=c[k+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)Z();else{c[i+16>>2]=a;c[a+24>>2]=i;break}while(0);a=c[k+16+4>>2]|0;if(a)if(a>>>0<(c[8854]|0)>>>0)Z();else{c[i+20>>2]=a;c[a+24>>2]=i;r=k;f=j;m=k;break}else{r=k;f=j;m=k}}else{r=k;f=j;m=k}}else{r=a+-8|0;f=b&-8;m=a+-8|0}while(0);if(m>>>0>=o>>>0)Z();d=c[o+4>>2]|0;if(!(d&1))Z();if(!(d&2)){a=c[8855]|0;if((o|0)==(c[8856]|0)){q=(c[8853]|0)+f|0;c[8853]=q;c[8856]=r;c[r+4>>2]=q|1;if((r|0)!=(a|0))return;c[8855]=0;c[8852]=0;return}if((o|0)==(a|0)){q=(c[8852]|0)+f|0;c[8852]=q;c[8855]=m;c[r+4>>2]=q|1;c[m+q>>2]=q;return}f=(d&-8)+f|0;b:do if(d>>>0>=256){g=c[o+24>>2]|0;a=c[o+12>>2]|0;do if((a|0)==(o|0)){a=c[o+16+4>>2]|0;if(!a){a=c[o+16>>2]|0;if(!a){n=0;break}else e=o+16|0}else e=o+16+4|0;while(1){b=a+20|0;d=c[b>>2]|0;if(d|0){a=d;e=b;continue}b=a+16|0;d=c[b>>2]|0;if(!d)break;else{a=d;e=b}}if(e>>>0<(c[8854]|0)>>>0)Z();else{c[e>>2]=0;n=a;break}}else{b=c[o+8>>2]|0;if(b>>>0<(c[8854]|0)>>>0)Z();if((c[b+12>>2]|0)!=(o|0))Z();if((c[a+8>>2]|0)==(o|0)){c[b+12>>2]=a;c[a+8>>2]=b;n=a;break}else Z()}while(0);if(g|0){a=c[o+28>>2]|0;do if((o|0)==(c[35704+(a<<2)>>2]|0)){c[35704+(a<<2)>>2]=n;if(!n){c[8851]=c[8851]&~(1<<a);break b}}else if(g>>>0>=(c[8854]|0)>>>0){c[g+16+(((c[g+16>>2]|0)!=(o|0)&1)<<2)>>2]=n;if(!n)break b;else break}else Z();while(0);b=c[8854]|0;if(n>>>0<b>>>0)Z();c[n+24>>2]=g;a=c[o+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)Z();else{c[n+16>>2]=a;c[a+24>>2]=n;break}while(0);a=c[o+16+4>>2]|0;if(a|0)if(a>>>0<(c[8854]|0)>>>0)Z();else{c[n+20>>2]=a;c[a+24>>2]=n;break}}}else{a=c[o+8>>2]|0;b=c[o+12>>2]|0;if((a|0)!=(35440+(d>>>3<<1<<2)|0)){if(a>>>0<(c[8854]|0)>>>0)Z();if((c[a+12>>2]|0)!=(o|0))Z()}if((b|0)==(a|0)){c[8850]=c[8850]&~(1<<(d>>>3));break}if((b|0)!=(35440+(d>>>3<<1<<2)|0)){if(b>>>0<(c[8854]|0)>>>0)Z();if((c[b+8>>2]|0)!=(o|0))Z();else l=b+8|0}else l=b+8|0;c[a+12>>2]=b;c[l>>2]=a}while(0);c[r+4>>2]=f|1;c[m+f>>2]=f;if((r|0)==(c[8855]|0)){c[8852]=f;return}}else{c[o+4>>2]=d&-2;c[r+4>>2]=f|1;c[m+f>>2]=f}b=f>>>3;if(f>>>0<256){a=c[8850]|0;if(a&1<<b){a=c[35440+(b<<1<<2)+8>>2]|0;if(a>>>0<(c[8854]|0)>>>0)Z();else{p=a;q=35440+(b<<1<<2)+8|0}}else{c[8850]=a|1<<b;p=35440+(b<<1<<2)|0;q=35440+(b<<1<<2)+8|0}c[q>>2]=r;c[p+12>>2]=r;c[r+8>>2]=p;c[r+12>>2]=35440+(b<<1<<2);return}a=f>>>8;if(a)if(f>>>0>16777215)a=31;else{q=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);a=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(q+245760|0)>>>16&2)+(q<<((q+245760|0)>>>16&2)>>>15)|0;a=f>>>(a+7|0)&1|a<<1}else a=0;e=35704+(a<<2)|0;c[r+28>>2]=a;c[r+20>>2]=0;c[r+16>>2]=0;b=c[8851]|0;d=1<<a;do if(b&d){b=f<<((a|0)==31?0:25-(a>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){a=124;break}d=e+16+(b>>>31<<2)|0;a=c[d>>2]|0;if(!a){a=121;break}else{b=b<<1;e=a}}if((a|0)==121)if(d>>>0<(c[8854]|0)>>>0)Z();else{c[d>>2]=r;c[r+24>>2]=e;c[r+12>>2]=r;c[r+8>>2]=r;break}else if((a|0)==124){a=e+8|0;b=c[a>>2]|0;q=c[8854]|0;if(b>>>0>=q>>>0&e>>>0>=q>>>0){c[b+12>>2]=r;c[a>>2]=r;c[r+8>>2]=b;c[r+12>>2]=e;c[r+24>>2]=0;break}else Z()}}else{c[8851]=b|d;c[e>>2]=r;c[r+24>>2]=e;c[r+12>>2]=r;c[r+8>>2]=r}while(0);r=(c[8858]|0)+-1|0;c[8858]=r;if(!r)a=35856;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[8858]=-1;return}function sa(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=c[a+4>>2]|0;a:do if(!(d&1)){l=c[a>>2]|0;if(!(d&3))return;j=c[8854]|0;if((a+(0-l)|0)>>>0<j>>>0)Z();if((a+(0-l)|0)==(c[8855]|0)){d=c[a+b+4>>2]|0;if((d&3|0)!=3){q=a+(0-l)|0;h=l+b|0;break}c[8852]=l+b;c[a+b+4>>2]=d&-2;c[a+(0-l)+4>>2]=l+b|1;c[a+(0-l)+(l+b)>>2]=l+b;return}if(l>>>0<256){d=c[a+(0-l)+8>>2]|0;e=c[a+(0-l)+12>>2]|0;if((d|0)!=(35440+(l>>>3<<1<<2)|0)){if(d>>>0<j>>>0)Z();if((c[d+12>>2]|0)!=(a+(0-l)|0))Z()}if((e|0)==(d|0)){c[8850]=c[8850]&~(1<<(l>>>3));q=a+(0-l)|0;h=l+b|0;break}if((e|0)!=(35440+(l>>>3<<1<<2)|0)){if(e>>>0<j>>>0)Z();if((c[e+8>>2]|0)!=(a+(0-l)|0))Z();else f=e+8|0}else f=e+8|0;c[d+12>>2]=e;c[f>>2]=d;q=a+(0-l)|0;h=l+b|0;break}i=c[a+(0-l)+24>>2]|0;d=c[a+(0-l)+12>>2]|0;do if((d|0)==(a+(0-l)|0)){e=a+(0-l)+16|0;d=c[e+4>>2]|0;if(!d){d=c[e>>2]|0;if(!d){k=0;break}}else e=e+4|0;while(1){f=d+20|0;g=c[f>>2]|0;if(g|0){d=g;e=f;continue}f=d+16|0;g=c[f>>2]|0;if(!g)break;else{d=g;e=f}}if(e>>>0<j>>>0)Z();else{c[e>>2]=0;k=d;break}}else{e=c[a+(0-l)+8>>2]|0;if(e>>>0<j>>>0)Z();if((c[e+12>>2]|0)!=(a+(0-l)|0))Z();if((c[d+8>>2]|0)==(a+(0-l)|0)){c[e+12>>2]=d;c[d+8>>2]=e;k=d;break}else Z()}while(0);if(i){d=c[a+(0-l)+28>>2]|0;do if((a+(0-l)|0)==(c[35704+(d<<2)>>2]|0)){c[35704+(d<<2)>>2]=k;if(!k){c[8851]=c[8851]&~(1<<d);q=a+(0-l)|0;h=l+b|0;break a}}else if(i>>>0>=(c[8854]|0)>>>0){c[i+16+(((c[i+16>>2]|0)!=(a+(0-l)|0)&1)<<2)>>2]=k;if(!k){q=a+(0-l)|0;h=l+b|0;break a}else break}else Z();while(0);e=c[8854]|0;if(k>>>0<e>>>0)Z();c[k+24>>2]=i;d=c[a+(0-l)+16>>2]|0;do if(d|0)if(d>>>0<e>>>0)Z();else{c[k+16>>2]=d;c[d+24>>2]=k;break}while(0);d=c[a+(0-l)+16+4>>2]|0;if(d)if(d>>>0<(c[8854]|0)>>>0)Z();else{c[k+20>>2]=d;c[d+24>>2]=k;q=a+(0-l)|0;h=l+b|0;break}else{q=a+(0-l)|0;h=l+b|0}}else{q=a+(0-l)|0;h=l+b|0}}else{q=a;h=b}while(0);j=c[8854]|0;if((a+b|0)>>>0<j>>>0)Z();f=c[a+b+4>>2]|0;if(!(f&2)){d=c[8855]|0;if((a+b|0)==(c[8856]|0)){p=(c[8853]|0)+h|0;c[8853]=p;c[8856]=q;c[q+4>>2]=p|1;if((q|0)!=(d|0))return;c[8855]=0;c[8852]=0;return}if((a+b|0)==(d|0)){p=(c[8852]|0)+h|0;c[8852]=p;c[8855]=q;c[q+4>>2]=p|1;c[q+p>>2]=p;return}h=(f&-8)+h|0;b:do if(f>>>0>=256){i=c[a+b+24>>2]|0;d=c[a+b+12>>2]|0;do if((d|0)==(a+b|0)){d=c[a+b+16+4>>2]|0;if(!d){d=c[a+b+16>>2]|0;if(!d){n=0;break}else g=a+b+16|0}else g=a+b+16+4|0;while(1){e=d+20|0;f=c[e>>2]|0;if(f|0){d=f;g=e;continue}e=d+16|0;f=c[e>>2]|0;if(!f)break;else{d=f;g=e}}if(g>>>0<j>>>0)Z();else{c[g>>2]=0;n=d;break}}else{e=c[a+b+8>>2]|0;if(e>>>0<j>>>0)Z();if((c[e+12>>2]|0)!=(a+b|0))Z();if((c[d+8>>2]|0)==(a+b|0)){c[e+12>>2]=d;c[d+8>>2]=e;n=d;break}else Z()}while(0);if(i|0){d=c[a+b+28>>2]|0;do if((a+b|0)==(c[35704+(d<<2)>>2]|0)){c[35704+(d<<2)>>2]=n;if(!n){c[8851]=c[8851]&~(1<<d);break b}}else if(i>>>0>=(c[8854]|0)>>>0){c[i+16+(((c[i+16>>2]|0)!=(a+b|0)&1)<<2)>>2]=n;if(!n)break b;else break}else Z();while(0);e=c[8854]|0;if(n>>>0<e>>>0)Z();c[n+24>>2]=i;d=c[a+b+16>>2]|0;do if(d|0)if(d>>>0<e>>>0)Z();else{c[n+16>>2]=d;c[d+24>>2]=n;break}while(0);d=c[a+b+16+4>>2]|0;if(d|0)if(d>>>0<(c[8854]|0)>>>0)Z();else{c[n+20>>2]=d;c[d+24>>2]=n;break}}}else{d=c[a+b+8>>2]|0;e=c[a+b+12>>2]|0;if((d|0)!=(35440+(f>>>3<<1<<2)|0)){if(d>>>0<j>>>0)Z();if((c[d+12>>2]|0)!=(a+b|0))Z()}if((e|0)==(d|0)){c[8850]=c[8850]&~(1<<(f>>>3));break}if((e|0)!=(35440+(f>>>3<<1<<2)|0)){if(e>>>0<j>>>0)Z();if((c[e+8>>2]|0)!=(a+b|0))Z();else m=e+8|0}else m=e+8|0;c[d+12>>2]=e;c[m>>2]=d}while(0);c[q+4>>2]=h|1;c[q+h>>2]=h;if((q|0)==(c[8855]|0)){c[8852]=h;return}}else{c[a+b+4>>2]=f&-2;c[q+4>>2]=h|1;c[q+h>>2]=h}e=h>>>3;if(h>>>0<256){d=c[8850]|0;if(d&1<<e){d=c[35440+(e<<1<<2)+8>>2]|0;if(d>>>0<(c[8854]|0)>>>0)Z();else{o=d;p=35440+(e<<1<<2)+8|0}}else{c[8850]=d|1<<e;o=35440+(e<<1<<2)|0;p=35440+(e<<1<<2)+8|0}c[p>>2]=q;c[o+12>>2]=q;c[q+8>>2]=o;c[q+12>>2]=35440+(e<<1<<2);return}d=h>>>8;if(d)if(h>>>0>16777215)d=31;else{p=d<<((d+1048320|0)>>>16&8)<<(((d<<((d+1048320|0)>>>16&8))+520192|0)>>>16&4);d=14-(((d<<((d+1048320|0)>>>16&8))+520192|0)>>>16&4|(d+1048320|0)>>>16&8|(p+245760|0)>>>16&2)+(p<<((p+245760|0)>>>16&2)>>>15)|0;d=h>>>(d+7|0)&1|d<<1}else d=0;g=35704+(d<<2)|0;c[q+28>>2]=d;c[q+20>>2]=0;c[q+16>>2]=0;e=c[8851]|0;f=1<<d;if(!(e&f)){c[8851]=e|f;c[g>>2]=q;c[q+24>>2]=g;c[q+12>>2]=q;c[q+8>>2]=q;return}e=h<<((d|0)==31?0:25-(d>>>1)|0);g=c[g>>2]|0;while(1){if((c[g+4>>2]&-8|0)==(h|0)){d=121;break}f=g+16+(e>>>31<<2)|0;d=c[f>>2]|0;if(!d){d=118;break}else{e=e<<1;g=d}}if((d|0)==118){if(f>>>0<(c[8854]|0)>>>0)Z();c[f>>2]=q;c[q+24>>2]=g;c[q+12>>2]=q;c[q+8>>2]=q;return}else if((d|0)==121){d=g+8|0;e=c[d>>2]|0;p=c[8854]|0;if(!(e>>>0>=p>>>0&g>>>0>=p>>>0))Z();c[e+12>>2]=q;c[d>>2]=q;c[q+8>>2]=e;c[q+12>>2]=g;c[q+24>>2]=0;return}}function ta(a,b,c,e,f){a=a|0;b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;m=Te(f)|0;o=z;g=Te(f+8|0)|0;h=z;e=vf(c|0,e|0,56)|0;f=z;if((b+c+(0-(c&7))|0)==(b|0)){q=g^2037671283;j=h^1952801890;n=m^1886610805;k=o^1936682341;i=g^1852075907;r=h^1685025377;h=m^1852142177;g=o^1819895653}else{s=b;q=g^2037671283;j=h^1952801890;n=m^1886610805;l=o^1936682341;k=g^1852075907;i=h^1685025377;h=m^1852142177;g=o^1819895653;while(1){p=Te(s)|0;t=z;v=p^q;j=t^j;l=fg(n|0,l|0,k|0,i|0)|0;r=z;n=_e(k,i,13)|0;k=z^r;r=_e(l,r,32)|0;q=z;m=fg(v|0,j|0,h|0,g|0)|0;o=z;j=_e(v,j,16)|0;i=z^o;q=fg(j^m|0,i|0,r|0,q|0)|0;r=z;i=_e(j^m,i,21)|0;j=r^z;o=fg(m|0,o|0,n^l|0,k|0)|0;m=z;k=_e(n^l,k,17)|0;g=z^m;m=_e(o,m,32)|0;h=z;r=fg(k^o|0,g|0,q|0,r|0)|0;l=z;g=_e(k^o,g,13)|0;o=z^l;l=_e(r,l,32)|0;k=z;h=fg(m|0,h|0,q^i|0,j|0)|0;m=z;j=_e(q^i,j,16)|0;i=z^m;k=fg(j^h|0,i|0,l|0,k|0)|0;l=z;i=_e(j^h,i,21)|0;j=l^z;m=fg(g^r|0,o|0,h|0,m|0)|0;h=z;o=_e(g^r,o,17)|0;r=z^h;h=_e(m,h,32)|0;g=z;s=s+8|0;if((s|0)==(b+c+(0-(c&7))|0)){b=b+c+(0-(c&7))|0;q=k^i;n=k^p;k=l^t;i=o^m;break}else{q=k^i;n=k^p;l=l^t;k=o^m;i=r}}}switch(c&7){case 7:{e=vf(d[b+6>>0]|0|0,0,48)|0|e;f=z|f;u=5;break}case 6:{u=5;break}case 5:{u=6;break}case 4:{u=7;break}case 3:{u=8;break}case 2:{u=9;break}case 1:{u=10;break}default:{}}if((u|0)==5){v=vf(d[b+5>>0]|0|0,0,40)|0;f=z|f;e=v|e;u=6}if((u|0)==6){f=d[b+4>>0]|0|f;u=7}if((u|0)==7){v=vf(d[b+3>>0]|0|0,0,24)|0;e=v|e;f=z|f;u=8}if((u|0)==8){v=vf(d[b+2>>0]|0|0,0,16)|0;e=v|e;f=z|f;u=9}if((u|0)==9){v=vf(d[b+1>>0]|0|0,0,8)|0;e=v|e;f=z|f;u=10}if((u|0)==10)e=d[b>>0]|0|e;t=e^q;c=f^j;b=fg(n|0,k|0,i|0,r|0)|0;v=z;u=_e(i,r,13)|0;o=z^v;v=_e(b,v,32)|0;q=z;s=fg(t|0,c|0,h|0,g|0)|0;p=z;r=_e(t,c,16)|0;c=z^p;q=fg(r^s|0,c|0,v|0,q|0)|0;v=z;c=_e(r^s,c,21)|0;r=v^z;p=fg(s|0,p|0,u^b|0,o|0)|0;s=z;o=_e(u^b,o,17)|0;b=z^s;s=_e(p,s,32)|0;u=z;v=fg(o^p|0,b|0,q|0,v|0)|0;t=z;b=_e(o^p,b,13)|0;p=z^t;t=_e(v,t,32)|0;o=z;u=fg(s|0,u|0,q^c|0,r|0)|0;s=z;r=_e(q^c,r,16)|0;c=z^s;o=fg(r^u|0,c|0,t|0,o|0)|0;t=z;c=_e(r^u,c,21)|0;r=t^z;s=fg(b^v|0,p|0,u|0,s|0)|0;u=z;p=_e(b^v,p,17)|0;v=z^u;u=_e(s,u,32)|0;b=z;t=fg(o^e|0,t^f|0,p^s|0,v|0)|0;q=z;v=_e(p^s,v,13)|0;s=z^q;q=_e(t,q,32)|0;p=z;b=fg(u^238|0,b|0,o^c|0,r|0)|0;u=z;r=_e(o^c,r,16)|0;c=z^u;p=fg(r^b|0,c|0,q|0,p|0)|0;q=z;c=_e(r^b,c,21)|0;r=q^z;u=fg(b|0,u|0,v^t|0,s|0)|0;b=z;s=_e(v^t,s,17)|0;t=z^b;b=_e(u,b,32)|0;v=z;q=fg(s^u|0,t|0,p|0,q|0)|0;o=z;t=_e(s^u,t,13)|0;u=z^o;o=_e(q,o,32)|0;s=z;v=fg(b|0,v|0,p^c|0,r|0)|0;b=z;r=_e(p^c,r,16)|0;c=z^b;s=fg(r^v|0,c|0,o|0,s|0)|0;o=z;c=_e(r^v,c,21)|0;r=o^z;b=fg(t^q|0,u|0,v|0,b|0)|0;v=z;u=_e(t^q,u,17)|0;q=z^v;v=_e(b,v,32)|0;t=z;o=fg(u^b|0,q|0,s|0,o|0)|0;p=z;q=_e(u^b,q,13)|0;b=z^p;p=_e(o,p,32)|0;u=z;t=fg(v|0,t|0,s^c|0,r|0)|0;v=z;r=_e(s^c,r,16)|0;c=z^v;u=fg(r^t|0,c|0,p|0,u|0)|0;p=z;c=_e(r^t,c,21)|0;r=p^z;v=fg(q^o|0,b|0,t|0,v|0)|0;t=z;b=_e(q^o,b,17)|0;o=z^t;t=_e(v,t,32)|0;q=z;p=fg(b^v|0,o|0,u|0,p|0)|0;s=z;o=_e(b^v,o,13)|0;v=z^s;s=_e(p,s,32)|0;b=z;q=fg(t|0,q|0,u^c|0,r|0)|0;t=z;r=_e(u^c,r,16)|0;c=z^t;b=fg(r^q|0,c|0,s|0,b|0)|0;s=z;c=_e(r^q,c,21)|0;r=s^z;t=fg(o^p|0,v|0,q|0,t|0)|0;q=z;v=_e(o^p,v,17)|0;p=z^q;q=_e(t,q,32)|0;o=z;re(a,v^t^b^q^(b^c),p^s^o^r);s=fg(v^t^221|0,p|0,b|0,s|0)|0;u=z;p=_e(v^t^221,p,13)|0;t=z^u;u=_e(s,u,32)|0;v=z;o=fg(q|0,o|0,b^c|0,r|0)|0;q=z;r=_e(b^c,r,16)|0;c=z^q;v=fg(r^o|0,c|0,u|0,v|0)|0;u=z;c=_e(r^o,c,21)|0;r=u^z;q=fg(p^s|0,t|0,o|0,q|0)|0;o=z;t=_e(p^s,t,17)|0;s=z^o;o=_e(q,o,32)|0;p=z;u=fg(t^q|0,s|0,v|0,u|0)|0;b=z;s=_e(t^q,s,13)|0;q=z^b;b=_e(u,b,32)|0;t=z;p=fg(o|0,p|0,v^c|0,r|0)|0;o=z;r=_e(v^c,r,16)|0;c=z^o;t=fg(r^p|0,c|0,b|0,t|0)|0;b=z;c=_e(r^p,c,21)|0;r=b^z;o=fg(s^u|0,q|0,p|0,o|0)|0;p=z;q=_e(s^u,q,17)|0;u=z^p;p=_e(o,p,32)|0;s=z;b=fg(q^o|0,u|0,t|0,b|0)|0;v=z;u=_e(q^o,u,13)|0;o=z^v;v=_e(b,v,32)|0;q=z;s=fg(p|0,s|0,t^c|0,r|0)|0;p=z;r=_e(t^c,r,16)|0;c=z^p;q=fg(r^s|0,c|0,v|0,q|0)|0;v=z;c=_e(r^s,c,21)|0;r=v^z;p=fg(u^b|0,o|0,s|0,p|0)|0;s=z;o=_e(u^b,o,17)|0;b=z^s;s=_e(p,s,32)|0;u=z;v=fg(o^p|0,b|0,q|0,v|0)|0;t=z;b=_e(o^p,b,13)|0;t=z^t;u=fg(s|0,u|0,q^c|0,r|0)|0;s=z;r=_e(q^c,r,16)|0;r=_e(r^u,z^s,21)|0;c=z;s=fg(b^v|0,t|0,u|0,s|0)|0;u=z;t=_e(b^v,t,17)|0;v=z;b=_e(s,u,32)|0;re(a+8|0,r^s^t^b,c^u^v^z);return 0}function ua(a,b,c,e,f){a=a|0;b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;m=Te(f)|0;o=z;g=Te(f+8|0)|0;h=z;e=vf(c|0,e|0,56)|0;f=z;if((b+c+(0-(c&7))|0)==(b|0)){q=g^2037671283;j=h^1952801890;n=m^1886610805;k=o^1936682341;i=g^1852075885;r=h^1685025377;h=m^1852142177;g=o^1819895653}else{s=b;q=g^2037671283;j=h^1952801890;n=m^1886610805;l=o^1936682341;k=g^1852075885;i=h^1685025377;h=m^1852142177;g=o^1819895653;while(1){p=Te(s)|0;t=z;v=p^q;j=t^j;l=fg(n|0,l|0,k|0,i|0)|0;r=z;n=_e(k,i,13)|0;k=z^r;r=_e(l,r,32)|0;q=z;m=fg(v|0,j|0,h|0,g|0)|0;o=z;j=_e(v,j,16)|0;i=z^o;q=fg(j^m|0,i|0,r|0,q|0)|0;r=z;i=_e(j^m,i,21)|0;j=r^z;o=fg(m|0,o|0,n^l|0,k|0)|0;m=z;k=_e(n^l,k,17)|0;g=z^m;m=_e(o,m,32)|0;h=z;r=fg(k^o|0,g|0,q|0,r|0)|0;l=z;g=_e(k^o,g,13)|0;o=z^l;l=_e(r,l,32)|0;k=z;h=fg(m|0,h|0,q^i|0,j|0)|0;m=z;j=_e(q^i,j,16)|0;i=z^m;k=fg(j^h|0,i|0,l|0,k|0)|0;l=z;i=_e(j^h,i,21)|0;j=l^z;m=fg(g^r|0,o|0,h|0,m|0)|0;h=z;o=_e(g^r,o,17)|0;r=z^h;h=_e(m,h,32)|0;g=z;s=s+8|0;if((s|0)==(b+c+(0-(c&7))|0)){b=b+c+(0-(c&7))|0;q=k^i;n=k^p;k=l^t;i=o^m;break}else{q=k^i;n=k^p;l=l^t;k=o^m;i=r}}}switch(c&7){case 7:{e=vf(d[b+6>>0]|0|0,0,48)|0|e;f=z|f;u=5;break}case 6:{u=5;break}case 5:{u=6;break}case 4:{u=7;break}case 3:{u=8;break}case 2:{u=9;break}case 1:{u=10;break}default:{}}if((u|0)==5){v=vf(d[b+5>>0]|0|0,0,40)|0;f=z|f;e=v|e;u=6}if((u|0)==6){f=d[b+4>>0]|0|f;u=7}if((u|0)==7){v=vf(d[b+3>>0]|0|0,0,24)|0;e=v|e;f=z|f;u=8}if((u|0)==8){v=vf(d[b+2>>0]|0|0,0,16)|0;e=v|e;f=z|f;u=9}if((u|0)==9){v=vf(d[b+1>>0]|0|0,0,8)|0;e=v|e;f=z|f;u=10}if((u|0)==10)e=d[b>>0]|0|e;s=e^q;c=f^j;o=fg(n|0,k|0,i|0,r|0)|0;p=z;q=_e(i,r,13)|0;b=z^p;p=_e(o,p,32)|0;u=z;t=fg(s|0,c|0,h|0,g|0)|0;v=z;r=_e(s,c,16)|0;c=z^v;u=fg(r^t|0,c|0,p|0,u|0)|0;p=z;c=_e(r^t,c,21)|0;r=p^z;v=fg(t|0,v|0,q^o|0,b|0)|0;t=z;b=_e(q^o,b,17)|0;o=z^t;t=_e(v,t,32)|0;q=z;p=fg(b^v|0,o|0,u|0,p|0)|0;s=z;o=_e(b^v,o,13)|0;v=z^s;s=_e(p,s,32)|0;b=z;q=fg(t|0,q|0,u^c|0,r|0)|0;t=z;r=_e(u^c,r,16)|0;c=z^t;b=fg(r^q|0,c|0,s|0,b|0)|0;s=z;c=_e(r^q,c,21)|0;r=s^z;t=fg(o^p|0,v|0,q|0,t|0)|0;q=z;v=_e(o^p,v,17)|0;p=z^q;q=_e(t,q,32)|0;o=z;s=fg(b^e|0,s^f|0,v^t|0,p|0)|0;u=z;p=_e(v^t,p,13)|0;t=z^u;u=_e(s,u,32)|0;v=z;o=fg(q^255|0,o|0,b^c|0,r|0)|0;q=z;r=_e(b^c,r,16)|0;c=z^q;v=fg(r^o|0,c|0,u|0,v|0)|0;u=z;c=_e(r^o,c,21)|0;r=u^z;q=fg(o|0,q|0,p^s|0,t|0)|0;o=z;t=_e(p^s,t,17)|0;s=z^o;o=_e(q,o,32)|0;p=z;u=fg(t^q|0,s|0,v|0,u|0)|0;b=z;s=_e(t^q,s,13)|0;q=z^b;b=_e(u,b,32)|0;t=z;p=fg(o|0,p|0,v^c|0,r|0)|0;o=z;r=_e(v^c,r,16)|0;c=z^o;t=fg(r^p|0,c|0,b|0,t|0)|0;b=z;c=_e(r^p,c,21)|0;r=b^z;o=fg(s^u|0,q|0,p|0,o|0)|0;p=z;q=_e(s^u,q,17)|0;u=z^p;p=_e(o,p,32)|0;s=z;b=fg(q^o|0,u|0,t|0,b|0)|0;v=z;u=_e(q^o,u,13)|0;o=z^v;v=_e(b,v,32)|0;q=z;s=fg(p|0,s|0,t^c|0,r|0)|0;p=z;r=_e(t^c,r,16)|0;c=z^p;q=fg(r^s|0,c|0,v|0,q|0)|0;v=z;c=_e(r^s,c,21)|0;r=v^z;p=fg(u^b|0,o|0,s|0,p|0)|0;s=z;o=_e(u^b,o,17)|0;b=z^s;s=_e(p,s,32)|0;u=z;v=fg(o^p|0,b|0,q|0,v|0)|0;t=z;b=_e(o^p,b,13)|0;t=z^t;u=fg(s|0,u|0,q^c|0,r|0)|0;s=z;r=_e(q^c,r,16)|0;r=_e(r^u,z^s,21)|0;c=z;s=fg(b^v|0,t|0,u|0,s|0)|0;u=z;t=_e(b^v,t,17)|0;v=z;b=_e(s,u,32)|0;re(a,r^s^t^b,c^u^v^z);return 0}function va(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0;T=l;S=l=l+63&-64;l=l+64|0;if(!((f|0)==0&(g|0)==0)){if(g>>>0>63|(g|0)==63&f>>>0>4294967232)Z();E=c[b>>2]|0;F=c[b+4>>2]|0;G=c[b+8>>2]|0;H=c[b+12>>2]|0;I=c[b+16>>2]|0;J=c[b+20>>2]|0;K=c[b+24>>2]|0;L=c[b+28>>2]|0;M=c[b+32>>2]|0;N=c[b+36>>2]|0;O=c[b+40>>2]|0;P=c[b+44>>2]|0;Q=c[b+56>>2]|0;R=c[b+60>>2]|0;h=0;B=c[b+52>>2]|0;y=c[b+48>>2]|0;C=g;D=f;while(1){A=C>>>0<0|(C|0)==0&D>>>0<64;if(A){g=S;f=g+64|0;do{a[g>>0]=0;g=g+1|0}while((g|0)<(f|0));g=0;do{a[S+g>>0]=a[d+g>>0]|0;g=g+1|0}while(0<C>>>0|0==(C|0)&g>>>0<D>>>0);h=e;d=S;e=S}g=E;f=F;i=G;j=H;k=I;m=J;n=K;o=L;p=M;q=N;r=O;s=R;t=Q;u=B;v=y;w=P;x=20;do{ma=g+k|0;ba=xh(ma^v,16)|0;aa=ba+p|0;na=xh(aa^k,12)|0;ba=xh(na+ma^ba,8)|0;Y=xh(ba+aa^na,7)|0;ia=f+m|0;W=xh(ia^u,16)|0;V=W+q|0;ja=xh(V^m,12)|0;W=xh(ja+ia^W,8)|0;oa=xh(W+V^ja,7)|0;da=i+n|0;X=xh(da^t,16)|0;ca=X+r|0;ea=xh(ca^n,12)|0;X=xh(ea+da^X,8)|0;ka=xh(X+ca^ea,7)|0;_=j+o|0;ga=xh(_^s,16)|0;U=ga+w|0;$=xh(U^o,12)|0;ga=xh($+_^ga,8)|0;fa=xh(ga+U^$,7)|0;la=xh(ga^oa+(na+ma),16)|0;ha=xh(la+(X+ca)^oa,12)|0;g=ha+(oa+(na+ma))|0;s=xh(g^la,8)|0;r=s+(la+(X+ca))|0;m=xh(r^ha,7)|0;ha=xh(ka+(ja+ia)^ba,16)|0;ca=xh(ha+(ga+U)^ka,12)|0;f=ca+(ka+(ja+ia))|0;v=xh(f^ha,8)|0;w=v+(ha+(ga+U))|0;n=xh(w^ca,7)|0;ca=xh(fa+(ea+da)^W,16)|0;U=xh(ca+(ba+aa)^fa,12)|0;i=U+(fa+(ea+da))|0;u=xh(i^ca,8)|0;p=u+(ca+(ba+aa))|0;o=xh(p^U,7)|0;X=xh($+_+Y^X,16)|0;U=xh(X+(W+V)^Y,12)|0;j=U+($+_+Y)|0;t=xh(j^X,8)|0;q=t+(X+(W+V))|0;k=xh(q^U,7)|0;x=x+-2|0}while((x|0)!=0);$=(Rg(d)|0)^g+E;aa=(Rg(d+4|0)|0)^f+F;ba=(Rg(d+8|0)|0)^i+G;ca=(Rg(d+12|0)|0)^j+H;da=(Rg(d+16|0)|0)^k+I;ea=(Rg(d+20|0)|0)^m+J;fa=(Rg(d+24|0)|0)^n+K;ga=(Rg(d+28|0)|0)^o+L;ha=(Rg(d+32|0)|0)^p+M;ia=(Rg(d+36|0)|0)^q+N;ja=(Rg(d+40|0)|0)^r+O;ka=(Rg(d+44|0)|0)^w+P;la=(Rg(d+48|0)|0)^v+y;ma=(Rg(d+52|0)|0)^u+B;na=(Rg(d+56|0)|0)^t+Q;oa=(Rg(d+60|0)|0)^s+R;f=y+1|0;g=((f|0)==0&1)+B|0;jg(e,$);jg(e+4|0,aa);jg(e+8|0,ba);jg(e+12|0,ca);jg(e+16|0,da);jg(e+20|0,ea);jg(e+24|0,fa);jg(e+28|0,ga);jg(e+32|0,ha);jg(e+36|0,ia);jg(e+40|0,ja);jg(e+44|0,ka);jg(e+48|0,la);jg(e+52|0,ma);jg(e+56|0,na);jg(e+60|0,oa);if(C>>>0<0|(C|0)==0&D>>>0<65)break;oa=fg(D|0,C|0,-64,-1)|0;d=d+64|0;e=e+64|0;B=g;y=f;C=z;D=oa}if(A?D|0:0){d=0;do{a[h+d>>0]=a[e+d>>0]|0;d=d+1|0}while((d|0)!=(D|0))}c[b+48>>2]=f;c[b+52>>2]=g}l=T;return}function wa(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0;s=a[b+80>>0]|0?0:16777216;t=c[b+4>>2]|0;o=c[b+8>>2]|0;p=c[b+12>>2]|0;q=c[b+16>>2]|0;k=c[b+20>>2]|0;j=c[b+24>>2]|0;i=c[b+28>>2]|0;h=c[b+32>>2]|0;g=c[b+36>>2]|0;if(f>>>0>0|(f|0)==0&e>>>0>15){r=c[b>>2]|0;m=e;while(1){y=((Rg(d)|0)&67108863)+k|0;A=((Rg(d+3|0)|0)>>>2&67108863)+j|0;x=((Rg(d+6|0)|0)>>>4&67108863)+i|0;w=((Rg(d+9|0)|0)>>>6)+h|0;k=((Rg(d+12|0)|0)>>>8|s)+g|0;g=af(y|0,0,r|0,0)|0;e=z;i=af(A|0,0,q*5|0,0)|0;e=fg(i|0,z|0,g|0,e|0)|0;g=z;i=af(x|0,0,p*5|0,0)|0;i=fg(e|0,g|0,i|0,z|0)|0;g=z;e=af(w|0,0,o*5|0,0)|0;e=fg(i|0,g|0,e|0,z|0)|0;g=z;i=af(k|0,0,t*5|0,0)|0;i=fg(e|0,g|0,i|0,z|0)|0;g=z;e=af(y|0,0,t|0,0)|0;l=z;v=af(A|0,0,r|0,0)|0;l=fg(v|0,z|0,e|0,l|0)|0;e=z;v=af(x|0,0,q*5|0,0)|0;v=fg(l|0,e|0,v|0,z|0)|0;e=z;l=af(w|0,0,p*5|0,0)|0;l=fg(v|0,e|0,l|0,z|0)|0;e=z;v=af(k|0,0,o*5|0,0)|0;v=fg(l|0,e|0,v|0,z|0)|0;e=z;l=af(y|0,0,o|0,0)|0;n=z;u=af(A|0,0,t|0,0)|0;n=fg(u|0,z|0,l|0,n|0)|0;l=z;u=af(x|0,0,r|0,0)|0;u=fg(n|0,l|0,u|0,z|0)|0;l=z;n=af(w|0,0,q*5|0,0)|0;n=fg(u|0,l|0,n|0,z|0)|0;l=z;u=af(k|0,0,p*5|0,0)|0;u=fg(n|0,l|0,u|0,z|0)|0;l=z;n=af(y|0,0,p|0,0)|0;h=z;j=af(A|0,0,o|0,0)|0;h=fg(j|0,z|0,n|0,h|0)|0;n=z;j=af(x|0,0,t|0,0)|0;j=fg(h|0,n|0,j|0,z|0)|0;n=z;h=af(w|0,0,r|0,0)|0;h=fg(j|0,n|0,h|0,z|0)|0;n=z;j=af(k|0,0,q*5|0,0)|0;j=fg(h|0,n|0,j|0,z|0)|0;n=z;h=af(y|0,0,q|0,0)|0;y=z;A=af(A|0,0,p|0,0)|0;y=fg(A|0,z|0,h|0,y|0)|0;h=z;x=af(x|0,0,o|0,0)|0;x=fg(y|0,h|0,x|0,z|0)|0;h=z;w=af(w|0,0,t|0,0)|0;w=fg(x|0,h|0,w|0,z|0)|0;h=z;k=af(k|0,0,r|0,0)|0;k=fg(w|0,h|0,k|0,z|0)|0;h=z;g=yf(i|0,g|0,26)|0;g=fg(v|0,e|0,g|0,0)|0;e=yf(g|0,z|0,26)|0;e=fg(u|0,l|0,e|0,0)|0;l=yf(e|0,z|0,26)|0;l=fg(j|0,n|0,l|0,0)|0;n=yf(l|0,z|0,26)|0;n=fg(k|0,h|0,n|0,0)|0;h=yf(n|0,z|0,26)|0;m=fg(m|0,f|0,-16,-1)|0;f=z;if(!(f>>>0>0|(f|0)==0&m>>>0>15)){k=(h*5|0)+i&67108863;j=(((h*5|0)+(i&67108863)|0)>>>26)+(g&67108863)|0;i=e&67108863;h=l&67108863;g=n&67108863;break}else{k=(h*5|0)+i&67108863;j=(((h*5|0)+(i&67108863)|0)>>>26)+(g&67108863)|0;i=e&67108863;h=l&67108863;g=n&67108863;d=d+16|0}}}c[b+20>>2]=k;c[b+24>>2]=j;c[b+28>>2]=i;c[b+32>>2]=h;c[b+36>>2]=g;return}function xa(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0;y=Qd(d)|0;k=z;x=df(a[d+4>>0]|0,a[d+5>>0]|0,a[d+6>>0]|0)|0;x=vf(x|0,z|0,6)|0;l=z;w=df(a[d+7>>0]|0,a[d+8>>0]|0,a[d+9>>0]|0)|0;w=vf(w|0,z|0,5)|0;i=z;t=df(a[d+10>>0]|0,a[d+11>>0]|0,a[d+12>>0]|0)|0;t=vf(t|0,z|0,3)|0;j=z;s=df(a[d+13>>0]|0,a[d+14>>0]|0,a[d+15>>0]|0)|0;s=vf(s|0,z|0,2)|0;g=z;f=Qd(d+16|0)|0;h=z;p=df(a[d+20>>0]|0,a[d+21>>0]|0,a[d+22>>0]|0)|0;p=vf(p|0,z|0,7)|0;e=z;v=df(a[d+23>>0]|0,a[d+24>>0]|0,a[d+25>>0]|0)|0;v=vf(v|0,z|0,5)|0;u=z;n=df(a[d+26>>0]|0,a[d+27>>0]|0,a[d+28>>0]|0)|0;n=vf(n|0,z|0,4)|0;o=z;r=df(a[d+29>>0]|0,a[d+30>>0]|0,a[d+31>>0]|0)|0;r=vf(r|0,z|0,2)|0;d=fg(r&33554428|0,0,16777216,0)|0;d=yf(d|0,z|0,25)|0;q=z;A=cg(0,0,d|0,q|0)|0;k=fg(A&19|0,0,y|0,k|0)|0;y=z;q=vf(d|0,q|0,25)|0;d=z;A=fg(x|0,l|0,16777216,0)|0;A=Xe(A|0,z|0,25)|0;C=z;i=fg(A|0,C|0,w|0,i|0)|0;w=z;C=vf(A|0,C|0,25)|0;C=cg(x|0,l|0,C|0,z|0)|0;l=z;x=fg(t|0,j|0,16777216,0)|0;x=Xe(x|0,z|0,25)|0;A=z;g=fg(x|0,A|0,s|0,g|0)|0;s=z;A=vf(x|0,A|0,25)|0;A=cg(t|0,j|0,A|0,z|0)|0;j=z;t=fg(f|0,h|0,16777216,0)|0;t=Xe(t|0,z|0,25)|0;x=z;e=fg(p|0,e|0,t|0,x|0)|0;p=z;x=vf(t|0,x|0,25)|0;x=cg(f|0,h|0,x|0,z|0)|0;h=z;f=fg(v|0,u|0,16777216,0)|0;f=Xe(f|0,z|0,25)|0;t=z;o=fg(f|0,t|0,n|0,o|0)|0;n=z;t=vf(f|0,t|0,25)|0;f=z;B=fg(k|0,y|0,33554432,0)|0;B=Xe(B|0,z|0,26)|0;m=z;l=fg(C|0,l|0,B|0,m|0)|0;m=vf(B|0,m|0,26)|0;m=cg(k|0,y|0,m|0,z|0)|0;y=fg(i|0,w|0,33554432,0)|0;y=Xe(y|0,z|0,26)|0;k=z;j=fg(A|0,j|0,y|0,k|0)|0;k=vf(y|0,k|0,26)|0;k=cg(i|0,w|0,k|0,z|0)|0;w=fg(g|0,s|0,33554432,0)|0;w=Xe(w|0,z|0,26)|0;i=z;h=fg(x|0,h|0,w|0,i|0)|0;i=vf(w|0,i|0,26)|0;i=cg(g|0,s|0,i|0,z|0)|0;s=fg(e|0,p|0,33554432,0)|0;s=Xe(s|0,z|0,26)|0;g=z;u=fg(s|0,g|0,v|0,u|0)|0;f=cg(u|0,z|0,t|0,f|0)|0;g=vf(s|0,g|0,26)|0;g=cg(e|0,p|0,g|0,z|0)|0;p=fg(o|0,n|0,33554432,0)|0;p=Xe(p|0,z|0,26)|0;e=z;r=fg(p|0,e|0,r&33554428|0,0)|0;d=cg(r|0,z|0,q|0,d|0)|0;e=vf(p|0,e|0,26)|0;e=cg(o|0,n|0,e|0,z|0)|0;c[b>>2]=m;c[b+4>>2]=l;c[b+8>>2]=k;c[b+12>>2]=j;c[b+16>>2]=i;c[b+20>>2]=h;c[b+24>>2]=g;c[b+28>>2]=f;c[b+32>>2]=e;c[b+36>>2]=d;return}function ya(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;u=c[b>>2]|0;t=c[b+4>>2]|0;s=c[b+8>>2]|0;r=c[b+12>>2]|0;q=c[b+16>>2]|0;l=c[b+20>>2]|0;o=c[b+24>>2]|0;w=c[b+28>>2]|0;m=c[b+32>>2]|0;v=c[b+36>>2]|0;u=af(u|0,((u|0)<0)<<31>>31|0,121666,0)|0;j=z;t=af(t|0,((t|0)<0)<<31>>31|0,121666,0)|0;k=z;s=af(s|0,((s|0)<0)<<31>>31|0,121666,0)|0;h=z;r=af(r|0,((r|0)<0)<<31>>31|0,121666,0)|0;i=z;q=af(q|0,((q|0)<0)<<31>>31|0,121666,0)|0;f=z;l=af(l|0,((l|0)<0)<<31>>31|0,121666,0)|0;g=z;o=af(o|0,((o|0)<0)<<31>>31|0,121666,0)|0;d=z;w=af(w|0,((w|0)<0)<<31>>31|0,121666,0)|0;e=z;m=af(m|0,((m|0)<0)<<31>>31|0,121666,0)|0;n=z;v=af(v|0,((v|0)<0)<<31>>31|0,121666,0)|0;b=z;x=fg(v|0,b|0,16777216,0)|0;x=Xe(x|0,z|0,25)|0;p=z;y=af(x|0,p|0,19,0)|0;j=fg(y|0,z|0,u|0,j|0)|0;u=z;p=vf(x|0,p|0,25)|0;p=cg(v|0,b|0,p|0,z|0)|0;b=z;v=fg(t|0,k|0,16777216,0)|0;v=Xe(v|0,z|0,25)|0;x=z;h=fg(v|0,x|0,s|0,h|0)|0;s=z;x=vf(v|0,x|0,25)|0;x=cg(t|0,k|0,x|0,z|0)|0;k=z;t=fg(r|0,i|0,16777216,0)|0;t=Xe(t|0,z|0,25)|0;v=z;f=fg(t|0,v|0,q|0,f|0)|0;q=z;v=vf(t|0,v|0,25)|0;v=cg(r|0,i|0,v|0,z|0)|0;i=z;r=fg(l|0,g|0,16777216,0)|0;r=Xe(r|0,z|0,25)|0;t=z;d=fg(r|0,t|0,o|0,d|0)|0;o=z;t=vf(r|0,t|0,25)|0;t=cg(l|0,g|0,t|0,z|0)|0;g=z;l=fg(w|0,e|0,16777216,0)|0;l=Xe(l|0,z|0,25)|0;r=z;n=fg(l|0,r|0,m|0,n|0)|0;m=z;r=vf(l|0,r|0,25)|0;r=cg(w|0,e|0,r|0,z|0)|0;e=z;w=fg(j|0,u|0,33554432,0)|0;w=Xe(w|0,z|0,26)|0;l=z;k=fg(x|0,k|0,w|0,l|0)|0;l=vf(w|0,l|0,26)|0;l=cg(j|0,u|0,l|0,z|0)|0;u=fg(h|0,s|0,33554432,0)|0;u=Xe(u|0,z|0,26)|0;j=z;i=fg(v|0,i|0,u|0,j|0)|0;j=vf(u|0,j|0,26)|0;j=cg(h|0,s|0,j|0,z|0)|0;s=fg(f|0,q|0,33554432,0)|0;s=Xe(s|0,z|0,26)|0;h=z;g=fg(t|0,g|0,s|0,h|0)|0;h=vf(s|0,h|0,26)|0;h=cg(f|0,q|0,h|0,z|0)|0;q=fg(d|0,o|0,33554432,0)|0;q=Xe(q|0,z|0,26)|0;f=z;e=fg(r|0,e|0,q|0,f|0)|0;f=vf(q|0,f|0,26)|0;f=cg(d|0,o|0,f|0,z|0)|0;o=fg(n|0,m|0,33554432,0)|0;o=Xe(o|0,z|0,26)|0;d=z;b=fg(p|0,b|0,o|0,d|0)|0;d=vf(o|0,d|0,26)|0;d=cg(n|0,m|0,d|0,z|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function za(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;if(!b)if(!e){if(f|0){c[f>>2]=(a>>>0)%(d>>>0);c[f+4>>2]=0}e=0;f=(a>>>0)/(d>>>0)>>>0;return (z=e,f)|0}else{if(!f){e=0;f=0;return (z=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;e=0;f=0;return (z=e,f)|0}do if(d){if(e|0){h=(R(e|0)|0)-(R(b|0)|0)|0;if(h>>>0<=31){n=h+1|0;i=a>>>((h+1|0)>>>0)&h-31>>31|b<<31-h;m=b>>>((h+1|0)>>>0)&h-31>>31;g=0;h=a<<31-h;break}if(!f){e=0;f=0;return (z=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b|b&0;e=0;f=0;return (z=e,f)|0}if(d-1&d|0){h=(R(d|0)|0)+33-(R(b|0)|0)|0;n=h;i=32-h-1>>31&b>>>((h-32|0)>>>0)|(b<<32-h|a>>>(h>>>0))&h-32>>31;m=h-32>>31&b>>>(h>>>0);g=a<<64-h&32-h>>31;h=(b<<64-h|a>>>((h-32|0)>>>0))&32-h>>31|a<<32-h&h-33>>31;break}if(f|0){c[f>>2]=d-1&a;c[f+4>>2]=0}if((d|0)==1){e=b|b&0;f=a|0|0;return (z=e,f)|0}else{f=Yd(d|0)|0;e=b>>>(f>>>0)|0;f=b<<32-f|a>>>(f>>>0)|0;return (z=e,f)|0}}else{if(!e){if(f|0){c[f>>2]=(b>>>0)%(d>>>0);c[f+4>>2]=0}e=0;f=(b>>>0)/(d>>>0)>>>0;return (z=e,f)|0}if(!a){if(f|0){c[f>>2]=0;c[f+4>>2]=(b>>>0)%(e>>>0)}d=0;f=(b>>>0)/(e>>>0)>>>0;return (z=d,f)|0}if(!(e-1&e)){if(f|0){c[f>>2]=a|0;c[f+4>>2]=e-1&b|b&0}d=0;f=b>>>((Yd(e|0)|0)>>>0);return (z=d,f)|0}h=(R(e|0)|0)-(R(b|0)|0)|0;if(h>>>0<=30){n=h+1|0;i=b<<31-h|a>>>((h+1|0)>>>0);m=b>>>((h+1|0)>>>0);g=0;h=a<<31-h;break}if(!f){e=0;f=0;return (z=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b|b&0;e=0;f=0;return (z=e,f)|0}while(0);if(!n){j=h;b=m;a=0;h=0}else{k=fg(d|0|0,e|e&0|0,-1,-1)|0;l=z;j=h;b=m;a=n;h=0;do{p=j;j=g>>>31|j<<1;g=h|g<<1;p=i<<1|p>>>31|0;o=i>>>31|b<<1|0;cg(k|0,l|0,p|0,o|0)|0;n=z;m=n>>31|((n|0)<0?-1:0)<<1;h=m&1;i=cg(p|0,o|0,m&(d|0)|0,(((n|0)<0?-1:0)>>31|((n|0)<0?-1:0)<<1)&(e|e&0)|0)|0;b=z;a=a-1|0}while((a|0)!=0);a=0}if(f|0){c[f>>2]=i;c[f+4>>2]=b}o=(g|0)>>>31|j<<1|(0<<1|g>>>31)&0|a;p=(g<<1|0>>>31)&-2|h;return (z=o,p)|0}function Aa(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;if(!d){G=857760878;H=2036477234;I=1634760805;y=1797285236}else{I=Rg(d)|0;G=Rg(d+4|0)|0;H=Rg(d+8|0)|0;y=Rg(d+12|0)|0}z=Rg(c)|0;A=Rg(c+4|0)|0;B=Rg(c+8|0)|0;C=Rg(c+12|0)|0;D=Rg(c+16|0)|0;E=Rg(c+20|0)|0;F=Rg(c+24|0)|0;u=Rg(c+28|0)|0;v=Rg(b)|0;w=Rg(b+4|0)|0;x=Rg(b+8|0)|0;t=Rg(b+12|0)|0;if((e|0)>0){g=z;i=A;l=B;o=C;r=v;q=w;p=x;n=t;m=D;k=u;j=F;h=E;s=0;b=G;c=H;d=y;f=I;do{o=(xh(f+h|0,7)|0)^o;p=(xh(o+f|0,9)|0)^p;h=(xh(p+o|0,13)|0)^h;f=(xh(h+p|0,18)|0)^f;n=(xh(g+b|0,7)|0)^n;j=(xh(n+b|0,9)|0)^j;g=(xh(j+n|0,13)|0)^g;b=(xh(g+j|0,18)|0)^b;k=(xh(r+c|0,7)|0)^k;i=(xh(k+c|0,9)|0)^i;r=(xh(i+k|0,13)|0)^r;c=(xh(r+i|0,18)|0)^c;l=(xh(m+d|0,7)|0)^l;q=(xh(l+d|0,9)|0)^q;m=(xh(q+l|0,13)|0)^m;d=(xh(m+q|0,18)|0)^d;g=(xh(l+f|0,7)|0)^g;i=(xh(g+f|0,9)|0)^i;l=(xh(i+g|0,13)|0)^l;f=(xh(l+i|0,18)|0)^f;r=(xh(b+o|0,7)|0)^r;q=(xh(r+b|0,9)|0)^q;o=(xh(q+r|0,13)|0)^o;b=(xh(o+q|0,18)|0)^b;m=(xh(c+n|0,7)|0)^m;p=(xh(m+c|0,9)|0)^p;n=(xh(p+m|0,13)|0)^n;c=(xh(n+p|0,18)|0)^c;h=(xh(d+k|0,7)|0)^h;j=(xh(h+d|0,9)|0)^j;k=(xh(j+h|0,13)|0)^k;d=(xh(k+j|0,18)|0)^d;s=s+2|0}while((s|0)<(e|0))}else{g=z;i=A;l=B;o=C;r=v;q=w;p=x;n=t;m=D;k=u;j=F;h=E;f=I;b=G;c=H;d=y}jg(a,f+I|0);jg(a+4|0,g+z|0);jg(a+8|0,i+A|0);jg(a+12|0,l+B|0);jg(a+16|0,o+C|0);jg(a+20|0,b+G|0);jg(a+24|0,r+v|0);jg(a+28|0,q+w|0);jg(a+32|0,p+x|0);jg(a+36|0,n+t|0);jg(a+40|0,c+H|0);jg(a+44|0,m+D|0);jg(a+48|0,h+E|0);jg(a+52|0,j+F|0);jg(a+56|0,k+u|0);jg(a+60|0,d+y|0);return}function Ba(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+2272|0;Ab(g+2016|0,c);Ab(g+1760|0,e);Xd(g+480|0,d);ye(g+320|0,d);Id(g,g+320|0);Rb(g+320|0,g,g+480|0);Id(g+160|0,g+320|0);Xd(g+480+160|0,g+160|0);Rb(g+320|0,g,g+480+160|0);Id(g+160|0,g+320|0);Xd(g+480+320|0,g+160|0);Rb(g+320|0,g,g+480+320|0);Id(g+160|0,g+320|0);Xd(g+480+480|0,g+160|0);Rb(g+320|0,g,g+480+480|0);Id(g+160|0,g+320|0);Xd(g+480+640|0,g+160|0);Rb(g+320|0,g,g+480+640|0);Id(g+160|0,g+320|0);Xd(g+480+800|0,g+160|0);Rb(g+320|0,g,g+480+800|0);Id(g+160|0,g+320|0);Xd(g+480+960|0,g+160|0);Rb(g+320|0,g,g+480+960|0);Id(g+160|0,g+320|0);Xd(g+480+1120|0,g+160|0);Mf(b);c=255;while(1){if(a[g+2016+c>>0]|0)break;if(a[g+1760+c>>0]|0)break;d=c+-1|0;if((c|0)>0)c=d;else{c=d;break}}if((c|0)>-1)while(1){jc(g+320|0,b);d=a[g+2016+c>>0]|0;if(d<<24>>24<=0){if(d<<24>>24<0){Id(g+160|0,g+320|0);Qb(g+320|0,g+160|0,g+480+((((d<<24>>24)/-2|0)<<24>>24)*160|0)|0)}}else{Id(g+160|0,g+320|0);Rb(g+320|0,g+160|0,g+480+(((d&255)>>>1&255)*160|0)|0)}d=a[g+1760+c>>0]|0;if(d<<24>>24<=0){if(d<<24>>24<0){Id(g+160|0,g+320|0);Vb(g+320|0,g+160|0,1272+((((d<<24>>24)/-2|0)<<24>>24)*120|0)|0)}}else{Id(g+160|0,g+320|0);Wb(g+320|0,g+160|0,1272+(((d&255)>>>1&255)*120|0)|0)}ze(b,g+320|0);if((c|0)>0)c=c+-1|0;else break}l=f;return}function Ca(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;u=l;v=l=l+63&-64;l=l+64|0;Ef(v,a);b=0;e=c[v+44>>2]|0;f=c[v+60>>2]|0;g=c[v+12>>2]|0;h=c[v+28>>2]|0;i=c[v+48>>2]|0;j=c[v>>2]|0;k=c[v+16>>2]|0;m=c[v+32>>2]|0;d=c[v+4>>2]|0;n=c[v+20>>2]|0;o=c[v+36>>2]|0;p=c[v+52>>2]|0;q=c[v+24>>2]|0;r=c[v+40>>2]|0;s=c[v+56>>2]|0;t=c[v+8>>2]|0;do{F=i+j|0;F=(F<<7|F>>>25)^k;C=F+j|0;C=(C<<9|C>>>23)^m;z=(C+F<<13|(C+F|0)>>>19)^i;I=(z+C<<18|(z+C|0)>>>14)^j;B=d+n|0;B=(B<<7|B>>>25)^o;y=B+n|0;y=(y<<9|y>>>23)^p;L=(y+B<<13|(y+B|0)>>>19)^d;E=(L+y<<18|(L+y|0)>>>14)^n;x=q+r|0;x=(x<<7|x>>>25)^s;K=x+r|0;K=(K<<9|K>>>23)^t;H=(K+x<<13|(K+x|0)>>>19)^q;A=(H+K<<18|(H+K|0)>>>14)^r;J=e+f|0;J=(J<<7|J>>>25)^g;G=J+f|0;G=(G<<9|G>>>23)^h;D=(G+J<<13|(G+J|0)>>>19)^e;w=(D+G<<18|(D+G|0)>>>14)^f;d=(J+I<<7|(J+I|0)>>>25)^L;L=d+I|0;t=(L<<9|L>>>23)^K;K=t+d|0;g=(K<<13|K>>>19)^J;J=g+t|0;j=(J<<18|J>>>14)^I;q=(F+E<<7|(F+E|0)>>>25)^H;H=q+E|0;h=(H<<9|H>>>23)^G;G=h+q|0;k=(G<<13|G>>>19)^F;F=k+h|0;n=(F<<18|F>>>14)^E;e=(B+A<<7|(B+A|0)>>>25)^D;D=e+A|0;m=(D<<9|D>>>23)^C;C=m+e|0;o=(C<<13|C>>>19)^B;B=o+m|0;r=(B<<18|B>>>14)^A;i=(x+w<<7|(x+w|0)>>>25)^z;z=i+w|0;p=(z<<9|z>>>23)^y;y=p+i|0;s=(y<<13|y>>>19)^x;x=s+p|0;f=(x<<18|x>>>14)^w;b=b+2|0}while(b>>>0<8);c[v>>2]=j;c[v+48>>2]=i;c[v+16>>2]=k;c[v+32>>2]=m;c[v+20>>2]=n;c[v+4>>2]=d;c[v+36>>2]=o;c[v+52>>2]=p;c[v+40>>2]=r;c[v+24>>2]=q;c[v+56>>2]=s;c[v+8>>2]=t;c[v+60>>2]=f;c[v+44>>2]=e;c[v+12>>2]=g;c[v+28>>2]=h;c[a>>2]=(c[a>>2]|0)+j;b=1;while(1){L=a+(b<<2)|0;c[L>>2]=(c[L>>2]|0)+d;b=b+1|0;if((b|0)==16)break;d=c[v+(b<<2)>>2]|0}l=u;return}function Da(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;if(!d){d=1797285236;e=2036477234;f=857760878;g=1634760805}else{g=Rg(d)|0;f=Rg(d+4|0)|0;e=Rg(d+8|0)|0;d=Rg(d+12|0)|0}r=Rg(c)|0;q=Rg(c+4|0)|0;p=Rg(c+8|0)|0;o=Rg(c+12|0)|0;n=Rg(c+16|0)|0;m=Rg(c+20|0)|0;l=Rg(c+24|0)|0;k=Rg(c+28|0)|0;j=Rg(b)|0;i=Rg(b+4|0)|0;h=Rg(b+8|0)|0;s=0;b=Rg(b+12|0)|0;c=g;do{L=r+c|0;A=xh(j^L,16)|0;z=A+n|0;M=xh(z^r,12)|0;A=xh(M+L^A,8)|0;w=xh(A+z^M,7)|0;H=q+f|0;u=xh(i^H,16)|0;t=u+m|0;I=xh(t^q,12)|0;u=xh(I+H^u,8)|0;N=xh(u+t^I,7)|0;C=p+e|0;v=xh(h^C,16)|0;B=v+l|0;D=xh(B^p,12)|0;v=xh(D+C^v,8)|0;J=xh(v+B^D,7)|0;x=o+d|0;F=xh(b^x,16)|0;g=F+k|0;y=xh(g^o,12)|0;F=xh(y+x^F,8)|0;E=xh(F+g^y,7)|0;K=xh(F^N+(M+L),16)|0;G=xh(K+(v+B)^N,12)|0;c=G+(N+(M+L))|0;b=xh(c^K,8)|0;l=b+(K+(v+B))|0;q=xh(l^G,7)|0;G=xh(J+(I+H)^A,16)|0;B=xh(G+(F+g)^J,12)|0;f=B+(J+(I+H))|0;j=xh(f^G,8)|0;k=j+(G+(F+g))|0;p=xh(k^B,7)|0;B=xh(E+(D+C)^u,16)|0;g=xh(B+(A+z)^E,12)|0;e=g+(E+(D+C))|0;i=xh(e^B,8)|0;n=i+(B+(A+z))|0;o=xh(n^g,7)|0;v=xh(y+x+w^v,16)|0;g=xh(v+(u+t)^w,12)|0;d=g+(y+x+w)|0;h=xh(d^v,8)|0;m=h+(v+(u+t))|0;r=xh(m^g,7)|0;s=s+1|0}while((s|0)!=10);jg(a,c);jg(a+4|0,f);jg(a+8|0,e);jg(a+12|0,d);jg(a+16|0,j);jg(a+20|0,i);jg(a+24|0,h);jg(a+28|0,b);return 0}function Ea(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;n=l;m=l=l+63&-64;l=l+704|0;a:do if(!((e|0)==0&(f|0)==0)){r=c[b+72>>2]|0;p=c[b+72+4>>2]|0;k=yf(r|0,p|0,3)|0;o=vf(e|0,f|0,3)|0;q=z;i=yf(e|0,f|0,61)|0;j=z;p=fg(r|0,p|0,o|0,q|0)|0;r=z;c[b+72>>2]=p;c[b+72+4>>2]=r;g=c[b+64>>2]|0;h=c[b+64+4>>2]|0;if(r>>>0<q>>>0|(r|0)==(q|0)&p>>>0<o>>>0){g=fg(g|0,h|0,1,0)|0;h=z;c[b+64>>2]=g;c[b+64+4>>2]=h}j=fg(g|0,h|0,i|0,j|0)|0;c[b+64>>2]=j;c[b+64+4>>2]=z;j=cg(128,0,k&127|0,0)|0;g=z;if(g>>>0>f>>>0|(g|0)==(f|0)&j>>>0>e>>>0){g=0;h=0;while(1){q=a[d+g>>0]|0;r=fg(g|0,h|0,k&127|0,0)|0;a[b+80+r>>0]=q;g=fg(g|0,h|0,1,0)|0;h=z;if(!(h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0))break a}}if(!((j|0)==0&(g|0)==0)){h=0;i=0;do{q=a[d+h>>0]|0;r=fg(h|0,i|0,k&127|0,0)|0;a[b+80+r>>0]=q;h=fg(h|0,i|0,1,0)|0;i=z}while(i>>>0<g>>>0|(i|0)==(g|0)&h>>>0<j>>>0)}ja(b,b+80|0,m,m+640|0);g=cg(e|0,f|0,j|0,g|0)|0;h=z;if(h>>>0>0|(h|0)==0&g>>>0>127){i=d+j|0;do{ja(b,i,m,m+640|0);i=i+128|0;g=fg(g|0,h|0,-128,-1)|0;h=z}while(h>>>0>0|(h|0)==0&g>>>0>127);j=i}else j=d+j|0;g=g&127;if(!((g|0)==0&0==0)){h=0;i=0;do{a[b+80+h>>0]=a[j+h>>0]|0;h=fg(h|0,i|0,1,0)|0;i=z}while(i>>>0<0|(i|0)==0&h>>>0<g>>>0)}Sd(m,704)}while(0);l=n;return 0}function Fa(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;d=l=l+63&-64;l=l+160|0;qa(d+120|0,b);qa(d+80|0,d+120|0);qa(d+80|0,d+80|0);la(d+80|0,b,d+80|0);la(d+120|0,d+120|0,d+80|0);qa(d+40|0,d+120|0);la(d+80|0,d+80|0,d+40|0);qa(d+40|0,d+80|0);b=1;do{qa(d+40|0,d+40|0);b=b+1|0}while((b|0)!=5);la(d+80|0,d+40|0,d+80|0);qa(d+40|0,d+80|0);b=1;do{qa(d+40|0,d+40|0);b=b+1|0}while((b|0)!=10);la(d+40|0,d+40|0,d+80|0);qa(d,d+40|0);b=1;do{qa(d,d);b=b+1|0}while((b|0)!=20);la(d+40|0,d,d+40|0);qa(d+40|0,d+40|0);b=1;do{qa(d+40|0,d+40|0);b=b+1|0}while((b|0)!=10);la(d+80|0,d+40|0,d+80|0);qa(d+40|0,d+80|0);b=1;do{qa(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);la(d+40|0,d+40|0,d+80|0);qa(d,d+40|0);b=1;do{qa(d,d);b=b+1|0}while((b|0)!=100);la(d+40|0,d,d+40|0);qa(d+40|0,d+40|0);b=1;do{qa(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);la(d+80|0,d+40|0,d+80|0);qa(d+80|0,d+80|0);b=1;do{qa(d+80|0,d+80|0);b=b+1|0}while((b|0)!=5);la(a,d+80|0,d+120|0);l=c;return}function Ga(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;if(!d){d=1797285236;e=2036477234;f=857760878;o=1634760805}else{o=Rg(d)|0;f=Rg(d+4|0)|0;e=Rg(d+8|0)|0;d=Rg(d+12|0)|0}n=Rg(c)|0;m=Rg(c+4|0)|0;l=Rg(c+8|0)|0;k=Rg(c+12|0)|0;t=Rg(c+16|0)|0;s=Rg(c+20|0)|0;r=Rg(c+24|0)|0;q=Rg(c+28|0)|0;j=Rg(b)|0;i=Rg(b+4|0)|0;h=Rg(b+8|0)|0;g=Rg(b+12|0)|0;p=20;b=f;c=o;while(1){B=(xh(s+c|0,7)|0)^k;y=(xh(B+c|0,9)|0)^h;v=(xh(y+B|0,13)|0)^s;E=(xh(v+y|0,18)|0)^c;x=(xh(b+n|0,7)|0)^g;u=(xh(x+b|0,9)|0)^r;H=(xh(u+x|0,13)|0)^n;A=(xh(H+u|0,18)|0)^b;f=(xh(e+j|0,7)|0)^q;G=(xh(f+e|0,9)|0)^m;D=(xh(G+f|0,13)|0)^j;w=(xh(D+G|0,18)|0)^e;F=(xh(d+t|0,7)|0)^l;C=(xh(F+d|0,9)|0)^i;z=(xh(C+F|0,13)|0)^t;o=(xh(z+C|0,18)|0)^d;n=(xh(F+E|0,7)|0)^H;m=(xh(n+E|0,9)|0)^G;l=(xh(m+n|0,13)|0)^F;c=(xh(l+m|0,18)|0)^E;j=(xh(A+B|0,7)|0)^D;i=(xh(j+A|0,9)|0)^C;k=(xh(i+j|0,13)|0)^B;b=(xh(k+i|0,18)|0)^A;t=(xh(w+x|0,7)|0)^z;h=(xh(t+w|0,9)|0)^y;g=(xh(h+t|0,13)|0)^x;e=(xh(g+h|0,18)|0)^w;s=(xh(o+f|0,7)|0)^v;r=(xh(s+o|0,9)|0)^u;q=(xh(r+s|0,13)|0)^f;d=(xh(q+r|0,18)|0)^o;if((p|0)<=2)break;else p=p+-2|0}jg(a,c);jg(a+4|0,b);jg(a+8|0,e);jg(a+12|0,d);jg(a+16|0,j);jg(a+20|0,i);jg(a+24|0,h);jg(a+28|0,g);return 0}function Ha(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;d=l;e=l=l+63&-64;l=l+128|0;qa(e+80|0,b);qa(e+40|0,e+80|0);qa(e+40|0,e+40|0);la(e+40|0,b,e+40|0);la(e+80|0,e+80|0,e+40|0);qa(e+80|0,e+80|0);la(e+80|0,e+40|0,e+80|0);qa(e+40|0,e+80|0);c=1;do{qa(e+40|0,e+40|0);c=c+1|0}while((c|0)!=5);la(e+80|0,e+40|0,e+80|0);qa(e+40|0,e+80|0);c=1;do{qa(e+40|0,e+40|0);c=c+1|0}while((c|0)!=10);la(e+40|0,e+40|0,e+80|0);qa(e,e+40|0);c=1;do{qa(e,e);c=c+1|0}while((c|0)!=20);la(e+40|0,e,e+40|0);qa(e+40|0,e+40|0);c=1;do{qa(e+40|0,e+40|0);c=c+1|0}while((c|0)!=10);la(e+80|0,e+40|0,e+80|0);qa(e+40|0,e+80|0);c=1;do{qa(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);la(e+40|0,e+40|0,e+80|0);qa(e,e+40|0);c=1;do{qa(e,e);c=c+1|0}while((c|0)!=100);la(e+40|0,e,e+40|0);qa(e+40|0,e+40|0);c=1;do{qa(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);la(e+80|0,e+40|0,e+80|0);qa(e+80|0,e+80|0);qa(e+80|0,e+80|0);la(a,e+80|0,b);l=d;return}function Ia(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;o=l;k=l=l+63&-64;l=l+16|0;do if(d>>>0>=12){f=b;g=34163;h=f+12|0;do{a[f>>0]=a[g>>0]|0;f=f+1|0;g=g+1|0}while((f|0)<(h|0));f=hb(e)|0;if(!f){fd(k,19);h=uc(k)|0;g=b+11+h|0;if((d+-11|0)>>>0<=h>>>0){f=-31;break}fb(b+11|0,k|0,h+1|0)|0;if((d+-11-h|0)>>>0>=4){a[g>>0]=36;a[g+1>>0]=109;a[g+2>>0]=61;a[g+3>>0]=0;fd(k,c[e+44>>2]|0);f=uc(k)|0;i=g+3+f|0;j=d+-11-h+-3-f|0;if((d+-11-h+-3|0)>>>0<=f>>>0){f=-31;break}fb(g+3|0,k|0,f+1|0)|0;if(j>>>0>=4){a[i>>0]=44;a[i+1>>0]=116;a[i+2>>0]=61;a[i+3>>0]=0;fd(k,c[e+40>>2]|0);f=uc(k)|0;b=i+3+f|0;if((j+-3|0)>>>0<=f>>>0){f=-31;break}fb(i+3|0,k|0,f+1|0)|0;if((j+-3-f|0)>>>0>=4){a[b>>0]=44;a[b+1>>0]=112;a[b+2>>0]=61;a[b+3>>0]=0;fd(k,c[e+48>>2]|0);g=uc(k)|0;h=j+-3-f+-3-g|0;if((j+-3-f+-3|0)>>>0<=g>>>0){f=-31;break}fb(b+3|0,k|0,g+1|0)|0;f=b+3+g+1|0;if(h>>>0>=2?(a[b+3+g>>0]=36,a[b+3+g+1>>0]=0,k=Eb(f,h+-1|0,c[e+16>>2]|0,c[e+20>>2]|0)|0,n=h+-1-((k|0)==-1?0:k)|0,m=(k|0)==-1?f:f+k|0,!((k|0)==-1|n>>>0<2)):0){a[m>>0]=36;a[m+1>>0]=0;e=(Eb(m+1|0,n+-1|0,c[e>>2]|0,c[e+4>>2]|0)|0)!=-1;l=o;return (e?0:-31)|0}else f=-31}else f=-31}else f=-31}else f=-31}}else f=-31;while(0);l=o;return f|0}function Ja(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=c[d>>2]|0;h=c[d+4>>2]|0;i=c[d+8>>2]|0;j=c[d+12>>2]|0;p=c[d+16>>2]|0;f=c[d+20>>2]|0;g=c[d+24>>2]|0;n=c[d+28>>2]|0;e=c[d+32>>2]|0;d=c[d+36>>2]|0;o=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m>>26;m=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m-(o<<26)|0;l=o+h-(o+h>>25<<25)|0;k=(o+h>>25)+i-((o+h>>25)+i>>26<<26)|0;q=((o+h>>25)+i>>26)+j>>25;j=((o+h>>25)+i>>26)+j-(q<<25)|0;i=q+p-(q+p>>26<<26)|0;h=(q+p>>26)+f-((q+p>>26)+f>>25<<25)|0;o=((q+p>>26)+f>>25)+g>>26;g=((q+p>>26)+f>>25)+g-(o<<26)|0;f=o+n-(o+n>>25<<25)|0;d=((o+n>>25)+e>>26)+d|0;e=(o+n>>25)+e-((o+n>>25)+e>>26<<26)|0;a[b>>0]=m;a[b+1>>0]=m>>>8;a[b+2>>0]=m>>>16;a[b+3>>0]=l<<2|m>>>24;a[b+4>>0]=l>>>6;a[b+5>>0]=l>>>14;a[b+6>>0]=k<<3|l>>>22;a[b+7>>0]=k>>>5;a[b+8>>0]=k>>>13;a[b+9>>0]=j<<5|k>>>21;a[b+10>>0]=j>>>3;a[b+11>>0]=j>>>11;a[b+12>>0]=i<<6|j>>>19;a[b+13>>0]=i>>>2;a[b+14>>0]=i>>>10;a[b+15>>0]=i>>>18;a[b+16>>0]=h;a[b+17>>0]=h>>>8;a[b+18>>0]=h>>>16;a[b+19>>0]=g<<1|h>>>24;a[b+20>>0]=g>>>7;a[b+21>>0]=g>>>15;a[b+22>>0]=f<<3|g>>>23;a[b+23>>0]=f>>>5;a[b+24>>0]=f>>>13;a[b+25>>0]=e<<4|f>>>21;a[b+26>>0]=e>>>4;a[b+27>>0]=e>>>12;a[b+28>>0]=e>>>20|(d&33554431)<<6;a[b+29>>0]=d>>>2;a[b+30>>0]=d>>>10;a[b+31>>0]=(d&33554431)>>>18;return}function Ka(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,i=0;h=l;i=l=l+63&-64;l=l+320|0;g=i+280|0;f=g+32|0;do{a[g>>0]=a[c>>0]|0;g=g+1|0;c=c+1|0}while((g|0)<(f|0));a[i+280>>0]=a[i+280>>0]&-8;a[i+280+31>>0]=a[i+280+31>>0]&63|64;xa(i+240|0,e);Bf(i+200|0);lg(i+160|0);qc(i+120|0,i+240|0);Bf(i+80|0);c=0;f=254;while(1){g=c;c=(d[i+280+(f>>>3)>>0]|0)>>>(f&7)&1;g=c^g;bb(i+200|0,i+120|0,g);bb(i+160|0,i+80|0,g);Fb(i+40|0,i+120|0,i+80|0);Fb(i,i+200|0,i+160|0);Gb(i+200|0,i+200|0,i+160|0);Gb(i+160|0,i+120|0,i+80|0);la(i+80|0,i+40|0,i+200|0);la(i+160|0,i+160|0,i);qa(i+40|0,i);qa(i,i+200|0);Gb(i+120|0,i+80|0,i+160|0);Fb(i+160|0,i+80|0,i+160|0);la(i+200|0,i,i+40|0);Fb(i,i,i+40|0);qa(i+160|0,i+160|0);ya(i+80|0,i);qa(i+120|0,i+120|0);Gb(i+40|0,i+40|0,i+80|0);la(i+80|0,i+240|0,i+160|0);la(i+160|0,i,i+40|0);if((f|0)<=0)break;else f=f+-1|0}bb(i+200|0,i+120|0,c);bb(i+160|0,i+80|0,c);Fa(i+160|0,i+160|0);la(i+200|0,i+200|0,i+160|0);Ja(b,i+200|0);l=h;return 0}function La(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;n=l;m=l=l+63&-64;l=l+288|0;a:do if(!((e|0)==0&(f|0)==0)){i=c[b+32>>2]|0;g=c[b+32+4>>2]|0;j=yf(i|0,g|0,3)|0;k=vf(e|0,f|0,3)|0;k=fg(i|0,g|0,k|0,z|0)|0;c[b+32>>2]=k;c[b+32+4>>2]=z;k=cg(64,0,j&63|0,0)|0;g=z;if(g>>>0>f>>>0|(g|0)==(f|0)&k>>>0>e>>>0){g=0;h=0;while(1){k=a[d+g>>0]|0;m=fg(g|0,h|0,j&63|0,0)|0;a[b+40+m>>0]=k;g=fg(g|0,h|0,1,0)|0;h=z;if(!(h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0))break a}}if(!((k|0)==0&(g|0)==0)){h=0;i=0;do{p=a[d+h>>0]|0;o=fg(h|0,i|0,j&63|0,0)|0;a[b+40+o>>0]=p;h=fg(h|0,i|0,1,0)|0;i=z}while(i>>>0<g>>>0|(i|0)==(g|0)&h>>>0<k>>>0)}pa(b,b+40|0,m,m+256|0);g=cg(e|0,f|0,k|0,g|0)|0;h=z;if(h>>>0>0|(h|0)==0&g>>>0>63){i=d+k|0;do{pa(b,i,m,m+256|0);i=i+64|0;g=fg(g|0,h|0,-64,-1)|0;h=z}while(h>>>0>0|(h|0)==0&g>>>0>63);j=i}else j=d+k|0;g=g&63;if(!((g|0)==0&0==0)){h=0;i=0;do{a[b+40+h>>0]=a[j+h>>0]|0;h=fg(h|0,i|0,1,0)|0;i=z}while(i>>>0<0|(i|0)==0&h>>>0<g>>>0)}Sd(m,288)}while(0);l=n;return 0}function Ma(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0;if(!((h|0)==0&(g|0)==0)){j=cg(16,0,h|0,g|0)|0;l=z;k=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?e:j;l=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?f:l;if(!((k|0)==0&(l|0)==0)){j=0;i=0;do{n=a[d+j>>0]|0;h=fg(h|0,g|0,j|0,i|0)|0;a[b+64+h>>0]=n;j=fg(j|0,i|0,1,0)|0;i=z;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0}while(i>>>0<l>>>0|(i|0)==(l|0)&j>>>0<k>>>0)}n=fg(h|0,g|0,k|0,l|0)|0;j=z;c[b+56>>2]=n;c[b+56+4>>2]=j;if(!(j>>>0<0|(j|0)==0&n>>>0<16)){e=cg(e|0,f|0,k|0,l|0)|0;f=z;wa(b,b+64|0,16,0);c[b+56>>2]=0;c[b+56+4>>2]=0;d=d+k|0;m=6}}else m=6;if((m|0)==6){g=e&-16;if(f>>>0>0|(f|0)==0&e>>>0>15){e=cg(e|0,f|0,g|0,f|0)|0;n=z;wa(b,d,g,f);d=d+g|0;g=n}else g=f;if(!((e|0)==0&(g|0)==0)){f=0;h=c[b+56>>2]|0;i=c[b+56+4>>2]|0;j=0;do{m=a[d+f>>0]|0;n=fg(h|0,i|0,f|0,j|0)|0;a[b+64+n>>0]=m;f=fg(f|0,j|0,1,0)|0;j=z;h=c[b+56>>2]|0;i=c[b+56+4>>2]|0}while(j>>>0<g>>>0|(j|0)==(g|0)&f>>>0<e>>>0);n=fg(h|0,i|0,e|0,g|0)|0;c[b+56>>2]=n;c[b+56+4>>2]=z}}return}function Na(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+400|0;if(!((a|0)==0|(b|0)==0)){Gc(f,0,0,64)|0;jg(f+384|0,c[b+48>>2]|0);og(f,f+384|0,4,0)|0;jg(f+384|0,c[b+4>>2]|0);og(f,f+384|0,4,0)|0;jg(f+384|0,c[b+44>>2]|0);og(f,f+384|0,4,0)|0;jg(f+384|0,c[b+40>>2]|0);og(f,f+384|0,4,0)|0;jg(f+384|0,19);og(f,f+384|0,4,0)|0;jg(f+384|0,d);og(f,f+384|0,4,0)|0;jg(f+384|0,c[b+12>>2]|0);og(f,f+384|0,4,0)|0;d=c[b+8>>2]|0;if(d|0?(og(f,d,c[b+12>>2]|0,0)|0,c[b+56>>2]&1|0):0){Sd(c[b+8>>2]|0,c[b+12>>2]|0);c[b+12>>2]=0}jg(f+384|0,c[b+20>>2]|0);og(f,f+384|0,4,0)|0;d=c[b+16>>2]|0;if(d|0)og(f,d,c[b+20>>2]|0,0)|0;jg(f+384|0,c[b+28>>2]|0);og(f,f+384|0,4,0)|0;d=c[b+24>>2]|0;if(d|0?(og(f,d,c[b+28>>2]|0,0)|0,c[b+56>>2]&2|0):0){Sd(c[b+24>>2]|0,c[b+28>>2]|0);c[b+28>>2]=0}jg(f+384|0,c[b+36>>2]|0);og(f,f+384|0,4,0)|0;d=c[b+32>>2]|0;if(d|0)og(f,d,c[b+36>>2]|0,0)|0;cf(f,a,64)|0}l=e;return}function Oa(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;j=l;k=l=l+63&-64;l=l+528|0;c[k+384>>2]=0;jg(k+384|0,d);if(d>>>0<65){if((Gc(k,0,0,d)|0)>=0){og(k,k+384|0,4,0)|0;og(k,e,f,0)|0;cf(k,b,d)|0}}else a:do if((Gc(k,0,0,64)|0)>=0?(og(k,k+384|0,4,0)|0,og(k,e,f,0)|0,(cf(k,k+456|0,64)|0)>=0):0){g=b;h=k+456|0;i=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(i|0));g=k+392|0;h=k+456|0;i=g+64|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(i|0));if((d+-32|0)>>>0>64){f=d+-32|0;e=b+32|0;do{if((Sc(k+456|0,64,k+392|0,64,0,0,0)|0)<0)break a;g=e;h=k+456|0;i=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(i|0));f=f+-32|0;e=e+32|0;g=k+392|0;h=k+456|0;i=g+64|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(i|0))}while(f>>>0>64)}else{f=d+-32|0;e=b+32|0}if((Sc(k+456|0,f,k+392|0,64,0,0,0)|0)>=0)fb(e|0,k+456|0,f|0)|0}while(0);Sd(k,384);l=j;return}function Pa(b,e,f,g,h,i,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var m=0,n=0,o=0,p=0;o=l;p=l=l+63&-64;l=l+112|0;if(!((f|0)==0&(g|0)==0)){n=p+16|0;m=n+32|0;do{a[n>>0]=a[k>>0]|0;n=n+1|0;k=k+1|0}while((n|0)<(m|0));k=d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24;c[p>>2]=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;c[p+4>>2]=k;k=8;while(1){a[p+k>>0]=i;i=yf(i|0,j|0,8)|0;k=k+1|0;if((k|0)==16)break;else j=z}if(g>>>0>0|(g|0)==0&f>>>0>63){k=b;i=f;while(1){Og(p+48|0,p,p+16|0,0)|0;b=0;do{a[k+b>>0]=a[p+48+b>>0]^a[e+b>>0];b=b+1|0}while((b|0)!=64);b=1;j=8;while(1){f=p+j|0;b=(d[f>>0]|0)+b|0;a[f>>0]=b;j=j+1|0;if((j|0)==16)break;else b=b>>>8}j=fg(i|0,g|0,-64,-1)|0;g=z;b=k+64|0;e=e+64|0;if(g>>>0>0|(g|0)==0&j>>>0>63){k=b;i=j}else break}}else j=f;if(!((j|0)==0&(g|0)==0)?(Og(p+48|0,p,p+16|0,0)|0,j|0):0){g=0;do{a[b+g>>0]=a[p+48+g>>0]^a[e+g>>0];g=g+1|0}while((g|0)!=(j|0))}Sd(p+48|0,64);Sd(p+16|0,32)}l=o;return 0}function Qa(b,c,d,e,f,g,h){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0;j=l;k=l=l+63&-64;l=l+352|0;Da(k+256|0,g,h,0)|0;if(b>>>0>d>>>0?0<f>>>0|0==(f|0)&(b-d|0)>>>0<e>>>0:0)i=5;else if(d>>>0>b>>>0?0<f>>>0|0==(f|0)&(d-b|0)>>>0<e>>>0:0)i=5;if((i|0)==5){Ed(b|0,d|0,e|0)|0;d=b}h=k+288|0;i=h+32|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(i|0));h=f>>>0>0|(f|0)==0&e>>>0>32?32:e;i=f>>>0>0|(f|0)==0&e>>>0>32?0:f;if(!((h|0)==0&(i|0)==0)){m=cg(-2,-1,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~e:-33)|0,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~f:-1)|0)|0;fb(k+288+32|0,d|0,m+1|0)|0}m=fg(h|0,i|0,32,0)|0;Tf(k+288|0,k+288|0,m,z,g+16|0,k+256|0)|0;_g(k,k+288|0)|0;if(!((h|0)==0&(i|0)==0)){m=cg(-2,-1,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~e:-33)|0,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~f:-1)|0)|0;fb(b|0,k+288+32|0,m+1|0)|0}Sd(k+288|0,64);if(f>>>0>0|(f|0)==0&e>>>0>32){m=cg(e|0,f|0,h|0,i|0)|0;jf(b+h|0,d+h|0,m,z,g+16|0,1,0,k+256|0)|0}Sd(k+256|0,32);eg(k,b,e,f)|0;Zg(k,c)|0;Sd(k,256);l=j;return 0}function Ra(b,e,f,g,h,i){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;q=l;r=l=l+63&-64;l=l+112|0;if(!((f|0)==0&(g|0)==0)){k=r+16|0;j=k+32|0;do{a[k>>0]=a[i>>0]|0;k=k+1|0;i=i+1|0}while((k|0)<(j|0));k=d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24;c[r>>2]=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;c[r+4>>2]=k;c[r+8>>2]=0;c[r+8+4>>2]=0;if(g>>>0>0|(g|0)==0&f>>>0>63){k=e;h=f;do{Lg(r+48|0,r,r+16|0,0)|0;i=0;do{a[b+i>>0]=a[r+48+i>>0]^a[k+i>>0];i=i+1|0}while((i|0)!=64);i=1;j=8;while(1){f=r+j|0;i=(d[f>>0]|0)+i|0;a[f>>0]=i;j=j+1|0;if((j|0)==16)break;else i=i>>>8}h=fg(h|0,g|0,-64,-1)|0;g=z;b=b+64|0;k=k+64|0}while(g>>>0>0|(g|0)==0&h>>>0>63);if(!((h|0)==0&(g|0)==0)){n=b;o=h;p=k;m=8}}else{n=b;o=f;p=e;m=8}if((m|0)==8?(Lg(r+48|0,r,r+16|0,0)|0,o|0):0){i=0;do{a[n+i>>0]=a[r+48+i>>0]^a[p+i>>0];i=i+1|0}while((i|0)!=(o|0))}Sd(r+48|0,64);Sd(r+16|0,32)}l=q;return 0}function Sa(b,e,f,g,h,i){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;q=l;r=l=l+63&-64;l=l+112|0;if(!((f|0)==0&(g|0)==0)){k=r+16|0;j=k+32|0;do{a[k>>0]=a[i>>0]|0;k=k+1|0;i=i+1|0}while((k|0)<(j|0));k=d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24;c[r>>2]=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;c[r+4>>2]=k;c[r+8>>2]=0;c[r+8+4>>2]=0;if(g>>>0>0|(g|0)==0&f>>>0>63){k=e;h=f;do{Ng(r+48|0,r,r+16|0,0)|0;i=0;do{a[b+i>>0]=a[r+48+i>>0]^a[k+i>>0];i=i+1|0}while((i|0)!=64);i=1;j=8;while(1){f=r+j|0;i=(d[f>>0]|0)+i|0;a[f>>0]=i;j=j+1|0;if((j|0)==16)break;else i=i>>>8}h=fg(h|0,g|0,-64,-1)|0;g=z;b=b+64|0;k=k+64|0}while(g>>>0>0|(g|0)==0&h>>>0>63);if(!((h|0)==0&(g|0)==0)){n=b;o=h;p=k;m=8}}else{n=b;o=f;p=e;m=8}if((m|0)==8?(Ng(r+48|0,r,r+16|0,0)|0,o|0):0){i=0;do{a[n+i>>0]=a[r+48+i>>0]^a[p+i>>0];i=i+1|0}while((i|0)!=(o|0))}Sd(r+48|0,64);Sd(r+16|0,32)}l=q;return 0}function Ta(b,c,d,e,f,g,h){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0;j=l;k=l=l+63&-64;l=l+352|0;Ga(k+256|0,g,h,0)|0;if(b>>>0>d>>>0?0<f>>>0|0==(f|0)&(b-d|0)>>>0<e>>>0:0)i=5;else if(d>>>0>b>>>0?0<f>>>0|0==(f|0)&(d-b|0)>>>0<e>>>0:0)i=5;if((i|0)==5){Ed(b|0,d|0,e|0)|0;d=b}h=k+288|0;i=h+32|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(i|0));h=f>>>0>0|(f|0)==0&e>>>0>32?32:e;i=f>>>0>0|(f|0)==0&e>>>0>32?0:f;if(!((h|0)==0&(i|0)==0)){m=cg(-2,-1,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~e:-33)|0,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~f:-1)|0)|0;fb(k+288+32|0,d|0,m+1|0)|0}m=fg(h|0,i|0,32,0)|0;Of(k+288|0,k+288|0,m,z,g+16|0,k+256|0)|0;_g(k,k+288|0)|0;if(!((h|0)==0&(i|0)==0)){m=cg(-2,-1,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~e:-33)|0,(~f>>>0>4294967295|(~f|0)==-1&~e>>>0>4294967263?~f:-1)|0)|0;fb(b|0,k+288+32|0,m+1|0)|0}Sd(k+288|0,64);if(f>>>0>0|(f|0)==0&e>>>0>32){m=cg(e|0,f|0,h|0,i|0)|0;ef(b+h|0,d+h|0,m,z,g+16|0,1,0,k+256|0)|0}Sd(k+256|0,32);eg(k,b,e,f)|0;Zg(k,c)|0;Sd(k,256);l=j;return 0}function Ua(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;f=c[b+56>>2]|0;e=c[b+56+4>>2]|0;if(!((f|0)==0&(e|0)==0)){g=1;while(1){a[b+64+f>>0]=g;f=fg(f|0,e|0,1,0)|0;e=z;if(!(e>>>0<0|(e|0)==0&f>>>0<16))break;else g=0}a[b+80>>0]=1;wa(b,b+64|0,16,0)}f=c[b+24>>2]|0;g=(c[b+28>>2]|0)+(f>>>26)|0;k=(g>>>26)+(c[b+32>>2]|0)|0;i=(k>>>26)+(c[b+36>>2]|0)|0;h=((i>>>26)*5|0)+(c[b+20>>2]|0)|0;l=((((h&67108863)+5|0)>>>26)+((h>>>26)+(f&67108863))|0)>>>26;j=(i|-67108864)+((((l+(g&67108863)|0)>>>26)+(k&67108863)|0)>>>26)|0;f=(((h&67108863)+5|0)>>>26)+((h>>>26)+(f&67108863))&67108863&(j>>>31)+-1|j>>31&(h>>>26)+(f&67108863);k=((l+(g&67108863)|0)>>>26)+k&67108863&(j>>>31)+-1|j>>31&(k&67108863);h=fg(h+5&67108863&(j>>>31)+-1|j>>31&(h&67108863)|f<<26|0,0,c[b+40>>2]|0,0)|0;e=z;f=fg(f>>>6|(l+g&67108863&(j>>>31)+-1|j>>31&(g&67108863))<<20|0,0,c[b+44>>2]|0,0)|0;e=fg(f|0,z|0,e|0,0)|0;f=z;g=fg((l+g&67108863&(j>>>31)+-1|j>>31&(g&67108863))>>>12|k<<14|0,0,c[b+48>>2]|0,0)|0;f=fg(g|0,z|0,f|0,0)|0;g=z;i=fg(k>>>18|((j>>>31)+-1&j|j>>31&i)<<8|0,0,c[b+52>>2]|0,0)|0;g=fg(i|0,z|0,g|0,0)|0;jg(d,h);jg(d+4|0,e);jg(d+8|0,f);jg(d+12|0,g);Sd(b,88);return}function Va(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0;p=l;o=l=l+63&-64;l=l+16|0;m=c[b+20>>2]|0;n=c[b+4>>2]|0;c[b+20>>2]=0;c[b+4>>2]=0;q=(fc(d,34138,8)|0)==0;d=q?d+8|0:d;do if((q?(fc(d,34147,3)|0)==0:0)?(g=nc(d+3|0,o)|0,(g|0)!=0):0)if((c[o>>2]|0)==19)if(((((((fc(g,34151,3)|0)==0?(h=nc(g+3|0,o)|0,i=c[o>>2]|0,(h|0)!=0):0)?(c[b+44>>2]=i,(fc(h,34155,3)|0)==0):0)?(j=nc(h+3|0,o)|0,e=(j|0)==0?i:c[o>>2]|0,(j|0)!=0):0)?(c[b+40>>2]=e,(fc(j,34159,3)|0)==0):0)?(k=nc(j+3|0,o)|0,f=(k|0)==0?e:c[o>>2]|0,(k|0)!=0):0)?(c[b+48>>2]=f,c[b+52>>2]=f,(a[k>>0]|0)==36):0){c[o>>2]=m;d=tc(c[b+16>>2]|0,o,k+1|0)|0;if(!d){d=-32;break}c[b+20>>2]=c[o>>2];if((a[d>>0]|0)==36){c[o>>2]=n;e=tc(c[b>>2]|0,o,d+1|0)|0;if(!e){d=-32;break}c[b+4>>2]=c[o>>2];d=hb(b)|0;if(!d)d=(a[e>>0]|0)==0?0:-32}else d=-32}else d=-32;else d=-26;else d=-32;while(0);l=p;return d|0}function Wa(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;if(b){m=ia(c[b+12>>2]<<3)|0;if(!m)e=-22;else{gb(b,d,m);i=c[d>>2]|0;f=a[d+8>>0]|0;e=(i|0)==0&f<<24>>24==0?2:0;h=c[b+16>>2]|0;k=O(h,c[d+4>>2]|0)|0;l=c[b+12>>2]|0;f=e+k+(O(l,f&255)|0)|0;a:do if(e>>>0<l>>>0){l=f;g=(((f>>>0)%(h>>>0)|0|0)==0?h+-1|0:-1)+f|0;f=h;while(1){k=((l>>>0)%(f>>>0)|0|0)==1?l+-1|0:g;f=m+(e<<3)|0;h=c[f>>2]|0;f=Pe(c[f+4>>2]|0,0,c[b+20>>2]|0,0)|0;g=z;j=(i|0)==0;if(j?(a[d+8>>0]|0)==0:0){f=c[d+4>>2]|0;g=0}c[d+12>>2]=e;h=Cb(b,d,h,((g|0)==0?(f|0)==(c[d+4>>2]|0):0)&1)|0;i=c[(c[b>>2]|0)+4>>2]|0;f=af(c[b+16>>2]|0,0,f|0,g|0)|0;g=i+(l<<10)|0;if(j)na(i+(k<<10)|0,i+(f<<10)+(h<<10)|0,g);else ma(i+(k<<10)|0,i+(f<<10)+(h<<10)|0,g);e=e+1|0;if(e>>>0>=(c[b+12>>2]|0)>>>0)break a;l=l+1|0;g=k+1|0;f=c[b+16>>2]|0;i=c[d>>2]|0}}while(0);ra(m);e=0}}else e=0;return e|0}function Xa(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0;if(b<<5|0){h=0;do{c[g+(h<<2)>>2]=Rg(a+(h<<2)|0)|0;h=h+1|0}while((h|0)!=(b<<5|0))}if(!((d|0)==0&(e|0)==0)){h=0;i=0;do{k=af(h|0,i|0,b<<5|0,0)|0;Re(f+(k<<2)|0,g,b<<7);Uc(g,g+(b<<5<<2)|0,g+(b<<6<<2)|0,b);k=af(h|1|0,i|0,b<<5|0,0)|0;Re(f+(k<<2)|0,g+(b<<5<<2)|0,b<<7);Uc(g+(b<<5<<2)|0,g,g+(b<<6<<2)|0,b);h=fg(h|0,i|0,2,0)|0;i=z}while(i>>>0<e>>>0|(i|0)==(e|0)&h>>>0<d>>>0);h=fg(d|0,e|0,-1,-1)|0;i=z;j=0;k=0;do{l=Ig(g,b)|0;l=af(l&h|0,z&i|0,b<<5|0,0)|0;we(g,f+(l<<2)|0,b<<7);Uc(g,g+(b<<5<<2)|0,g+(b<<6<<2)|0,b);l=Ig(g+(b<<5<<2)|0,b)|0;l=af(l&h|0,z&i|0,b<<5|0,0)|0;we(g+(b<<5<<2)|0,f+(l<<2)|0,b<<7);Uc(g+(b<<5<<2)|0,g,g+(b<<6<<2)|0,b);j=fg(j|0,k|0,2,0)|0;k=z}while(k>>>0<e>>>0|(k|0)==(e|0)&j>>>0<d>>>0)}if(b<<5|0){h=0;do{jg(a+(h<<2)|0,c[g+(h<<2)>>2]|0);h=h+1|0}while((h|0)!=(b<<5|0))}return}function Ya(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;j=l;i=l=l+63&-64;l=l+96|0;Da(i,f,g,0)|0;Cg(i+32|0,32,0,f+16|0,i)|0;if(!(Rf(c,b,d,e,i+32|0)|0))if(!a)c=0;else{if(b>>>0>=a>>>0?0<e>>>0|0==(e|0)&(b-a|0)>>>0<d>>>0:0)h=8;else if(a>>>0>=b>>>0?0<e>>>0|0==(e|0)&(a-b|0)>>>0<d>>>0:0)h=8;if((h|0)==8){Ed(a|0,b|0,d|0)|0;b=a}c=e>>>0>0|(e|0)==0&d>>>0>32?32:d;g=e>>>0>0|(e|0)==0&d>>>0>32?0:e;if((c|0)==0&(g|0)==0)Tf(i+32|0,i+32|0,32,0,f+16|0,i)|0;else{h=cg(-2,-1,(~e>>>0>4294967295|(~e|0)==-1&~d>>>0>4294967263?~d:-33)|0,(~e>>>0>4294967295|(~e|0)==-1&~d>>>0>4294967263?~e:-1)|0)|0;fb(i+32+32|0,b|0,h+1|0)|0;k=fg(c|0,g|0,32,0)|0;Tf(i+32|0,i+32|0,k,z,f+16|0,i)|0;fb(a|0,i+32+32|0,h+1|0)|0}if(e>>>0>0|(e|0)==0&d>>>0>32){k=cg(d|0,e|0,c|0,g|0)|0;jf(a+c|0,b+c|0,k,z,f+16|0,1,0,i)|0}Sd(i,32);c=0}else{Sd(i,32);c=-1}l=j;return c|0}function Za(a,b){a=a|0;b=b|0;var c=0,e=0,f=0;f=l;c=l=l+63&-64;l=l+208|0;xa(a+40|0,b);Bf(a+80|0);qa(c+160|0,a+40|0);la(c+120|0,c+160|0,1152);Fb(c+160|0,c+160|0,a+80|0);Gb(c+120|0,c+120|0,a+80|0);qa(c+80|0,c+120|0);la(c+80|0,c+80|0,c+120|0);qa(a,c+80|0);la(a,a,c+120|0);la(a,a,c+160|0);Ha(a,a);la(a,a,c+80|0);la(a,a,c+160|0);qa(c+40|0,a);la(c+40|0,c+40|0,c+120|0);Fb(c,c+40|0,c+160|0);if(Ge(c)|0){Gb(c,c+40|0,c+160|0);if(!(Ge(c)|0)){la(a,a,1192);e=4}else a=-1}else e=4;if((e|0)==4){e=Ve(a)|0;if((e|0)==((d[b+31>>0]|0)>>>7|0))dc(a,a);la(a+120|0,a,a+40|0);a=0}l=f;return a|0}function _a(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0;o=af(j|0,0,i|0,0)|0;n=z;do if(n>>>0>0|(n|0)==0&o>>>0>1073741823){c[8326]=27;a=-1}else{if(h>>>0>0|(h|0)==0&g>>>0>4294967295){c[8326]=27;a=-1;break}o=fg(g|0,h|0,-1,-1)|0;if(h>>>0<0|(h|0)==0&g>>>0<2|((o&g|0)!=0|(z&h|0)!=0)){c[8326]=22;a=-1;break}if((i|0)==0|(j|0)==0){c[8326]=22;a=-1;break}if(!(i>>>0>16777215?1:(33554431/(j>>>0)|0)>>>0<i>>>0)?!(0<h>>>0|(0==(h|0)?(33554431/(i>>>0)|0)>>>0<g>>>0:0)):0){n=O(i<<7,j)|0;o=O(i<<7,g)|0;if((n+o|0)>>>0<o>>>0){c[8326]=12;a=-1;break}m=n+o+(i<<8|64)|0;if(m>>>0<(i<<8|64)>>>0){c[8326]=12;a=-1;break}if((c[a+8>>2]|0)>>>0<m>>>0?($g(a),(od(a,m)|0)==0):0){a=-1;break}m=c[a+4>>2]|0;cc(b,d,e,f,m,n);a=0;do{Xa(m+(O(i<<7,a)|0)|0,i,g,h,m+n|0,m+n+o|0);a=a+1|0}while((a|0)!=(j|0));cc(b,d,m,n,k,l);a=0;break}c[8326]=12;a=-1}while(0);return a|0}function $a(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;j=l;i=l=l+63&-64;l=l+96|0;Ga(i,f,g,0)|0;xg(i+32|0,32,0,f+16|0,i)|0;if(!(Rf(c,b,d,e,i+32|0)|0))if(!a)c=0;else{if(b>>>0>=a>>>0?0<e>>>0|0==(e|0)&(b-a|0)>>>0<d>>>0:0)h=8;else if(a>>>0>=b>>>0?0<e>>>0|0==(e|0)&(a-b|0)>>>0<d>>>0:0)h=8;if((h|0)==8){Ed(a|0,b|0,d|0)|0;b=a}c=e>>>0>0|(e|0)==0&d>>>0>32?32:d;g=e>>>0>0|(e|0)==0&d>>>0>32?0:e;if((c|0)==0&(g|0)==0)Of(i+32|0,i+32|0,32,0,f+16|0,i)|0;else{h=cg(-2,-1,(~e>>>0>4294967295|(~e|0)==-1&~d>>>0>4294967263?~d:-33)|0,(~e>>>0>4294967295|(~e|0)==-1&~d>>>0>4294967263?~e:-1)|0)|0;fb(i+32+32|0,b|0,h+1|0)|0;k=fg(c|0,g|0,32,0)|0;Of(i+32|0,i+32|0,k,z,f+16|0,i)|0;fb(a|0,i+32+32|0,h+1|0)|0}if(e>>>0>0|(e|0)==0&d>>>0>32){k=cg(d|0,e|0,c|0,g|0)|0;ef(a+c|0,b+c|0,k,z,f+16|0,1,0,i)|0}Sd(i,32);c=0}else{Sd(i,32);c=-1}l=j;return c|0}function ab(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0;f=l;g=l=l+63&-64;l=l+464|0;e=0;do{i=a[c+e>>0]|0;h=e<<1;a[g+400+h>>0]=i&15;a[g+400+(h|1)>>0]=(i&255)>>>4;e=e+1|0}while((e|0)!=32);e=0;c=0;do{i=g+400+c|0;h=(d[i>>0]|0)+e|0;e=(h<<24)+134217728>>28;a[i>>0]=h-(e<<4);c=c+1|0}while((c|0)!=63);a[g+400+63>>0]=(d[g+400+63>>0]|0)+e;Ye(b);e=1;do{Jb(g,(e|0)/2|0,a[g+400+e>>0]|0);Wb(g+240|0,b,g);Id(b,g+240|0);e=e+2|0}while((e|0)<64);ye(g+240|0,b);ze(g+120|0,g+240|0);jc(g+240|0,g+120|0);ze(g+120|0,g+240|0);jc(g+240|0,g+120|0);ze(g+120|0,g+240|0);jc(g+240|0,g+120|0);Id(b,g+240|0);e=0;do{Jb(g,(e|0)/2|0,a[g+400+e>>0]|0);Wb(g+240|0,b,g);Id(b,g+240|0);e=e+2|0}while((e|0)<64);l=f;return}function bb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=c[a>>2]|0;v=c[a+4>>2]|0;t=c[a+8>>2]|0;r=c[a+12>>2]|0;p=c[a+16>>2]|0;n=c[a+20>>2]|0;l=c[a+24>>2]|0;j=c[a+28>>2]|0;h=c[a+32>>2]|0;f=c[a+36>>2]|0;w=c[b>>2]|0;u=c[b+4>>2]|0;s=c[b+8>>2]|0;q=c[b+12>>2]|0;o=c[b+16>>2]|0;m=c[b+20>>2]|0;k=c[b+24>>2]|0;i=c[b+28>>2]|0;g=c[b+32>>2]|0;e=c[b+36>>2]|0;c[a>>2]=(w^x)&0-d^x;c[a+4>>2]=(u^v)&0-d^v;c[a+8>>2]=(s^t)&0-d^t;c[a+12>>2]=(q^r)&0-d^r;c[a+16>>2]=(o^p)&0-d^p;c[a+20>>2]=(m^n)&0-d^n;c[a+24>>2]=(k^l)&0-d^l;c[a+28>>2]=(i^j)&0-d^j;c[a+32>>2]=(g^h)&0-d^h;c[a+36>>2]=(e^f)&0-d^f;c[b>>2]=(w^x)&0-d^w;c[b+4>>2]=(u^v)&0-d^u;c[b+8>>2]=(s^t)&0-d^s;c[b+12>>2]=(q^r)&0-d^q;c[b+16>>2]=(o^p)&0-d^o;c[b+20>>2]=(m^n)&0-d^m;c[b+24>>2]=(k^l)&0-d^k;c[b+28>>2]=(i^j)&0-d^i;c[b+32>>2]=(g^h)&0-d^g;c[b+36>>2]=(e^f)&0-d^e;return}function cb(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0,n=0,o=0,p=0;o=l;p=l=l+63&-64;l=l+112|0;if(!((e|0)==0&(f|0)==0)){j=p+16|0;i=j+32|0;do{a[j>>0]=a[h>>0]|0;j=j+1|0;h=h+1|0}while((j|0)<(i|0));j=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[p>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[p+4>>2]=j;c[p+8>>2]=0;c[p+8+4>>2]=0;if(f>>>0>0|(f|0)==0&e>>>0>63){do{Lg(b,p,p+16|0,0)|0;h=1;i=8;while(1){j=p+i|0;h=(d[j>>0]|0)+h|0;a[j>>0]=h;i=i+1|0;if((i|0)==16)break;else h=h>>>8}e=fg(e|0,f|0,-64,-1)|0;f=z;b=b+64|0}while(f>>>0>0|(f|0)==0&e>>>0>63);if(!((e|0)==0&(f|0)==0)){m=b;n=e;k=7}}else{m=b;n=e;k=7}if((k|0)==7?(Lg(p+48|0,p,p+16|0,0)|0,n|0):0){h=0;do{a[m+h>>0]=a[p+48+h>>0]|0;h=h+1|0}while((h|0)!=(n|0))}Sd(p+48|0,64);Sd(p+16|0,32)}l=o;return 0}function db(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0,n=0,o=0,p=0;o=l;p=l=l+63&-64;l=l+112|0;if(!((e|0)==0&(f|0)==0)){j=p+16|0;i=j+32|0;do{a[j>>0]=a[h>>0]|0;j=j+1|0;h=h+1|0}while((j|0)<(i|0));j=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[p>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[p+4>>2]=j;c[p+8>>2]=0;c[p+8+4>>2]=0;if(f>>>0>0|(f|0)==0&e>>>0>63){do{Ng(b,p,p+16|0,0)|0;h=1;i=8;while(1){j=p+i|0;h=(d[j>>0]|0)+h|0;a[j>>0]=h;i=i+1|0;if((i|0)==16)break;else h=h>>>8}e=fg(e|0,f|0,-64,-1)|0;f=z;b=b+64|0}while(f>>>0>0|(f|0)==0&e>>>0>63);if(!((e|0)==0&(f|0)==0)){m=b;n=e;k=7}}else{m=b;n=e;k=7}if((k|0)==7?(Ng(p+48|0,p,p+16|0,0)|0,n|0):0){h=0;do{a[m+h>>0]=a[p+48+h>>0]|0;h=h+1|0}while((h|0)!=(n|0))}Sd(p+48|0,64);Sd(p+16|0,32)}l=o;return 0}function eb(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0,n=0,o=0,p=0;o=l;p=l=l+63&-64;l=l+112|0;if(!((e|0)==0&(f|0)==0)){j=p+16|0;i=j+32|0;do{a[j>>0]=a[h>>0]|0;j=j+1|0;h=h+1|0}while((j|0)<(i|0));j=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[p>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[p+4>>2]=j;c[p+8>>2]=0;c[p+8+4>>2]=0;if(f>>>0>0|(f|0)==0&e>>>0>63){do{Og(b,p,p+16|0,0)|0;h=1;i=8;while(1){j=p+i|0;h=(d[j>>0]|0)+h|0;a[j>>0]=h;i=i+1|0;if((i|0)==16)break;else h=h>>>8}e=fg(e|0,f|0,-64,-1)|0;f=z;b=b+64|0}while(f>>>0>0|(f|0)==0&e>>>0>63);if(!((e|0)==0&(f|0)==0)){m=b;n=e;k=7}}else{m=b;n=e;k=7}if((k|0)==7?(Og(p+48|0,p,p+16|0,0)|0,n|0):0){h=0;do{a[m+h>>0]=a[p+48+h>>0]|0;h=h+1|0}while((h|0)!=(n|0))}Sd(p+48|0,64);Sd(p+16|0,32)}l=o;return 0}function fb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=8192)return $(b|0,d|0,e|0)|0;h=b|0;g=b+e|0;if((b&3)==(d&3)){while(b&3){if(!e)return h|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}e=g&-4|0;f=e-64|0;while((b|0)<=(f|0)){c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[b+44>>2]=c[d+44>>2];c[b+48>>2]=c[d+48>>2];c[b+52>>2]=c[d+52>>2];c[b+56>>2]=c[d+56>>2];c[b+60>>2]=c[d+60>>2];b=b+64|0;d=d+64|0}while((b|0)<(e|0)){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}}else{e=g-4|0;while((b|0)<(e|0)){a[b>>0]=a[d>>0]|0;a[b+1>>0]=a[d+1>>0]|0;a[b+2>>0]=a[d+2>>0]|0;a[b+3>>0]=a[d+3>>0]|0;b=b+4|0;d=d+4|0}}while((b|0)<(g|0)){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}return h|0}function gb(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;g=l;h=l=l+63&-64;l=l+4096|0;Eh(h+3072|0);Eh(h+2048|0);if((a|0)!=0&(b|0)!=0?(c[h+2048>>2]=c[b>>2],c[h+2048+4>>2]=0,c[h+2048+8>>2]=c[b+4>>2],c[h+2048+8+4>>2]=0,c[h+2048+16>>2]=d[b+8>>0],c[h+2048+16+4>>2]=0,c[h+2048+24>>2]=c[a+8>>2],c[h+2048+24+4>>2]=0,c[h+2048+32>>2]=c[a+4>>2],c[h+2048+32+4>>2]=0,c[h+2048+40>>2]=c[a+28>>2],c[h+2048+40+4>>2]=0,c[a+12>>2]|0):0){b=0;do{f=b&127;if(!f){i=fg(c[h+2048+48>>2]|0,c[h+2048+48+4>>2]|0,1,0)|0;c[h+2048+48>>2]=i;c[h+2048+48+4>>2]=z;Eh(h);Eh(h+1024|0);ma(h+3072|0,h+2048|0,h);ma(h+3072|0,h,h+1024|0)}j=c[h+1024+(f<<3)+4>>2]|0;i=e+(b<<3)|0;c[i>>2]=c[h+1024+(f<<3)>>2];c[i+4>>2]=j;b=b+1|0}while(b>>>0<(c[a+12>>2]|0)>>>0)}l=g;return}function hb(a){a=a|0;var b=0,d=0;do if(a)if(c[a>>2]|0)if((c[a+4>>2]|0)>>>0>=16){if((c[a+8>>2]|0)==0?c[a+12>>2]|0:0){b=-18;break}b=c[a+20>>2]|0;if((c[a+16>>2]|0)!=0|(b|0)==0)if(b>>>0>=8){if((c[a+24>>2]|0)==0?c[a+28>>2]|0:0){b=-20;break}if((c[a+32>>2]|0)==0?c[a+36>>2]|0:0){b=-21;break}b=c[a+44>>2]|0;if(b>>>0>=8)if(b>>>0<=2097152){d=c[a+48>>2]|0;if(b>>>0>=d<<3>>>0)if((c[a+40>>2]|0)>>>0>=3)if(d)if(d>>>0>16777215)b=-17;else{a=c[a+52>>2]|0;return ((a|0)==0?-28:a>>>0>16777215?-29:0)|0}else b=-16;else b=-12;else b=-14}else b=-15;else b=-14}else b=-6;else b=-19}else b=-2;else b=-1;else b=-25;while(0);return b|0}function ib(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=l;j=l=l+63&-64;l=l+64|0;e=j+8|0;f=e+52|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));e=uc(a)|0;c[j+36>>2]=e;c[j+20>>2]=e;c[j+4>>2]=e;h=ia(e)|0;c[j+32>>2]=h;f=ia(e)|0;c[j+16>>2]=f;g=ia(e)|0;c[j>>2]=g;do if((f|0)==0|(g|0)==0|(h|0)==0){ra(h);ra(f);ra(g);e=-22}else{i=ia(e)|0;if(!i){ra(h);ra(f);ra(g);e=-22;break}e=Va(j,a)|0;if(e|0){ra(c[j+32>>2]|0);ra(c[j+16>>2]|0);ra(c[j>>2]|0);ra(i);break}d=ub(c[j+40>>2]|0,c[j+44>>2]|0,c[j+52>>2]|0,b,d,c[j+16>>2]|0,c[j+20>>2]|0,i,c[j+4>>2]|0,0,0)|0;ra(c[j+32>>2]|0);ra(c[j+16>>2]|0);if((d|0)==0?(Qc(i,c[j>>2]|0,c[j+4>>2]|0)|0)==0:0)e=0;else e=-35;ra(i);ra(c[j>>2]|0)}while(0);l=k;return e|0}function jb(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;i=b>>>0>0|(b|0)==0&a>>>0>32768?a:32768;h=b>>>0>0|(b|0)==0&a>>>0>32768?b:0;c[g>>2]=8;a:do if(h>>>0<0|(h|0)==0&i>>>0<d>>>5>>>0){c[f>>2]=1;a=ah(i|0,h|0,c[g>>2]<<2|0,0)|0;c[e>>2]=1;a=yf(a|0,z|0,1)|0;b=z;h=1;do{g=vf(1,0,h|0)|0;f=z;h=h+1|0;if(f>>>0>b>>>0|(f|0)==(b|0)&g>>>0>a>>>0)break a;c[e>>2]=h}while(h>>>0<63)}else{c[e>>2]=1;a=1;b=1;while(1){j=vf(1,0,a|0)|0;k=z;b=b+1|0;if(k>>>0>0|(k|0)==0&j>>>0>d>>>11>>>0)break;c[e>>2]=b;if(b>>>0>=63){a=b;break}else a=b}e=yf(i|0,h|0,2)|0;e=yf(e|0,z|0,a|0)|0;j=z;k=j>>>0<0|(j|0)==0&e>>>0<1073741823?e:1073741823;c[f>>2]=(k>>>0)/((c[g>>2]|0)>>>0)|0}while(0);return}function kb(b,e,f,g,h,i,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0;a:do if(!g){n=0;l=0;m=0;k=0}else{k=0;n=0;l=0;p=0;while(1){while(1){m=d[f+l>>0]|0;o=(((m&223)+201&255)+65526^((m&223)+201&255)+65520)>>>8;if((o|((m^48)+65526|0)>>>8)&255|0)break;if(!((h|0)!=0&k<<24>>24==0)){m=0;break a}if(!(Kg(h,m)|0)){m=0;k=0;break a}l=l+1|0;if(l>>>0<g>>>0)k=0;else{m=0;k=0;break a}}if(n>>>0>=e>>>0)break;m=(m&223)+201&255&o|((m^48)+65526|0)>>>8&(m^48);if(!(k<<24>>24))m=m<<4&255;else{a[b+n>>0]=m|p&255;n=n+1|0;m=p}k=~k;l=l+1|0;if(l>>>0<g>>>0)p=m;else{m=0;break a}}c[8326]=34;m=-1}while(0);if(j|0)c[j>>2]=f+(((k<<24>>24!=0)<<31>>31)+l);if(i|0)c[i>>2]=n;return m|0}function lb(a,b,c,d,e,f,g,h,i,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var m=0;m=l;l=l+352|0;pg(m+280|0,64,0,j,k)|0;_g(m,m+280|0)|0;Sd(m+280|0,64);eg(m,g,h,i)|0;b=cg(0,0,h|0,i|0)|0;eg(m,35896,b&15,0)|0;eg(m,c,d,e)|0;b=cg(0,0,d|0,e|0)|0;eg(m,35896,b&15,0)|0;re(m+272|0,h,i);eg(m,m+272|0,8,0)|0;re(m+272|0,d,e);eg(m,m+272|0,8,0)|0;Zg(m,m+256|0)|0;Sd(m,256);b=Oe(m+256|0,f)|0;Sd(m+256|0,16);do if(a)if(!b){pf(a,c,d,e,j,1,k)|0;b=0;break}else{Pb(a|0,0,d|0)|0;b=-1;break}while(0);l=m;return b|0}function mb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a:do if((e|0)!=0&(b&3|0)!=0){f=e;while(1){if((a[b>>0]|0)==(d&255)<<24>>24)break a;b=b+1|0;e=f+-1|0;if((e|0)!=0&(b&3|0)!=0)f=e;else{f=e;e=(e|0)!=0;g=5;break}}}else{f=e;e=(e|0)!=0;g=5}while(0);b:do if((g|0)==5)if(e){if((a[b>>0]|0)!=(d&255)<<24>>24){e=O(d&255,16843009)|0;c:do if(f>>>0>3)while(1){h=c[b>>2]^e;if((h&-2139062144^-2139062144)&h+-16843009|0)break;b=b+4|0;f=f+-4|0;if(f>>>0<=3){g=11;break c}}else g=11;while(0);if((g|0)==11)if(!f){f=0;break}while(1){if((a[b>>0]|0)==(d&255)<<24>>24)break b;b=b+1|0;f=f+-1|0;if(!f){f=0;break}}}}else f=0;while(0);return (f|0?b:0)|0}function nb(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;i=l;j=l=l+63&-64;l=l+192|0;if((c+-1&255)>63)Z();if((d|0)!=0&e<<24>>24!=0?(e&255)<=64:0){a[j+128>>0]=c;a[j+128+1>>0]=e;a[j+128+2>>0]=1;a[j+128+3>>0]=1;Vg(j+128+4|0);bf(j+128+8|0);c=j+128+16|0;h=c+16|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(h|0));if(!f){c=j+128+32|0;h=c+16|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(h|0))}else lf(j+128|0,f);if(!g){c=j+128+48|0;h=c+16|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(h|0))}else kf(j+128|0,g);ud(b,j+128|0);Pb(j+(e&255)|0,0,128-(e&255)|0)|0;fb(j|0,d|0,e&255|0)|0;Bb(b,j,128,0);Sd(j,128);l=i;return}Z()}function ob(a){a=a|0;var b=0,d=0,e=0,f=0;if(a>>>0>=4294967168){c[8326]=12;f=0;return f|0}f=a>>>0<11?16:a+11&-8;e=ia(f+76|0)|0;if(!e){f=0;return f|0}do if(e&63){d=((e+63&-64)+-8-(e+-8)|0)>>>0>15?(e+63&-64)+-8|0:(e+63&-64)+56|0;a=d-(e+-8)|0;b=c[e+-4>>2]|0;if(!(b&3)){c[d>>2]=(c[e+-8>>2]|0)+a;c[d+4>>2]=(b&-8)-a;a=d;break}else{c[d+4>>2]=(b&-8)-a|c[d+4>>2]&1|2;c[d+((b&-8)-a)+4>>2]=c[d+((b&-8)-a)+4>>2]|1;c[e+-4>>2]=a|c[e+-4>>2]&1|2;c[d+4>>2]=c[d+4>>2]|1;sa(e+-8|0,a);a=d;break}}else{a=e+-8|0;d=e+-8|0}while(0);a=a+4|0;b=c[a>>2]|0;if(b&3|0?(b&-8)>>>0>(f+16|0)>>>0:0){e=d+f|0;c[a>>2]=f|b&1|2;c[e+4>>2]=(b&-8)-f|3;c[e+((b&-8)-f)+4>>2]=c[e+((b&-8)-f)+4>>2]|1;sa(e,(b&-8)-f|0)}f=d+8|0;return f|0}function pb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+192|0;if(d>>>0>128){me(b)|0;Ea(b,c,d,0)|0;Be(b,h)|0;d=64;c=h}me(b)|0;e=h+64|0;f=e+128|0;do{a[e>>0]=54;e=e+1|0}while((e|0)<(f|0));g=(d|0)==0;if(!g?(a[h+64>>0]=a[c>>0]^54,(d|0)!=1):0){e=1;do{f=h+64+e|0;a[f>>0]=a[f>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}Ea(b,h+64|0,128,0)|0;me(b+208|0)|0;e=h+64|0;f=e+128|0;do{a[e>>0]=92;e=e+1|0}while((e|0)<(f|0));if(!g?(a[h+64>>0]=a[c>>0]^92,(d|0)!=1):0){e=1;do{g=h+64+e|0;a[g>>0]=a[g>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}Ea(b+208|0,h+64|0,128,0)|0;Sd(h+64|0,128);Sd(h,64);l=h;return 0}function qb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+96|0;if(d>>>0>64){td(b)|0;La(b,c,d,0)|0;Fe(b,h)|0;d=32;c=h}td(b)|0;e=h+32|0;f=e+64|0;do{a[e>>0]=54;e=e+1|0}while((e|0)<(f|0));g=(d|0)==0;if(!g?(a[h+32>>0]=a[c>>0]^54,(d|0)!=1):0){e=1;do{f=h+32+e|0;a[f>>0]=a[f>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}La(b,h+32|0,64,0)|0;td(b+104|0)|0;e=h+32|0;f=e+64|0;do{a[e>>0]=92;e=e+1|0}while((e|0)<(f|0));if(!g?(a[h+32>>0]=a[c>>0]^92,(d|0)!=1):0){e=1;do{g=h+32+e|0;a[g>>0]=a[g>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}La(b+104|0,h+32|0,64,0)|0;Sd(h+32|0,64);Sd(h,32);l=h;return 0}function rb(b,c){b=b|0;c=c|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+16|0;Ce(f,b);a[b>>0]=a[f+(d[c>>0]|0)>>0]|0;a[b+1>>0]=a[f+(d[c+1>>0]|0)>>0]|0;a[b+2>>0]=a[f+(d[c+2>>0]|0)>>0]|0;a[b+3>>0]=a[f+(d[c+3>>0]|0)>>0]|0;a[b+4>>0]=a[f+(d[c+4>>0]|0)>>0]|0;a[b+5>>0]=a[f+(d[c+5>>0]|0)>>0]|0;a[b+6>>0]=a[f+(d[c+6>>0]|0)>>0]|0;a[b+7>>0]=a[f+(d[c+7>>0]|0)>>0]|0;a[b+8>>0]=a[f+(d[c+8>>0]|0)>>0]|0;a[b+9>>0]=a[f+(d[c+9>>0]|0)>>0]|0;a[b+10>>0]=a[f+(d[c+10>>0]|0)>>0]|0;a[b+11>>0]=a[f+(d[c+11>>0]|0)>>0]|0;a[b+12>>0]=a[f+(d[c+12>>0]|0)>>0]|0;a[b+13>>0]=a[f+(d[c+13>>0]|0)>>0]|0;a[b+14>>0]=a[f+(d[c+14>>0]|0)>>0]|0;a[b+15>>0]=a[f+(d[c+15>>0]|0)>>0]|0;l=e;return}function sb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=c[a>>2]|0;u=c[a+4>>2]|0;s=c[a+8>>2]|0;q=c[a+12>>2]|0;o=c[a+16>>2]|0;m=c[a+20>>2]|0;k=c[a+24>>2]|0;i=c[a+28>>2]|0;g=c[a+32>>2]|0;e=c[a+36>>2]|0;v=(c[b+4>>2]^u)&0-d;t=(c[b+8>>2]^s)&0-d;r=(c[b+12>>2]^q)&0-d;p=(c[b+16>>2]^o)&0-d;n=(c[b+20>>2]^m)&0-d;l=(c[b+24>>2]^k)&0-d;j=(c[b+28>>2]^i)&0-d;h=(c[b+32>>2]^g)&0-d;f=(c[b+36>>2]^e)&0-d;c[a>>2]=(c[b>>2]^w)&0-d^w;c[a+4>>2]=v^u;c[a+8>>2]=t^s;c[a+12>>2]=r^q;c[a+16>>2]=p^o;c[a+20>>2]=n^m;c[a+24>>2]=l^k;c[a+28>>2]=j^i;c[a+32>>2]=h^g;c[a+36>>2]=f^e;return}function tb(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0;j=l;k=l=l+63&-64;l=l+560|0;de(k+496|0,h,32,0)|0;a[k+496>>0]=a[k+496>>0]&-8;a[k+496+31>>0]=a[k+496+31>>0]&63|64;ag(k,i);Ea(k,k+496+32|0,32,0)|0;Ea(k,e,f,g)|0;Be(k,k+432|0)|0;Ed(b+32|0,h+32|0,32)|0;ka(k+432|0);ab(k+208|0,k+432|0);Ic(b,k+208|0);ag(k,i);Ea(k,b,64,0)|0;Ea(k,e,f,g)|0;Be(k,k+368|0)|0;ka(k+368|0);ha(b+32|0,k+368|0,k+496|0,k+432|0);Sd(k+496|0,64);if(d|0){c[d>>2]=64;c[d+4>>2]=0}l=j;return}function ub(a,b,d,e,f,g,h,i,j,k,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;m=m|0;var n=0,o=0,p=0;p=l;o=l=l+63&-64;l=l+64|0;n=ia(j)|0;do if(!n)a=-22;else{c[o>>2]=n;c[o+4>>2]=j;c[o+8>>2]=e;c[o+12>>2]=f;c[o+16>>2]=g;c[o+20>>2]=h;c[o+24>>2]=0;c[o+24+4>>2]=0;c[o+24+8>>2]=0;c[o+24+12>>2]=0;c[o+40>>2]=a;c[o+44>>2]=b;c[o+48>>2]=d;c[o+52>>2]=d;c[o+56>>2]=4;a=$b(o)|0;if(a|0){Sd(n,j);ra(n);break}if(i|0)fb(i|0,n|0,j|0)|0;if((k|0)!=0&(m|0)!=0?Ia(k,m,o)|0:0){Sd(n,j);Sd(k,m);ra(n);a=-31;break}Sd(n,j);ra(n);a=0}while(0);l=p;return a|0}function vb(a,b,c,e,f,g){a=a|0;b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;k=l;j=l=l+63&-64;l=l+592|0;if(((nd(a+32|0)|0)==0?(xd(a)|0)==0:0)?(Za(j+328|0,f)|0)==0:0){h=0;i=0;do{i=d[f+h>>0]|0|i;h=h+1|0}while((h|0)!=32);if(i){ag(j,g);Ea(j,a,32,0)|0;Ea(j,f,32,0)|0;Ea(j,b,c,e)|0;Be(j,j+520|0)|0;ka(j+520|0);Ba(j+208|0,j+520|0,j+328|0,a+32|0);Ic(j+488|0,j+208|0);h=Ne(j+488|0,a)|0;h=((j+488|0)==(a|0)?-1:h)|(Qc(a,j+488|0,32)|0)}else h=-1}else h=-1;l=k;return h|0}function wb(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;p=l;o=l=l+63&-64;l=l+48|0;if((((((a[f>>0]|0)==36?(a[f+1>>0]|0)==55:0)?(a[f+2>>0]|0)==36:0)?(_f(o+8|0,a[f+3>>0]|0)|0)==0:0)?(j=vf(1,0,c[o+8>>2]|0)|0,k=z,h=Tc(o+4|0,f+4|0)|0,(h|0)!=0):0)?(m=Tc(o,h)|0,(m|0)!=0):0){h=Bh(m)|0;if(!h)h=uc(m)|0;else h=h-m|0;i=h+(m-f)|0;if((!((i+45|0)>>>0>102|(i+45|0)>>>0<h>>>0)?(_a(b,d,e,m,h,j,k,c[o+4>>2]|0,c[o>>2]|0,o+16|0,32)|0)==0:0)?(fb(g|0,f|0,i|0)|0,a[g+i>>0]=36,n=Rc(g+i+1|0,g+102-(g+i+1)|0,o+16|0)|0,Sd(o+16|0,32),(n|0)!=0&n>>>0<(g+102|0)>>>0):0)a[n>>0]=0;else g=0}else g=0;l=p;return g|0}function xb(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;j=l;i=l=l+63&-64;l=l+32|0;a:do if(((b|0)!=0?(d=c[b+20>>2]|0,(d|0)!=0):0)?(c[b+4>>2]|0)!=0:0){h=0;while(1){g=0;do{if(!d)d=0;else{f=g&255;e=0;do{c[i>>2]=h;c[i+4>>2]=e;a[i+8>>0]=f;c[i+12>>2]=0;c[i+16>>2]=c[i>>2];c[i+16+4>>2]=c[i+4>>2];c[i+16+8>>2]=c[i+8>>2];c[i+16+12>>2]=c[i+12>>2];d=Wa(b,i+16|0)|0;e=e+1|0;if(d|0)break a;d=c[b+20>>2]|0}while(e>>>0<d>>>0)}g=g+1|0}while(g>>>0<4);h=h+1|0;if(h>>>0>=(c[b+4>>2]|0)>>>0){d=0;break}}}else d=0;while(0);l=j;return d|0}function yb(a,b,d,e,f,g,h,i,j,k,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;m=m|0;n=n|0;k=l;l=l+336|0;pg(k+264|0,64,0,m,n)|0;_g(k,k+264|0)|0;Sd(k+264|0,64);eg(k,h,i,j)|0;h=cg(0,0,i|0,j|0)|0;eg(k,35896,h&15,0)|0;pf(a,e,f,g,m,1,n)|0;eg(k,a,f,g)|0;h=cg(0,0,f|0,g|0)|0;eg(k,35896,h&15,0)|0;re(k+256|0,i,j);eg(k,k+256|0,8,0)|0;re(k+256|0,f,g);eg(k,k+256|0,8,0)|0;Zg(k,b)|0;Sd(k,256);if(d|0){c[d>>2]=16;c[d+4>>2]=0}l=k;return 0}function zb(a,b,c,d,e,f,g,h,i,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var m=0;m=l;l=l+352|0;Cg(m+280|0,64,0,j,k)|0;_g(m,m+280|0)|0;Sd(m+280|0,64);eg(m,g,h,i)|0;re(m+272|0,h,i);eg(m,m+272|0,8,0)|0;eg(m,c,d,e)|0;re(m+272|0,d,e);eg(m,m+272|0,8,0)|0;Zg(m,m+256|0)|0;Sd(m,256);b=Oe(m+256|0,f)|0;Sd(m+256|0,16);do if(a)if(!b){jf(a,c,d,e,j,1,0,k)|0;b=0;break}else{Pb(a|0,0,d|0)|0;b=-1;break}while(0);l=m;return b|0}
function da(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+272|0;c[e+256>>2]=c[b>>2];c[e+256+4>>2]=c[b+4>>2];c[e+256+8>>2]=c[b+8>>2];c[e+256+12>>2]=c[b+12>>2];rb(e+256|0,35222);Ce(e+240|0,e+256|0);Ce(e+224|0,e+256|0);Ce(e+208|0,e+256|0);Ce(e+192|0,e+256|0);Ce(e+176|0,e+256|0);Ce(e+160|0,e+256|0);Ce(e+144|0,e+256|0);Ce(e,e+160|0);_d(e,1);Gd(e,e+144|0);Hd(e,1104);Gd(e+144|0,e);ae(e,1);Gd(e+160|0,e);Ce(e,e+192|0);_d(e,1);Gd(e,e+176|0);Hd(e,1104);Gd(e+176|0,e);ae(e,1);Gd(e+192|0,e);Ce(e,e+224|0);_d(e,1);Gd(e,e+208|0);Hd(e,1104);Gd(e+208|0,e);ae(e,1);Gd(e+224|0,e);Ce(e,e+256|0);_d(e,1);Gd(e,e+240|0);Hd(e,1104);Gd(e+240|0,e);ae(e,1);Gd(e+256|0,e);Ce(e,e+176|0);_d(e,2);Gd(e,e+144|0);Hd(e,1120);Gd(e+144|0,e);ae(e,2);Gd(e+176|0,e);Ce(e,e+192|0);_d(e,2);Gd(e,e+160|0);Hd(e,1120);Gd(e+160|0,e);ae(e,2);Gd(e+192|0,e);Ce(e,e+240|0);_d(e,2);Gd(e,e+208|0);Hd(e,1120);Gd(e+208|0,e);ae(e,2);Gd(e+240|0,e);Ce(e,e+256|0);_d(e,2);Gd(e,e+224|0);Hd(e,1120);Gd(e+224|0,e);ae(e,2);Gd(e+256|0,e);Ce(e,e+208|0);_d(e,4);Gd(e,e+144|0);Hd(e,1136);Gd(e+144|0,e);ae(e,4);Gd(e+208|0,e);Ce(e,e+224|0);_d(e,4);Gd(e,e+160|0);Hd(e,1136);Gd(e+160|0,e);ae(e,4);Gd(e+224|0,e);Ce(e,e+240|0);_d(e,4);Gd(e,e+176|0);Hd(e,1136);Gd(e+176|0,e);ae(e,4);Gd(e+240|0,e);Ce(e,e+256|0);_d(e,4);Gd(e,e+192|0);Hd(e,1136);Gd(e+192|0,e);ae(e,4);Gd(e+256|0,e);c[a>>2]=c[e+256>>2];c[a+4>>2]=c[e+256+4>>2];c[a+8>>2]=c[e+256+8>>2];c[a+12>>2]=c[e+256+12>>2];c[a+16>>2]=c[e+240>>2];c[a+16+4>>2]=c[e+240+4>>2];c[a+16+8>>2]=c[e+240+8>>2];c[a+16+12>>2]=c[e+240+12>>2];c[a+32>>2]=c[e+224>>2];c[a+32+4>>2]=c[e+224+4>>2];c[a+32+8>>2]=c[e+224+8>>2];c[a+32+12>>2]=c[e+224+12>>2];c[a+48>>2]=c[e+208>>2];c[a+48+4>>2]=c[e+208+4>>2];c[a+48+8>>2]=c[e+208+8>>2];c[a+48+12>>2]=c[e+208+12>>2];c[a+64>>2]=c[e+192>>2];c[a+64+4>>2]=c[e+192+4>>2];c[a+64+8>>2]=c[e+192+8>>2];c[a+64+12>>2]=c[e+192+12>>2];c[a+80>>2]=c[e+176>>2];c[a+80+4>>2]=c[e+176+4>>2];c[a+80+8>>2]=c[e+176+8>>2];c[a+80+12>>2]=c[e+176+12>>2];c[a+96>>2]=c[e+160>>2];c[a+96+4>>2]=c[e+160+4>>2];c[a+96+8>>2]=c[e+160+8>>2];c[a+96+12>>2]=c[e+160+12>>2];c[a+112>>2]=c[e+144>>2];c[a+112+4>>2]=c[e+144+4>>2];c[a+112+8>>2]=c[e+144+8>>2];c[a+112+12>>2]=c[e+144+12>>2];rb(e+256|0,35206);rb(e+240|0,35206);rb(e+224|0,35206);rb(e+208|0,35206);rb(e+192|0,35206);rb(e+176|0,35206);rb(e+160|0,35206);rb(e+144|0,35206);Gd(e+176|0,e+160|0);Gd(e+224|0,e+240|0);Gd(e+176|0,e+256|0);Gd(e+160|0,e+224|0);Gd(e+208|0,e+256|0);Gd(e+160|0,e+208|0);Gd(e+208|0,e+144|0);Gd(e+208|0,e+192|0);Gd(e+144|0,e+176|0);Gd(e+208|0,e+240|0);Gd(e+192|0,e+176|0);Gd(e+224|0,e+144|0);Gd(e+240|0,e+176|0);Ce(e+80|0,e+144|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+176|0);Ce(e+48|0,e+224|0);Ce(e+64|0,e+160|0);Gd(e+80|0,e+192|0);Gd(e+96|0,e+224|0);Gd(e+112|0,e+208|0);Gd(e+48|0,e+192|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+208|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+144|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+176|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+160|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+224|0);Ce(e+48|0,e+192|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+144|0);Hd(e+64|0,e+208|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+176|0);Jd(e+16|0,e+160|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+160|0);Ce(e+128|0,e+176|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+160|0);Gd(e+160|0,e+176|0);Hd(e+160|0,e+32|0);Hd(e+176|0,e+16|0);Gd(e+160|0,e+176|0);Gd(e+176|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+208|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+208|0);Hd(e+256|0,e+112|0);Hd(e+208|0,e+48|0);Gd(e+256|0,e+208|0);Gd(e+208|0,e+96|0);Gd(e+160|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+176|0,e+128|0);Gd(e+208|0,e+128|0);Ce(e+64|0,e+144|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+192|0);Gd(e+128|0,e+224|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+192|0);Gd(e+192|0,e+224|0);Hd(e+192|0,e+112|0);Hd(e+224|0,e+48|0);Gd(e+192|0,e+224|0);Gd(e+224|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+144|0);Gd(e+144|0,e+240|0);Hd(e+144|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+144|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+144|0,e+64|0);Gd(e+192|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+224|0,e+128|0);Gd(e+144|0,e+256|0);Gd(e+240|0,e+160|0);Gd(e+192|0,e+144|0);Gd(e+160|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+176|0);Gd(e+176|0,e+224|0);Gd(e+192|0,e+176|0);Gd(e+224|0,e+208|0);Gd(e+208|0,e+176|0);Gd(e+160|0,e+208|0);dh(e+256|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+192|0,35238);rb(e+160|0,35238);rb(e+208|0,35238);rb(e+144|0,35238);rb(e+224|0,35238);rb(e+176|0,35238);rb(e+256|0,35238);c[e+128>>2]=c[a>>2];c[e+128+4>>2]=c[a+4>>2];c[e+128+8>>2]=c[a+8>>2];c[e+128+12>>2]=c[a+12>>2];c[e+112>>2]=c[a+16>>2];c[e+112+4>>2]=c[a+16+4>>2];c[e+112+8>>2]=c[a+16+8>>2];c[e+112+12>>2]=c[a+16+12>>2];c[e+96>>2]=c[a+32>>2];c[e+96+4>>2]=c[a+32+4>>2];c[e+96+8>>2]=c[a+32+8>>2];c[e+96+12>>2]=c[a+32+12>>2];c[e+80>>2]=c[a+48>>2];c[e+80+4>>2]=c[a+48+4>>2];c[e+80+8>>2]=c[a+48+8>>2];c[e+80+12>>2]=c[a+48+12>>2];c[e+64>>2]=c[a+64>>2];c[e+64+4>>2]=c[a+64+4>>2];c[e+64+8>>2]=c[a+64+8>>2];c[e+64+12>>2]=c[a+64+12>>2];c[e+48>>2]=c[a+80>>2];c[e+48+4>>2]=c[a+80+4>>2];c[e+48+8>>2]=c[a+80+8>>2];c[e+48+12>>2]=c[a+80+12>>2];c[e+32>>2]=c[a+96>>2];c[e+32+4>>2]=c[a+96+4>>2];c[e+32+8>>2]=c[a+96+8>>2];c[e+32+12>>2]=c[a+96+12>>2];c[e+16>>2]=c[a+112>>2];c[e+16+4>>2]=c[a+112+4>>2];c[e+16+8>>2]=c[a+112+8>>2];c[e+16+12>>2]=c[a+112+12>>2];Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);c[a+128>>2]=c[e+256>>2];c[a+128+4>>2]=c[e+256+4>>2];c[a+128+8>>2]=c[e+256+8>>2];c[a+128+12>>2]=c[e+256+12>>2];c[a+144>>2]=c[e+240>>2];c[a+144+4>>2]=c[e+240+4>>2];c[a+144+8>>2]=c[e+240+8>>2];c[a+144+12>>2]=c[e+240+12>>2];c[a+160>>2]=c[e+192>>2];c[a+160+4>>2]=c[e+192+4>>2];c[a+160+8>>2]=c[e+192+8>>2];c[a+160+12>>2]=c[e+192+12>>2];c[a+176>>2]=c[e+160>>2];c[a+176+4>>2]=c[e+160+4>>2];c[a+176+8>>2]=c[e+160+8>>2];c[a+176+12>>2]=c[e+160+12>>2];c[a+192>>2]=c[e+208>>2];c[a+192+4>>2]=c[e+208+4>>2];c[a+192+8>>2]=c[e+208+8>>2];c[a+192+12>>2]=c[e+208+12>>2];c[a+208>>2]=c[e+144>>2];c[a+208+4>>2]=c[e+144+4>>2];c[a+208+8>>2]=c[e+144+8>>2];c[a+208+12>>2]=c[e+144+12>>2];c[a+224>>2]=c[e+224>>2];c[a+224+4>>2]=c[e+224+4>>2];c[a+224+8>>2]=c[e+224+8>>2];c[a+224+12>>2]=c[e+224+12>>2];c[a+240>>2]=c[e+176>>2];c[a+240+4>>2]=c[e+176+4>>2];c[a+240+8>>2]=c[e+176+8>>2];c[a+240+12>>2]=c[e+176+12>>2];Le(e+256|0);Le(e+240|0);Le(e+144|0);Le(e+224|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+192|0,35206);rb(e+160|0,35206);rb(e+208|0,35206);rb(e+144|0,35206);rb(e+224|0,35206);rb(e+176|0,35206);Gd(e+144|0,e+224|0);Gd(e+192|0,e+240|0);Gd(e+144|0,e+256|0);Gd(e+224|0,e+192|0);Gd(e+160|0,e+256|0);Gd(e+224|0,e+160|0);Gd(e+160|0,e+176|0);Gd(e+160|0,e+208|0);Gd(e+176|0,e+144|0);Gd(e+160|0,e+240|0);Gd(e+208|0,e+144|0);Gd(e+192|0,e+176|0);Gd(e+240|0,e+144|0);Ce(e+80|0,e+176|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+144|0);Ce(e+48|0,e+192|0);Ce(e+64|0,e+224|0);Gd(e+80|0,e+208|0);Gd(e+96|0,e+192|0);Gd(e+112|0,e+160|0);Gd(e+48|0,e+208|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+160|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+176|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+144|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+224|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+192|0);Ce(e+48|0,e+208|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+176|0);Hd(e+64|0,e+160|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+144|0);Jd(e+16|0,e+224|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+224|0);Ce(e+128|0,e+144|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+224|0);Gd(e+224|0,e+144|0);Hd(e+224|0,e+32|0);Hd(e+144|0,e+16|0);Gd(e+224|0,e+144|0);Gd(e+144|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+160|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+160|0);Hd(e+256|0,e+112|0);Hd(e+160|0,e+48|0);Gd(e+256|0,e+160|0);Gd(e+160|0,e+96|0);Gd(e+224|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+144|0,e+128|0);Gd(e+160|0,e+128|0);Ce(e+64|0,e+176|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+208|0);Gd(e+128|0,e+192|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+208|0);Gd(e+208|0,e+192|0);Hd(e+208|0,e+112|0);Hd(e+192|0,e+48|0);Gd(e+208|0,e+192|0);Gd(e+192|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+176|0);Gd(e+176|0,e+240|0);Hd(e+176|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+176|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+176|0,e+64|0);Gd(e+208|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+192|0,e+128|0);Gd(e+176|0,e+256|0);Gd(e+240|0,e+224|0);Gd(e+208|0,e+176|0);Gd(e+224|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+144|0);Gd(e+144|0,e+192|0);Gd(e+208|0,e+144|0);Gd(e+192|0,e+160|0);Gd(e+160|0,e+144|0);Gd(e+224|0,e+160|0);dh(e+240|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+208|0,35238);rb(e+224|0,35238);rb(e+160|0,35238);rb(e+176|0,35238);rb(e+192|0,35238);rb(e+144|0,35238);c[e+128>>2]=c[a+128>>2];c[e+128+4>>2]=c[a+128+4>>2];c[e+128+8>>2]=c[a+128+8>>2];c[e+128+12>>2]=c[a+128+12>>2];c[e+112>>2]=c[a+144>>2];c[e+112+4>>2]=c[a+144+4>>2];c[e+112+8>>2]=c[a+144+8>>2];c[e+112+12>>2]=c[a+144+12>>2];c[e+96>>2]=c[a+160>>2];c[e+96+4>>2]=c[a+160+4>>2];c[e+96+8>>2]=c[a+160+8>>2];c[e+96+12>>2]=c[a+160+12>>2];c[e+80>>2]=c[a+176>>2];c[e+80+4>>2]=c[a+176+4>>2];c[e+80+8>>2]=c[a+176+8>>2];c[e+80+12>>2]=c[a+176+12>>2];c[e+64>>2]=c[a+192>>2];c[e+64+4>>2]=c[a+192+4>>2];c[e+64+8>>2]=c[a+192+8>>2];c[e+64+12>>2]=c[a+192+12>>2];c[e+48>>2]=c[a+208>>2];c[e+48+4>>2]=c[a+208+4>>2];c[e+48+8>>2]=c[a+208+8>>2];c[e+48+12>>2]=c[a+208+12>>2];c[e+32>>2]=c[a+224>>2];c[e+32+4>>2]=c[a+224+4>>2];c[e+32+8>>2]=c[a+224+8>>2];c[e+32+12>>2]=c[a+224+12>>2];c[e+16>>2]=c[a+240>>2];c[e+16+4>>2]=c[a+240+4>>2];c[e+16+8>>2]=c[a+240+8>>2];c[e+16+12>>2]=c[a+240+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);c[a+256>>2]=c[e+256>>2];c[a+256+4>>2]=c[e+256+4>>2];c[a+256+8>>2]=c[e+256+8>>2];c[a+256+12>>2]=c[e+256+12>>2];c[a+272>>2]=c[e+240>>2];c[a+272+4>>2]=c[e+240+4>>2];c[a+272+8>>2]=c[e+240+8>>2];c[a+272+12>>2]=c[e+240+12>>2];c[a+288>>2]=c[e+208>>2];c[a+288+4>>2]=c[e+208+4>>2];c[a+288+8>>2]=c[e+208+8>>2];c[a+288+12>>2]=c[e+208+12>>2];c[a+304>>2]=c[e+224>>2];c[a+304+4>>2]=c[e+224+4>>2];c[a+304+8>>2]=c[e+224+8>>2];c[a+304+12>>2]=c[e+224+12>>2];c[a+320>>2]=c[e+160>>2];c[a+320+4>>2]=c[e+160+4>>2];c[a+320+8>>2]=c[e+160+8>>2];c[a+320+12>>2]=c[e+160+12>>2];c[a+336>>2]=c[e+176>>2];c[a+336+4>>2]=c[e+176+4>>2];c[a+336+8>>2]=c[e+176+8>>2];c[a+336+12>>2]=c[e+176+12>>2];c[a+352>>2]=c[e+192>>2];c[a+352+4>>2]=c[e+192+4>>2];c[a+352+8>>2]=c[e+192+8>>2];c[a+352+12>>2]=c[e+192+12>>2];c[a+368>>2]=c[e+144>>2];c[a+368+4>>2]=c[e+144+4>>2];c[a+368+8>>2]=c[e+144+8>>2];c[a+368+12>>2]=c[e+144+12>>2];Le(e+256|0);Le(e+240|0);Le(e+176|0);Le(e+192|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+208|0,35206);rb(e+224|0,35206);rb(e+160|0,35206);rb(e+176|0,35206);rb(e+192|0,35206);rb(e+144|0,35206);Gd(e+176|0,e+192|0);Gd(e+208|0,e+240|0);Gd(e+176|0,e+256|0);Gd(e+192|0,e+208|0);Gd(e+224|0,e+256|0);Gd(e+192|0,e+224|0);Gd(e+224|0,e+144|0);Gd(e+224|0,e+160|0);Gd(e+144|0,e+176|0);Gd(e+224|0,e+240|0);Gd(e+160|0,e+176|0);Gd(e+208|0,e+144|0);Gd(e+240|0,e+176|0);Ce(e+80|0,e+144|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+176|0);Ce(e+48|0,e+208|0);Ce(e+64|0,e+192|0);Gd(e+80|0,e+160|0);Gd(e+96|0,e+208|0);Gd(e+112|0,e+224|0);Gd(e+48|0,e+160|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+224|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+144|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+176|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+192|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+208|0);Ce(e+48|0,e+160|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+144|0);Hd(e+64|0,e+224|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+176|0);Jd(e+16|0,e+192|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+192|0);Ce(e+128|0,e+176|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+192|0);Gd(e+192|0,e+176|0);Hd(e+192|0,e+32|0);Hd(e+176|0,e+16|0);Gd(e+192|0,e+176|0);Gd(e+176|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+224|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+224|0);Hd(e+256|0,e+112|0);Hd(e+224|0,e+48|0);Gd(e+256|0,e+224|0);Gd(e+224|0,e+96|0);Gd(e+192|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+176|0,e+128|0);Gd(e+224|0,e+128|0);Ce(e+64|0,e+144|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+160|0);Gd(e+128|0,e+208|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+160|0);Gd(e+160|0,e+208|0);Hd(e+160|0,e+112|0);Hd(e+208|0,e+48|0);Gd(e+160|0,e+208|0);Gd(e+208|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+144|0);Gd(e+144|0,e+240|0);Hd(e+144|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+144|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+144|0,e+64|0);Gd(e+160|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+208|0,e+128|0);Gd(e+144|0,e+256|0);Gd(e+240|0,e+192|0);Gd(e+160|0,e+144|0);Gd(e+192|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+176|0);Gd(e+176|0,e+208|0);Gd(e+160|0,e+176|0);Gd(e+208|0,e+224|0);Gd(e+224|0,e+176|0);Gd(e+192|0,e+224|0);dh(e+160|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+160|0,35238);rb(e+192|0,35238);rb(e+224|0,35238);rb(e+144|0,35238);rb(e+208|0,35238);rb(e+176|0,35238);c[e+128>>2]=c[a+256>>2];c[e+128+4>>2]=c[a+256+4>>2];c[e+128+8>>2]=c[a+256+8>>2];c[e+128+12>>2]=c[a+256+12>>2];c[e+112>>2]=c[a+272>>2];c[e+112+4>>2]=c[a+272+4>>2];c[e+112+8>>2]=c[a+272+8>>2];c[e+112+12>>2]=c[a+272+12>>2];c[e+96>>2]=c[a+288>>2];c[e+96+4>>2]=c[a+288+4>>2];c[e+96+8>>2]=c[a+288+8>>2];c[e+96+12>>2]=c[a+288+12>>2];c[e+80>>2]=c[a+304>>2];c[e+80+4>>2]=c[a+304+4>>2];c[e+80+8>>2]=c[a+304+8>>2];c[e+80+12>>2]=c[a+304+12>>2];c[e+64>>2]=c[a+320>>2];c[e+64+4>>2]=c[a+320+4>>2];c[e+64+8>>2]=c[a+320+8>>2];c[e+64+12>>2]=c[a+320+12>>2];c[e+48>>2]=c[a+336>>2];c[e+48+4>>2]=c[a+336+4>>2];c[e+48+8>>2]=c[a+336+8>>2];c[e+48+12>>2]=c[a+336+12>>2];c[e+32>>2]=c[a+352>>2];c[e+32+4>>2]=c[a+352+4>>2];c[e+32+8>>2]=c[a+352+8>>2];c[e+32+12>>2]=c[a+352+12>>2];c[e+16>>2]=c[a+368>>2];c[e+16+4>>2]=c[a+368+4>>2];c[e+16+8>>2]=c[a+368+8>>2];c[e+16+12>>2]=c[a+368+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);c[a+384>>2]=c[e+256>>2];c[a+384+4>>2]=c[e+256+4>>2];c[a+384+8>>2]=c[e+256+8>>2];c[a+384+12>>2]=c[e+256+12>>2];c[a+400>>2]=c[e+240>>2];c[a+400+4>>2]=c[e+240+4>>2];c[a+400+8>>2]=c[e+240+8>>2];c[a+400+12>>2]=c[e+240+12>>2];c[a+416>>2]=c[e+160>>2];c[a+416+4>>2]=c[e+160+4>>2];c[a+416+8>>2]=c[e+160+8>>2];c[a+416+12>>2]=c[e+160+12>>2];c[a+432>>2]=c[e+192>>2];c[a+432+4>>2]=c[e+192+4>>2];c[a+432+8>>2]=c[e+192+8>>2];c[a+432+12>>2]=c[e+192+12>>2];c[a+448>>2]=c[e+224>>2];c[a+448+4>>2]=c[e+224+4>>2];c[a+448+8>>2]=c[e+224+8>>2];c[a+448+12>>2]=c[e+224+12>>2];c[a+464>>2]=c[e+144>>2];c[a+464+4>>2]=c[e+144+4>>2];c[a+464+8>>2]=c[e+144+8>>2];c[a+464+12>>2]=c[e+144+12>>2];c[a+480>>2]=c[e+208>>2];c[a+480+4>>2]=c[e+208+4>>2];c[a+480+8>>2]=c[e+208+8>>2];c[a+480+12>>2]=c[e+208+12>>2];c[a+496>>2]=c[e+176>>2];c[a+496+4>>2]=c[e+176+4>>2];c[a+496+8>>2]=c[e+176+8>>2];c[a+496+12>>2]=c[e+176+12>>2];Le(e+256|0);Le(e+240|0);Le(e+144|0);Le(e+208|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+160|0,35206);rb(e+192|0,35206);rb(e+224|0,35206);rb(e+144|0,35206);rb(e+208|0,35206);rb(e+176|0,35206);Gd(e+144|0,e+208|0);Gd(e+160|0,e+240|0);Gd(e+144|0,e+256|0);Gd(e+208|0,e+160|0);Gd(e+192|0,e+256|0);Gd(e+208|0,e+192|0);Gd(e+192|0,e+176|0);Gd(e+192|0,e+224|0);Gd(e+176|0,e+144|0);Gd(e+192|0,e+240|0);Gd(e+224|0,e+144|0);Gd(e+160|0,e+176|0);Gd(e+240|0,e+144|0);Ce(e+80|0,e+176|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+144|0);Ce(e+48|0,e+160|0);Ce(e+64|0,e+208|0);Gd(e+80|0,e+224|0);Gd(e+96|0,e+160|0);Gd(e+112|0,e+192|0);Gd(e+48|0,e+224|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+192|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+176|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+144|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+208|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+160|0);Ce(e+48|0,e+224|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+176|0);Hd(e+64|0,e+192|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+144|0);Jd(e+16|0,e+208|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+208|0);Ce(e+128|0,e+144|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+208|0);Gd(e+208|0,e+144|0);Hd(e+208|0,e+32|0);Hd(e+144|0,e+16|0);Gd(e+208|0,e+144|0);Gd(e+144|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+192|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+192|0);Hd(e+256|0,e+112|0);Hd(e+192|0,e+48|0);Gd(e+256|0,e+192|0);Gd(e+192|0,e+96|0);Gd(e+208|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+144|0,e+128|0);Gd(e+192|0,e+128|0);Ce(e+64|0,e+176|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+224|0);Gd(e+128|0,e+160|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+224|0);Gd(e+224|0,e+160|0);Hd(e+224|0,e+112|0);Hd(e+160|0,e+48|0);Gd(e+224|0,e+160|0);Gd(e+160|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+176|0);Gd(e+176|0,e+240|0);Hd(e+176|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+176|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+176|0,e+64|0);Gd(e+224|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+160|0,e+128|0);Gd(e+176|0,e+256|0);Gd(e+240|0,e+208|0);Gd(e+224|0,e+176|0);Gd(e+208|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+144|0);Gd(e+144|0,e+160|0);Gd(e+224|0,e+144|0);Gd(e+160|0,e+192|0);Gd(e+192|0,e+144|0);Gd(e+208|0,e+192|0);dh(e+208|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+224|0,35238);rb(e+208|0,35238);rb(e+192|0,35238);rb(e+176|0,35238);rb(e+160|0,35238);rb(e+144|0,35238);c[e+128>>2]=c[a+384>>2];c[e+128+4>>2]=c[a+384+4>>2];c[e+128+8>>2]=c[a+384+8>>2];c[e+128+12>>2]=c[a+384+12>>2];c[e+112>>2]=c[a+400>>2];c[e+112+4>>2]=c[a+400+4>>2];c[e+112+8>>2]=c[a+400+8>>2];c[e+112+12>>2]=c[a+400+12>>2];c[e+96>>2]=c[a+416>>2];c[e+96+4>>2]=c[a+416+4>>2];c[e+96+8>>2]=c[a+416+8>>2];c[e+96+12>>2]=c[a+416+12>>2];c[e+80>>2]=c[a+432>>2];c[e+80+4>>2]=c[a+432+4>>2];c[e+80+8>>2]=c[a+432+8>>2];c[e+80+12>>2]=c[a+432+12>>2];c[e+64>>2]=c[a+448>>2];c[e+64+4>>2]=c[a+448+4>>2];c[e+64+8>>2]=c[a+448+8>>2];c[e+64+12>>2]=c[a+448+12>>2];c[e+48>>2]=c[a+464>>2];c[e+48+4>>2]=c[a+464+4>>2];c[e+48+8>>2]=c[a+464+8>>2];c[e+48+12>>2]=c[a+464+12>>2];c[e+32>>2]=c[a+480>>2];c[e+32+4>>2]=c[a+480+4>>2];c[e+32+8>>2]=c[a+480+8>>2];c[e+32+12>>2]=c[a+480+12>>2];c[e+16>>2]=c[a+496>>2];c[e+16+4>>2]=c[a+496+4>>2];c[e+16+8>>2]=c[a+496+8>>2];c[e+16+12>>2]=c[a+496+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);c[a+512>>2]=c[e+256>>2];c[a+512+4>>2]=c[e+256+4>>2];c[a+512+8>>2]=c[e+256+8>>2];c[a+512+12>>2]=c[e+256+12>>2];c[a+528>>2]=c[e+240>>2];c[a+528+4>>2]=c[e+240+4>>2];c[a+528+8>>2]=c[e+240+8>>2];c[a+528+12>>2]=c[e+240+12>>2];c[a+544>>2]=c[e+224>>2];c[a+544+4>>2]=c[e+224+4>>2];c[a+544+8>>2]=c[e+224+8>>2];c[a+544+12>>2]=c[e+224+12>>2];c[a+560>>2]=c[e+208>>2];c[a+560+4>>2]=c[e+208+4>>2];c[a+560+8>>2]=c[e+208+8>>2];c[a+560+12>>2]=c[e+208+12>>2];c[a+576>>2]=c[e+192>>2];c[a+576+4>>2]=c[e+192+4>>2];c[a+576+8>>2]=c[e+192+8>>2];c[a+576+12>>2]=c[e+192+12>>2];c[a+592>>2]=c[e+176>>2];c[a+592+4>>2]=c[e+176+4>>2];c[a+592+8>>2]=c[e+176+8>>2];c[a+592+12>>2]=c[e+176+12>>2];c[a+608>>2]=c[e+160>>2];c[a+608+4>>2]=c[e+160+4>>2];c[a+608+8>>2]=c[e+160+8>>2];c[a+608+12>>2]=c[e+160+12>>2];c[a+624>>2]=c[e+144>>2];c[a+624+4>>2]=c[e+144+4>>2];c[a+624+8>>2]=c[e+144+8>>2];c[a+624+12>>2]=c[e+144+12>>2];Le(e+256|0);Le(e+240|0);Le(e+176|0);Le(e+160|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+224|0,35206);rb(e+208|0,35206);rb(e+192|0,35206);rb(e+176|0,35206);rb(e+160|0,35206);rb(e+144|0,35206);Gd(e+176|0,e+160|0);Gd(e+224|0,e+240|0);Gd(e+176|0,e+256|0);Gd(e+160|0,e+224|0);Gd(e+208|0,e+256|0);Gd(e+160|0,e+208|0);Gd(e+208|0,e+144|0);Gd(e+208|0,e+192|0);Gd(e+144|0,e+176|0);Gd(e+208|0,e+240|0);Gd(e+192|0,e+176|0);Gd(e+224|0,e+144|0);Gd(e+240|0,e+176|0);Ce(e+80|0,e+144|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+176|0);Ce(e+48|0,e+224|0);Ce(e+64|0,e+160|0);Gd(e+80|0,e+192|0);Gd(e+96|0,e+224|0);Gd(e+112|0,e+208|0);Gd(e+48|0,e+192|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+208|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+144|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+176|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+160|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+224|0);Ce(e+48|0,e+192|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+144|0);Hd(e+64|0,e+208|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+176|0);Jd(e+16|0,e+160|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+160|0);Ce(e+128|0,e+176|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+160|0);Gd(e+160|0,e+176|0);Hd(e+160|0,e+32|0);Hd(e+176|0,e+16|0);Gd(e+160|0,e+176|0);Gd(e+176|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+208|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+208|0);Hd(e+256|0,e+112|0);Hd(e+208|0,e+48|0);Gd(e+256|0,e+208|0);Gd(e+208|0,e+96|0);Gd(e+160|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+176|0,e+128|0);Gd(e+208|0,e+128|0);Ce(e+64|0,e+144|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+192|0);Gd(e+128|0,e+224|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+192|0);Gd(e+192|0,e+224|0);Hd(e+192|0,e+112|0);Hd(e+224|0,e+48|0);Gd(e+192|0,e+224|0);Gd(e+224|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+144|0);Gd(e+144|0,e+240|0);Hd(e+144|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+144|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+144|0,e+64|0);Gd(e+192|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+224|0,e+128|0);Gd(e+144|0,e+256|0);Gd(e+240|0,e+160|0);Gd(e+192|0,e+144|0);Gd(e+160|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+176|0);Gd(e+176|0,e+224|0);Gd(e+192|0,e+176|0);Gd(e+224|0,e+208|0);Gd(e+208|0,e+176|0);Gd(e+160|0,e+208|0);dh(e+208|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+192|0,35238);rb(e+160|0,35238);rb(e+208|0,35238);rb(e+144|0,35238);rb(e+224|0,35238);rb(e+176|0,35238);c[e+128>>2]=c[a+512>>2];c[e+128+4>>2]=c[a+512+4>>2];c[e+128+8>>2]=c[a+512+8>>2];c[e+128+12>>2]=c[a+512+12>>2];c[e+112>>2]=c[a+528>>2];c[e+112+4>>2]=c[a+528+4>>2];c[e+112+8>>2]=c[a+528+8>>2];c[e+112+12>>2]=c[a+528+12>>2];c[e+96>>2]=c[a+544>>2];c[e+96+4>>2]=c[a+544+4>>2];c[e+96+8>>2]=c[a+544+8>>2];c[e+96+12>>2]=c[a+544+12>>2];c[e+80>>2]=c[a+560>>2];c[e+80+4>>2]=c[a+560+4>>2];c[e+80+8>>2]=c[a+560+8>>2];c[e+80+12>>2]=c[a+560+12>>2];c[e+64>>2]=c[a+576>>2];c[e+64+4>>2]=c[a+576+4>>2];c[e+64+8>>2]=c[a+576+8>>2];c[e+64+12>>2]=c[a+576+12>>2];c[e+48>>2]=c[a+592>>2];c[e+48+4>>2]=c[a+592+4>>2];c[e+48+8>>2]=c[a+592+8>>2];c[e+48+12>>2]=c[a+592+12>>2];c[e+32>>2]=c[a+608>>2];c[e+32+4>>2]=c[a+608+4>>2];c[e+32+8>>2]=c[a+608+8>>2];c[e+32+12>>2]=c[a+608+12>>2];c[e+16>>2]=c[a+624>>2];c[e+16+4>>2]=c[a+624+4>>2];c[e+16+8>>2]=c[a+624+8>>2];c[e+16+12>>2]=c[a+624+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);c[a+640>>2]=c[e+256>>2];c[a+640+4>>2]=c[e+256+4>>2];c[a+640+8>>2]=c[e+256+8>>2];c[a+640+12>>2]=c[e+256+12>>2];c[a+656>>2]=c[e+240>>2];c[a+656+4>>2]=c[e+240+4>>2];c[a+656+8>>2]=c[e+240+8>>2];c[a+656+12>>2]=c[e+240+12>>2];c[a+672>>2]=c[e+192>>2];c[a+672+4>>2]=c[e+192+4>>2];c[a+672+8>>2]=c[e+192+8>>2];c[a+672+12>>2]=c[e+192+12>>2];c[a+688>>2]=c[e+160>>2];c[a+688+4>>2]=c[e+160+4>>2];c[a+688+8>>2]=c[e+160+8>>2];c[a+688+12>>2]=c[e+160+12>>2];c[a+704>>2]=c[e+208>>2];c[a+704+4>>2]=c[e+208+4>>2];c[a+704+8>>2]=c[e+208+8>>2];c[a+704+12>>2]=c[e+208+12>>2];c[a+720>>2]=c[e+144>>2];c[a+720+4>>2]=c[e+144+4>>2];c[a+720+8>>2]=c[e+144+8>>2];c[a+720+12>>2]=c[e+144+12>>2];c[a+736>>2]=c[e+224>>2];c[a+736+4>>2]=c[e+224+4>>2];c[a+736+8>>2]=c[e+224+8>>2];c[a+736+12>>2]=c[e+224+12>>2];c[a+752>>2]=c[e+176>>2];c[a+752+4>>2]=c[e+176+4>>2];c[a+752+8>>2]=c[e+176+8>>2];c[a+752+12>>2]=c[e+176+12>>2];Le(e+256|0);Le(e+240|0);Le(e+144|0);Le(e+224|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+192|0,35206);rb(e+160|0,35206);rb(e+208|0,35206);rb(e+144|0,35206);rb(e+224|0,35206);rb(e+176|0,35206);Gd(e+144|0,e+224|0);Gd(e+192|0,e+240|0);Gd(e+144|0,e+256|0);Gd(e+224|0,e+192|0);Gd(e+160|0,e+256|0);Gd(e+224|0,e+160|0);Gd(e+160|0,e+176|0);Gd(e+160|0,e+208|0);Gd(e+176|0,e+144|0);Gd(e+160|0,e+240|0);Gd(e+208|0,e+144|0);Gd(e+192|0,e+176|0);Gd(e+240|0,e+144|0);Ce(e+80|0,e+176|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+144|0);Ce(e+48|0,e+192|0);Ce(e+64|0,e+224|0);Gd(e+80|0,e+208|0);Gd(e+96|0,e+192|0);Gd(e+112|0,e+160|0);Gd(e+48|0,e+208|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+160|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+176|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+144|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+224|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+192|0);Ce(e+48|0,e+208|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+176|0);Hd(e+64|0,e+160|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+144|0);Jd(e+16|0,e+224|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+224|0);Ce(e+128|0,e+144|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+224|0);Gd(e+224|0,e+144|0);Hd(e+224|0,e+32|0);Hd(e+144|0,e+16|0);Gd(e+224|0,e+144|0);Gd(e+144|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+160|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+160|0);Hd(e+256|0,e+112|0);Hd(e+160|0,e+48|0);Gd(e+256|0,e+160|0);Gd(e+160|0,e+96|0);Gd(e+224|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+144|0,e+128|0);Gd(e+160|0,e+128|0);Ce(e+64|0,e+176|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+208|0);Gd(e+128|0,e+192|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+208|0);Gd(e+208|0,e+192|0);Hd(e+208|0,e+112|0);Hd(e+192|0,e+48|0);Gd(e+208|0,e+192|0);Gd(e+192|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+176|0);Gd(e+176|0,e+240|0);Hd(e+176|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+176|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+176|0,e+64|0);Gd(e+208|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+192|0,e+128|0);Gd(e+176|0,e+256|0);Gd(e+240|0,e+224|0);Gd(e+208|0,e+176|0);Gd(e+224|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+144|0);Gd(e+144|0,e+192|0);Gd(e+208|0,e+144|0);Gd(e+192|0,e+160|0);Gd(e+160|0,e+144|0);Gd(e+224|0,e+160|0);dh(e+176|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+208|0,35238);rb(e+224|0,35238);rb(e+160|0,35238);rb(e+176|0,35238);rb(e+192|0,35238);rb(e+144|0,35238);c[e+128>>2]=c[a+640>>2];c[e+128+4>>2]=c[a+640+4>>2];c[e+128+8>>2]=c[a+640+8>>2];c[e+128+12>>2]=c[a+640+12>>2];c[e+112>>2]=c[a+656>>2];c[e+112+4>>2]=c[a+656+4>>2];c[e+112+8>>2]=c[a+656+8>>2];c[e+112+12>>2]=c[a+656+12>>2];c[e+96>>2]=c[a+672>>2];c[e+96+4>>2]=c[a+672+4>>2];c[e+96+8>>2]=c[a+672+8>>2];c[e+96+12>>2]=c[a+672+12>>2];c[e+80>>2]=c[a+688>>2];c[e+80+4>>2]=c[a+688+4>>2];c[e+80+8>>2]=c[a+688+8>>2];c[e+80+12>>2]=c[a+688+12>>2];c[e+64>>2]=c[a+704>>2];c[e+64+4>>2]=c[a+704+4>>2];c[e+64+8>>2]=c[a+704+8>>2];c[e+64+12>>2]=c[a+704+12>>2];c[e+48>>2]=c[a+720>>2];c[e+48+4>>2]=c[a+720+4>>2];c[e+48+8>>2]=c[a+720+8>>2];c[e+48+12>>2]=c[a+720+12>>2];c[e+32>>2]=c[a+736>>2];c[e+32+4>>2]=c[a+736+4>>2];c[e+32+8>>2]=c[a+736+8>>2];c[e+32+12>>2]=c[a+736+12>>2];c[e+16>>2]=c[a+752>>2];c[e+16+4>>2]=c[a+752+4>>2];c[e+16+8>>2]=c[a+752+8>>2];c[e+16+12>>2]=c[a+752+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);c[a+768>>2]=c[e+256>>2];c[a+768+4>>2]=c[e+256+4>>2];c[a+768+8>>2]=c[e+256+8>>2];c[a+768+12>>2]=c[e+256+12>>2];c[a+784>>2]=c[e+240>>2];c[a+784+4>>2]=c[e+240+4>>2];c[a+784+8>>2]=c[e+240+8>>2];c[a+784+12>>2]=c[e+240+12>>2];c[a+800>>2]=c[e+208>>2];c[a+800+4>>2]=c[e+208+4>>2];c[a+800+8>>2]=c[e+208+8>>2];c[a+800+12>>2]=c[e+208+12>>2];c[a+816>>2]=c[e+224>>2];c[a+816+4>>2]=c[e+224+4>>2];c[a+816+8>>2]=c[e+224+8>>2];c[a+816+12>>2]=c[e+224+12>>2];c[a+832>>2]=c[e+160>>2];c[a+832+4>>2]=c[e+160+4>>2];c[a+832+8>>2]=c[e+160+8>>2];c[a+832+12>>2]=c[e+160+12>>2];c[a+848>>2]=c[e+176>>2];c[a+848+4>>2]=c[e+176+4>>2];c[a+848+8>>2]=c[e+176+8>>2];c[a+848+12>>2]=c[e+176+12>>2];c[a+864>>2]=c[e+192>>2];c[a+864+4>>2]=c[e+192+4>>2];c[a+864+8>>2]=c[e+192+8>>2];c[a+864+12>>2]=c[e+192+12>>2];c[a+880>>2]=c[e+144>>2];c[a+880+4>>2]=c[e+144+4>>2];c[a+880+8>>2]=c[e+144+8>>2];c[a+880+12>>2]=c[e+144+12>>2];Le(e+256|0);Le(e+240|0);Le(e+176|0);Le(e+192|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+208|0,35206);rb(e+224|0,35206);rb(e+160|0,35206);rb(e+176|0,35206);rb(e+192|0,35206);rb(e+144|0,35206);Gd(e+176|0,e+192|0);Gd(e+208|0,e+240|0);Gd(e+176|0,e+256|0);Gd(e+192|0,e+208|0);Gd(e+224|0,e+256|0);Gd(e+192|0,e+224|0);Gd(e+224|0,e+144|0);Gd(e+224|0,e+160|0);Gd(e+144|0,e+176|0);Gd(e+224|0,e+240|0);Gd(e+160|0,e+176|0);Gd(e+208|0,e+144|0);Gd(e+240|0,e+176|0);Ce(e+80|0,e+144|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+176|0);Ce(e+48|0,e+208|0);Ce(e+64|0,e+192|0);Gd(e+80|0,e+160|0);Gd(e+96|0,e+208|0);Gd(e+112|0,e+224|0);Gd(e+48|0,e+160|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+224|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+144|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+176|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+192|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+208|0);Ce(e+48|0,e+160|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+144|0);Hd(e+64|0,e+224|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+176|0);Jd(e+16|0,e+192|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+192|0);Ce(e+128|0,e+176|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+192|0);Gd(e+192|0,e+176|0);Hd(e+192|0,e+32|0);Hd(e+176|0,e+16|0);Gd(e+192|0,e+176|0);Gd(e+176|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+224|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+224|0);Hd(e+256|0,e+112|0);Hd(e+224|0,e+48|0);Gd(e+256|0,e+224|0);Gd(e+224|0,e+96|0);Gd(e+192|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+176|0,e+128|0);Gd(e+224|0,e+128|0);Ce(e+64|0,e+144|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+160|0);Gd(e+128|0,e+208|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+160|0);Gd(e+160|0,e+208|0);Hd(e+160|0,e+112|0);Hd(e+208|0,e+48|0);Gd(e+160|0,e+208|0);Gd(e+208|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+144|0);Gd(e+144|0,e+240|0);Hd(e+144|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+144|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+144|0,e+64|0);Gd(e+160|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+208|0,e+128|0);Gd(e+144|0,e+256|0);Gd(e+240|0,e+192|0);Gd(e+160|0,e+144|0);Gd(e+192|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+176|0);Gd(e+176|0,e+208|0);Gd(e+160|0,e+176|0);Gd(e+208|0,e+224|0);Gd(e+224|0,e+176|0);Gd(e+192|0,e+224|0);dh(e+208|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+160|0,35238);rb(e+192|0,35238);rb(e+224|0,35238);rb(e+144|0,35238);rb(e+208|0,35238);rb(e+176|0,35238);c[e+128>>2]=c[a+768>>2];c[e+128+4>>2]=c[a+768+4>>2];c[e+128+8>>2]=c[a+768+8>>2];c[e+128+12>>2]=c[a+768+12>>2];c[e+112>>2]=c[a+784>>2];c[e+112+4>>2]=c[a+784+4>>2];c[e+112+8>>2]=c[a+784+8>>2];c[e+112+12>>2]=c[a+784+12>>2];c[e+96>>2]=c[a+800>>2];c[e+96+4>>2]=c[a+800+4>>2];c[e+96+8>>2]=c[a+800+8>>2];c[e+96+12>>2]=c[a+800+12>>2];c[e+80>>2]=c[a+816>>2];c[e+80+4>>2]=c[a+816+4>>2];c[e+80+8>>2]=c[a+816+8>>2];c[e+80+12>>2]=c[a+816+12>>2];c[e+64>>2]=c[a+832>>2];c[e+64+4>>2]=c[a+832+4>>2];c[e+64+8>>2]=c[a+832+8>>2];c[e+64+12>>2]=c[a+832+12>>2];c[e+48>>2]=c[a+848>>2];c[e+48+4>>2]=c[a+848+4>>2];c[e+48+8>>2]=c[a+848+8>>2];c[e+48+12>>2]=c[a+848+12>>2];c[e+32>>2]=c[a+864>>2];c[e+32+4>>2]=c[a+864+4>>2];c[e+32+8>>2]=c[a+864+8>>2];c[e+32+12>>2]=c[a+864+12>>2];c[e+16>>2]=c[a+880>>2];c[e+16+4>>2]=c[a+880+4>>2];c[e+16+8>>2]=c[a+880+8>>2];c[e+16+12>>2]=c[a+880+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+160|0,e+96|0);Gd(e+192|0,e+80|0);Gd(e+224|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+208|0,e+32|0);Gd(e+176|0,e+16|0);c[a+896>>2]=c[e+256>>2];c[a+896+4>>2]=c[e+256+4>>2];c[a+896+8>>2]=c[e+256+8>>2];c[a+896+12>>2]=c[e+256+12>>2];c[a+912>>2]=c[e+240>>2];c[a+912+4>>2]=c[e+240+4>>2];c[a+912+8>>2]=c[e+240+8>>2];c[a+912+12>>2]=c[e+240+12>>2];c[a+928>>2]=c[e+160>>2];c[a+928+4>>2]=c[e+160+4>>2];c[a+928+8>>2]=c[e+160+8>>2];c[a+928+12>>2]=c[e+160+12>>2];c[a+944>>2]=c[e+192>>2];c[a+944+4>>2]=c[e+192+4>>2];c[a+944+8>>2]=c[e+192+8>>2];c[a+944+12>>2]=c[e+192+12>>2];c[a+960>>2]=c[e+224>>2];c[a+960+4>>2]=c[e+224+4>>2];c[a+960+8>>2]=c[e+224+8>>2];c[a+960+12>>2]=c[e+224+12>>2];c[a+976>>2]=c[e+144>>2];c[a+976+4>>2]=c[e+144+4>>2];c[a+976+8>>2]=c[e+144+8>>2];c[a+976+12>>2]=c[e+144+12>>2];c[a+992>>2]=c[e+208>>2];c[a+992+4>>2]=c[e+208+4>>2];c[a+992+8>>2]=c[e+208+8>>2];c[a+992+12>>2]=c[e+208+12>>2];c[a+1008>>2]=c[e+176>>2];c[a+1008+4>>2]=c[e+176+4>>2];c[a+1008+8>>2]=c[e+176+8>>2];c[a+1008+12>>2]=c[e+176+12>>2];Le(e+256|0);Le(e+240|0);Le(e+144|0);Le(e+208|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+160|0,35206);rb(e+192|0,35206);rb(e+224|0,35206);rb(e+144|0,35206);rb(e+208|0,35206);rb(e+176|0,35206);Gd(e+144|0,e+208|0);Gd(e+160|0,e+240|0);Gd(e+144|0,e+256|0);Gd(e+208|0,e+160|0);Gd(e+192|0,e+256|0);Gd(e+208|0,e+192|0);Gd(e+192|0,e+176|0);Gd(e+192|0,e+224|0);Gd(e+176|0,e+144|0);Gd(e+192|0,e+240|0);Gd(e+224|0,e+144|0);Gd(e+160|0,e+176|0);Gd(e+240|0,e+144|0);Ce(e+80|0,e+176|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+144|0);Ce(e+48|0,e+160|0);Ce(e+64|0,e+208|0);Gd(e+80|0,e+224|0);Gd(e+96|0,e+160|0);Gd(e+112|0,e+192|0);Gd(e+48|0,e+224|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+192|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+176|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+144|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+208|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+160|0);Ce(e+48|0,e+224|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+176|0);Hd(e+64|0,e+192|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+144|0);Jd(e+16|0,e+208|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+208|0);Ce(e+128|0,e+144|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+208|0);Gd(e+208|0,e+144|0);Hd(e+208|0,e+32|0);Hd(e+144|0,e+16|0);Gd(e+208|0,e+144|0);Gd(e+144|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+192|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+192|0);Hd(e+256|0,e+112|0);Hd(e+192|0,e+48|0);Gd(e+256|0,e+192|0);Gd(e+192|0,e+96|0);Gd(e+208|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+144|0,e+128|0);Gd(e+192|0,e+128|0);Ce(e+64|0,e+176|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+224|0);Gd(e+128|0,e+160|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+224|0);Gd(e+224|0,e+160|0);Hd(e+224|0,e+112|0);Hd(e+160|0,e+48|0);Gd(e+224|0,e+160|0);Gd(e+160|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+176|0);Gd(e+176|0,e+240|0);Hd(e+176|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+176|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+176|0,e+64|0);Gd(e+224|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+160|0,e+128|0);Gd(e+176|0,e+256|0);Gd(e+240|0,e+208|0);Gd(e+224|0,e+176|0);Gd(e+208|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+144|0);Gd(e+144|0,e+160|0);Gd(e+224|0,e+144|0);Gd(e+160|0,e+192|0);Gd(e+192|0,e+144|0);Gd(e+208|0,e+192|0);dh(e+144|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+224|0,35238);rb(e+208|0,35238);rb(e+192|0,35238);rb(e+176|0,35238);rb(e+160|0,35238);rb(e+144|0,35238);c[e+128>>2]=c[a+896>>2];c[e+128+4>>2]=c[a+896+4>>2];c[e+128+8>>2]=c[a+896+8>>2];c[e+128+12>>2]=c[a+896+12>>2];c[e+112>>2]=c[a+912>>2];c[e+112+4>>2]=c[a+912+4>>2];c[e+112+8>>2]=c[a+912+8>>2];c[e+112+12>>2]=c[a+912+12>>2];c[e+96>>2]=c[a+928>>2];c[e+96+4>>2]=c[a+928+4>>2];c[e+96+8>>2]=c[a+928+8>>2];c[e+96+12>>2]=c[a+928+12>>2];c[e+80>>2]=c[a+944>>2];c[e+80+4>>2]=c[a+944+4>>2];c[e+80+8>>2]=c[a+944+8>>2];c[e+80+12>>2]=c[a+944+12>>2];c[e+64>>2]=c[a+960>>2];c[e+64+4>>2]=c[a+960+4>>2];c[e+64+8>>2]=c[a+960+8>>2];c[e+64+12>>2]=c[a+960+12>>2];c[e+48>>2]=c[a+976>>2];c[e+48+4>>2]=c[a+976+4>>2];c[e+48+8>>2]=c[a+976+8>>2];c[e+48+12>>2]=c[a+976+12>>2];c[e+32>>2]=c[a+992>>2];c[e+32+4>>2]=c[a+992+4>>2];c[e+32+8>>2]=c[a+992+8>>2];c[e+32+12>>2]=c[a+992+12>>2];c[e+16>>2]=c[a+1008>>2];c[e+16+4>>2]=c[a+1008+4>>2];c[e+16+8>>2]=c[a+1008+8>>2];c[e+16+12>>2]=c[a+1008+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+224|0,e+96|0);Gd(e+208|0,e+80|0);Gd(e+192|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+160|0,e+32|0);Gd(e+144|0,e+16|0);c[a+1024>>2]=c[e+256>>2];c[a+1024+4>>2]=c[e+256+4>>2];c[a+1024+8>>2]=c[e+256+8>>2];c[a+1024+12>>2]=c[e+256+12>>2];c[a+1040>>2]=c[e+240>>2];c[a+1040+4>>2]=c[e+240+4>>2];c[a+1040+8>>2]=c[e+240+8>>2];c[a+1040+12>>2]=c[e+240+12>>2];c[a+1056>>2]=c[e+224>>2];c[a+1056+4>>2]=c[e+224+4>>2];c[a+1056+8>>2]=c[e+224+8>>2];c[a+1056+12>>2]=c[e+224+12>>2];c[a+1072>>2]=c[e+208>>2];c[a+1072+4>>2]=c[e+208+4>>2];c[a+1072+8>>2]=c[e+208+8>>2];c[a+1072+12>>2]=c[e+208+12>>2];c[a+1088>>2]=c[e+192>>2];c[a+1088+4>>2]=c[e+192+4>>2];c[a+1088+8>>2]=c[e+192+8>>2];c[a+1088+12>>2]=c[e+192+12>>2];c[a+1104>>2]=c[e+176>>2];c[a+1104+4>>2]=c[e+176+4>>2];c[a+1104+8>>2]=c[e+176+8>>2];c[a+1104+12>>2]=c[e+176+12>>2];c[a+1120>>2]=c[e+160>>2];c[a+1120+4>>2]=c[e+160+4>>2];c[a+1120+8>>2]=c[e+160+8>>2];c[a+1120+12>>2]=c[e+160+12>>2];c[a+1136>>2]=c[e+144>>2];c[a+1136+4>>2]=c[e+144+4>>2];c[a+1136+8>>2]=c[e+144+8>>2];c[a+1136+12>>2]=c[e+144+12>>2];Le(e+256|0);Le(e+240|0);Le(e+176|0);Le(e+160|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+224|0,35206);rb(e+208|0,35206);rb(e+192|0,35206);rb(e+176|0,35206);rb(e+160|0,35206);rb(e+144|0,35206);Gd(e+176|0,e+160|0);Gd(e+224|0,e+240|0);Gd(e+176|0,e+256|0);Gd(e+160|0,e+224|0);Gd(e+208|0,e+256|0);Gd(e+160|0,e+208|0);Gd(e+208|0,e+144|0);Gd(e+208|0,e+192|0);Gd(e+144|0,e+176|0);Gd(e+208|0,e+240|0);Gd(e+192|0,e+176|0);Gd(e+224|0,e+144|0);Gd(e+240|0,e+176|0);Ce(e+80|0,e+144|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+176|0);Ce(e+48|0,e+224|0);Ce(e+64|0,e+160|0);Gd(e+80|0,e+192|0);Gd(e+96|0,e+224|0);Gd(e+112|0,e+208|0);Gd(e+48|0,e+192|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+208|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+144|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+176|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+160|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+224|0);Ce(e+48|0,e+192|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+144|0);Hd(e+64|0,e+208|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+176|0);Jd(e+16|0,e+160|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+160|0);Ce(e+128|0,e+176|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+160|0);Gd(e+160|0,e+176|0);Hd(e+160|0,e+32|0);Hd(e+176|0,e+16|0);Gd(e+160|0,e+176|0);Gd(e+176|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+208|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+208|0);Hd(e+256|0,e+112|0);Hd(e+208|0,e+48|0);Gd(e+256|0,e+208|0);Gd(e+208|0,e+96|0);Gd(e+160|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+176|0,e+128|0);Gd(e+208|0,e+128|0);Ce(e+64|0,e+144|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+192|0);Gd(e+128|0,e+224|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+192|0);Gd(e+192|0,e+224|0);Hd(e+192|0,e+112|0);Hd(e+224|0,e+48|0);Gd(e+192|0,e+224|0);Gd(e+224|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+144|0);Gd(e+144|0,e+240|0);Hd(e+144|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+144|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+144|0,e+64|0);Gd(e+192|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+224|0,e+128|0);Gd(e+144|0,e+256|0);Gd(e+240|0,e+160|0);Gd(e+192|0,e+144|0);Gd(e+160|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+176|0);Gd(e+176|0,e+224|0);Gd(e+192|0,e+176|0);Gd(e+224|0,e+208|0);Gd(e+208|0,e+176|0);Gd(e+160|0,e+208|0);dh(e+256|0);dh(e+240|0);dh(e+160|0);dh(e+208|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+192|0,35238);rb(e+160|0,35238);rb(e+208|0,35238);rb(e+144|0,35238);rb(e+224|0,35238);rb(e+176|0,35238);c[e+128>>2]=c[a+1024>>2];c[e+128+4>>2]=c[a+1024+4>>2];c[e+128+8>>2]=c[a+1024+8>>2];c[e+128+12>>2]=c[a+1024+12>>2];c[e+112>>2]=c[a+1040>>2];c[e+112+4>>2]=c[a+1040+4>>2];c[e+112+8>>2]=c[a+1040+8>>2];c[e+112+12>>2]=c[a+1040+12>>2];c[e+96>>2]=c[a+1056>>2];c[e+96+4>>2]=c[a+1056+4>>2];c[e+96+8>>2]=c[a+1056+8>>2];c[e+96+12>>2]=c[a+1056+12>>2];c[e+80>>2]=c[a+1072>>2];c[e+80+4>>2]=c[a+1072+4>>2];c[e+80+8>>2]=c[a+1072+8>>2];c[e+80+12>>2]=c[a+1072+12>>2];c[e+64>>2]=c[a+1088>>2];c[e+64+4>>2]=c[a+1088+4>>2];c[e+64+8>>2]=c[a+1088+8>>2];c[e+64+12>>2]=c[a+1088+12>>2];c[e+48>>2]=c[a+1104>>2];c[e+48+4>>2]=c[a+1104+4>>2];c[e+48+8>>2]=c[a+1104+8>>2];c[e+48+12>>2]=c[a+1104+12>>2];c[e+32>>2]=c[a+1120>>2];c[e+32+4>>2]=c[a+1120+4>>2];c[e+32+8>>2]=c[a+1120+8>>2];c[e+32+12>>2]=c[a+1120+12>>2];c[e+16>>2]=c[a+1136>>2];c[e+16+4>>2]=c[a+1136+4>>2];c[e+16+8>>2]=c[a+1136+8>>2];c[e+16+12>>2]=c[a+1136+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+192|0,e+96|0);Gd(e+160|0,e+80|0);Gd(e+208|0,e+64|0);Gd(e+144|0,e+48|0);Gd(e+224|0,e+32|0);Gd(e+176|0,e+16|0);c[a+1152>>2]=c[e+256>>2];c[a+1152+4>>2]=c[e+256+4>>2];c[a+1152+8>>2]=c[e+256+8>>2];c[a+1152+12>>2]=c[e+256+12>>2];c[a+1168>>2]=c[e+240>>2];c[a+1168+4>>2]=c[e+240+4>>2];c[a+1168+8>>2]=c[e+240+8>>2];c[a+1168+12>>2]=c[e+240+12>>2];c[a+1184>>2]=c[e+192>>2];c[a+1184+4>>2]=c[e+192+4>>2];c[a+1184+8>>2]=c[e+192+8>>2];c[a+1184+12>>2]=c[e+192+12>>2];c[a+1200>>2]=c[e+160>>2];c[a+1200+4>>2]=c[e+160+4>>2];c[a+1200+8>>2]=c[e+160+8>>2];c[a+1200+12>>2]=c[e+160+12>>2];c[a+1216>>2]=c[e+208>>2];c[a+1216+4>>2]=c[e+208+4>>2];c[a+1216+8>>2]=c[e+208+8>>2];c[a+1216+12>>2]=c[e+208+12>>2];c[a+1232>>2]=c[e+144>>2];c[a+1232+4>>2]=c[e+144+4>>2];c[a+1232+8>>2]=c[e+144+8>>2];c[a+1232+12>>2]=c[e+144+12>>2];c[a+1248>>2]=c[e+224>>2];c[a+1248+4>>2]=c[e+224+4>>2];c[a+1248+8>>2]=c[e+224+8>>2];c[a+1248+12>>2]=c[e+224+12>>2];c[a+1264>>2]=c[e+176>>2];c[a+1264+4>>2]=c[e+176+4>>2];c[a+1264+8>>2]=c[e+176+8>>2];c[a+1264+12>>2]=c[e+176+12>>2];Le(e+256|0);Le(e+240|0);Le(e+144|0);Le(e+224|0);rb(e+256|0,35206);rb(e+240|0,35206);rb(e+192|0,35206);rb(e+160|0,35206);rb(e+208|0,35206);rb(e+144|0,35206);rb(e+224|0,35206);rb(e+176|0,35206);Gd(e+144|0,e+224|0);Gd(e+192|0,e+240|0);Gd(e+144|0,e+256|0);Gd(e+224|0,e+192|0);Gd(e+160|0,e+256|0);Gd(e+224|0,e+160|0);Gd(e+160|0,e+176|0);Gd(e+160|0,e+208|0);Gd(e+176|0,e+144|0);Gd(e+160|0,e+240|0);Gd(e+208|0,e+144|0);Gd(e+192|0,e+176|0);Gd(e+240|0,e+144|0);Ce(e+80|0,e+176|0);Ce(e+96|0,e+240|0);Ce(e+112|0,e+144|0);Ce(e+48|0,e+192|0);Ce(e+64|0,e+224|0);Gd(e+80|0,e+208|0);Gd(e+96|0,e+192|0);Gd(e+112|0,e+160|0);Gd(e+48|0,e+208|0);Gd(e+64|0,e+256|0);Ce(e+32|0,e+80|0);Ce(e+128|0,e+96|0);Ce(e+16|0,e+80|0);Jd(e+96|0,e+112|0);Jd(e+80|0,e+64|0);Gd(e+16|0,e+128|0);Hd(e+32|0,e+64|0);Hd(e+128|0,e+112|0);Gd(e+64|0,e+112|0);Hd(e+16|0,e+64|0);Ce(e+64|0,e+160|0);Gd(e+64|0,e+256|0);Hd(e+48|0,e+64|0);Gd(e+80|0,e+48|0);Gd(e+96|0,e+48|0);Ce(e+48|0,e+176|0);Gd(e+48|0,e+240|0);Ce(e+64|0,e+144|0);Ce(e+112|0,e+48|0);Gd(e+64|0,e+224|0);Jd(e+112|0,e+64|0);Hd(e+48|0,e+64|0);Gd(e+128|0,e+48|0);Gd(e+80|0,e+16|0);Gd(e+96|0,e+32|0);Gd(e+112|0,e+16|0);Gd(e+128|0,e+32|0);Gd(e+112|0,e+32|0);Ce(e+64|0,e+192|0);Ce(e+48|0,e+208|0);Ce(e+32|0,e+240|0);Ce(e+16|0,e+176|0);Hd(e+64|0,e+160|0);Hd(e+48|0,e+256|0);Hd(e+32|0,e+144|0);Jd(e+16|0,e+224|0);Gd(e+80|0,e+64|0);Gd(e+96|0,e+48|0);Gd(e+112|0,e+32|0);Gd(e+128|0,e+16|0);Ce(e+64|0,e+80|0);Gd(e+64|0,e+96|0);Hd(e+80|0,e+112|0);Ce(e+32|0,e+128|0);Gd(e+32|0,e+80|0);Ce(e+16|0,e+64|0);Hd(e+16|0,e+32|0);Gd(e+16|0,e+96|0);Ce(e+48|0,e+112|0);Gd(e+48|0,e+128|0);Gd(e+80|0,e+96|0);Hd(e+48|0,e+80|0);Gd(e+48|0,e+128|0);Gd(e+112|0,e+48|0);Ce(e+96|0,e+32|0);Gd(e+96|0,e+48|0);Hd(e+96|0,e+128|0);Gd(e+112|0,e+96|0);Gd(e+32|0,e+96|0);Hd(e+32|0,e+16|0);Gd(e+32|0,e+64|0);Ce(e+64|0,e+224|0);Ce(e+128|0,e+144|0);Ce(e+96|0,e+16|0);Gd(e+96|0,e+32|0);Hd(e+96|0,e+224|0);Gd(e+224|0,e+144|0);Hd(e+224|0,e+32|0);Hd(e+144|0,e+16|0);Gd(e+224|0,e+144|0);Gd(e+144|0,e+96|0);Gd(e+64|0,e+256|0);Gd(e+128|0,e+160|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+256|0);Gd(e+256|0,e+160|0);Hd(e+256|0,e+112|0);Hd(e+160|0,e+48|0);Gd(e+256|0,e+160|0);Gd(e+160|0,e+96|0);Gd(e+224|0,e+64|0);Gd(e+256|0,e+64|0);Gd(e+144|0,e+128|0);Gd(e+160|0,e+128|0);Ce(e+64|0,e+176|0);Ce(e+128|0,e+240|0);Gd(e+64|0,e+208|0);Gd(e+128|0,e+192|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+64|0);Gd(e+64|0,e+128|0);Hd(e+64|0,e+32|0);Hd(e+128|0,e+16|0);Gd(e+128|0,e+64|0);Gd(e+64|0,e+80|0);Ce(e+96|0,e+48|0);Gd(e+96|0,e+112|0);Hd(e+96|0,e+208|0);Gd(e+208|0,e+192|0);Hd(e+208|0,e+112|0);Hd(e+192|0,e+48|0);Gd(e+208|0,e+192|0);Gd(e+192|0,e+96|0);Gd(e+16|0,e+48|0);Gd(e+32|0,e+112|0);Ce(e+80|0,e+16|0);Gd(e+80|0,e+32|0);Hd(e+80|0,e+176|0);Gd(e+176|0,e+240|0);Hd(e+176|0,e+32|0);Hd(e+240|0,e+16|0);Gd(e+176|0,e+240|0);Gd(e+240|0,e+80|0);Gd(e+176|0,e+64|0);Gd(e+208|0,e+64|0);Gd(e+240|0,e+128|0);Gd(e+192|0,e+128|0);Gd(e+176|0,e+256|0);Gd(e+240|0,e+224|0);Gd(e+208|0,e+176|0);Gd(e+224|0,e+256|0);Gd(e+256|0,e+240|0);Gd(e+240|0,e+144|0);Gd(e+144|0,e+192|0);Gd(e+208|0,e+144|0);Gd(e+192|0,e+160|0);Gd(e+160|0,e+144|0);Gd(e+224|0,e+160|0);dh(e+240|0);dh(e+208|0);dh(e+160|0);dh(e+176|0);rb(e+256|0,35238);rb(e+240|0,35238);rb(e+208|0,35238);rb(e+224|0,35238);rb(e+160|0,35238);rb(e+176|0,35238);rb(e+192|0,35238);rb(e+144|0,35238);c[e+128>>2]=c[a+1152>>2];c[e+128+4>>2]=c[a+1152+4>>2];c[e+128+8>>2]=c[a+1152+8>>2];c[e+128+12>>2]=c[a+1152+12>>2];c[e+112>>2]=c[a+1168>>2];c[e+112+4>>2]=c[a+1168+4>>2];c[e+112+8>>2]=c[a+1168+8>>2];c[e+112+12>>2]=c[a+1168+12>>2];c[e+96>>2]=c[a+1184>>2];c[e+96+4>>2]=c[a+1184+4>>2];c[e+96+8>>2]=c[a+1184+8>>2];c[e+96+12>>2]=c[a+1184+12>>2];c[e+80>>2]=c[a+1200>>2];c[e+80+4>>2]=c[a+1200+4>>2];c[e+80+8>>2]=c[a+1200+8>>2];c[e+80+12>>2]=c[a+1200+12>>2];c[e+64>>2]=c[a+1216>>2];c[e+64+4>>2]=c[a+1216+4>>2];c[e+64+8>>2]=c[a+1216+8>>2];c[e+64+12>>2]=c[a+1216+12>>2];c[e+48>>2]=c[a+1232>>2];c[e+48+4>>2]=c[a+1232+4>>2];c[e+48+8>>2]=c[a+1232+8>>2];c[e+48+12>>2]=c[a+1232+12>>2];c[e+32>>2]=c[a+1248>>2];c[e+32+4>>2]=c[a+1248+4>>2];c[e+32+8>>2]=c[a+1248+8>>2];c[e+32+12>>2]=c[a+1248+12>>2];c[e+16>>2]=c[a+1264>>2];c[e+16+4>>2]=c[a+1264+4>>2];c[e+16+8>>2]=c[a+1264+8>>2];c[e+16+12>>2]=c[a+1264+12>>2];Le(e+128|0);Le(e+112|0);Le(e+48|0);Le(e+32|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);ue(e+128|0);ue(e+112|0);ue(e+96|0);ue(e+80|0);ue(e+64|0);ue(e+48|0);ue(e+32|0);ue(e+16|0);Gd(e+256|0,e+128|0);Gd(e+240|0,e+112|0);Gd(e+208|0,e+96|0);Gd(e+224|0,e+80|0);Gd(e+160|0,e+64|0);Gd(e+176|0,e+48|0);Gd(e+192|0,e+32|0);Gd(e+144|0,e+16|0);rb(e+256|0,35222);rb(e+240|0,35222);rb(e+192|0,35222);rb(e+160|0,35222);rb(e+208|0,35222);rb(e+144|0,35222);rb(e+224|0,35222);rb(e+176|0,35222);c[a+1280>>2]=c[e+256>>2];c[a+1280+4>>2]=c[e+256+4>>2];c[a+1280+8>>2]=c[e+256+8>>2];c[a+1280+12>>2]=c[e+256+12>>2];c[a+1296>>2]=c[e+240>>2];c[a+1296+4>>2]=c[e+240+4>>2];c[a+1296+8>>2]=c[e+240+8>>2];c[a+1296+12>>2]=c[e+240+12>>2];c[a+1312>>2]=c[e+208>>2];c[a+1312+4>>2]=c[e+208+4>>2];c[a+1312+8>>2]=c[e+208+8>>2];c[a+1312+12>>2]=c[e+208+12>>2];c[a+1328>>2]=c[e+224>>2];c[a+1328+4>>2]=c[e+224+4>>2];c[a+1328+8>>2]=c[e+224+8>>2];c[a+1328+12>>2]=c[e+224+12>>2];c[a+1344>>2]=c[e+160>>2];c[a+1344+4>>2]=c[e+160+4>>2];c[a+1344+8>>2]=c[e+160+8>>2];c[a+1344+12>>2]=c[e+160+12>>2];c[a+1360>>2]=c[e+176>>2];c[a+1360+4>>2]=c[e+176+4>>2];c[a+1360+8>>2]=c[e+176+8>>2];c[a+1360+12>>2]=c[e+176+12>>2];c[a+1376>>2]=c[e+192>>2];c[a+1376+4>>2]=c[e+192+4>>2];c[a+1376+8>>2]=c[e+192+8>>2];c[a+1376+12>>2]=c[e+192+12>>2];c[a+1392>>2]=c[e+144>>2];c[a+1392+4>>2]=c[e+144+4>>2];c[a+1392+8>>2]=c[e+144+8>>2];c[a+1392+12>>2]=c[e+144+12>>2];l=d;return 0}function ea(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0;k=l;j=l=l+63&-64;l=l+400|0;Ce(j,g);while(1){c[j+256>>2]=c[j>>2];c[j+256+4>>2]=c[j+4>>2];c[j+256+8>>2]=c[j+8>>2];c[j+256+12>>2]=c[j+12>>2];Ce(j+240|0,j+256|0);rb(j+240|0,35254);Ce(j+224|0,j+240|0);Ce(j+208|0,j+240|0);Ce(j+192|0,j+240|0);Ce(j+176|0,j+240|0);Ce(j+160|0,j+240|0);Ce(j+144|0,j+240|0);Eg(j+240|0,1);Eg(j+224|0,2);Eg(j+208|0,3);Eg(j+192|0,4);Eg(j+176|0,5);Eg(j+160|0,6);Eg(j+144|0,7);rb(j+256|0,35222);rb(j+240|0,35270);rb(j+224|0,35270);rb(j+208|0,35270);rb(j+192|0,35270);rb(j+176|0,35270);rb(j+160|0,35270);rb(j+144|0,35270);Ce(j+128|0,j+160|0);_d(j+128|0,1);Gd(j+128|0,j+144|0);Hd(j+128|0,1104);Gd(j+144|0,j+128|0);ae(j+128|0,1);Gd(j+160|0,j+128|0);Ce(j+128|0,j+192|0);_d(j+128|0,1);Gd(j+128|0,j+176|0);Hd(j+128|0,1104);Gd(j+176|0,j+128|0);ae(j+128|0,1);Gd(j+192|0,j+128|0);Ce(j+128|0,j+224|0);_d(j+128|0,1);Gd(j+128|0,j+208|0);Hd(j+128|0,1104);Gd(j+208|0,j+128|0);ae(j+128|0,1);Gd(j+224|0,j+128|0);Ce(j+128|0,j+256|0);_d(j+128|0,1);Gd(j+128|0,j+240|0);Hd(j+128|0,1104);Gd(j+240|0,j+128|0);ae(j+128|0,1);Gd(j+256|0,j+128|0);Ce(j+128|0,j+176|0);_d(j+128|0,2);Gd(j+128|0,j+144|0);Hd(j+128|0,1120);Gd(j+144|0,j+128|0);ae(j+128|0,2);Gd(j+176|0,j+128|0);Ce(j+128|0,j+192|0);_d(j+128|0,2);Gd(j+128|0,j+160|0);Hd(j+128|0,1120);Gd(j+160|0,j+128|0);ae(j+128|0,2);Gd(j+192|0,j+128|0);Ce(j+128|0,j+240|0);_d(j+128|0,2);Gd(j+128|0,j+208|0);Hd(j+128|0,1120);Gd(j+208|0,j+128|0);ae(j+128|0,2);Gd(j+240|0,j+128|0);Ce(j+128|0,j+256|0);_d(j+128|0,2);Gd(j+128|0,j+224|0);Hd(j+128|0,1120);Gd(j+224|0,j+128|0);ae(j+128|0,2);Gd(j+256|0,j+128|0);Ce(j+128|0,j+208|0);_d(j+128|0,4);Gd(j+128|0,j+144|0);Hd(j+128|0,1136);Gd(j+144|0,j+128|0);ae(j+128|0,4);Gd(j+208|0,j+128|0);Ce(j+128|0,j+224|0);_d(j+128|0,4);Gd(j+128|0,j+160|0);Hd(j+128|0,1136);Gd(j+160|0,j+128|0);ae(j+128|0,4);Gd(j+224|0,j+128|0);Ce(j+128|0,j+240|0);_d(j+128|0,4);Gd(j+128|0,j+176|0);Hd(j+128|0,1136);Gd(j+176|0,j+128|0);ae(j+128|0,4);Gd(j+240|0,j+128|0);Ce(j+128|0,j+256|0);_d(j+128|0,4);Gd(j+128|0,j+192|0);Hd(j+128|0,1136);Gd(j+192|0,j+128|0);ae(j+128|0,4);Gd(j+256|0,j+128|0);Gd(j+256|0,h);rb(j+256|0,35286);Gd(j+240|0,h+16|0);rb(j+240|0,35286);Gd(j+224|0,h+32|0);rb(j+224|0,35286);Gd(j+208|0,h+48|0);rb(j+208|0,35286);Gd(j+192|0,h+64|0);rb(j+192|0,35286);Gd(j+176|0,h+80|0);rb(j+176|0,35286);Gd(j+160|0,h+96|0);rb(j+160|0,35286);Gd(j+144|0,h+112|0);rb(j+144|0,35286);Gd(j+176|0,j+160|0);Gd(j+224|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+160|0,j+224|0);Gd(j+208|0,j+256|0);Gd(j+160|0,j+208|0);Gd(j+208|0,j+144|0);Gd(j+208|0,j+192|0);Gd(j+144|0,j+176|0);Gd(j+208|0,j+240|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+144|0);Gd(j+240|0,j+176|0);Ce(j+80|0,j+144|0);Ce(j+96|0,j+240|0);Ce(j+112|0,j+176|0);Ce(j+48|0,j+224|0);Ce(j+64|0,j+160|0);Gd(j+80|0,j+192|0);Gd(j+96|0,j+224|0);Gd(j+112|0,j+208|0);Gd(j+48|0,j+192|0);Gd(j+64|0,j+256|0);Ce(j+32|0,j+80|0);Ce(j+128|0,j+96|0);Ce(j+16|0,j+80|0);Jd(j+96|0,j+112|0);Jd(j+80|0,j+64|0);Gd(j+16|0,j+128|0);Hd(j+32|0,j+64|0);Hd(j+128|0,j+112|0);Gd(j+64|0,j+112|0);Hd(j+16|0,j+64|0);Ce(j+64|0,j+208|0);Gd(j+64|0,j+256|0);Hd(j+48|0,j+64|0);Gd(j+80|0,j+48|0);Gd(j+96|0,j+48|0);Ce(j+48|0,j+144|0);Gd(j+48|0,j+240|0);Ce(j+64|0,j+176|0);Ce(j+112|0,j+48|0);Gd(j+64|0,j+160|0);Jd(j+112|0,j+64|0);Hd(j+48|0,j+64|0);Gd(j+128|0,j+48|0);Gd(j+80|0,j+16|0);Gd(j+96|0,j+32|0);Gd(j+112|0,j+16|0);Gd(j+128|0,j+32|0);Gd(j+112|0,j+32|0);Ce(j+64|0,j+224|0);Ce(j+48|0,j+192|0);Ce(j+32|0,j+240|0);Ce(j+16|0,j+144|0);Hd(j+64|0,j+208|0);Hd(j+48|0,j+256|0);Hd(j+32|0,j+176|0);Jd(j+16|0,j+160|0);Gd(j+80|0,j+64|0);Gd(j+96|0,j+48|0);Gd(j+112|0,j+32|0);Gd(j+128|0,j+16|0);Ce(j+64|0,j+80|0);Gd(j+64|0,j+96|0);Hd(j+80|0,j+112|0);Ce(j+32|0,j+128|0);Gd(j+32|0,j+80|0);Ce(j+16|0,j+64|0);Hd(j+16|0,j+32|0);Gd(j+16|0,j+96|0);Ce(j+48|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+80|0,j+96|0);Hd(j+48|0,j+80|0);Gd(j+48|0,j+128|0);Gd(j+112|0,j+48|0);Ce(j+96|0,j+32|0);Gd(j+96|0,j+48|0);Hd(j+96|0,j+128|0);Gd(j+112|0,j+96|0);Gd(j+32|0,j+96|0);Hd(j+32|0,j+16|0);Gd(j+32|0,j+64|0);Ce(j+64|0,j+160|0);Ce(j+128|0,j+176|0);Ce(j+96|0,j+16|0);Gd(j+96|0,j+32|0);Hd(j+96|0,j+160|0);Gd(j+160|0,j+176|0);Hd(j+160|0,j+32|0);Hd(j+176|0,j+16|0);Gd(j+160|0,j+176|0);Gd(j+176|0,j+96|0);Gd(j+64|0,j+256|0);Gd(j+128|0,j+208|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+256|0);Gd(j+256|0,j+208|0);Hd(j+256|0,j+112|0);Hd(j+208|0,j+48|0);Gd(j+256|0,j+208|0);Gd(j+208|0,j+96|0);Gd(j+160|0,j+64|0);Gd(j+256|0,j+64|0);Gd(j+176|0,j+128|0);Gd(j+208|0,j+128|0);Ce(j+64|0,j+144|0);Ce(j+128|0,j+240|0);Gd(j+64|0,j+192|0);Gd(j+128|0,j+224|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+192|0);Gd(j+192|0,j+224|0);Hd(j+192|0,j+112|0);Hd(j+224|0,j+48|0);Gd(j+192|0,j+224|0);Gd(j+224|0,j+96|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+144|0);Gd(j+144|0,j+240|0);Hd(j+144|0,j+32|0);Hd(j+240|0,j+16|0);Gd(j+144|0,j+240|0);Gd(j+240|0,j+80|0);Gd(j+144|0,j+64|0);Gd(j+192|0,j+64|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+128|0);Gd(j+144|0,j+256|0);Gd(j+240|0,j+160|0);Gd(j+192|0,j+144|0);Gd(j+160|0,j+256|0);Gd(j+256|0,j+240|0);Gd(j+240|0,j+176|0);Gd(j+176|0,j+224|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+208|0);Gd(j+208|0,j+176|0);Gd(j+160|0,j+208|0);_c(j+128|0,j+256|0,147);_c(j+112|0,j+240|0,147);_c(j+96|0,j+192|0,147);_c(j+80|0,j+160|0,147);_c(j+64|0,j+208|0,147);_c(j+48|0,j+144|0,147);_c(j+32|0,j+224|0,147);_c(j+16|0,j+176|0,147);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+192|0,j+96|0);Gd(j+160|0,j+80|0);Gd(j+208|0,j+64|0);Gd(j+144|0,j+48|0);Gd(j+224|0,j+32|0);Gd(j+176|0,j+16|0);Gd(j+128|0,j+176|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+240|0);Gd(j+112|0,j+176|0);Gd(j+80|0,j+192|0);Gd(j+64|0,j+160|0);Gd(j+48|0,j+208|0);Gd(j+80|0,j+176|0);Gd(j+32|0,j+144|0);Gd(j+16|0,j+224|0);Gd(j+64|0,j+176|0);_c(j+256|0,j+256|0,78);_c(j+240|0,j+240|0,78);_c(j+192|0,j+192|0,78);_c(j+160|0,j+160|0,78);_c(j+208|0,j+208|0,78);_c(j+144|0,j+144|0,78);_c(j+224|0,j+224|0,78);_c(j+176|0,j+176|0,78);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+96|0,j+192|0);Gd(j+80|0,j+160|0);Gd(j+64|0,j+208|0);Gd(j+48|0,j+144|0);Gd(j+32|0,j+224|0);Gd(j+16|0,j+176|0);Gd(j+128|0,h+128|0);rb(j+128|0,35286);Gd(j+112|0,h+144|0);rb(j+112|0,35286);Gd(j+96|0,h+160|0);rb(j+96|0,35286);Gd(j+80|0,h+176|0);rb(j+80|0,35286);Gd(j+64|0,h+192|0);rb(j+64|0,35286);Gd(j+48|0,h+208|0);rb(j+48|0,35286);Gd(j+32|0,h+224|0);rb(j+32|0,35286);Gd(j+16|0,h+240|0);rb(j+16|0,35286);Gd(j+48|0,j+32|0);Gd(j+96|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+32|0,j+96|0);Gd(j+80|0,j+128|0);Gd(j+32|0,j+80|0);Gd(j+80|0,j+16|0);Gd(j+80|0,j+64|0);Gd(j+16|0,j+48|0);Gd(j+80|0,j+112|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+16|0);Gd(j+112|0,j+48|0);Ce(j+208|0,j+16|0);Ce(j+224|0,j+112|0);Ce(j+240|0,j+48|0);Ce(j+176|0,j+96|0);Ce(j+192|0,j+32|0);Gd(j+208|0,j+64|0);Gd(j+224|0,j+96|0);Gd(j+240|0,j+80|0);Gd(j+176|0,j+64|0);Gd(j+192|0,j+128|0);Ce(j+160|0,j+208|0);Ce(j+256|0,j+224|0);Ce(j+144|0,j+208|0);Jd(j+224|0,j+240|0);Jd(j+208|0,j+192|0);Gd(j+144|0,j+256|0);Hd(j+160|0,j+192|0);Hd(j+256|0,j+240|0);Gd(j+192|0,j+240|0);Hd(j+144|0,j+192|0);Ce(j+192|0,j+80|0);Gd(j+192|0,j+128|0);Hd(j+176|0,j+192|0);Gd(j+208|0,j+176|0);Gd(j+224|0,j+176|0);Ce(j+176|0,j+16|0);Gd(j+176|0,j+112|0);Ce(j+192|0,j+48|0);Ce(j+240|0,j+176|0);Gd(j+192|0,j+32|0);Jd(j+240|0,j+192|0);Hd(j+176|0,j+192|0);Gd(j+256|0,j+176|0);Gd(j+208|0,j+144|0);Gd(j+224|0,j+160|0);Gd(j+240|0,j+144|0);Gd(j+256|0,j+160|0);Gd(j+240|0,j+160|0);Ce(j+192|0,j+96|0);Ce(j+176|0,j+64|0);Ce(j+160|0,j+112|0);Ce(j+144|0,j+16|0);Hd(j+192|0,j+80|0);Hd(j+176|0,j+128|0);Hd(j+160|0,j+48|0);Jd(j+144|0,j+32|0);Gd(j+208|0,j+192|0);Gd(j+224|0,j+176|0);Gd(j+240|0,j+160|0);Gd(j+256|0,j+144|0);Ce(j+192|0,j+208|0);Gd(j+192|0,j+224|0);Hd(j+208|0,j+240|0);Ce(j+160|0,j+256|0);Gd(j+160|0,j+208|0);Ce(j+144|0,j+192|0);Hd(j+144|0,j+160|0);Gd(j+144|0,j+224|0);Ce(j+176|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+208|0,j+224|0);Hd(j+176|0,j+208|0);Gd(j+176|0,j+256|0);Gd(j+240|0,j+176|0);Ce(j+224|0,j+160|0);Gd(j+224|0,j+176|0);Hd(j+224|0,j+256|0);Gd(j+240|0,j+224|0);Gd(j+160|0,j+224|0);Hd(j+160|0,j+144|0);Gd(j+160|0,j+192|0);Ce(j+192|0,j+32|0);Ce(j+256|0,j+48|0);Ce(j+224|0,j+144|0);Gd(j+224|0,j+160|0);Hd(j+224|0,j+32|0);Gd(j+32|0,j+48|0);Hd(j+32|0,j+160|0);Hd(j+48|0,j+144|0);Gd(j+32|0,j+48|0);Gd(j+48|0,j+224|0);Gd(j+192|0,j+128|0);Gd(j+256|0,j+80|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+128|0);Gd(j+128|0,j+80|0);Hd(j+128|0,j+240|0);Hd(j+80|0,j+176|0);Gd(j+128|0,j+80|0);Gd(j+80|0,j+224|0);Gd(j+32|0,j+192|0);Gd(j+128|0,j+192|0);Gd(j+48|0,j+256|0);Gd(j+80|0,j+256|0);Ce(j+192|0,j+16|0);Ce(j+256|0,j+112|0);Gd(j+192|0,j+64|0);Gd(j+256|0,j+96|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+64|0);Gd(j+64|0,j+96|0);Hd(j+64|0,j+240|0);Hd(j+96|0,j+176|0);Gd(j+64|0,j+96|0);Gd(j+96|0,j+224|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+16|0);Gd(j+16|0,j+112|0);Hd(j+16|0,j+160|0);Hd(j+112|0,j+144|0);Gd(j+16|0,j+112|0);Gd(j+112|0,j+208|0);Gd(j+16|0,j+192|0);Gd(j+64|0,j+192|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+256|0);Gd(j+16|0,j+128|0);Gd(j+112|0,j+32|0);Gd(j+64|0,j+16|0);Gd(j+32|0,j+128|0);Gd(j+128|0,j+112|0);Gd(j+112|0,j+48|0);Gd(j+48|0,j+96|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+80|0);Gd(j+80|0,j+48|0);Gd(j+32|0,j+80|0);_c(j+256|0,j+128|0,147);_c(j+240|0,j+112|0,147);_c(j+224|0,j+64|0,147);_c(j+208|0,j+32|0,147);_c(j+192|0,j+80|0,147);_c(j+176|0,j+16|0,147);_c(j+160|0,j+96|0,147);_c(j+144|0,j+48|0,147);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+64|0,j+224|0);Gd(j+32|0,j+208|0);Gd(j+80|0,j+192|0);Gd(j+16|0,j+176|0);Gd(j+96|0,j+160|0);Gd(j+48|0,j+144|0);Gd(j+256|0,j+48|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+112|0);Gd(j+240|0,j+48|0);Gd(j+208|0,j+64|0);Gd(j+192|0,j+32|0);Gd(j+176|0,j+80|0);Gd(j+208|0,j+48|0);Gd(j+160|0,j+16|0);Gd(j+144|0,j+96|0);Gd(j+192|0,j+48|0);_c(j+128|0,j+128|0,78);_c(j+112|0,j+112|0,78);_c(j+64|0,j+64|0,78);_c(j+32|0,j+32|0,78);_c(j+80|0,j+80|0,78);_c(j+16|0,j+16|0,78);_c(j+96|0,j+96|0,78);_c(j+48|0,j+48|0,78);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+224|0,j+64|0);Gd(j+208|0,j+32|0);Gd(j+192|0,j+80|0);Gd(j+176|0,j+16|0);Gd(j+160|0,j+96|0);Gd(j+144|0,j+48|0);Gd(j+256|0,h+256|0);rb(j+256|0,35286);Gd(j+240|0,h+272|0);rb(j+240|0,35286);Gd(j+224|0,h+288|0);rb(j+224|0,35286);Gd(j+208|0,h+304|0);rb(j+208|0,35286);Gd(j+192|0,h+320|0);rb(j+192|0,35286);Gd(j+176|0,h+336|0);rb(j+176|0,35286);Gd(j+160|0,h+352|0);rb(j+160|0,35286);Gd(j+144|0,h+368|0);rb(j+144|0,35286);Gd(j+176|0,j+160|0);Gd(j+224|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+160|0,j+224|0);Gd(j+208|0,j+256|0);Gd(j+160|0,j+208|0);Gd(j+208|0,j+144|0);Gd(j+208|0,j+192|0);Gd(j+144|0,j+176|0);Gd(j+208|0,j+240|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+144|0);Gd(j+240|0,j+176|0);Ce(j+80|0,j+144|0);Ce(j+96|0,j+240|0);Ce(j+112|0,j+176|0);Ce(j+48|0,j+224|0);Ce(j+64|0,j+160|0);Gd(j+80|0,j+192|0);Gd(j+96|0,j+224|0);Gd(j+112|0,j+208|0);Gd(j+48|0,j+192|0);Gd(j+64|0,j+256|0);Ce(j+32|0,j+80|0);Ce(j+128|0,j+96|0);Ce(j+16|0,j+80|0);Jd(j+96|0,j+112|0);Jd(j+80|0,j+64|0);Gd(j+16|0,j+128|0);Hd(j+32|0,j+64|0);Hd(j+128|0,j+112|0);Gd(j+64|0,j+112|0);Hd(j+16|0,j+64|0);Ce(j+64|0,j+208|0);Gd(j+64|0,j+256|0);Hd(j+48|0,j+64|0);Gd(j+80|0,j+48|0);Gd(j+96|0,j+48|0);Ce(j+48|0,j+144|0);Gd(j+48|0,j+240|0);Ce(j+64|0,j+176|0);Ce(j+112|0,j+48|0);Gd(j+64|0,j+160|0);Jd(j+112|0,j+64|0);Hd(j+48|0,j+64|0);Gd(j+128|0,j+48|0);Gd(j+80|0,j+16|0);Gd(j+96|0,j+32|0);Gd(j+112|0,j+16|0);Gd(j+128|0,j+32|0);Gd(j+112|0,j+32|0);Ce(j+64|0,j+224|0);Ce(j+48|0,j+192|0);Ce(j+32|0,j+240|0);Ce(j+16|0,j+144|0);Hd(j+64|0,j+208|0);Hd(j+48|0,j+256|0);Hd(j+32|0,j+176|0);Jd(j+16|0,j+160|0);Gd(j+80|0,j+64|0);Gd(j+96|0,j+48|0);Gd(j+112|0,j+32|0);Gd(j+128|0,j+16|0);Ce(j+64|0,j+80|0);Gd(j+64|0,j+96|0);Hd(j+80|0,j+112|0);Ce(j+32|0,j+128|0);Gd(j+32|0,j+80|0);Ce(j+16|0,j+64|0);Hd(j+16|0,j+32|0);Gd(j+16|0,j+96|0);Ce(j+48|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+80|0,j+96|0);Hd(j+48|0,j+80|0);Gd(j+48|0,j+128|0);Gd(j+112|0,j+48|0);Ce(j+96|0,j+32|0);Gd(j+96|0,j+48|0);Hd(j+96|0,j+128|0);Gd(j+112|0,j+96|0);Gd(j+32|0,j+96|0);Hd(j+32|0,j+16|0);Gd(j+32|0,j+64|0);Ce(j+64|0,j+160|0);Ce(j+128|0,j+176|0);Ce(j+96|0,j+16|0);Gd(j+96|0,j+32|0);Hd(j+96|0,j+160|0);Gd(j+160|0,j+176|0);Hd(j+160|0,j+32|0);Hd(j+176|0,j+16|0);Gd(j+160|0,j+176|0);Gd(j+176|0,j+96|0);Gd(j+64|0,j+256|0);Gd(j+128|0,j+208|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+256|0);Gd(j+256|0,j+208|0);Hd(j+256|0,j+112|0);Hd(j+208|0,j+48|0);Gd(j+256|0,j+208|0);Gd(j+208|0,j+96|0);Gd(j+160|0,j+64|0);Gd(j+256|0,j+64|0);Gd(j+176|0,j+128|0);Gd(j+208|0,j+128|0);Ce(j+64|0,j+144|0);Ce(j+128|0,j+240|0);Gd(j+64|0,j+192|0);Gd(j+128|0,j+224|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+192|0);Gd(j+192|0,j+224|0);Hd(j+192|0,j+112|0);Hd(j+224|0,j+48|0);Gd(j+192|0,j+224|0);Gd(j+224|0,j+96|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+144|0);Gd(j+144|0,j+240|0);Hd(j+144|0,j+32|0);Hd(j+240|0,j+16|0);Gd(j+144|0,j+240|0);Gd(j+240|0,j+80|0);Gd(j+144|0,j+64|0);Gd(j+192|0,j+64|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+128|0);Gd(j+144|0,j+256|0);Gd(j+240|0,j+160|0);Gd(j+192|0,j+144|0);Gd(j+160|0,j+256|0);Gd(j+256|0,j+240|0);Gd(j+240|0,j+176|0);Gd(j+176|0,j+224|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+208|0);Gd(j+208|0,j+176|0);Gd(j+160|0,j+208|0);_c(j+128|0,j+256|0,147);_c(j+112|0,j+240|0,147);_c(j+96|0,j+192|0,147);_c(j+80|0,j+160|0,147);_c(j+64|0,j+208|0,147);_c(j+48|0,j+144|0,147);_c(j+32|0,j+224|0,147);_c(j+16|0,j+176|0,147);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+192|0,j+96|0);Gd(j+160|0,j+80|0);Gd(j+208|0,j+64|0);Gd(j+144|0,j+48|0);Gd(j+224|0,j+32|0);Gd(j+176|0,j+16|0);Gd(j+128|0,j+176|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+240|0);Gd(j+112|0,j+176|0);Gd(j+80|0,j+192|0);Gd(j+64|0,j+160|0);Gd(j+48|0,j+208|0);Gd(j+80|0,j+176|0);Gd(j+32|0,j+144|0);Gd(j+16|0,j+224|0);Gd(j+64|0,j+176|0);_c(j+256|0,j+256|0,78);_c(j+240|0,j+240|0,78);_c(j+192|0,j+192|0,78);_c(j+160|0,j+160|0,78);_c(j+208|0,j+208|0,78);_c(j+144|0,j+144|0,78);_c(j+224|0,j+224|0,78);_c(j+176|0,j+176|0,78);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+96|0,j+192|0);Gd(j+80|0,j+160|0);Gd(j+64|0,j+208|0);Gd(j+48|0,j+144|0);Gd(j+32|0,j+224|0);Gd(j+16|0,j+176|0);Gd(j+128|0,h+384|0);rb(j+128|0,35286);Gd(j+112|0,h+400|0);rb(j+112|0,35286);Gd(j+96|0,h+416|0);rb(j+96|0,35286);Gd(j+80|0,h+432|0);rb(j+80|0,35286);Gd(j+64|0,h+448|0);rb(j+64|0,35286);Gd(j+48|0,h+464|0);rb(j+48|0,35286);Gd(j+32|0,h+480|0);rb(j+32|0,35286);Gd(j+16|0,h+496|0);rb(j+16|0,35286);Gd(j+48|0,j+32|0);Gd(j+96|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+32|0,j+96|0);Gd(j+80|0,j+128|0);Gd(j+32|0,j+80|0);Gd(j+80|0,j+16|0);Gd(j+80|0,j+64|0);Gd(j+16|0,j+48|0);Gd(j+80|0,j+112|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+16|0);Gd(j+112|0,j+48|0);Ce(j+208|0,j+16|0);Ce(j+224|0,j+112|0);Ce(j+240|0,j+48|0);Ce(j+176|0,j+96|0);Ce(j+192|0,j+32|0);Gd(j+208|0,j+64|0);Gd(j+224|0,j+96|0);Gd(j+240|0,j+80|0);Gd(j+176|0,j+64|0);Gd(j+192|0,j+128|0);Ce(j+160|0,j+208|0);Ce(j+256|0,j+224|0);Ce(j+144|0,j+208|0);Jd(j+224|0,j+240|0);Jd(j+208|0,j+192|0);Gd(j+144|0,j+256|0);Hd(j+160|0,j+192|0);Hd(j+256|0,j+240|0);Gd(j+192|0,j+240|0);Hd(j+144|0,j+192|0);Ce(j+192|0,j+80|0);Gd(j+192|0,j+128|0);Hd(j+176|0,j+192|0);Gd(j+208|0,j+176|0);Gd(j+224|0,j+176|0);Ce(j+176|0,j+16|0);Gd(j+176|0,j+112|0);Ce(j+192|0,j+48|0);Ce(j+240|0,j+176|0);Gd(j+192|0,j+32|0);Jd(j+240|0,j+192|0);Hd(j+176|0,j+192|0);Gd(j+256|0,j+176|0);Gd(j+208|0,j+144|0);Gd(j+224|0,j+160|0);Gd(j+240|0,j+144|0);Gd(j+256|0,j+160|0);Gd(j+240|0,j+160|0);Ce(j+192|0,j+96|0);Ce(j+176|0,j+64|0);Ce(j+160|0,j+112|0);Ce(j+144|0,j+16|0);Hd(j+192|0,j+80|0);Hd(j+176|0,j+128|0);Hd(j+160|0,j+48|0);Jd(j+144|0,j+32|0);Gd(j+208|0,j+192|0);Gd(j+224|0,j+176|0);Gd(j+240|0,j+160|0);Gd(j+256|0,j+144|0);Ce(j+192|0,j+208|0);Gd(j+192|0,j+224|0);Hd(j+208|0,j+240|0);Ce(j+160|0,j+256|0);Gd(j+160|0,j+208|0);Ce(j+144|0,j+192|0);Hd(j+144|0,j+160|0);Gd(j+144|0,j+224|0);Ce(j+176|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+208|0,j+224|0);Hd(j+176|0,j+208|0);Gd(j+176|0,j+256|0);Gd(j+240|0,j+176|0);Ce(j+224|0,j+160|0);Gd(j+224|0,j+176|0);Hd(j+224|0,j+256|0);Gd(j+240|0,j+224|0);Gd(j+160|0,j+224|0);Hd(j+160|0,j+144|0);Gd(j+160|0,j+192|0);Ce(j+192|0,j+32|0);Ce(j+256|0,j+48|0);Ce(j+224|0,j+144|0);Gd(j+224|0,j+160|0);Hd(j+224|0,j+32|0);Gd(j+32|0,j+48|0);Hd(j+32|0,j+160|0);Hd(j+48|0,j+144|0);Gd(j+32|0,j+48|0);Gd(j+48|0,j+224|0);Gd(j+192|0,j+128|0);Gd(j+256|0,j+80|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+128|0);Gd(j+128|0,j+80|0);Hd(j+128|0,j+240|0);Hd(j+80|0,j+176|0);Gd(j+128|0,j+80|0);Gd(j+80|0,j+224|0);Gd(j+32|0,j+192|0);Gd(j+128|0,j+192|0);Gd(j+48|0,j+256|0);Gd(j+80|0,j+256|0);Ce(j+192|0,j+16|0);Ce(j+256|0,j+112|0);Gd(j+192|0,j+64|0);Gd(j+256|0,j+96|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+64|0);Gd(j+64|0,j+96|0);Hd(j+64|0,j+240|0);Hd(j+96|0,j+176|0);Gd(j+64|0,j+96|0);Gd(j+96|0,j+224|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+16|0);Gd(j+16|0,j+112|0);Hd(j+16|0,j+160|0);Hd(j+112|0,j+144|0);Gd(j+16|0,j+112|0);Gd(j+112|0,j+208|0);Gd(j+16|0,j+192|0);Gd(j+64|0,j+192|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+256|0);Gd(j+16|0,j+128|0);Gd(j+112|0,j+32|0);Gd(j+64|0,j+16|0);Gd(j+32|0,j+128|0);Gd(j+128|0,j+112|0);Gd(j+112|0,j+48|0);Gd(j+48|0,j+96|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+80|0);Gd(j+80|0,j+48|0);Gd(j+32|0,j+80|0);_c(j+256|0,j+128|0,147);_c(j+240|0,j+112|0,147);_c(j+224|0,j+64|0,147);_c(j+208|0,j+32|0,147);_c(j+192|0,j+80|0,147);_c(j+176|0,j+16|0,147);_c(j+160|0,j+96|0,147);_c(j+144|0,j+48|0,147);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+64|0,j+224|0);Gd(j+32|0,j+208|0);Gd(j+80|0,j+192|0);Gd(j+16|0,j+176|0);Gd(j+96|0,j+160|0);Gd(j+48|0,j+144|0);Gd(j+256|0,j+48|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+112|0);Gd(j+240|0,j+48|0);Gd(j+208|0,j+64|0);Gd(j+192|0,j+32|0);Gd(j+176|0,j+80|0);Gd(j+208|0,j+48|0);Gd(j+160|0,j+16|0);Gd(j+144|0,j+96|0);Gd(j+192|0,j+48|0);_c(j+128|0,j+128|0,78);_c(j+112|0,j+112|0,78);_c(j+64|0,j+64|0,78);_c(j+32|0,j+32|0,78);_c(j+80|0,j+80|0,78);_c(j+16|0,j+16|0,78);_c(j+96|0,j+96|0,78);_c(j+48|0,j+48|0,78);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+224|0,j+64|0);Gd(j+208|0,j+32|0);Gd(j+192|0,j+80|0);Gd(j+176|0,j+16|0);Gd(j+160|0,j+96|0);Gd(j+144|0,j+48|0);Gd(j+256|0,h+512|0);rb(j+256|0,35286);Gd(j+240|0,h+528|0);rb(j+240|0,35286);Gd(j+224|0,h+544|0);rb(j+224|0,35286);Gd(j+208|0,h+560|0);rb(j+208|0,35286);Gd(j+192|0,h+576|0);rb(j+192|0,35286);Gd(j+176|0,h+592|0);rb(j+176|0,35286);Gd(j+160|0,h+608|0);rb(j+160|0,35286);Gd(j+144|0,h+624|0);rb(j+144|0,35286);Gd(j+176|0,j+160|0);Gd(j+224|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+160|0,j+224|0);Gd(j+208|0,j+256|0);Gd(j+160|0,j+208|0);Gd(j+208|0,j+144|0);Gd(j+208|0,j+192|0);Gd(j+144|0,j+176|0);Gd(j+208|0,j+240|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+144|0);Gd(j+240|0,j+176|0);Ce(j+80|0,j+144|0);Ce(j+96|0,j+240|0);Ce(j+112|0,j+176|0);Ce(j+48|0,j+224|0);Ce(j+64|0,j+160|0);Gd(j+80|0,j+192|0);Gd(j+96|0,j+224|0);Gd(j+112|0,j+208|0);Gd(j+48|0,j+192|0);Gd(j+64|0,j+256|0);Ce(j+32|0,j+80|0);Ce(j+128|0,j+96|0);Ce(j+16|0,j+80|0);Jd(j+96|0,j+112|0);Jd(j+80|0,j+64|0);Gd(j+16|0,j+128|0);Hd(j+32|0,j+64|0);Hd(j+128|0,j+112|0);Gd(j+64|0,j+112|0);Hd(j+16|0,j+64|0);Ce(j+64|0,j+208|0);Gd(j+64|0,j+256|0);Hd(j+48|0,j+64|0);Gd(j+80|0,j+48|0);Gd(j+96|0,j+48|0);Ce(j+48|0,j+144|0);Gd(j+48|0,j+240|0);Ce(j+64|0,j+176|0);Ce(j+112|0,j+48|0);Gd(j+64|0,j+160|0);Jd(j+112|0,j+64|0);Hd(j+48|0,j+64|0);Gd(j+128|0,j+48|0);Gd(j+80|0,j+16|0);Gd(j+96|0,j+32|0);Gd(j+112|0,j+16|0);Gd(j+128|0,j+32|0);Gd(j+112|0,j+32|0);Ce(j+64|0,j+224|0);Ce(j+48|0,j+192|0);Ce(j+32|0,j+240|0);Ce(j+16|0,j+144|0);Hd(j+64|0,j+208|0);Hd(j+48|0,j+256|0);Hd(j+32|0,j+176|0);Jd(j+16|0,j+160|0);Gd(j+80|0,j+64|0);Gd(j+96|0,j+48|0);Gd(j+112|0,j+32|0);Gd(j+128|0,j+16|0);Ce(j+64|0,j+80|0);Gd(j+64|0,j+96|0);Hd(j+80|0,j+112|0);Ce(j+32|0,j+128|0);Gd(j+32|0,j+80|0);Ce(j+16|0,j+64|0);Hd(j+16|0,j+32|0);Gd(j+16|0,j+96|0);Ce(j+48|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+80|0,j+96|0);Hd(j+48|0,j+80|0);Gd(j+48|0,j+128|0);Gd(j+112|0,j+48|0);Ce(j+96|0,j+32|0);Gd(j+96|0,j+48|0);Hd(j+96|0,j+128|0);Gd(j+112|0,j+96|0);Gd(j+32|0,j+96|0);Hd(j+32|0,j+16|0);Gd(j+32|0,j+64|0);Ce(j+64|0,j+160|0);Ce(j+128|0,j+176|0);Ce(j+96|0,j+16|0);Gd(j+96|0,j+32|0);Hd(j+96|0,j+160|0);Gd(j+160|0,j+176|0);Hd(j+160|0,j+32|0);Hd(j+176|0,j+16|0);Gd(j+160|0,j+176|0);Gd(j+176|0,j+96|0);Gd(j+64|0,j+256|0);Gd(j+128|0,j+208|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+256|0);Gd(j+256|0,j+208|0);Hd(j+256|0,j+112|0);Hd(j+208|0,j+48|0);Gd(j+256|0,j+208|0);Gd(j+208|0,j+96|0);Gd(j+160|0,j+64|0);Gd(j+256|0,j+64|0);Gd(j+176|0,j+128|0);Gd(j+208|0,j+128|0);Ce(j+64|0,j+144|0);Ce(j+128|0,j+240|0);Gd(j+64|0,j+192|0);Gd(j+128|0,j+224|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+192|0);Gd(j+192|0,j+224|0);Hd(j+192|0,j+112|0);Hd(j+224|0,j+48|0);Gd(j+192|0,j+224|0);Gd(j+224|0,j+96|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+144|0);Gd(j+144|0,j+240|0);Hd(j+144|0,j+32|0);Hd(j+240|0,j+16|0);Gd(j+144|0,j+240|0);Gd(j+240|0,j+80|0);Gd(j+144|0,j+64|0);Gd(j+192|0,j+64|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+128|0);Gd(j+144|0,j+256|0);Gd(j+240|0,j+160|0);Gd(j+192|0,j+144|0);Gd(j+160|0,j+256|0);Gd(j+256|0,j+240|0);Gd(j+240|0,j+176|0);Gd(j+176|0,j+224|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+208|0);Gd(j+208|0,j+176|0);Gd(j+160|0,j+208|0);_c(j+128|0,j+256|0,147);_c(j+112|0,j+240|0,147);_c(j+96|0,j+192|0,147);_c(j+80|0,j+160|0,147);_c(j+64|0,j+208|0,147);_c(j+48|0,j+144|0,147);_c(j+32|0,j+224|0,147);_c(j+16|0,j+176|0,147);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+192|0,j+96|0);Gd(j+160|0,j+80|0);Gd(j+208|0,j+64|0);Gd(j+144|0,j+48|0);Gd(j+224|0,j+32|0);Gd(j+176|0,j+16|0);Gd(j+128|0,j+176|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+240|0);Gd(j+112|0,j+176|0);Gd(j+80|0,j+192|0);Gd(j+64|0,j+160|0);Gd(j+48|0,j+208|0);Gd(j+80|0,j+176|0);Gd(j+32|0,j+144|0);Gd(j+16|0,j+224|0);Gd(j+64|0,j+176|0);_c(j+256|0,j+256|0,78);_c(j+240|0,j+240|0,78);_c(j+192|0,j+192|0,78);_c(j+160|0,j+160|0,78);_c(j+208|0,j+208|0,78);_c(j+144|0,j+144|0,78);_c(j+224|0,j+224|0,78);_c(j+176|0,j+176|0,78);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+96|0,j+192|0);Gd(j+80|0,j+160|0);Gd(j+64|0,j+208|0);Gd(j+48|0,j+144|0);Gd(j+32|0,j+224|0);Gd(j+16|0,j+176|0);Gd(j+128|0,h+640|0);rb(j+128|0,35286);Gd(j+112|0,h+656|0);rb(j+112|0,35286);Gd(j+96|0,h+672|0);rb(j+96|0,35286);Gd(j+80|0,h+688|0);rb(j+80|0,35286);Gd(j+64|0,h+704|0);rb(j+64|0,35286);Gd(j+48|0,h+720|0);rb(j+48|0,35286);Gd(j+32|0,h+736|0);rb(j+32|0,35286);Gd(j+16|0,h+752|0);rb(j+16|0,35286);Gd(j+48|0,j+32|0);Gd(j+96|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+32|0,j+96|0);Gd(j+80|0,j+128|0);Gd(j+32|0,j+80|0);Gd(j+80|0,j+16|0);Gd(j+80|0,j+64|0);Gd(j+16|0,j+48|0);Gd(j+80|0,j+112|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+16|0);Gd(j+112|0,j+48|0);Ce(j+208|0,j+16|0);Ce(j+224|0,j+112|0);Ce(j+240|0,j+48|0);Ce(j+176|0,j+96|0);Ce(j+192|0,j+32|0);Gd(j+208|0,j+64|0);Gd(j+224|0,j+96|0);Gd(j+240|0,j+80|0);Gd(j+176|0,j+64|0);Gd(j+192|0,j+128|0);Ce(j+160|0,j+208|0);Ce(j+256|0,j+224|0);Ce(j+144|0,j+208|0);Jd(j+224|0,j+240|0);Jd(j+208|0,j+192|0);Gd(j+144|0,j+256|0);Hd(j+160|0,j+192|0);Hd(j+256|0,j+240|0);Gd(j+192|0,j+240|0);Hd(j+144|0,j+192|0);Ce(j+192|0,j+80|0);Gd(j+192|0,j+128|0);Hd(j+176|0,j+192|0);Gd(j+208|0,j+176|0);Gd(j+224|0,j+176|0);Ce(j+176|0,j+16|0);Gd(j+176|0,j+112|0);Ce(j+192|0,j+48|0);Ce(j+240|0,j+176|0);Gd(j+192|0,j+32|0);Jd(j+240|0,j+192|0);Hd(j+176|0,j+192|0);Gd(j+256|0,j+176|0);Gd(j+208|0,j+144|0);Gd(j+224|0,j+160|0);Gd(j+240|0,j+144|0);Gd(j+256|0,j+160|0);Gd(j+240|0,j+160|0);Ce(j+192|0,j+96|0);Ce(j+176|0,j+64|0);Ce(j+160|0,j+112|0);Ce(j+144|0,j+16|0);Hd(j+192|0,j+80|0);Hd(j+176|0,j+128|0);Hd(j+160|0,j+48|0);Jd(j+144|0,j+32|0);Gd(j+208|0,j+192|0);Gd(j+224|0,j+176|0);Gd(j+240|0,j+160|0);Gd(j+256|0,j+144|0);Ce(j+192|0,j+208|0);Gd(j+192|0,j+224|0);Hd(j+208|0,j+240|0);Ce(j+160|0,j+256|0);Gd(j+160|0,j+208|0);Ce(j+144|0,j+192|0);Hd(j+144|0,j+160|0);Gd(j+144|0,j+224|0);Ce(j+176|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+208|0,j+224|0);Hd(j+176|0,j+208|0);Gd(j+176|0,j+256|0);Gd(j+240|0,j+176|0);Ce(j+224|0,j+160|0);Gd(j+224|0,j+176|0);Hd(j+224|0,j+256|0);Gd(j+240|0,j+224|0);Gd(j+160|0,j+224|0);Hd(j+160|0,j+144|0);Gd(j+160|0,j+192|0);Ce(j+192|0,j+32|0);Ce(j+256|0,j+48|0);Ce(j+224|0,j+144|0);Gd(j+224|0,j+160|0);Hd(j+224|0,j+32|0);Gd(j+32|0,j+48|0);Hd(j+32|0,j+160|0);Hd(j+48|0,j+144|0);Gd(j+32|0,j+48|0);Gd(j+48|0,j+224|0);Gd(j+192|0,j+128|0);Gd(j+256|0,j+80|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+128|0);Gd(j+128|0,j+80|0);Hd(j+128|0,j+240|0);Hd(j+80|0,j+176|0);Gd(j+128|0,j+80|0);Gd(j+80|0,j+224|0);Gd(j+32|0,j+192|0);Gd(j+128|0,j+192|0);Gd(j+48|0,j+256|0);Gd(j+80|0,j+256|0);Ce(j+192|0,j+16|0);Ce(j+256|0,j+112|0);Gd(j+192|0,j+64|0);Gd(j+256|0,j+96|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+64|0);Gd(j+64|0,j+96|0);Hd(j+64|0,j+240|0);Hd(j+96|0,j+176|0);Gd(j+64|0,j+96|0);Gd(j+96|0,j+224|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+16|0);Gd(j+16|0,j+112|0);Hd(j+16|0,j+160|0);Hd(j+112|0,j+144|0);Gd(j+16|0,j+112|0);Gd(j+112|0,j+208|0);Gd(j+16|0,j+192|0);Gd(j+64|0,j+192|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+256|0);Gd(j+16|0,j+128|0);Gd(j+112|0,j+32|0);Gd(j+64|0,j+16|0);Gd(j+32|0,j+128|0);Gd(j+128|0,j+112|0);Gd(j+112|0,j+48|0);Gd(j+48|0,j+96|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+80|0);Gd(j+80|0,j+48|0);Gd(j+32|0,j+80|0);_c(j+256|0,j+128|0,147);_c(j+240|0,j+112|0,147);_c(j+224|0,j+64|0,147);_c(j+208|0,j+32|0,147);_c(j+192|0,j+80|0,147);_c(j+176|0,j+16|0,147);_c(j+160|0,j+96|0,147);_c(j+144|0,j+48|0,147);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+64|0,j+224|0);Gd(j+32|0,j+208|0);Gd(j+80|0,j+192|0);Gd(j+16|0,j+176|0);Gd(j+96|0,j+160|0);Gd(j+48|0,j+144|0);Gd(j+256|0,j+48|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+112|0);Gd(j+240|0,j+48|0);Gd(j+208|0,j+64|0);Gd(j+192|0,j+32|0);Gd(j+176|0,j+80|0);Gd(j+208|0,j+48|0);Gd(j+160|0,j+16|0);Gd(j+144|0,j+96|0);Gd(j+192|0,j+48|0);_c(j+128|0,j+128|0,78);_c(j+112|0,j+112|0,78);_c(j+64|0,j+64|0,78);_c(j+32|0,j+32|0,78);_c(j+80|0,j+80|0,78);_c(j+16|0,j+16|0,78);_c(j+96|0,j+96|0,78);_c(j+48|0,j+48|0,78);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+224|0,j+64|0);Gd(j+208|0,j+32|0);Gd(j+192|0,j+80|0);Gd(j+176|0,j+16|0);Gd(j+160|0,j+96|0);Gd(j+144|0,j+48|0);Gd(j+256|0,h+768|0);rb(j+256|0,35286);Gd(j+240|0,h+784|0);rb(j+240|0,35286);Gd(j+224|0,h+800|0);rb(j+224|0,35286);Gd(j+208|0,h+816|0);rb(j+208|0,35286);Gd(j+192|0,h+832|0);rb(j+192|0,35286);Gd(j+176|0,h+848|0);rb(j+176|0,35286);Gd(j+160|0,h+864|0);rb(j+160|0,35286);Gd(j+144|0,h+880|0);rb(j+144|0,35286);Gd(j+176|0,j+160|0);Gd(j+224|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+160|0,j+224|0);Gd(j+208|0,j+256|0);Gd(j+160|0,j+208|0);Gd(j+208|0,j+144|0);Gd(j+208|0,j+192|0);Gd(j+144|0,j+176|0);Gd(j+208|0,j+240|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+144|0);Gd(j+240|0,j+176|0);Ce(j+80|0,j+144|0);Ce(j+96|0,j+240|0);Ce(j+112|0,j+176|0);Ce(j+48|0,j+224|0);Ce(j+64|0,j+160|0);Gd(j+80|0,j+192|0);Gd(j+96|0,j+224|0);Gd(j+112|0,j+208|0);Gd(j+48|0,j+192|0);Gd(j+64|0,j+256|0);Ce(j+32|0,j+80|0);Ce(j+128|0,j+96|0);Ce(j+16|0,j+80|0);Jd(j+96|0,j+112|0);Jd(j+80|0,j+64|0);Gd(j+16|0,j+128|0);Hd(j+32|0,j+64|0);Hd(j+128|0,j+112|0);Gd(j+64|0,j+112|0);Hd(j+16|0,j+64|0);Ce(j+64|0,j+208|0);Gd(j+64|0,j+256|0);Hd(j+48|0,j+64|0);Gd(j+80|0,j+48|0);Gd(j+96|0,j+48|0);Ce(j+48|0,j+144|0);Gd(j+48|0,j+240|0);Ce(j+64|0,j+176|0);Ce(j+112|0,j+48|0);Gd(j+64|0,j+160|0);Jd(j+112|0,j+64|0);Hd(j+48|0,j+64|0);Gd(j+128|0,j+48|0);Gd(j+80|0,j+16|0);Gd(j+96|0,j+32|0);Gd(j+112|0,j+16|0);Gd(j+128|0,j+32|0);Gd(j+112|0,j+32|0);Ce(j+64|0,j+224|0);Ce(j+48|0,j+192|0);Ce(j+32|0,j+240|0);Ce(j+16|0,j+144|0);Hd(j+64|0,j+208|0);Hd(j+48|0,j+256|0);Hd(j+32|0,j+176|0);Jd(j+16|0,j+160|0);Gd(j+80|0,j+64|0);Gd(j+96|0,j+48|0);Gd(j+112|0,j+32|0);Gd(j+128|0,j+16|0);Ce(j+64|0,j+80|0);Gd(j+64|0,j+96|0);Hd(j+80|0,j+112|0);Ce(j+32|0,j+128|0);Gd(j+32|0,j+80|0);Ce(j+16|0,j+64|0);Hd(j+16|0,j+32|0);Gd(j+16|0,j+96|0);Ce(j+48|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+80|0,j+96|0);Hd(j+48|0,j+80|0);Gd(j+48|0,j+128|0);Gd(j+112|0,j+48|0);Ce(j+96|0,j+32|0);Gd(j+96|0,j+48|0);Hd(j+96|0,j+128|0);Gd(j+112|0,j+96|0);Gd(j+32|0,j+96|0);Hd(j+32|0,j+16|0);Gd(j+32|0,j+64|0);Ce(j+64|0,j+160|0);Ce(j+128|0,j+176|0);Ce(j+96|0,j+16|0);Gd(j+96|0,j+32|0);Hd(j+96|0,j+160|0);Gd(j+160|0,j+176|0);Hd(j+160|0,j+32|0);Hd(j+176|0,j+16|0);Gd(j+160|0,j+176|0);Gd(j+176|0,j+96|0);Gd(j+64|0,j+256|0);Gd(j+128|0,j+208|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+256|0);Gd(j+256|0,j+208|0);Hd(j+256|0,j+112|0);Hd(j+208|0,j+48|0);Gd(j+256|0,j+208|0);Gd(j+208|0,j+96|0);Gd(j+160|0,j+64|0);Gd(j+256|0,j+64|0);Gd(j+176|0,j+128|0);Gd(j+208|0,j+128|0);Ce(j+64|0,j+144|0);Ce(j+128|0,j+240|0);Gd(j+64|0,j+192|0);Gd(j+128|0,j+224|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+192|0);Gd(j+192|0,j+224|0);Hd(j+192|0,j+112|0);Hd(j+224|0,j+48|0);Gd(j+192|0,j+224|0);Gd(j+224|0,j+96|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+144|0);Gd(j+144|0,j+240|0);Hd(j+144|0,j+32|0);Hd(j+240|0,j+16|0);Gd(j+144|0,j+240|0);Gd(j+240|0,j+80|0);Gd(j+144|0,j+64|0);Gd(j+192|0,j+64|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+128|0);Gd(j+144|0,j+256|0);Gd(j+240|0,j+160|0);Gd(j+192|0,j+144|0);Gd(j+160|0,j+256|0);Gd(j+256|0,j+240|0);Gd(j+240|0,j+176|0);Gd(j+176|0,j+224|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+208|0);Gd(j+208|0,j+176|0);Gd(j+160|0,j+208|0);_c(j+128|0,j+256|0,147);_c(j+112|0,j+240|0,147);_c(j+96|0,j+192|0,147);_c(j+80|0,j+160|0,147);_c(j+64|0,j+208|0,147);_c(j+48|0,j+144|0,147);_c(j+32|0,j+224|0,147);_c(j+16|0,j+176|0,147);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+192|0,j+96|0);Gd(j+160|0,j+80|0);Gd(j+208|0,j+64|0);Gd(j+144|0,j+48|0);Gd(j+224|0,j+32|0);Gd(j+176|0,j+16|0);Gd(j+128|0,j+176|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+240|0);Gd(j+112|0,j+176|0);Gd(j+80|0,j+192|0);Gd(j+64|0,j+160|0);Gd(j+48|0,j+208|0);Gd(j+80|0,j+176|0);Gd(j+32|0,j+144|0);Gd(j+16|0,j+224|0);Gd(j+64|0,j+176|0);_c(j+256|0,j+256|0,78);_c(j+240|0,j+240|0,78);_c(j+192|0,j+192|0,78);_c(j+160|0,j+160|0,78);_c(j+208|0,j+208|0,78);_c(j+144|0,j+144|0,78);_c(j+224|0,j+224|0,78);_c(j+176|0,j+176|0,78);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+96|0,j+192|0);Gd(j+80|0,j+160|0);Gd(j+64|0,j+208|0);Gd(j+48|0,j+144|0);Gd(j+32|0,j+224|0);Gd(j+16|0,j+176|0);Gd(j+128|0,h+896|0);rb(j+128|0,35286);Gd(j+112|0,h+912|0);rb(j+112|0,35286);Gd(j+96|0,h+928|0);rb(j+96|0,35286);Gd(j+80|0,h+944|0);rb(j+80|0,35286);Gd(j+64|0,h+960|0);rb(j+64|0,35286);Gd(j+48|0,h+976|0);rb(j+48|0,35286);Gd(j+32|0,h+992|0);rb(j+32|0,35286);Gd(j+16|0,h+1008|0);rb(j+16|0,35286);Gd(j+48|0,j+32|0);Gd(j+96|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+32|0,j+96|0);Gd(j+80|0,j+128|0);Gd(j+32|0,j+80|0);Gd(j+80|0,j+16|0);Gd(j+80|0,j+64|0);Gd(j+16|0,j+48|0);Gd(j+80|0,j+112|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+16|0);Gd(j+112|0,j+48|0);Ce(j+208|0,j+16|0);Ce(j+224|0,j+112|0);Ce(j+240|0,j+48|0);Ce(j+176|0,j+96|0);Ce(j+192|0,j+32|0);Gd(j+208|0,j+64|0);Gd(j+224|0,j+96|0);Gd(j+240|0,j+80|0);Gd(j+176|0,j+64|0);Gd(j+192|0,j+128|0);Ce(j+160|0,j+208|0);Ce(j+256|0,j+224|0);Ce(j+144|0,j+208|0);Jd(j+224|0,j+240|0);Jd(j+208|0,j+192|0);Gd(j+144|0,j+256|0);Hd(j+160|0,j+192|0);Hd(j+256|0,j+240|0);Gd(j+192|0,j+240|0);Hd(j+144|0,j+192|0);Ce(j+192|0,j+80|0);Gd(j+192|0,j+128|0);Hd(j+176|0,j+192|0);Gd(j+208|0,j+176|0);Gd(j+224|0,j+176|0);Ce(j+176|0,j+16|0);Gd(j+176|0,j+112|0);Ce(j+192|0,j+48|0);Ce(j+240|0,j+176|0);Gd(j+192|0,j+32|0);Jd(j+240|0,j+192|0);Hd(j+176|0,j+192|0);Gd(j+256|0,j+176|0);Gd(j+208|0,j+144|0);Gd(j+224|0,j+160|0);Gd(j+240|0,j+144|0);Gd(j+256|0,j+160|0);Gd(j+240|0,j+160|0);Ce(j+192|0,j+96|0);Ce(j+176|0,j+64|0);Ce(j+160|0,j+112|0);Ce(j+144|0,j+16|0);Hd(j+192|0,j+80|0);Hd(j+176|0,j+128|0);Hd(j+160|0,j+48|0);Jd(j+144|0,j+32|0);Gd(j+208|0,j+192|0);Gd(j+224|0,j+176|0);Gd(j+240|0,j+160|0);Gd(j+256|0,j+144|0);Ce(j+192|0,j+208|0);Gd(j+192|0,j+224|0);Hd(j+208|0,j+240|0);Ce(j+160|0,j+256|0);Gd(j+160|0,j+208|0);Ce(j+144|0,j+192|0);Hd(j+144|0,j+160|0);Gd(j+144|0,j+224|0);Ce(j+176|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+208|0,j+224|0);Hd(j+176|0,j+208|0);Gd(j+176|0,j+256|0);Gd(j+240|0,j+176|0);Ce(j+224|0,j+160|0);Gd(j+224|0,j+176|0);Hd(j+224|0,j+256|0);Gd(j+240|0,j+224|0);Gd(j+160|0,j+224|0);Hd(j+160|0,j+144|0);Gd(j+160|0,j+192|0);Ce(j+192|0,j+32|0);Ce(j+256|0,j+48|0);Ce(j+224|0,j+144|0);Gd(j+224|0,j+160|0);Hd(j+224|0,j+32|0);Gd(j+32|0,j+48|0);Hd(j+32|0,j+160|0);Hd(j+48|0,j+144|0);Gd(j+32|0,j+48|0);Gd(j+48|0,j+224|0);Gd(j+192|0,j+128|0);Gd(j+256|0,j+80|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+128|0);Gd(j+128|0,j+80|0);Hd(j+128|0,j+240|0);Hd(j+80|0,j+176|0);Gd(j+128|0,j+80|0);Gd(j+80|0,j+224|0);Gd(j+32|0,j+192|0);Gd(j+128|0,j+192|0);Gd(j+48|0,j+256|0);Gd(j+80|0,j+256|0);Ce(j+192|0,j+16|0);Ce(j+256|0,j+112|0);Gd(j+192|0,j+64|0);Gd(j+256|0,j+96|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+64|0);Gd(j+64|0,j+96|0);Hd(j+64|0,j+240|0);Hd(j+96|0,j+176|0);Gd(j+64|0,j+96|0);Gd(j+96|0,j+224|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+16|0);Gd(j+16|0,j+112|0);Hd(j+16|0,j+160|0);Hd(j+112|0,j+144|0);Gd(j+16|0,j+112|0);Gd(j+112|0,j+208|0);Gd(j+16|0,j+192|0);Gd(j+64|0,j+192|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+256|0);Gd(j+16|0,j+128|0);Gd(j+112|0,j+32|0);Gd(j+64|0,j+16|0);Gd(j+32|0,j+128|0);Gd(j+128|0,j+112|0);Gd(j+112|0,j+48|0);Gd(j+48|0,j+96|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+80|0);Gd(j+80|0,j+48|0);Gd(j+32|0,j+80|0);_c(j+256|0,j+128|0,147);_c(j+240|0,j+112|0,147);_c(j+224|0,j+64|0,147);_c(j+208|0,j+32|0,147);_c(j+192|0,j+80|0,147);_c(j+176|0,j+16|0,147);_c(j+160|0,j+96|0,147);_c(j+144|0,j+48|0,147);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+64|0,j+224|0);Gd(j+32|0,j+208|0);Gd(j+80|0,j+192|0);Gd(j+16|0,j+176|0);Gd(j+96|0,j+160|0);Gd(j+48|0,j+144|0);Gd(j+256|0,j+48|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+112|0);Gd(j+240|0,j+48|0);Gd(j+208|0,j+64|0);Gd(j+192|0,j+32|0);Gd(j+176|0,j+80|0);Gd(j+208|0,j+48|0);Gd(j+160|0,j+16|0);Gd(j+144|0,j+96|0);Gd(j+192|0,j+48|0);_c(j+128|0,j+128|0,78);_c(j+112|0,j+112|0,78);_c(j+64|0,j+64|0,78);_c(j+32|0,j+32|0,78);_c(j+80|0,j+80|0,78);_c(j+16|0,j+16|0,78);_c(j+96|0,j+96|0,78);_c(j+48|0,j+48|0,78);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+224|0,j+64|0);Gd(j+208|0,j+32|0);Gd(j+192|0,j+80|0);Gd(j+176|0,j+16|0);Gd(j+160|0,j+96|0);Gd(j+144|0,j+48|0);Gd(j+256|0,h+1024|0);rb(j+256|0,35286);Gd(j+240|0,h+1040|0);rb(j+240|0,35286);Gd(j+224|0,h+1056|0);rb(j+224|0,35286);Gd(j+208|0,h+1072|0);rb(j+208|0,35286);Gd(j+192|0,h+1088|0);rb(j+192|0,35286);Gd(j+176|0,h+1104|0);rb(j+176|0,35286);Gd(j+160|0,h+1120|0);rb(j+160|0,35286);Gd(j+144|0,h+1136|0);rb(j+144|0,35286);Gd(j+176|0,j+160|0);Gd(j+224|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+160|0,j+224|0);Gd(j+208|0,j+256|0);Gd(j+160|0,j+208|0);Gd(j+208|0,j+144|0);Gd(j+208|0,j+192|0);Gd(j+144|0,j+176|0);Gd(j+208|0,j+240|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+144|0);Gd(j+240|0,j+176|0);Ce(j+80|0,j+144|0);Ce(j+96|0,j+240|0);Ce(j+112|0,j+176|0);Ce(j+48|0,j+224|0);Ce(j+64|0,j+160|0);Gd(j+80|0,j+192|0);Gd(j+96|0,j+224|0);Gd(j+112|0,j+208|0);Gd(j+48|0,j+192|0);Gd(j+64|0,j+256|0);Ce(j+32|0,j+80|0);Ce(j+128|0,j+96|0);Ce(j+16|0,j+80|0);Jd(j+96|0,j+112|0);Jd(j+80|0,j+64|0);Gd(j+16|0,j+128|0);Hd(j+32|0,j+64|0);Hd(j+128|0,j+112|0);Gd(j+64|0,j+112|0);Hd(j+16|0,j+64|0);Ce(j+64|0,j+208|0);Gd(j+64|0,j+256|0);Hd(j+48|0,j+64|0);Gd(j+80|0,j+48|0);Gd(j+96|0,j+48|0);Ce(j+48|0,j+144|0);Gd(j+48|0,j+240|0);Ce(j+64|0,j+176|0);Ce(j+112|0,j+48|0);Gd(j+64|0,j+160|0);Jd(j+112|0,j+64|0);Hd(j+48|0,j+64|0);Gd(j+128|0,j+48|0);Gd(j+80|0,j+16|0);Gd(j+96|0,j+32|0);Gd(j+112|0,j+16|0);Gd(j+128|0,j+32|0);Gd(j+112|0,j+32|0);Ce(j+64|0,j+224|0);Ce(j+48|0,j+192|0);Ce(j+32|0,j+240|0);Ce(j+16|0,j+144|0);Hd(j+64|0,j+208|0);Hd(j+48|0,j+256|0);Hd(j+32|0,j+176|0);Jd(j+16|0,j+160|0);Gd(j+80|0,j+64|0);Gd(j+96|0,j+48|0);Gd(j+112|0,j+32|0);Gd(j+128|0,j+16|0);Ce(j+64|0,j+80|0);Gd(j+64|0,j+96|0);Hd(j+80|0,j+112|0);Ce(j+32|0,j+128|0);Gd(j+32|0,j+80|0);Ce(j+16|0,j+64|0);Hd(j+16|0,j+32|0);Gd(j+16|0,j+96|0);Ce(j+48|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+80|0,j+96|0);Hd(j+48|0,j+80|0);Gd(j+48|0,j+128|0);Gd(j+112|0,j+48|0);Ce(j+96|0,j+32|0);Gd(j+96|0,j+48|0);Hd(j+96|0,j+128|0);Gd(j+112|0,j+96|0);Gd(j+32|0,j+96|0);Hd(j+32|0,j+16|0);Gd(j+32|0,j+64|0);Ce(j+64|0,j+160|0);Ce(j+128|0,j+176|0);Ce(j+96|0,j+16|0);Gd(j+96|0,j+32|0);Hd(j+96|0,j+160|0);Gd(j+160|0,j+176|0);Hd(j+160|0,j+32|0);Hd(j+176|0,j+16|0);Gd(j+160|0,j+176|0);Gd(j+176|0,j+96|0);Gd(j+64|0,j+256|0);Gd(j+128|0,j+208|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+256|0);Gd(j+256|0,j+208|0);Hd(j+256|0,j+112|0);Hd(j+208|0,j+48|0);Gd(j+256|0,j+208|0);Gd(j+208|0,j+96|0);Gd(j+160|0,j+64|0);Gd(j+256|0,j+64|0);Gd(j+176|0,j+128|0);Gd(j+208|0,j+128|0);Ce(j+64|0,j+144|0);Ce(j+128|0,j+240|0);Gd(j+64|0,j+192|0);Gd(j+128|0,j+224|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+64|0);Gd(j+64|0,j+128|0);Hd(j+64|0,j+32|0);Hd(j+128|0,j+16|0);Gd(j+128|0,j+64|0);Gd(j+64|0,j+80|0);Ce(j+96|0,j+48|0);Gd(j+96|0,j+112|0);Hd(j+96|0,j+192|0);Gd(j+192|0,j+224|0);Hd(j+192|0,j+112|0);Hd(j+224|0,j+48|0);Gd(j+192|0,j+224|0);Gd(j+224|0,j+96|0);Gd(j+16|0,j+48|0);Gd(j+32|0,j+112|0);Ce(j+80|0,j+16|0);Gd(j+80|0,j+32|0);Hd(j+80|0,j+144|0);Gd(j+144|0,j+240|0);Hd(j+144|0,j+32|0);Hd(j+240|0,j+16|0);Gd(j+144|0,j+240|0);Gd(j+240|0,j+80|0);Gd(j+144|0,j+64|0);Gd(j+192|0,j+64|0);Gd(j+240|0,j+128|0);Gd(j+224|0,j+128|0);Gd(j+144|0,j+256|0);Gd(j+240|0,j+160|0);Gd(j+192|0,j+144|0);Gd(j+160|0,j+256|0);Gd(j+256|0,j+240|0);Gd(j+240|0,j+176|0);Gd(j+176|0,j+224|0);Gd(j+192|0,j+176|0);Gd(j+224|0,j+208|0);Gd(j+208|0,j+176|0);Gd(j+160|0,j+208|0);_c(j+128|0,j+256|0,147);_c(j+112|0,j+240|0,147);_c(j+96|0,j+192|0,147);_c(j+80|0,j+160|0,147);_c(j+64|0,j+208|0,147);_c(j+48|0,j+144|0,147);_c(j+32|0,j+224|0,147);_c(j+16|0,j+176|0,147);Gd(j+256|0,j+128|0);Gd(j+240|0,j+112|0);Gd(j+192|0,j+96|0);Gd(j+160|0,j+80|0);Gd(j+208|0,j+64|0);Gd(j+144|0,j+48|0);Gd(j+224|0,j+32|0);Gd(j+176|0,j+16|0);Gd(j+128|0,j+176|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+240|0);Gd(j+112|0,j+176|0);Gd(j+80|0,j+192|0);Gd(j+64|0,j+160|0);Gd(j+48|0,j+208|0);Gd(j+80|0,j+176|0);Gd(j+32|0,j+144|0);Gd(j+16|0,j+224|0);Gd(j+64|0,j+176|0);_c(j+256|0,j+256|0,78);_c(j+240|0,j+240|0,78);_c(j+192|0,j+192|0,78);_c(j+160|0,j+160|0,78);_c(j+208|0,j+208|0,78);_c(j+144|0,j+144|0,78);_c(j+224|0,j+224|0,78);_c(j+176|0,j+176|0,78);Gd(j+128|0,j+256|0);Gd(j+112|0,j+240|0);Gd(j+96|0,j+192|0);Gd(j+80|0,j+160|0);Gd(j+64|0,j+208|0);Gd(j+48|0,j+144|0);Gd(j+32|0,j+224|0);Gd(j+16|0,j+176|0);Gd(j+128|0,h+1152|0);rb(j+128|0,35302);Gd(j+112|0,h+1168|0);rb(j+112|0,35302);Gd(j+96|0,h+1184|0);rb(j+96|0,35302);Gd(j+80|0,h+1200|0);rb(j+80|0,35302);Gd(j+64|0,h+1216|0);rb(j+64|0,35302);Gd(j+48|0,h+1232|0);rb(j+48|0,35302);Gd(j+32|0,h+1248|0);rb(j+32|0,35302);Gd(j+16|0,h+1264|0);rb(j+16|0,35302);Gd(j+48|0,j+32|0);Gd(j+96|0,j+112|0);Gd(j+48|0,j+128|0);Gd(j+32|0,j+96|0);Gd(j+80|0,j+128|0);Gd(j+32|0,j+80|0);Gd(j+80|0,j+16|0);Gd(j+80|0,j+64|0);Gd(j+16|0,j+48|0);Gd(j+80|0,j+112|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+16|0);Gd(j+112|0,j+48|0);Ce(j+208|0,j+16|0);Ce(j+224|0,j+112|0);Ce(j+240|0,j+48|0);Ce(j+176|0,j+96|0);Ce(j+192|0,j+32|0);Gd(j+208|0,j+64|0);Gd(j+224|0,j+96|0);Gd(j+240|0,j+80|0);Gd(j+176|0,j+64|0);Gd(j+192|0,j+128|0);Ce(j+160|0,j+208|0);Ce(j+256|0,j+224|0);Ce(j+144|0,j+208|0);Jd(j+224|0,j+240|0);Jd(j+208|0,j+192|0);Gd(j+144|0,j+256|0);Hd(j+160|0,j+192|0);Hd(j+256|0,j+240|0);Gd(j+192|0,j+240|0);Hd(j+144|0,j+192|0);Ce(j+192|0,j+80|0);Gd(j+192|0,j+128|0);Hd(j+176|0,j+192|0);Gd(j+208|0,j+176|0);Gd(j+224|0,j+176|0);Ce(j+176|0,j+16|0);Gd(j+176|0,j+112|0);Ce(j+192|0,j+48|0);Ce(j+240|0,j+176|0);Gd(j+192|0,j+32|0);Jd(j+240|0,j+192|0);Hd(j+176|0,j+192|0);Gd(j+256|0,j+176|0);Gd(j+208|0,j+144|0);Gd(j+224|0,j+160|0);Gd(j+240|0,j+144|0);Gd(j+256|0,j+160|0);Gd(j+240|0,j+160|0);Ce(j+192|0,j+96|0);Ce(j+176|0,j+64|0);Ce(j+160|0,j+112|0);Ce(j+144|0,j+16|0);Hd(j+192|0,j+80|0);Hd(j+176|0,j+128|0);Hd(j+160|0,j+48|0);Jd(j+144|0,j+32|0);Gd(j+208|0,j+192|0);Gd(j+224|0,j+176|0);Gd(j+240|0,j+160|0);Gd(j+256|0,j+144|0);Ce(j+192|0,j+208|0);Gd(j+192|0,j+224|0);Hd(j+208|0,j+240|0);Ce(j+160|0,j+256|0);Gd(j+160|0,j+208|0);Ce(j+144|0,j+192|0);Hd(j+144|0,j+160|0);Gd(j+144|0,j+224|0);Ce(j+176|0,j+240|0);Gd(j+176|0,j+256|0);Gd(j+208|0,j+224|0);Hd(j+176|0,j+208|0);Gd(j+176|0,j+256|0);Gd(j+240|0,j+176|0);Ce(j+224|0,j+160|0);Gd(j+224|0,j+176|0);Hd(j+224|0,j+256|0);Gd(j+240|0,j+224|0);Gd(j+160|0,j+224|0);Hd(j+160|0,j+144|0);Gd(j+160|0,j+192|0);Ce(j+192|0,j+32|0);Ce(j+256|0,j+48|0);Ce(j+224|0,j+144|0);Gd(j+224|0,j+160|0);Hd(j+224|0,j+32|0);Gd(j+32|0,j+48|0);Hd(j+32|0,j+160|0);Hd(j+48|0,j+144|0);Gd(j+32|0,j+48|0);Gd(j+48|0,j+224|0);Gd(j+192|0,j+128|0);Gd(j+256|0,j+80|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+128|0);Gd(j+128|0,j+80|0);Hd(j+128|0,j+240|0);Hd(j+80|0,j+176|0);Gd(j+128|0,j+80|0);Gd(j+80|0,j+224|0);Gd(j+32|0,j+192|0);Gd(j+128|0,j+192|0);Gd(j+48|0,j+256|0);Gd(j+80|0,j+256|0);Ce(j+192|0,j+16|0);Ce(j+256|0,j+112|0);Gd(j+192|0,j+64|0);Gd(j+256|0,j+96|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+192|0);Gd(j+192|0,j+256|0);Hd(j+192|0,j+160|0);Hd(j+256|0,j+144|0);Gd(j+256|0,j+192|0);Gd(j+192|0,j+208|0);Ce(j+224|0,j+176|0);Gd(j+224|0,j+240|0);Hd(j+224|0,j+64|0);Gd(j+64|0,j+96|0);Hd(j+64|0,j+240|0);Hd(j+96|0,j+176|0);Gd(j+64|0,j+96|0);Gd(j+96|0,j+224|0);Gd(j+144|0,j+176|0);Gd(j+160|0,j+240|0);Ce(j+208|0,j+144|0);Gd(j+208|0,j+160|0);Hd(j+208|0,j+16|0);Gd(j+16|0,j+112|0);Hd(j+16|0,j+160|0);Hd(j+112|0,j+144|0);Gd(j+16|0,j+112|0);Gd(j+112|0,j+208|0);Gd(j+16|0,j+192|0);Gd(j+64|0,j+192|0);Gd(j+112|0,j+256|0);Gd(j+96|0,j+256|0);Gd(j+16|0,j+128|0);Gd(j+112|0,j+32|0);Gd(j+64|0,j+16|0);Gd(j+32|0,j+128|0);Gd(j+128|0,j+112|0);Gd(j+112|0,j+48|0);Gd(j+48|0,j+96|0);Gd(j+64|0,j+48|0);Gd(j+96|0,j+80|0);Gd(j+80|0,j+48|0);Gd(j+32|0,j+80|0);Gd(j+128|0,h+1280|0);Gd(j+112|0,h+1296|0);Gd(j+64|0,h+1312|0);Gd(j+32|0,h+1328|0);Gd(j+80|0,h+1344|0);Gd(j+16|0,h+1360|0);Gd(j+96|0,h+1376|0);Gd(j+48|0,h+1392|0);Ce(j+256|0,j+96|0);_d(j+256|0,1);Gd(j+256|0,j+48|0);Hd(j+256|0,1104);Gd(j+48|0,j+256|0);ae(j+256|0,1);Gd(j+96|0,j+256|0);Ce(j+256|0,j+80|0);_d(j+256|0,1);Gd(j+256|0,j+16|0);Hd(j+256|0,1104);Gd(j+16|0,j+256|0);ae(j+256|0,1);Gd(j+80|0,j+256|0);Ce(j+256|0,j+64|0);_d(j+256|0,1);Gd(j+256|0,j+32|0);Hd(j+256|0,1104);Gd(j+32|0,j+256|0);ae(j+256|0,1);Gd(j+64|0,j+256|0);Ce(j+256|0,j+128|0);_d(j+256|0,1);Gd(j+256|0,j+112|0);Hd(j+256|0,1104);Gd(j+112|0,j+256|0);ae(j+256|0,1);Gd(j+128|0,j+256|0);Ce(j+256|0,j+16|0);_d(j+256|0,2);Gd(j+256|0,j+48|0);Hd(j+256|0,1120);Gd(j+48|0,j+256|0);ae(j+256|0,2);Gd(j+16|0,j+256|0);Ce(j+256|0,j+80|0);_d(j+256|0,2);Gd(j+256|0,j+96|0);Hd(j+256|0,1120);Gd(j+96|0,j+256|0);ae(j+256|0,2);Gd(j+80|0,j+256|0);Ce(j+256|0,j+112|0);_d(j+256|0,2);Gd(j+256|0,j+32|0);Hd(j+256|0,1120);Gd(j+32|0,j+256|0);ae(j+256|0,2);Gd(j+112|0,j+256|0);Ce(j+256|0,j+128|0);_d(j+256|0,2);Gd(j+256|0,j+64|0);Hd(j+256|0,1120);Gd(j+64|0,j+256|0);ae(j+256|0,2);Gd(j+128|0,j+256|0);Ce(j+256|0,j+32|0);_d(j+256|0,4);Gd(j+256|0,j+48|0);Hd(j+256|0,1136);Gd(j+48|0,j+256|0);ae(j+256|0,4);Gd(j+32|0,j+256|0);Ce(j+256|0,j+64|0);_d(j+256|0,4);Gd(j+256|0,j+96|0);Hd(j+256|0,1136);Gd(j+96|0,j+256|0);ae(j+256|0,4);Gd(j+64|0,j+256|0);Ce(j+256|0,j+112|0);_d(j+256|0,4);Gd(j+256|0,j+16|0);Hd(j+256|0,1136);Gd(j+16|0,j+256|0);ae(j+256|0,4);Gd(j+112|0,j+256|0);Ce(j+256|0,j+128|0);_d(j+256|0,4);Gd(j+256|0,j+80|0);Hd(j+256|0,1136);Gd(j+80|0,j+256|0);ae(j+256|0,4);Gd(j+128|0,j+256|0);if(f>>>0<0|(f|0)==0&e>>>0<128){i=5;break}gg(j+12|0,(ug(j+12|0)|0)+8|0);Gd(j+128|0,d);Gd(j+112|0,d+16|0);Gd(j+64|0,d+32|0);Gd(j+32|0,d+48|0);Gd(j+80|0,d+64|0);Gd(j+16|0,d+80|0);Gd(j+96|0,d+96|0);Gd(j+48|0,d+112|0);c[b>>2]=c[j+128>>2];c[b+4>>2]=c[j+128+4>>2];c[b+8>>2]=c[j+128+8>>2];c[b+12>>2]=c[j+128+12>>2];g=b+16|0;c[g>>2]=c[j+112>>2];c[g+4>>2]=c[j+112+4>>2];c[g+8>>2]=c[j+112+8>>2];c[g+12>>2]=c[j+112+12>>2];g=b+32|0;c[g>>2]=c[j+64>>2];c[g+4>>2]=c[j+64+4>>2];c[g+8>>2]=c[j+64+8>>2];c[g+12>>2]=c[j+64+12>>2];g=b+48|0;c[g>>2]=c[j+32>>2];c[g+4>>2]=c[j+32+4>>2];c[g+8>>2]=c[j+32+8>>2];c[g+12>>2]=c[j+32+12>>2];g=b+64|0;c[g>>2]=c[j+80>>2];c[g+4>>2]=c[j+80+4>>2];c[g+8>>2]=c[j+80+8>>2];c[g+12>>2]=c[j+80+12>>2];g=b+80|0;c[g>>2]=c[j+16>>2];c[g+4>>2]=c[j+16+4>>2];c[g+8>>2]=c[j+16+8>>2];c[g+12>>2]=c[j+16+12>>2];g=b+96|0;c[g>>2]=c[j+96>>2];c[g+4>>2]=c[j+96+4>>2];c[g+8>>2]=c[j+96+8>>2];c[g+12>>2]=c[j+96+12>>2];g=b+112|0;c[g>>2]=c[j+48>>2];c[g+4>>2]=c[j+48+4>>2];c[g+8>>2]=c[j+48+8>>2];c[g+12>>2]=c[j+48+12>>2];if((e|0)==128&(f|0)==0)break;g=fg(e|0,f|0,-128,-1)|0;b=b+128|0;d=d+128|0;f=z;e=g}if((i|0)==5?(h=yf(e|0,f|0,4)|0,i=z,i=fg(ug(j+12|0)|0,0,h|0,i|0)|0,gg(j+12|0,i),c[j+272>>2]=c[j+128>>2],c[j+272+4>>2]=c[j+128+4>>2],c[j+272+8>>2]=c[j+128+8>>2],c[j+272+12>>2]=c[j+128+12>>2],c[j+272+16>>2]=c[j+112>>2],c[j+272+16+4>>2]=c[j+112+4>>2],c[j+272+16+8>>2]=c[j+112+8>>2],c[j+272+16+12>>2]=c[j+112+12>>2],c[j+272+32>>2]=c[j+64>>2],c[j+272+32+4>>2]=c[j+64+4>>2],c[j+272+32+8>>2]=c[j+64+8>>2],c[j+272+32+12>>2]=c[j+64+12>>2],c[j+272+48>>2]=c[j+32>>2],c[j+272+48+4>>2]=c[j+32+4>>2],c[j+272+48+8>>2]=c[j+32+8>>2],c[j+272+48+12>>2]=c[j+32+12>>2],c[j+272+64>>2]=c[j+80>>2],c[j+272+64+4>>2]=c[j+80+4>>2],c[j+272+64+8>>2]=c[j+80+8>>2],c[j+272+64+12>>2]=c[j+80+12>>2],c[j+272+80>>2]=c[j+16>>2],c[j+272+80+4>>2]=c[j+16+4>>2],c[j+272+80+8>>2]=c[j+16+8>>2],c[j+272+80+12>>2]=c[j+16+12>>2],c[j+272+96>>2]=c[j+96>>2],c[j+272+96+4>>2]=c[j+96+4>>2],c[j+272+96+8>>2]=c[j+96+8>>2],c[j+272+96+12>>2]=c[j+96+12>>2],c[j+272+112>>2]=c[j+48>>2],c[j+272+112+4>>2]=c[j+48+4>>2],c[j+272+112+8>>2]=c[j+48+8>>2],c[j+272+112+12>>2]=c[j+48+12>>2],!((e|0)==0&(f|0)==0)):0){g=j+272|0;while(1){a[b>>0]=a[d>>0]^a[g>>0];e=fg(e|0,f|0,-1,-1)|0;f=z;if((e|0)==0&(f|0)==0)break;else{g=g+1|0;d=d+1|0;b=b+1|0}}}l=k;return 0}function fa(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;j=l;i=l=l+63&-64;l=l+400|0;Ce(i,f);while(1){c[i+256>>2]=c[i>>2];c[i+256+4>>2]=c[i+4>>2];c[i+256+8>>2]=c[i+8>>2];c[i+256+12>>2]=c[i+12>>2];Ce(i+240|0,i+256|0);rb(i+240|0,35254);Ce(i+224|0,i+240|0);Ce(i+208|0,i+240|0);Ce(i+192|0,i+240|0);Ce(i+176|0,i+240|0);Ce(i+160|0,i+240|0);Ce(i+144|0,i+240|0);Eg(i+240|0,1);Eg(i+224|0,2);Eg(i+208|0,3);Eg(i+192|0,4);Eg(i+176|0,5);Eg(i+160|0,6);Eg(i+144|0,7);rb(i+256|0,35222);rb(i+240|0,35270);rb(i+224|0,35270);rb(i+208|0,35270);rb(i+192|0,35270);rb(i+176|0,35270);rb(i+160|0,35270);rb(i+144|0,35270);Ce(i+128|0,i+160|0);_d(i+128|0,1);Gd(i+128|0,i+144|0);Hd(i+128|0,1104);Gd(i+144|0,i+128|0);ae(i+128|0,1);Gd(i+160|0,i+128|0);Ce(i+128|0,i+192|0);_d(i+128|0,1);Gd(i+128|0,i+176|0);Hd(i+128|0,1104);Gd(i+176|0,i+128|0);ae(i+128|0,1);Gd(i+192|0,i+128|0);Ce(i+128|0,i+224|0);_d(i+128|0,1);Gd(i+128|0,i+208|0);Hd(i+128|0,1104);Gd(i+208|0,i+128|0);ae(i+128|0,1);Gd(i+224|0,i+128|0);Ce(i+128|0,i+256|0);_d(i+128|0,1);Gd(i+128|0,i+240|0);Hd(i+128|0,1104);Gd(i+240|0,i+128|0);ae(i+128|0,1);Gd(i+256|0,i+128|0);Ce(i+128|0,i+176|0);_d(i+128|0,2);Gd(i+128|0,i+144|0);Hd(i+128|0,1120);Gd(i+144|0,i+128|0);ae(i+128|0,2);Gd(i+176|0,i+128|0);Ce(i+128|0,i+192|0);_d(i+128|0,2);Gd(i+128|0,i+160|0);Hd(i+128|0,1120);Gd(i+160|0,i+128|0);ae(i+128|0,2);Gd(i+192|0,i+128|0);Ce(i+128|0,i+240|0);_d(i+128|0,2);Gd(i+128|0,i+208|0);Hd(i+128|0,1120);Gd(i+208|0,i+128|0);ae(i+128|0,2);Gd(i+240|0,i+128|0);Ce(i+128|0,i+256|0);_d(i+128|0,2);Gd(i+128|0,i+224|0);Hd(i+128|0,1120);Gd(i+224|0,i+128|0);ae(i+128|0,2);Gd(i+256|0,i+128|0);Ce(i+128|0,i+208|0);_d(i+128|0,4);Gd(i+128|0,i+144|0);Hd(i+128|0,1136);Gd(i+144|0,i+128|0);ae(i+128|0,4);Gd(i+208|0,i+128|0);Ce(i+128|0,i+224|0);_d(i+128|0,4);Gd(i+128|0,i+160|0);Hd(i+128|0,1136);Gd(i+160|0,i+128|0);ae(i+128|0,4);Gd(i+224|0,i+128|0);Ce(i+128|0,i+240|0);_d(i+128|0,4);Gd(i+128|0,i+176|0);Hd(i+128|0,1136);Gd(i+176|0,i+128|0);ae(i+128|0,4);Gd(i+240|0,i+128|0);Ce(i+128|0,i+256|0);_d(i+128|0,4);Gd(i+128|0,i+192|0);Hd(i+128|0,1136);Gd(i+192|0,i+128|0);ae(i+128|0,4);Gd(i+256|0,i+128|0);Gd(i+256|0,g);rb(i+256|0,35286);Gd(i+240|0,g+16|0);rb(i+240|0,35286);Gd(i+224|0,g+32|0);rb(i+224|0,35286);Gd(i+208|0,g+48|0);rb(i+208|0,35286);Gd(i+192|0,g+64|0);rb(i+192|0,35286);Gd(i+176|0,g+80|0);rb(i+176|0,35286);Gd(i+160|0,g+96|0);rb(i+160|0,35286);Gd(i+144|0,g+112|0);rb(i+144|0,35286);Gd(i+176|0,i+160|0);Gd(i+224|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+160|0,i+224|0);Gd(i+208|0,i+256|0);Gd(i+160|0,i+208|0);Gd(i+208|0,i+144|0);Gd(i+208|0,i+192|0);Gd(i+144|0,i+176|0);Gd(i+208|0,i+240|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+144|0);Gd(i+240|0,i+176|0);Ce(i+80|0,i+144|0);Ce(i+96|0,i+240|0);Ce(i+112|0,i+176|0);Ce(i+48|0,i+224|0);Ce(i+64|0,i+160|0);Gd(i+80|0,i+192|0);Gd(i+96|0,i+224|0);Gd(i+112|0,i+208|0);Gd(i+48|0,i+192|0);Gd(i+64|0,i+256|0);Ce(i+32|0,i+80|0);Ce(i+128|0,i+96|0);Ce(i+16|0,i+80|0);Jd(i+96|0,i+112|0);Jd(i+80|0,i+64|0);Gd(i+16|0,i+128|0);Hd(i+32|0,i+64|0);Hd(i+128|0,i+112|0);Gd(i+64|0,i+112|0);Hd(i+16|0,i+64|0);Ce(i+64|0,i+208|0);Gd(i+64|0,i+256|0);Hd(i+48|0,i+64|0);Gd(i+80|0,i+48|0);Gd(i+96|0,i+48|0);Ce(i+48|0,i+144|0);Gd(i+48|0,i+240|0);Ce(i+64|0,i+176|0);Ce(i+112|0,i+48|0);Gd(i+64|0,i+160|0);Jd(i+112|0,i+64|0);Hd(i+48|0,i+64|0);Gd(i+128|0,i+48|0);Gd(i+80|0,i+16|0);Gd(i+96|0,i+32|0);Gd(i+112|0,i+16|0);Gd(i+128|0,i+32|0);Gd(i+112|0,i+32|0);Ce(i+64|0,i+224|0);Ce(i+48|0,i+192|0);Ce(i+32|0,i+240|0);Ce(i+16|0,i+144|0);Hd(i+64|0,i+208|0);Hd(i+48|0,i+256|0);Hd(i+32|0,i+176|0);Jd(i+16|0,i+160|0);Gd(i+80|0,i+64|0);Gd(i+96|0,i+48|0);Gd(i+112|0,i+32|0);Gd(i+128|0,i+16|0);Ce(i+64|0,i+80|0);Gd(i+64|0,i+96|0);Hd(i+80|0,i+112|0);Ce(i+32|0,i+128|0);Gd(i+32|0,i+80|0);Ce(i+16|0,i+64|0);Hd(i+16|0,i+32|0);Gd(i+16|0,i+96|0);Ce(i+48|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+80|0,i+96|0);Hd(i+48|0,i+80|0);Gd(i+48|0,i+128|0);Gd(i+112|0,i+48|0);Ce(i+96|0,i+32|0);Gd(i+96|0,i+48|0);Hd(i+96|0,i+128|0);Gd(i+112|0,i+96|0);Gd(i+32|0,i+96|0);Hd(i+32|0,i+16|0);Gd(i+32|0,i+64|0);Ce(i+64|0,i+160|0);Ce(i+128|0,i+176|0);Ce(i+96|0,i+16|0);Gd(i+96|0,i+32|0);Hd(i+96|0,i+160|0);Gd(i+160|0,i+176|0);Hd(i+160|0,i+32|0);Hd(i+176|0,i+16|0);Gd(i+160|0,i+176|0);Gd(i+176|0,i+96|0);Gd(i+64|0,i+256|0);Gd(i+128|0,i+208|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+256|0);Gd(i+256|0,i+208|0);Hd(i+256|0,i+112|0);Hd(i+208|0,i+48|0);Gd(i+256|0,i+208|0);Gd(i+208|0,i+96|0);Gd(i+160|0,i+64|0);Gd(i+256|0,i+64|0);Gd(i+176|0,i+128|0);Gd(i+208|0,i+128|0);Ce(i+64|0,i+144|0);Ce(i+128|0,i+240|0);Gd(i+64|0,i+192|0);Gd(i+128|0,i+224|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+192|0);Gd(i+192|0,i+224|0);Hd(i+192|0,i+112|0);Hd(i+224|0,i+48|0);Gd(i+192|0,i+224|0);Gd(i+224|0,i+96|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+144|0);Gd(i+144|0,i+240|0);Hd(i+144|0,i+32|0);Hd(i+240|0,i+16|0);Gd(i+144|0,i+240|0);Gd(i+240|0,i+80|0);Gd(i+144|0,i+64|0);Gd(i+192|0,i+64|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+128|0);Gd(i+144|0,i+256|0);Gd(i+240|0,i+160|0);Gd(i+192|0,i+144|0);Gd(i+160|0,i+256|0);Gd(i+256|0,i+240|0);Gd(i+240|0,i+176|0);Gd(i+176|0,i+224|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+208|0);Gd(i+208|0,i+176|0);Gd(i+160|0,i+208|0);_c(i+128|0,i+256|0,147);_c(i+112|0,i+240|0,147);_c(i+96|0,i+192|0,147);_c(i+80|0,i+160|0,147);_c(i+64|0,i+208|0,147);_c(i+48|0,i+144|0,147);_c(i+32|0,i+224|0,147);_c(i+16|0,i+176|0,147);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+192|0,i+96|0);Gd(i+160|0,i+80|0);Gd(i+208|0,i+64|0);Gd(i+144|0,i+48|0);Gd(i+224|0,i+32|0);Gd(i+176|0,i+16|0);Gd(i+128|0,i+176|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+240|0);Gd(i+112|0,i+176|0);Gd(i+80|0,i+192|0);Gd(i+64|0,i+160|0);Gd(i+48|0,i+208|0);Gd(i+80|0,i+176|0);Gd(i+32|0,i+144|0);Gd(i+16|0,i+224|0);Gd(i+64|0,i+176|0);_c(i+256|0,i+256|0,78);_c(i+240|0,i+240|0,78);_c(i+192|0,i+192|0,78);_c(i+160|0,i+160|0,78);_c(i+208|0,i+208|0,78);_c(i+144|0,i+144|0,78);_c(i+224|0,i+224|0,78);_c(i+176|0,i+176|0,78);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+96|0,i+192|0);Gd(i+80|0,i+160|0);Gd(i+64|0,i+208|0);Gd(i+48|0,i+144|0);Gd(i+32|0,i+224|0);Gd(i+16|0,i+176|0);Gd(i+128|0,g+128|0);rb(i+128|0,35286);Gd(i+112|0,g+144|0);rb(i+112|0,35286);Gd(i+96|0,g+160|0);rb(i+96|0,35286);Gd(i+80|0,g+176|0);rb(i+80|0,35286);Gd(i+64|0,g+192|0);rb(i+64|0,35286);Gd(i+48|0,g+208|0);rb(i+48|0,35286);Gd(i+32|0,g+224|0);rb(i+32|0,35286);Gd(i+16|0,g+240|0);rb(i+16|0,35286);Gd(i+48|0,i+32|0);Gd(i+96|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+32|0,i+96|0);Gd(i+80|0,i+128|0);Gd(i+32|0,i+80|0);Gd(i+80|0,i+16|0);Gd(i+80|0,i+64|0);Gd(i+16|0,i+48|0);Gd(i+80|0,i+112|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+16|0);Gd(i+112|0,i+48|0);Ce(i+208|0,i+16|0);Ce(i+224|0,i+112|0);Ce(i+240|0,i+48|0);Ce(i+176|0,i+96|0);Ce(i+192|0,i+32|0);Gd(i+208|0,i+64|0);Gd(i+224|0,i+96|0);Gd(i+240|0,i+80|0);Gd(i+176|0,i+64|0);Gd(i+192|0,i+128|0);Ce(i+160|0,i+208|0);Ce(i+256|0,i+224|0);Ce(i+144|0,i+208|0);Jd(i+224|0,i+240|0);Jd(i+208|0,i+192|0);Gd(i+144|0,i+256|0);Hd(i+160|0,i+192|0);Hd(i+256|0,i+240|0);Gd(i+192|0,i+240|0);Hd(i+144|0,i+192|0);Ce(i+192|0,i+80|0);Gd(i+192|0,i+128|0);Hd(i+176|0,i+192|0);Gd(i+208|0,i+176|0);Gd(i+224|0,i+176|0);Ce(i+176|0,i+16|0);Gd(i+176|0,i+112|0);Ce(i+192|0,i+48|0);Ce(i+240|0,i+176|0);Gd(i+192|0,i+32|0);Jd(i+240|0,i+192|0);Hd(i+176|0,i+192|0);Gd(i+256|0,i+176|0);Gd(i+208|0,i+144|0);Gd(i+224|0,i+160|0);Gd(i+240|0,i+144|0);Gd(i+256|0,i+160|0);Gd(i+240|0,i+160|0);Ce(i+192|0,i+96|0);Ce(i+176|0,i+64|0);Ce(i+160|0,i+112|0);Ce(i+144|0,i+16|0);Hd(i+192|0,i+80|0);Hd(i+176|0,i+128|0);Hd(i+160|0,i+48|0);Jd(i+144|0,i+32|0);Gd(i+208|0,i+192|0);Gd(i+224|0,i+176|0);Gd(i+240|0,i+160|0);Gd(i+256|0,i+144|0);Ce(i+192|0,i+208|0);Gd(i+192|0,i+224|0);Hd(i+208|0,i+240|0);Ce(i+160|0,i+256|0);Gd(i+160|0,i+208|0);Ce(i+144|0,i+192|0);Hd(i+144|0,i+160|0);Gd(i+144|0,i+224|0);Ce(i+176|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+208|0,i+224|0);Hd(i+176|0,i+208|0);Gd(i+176|0,i+256|0);Gd(i+240|0,i+176|0);Ce(i+224|0,i+160|0);Gd(i+224|0,i+176|0);Hd(i+224|0,i+256|0);Gd(i+240|0,i+224|0);Gd(i+160|0,i+224|0);Hd(i+160|0,i+144|0);Gd(i+160|0,i+192|0);Ce(i+192|0,i+32|0);Ce(i+256|0,i+48|0);Ce(i+224|0,i+144|0);Gd(i+224|0,i+160|0);Hd(i+224|0,i+32|0);Gd(i+32|0,i+48|0);Hd(i+32|0,i+160|0);Hd(i+48|0,i+144|0);Gd(i+32|0,i+48|0);Gd(i+48|0,i+224|0);Gd(i+192|0,i+128|0);Gd(i+256|0,i+80|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+128|0);Gd(i+128|0,i+80|0);Hd(i+128|0,i+240|0);Hd(i+80|0,i+176|0);Gd(i+128|0,i+80|0);Gd(i+80|0,i+224|0);Gd(i+32|0,i+192|0);Gd(i+128|0,i+192|0);Gd(i+48|0,i+256|0);Gd(i+80|0,i+256|0);Ce(i+192|0,i+16|0);Ce(i+256|0,i+112|0);Gd(i+192|0,i+64|0);Gd(i+256|0,i+96|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+64|0);Gd(i+64|0,i+96|0);Hd(i+64|0,i+240|0);Hd(i+96|0,i+176|0);Gd(i+64|0,i+96|0);Gd(i+96|0,i+224|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+16|0);Gd(i+16|0,i+112|0);Hd(i+16|0,i+160|0);Hd(i+112|0,i+144|0);Gd(i+16|0,i+112|0);Gd(i+112|0,i+208|0);Gd(i+16|0,i+192|0);Gd(i+64|0,i+192|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+256|0);Gd(i+16|0,i+128|0);Gd(i+112|0,i+32|0);Gd(i+64|0,i+16|0);Gd(i+32|0,i+128|0);Gd(i+128|0,i+112|0);Gd(i+112|0,i+48|0);Gd(i+48|0,i+96|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+80|0);Gd(i+80|0,i+48|0);Gd(i+32|0,i+80|0);_c(i+256|0,i+128|0,147);_c(i+240|0,i+112|0,147);_c(i+224|0,i+64|0,147);_c(i+208|0,i+32|0,147);_c(i+192|0,i+80|0,147);_c(i+176|0,i+16|0,147);_c(i+160|0,i+96|0,147);_c(i+144|0,i+48|0,147);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+64|0,i+224|0);Gd(i+32|0,i+208|0);Gd(i+80|0,i+192|0);Gd(i+16|0,i+176|0);Gd(i+96|0,i+160|0);Gd(i+48|0,i+144|0);Gd(i+256|0,i+48|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+112|0);Gd(i+240|0,i+48|0);Gd(i+208|0,i+64|0);Gd(i+192|0,i+32|0);Gd(i+176|0,i+80|0);Gd(i+208|0,i+48|0);Gd(i+160|0,i+16|0);Gd(i+144|0,i+96|0);Gd(i+192|0,i+48|0);_c(i+128|0,i+128|0,78);_c(i+112|0,i+112|0,78);_c(i+64|0,i+64|0,78);_c(i+32|0,i+32|0,78);_c(i+80|0,i+80|0,78);_c(i+16|0,i+16|0,78);_c(i+96|0,i+96|0,78);_c(i+48|0,i+48|0,78);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+224|0,i+64|0);Gd(i+208|0,i+32|0);Gd(i+192|0,i+80|0);Gd(i+176|0,i+16|0);Gd(i+160|0,i+96|0);Gd(i+144|0,i+48|0);Gd(i+256|0,g+256|0);rb(i+256|0,35286);Gd(i+240|0,g+272|0);rb(i+240|0,35286);Gd(i+224|0,g+288|0);rb(i+224|0,35286);Gd(i+208|0,g+304|0);rb(i+208|0,35286);Gd(i+192|0,g+320|0);rb(i+192|0,35286);Gd(i+176|0,g+336|0);rb(i+176|0,35286);Gd(i+160|0,g+352|0);rb(i+160|0,35286);Gd(i+144|0,g+368|0);rb(i+144|0,35286);Gd(i+176|0,i+160|0);Gd(i+224|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+160|0,i+224|0);Gd(i+208|0,i+256|0);Gd(i+160|0,i+208|0);Gd(i+208|0,i+144|0);Gd(i+208|0,i+192|0);Gd(i+144|0,i+176|0);Gd(i+208|0,i+240|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+144|0);Gd(i+240|0,i+176|0);Ce(i+80|0,i+144|0);Ce(i+96|0,i+240|0);Ce(i+112|0,i+176|0);Ce(i+48|0,i+224|0);Ce(i+64|0,i+160|0);Gd(i+80|0,i+192|0);Gd(i+96|0,i+224|0);Gd(i+112|0,i+208|0);Gd(i+48|0,i+192|0);Gd(i+64|0,i+256|0);Ce(i+32|0,i+80|0);Ce(i+128|0,i+96|0);Ce(i+16|0,i+80|0);Jd(i+96|0,i+112|0);Jd(i+80|0,i+64|0);Gd(i+16|0,i+128|0);Hd(i+32|0,i+64|0);Hd(i+128|0,i+112|0);Gd(i+64|0,i+112|0);Hd(i+16|0,i+64|0);Ce(i+64|0,i+208|0);Gd(i+64|0,i+256|0);Hd(i+48|0,i+64|0);Gd(i+80|0,i+48|0);Gd(i+96|0,i+48|0);Ce(i+48|0,i+144|0);Gd(i+48|0,i+240|0);Ce(i+64|0,i+176|0);Ce(i+112|0,i+48|0);Gd(i+64|0,i+160|0);Jd(i+112|0,i+64|0);Hd(i+48|0,i+64|0);Gd(i+128|0,i+48|0);Gd(i+80|0,i+16|0);Gd(i+96|0,i+32|0);Gd(i+112|0,i+16|0);Gd(i+128|0,i+32|0);Gd(i+112|0,i+32|0);Ce(i+64|0,i+224|0);Ce(i+48|0,i+192|0);Ce(i+32|0,i+240|0);Ce(i+16|0,i+144|0);Hd(i+64|0,i+208|0);Hd(i+48|0,i+256|0);Hd(i+32|0,i+176|0);Jd(i+16|0,i+160|0);Gd(i+80|0,i+64|0);Gd(i+96|0,i+48|0);Gd(i+112|0,i+32|0);Gd(i+128|0,i+16|0);Ce(i+64|0,i+80|0);Gd(i+64|0,i+96|0);Hd(i+80|0,i+112|0);Ce(i+32|0,i+128|0);Gd(i+32|0,i+80|0);Ce(i+16|0,i+64|0);Hd(i+16|0,i+32|0);Gd(i+16|0,i+96|0);Ce(i+48|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+80|0,i+96|0);Hd(i+48|0,i+80|0);Gd(i+48|0,i+128|0);Gd(i+112|0,i+48|0);Ce(i+96|0,i+32|0);Gd(i+96|0,i+48|0);Hd(i+96|0,i+128|0);Gd(i+112|0,i+96|0);Gd(i+32|0,i+96|0);Hd(i+32|0,i+16|0);Gd(i+32|0,i+64|0);Ce(i+64|0,i+160|0);Ce(i+128|0,i+176|0);Ce(i+96|0,i+16|0);Gd(i+96|0,i+32|0);Hd(i+96|0,i+160|0);Gd(i+160|0,i+176|0);Hd(i+160|0,i+32|0);Hd(i+176|0,i+16|0);Gd(i+160|0,i+176|0);Gd(i+176|0,i+96|0);Gd(i+64|0,i+256|0);Gd(i+128|0,i+208|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+256|0);Gd(i+256|0,i+208|0);Hd(i+256|0,i+112|0);Hd(i+208|0,i+48|0);Gd(i+256|0,i+208|0);Gd(i+208|0,i+96|0);Gd(i+160|0,i+64|0);Gd(i+256|0,i+64|0);Gd(i+176|0,i+128|0);Gd(i+208|0,i+128|0);Ce(i+64|0,i+144|0);Ce(i+128|0,i+240|0);Gd(i+64|0,i+192|0);Gd(i+128|0,i+224|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+192|0);Gd(i+192|0,i+224|0);Hd(i+192|0,i+112|0);Hd(i+224|0,i+48|0);Gd(i+192|0,i+224|0);Gd(i+224|0,i+96|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+144|0);Gd(i+144|0,i+240|0);Hd(i+144|0,i+32|0);Hd(i+240|0,i+16|0);Gd(i+144|0,i+240|0);Gd(i+240|0,i+80|0);Gd(i+144|0,i+64|0);Gd(i+192|0,i+64|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+128|0);Gd(i+144|0,i+256|0);Gd(i+240|0,i+160|0);Gd(i+192|0,i+144|0);Gd(i+160|0,i+256|0);Gd(i+256|0,i+240|0);Gd(i+240|0,i+176|0);Gd(i+176|0,i+224|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+208|0);Gd(i+208|0,i+176|0);Gd(i+160|0,i+208|0);_c(i+128|0,i+256|0,147);_c(i+112|0,i+240|0,147);_c(i+96|0,i+192|0,147);_c(i+80|0,i+160|0,147);_c(i+64|0,i+208|0,147);_c(i+48|0,i+144|0,147);_c(i+32|0,i+224|0,147);_c(i+16|0,i+176|0,147);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+192|0,i+96|0);Gd(i+160|0,i+80|0);Gd(i+208|0,i+64|0);Gd(i+144|0,i+48|0);Gd(i+224|0,i+32|0);Gd(i+176|0,i+16|0);Gd(i+128|0,i+176|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+240|0);Gd(i+112|0,i+176|0);Gd(i+80|0,i+192|0);Gd(i+64|0,i+160|0);Gd(i+48|0,i+208|0);Gd(i+80|0,i+176|0);Gd(i+32|0,i+144|0);Gd(i+16|0,i+224|0);Gd(i+64|0,i+176|0);_c(i+256|0,i+256|0,78);_c(i+240|0,i+240|0,78);_c(i+192|0,i+192|0,78);_c(i+160|0,i+160|0,78);_c(i+208|0,i+208|0,78);_c(i+144|0,i+144|0,78);_c(i+224|0,i+224|0,78);_c(i+176|0,i+176|0,78);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+96|0,i+192|0);Gd(i+80|0,i+160|0);Gd(i+64|0,i+208|0);Gd(i+48|0,i+144|0);Gd(i+32|0,i+224|0);Gd(i+16|0,i+176|0);Gd(i+128|0,g+384|0);rb(i+128|0,35286);Gd(i+112|0,g+400|0);rb(i+112|0,35286);Gd(i+96|0,g+416|0);rb(i+96|0,35286);Gd(i+80|0,g+432|0);rb(i+80|0,35286);Gd(i+64|0,g+448|0);rb(i+64|0,35286);Gd(i+48|0,g+464|0);rb(i+48|0,35286);Gd(i+32|0,g+480|0);rb(i+32|0,35286);Gd(i+16|0,g+496|0);rb(i+16|0,35286);Gd(i+48|0,i+32|0);Gd(i+96|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+32|0,i+96|0);Gd(i+80|0,i+128|0);Gd(i+32|0,i+80|0);Gd(i+80|0,i+16|0);Gd(i+80|0,i+64|0);Gd(i+16|0,i+48|0);Gd(i+80|0,i+112|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+16|0);Gd(i+112|0,i+48|0);Ce(i+208|0,i+16|0);Ce(i+224|0,i+112|0);Ce(i+240|0,i+48|0);Ce(i+176|0,i+96|0);Ce(i+192|0,i+32|0);Gd(i+208|0,i+64|0);Gd(i+224|0,i+96|0);Gd(i+240|0,i+80|0);Gd(i+176|0,i+64|0);Gd(i+192|0,i+128|0);Ce(i+160|0,i+208|0);Ce(i+256|0,i+224|0);Ce(i+144|0,i+208|0);Jd(i+224|0,i+240|0);Jd(i+208|0,i+192|0);Gd(i+144|0,i+256|0);Hd(i+160|0,i+192|0);Hd(i+256|0,i+240|0);Gd(i+192|0,i+240|0);Hd(i+144|0,i+192|0);Ce(i+192|0,i+80|0);Gd(i+192|0,i+128|0);Hd(i+176|0,i+192|0);Gd(i+208|0,i+176|0);Gd(i+224|0,i+176|0);Ce(i+176|0,i+16|0);Gd(i+176|0,i+112|0);Ce(i+192|0,i+48|0);Ce(i+240|0,i+176|0);Gd(i+192|0,i+32|0);Jd(i+240|0,i+192|0);Hd(i+176|0,i+192|0);Gd(i+256|0,i+176|0);Gd(i+208|0,i+144|0);Gd(i+224|0,i+160|0);Gd(i+240|0,i+144|0);Gd(i+256|0,i+160|0);Gd(i+240|0,i+160|0);Ce(i+192|0,i+96|0);Ce(i+176|0,i+64|0);Ce(i+160|0,i+112|0);Ce(i+144|0,i+16|0);Hd(i+192|0,i+80|0);Hd(i+176|0,i+128|0);Hd(i+160|0,i+48|0);Jd(i+144|0,i+32|0);Gd(i+208|0,i+192|0);Gd(i+224|0,i+176|0);Gd(i+240|0,i+160|0);Gd(i+256|0,i+144|0);Ce(i+192|0,i+208|0);Gd(i+192|0,i+224|0);Hd(i+208|0,i+240|0);Ce(i+160|0,i+256|0);Gd(i+160|0,i+208|0);Ce(i+144|0,i+192|0);Hd(i+144|0,i+160|0);Gd(i+144|0,i+224|0);Ce(i+176|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+208|0,i+224|0);Hd(i+176|0,i+208|0);Gd(i+176|0,i+256|0);Gd(i+240|0,i+176|0);Ce(i+224|0,i+160|0);Gd(i+224|0,i+176|0);Hd(i+224|0,i+256|0);Gd(i+240|0,i+224|0);Gd(i+160|0,i+224|0);Hd(i+160|0,i+144|0);Gd(i+160|0,i+192|0);Ce(i+192|0,i+32|0);Ce(i+256|0,i+48|0);Ce(i+224|0,i+144|0);Gd(i+224|0,i+160|0);Hd(i+224|0,i+32|0);Gd(i+32|0,i+48|0);Hd(i+32|0,i+160|0);Hd(i+48|0,i+144|0);Gd(i+32|0,i+48|0);Gd(i+48|0,i+224|0);Gd(i+192|0,i+128|0);Gd(i+256|0,i+80|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+128|0);Gd(i+128|0,i+80|0);Hd(i+128|0,i+240|0);Hd(i+80|0,i+176|0);Gd(i+128|0,i+80|0);Gd(i+80|0,i+224|0);Gd(i+32|0,i+192|0);Gd(i+128|0,i+192|0);Gd(i+48|0,i+256|0);Gd(i+80|0,i+256|0);Ce(i+192|0,i+16|0);Ce(i+256|0,i+112|0);Gd(i+192|0,i+64|0);Gd(i+256|0,i+96|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+64|0);Gd(i+64|0,i+96|0);Hd(i+64|0,i+240|0);Hd(i+96|0,i+176|0);Gd(i+64|0,i+96|0);Gd(i+96|0,i+224|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+16|0);Gd(i+16|0,i+112|0);Hd(i+16|0,i+160|0);Hd(i+112|0,i+144|0);Gd(i+16|0,i+112|0);Gd(i+112|0,i+208|0);Gd(i+16|0,i+192|0);Gd(i+64|0,i+192|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+256|0);Gd(i+16|0,i+128|0);Gd(i+112|0,i+32|0);Gd(i+64|0,i+16|0);Gd(i+32|0,i+128|0);Gd(i+128|0,i+112|0);Gd(i+112|0,i+48|0);Gd(i+48|0,i+96|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+80|0);Gd(i+80|0,i+48|0);Gd(i+32|0,i+80|0);_c(i+256|0,i+128|0,147);_c(i+240|0,i+112|0,147);_c(i+224|0,i+64|0,147);_c(i+208|0,i+32|0,147);_c(i+192|0,i+80|0,147);_c(i+176|0,i+16|0,147);_c(i+160|0,i+96|0,147);_c(i+144|0,i+48|0,147);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+64|0,i+224|0);Gd(i+32|0,i+208|0);Gd(i+80|0,i+192|0);Gd(i+16|0,i+176|0);Gd(i+96|0,i+160|0);Gd(i+48|0,i+144|0);Gd(i+256|0,i+48|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+112|0);Gd(i+240|0,i+48|0);Gd(i+208|0,i+64|0);Gd(i+192|0,i+32|0);Gd(i+176|0,i+80|0);Gd(i+208|0,i+48|0);Gd(i+160|0,i+16|0);Gd(i+144|0,i+96|0);Gd(i+192|0,i+48|0);_c(i+128|0,i+128|0,78);_c(i+112|0,i+112|0,78);_c(i+64|0,i+64|0,78);_c(i+32|0,i+32|0,78);_c(i+80|0,i+80|0,78);_c(i+16|0,i+16|0,78);_c(i+96|0,i+96|0,78);_c(i+48|0,i+48|0,78);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+224|0,i+64|0);Gd(i+208|0,i+32|0);Gd(i+192|0,i+80|0);Gd(i+176|0,i+16|0);Gd(i+160|0,i+96|0);Gd(i+144|0,i+48|0);Gd(i+256|0,g+512|0);rb(i+256|0,35286);Gd(i+240|0,g+528|0);rb(i+240|0,35286);Gd(i+224|0,g+544|0);rb(i+224|0,35286);Gd(i+208|0,g+560|0);rb(i+208|0,35286);Gd(i+192|0,g+576|0);rb(i+192|0,35286);Gd(i+176|0,g+592|0);rb(i+176|0,35286);Gd(i+160|0,g+608|0);rb(i+160|0,35286);Gd(i+144|0,g+624|0);rb(i+144|0,35286);Gd(i+176|0,i+160|0);Gd(i+224|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+160|0,i+224|0);Gd(i+208|0,i+256|0);Gd(i+160|0,i+208|0);Gd(i+208|0,i+144|0);Gd(i+208|0,i+192|0);Gd(i+144|0,i+176|0);Gd(i+208|0,i+240|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+144|0);Gd(i+240|0,i+176|0);Ce(i+80|0,i+144|0);Ce(i+96|0,i+240|0);Ce(i+112|0,i+176|0);Ce(i+48|0,i+224|0);Ce(i+64|0,i+160|0);Gd(i+80|0,i+192|0);Gd(i+96|0,i+224|0);Gd(i+112|0,i+208|0);Gd(i+48|0,i+192|0);Gd(i+64|0,i+256|0);Ce(i+32|0,i+80|0);Ce(i+128|0,i+96|0);Ce(i+16|0,i+80|0);Jd(i+96|0,i+112|0);Jd(i+80|0,i+64|0);Gd(i+16|0,i+128|0);Hd(i+32|0,i+64|0);Hd(i+128|0,i+112|0);Gd(i+64|0,i+112|0);Hd(i+16|0,i+64|0);Ce(i+64|0,i+208|0);Gd(i+64|0,i+256|0);Hd(i+48|0,i+64|0);Gd(i+80|0,i+48|0);Gd(i+96|0,i+48|0);Ce(i+48|0,i+144|0);Gd(i+48|0,i+240|0);Ce(i+64|0,i+176|0);Ce(i+112|0,i+48|0);Gd(i+64|0,i+160|0);Jd(i+112|0,i+64|0);Hd(i+48|0,i+64|0);Gd(i+128|0,i+48|0);Gd(i+80|0,i+16|0);Gd(i+96|0,i+32|0);Gd(i+112|0,i+16|0);Gd(i+128|0,i+32|0);Gd(i+112|0,i+32|0);Ce(i+64|0,i+224|0);Ce(i+48|0,i+192|0);Ce(i+32|0,i+240|0);Ce(i+16|0,i+144|0);Hd(i+64|0,i+208|0);Hd(i+48|0,i+256|0);Hd(i+32|0,i+176|0);Jd(i+16|0,i+160|0);Gd(i+80|0,i+64|0);Gd(i+96|0,i+48|0);Gd(i+112|0,i+32|0);Gd(i+128|0,i+16|0);Ce(i+64|0,i+80|0);Gd(i+64|0,i+96|0);Hd(i+80|0,i+112|0);Ce(i+32|0,i+128|0);Gd(i+32|0,i+80|0);Ce(i+16|0,i+64|0);Hd(i+16|0,i+32|0);Gd(i+16|0,i+96|0);Ce(i+48|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+80|0,i+96|0);Hd(i+48|0,i+80|0);Gd(i+48|0,i+128|0);Gd(i+112|0,i+48|0);Ce(i+96|0,i+32|0);Gd(i+96|0,i+48|0);Hd(i+96|0,i+128|0);Gd(i+112|0,i+96|0);Gd(i+32|0,i+96|0);Hd(i+32|0,i+16|0);Gd(i+32|0,i+64|0);Ce(i+64|0,i+160|0);Ce(i+128|0,i+176|0);Ce(i+96|0,i+16|0);Gd(i+96|0,i+32|0);Hd(i+96|0,i+160|0);Gd(i+160|0,i+176|0);Hd(i+160|0,i+32|0);Hd(i+176|0,i+16|0);Gd(i+160|0,i+176|0);Gd(i+176|0,i+96|0);Gd(i+64|0,i+256|0);Gd(i+128|0,i+208|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+256|0);Gd(i+256|0,i+208|0);Hd(i+256|0,i+112|0);Hd(i+208|0,i+48|0);Gd(i+256|0,i+208|0);Gd(i+208|0,i+96|0);Gd(i+160|0,i+64|0);Gd(i+256|0,i+64|0);Gd(i+176|0,i+128|0);Gd(i+208|0,i+128|0);Ce(i+64|0,i+144|0);Ce(i+128|0,i+240|0);Gd(i+64|0,i+192|0);Gd(i+128|0,i+224|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+192|0);Gd(i+192|0,i+224|0);Hd(i+192|0,i+112|0);Hd(i+224|0,i+48|0);Gd(i+192|0,i+224|0);Gd(i+224|0,i+96|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+144|0);Gd(i+144|0,i+240|0);Hd(i+144|0,i+32|0);Hd(i+240|0,i+16|0);Gd(i+144|0,i+240|0);Gd(i+240|0,i+80|0);Gd(i+144|0,i+64|0);Gd(i+192|0,i+64|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+128|0);Gd(i+144|0,i+256|0);Gd(i+240|0,i+160|0);Gd(i+192|0,i+144|0);Gd(i+160|0,i+256|0);Gd(i+256|0,i+240|0);Gd(i+240|0,i+176|0);Gd(i+176|0,i+224|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+208|0);Gd(i+208|0,i+176|0);Gd(i+160|0,i+208|0);_c(i+128|0,i+256|0,147);_c(i+112|0,i+240|0,147);_c(i+96|0,i+192|0,147);_c(i+80|0,i+160|0,147);_c(i+64|0,i+208|0,147);_c(i+48|0,i+144|0,147);_c(i+32|0,i+224|0,147);_c(i+16|0,i+176|0,147);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+192|0,i+96|0);Gd(i+160|0,i+80|0);Gd(i+208|0,i+64|0);Gd(i+144|0,i+48|0);Gd(i+224|0,i+32|0);Gd(i+176|0,i+16|0);Gd(i+128|0,i+176|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+240|0);Gd(i+112|0,i+176|0);Gd(i+80|0,i+192|0);Gd(i+64|0,i+160|0);Gd(i+48|0,i+208|0);Gd(i+80|0,i+176|0);Gd(i+32|0,i+144|0);Gd(i+16|0,i+224|0);Gd(i+64|0,i+176|0);_c(i+256|0,i+256|0,78);_c(i+240|0,i+240|0,78);_c(i+192|0,i+192|0,78);_c(i+160|0,i+160|0,78);_c(i+208|0,i+208|0,78);_c(i+144|0,i+144|0,78);_c(i+224|0,i+224|0,78);_c(i+176|0,i+176|0,78);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+96|0,i+192|0);Gd(i+80|0,i+160|0);Gd(i+64|0,i+208|0);Gd(i+48|0,i+144|0);Gd(i+32|0,i+224|0);Gd(i+16|0,i+176|0);Gd(i+128|0,g+640|0);rb(i+128|0,35286);Gd(i+112|0,g+656|0);rb(i+112|0,35286);Gd(i+96|0,g+672|0);rb(i+96|0,35286);Gd(i+80|0,g+688|0);rb(i+80|0,35286);Gd(i+64|0,g+704|0);rb(i+64|0,35286);Gd(i+48|0,g+720|0);rb(i+48|0,35286);Gd(i+32|0,g+736|0);rb(i+32|0,35286);Gd(i+16|0,g+752|0);rb(i+16|0,35286);Gd(i+48|0,i+32|0);Gd(i+96|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+32|0,i+96|0);Gd(i+80|0,i+128|0);Gd(i+32|0,i+80|0);Gd(i+80|0,i+16|0);Gd(i+80|0,i+64|0);Gd(i+16|0,i+48|0);Gd(i+80|0,i+112|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+16|0);Gd(i+112|0,i+48|0);Ce(i+208|0,i+16|0);Ce(i+224|0,i+112|0);Ce(i+240|0,i+48|0);Ce(i+176|0,i+96|0);Ce(i+192|0,i+32|0);Gd(i+208|0,i+64|0);Gd(i+224|0,i+96|0);Gd(i+240|0,i+80|0);Gd(i+176|0,i+64|0);Gd(i+192|0,i+128|0);Ce(i+160|0,i+208|0);Ce(i+256|0,i+224|0);Ce(i+144|0,i+208|0);Jd(i+224|0,i+240|0);Jd(i+208|0,i+192|0);Gd(i+144|0,i+256|0);Hd(i+160|0,i+192|0);Hd(i+256|0,i+240|0);Gd(i+192|0,i+240|0);Hd(i+144|0,i+192|0);Ce(i+192|0,i+80|0);Gd(i+192|0,i+128|0);Hd(i+176|0,i+192|0);Gd(i+208|0,i+176|0);Gd(i+224|0,i+176|0);Ce(i+176|0,i+16|0);Gd(i+176|0,i+112|0);Ce(i+192|0,i+48|0);Ce(i+240|0,i+176|0);Gd(i+192|0,i+32|0);Jd(i+240|0,i+192|0);Hd(i+176|0,i+192|0);Gd(i+256|0,i+176|0);Gd(i+208|0,i+144|0);Gd(i+224|0,i+160|0);Gd(i+240|0,i+144|0);Gd(i+256|0,i+160|0);Gd(i+240|0,i+160|0);Ce(i+192|0,i+96|0);Ce(i+176|0,i+64|0);Ce(i+160|0,i+112|0);Ce(i+144|0,i+16|0);Hd(i+192|0,i+80|0);Hd(i+176|0,i+128|0);Hd(i+160|0,i+48|0);Jd(i+144|0,i+32|0);Gd(i+208|0,i+192|0);Gd(i+224|0,i+176|0);Gd(i+240|0,i+160|0);Gd(i+256|0,i+144|0);Ce(i+192|0,i+208|0);Gd(i+192|0,i+224|0);Hd(i+208|0,i+240|0);Ce(i+160|0,i+256|0);Gd(i+160|0,i+208|0);Ce(i+144|0,i+192|0);Hd(i+144|0,i+160|0);Gd(i+144|0,i+224|0);Ce(i+176|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+208|0,i+224|0);Hd(i+176|0,i+208|0);Gd(i+176|0,i+256|0);Gd(i+240|0,i+176|0);Ce(i+224|0,i+160|0);Gd(i+224|0,i+176|0);Hd(i+224|0,i+256|0);Gd(i+240|0,i+224|0);Gd(i+160|0,i+224|0);Hd(i+160|0,i+144|0);Gd(i+160|0,i+192|0);Ce(i+192|0,i+32|0);Ce(i+256|0,i+48|0);Ce(i+224|0,i+144|0);Gd(i+224|0,i+160|0);Hd(i+224|0,i+32|0);Gd(i+32|0,i+48|0);Hd(i+32|0,i+160|0);Hd(i+48|0,i+144|0);Gd(i+32|0,i+48|0);Gd(i+48|0,i+224|0);Gd(i+192|0,i+128|0);Gd(i+256|0,i+80|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+128|0);Gd(i+128|0,i+80|0);Hd(i+128|0,i+240|0);Hd(i+80|0,i+176|0);Gd(i+128|0,i+80|0);Gd(i+80|0,i+224|0);Gd(i+32|0,i+192|0);Gd(i+128|0,i+192|0);Gd(i+48|0,i+256|0);Gd(i+80|0,i+256|0);Ce(i+192|0,i+16|0);Ce(i+256|0,i+112|0);Gd(i+192|0,i+64|0);Gd(i+256|0,i+96|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+64|0);Gd(i+64|0,i+96|0);Hd(i+64|0,i+240|0);Hd(i+96|0,i+176|0);Gd(i+64|0,i+96|0);Gd(i+96|0,i+224|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+16|0);Gd(i+16|0,i+112|0);Hd(i+16|0,i+160|0);Hd(i+112|0,i+144|0);Gd(i+16|0,i+112|0);Gd(i+112|0,i+208|0);Gd(i+16|0,i+192|0);Gd(i+64|0,i+192|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+256|0);Gd(i+16|0,i+128|0);Gd(i+112|0,i+32|0);Gd(i+64|0,i+16|0);Gd(i+32|0,i+128|0);Gd(i+128|0,i+112|0);Gd(i+112|0,i+48|0);Gd(i+48|0,i+96|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+80|0);Gd(i+80|0,i+48|0);Gd(i+32|0,i+80|0);_c(i+256|0,i+128|0,147);_c(i+240|0,i+112|0,147);_c(i+224|0,i+64|0,147);_c(i+208|0,i+32|0,147);_c(i+192|0,i+80|0,147);_c(i+176|0,i+16|0,147);_c(i+160|0,i+96|0,147);_c(i+144|0,i+48|0,147);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+64|0,i+224|0);Gd(i+32|0,i+208|0);Gd(i+80|0,i+192|0);Gd(i+16|0,i+176|0);Gd(i+96|0,i+160|0);Gd(i+48|0,i+144|0);Gd(i+256|0,i+48|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+112|0);Gd(i+240|0,i+48|0);Gd(i+208|0,i+64|0);Gd(i+192|0,i+32|0);Gd(i+176|0,i+80|0);Gd(i+208|0,i+48|0);Gd(i+160|0,i+16|0);Gd(i+144|0,i+96|0);Gd(i+192|0,i+48|0);_c(i+128|0,i+128|0,78);_c(i+112|0,i+112|0,78);_c(i+64|0,i+64|0,78);_c(i+32|0,i+32|0,78);_c(i+80|0,i+80|0,78);_c(i+16|0,i+16|0,78);_c(i+96|0,i+96|0,78);_c(i+48|0,i+48|0,78);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+224|0,i+64|0);Gd(i+208|0,i+32|0);Gd(i+192|0,i+80|0);Gd(i+176|0,i+16|0);Gd(i+160|0,i+96|0);Gd(i+144|0,i+48|0);Gd(i+256|0,g+768|0);rb(i+256|0,35286);Gd(i+240|0,g+784|0);rb(i+240|0,35286);Gd(i+224|0,g+800|0);rb(i+224|0,35286);Gd(i+208|0,g+816|0);rb(i+208|0,35286);Gd(i+192|0,g+832|0);rb(i+192|0,35286);Gd(i+176|0,g+848|0);rb(i+176|0,35286);Gd(i+160|0,g+864|0);rb(i+160|0,35286);Gd(i+144|0,g+880|0);rb(i+144|0,35286);Gd(i+176|0,i+160|0);Gd(i+224|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+160|0,i+224|0);Gd(i+208|0,i+256|0);Gd(i+160|0,i+208|0);Gd(i+208|0,i+144|0);Gd(i+208|0,i+192|0);Gd(i+144|0,i+176|0);Gd(i+208|0,i+240|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+144|0);Gd(i+240|0,i+176|0);Ce(i+80|0,i+144|0);Ce(i+96|0,i+240|0);Ce(i+112|0,i+176|0);Ce(i+48|0,i+224|0);Ce(i+64|0,i+160|0);Gd(i+80|0,i+192|0);Gd(i+96|0,i+224|0);Gd(i+112|0,i+208|0);Gd(i+48|0,i+192|0);Gd(i+64|0,i+256|0);Ce(i+32|0,i+80|0);Ce(i+128|0,i+96|0);Ce(i+16|0,i+80|0);Jd(i+96|0,i+112|0);Jd(i+80|0,i+64|0);Gd(i+16|0,i+128|0);Hd(i+32|0,i+64|0);Hd(i+128|0,i+112|0);Gd(i+64|0,i+112|0);Hd(i+16|0,i+64|0);Ce(i+64|0,i+208|0);Gd(i+64|0,i+256|0);Hd(i+48|0,i+64|0);Gd(i+80|0,i+48|0);Gd(i+96|0,i+48|0);Ce(i+48|0,i+144|0);Gd(i+48|0,i+240|0);Ce(i+64|0,i+176|0);Ce(i+112|0,i+48|0);Gd(i+64|0,i+160|0);Jd(i+112|0,i+64|0);Hd(i+48|0,i+64|0);Gd(i+128|0,i+48|0);Gd(i+80|0,i+16|0);Gd(i+96|0,i+32|0);Gd(i+112|0,i+16|0);Gd(i+128|0,i+32|0);Gd(i+112|0,i+32|0);Ce(i+64|0,i+224|0);Ce(i+48|0,i+192|0);Ce(i+32|0,i+240|0);Ce(i+16|0,i+144|0);Hd(i+64|0,i+208|0);Hd(i+48|0,i+256|0);Hd(i+32|0,i+176|0);Jd(i+16|0,i+160|0);Gd(i+80|0,i+64|0);Gd(i+96|0,i+48|0);Gd(i+112|0,i+32|0);Gd(i+128|0,i+16|0);Ce(i+64|0,i+80|0);Gd(i+64|0,i+96|0);Hd(i+80|0,i+112|0);Ce(i+32|0,i+128|0);Gd(i+32|0,i+80|0);Ce(i+16|0,i+64|0);Hd(i+16|0,i+32|0);Gd(i+16|0,i+96|0);Ce(i+48|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+80|0,i+96|0);Hd(i+48|0,i+80|0);Gd(i+48|0,i+128|0);Gd(i+112|0,i+48|0);Ce(i+96|0,i+32|0);Gd(i+96|0,i+48|0);Hd(i+96|0,i+128|0);Gd(i+112|0,i+96|0);Gd(i+32|0,i+96|0);Hd(i+32|0,i+16|0);Gd(i+32|0,i+64|0);Ce(i+64|0,i+160|0);Ce(i+128|0,i+176|0);Ce(i+96|0,i+16|0);Gd(i+96|0,i+32|0);Hd(i+96|0,i+160|0);Gd(i+160|0,i+176|0);Hd(i+160|0,i+32|0);Hd(i+176|0,i+16|0);Gd(i+160|0,i+176|0);Gd(i+176|0,i+96|0);Gd(i+64|0,i+256|0);Gd(i+128|0,i+208|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+256|0);Gd(i+256|0,i+208|0);Hd(i+256|0,i+112|0);Hd(i+208|0,i+48|0);Gd(i+256|0,i+208|0);Gd(i+208|0,i+96|0);Gd(i+160|0,i+64|0);Gd(i+256|0,i+64|0);Gd(i+176|0,i+128|0);Gd(i+208|0,i+128|0);Ce(i+64|0,i+144|0);Ce(i+128|0,i+240|0);Gd(i+64|0,i+192|0);Gd(i+128|0,i+224|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+192|0);Gd(i+192|0,i+224|0);Hd(i+192|0,i+112|0);Hd(i+224|0,i+48|0);Gd(i+192|0,i+224|0);Gd(i+224|0,i+96|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+144|0);Gd(i+144|0,i+240|0);Hd(i+144|0,i+32|0);Hd(i+240|0,i+16|0);Gd(i+144|0,i+240|0);Gd(i+240|0,i+80|0);Gd(i+144|0,i+64|0);Gd(i+192|0,i+64|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+128|0);Gd(i+144|0,i+256|0);Gd(i+240|0,i+160|0);Gd(i+192|0,i+144|0);Gd(i+160|0,i+256|0);Gd(i+256|0,i+240|0);Gd(i+240|0,i+176|0);Gd(i+176|0,i+224|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+208|0);Gd(i+208|0,i+176|0);Gd(i+160|0,i+208|0);_c(i+128|0,i+256|0,147);_c(i+112|0,i+240|0,147);_c(i+96|0,i+192|0,147);_c(i+80|0,i+160|0,147);_c(i+64|0,i+208|0,147);_c(i+48|0,i+144|0,147);_c(i+32|0,i+224|0,147);_c(i+16|0,i+176|0,147);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+192|0,i+96|0);Gd(i+160|0,i+80|0);Gd(i+208|0,i+64|0);Gd(i+144|0,i+48|0);Gd(i+224|0,i+32|0);Gd(i+176|0,i+16|0);Gd(i+128|0,i+176|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+240|0);Gd(i+112|0,i+176|0);Gd(i+80|0,i+192|0);Gd(i+64|0,i+160|0);Gd(i+48|0,i+208|0);Gd(i+80|0,i+176|0);Gd(i+32|0,i+144|0);Gd(i+16|0,i+224|0);Gd(i+64|0,i+176|0);_c(i+256|0,i+256|0,78);_c(i+240|0,i+240|0,78);_c(i+192|0,i+192|0,78);_c(i+160|0,i+160|0,78);_c(i+208|0,i+208|0,78);_c(i+144|0,i+144|0,78);_c(i+224|0,i+224|0,78);_c(i+176|0,i+176|0,78);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+96|0,i+192|0);Gd(i+80|0,i+160|0);Gd(i+64|0,i+208|0);Gd(i+48|0,i+144|0);Gd(i+32|0,i+224|0);Gd(i+16|0,i+176|0);Gd(i+128|0,g+896|0);rb(i+128|0,35286);Gd(i+112|0,g+912|0);rb(i+112|0,35286);Gd(i+96|0,g+928|0);rb(i+96|0,35286);Gd(i+80|0,g+944|0);rb(i+80|0,35286);Gd(i+64|0,g+960|0);rb(i+64|0,35286);Gd(i+48|0,g+976|0);rb(i+48|0,35286);Gd(i+32|0,g+992|0);rb(i+32|0,35286);Gd(i+16|0,g+1008|0);rb(i+16|0,35286);Gd(i+48|0,i+32|0);Gd(i+96|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+32|0,i+96|0);Gd(i+80|0,i+128|0);Gd(i+32|0,i+80|0);Gd(i+80|0,i+16|0);Gd(i+80|0,i+64|0);Gd(i+16|0,i+48|0);Gd(i+80|0,i+112|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+16|0);Gd(i+112|0,i+48|0);Ce(i+208|0,i+16|0);Ce(i+224|0,i+112|0);Ce(i+240|0,i+48|0);Ce(i+176|0,i+96|0);Ce(i+192|0,i+32|0);Gd(i+208|0,i+64|0);Gd(i+224|0,i+96|0);Gd(i+240|0,i+80|0);Gd(i+176|0,i+64|0);Gd(i+192|0,i+128|0);Ce(i+160|0,i+208|0);Ce(i+256|0,i+224|0);Ce(i+144|0,i+208|0);Jd(i+224|0,i+240|0);Jd(i+208|0,i+192|0);Gd(i+144|0,i+256|0);Hd(i+160|0,i+192|0);Hd(i+256|0,i+240|0);Gd(i+192|0,i+240|0);Hd(i+144|0,i+192|0);Ce(i+192|0,i+80|0);Gd(i+192|0,i+128|0);Hd(i+176|0,i+192|0);Gd(i+208|0,i+176|0);Gd(i+224|0,i+176|0);Ce(i+176|0,i+16|0);Gd(i+176|0,i+112|0);Ce(i+192|0,i+48|0);Ce(i+240|0,i+176|0);Gd(i+192|0,i+32|0);Jd(i+240|0,i+192|0);Hd(i+176|0,i+192|0);Gd(i+256|0,i+176|0);Gd(i+208|0,i+144|0);Gd(i+224|0,i+160|0);Gd(i+240|0,i+144|0);Gd(i+256|0,i+160|0);Gd(i+240|0,i+160|0);Ce(i+192|0,i+96|0);Ce(i+176|0,i+64|0);Ce(i+160|0,i+112|0);Ce(i+144|0,i+16|0);Hd(i+192|0,i+80|0);Hd(i+176|0,i+128|0);Hd(i+160|0,i+48|0);Jd(i+144|0,i+32|0);Gd(i+208|0,i+192|0);Gd(i+224|0,i+176|0);Gd(i+240|0,i+160|0);Gd(i+256|0,i+144|0);Ce(i+192|0,i+208|0);Gd(i+192|0,i+224|0);Hd(i+208|0,i+240|0);Ce(i+160|0,i+256|0);Gd(i+160|0,i+208|0);Ce(i+144|0,i+192|0);Hd(i+144|0,i+160|0);Gd(i+144|0,i+224|0);Ce(i+176|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+208|0,i+224|0);Hd(i+176|0,i+208|0);Gd(i+176|0,i+256|0);Gd(i+240|0,i+176|0);Ce(i+224|0,i+160|0);Gd(i+224|0,i+176|0);Hd(i+224|0,i+256|0);Gd(i+240|0,i+224|0);Gd(i+160|0,i+224|0);Hd(i+160|0,i+144|0);Gd(i+160|0,i+192|0);Ce(i+192|0,i+32|0);Ce(i+256|0,i+48|0);Ce(i+224|0,i+144|0);Gd(i+224|0,i+160|0);Hd(i+224|0,i+32|0);Gd(i+32|0,i+48|0);Hd(i+32|0,i+160|0);Hd(i+48|0,i+144|0);Gd(i+32|0,i+48|0);Gd(i+48|0,i+224|0);Gd(i+192|0,i+128|0);Gd(i+256|0,i+80|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+128|0);Gd(i+128|0,i+80|0);Hd(i+128|0,i+240|0);Hd(i+80|0,i+176|0);Gd(i+128|0,i+80|0);Gd(i+80|0,i+224|0);Gd(i+32|0,i+192|0);Gd(i+128|0,i+192|0);Gd(i+48|0,i+256|0);Gd(i+80|0,i+256|0);Ce(i+192|0,i+16|0);Ce(i+256|0,i+112|0);Gd(i+192|0,i+64|0);Gd(i+256|0,i+96|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+64|0);Gd(i+64|0,i+96|0);Hd(i+64|0,i+240|0);Hd(i+96|0,i+176|0);Gd(i+64|0,i+96|0);Gd(i+96|0,i+224|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+16|0);Gd(i+16|0,i+112|0);Hd(i+16|0,i+160|0);Hd(i+112|0,i+144|0);Gd(i+16|0,i+112|0);Gd(i+112|0,i+208|0);Gd(i+16|0,i+192|0);Gd(i+64|0,i+192|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+256|0);Gd(i+16|0,i+128|0);Gd(i+112|0,i+32|0);Gd(i+64|0,i+16|0);Gd(i+32|0,i+128|0);Gd(i+128|0,i+112|0);Gd(i+112|0,i+48|0);Gd(i+48|0,i+96|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+80|0);Gd(i+80|0,i+48|0);Gd(i+32|0,i+80|0);_c(i+256|0,i+128|0,147);_c(i+240|0,i+112|0,147);_c(i+224|0,i+64|0,147);_c(i+208|0,i+32|0,147);_c(i+192|0,i+80|0,147);_c(i+176|0,i+16|0,147);_c(i+160|0,i+96|0,147);_c(i+144|0,i+48|0,147);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+64|0,i+224|0);Gd(i+32|0,i+208|0);Gd(i+80|0,i+192|0);Gd(i+16|0,i+176|0);Gd(i+96|0,i+160|0);Gd(i+48|0,i+144|0);Gd(i+256|0,i+48|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+112|0);Gd(i+240|0,i+48|0);Gd(i+208|0,i+64|0);Gd(i+192|0,i+32|0);Gd(i+176|0,i+80|0);Gd(i+208|0,i+48|0);Gd(i+160|0,i+16|0);Gd(i+144|0,i+96|0);Gd(i+192|0,i+48|0);_c(i+128|0,i+128|0,78);_c(i+112|0,i+112|0,78);_c(i+64|0,i+64|0,78);_c(i+32|0,i+32|0,78);_c(i+80|0,i+80|0,78);_c(i+16|0,i+16|0,78);_c(i+96|0,i+96|0,78);_c(i+48|0,i+48|0,78);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+224|0,i+64|0);Gd(i+208|0,i+32|0);Gd(i+192|0,i+80|0);Gd(i+176|0,i+16|0);Gd(i+160|0,i+96|0);Gd(i+144|0,i+48|0);Gd(i+256|0,g+1024|0);rb(i+256|0,35286);Gd(i+240|0,g+1040|0);rb(i+240|0,35286);Gd(i+224|0,g+1056|0);rb(i+224|0,35286);Gd(i+208|0,g+1072|0);rb(i+208|0,35286);Gd(i+192|0,g+1088|0);rb(i+192|0,35286);Gd(i+176|0,g+1104|0);rb(i+176|0,35286);Gd(i+160|0,g+1120|0);rb(i+160|0,35286);Gd(i+144|0,g+1136|0);rb(i+144|0,35286);Gd(i+176|0,i+160|0);Gd(i+224|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+160|0,i+224|0);Gd(i+208|0,i+256|0);Gd(i+160|0,i+208|0);Gd(i+208|0,i+144|0);Gd(i+208|0,i+192|0);Gd(i+144|0,i+176|0);Gd(i+208|0,i+240|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+144|0);Gd(i+240|0,i+176|0);Ce(i+80|0,i+144|0);Ce(i+96|0,i+240|0);Ce(i+112|0,i+176|0);Ce(i+48|0,i+224|0);Ce(i+64|0,i+160|0);Gd(i+80|0,i+192|0);Gd(i+96|0,i+224|0);Gd(i+112|0,i+208|0);Gd(i+48|0,i+192|0);Gd(i+64|0,i+256|0);Ce(i+32|0,i+80|0);Ce(i+128|0,i+96|0);Ce(i+16|0,i+80|0);Jd(i+96|0,i+112|0);Jd(i+80|0,i+64|0);Gd(i+16|0,i+128|0);Hd(i+32|0,i+64|0);Hd(i+128|0,i+112|0);Gd(i+64|0,i+112|0);Hd(i+16|0,i+64|0);Ce(i+64|0,i+208|0);Gd(i+64|0,i+256|0);Hd(i+48|0,i+64|0);Gd(i+80|0,i+48|0);Gd(i+96|0,i+48|0);Ce(i+48|0,i+144|0);Gd(i+48|0,i+240|0);Ce(i+64|0,i+176|0);Ce(i+112|0,i+48|0);Gd(i+64|0,i+160|0);Jd(i+112|0,i+64|0);Hd(i+48|0,i+64|0);Gd(i+128|0,i+48|0);Gd(i+80|0,i+16|0);Gd(i+96|0,i+32|0);Gd(i+112|0,i+16|0);Gd(i+128|0,i+32|0);Gd(i+112|0,i+32|0);Ce(i+64|0,i+224|0);Ce(i+48|0,i+192|0);Ce(i+32|0,i+240|0);Ce(i+16|0,i+144|0);Hd(i+64|0,i+208|0);Hd(i+48|0,i+256|0);Hd(i+32|0,i+176|0);Jd(i+16|0,i+160|0);Gd(i+80|0,i+64|0);Gd(i+96|0,i+48|0);Gd(i+112|0,i+32|0);Gd(i+128|0,i+16|0);Ce(i+64|0,i+80|0);Gd(i+64|0,i+96|0);Hd(i+80|0,i+112|0);Ce(i+32|0,i+128|0);Gd(i+32|0,i+80|0);Ce(i+16|0,i+64|0);Hd(i+16|0,i+32|0);Gd(i+16|0,i+96|0);Ce(i+48|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+80|0,i+96|0);Hd(i+48|0,i+80|0);Gd(i+48|0,i+128|0);Gd(i+112|0,i+48|0);Ce(i+96|0,i+32|0);Gd(i+96|0,i+48|0);Hd(i+96|0,i+128|0);Gd(i+112|0,i+96|0);Gd(i+32|0,i+96|0);Hd(i+32|0,i+16|0);Gd(i+32|0,i+64|0);Ce(i+64|0,i+160|0);Ce(i+128|0,i+176|0);Ce(i+96|0,i+16|0);Gd(i+96|0,i+32|0);Hd(i+96|0,i+160|0);Gd(i+160|0,i+176|0);Hd(i+160|0,i+32|0);Hd(i+176|0,i+16|0);Gd(i+160|0,i+176|0);Gd(i+176|0,i+96|0);Gd(i+64|0,i+256|0);Gd(i+128|0,i+208|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+256|0);Gd(i+256|0,i+208|0);Hd(i+256|0,i+112|0);Hd(i+208|0,i+48|0);Gd(i+256|0,i+208|0);Gd(i+208|0,i+96|0);Gd(i+160|0,i+64|0);Gd(i+256|0,i+64|0);Gd(i+176|0,i+128|0);Gd(i+208|0,i+128|0);Ce(i+64|0,i+144|0);Ce(i+128|0,i+240|0);Gd(i+64|0,i+192|0);Gd(i+128|0,i+224|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+64|0);Gd(i+64|0,i+128|0);Hd(i+64|0,i+32|0);Hd(i+128|0,i+16|0);Gd(i+128|0,i+64|0);Gd(i+64|0,i+80|0);Ce(i+96|0,i+48|0);Gd(i+96|0,i+112|0);Hd(i+96|0,i+192|0);Gd(i+192|0,i+224|0);Hd(i+192|0,i+112|0);Hd(i+224|0,i+48|0);Gd(i+192|0,i+224|0);Gd(i+224|0,i+96|0);Gd(i+16|0,i+48|0);Gd(i+32|0,i+112|0);Ce(i+80|0,i+16|0);Gd(i+80|0,i+32|0);Hd(i+80|0,i+144|0);Gd(i+144|0,i+240|0);Hd(i+144|0,i+32|0);Hd(i+240|0,i+16|0);Gd(i+144|0,i+240|0);Gd(i+240|0,i+80|0);Gd(i+144|0,i+64|0);Gd(i+192|0,i+64|0);Gd(i+240|0,i+128|0);Gd(i+224|0,i+128|0);Gd(i+144|0,i+256|0);Gd(i+240|0,i+160|0);Gd(i+192|0,i+144|0);Gd(i+160|0,i+256|0);Gd(i+256|0,i+240|0);Gd(i+240|0,i+176|0);Gd(i+176|0,i+224|0);Gd(i+192|0,i+176|0);Gd(i+224|0,i+208|0);Gd(i+208|0,i+176|0);Gd(i+160|0,i+208|0);_c(i+128|0,i+256|0,147);_c(i+112|0,i+240|0,147);_c(i+96|0,i+192|0,147);_c(i+80|0,i+160|0,147);_c(i+64|0,i+208|0,147);_c(i+48|0,i+144|0,147);_c(i+32|0,i+224|0,147);_c(i+16|0,i+176|0,147);Gd(i+256|0,i+128|0);Gd(i+240|0,i+112|0);Gd(i+192|0,i+96|0);Gd(i+160|0,i+80|0);Gd(i+208|0,i+64|0);Gd(i+144|0,i+48|0);Gd(i+224|0,i+32|0);Gd(i+176|0,i+16|0);Gd(i+128|0,i+176|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+240|0);Gd(i+112|0,i+176|0);Gd(i+80|0,i+192|0);Gd(i+64|0,i+160|0);Gd(i+48|0,i+208|0);Gd(i+80|0,i+176|0);Gd(i+32|0,i+144|0);Gd(i+16|0,i+224|0);Gd(i+64|0,i+176|0);_c(i+256|0,i+256|0,78);_c(i+240|0,i+240|0,78);_c(i+192|0,i+192|0,78);_c(i+160|0,i+160|0,78);_c(i+208|0,i+208|0,78);_c(i+144|0,i+144|0,78);_c(i+224|0,i+224|0,78);_c(i+176|0,i+176|0,78);Gd(i+128|0,i+256|0);Gd(i+112|0,i+240|0);Gd(i+96|0,i+192|0);Gd(i+80|0,i+160|0);Gd(i+64|0,i+208|0);Gd(i+48|0,i+144|0);Gd(i+32|0,i+224|0);Gd(i+16|0,i+176|0);Gd(i+128|0,g+1152|0);rb(i+128|0,35302);Gd(i+112|0,g+1168|0);rb(i+112|0,35302);Gd(i+96|0,g+1184|0);rb(i+96|0,35302);Gd(i+80|0,g+1200|0);rb(i+80|0,35302);Gd(i+64|0,g+1216|0);rb(i+64|0,35302);Gd(i+48|0,g+1232|0);rb(i+48|0,35302);Gd(i+32|0,g+1248|0);rb(i+32|0,35302);Gd(i+16|0,g+1264|0);rb(i+16|0,35302);Gd(i+48|0,i+32|0);Gd(i+96|0,i+112|0);Gd(i+48|0,i+128|0);Gd(i+32|0,i+96|0);Gd(i+80|0,i+128|0);Gd(i+32|0,i+80|0);Gd(i+80|0,i+16|0);Gd(i+80|0,i+64|0);Gd(i+16|0,i+48|0);Gd(i+80|0,i+112|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+16|0);Gd(i+112|0,i+48|0);Ce(i+208|0,i+16|0);Ce(i+224|0,i+112|0);Ce(i+240|0,i+48|0);Ce(i+176|0,i+96|0);Ce(i+192|0,i+32|0);Gd(i+208|0,i+64|0);Gd(i+224|0,i+96|0);Gd(i+240|0,i+80|0);Gd(i+176|0,i+64|0);Gd(i+192|0,i+128|0);Ce(i+160|0,i+208|0);Ce(i+256|0,i+224|0);Ce(i+144|0,i+208|0);Jd(i+224|0,i+240|0);Jd(i+208|0,i+192|0);Gd(i+144|0,i+256|0);Hd(i+160|0,i+192|0);Hd(i+256|0,i+240|0);Gd(i+192|0,i+240|0);Hd(i+144|0,i+192|0);Ce(i+192|0,i+80|0);Gd(i+192|0,i+128|0);Hd(i+176|0,i+192|0);Gd(i+208|0,i+176|0);Gd(i+224|0,i+176|0);Ce(i+176|0,i+16|0);Gd(i+176|0,i+112|0);Ce(i+192|0,i+48|0);Ce(i+240|0,i+176|0);Gd(i+192|0,i+32|0);Jd(i+240|0,i+192|0);Hd(i+176|0,i+192|0);Gd(i+256|0,i+176|0);Gd(i+208|0,i+144|0);Gd(i+224|0,i+160|0);Gd(i+240|0,i+144|0);Gd(i+256|0,i+160|0);Gd(i+240|0,i+160|0);Ce(i+192|0,i+96|0);Ce(i+176|0,i+64|0);Ce(i+160|0,i+112|0);Ce(i+144|0,i+16|0);Hd(i+192|0,i+80|0);Hd(i+176|0,i+128|0);Hd(i+160|0,i+48|0);Jd(i+144|0,i+32|0);Gd(i+208|0,i+192|0);Gd(i+224|0,i+176|0);Gd(i+240|0,i+160|0);Gd(i+256|0,i+144|0);Ce(i+192|0,i+208|0);Gd(i+192|0,i+224|0);Hd(i+208|0,i+240|0);Ce(i+160|0,i+256|0);Gd(i+160|0,i+208|0);Ce(i+144|0,i+192|0);Hd(i+144|0,i+160|0);Gd(i+144|0,i+224|0);Ce(i+176|0,i+240|0);Gd(i+176|0,i+256|0);Gd(i+208|0,i+224|0);Hd(i+176|0,i+208|0);Gd(i+176|0,i+256|0);Gd(i+240|0,i+176|0);Ce(i+224|0,i+160|0);Gd(i+224|0,i+176|0);Hd(i+224|0,i+256|0);Gd(i+240|0,i+224|0);Gd(i+160|0,i+224|0);Hd(i+160|0,i+144|0);Gd(i+160|0,i+192|0);Ce(i+192|0,i+32|0);Ce(i+256|0,i+48|0);Ce(i+224|0,i+144|0);Gd(i+224|0,i+160|0);Hd(i+224|0,i+32|0);Gd(i+32|0,i+48|0);Hd(i+32|0,i+160|0);Hd(i+48|0,i+144|0);Gd(i+32|0,i+48|0);Gd(i+48|0,i+224|0);Gd(i+192|0,i+128|0);Gd(i+256|0,i+80|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+128|0);Gd(i+128|0,i+80|0);Hd(i+128|0,i+240|0);Hd(i+80|0,i+176|0);Gd(i+128|0,i+80|0);Gd(i+80|0,i+224|0);Gd(i+32|0,i+192|0);Gd(i+128|0,i+192|0);Gd(i+48|0,i+256|0);Gd(i+80|0,i+256|0);Ce(i+192|0,i+16|0);Ce(i+256|0,i+112|0);Gd(i+192|0,i+64|0);Gd(i+256|0,i+96|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+192|0);Gd(i+192|0,i+256|0);Hd(i+192|0,i+160|0);Hd(i+256|0,i+144|0);Gd(i+256|0,i+192|0);Gd(i+192|0,i+208|0);Ce(i+224|0,i+176|0);Gd(i+224|0,i+240|0);Hd(i+224|0,i+64|0);Gd(i+64|0,i+96|0);Hd(i+64|0,i+240|0);Hd(i+96|0,i+176|0);Gd(i+64|0,i+96|0);Gd(i+96|0,i+224|0);Gd(i+144|0,i+176|0);Gd(i+160|0,i+240|0);Ce(i+208|0,i+144|0);Gd(i+208|0,i+160|0);Hd(i+208|0,i+16|0);Gd(i+16|0,i+112|0);Hd(i+16|0,i+160|0);Hd(i+112|0,i+144|0);Gd(i+16|0,i+112|0);Gd(i+112|0,i+208|0);Gd(i+16|0,i+192|0);Gd(i+64|0,i+192|0);Gd(i+112|0,i+256|0);Gd(i+96|0,i+256|0);Gd(i+16|0,i+128|0);Gd(i+112|0,i+32|0);Gd(i+64|0,i+16|0);Gd(i+32|0,i+128|0);Gd(i+128|0,i+112|0);Gd(i+112|0,i+48|0);Gd(i+48|0,i+96|0);Gd(i+64|0,i+48|0);Gd(i+96|0,i+80|0);Gd(i+80|0,i+48|0);Gd(i+32|0,i+80|0);Gd(i+128|0,g+1280|0);Gd(i+112|0,g+1296|0);Gd(i+64|0,g+1312|0);Gd(i+32|0,g+1328|0);Gd(i+80|0,g+1344|0);Gd(i+16|0,g+1360|0);Gd(i+96|0,g+1376|0);Gd(i+48|0,g+1392|0);Ce(i+256|0,i+96|0);_d(i+256|0,1);Gd(i+256|0,i+48|0);Hd(i+256|0,1104);Gd(i+48|0,i+256|0);ae(i+256|0,1);Gd(i+96|0,i+256|0);Ce(i+256|0,i+80|0);_d(i+256|0,1);Gd(i+256|0,i+16|0);Hd(i+256|0,1104);Gd(i+16|0,i+256|0);ae(i+256|0,1);Gd(i+80|0,i+256|0);Ce(i+256|0,i+64|0);_d(i+256|0,1);Gd(i+256|0,i+32|0);Hd(i+256|0,1104);Gd(i+32|0,i+256|0);ae(i+256|0,1);Gd(i+64|0,i+256|0);Ce(i+256|0,i+128|0);_d(i+256|0,1);Gd(i+256|0,i+112|0);Hd(i+256|0,1104);Gd(i+112|0,i+256|0);ae(i+256|0,1);Gd(i+128|0,i+256|0);Ce(i+256|0,i+16|0);_d(i+256|0,2);Gd(i+256|0,i+48|0);Hd(i+256|0,1120);Gd(i+48|0,i+256|0);ae(i+256|0,2);Gd(i+16|0,i+256|0);Ce(i+256|0,i+80|0);_d(i+256|0,2);Gd(i+256|0,i+96|0);Hd(i+256|0,1120);Gd(i+96|0,i+256|0);ae(i+256|0,2);Gd(i+80|0,i+256|0);Ce(i+256|0,i+112|0);_d(i+256|0,2);Gd(i+256|0,i+32|0);Hd(i+256|0,1120);Gd(i+32|0,i+256|0);ae(i+256|0,2);Gd(i+112|0,i+256|0);Ce(i+256|0,i+128|0);_d(i+256|0,2);Gd(i+256|0,i+64|0);Hd(i+256|0,1120);Gd(i+64|0,i+256|0);ae(i+256|0,2);Gd(i+128|0,i+256|0);Ce(i+256|0,i+32|0);_d(i+256|0,4);Gd(i+256|0,i+48|0);Hd(i+256|0,1136);Gd(i+48|0,i+256|0);ae(i+256|0,4);Gd(i+32|0,i+256|0);Ce(i+256|0,i+64|0);_d(i+256|0,4);Gd(i+256|0,i+96|0);Hd(i+256|0,1136);Gd(i+96|0,i+256|0);ae(i+256|0,4);Gd(i+64|0,i+256|0);Ce(i+256|0,i+112|0);_d(i+256|0,4);Gd(i+256|0,i+16|0);Hd(i+256|0,1136);Gd(i+16|0,i+256|0);ae(i+256|0,4);Gd(i+112|0,i+256|0);Ce(i+256|0,i+128|0);_d(i+256|0,4);Gd(i+256|0,i+80|0);Hd(i+256|0,1136);Gd(i+80|0,i+256|0);ae(i+256|0,4);Gd(i+128|0,i+256|0);if(e>>>0<0|(e|0)==0&d>>>0<128){h=5;break}gg(i+12|0,(ug(i+12|0)|0)+8|0);c[b>>2]=c[i+128>>2];c[b+4>>2]=c[i+128+4>>2];c[b+8>>2]=c[i+128+8>>2];c[b+12>>2]=c[i+128+12>>2];f=b+16|0;c[f>>2]=c[i+112>>2];c[f+4>>2]=c[i+112+4>>2];c[f+8>>2]=c[i+112+8>>2];c[f+12>>2]=c[i+112+12>>2];f=b+32|0;c[f>>2]=c[i+64>>2];c[f+4>>2]=c[i+64+4>>2];c[f+8>>2]=c[i+64+8>>2];c[f+12>>2]=c[i+64+12>>2];f=b+48|0;c[f>>2]=c[i+32>>2];c[f+4>>2]=c[i+32+4>>2];c[f+8>>2]=c[i+32+8>>2];c[f+12>>2]=c[i+32+12>>2];f=b+64|0;c[f>>2]=c[i+80>>2];c[f+4>>2]=c[i+80+4>>2];c[f+8>>2]=c[i+80+8>>2];c[f+12>>2]=c[i+80+12>>2];f=b+80|0;c[f>>2]=c[i+16>>2];c[f+4>>2]=c[i+16+4>>2];c[f+8>>2]=c[i+16+8>>2];c[f+12>>2]=c[i+16+12>>2];f=b+96|0;c[f>>2]=c[i+96>>2];c[f+4>>2]=c[i+96+4>>2];c[f+8>>2]=c[i+96+8>>2];c[f+12>>2]=c[i+96+12>>2];f=b+112|0;c[f>>2]=c[i+48>>2];c[f+4>>2]=c[i+48+4>>2];c[f+8>>2]=c[i+48+8>>2];c[f+12>>2]=c[i+48+12>>2];if((d|0)==128&(e|0)==0)break;f=fg(d|0,e|0,-128,-1)|0;b=b+128|0;e=z;d=f}if((h|0)==5?(g=yf(d|0,e|0,4)|0,h=z,h=fg(ug(i+12|0)|0,0,g|0,h|0)|0,gg(i+12|0,h),c[i+272>>2]=c[i+128>>2],c[i+272+4>>2]=c[i+128+4>>2],c[i+272+8>>2]=c[i+128+8>>2],c[i+272+12>>2]=c[i+128+12>>2],c[i+272+16>>2]=c[i+112>>2],c[i+272+16+4>>2]=c[i+112+4>>2],c[i+272+16+8>>2]=c[i+112+8>>2],c[i+272+16+12>>2]=c[i+112+12>>2],c[i+272+32>>2]=c[i+64>>2],c[i+272+32+4>>2]=c[i+64+4>>2],c[i+272+32+8>>2]=c[i+64+8>>2],c[i+272+32+12>>2]=c[i+64+12>>2],c[i+272+48>>2]=c[i+32>>2],c[i+272+48+4>>2]=c[i+32+4>>2],c[i+272+48+8>>2]=c[i+32+8>>2],c[i+272+48+12>>2]=c[i+32+12>>2],c[i+272+64>>2]=c[i+80>>2],c[i+272+64+4>>2]=c[i+80+4>>2],c[i+272+64+8>>2]=c[i+80+8>>2],c[i+272+64+12>>2]=c[i+80+12>>2],c[i+272+80>>2]=c[i+16>>2],c[i+272+80+4>>2]=c[i+16+4>>2],c[i+272+80+8>>2]=c[i+16+8>>2],c[i+272+80+12>>2]=c[i+16+12>>2],c[i+272+96>>2]=c[i+96>>2],c[i+272+96+4>>2]=c[i+96+4>>2],c[i+272+96+8>>2]=c[i+96+8>>2],c[i+272+96+12>>2]=c[i+96+12>>2],c[i+272+112>>2]=c[i+48>>2],c[i+272+112+4>>2]=c[i+48+4>>2],c[i+272+112+8>>2]=c[i+48+8>>2],c[i+272+112+12>>2]=c[i+48+12>>2],!((d|0)==0&(e|0)==0)):0){f=i+272|0;while(1){a[b>>0]=a[f>>0]|0;d=fg(d|0,e|0,-1,-1)|0;e=z;if((d|0)==0&(e|0)==0)break;else{f=f+1|0;b=b+1|0}}}l=j;return 0}
function Ab(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0;e=0;do{a[b+e>>0]=(d[c+(e>>3)>>0]|0)>>>(e&7)&1;e=e+1|0}while((e|0)!=256);h=0;do{i=b+h|0;a:do if(a[i>>0]|0){g=1;do{e=g+h|0;if((e|0)>=256)break a;c=a[b+e>>0]|0;b:do if(c<<24>>24){f=a[i>>0]|0;c=c<<24>>24<<g;if((f+c|0)<16){a[i>>0]=f+c;a[b+e>>0]=0;break}if((f-c|0)<=-16)break a;a[i>>0]=f-c;while(1){c=b+e|0;if(!(a[c>>0]|0))break;a[c>>0]=0;e=e+1|0;if((e|0)>=256)break b}a[c>>0]=1}while(0);g=g+1|0}while((g|0)<7)}while(0);h=h+1|0}while((h|0)!=256);return}function Bb(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;a:do if(!((e|0)==0&(f|0)==0)){g=c[b+352>>2]|0;j=f;while(1){i=256-g|0;f=b+96+g|0;if(!(j>>>0>0|(j|0)==0&e>>>0>i>>>0))break;fb(f|0,d|0,i|0)|0;c[b+352>>2]=(c[b+352>>2]|0)+i;cd(b,128,0);ga(b,b+96|0);f=b+96|0;g=b+224|0;h=f+128|0;do{a[f>>0]=a[g>>0]|0;f=f+1|0;g=g+1|0}while((f|0)<(h|0));g=(c[b+352>>2]|0)+-128|0;c[b+352>>2]=g;e=cg(e|0,j|0,i|0,0)|0;f=z;if((e|0)==0&(f|0)==0)break a;else{d=d+i|0;j=f}}fb(f|0,d|0,e|0)|0;j=fg(c[b+352>>2]|0,0,e|0,j|0)|0;c[b+352>>2]=j}while(0);return}function Cb(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=(c[d>>2]|0)==0;h=c[d+12>>2]|0;do if(j){g=a[d+8>>0]|0;if(!(g<<24>>24)){g=h+-1|0;break}g=O(c[b+12>>2]|0,g&255)|0;if(!f){g=g+(((h|0)==0)<<31>>31)|0;break}else{g=h+-1+g|0;break}}else{g=(c[b+16>>2]|0)-(c[b+12>>2]|0)|0;if(!f){g=g+(((h|0)==0)<<31>>31)|0;break}else{g=h+-1+g|0;break}}while(0);af(e|0,0,e|0,0)|0;af(g|0,0,z|0,0)|0;h=cg(g+-1|0,0,z|0,0)|0;e=z;if(!j?(i=a[d+8>>0]|0,i<<24>>24!=3):0){g=O(c[b+12>>2]|0,(i&255)+1|0)|0;f=0}else{g=0;f=0}j=fg(h|0,e|0,g|0,f|0)|0;b=Pe(j|0,z|0,c[b+16>>2]|0,0)|0;return b|0}function Db(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if(d<<24>>24?(d&255)<=64:0){if(!(sh(c[a+80>>2]|0,c[a+80+4>>2]|0)|0)){e=c[a+352>>2]|0;do if(e>>>0>128){cd(a,128,0);ga(a,a+96|0);e=(c[a+352>>2]|0)+-128|0;c[a+352>>2]=e;if(e>>>0<129){fb(a+96|0,a+224|0,e|0)|0;f=a+96|0;g=c[a+352>>2]|0;break}else ba(33525,33557,367,33602)}else{f=a+96|0;g=e}while(0);cd(a,g,0);ig(a);e=c[a+352>>2]|0;Pb(a+96+e|0,0,256-e|0)|0;ga(a,f);fb(b|0,a|0,d&255|0)|0;e=0}else e=-1;return e|0}Z();return 0}function Eb(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;switch(((f>>>0)%3|0)&3){case 2:{g=((f>>>0)/3|0)<<2|1;h=3;break}case 1:{g=((f>>>0)/3|0)<<2;h=3;break}default:g=((f>>>0)/3|0)<<2}if((h|0)==3)g=g+2|0;if(g>>>0<c>>>0){if(f){i=0;c=0;while(1){i=d[e>>0]|0|i<<8;c=c+8|0;while(1){j=c+-6|0;h=b+1|0;a[b>>0]=xe(i>>>j&63)|0;if(j>>>0>5){b=h;c=j}else break}f=f+-1|0;if(!f)break;else{e=e+1|0;b=h;c=j}}if(!j)b=h;else{a[h>>0]=xe(i<<12-c&63)|0;b=b+2|0}}a[b>>0]=0}else g=-1;return g|0}function Fb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[b+4>>2]|0)-(c[d+4>>2]|0)|0;l=(c[b+8>>2]|0)-(c[d+8>>2]|0)|0;k=(c[b+12>>2]|0)-(c[d+12>>2]|0)|0;j=(c[b+16>>2]|0)-(c[d+16>>2]|0)|0;i=(c[b+20>>2]|0)-(c[d+20>>2]|0)|0;h=(c[b+24>>2]|0)-(c[d+24>>2]|0)|0;g=(c[b+28>>2]|0)-(c[d+28>>2]|0)|0;f=(c[b+32>>2]|0)-(c[d+32>>2]|0)|0;e=(c[b+36>>2]|0)-(c[d+36>>2]|0)|0;c[a>>2]=(c[b>>2]|0)-(c[d>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function Gb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[d+4>>2]|0)+(c[b+4>>2]|0)|0;l=(c[d+8>>2]|0)+(c[b+8>>2]|0)|0;k=(c[d+12>>2]|0)+(c[b+12>>2]|0)|0;j=(c[d+16>>2]|0)+(c[b+16>>2]|0)|0;i=(c[d+20>>2]|0)+(c[b+20>>2]|0)|0;h=(c[d+24>>2]|0)+(c[b+24>>2]|0)|0;g=(c[d+28>>2]|0)+(c[b+28>>2]|0)|0;f=(c[d+32>>2]|0)+(c[b+32>>2]|0)|0;e=(c[d+36>>2]|0)+(c[b+36>>2]|0)|0;c[a>>2]=(c[d>>2]|0)+(c[b>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function Hb(b,d){b=b|0;d=d|0;var e=0,f=0;a:do if(!(d&255))b=b+(uc(b)|0)|0;else{if(b&3)do{f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break a;b=b+1|0}while((b&3|0)!=0);f=O(d&255,16843009)|0;e=c[b>>2]|0;b:do if(!((e&-2139062144^-2139062144)&e+-16843009))do{e=e^f;if((e&-2139062144^-2139062144)&e+-16843009|0)break b;b=b+4|0;e=c[b>>2]|0}while(!((e&-2139062144^-2139062144)&e+-16843009|0));while(0);while(1){f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break;else b=b+1|0}}while(0);return b|0}function Ib(b,e,f,g,h,i){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0;k=l;j=l=l+63&-64;l=l+32|0;m=d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24;c[j>>2]=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;c[j+4>>2]=m;c[j+8>>2]=0;c[j+8+4>>2]=0;re(j+16|0,f,g);h=j+16+8|0;a[h>>0]=0;a[h+1>>0]=0;a[h+2>>0]=0;a[h+3>>0]=0;h=j+16+8+4|0;a[h>>0]=0;a[h+1>>0]=0;a[h+2>>0]=0;a[h+3>>0]=0;if((e+-16|0)>>>0>48){c[8326]=22;b=-1}else b=Ec(b,e,0,0,0,i,32,j+16|0,j)|0;l=k;return b|0}function Jb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=l;f=l=l+63&-64;l=l+128|0;e=Mg(c)|0;c=(c<<24>>24)-((c<<24>>24&0-(e&255))<<1)&255;Ff(a);Ke(a,2232+(b*960|0)|0,th(c,1)|0);Ke(a,2232+(b*960|0)+120|0,th(c,2)|0);Ke(a,2232+(b*960|0)+240|0,th(c,3)|0);Ke(a,2232+(b*960|0)+360|0,th(c,4)|0);Ke(a,2232+(b*960|0)+480|0,th(c,5)|0);Ke(a,2232+(b*960|0)+600|0,th(c,6)|0);Ke(a,2232+(b*960|0)+720|0,th(c,7)|0);Ke(a,2232+(b*960|0)+840|0,th(c,8)|0);qc(f,a+40|0);qc(f+40|0,a);dc(f+80|0,a+80|0);Ke(a,f,e);l=d;return}function Kb(a,b,d,e,f,g,h,i,j,k,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;m=m|0;n=n|0;k=l;l=l+336|0;Cg(k+264|0,64,0,m,n)|0;_g(k,k+264|0)|0;Sd(k+264|0,64);eg(k,h,i,j)|0;re(k+256|0,i,j);eg(k,k+256|0,8,0)|0;jf(a,e,f,g,m,1,0,n)|0;eg(k,a,f,g)|0;re(k+256|0,f,g);eg(k,k+256|0,8,0)|0;Zg(k,b)|0;Sd(k,256);if(d|0){c[d>>2]=16;c[d+4>>2]=0}l=k;return 0}function Lb(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0;o=l;k=l=l+63&-64;l=l+128|0;j=b;m=j+102|0;do{a[j>>0]=0;j=j+1|0}while((j|0)<(m|0));if(!(f>>>0>0|(f|0)==0&e>>>0>4294967295)){jb(g,h,i,k+8|0,k+4|0,k);gf(k+88|0,32);if((oc(c[k+8>>2]|0,c[k>>2]|0,c[k+4>>2]|0,k+88|0,k+24|0)|0)!=0?(Ih(k+12|0),m=(wb(k+12|0,d,e,k+24|0,b)|0)==0,Jh(k+12|0),!m):0)b=0;else{b=22;n=4}}else{b=27;n=4}if((n|0)==4){c[8326]=b;b=-1}l=o;return b|0}function Mb(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;g=l;h=l=l+63&-64;l=l+64|0;if((c+-1&255)>63)Z();a[h>>0]=c;a[h+1>>0]=0;a[h+2>>0]=1;a[h+3>>0]=1;Vg(h+4|0);bf(h+8|0);c=h+16|0;f=c+16|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(f|0));if(!d){c=h+32|0;f=c+16|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(f|0))}else lf(h,d);if(!e){c=h+48|0;f=c+16|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(f|0))}else kf(h,e);ud(b,h);l=g;return}function Nb(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;i=l;h=l=l+63&-64;l=l+480|0;g=(b|0)==0?c:b;c=(c|0)==0?g:c;if(!(bh(h+448|0,e,f)|0)){Dg(h,0,0,64)|0;rg(h,h+448|0,32,0)|0;Sd(h+448|0,32);rg(h,f,32,0)|0;rg(h,d,32,0)|0;Tg(h,h+384|0,64)|0;Sd(h,384);b=0;do{a[c+b>>0]=a[h+384+b>>0]|0;a[g+b>>0]=a[h+384+(b+32)>>0]|0;b=b+1|0}while((b|0)!=32);Sd(h+384|0,64);b=0}else b=-1;l=i;return b|0}function Ob(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;i=l;h=l=l+63&-64;l=l+480|0;g=(b|0)==0?c:b;c=(c|0)==0?g:c;if(!(bh(h+448|0,e,f)|0)){Dg(h,0,0,64)|0;rg(h,h+448|0,32,0)|0;Sd(h+448|0,32);rg(h,d,32,0)|0;rg(h,f,32,0)|0;Tg(h,h+384|0,64)|0;Sd(h,384);b=0;do{a[g+b>>0]=a[h+384+b>>0]|0;a[c+b>>0]=a[h+384+(b+32)>>0]|0;b=b+1|0}while((b|0)!=32);Sd(h+384|0,64);b=0}else b=-1;l=i;return b|0}function Pb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;f=b+e|0;d=d&255;if((e|0)>=67){while(b&3){a[b>>0]=d;b=b+1|0}g=d|d<<8|d<<16|d<<24;while((b|0)<=((f&-4)-64|0)){c[b>>2]=g;c[b+4>>2]=g;c[b+8>>2]=g;c[b+12>>2]=g;c[b+16>>2]=g;c[b+20>>2]=g;c[b+24>>2]=g;c[b+28>>2]=g;c[b+32>>2]=g;c[b+36>>2]=g;c[b+40>>2]=g;c[b+44>>2]=g;c[b+48>>2]=g;c[b+52>>2]=g;c[b+56>>2]=g;c[b+60>>2]=g;b=b+64|0}while((b|0)<(f&-4|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return f-e|0}function Qb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+48|0;Gb(a,b+40|0,b);Fb(a+40|0,b+40|0,b);la(a+80|0,a,c+40|0);la(a+40|0,a+40|0,c);la(a+120|0,c+120|0,b+120|0);la(a,b+80|0,c+80|0);Gb(e,a,a);Fb(a,a+80|0,a+40|0);Gb(a+40|0,a+80|0,a+40|0);Fb(a+80|0,e,a+120|0);Gb(a+120|0,e,a+120|0);l=d;return}function Rb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+48|0;Gb(a,b+40|0,b);Fb(a+40|0,b+40|0,b);la(a+80|0,a,c);la(a+40|0,a+40|0,c+40|0);la(a+120|0,c+120|0,b+120|0);la(a,b+80|0,c+80|0);Gb(e,a,a);Fb(a,a+80|0,a+40|0);Gb(a+40|0,a+80|0,a+40|0);Gb(a+80|0,e,a+120|0);Fb(a+120|0,e,a+120|0);l=d;return}function Sb(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;g=l;h=l=l+63&-64;l=l+192|0;if((c+-1&255)>63)Z();if((e+-1&255)>63|(d|0)==0)Z();else{a[h+128>>0]=c;a[h+128+1>>0]=e;a[h+128+2>>0]=1;a[h+128+3>>0]=1;Vg(h+128+4|0);bf(h+128+8|0);c=h+128+16|0;f=c+48|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(f|0));ud(b,h+128|0);Pb(h+(e&255)|0,0,(e<<24>>24<0?0:128-(e&255)|0)|0)|0;fb(h|0,d|0,e&255|0)|0;Bb(b,h,128,0);Sd(h,128);l=g;return}}function Tb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;e=l;f=l=l+63&-64;l=l+2048|0;if((a|0)!=0&(b|0)!=0){uh(f,(c[(c[b>>2]|0)+4>>2]|0)+(c[b+16>>2]<<10)+-1024|0);if((c[b+20>>2]|0)>>>0>1){d=1;do{g=c[b+16>>2]|0;g=g+-1+(O(g,d)|0)|0;Ud(f,(c[(c[b>>2]|0)+4>>2]|0)+(g<<10)|0);d=d+1|0}while(d>>>0<(c[b+20>>2]|0)>>>0)}Se(f+1024|0,f);Oa(c[a>>2]|0,c[a+4>>2]|0,f+1024|0,1024);Sd(f,1024);Sd(f+1024|0,1024);Gf(b,c[a+56>>2]&1);fh(c[b>>2]|0)}l=e;return}function Ub(a,b,d,e,f,g,h,i,j,k){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var m=0,n=0;n=l;m=l=l+63&-64;l=l+16|0;Pb(a|0,0,b|0)|0;do if(!((g|d)>>>0>0|(g|d|0)==0&(f|b)>>>0>4294967295))if(d>>>0<0|(d|0)==0&b>>>0<16){c[8326]=22;a=-1;break}else{jb(i,j,k,m+8|0,m+4|0,m);k=vf(1,0,c[m+8>>2]|0)|0;a=dd(e,f,h,32,k,z,c[m>>2]|0,c[m+4>>2]|0,a,b)|0;break}else{c[8326]=27;a=-1}while(0);l=n;return a|0}function Vb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+48|0;Gb(a,b+40|0,b);Fb(a+40|0,b+40|0,b);la(a+80|0,a,c+40|0);la(a+40|0,a+40|0,c);la(a+120|0,c+80|0,b+120|0);Gb(e,b+80|0,b+80|0);Fb(a,a+80|0,a+40|0);Gb(a+40|0,a+80|0,a+40|0);Fb(a+80|0,e,a+120|0);Gb(a+120|0,e,a+120|0);l=d;return}function Wb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+48|0;Gb(a,b+40|0,b);Fb(a+40|0,b+40|0,b);la(a+80|0,a,c);la(a+40|0,a+40|0,c+40|0);la(a+120|0,c+80|0,b+120|0);Gb(e,b+80|0,b+80|0);Fb(a,a+80|0,a+40|0);Gb(a+40|0,a+80|0,a+40|0);Gb(a+80|0,e,a+120|0);Fb(a+120|0,e,a+120|0);l=d;return}function Xb(a,b,e,f,g,h,i,j,k,m,n,o){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;m=m|0;n=n|0;o=o|0;m=l;l=l+48|0;c[m>>2]=0;Da(m+16|0,n,o,0)|0;o=d[n+16+4>>0]|d[n+16+4+1>>0]<<8|d[n+16+4+2>>0]<<16|d[n+16+4+3>>0]<<24;c[m+4>>2]=d[n+16>>0]|d[n+16+1>>0]<<8|d[n+16+2>>0]<<16|d[n+16+3>>0]<<24;c[m+4+4>>2]=o;yb(a,b,e,f,g,h,i,j,k,0,m,m+16|0)|0;Sd(m+16|0,32);l=m;return 0}function Yb(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0;j=l;k=l=l+63&-64;l=l+384|0;if((b|0)==0&((e|0)!=0|(f|0)!=0))Z();if(!a)Z();if((d+-1&255)>63)Z();if(!((c|0)!=0|g<<24>>24!=0^1))Z();if((g&255)>64)Z();if(g<<24>>24)nb(k,d,c,g,h,i);else Mb(k,d,h,i);Bb(k,b,e,f);Db(k,a,d)|0;l=j;return}function Zb(a,b,e,f,g,h,i,j,k,m,n){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;m=m|0;n=n|0;b=l;l=l+48|0;c[b>>2]=0;Da(b+16|0,m,n,0)|0;n=d[m+16+4>>0]|d[m+16+4+1>>0]<<8|d[m+16+4+2>>0]<<16|d[m+16+4+3>>0]<<24;c[b+4>>2]=d[m+16>>0]|d[m+16+1>>0]<<8|d[m+16+2>>0]<<16|d[m+16+3>>0]<<24;c[b+4+4>>2]=n;m=lb(a,0,e,f,g,h,i,j,k,b,b+16|0)|0;Sd(b+16|0,32);l=b;return m|0}function _b(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0;n=l;k=l=l+63&-64;l=l+16|0;j=b;m=j+128|0;do{a[j>>0]=0;j=j+1|0}while((j|0)<(m|0));do if(!((h|f)>>>0>0|(h|f|0)==0&(g|e)>>>0>4294967295|i>>>0>2147484671))if(h>>>0<0|(h|0)==0&g>>>0<3|i>>>0<8192){c[8326]=22;b=-1;break}else{gf(k,16);b=((Sf(g,i>>>10,d,e,k,b)|0)!=0)<<31>>31;break}else{c[8326]=27;b=-1}while(0);l=n;return b|0}function $b(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;e=l;d=l=l+63&-64;l=l+48|0;b=hb(a)|0;if(!b){f=c[a+44>>2]|0;b=c[a+48>>2]|0;f=((f>>>0<b<<3>>>0?b<<3:f)>>>0)/(b<<2>>>0)|0;g=O(f,b<<2)|0;c[d>>2]=0;c[d+4>>2]=c[a+40>>2];c[d+8>>2]=g;c[d+12>>2]=f;c[d+16>>2]=f<<2;c[d+20>>2]=b;c[d+24>>2]=c[a+52>>2];c[d+28>>2]=1;b=ad(d,a)|0;if(!b){b=xb(d)|0;if(!b){Tb(a,d);b=0}}}l=e;return b|0}function ac(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=c[a+32>>2]|0;i=c[a+32+4>>2]|0;d=yf(e|0,i|0,3)|0;if(0<0|0==0&(d&56)>>>0<56){fb(a+40+(d&63)|0,33915,56-(d&63)|0)|0;f=a+40|0;g=b+256|0;h=a;d=i}else{fb(a+40+(d&63)|0,33915,64-(d&63)|0)|0;pa(a,a+40|0,b,b+256|0);d=a+40|0;e=d+56|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));f=a+40|0;g=b+256|0;h=a;e=c[a+32>>2]|0;d=c[a+32+4>>2]|0}Lc(a+96|0,e,d);pa(h,f,b,g);return}function bc(b,d){b=b|0;d=d|0;c[b>>2]=(Rg(d)|0)&67108863;c[b+4>>2]=(Rg(d+3|0)|0)>>>2&67108611;c[b+8>>2]=(Rg(d+6|0)|0)>>>4&67092735;c[b+12>>2]=(Rg(d+9|0)|0)>>>6&66076671;c[b+16>>2]=(Rg(d+12|0)|0)>>>8&1048575;c[b+20>>2]=0;c[b+20+4>>2]=0;c[b+20+8>>2]=0;c[b+20+12>>2]=0;c[b+20+16>>2]=0;c[b+40>>2]=Rg(d+16|0)|0;c[b+44>>2]=Rg(d+20|0)|0;c[b+48>>2]=Rg(d+24|0)|0;c[b+52>>2]=Rg(d+28|0)|0;c[b+56>>2]=0;c[b+56+4>>2]=0;a[b+80>>0]=0;return}function cc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=l;h=l=l+63&-64;l=l+464|0;qb(h+208|0,a,b)|0;wg(h+208|0,c,d,0)|0;if(f|0){a=0;b=0;do{a=a+1|0;gg(h+448|0,a);fb(h|0,h+208|0,208)|0;wg(h,h+448|0,4,0)|0;qe(h,h+416|0)|0;d=f-b|0;fb(e+b|0,h+416|0,(d>>>0<32?d:32)|0)|0;b=a<<5}while(b>>>0<f>>>0)}Sd(h+208|0,208);l=g;return}function dc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=0-(c[b+4>>2]|0)|0;k=0-(c[b+8>>2]|0)|0;j=0-(c[b+12>>2]|0)|0;i=0-(c[b+16>>2]|0)|0;h=0-(c[b+20>>2]|0)|0;g=0-(c[b+24>>2]|0)|0;f=0-(c[b+28>>2]|0)|0;e=0-(c[b+32>>2]|0)|0;d=0-(c[b+36>>2]|0)|0;c[a>>2]=0-(c[b>>2]|0);c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function ec(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;Pb(a|0,0,b|0)|0;do if((l|0)==1){if((g|d|j)>>>0>0|(g|d|j|0)==0&(f|b|i)>>>0>4294967295|k>>>0>2147484671){c[8326]=27;a=-1;break}if(d>>>0<0|(d|0)==0&b>>>0<16|(j>>>0<0|(j|0)==0&i>>>0<3)|k>>>0<8192){c[8326]=22;a=-1;break}else{a=((Hf(i,k>>>10,e,f,h,a,b)|0)!=0)<<31>>31;break}}else a=-1;while(0);return a|0}function fc(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;if(!d)b=0;else{i=a[b>>0]|0;e=a[c>>0]|0;a:do if(!(i<<24>>24)){d=e&255;b=i&255}else{j=b;h=d;f=e;g=i;d=e&255;b=i&255;do{h=h+-1|0;if(!(g<<24>>24==f<<24>>24&((h|0)!=0&f<<24>>24!=0)))break a;j=j+1|0;c=c+1|0;g=a[j>>0]|0;b=g&255;f=a[c>>0]|0;d=f&255}while(g<<24>>24!=0)}while(0);b=b-d|0}return b|0}function gc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;e=l;f=l=l+63&-64;l=l+1024|0;if(c[b+20>>2]|0){d=0;do{jg(a+64|0,0);jg(a+68|0,d);Oa(f,1024,a,72);Ee((c[(c[b>>2]|0)+4>>2]|0)+((O(c[b+16>>2]|0,d)|0)<<10)|0,f);jg(a+64|0,1);Oa(f,1024,a,72);Ee((c[(c[b>>2]|0)+4>>2]|0)+((O(c[b+16>>2]|0,d)|0)+1<<10)|0,f);d=d+1|0}while(d>>>0<(c[b+20>>2]|0)>>>0)}Sd(f,1024);l=e;return}function hc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;h=l;i=l=l+63&-64;l=l+384|0;if((b|0)==0&((e|0)!=0|(f|0)!=0))Z();if(!a)Z();if((d+-1&255)>63)Z();if(!((c|0)!=0|g<<24>>24!=0^1))Z();if((g&255)>64)Z();if(g<<24>>24)Sb(i,d,c,g);else Hc(i,d);Bb(i,b,e,f);Db(i,a,d)|0;l=h;return}function ic(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;e=l;d=l=l+63&-64;l=l+16|0;do if((((a|0)!=0?(b|0)!=0:0)?((b<<10>>>0)/(b>>>0)|0|0)==1024:0)?(f=ia(12)|0,c[a>>2]=f,(f|0)!=0):0){f=sf(d,b<<10)|0;c[8326]=f;if(f|0){c[d>>2]=0;d=-22;break}d=c[d>>2]|0;if(d){c[c[a>>2]>>2]=d;c[(c[a>>2]|0)+4>>2]=d;c[(c[a>>2]|0)+8>>2]=b<<10;d=0}else d=-22}else d=-22;while(0);l=e;return d|0}function jc(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;d=l=l+63&-64;l=l+48|0;qa(a,b);qa(a+80|0,b+40|0);oa(a+120|0,b+80|0);Gb(a+40|0,b,b+40|0);qa(d,a+40|0);Gb(a+40|0,a+80|0,a);Fb(a+80|0,a+80|0,a);Fb(a,d,a+40|0);Fb(a+120|0,a+120|0,a+80|0);l=c;return}function kc(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;h=l;i=l=l+63&-64;l=l+16|0;Ed(a+64|0,d|0,e|0)|0;Jf(a,i,a+64|0,e,f,g)|0;if((c[i>>2]|0)==64&(c[i+4>>2]|0)==0)if(b|0){a=fg(e|0,f|0,64,0)|0;c[b>>2]=a;c[b+4>>2]=z;a=0}else a=0;else{if(b|0){c[b>>2]=0;c[b+4>>2]=0}i=fg(e|0,f|0,64,0)|0;Pb(a|0,0,i|0)|0;a=-1}l=h;return a|0}function lc(a,b){a=a|0;b=b|0;var c=0,d=0;d=l;c=l=l+63&-64;l=l+240|0;if(!(Za(c+80|0,b)|0)){Bf(c);Fb(c,c,c+80+40|0);Fa(c,c);Bf(c+40|0);Gb(c+40|0,c+40|0,c+80+40|0);la(c+40|0,c+40|0,c);Ja(a,c+40|0);a=0}else a=-1;l=d;return a|0}function mc(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;e=fg(e|0,f|0,-64,-1)|0;f=z;do if(f>>>0>0|(f|0)==0&e>>>0>4294967231)h=7;else{if(Pf(d,d+64|0,e,f,g)|0){Pb(a|0,0,e|0)|0;h=7;break}if(b|0){c[b>>2]=e;c[b+4>>2]=f}Ed(a|0,d+64|0,e|0)|0;e=0}while(0);if((h|0)==7)if(!b)e=-1;else{c[b>>2]=0;c[b+4>>2]=0;e=-1}return e|0}function nc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=a[b>>0]|0;a:do if((i+-48&255)<=9){g=0;h=b;f=i;while(1){e=(f<<24>>24)+-48|0;f=g*10|0;if(!(g>>>0<429496730&(e>>>0>~f>>>0^1))){e=0;break a}g=(e>>>0>~f>>>0?0:e)+f|0;e=h+1|0;f=a[e>>0]|0;if((f+-48&255)>9)break;else h=e}if((e|0)!=(b|0)?(h|0)==(b|0)|i<<24>>24!=48:0)c[d>>2]=g;else e=0}else e=0;while(0);return e|0}function oc(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;if((((b>>>0<=63?(j=af(d|0,0,c|0,0)|0,k=z,!(k>>>0>0|(k|0)==0&j>>>0>1073741823)):0)?(a[f>>0]=36,a[f+1>>0]=55,a[f+2>>0]=36,a[f+3>>0]=a[34193+b>>0]|0,g=bd(f+4|0,54,c,30)|0,(g|0)!=0):0)?(h=bd(g,f+58-g|0,d,30)|0,(h|0)!=0):0)?(i=Rc(h,f+58-h|0,e)|0,(i|0)!=0&i>>>0<(f+58|0)>>>0):0)a[i>>0]=0;else f=0;return f|0}function pc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=yf(c[a+72>>2]|0,c[a+72+4>>2]|0,3)|0;if(0<0|0==0&(d&112)>>>0<112){fb(a+80+(d&127)|0,33979,112-(d&127)|0)|0;d=a+80|0;e=b+640|0;f=a}else{fb(a+80+(d&127)|0,33979,128-(d&127)|0)|0;ja(a,a+80|0,b,b+640|0);d=a+80|0;e=d+112|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));d=a+80|0;e=b+640|0;f=a}ne(a+192|0,a+64|0,16);ja(f,d,b,e);return}function qc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=c[b+4>>2]|0;k=c[b+8>>2]|0;j=c[b+12>>2]|0;i=c[b+16>>2]|0;h=c[b+20>>2]|0;g=c[b+24>>2]|0;f=c[b+28>>2]|0;e=c[b+32>>2]|0;d=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function rc(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;i=l;h=l=l+63&-64;l=l+32|0;if(!(e>>>0<0|(e|0)==0&d>>>0<32)?(zd(h,32,0,f,g)|0,j=fg(d|0,e|0,-32,-1)|0,(Rf(c+16|0,c+32|0,j,z,h)|0)==0):0){If(b,c,d,e,f,g)|0;c=b+32|0;do{a[b>>0]=0;b=b+1|0}while((b|0)<(c|0));b=0}else b=-1;l=i;return b|0}function sc(a){a=a|0;return ((0-((0-(a^47)|0)>>>8&63^63|(0-(a^43)|0)>>>8&62^62|((a+65439|0)>>>8^255)&a+185&((122-a|0)>>>8&255^255)|((a+-65|0)>>>8^255)&a+-65&((90-a|0)>>>8&255^255)|((a+65488|0)>>>8^255)&a+4&((57-a|0)>>>8&255^255))|0)>>>8&255^255)&(0-(a^65)|0)>>>8|((0-(a^47)|0)>>>8&63^63|(0-(a^43)|0)>>>8&62^62|((a+65439|0)>>>8^255)&a+185&((122-a|0)>>>8&255^255)|((a+-65|0)>>>8^255)&a+-65&((90-a|0)>>>8&255^255)|((a+65488|0)>>>8^255)&a+4&((57-a|0)>>>8&255^255))|0}function tc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;f=0;h=0;i=0;a:while(1){while(1){g=sc(a[e>>0]|0)|0;if((g|0)==255){j=7;break a}e=e+1|0;h=g+(h<<6)|0;g=f+6|0;if(g>>>0>7)break;else f=g}f=f+-2|0;if(i>>>0>=(c[d>>2]|0)>>>0){e=0;break}a[b>>0]=h>>>f;b=b+1|0;i=i+1|0}if((j|0)==7)if(f>>>0<=4?((1<<f)+-1&h|0)==0:0)c[d>>2]=i;else e=0;return e|0}function uc(b){b=b|0;var d=0,e=0,f=0;a:do if(!(b&3)){d=b;f=4}else{d=b;e=b;while(1){if(!(a[d>>0]|0)){d=e;break a}d=d+1|0;e=d;if(!(e&3)){f=4;break}}}while(0);if((f|0)==4){while(1){e=c[d>>2]|0;if(!((e&-2139062144^-2139062144)&e+-16843009))d=d+4|0;else break}if((e&255)<<24>>24)do d=d+1|0;while((a[d>>0]|0)!=0)}return d-b|0}function vc(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=l;f=l=l+63&-64;l=l+128|0;if((mb(b,0,102)|0)==(b+101|0)){Ih(f);e=f+12|0;g=e+102|0;do{a[e>>0]=0;e=e+1|0}while((e|0)<(g|0));d=(wb(f,c,d,b,f+12|0)|0)==0;Jh(f);if(!d){e=Qc(f+12|0,b,102)|0;Sd(f+12|0,102)}else e=-1}else e=-1;l=h;return e|0}function wc(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=l;l=l+96|0;if(!(eh(j+32|0,j)|0)){g=b;h=j+32|0;i=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(i|0));wd(j+64|0,j+32|0,f);b=se(b+32|0,c,d,e,j+64|0,f,j)|0;Sd(j,32);Sd(j+32|0,32);Sd(j+64|0,24)}else b=-1;l=j;return b|0}function xc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;do if(!(c>>>0>64|(d+-1|0)>>>0>63)){if(d>>>0>=256)ba(33636,33656,75,33829);if(c>>>0>=256)ba(33736,33656,76,33829);if((b|0)==0|(c|0)==0){Mb(a,d&255,e,f);a=0;break}else{nb(a,d&255,b,c&255,e,f);a=0;break}}else a=-1;while(0);return a|0}function yc(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=l;g=l=l+63&-64;l=l+240|0;e=g+200|0;d=e+32|0;do{a[e>>0]=a[c>>0]|0;e=e+1|0;c=c+1|0}while((e|0)<(d|0));a[g+200>>0]=a[g+200>>0]&-8;a[g+200+31>>0]=a[g+200+31>>0]&63|64;ab(g+40|0,g+200|0);qd(g,g+40+40|0,g+40+80|0);Ja(b,g);l=f;return 0}function zc(a){a=a|0;var b=0,c=0,e=0,f=0,g=0,h=0,i=0;g=d[a+7>>0]|0;h=vf(d[a+6>>0]|0|0,0,8)|0;i=z;f=vf(d[a+5>>0]|0|0,0,16)|0;i=i|z;e=vf(d[a+4>>0]|0|0,0,24)|0;i=i|z|(d[a+3>>0]|0);c=vf(d[a+2>>0]|0|0,0,40)|0;i=i|z;b=vf(d[a+1>>0]|0|0,0,48)|0;i=i|z;a=vf(d[a>>0]|0|0,0,56)|0;z=i|z;return h|g|f|e|c|b|a|0}function Ac(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=fg(f|0,g|0,-16,-1)|0;a=Zb(a,0,e,d,z,e+f+-16|0,h,i,j,k,l)|0}else a=-1;if(b|0){k=(a|0)==0;g=fg(f|0,g|0,-16,-1)|0;c[b>>2]=k?g:0;c[b+4>>2]=k?z:0}return a|0}function Bc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=fg(f|0,g|0,-16,-1)|0;a=lb(a,0,e,d,z,e+f+-16|0,h,i,j,k,l)|0}else a=-1;if(b|0){k=(a|0)==0;g=fg(f|0,g|0,-16,-1)|0;c[b>>2]=k?g:0;c[b+4>>2]=k?z:0}return a|0}function Cc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=fg(f|0,g|0,-16,-1)|0;a=zb(a,0,e,d,z,e+f+-16|0,h,i,j,k,l)|0}else a=-1;if(b|0){k=(a|0)==0;g=fg(f|0,g|0,-16,-1)|0;c[b>>2]=k?g:0;c[b+4>>2]=k?z:0}return a|0}function Dc(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0;if(!(f>>>0<2147483647&f<<1>>>0<c>>>0))Z();if(!f)c=0;else{g=0;c=0;while(1){h=d[e+g>>0]|0;a[b+c>>0]=(h>>>4)+87+(((h>>>4)+65526|0)>>>8&217);a[b+(c|1)>>0]=(((h&15)<<8)+22272+((h&15)+65526&55552)|0)>>>8;c=g+1|0;if((c|0)==(f|0)){c=f<<1;break}else{g=c;c=c<<1}}}a[b+c>>0]=0;return b|0}function Ec(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0;do if(!((b+-1|0)>>>0>63|g>>>0>64)){if(b>>>0>=256)ba(33636,33656,35,33756);if(g>>>0<256){Yb(a,c,f,b&255,d,e,g&255,h,i);j=0;break}else ba(33736,33656,36,33756)}else j=-1;while(0);return j|0}function Fc(a,b){a=a|0;b=b|0;c[a>>2]=1634760805;c[a+4>>2]=857760878;c[a+8>>2]=2036477234;c[a+12>>2]=1797285236;c[a+16>>2]=Rg(b)|0;c[a+20>>2]=Rg(b+4|0)|0;c[a+24>>2]=Rg(b+8|0)|0;c[a+28>>2]=Rg(b+12|0)|0;c[a+32>>2]=Rg(b+16|0)|0;c[a+36>>2]=Rg(b+20|0)|0;c[a+40>>2]=Rg(b+24|0)|0;c[a+44>>2]=Rg(b+28|0)|0;return}function Gc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;do if(!(c>>>0>64|(d+-1|0)>>>0>63)){if(d>>>0>=256)ba(33636,33656,52,33797);if(c>>>0>=256)ba(33736,33656,53,33797);if((b|0)==0|(c|0)==0){Hc(a,d&255);a=0;break}else{Sb(a,d&255,b,c&255);a=0;break}}else a=-1;while(0);return a|0}function Hc(b,c){b=b|0;c=c|0;var d=0,e=0,f=0;e=l;f=l=l+63&-64;l=l+64|0;if((c+-1&255)>63)Z();else{a[f>>0]=c;a[f+1>>0]=0;a[f+2>>0]=1;a[f+3>>0]=1;Vg(f+4|0);bf(f+8|0);c=f+16|0;d=c+48|0;do{a[c>>0]=0;c=c+1|0}while((c|0)<(d|0));ud(b,f);l=e;return}}function Ic(b,c){b=b|0;c=c|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+128|0;Fa(f+80|0,c+80|0);la(f+40|0,c,f+80|0);la(f,c+40|0,f+80|0);Ja(b,f);c=(Ve(f+40|0)|0)<<7;a[b+31>>0]=(d[b+31>>0]|0)^c;l=e;return}function Jc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)Z();Xb(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){k=fg(e|0,f|0,16,0)|0;c[b>>2]=k;c[b+4>>2]=z}return 0}function Kc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)Z();yb(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){k=fg(e|0,f|0,16,0)|0;c[b>>2]=k;c[b+4>>2]=z}return 0}function Lc(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;a[b+7>>0]=c;e=yf(c|0,d|0,8)|0;a[b+6>>0]=e;e=yf(c|0,d|0,16)|0;a[b+5>>0]=e;e=yf(c|0,d|0,24)|0;a[b+4>>0]=e;a[b+3>>0]=d;e=yf(c|0,d|0,40)|0;a[b+2>>0]=e;e=yf(c|0,d|0,48)|0;a[b+1>>0]=e;d=yf(c|0,d|0,56)|0;a[b>>0]=d;return}function Mc(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;j=l;i=l=l+63&-64;l=l+32|0;if(!(Ad(i,g,h)|0)){a=Je(a,b,c,d,e,f,i)|0;Sd(i,32)}else a=-1;l=j;return a|0}function Nc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)Z();Kb(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){k=fg(e|0,f|0,16,0)|0;c[b>>2]=k;c[b+4>>2]=z}return 0}function Oc(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;j=l;i=l=l+63&-64;l=l+32|0;if(!(Ad(i,g,h)|0)){Qe(a,b,c,d,e,f,i)|0;Sd(i,32);a=0}else a=-1;l=j;return a|0}function Pc(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;i=l;j=l=l+63&-64;l=l+80|0;if(!((c|0)==0&(d|0)==0)){jg(j+64|0,f);jg(j+64+4|0,g);Fc(j,h);$d(j,e,j+64|0);va(j,b,a,c,d);Sd(j,64)}l=i;return 0}function Qc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=l;f=l=l+63&-64;l=l+16|0;c[f+4>>2]=b;c[f>>2]=d;if(!e)b=0;else{b=0;d=0;do{d=(a[(c[f>>2]|0)+b>>0]^a[(c[f+4>>2]|0)+b>>0])&255|d;b=b+1|0}while((b|0)!=(e|0));b=((d+511|0)>>>8&1)+-1|0}l=g;return b|0}function Rc(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0;e=0;while(1){if(e>>>0<32){f=0;g=0}else break;do{h=e;e=e+1|0;g=(d[c+h>>0]|0)<<f|g;f=f+8|0}while(e>>>0<32&f>>>0<24);i=a;a=bd(a,b,g,f)|0;h=(a|0)==0;b=(h?0:i-a|0)+b|0;if(h){a=0;break}}return a|0}function Sc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;do if(!((b+-1|0)>>>0>63|g>>>0>64)){if(b>>>0>=256)ba(33636,33656,18,33709);if(g>>>0<256){hc(a,c,f,b&255,d,e,g&255);h=0;break}else ba(33736,33656,19,33709)}else h=-1;while(0);return h|0}function Tc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;f=l=l+63&-64;l=l+16|0;g=0;e=0;while(1){if(_f(f,a[d>>0]|0)|0){e=3;break}d=d+1|0;g=c[f>>2]<<e|g;e=e+6|0;if(e>>>0>=30){e=5;break}}if((e|0)==3){c[b>>2]=0;d=0}else if((e|0)==5)c[b>>2]=g;l=h;return d|0}function Uc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;Ef(c,a+((d<<5)+-16<<2)|0);if(d<<1|0){e=0;do{g=e<<4;$e(c,a+(g<<2)|0);Ca(c);f=e<<3;Ef(b+(f<<2)|0,c);$e(c,a+((g|16)<<2)|0);Ca(c);Ef(b+(f+(d<<4)<<2)|0,c);e=e+2|0}while(e>>>0<d<<1>>>0)}return}function Vc(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+160|0;de(c,d,32,0)|0;a[c>>0]=a[c>>0]&-8;a[c+31>>0]=a[c+31>>0]&63|64;ab(f,c);Ic(b,f);Ed(c|0,d|0,32)|0;Ed(c+32|0,b|0,32)|0;l=e;return 0}function Wc(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;g=l;h=l=l+63&-64;l=l+64|0;de(h,d,32,0)|0;d=c;e=h;f=d+32|0;do{a[d>>0]=a[e>>0]|0;d=d+1|0;e=e+1|0}while((d|0)<(f|0));Sd(h,64);h=Yg(b,c)|0;l=g;return h|0}function Xc(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(e>>>0<0|(e|0)==0&d>>>0<32)b=-1;else{If(b,c,d,e,f,g)|0;c=fg(d|0,e|0,-32,-1)|0;Zf(b+16|0,b+32|0,c,z,b)|0;c=b+16|0;do{a[b>>0]=0;b=b+1|0}while((b|0)<(c|0));b=0}return b|0}function Yc(b,c){b=b|0;c=c|0;var d=0,e=0,f=0;e=l;f=l=l+63&-64;l=l+64|0;de(f,c,32,0)|0;a[f>>0]=a[f>>0]&-8;a[f+31>>0]=a[f+31>>0]&63|64;c=f;d=b+32|0;do{a[b>>0]=a[c>>0]|0;b=b+1|0;c=c+1|0}while((b|0)<(d|0));Sd(f,64);l=e;return 0}function Zc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=l;g=l=l+63&-64;l=l+32|0;if(d>>>0<0|(d|0)==0&c>>>0<48)a=-1;else{c=fg(c|0,d|0,-32,-1)|0;d=z;wd(g,b,e);a=Pd(a,b+32|0,c,d,g,b,f)|0}l=h;return a|0}function _c(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+16|0;c[f>>2]=c[b+((d&3)<<2)>>2];c[f+4>>2]=c[b+((d>>>2&3)<<2)>>2];c[f+8>>2]=c[b+((d>>>4&3)<<2)>>2];c[f+12>>2]=c[b+((d>>>6&3)<<2)>>2];Ce(a,f);l=e;return}function $c(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;h=l;i=l=l+63&-64;l=l+80|0;if(!((c|0)==0&(d|0)==0)){jg(i+64|0,f);Fc(i,g);oe(i,e,i+64|0);va(i,b,a,c,d);Sd(i,64)}l=h;return 0}function ad(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;e=l=l+63&-64;l=l+80|0;if(!((a|0)==0|(b|0)==0)){d=ic(a,c[a+8>>2]|0)|0;if(!d){Na(e,b,c[a+28>>2]|0);Sd(e+64|0,8);gc(e,a);Sd(e,72);d=0}}else d=-25;l=f;return d|0}function bd(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;a:do if(e){f=0;while(1){if(!c){b=0;break a}g=b+1|0;a[b>>0]=a[34193+(d&63)>>0]|0;f=f+6|0;if(f>>>0>=e>>>0){b=g;break}else{d=d>>>6;c=c+-1|0;b=g}}}while(0);return b|0}function cd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=fg(c[a+64>>2]|0,c[a+64+4>>2]|0,b|0,d|0)|0;f=z;c[a+64>>2]=e;c[a+64+4>>2]=f;d=fg((f>>>0<d>>>0|(f|0)==(d|0)&e>>>0<b>>>0)&1|0,0,c[a+72>>2]|0,c[a+72+4>>2]|0)|0;c[a+72>>2]=d;c[a+72+4>>2]=z;return}function dd(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,m=0;k=l;m=l=l+63&-64;l=l+16|0;Ih(m);j=_a(m,a,b,c,d,e,f,g,h,i,j)|0;Jh(m);l=k;return j|0}function ed(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;i=l;h=l=l+63&-64;l=l+32|0;if(!(Cd(h,f,g)|0)){a=Lf(a,b,c,d,e,h)|0;Sd(h,32)}else a=-1;l=i;return a|0}function fd(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=l;g=l=l+63&-64;l=l+16|0;e=10;while(1){d=e+-1|0;a[g+d>>0]=(c>>>0)%10|0|48;if(c>>>0>9&(d|0)!=0){e=d;c=(c>>>0)/10|0}else break}e=11-e|0;fb(b|0,g+d|0,e|0)|0;a[b+e>>0]=0;l=f;return}function gd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;i=l;h=l=l+63&-64;l=l+32|0;if(!(Cd(h,f,g)|0)){a=Uf(a,b,c,d,e,h)|0;Sd(h,32)}else a=-1;l=i;return a|0}function hd(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;i=l;j=l=l+63&-64;l=l+32|0;Ga(j,e,h,0)|0;h=ef(a,b,c,d,e+16|0,f,g,j)|0;Sd(j,32);l=i;return h|0}function id(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+64|0;if(!((b|0)==0&(c|0)==0)){Fc(g,e);oe(g,d,0);Pb(a|0,0,b|0)|0;va(g,a,a,b,c);Sd(g,64)}l=f;return 0}function jd(a){a=a|0;var b=0,d=0;d=a+15&-16|0;b=c[i>>2]|0;a=b+d|0;if((d|0)>0&(a|0)<(b|0)|(a|0)<0){W()|0;_(12);return -1}c[i>>2]=a;if((a|0)>(V()|0)?(U()|0)==0:0){_(12);c[i>>2]=b;return -1}return b|0}function kd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+64|0;if(!((b|0)==0&(c|0)==0)){Fc(g,e);$d(g,d,0);Pb(a|0,0,b|0)|0;va(g,a,a,b,c);Sd(g,64)}l=f;return 0}function ld(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;i=l;j=l=l+63&-64;l=l+32|0;Da(j,e,h,0)|0;h=jf(a,b,c,d,e+16|0,f,g,j)|0;l=i;return h|0}function md(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0;i=l;l=l+32|0;if(!(Jg(i,g,h)|0)){a=mf(a,b,c,d,e,f,i)|0;Sd(i,32)}else a=-1;l=i;return a|0}function nd(b){b=b|0;var c=0,d=0,e=0,f=0,g=0;d=32;c=1;e=0;while(1){d=d+-1|0;f=a[b+d>>0]|0;g=a[34308+d>>0]|0;c=c&255;e=((f&255)-(g&255)|0)>>>8&c|e&255;if(!d)break;else c=(((g^f)&255)+65535|0)>>>8&c}return ((e|0)==0)<<31>>31|0}function od(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;e=l;d=l=l+63&-64;l=l+16|0;f=sf(d,b)|0;c[8326]=f;if(!f)d=c[d>>2]|0;else{c[d>>2]=0;d=0}c[a>>2]=d;c[a+4>>2]=d;c[a+8>>2]=d|0?b:0;l=e;return d|0}function pd(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0;i=l;l=l+32|0;if(!(Jg(i,g,h)|0)){qf(a,b,c,d,e,f,i)|0;Sd(i,32);a=0}else a=-1;l=i;return a|0}function qd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+80|0;Gb(e+40|0,c,b);Fb(e,c,b);Fa(e,e);la(a,e+40|0,e);l=d;return}function rd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=fg(c|0,d|0,-16,-1)|0;a=Mc(a,b+16|0,b,d,z,e,f,g)|0}return a|0}function sd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=fg(c|0,d|0,-16,-1)|0;a=Je(a,b+16|0,b,d,z,e,f)|0}return a|0}function td(a){a=a|0;c[a+32>>2]=0;c[a+32+4>>2]=0;c[a>>2]=c[8238];c[a+4>>2]=c[8239];c[a+8>>2]=c[8240];c[a+12>>2]=c[8241];c[a+16>>2]=c[8242];c[a+20>>2]=c[8243];c[a+24>>2]=c[8244];c[a+28>>2]=c[8245];return 0}function ud(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;ff(a);d=0;do{g=Te(b+(d<<3)|0)|0;e=a+(d<<3)|0;f=c[e+4>>2]^z;c[e>>2]=c[e>>2]^g;c[e+4>>2]=f;d=d+1|0}while((d|0)!=8);return}function vd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=fg(c|0,d|0,-16,-1)|0;a=Ya(a,b+16|0,b,d,z,e,f)|0}return a|0}function wd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+384|0;Dg(e,0,0,24)|0;rg(e,b,32,0)|0;rg(e,c,32,0)|0;Tg(e,a,24)|0;l=d;return}function xd(b){b=b|0;var c=0,d=0,e=0;d=0;while(1){c=0;e=0;do{e=(a[16+(d<<5)+c>>0]^a[b+c>>0])&255|e;c=c+1|0}while((c|0)!=32);d=d+1|0;if(!e){c=1;break}if(d>>>0>=12){c=0;break}}return c|0}function yd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=l;h=l=l+63&-64;l=l+1408|0;da(h,f)|0;ea(a,b,c,d,e,h)|0;l=g;return 0}function zd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+32|0;Ga(g,d,e,0)|0;e=xg(a,b,c,d+16|0,g)|0;Sd(g,32);l=f;return e|0}function Ad(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=l;d=l=l+63&-64;l=l+32|0;if(!(Od(d,c,b)|0)){Da(a,35976,d,0)|0;a=0}else a=-1;l=e;return a|0}function Bd(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if((l|0)==1)a=ec(a,b,d,e,f,g,h,i,j,k,1)|0;else{c[8326]=22;a=-1}return a|0}function Cd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=l;d=l=l+63&-64;l=l+32|0;if(!(Od(d,c,b)|0)){Ga(a,35912,d,0)|0;a=0}else a=-1;l=e;return a|0}function Dd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=l;l=l+32|0;je(f,b,c,d,e)|0;e=Ne(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Qc(f,a,32)|0);l=f;return e|0}function Ed(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0}b=e}else fb(b,c,d)|0;return b|0}function Fd(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=O(b&65535,a&65535)|0;e=(c>>>16)+(O(b&65535,a>>>16)|0)|0;d=O(b>>>16,a&65535)|0;return (z=(e>>>16)+(O(b>>>16,a>>>16)|0)+(((e&65535)+d|0)>>>16)|0,e+d<<16|c&65535|0)|0}function Gd(a,b){a=a|0;b=b|0;var d=0;d=c[a+4>>2]^c[b+4>>2];c[a>>2]=c[a>>2]^c[b>>2];c[a+4>>2]=d;d=c[a+8+4>>2]^c[b+8+4>>2];c[a+8>>2]=c[a+8>>2]^c[b+8>>2];c[a+8+4>>2]=d;return}function Hd(a,b){a=a|0;b=b|0;var d=0;d=c[a+4>>2]&c[b+4>>2];c[a>>2]=c[a>>2]&c[b>>2];c[a+4>>2]=d;d=c[a+8+4>>2]&c[b+8+4>>2];c[a+8>>2]=c[a+8>>2]&c[b+8>>2];c[a+8+4>>2]=d;return}function Id(a,b){a=a|0;b=b|0;la(a,b,b+120|0);la(a+40|0,b+40|0,b+80|0);la(a+80|0,b+80|0,b+120|0);la(a+120|0,b,b+40|0);return}function Jd(a,b){a=a|0;b=b|0;var d=0;d=c[a+4>>2]|c[b+4>>2];c[a>>2]=c[a>>2]|c[b>>2];c[a+4>>2]=d;d=c[a+8+4>>2]|c[b+8+4>>2];c[a+8>>2]=c[a+8>>2]|c[b+8>>2];c[a+8+4>>2]=d;return}function Kd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=l;l=l+64|0;ie(f,b,c,d,e)|0;e=Me(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Qc(f,a,64)|0);l=f;return e|0}function Ld(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=l;l=l+32|0;ge(f,b,c,d,e)|0;e=Ne(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Qc(f,a,32)|0);l=f;return e|0}function Md(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else a=Oc(a+16|0,a,b,c,d,e,f,g)|0;return a|0}function Nd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else{Qe(a+16|0,a,b,c,d,e,f)|0;a=0}return a|0}function Od(a,b,c){a=a|0;b=b|0;c=c|0;if(!(Ka(a,b,c)|0)){b=0;c=0;do{c=d[a+b>>0]|0|c;b=b+1|0}while((b|0)!=32);b=0-((c+511|0)>>>8&1)|0}else b=-1;return b|0}function Pd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=fg(c|0,d|0,-16,-1)|0;a=md(a,b+16|0,b,d,z,e,f,g)|0}return a|0}function Qd(a){a=a|0;var b=0,c=0,e=0,f=0;c=d[a>>0]|0;e=vf(d[a+1>>0]|0|0,0,8)|0;f=z;b=vf(d[a+2>>0]|0|0,0,16)|0;f=f|z;a=vf(d[a+3>>0]|0|0,0,24)|0;z=f|z;return e|c|b|a|0}function Rd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+16|0;he(g,b,c,d,e)|0;e=Oe(a,g)|0;l=f;return e|0}function Sd(b,d){b=b|0;d=d|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+16|0;c[f>>2]=b;if(d|0){b=0;do{a[(c[f>>2]|0)+b>>0]=0;b=b+1|0}while((b|0)!=(d|0))}l=e;return}function Td(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=fg(c|0,d|0,-16,-1)|0;a=mf(a,b+16|0,b,d,z,e,f)|0}return a|0}function Ud(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=0;do{g=b+(d<<3)|0;e=a+(d<<3)|0;f=c[e+4>>2]^c[g+4>>2];c[e>>2]=c[e>>2]^c[g>>2];c[e+4>>2]=f;d=d+1|0}while((d|0)!=128);return}function Vd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+32|0;Da(g,d,e,0)|0;e=Cg(a,b,c,d+16|0,g)|0;l=f;return e|0}function Wd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=fg(c|0,d|0,-16,-1)|0;a=$a(a,b+16|0,b,d,z,e,f)|0}return a|0}function Xd(a,b){a=a|0;b=b|0;Gb(a,b+40|0,b);Fb(a+40|0,b+40|0,b);qc(a+80|0,b+80|0);la(a+120|0,b+120|0,1232);return}function Yd(b){b=b|0;var c=0;c=a[n+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[n+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[n+(b>>>24)>>0]|0)+24|0}function Zd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+1408|0;da(g,e)|0;fa(a,b,c,d,g)|0;l=f;return 0}function _d(a,b){a=a|0;b=b|0;var c=0;c=Te(a)|0;c=yf(c|0,z|0,b|0)|0;re(a,c,z);c=Te(a+8|0)|0;b=yf(c|0,z|0,b|0)|0;re(a+8|0,b,z);return}function $d(a,b,d){a=a|0;b=b|0;d=d|0;if(!d){c[a+48>>2]=0;d=0}else{c[a+48>>2]=Rg(d)|0;d=Rg(d+4|0)|0}c[a+52>>2]=d;c[a+56>>2]=Rg(b)|0;c[a+60>>2]=Rg(b+4|0)|0;return}function ae(a,b){a=a|0;b=b|0;var c=0;c=Te(a)|0;c=vf(c|0,z|0,b|0)|0;re(a,c,z);c=Te(a+8|0)|0;b=vf(c|0,z|0,b|0)|0;re(a+8|0,b,z);return}function be(b,c){b=b|0;c=c|0;var d=0,e=0;e=l;l=l+64|0;pe(b,e)|0;b=e;d=c+32|0;do{a[c>>0]=a[b>>0]|0;c=c+1|0;b=b+1|0}while((c|0)<(d|0));l=e;return 0}function ce(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=fg(c|0,d|0,a|0,b|0)|0;e=z;d=vf(a|0,b|0,1)|0;d=af(d&-2|0,z&1|0,c|0,0)|0;d=fg(f|0,e|0,d|0,z|0)|0;return d|0}function de(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+208|0;me(f)|0;Ea(f,b,c,d)|0;Be(f,a)|0;l=e;return 0}function ee(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+112|0;td(f)|0;La(f,b,c,d)|0;Fe(f,a)|0;l=e;return 0}function fe(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else{Qa(a+16|0,a,b,c,d,e,f)|0;a=0}return a|0}function ge(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=l;l=l+208|0;qb(f,e,32)|0;wg(f,b,c,d)|0;qe(f,a)|0;l=f;return 0}function he(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=l;g=l=l+63&-64;l=l+96|0;bc(g,e);Ma(g,b,c,d);Ua(g,a);l=f;return 0}function ie(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=l;l=l+416|0;pb(f,e,32)|0;zg(f,b,c,d)|0;pe(f,a)|0;l=f;return 0}function je(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=l;l=l+416|0;Pg(f,e,32)|0;Gg(f,b,c,d)|0;be(f,a)|0;l=f;return 0}function ke(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=l;f=l=l+63&-64;l=l+64|0;Be(a,f)|0;tb(b,c,f,64,0,d,1);l=e;return 0}function le(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=l;e=l=l+63&-64;l=l+64|0;Be(a,e)|0;c=vb(b,e,64,0,c,1)|0;l=d;return c|0}function me(a){a=a|0;var b=0,d=0;c[a+64>>2]=0;c[a+64+4>>2]=0;c[a+64+8>>2]=0;c[a+64+12>>2]=0;b=400;d=a+64|0;do{c[a>>2]=c[b>>2];a=a+4|0;b=b+4|0}while((a|0)<(d|0));return 0}function ne(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;if(d>>>3|0){e=0;do{f=b+(e<<3)|0;Lc(a+(e<<3)|0,c[f>>2]|0,c[f+4>>2]|0);e=e+1|0}while((e|0)!=(d>>>3|0))}return}function oe(a,b,d){a=a|0;b=b|0;d=d|0;if(!d)d=0;else d=Rg(d)|0;c[a+48>>2]=d;c[a+52>>2]=Rg(b)|0;c[a+56>>2]=Rg(b+4|0)|0;c[a+60>>2]=Rg(b+8|0)|0;return}function pe(a,b){a=a|0;b=b|0;var c=0;c=l;l=l+64|0;Be(a,c)|0;Ea(a+208|0,c,64,0)|0;Be(a+208|0,b)|0;Sd(c,64);l=c;return 0}function qe(a,b){a=a|0;b=b|0;var c=0;c=l;l=l+32|0;Fe(a,c)|0;La(a+104|0,c,32,0)|0;Fe(a+104|0,b)|0;Sd(c,32);l=c;return 0}function re(b,c,d){b=b|0;c=c|0;d=d|0;a[b>>0]=c;a[b+1>>0]=c>>8;a[b+2>>0]=c>>16;a[b+3>>0]=c>>24;a[b+4>>0]=d;a[b+4+1>>0]=d>>8;a[b+4+2>>0]=d>>16;a[b+4+3>>0]=d>>24;return}function se(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else a=pd(a+16|0,a,b,c,d,e,f,g)|0;return a|0}function te(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else{qf(a+16|0,a,b,c,d,e,f)|0;a=0}return a|0}function ue(a){a=a|0;jg(a,(Rg(a)|0)>>>8);jg(a+4|0,(Rg(a+4|0)|0)>>>8);jg(a+8|0,(Rg(a+8|0)|0)>>>8);jg(a+12|0,(Rg(a+12|0)|0)>>>8);return}function ve(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else{Ta(a+16|0,a,b,c,d,e,f)|0;a=0}return a|0}function we(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;if(d>>>2|0){e=0;do{f=a+(e<<2)|0;c[f>>2]=c[f>>2]^c[b+(e<<2)>>2];e=e+1|0}while((e|0)!=(d>>>2|0))}return}function xe(a){a=a|0;return (0-(a^62)|0)>>>8&43^43|(a+65510|0)>>>8&255&a+65|(0-(a^63)|0)>>>8&47^47|(a+65484|0)>>>8&a+71&((a+65510|0)>>>8&255^255)|(a+65474|0)>>>8&a+252&((a+65484|0)>>>8&255^255)|0}function ye(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;d=l=l+63&-64;l=l+128|0;Ue(d,b);jc(a,d);l=c;return}function ze(a,b){a=a|0;b=b|0;la(a,b,b+120|0);la(a+40|0,b+40|0,b+80|0);la(a+80|0,b+80|0,b+120|0);return}function Ae(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;d=l=l+63&-64;l=l+32|0;gf(d,32);Vc(a,b,d)|0;Sd(d,32);l=c;return 0}function Be(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;d=l=l+63&-64;l=l+704|0;pc(a,d);ne(b,a,64);Sd(d,704);Sd(a,208);l=c;return 0}function Ce(a,b){a=a|0;b=b|0;var d=0;d=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=d;d=c[b+8+4>>2]|0;c[a+8>>2]=c[b+8>>2];c[a+8+4>>2]=d;return}function De(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=0;do{f=zc(b+(d<<3)|0)|0;e=a+(d<<3)|0;c[e>>2]=f;c[e+4>>2]=z;d=d+1|0}while((d|0)!=16);return}function Ee(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=0;do{f=Te(b+(d<<3)|0)|0;e=a+(d<<3)|0;c[e>>2]=f;c[e+4>>2]=z;d=d+1|0}while((d|0)!=128);return}function Fe(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;d=l=l+63&-64;l=l+288|0;ac(a,d);uf(b,a);Sd(d,288);Sd(a,104);l=c;return 0}function Ge(a){a=a|0;var b=0,c=0;b=l;c=l=l+63&-64;l=l+32|0;Ja(c,a);a=Ne(c,35928)|0;l=b;return a|0}function He(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if(e>>>0>0|(e|0)==0&d>>>0>4294967295){c[8326]=27;a=-1}else a=((qh(a,b,d)|0)!=0)<<31>>31;return a|0}function Ie(a){a=a|0;var b=0;if(a>>>0<2)a=0;else{do b=Mh()|0;while(b>>>0<(((0-a|0)>>>0)%(a>>>0)|0)>>>0);a=(b>>>0)%(a>>>0)|0}return a|0}function Je(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Ya(a,b,c,d,e,f,g)|0}function Ke(a,b,c){a=a|0;b=b|0;c=c|0;sb(a,b,c&255);sb(a+40|0,b+40|0,c&255);sb(a+80|0,b+80|0,c&255);return}function Le(a){a=a|0;var b=0;b=~c[a+4>>2];c[a>>2]=~c[a>>2];c[a+4>>2]=b;b=~c[a+8+4>>2];c[a+8>>2]=~c[a+8>>2];c[a+8+4>>2]=b;return}function Me(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=64);return ((d+511|0)>>>8&1)+-1|0}function Ne(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=32);return ((d+511|0)>>>8&1)+-1|0}function Oe(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=16);return ((d+511|0)>>>8&1)+-1|0}function Pe(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=l;l=l+16|0;za(a,b,d,e,f|0)|0;l=f;return (z=c[f+4>>2]|0,c[f>>2]|0)|0}function Qe(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Qa(a,b,c,d,e,f,g)|0;return 0}function Re(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;if(d>>>2|0){e=0;do{c[a+(e<<2)>>2]=c[b+(e<<2)>>2];e=e+1|0}while((e|0)!=(d>>>2|0))}return}function Se(a,b){a=a|0;b=b|0;var d=0,e=0;d=0;do{e=b+(d<<3)|0;re(a+(d<<3)|0,c[e>>2]|0,c[e+4>>2]|0);d=d+1|0}while((d|0)!=128);return}function Te(a){a=a|0;z=d[a+4>>0]|d[a+4+1>>0]<<8|d[a+4+2>>0]<<16|d[a+4+3>>0]<<24;return d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24|0}function Ue(a,b){a=a|0;b=b|0;qc(a,b);qc(a+40|0,b+40|0);qc(a+80|0,b+80|0);return}function Ve(b){b=b|0;var c=0,d=0;d=l;c=l=l+63&-64;l=l+32|0;Ja(c,b);l=d;return a[c>>0]&1|0}function We(){}function Xe(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){z=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}z=(b|0)<0?-1:0;return b>>c-32|0}function Ye(a){a=a|0;lg(a);Bf(a+40|0);Bf(a+80|0);lg(a+120|0);return}function Ze(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=yf(a|0,b|0,c|0)|0;e=z;c=vf(a|0,b|0,64-c|0)|0;z=z|e;return c|d|0}function _e(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=vf(a|0,b|0,c|0)|0;e=z;c=yf(a|0,b|0,64-c|0)|0;z=z|e;return c|d|0}function $e(a,b){a=a|0;b=b|0;var d=0,e=0;d=0;do{e=a+(d<<2)|0;c[e>>2]=c[e>>2]^c[b+(d<<2)>>2];d=d+1|0}while((d|0)!=16);return}function af(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=Fd(a,c)|0;f=z;return (z=(O(b,c)|0)+(O(d,a)|0)+f|f&0,e|0|0)|0}function bf(b){b=b|0;a[b>>0]=0;a[b+1>>0]=0;a[b+2>>0]=0;a[b+3>>0]=0;a[b+4>>0]=0;a[b+4+1>>0]=0;a[b+4+2>>0]=0;a[b+4+3>>0]=0;return}function cf(a,b,c){a=a|0;b=b|0;c=c|0;if(c>>>0<256)return Db(a,b,c&255)|0;else ba(33636,33656,102,33875);return 0}function df(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;b=vf(b&255|0,0,8)|0;d=z;c=vf(c&255|0,0,16)|0;z=d|z;return b|a&255|c|0}function ef(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return Pa(a,b,c,d,e,f,g,h)|0}function ff(a){a=a|0;var b=0,d=0;Pb(a+64|0,0,320)|0;b=400;d=a+64|0;do{c[a>>2]=c[b>>2];a=a+4|0;b=b+4|0}while((a|0)<(d|0));return}function gf(b,c){b=b|0;c=c|0;var d=0;if(c|0){d=0;do{a[b+d>>0]=Mh()|0;d=d+1|0}while((d|0)!=(c|0))}return}function hf(b,c){b=b|0;c=c|0;var d=0;d=c;do{if(!d){c=0;break}d=d+-1|0;c=b+d|0}while((a[c>>0]|0)!=36);return c|0}function jf(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return Pc(a,b,c,d,e,f,g,h)|0}function kf(b,c){b=b|0;c=c|0;var d=0;d=b+48|0;b=d+16|0;do{a[d>>0]=a[c>>0]|0;d=d+1|0;c=c+1|0}while((d|0)<(b|0));return}function lf(b,c){b=b|0;c=c|0;var d=0;d=b+32|0;b=d+16|0;do{a[d>>0]=a[c>>0]|0;d=d+1|0;c=c+1|0}while((d|0)<(b|0));return}function mf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return $a(a,b,c,d,e,f,g)|0}function nf(){var a=0,b=0;a=l;b=l=l+63&-64;l=l+16|0;Xg(b);if(c[b>>2]|0)Xg(b);l=a;return}function of(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return ed(a,b,c,d,e,f,g)|0}function pf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return $c(a,b,c,d,e,f,g)|0}function qf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Ta(a,b,c,d,e,f,g)|0;return 0}function rf(){var a=0;a=Y(30)|0;if((a|0)>0)c[8833]=a;else a=c[8833]|0;if(a>>>0<16)Z();else{gf(35960,16);return}}function sf(a,b){a=a|0;b=b|0;var d=0;if(b>>>0<=4294967168?(d=ob(b)|0,(d|0)!=0):0){c[a>>2]=d;a=0}else a=12;return a|0}function tf(a,b){a=a|0;b=b|0;var d=0;d=0;do{c[a+(d<<2)>>2]=ug(b+(d<<2)|0)|0;d=d+1|0}while((d|0)!=16);return}function uf(a,b){a=a|0;b=b|0;var d=0;d=0;do{gg(a+(d<<2)|0,c[b+(d<<2)>>2]|0);d=d+1|0}while((d|0)!=8);return}function vf(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){z=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}z=a<<c-32;return 0}function wf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return gd(a,b,c,d,e,f,g)|0}function xf(){var a=0;if(!(c[8832]|0)){zh();Oh();rf();c[8832]=1;a=0}else a=1;return a|0}function yf(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){z=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}z=0;return b>>>c-32|0}function zf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Sc(a,b,c,d,e,f,g)|0}function Af(a,b,c){a=a|0;b=b|0;c=c|0;if(c>>>0<1|(c|0)==1&b>>>0<0){gf(a,b);return}else ba(35141,35161,200,35187)}function Bf(a){a=a|0;var b=0;c[a>>2]=1;a=a+4|0;b=a+36|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function Cf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return _b(a,b,c,d,e,f,g)|0}function Df(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return ld(a,b,c,d,e,0,0,f)|0}function Ef(a,b){a=a|0;b=b|0;var d=0;d=0;do{c[a+(d<<2)>>2]=c[b+(d<<2)>>2];d=d+1|0}while((d|0)!=16);return}function Ff(a){a=a|0;Bf(a);Bf(a+40|0);lg(a+80|0);return}function Gf(a,b){a=a|0;b=b|0;var d=0;d=c[a>>2]|0;if((b|0)!=0&(d|0)!=0)Sd(c[d+4>>2]|0,c[a+8>>2]<<10);return}function Hf(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return ub(a,b,1,c,d,e,16,f,g,0,0)|0}function If(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return hd(a,b,c,d,e,0,0,f)|0}function Jf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;tb(a,b,c,d,e,f,0);return 0}function Kf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Ib(a,b,c,d,e,f)|0}function Lf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return rc(a,b,c,d,e,f)|0}function Mf(a){a=a|0;lg(a);Bf(a+40|0);Bf(a+80|0);return}function Nf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return $c(a,b,c,d,e,0,f)|0}function Of(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Pa(a,b,c,d,e,0,0,f)|0}function Pf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return vb(a,b,c,d,e,0)|0}function Qf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Jf(a,b,c,d,e,f)|0;return 0}function Rf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Rd(a,b,c,d,e)|0}function Sf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return ub(a,b,1,c,d,e,16,0,32,f,128)|0}function Tf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Pc(a,b,c,d,e,0,0,f)|0}function Uf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Xc(a,b,c,d,e,f)|0}function Vf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Lf(a,b,c,d,e,f)|0}function Wf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return If(a,b,c,d,e,f)|0}function Xf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Pf(a,b,c,d,e)|0}function Yf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return mc(a,b,c,d,e,f)|0}function Zf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return he(a,b,c,d,e)|0}function _f(a,b){a=a|0;b=b|0;b=mb(34193,b&255,65)|0;c[a>>2]=(b|0)==0?0:b-34193|0;return ((b|0)==0)<<31>>31|0}function $f(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Rf(a,b,c,d,e)|0}function ag(a,b){a=a|0;b=b|0;me(a)|0;if(b|0)Ea(a,34340,34,0)|0;return}function bg(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Uf(a,b,c,d,e,f)|0}function cg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (z=d,a-c>>>0|0)|0}function dg(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return kc(a,b,c,d,e,f)|0}function eg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Bg(a,b,c,d)|0}function fg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return (z=b+d+(a+c>>>0>>>0<a>>>0|0)>>>0,a+c>>>0|0)|0}function gg(b,c){b=b|0;c=c|0;a[b+3>>0]=c;a[b+2>>0]=c>>>8;a[b+1>>0]=c>>>16;a[b>>0]=c>>>24;return}function hg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Dd(a,b,c,d,e)|0}function ig(b){b=b|0;if(a[b+356>>0]|0)rh(b);c[b+80>>2]=-1;c[b+80+4>>2]=-1;return}function jg(b,c){b=b|0;c=c|0;a[b>>0]=c;a[b+1>>0]=c>>8;a[b+2>>0]=c>>16;a[b+3>>0]=c>>24;return}function kg(a,b,c){a=a|0;b=b|0;c=c|0;zf(b,32,c,32,0,0,0)|0;return ih(a,b)|0}function lg(a){a=a|0;var b=0;b=a+40|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function mg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ua(a,b,c,d,e)|0;return 0}function ng(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Zf(a,b,c,d,e)|0}function og(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Bb(a,b,c,d);return 0}function pg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return id(a,b,c,d,e)|0}function qg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ke(a,b,c,d)|0;return 0}function rg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;og(a,b,c,d)|0;return 0}function sg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;je(a,b,c,d,e)|0;return 0}function tg(a,b){a=a|0;b=b|0;gf(b,32);return Yg(a,b)|0}function ug(a){a=a|0;return (d[a+2>>0]|0)<<8|(d[a+3>>0]|0)|(d[a+1>>0]|0)<<16|(d[a>>0]|0)<<24|0}function vg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return eg(a,b,c,d)|0}function wg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;La(a,b,c,d)|0;return 0}function xg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return eb(a,b,c,d,e)|0}function yg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return zd(a,b,c,d,e)|0}function zg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ea(a,b,c,d)|0;return 0}function Ag(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return He(a,b,c,d)|0}function Bg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ma(a,b,c,d);return 0}function Cg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return kd(a,b,c,d,e)|0}function Dg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Gc(a,b,c,d)|0}function Eg(a,b){a=a|0;b=b|0;jg(a+12|0,(Rg(a+12|0)|0)+b|0);return}function Fg(a,b,c){a=a|0;b=b|0;c=c|0;return Wc(a,b,c)|0}function Gg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;zg(a,b,c,d)|0;return 0}function Hg(a,b,c){a=a|0;b=b|0;c=c|0;pg(a,b,0,35129,c)|0;return}function Ig(a,b){a=a|0;b=b|0;z=c[a+-64+(b<<7)+4>>2]|0;return c[a+-64+(b<<7)>>2]|0}function Jg(a,b,c){a=a|0;b=b|0;c=c|0;return Cd(a,b,c)|0}function Kg(b,c){b=b|0;c=c|0;b=Hb(b,c)|0;return ((a[b>>0]|0)==(c&255)<<24>>24?b:0)|0}function Lg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Aa(a,b,c,d,12);return 0}function Mg(a){a=a|0;a=yf(a<<24>>24|0,((a<<24>>24|0)<0)<<31>>31|0,63)|0;return a&255|0}function Ng(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Aa(a,b,c,d,8);return 0}function Og(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Aa(a,b,c,d,20);return 0}function Pg(a,b,c){a=a|0;b=b|0;c=c|0;pb(a,b,c)|0;return 0}function Qg(a,b,c){a=a|0;b=b|0;c=c|0;Vc(a,b,c)|0;return 0}function Rg(a){a=a|0;return d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24|0}function Sg(a,b,c){a=a|0;b=b|0;c=c|0;return le(a,b,c)|0}function Tg(a,b,c){a=a|0;b=b|0;c=c|0;return cf(a,b,c)|0}function Ug(a){a=a|0;var b=0;b=l;l=l+a|0;l=l+15&-16;return b|0}function Vg(b){b=b|0;a[b>>0]=0;a[b+1>>0]=0;a[b+2>>0]=0;a[b+3>>0]=0;return}function Wg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;de(a,b,c,d)|0;return 0}function Xg(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;return}function Yg(a,b){a=a|0;b=b|0;return yc(a,b)|0}function Zg(a,b){a=a|0;b=b|0;return kh(a,b)|0}function _g(a,b){a=a|0;b=b|0;return oh(a,b)|0}function $g(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0)ra(b);mh(a);return}function ah(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return za(a,b,c,d,0)|0}function bh(a,b,c){a=a|0;b=b|0;c=c|0;return Od(a,b,c)|0}function ch(a,b){a=a|0;b=b|0;gf(b,32);return ih(a,b)|0}function dh(a){a=a|0;jg(a+12|0,~(Rg(a+12|0)|0));return}function eh(a,b){a=a|0;b=b|0;return tg(a,b)|0}function fh(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0)ra(b);ra(a);return}function gh(a,b){a=a|0;b=b|0;return Zg(a,b)|0}function hh(a,b){a=a|0;b=b|0;Ed(a|0,b+32|0,32)|0;return 0}function ih(a,b){a=a|0;b=b|0;return Yg(a,b)|0}function jh(a,b){a=a|0;b=b|0;return _g(a,b)|0}function kh(a,b){a=a|0;b=b|0;Ua(a,b);return 0}function lh(a,b){a=a|0;b=b|0;if(!o){o=a;p=b}}function mh(a){a=a|0;c[a+4>>2]=0;c[a>>2]=0;c[a+8>>2]=0;return}function nh(a,b){a=a|0;b=b|0;Ed(a|0,b|0,32)|0;return 0}function oh(a,b){a=a|0;b=b|0;bc(a,b);return 0}function ph(a,b){a=a|0;b=b|0;Ae(a,b)|0;return 0}function qh(a,b,c){a=a|0;b=b|0;c=c|0;return ib(a,b,c)|0}function rh(a){a=a|0;c[a+88>>2]=-1;c[a+88+4>>2]=-1;return}function sh(a,b){a=a|0;b=b|0;return ((a|0)!=0|(b|0)!=0)&1|0}function th(a,b){a=a|0;b=b|0;return (((b^a)&255)+-1|0)>>>31&255|0}function uh(a,b){a=a|0;b=b|0;fb(a|0,b|0,1024)|0;return}function vh(a){a=a|0;me(a)|0;return 0}function wh(a,b){a=a|0;b=b|0;l=a;m=b}function xh(a,b){a=a|0;b=b|0;return a>>>(32-b|0)|a<<b|0}function yh(a){a=a|0;vh(a)|0;return 0}function zh(){nf();return}function Ah(a,b){a=a|0;b=b|0;return a<<32-b|a>>>b|0}function Bh(a){a=a|0;return hf(a,(uc(a)|0)+1|0)|0}function Ch(a){a=a|0;gf(a,16);return}function Dh(){return 1073741824}function Eh(a){a=a|0;Pb(a|0,0,1024)|0;return}function Fh(){return 524288}function Gh(a){a=a|0;gf(a,32);return}function Hh(){return 16777216}function Ih(a){a=a|0;mh(a);return}function Jh(a){a=a|0;$g(a);return}function Kh(){return 32768}function Lh(){return 34258}function Mh(){return X(0)|0}function Nh(){return 102}function Oh(){aa(1);return}function Ph(){return 33554432}function Qh(){return 1408}function Rh(){return 536870912}function Sh(){return 12}function Th(){return 134217728}function Uh(){return -2147483648}function Vh(){return 34383}function Wh(){return 416}function Xh(a){a=a|0;l=a}function Yh(){return 34129}function Zh(a){a=a|0;z=a}function _h(){return 34262}function $h(){return 6}function ai(){return 256}function bi(){return 104}function ci(){return 384}function di(){return 35336}function ei(){return 34290}function fi(){return 34273}function gi(){return 8192}function hi(){return 4}function ii(){return 9}function ji(){return 34374}function ki(){return 34175}function li(){return 34185}function mi(){return 3}function ni(){return 35199}function oi(){return 34300}function pi(){return 1}function qi(){return 33908}function ri(){return 33484}function si(){return 208}function ti(){return 128}function ui(){return -1}function vi(){return 34107}function wi(){return 33498}function xi(){return 34115}function yi(){return 8}function zi(){return 24}function Ai(){return z|0}function Bi(){return 48}function Ci(){return 16}function Di(){return l|0}function Ei(){return 64}function Fi(){return 32}function Gi(){return 0}

// EMSCRIPTEN_END_FUNCS
return{_crypto_onetimeauth_poly1305_init:_g,_crypto_hash_sha512_init:me,_crypto_pwhash_scryptsalsa208sha256:Ub,_crypto_scalarmult_primitive:_h,_crypto_scalarmult_base:ih,_crypto_auth_bytes:Fi,_crypto_stream_chacha20_keybytes:Fi,_crypto_aead_chacha20poly1305_decrypt_detached:zb,_crypto_kdf_blake2b_bytes_min:Ci,_crypto_box_curve25519xchacha20poly1305_open_easy_afternm:sd,_crypto_generichash_blake2b_keybytes_max:Ei,_crypto_box_beforenmbytes:Fi,_crypto_stream_salsa208:db,___udivmoddi4:za,_crypto_sign_ed25519_sk_to_curve25519:Yc,_crypto_stream_chacha20_ietf_xor_ic:pf,_crypto_secretbox_xsalsa20poly1305_open:rc,_crypto_box_zerobytes:Fi,_crypto_secretbox_xchacha20poly1305_open_detached:Ya,_crypto_stream_salsa208_keybytes:Fi,_crypto_hash_sha512_bytes:Ei,stackSave:Di,_crypto_stream_xsalsa20_xor_ic:hd,_crypto_core_hsalsa20_keybytes:Fi,_crypto_sign_primitive:oi,_crypto_scalarmult_curve25519_bytes:Fi,_crypto_scalarmult_curve25519_scalarbytes:Fi,_crypto_pwhash_scryptsalsa208sha256_saltbytes:Fi,_crypto_pwhash_argon2i_str_verify:He,_crypto_box_curve25519xchacha20poly1305_secretkeybytes:Fi,_crypto_auth_hmacsha512_keygen:Gh,_crypto_box_detached_afternm:qf,_crypto_stream_salsa20_xor_ic:ef,_crypto_auth_hmacsha256_init:qb,_crypto_stream_chacha20_ietf_xor:Nf,_crypto_auth_hmacsha512256_final:be,_crypto_stream_aes128ctr_xor_afternm:ea,setThrew:lh,_crypto_aead_chacha20poly1305_ietf_nsecbytes:Gi,_crypto_kdf_blake2b_derive_from_key:Ib,_crypto_box_curve25519xsalsa20poly1305_keypair:tg,_crypto_hash_sha256_init:td,_crypto_stream_xsalsa20_noncebytes:zi,_crypto_generichash_keybytes_max:Ei,_crypto_verify_64:Me,stackAlloc:Ug,_crypto_box_curve25519xchacha20poly1305_keypair:tg,_crypto_box_curve25519xsalsa20poly1305_open:ed,_crypto_pwhash_memlimit_sensitive:Rh,_crypto_box_boxzerobytes:Ci,_crypto_kdf_blake2b_keybytes:Fi,_crypto_hash_sha512_update:Ea,_crypto_core_hchacha20:Da,_crypto_pwhash_bytes_min:Ci,_crypto_secretbox_open:Lf,_crypto_auth_hmacsha256_final:qe,_crypto_verify_16:Oe,_crypto_stream_aes128ctr_xor:yd,_crypto_pwhash_scryptsalsa208sha256_memlimit_max:ui,_crypto_pwhash_scryptsalsa208sha256_ll:dd,_crypto_stream_salsa208_xor:Sa,_crypto_secretbox_xsalsa20poly1305_keygen:Gh,_crypto_aead_chacha20poly1305_abytes:Ci,_crypto_pwhash_argon2i_bytes_max:ui,_crypto_box_curve25519xchacha20poly1305_easy_afternm:Nd,_crypto_onetimeauth_poly1305_update:eg,_crypto_pwhash_memlimit_max:Uh,_crypto_verify_64_bytes:Ei,_crypto_onetimeauth_poly1305_keygen:Gh,_crypto_generichash_blake2b_keygen:Gh,_crypto_pwhash_argon2i_strprefix:ki,_crypto_auth_hmacsha256_update:wg,_crypto_aead_xchacha20poly1305_ietf_encrypt:Jc,_crypto_pwhash_scryptsalsa208sha256_strbytes:Nh,_crypto_stream_xsalsa20_keybytes:Fi,_crypto_generichash_keygen:Gh,_crypto_pwhash_argon2i_str:_b,_crypto_box_sealbytes:Bi,_crypto_onetimeauth:ng,_crypto_secretbox_boxzerobytes:Ci,_crypto_aead_chacha20poly1305_ietf_keygen:Gh,_crypto_stream_chacha20:Cg,_crypto_box_open_afternm:Vf,_crypto_pwhash_opslimit_moderate:$h,_crypto_box_macbytes:Ci,_crypto_shorthash_bytes:yi,_crypto_generichash_primitive:vi,_crypto_sign_ed25519_keypair:Ae,_crypto_sign_ed25519ph_statebytes:si,_crypto_aead_xchacha20poly1305_ietf_keybytes:Fi,_crypto_auth_primitive:ri,_crypto_core_salsa2012_keybytes:Fi,_malloc:ia,_crypto_stream_noncebytes:zi,_crypto_secretbox_xchacha20poly1305_keybytes:Fi,_crypto_secretbox_xsalsa20poly1305_keybytes:Fi,_crypto_pwhash_saltbytes:Ci,_crypto_secretbox_noncebytes:zi,_crypto_secretbox_xsalsa20poly1305_macbytes:Ci,_crypto_pwhash_argon2i_opslimit_max:ui,_crypto_auth_hmacsha512_bytes:Ei,_crypto_generichash_keybytes:Fi,_crypto_sign_publickeybytes:Fi,_crypto_pwhash_argon2i_memlimit_moderate:Th,_crypto_generichash_blake2b:Sc,_crypto_core_hchacha20_keybytes:Fi,___uremdi3:Pe,_crypto_pwhash_argon2i_opslimit_moderate:$h,_randombytes_implementation_name:Vh,_crypto_stream_xchacha20_noncebytes:zi,_crypto_sign_ed25519_verify_detached:Pf,_crypto_hash_sha512_statebytes:si,_crypto_secretbox_zerobytes:Fi,_crypto_verify_32_bytes:Fi,stackRestore:Xh,_crypto_kdf_keygen:Gh,_crypto_stream_xsalsa20_xor:If,_crypto_stream_chacha20_ietf_keygen:Gh,_crypto_stream_chacha20_keygen:Gh,_crypto_box_easy:se,_crypto_hash_sha256:ee,_crypto_sign_ed25519_seedbytes:Fi,_crypto_pwhash_alg_argon2i13:pi,_crypto_shorthash_siphash24_bytes:yi,_crypto_pwhash_opslimit_min:mi,_crypto_box_curve25519xsalsa20poly1305_publickeybytes:Fi,_crypto_kdf_blake2b_bytes_max:Ei,_crypto_generichash_bytes_max:Ei,_crypto_stream_chacha20_ietf_noncebytes:Sh,_crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive:Dh,_crypto_box_curve25519xchacha20poly1305_open_easy:rd,_crypto_box_beforenm:Jg,_crypto_box_curve25519xsalsa20poly1305_afternm:Uf,_crypto_sign_statebytes:si,_crypto_sign_open:Yf,_crypto_box_seed_keypair:Fg,_crypto_auth_hmacsha512_init:pb,_crypto_sign_ed25519_sk_to_pk:hh,_crypto_scalarmult_curve25519:Od,_crypto_box_open_easy:Pd,_crypto_auth_hmacsha512:ie,_crypto_stream_keygen:Gh,_crypto_stream_aes128ctr_keybytes:Ci,_crypto_auth_hmacsha512256_keybytes:Fi,_crypto_aead_chacha20poly1305_keybytes:Fi,_free:ra,_crypto_kx_client_session_keys:Ob,_crypto_box_curve25519xchacha20poly1305_seedbytes:Fi,_crypto_onetimeauth_poly1305_keybytes:Fi,_crypto_sign_ed25519_secretkeybytes:Ei,_crypto_kdf_blake2b_contextbytes:yi,_crypto_stream_salsa2012:cb,_crypto_sign_seedbytes:Fi,_crypto_box_curve25519xchacha20poly1305_beforenmbytes:Fi,_randombytes_random:Mh,_crypto_sign_ed25519ph_update:zg,_crypto_auth_hmacsha256_keygen:Gh,_crypto_auth_hmacsha256_statebytes:si,_randombytes_buf_deterministic:Hg,_crypto_aead_chacha20poly1305_encrypt_detached:Kb,_crypto_stream_xsalsa20_keygen:Gh,_crypto_hash_primitive:qi,_crypto_sign_ed25519_pk_to_curve25519:lc,_crypto_shorthash_siphash24:ua,_crypto_box_curve25519xsalsa20poly1305_macbytes:Ci,_crypto_sign_ed25519_bytes:Ei,_crypto_sign_ed25519:kc,_crypto_core_salsa20_constbytes:Ci,_crypto_secretbox_primitive:fi,_crypto_pwhash_argon2i_opslimit_interactive:hi,_crypto_pwhash_argon2i_saltbytes:Ci,_crypto_box_curve25519xchacha20poly1305_open_detached_afternm:Je,_crypto_box_curve25519xsalsa20poly1305_beforenmbytes:Fi,_crypto_stream_xchacha20_keygen:Gh,_crypto_core_hchacha20_constbytes:Ci,_crypto_stream_xchacha20_xor:Df,_randombytes_seedbytes:Fi,_crypto_sign_final_create:qg,_crypto_kx_secretkeybytes:Fi,_crypto_box_detached:pd,_randombytes_buf:gf,_crypto_generichash_blake2b_saltbytes:Ci,_crypto_box_open_detached:md,_crypto_kx_seedbytes:Fi,_crypto_secretbox_xsalsa20poly1305_zerobytes:Fi,_crypto_box_curve25519xchacha20poly1305_open_detached:Mc,_crypto_generichash_blake2b_keybytes:Fi,_crypto_box_curve25519xchacha20poly1305_easy:Md,_crypto_pwhash_argon2i_bytes_min:Ci,_crypto_pwhash_scryptsalsa208sha256_str:Lb,_crypto_hash:Wg,_i64Subtract:cg,_crypto_box_seedbytes:Fi,_crypto_generichash_blake2b_bytes_min:Ci,_crypto_box_curve25519xsalsa20poly1305:gd,_crypto_generichash_blake2b_statebytes:ci,_crypto_sign_ed25519ph_final_create:ke,_crypto_aead_chacha20poly1305_ietf_decrypt_detached:lb,_crypto_generichash_final:Tg,_crypto_auth_hmacsha512_update:zg,_crypto_auth_hmacsha256:ge,_crypto_box_keypair:eh,_crypto_hash_sha256_bytes:Fi,___udivdi3:ah,_crypto_pwhash_argon2i_passwd_max:ui,_sodium_init:xf,_crypto_secretbox_macbytes:Ci,_crypto_aead_xchacha20poly1305_ietf_npubbytes:zi,_bitshift64Shl:vf,_crypto_pwhash_argon2i_opslimit_min:mi,setTempRet0:Zh,_crypto_sign_seed_keypair:Qg,_crypto_core_hchacha20_inputbytes:Ci,___muldi3:af,_crypto_core_salsa2012_constbytes:Ci,_crypto_kx_seed_keypair:kg,_crypto_box_curve25519xchacha20poly1305_detached_afternm:Qe,_crypto_aead_chacha20poly1305_nsecbytes:Gi,_sodium_library_minimal:Gi,_crypto_aead_xchacha20poly1305_ietf_nsecbytes:Gi,_crypto_pwhash_argon2i_strbytes:ti,_crypto_pwhash_argon2i_memlimit_max:Uh,_crypto_generichash_blake2b_salt_personal:Ec,_crypto_stream_aes128ctr_beforenmbytes:Qh,_crypto_kdf_derive_from_key:Kf,_crypto_secretbox_xsalsa20poly1305_noncebytes:zi,_crypto_pwhash_scryptsalsa208sha256_opslimit_interactive:Fh,_crypto_pwhash_argon2i_memlimit_interactive:Ph,_crypto_hash_sha256_final:Fe,_crypto_stream_keybytes:Fi,_crypto_pwhash_memlimit_min:gi,_crypto_aead_chacha20poly1305_ietf_npubbytes:Sh,_crypto_stream_salsa208_noncebytes:yi,_sodium_library_version_minor:hi,_crypto_onetimeauth_bytes:Ci,_crypto_box_open:of,_crypto_secretbox_xchacha20poly1305_open_easy:vd,_crypto_scalarmult_curve25519_base:Yg,_crypto_sign_ed25519_open:mc,_crypto_stream_chacha20_ietf_keybytes:Fi,_crypto_box_noncebytes:zi,_crypto_core_hchacha20_outputbytes:Fi,_crypto_stream_salsa2012_xor:Ra,_crypto_onetimeauth_keygen:Gh,_crypto_pwhash_strbytes:ti,_crypto_auth_hmacsha512256_update:Gg,_crypto_core_salsa208_outputbytes:Ei,_crypto_onetimeauth_poly1305:Zf,_crypto_secretbox_xchacha20poly1305_macbytes:Ci,_crypto_kdf_bytes_min:Ci,_crypto_sign_ed25519_sk_to_seed:nh,_crypto_pwhash_scryptsalsa208sha256_memlimit_interactive:Hh,_crypto_stream_xsalsa20:zd,_crypto_box_open_easy_afternm:Td,_crypto_box_curve25519xsalsa20poly1305_seedbytes:Fi,_crypto_stream_salsa20_keybytes:Fi,_crypto_kdf_primitive:vi,_crypto_sign_ed25519ph_final_verify:le,_crypto_sign_ed25519_publickeybytes:Fi,_crypto_stream_aes128ctr:Zd,_crypto_shorthash:mg,_crypto_auth_keybytes:Fi,_crypto_box_curve25519xsalsa20poly1305_open_afternm:Lf,_crypto_aead_chacha20poly1305_npubbytes:yi,_crypto_aead_xchacha20poly1305_ietf_abytes:Ci,_crypto_onetimeauth_poly1305_final:Zg,_crypto_onetimeauth_poly1305_bytes:Ci,_crypto_box_curve25519xsalsa20poly1305_seed_keypair:Wc,_crypto_box_primitive:wi,_crypto_pwhash_str:Cf,_crypto_auth_hmacsha512_keybytes:Fi,_crypto_auth:sg,_crypto_pwhash_scryptsalsa208sha256_bytes_min:Ci,_crypto_core_salsa20_keybytes:Fi,_crypto_box_afternm:bg,_crypto_core_salsa208_constbytes:Ci,_crypto_onetimeauth_primitive:Yh,_crypto_pwhash_scryptsalsa208sha256_str_verify:vc,_sodium_version_string:ni,_crypto_stream_xchacha20_xor_ic:ld,_crypto_pwhash_scryptsalsa208sha256_passwd_min:Gi,_crypto_stream_chacha20_ietf:pg,_crypto_generichash:zf,_crypto_core_hsalsa20_outputbytes:Fi,_crypto_pwhash_opslimit_interactive:hi,_crypto_stream_aes128ctr_beforenm:da,getTempRet0:Ai,_crypto_box_curve25519xsalsa20poly1305_noncebytes:zi,_crypto_stream_salsa2012_noncebytes:yi,_crypto_core_salsa208_keybytes:Fi,_crypto_aead_chacha20poly1305_ietf_decrypt:Bc,_crypto_auth_hmacsha512256_init:Pg,_crypto_kx_server_session_keys:Nb,_crypto_onetimeauth_poly1305_verify:Rf,_crypto_auth_hmacsha512_final:pe,_crypto_stream_aes128ctr_noncebytes:Ci,_crypto_box_secretkeybytes:Fi,_crypto_stream_salsa2012_keygen:Gh,_crypto_onetimeauth_update:vg,_crypto_core_salsa20:Og,_crypto_pwhash_memlimit_interactive:Ph,_crypto_scalarmult_bytes:Fi,_crypto_secretbox_detached:Ta,_crypto_stream_xor:Wf,_crypto_secretbox_xchacha20poly1305_easy:fe,_crypto_secretbox_easy:ve,_crypto_aead_xchacha20poly1305_ietf_decrypt_detached:Zb,_crypto_stream_salsa20:xg,_sodium_bin2hex:Dc,_crypto_auth_hmacsha512_statebytes:Wh,_crypto_pwhash_argon2i_opslimit_sensitive:yi,_crypto_generichash_blake2b_bytes_max:Ei,_crypto_hash_sha256_update:La,_crypto_core_hsalsa20_constbytes:Ci,_crypto_box_easy_afternm:te,_crypto_auth_hmacsha512256_verify:Dd,_crypto_pwhash_memlimit_moderate:Th,_crypto_core_salsa20_inputbytes:Ci,_crypto_box_publickeybytes:Fi,_crypto_sign_secretkeybytes:Ei,___muldsi3:Fd,_crypto_scalarmult_scalarbytes:Fi,_crypto_verify_32:Ne,_crypto_kx_sessionkeybytes:Fi,_crypto_aead_chacha20poly1305_decrypt:Cc,_crypto_sign:dg,_crypto_pwhash_passwd_max:ui,_crypto_pwhash_scryptsalsa208sha256_opslimit_min:Kh,_sodium_hex2bin:kb,_crypto_pwhash_argon2i_alg_argon2i13:pi,_crypto_secretbox_keybytes:Fi,_randombytes:Af,_crypto_hash_bytes:Ei,_crypto_stream_salsa20_keygen:Gh,_crypto_hash_sha256_statebytes:bi,_crypto_pwhash_argon2i_passwd_min:Gi,_crypto_pwhash_opslimit_sensitive:yi,_crypto_sign_init:yh,_crypto_generichash_blake2b_personalbytes:Ci,_crypto_stream_chacha20_xor_ic:jf,_crypto_sign_verify_detached:Xf,_crypto_onetimeauth_verify:$f,_crypto_sign_ed25519_detached:Jf,_crypto_generichash_init:Dg,_i64Add:fg,_crypto_sign_bytes:Ei,_crypto_generichash_update:rg,_crypto_scalarmult:bh,_crypto_aead_chacha20poly1305_ietf_abytes:Ci,_crypto_sign_detached:Qf,_crypto_generichash_blake2b_update:og,_crypto_box_curve25519xsalsa20poly1305_beforenm:Cd,_crypto_generichash_blake2b_bytes:Fi,_crypto_auth_hmacsha512256_bytes:Fi,_crypto_box_curve25519xchacha20poly1305_noncebytes:zi,_randombytes_uniform:Ie,_crypto_shorthash_siphash24_keybytes:Ci,_crypto_shorthash_keygen:Ch,_crypto_onetimeauth_init:jh,_crypto_generichash_bytes:Fi,_crypto_stream_salsa20_xor:Of,_crypto_auth_hmacsha512_verify:Kd,_crypto_generichash_blake2b_keybytes_min:Ci,_bitshift64Lshr:yf,_crypto_kx_publickeybytes:Fi,_crypto_pwhash_bytes_max:ui,_crypto_aead_chacha20poly1305_ietf_keybytes:Fi,_crypto_aead_chacha20poly1305_ietf_encrypt_detached:yb,_crypto_stream:yg,_sbrk:jd,_crypto_box_curve25519xchacha20poly1305_beforenm:Ad,_memcpy:fb,_crypto_pwhash:Bd,_crypto_auth_hmacsha512256:je,_crypto_secretbox_xsalsa20poly1305:Xc,_crypto_verify_16_bytes:Ci,_crypto_stream_salsa208_keygen:Gh,_emscripten_get_global_libc:di,_crypto_shorthash_siphashx24_bytes:Ci,_crypto_generichash_blake2b_final:cf,_crypto_generichash_blake2b_init_salt_personal:xc,_crypto_box_seal:wc,_crypto_aead_xchacha20poly1305_ietf_keygen:Gh,_crypto_kx_keypair:ch,runPostSets:We,_crypto_pwhash_alg_default:pi,_crypto_box:wf,_crypto_stream_primitive:ji,_crypto_secretbox_xsalsa20poly1305_boxzerobytes:Ci,_crypto_pwhash_str_verify:Ag,_crypto_generichash_keybytes_min:Ci,_crypto_generichash_statebytes:ci,_crypto_onetimeauth_poly1305_statebytes:ai,_crypto_sign_final_verify:Sg,_crypto_pwhash_strprefix:ki,_crypto_secretbox_keygen:Gh,_crypto_secretbox_xchacha20poly1305_noncebytes:zi,_crypto_hash_sha512:de,_llvm_cttz_i32:Yd,_crypto_pwhash_scryptsalsa208sha256_bytes_max:ui,_crypto_box_curve25519xchacha20poly1305_detached:Oc,_sodium_library_version_major:ii,_crypto_aead_chacha20poly1305_ietf_encrypt:Kc,_crypto_generichash_blake2b_init:Gc,_randombytes_close:Gi,_crypto_pwhash_primitive:li,_crypto_onetimeauth_keybytes:Fi,_crypto_pwhash_argon2i:ec,_crypto_stream_aes128ctr_afternm:fa,_crypto_kdf_keybytes:Fi,establishStackSpace:wh,_crypto_aead_chacha20poly1305_encrypt:Nc,_crypto_core_salsa2012_inputbytes:Ci,_crypto_pwhash_scryptsalsa208sha256_memlimit_min:Hh,_crypto_core_salsa208:Ng,_crypto_pwhash_opslimit_max:ui,_crypto_auth_verify:hg,_crypto_sign_ed25519_seed_keypair:Vc,_crypto_auth_hmacsha512256_keygen:Gh,_randombytes_stir:Oh,_memset:Pb,_crypto_box_open_detached_afternm:mf,_crypto_pwhash_argon2i_memlimit_sensitive:Rh,_crypto_kx_primitive:xi,_crypto_stream_salsa2012_keybytes:Fi,_crypto_aead_xchacha20poly1305_ietf_decrypt:Ac,_crypto_pwhash_scryptsalsa208sha256_strprefix:Lh,_crypto_core_salsa20_outputbytes:Ei,_crypto_auth_keygen:Gh,_crypto_secretbox:Uf,_crypto_aead_xchacha20poly1305_ietf_encrypt_detached:Xb,_crypto_pwhash_scryptsalsa208sha256_passwd_max:ui,_crypto_auth_hmacsha256_bytes:Fi,_crypto_auth_hmacsha256_verify:Ld,_crypto_sign_keypair:ph,_crypto_stream_xchacha20:Vd,_crypto_onetimeauth_statebytes:ai,_crypto_sign_ed25519ph_init:vh,_crypto_stream_salsa20_noncebytes:yi,_crypto_shorthash_keybytes:Ci,_crypto_aead_chacha20poly1305_keygen:Gh,_crypto_shorthash_siphashx24:ta,_memmove:Ed,_crypto_hash_sha512_final:Be,_crypto_box_curve25519xsalsa20poly1305_zerobytes:Fi,_crypto_shorthash_siphashx24_keybytes:Ci,_crypto_pwhash_passwd_min:Gi,_crypto_kdf_bytes_max:Ei,_crypto_box_curve25519xsalsa20poly1305_boxzerobytes:Ci,_crypto_generichash_bytes_min:Ci,_crypto_core_salsa2012_outputbytes:Ei,_crypto_auth_hmacsha256_keybytes:Fi,_crypto_core_salsa208_inputbytes:Ci,_crypto_pwhash_scryptsalsa208sha256_opslimit_max:ui,_crypto_sign_update:Gg,_crypto_secretbox_xchacha20poly1305_detached:Qa,_crypto_stream_chacha20_noncebytes:yi,_crypto_secretbox_open_detached:$a,_crypto_box_curve25519xchacha20poly1305_seed_keypair:Wc,_crypto_pwhash_argon2i_memlimit_min:gi,_crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive:Ph,_crypto_box_curve25519xsalsa20poly1305_secretkeybytes:Fi,_crypto_kdf_contextbytes:yi,_crypto_stream_xchacha20_keybytes:Fi,_crypto_box_seal_open:Zc,_crypto_shorthash_primitive:ei,_crypto_core_hsalsa20_inputbytes:Ci,_crypto_onetimeauth_final:gh,_crypto_secretbox_open_easy:Wd,_crypto_core_salsa2012:Lg,_crypto_box_curve25519xchacha20poly1305_macbytes:Ci,_crypto_auth_hmacsha512256_statebytes:Wh,_bitshift64Ashr:Xe,_crypto_box_curve25519xchacha20poly1305_publickeybytes:Fi,_crypto_stream_chacha20_xor:Tf,_crypto_core_hsalsa20:Ga,stackAlloc:Ug,stackSave:Di,stackRestore:Xh,establishStackSpace:wh,setThrew:lh,setTempRet0:Zh,getTempRet0:Ai}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _crypto_onetimeauth_poly1305_init=Module["_crypto_onetimeauth_poly1305_init"]=asm["_crypto_onetimeauth_poly1305_init"];var _crypto_hash_sha512_init=Module["_crypto_hash_sha512_init"]=asm["_crypto_hash_sha512_init"];var _crypto_pwhash_scryptsalsa208sha256=Module["_crypto_pwhash_scryptsalsa208sha256"]=asm["_crypto_pwhash_scryptsalsa208sha256"];var _crypto_scalarmult_primitive=Module["_crypto_scalarmult_primitive"]=asm["_crypto_scalarmult_primitive"];var _crypto_scalarmult_base=Module["_crypto_scalarmult_base"]=asm["_crypto_scalarmult_base"];var _crypto_auth_bytes=Module["_crypto_auth_bytes"]=asm["_crypto_auth_bytes"];var _crypto_stream_chacha20_keybytes=Module["_crypto_stream_chacha20_keybytes"]=asm["_crypto_stream_chacha20_keybytes"];var _crypto_aead_chacha20poly1305_decrypt_detached=Module["_crypto_aead_chacha20poly1305_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_decrypt_detached"];var _crypto_kdf_blake2b_bytes_min=Module["_crypto_kdf_blake2b_bytes_min"]=asm["_crypto_kdf_blake2b_bytes_min"];var _crypto_box_curve25519xchacha20poly1305_open_easy_afternm=Module["_crypto_box_curve25519xchacha20poly1305_open_easy_afternm"]=asm["_crypto_box_curve25519xchacha20poly1305_open_easy_afternm"];var _crypto_generichash_blake2b_keybytes_max=Module["_crypto_generichash_blake2b_keybytes_max"]=asm["_crypto_generichash_blake2b_keybytes_max"];var _crypto_box_beforenmbytes=Module["_crypto_box_beforenmbytes"]=asm["_crypto_box_beforenmbytes"];var _crypto_stream_salsa208=Module["_crypto_stream_salsa208"]=asm["_crypto_stream_salsa208"];var ___udivmoddi4=Module["___udivmoddi4"]=asm["___udivmoddi4"];var _crypto_sign_ed25519_sk_to_curve25519=Module["_crypto_sign_ed25519_sk_to_curve25519"]=asm["_crypto_sign_ed25519_sk_to_curve25519"];var _crypto_stream_chacha20_ietf_xor_ic=Module["_crypto_stream_chacha20_ietf_xor_ic"]=asm["_crypto_stream_chacha20_ietf_xor_ic"];var _crypto_secretbox_xsalsa20poly1305_open=Module["_crypto_secretbox_xsalsa20poly1305_open"]=asm["_crypto_secretbox_xsalsa20poly1305_open"];var _crypto_box_zerobytes=Module["_crypto_box_zerobytes"]=asm["_crypto_box_zerobytes"];var _crypto_secretbox_xchacha20poly1305_open_detached=Module["_crypto_secretbox_xchacha20poly1305_open_detached"]=asm["_crypto_secretbox_xchacha20poly1305_open_detached"];var _crypto_stream_salsa208_keybytes=Module["_crypto_stream_salsa208_keybytes"]=asm["_crypto_stream_salsa208_keybytes"];var _crypto_hash_sha512_bytes=Module["_crypto_hash_sha512_bytes"]=asm["_crypto_hash_sha512_bytes"];var stackSave=Module["stackSave"]=asm["stackSave"];var _crypto_stream_xsalsa20_xor_ic=Module["_crypto_stream_xsalsa20_xor_ic"]=asm["_crypto_stream_xsalsa20_xor_ic"];var _crypto_core_hsalsa20_keybytes=Module["_crypto_core_hsalsa20_keybytes"]=asm["_crypto_core_hsalsa20_keybytes"];var _crypto_sign_primitive=Module["_crypto_sign_primitive"]=asm["_crypto_sign_primitive"];var _crypto_scalarmult_curve25519_bytes=Module["_crypto_scalarmult_curve25519_bytes"]=asm["_crypto_scalarmult_curve25519_bytes"];var _crypto_scalarmult_curve25519_scalarbytes=Module["_crypto_scalarmult_curve25519_scalarbytes"]=asm["_crypto_scalarmult_curve25519_scalarbytes"];var _crypto_pwhash_scryptsalsa208sha256_saltbytes=Module["_crypto_pwhash_scryptsalsa208sha256_saltbytes"]=asm["_crypto_pwhash_scryptsalsa208sha256_saltbytes"];var _crypto_pwhash_argon2i_str_verify=Module["_crypto_pwhash_argon2i_str_verify"]=asm["_crypto_pwhash_argon2i_str_verify"];var _crypto_box_curve25519xchacha20poly1305_secretkeybytes=Module["_crypto_box_curve25519xchacha20poly1305_secretkeybytes"]=asm["_crypto_box_curve25519xchacha20poly1305_secretkeybytes"];var _crypto_auth_hmacsha512_keygen=Module["_crypto_auth_hmacsha512_keygen"]=asm["_crypto_auth_hmacsha512_keygen"];var _crypto_box_detached_afternm=Module["_crypto_box_detached_afternm"]=asm["_crypto_box_detached_afternm"];var _crypto_stream_salsa20_xor_ic=Module["_crypto_stream_salsa20_xor_ic"]=asm["_crypto_stream_salsa20_xor_ic"];var _crypto_auth_hmacsha256_init=Module["_crypto_auth_hmacsha256_init"]=asm["_crypto_auth_hmacsha256_init"];var _crypto_stream_chacha20_ietf_xor=Module["_crypto_stream_chacha20_ietf_xor"]=asm["_crypto_stream_chacha20_ietf_xor"];var _crypto_auth_hmacsha512256_final=Module["_crypto_auth_hmacsha512256_final"]=asm["_crypto_auth_hmacsha512256_final"];var _crypto_stream_aes128ctr_xor_afternm=Module["_crypto_stream_aes128ctr_xor_afternm"]=asm["_crypto_stream_aes128ctr_xor_afternm"];var setThrew=Module["setThrew"]=asm["setThrew"];var _crypto_aead_chacha20poly1305_ietf_nsecbytes=Module["_crypto_aead_chacha20poly1305_ietf_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_nsecbytes"];var _crypto_kdf_blake2b_derive_from_key=Module["_crypto_kdf_blake2b_derive_from_key"]=asm["_crypto_kdf_blake2b_derive_from_key"];var _crypto_box_curve25519xsalsa20poly1305_keypair=Module["_crypto_box_curve25519xsalsa20poly1305_keypair"]=asm["_crypto_box_curve25519xsalsa20poly1305_keypair"];var _crypto_hash_sha256_init=Module["_crypto_hash_sha256_init"]=asm["_crypto_hash_sha256_init"];var _crypto_stream_xsalsa20_noncebytes=Module["_crypto_stream_xsalsa20_noncebytes"]=asm["_crypto_stream_xsalsa20_noncebytes"];var _crypto_generichash_keybytes_max=Module["_crypto_generichash_keybytes_max"]=asm["_crypto_generichash_keybytes_max"];var _crypto_verify_64=Module["_crypto_verify_64"]=asm["_crypto_verify_64"];var stackAlloc=Module["stackAlloc"]=asm["stackAlloc"];var _crypto_box_curve25519xchacha20poly1305_keypair=Module["_crypto_box_curve25519xchacha20poly1305_keypair"]=asm["_crypto_box_curve25519xchacha20poly1305_keypair"];var _crypto_box_curve25519xsalsa20poly1305_open=Module["_crypto_box_curve25519xsalsa20poly1305_open"]=asm["_crypto_box_curve25519xsalsa20poly1305_open"];var _crypto_pwhash_memlimit_sensitive=Module["_crypto_pwhash_memlimit_sensitive"]=asm["_crypto_pwhash_memlimit_sensitive"];var _crypto_box_boxzerobytes=Module["_crypto_box_boxzerobytes"]=asm["_crypto_box_boxzerobytes"];var _crypto_kdf_blake2b_keybytes=Module["_crypto_kdf_blake2b_keybytes"]=asm["_crypto_kdf_blake2b_keybytes"];var _crypto_hash_sha512_update=Module["_crypto_hash_sha512_update"]=asm["_crypto_hash_sha512_update"];var _crypto_core_hchacha20=Module["_crypto_core_hchacha20"]=asm["_crypto_core_hchacha20"];var _crypto_pwhash_bytes_min=Module["_crypto_pwhash_bytes_min"]=asm["_crypto_pwhash_bytes_min"];var _crypto_secretbox_open=Module["_crypto_secretbox_open"]=asm["_crypto_secretbox_open"];var _crypto_auth_hmacsha256_final=Module["_crypto_auth_hmacsha256_final"]=asm["_crypto_auth_hmacsha256_final"];var _crypto_verify_16=Module["_crypto_verify_16"]=asm["_crypto_verify_16"];var _crypto_stream_aes128ctr_xor=Module["_crypto_stream_aes128ctr_xor"]=asm["_crypto_stream_aes128ctr_xor"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_max=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_max"];var _crypto_pwhash_scryptsalsa208sha256_ll=Module["_crypto_pwhash_scryptsalsa208sha256_ll"]=asm["_crypto_pwhash_scryptsalsa208sha256_ll"];var _crypto_stream_salsa208_xor=Module["_crypto_stream_salsa208_xor"]=asm["_crypto_stream_salsa208_xor"];var _crypto_secretbox_xsalsa20poly1305_keygen=Module["_crypto_secretbox_xsalsa20poly1305_keygen"]=asm["_crypto_secretbox_xsalsa20poly1305_keygen"];var _crypto_aead_chacha20poly1305_abytes=Module["_crypto_aead_chacha20poly1305_abytes"]=asm["_crypto_aead_chacha20poly1305_abytes"];var _crypto_pwhash_argon2i_bytes_max=Module["_crypto_pwhash_argon2i_bytes_max"]=asm["_crypto_pwhash_argon2i_bytes_max"];var _crypto_box_curve25519xchacha20poly1305_easy_afternm=Module["_crypto_box_curve25519xchacha20poly1305_easy_afternm"]=asm["_crypto_box_curve25519xchacha20poly1305_easy_afternm"];var _crypto_onetimeauth_poly1305_update=Module["_crypto_onetimeauth_poly1305_update"]=asm["_crypto_onetimeauth_poly1305_update"];var _crypto_pwhash_memlimit_max=Module["_crypto_pwhash_memlimit_max"]=asm["_crypto_pwhash_memlimit_max"];var _crypto_verify_64_bytes=Module["_crypto_verify_64_bytes"]=asm["_crypto_verify_64_bytes"];var _crypto_onetimeauth_poly1305_keygen=Module["_crypto_onetimeauth_poly1305_keygen"]=asm["_crypto_onetimeauth_poly1305_keygen"];var _crypto_generichash_blake2b_keygen=Module["_crypto_generichash_blake2b_keygen"]=asm["_crypto_generichash_blake2b_keygen"];var _crypto_pwhash_argon2i_strprefix=Module["_crypto_pwhash_argon2i_strprefix"]=asm["_crypto_pwhash_argon2i_strprefix"];var _crypto_auth_hmacsha256_update=Module["_crypto_auth_hmacsha256_update"]=asm["_crypto_auth_hmacsha256_update"];var _crypto_aead_xchacha20poly1305_ietf_encrypt=Module["_crypto_aead_xchacha20poly1305_ietf_encrypt"]=asm["_crypto_aead_xchacha20poly1305_ietf_encrypt"];var _crypto_pwhash_scryptsalsa208sha256_strbytes=Module["_crypto_pwhash_scryptsalsa208sha256_strbytes"]=asm["_crypto_pwhash_scryptsalsa208sha256_strbytes"];var _crypto_stream_xsalsa20_keybytes=Module["_crypto_stream_xsalsa20_keybytes"]=asm["_crypto_stream_xsalsa20_keybytes"];var _crypto_generichash_keygen=Module["_crypto_generichash_keygen"]=asm["_crypto_generichash_keygen"];var _crypto_pwhash_argon2i_str=Module["_crypto_pwhash_argon2i_str"]=asm["_crypto_pwhash_argon2i_str"];var _crypto_box_sealbytes=Module["_crypto_box_sealbytes"]=asm["_crypto_box_sealbytes"];var _crypto_onetimeauth=Module["_crypto_onetimeauth"]=asm["_crypto_onetimeauth"];var _crypto_secretbox_boxzerobytes=Module["_crypto_secretbox_boxzerobytes"]=asm["_crypto_secretbox_boxzerobytes"];var _crypto_aead_chacha20poly1305_ietf_keygen=Module["_crypto_aead_chacha20poly1305_ietf_keygen"]=asm["_crypto_aead_chacha20poly1305_ietf_keygen"];var _crypto_stream_chacha20=Module["_crypto_stream_chacha20"]=asm["_crypto_stream_chacha20"];var _crypto_box_open_afternm=Module["_crypto_box_open_afternm"]=asm["_crypto_box_open_afternm"];var _crypto_pwhash_opslimit_moderate=Module["_crypto_pwhash_opslimit_moderate"]=asm["_crypto_pwhash_opslimit_moderate"];var _crypto_box_macbytes=Module["_crypto_box_macbytes"]=asm["_crypto_box_macbytes"];var _crypto_shorthash_bytes=Module["_crypto_shorthash_bytes"]=asm["_crypto_shorthash_bytes"];var _crypto_generichash_primitive=Module["_crypto_generichash_primitive"]=asm["_crypto_generichash_primitive"];var _crypto_sign_ed25519_keypair=Module["_crypto_sign_ed25519_keypair"]=asm["_crypto_sign_ed25519_keypair"];var _crypto_sign_ed25519ph_statebytes=Module["_crypto_sign_ed25519ph_statebytes"]=asm["_crypto_sign_ed25519ph_statebytes"];var _crypto_aead_xchacha20poly1305_ietf_keybytes=Module["_crypto_aead_xchacha20poly1305_ietf_keybytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_keybytes"];var _crypto_auth_primitive=Module["_crypto_auth_primitive"]=asm["_crypto_auth_primitive"];var _crypto_core_salsa2012_keybytes=Module["_crypto_core_salsa2012_keybytes"]=asm["_crypto_core_salsa2012_keybytes"];var _malloc=Module["_malloc"]=asm["_malloc"];var _crypto_stream_noncebytes=Module["_crypto_stream_noncebytes"]=asm["_crypto_stream_noncebytes"];var _crypto_secretbox_xchacha20poly1305_keybytes=Module["_crypto_secretbox_xchacha20poly1305_keybytes"]=asm["_crypto_secretbox_xchacha20poly1305_keybytes"];var _crypto_secretbox_xsalsa20poly1305_keybytes=Module["_crypto_secretbox_xsalsa20poly1305_keybytes"]=asm["_crypto_secretbox_xsalsa20poly1305_keybytes"];var _crypto_pwhash_saltbytes=Module["_crypto_pwhash_saltbytes"]=asm["_crypto_pwhash_saltbytes"];var _crypto_secretbox_noncebytes=Module["_crypto_secretbox_noncebytes"]=asm["_crypto_secretbox_noncebytes"];var _crypto_secretbox_xsalsa20poly1305_macbytes=Module["_crypto_secretbox_xsalsa20poly1305_macbytes"]=asm["_crypto_secretbox_xsalsa20poly1305_macbytes"];var _crypto_pwhash_argon2i_opslimit_max=Module["_crypto_pwhash_argon2i_opslimit_max"]=asm["_crypto_pwhash_argon2i_opslimit_max"];var _crypto_auth_hmacsha512_bytes=Module["_crypto_auth_hmacsha512_bytes"]=asm["_crypto_auth_hmacsha512_bytes"];var _crypto_generichash_keybytes=Module["_crypto_generichash_keybytes"]=asm["_crypto_generichash_keybytes"];var _crypto_sign_publickeybytes=Module["_crypto_sign_publickeybytes"]=asm["_crypto_sign_publickeybytes"];var _crypto_pwhash_argon2i_memlimit_moderate=Module["_crypto_pwhash_argon2i_memlimit_moderate"]=asm["_crypto_pwhash_argon2i_memlimit_moderate"];var _crypto_generichash_blake2b=Module["_crypto_generichash_blake2b"]=asm["_crypto_generichash_blake2b"];var _crypto_core_hchacha20_keybytes=Module["_crypto_core_hchacha20_keybytes"]=asm["_crypto_core_hchacha20_keybytes"];var ___uremdi3=Module["___uremdi3"]=asm["___uremdi3"];var _crypto_pwhash_argon2i_opslimit_moderate=Module["_crypto_pwhash_argon2i_opslimit_moderate"]=asm["_crypto_pwhash_argon2i_opslimit_moderate"];var _randombytes_implementation_name=Module["_randombytes_implementation_name"]=asm["_randombytes_implementation_name"];var _crypto_stream_xchacha20_noncebytes=Module["_crypto_stream_xchacha20_noncebytes"]=asm["_crypto_stream_xchacha20_noncebytes"];var _crypto_sign_ed25519_verify_detached=Module["_crypto_sign_ed25519_verify_detached"]=asm["_crypto_sign_ed25519_verify_detached"];var _crypto_hash_sha512_statebytes=Module["_crypto_hash_sha512_statebytes"]=asm["_crypto_hash_sha512_statebytes"];var _crypto_secretbox_zerobytes=Module["_crypto_secretbox_zerobytes"]=asm["_crypto_secretbox_zerobytes"];var _crypto_verify_32_bytes=Module["_crypto_verify_32_bytes"]=asm["_crypto_verify_32_bytes"];var stackRestore=Module["stackRestore"]=asm["stackRestore"];var _crypto_kdf_keygen=Module["_crypto_kdf_keygen"]=asm["_crypto_kdf_keygen"];var _crypto_stream_xsalsa20_xor=Module["_crypto_stream_xsalsa20_xor"]=asm["_crypto_stream_xsalsa20_xor"];var _crypto_stream_chacha20_ietf_keygen=Module["_crypto_stream_chacha20_ietf_keygen"]=asm["_crypto_stream_chacha20_ietf_keygen"];var _crypto_stream_chacha20_keygen=Module["_crypto_stream_chacha20_keygen"]=asm["_crypto_stream_chacha20_keygen"];var _crypto_box_easy=Module["_crypto_box_easy"]=asm["_crypto_box_easy"];var _crypto_hash_sha256=Module["_crypto_hash_sha256"]=asm["_crypto_hash_sha256"];var _crypto_sign_ed25519_seedbytes=Module["_crypto_sign_ed25519_seedbytes"]=asm["_crypto_sign_ed25519_seedbytes"];var _crypto_pwhash_alg_argon2i13=Module["_crypto_pwhash_alg_argon2i13"]=asm["_crypto_pwhash_alg_argon2i13"];var _crypto_shorthash_siphash24_bytes=Module["_crypto_shorthash_siphash24_bytes"]=asm["_crypto_shorthash_siphash24_bytes"];var _crypto_pwhash_opslimit_min=Module["_crypto_pwhash_opslimit_min"]=asm["_crypto_pwhash_opslimit_min"];var _crypto_box_curve25519xsalsa20poly1305_publickeybytes=Module["_crypto_box_curve25519xsalsa20poly1305_publickeybytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_publickeybytes"];var _crypto_kdf_blake2b_bytes_max=Module["_crypto_kdf_blake2b_bytes_max"]=asm["_crypto_kdf_blake2b_bytes_max"];var _crypto_generichash_bytes_max=Module["_crypto_generichash_bytes_max"]=asm["_crypto_generichash_bytes_max"];var _crypto_stream_chacha20_ietf_noncebytes=Module["_crypto_stream_chacha20_ietf_noncebytes"]=asm["_crypto_stream_chacha20_ietf_noncebytes"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive"];var _crypto_box_curve25519xchacha20poly1305_open_easy=Module["_crypto_box_curve25519xchacha20poly1305_open_easy"]=asm["_crypto_box_curve25519xchacha20poly1305_open_easy"];var _crypto_box_beforenm=Module["_crypto_box_beforenm"]=asm["_crypto_box_beforenm"];var _crypto_box_curve25519xsalsa20poly1305_afternm=Module["_crypto_box_curve25519xsalsa20poly1305_afternm"]=asm["_crypto_box_curve25519xsalsa20poly1305_afternm"];var _crypto_sign_statebytes=Module["_crypto_sign_statebytes"]=asm["_crypto_sign_statebytes"];var _crypto_sign_open=Module["_crypto_sign_open"]=asm["_crypto_sign_open"];var _crypto_box_seed_keypair=Module["_crypto_box_seed_keypair"]=asm["_crypto_box_seed_keypair"];var _crypto_auth_hmacsha512_init=Module["_crypto_auth_hmacsha512_init"]=asm["_crypto_auth_hmacsha512_init"];var _crypto_sign_ed25519_sk_to_pk=Module["_crypto_sign_ed25519_sk_to_pk"]=asm["_crypto_sign_ed25519_sk_to_pk"];var _crypto_scalarmult_curve25519=Module["_crypto_scalarmult_curve25519"]=asm["_crypto_scalarmult_curve25519"];var _crypto_box_open_easy=Module["_crypto_box_open_easy"]=asm["_crypto_box_open_easy"];var _crypto_auth_hmacsha512=Module["_crypto_auth_hmacsha512"]=asm["_crypto_auth_hmacsha512"];var _crypto_stream_keygen=Module["_crypto_stream_keygen"]=asm["_crypto_stream_keygen"];var _crypto_stream_aes128ctr_keybytes=Module["_crypto_stream_aes128ctr_keybytes"]=asm["_crypto_stream_aes128ctr_keybytes"];var _crypto_auth_hmacsha512256_keybytes=Module["_crypto_auth_hmacsha512256_keybytes"]=asm["_crypto_auth_hmacsha512256_keybytes"];var _crypto_aead_chacha20poly1305_keybytes=Module["_crypto_aead_chacha20poly1305_keybytes"]=asm["_crypto_aead_chacha20poly1305_keybytes"];var _free=Module["_free"]=asm["_free"];var _crypto_kx_client_session_keys=Module["_crypto_kx_client_session_keys"]=asm["_crypto_kx_client_session_keys"];var _crypto_box_curve25519xchacha20poly1305_seedbytes=Module["_crypto_box_curve25519xchacha20poly1305_seedbytes"]=asm["_crypto_box_curve25519xchacha20poly1305_seedbytes"];var _crypto_onetimeauth_poly1305_keybytes=Module["_crypto_onetimeauth_poly1305_keybytes"]=asm["_crypto_onetimeauth_poly1305_keybytes"];var _crypto_sign_ed25519_secretkeybytes=Module["_crypto_sign_ed25519_secretkeybytes"]=asm["_crypto_sign_ed25519_secretkeybytes"];var _crypto_kdf_blake2b_contextbytes=Module["_crypto_kdf_blake2b_contextbytes"]=asm["_crypto_kdf_blake2b_contextbytes"];var _crypto_stream_salsa2012=Module["_crypto_stream_salsa2012"]=asm["_crypto_stream_salsa2012"];var _crypto_sign_seedbytes=Module["_crypto_sign_seedbytes"]=asm["_crypto_sign_seedbytes"];var _crypto_box_curve25519xchacha20poly1305_beforenmbytes=Module["_crypto_box_curve25519xchacha20poly1305_beforenmbytes"]=asm["_crypto_box_curve25519xchacha20poly1305_beforenmbytes"];var _randombytes_random=Module["_randombytes_random"]=asm["_randombytes_random"];var _crypto_sign_ed25519ph_update=Module["_crypto_sign_ed25519ph_update"]=asm["_crypto_sign_ed25519ph_update"];var _crypto_auth_hmacsha256_keygen=Module["_crypto_auth_hmacsha256_keygen"]=asm["_crypto_auth_hmacsha256_keygen"];var _crypto_auth_hmacsha256_statebytes=Module["_crypto_auth_hmacsha256_statebytes"]=asm["_crypto_auth_hmacsha256_statebytes"];var _randombytes_buf_deterministic=Module["_randombytes_buf_deterministic"]=asm["_randombytes_buf_deterministic"];var _crypto_aead_chacha20poly1305_encrypt_detached=Module["_crypto_aead_chacha20poly1305_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_encrypt_detached"];var _crypto_stream_xsalsa20_keygen=Module["_crypto_stream_xsalsa20_keygen"]=asm["_crypto_stream_xsalsa20_keygen"];var _crypto_hash_primitive=Module["_crypto_hash_primitive"]=asm["_crypto_hash_primitive"];var _crypto_sign_ed25519_pk_to_curve25519=Module["_crypto_sign_ed25519_pk_to_curve25519"]=asm["_crypto_sign_ed25519_pk_to_curve25519"];var _crypto_shorthash_siphash24=Module["_crypto_shorthash_siphash24"]=asm["_crypto_shorthash_siphash24"];var _crypto_box_curve25519xsalsa20poly1305_macbytes=Module["_crypto_box_curve25519xsalsa20poly1305_macbytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_macbytes"];var _crypto_sign_ed25519_bytes=Module["_crypto_sign_ed25519_bytes"]=asm["_crypto_sign_ed25519_bytes"];var _crypto_sign_ed25519=Module["_crypto_sign_ed25519"]=asm["_crypto_sign_ed25519"];var _crypto_core_salsa20_constbytes=Module["_crypto_core_salsa20_constbytes"]=asm["_crypto_core_salsa20_constbytes"];var _crypto_secretbox_primitive=Module["_crypto_secretbox_primitive"]=asm["_crypto_secretbox_primitive"];var _crypto_pwhash_argon2i_opslimit_interactive=Module["_crypto_pwhash_argon2i_opslimit_interactive"]=asm["_crypto_pwhash_argon2i_opslimit_interactive"];var _crypto_pwhash_argon2i_saltbytes=Module["_crypto_pwhash_argon2i_saltbytes"]=asm["_crypto_pwhash_argon2i_saltbytes"];var _crypto_box_curve25519xchacha20poly1305_open_detached_afternm=Module["_crypto_box_curve25519xchacha20poly1305_open_detached_afternm"]=asm["_crypto_box_curve25519xchacha20poly1305_open_detached_afternm"];var _crypto_box_curve25519xsalsa20poly1305_beforenmbytes=Module["_crypto_box_curve25519xsalsa20poly1305_beforenmbytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_beforenmbytes"];var _crypto_stream_xchacha20_keygen=Module["_crypto_stream_xchacha20_keygen"]=asm["_crypto_stream_xchacha20_keygen"];var _crypto_core_hchacha20_constbytes=Module["_crypto_core_hchacha20_constbytes"]=asm["_crypto_core_hchacha20_constbytes"];var _crypto_stream_xchacha20_xor=Module["_crypto_stream_xchacha20_xor"]=asm["_crypto_stream_xchacha20_xor"];var _randombytes_seedbytes=Module["_randombytes_seedbytes"]=asm["_randombytes_seedbytes"];var _crypto_sign_final_create=Module["_crypto_sign_final_create"]=asm["_crypto_sign_final_create"];var _crypto_kx_secretkeybytes=Module["_crypto_kx_secretkeybytes"]=asm["_crypto_kx_secretkeybytes"];var _crypto_box_detached=Module["_crypto_box_detached"]=asm["_crypto_box_detached"];var _randombytes_buf=Module["_randombytes_buf"]=asm["_randombytes_buf"];var _crypto_generichash_blake2b_saltbytes=Module["_crypto_generichash_blake2b_saltbytes"]=asm["_crypto_generichash_blake2b_saltbytes"];var _crypto_box_open_detached=Module["_crypto_box_open_detached"]=asm["_crypto_box_open_detached"];var _crypto_kx_seedbytes=Module["_crypto_kx_seedbytes"]=asm["_crypto_kx_seedbytes"];var _crypto_secretbox_xsalsa20poly1305_zerobytes=Module["_crypto_secretbox_xsalsa20poly1305_zerobytes"]=asm["_crypto_secretbox_xsalsa20poly1305_zerobytes"];var _crypto_box_curve25519xchacha20poly1305_open_detached=Module["_crypto_box_curve25519xchacha20poly1305_open_detached"]=asm["_crypto_box_curve25519xchacha20poly1305_open_detached"];var _crypto_generichash_blake2b_keybytes=Module["_crypto_generichash_blake2b_keybytes"]=asm["_crypto_generichash_blake2b_keybytes"];var _crypto_box_curve25519xchacha20poly1305_easy=Module["_crypto_box_curve25519xchacha20poly1305_easy"]=asm["_crypto_box_curve25519xchacha20poly1305_easy"];var _crypto_pwhash_argon2i_bytes_min=Module["_crypto_pwhash_argon2i_bytes_min"]=asm["_crypto_pwhash_argon2i_bytes_min"];var _crypto_pwhash_scryptsalsa208sha256_str=Module["_crypto_pwhash_scryptsalsa208sha256_str"]=asm["_crypto_pwhash_scryptsalsa208sha256_str"];var _crypto_hash=Module["_crypto_hash"]=asm["_crypto_hash"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _crypto_box_seedbytes=Module["_crypto_box_seedbytes"]=asm["_crypto_box_seedbytes"];var _crypto_generichash_blake2b_bytes_min=Module["_crypto_generichash_blake2b_bytes_min"]=asm["_crypto_generichash_blake2b_bytes_min"];var _crypto_box_curve25519xsalsa20poly1305=Module["_crypto_box_curve25519xsalsa20poly1305"]=asm["_crypto_box_curve25519xsalsa20poly1305"];var _crypto_generichash_blake2b_statebytes=Module["_crypto_generichash_blake2b_statebytes"]=asm["_crypto_generichash_blake2b_statebytes"];var _crypto_sign_ed25519ph_final_create=Module["_crypto_sign_ed25519ph_final_create"]=asm["_crypto_sign_ed25519ph_final_create"];var _crypto_aead_chacha20poly1305_ietf_decrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"];var _crypto_generichash_final=Module["_crypto_generichash_final"]=asm["_crypto_generichash_final"];var _crypto_auth_hmacsha512_update=Module["_crypto_auth_hmacsha512_update"]=asm["_crypto_auth_hmacsha512_update"];var _crypto_auth_hmacsha256=Module["_crypto_auth_hmacsha256"]=asm["_crypto_auth_hmacsha256"];var _crypto_box_keypair=Module["_crypto_box_keypair"]=asm["_crypto_box_keypair"];var _crypto_hash_sha256_bytes=Module["_crypto_hash_sha256_bytes"]=asm["_crypto_hash_sha256_bytes"];var ___udivdi3=Module["___udivdi3"]=asm["___udivdi3"];var _crypto_pwhash_argon2i_passwd_max=Module["_crypto_pwhash_argon2i_passwd_max"]=asm["_crypto_pwhash_argon2i_passwd_max"];var _sodium_init=Module["_sodium_init"]=asm["_sodium_init"];var _crypto_secretbox_macbytes=Module["_crypto_secretbox_macbytes"]=asm["_crypto_secretbox_macbytes"];var _crypto_aead_xchacha20poly1305_ietf_npubbytes=Module["_crypto_aead_xchacha20poly1305_ietf_npubbytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_npubbytes"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _crypto_pwhash_argon2i_opslimit_min=Module["_crypto_pwhash_argon2i_opslimit_min"]=asm["_crypto_pwhash_argon2i_opslimit_min"];var setTempRet0=Module["setTempRet0"]=asm["setTempRet0"];var _crypto_sign_seed_keypair=Module["_crypto_sign_seed_keypair"]=asm["_crypto_sign_seed_keypair"];var _crypto_core_hchacha20_inputbytes=Module["_crypto_core_hchacha20_inputbytes"]=asm["_crypto_core_hchacha20_inputbytes"];var ___muldi3=Module["___muldi3"]=asm["___muldi3"];var _crypto_core_salsa2012_constbytes=Module["_crypto_core_salsa2012_constbytes"]=asm["_crypto_core_salsa2012_constbytes"];var _crypto_kx_seed_keypair=Module["_crypto_kx_seed_keypair"]=asm["_crypto_kx_seed_keypair"];var _crypto_box_curve25519xchacha20poly1305_detached_afternm=Module["_crypto_box_curve25519xchacha20poly1305_detached_afternm"]=asm["_crypto_box_curve25519xchacha20poly1305_detached_afternm"];var _crypto_aead_chacha20poly1305_nsecbytes=Module["_crypto_aead_chacha20poly1305_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_nsecbytes"];var _sodium_library_minimal=Module["_sodium_library_minimal"]=asm["_sodium_library_minimal"];var _crypto_aead_xchacha20poly1305_ietf_nsecbytes=Module["_crypto_aead_xchacha20poly1305_ietf_nsecbytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_nsecbytes"];var _crypto_pwhash_argon2i_strbytes=Module["_crypto_pwhash_argon2i_strbytes"]=asm["_crypto_pwhash_argon2i_strbytes"];var _crypto_pwhash_argon2i_memlimit_max=Module["_crypto_pwhash_argon2i_memlimit_max"]=asm["_crypto_pwhash_argon2i_memlimit_max"];var _crypto_generichash_blake2b_salt_personal=Module["_crypto_generichash_blake2b_salt_personal"]=asm["_crypto_generichash_blake2b_salt_personal"];var _crypto_stream_aes128ctr_beforenmbytes=Module["_crypto_stream_aes128ctr_beforenmbytes"]=asm["_crypto_stream_aes128ctr_beforenmbytes"];var _crypto_kdf_derive_from_key=Module["_crypto_kdf_derive_from_key"]=asm["_crypto_kdf_derive_from_key"];var _crypto_secretbox_xsalsa20poly1305_noncebytes=Module["_crypto_secretbox_xsalsa20poly1305_noncebytes"]=asm["_crypto_secretbox_xsalsa20poly1305_noncebytes"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_interactive=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_interactive"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_interactive"];var _crypto_pwhash_argon2i_memlimit_interactive=Module["_crypto_pwhash_argon2i_memlimit_interactive"]=asm["_crypto_pwhash_argon2i_memlimit_interactive"];var _crypto_hash_sha256_final=Module["_crypto_hash_sha256_final"]=asm["_crypto_hash_sha256_final"];var _crypto_stream_keybytes=Module["_crypto_stream_keybytes"]=asm["_crypto_stream_keybytes"];var _crypto_pwhash_memlimit_min=Module["_crypto_pwhash_memlimit_min"]=asm["_crypto_pwhash_memlimit_min"];var _crypto_aead_chacha20poly1305_ietf_npubbytes=Module["_crypto_aead_chacha20poly1305_ietf_npubbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_npubbytes"];var _crypto_stream_salsa208_noncebytes=Module["_crypto_stream_salsa208_noncebytes"]=asm["_crypto_stream_salsa208_noncebytes"];var _sodium_library_version_minor=Module["_sodium_library_version_minor"]=asm["_sodium_library_version_minor"];var _crypto_onetimeauth_bytes=Module["_crypto_onetimeauth_bytes"]=asm["_crypto_onetimeauth_bytes"];var _crypto_box_open=Module["_crypto_box_open"]=asm["_crypto_box_open"];var _crypto_secretbox_xchacha20poly1305_open_easy=Module["_crypto_secretbox_xchacha20poly1305_open_easy"]=asm["_crypto_secretbox_xchacha20poly1305_open_easy"];var _crypto_scalarmult_curve25519_base=Module["_crypto_scalarmult_curve25519_base"]=asm["_crypto_scalarmult_curve25519_base"];var _crypto_sign_ed25519_open=Module["_crypto_sign_ed25519_open"]=asm["_crypto_sign_ed25519_open"];var _crypto_stream_chacha20_ietf_keybytes=Module["_crypto_stream_chacha20_ietf_keybytes"]=asm["_crypto_stream_chacha20_ietf_keybytes"];var _crypto_box_noncebytes=Module["_crypto_box_noncebytes"]=asm["_crypto_box_noncebytes"];var _crypto_core_hchacha20_outputbytes=Module["_crypto_core_hchacha20_outputbytes"]=asm["_crypto_core_hchacha20_outputbytes"];var _crypto_stream_salsa2012_xor=Module["_crypto_stream_salsa2012_xor"]=asm["_crypto_stream_salsa2012_xor"];var _crypto_onetimeauth_keygen=Module["_crypto_onetimeauth_keygen"]=asm["_crypto_onetimeauth_keygen"];var _crypto_pwhash_strbytes=Module["_crypto_pwhash_strbytes"]=asm["_crypto_pwhash_strbytes"];var _crypto_auth_hmacsha512256_update=Module["_crypto_auth_hmacsha512256_update"]=asm["_crypto_auth_hmacsha512256_update"];var _crypto_core_salsa208_outputbytes=Module["_crypto_core_salsa208_outputbytes"]=asm["_crypto_core_salsa208_outputbytes"];var _crypto_onetimeauth_poly1305=Module["_crypto_onetimeauth_poly1305"]=asm["_crypto_onetimeauth_poly1305"];var _crypto_secretbox_xchacha20poly1305_macbytes=Module["_crypto_secretbox_xchacha20poly1305_macbytes"]=asm["_crypto_secretbox_xchacha20poly1305_macbytes"];var _crypto_kdf_bytes_min=Module["_crypto_kdf_bytes_min"]=asm["_crypto_kdf_bytes_min"];var _crypto_sign_ed25519_sk_to_seed=Module["_crypto_sign_ed25519_sk_to_seed"]=asm["_crypto_sign_ed25519_sk_to_seed"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_interactive=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_interactive"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_interactive"];var _crypto_stream_xsalsa20=Module["_crypto_stream_xsalsa20"]=asm["_crypto_stream_xsalsa20"];var _crypto_box_open_easy_afternm=Module["_crypto_box_open_easy_afternm"]=asm["_crypto_box_open_easy_afternm"];var _crypto_box_curve25519xsalsa20poly1305_seedbytes=Module["_crypto_box_curve25519xsalsa20poly1305_seedbytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_seedbytes"];var _crypto_stream_salsa20_keybytes=Module["_crypto_stream_salsa20_keybytes"]=asm["_crypto_stream_salsa20_keybytes"];var _crypto_kdf_primitive=Module["_crypto_kdf_primitive"]=asm["_crypto_kdf_primitive"];var _crypto_sign_ed25519ph_final_verify=Module["_crypto_sign_ed25519ph_final_verify"]=asm["_crypto_sign_ed25519ph_final_verify"];var _crypto_sign_ed25519_publickeybytes=Module["_crypto_sign_ed25519_publickeybytes"]=asm["_crypto_sign_ed25519_publickeybytes"];var _crypto_stream_aes128ctr=Module["_crypto_stream_aes128ctr"]=asm["_crypto_stream_aes128ctr"];var _crypto_shorthash=Module["_crypto_shorthash"]=asm["_crypto_shorthash"];var _crypto_auth_keybytes=Module["_crypto_auth_keybytes"]=asm["_crypto_auth_keybytes"];var _crypto_box_curve25519xsalsa20poly1305_open_afternm=Module["_crypto_box_curve25519xsalsa20poly1305_open_afternm"]=asm["_crypto_box_curve25519xsalsa20poly1305_open_afternm"];var _crypto_aead_chacha20poly1305_npubbytes=Module["_crypto_aead_chacha20poly1305_npubbytes"]=asm["_crypto_aead_chacha20poly1305_npubbytes"];var _crypto_aead_xchacha20poly1305_ietf_abytes=Module["_crypto_aead_xchacha20poly1305_ietf_abytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_abytes"];var _crypto_onetimeauth_poly1305_final=Module["_crypto_onetimeauth_poly1305_final"]=asm["_crypto_onetimeauth_poly1305_final"];var _crypto_onetimeauth_poly1305_bytes=Module["_crypto_onetimeauth_poly1305_bytes"]=asm["_crypto_onetimeauth_poly1305_bytes"];var _crypto_box_curve25519xsalsa20poly1305_seed_keypair=Module["_crypto_box_curve25519xsalsa20poly1305_seed_keypair"]=asm["_crypto_box_curve25519xsalsa20poly1305_seed_keypair"];var _crypto_box_primitive=Module["_crypto_box_primitive"]=asm["_crypto_box_primitive"];var _crypto_pwhash_str=Module["_crypto_pwhash_str"]=asm["_crypto_pwhash_str"];var _crypto_auth_hmacsha512_keybytes=Module["_crypto_auth_hmacsha512_keybytes"]=asm["_crypto_auth_hmacsha512_keybytes"];var _crypto_auth=Module["_crypto_auth"]=asm["_crypto_auth"];var _crypto_pwhash_scryptsalsa208sha256_bytes_min=Module["_crypto_pwhash_scryptsalsa208sha256_bytes_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_bytes_min"];var _crypto_core_salsa20_keybytes=Module["_crypto_core_salsa20_keybytes"]=asm["_crypto_core_salsa20_keybytes"];var _crypto_box_afternm=Module["_crypto_box_afternm"]=asm["_crypto_box_afternm"];var _crypto_core_salsa208_constbytes=Module["_crypto_core_salsa208_constbytes"]=asm["_crypto_core_salsa208_constbytes"];var _crypto_onetimeauth_primitive=Module["_crypto_onetimeauth_primitive"]=asm["_crypto_onetimeauth_primitive"];var _crypto_pwhash_scryptsalsa208sha256_str_verify=Module["_crypto_pwhash_scryptsalsa208sha256_str_verify"]=asm["_crypto_pwhash_scryptsalsa208sha256_str_verify"];var _sodium_version_string=Module["_sodium_version_string"]=asm["_sodium_version_string"];var _crypto_stream_xchacha20_xor_ic=Module["_crypto_stream_xchacha20_xor_ic"]=asm["_crypto_stream_xchacha20_xor_ic"];var _crypto_pwhash_scryptsalsa208sha256_passwd_min=Module["_crypto_pwhash_scryptsalsa208sha256_passwd_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_passwd_min"];var _crypto_stream_chacha20_ietf=Module["_crypto_stream_chacha20_ietf"]=asm["_crypto_stream_chacha20_ietf"];var _crypto_generichash=Module["_crypto_generichash"]=asm["_crypto_generichash"];var _crypto_core_hsalsa20_outputbytes=Module["_crypto_core_hsalsa20_outputbytes"]=asm["_crypto_core_hsalsa20_outputbytes"];var _crypto_pwhash_opslimit_interactive=Module["_crypto_pwhash_opslimit_interactive"]=asm["_crypto_pwhash_opslimit_interactive"];var _crypto_stream_aes128ctr_beforenm=Module["_crypto_stream_aes128ctr_beforenm"]=asm["_crypto_stream_aes128ctr_beforenm"];var getTempRet0=Module["getTempRet0"]=asm["getTempRet0"];var _crypto_box_curve25519xsalsa20poly1305_noncebytes=Module["_crypto_box_curve25519xsalsa20poly1305_noncebytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_noncebytes"];var _crypto_stream_salsa2012_noncebytes=Module["_crypto_stream_salsa2012_noncebytes"]=asm["_crypto_stream_salsa2012_noncebytes"];var _crypto_core_salsa208_keybytes=Module["_crypto_core_salsa208_keybytes"]=asm["_crypto_core_salsa208_keybytes"];var _crypto_aead_chacha20poly1305_ietf_decrypt=Module["_crypto_aead_chacha20poly1305_ietf_decrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt"];var _crypto_auth_hmacsha512256_init=Module["_crypto_auth_hmacsha512256_init"]=asm["_crypto_auth_hmacsha512256_init"];var _crypto_kx_server_session_keys=Module["_crypto_kx_server_session_keys"]=asm["_crypto_kx_server_session_keys"];var _crypto_onetimeauth_poly1305_verify=Module["_crypto_onetimeauth_poly1305_verify"]=asm["_crypto_onetimeauth_poly1305_verify"];var _crypto_auth_hmacsha512_final=Module["_crypto_auth_hmacsha512_final"]=asm["_crypto_auth_hmacsha512_final"];var _crypto_stream_aes128ctr_noncebytes=Module["_crypto_stream_aes128ctr_noncebytes"]=asm["_crypto_stream_aes128ctr_noncebytes"];var _crypto_box_secretkeybytes=Module["_crypto_box_secretkeybytes"]=asm["_crypto_box_secretkeybytes"];var _crypto_stream_salsa2012_keygen=Module["_crypto_stream_salsa2012_keygen"]=asm["_crypto_stream_salsa2012_keygen"];var _crypto_onetimeauth_update=Module["_crypto_onetimeauth_update"]=asm["_crypto_onetimeauth_update"];var _crypto_core_salsa20=Module["_crypto_core_salsa20"]=asm["_crypto_core_salsa20"];var _crypto_pwhash_memlimit_interactive=Module["_crypto_pwhash_memlimit_interactive"]=asm["_crypto_pwhash_memlimit_interactive"];var _crypto_scalarmult_bytes=Module["_crypto_scalarmult_bytes"]=asm["_crypto_scalarmult_bytes"];var _crypto_secretbox_detached=Module["_crypto_secretbox_detached"]=asm["_crypto_secretbox_detached"];var _crypto_stream_xor=Module["_crypto_stream_xor"]=asm["_crypto_stream_xor"];var _crypto_secretbox_xchacha20poly1305_easy=Module["_crypto_secretbox_xchacha20poly1305_easy"]=asm["_crypto_secretbox_xchacha20poly1305_easy"];var _crypto_secretbox_easy=Module["_crypto_secretbox_easy"]=asm["_crypto_secretbox_easy"];var _crypto_aead_xchacha20poly1305_ietf_decrypt_detached=Module["_crypto_aead_xchacha20poly1305_ietf_decrypt_detached"]=asm["_crypto_aead_xchacha20poly1305_ietf_decrypt_detached"];var _crypto_stream_salsa20=Module["_crypto_stream_salsa20"]=asm["_crypto_stream_salsa20"];var _sodium_bin2hex=Module["_sodium_bin2hex"]=asm["_sodium_bin2hex"];var _crypto_auth_hmacsha512_statebytes=Module["_crypto_auth_hmacsha512_statebytes"]=asm["_crypto_auth_hmacsha512_statebytes"];var _crypto_pwhash_argon2i_opslimit_sensitive=Module["_crypto_pwhash_argon2i_opslimit_sensitive"]=asm["_crypto_pwhash_argon2i_opslimit_sensitive"];var _crypto_generichash_blake2b_bytes_max=Module["_crypto_generichash_blake2b_bytes_max"]=asm["_crypto_generichash_blake2b_bytes_max"];var _crypto_hash_sha256_update=Module["_crypto_hash_sha256_update"]=asm["_crypto_hash_sha256_update"];var _crypto_core_hsalsa20_constbytes=Module["_crypto_core_hsalsa20_constbytes"]=asm["_crypto_core_hsalsa20_constbytes"];var _crypto_box_easy_afternm=Module["_crypto_box_easy_afternm"]=asm["_crypto_box_easy_afternm"];var _crypto_auth_hmacsha512256_verify=Module["_crypto_auth_hmacsha512256_verify"]=asm["_crypto_auth_hmacsha512256_verify"];var _crypto_pwhash_memlimit_moderate=Module["_crypto_pwhash_memlimit_moderate"]=asm["_crypto_pwhash_memlimit_moderate"];var _crypto_core_salsa20_inputbytes=Module["_crypto_core_salsa20_inputbytes"]=asm["_crypto_core_salsa20_inputbytes"];var _crypto_box_publickeybytes=Module["_crypto_box_publickeybytes"]=asm["_crypto_box_publickeybytes"];var _crypto_sign_secretkeybytes=Module["_crypto_sign_secretkeybytes"]=asm["_crypto_sign_secretkeybytes"];var ___muldsi3=Module["___muldsi3"]=asm["___muldsi3"];var _crypto_scalarmult_scalarbytes=Module["_crypto_scalarmult_scalarbytes"]=asm["_crypto_scalarmult_scalarbytes"];var _crypto_verify_32=Module["_crypto_verify_32"]=asm["_crypto_verify_32"];var _crypto_kx_sessionkeybytes=Module["_crypto_kx_sessionkeybytes"]=asm["_crypto_kx_sessionkeybytes"];var _crypto_aead_chacha20poly1305_decrypt=Module["_crypto_aead_chacha20poly1305_decrypt"]=asm["_crypto_aead_chacha20poly1305_decrypt"];var _crypto_sign=Module["_crypto_sign"]=asm["_crypto_sign"];var _crypto_pwhash_passwd_max=Module["_crypto_pwhash_passwd_max"]=asm["_crypto_pwhash_passwd_max"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_min=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_min"];var _sodium_hex2bin=Module["_sodium_hex2bin"]=asm["_sodium_hex2bin"];var _crypto_pwhash_argon2i_alg_argon2i13=Module["_crypto_pwhash_argon2i_alg_argon2i13"]=asm["_crypto_pwhash_argon2i_alg_argon2i13"];var _crypto_secretbox_keybytes=Module["_crypto_secretbox_keybytes"]=asm["_crypto_secretbox_keybytes"];var _randombytes=Module["_randombytes"]=asm["_randombytes"];var _crypto_hash_bytes=Module["_crypto_hash_bytes"]=asm["_crypto_hash_bytes"];var _crypto_stream_salsa20_keygen=Module["_crypto_stream_salsa20_keygen"]=asm["_crypto_stream_salsa20_keygen"];var _crypto_hash_sha256_statebytes=Module["_crypto_hash_sha256_statebytes"]=asm["_crypto_hash_sha256_statebytes"];var _crypto_pwhash_argon2i_passwd_min=Module["_crypto_pwhash_argon2i_passwd_min"]=asm["_crypto_pwhash_argon2i_passwd_min"];var _crypto_pwhash_opslimit_sensitive=Module["_crypto_pwhash_opslimit_sensitive"]=asm["_crypto_pwhash_opslimit_sensitive"];var _crypto_sign_init=Module["_crypto_sign_init"]=asm["_crypto_sign_init"];var _crypto_generichash_blake2b_personalbytes=Module["_crypto_generichash_blake2b_personalbytes"]=asm["_crypto_generichash_blake2b_personalbytes"];var _crypto_stream_chacha20_xor_ic=Module["_crypto_stream_chacha20_xor_ic"]=asm["_crypto_stream_chacha20_xor_ic"];var _crypto_sign_verify_detached=Module["_crypto_sign_verify_detached"]=asm["_crypto_sign_verify_detached"];var _crypto_onetimeauth_verify=Module["_crypto_onetimeauth_verify"]=asm["_crypto_onetimeauth_verify"];var _crypto_sign_ed25519_detached=Module["_crypto_sign_ed25519_detached"]=asm["_crypto_sign_ed25519_detached"];var _crypto_generichash_init=Module["_crypto_generichash_init"]=asm["_crypto_generichash_init"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _crypto_sign_bytes=Module["_crypto_sign_bytes"]=asm["_crypto_sign_bytes"];var _crypto_generichash_update=Module["_crypto_generichash_update"]=asm["_crypto_generichash_update"];var _crypto_scalarmult=Module["_crypto_scalarmult"]=asm["_crypto_scalarmult"];var _crypto_aead_chacha20poly1305_ietf_abytes=Module["_crypto_aead_chacha20poly1305_ietf_abytes"]=asm["_crypto_aead_chacha20poly1305_ietf_abytes"];var _crypto_sign_detached=Module["_crypto_sign_detached"]=asm["_crypto_sign_detached"];var _crypto_generichash_blake2b_update=Module["_crypto_generichash_blake2b_update"]=asm["_crypto_generichash_blake2b_update"];var _crypto_box_curve25519xsalsa20poly1305_beforenm=Module["_crypto_box_curve25519xsalsa20poly1305_beforenm"]=asm["_crypto_box_curve25519xsalsa20poly1305_beforenm"];var _crypto_generichash_blake2b_bytes=Module["_crypto_generichash_blake2b_bytes"]=asm["_crypto_generichash_blake2b_bytes"];var _crypto_auth_hmacsha512256_bytes=Module["_crypto_auth_hmacsha512256_bytes"]=asm["_crypto_auth_hmacsha512256_bytes"];var _crypto_box_curve25519xchacha20poly1305_noncebytes=Module["_crypto_box_curve25519xchacha20poly1305_noncebytes"]=asm["_crypto_box_curve25519xchacha20poly1305_noncebytes"];var _randombytes_uniform=Module["_randombytes_uniform"]=asm["_randombytes_uniform"];var _crypto_shorthash_siphash24_keybytes=Module["_crypto_shorthash_siphash24_keybytes"]=asm["_crypto_shorthash_siphash24_keybytes"];var _crypto_shorthash_keygen=Module["_crypto_shorthash_keygen"]=asm["_crypto_shorthash_keygen"];var _crypto_onetimeauth_init=Module["_crypto_onetimeauth_init"]=asm["_crypto_onetimeauth_init"];var _crypto_generichash_bytes=Module["_crypto_generichash_bytes"]=asm["_crypto_generichash_bytes"];var _crypto_stream_salsa20_xor=Module["_crypto_stream_salsa20_xor"]=asm["_crypto_stream_salsa20_xor"];var _crypto_auth_hmacsha512_verify=Module["_crypto_auth_hmacsha512_verify"]=asm["_crypto_auth_hmacsha512_verify"];var _crypto_generichash_blake2b_keybytes_min=Module["_crypto_generichash_blake2b_keybytes_min"]=asm["_crypto_generichash_blake2b_keybytes_min"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _crypto_kx_publickeybytes=Module["_crypto_kx_publickeybytes"]=asm["_crypto_kx_publickeybytes"];var _crypto_pwhash_bytes_max=Module["_crypto_pwhash_bytes_max"]=asm["_crypto_pwhash_bytes_max"];var _crypto_aead_chacha20poly1305_ietf_keybytes=Module["_crypto_aead_chacha20poly1305_ietf_keybytes"]=asm["_crypto_aead_chacha20poly1305_ietf_keybytes"];var _crypto_aead_chacha20poly1305_ietf_encrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"];var _crypto_stream=Module["_crypto_stream"]=asm["_crypto_stream"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var _crypto_box_curve25519xchacha20poly1305_beforenm=Module["_crypto_box_curve25519xchacha20poly1305_beforenm"]=asm["_crypto_box_curve25519xchacha20poly1305_beforenm"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _crypto_pwhash=Module["_crypto_pwhash"]=asm["_crypto_pwhash"];var _crypto_auth_hmacsha512256=Module["_crypto_auth_hmacsha512256"]=asm["_crypto_auth_hmacsha512256"];var _crypto_secretbox_xsalsa20poly1305=Module["_crypto_secretbox_xsalsa20poly1305"]=asm["_crypto_secretbox_xsalsa20poly1305"];var _crypto_verify_16_bytes=Module["_crypto_verify_16_bytes"]=asm["_crypto_verify_16_bytes"];var _crypto_stream_salsa208_keygen=Module["_crypto_stream_salsa208_keygen"]=asm["_crypto_stream_salsa208_keygen"];var _emscripten_get_global_libc=Module["_emscripten_get_global_libc"]=asm["_emscripten_get_global_libc"];var _crypto_shorthash_siphashx24_bytes=Module["_crypto_shorthash_siphashx24_bytes"]=asm["_crypto_shorthash_siphashx24_bytes"];var _crypto_generichash_blake2b_final=Module["_crypto_generichash_blake2b_final"]=asm["_crypto_generichash_blake2b_final"];var _crypto_generichash_blake2b_init_salt_personal=Module["_crypto_generichash_blake2b_init_salt_personal"]=asm["_crypto_generichash_blake2b_init_salt_personal"];var _crypto_box_seal=Module["_crypto_box_seal"]=asm["_crypto_box_seal"];var _crypto_aead_xchacha20poly1305_ietf_keygen=Module["_crypto_aead_xchacha20poly1305_ietf_keygen"]=asm["_crypto_aead_xchacha20poly1305_ietf_keygen"];var _crypto_kx_keypair=Module["_crypto_kx_keypair"]=asm["_crypto_kx_keypair"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var _crypto_pwhash_alg_default=Module["_crypto_pwhash_alg_default"]=asm["_crypto_pwhash_alg_default"];var _crypto_box=Module["_crypto_box"]=asm["_crypto_box"];var _crypto_stream_primitive=Module["_crypto_stream_primitive"]=asm["_crypto_stream_primitive"];var _crypto_secretbox_xsalsa20poly1305_boxzerobytes=Module["_crypto_secretbox_xsalsa20poly1305_boxzerobytes"]=asm["_crypto_secretbox_xsalsa20poly1305_boxzerobytes"];var _crypto_pwhash_str_verify=Module["_crypto_pwhash_str_verify"]=asm["_crypto_pwhash_str_verify"];var _crypto_generichash_keybytes_min=Module["_crypto_generichash_keybytes_min"]=asm["_crypto_generichash_keybytes_min"];var _crypto_generichash_statebytes=Module["_crypto_generichash_statebytes"]=asm["_crypto_generichash_statebytes"];var _crypto_onetimeauth_poly1305_statebytes=Module["_crypto_onetimeauth_poly1305_statebytes"]=asm["_crypto_onetimeauth_poly1305_statebytes"];var _crypto_sign_final_verify=Module["_crypto_sign_final_verify"]=asm["_crypto_sign_final_verify"];var _crypto_pwhash_strprefix=Module["_crypto_pwhash_strprefix"]=asm["_crypto_pwhash_strprefix"];var _crypto_secretbox_keygen=Module["_crypto_secretbox_keygen"]=asm["_crypto_secretbox_keygen"];var _crypto_secretbox_xchacha20poly1305_noncebytes=Module["_crypto_secretbox_xchacha20poly1305_noncebytes"]=asm["_crypto_secretbox_xchacha20poly1305_noncebytes"];var _crypto_hash_sha512=Module["_crypto_hash_sha512"]=asm["_crypto_hash_sha512"];var _llvm_cttz_i32=Module["_llvm_cttz_i32"]=asm["_llvm_cttz_i32"];var _crypto_pwhash_scryptsalsa208sha256_bytes_max=Module["_crypto_pwhash_scryptsalsa208sha256_bytes_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_bytes_max"];var _crypto_box_curve25519xchacha20poly1305_detached=Module["_crypto_box_curve25519xchacha20poly1305_detached"]=asm["_crypto_box_curve25519xchacha20poly1305_detached"];var _sodium_library_version_major=Module["_sodium_library_version_major"]=asm["_sodium_library_version_major"];var _crypto_aead_chacha20poly1305_ietf_encrypt=Module["_crypto_aead_chacha20poly1305_ietf_encrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt"];var _crypto_generichash_blake2b_init=Module["_crypto_generichash_blake2b_init"]=asm["_crypto_generichash_blake2b_init"];var _randombytes_close=Module["_randombytes_close"]=asm["_randombytes_close"];var _crypto_pwhash_primitive=Module["_crypto_pwhash_primitive"]=asm["_crypto_pwhash_primitive"];var _crypto_onetimeauth_keybytes=Module["_crypto_onetimeauth_keybytes"]=asm["_crypto_onetimeauth_keybytes"];var _crypto_pwhash_argon2i=Module["_crypto_pwhash_argon2i"]=asm["_crypto_pwhash_argon2i"];var _crypto_stream_aes128ctr_afternm=Module["_crypto_stream_aes128ctr_afternm"]=asm["_crypto_stream_aes128ctr_afternm"];var _crypto_kdf_keybytes=Module["_crypto_kdf_keybytes"]=asm["_crypto_kdf_keybytes"];var establishStackSpace=Module["establishStackSpace"]=asm["establishStackSpace"];var _crypto_aead_chacha20poly1305_encrypt=Module["_crypto_aead_chacha20poly1305_encrypt"]=asm["_crypto_aead_chacha20poly1305_encrypt"];var _crypto_core_salsa2012_inputbytes=Module["_crypto_core_salsa2012_inputbytes"]=asm["_crypto_core_salsa2012_inputbytes"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_min=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_min"];var _crypto_core_salsa208=Module["_crypto_core_salsa208"]=asm["_crypto_core_salsa208"];var _crypto_pwhash_opslimit_max=Module["_crypto_pwhash_opslimit_max"]=asm["_crypto_pwhash_opslimit_max"];var _crypto_auth_verify=Module["_crypto_auth_verify"]=asm["_crypto_auth_verify"];var _crypto_sign_ed25519_seed_keypair=Module["_crypto_sign_ed25519_seed_keypair"]=asm["_crypto_sign_ed25519_seed_keypair"];var _crypto_auth_hmacsha512256_keygen=Module["_crypto_auth_hmacsha512256_keygen"]=asm["_crypto_auth_hmacsha512256_keygen"];var _randombytes_stir=Module["_randombytes_stir"]=asm["_randombytes_stir"];var _memset=Module["_memset"]=asm["_memset"];var _crypto_box_open_detached_afternm=Module["_crypto_box_open_detached_afternm"]=asm["_crypto_box_open_detached_afternm"];var _crypto_pwhash_argon2i_memlimit_sensitive=Module["_crypto_pwhash_argon2i_memlimit_sensitive"]=asm["_crypto_pwhash_argon2i_memlimit_sensitive"];var _crypto_kx_primitive=Module["_crypto_kx_primitive"]=asm["_crypto_kx_primitive"];var _crypto_stream_salsa2012_keybytes=Module["_crypto_stream_salsa2012_keybytes"]=asm["_crypto_stream_salsa2012_keybytes"];var _crypto_aead_xchacha20poly1305_ietf_decrypt=Module["_crypto_aead_xchacha20poly1305_ietf_decrypt"]=asm["_crypto_aead_xchacha20poly1305_ietf_decrypt"];var _crypto_pwhash_scryptsalsa208sha256_strprefix=Module["_crypto_pwhash_scryptsalsa208sha256_strprefix"]=asm["_crypto_pwhash_scryptsalsa208sha256_strprefix"];var _crypto_core_salsa20_outputbytes=Module["_crypto_core_salsa20_outputbytes"]=asm["_crypto_core_salsa20_outputbytes"];var _crypto_auth_keygen=Module["_crypto_auth_keygen"]=asm["_crypto_auth_keygen"];var _crypto_secretbox=Module["_crypto_secretbox"]=asm["_crypto_secretbox"];var _crypto_aead_xchacha20poly1305_ietf_encrypt_detached=Module["_crypto_aead_xchacha20poly1305_ietf_encrypt_detached"]=asm["_crypto_aead_xchacha20poly1305_ietf_encrypt_detached"];var _crypto_pwhash_scryptsalsa208sha256_passwd_max=Module["_crypto_pwhash_scryptsalsa208sha256_passwd_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_passwd_max"];var _crypto_auth_hmacsha256_bytes=Module["_crypto_auth_hmacsha256_bytes"]=asm["_crypto_auth_hmacsha256_bytes"];var _crypto_auth_hmacsha256_verify=Module["_crypto_auth_hmacsha256_verify"]=asm["_crypto_auth_hmacsha256_verify"];var _crypto_sign_keypair=Module["_crypto_sign_keypair"]=asm["_crypto_sign_keypair"];var _crypto_stream_xchacha20=Module["_crypto_stream_xchacha20"]=asm["_crypto_stream_xchacha20"];var _crypto_onetimeauth_statebytes=Module["_crypto_onetimeauth_statebytes"]=asm["_crypto_onetimeauth_statebytes"];var _crypto_sign_ed25519ph_init=Module["_crypto_sign_ed25519ph_init"]=asm["_crypto_sign_ed25519ph_init"];var _crypto_stream_salsa20_noncebytes=Module["_crypto_stream_salsa20_noncebytes"]=asm["_crypto_stream_salsa20_noncebytes"];var _crypto_shorthash_keybytes=Module["_crypto_shorthash_keybytes"]=asm["_crypto_shorthash_keybytes"];var _crypto_aead_chacha20poly1305_keygen=Module["_crypto_aead_chacha20poly1305_keygen"]=asm["_crypto_aead_chacha20poly1305_keygen"];var _crypto_shorthash_siphashx24=Module["_crypto_shorthash_siphashx24"]=asm["_crypto_shorthash_siphashx24"];var _memmove=Module["_memmove"]=asm["_memmove"];var _crypto_hash_sha512_final=Module["_crypto_hash_sha512_final"]=asm["_crypto_hash_sha512_final"];var _crypto_box_curve25519xsalsa20poly1305_zerobytes=Module["_crypto_box_curve25519xsalsa20poly1305_zerobytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_zerobytes"];var _crypto_shorthash_siphashx24_keybytes=Module["_crypto_shorthash_siphashx24_keybytes"]=asm["_crypto_shorthash_siphashx24_keybytes"];var _crypto_pwhash_passwd_min=Module["_crypto_pwhash_passwd_min"]=asm["_crypto_pwhash_passwd_min"];var _crypto_kdf_bytes_max=Module["_crypto_kdf_bytes_max"]=asm["_crypto_kdf_bytes_max"];var _crypto_box_curve25519xsalsa20poly1305_boxzerobytes=Module["_crypto_box_curve25519xsalsa20poly1305_boxzerobytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_boxzerobytes"];var _crypto_generichash_bytes_min=Module["_crypto_generichash_bytes_min"]=asm["_crypto_generichash_bytes_min"];var _crypto_core_salsa2012_outputbytes=Module["_crypto_core_salsa2012_outputbytes"]=asm["_crypto_core_salsa2012_outputbytes"];var _crypto_auth_hmacsha256_keybytes=Module["_crypto_auth_hmacsha256_keybytes"]=asm["_crypto_auth_hmacsha256_keybytes"];var _crypto_core_salsa208_inputbytes=Module["_crypto_core_salsa208_inputbytes"]=asm["_crypto_core_salsa208_inputbytes"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_max=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_max"];var _crypto_sign_update=Module["_crypto_sign_update"]=asm["_crypto_sign_update"];var _crypto_secretbox_xchacha20poly1305_detached=Module["_crypto_secretbox_xchacha20poly1305_detached"]=asm["_crypto_secretbox_xchacha20poly1305_detached"];var _crypto_stream_chacha20_noncebytes=Module["_crypto_stream_chacha20_noncebytes"]=asm["_crypto_stream_chacha20_noncebytes"];var _crypto_secretbox_open_detached=Module["_crypto_secretbox_open_detached"]=asm["_crypto_secretbox_open_detached"];var _crypto_box_curve25519xchacha20poly1305_seed_keypair=Module["_crypto_box_curve25519xchacha20poly1305_seed_keypair"]=asm["_crypto_box_curve25519xchacha20poly1305_seed_keypair"];var _crypto_pwhash_argon2i_memlimit_min=Module["_crypto_pwhash_argon2i_memlimit_min"]=asm["_crypto_pwhash_argon2i_memlimit_min"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive"];var _crypto_box_curve25519xsalsa20poly1305_secretkeybytes=Module["_crypto_box_curve25519xsalsa20poly1305_secretkeybytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_secretkeybytes"];var _crypto_kdf_contextbytes=Module["_crypto_kdf_contextbytes"]=asm["_crypto_kdf_contextbytes"];var _crypto_stream_xchacha20_keybytes=Module["_crypto_stream_xchacha20_keybytes"]=asm["_crypto_stream_xchacha20_keybytes"];var _crypto_box_seal_open=Module["_crypto_box_seal_open"]=asm["_crypto_box_seal_open"];var _crypto_shorthash_primitive=Module["_crypto_shorthash_primitive"]=asm["_crypto_shorthash_primitive"];var _crypto_core_hsalsa20_inputbytes=Module["_crypto_core_hsalsa20_inputbytes"]=asm["_crypto_core_hsalsa20_inputbytes"];var _crypto_onetimeauth_final=Module["_crypto_onetimeauth_final"]=asm["_crypto_onetimeauth_final"];var _crypto_secretbox_open_easy=Module["_crypto_secretbox_open_easy"]=asm["_crypto_secretbox_open_easy"];var _crypto_core_salsa2012=Module["_crypto_core_salsa2012"]=asm["_crypto_core_salsa2012"];var _crypto_box_curve25519xchacha20poly1305_macbytes=Module["_crypto_box_curve25519xchacha20poly1305_macbytes"]=asm["_crypto_box_curve25519xchacha20poly1305_macbytes"];var _crypto_auth_hmacsha512256_statebytes=Module["_crypto_auth_hmacsha512256_statebytes"]=asm["_crypto_auth_hmacsha512256_statebytes"];var _bitshift64Ashr=Module["_bitshift64Ashr"]=asm["_bitshift64Ashr"];var _crypto_box_curve25519xchacha20poly1305_publickeybytes=Module["_crypto_box_curve25519xchacha20poly1305_publickeybytes"]=asm["_crypto_box_curve25519xchacha20poly1305_publickeybytes"];var _crypto_stream_chacha20_xor=Module["_crypto_stream_chacha20_xor"]=asm["_crypto_stream_chacha20_xor"];var _crypto_core_hsalsa20=Module["_crypto_core_hsalsa20"]=asm["_crypto_core_hsalsa20"];Runtime.stackAlloc=Module["stackAlloc"];Runtime.stackSave=Module["stackSave"];Runtime.stackRestore=Module["stackRestore"];Runtime.establishStackSpace=Module["establishStackSpace"];Runtime.setTempRet0=Module["setTempRet0"];Runtime.getTempRet0=Module["getTempRet0"];Module["asm"]=asm;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}Module.printErr("exception thrown: "+toLog);Module["quit"](1,e)}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}Module["quit"](status,new ExitStatus(status))}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()




    ENVIRONMENT_IS_NODE && !process.removeAllListeners("uncaughtException");
    return Module;
}));
(function (root, factory) {
    if (typeof process === "object" && typeof process.stdout === "undefined") {
        process.stderr = process.stdout = { write: function() { } };
    }
    if (typeof define === "function" && define.amd) {
        define(["exports", "libsodium-sumo"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("libsodium-sumo"));
    } else {
        var cb = root.sodium && root.sodium.onload;
        factory((root.sodium = {}), root.libsodium);
        if (typeof cb === "function") {
            cb(root.sodium);
        }
    }
}(this, (function (exports, libsodium) {
    "use strict";

    var output_format = "uint8array";

    if (libsodium._sodium_init() !== 0) {
        throw new Error("libsodium was not correctly initialized.");
    }

    // List of functions and constants defined in the wrapped libsodium
    function symbols() {
        return Object.keys(exports).sort();
    }

    function increment(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be incremented");
        }
        var c = 1 << 8;
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            c >>= 8;
            c += bytes[i];
            bytes[i] = c & 0xff;
        }
    }

    function add(a, b) {
        if (! a instanceof Uint8Array || ! b instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can added");
        }
        var j = a.length, c = 0 | 0, i = 0 | 0;
        if (b.length != a.length) {
            throw new TypeError("Arguments must have the same length");
        }
        for (i = 0; i < j; i++) {
            c >>= 8;
            c += (a[i] + b[j]);
            a[i] = c & 0xff;
        }
    }

    function is_zero(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be checked");
        }
        var d = 0 | 0;
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            d |= bytes[i];
        }
        return d === 0;
    }

    function memzero(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be wiped");
        }
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            bytes[i] = 0;
        }
    }

    function memcmp(b1, b2) {
        if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
            throw new TypeError("Only Uint8Array instances can be compared");
        }
        if (b1.length !== b2.length) {
            throw new TypeError("Only instances of identical length can be compared");
        }
        for (var d = 0 | 0, i = 0 | 0, j = b1.length; i < j; i++) {
            d |= b1[i] ^ b2[i];
        }
        return d === 0;
    }

    function compare(b1, b2) {
        if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
            throw new TypeError("Only Uint8Array instances can be compared");
        }
        if (b1.length !== b2.length) {
            throw new TypeError("Only instances of identical length can be compared");
        }
        for (var gt = 0 | 0, eq = 1 | 1, i = b1.length; i-- > 0;) {
            gt |= ((b2[i] - b1[i]) >> 8) & eq;
            eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
        }
        return (gt + gt + eq) - 1;
    }

    //---------------------------------------------------------------------------
    // Codecs
    //
    function from_string(str) {
        if (typeof TextEncoder === "function") {
            return new TextEncoder("utf-8").encode(str);
        }
        str = unescape(encodeURIComponent(str));
        var bytes = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

    function to_string(bytes) {
        if (typeof TextDecoder === "function") {
            return new TextDecoder("utf-8", {fatal: true}).decode(bytes);
        }

        var toStringChunkSize = 8192,
            numChunks = Math.ceil(bytes.length / toStringChunkSize);
        if (numChunks <= 1) {
            try {
                return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
            }
            catch (_) {
                throw new TypeError("The encoded data was not valid.");
            }
        }
        var totalString = '';
        var sequenceReadOffset = 0;
        for (var i = 0; i < numChunks; i++) {
            var currentChunk =
                Array.prototype.slice.call(bytes,
                                           i * toStringChunkSize + sequenceReadOffset,
                                           (i + 1) * toStringChunkSize + sequenceReadOffset);
            //Depending on how much we have shifted
            if (currentChunk.length == 0) {
                continue;
            }

            //Checking that we didn't cut the buffer in the middle of a UTF8 sequence.
            //If we did, remove the bytes of the "cut" sequence and
            //decrement sequenceReadOffset for each removed byte
            var sequenceDetectionComplete,
                sequenceIndex = currentChunk.length,
                sequenceLength = 0;

            //This loop will read the chunk from its end, looking for sequence start bytes
            do {
                sequenceIndex--;
                var currentByte = currentChunk[sequenceIndex];

                if (currentByte >= 240) { //Beginning of a 4-byte UTF-8 sequence
                    sequenceLength = 4;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 224) { //Beginning of a 3-byte UTF-8 sequence
                    sequenceLength = 3;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 192) { //Beginning of a 2-byte UTF-8 sequence
                    sequenceLength = 2;
                    sequenceDetectionComplete = true;
                } else if (currentByte < 128) { //A one byte UTF-8 char
                    sequenceLength = 1;
                    sequenceDetectionComplete = true;
                }
                //The values between [128, 192[ are part of a UTF-8 sequence.
                //The loop will not exit in that case, and will iterate one byte backwards instead
            } while (!sequenceDetectionComplete);

            var extraBytes = sequenceLength - (currentChunk.length - sequenceIndex);
            for (var j = 0; j < extraBytes; j++) {
                sequenceReadOffset--;
                currentChunk.pop();
            }

            totalString += to_string(currentChunk);
        }
        return totalString;
    }

    /* not constant-time */
    function from_hex(str) {
        if (!is_hex(str)) {
            throw new TypeError("The provided string doesn't look like hex data");
        }
        var result = new Uint8Array(str.length / 2);
        for (var i = 0; i < str.length; i += 2) {
            result[i >>> 1] = parseInt(str.substr(i, 2), 16);
        }
        return result;
    }

    function to_hex(bytes) {
        var str = "", b, c, x;
        for (var i = 0; i < bytes.length; i++) {
            c = bytes[i] & 0xf;
            b = bytes[i] >>> 4;
            x = (87 + c + (((c - 10) >> 8) & ~38)) << 8 |
                (87 + b + (((b - 10) >> 8) & ~38));
            str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
        }
        return str;
    }

    function is_hex(str) {
        return (typeof str === "string" && /^[0-9a-f]+$/i.test(str) && str.length % 2 === 0);
    }

    function from_base64(sBase64, nBlocksSize) {
        function _b64ToUint6(nChr) {
            return nChr > 64 && nChr < 91 ?
                nChr - 65 : nChr > 96 && nChr < 123 ?
                nChr - 71 : nChr > 47 && nChr < 58 ?
                nChr + 4 : nChr === 43 ?
                62 : nChr === 47 ?
                63 :
                0;
        }

        var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
            nInLen = sB64Enc.length,
            nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
            taBytes = new Uint8Array(nOutLen);

        for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
            nMod4 = nInIdx & 3;
            nUint24 |= _b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
            if (nMod4 === 3 || nInLen - nInIdx === 1) {
                for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                    taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                }
                nUint24 = 0;
            }
        }
        return taBytes;
    }

    function to_base64(aBytes, noNewLine) {
        if (typeof noNewLine === "undefined") {
            noNewLine = true;
        }
        function _uint6ToB64(nUint6) {
            return nUint6 < 26 ?
                nUint6 + 65 : nUint6 < 52 ?
                nUint6 + 71 : nUint6 < 62 ?
                nUint6 - 4 : nUint6 === 62 ?
                43 : nUint6 === 63 ?
                47 :
                65;
        }
        if (typeof aBytes === "string") {
            throw new Error("input has to be an array");
        }
        var nMod3 = 2,
            sB64Enc = "";
        for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
            nMod3 = nIdx % 3;
            if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0 && !noNewLine) {
                sB64Enc += "\r\n";
            }
            nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
            if (nMod3 === 2 || aBytes.length - nIdx === 1) {
                sB64Enc += String.fromCharCode(_uint6ToB64(nUint24 >>> 18 & 63),
                                               _uint6ToB64(nUint24 >>> 12 & 63),
                                               _uint6ToB64(nUint24 >>> 6 & 63),
                                               _uint6ToB64(nUint24 & 63));
                nUint24 = 0;
            }
        }
        return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) +
            (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");
    }

    function output_formats() {
        return ["uint8array", "text", "hex", "base64"];
    }

    function _format_output(output, optionalOutputFormat) {
        var selectedOutputFormat = optionalOutputFormat || output_format;
        if (!_is_output_format(selectedOutputFormat)) {
            throw new Error(selectedOutputFormat + " output format is not available");
        }
        if (output instanceof AllocatedBuf) {
            if (selectedOutputFormat === "uint8array") {
                return output.to_Uint8Array();
            } else if (selectedOutputFormat === "text") {
                return to_string(output.to_Uint8Array());
            } else if (selectedOutputFormat === "hex") {
                return to_hex(output.to_Uint8Array());
            } else if (selectedOutputFormat === "base64") {
                return to_base64(output.to_Uint8Array());
            } else {
                throw new Error("What is output format \"" + selectedOutputFormat + "\"?");
            }
        } else if (typeof output === "object") { //Composed output. Example : key pairs
            var props = Object.keys(output);
            var formattedOutput = {};
            for (var i = 0; i < props.length; i++) {
                formattedOutput[props[i]] = _format_output(output[props[i]], selectedOutputFormat);
            }
            return formattedOutput;
        } else if (typeof output === "string") {
            return output;
        } else {
            throw new TypeError("Cannot format output");
        }
    }

    function _is_output_format(format) {
        var formats = output_formats();
        for (var i = 0; i < formats.length; i++) {
            if (formats[i] === format) {
                return true;
            }
        }
        return false;
    }

    function _check_output_format(format) {
        if (!format) {
            return;
        } else if (typeof format !== "string") {
            throw new TypeError("When defined, the output format must be a string");
        } else if (!_is_output_format(format)) {
            throw new Error(format + " is not a supported output format");
        }
    }

    //---------------------------------------------------------------------------
    // Memory management
    //
    // AllocatedBuf: address allocated using _malloc() + length
    function AllocatedBuf(length) {
        this.length = length;
        this.address = _malloc(length);
    }

    // Copy the content of a AllocatedBuf (_malloc()'d memory) into a Uint8Array
    AllocatedBuf.prototype.to_Uint8Array = function () {
        var result = new Uint8Array(this.length);
        result.set(libsodium.HEAPU8.subarray(this.address, this.address + this.length));
        return result;
    };

    // _malloc() a region and initialize it with the content of a Uint8Array
    function _to_allocated_buf_address(bytes) {
        var address = _malloc(bytes.length);
        libsodium.HEAPU8.set(bytes, address);
        return address;
    }

    function _malloc(length) {
        var result = libsodium._malloc(length);
        if (result === 0) {
            throw {
                message: "_malloc() failed",
                length: length
            };
        }
        return result;
    }

    function _free(address) {
        libsodium._free(address);
    }

    function _free_all(addresses) {
        for (var i = 0; i < addresses.length; i++) {
            _free(addresses[i]);
        }
    }

    function _free_and_throw_error(address_pool, err) {
        _free_all(address_pool);
        throw new Error(err);
    }

    function _free_and_throw_type_error(address_pool, err) {
        _free_all(address_pool);
        throw new TypeError(err);
    }

    function _require_defined(address_pool, varValue, varName) {
        if (varValue == undefined) {
            _free_and_throw_type_error(address_pool, varName + " cannot be null or undefined");
        }
    }

    function _any_to_Uint8Array(address_pool, varValue, varName) {
        _require_defined(address_pool, varValue, varName);
        if (varValue instanceof Uint8Array) {
            return varValue;
        } else if (typeof varValue === "string") {
            return from_string(varValue);
        }
        _free_and_throw_type_error(address_pool, "unsupported input type for " + varName);
    }

    
	function crypto_aead_chacha20poly1305_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_aead_chacha20poly1305_ietf_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_aead_chacha20poly1305_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_aead_chacha20poly1305_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_aead_xchacha20poly1305_ietf_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_xchacha20poly1305_ietf_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_xchacha20poly1305_ietf_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_xchacha20poly1305_ietf_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_xchacha20poly1305_ietf_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_xchacha20poly1305_ietf_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_xchacha20poly1305_ietf_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_xchacha20poly1305_ietf_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_xchacha20poly1305_ietf_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_xchacha20poly1305_ietf_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_xchacha20poly1305_ietf_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_aead_xchacha20poly1305_ietf_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output tag (buf)
		
		var tag_length = (libsodium._crypto_auth_bytes()) | 0,
		    tag = new AllocatedBuf(tag_length),
		    tag_address = tag.address;
		
		address_pool.push(tag_address);
		
		if ((libsodium._crypto_auth(tag_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(tag, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha256(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_auth_hmacsha256_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_hmacsha256_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha256_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_hmacsha512(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha512(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha512_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_auth_hmacsha512_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_hmacsha512_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha512_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_auth_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_auth_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_box_beforenm(publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output sharedKey (buf)
		
		var sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0,
		    sharedKey = new AllocatedBuf(sharedKey_length),
		    sharedKey_address = sharedKey.address;
		
		address_pool.push(sharedKey_address);
		
		if ((libsodium._crypto_box_beforenm(sharedKey_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(sharedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_detached(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_box_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_box_detached(ciphertext_address, mac_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy(ciphertext_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy_afternm(message, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy_afternm(ciphertext_address, message_address, message_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output secretKey (buf)
		
		var secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    secretKey = new AllocatedBuf(secretKey_length),
		    secretKey_address = secretKey.address;
		
		address_pool.push(secretKey_address);
		
		if ((libsodium._crypto_box_keypair(publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: secretKey, keyType: "curve25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_detached(ciphertext, mac, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_detached(plaintext_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy(ciphertext, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy_afternm(ciphertext, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy_afternm(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal(message, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_sealbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_seal(ciphertext_address, message_address, message_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal_open(ciphertext, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_sealbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_seal_open(plaintext_address, ciphertext_address, ciphertext_length, 0, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_box_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_box_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash(hash_length, message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash(hash_address, hash_length, message_address, message_length, 0, key_address, key_length) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_final(state_address, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash_final(state_address, hash_address, hash_length) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_init(key, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output state (generichash_state)
		
		var state_address = new AllocatedBuf(357).address;
		
		if ((libsodium._crypto_generichash_init(state_address, key_address, key_length, hash_length) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_generichash_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_generichash_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_generichash_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_generichash_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha256(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha256(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha512(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha512(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_kdf_derive_from_key(subkey_len, subkey_id, ctx, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: subkey_len (uint)
		
		_require_defined(address_pool, subkey_len, "subkey_len");
		
		if (!(typeof subkey_len === "number" && (subkey_len | 0) === subkey_len) && (subkey_len | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "subkey_len must be an unsigned integer");
		}
		
		// ---------- input: subkey_id (uint)
		
		_require_defined(address_pool, subkey_id, "subkey_id");
		
		if (!(typeof subkey_id === "number" && (subkey_id | 0) === subkey_id) && (subkey_id | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "subkey_id must be an unsigned integer");
		}
		
		// ---------- input: ctx (string)
		
		ctx = from_string(ctx + "\0");
		var ctx_address = _to_allocated_buf_address(ctx),
		    ctx_length = ctx.length - 1;
		address_pool.push(ctx_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_kdf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output subkey (buf)
		
		var subkey_length = (subkey_len) | 0,
		    subkey = new AllocatedBuf(subkey_length),
		    subkey_address = subkey.address;
		
		address_pool.push(subkey_address);
		
		libsodium._crypto_kdf_derive_from_key(subkey_address, subkey_len, 0, subkey_id, 0, ctx_address, key_address);
		var ret = (_format_output(subkey, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_kdf_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_kdf_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_kdf_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_kx_client_session_keys(clientPublicKey, clientSecretKey, serverPublicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: clientPublicKey (buf)
		
		clientPublicKey = _any_to_Uint8Array(address_pool, clientPublicKey, "clientPublicKey");
		var clientPublicKey_address, clientPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
		if (clientPublicKey.length !== clientPublicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid clientPublicKey length");
		}
		clientPublicKey_address = _to_allocated_buf_address(clientPublicKey);
		address_pool.push(clientPublicKey_address);
		
		// ---------- input: clientSecretKey (buf)
		
		clientSecretKey = _any_to_Uint8Array(address_pool, clientSecretKey, "clientSecretKey");
		var clientSecretKey_address, clientSecretKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0;
		if (clientSecretKey.length !== clientSecretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid clientSecretKey length");
		}
		clientSecretKey_address = _to_allocated_buf_address(clientSecretKey);
		address_pool.push(clientSecretKey_address);
		
		// ---------- input: serverPublicKey (buf)
		
		serverPublicKey = _any_to_Uint8Array(address_pool, serverPublicKey, "serverPublicKey");
		var serverPublicKey_address, serverPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
		if (serverPublicKey.length !== serverPublicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid serverPublicKey length");
		}
		serverPublicKey_address = _to_allocated_buf_address(serverPublicKey);
		address_pool.push(serverPublicKey_address);
		
		// ---------- output sharedRx (buf)
		
		var sharedRx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
		    sharedRx = new AllocatedBuf(sharedRx_length),
		    sharedRx_address = sharedRx.address;
		
		address_pool.push(sharedRx_address);
		
		// ---------- output sharedTx (buf)
		
		var sharedTx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
		    sharedTx = new AllocatedBuf(sharedTx_length),
		    sharedTx_address = sharedTx.address;
		
		address_pool.push(sharedTx_address);
		
		if ((libsodium._crypto_kx_client_session_keys(sharedRx_address, sharedTx_address, clientPublicKey_address, clientSecretKey_address, serverPublicKey_address) | 0) === 0) {
			var ret = _format_output({sharedRx: sharedRx, sharedTx: sharedTx}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_kx_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_kx_keypair(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_kx_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_kx_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_kx_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_kx_server_session_keys(serverPublicKey, serverSecretKey, clientPublicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: serverPublicKey (buf)
		
		serverPublicKey = _any_to_Uint8Array(address_pool, serverPublicKey, "serverPublicKey");
		var serverPublicKey_address, serverPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
		if (serverPublicKey.length !== serverPublicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid serverPublicKey length");
		}
		serverPublicKey_address = _to_allocated_buf_address(serverPublicKey);
		address_pool.push(serverPublicKey_address);
		
		// ---------- input: serverSecretKey (buf)
		
		serverSecretKey = _any_to_Uint8Array(address_pool, serverSecretKey, "serverSecretKey");
		var serverSecretKey_address, serverSecretKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0;
		if (serverSecretKey.length !== serverSecretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid serverSecretKey length");
		}
		serverSecretKey_address = _to_allocated_buf_address(serverSecretKey);
		address_pool.push(serverSecretKey_address);
		
		// ---------- input: clientPublicKey (buf)
		
		clientPublicKey = _any_to_Uint8Array(address_pool, clientPublicKey, "clientPublicKey");
		var clientPublicKey_address, clientPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
		if (clientPublicKey.length !== clientPublicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid clientPublicKey length");
		}
		clientPublicKey_address = _to_allocated_buf_address(clientPublicKey);
		address_pool.push(clientPublicKey_address);
		
		// ---------- output sharedRx (buf)
		
		var sharedRx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
		    sharedRx = new AllocatedBuf(sharedRx_length),
		    sharedRx_address = sharedRx.address;
		
		address_pool.push(sharedRx_address);
		
		// ---------- output sharedTx (buf)
		
		var sharedTx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
		    sharedTx = new AllocatedBuf(sharedTx_length),
		    sharedTx_address = sharedTx.address;
		
		address_pool.push(sharedTx_address);
		
		if ((libsodium._crypto_kx_server_session_keys(sharedRx_address, sharedTx_address, serverPublicKey_address, serverSecretKey_address, clientPublicKey_address) | 0) === 0) {
			var ret = _format_output({sharedRx: sharedRx, sharedTx: sharedTx}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_final(state_address, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth_final(state_address, hash_address) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_init(key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output state (onetimeauth_state)
		
		var state_address = new AllocatedBuf(144).address;
		
		if ((libsodium._crypto_onetimeauth_init(state_address, key_address) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_onetimeauth_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_onetimeauth_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_onetimeauth_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_onetimeauth_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_verify(hash, message, key) {
		var address_pool = [];

		// ---------- input: hash (buf)
		
		hash = _any_to_Uint8Array(address_pool, hash, "hash");
		var hash_address, hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0;
		if (hash.length !== hash_length) {
		        _free_and_throw_type_error(address_pool, "invalid hash length");
		}
		hash_address = _to_allocated_buf_address(hash);
		address_pool.push(hash_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_onetimeauth_verify(hash_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash(keyLength, password, salt, opsLimit, memLimit, algorithm, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- input: algorithm (uint)
		
		_require_defined(address_pool, algorithm, "algorithm");
		
		if (!(typeof algorithm === "number" && (algorithm | 0) === algorithm) && (algorithm | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "algorithm must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit, algorithm) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256(keyLength, password, salt, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_ll(password, salt, opsLimit, r, p, keyLength, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (unsized_buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address = _to_allocated_buf_address(salt),
		    salt_length = salt.length;
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: r (uint)
		
		_require_defined(address_pool, r, "r");
		
		if (!(typeof r === "number" && (r | 0) === r) && (r | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "r must be an unsigned integer");
		}
		
		// ---------- input: p (uint)
		
		_require_defined(address_pool, p, "p");
		
		if (!(typeof p === "number" && (p | 0) === p) && (p | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "p must be an unsigned integer");
		}
		
		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_ll(password_address, password_length, salt_address, salt_length, opsLimit, 0, r, p, derivedKey_address, keyLength) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_scalarmult(privateKey, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output sharedSecret (buf)
		
		var sharedSecret_length = (libsodium._crypto_scalarmult_bytes()) | 0,
		    sharedSecret = new AllocatedBuf(sharedSecret_length),
		    sharedSecret_address = sharedSecret.address;
		
		address_pool.push(sharedSecret_address);
		
		if ((libsodium._crypto_scalarmult(sharedSecret_address, privateKey_address, publicKey_address) | 0) === 0) {
			var ret = _format_output(sharedSecret, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_scalarmult_base(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_scalarmult_base(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_detached(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_secretbox_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_secretbox_detached(cipher_address, mac_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output({mac: mac, cipher: cipher}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_easy(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length + libsodium._crypto_secretbox_macbytes()) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		if ((libsodium._crypto_secretbox_easy(cipher_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(cipher, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_secretbox_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_secretbox_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_secretbox_open_detached(ciphertext, mac, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_secretbox_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_detached(message_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_open_easy(ciphertext, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_secretbox_macbytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_easy(message_address, ciphertext_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_shorthash(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_shorthash_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_shorthash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_shorthash(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_shorthash_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_shorthash_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_shorthash_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_shorthash_siphashx24(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_shorthash_siphashx24_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_shorthash_siphashx24_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_shorthash_siphashx24(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (message.length + libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_detached(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign_detached(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_pk_to_curve25519(edPk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edPk (buf)
		
		edPk = _any_to_Uint8Array(address_pool, edPk, "edPk");
		var edPk_address, edPk_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (edPk.length !== edPk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edPk length");
		}
		edPk_address = _to_allocated_buf_address(edPk);
		address_pool.push(edPk_address);
		
		// ---------- output cPk (buf)
		
		var cPk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cPk = new AllocatedBuf(cPk_length),
		    cPk_address = cPk.address;
		
		address_pool.push(cPk_address);
		
		if ((libsodium._crypto_sign_ed25519_pk_to_curve25519(cPk_address, edPk_address) | 0) === 0) {
			var ret = _format_output(cPk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_curve25519(edSk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edSk (buf)
		
		edSk = _any_to_Uint8Array(address_pool, edSk, "edSk");
		var edSk_address, edSk_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (edSk.length !== edSk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edSk length");
		}
		edSk_address = _to_allocated_buf_address(edSk);
		address_pool.push(edSk_address);
		
		// ---------- output cSk (buf)
		
		var cSk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cSk = new AllocatedBuf(cSk_length),
		    cSk_address = cSk.address;
		
		address_pool.push(cSk_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_curve25519(cSk_address, edSk_address) | 0) === 0) {
			var ret = _format_output(cSk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_pk(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_pk(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_seed(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output seed (buf)
		
		var seed_length = (libsodium._crypto_sign_seedbytes()) | 0,
		    seed = new AllocatedBuf(seed_length),
		    seed_address = seed.address;
		
		address_pool.push(seed_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_seed(seed_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(seed, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_final_create(state_address, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (sign_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign_final_create(state_address, signature_address, null, privateKey_address) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(signature, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_final_verify(state_address, signature, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (sign_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: signature (buf)
		
		signature = _any_to_Uint8Array(address_pool, signature, "signature");
		var signature_address, signature_length = (libsodium._crypto_sign_bytes()) | 0;
		if (signature.length !== signature_length) {
		        _free_and_throw_type_error(address_pool, "invalid signature length");
		}
		signature_address = _to_allocated_buf_address(signature);
		address_pool.push(signature_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		var verificationResult = libsodium._crypto_sign_final_verify(state_address, signature_address, publicKey_address) | 0;
		var ret = (verificationResult === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_sign_init(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output state (sign_state)
		
		var state_address = new AllocatedBuf(208).address;
		
		if ((libsodium._crypto_sign_init(state_address) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_keypair(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: 'ed25519'}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_open(signedMessage, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: signedMessage (unsized_buf)
		
		signedMessage = _any_to_Uint8Array(address_pool, signedMessage, "signedMessage");
		var signedMessage_address = _to_allocated_buf_address(signedMessage),
		    signedMessage_length = signedMessage.length;
		address_pool.push(signedMessage_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output message (buf)
		
		var message_length = (signedMessage_length - libsodium._crypto_sign_bytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_sign_open(message_address, null, signedMessage_address, signedMessage_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_sign_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: "ed25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (sign_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_sign_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_verify_detached(signature, message, publicKey) {
		var address_pool = [];

		// ---------- input: signature (buf)
		
		signature = _any_to_Uint8Array(address_pool, signature, "signature");
		var signature_address, signature_length = (libsodium._crypto_sign_bytes()) | 0;
		if (signature.length !== signature_length) {
		        _free_and_throw_type_error(address_pool, "invalid signature length");
		}
		signature_address = _to_allocated_buf_address(signature);
		address_pool.push(signature_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		var verificationResult = libsodium._crypto_sign_verify_detached(signature_address, message_address, message_length, 0, publicKey_address) | 0;
		var ret = (verificationResult === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_stream_chacha20_ietf_xor(input_message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_ietf_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_chacha20_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_chacha20_ietf_xor(output_message_address, input_message_address, input_message_length, 0, nonce_address, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_stream_chacha20_ietf_xor_ic(input_message, nonce, nonce_increment, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_ietf_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: nonce_increment (uint)
		
		_require_defined(address_pool, nonce_increment, "nonce_increment");
		
		if (!(typeof nonce_increment === "number" && (nonce_increment | 0) === nonce_increment) && (nonce_increment | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "nonce_increment must be an unsigned integer");
		}
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_chacha20_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_chacha20_ietf_xor_ic(output_message_address, input_message_address, input_message_length, 0, nonce_address, nonce_increment, 0, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_stream_chacha20_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_stream_chacha20_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_stream_chacha20_xor(input_message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_chacha20_xor(output_message_address, input_message_address, input_message_length, 0, nonce_address, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_stream_chacha20_xor_ic(input_message, nonce, nonce_increment, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: nonce_increment (uint)
		
		_require_defined(address_pool, nonce_increment, "nonce_increment");
		
		if (!(typeof nonce_increment === "number" && (nonce_increment | 0) === nonce_increment) && (nonce_increment | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "nonce_increment must be an unsigned integer");
		}
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_chacha20_xor_ic(output_message_address, input_message_address, input_message_length, 0, nonce_address, nonce_increment, 0, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_stream_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_stream_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_stream_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_stream_xchacha20_keygen(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output output (buf)
		
		var output_length = (libsodium._crypto_stream_xchacha20_keybytes()) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._crypto_stream_xchacha20_keygen(output_address);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_stream_xchacha20_xor(input_message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_xchacha20_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_xchacha20_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_xchacha20_xor(output_message_address, input_message_address, input_message_length, 0, nonce_address, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_stream_xchacha20_xor_ic(input_message, nonce, nonce_increment, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_xchacha20_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: nonce_increment (uint)
		
		_require_defined(address_pool, nonce_increment, "nonce_increment");
		
		if (!(typeof nonce_increment === "number" && (nonce_increment | 0) === nonce_increment) && (nonce_increment | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "nonce_increment must be an unsigned integer");
		}
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_xchacha20_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_xchacha20_xor_ic(output_message_address, input_message_address, input_message_length, 0, nonce_address, nonce_increment, 0, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function randombytes_buf(length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: length (uint)
		
		_require_defined(address_pool, length, "length");
		
		if (!(typeof length === "number" && (length | 0) === length) && (length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "length must be an unsigned integer");
		}
		
		// ---------- output output (buf)
		
		var output_length = (length) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._randombytes_buf(output_address, length);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_buf_deterministic(length, seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: length (uint)
		
		_require_defined(address_pool, length, "length");
		
		if (!(typeof length === "number" && (length | 0) === length) && (length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "length must be an unsigned integer");
		}
		
		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._randombytes_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output output (buf)
		
		var output_length = (length) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._randombytes_buf_deterministic(output_address, length, 0, seed);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_close(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_close();
		
	}

	function randombytes_random(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		var random_value = libsodium._randombytes_random() >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_set_implementation(implementation, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: implementation (randombytes_implementation)
		
		var implementation_address = libsodium._malloc(6 * 4);
		for (var i = 0; i < 6; i++) {
		        libsodium.setValue(implementation_address + i * 4,
		            libsodium.Runtime.addFunction(implementation
		            [["implementation_name", "random", "stir", "uniform", "buf", "close"][i]]),
		            "i32");
		}
		
		if ((libsodium._randombytes_set_implementation(implementation_address) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function randombytes_stir(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_stir();
		
	}

	function randombytes_uniform(upper_bound, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: upper_bound (uint)
		
		_require_defined(address_pool, upper_bound, "upper_bound");
		
		if (!(typeof upper_bound === "number" && (upper_bound | 0) === upper_bound) && (upper_bound | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "upper_bound must be an unsigned integer");
		}
		
		var random_value = libsodium._randombytes_uniform(upper_bound) >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function sodium_version_string() {
		var address_pool = [];

		var version = libsodium._sodium_version_string();
		var ret = (libsodium.Pointer_stringify(version));
		_free_all(address_pool);
		return ret;
		
	}


    exports.add = add;
    exports.compare = compare;
    exports.from_base64 = from_base64;
    exports.from_hex = from_hex;
    exports.from_string = from_string;
    exports.increment = increment;
    exports.is_zero = is_zero;
    exports.libsodium = libsodium;
    exports.memcmp = memcmp;
    exports.memzero = memzero;
    exports.output_formats = output_formats;
    exports.symbols = symbols;
    exports.to_base64 = to_base64;
    exports.to_hex = to_hex;
    exports.to_string = to_string;

    
	var exported_functions = ["crypto_aead_chacha20poly1305_decrypt", "crypto_aead_chacha20poly1305_decrypt_detached", "crypto_aead_chacha20poly1305_encrypt", "crypto_aead_chacha20poly1305_encrypt_detached", "crypto_aead_chacha20poly1305_ietf_decrypt", "crypto_aead_chacha20poly1305_ietf_decrypt_detached", "crypto_aead_chacha20poly1305_ietf_encrypt", "crypto_aead_chacha20poly1305_ietf_encrypt_detached", "crypto_aead_chacha20poly1305_ietf_keygen", "crypto_aead_chacha20poly1305_keygen", "crypto_aead_xchacha20poly1305_ietf_decrypt", "crypto_aead_xchacha20poly1305_ietf_decrypt_detached", "crypto_aead_xchacha20poly1305_ietf_encrypt", "crypto_aead_xchacha20poly1305_ietf_encrypt_detached", "crypto_aead_xchacha20poly1305_ietf_keygen", "crypto_auth", "crypto_auth_hmacsha256", "crypto_auth_hmacsha256_keygen", "crypto_auth_hmacsha256_verify", "crypto_auth_hmacsha512", "crypto_auth_hmacsha512_keygen", "crypto_auth_hmacsha512_verify", "crypto_auth_keygen", "crypto_auth_verify", "crypto_box_beforenm", "crypto_box_detached", "crypto_box_easy", "crypto_box_easy_afternm", "crypto_box_keypair", "crypto_box_open_detached", "crypto_box_open_easy", "crypto_box_open_easy_afternm", "crypto_box_seal", "crypto_box_seal_open", "crypto_box_seed_keypair", "crypto_generichash", "crypto_generichash_final", "crypto_generichash_init", "crypto_generichash_keygen", "crypto_generichash_update", "crypto_hash", "crypto_hash_sha256", "crypto_hash_sha512", "crypto_kdf_derive_from_key", "crypto_kdf_keygen", "crypto_kx_client_session_keys", "crypto_kx_keypair", "crypto_kx_seed_keypair", "crypto_kx_server_session_keys", "crypto_onetimeauth", "crypto_onetimeauth_final", "crypto_onetimeauth_init", "crypto_onetimeauth_keygen", "crypto_onetimeauth_update", "crypto_onetimeauth_verify", "crypto_pwhash", "crypto_pwhash_scryptsalsa208sha256", "crypto_pwhash_scryptsalsa208sha256_ll", "crypto_pwhash_scryptsalsa208sha256_str", "crypto_pwhash_scryptsalsa208sha256_str_verify", "crypto_pwhash_str", "crypto_pwhash_str_verify", "crypto_scalarmult", "crypto_scalarmult_base", "crypto_secretbox_detached", "crypto_secretbox_easy", "crypto_secretbox_keygen", "crypto_secretbox_open_detached", "crypto_secretbox_open_easy", "crypto_shorthash", "crypto_shorthash_keygen", "crypto_shorthash_siphashx24", "crypto_sign", "crypto_sign_detached", "crypto_sign_ed25519_pk_to_curve25519", "crypto_sign_ed25519_sk_to_curve25519", "crypto_sign_ed25519_sk_to_pk", "crypto_sign_ed25519_sk_to_seed", "crypto_sign_final_create", "crypto_sign_final_verify", "crypto_sign_init", "crypto_sign_keypair", "crypto_sign_open", "crypto_sign_seed_keypair", "crypto_sign_update", "crypto_sign_verify_detached", "crypto_stream_chacha20_ietf_xor", "crypto_stream_chacha20_ietf_xor_ic", "crypto_stream_chacha20_keygen", "crypto_stream_chacha20_xor", "crypto_stream_chacha20_xor_ic", "crypto_stream_keygen", "crypto_stream_xchacha20_keygen", "crypto_stream_xchacha20_xor", "crypto_stream_xchacha20_xor_ic", "randombytes_buf", "randombytes_buf_deterministic", "randombytes_close", "randombytes_random", "randombytes_set_implementation", "randombytes_stir", "randombytes_uniform", "sodium_version_string"],
	      functions = [crypto_aead_chacha20poly1305_decrypt, crypto_aead_chacha20poly1305_decrypt_detached, crypto_aead_chacha20poly1305_encrypt, crypto_aead_chacha20poly1305_encrypt_detached, crypto_aead_chacha20poly1305_ietf_decrypt, crypto_aead_chacha20poly1305_ietf_decrypt_detached, crypto_aead_chacha20poly1305_ietf_encrypt, crypto_aead_chacha20poly1305_ietf_encrypt_detached, crypto_aead_chacha20poly1305_ietf_keygen, crypto_aead_chacha20poly1305_keygen, crypto_aead_xchacha20poly1305_ietf_decrypt, crypto_aead_xchacha20poly1305_ietf_decrypt_detached, crypto_aead_xchacha20poly1305_ietf_encrypt, crypto_aead_xchacha20poly1305_ietf_encrypt_detached, crypto_aead_xchacha20poly1305_ietf_keygen, crypto_auth, crypto_auth_hmacsha256, crypto_auth_hmacsha256_keygen, crypto_auth_hmacsha256_verify, crypto_auth_hmacsha512, crypto_auth_hmacsha512_keygen, crypto_auth_hmacsha512_verify, crypto_auth_keygen, crypto_auth_verify, crypto_box_beforenm, crypto_box_detached, crypto_box_easy, crypto_box_easy_afternm, crypto_box_keypair, crypto_box_open_detached, crypto_box_open_easy, crypto_box_open_easy_afternm, crypto_box_seal, crypto_box_seal_open, crypto_box_seed_keypair, crypto_generichash, crypto_generichash_final, crypto_generichash_init, crypto_generichash_keygen, crypto_generichash_update, crypto_hash, crypto_hash_sha256, crypto_hash_sha512, crypto_kdf_derive_from_key, crypto_kdf_keygen, crypto_kx_client_session_keys, crypto_kx_keypair, crypto_kx_seed_keypair, crypto_kx_server_session_keys, crypto_onetimeauth, crypto_onetimeauth_final, crypto_onetimeauth_init, crypto_onetimeauth_keygen, crypto_onetimeauth_update, crypto_onetimeauth_verify, crypto_pwhash, crypto_pwhash_scryptsalsa208sha256, crypto_pwhash_scryptsalsa208sha256_ll, crypto_pwhash_scryptsalsa208sha256_str, crypto_pwhash_scryptsalsa208sha256_str_verify, crypto_pwhash_str, crypto_pwhash_str_verify, crypto_scalarmult, crypto_scalarmult_base, crypto_secretbox_detached, crypto_secretbox_easy, crypto_secretbox_keygen, crypto_secretbox_open_detached, crypto_secretbox_open_easy, crypto_shorthash, crypto_shorthash_keygen, crypto_shorthash_siphashx24, crypto_sign, crypto_sign_detached, crypto_sign_ed25519_pk_to_curve25519, crypto_sign_ed25519_sk_to_curve25519, crypto_sign_ed25519_sk_to_pk, crypto_sign_ed25519_sk_to_seed, crypto_sign_final_create, crypto_sign_final_verify, crypto_sign_init, crypto_sign_keypair, crypto_sign_open, crypto_sign_seed_keypair, crypto_sign_update, crypto_sign_verify_detached, crypto_stream_chacha20_ietf_xor, crypto_stream_chacha20_ietf_xor_ic, crypto_stream_chacha20_keygen, crypto_stream_chacha20_xor, crypto_stream_chacha20_xor_ic, crypto_stream_keygen, crypto_stream_xchacha20_keygen, crypto_stream_xchacha20_xor, crypto_stream_xchacha20_xor_ic, randombytes_buf, randombytes_buf_deterministic, randombytes_close, randombytes_random, randombytes_set_implementation, randombytes_stir, randombytes_uniform, sodium_version_string];
	for (var i = 0; i < functions.length; i++) {
		if (typeof libsodium["_" + exported_functions[i]] === "function") {
			exports[exported_functions[i]] = functions[i];
		}
	}
	var constants = ["SODIUM_LIBRARY_VERSION_MAJOR", "SODIUM_LIBRARY_VERSION_MINOR", "crypto_aead_chacha20poly1305_ABYTES", "crypto_aead_chacha20poly1305_KEYBYTES", "crypto_aead_chacha20poly1305_NPUBBYTES", "crypto_aead_chacha20poly1305_NSECBYTES", "crypto_aead_chacha20poly1305_ietf_ABYTES", "crypto_aead_chacha20poly1305_ietf_KEYBYTES", "crypto_aead_chacha20poly1305_ietf_NPUBBYTES", "crypto_aead_chacha20poly1305_ietf_NSECBYTES", "crypto_aead_xchacha20poly1305_ietf_ABYTES", "crypto_aead_xchacha20poly1305_ietf_KEYBYTES", "crypto_aead_xchacha20poly1305_ietf_NPUBBYTES", "crypto_aead_xchacha20poly1305_ietf_NSECBYTES", "crypto_auth_BYTES", "crypto_auth_KEYBYTES", "crypto_auth_hmacsha256_BYTES", "crypto_auth_hmacsha256_KEYBYTES", "crypto_auth_hmacsha512_BYTES", "crypto_auth_hmacsha512_KEYBYTES", "crypto_box_BEFORENMBYTES", "crypto_box_MACBYTES", "crypto_box_NONCEBYTES", "crypto_box_PUBLICKEYBYTES", "crypto_box_SEALBYTES", "crypto_box_SECRETKEYBYTES", "crypto_box_SEEDBYTES", "crypto_generichash_BYTES", "crypto_generichash_BYTES_MAX", "crypto_generichash_BYTES_MIN", "crypto_generichash_KEYBYTES", "crypto_generichash_KEYBYTES_MAX", "crypto_generichash_KEYBYTES_MIN", "crypto_hash_BYTES", "crypto_kdf_BYTES_MAX", "crypto_kdf_BYTES_MIN", "crypto_kdf_CONTEXTBYTES", "crypto_kdf_KEYBYTES", "crypto_kx_PUBLICKEYBYTES", "crypto_kx_SECRETKEYBYTES", "crypto_kx_SEEDBYTES", "crypto_kx_SESSSIONKEYBYTES", "crypto_onetimeauth_BYTES", "crypto_onetimeauth_KEYBYTES", "crypto_pwhash_ALG_ARGON2I13", "crypto_pwhash_ALG_DEFAULT", "crypto_pwhash_BYTES_MAX", "crypto_pwhash_BYTES_MIN", "crypto_pwhash_MEMLIMIT_INTERACTIVE", "crypto_pwhash_MEMLIMIT_MAX", "crypto_pwhash_MEMLIMIT_MIN", "crypto_pwhash_MEMLIMIT_MODERATE", "crypto_pwhash_MEMLIMIT_SENSITIVE", "crypto_pwhash_OPSLIMIT_INTERACTIVE", "crypto_pwhash_OPSLIMIT_MAX", "crypto_pwhash_OPSLIMIT_MIN", "crypto_pwhash_OPSLIMIT_MODERATE", "crypto_pwhash_OPSLIMIT_SENSITIVE", "crypto_pwhash_PASSWD_MAX", "crypto_pwhash_PASSWD_MIN", "crypto_pwhash_SALTBYTES", "crypto_pwhash_STRBYTES", "crypto_pwhash_STR_VERIFY", "crypto_pwhash_scryptsalsa208sha256_BYTES_MAX", "crypto_pwhash_scryptsalsa208sha256_BYTES_MIN", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MAX", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MIN", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MAX", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MIN", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_SALTBYTES", "crypto_pwhash_scryptsalsa208sha256_STRBYTES", "crypto_pwhash_scryptsalsa208sha256_STR_VERIFY", "crypto_scalarmult_BYTES", "crypto_scalarmult_SCALARBYTES", "crypto_secretbox_KEYBYTES", "crypto_secretbox_MACBYTES", "crypto_secretbox_NONCEBYTES", "crypto_shorthash_BYTES", "crypto_shorthash_KEYBYTES", "crypto_shorthash_siphashx24_BYTES", "crypto_shorthash_siphashx24_KEYBYTES", "crypto_sign_BYTES", "crypto_sign_PUBLICKEYBYTES", "crypto_sign_SECRETKEYBYTES", "crypto_sign_SEEDBYTES", "crypto_stream_chacha20_KEYBYTES", "crypto_stream_chacha20_NONCEBYTES", "crypto_stream_chacha20_ietf_KEYBYTES", "crypto_stream_chacha20_ietf_NONCEBYTES", "crypto_stream_xchacha20_ietf_KEYBYTES", "crypto_stream_xchacha20_ietf_NONCEBYTES", "randombytes_SEEDBYTES"];
	for (var i = 0; i < constants.length; i++) {
		var raw = libsodium["_" + constants[i].toLowerCase()];
		if (typeof raw === "function") exports[constants[i]] = raw()|0;
	}
	var constants_str = ["SODIUM_VERSION_STRING", "crypto_pwhash_STRPREFIX", "crypto_pwhash_scryptsalsa208sha256_STRPREFIX"];
	for (var i = 0; i < constants_str.length; i++) {
		var raw = libsodium["_" + constants_str[i].toLowerCase()];
		if (typeof raw === "function") exports[constants_str[i]] = libsodium.Pointer_stringify(raw());
	}

    return exports;
})));
