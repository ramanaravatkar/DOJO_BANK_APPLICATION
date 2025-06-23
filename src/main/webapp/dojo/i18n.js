/*
	Copyright (c) 2004-2017, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/
//>>built
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
_3.add("dojo-preload-i18n-Api",1);
1||_3.add("dojo-v1x-i18n-Api",1);
var _a=_1.i18n={},_b=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_c=function(_d,_e,_f,_10){
for(var _11=[_f+_10],_12=_e.split("-"),_13="",i=0;i<_12.length;i++){
_13+=(_13?"-":"")+_12[i];
if(!_d||_d[_13]){
_11.push(_f+_13+"/"+_10);
_11.specificity=_13;
}
}
return _11;
},_14={},_15=function(_16,_17,_18){
_18=_18?_18.toLowerCase():_1.locale;
_16=_16.replace(/\./g,"/");
_17=_17.replace(/\./g,"/");
return (/root/i.test(_18))?(_16+"/nls/"+_17):(_16+"/nls/"+_18+"/"+_17);
},_19=_1.getL10nName=function(_1a,_1b,_1c){
return _1a=_9.id+"!"+_15(_1a,_1b,_1c);
},_1d=function(_1e,_1f,_20,_21,_22,_23){
_1e([_1f],function(_24){
var _25=_6.clone(_24.root||_24.ROOT),_26=_c(!_24._v1x&&_24,_22,_20,_21);
_1e(_26,function(){
for(var i=1;i<_26.length;i++){
_25=_6.mixin(_6.clone(_25),arguments[i]);
}
var _27=_1f+"/"+_22;
_14[_27]=_25;
_25.$locale=_26.specificity;
_23();
});
});
},_28=function(id,_29){
return /^\./.test(id)?_29(id):id;
},_2a=function(_2b){
var _2c=_5.extraLocale||[];
_2c=_6.isArray(_2c)?_2c:[_2c];
_2c.push(_2b);
return _2c;
},_2d=function(id,_2e,_2f){
var _30=_b.exec(id),_31=_30[1]+"/",_32=_30[5]||_30[4],_33=_31+_32,_34=(_30[5]&&_30[4]),_35=_34||_1.locale||"",_36=_33+"/"+_35,_37=_34?[_35]:_2a(_35),_38=_37.length,_39=function(){
if(!--_38){
_2f(_6.delegate(_14[_36]));
}
},_3a=id.split("*"),_3b=_3a[1]=="preload";
if(_3("dojo-preload-i18n-Api")){
if(_3b){
if(!_14[id]){
_14[id]=1;
_47(_3a[2],_8.parse(_3a[3]),1,_2e);
}
_2f(1);
}
if(_3b||(_68(id,_2e,_2f)&&!_14[_36])){
return;
}
}else{
if(_3b){
_2f(1);
return;
}
}
_4.forEach(_37,function(_3c){
var _3d=_33+"/"+_3c;
if(_3("dojo-preload-i18n-Api")){
_3e(_3d);
}
if(!_14[_3d]){
_1d(_2e,_33,_31,_32,_3c,_39);
}else{
_39();
}
});
};
if(_3("dojo-unit-tests")){
var _3f=_a.unitTests=[];
}
if(_3("dojo-preload-i18n-Api")||1){
var _40=_a.normalizeLocale=function(_41){
var _42=_41?_41.toLowerCase():_1.locale;
return _42=="root"?"ROOT":_42;
},_43=function(mid,_44){
return (1&&1)?_44.isXdUrl(_2.toUrl(mid+".js")):true;
},_45=0,_46=[],_47=_a._preloadLocalizations=function(_48,_49,_4a,_4b){
_4b=_4b||_2;
function _4c(mid,_4d){
if(_43(mid,_4b)||_4a){
_4b([mid],_4d);
}else{
_6d([mid],_4d,_4b);
}
};
function _4e(_4f,_50){
var _51=_4f.split("-");
while(_51.length){
if(_50(_51.join("-"))){
return;
}
_51.pop();
}
_50("ROOT");
};
function _52(){
_45++;
};
function _53(){
--_45;
while(!_45&&_46.length){
_2d.apply(null,_46.shift());
}
};
function _54(_55,_56,loc,_57){
return _57.toAbsMid(_55+_56+"/"+loc);
};
function _58(_59){
_59=_40(_59);
_4e(_59,function(loc){
if(_4.indexOf(_49,loc)>=0){
var mid=_48.replace(/\./g,"/")+"_"+loc;
_52();
_4c(mid,function(_5a){
for(var p in _5a){
var _5b=_5a[p],_5c=p.match(/(.+)\/([^\/]+)$/),_5d,_5e;
if(!_5c){
continue;
}
_5d=_5c[2];
_5e=_5c[1]+"/";
if(!_5b._localized){
continue;
}
var _5f;
if(loc==="ROOT"){
var _60=_5f=_5b._localized;
delete _5b._localized;
_60.root=_5b;
_14[_2.toAbsMid(p)]=_60;
}else{
_5f=_5b._localized;
_14[_54(_5e,_5d,loc,_2)]=_5b;
}
if(loc!==_59){
function _61(_62,_63,_64,_65){
var _66=[],_67=[];
_4e(_59,function(loc){
if(_65[loc]){
_66.push(_2.toAbsMid(_62+loc+"/"+_63));
_67.push(_54(_62,_63,loc,_2));
}
});
if(_66.length){
_52();
_4b(_66,function(){
for(var i=_66.length-1;i>=0;i--){
_64=_6.mixin(_6.clone(_64),arguments[i]);
_14[_67[i]]=_64;
}
_14[_54(_62,_63,_59,_2)]=_6.clone(_64);
_53();
});
}else{
_14[_54(_62,_63,_59,_2)]=_64;
}
};
_61(_5e,_5d,_5b,_5f);
}
}
_53();
});
return true;
}
return false;
});
};
_58();
_4.forEach(_1.config.extraLocale,_58);
},_68=function(id,_69,_6a){
if(_45){
_46.push([id,_69,_6a]);
}
return _45;
},_3e=function(){
};
}
if(1){
var _6b={},_6c,_6d=function(_6e,_6f,_70){
var _71=[];
_4.forEach(_6e,function(mid){
var url=_70.toUrl(mid+".js");
function _2d(_72){
if(!_6c){
_6c=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}");
}
var _73=_6c(_72,_3e,mid,_6b);
if(_73===_6b){
_71.push(_14[url]=_6b.result);
}else{
if(_73 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_73);
_73={};
}
_71.push(_14[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_73:{root:_73,_v1x:1}));
}
};
if(_14[url]){
_71.push(_14[url]);
}else{
var _74=_70.syncLoadNls(mid);
if(!_74){
_74=_3e(mid.replace(/nls\/([^\/]*)\/([^\/]*)$/,"nls/$2/$1"));
}
if(_74){
_71.push(_74);
}else{
if(!_7){
try{
_70.getText(url,true,_2d);
}
catch(e){
_71.push(_14[url]={});
}
}else{
_7.get({url:url,sync:true,load:_2d,error:function(){
_71.push(_14[url]={});
}});
}
}
}
});
_6f&&_6f.apply(null,_71);
};
_3e=function(_75){
for(var _76,_77=_75.split("/"),_78=_1.global[_77[0]],i=1;_78&&i<_77.length-1;_78=_78[_77[i++]]){
}
if(_78){
_76=_78[_77[i]];
if(!_76){
_76=_78[_77[i].replace(/-/g,"_")];
}
if(_76){
_14[_75]=_76;
}
}
return _76;
};
_a.getLocalization=function(_79,_7a,_7b){
var _7c,_7d=_15(_79,_7a,_7b);
_2d(_7d,(!_43(_7d,_2)?function(_7e,_7f){
_6d(_7e,_7f,_2);
}:_2),function(_80){
_7c=_80;
});
return _7c;
};
if(_3("dojo-unit-tests")){
_3f.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _81;
_81=_6c("{prop:1}",_3e,"nonsense",_6b);
t.is({prop:1},_81);
t.is(undefined,_81[1]);
_81=_6c("({prop:1})",_3e,"nonsense",_6b);
t.is({prop:1},_81);
t.is(undefined,_81[1]);
_81=_6c("{'prop-x':1}",_3e,"nonsense",_6b);
t.is({"prop-x":1},_81);
t.is(undefined,_81[1]);
_81=_6c("({'prop-x':1})",_3e,"nonsense",_6b);
t.is({"prop-x":1},_81);
t.is(undefined,_81[1]);
_81=_6c("define({'prop-x':1})",_3e,"nonsense",_6b);
t.is(_6b,_81);
t.is({"prop-x":1},_6b.result);
_81=_6c("define('some/module', {'prop-x':1})",_3e,"nonsense",_6b);
t.is(_6b,_81);
t.is({"prop-x":1},_6b.result);
_81=_6c("this is total nonsense and should throw an error",_3e,"nonsense",_6b);
t.is(_81 instanceof Error,true);
});
});
}
}
return _6.mixin(_a,{dynamic:true,normalize:_28,load:_2d,cache:_14,getL10nName:_19});
});
