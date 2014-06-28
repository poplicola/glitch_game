
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CONFIG="release";
CFG_HOST="winnt";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[bodies.png];type=image/png;width=2000;height=960;\n[dwarf.png];type=image/png;width=30;height=50;\n[dwarves.png];type=image/png;width=2000;height=960;\n[glitch.png];type=image/png;width=411;height=70;\n[heads.png];type=image/png;width=2000;height=960;\n[stone.png];type=image/png;width=350;height=200;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


function BBHtml5Game( canvas ){
	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){
		this._gl=this._canvas.getContext( "webgl" );
		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl" );
		if( !this._gl ) this.Die( "Can't create WebGL" );
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}


function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

//***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	function onloadfun(){
		game.DecLoading();
	}
	
	game.IncLoading();

	var image=new Image();
	image.onload=onloadfun;
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
	return true;
}

//***** gxtkChannel class *****
function gxtkChannel(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

//***** gxtkAudio class *****
function gxtkAudio(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;
	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._surface=null;
		thread._running=false;
	}
	
	thread._running=true;
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
}

BBAsyncSoundLoaderThread.prototype.Start=function(){
	this._sample=this._device.LoadSample( this._path );
}

BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return false;
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnResize=function(){
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}
function c_MyApp(){
	c_App.call(this);
	this.m_hud=c_Hud.m_new.call(new c_Hud);
	this.m_world=null;
	this.m_bricks=c_List3.m_new.call(new c_List3);
	this.m_dwarves=new_object_array(2);
}
c_MyApp.prototype=extend_class(c_App);
c_MyApp.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_MyApp.prototype.p_OnCreate=function(){
	bb_app_SetUpdateRate(60);
	c_Dwarf.m_sheet=bb_graphics_LoadImage2("bodies.png",100,80,240,c_Image.m_DefaultFlags);
	var t_xCenter=(c_Dwarf.m_sheet.p_Width())/2.0;
	var t_yCenter=(c_Dwarf.m_sheet.p_Height())/2.0;
	c_Dwarf.m_sheet.p_SetHandle(t_xCenter+2.0,t_yCenter+24.0);
	c_Dwarf.m_sheet2=bb_graphics_LoadImage2("heads.png",100,80,240,c_Image.m_DefaultFlags);
	c_Dwarf.m_sheet2.p_SetHandle(t_xCenter+2.0,t_yCenter-2.0);
	this.m_hud.m_popup=bb_graphics_LoadImage("glitch.png",1,c_Image.m_DefaultFlags);
	this.m_world=c_World.m_new.call(new c_World);
	this.m_world.p_Load("delve_deeper_punchy_scene.txt");
	this.m_dwarves[0]=c_Dwarf.m_new.call(new c_Dwarf,0,30.0,454.0);
	this.m_dwarves[1]=c_Dwarf.m_new.call(new c_Dwarf,1,400.0,454.0);
	return 0;
}
c_MyApp.prototype.p_OnUpdate=function(){
	c_Clock.m_Update();
	this.m_world.p_OnUpdate();
	bb_abuanimation_animationJuggler.p_Update2(c_Clock.m_Tick());
	this.m_dwarves[0].p_OnUpdate();
	this.m_dwarves[1].p_OnUpdate();
	var t_glitchKeys=[49,50,51,52,53,54,55,56,57,48];
	for(var t_n=0;t_n<c_Glitch.m_ALL.length;t_n=t_n+1){
		if((bb_input_KeyHit(t_glitchKeys[t_n]))!=0){
			c_Glitch.m_ToggleGlitchById(t_n,!c_Glitch.m_ALL[t_n].m_state);
		}
	}
	if((bb_input_KeyHit(9))!=0){
		var t_=this.m_dwarves;
		var t_2=0;
		while(t_2<t_.length){
			var t_dwarf=t_[t_2];
			t_2=t_2+1;
			bb_main_APP.m_hud.m_health[t_dwarf.m_player]-=5;
		}
	}
	c_Glitch.m_Update();
	return 0;
}
c_MyApp.prototype.p_RenderWalls=function(){
	var t_x=[0,635,0,0];
	var t_y=[0,0,475,0];
	var t_w=[640,5,640,5];
	var t_h=[5,480,5,480];
	for(var t_n=0;t_n<=3;t_n=t_n+1){
		bb_graphics_DrawRect((t_x[t_n]),(t_y[t_n]),(t_w[t_n]),(t_h[t_n]));
	}
}
c_MyApp.prototype.p_RenderDwarves=function(){
	this.m_dwarves[0].p_OnRender();
	this.m_dwarves[1].p_OnRender();
}
c_MyApp.prototype.p_RenderBricks=function(){
	var t_=this.m_bricks.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_brick=t_.p_NextObject();
		t_brick.p_OnRender();
	}
}
c_MyApp.prototype.p_OnRender=function(){
	bb_graphics_Cls(0.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	this.m_hud.p_OnRender();
	this.p_RenderWalls();
	this.p_RenderDwarves();
	this.p_RenderBricks();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app_ValidateDeviceWindow(false);
	bb_app_EnumDisplayModes();
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
var bb_app__delegate=null;
var bb_app__game=null;
var bb_main_APP=null;
function bbMain(){
	bb_main_APP=c_MyApp.m_new.call(new c_MyApp);
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	this.m_surface=t_surf;
	this.m_source=t_src;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_srcw){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Width=function(){
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	return this.m_height;
}
c_Image.prototype.p_Frames=function(){
	return this.m_frames.length;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics_context.m_font=t_font;
	bb_graphics_context.m_firstChar=t_firstChar;
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	var t_w=bb_app__game.GetDeviceWidth();
	var t_h=bb_app__game.GetDeviceHeight();
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		return;
	}
	bb_app__devWidth=t_w;
	bb_app__devHeight=t_h;
	if(t_notifyApp){
		bb_app__app.p_OnResize();
	}
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	this.m__width=t_width;
	this.m__height=t_height;
	return this;
}
c_DisplayMode.m_new2=function(){
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set(t_key,t_value);
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	var t_modes=bb_app__game.GetDisplayModes();
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push(t_mode);
		}
	}
	bb_app__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
function c_Dwarf(){
	Object.call(this);
	this.m_player=0;
	this.m_facing=0;
	this.m_body=null;
	this.m_bodyFixture=null;
	this.m_head=null;
	this.m_neck=null;
	this.m_feet=null;
	this.m_hit=new_object_array(2);
	this.m_animationDelegate=null;
	this.m_others=new_object_array(2);
	this.m_feetTouching=0;
	this.m_feetContactTime=0;
	this.m_feetValid=false;
	this.m_attacking=false;
	this.m_jumpPressed=0;
	this.m_jumpValid=false;
	this.m_velocityPrevious=null;
	this.m_a=.0;
	this.m_headlessFacing=.0;
	this.implments={c_IOnAnimationEnd:1,c_IOnAnimationFrameChange:1};
}
c_Dwarf.m_sheet=null;
c_Dwarf.m_sheet2=null;
c_Dwarf.prototype.p_CreateNeck=function(){
	var t_world=bb_main_APP.m_world.m__world;
	var t_yNeck2=-0.43333333333333335;
	var t_neckDefinition=c_b2RevoluteJointDef.m_new.call(new c_b2RevoluteJointDef);
	t_neckDefinition.m_bodyA=this.m_body;
	t_neckDefinition.m_bodyB=this.m_head;
	t_neckDefinition.m_collideConnected=false;
	t_neckDefinition.m_localAnchorA.m_x=0.0;
	t_neckDefinition.m_localAnchorA.m_y=t_yNeck2;
	t_neckDefinition.m_localAnchorB.m_x=0.0;
	t_neckDefinition.m_localAnchorB.m_y=t_yNeck2;
	t_neckDefinition.m_enableLimit=true;
	t_neckDefinition.m_lowerAngle=bb_glue_DegreesToRadians(-50.0);
	t_neckDefinition.m_upperAngle=bb_glue_DegreesToRadians(50.0);
	t_neckDefinition.m_enableMotor=true;
	t_neckDefinition.m_maxMotorTorque=3.0;
	this.m_neck=object_downcast((t_world.p_CreateJoint(t_neckDefinition)),c_b2RevoluteJoint);
}
c_Dwarf.prototype.p__center=function(){
	var t_xCenter=(this.m_body.p_GetWorldCenter().m_x*this.m_body.p_GetMass()+this.m_head.p_GetWorldCenter().m_x*this.m_head.p_GetMass())/(this.m_body.p_GetMass()+this.m_head.p_GetMass());
	var t_yCenter=(this.m_body.p_GetWorldCenter().m_y*this.m_body.p_GetMass()+this.m_head.p_GetWorldCenter().m_y*this.m_head.p_GetMass())/(this.m_body.p_GetMass()+this.m_head.p_GetMass());
	return c_b2Vec2.m_new.call(new c_b2Vec2,t_xCenter,t_yCenter);
}
c_Dwarf.prototype.p_CreateBody=function(t_xStart,t_yStart){
	var t_world=bb_main_APP.m_world.m__world;
	var t_bodyDefinition=c_b2BodyDef.m_new.call(new c_b2BodyDef);
	t_bodyDefinition.m_type=2;
	t_bodyDefinition.m_position.p_Set2(t_xStart/30.0,t_yStart/30.0);
	t_bodyDefinition.m_fixedRotation=false;
	this.m_body=t_world.p_CreateBody2(t_bodyDefinition);
	var t_shapeDefinition=c_b2PolygonShape.m_new.call(new c_b2PolygonShape);
	t_shapeDefinition.p_SetAsBox(0.5,0.5);
	var t_fixtureDefinition=c_b2FixtureDef.m_new.call(new c_b2FixtureDef);
	var t_mass=955.755;
	var t_density=t_mass/900.0;
	t_fixtureDefinition.m_density=t_density;
	t_fixtureDefinition.m_friction=0.3;
	t_fixtureDefinition.m_restitution=0.6;
	t_fixtureDefinition.m_shape=(t_shapeDefinition);
	this.m_bodyFixture=this.m_body.p_CreateFixture(t_fixtureDefinition);
	var t_yNeck=-0.8666666666666667;
	var t_headDefinition=c_b2BodyDef.m_new.call(new c_b2BodyDef);
	t_headDefinition.m_type=2;
	t_headDefinition.m_position.p_Set2(t_xStart/30.0,t_yStart/30.0);
	this.m_head=t_world.p_CreateBody2(t_headDefinition);
	var t_shapeDefinition2=c_b2CircleShape.m_new.call(new c_b2CircleShape,0.43333333333333335);
	t_shapeDefinition2.p_SetLocalPosition(c_b2Vec2.m_new.call(new c_b2Vec2,0.0,t_yNeck));
	t_fixtureDefinition.m_density=0.3;
	t_fixtureDefinition.m_friction=2.0;
	t_fixtureDefinition.m_shape=(t_shapeDefinition2);
	this.m_head.p_CreateFixture(t_fixtureDefinition);
	this.p_CreateNeck();
	var t_feetDefinition=c_b2PolygonShape.m_new.call(new c_b2PolygonShape);
	t_feetDefinition.p_SetAsBox(0.59999999999999998,0.016666666666666666);
	var t_=t_feetDefinition.p_GetVertices();
	var t_2=0;
	while(t_2<t_.length){
		var t_vertex=t_[t_2];
		t_2=t_2+1;
		t_vertex.m_y+=0.51666666666666672;
	}
	var t_feetFixtureDefinition=c_b2FixtureDef.m_new.call(new c_b2FixtureDef);
	t_feetFixtureDefinition.m_isSensor=true;
	t_feetFixtureDefinition.m_shape=(t_feetDefinition);
	this.m_feet=this.m_body.p_CreateFixture(t_feetFixtureDefinition);
	var t_hitDefinition=c_b2PolygonShape.m_new.call(new c_b2PolygonShape);
	var t_vertices=[c_b2Vec2.m_new.call(new c_b2Vec2,-0.76666666666666672,-1.6666666666666667),c_b2Vec2.m_new.call(new c_b2Vec2,0.16666666666666666,-1.3999999999999999),c_b2Vec2.m_new.call(new c_b2Vec2,-0.96666666666666667,-0.66666666666666663),c_b2Vec2.m_new.call(new c_b2Vec2,-1.5333333333333334,0.29999999999999999),c_b2Vec2.m_new.call(new c_b2Vec2,-1.7,-0.066666666666666666),c_b2Vec2.m_new.call(new c_b2Vec2,-1.6000000000000001,-0.90000000000000002)];
	t_hitDefinition.p_SetAsArray(t_vertices,6.0);
	var t_hitFixtureDefinition=c_b2FixtureDef.m_new.call(new c_b2FixtureDef);
	t_hitFixtureDefinition.m_isSensor=true;
	t_hitFixtureDefinition.m_shape=(t_hitDefinition);
	this.m_hit[0]=this.m_body.p_CreateFixture(t_hitFixtureDefinition);
	t_vertices=[c_b2Vec2.m_new.call(new c_b2Vec2,0.76666666666666672,-1.6666666666666667),c_b2Vec2.m_new.call(new c_b2Vec2,-0.16666666666666666,-1.3999999999999999),c_b2Vec2.m_new.call(new c_b2Vec2,0.96666666666666667,-0.66666666666666663),c_b2Vec2.m_new.call(new c_b2Vec2,1.5333333333333334,0.29999999999999999),c_b2Vec2.m_new.call(new c_b2Vec2,1.7,-0.066666666666666666),c_b2Vec2.m_new.call(new c_b2Vec2,1.6000000000000001,-0.90000000000000002)];
	t_hitDefinition.p_SetAsArray(c_Arrays.m_Reverse(t_vertices),6.0);
	t_hitFixtureDefinition.m_shape=(t_hitDefinition);
	this.m_hit[1]=this.m_body.p_CreateFixture(t_hitFixtureDefinition);
	var t_massData=c_b2MassData.m_new.call(new c_b2MassData);
	this.m_body.p_GetMassData(t_massData);
	t_massData.m_center=c_b2Vec2.m_new.call(new c_b2Vec2,this.p__center().m_x-this.m_body.p_GetWorldCenter().m_x,this.p__center().m_y-this.m_body.p_GetWorldCenter().m_y);
	this.m_body.p_SetMassData(t_massData);
}
c_Dwarf.m_new=function(t_player,t_xStart,t_yStart){
	this.m_player=t_player;
	this.m_facing=1-2*t_player;
	this.p_CreateBody(t_xStart,t_yStart);
	this.m_animationDelegate=c_AnimationDelegate.m_new.call(new c_AnimationDelegate,(this));
	bb_abuanimation_animationJuggler.p_Add3(this.m_animationDelegate);
	this.m_animationDelegate.p_AddAnimation("idle",[0,1,2,3],120.0,true);
	this.m_animationDelegate.p_AddAnimation("run",[4,5,6,7,8],60.0,true);
	this.m_animationDelegate.p_AddAnimation2("attack",[10,11,12,13],[100.0,120.0,60.0,100.0],false);
	this.m_animationDelegate.p_PlayAnimation("idle");
	for(var t_n=0;t_n<=1;t_n=t_n+1){
		this.m_others[t_n]=c_List5.m_new.call(new c_List5);
	}
	return this;
}
c_Dwarf.m_new2=function(){
	return this;
}
c_Dwarf.prototype.p_center=function(){
	return this.m_body.p_GetWorldCenter();
}
c_Dwarf.prototype.p_headCenter=function(){
	return this.m_head.p_GetWorldCenter();
}
c_Dwarf.prototype.p_AdjustTorque=function(t_desiredAngle,t_facing){
	if(c_Glitch.m_TUMBLEWEED.m_state==true && !(t_facing==0.0)){
		return 35.0*t_facing;
	}
	var t_tick=15.0;
	var t_bodyAngle=this.m_body.p_GetAngle();
	var t_nextAngle=t_bodyAngle+this.m_body.p_GetAngularVelocity()/t_tick;
	var t_totalRotation=t_desiredAngle-t_nextAngle;
	while(t_totalRotation<bb_glue_DegreesToRadians(-180.0)){
		t_totalRotation+=bb_glue_DegreesToRadians(360.0);
	}
	while(t_totalRotation>bb_glue_DegreesToRadians(180.0)){
		t_totalRotation-=bb_glue_DegreesToRadians(360.0);
	}
	var t_desiredAngularVelocity=t_totalRotation*t_tick;
	return this.m_body.p_GetInertia()*t_desiredAngularVelocity/(1.0/t_tick);
}
c_Dwarf.prototype.p_UpdateNeck=function(){
	bb_main_APP.m_hud.m_sticker[this.m_player]=bb_math_Max2(0.0,bb_main_APP.m_hud.m_sticker[this.m_player]-0.05);
	var t_velocity=this.m_head.p_GetLinearVelocity();
	if(this.m_velocityPrevious==null){
		this.m_velocityPrevious=t_velocity.p_Copy();
	}
	var t_velocityTemp=t_velocity.p_Copy();
	t_velocityTemp.p_Subtract(this.m_velocityPrevious);
	var t_acceleration=t_velocityTemp.p_Length();
	t_acceleration=bb_math_Abs2(t_acceleration);
	this.m_a=t_acceleration;
	if(t_acceleration>10.0){
		var t_damage=(t_acceleration-10.0)/20.0;
		if(t_damage>bb_main_APP.m_hud.m_sticker[this.m_player]){
			bb_main_APP.m_hud.m_sticker[this.m_player]=bb_math_Min2(t_damage,1.6000000000000001);
		}
		if(bb_main_APP.m_hud.m_sticker[this.m_player]*20.0>=30.0){
			bb_main_APP.m_hud.m_health[this.m_player]-=1;
		}
	}
	this.m_velocityPrevious=t_velocity.p_Copy();
	if(this.m_neck==null){
		return;
	}
	var t_tick=15.0;
	var t_angle=this.m_neck.p_GetJointAngle();
	var t_desiredAngle=0.0;
	var t_nextAngle=t_angle+this.m_neck.p_GetJointSpeed()/t_tick;
	var t_totalRotation=t_desiredAngle-t_nextAngle;
	while(t_totalRotation<bb_glue_DegreesToRadians(-180.0)){
		t_totalRotation+=bb_glue_DegreesToRadians(360.0);
	}
	while(t_totalRotation>bb_glue_DegreesToRadians(180.0)){
		t_totalRotation-=bb_glue_DegreesToRadians(360.0);
	}
	var t_desiredAngularVelocity=t_totalRotation*t_tick;
	var t_torque=this.m_body.p_GetInertia()*t_desiredAngularVelocity/(1.0/t_tick);
	this.m_neck.p_SetMotorSpeed(t_desiredAngularVelocity);
}
c_Dwarf.prototype.p_OnUpdate=function(){
	if(this.m_feetTouching>0){
		this.m_feetContactTime=bb_app_Millisecs();
	}
	var t__feetValid=bb_app_Millisecs()-this.m_feetContactTime<=100;
	this.m_feetValid=t__feetValid || c_Glitch.m_JETPACK.m_state==true;
	var t_keyRight=bb_dwarf_CONTROL_SCHEMES[this.m_player][1];
	var t_keyLeft=bb_dwarf_CONTROL_SCHEMES[this.m_player][3];
	var t_keyUp=bb_dwarf_CONTROL_SCHEMES[this.m_player][0];
	var t_keyDown=bb_dwarf_CONTROL_SCHEMES[this.m_player][2];
	var t_keyAction=bb_dwarf_CONTROL_SCHEMES[this.m_player][4];
	if(!this.m_attacking){
		if((bb_input_KeyHit(t_keyRight))!=0){
			this.m_facing=1;
		}
		if((bb_input_KeyHit(t_keyLeft))!=0){
			this.m_facing=-1;
		}
		if(((bb_input_KeyDown(t_keyRight))!=0) && !((bb_input_KeyDown(t_keyLeft))!=0)){
			this.m_facing=1;
		}
		if(((bb_input_KeyDown(t_keyLeft))!=0) && !((bb_input_KeyDown(t_keyRight))!=0)){
			this.m_facing=-1;
		}
	}
	if(((bb_input_KeyDown(t_keyRight))!=0) && this.m_facing==1){
		if(this.m_feetValid || c_Glitch.m_TUMBLEWEED.m_state==true){
			if(this.m_body.p_GetLinearVelocity().m_x<8.0){
				this.m_body.p_ApplyForce(c_b2Vec2.m_new.call(new c_b2Vec2,42.857142857142861,0.0),this.p_center());
				if(this.m_neck!=null){
					this.m_head.p_ApplyForce(c_b2Vec2.m_new.call(new c_b2Vec2,17.142857142857146,0.0),this.p_headCenter());
				}
			}
			var t_torque=this.p_AdjustTorque(0.0+bb_glue_DegreesToRadians(18.0)*(this.m_facing),(this.m_facing));
			this.m_body.p_ApplyTorque(t_torque);
		}
	}else{
		if(((bb_input_KeyDown(t_keyLeft))!=0) && this.m_facing==-1){
			if(this.m_feetValid || c_Glitch.m_TUMBLEWEED.m_state==true){
				if(this.m_body.p_GetLinearVelocity().m_x>-8.0){
					this.m_body.p_ApplyForce(c_b2Vec2.m_new.call(new c_b2Vec2,-42.857142857142861,0.0),this.p_center());
					if(this.m_neck!=null){
						this.m_head.p_ApplyForce(c_b2Vec2.m_new.call(new c_b2Vec2,-17.142857142857146,0.0),this.p_headCenter());
					}
				}
				var t_torque2=this.p_AdjustTorque(0.0+bb_glue_DegreesToRadians(18.0)*(this.m_facing),(this.m_facing));
				this.m_body.p_ApplyTorque(t_torque2);
			}
		}
	}
	if((bb_input_KeyHit(t_keyUp))!=0){
		this.m_jumpPressed=bb_app_Millisecs();
	}
	this.m_jumpValid=bb_app_Millisecs()-this.m_jumpPressed<=100;
	if(this.m_jumpValid && this.m_feetValid){
		this.m_body.p_SetLinearVelocity(c_b2Vec2.m_new.call(new c_b2Vec2,this.m_body.p_GetLinearVelocity().m_x,0.0));
		bb_glue_ApplyImpulseToBody3(this.m_body,this.p_center(),-20.0,this.m_body.p_GetAngle());
		this.m_jumpPressed-=100;
	}
	if(((bb_input_KeyDown(t_keyDown))!=0) && this.m_feetValid){
		var t_torque3=this.p_AdjustTorque(0.0,0.0);
		this.m_body.p_ApplyTorque(t_torque3);
	}
	this.p_UpdateNeck();
	if(((bb_input_KeyHit(t_keyAction))!=0) && !this.m_attacking){
		this.m_attacking=true;
		this.m_animationDelegate.p_PlayAnimation("attack");
	}
	if(this.m_attacking==false){
		if((((bb_input_KeyDown(t_keyRight))!=0) || ((bb_input_KeyDown(t_keyLeft))!=0) || ((bb_input_KeyDown(t_keyDown))!=0) && bb_math_Abs2(this.m_body.p_GetAngle())>0.1) && this.m_feetValid){
			this.m_animationDelegate.p_PlayAnimation("run");
		}else{
			this.m_animationDelegate.p_PlayAnimation("idle");
		}
	}
}
c_Dwarf.m_FRAME_START=[];
c_Dwarf.prototype.p_OnRender=function(){
	var t_center=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_bodyFixture.p_GetAABB().p_GetCenter(t_center);
	var t_orientation=bb_glue_RadiansToDegrees(-this.m_body.p_GetAngle());
	var t_frame=c_Dwarf.m_FRAME_START[this.m_player]+this.m_animationDelegate.p_currentFrame();
	bb_graphics_DrawImage2(c_Dwarf.m_sheet,t_center.m_x*30.0,t_center.m_y*30.0,t_orientation,(-this.m_facing),1.0,t_frame);
	var t_center2=this.m_head.p_GetWorldCenter();
	var t_orientation2=bb_glue_RadiansToDegrees(-this.m_head.p_GetAngle());
	var t_frame2=t_frame;
	var t_facing2=(this.m_facing);
	if(this.m_neck==null){
		t_frame2=c_Dwarf.m_FRAME_START[this.m_player];
		t_facing2=this.m_headlessFacing;
	}
	bb_graphics_DrawImage2(c_Dwarf.m_sheet2,t_center2.m_x*30.0,t_center2.m_y*30.0,t_orientation2,-t_facing2,1.0,t_frame2);
}
c_Dwarf.prototype.p_OnBeginHit=function(t_which,t_other){
	if(!this.m_others[t_which].p_Contains3(t_other)){
		this.m_others[t_which].p_AddLast6(t_other);
	}
}
c_Dwarf.prototype.p_OnBeginContact=function(){
	this.m_feetTouching+=1;
	if(this.m_feetTouching>0){
		this.m_feetContactTime=bb_app_Millisecs();
	}
}
c_Dwarf.prototype.p_OnEndHit=function(t_which,t_other){
	this.m_others[t_which].p_RemoveEach(t_other);
}
c_Dwarf.prototype.p_OnEndContact=function(){
	this.m_feetTouching-=1;
}
c_Dwarf.prototype.p_OnAnimationEnd=function(t_name){
	var t_1=t_name;
	if(t_1=="attack"){
		this.m_attacking=false;
	}
}
c_Dwarf.prototype.p_OnAnimationFrameChange=function(t_name,t_frame,t_framePrevious){
	if(t_name=="attack" && t_frame==12){
		var t_rebound=false;
		var t_bodies=c_List7.m_new.call(new c_List7);
		var t_=this.m_others[(((this.m_facing+1)/2)|0)].p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_fixture=t_.p_NextObject();
			var t_dwarf=bb_main_OtherDwarf(this);
			var t_okay=true;
			for(var t_n=0;t_n<=1;t_n=t_n+1){
				if(t_fixture==t_dwarf.m_hit[t_n]){
					if(t_dwarf.m_animationDelegate.p_currentFrame()!=12){
						t_okay=false;
					}
					if((((t_dwarf.m_facing+1)/2)|0)!=t_n){
						t_okay=false;
					}
				}
			}
			if(t_okay==true){
				var t_body=t_fixture.p_GetBody();
				if(!t_bodies.p_Contains4(t_body)){
					t_bodies.p_AddLast8(t_fixture.p_GetBody());
				}
			}
		}
		var t_2=t_bodies.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t__body=t_2.p_NextObject();
			if(t__body.p_GetType()==0){
				t_rebound=true;
			}else{
				var t_attackVector=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
				this.m_body.p_GetWorldVector(c_b2Vec2.m_new.call(new c_b2Vec2,30.0*(this.m_facing),0.0),t_attackVector);
				t__body.p_ApplyImpulse(t_attackVector,this.p_center());
			}
		}
		if(!t_bodies.p_IsEmpty()){
			var t_multiplier=0.2;
			if(t_rebound==true){
				t_multiplier=0.8;
			}
			var t_attackVector2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
			this.m_body.p_GetWorldVector(c_b2Vec2.m_new.call(new c_b2Vec2,-30.0*(this.m_facing)*t_multiplier,0.0),t_attackVector2);
			var t_offcenter=c_b2Vec2.m_new.call(new c_b2Vec2,this.p_center().m_x,this.p_center().m_y-0.26666666666666666);
			this.m_body.p_ApplyImpulse(t_attackVector2,t_offcenter);
		}
	}
}
function c_Hud(){
	Object.call(this);
	this.m_popup=null;
	this.m_sticker=new_number_array(2);
	this.m_health=[100,100];
	this.m_direction=.0;
	this.m_phase2=.0;
	this.m_time=.0;
	this.m_duration=500;
	this.m_phase=.0;
}
c_Hud.m_new=function(){
	return this;
}
c_Hud.prototype.p_EnablePopup=function(){
	this.m_direction=1.0;
	this.m_phase2=bb_random_Rnd3(360.0);
}
c_Hud.prototype.p_OnRender=function(){
	var t_X=[25,615];
	var t_Y=[25,25];
	var t_S=30;
	for(var t_n=0;t_n<=1;t_n=t_n+1){
		var t_value=this.m_sticker[t_n];
		var t_r=.0;
		var t_g=.0;
		var t_1=true;
		if(t_1==t_value<0.5){
			t_value=t_value*2.0;
			t_r=t_value*255.0;
			t_g=255.0;
		}else{
			if(t_1==(t_value==0.5)){
				t_r=255.0;
				t_g=255.0;
			}else{
				if(t_1==t_value>0.5){
					t_value=2.0-t_value*2.0;
					t_r=255.0;
					t_g=t_value*255.0;
				}
			}
		}
		bb_graphics_SetColor(t_r,t_g,0.0);
		bb_graphics_DrawOval((t_X[t_n]-((t_S/2)|0)),(t_Y[t_n]-((t_S/2)|0)),(t_S),(t_S));
		bb_graphics_SetColor(255.0,255.0,255.0);
		bb_graphics_DrawLine((t_X[t_n]),50.0,(t_X[1-t_n]),50.0);
		var t_dx=(([20.0,-(20.0+bb_graphics_TextWidth("000"))][t_n])|0);
		bb_graphics_DrawText(String(this.m_health[t_n]),(t_X[t_n]+t_dx),(t_Y[t_n]-6),0.0,0.0);
	}
	this.m_time+=this.m_direction*c_Clock.m_Tick();
	if(this.m_time>((this.m_duration/2)|0)){
		this.m_time=((this.m_duration/2)|0);
		this.m_direction=-1.0;
	}else{
		if(this.m_time<0.0){
			this.m_time=0.0;
			this.m_direction=0.0;
		}
	}
	if(this.m_direction!=0.0){
		var t_multiplier=2.0*this.m_time/(this.m_duration);
		var t_sliceHeight=1;
		var t_slices=70;
		var t_offsetMax=20;
		var t_frequency=502.0;
		var t_speed=20.0;
		var t_frequency2=800.0;
		var t_x2=((bb_main_WORLD_WIDTH/2.0-(this.m_popup.p_Width())/2.0)|0);
		var t_y2=(((bb_main_WORLD_HEIGHT)/2.0-(this.m_popup.p_Height())/2.0)|0);
		var t_dx2=.0;
		var t_dy=.0;
		bb_graphics_SetAlpha(t_multiplier*0.5);
		for(var t_n2=0;t_n2<t_slices;t_n2=t_n2+1){
			var t_amplitude=1.0-bb_math_Abs2(2.0*((t_n2)/(t_slices-1))-1.0);
			t_amplitude=t_amplitude*t_amplitude*t_multiplier*t_multiplier;
			t_dx2=Math.sin(((t_n2)*t_frequency+this.m_phase)*D2R)*t_amplitude*(t_offsetMax)+Math.sin(((t_multiplier+bb_random_Rnd3(0.2))*t_frequency2+this.m_phase2)*D2R)*12.0;
			bb_graphics_DrawImageRect(this.m_popup,(t_x2)+t_dx2,(t_y2)+t_dy,0,((t_dy)|0),this.m_popup.p_Width(),t_sliceHeight,0);
			t_dy=t_dy+(t_sliceHeight);
		}
		this.m_phase+=t_speed;
		bb_graphics_SetAlpha(1.0);
	}
}
function c_World(){
	Object.call(this);
	this.m__display=null;
	this.m__sprite=null;
	this.m__world=null;
	this.m_nextFrame=0.0;
	this.m_m_timeStep=0.016666666666666666;
	this.m_m_velocityIterations=10;
	this.m_m_positionIterations=10;
}
c_World.prototype.p_CreateWalls=function(){
	var t_width=bb_main_WORLD_WIDTH;
	var t_height=(bb_main_WORLD_HEIGHT);
	var t_wall=c_b2PolygonShape.m_new.call(new c_b2PolygonShape);
	var t_wallBd=c_b2BodyDef.m_new.call(new c_b2BodyDef);
	var t_wallB=null;
	t_wallBd.m_position.p_Set2(-3.1666666666666665,t_height/30.0/2.0);
	t_wall.p_SetAsBox(3.3333333333333335,(t_height+100.0)/30.0/2.0);
	t_wallB=this.m__world.p_CreateBody2(t_wallBd);
	t_wallB.p_CreateFixture2((t_wall),0.0);
	t_wallBd.m_position.p_Set2((t_width+95.0)/30.0,t_height/30.0/2.0);
	t_wallB=this.m__world.p_CreateBody2(t_wallBd);
	t_wallB.p_CreateFixture2((t_wall),0.0);
	t_wallBd.m_position.p_Set2(t_width/30.0/2.0,-3.1666666666666665);
	t_wall.p_SetAsBox((t_width+100.0)/30.0/2.0,3.3333333333333335);
	t_wallB=this.m__world.p_CreateBody2(t_wallBd);
	t_wallB.p_CreateFixture2((t_wall),0.0);
	t_wall.p_SetAsBox((t_width+100.0)/30.0/2.0,3.3333333333333335);
	t_wallBd.m_position.p_Set2(t_width/30.0/2.0,(t_height+95.0)/30.0);
	t_wallB=this.m__world.p_CreateBody2(t_wallBd);
	t_wallB.p_CreateFixture2((t_wall),0.0);
}
c_World.m_new=function(){
	this.m__display=c_FlashSprite.m_new.call(new c_FlashSprite);
	this.m__sprite=c_FlashSprite.m_new.call(new c_FlashSprite);
	this.m__display.p_AddChild(this.m__sprite);
	var t_worldAABB=c_b2AABB.m_new.call(new c_b2AABB);
	t_worldAABB.m_lowerBound.p_Set2(-1000.0,-1000.0);
	t_worldAABB.m_upperBound.p_Set2(1000.0,1000.0);
	var t_gravity=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,30.0);
	this.m__world=c_b2World.m_new.call(new c_b2World,t_gravity,true);
	this.m__world.p_SetWarmStarting(true);
	var t_dbgDraw=c_b2DebugDraw.m_new.call(new c_b2DebugDraw);
	t_dbgDraw.p_SetSprite(this.m__display);
	t_dbgDraw.p_SetDrawScale(30.0);
	t_dbgDraw.p_SetFillAlpha(0.3);
	t_dbgDraw.p_SetLineThickness(1.0);
	t_dbgDraw.p_SetFlags(c_b2DebugDraw.m_e_shapeBit|c_b2DebugDraw.m_e_jointBit);
	this.m__world.p_SetDebugDraw(t_dbgDraw);
	this.p_CreateWalls();
	this.m__world.p_SetContactListener(c_MyContactListener.m_new.call(new c_MyContactListener));
	return this;
}
c_World.prototype.p_Load=function(t_path){
	bb_rubeloader_LoadRube(t_path,this.m__world);
}
c_World.prototype.p_OnUpdate=function(){
	var t_ms=bb_app_Millisecs();
	if(this.m_nextFrame==0.0 || (t_ms)-this.m_nextFrame>33.333333333333336){
		this.m_nextFrame=(t_ms)-33.333333333333336;
	}
	while(this.m_nextFrame<(t_ms)){
		this.m__world.p_TimeStep(this.m_m_timeStep,this.m_m_velocityIterations,this.m_m_positionIterations);
		this.m__world.p_ClearForces();
		this.m_nextFrame+=16.666666666666668;
	}
}
function c_FlashDisplayObject(){
	Object.call(this);
}
c_FlashDisplayObject.m_new=function(){
	return this;
}
function c_FlashSprite(){
	c_FlashDisplayObject.call(this);
	this.m_displayList=c_HaxeFastList.m_new.call(new c_HaxeFastList);
}
c_FlashSprite.prototype=extend_class(c_FlashDisplayObject);
c_FlashSprite.m_new=function(){
	c_FlashDisplayObject.m_new.call(this);
	return this;
}
c_FlashSprite.prototype.p_AddChild=function(t_child){
	this.m_displayList.p_AddLast(t_child);
	return t_child;
}
function c_HaxeFastList(){
	Object.call(this);
	this.m__tail=null;
	this.m__head=null;
}
c_HaxeFastList.m_new=function(){
	return this;
}
c_HaxeFastList.prototype.p_AddLast=function(t_data){
	var t_added=c_HaxeFastCell.m_new3.call(new c_HaxeFastCell,null,this.m__tail,t_data);
	this.m__tail=t_added;
	if(this.m__head==null){
		this.m__head=t_added;
	}
	return t_added;
}
function c_HaxeFastCell(){
	Object.call(this);
	this.m_nextItem=null;
	this.m__pred=null;
	this.m_elt=null;
}
c_HaxeFastCell.m_new=function(){
	this.m_nextItem=null;
	this.m__pred=null;
	return this;
}
c_HaxeFastCell.m_new2=function(t_data,t_succ){
	this.m_nextItem=t_succ;
	this.m__pred=t_succ.m__pred;
	if(this.m_nextItem!=null){
		this.m_nextItem.m__pred=this;
	}
	if(this.m__pred!=null){
		this.m__pred.m_nextItem=this;
	}
	this.m_elt=t_data;
	return this;
}
c_HaxeFastCell.m_new3=function(t_succ,t_pred,t_data){
	this.m_nextItem=t_succ;
	this.m__pred=t_pred;
	if(this.m_nextItem!=null){
		this.m_nextItem.m__pred=this;
	}
	if(this.m__pred!=null){
		this.m__pred.m_nextItem=this;
	}
	this.m_elt=t_data;
	return this;
}
function c_b2AABB(){
	Object.call(this);
	this.m_lowerBound=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_upperBound=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2AABB.m_new=function(){
	return this;
}
c_b2AABB.prototype.p_TestOverlap=function(t_other){
	if(t_other.m_lowerBound.m_x>this.m_upperBound.m_x){
		return false;
	}
	if(this.m_lowerBound.m_x>t_other.m_upperBound.m_x){
		return false;
	}
	if(t_other.m_lowerBound.m_y>this.m_upperBound.m_y){
		return false;
	}
	if(this.m_lowerBound.m_y>t_other.m_upperBound.m_y){
		return false;
	}
	return true;
}
c_b2AABB.prototype.p_Combine=function(t_aabb1,t_aabb2){
	this.m_lowerBound.m_x=c_b2Math.m_Min(t_aabb1.m_lowerBound.m_x,t_aabb2.m_lowerBound.m_x);
	this.m_lowerBound.m_y=c_b2Math.m_Min(t_aabb1.m_lowerBound.m_y,t_aabb2.m_lowerBound.m_y);
	this.m_upperBound.m_x=c_b2Math.m_Max(t_aabb1.m_upperBound.m_x,t_aabb2.m_upperBound.m_x);
	this.m_upperBound.m_y=c_b2Math.m_Max(t_aabb1.m_upperBound.m_y,t_aabb2.m_upperBound.m_y);
}
c_b2AABB.prototype.p_GetCenter=function(t_out){
	t_out.m_x=(this.m_lowerBound.m_x+this.m_upperBound.m_x)*0.5;
	t_out.m_y=(this.m_lowerBound.m_y+this.m_upperBound.m_y)*0.5;
}
c_b2AABB.prototype.p_Contains2=function(t_aabb){
	var t_result=true;
	t_result=t_result && this.m_lowerBound.m_x<=t_aabb.m_lowerBound.m_x;
	t_result=t_result && this.m_lowerBound.m_y<=t_aabb.m_lowerBound.m_y;
	t_result=t_result && t_aabb.m_upperBound.m_x<=this.m_upperBound.m_x;
	t_result=t_result && t_aabb.m_upperBound.m_y<=this.m_upperBound.m_y;
	return t_result;
}
c_b2AABB.m_StaticCombine=function(t_aabb1,t_aabb2){
	var t_aabb=c_b2AABB.m_new.call(new c_b2AABB);
	t_aabb.p_Combine(t_aabb1,t_aabb2);
	return t_aabb;
}
function c_b2Vec2(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
}
c_b2Vec2.m_new=function(t_x_,t_y_){
	this.m_x=t_x_;
	this.m_y=t_y_;
	return this;
}
c_b2Vec2.prototype.p_Set2=function(t_x_,t_y_){
	this.m_x=t_x_;
	this.m_y=t_y_;
}
c_b2Vec2.prototype.p_SetV=function(t_v){
	this.m_x=t_v.m_x;
	this.m_y=t_v.m_y;
}
c_b2Vec2.prototype.p_SetZero=function(){
	this.m_x=0.0;
	this.m_y=0.0;
}
c_b2Vec2.m_Make=function(t_x_,t_y_){
	return c_b2Vec2.m_new.call(new c_b2Vec2,t_x_,t_y_);
}
c_b2Vec2.prototype.p_Copy=function(){
	return c_b2Vec2.m_new.call(new c_b2Vec2,this.m_x,this.m_y);
}
c_b2Vec2.prototype.p_LengthSquared=function(){
	return this.m_x*this.m_x+this.m_y*this.m_y;
}
c_b2Vec2.prototype.p_Normalize=function(){
	var t_length=Math.sqrt(this.m_x*this.m_x+this.m_y*this.m_y);
	if(t_length<1e-15){
		return 0.0;
	}
	var t_invLength=1.0/t_length;
	this.m_x*=t_invLength;
	this.m_y*=t_invLength;
	return t_length;
}
c_b2Vec2.prototype.p_Subtract=function(t_v){
	this.m_x-=t_v.m_x;
	this.m_y-=t_v.m_y;
}
c_b2Vec2.prototype.p_Length=function(){
	return Math.sqrt(this.m_x*this.m_x+this.m_y*this.m_y);
}
c_b2Vec2.prototype.p_GetNegative=function(t_out){
	t_out.p_Set2(-this.m_x,-this.m_y);
}
c_b2Vec2.prototype.p_Multiply=function(t_a){
	this.m_x*=t_a;
	this.m_y*=t_a;
}
c_b2Vec2.prototype.p_NegativeSelf=function(){
	this.m_x=-this.m_x;
	this.m_y=-this.m_y;
}
c_b2Vec2.prototype.p_Add=function(t_v){
	this.m_x+=t_v.m_x;
	this.m_y+=t_v.m_y;
}
function c_b2World(){
	Object.call(this);
	this.m_m_destructionListener=null;
	this.m_m_debugDraw=null;
	this.m_m_bodyList=null;
	this.m_m_contactList=null;
	this.m_m_jointList=null;
	this.m_m_controllerList=null;
	this.m_m_bodyCount=0;
	this.m_m_contactCount=0;
	this.m_m_jointCount=0;
	this.m_m_controllerCount=0;
	this.m_m_allowSleep=false;
	this.m_m_gravity=null;
	this.m_m_inv_dt0=.0;
	this.m_m_contactManager=c_b2ContactManager.m_new.call(new c_b2ContactManager);
	this.m_m_flags=0;
	this.m_m_groundBody=null;
	this.m_m_island=c_b2Island.m_new.call(new c_b2Island);
	this.m_m_contactSolver=c_b2ContactSolver.m_new.call(new c_b2ContactSolver);
	this.m_stackCapacity=1000;
	this.m_s_stack=new_object_array(1000);
}
c_b2World.m_m_warmStarting=false;
c_b2World.m_m_continuousPhysics=false;
c_b2World.prototype.p_IsLocked=function(){
	return (this.m_m_flags&2)>0;
}
c_b2World.prototype.p_CreateBody2=function(t_def){
	if(this.p_IsLocked()==true){
		return null;
	}
	var t_b=c_b2Body.m_new.call(new c_b2Body,t_def,this);
	t_b.m_m_prev=null;
	t_b.m_m_next=this.m_m_bodyList;
	if((this.m_m_bodyList)!=null){
		this.m_m_bodyList.m_m_prev=t_b;
	}
	this.m_m_bodyList=t_b;
	this.m_m_bodyCount+=1;
	return t_b;
}
c_b2World.m_new=function(t_gravity,t_doSleep){
	this.m_m_destructionListener=null;
	this.m_m_debugDraw=null;
	this.m_m_bodyList=null;
	this.m_m_contactList=null;
	this.m_m_jointList=null;
	this.m_m_controllerList=null;
	this.m_m_bodyCount=0;
	this.m_m_contactCount=0;
	this.m_m_jointCount=0;
	this.m_m_controllerCount=0;
	c_b2World.m_m_warmStarting=true;
	c_b2World.m_m_continuousPhysics=true;
	this.m_m_allowSleep=t_doSleep;
	this.m_m_gravity=t_gravity;
	this.m_m_inv_dt0=0.0;
	this.m_m_contactManager.m_m_world=this;
	var t_bd=c_b2BodyDef.m_new.call(new c_b2BodyDef);
	this.m_m_groundBody=this.p_CreateBody2(t_bd);
	return this;
}
c_b2World.m_new2=function(){
	return this;
}
c_b2World.prototype.p_SetWarmStarting=function(t_flag){
	c_b2World.m_m_warmStarting=t_flag;
}
c_b2World.prototype.p_SetDebugDraw=function(t_debugDraw){
	this.m_m_debugDraw=t_debugDraw;
}
c_b2World.prototype.p_SetContactListener=function(t_listener){
	this.m_m_contactManager.m_m_contactListener=t_listener;
}
c_b2World.prototype.p_CreateJoint=function(t_def){
	var t_j=c_b2Joint.m_Create(t_def,null);
	t_j.m_m_prev=null;
	t_j.m_m_next=this.m_m_jointList;
	if((this.m_m_jointList)!=null){
		this.m_m_jointList.m_m_prev=t_j;
	}
	this.m_m_jointList=t_j;
	this.m_m_jointCount+=1;
	t_j.m_m_edgeA.m_joint=t_j;
	t_j.m_m_edgeA.m_other=t_j.m_m_bodyB;
	t_j.m_m_edgeA.m_prevItem=null;
	t_j.m_m_edgeA.m_nextItem=t_j.m_m_bodyA.m_m_jointList;
	if((t_j.m_m_bodyA.m_m_jointList)!=null){
		t_j.m_m_bodyA.m_m_jointList.m_prevItem=t_j.m_m_edgeA;
	}
	t_j.m_m_bodyA.m_m_jointList=t_j.m_m_edgeA;
	t_j.m_m_edgeB.m_joint=t_j;
	t_j.m_m_edgeB.m_other=t_j.m_m_bodyA;
	t_j.m_m_edgeB.m_prevItem=null;
	t_j.m_m_edgeB.m_nextItem=t_j.m_m_bodyB.m_m_jointList;
	if((t_j.m_m_bodyB.m_m_jointList)!=null){
		t_j.m_m_bodyB.m_m_jointList.m_prevItem=t_j.m_m_edgeB;
	}
	t_j.m_m_bodyB.m_m_jointList=t_j.m_m_edgeB;
	var t_bodyA=t_def.m_bodyA;
	var t_bodyB=t_def.m_bodyB;
	if(t_def.m_collideConnected==false){
		var t_edge=t_bodyB.p_GetContactList();
		while((t_edge)!=null){
			if(t_edge.m_other==t_bodyA){
				t_edge.m_contact.p_FlagForFiltering();
			}
			t_edge=t_edge.m_nextItem;
		}
	}
	return t_j;
}
c_b2World.m_s_timestep2=null;
c_b2World.prototype.p_Solve=function(t_timeStep){
	var t_b=null;
	var t_controller=this.m_m_controllerList;
	while(t_controller!=null){
		t_controller.p_TimeStep2(t_timeStep);
		t_controller=t_controller.m_m_next;
	}
	var t_island=this.m_m_island;
	t_island.p_Initialize(this.m_m_bodyCount,this.m_m_contactCount,this.m_m_jointCount,null,this.m_m_contactManager.m_m_contactListener,this.m_m_contactSolver);
	t_b=this.m_m_bodyList;
	while(t_b!=null){
		t_b.m_m_flags&=-2;
		t_b=t_b.m_m_next;
	}
	var t_c=this.m_m_contactList;
	while(t_c!=null){
		t_c.m_m_flags&=-5;
		t_c=t_c.m_m_next;
	}
	var t_j=this.m_m_jointList;
	while(t_j!=null){
		t_j.m_m_islandFlag=false;
		t_j=t_j.m_m_next;
	}
	var t_stackSize=this.m_m_bodyCount;
	if(t_stackSize>this.m_stackCapacity){
		this.m_s_stack=resize_object_array(this.m_s_stack,t_stackSize);
		this.m_stackCapacity=t_stackSize;
	}
	var t_stack=this.m_s_stack;
	var t_seed=this.m_m_bodyList;
	var t_seedStart=true;
	while(t_seed!=null){
		if((t_seed.m_m_flags&1)!=0){
			t_seed=t_seed.m_m_next;
			continue;
		}
		if((t_seed.m_m_flags&34)!=34){
			t_seed=t_seed.m_m_next;
			continue;
		}
		if(t_seed.m_m_type==0){
			t_seed=t_seed.m_m_next;
			continue;
		}
		t_island.p_Clear();
		var t_stackCount=0;
		t_stack[t_stackCount]=t_seed;
		t_stackCount+=1;
		t_seed.m_m_flags|=1;
		while(t_stackCount>0){
			t_stackCount-=1;
			t_b=t_stack[t_stackCount];
			t_island.p_AddBody(t_b);
			if(!((t_b.m_m_flags&2)!=0)){
				t_b.p_SetAwake(true);
			}
			if(t_b.m_m_type==0){
				continue;
			}
			var t_other=null;
			var t_ce=t_b.m_m_contactList;
			while(t_ce!=null){
				if((t_ce.m_contact.m_m_flags&4)!=0){
					t_ce=t_ce.m_nextItem;
					continue;
				}
				if((t_ce.m_contact.m_m_flags&48)!=48 || ((t_ce.m_contact.m_m_flags&1)!=0)){
					t_ce=t_ce.m_nextItem;
					continue;
				}
				t_island.p_AddContact(t_ce.m_contact);
				t_ce.m_contact.m_m_flags|=4;
				t_other=t_ce.m_other;
				if((t_other.m_m_flags&1)!=0){
					t_ce=t_ce.m_nextItem;
					continue;
				}
				t_stack[t_stackCount]=t_other;
				t_stackCount+=1;
				t_other.m_m_flags|=1;
				t_ce=t_ce.m_nextItem;
			}
			var t_jn=t_b.m_m_jointList;
			while(t_jn!=null){
				if(t_jn.m_joint.m_m_islandFlag==true){
					t_jn=t_jn.m_nextItem;
					continue;
				}
				t_other=t_jn.m_other;
				if(!((t_other.m_m_flags&32)!=0)){
					t_jn=t_jn.m_nextItem;
					continue;
				}
				t_island.p_AddJoint(t_jn.m_joint);
				t_jn.m_joint.m_m_islandFlag=true;
				if((t_other.m_m_flags&1)!=0){
					t_jn=t_jn.m_nextItem;
					continue;
				}
				t_stack[t_stackCount]=t_other;
				t_stackCount+=1;
				t_other.m_m_flags|=1;
				t_jn=t_jn.m_nextItem;
			}
		}
		t_island.p_Solve4(t_timeStep,this.m_m_gravity,this.m_m_allowSleep);
		for(var t_i=0;t_i<t_island.m_m_bodyCount;t_i=t_i+1){
			t_b=t_island.m_m_bodies[t_i];
			if(t_b.m_m_type==0){
				t_b.m_m_flags&=-2;
			}
		}
		t_seed=t_seed.m_m_next;
	}
	for(var t_i2=0;t_i2<t_stack.length;t_i2=t_i2+1){
		if(t_stack[t_i2]==null){
			break;
		}
		t_stack[t_i2]=null;
	}
	t_b=this.m_m_bodyList;
	while(t_b!=null){
		if((t_b.m_m_flags&34)!=34){
			t_b=t_b.m_m_next;
			continue;
		}
		if(t_b.m_m_type==0){
			t_b=t_b.m_m_next;
			continue;
		}
		t_b.p_SynchronizeFixtures();
		t_b=t_b.m_m_next;
	}
	this.m_m_contactManager.p_FindNewContacts();
}
c_b2World.m_s_queue=[];
c_b2World.m_s_backupA=null;
c_b2World.m_s_backupB=null;
c_b2World.m_s_timestep=null;
c_b2World.prototype.p_SolveTOI=function(t_timeStep){
	var t_b=null;
	var t_fA=null;
	var t_fB=null;
	var t_bA=null;
	var t_bB=null;
	var t_cEdge=null;
	var t_j=null;
	var t_island=this.m_m_island;
	t_island.p_Initialize(this.m_m_bodyCount,32,32,null,this.m_m_contactManager.m_m_contactListener,this.m_m_contactSolver);
	if(this.m_m_bodyCount>c_b2World.m_s_queue.length){
		c_b2World.m_s_queue=resize_object_array(c_b2World.m_s_queue,this.m_m_bodyCount);
	}
	var t_queue=c_b2World.m_s_queue;
	t_b=this.m_m_bodyList;
	while(t_b!=null){
		t_b.m_m_flags&=-2;
		t_b.m_m_sweep.m_t0=0.0;
		t_b=t_b.m_m_next;
	}
	var t_c=null;
	t_c=this.m_m_contactList;
	while(t_c!=null){
		t_c.m_m_flags&=-13;
		t_c=t_c.m_m_next;
	}
	t_j=this.m_m_jointList;
	while(t_j!=null){
		t_j.m_m_islandFlag=false;
		t_j=t_j.m_m_next;
	}
	while(true){
		var t_minContact=null;
		var t_minTOI=1.0;
		t_c=this.m_m_contactList;
		while(t_c!=null){
			if((t_c.m_m_flags&34)!=34 || ((t_c.m_m_flags&1)!=0)){
				t_c=t_c.m_m_next;
				continue;
			}
			var t_toi=1.0;
			if((t_c.m_m_flags&8)!=0){
				t_toi=t_c.m_m_toi;
			}else{
				t_fA=t_c.m_m_fixtureA;
				t_fB=t_c.m_m_fixtureB;
				t_bA=t_fA.m_m_body;
				t_bB=t_fB.m_m_body;
				if((t_bA.m_m_type!=2 || !((t_bA.m_m_flags&2)!=0)) && (t_bB.m_m_type!=2 || !((t_bA.m_m_flags&2)!=0))){
					t_c=t_c.m_m_next;
					continue;
				}
				var t_t0=t_bA.m_m_sweep.m_t0;
				if(t_bA.m_m_sweep.m_t0<t_bB.m_m_sweep.m_t0){
					t_t0=t_bB.m_m_sweep.m_t0;
					t_bA.m_m_sweep.p_Advance(t_t0);
				}else{
					if(t_bB.m_m_sweep.m_t0<t_bA.m_m_sweep.m_t0){
						t_t0=t_bA.m_m_sweep.m_t0;
						t_bB.m_m_sweep.p_Advance(t_t0);
					}
				}
				t_toi=t_c.p_ComputeTOI(t_bA.m_m_sweep,t_bB.m_m_sweep);
				if(t_toi>0.0 && t_toi<1.0){
					t_toi=(1.0-t_toi)*t_t0+t_toi;
					if(t_toi>1.0){
						t_toi=1.0;
					}
				}
				t_c.m_m_toi=t_toi;
				t_c.m_m_flags|=8;
			}
			if(1e-15<t_toi && t_toi<t_minTOI){
				t_minContact=t_c;
				t_minTOI=t_toi;
			}
			t_c=t_c.m_m_next;
		}
		if(t_minContact==null || 0.99999999999989997<t_minTOI){
			break;
		}
		t_fA=t_minContact.m_m_fixtureA;
		t_fB=t_minContact.m_m_fixtureB;
		t_bA=t_fA.m_m_body;
		t_bB=t_fB.m_m_body;
		c_b2World.m_s_backupA.p_Set7(t_bA.m_m_sweep);
		c_b2World.m_s_backupB.p_Set7(t_bB.m_m_sweep);
		t_bA.p_Advance(t_minTOI);
		t_bB.p_Advance(t_minTOI);
		t_minContact.p_Update(this.m_m_contactManager.m_m_contactListener);
		t_minContact.m_m_flags&=-9;
		if(((t_minContact.m_m_flags&1)!=0) || !((t_minContact.m_m_flags&32)!=0)){
			t_bA.m_m_sweep.p_Set7(c_b2World.m_s_backupA);
			t_bB.m_m_sweep.p_Set7(c_b2World.m_s_backupB);
			t_bA.p_SynchronizeTransform();
			t_bB.p_SynchronizeTransform();
			continue;
		}
		if(!((t_minContact.m_m_flags&16)!=0)){
			continue;
		}
		var t_seed=t_bA;
		if(t_seed.m_m_type!=2){
			t_seed=t_bB;
		}
		t_island.p_Clear();
		var t_other=null;
		var t_queueStart=0;
		var t_queueSize=0;
		t_queue[t_queueStart+t_queueSize]=t_seed;
		t_queueSize+=1;
		t_seed.m_m_flags|=1;
		while(t_queueSize>0){
			t_b=t_queue[t_queueStart];
			t_queueStart+=1;
			t_queueSize-=1;
			t_island.p_AddBody(t_b);
			if(!((t_b.m_m_flags&2)!=0)){
				t_b.p_SetAwake(true);
			}
			if(t_b.m_m_type!=2){
				continue;
			}
			t_cEdge=t_b.m_m_contactList;
			while(t_cEdge!=null){
				if(t_island.m_m_contactCount==t_island.m_m_contactCapacity){
					break;
				}
				if((t_cEdge.m_contact.m_m_flags&4)!=0){
					t_cEdge=t_cEdge.m_nextItem;
					continue;
				}
				if((t_cEdge.m_contact.m_m_flags&48)!=48 || ((t_cEdge.m_contact.m_m_flags&1)!=0)){
					t_cEdge=t_cEdge.m_nextItem;
					continue;
				}
				t_island.p_AddContact(t_cEdge.m_contact);
				t_cEdge.m_contact.m_m_flags|=4;
				t_other=t_cEdge.m_other;
				if((t_other.m_m_flags&1)!=0){
					t_cEdge=t_cEdge.m_nextItem;
					continue;
				}
				if(t_other.m_m_type!=0){
					t_other.p_Advance(t_minTOI);
					t_other.p_SetAwake(true);
				}
				t_queue[t_queueStart+t_queueSize]=t_other;
				t_queueSize+=1;
				t_other.m_m_flags|=1;
				t_cEdge=t_cEdge.m_nextItem;
			}
			var t_jEdge=t_b.m_m_jointList;
			while(t_jEdge!=null){
				if(t_island.m_m_jointCount==t_island.m_m_jointCapacity){
					t_jEdge=t_jEdge.m_nextItem;
					continue;
				}
				if(t_jEdge.m_joint.m_m_islandFlag==true){
					t_jEdge=t_jEdge.m_nextItem;
					continue;
				}
				t_other=t_jEdge.m_other;
				if(t_other.p_IsActive()==false){
					t_jEdge=t_jEdge.m_nextItem;
					continue;
				}
				t_island.p_AddJoint(t_jEdge.m_joint);
				t_jEdge.m_joint.m_m_islandFlag=true;
				if((t_other.m_m_flags&1)!=0){
					t_jEdge=t_jEdge.m_nextItem;
					continue;
				}
				if(t_other.m_m_type!=0){
					t_other.p_Advance(t_minTOI);
					t_other.p_SetAwake(true);
				}
				t_queue[t_queueStart+t_queueSize]=t_other;
				t_queueSize+=1;
				t_other.m_m_flags|=1;
				t_jEdge=t_jEdge.m_nextItem;
			}
		}
		var t_subStep=c_b2World.m_s_timestep;
		t_subStep.m_warmStarting=false;
		t_subStep.m_dt=(1.0-t_minTOI)*t_timeStep.m_dt;
		t_subStep.m_inv_dt=1.0/t_subStep.m_dt;
		t_subStep.m_dtRatio=0.0;
		t_subStep.m_velocityIterations=t_timeStep.m_velocityIterations;
		t_subStep.m_positionIterations=t_timeStep.m_positionIterations;
		t_island.p_SolveTOI(t_subStep);
		for(var t_i=0;t_i<t_island.m_m_bodyCount;t_i=t_i+1){
			t_b=t_island.m_m_bodies[t_i];
			t_b.m_m_flags&=-2;
			if(!((t_b.m_m_flags&2)!=0)){
				continue;
			}
			if(t_b.m_m_type!=2){
				continue;
			}
			t_b.p_SynchronizeFixtures();
			t_cEdge=t_b.m_m_contactList;
			while(t_cEdge!=null){
				t_cEdge.m_contact.m_m_flags&=-9;
				t_cEdge=t_cEdge.m_nextItem;
			}
		}
		for(var t_i2=0;t_i2<t_island.m_m_contactCount;t_i2=t_i2+1){
			t_c=t_island.m_m_contacts[t_i2];
			t_c.m_m_flags&=-13;
		}
		for(var t_i3=0;t_i3<t_island.m_m_jointCount;t_i3=t_i3+1){
			t_j=t_island.m_m_joints[t_i3];
			t_j.m_m_islandFlag=false;
		}
		this.m_m_contactManager.p_FindNewContacts();
	}
}
c_b2World.prototype.p_TimeStep=function(t_dt,t_velocityIterations,t_positionIterations){
	if((this.m_m_flags&1)!=0){
		this.m_m_contactManager.p_FindNewContacts();
		this.m_m_flags&=-2;
	}
	this.m_m_flags|=2;
	var t_timeStep=c_b2World.m_s_timestep2;
	t_timeStep.m_dt=t_dt;
	t_timeStep.m_velocityIterations=t_velocityIterations;
	t_timeStep.m_positionIterations=t_positionIterations;
	if(t_dt>0.0){
		t_timeStep.m_inv_dt=1.0/t_dt;
	}else{
		t_timeStep.m_inv_dt=0.0;
	}
	t_timeStep.m_dtRatio=this.m_m_inv_dt0*t_dt;
	t_timeStep.m_warmStarting=c_b2World.m_m_warmStarting;
	this.m_m_contactManager.p_Collide();
	if(t_timeStep.m_dt>0.0){
		this.p_Solve(t_timeStep);
	}
	if(c_b2World.m_m_continuousPhysics && t_timeStep.m_dt>0.0){
		this.p_SolveTOI(t_timeStep);
	}
	if(t_timeStep.m_dt>0.0){
		this.m_m_inv_dt0=t_timeStep.m_inv_dt;
	}
	this.m_m_flags&=-3;
}
c_b2World.prototype.p_ClearForces=function(){
	var t_body=this.m_m_bodyList;
	while(t_body!=null){
		t_body.m_m_force.p_SetZero();
		t_body.m_m_torque=0.0;
		t_body=t_body.m_m_next;
	}
}
c_b2World.prototype.p_DestroyJoint=function(t_j){
	var t_collideConnected=t_j.m_m_collideConnected;
	if((t_j.m_m_prev)!=null){
		t_j.m_m_prev.m_m_next=t_j.m_m_next;
	}
	if((t_j.m_m_next)!=null){
		t_j.m_m_next.m_m_prev=t_j.m_m_prev;
	}
	if(t_j==this.m_m_jointList){
		this.m_m_jointList=t_j.m_m_next;
	}
	var t_bodyA=t_j.m_m_bodyA;
	var t_bodyB=t_j.m_m_bodyB;
	t_bodyA.p_SetAwake(true);
	t_bodyB.p_SetAwake(true);
	if((t_j.m_m_edgeA.m_prevItem)!=null){
		t_j.m_m_edgeA.m_prevItem.m_nextItem=t_j.m_m_edgeA.m_nextItem;
	}
	if((t_j.m_m_edgeA.m_nextItem)!=null){
		t_j.m_m_edgeA.m_nextItem.m_prevItem=t_j.m_m_edgeA.m_prevItem;
	}
	if(t_j.m_m_edgeA==t_bodyA.m_m_jointList){
		t_bodyA.m_m_jointList=t_j.m_m_edgeA.m_nextItem;
	}
	t_j.m_m_edgeA.m_prevItem=null;
	t_j.m_m_edgeA.m_nextItem=null;
	if((t_j.m_m_edgeB.m_prevItem)!=null){
		t_j.m_m_edgeB.m_prevItem.m_nextItem=t_j.m_m_edgeB.m_nextItem;
	}
	if((t_j.m_m_edgeB.m_nextItem)!=null){
		t_j.m_m_edgeB.m_nextItem.m_prevItem=t_j.m_m_edgeB.m_prevItem;
	}
	if(t_j.m_m_edgeB==t_bodyB.m_m_jointList){
		t_bodyB.m_m_jointList=t_j.m_m_edgeB.m_nextItem;
	}
	t_j.m_m_edgeB.m_prevItem=null;
	t_j.m_m_edgeB.m_nextItem=null;
	c_b2Joint.m_Destroy(t_j,null);
	this.m_m_jointCount-=1;
	if(t_collideConnected==false){
		var t_edge=t_bodyB.p_GetContactList();
		while((t_edge)!=null){
			if(t_edge.m_other==t_bodyA){
				t_edge.m_contact.p_FlagForFiltering();
			}
			t_edge=t_edge.m_nextItem;
		}
	}
}
c_b2World.prototype.p_SetGravity=function(t_gravity){
	this.m_m_gravity=t_gravity;
}
function c_b2DestructionListener(){
	Object.call(this);
}
function c_b2DebugDraw(){
	Object.call(this);
	this.m_m_drawFlags=0;
	this.m_m_sprite=null;
	this.m_m_drawScale=1.0;
	this.m_m_fillAlpha=1.0;
	this.m_m_lineThickness=1.0;
}
c_b2DebugDraw.m_new=function(){
	this.m_m_drawFlags=0;
	return this;
}
c_b2DebugDraw.prototype.p_SetSprite=function(t_spr){
	this.m_m_sprite=t_spr;
}
c_b2DebugDraw.prototype.p_SetDrawScale=function(t_drawScale){
	this.m_m_drawScale=t_drawScale;
}
c_b2DebugDraw.prototype.p_SetFillAlpha=function(t_alpha){
	this.m_m_fillAlpha=t_alpha;
}
c_b2DebugDraw.prototype.p_SetLineThickness=function(t_lineThickness){
	this.m_m_lineThickness=t_lineThickness;
}
c_b2DebugDraw.m_e_shapeBit=0;
c_b2DebugDraw.m_e_jointBit=0;
c_b2DebugDraw.prototype.p_SetFlags=function(t_flags){
	this.m_m_drawFlags=t_flags;
}
function c_b2Body(){
	Object.call(this);
	this.m_m_flags=0;
	this.m_m_world=null;
	this.m_m_xf=c_b2Transform.m_new.call(new c_b2Transform,null,null);
	this.m_m_sweep=c_b2Sweep.m_new.call(new c_b2Sweep);
	this.m_m_jointList=null;
	this.m_m_controllerList=null;
	this.m_m_contactList=null;
	this.m_m_controllerCount=0;
	this.m_m_prev=null;
	this.m_m_next=null;
	this.m_m_linearVelocity=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_angularVelocity=.0;
	this.m_m_linearDamping=.0;
	this.m_m_angularDamping=.0;
	this.m_m_force=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_torque=.0;
	this.m_m_sleepTime=.0;
	this.m_m_type=0;
	this.m_m_mass=.0;
	this.m_m_invMass=.0;
	this.m_m_I=.0;
	this.m_m_invI=.0;
	this.m_m_inertiaScale=.0;
	this.m_m_userData=null;
	this.m_m_fixtureList=null;
	this.m_m_fixtureCount=0;
	this.m_m_islandIndex=0;
}
c_b2Body.m_new=function(t_bd,t_world){
	this.m_m_flags=0;
	if(t_bd.m_bullet){
		this.m_m_flags|=8;
	}
	if(t_bd.m_fixedRotation){
		this.m_m_flags|=16;
	}
	if(t_bd.m_allowSleep){
		this.m_m_flags|=4;
	}
	if(t_bd.m_awake){
		this.m_m_flags|=2;
	}
	if(t_bd.m_active){
		this.m_m_flags|=32;
	}
	this.m_m_world=t_world;
	this.m_m_xf.m_position.p_SetV(t_bd.m_position);
	this.m_m_xf.m_R.p_Set6(t_bd.m_angle);
	this.m_m_sweep.m_localCenter.p_SetZero();
	this.m_m_sweep.m_t0=1.0;
	this.m_m_sweep.m_a0=t_bd.m_angle;
	this.m_m_sweep.m_a=t_bd.m_angle;
	var t_tMat=this.m_m_xf.m_R;
	var t_tVec=this.m_m_sweep.m_localCenter;
	this.m_m_sweep.m_c.m_x=t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
	this.m_m_sweep.m_c.m_y=t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
	this.m_m_sweep.m_c.m_x+=this.m_m_xf.m_position.m_x;
	this.m_m_sweep.m_c.m_y+=this.m_m_xf.m_position.m_y;
	this.m_m_sweep.m_c0.p_SetV(this.m_m_sweep.m_c);
	this.m_m_jointList=null;
	this.m_m_controllerList=null;
	this.m_m_contactList=null;
	this.m_m_controllerCount=0;
	this.m_m_prev=null;
	this.m_m_next=null;
	this.m_m_linearVelocity.p_SetV(t_bd.m_linearVelocity);
	this.m_m_angularVelocity=t_bd.m_angularVelocity;
	this.m_m_linearDamping=t_bd.m_linearDamping;
	this.m_m_angularDamping=t_bd.m_angularDamping;
	this.m_m_force.p_Set2(0.0,0.0);
	this.m_m_torque=0.0;
	this.m_m_sleepTime=0.0;
	this.m_m_type=t_bd.m_type;
	if(this.m_m_type==2){
		this.m_m_mass=1.0;
		this.m_m_invMass=1.0;
	}else{
		this.m_m_mass=0.0;
		this.m_m_invMass=0.0;
	}
	this.m_m_I=0.0;
	this.m_m_invI=0.0;
	this.m_m_inertiaScale=t_bd.m_inertiaScale;
	this.m_m_userData=t_bd.m_userData;
	this.m_m_fixtureList=null;
	this.m_m_fixtureCount=0;
	return this;
}
c_b2Body.m_new2=function(){
	return this;
}
c_b2Body.prototype.p_ResetMassData=function(){
	this.m_m_mass=0.0;
	this.m_m_invMass=0.0;
	this.m_m_I=0.0;
	this.m_m_invI=0.0;
	this.m_m_sweep.m_localCenter.p_SetZero();
	if(this.m_m_type==0 || this.m_m_type==1){
		return;
	}
	var t_center=c_b2Vec2.m_Make(0.0,0.0);
	var t_f=this.m_m_fixtureList;
	while(t_f!=null){
		if(t_f.m_m_density==0.0){
			t_f=t_f.m_m_next;
			continue;
		}
		var t_massData=t_f.p_GetMassData(null);
		this.m_m_mass+=t_massData.m_mass;
		t_center.m_x+=t_massData.m_center.m_x*t_massData.m_mass;
		t_center.m_y+=t_massData.m_center.m_y*t_massData.m_mass;
		this.m_m_I+=t_massData.m_I;
		t_f=t_f.m_m_next;
	}
	if(this.m_m_mass>0.0){
		this.m_m_invMass=1.0/this.m_m_mass;
		t_center.m_x*=this.m_m_invMass;
		t_center.m_y*=this.m_m_invMass;
	}else{
		this.m_m_mass=1.0;
		this.m_m_invMass=1.0;
	}
	if(this.m_m_I>0.0 && (this.m_m_flags&16)==0){
		this.m_m_I-=this.m_m_mass*(t_center.m_x*t_center.m_x+t_center.m_y*t_center.m_y);
		this.m_m_I*=this.m_m_inertiaScale;
		this.m_m_invI=1.0/this.m_m_I;
	}else{
		this.m_m_I=0.0;
		this.m_m_invI=0.0;
	}
	var t_oldCenter=this.m_m_sweep.m_c.p_Copy();
	this.m_m_sweep.m_localCenter.p_SetV(t_center);
	c_b2Math.m_MulX(this.m_m_xf,this.m_m_sweep.m_localCenter,this.m_m_sweep.m_c0);
	this.m_m_sweep.m_c.p_SetV(this.m_m_sweep.m_c0);
	this.m_m_linearVelocity.m_x+=this.m_m_angularVelocity*-(this.m_m_sweep.m_c.m_y-t_oldCenter.m_y);
	this.m_m_linearVelocity.m_y+=this.m_m_angularVelocity*+(this.m_m_sweep.m_c.m_x-t_oldCenter.m_x);
}
c_b2Body.prototype.p_CreateFixture=function(t_def){
	if(this.m_m_world.p_IsLocked()==true){
		return null;
	}
	var t_fixture=c_b2Fixture.m_new.call(new c_b2Fixture);
	t_fixture.p_Create3(this,this.m_m_xf,t_def);
	if((this.m_m_flags&32)!=0){
		var t_broadPhase=this.m_m_world.m_m_contactManager.m_m_broadPhase;
		t_fixture.p_CreateProxy2(t_broadPhase,this.m_m_xf);
	}
	t_fixture.m_m_next=this.m_m_fixtureList;
	this.m_m_fixtureList=t_fixture;
	this.m_m_fixtureCount+=1;
	t_fixture.m_m_body=this;
	if(t_fixture.m_m_density>0.0){
		this.p_ResetMassData();
	}
	this.m_m_world.m_m_flags|=1;
	return t_fixture;
}
c_b2Body.prototype.p_CreateFixture2=function(t_shape,t_density){
	var t_def=c_b2FixtureDef.m_new.call(new c_b2FixtureDef);
	t_def.m_shape=t_shape;
	t_def.m_density=t_density;
	return this.p_CreateFixture(t_def);
}
c_b2Body.prototype.p_GetWorldCenter=function(){
	return this.m_m_sweep.m_c;
}
c_b2Body.prototype.p_GetWorldPoint=function(t_localPoint,t_out){
	var t_A=this.m_m_xf.m_R;
	var t_tmp=t_localPoint.m_x;
	t_out.p_Set2(t_A.m_col1.m_x*t_tmp+t_A.m_col2.m_x*t_localPoint.m_y,t_A.m_col1.m_y*t_tmp+t_A.m_col2.m_y*t_localPoint.m_y);
	t_out.m_x+=this.m_m_xf.m_position.m_x;
	t_out.m_y+=this.m_m_xf.m_position.m_y;
}
c_b2Body.prototype.p_GetWorldVector=function(t_localVector,t_out){
	c_b2Math.m_MulMV(this.m_m_xf.m_R,t_localVector,t_out);
}
c_b2Body.prototype.p_GetContactList=function(){
	return this.m_m_contactList;
}
c_b2Body.prototype.p_GetMassData=function(t_data){
	t_data.m_mass=this.m_m_mass;
	t_data.m_I=this.m_m_I;
	t_data.m_center.p_SetV(this.m_m_sweep.m_localCenter);
}
c_b2Body.prototype.p_GetMass=function(){
	return this.m_m_mass;
}
c_b2Body.m_tmpVec1=null;
c_b2Body.prototype.p_SetMassData=function(t_massData){
	if(this.m_m_world.p_IsLocked()==true){
		return;
	}
	if(this.m_m_type!=2){
		return;
	}
	this.m_m_invMass=0.0;
	this.m_m_I=0.0;
	this.m_m_invI=0.0;
	this.m_m_mass=t_massData.m_mass;
	if(this.m_m_mass<=0.0){
		this.m_m_mass=1.0;
	}
	this.m_m_invMass=1.0/this.m_m_mass;
	if(t_massData.m_I>0.0 && (this.m_m_flags&16)==0){
		this.m_m_I=t_massData.m_I-this.m_m_mass*(t_massData.m_center.m_x*t_massData.m_center.m_x+t_massData.m_center.m_y*t_massData.m_center.m_y);
		this.m_m_invI=1.0/this.m_m_I;
	}
	var t_oldCenter=this.m_m_sweep.m_c.p_Copy();
	this.m_m_sweep.m_localCenter.p_SetV(t_massData.m_center);
	c_b2Math.m_MulX(this.m_m_xf,this.m_m_sweep.m_localCenter,c_b2Body.m_tmpVec1);
	this.m_m_sweep.m_c0.p_SetV(c_b2Body.m_tmpVec1);
	this.m_m_sweep.m_c.p_SetV(this.m_m_sweep.m_c0);
	this.m_m_linearVelocity.m_x+=this.m_m_angularVelocity*-(this.m_m_sweep.m_c.m_y-t_oldCenter.m_y);
	this.m_m_linearVelocity.m_y+=this.m_m_angularVelocity*+(this.m_m_sweep.m_c.m_x-t_oldCenter.m_x);
}
c_b2Body.prototype.p_IsAwake=function(){
	return (this.m_m_flags&2)==2;
}
c_b2Body.prototype.p_ShouldCollide=function(t_other){
	if(this.m_m_type!=2 && t_other.m_m_type!=2){
		return false;
	}
	var t_jn=this.m_m_jointList;
	while(t_jn!=null){
		if(t_jn.m_other==t_other && t_jn.m_joint.m_m_collideConnected==false){
			return false;
		}
		t_jn=t_jn.m_nextItem;
	}
	return true;
}
c_b2Body.prototype.p_SetAwake=function(t_flag){
	if(t_flag){
		this.m_m_flags|=2;
		this.m_m_sleepTime=0.0;
	}else{
		this.m_m_flags&=-3;
		this.m_m_sleepTime=0.0;
		this.m_m_linearVelocity.p_SetZero();
		this.m_m_angularVelocity=0.0;
		this.m_m_force.p_SetZero();
		this.m_m_torque=0.0;
	}
}
c_b2Body.prototype.p_GetTransform=function(){
	return this.m_m_xf;
}
c_b2Body.prototype.p_GetType=function(){
	return this.m_m_type;
}
c_b2Body.prototype.p_IsBullet=function(){
	return (this.m_m_flags&8)==8;
}
c_b2Body.prototype.p_SynchronizeTransform=function(){
	var t_tMat=this.m_m_xf.m_R;
	t_tMat.p_Set6(this.m_m_sweep.m_a);
	var t_tVec=this.m_m_sweep.m_localCenter;
	this.m_m_xf.m_position.m_x=this.m_m_sweep.m_c.m_x-(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	this.m_m_xf.m_position.m_y=this.m_m_sweep.m_c.m_y-(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
}
c_b2Body.m_s_xf1=null;
c_b2Body.prototype.p_SynchronizeFixtures=function(){
	var t_xf1=c_b2Body.m_s_xf1;
	t_xf1.m_R.p_Set6(this.m_m_sweep.m_a0);
	var t_tMat=t_xf1.m_R;
	var t_tVec=this.m_m_sweep.m_localCenter;
	t_xf1.m_position.m_x=this.m_m_sweep.m_c0.m_x-(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	t_xf1.m_position.m_y=this.m_m_sweep.m_c0.m_y-(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	var t_f=null;
	var t_broadPhase=this.m_m_world.m_m_contactManager.m_m_broadPhase;
	t_f=this.m_m_fixtureList;
	while(t_f!=null){
		t_f.p_Synchronize(t_broadPhase,t_xf1,this.m_m_xf);
		t_f=t_f.m_m_next;
	}
}
c_b2Body.prototype.p_Advance=function(t_t){
	this.m_m_sweep.p_Advance(t_t);
	this.m_m_sweep.m_c.p_SetV(this.m_m_sweep.m_c0);
	this.m_m_sweep.m_a=this.m_m_sweep.m_a0;
	this.p_SynchronizeTransform();
}
c_b2Body.prototype.p_IsActive=function(){
	return (this.m_m_flags&32)==32;
}
c_b2Body.prototype.p_GetLinearVelocity=function(){
	return this.m_m_linearVelocity;
}
c_b2Body.prototype.p_ApplyForce=function(t_force,t_point){
	if(this.m_m_type!=2){
		return;
	}
	if(this.p_IsAwake()==false){
		this.p_SetAwake(true);
	}
	this.m_m_force.m_x+=t_force.m_x;
	this.m_m_force.m_y+=t_force.m_y;
	this.m_m_torque+=(t_point.m_x-this.m_m_sweep.m_c.m_x)*t_force.m_y-(t_point.m_y-this.m_m_sweep.m_c.m_y)*t_force.m_x;
}
c_b2Body.prototype.p_GetAngle=function(){
	return this.m_m_sweep.m_a;
}
c_b2Body.prototype.p_GetAngularVelocity=function(){
	return this.m_m_angularVelocity;
}
c_b2Body.prototype.p_GetInertia=function(){
	return this.m_m_I;
}
c_b2Body.prototype.p_ApplyTorque=function(t_torque){
	if(this.m_m_type!=2){
		return;
	}
	if(this.p_IsAwake()==false){
		this.p_SetAwake(true);
	}
	this.m_m_torque+=t_torque;
}
c_b2Body.prototype.p_SetLinearVelocity=function(t_v){
	if(this.m_m_type==0){
		return;
	}
	this.m_m_linearVelocity.p_SetV(t_v);
}
c_b2Body.prototype.p_ApplyImpulse=function(t_impulse,t_point){
	if(this.m_m_type!=2){
		return;
	}
	if(this.p_IsAwake()==false){
		this.p_SetAwake(true);
	}
	this.m_m_linearVelocity.m_x+=this.m_m_invMass*t_impulse.m_x;
	this.m_m_linearVelocity.m_y+=this.m_m_invMass*t_impulse.m_y;
	this.m_m_angularVelocity+=this.m_m_invI*((t_point.m_x-this.m_m_sweep.m_c.m_x)*t_impulse.m_y-(t_point.m_y-this.m_m_sweep.m_c.m_y)*t_impulse.m_x);
}
c_b2Body.prototype.p_GetLocalCenter=function(){
	return this.m_m_sweep.m_localCenter;
}
c_b2Body.prototype.p_SetBullet=function(t_flag){
	if(t_flag){
		this.m_m_flags|=8;
	}else{
		this.m_m_flags&=-9;
	}
}
function c_b2Contact(){
	Object.call(this);
	this.m_m_flags=0;
	this.m_m_fixtureA=null;
	this.m_m_fixtureB=null;
	this.m_m_next=null;
	this.m_m_prev=null;
	this.m_m_nodeA=c_b2ContactEdge.m_new.call(new c_b2ContactEdge);
	this.m_m_nodeB=c_b2ContactEdge.m_new.call(new c_b2ContactEdge);
	this.m_m_manifold=c_b2Manifold.m_new.call(new c_b2Manifold);
	this.m_m_swapped=false;
	this.m_m_oldManifold=c_b2Manifold.m_new.call(new c_b2Manifold);
	this.m_m_toi=.0;
}
c_b2Contact.prototype.p_FlagForFiltering=function(){
	this.m_m_flags|=64;
}
c_b2Contact.prototype.p_GetFixtureA=function(){
	return this.m_m_fixtureA;
}
c_b2Contact.prototype.p_GetFixtureB=function(){
	return this.m_m_fixtureB;
}
c_b2Contact.prototype.p_GetNext=function(){
	return this.m_m_next;
}
c_b2Contact.prototype.p_IsTouching=function(){
	return (this.m_m_flags&16)==16;
}
c_b2Contact.prototype.p_Evaluate=function(){
}
c_b2Contact.prototype.p_Update=function(t_listener){
	var t_tManifold=this.m_m_oldManifold;
	this.m_m_oldManifold=this.m_m_manifold;
	this.m_m_manifold=t_tManifold;
	this.m_m_flags|=32;
	var t_touching=false;
	var t_wasTouching=(this.m_m_flags&16)==16;
	var t_bodyA=this.m_m_fixtureA.m_m_body;
	var t_bodyB=this.m_m_fixtureB.m_m_body;
	var t_aabbOverlap=this.m_m_fixtureA.m_m_aabb.p_TestOverlap(this.m_m_fixtureB.m_m_aabb);
	if((this.m_m_flags&1)!=0){
		if(t_aabbOverlap){
			var t_shapeA=this.m_m_fixtureA.p_GetShape();
			var t_shapeB=this.m_m_fixtureB.p_GetShape();
			var t_xfA=t_bodyA.p_GetTransform();
			var t_xfB=t_bodyB.p_GetTransform();
			t_touching=c_b2Shape.m_TestOverlap(t_shapeA,t_xfA,t_shapeB,t_xfB);
		}
		this.m_m_manifold.m_m_pointCount=0;
	}else{
		if(t_bodyA.p_GetType()!=2 || t_bodyA.p_IsBullet() || t_bodyB.p_GetType()!=2 || t_bodyB.p_IsBullet()){
			this.m_m_flags|=2;
		}else{
			this.m_m_flags&=-3;
		}
		if(t_aabbOverlap){
			this.p_Evaluate();
			t_touching=this.m_m_manifold.m_m_pointCount>0;
			for(var t_i=0;t_i<this.m_m_manifold.m_m_pointCount;t_i=t_i+1){
				var t_mp2=this.m_m_manifold.m_m_points[t_i];
				t_mp2.m_m_normalImpulse=0.0;
				t_mp2.m_m_tangentImpulse=0.0;
				var t_id2=t_mp2.m_m_id;
				for(var t_j=0;t_j<this.m_m_oldManifold.m_m_pointCount;t_j=t_j+1){
					var t_mp1=this.m_m_oldManifold.m_m_points[t_j];
					if(t_mp1.m_m_id.p_Key()==t_id2.p_Key()){
						t_mp2.m_m_normalImpulse=t_mp1.m_m_normalImpulse;
						t_mp2.m_m_tangentImpulse=t_mp1.m_m_tangentImpulse;
						break;
					}
				}
			}
		}else{
			this.m_m_manifold.m_m_pointCount=0;
		}
		if(t_touching!=t_wasTouching){
			t_bodyA.p_SetAwake(true);
			t_bodyB.p_SetAwake(true);
		}
	}
	if(t_touching){
		this.m_m_flags|=16;
	}else{
		this.m_m_flags&=-17;
	}
	if(t_wasTouching==false && t_touching==true){
		t_listener.p_BeginContact(this);
	}
	if(t_wasTouching==true && t_touching==false){
		t_listener.p_EndContact(this);
	}
	if((this.m_m_flags&1)==0){
		t_listener.p_PreSolve(this,this.m_m_oldManifold);
	}
}
c_b2Contact.prototype.p_GetManifold=function(){
	return this.m_m_manifold;
}
c_b2Contact.m_s_input=null;
c_b2Contact.prototype.p_ComputeTOI=function(t_sweepA,t_sweepB){
	c_b2Contact.m_s_input.m_proxyA.p_Set5(this.m_m_fixtureA.p_GetShape());
	c_b2Contact.m_s_input.m_proxyB.p_Set5(this.m_m_fixtureB.p_GetShape());
	c_b2Contact.m_s_input.m_sweepA=t_sweepA;
	c_b2Contact.m_s_input.m_sweepB=t_sweepB;
	c_b2Contact.m_s_input.m_tolerance=0.005;
	return c_b2TimeOfImpact.m_TimeOfImpact(c_b2Contact.m_s_input);
}
c_b2Contact.prototype.p_Reset=function(t_fixtureA,t_fixtureB){
	this.m_m_flags=32;
	if(!((t_fixtureA)!=null) || !((t_fixtureB)!=null)){
		this.m_m_fixtureA=null;
		this.m_m_fixtureB=null;
		return;
	}
	if(t_fixtureA.p_IsSensor() || t_fixtureB.p_IsSensor()){
		this.m_m_flags|=1;
	}
	var t_bodyA=t_fixtureA.p_GetBody();
	var t_bodyB=t_fixtureB.p_GetBody();
	if(t_bodyA.p_GetType()!=2 || t_bodyA.p_IsBullet() || t_bodyB.p_GetType()!=2 || t_bodyB.p_IsBullet()){
		this.m_m_flags|=2;
	}
	this.m_m_fixtureA=t_fixtureA;
	this.m_m_fixtureB=t_fixtureB;
	this.m_m_manifold.m_m_pointCount=0;
	this.m_m_prev=null;
	this.m_m_next=null;
	this.m_m_nodeA.m_contact=null;
	this.m_m_nodeA.m_prevItem=null;
	this.m_m_nodeA.m_nextItem=null;
	this.m_m_nodeA.m_other=null;
	this.m_m_nodeB.m_contact=null;
	this.m_m_nodeB.m_prevItem=null;
	this.m_m_nodeB.m_nextItem=null;
	this.m_m_nodeB.m_other=null;
}
c_b2Contact.m_new=function(){
	return this;
}
function c_b2Joint(){
	Object.call(this);
	this.m_m_type=0;
	this.m_m_prev=null;
	this.m_m_next=null;
	this.m_m_bodyA=null;
	this.m_m_bodyB=null;
	this.m_m_collideConnected=false;
	this.m_m_islandFlag=false;
	this.m_m_userData=null;
	this.m_m_edgeA=c_b2JointEdge.m_new.call(new c_b2JointEdge);
	this.m_m_edgeB=c_b2JointEdge.m_new.call(new c_b2JointEdge);
	this.m_m_localCenterA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localCenterB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_invMassA=.0;
	this.m_m_invMassB=.0;
	this.m_m_invIA=.0;
	this.m_m_invIB=.0;
}
c_b2Joint.m_new=function(t_def){
	this.m_m_type=t_def.m_type;
	this.m_m_prev=null;
	this.m_m_next=null;
	this.m_m_bodyA=t_def.m_bodyA;
	this.m_m_bodyB=t_def.m_bodyB;
	this.m_m_collideConnected=t_def.m_collideConnected;
	this.m_m_islandFlag=false;
	this.m_m_userData=t_def.m_userData;
	return this;
}
c_b2Joint.m_new2=function(){
	return this;
}
c_b2Joint.prototype.p_GetBodyA=function(){
	return this.m_m_bodyA;
}
c_b2Joint.prototype.p_GetBodyB=function(){
	return this.m_m_bodyB;
}
c_b2Joint.m_Create=function(t_def,t_allocator){
	var t_joint=null;
	var t_1=t_def.m_type;
	if(t_1==3){
		t_joint=(c_b2DistanceJoint.m_new.call(new c_b2DistanceJoint,object_downcast((t_def),c_b2DistanceJointDef)));
	}else{
		if(t_1==5){
			t_joint=(c_b2MouseJoint.m_new.call(new c_b2MouseJoint,object_downcast((t_def),c_b2MouseJointDef)));
		}else{
			if(t_1==2){
				t_joint=(c_b2PrismaticJoint.m_new.call(new c_b2PrismaticJoint,object_downcast((t_def),c_b2PrismaticJointDef)));
			}else{
				if(t_1==1){
					t_joint=(c_b2RevoluteJoint.m_new.call(new c_b2RevoluteJoint,object_downcast((t_def),c_b2RevoluteJointDef)));
				}else{
					if(t_1==4){
						t_joint=(c_b2PulleyJoint.m_new.call(new c_b2PulleyJoint,object_downcast((t_def),c_b2PulleyJointDef)));
					}else{
						if(t_1==6){
							t_joint=(c_b2GearJoint.m_new.call(new c_b2GearJoint,object_downcast((t_def),c_b2GearJointDef)));
						}else{
							if(t_1==7){
								t_joint=(c_b2LineJoint.m_new.call(new c_b2LineJoint,object_downcast((t_def),c_b2LineJointDef)));
							}else{
								if(t_1==8){
									t_joint=(c_b2WeldJoint.m_new.call(new c_b2WeldJoint,object_downcast((t_def),c_b2WeldJointDef)));
								}else{
									if(t_1==9){
										t_joint=(c_b2FrictionJoint.m_new.call(new c_b2FrictionJoint,object_downcast((t_def),c_b2FrictionJointDef)));
									}else{
										if(t_1==10){
											t_joint=(c_b2RopeJoint.m_new.call(new c_b2RopeJoint,object_downcast((t_def),c_b2RopeJointDef)));
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return t_joint;
}
c_b2Joint.prototype.p_InitVelocityConstraints=function(t_timeStep){
}
c_b2Joint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
}
c_b2Joint.prototype.p_FinalizeVelocityConstraints=function(){
}
c_b2Joint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	return false;
}
c_b2Joint.m_Destroy=function(t_joint,t_allocator){
}
function c_b2Controller(){
	Object.call(this);
	this.m_m_next=null;
}
c_b2Controller.prototype.p_TimeStep2=function(t_timeStep){
}
function c_b2ContactManager(){
	Object.call(this);
	this.m_m_world=null;
	this.m_m_contactCount=0;
	this.m_m_contactFilter=null;
	this.m_m_contactListener=null;
	this.m_m_allocator=null;
	this.m_m_contactFactory=null;
	this.m_m_broadPhase=null;
	this.m_pairsCallback=null;
}
c_b2ContactManager.m_new=function(){
	this.m_m_world=null;
	this.m_m_contactCount=0;
	this.m_m_contactFilter=c_b2ContactFilter.m_b2_defaultFilter;
	this.m_m_contactListener=c_b2ContactListener.m_b2_defaultListener;
	this.m_m_contactFactory=c_b2ContactFactory.m_new.call(new c_b2ContactFactory,this.m_m_allocator);
	this.m_m_broadPhase=(c_b2DynamicTreeBroadPhase.m_new.call(new c_b2DynamicTreeBroadPhase));
	this.m_pairsCallback=(c_CMUpdatePairsCallback.m_new.call(new c_CMUpdatePairsCallback,this));
	return this;
}
c_b2ContactManager.prototype.p_FindNewContacts=function(){
	this.m_m_broadPhase.p_UpdatePairs(this.m_pairsCallback);
}
c_b2ContactManager.prototype.p_Destroy=function(t_c){
	var t_fixtureA=t_c.p_GetFixtureA();
	var t_fixtureB=t_c.p_GetFixtureB();
	var t_bodyA=t_fixtureA.p_GetBody();
	var t_bodyB=t_fixtureB.p_GetBody();
	if(t_c.p_IsTouching()){
		this.m_m_contactListener.p_EndContact(t_c);
	}
	if((t_c.m_m_prev)!=null){
		t_c.m_m_prev.m_m_next=t_c.m_m_next;
	}
	if((t_c.m_m_next)!=null){
		t_c.m_m_next.m_m_prev=t_c.m_m_prev;
	}
	if(t_c==this.m_m_world.m_m_contactList){
		this.m_m_world.m_m_contactList=t_c.m_m_next;
	}
	if((t_c.m_m_nodeA.m_prevItem)!=null){
		t_c.m_m_nodeA.m_prevItem.m_nextItem=t_c.m_m_nodeA.m_nextItem;
	}
	if((t_c.m_m_nodeA.m_nextItem)!=null){
		t_c.m_m_nodeA.m_nextItem.m_prevItem=t_c.m_m_nodeA.m_prevItem;
	}
	if(t_c.m_m_nodeA==t_bodyA.m_m_contactList){
		t_bodyA.m_m_contactList=t_c.m_m_nodeA.m_nextItem;
	}
	if((t_c.m_m_nodeB.m_prevItem)!=null){
		t_c.m_m_nodeB.m_prevItem.m_nextItem=t_c.m_m_nodeB.m_nextItem;
	}
	if((t_c.m_m_nodeB.m_nextItem)!=null){
		t_c.m_m_nodeB.m_nextItem.m_prevItem=t_c.m_m_nodeB.m_prevItem;
	}
	if(t_c.m_m_nodeB==t_bodyB.m_m_contactList){
		t_bodyB.m_m_contactList=t_c.m_m_nodeB.m_nextItem;
	}
	this.m_m_contactFactory.p_Destroy(t_c);
	this.m_m_world.m_m_contactCount-=1;
}
c_b2ContactManager.prototype.p_Collide=function(){
	var t_c=this.m_m_world.m_m_contactList;
	while(t_c!=null){
		var t_fixtureA=t_c.p_GetFixtureA();
		var t_fixtureB=t_c.p_GetFixtureB();
		var t_bodyA=t_fixtureA.p_GetBody();
		var t_bodyB=t_fixtureB.p_GetBody();
		var t_cNuke=null;
		if(t_bodyA.p_IsAwake()==false && t_bodyB.p_IsAwake()==false){
			t_c=t_c.p_GetNext();
			continue;
		}
		if((t_c.m_m_flags&64)!=0){
			if(t_bodyB.p_ShouldCollide(t_bodyA)==false){
				t_cNuke=t_c;
				t_c=t_cNuke.p_GetNext();
				this.p_Destroy(t_cNuke);
				continue;
			}
			if(this.m_m_contactFilter.p_ShouldCollide2(t_fixtureA,t_fixtureB)==false){
				t_cNuke=t_c;
				t_c=t_cNuke.p_GetNext();
				this.p_Destroy(t_cNuke);
				continue;
			}
			t_c.m_m_flags&=-65;
		}
		var t_proxyA=t_fixtureA.m_m_proxy;
		var t_proxyB=t_fixtureB.m_m_proxy;
		var t_overlap=this.m_m_broadPhase.p_TestOverlap2(t_proxyA,t_proxyB);
		if(t_overlap==false){
			t_cNuke=t_c;
			t_c=t_cNuke.p_GetNext();
			this.p_Destroy(t_cNuke);
			continue;
		}
		t_c.p_Update(this.m_m_contactListener);
		t_c=t_c.p_GetNext();
	}
}
c_b2ContactManager.prototype.p_AddPair=function(t_proxyUserDataA,t_proxyUserDataB){
	var t_fixtureA=object_downcast((t_proxyUserDataA),c_b2Fixture);
	var t_fixtureB=object_downcast((t_proxyUserDataB),c_b2Fixture);
	var t_bodyA=t_fixtureA.p_GetBody();
	var t_bodyB=t_fixtureB.p_GetBody();
	if(t_bodyA==t_bodyB){
		return;
	}
	var t_edge=t_bodyB.p_GetContactList();
	while((t_edge)!=null){
		if(t_edge.m_other==t_bodyA){
			var t_fA=t_edge.m_contact.p_GetFixtureA();
			var t_fB=t_edge.m_contact.p_GetFixtureB();
			if(t_fA==t_fixtureA && t_fB==t_fixtureB || t_fA==t_fixtureB && t_fB==t_fixtureA){
				return;
			}
		}
		t_edge=t_edge.m_nextItem;
	}
	if(t_bodyB.p_ShouldCollide(t_bodyA)==false){
		return;
	}
	if(this.m_m_contactFilter.p_ShouldCollide2(t_fixtureA,t_fixtureB)==false){
		return;
	}
	var t_c=this.m_m_contactFactory.p_Create(t_fixtureA,t_fixtureB);
	t_fixtureA=t_c.p_GetFixtureA();
	t_fixtureB=t_c.p_GetFixtureB();
	t_bodyA=t_fixtureA.m_m_body;
	t_bodyB=t_fixtureB.m_m_body;
	t_c.m_m_prev=null;
	t_c.m_m_next=this.m_m_world.m_m_contactList;
	if(this.m_m_world.m_m_contactList!=null){
		this.m_m_world.m_m_contactList.m_m_prev=t_c;
	}
	this.m_m_world.m_m_contactList=t_c;
	t_c.m_m_nodeA.m_contact=t_c;
	t_c.m_m_nodeA.m_other=t_bodyB;
	t_c.m_m_nodeA.m_prevItem=null;
	t_c.m_m_nodeA.m_nextItem=t_bodyA.m_m_contactList;
	if(t_bodyA.m_m_contactList!=null){
		t_bodyA.m_m_contactList.m_prevItem=t_c.m_m_nodeA;
	}
	t_bodyA.m_m_contactList=t_c.m_m_nodeA;
	t_c.m_m_nodeB.m_contact=t_c;
	t_c.m_m_nodeB.m_other=t_bodyA;
	t_c.m_m_nodeB.m_prevItem=null;
	t_c.m_m_nodeB.m_nextItem=t_bodyB.m_m_contactList;
	if(t_bodyB.m_m_contactList!=null){
		t_bodyB.m_m_contactList.m_prevItem=t_c.m_m_nodeB;
	}
	t_bodyB.m_m_contactList=t_c.m_m_nodeB;
	this.m_m_world.m_m_contactCount+=1;
	return;
}
function c_b2ContactFilter(){
	Object.call(this);
}
c_b2ContactFilter.m_new=function(){
	return this;
}
c_b2ContactFilter.m_b2_defaultFilter=null;
c_b2ContactFilter.prototype.p_ShouldCollide2=function(t_fixtureA,t_fixtureB){
	var t_filter1=t_fixtureA.p_GetFilterData();
	var t_filter2=t_fixtureB.p_GetFilterData();
	if(t_filter1.m_groupIndex==t_filter2.m_groupIndex && t_filter1.m_groupIndex!=0){
		return t_filter1.m_groupIndex>0;
	}
	var t_collide=(t_filter1.m_maskBits&t_filter2.m_categoryBits)!=0 && (t_filter1.m_categoryBits&t_filter2.m_maskBits)!=0;
	return t_collide;
}
function c_b2ContactListener(){
	Object.call(this);
	this.implments={c_b2ContactListenerInterface:1};
}
c_b2ContactListener.m_new=function(){
	return this;
}
c_b2ContactListener.m_b2_defaultListener=null;
c_b2ContactListener.prototype.p_BeginContact=function(t_contact){
}
c_b2ContactListener.prototype.p_EndContact=function(t_contact){
}
c_b2ContactListener.prototype.p_PreSolve=function(t_contact,t_oldManifold){
}
c_b2ContactListener.prototype.p_PostSolve=function(t_contact,t_impulse){
}
function c_b2ContactFactory(){
	Object.call(this);
	this.m_m_allocator=null;
	this.m_m_registers=null;
}
c_b2ContactFactory.prototype.p_AddType=function(t_contactTypeFactory,t_type1,t_type2){
	this.m_m_registers.p_Get(t_type1).p_Get(t_type2).m_contactTypeFactory=t_contactTypeFactory;
	this.m_m_registers.p_Get(t_type1).p_Get(t_type2).m_primary=true;
	if(t_type1!=t_type2){
		this.m_m_registers.p_Get(t_type2).p_Get(t_type1).m_contactTypeFactory=t_contactTypeFactory;
		this.m_m_registers.p_Get(t_type2).p_Get(t_type1).m_primary=false;
	}
}
c_b2ContactFactory.prototype.p_InitializeRegisters=function(){
	this.m_m_registers=c_FlashArray2.m_new.call(new c_FlashArray2,3);
	for(var t_i=0;t_i<3;t_i=t_i+1){
		this.m_m_registers.p_Set4(t_i,c_FlashArray.m_new.call(new c_FlashArray,3));
		for(var t_j=0;t_j<3;t_j=t_j+1){
			this.m_m_registers.p_Get(t_i).p_Set3(t_j,c_b2ContactRegister.m_new.call(new c_b2ContactRegister));
		}
	}
	this.p_AddType((c_CircleContactTypeFactory.m_new.call(new c_CircleContactTypeFactory)),0,0);
	this.p_AddType((c_PolyAndCircleContactTypeFactory.m_new.call(new c_PolyAndCircleContactTypeFactory)),1,0);
	this.p_AddType((c_PolygonContactTypeFactory.m_new.call(new c_PolygonContactTypeFactory)),1,1);
	this.p_AddType((c_EdgeAndCircleContactTypeFactory.m_new.call(new c_EdgeAndCircleContactTypeFactory)),2,0);
	this.p_AddType((c_PolyAndEdgeContactTypeFactory.m_new.call(new c_PolyAndEdgeContactTypeFactory)),1,2);
}
c_b2ContactFactory.m_new=function(t_allocator){
	this.m_m_allocator=t_allocator;
	this.p_InitializeRegisters();
	return this;
}
c_b2ContactFactory.m_new2=function(){
	return this;
}
c_b2ContactFactory.prototype.p_Destroy=function(t_contact){
	if(t_contact.m_m_manifold.m_m_pointCount>0){
		t_contact.m_m_fixtureA.m_m_body.p_SetAwake(true);
		t_contact.m_m_fixtureB.m_m_body.p_SetAwake(true);
	}
	var t_type1=t_contact.m_m_fixtureA.p_GetType();
	var t_type2=t_contact.m_m_fixtureB.p_GetType();
	var t_reg=null;
	if(t_contact.m_m_swapped){
		t_reg=this.m_m_registers.p_Get(t_type2).p_Get(t_type1);
	}else{
		t_reg=this.m_m_registers.p_Get(t_type1).p_Get(t_type2);
	}
	if(true){
		t_reg.m_poolCount+=1;
		t_contact.m_m_next=t_reg.m_pool;
		t_reg.m_pool=t_contact;
	}
	var t_contactTypeFactory=t_reg.m_contactTypeFactory;
	t_contactTypeFactory.p_Destroy2(t_contact,this.m_m_allocator);
}
c_b2ContactFactory.prototype.p_Create=function(t_fixtureA,t_fixtureB){
	var t_type1=t_fixtureA.p_GetType();
	var t_type2=t_fixtureB.p_GetType();
	var t_reg=this.m_m_registers.p_Get(t_type1).p_Get(t_type2);
	var t_c=null;
	if((t_reg.m_pool)!=null){
		t_c=t_reg.m_pool;
		t_reg.m_pool=t_c.m_m_next;
		t_reg.m_poolCount-=1;
		if(t_c.m_m_swapped){
			t_c.p_Reset(t_fixtureB,t_fixtureA);
		}else{
			t_c.p_Reset(t_fixtureA,t_fixtureB);
		}
		return t_c;
	}
	var t_contactTypeFactory=t_reg.m_contactTypeFactory;
	if(t_contactTypeFactory!=null){
		if(t_reg.m_primary){
			t_c=t_contactTypeFactory.p_Create2(this.m_m_allocator);
			t_c.p_Reset(t_fixtureA,t_fixtureB);
			t_c.m_m_swapped=false;
			return t_c;
		}else{
			t_c=t_contactTypeFactory.p_Create2(this.m_m_allocator);
			t_c.p_Reset(t_fixtureB,t_fixtureA);
			t_c.m_m_swapped=true;
			return t_c;
		}
	}else{
		return null;
	}
}
function c_b2ContactRegister(){
	Object.call(this);
	this.m_contactTypeFactory=null;
	this.m_primary=false;
	this.m_poolCount=0;
	this.m_pool=null;
}
c_b2ContactRegister.m_new=function(){
	return this;
}
function c_FlashArray(){
	Object.call(this);
	this.m_length=0;
	this.m_arrLength=100;
	this.m_arr=new_object_array(100);
}
c_FlashArray.prototype.p_Length=function(){
	return this.m_length;
}
c_FlashArray.prototype.p_Length2=function(t_value){
	this.m_length=t_value;
	if(this.m_length>this.m_arrLength){
		this.m_arrLength=this.m_length;
		this.m_arr=resize_object_array(this.m_arr,this.m_length);
	}
}
c_FlashArray.m_new=function(t_length){
	this.p_Length2(t_length);
	return this;
}
c_FlashArray.m_new2=function(t_vals){
	this.m_arr=t_vals;
	this.m_arrLength=this.m_arr.length;
	this.m_length=this.m_arrLength;
	return this;
}
c_FlashArray.m_new3=function(){
	return this;
}
c_FlashArray.prototype.p_Set3=function(t_index,t_item){
	if(t_index>=this.m_arrLength){
		this.m_arrLength=t_index+100;
		this.m_arr=resize_object_array(this.m_arr,this.m_arrLength);
	}
	this.m_arr[t_index]=t_item;
	if(t_index>=this.m_length){
		this.m_length=t_index+1;
	}
}
c_FlashArray.prototype.p_Get=function(t_index){
	if(t_index>=0 && this.m_length>t_index){
		return this.m_arr[t_index];
	}else{
		return null;
	}
}
function c_FlashArray2(){
	Object.call(this);
	this.m_length=0;
	this.m_arrLength=100;
	this.m_arr=new_object_array(100);
}
c_FlashArray2.prototype.p_Length=function(){
	return this.m_length;
}
c_FlashArray2.prototype.p_Length2=function(t_value){
	this.m_length=t_value;
	if(this.m_length>this.m_arrLength){
		this.m_arrLength=this.m_length;
		this.m_arr=resize_object_array(this.m_arr,this.m_length);
	}
}
c_FlashArray2.m_new=function(t_length){
	this.p_Length2(t_length);
	return this;
}
c_FlashArray2.m_new2=function(t_vals){
	this.m_arr=t_vals;
	this.m_arrLength=this.m_arr.length;
	this.m_length=this.m_arrLength;
	return this;
}
c_FlashArray2.m_new3=function(){
	return this;
}
c_FlashArray2.prototype.p_Set4=function(t_index,t_item){
	if(t_index>=this.m_arrLength){
		this.m_arrLength=t_index+100;
		this.m_arr=resize_object_array(this.m_arr,this.m_arrLength);
	}
	this.m_arr[t_index]=t_item;
	if(t_index>=this.m_length){
		this.m_length=t_index+1;
	}
}
c_FlashArray2.prototype.p_Get=function(t_index){
	if(t_index>=0 && this.m_length>t_index){
		return this.m_arr[t_index];
	}else{
		return null;
	}
}
function c_b2Shape(){
	Object.call(this);
	this.m_m_type=0;
	this.m_m_radius=.0;
}
c_b2Shape.m_new=function(){
	this.m_m_type=-1;
	this.m_m_radius=0.005;
	return this;
}
c_b2Shape.prototype.p_Copy=function(){
	return null;
}
c_b2Shape.prototype.p_ComputeAABB=function(t_aabb,t_xf){
}
c_b2Shape.prototype.p_ComputeMass=function(t_massData,t_density){
}
c_b2Shape.prototype.p_GetType=function(){
	return this.m_m_type;
}
c_b2Shape.m_TestOverlap=function(t_shape1,t_transform1,t_shape2,t_transform2){
	var t_input=c_b2DistanceInput.m_new.call(new c_b2DistanceInput);
	t_input.m_proxyA=c_b2DistanceProxy.m_new.call(new c_b2DistanceProxy);
	t_input.m_proxyA.p_Set5(t_shape1);
	t_input.m_proxyB=c_b2DistanceProxy.m_new.call(new c_b2DistanceProxy);
	t_input.m_proxyB.p_Set5(t_shape2);
	t_input.m_transformA=t_transform1;
	t_input.m_transformB=t_transform2;
	t_input.m_useRadii=true;
	var t_simplexCache=c_b2SimplexCache.m_new.call(new c_b2SimplexCache);
	t_simplexCache.m_count=0;
	var t_output=c_b2DistanceOutput.m_new.call(new c_b2DistanceOutput);
	c_b2Distance.m_Distance(t_output,t_simplexCache,t_input);
	return t_output.m_distance<1.0000000000000002e-014;
}
c_b2Shape.prototype.p_Set5=function(t_other){
	this.m_m_radius=t_other.m_m_radius;
}
function c_ContactTypeFactory(){
	Object.call(this);
}
c_ContactTypeFactory.m_new=function(){
	return this;
}
c_ContactTypeFactory.prototype.p_Destroy2=function(t_contact,t_allocator){
}
c_ContactTypeFactory.prototype.p_Create2=function(t_allocator){
}
function c_CircleContactTypeFactory(){
	c_ContactTypeFactory.call(this);
}
c_CircleContactTypeFactory.prototype=extend_class(c_ContactTypeFactory);
c_CircleContactTypeFactory.m_new=function(){
	c_ContactTypeFactory.m_new.call(this);
	return this;
}
c_CircleContactTypeFactory.prototype.p_Destroy2=function(t_contact,t_allocator){
}
c_CircleContactTypeFactory.prototype.p_Create2=function(t_allocator){
	return (c_b2CircleContact.m_new.call(new c_b2CircleContact));
}
function c_PolyAndCircleContactTypeFactory(){
	c_ContactTypeFactory.call(this);
}
c_PolyAndCircleContactTypeFactory.prototype=extend_class(c_ContactTypeFactory);
c_PolyAndCircleContactTypeFactory.m_new=function(){
	c_ContactTypeFactory.m_new.call(this);
	return this;
}
c_PolyAndCircleContactTypeFactory.prototype.p_Destroy2=function(t_contact,t_allocator){
}
c_PolyAndCircleContactTypeFactory.prototype.p_Create2=function(t_allocator){
	return (c_b2PolyAndCircleContact.m_new.call(new c_b2PolyAndCircleContact));
}
function c_PolygonContactTypeFactory(){
	c_ContactTypeFactory.call(this);
}
c_PolygonContactTypeFactory.prototype=extend_class(c_ContactTypeFactory);
c_PolygonContactTypeFactory.m_new=function(){
	c_ContactTypeFactory.m_new.call(this);
	return this;
}
c_PolygonContactTypeFactory.prototype.p_Destroy2=function(t_contact,t_allocator){
}
c_PolygonContactTypeFactory.prototype.p_Create2=function(t_allocator){
	return (c_b2PolygonContact.m_new.call(new c_b2PolygonContact));
}
function c_EdgeAndCircleContactTypeFactory(){
	c_ContactTypeFactory.call(this);
}
c_EdgeAndCircleContactTypeFactory.prototype=extend_class(c_ContactTypeFactory);
c_EdgeAndCircleContactTypeFactory.m_new=function(){
	c_ContactTypeFactory.m_new.call(this);
	return this;
}
c_EdgeAndCircleContactTypeFactory.prototype.p_Destroy2=function(t_contact,t_allocator){
}
c_EdgeAndCircleContactTypeFactory.prototype.p_Create2=function(t_allocator){
	return (c_b2EdgeAndCircleContact.m_new.call(new c_b2EdgeAndCircleContact));
}
function c_PolyAndEdgeContactTypeFactory(){
	c_ContactTypeFactory.call(this);
}
c_PolyAndEdgeContactTypeFactory.prototype=extend_class(c_ContactTypeFactory);
c_PolyAndEdgeContactTypeFactory.m_new=function(){
	c_ContactTypeFactory.m_new.call(this);
	return this;
}
c_PolyAndEdgeContactTypeFactory.prototype.p_Destroy2=function(t_contact,t_allocator){
}
c_PolyAndEdgeContactTypeFactory.prototype.p_Create2=function(t_allocator){
	return (c_b2PolyAndEdgeContact.m_new.call(new c_b2PolyAndEdgeContact));
}
function c_IBroadPhase(){
	Object.call(this);
}
c_IBroadPhase.m_new=function(){
	return this;
}
c_IBroadPhase.prototype.p_CreateProxy=function(t_aabb,t_userData){
}
c_IBroadPhase.prototype.p_UpdatePairs=function(t_callback){
}
c_IBroadPhase.prototype.p_TestOverlap2=function(t_proxyA,t_proxyB){
}
c_IBroadPhase.prototype.p_MoveProxy=function(t_proxy,t_aabb,t_displacement){
}
function c_b2DynamicTreeBroadPhase(){
	c_IBroadPhase.call(this);
	this.m_m_tree=c_b2DynamicTree.m_new.call(new c_b2DynamicTree);
	this.m_m_proxyCount=0;
	this.m_m_moveBuffer=c_FlashArray3.m_new3.call(new c_FlashArray3);
	this.m_dtQueryCallBack=c_DTQueryCallback.m_new.call(new c_DTQueryCallback);
}
c_b2DynamicTreeBroadPhase.prototype=extend_class(c_IBroadPhase);
c_b2DynamicTreeBroadPhase.m_new=function(){
	c_IBroadPhase.m_new.call(this);
	return this;
}
c_b2DynamicTreeBroadPhase.prototype.p_BufferMove=function(t_proxy){
	this.m_m_moveBuffer.p_Set14(this.m_m_moveBuffer.p_Length(),t_proxy);
}
c_b2DynamicTreeBroadPhase.prototype.p_CreateProxy=function(t_aabb,t_userData){
	var t_proxy=this.m_m_tree.p_CreateProxy(t_aabb,t_userData);
	this.m_m_proxyCount+=1;
	this.p_BufferMove(t_proxy);
	return (t_proxy);
}
c_b2DynamicTreeBroadPhase.prototype.p_MoveProxy=function(t_proxy,t_aabb,t_displacement){
	var t_buffer=this.m_m_tree.p_MoveProxy2(object_downcast((t_proxy),c_b2DynamicTreeNode),t_aabb,t_displacement);
	if(t_buffer){
		this.p_BufferMove(object_downcast((t_proxy),c_b2DynamicTreeNode));
	}
}
c_b2DynamicTreeBroadPhase.prototype.p_TestOverlap2=function(t_proxyA,t_proxyB){
	var t_aabbA=this.m_m_tree.p_GetFatAABB(object_downcast((t_proxyA),c_b2DynamicTreeNode));
	var t_aabbB=this.m_m_tree.p_GetFatAABB(object_downcast((t_proxyB),c_b2DynamicTreeNode));
	return t_aabbA.p_TestOverlap(t_aabbB);
}
c_b2DynamicTreeBroadPhase.prototype.p_UpdatePairs=function(t_callback){
	this.m_dtQueryCallBack.m_m_pairCount=0;
	var t_nodes=this.m_m_moveBuffer.p_BackingArray();
	for(var t_i=0;t_i<this.m_m_moveBuffer.p_Length();t_i=t_i+1){
		var t_queryProxy=t_nodes[t_i];
		var t_fatAABB=this.m_m_tree.p_GetFatAABB(t_queryProxy);
		this.m_dtQueryCallBack.m_queryProxy=t_queryProxy;
		this.m_m_tree.p_Query((this.m_dtQueryCallBack),t_fatAABB);
	}
	this.m_m_moveBuffer.p_Length2(0);
	var t_i2=0;
	while(t_i2<this.m_dtQueryCallBack.m_m_pairCount){
		var t_primaryPair=this.m_dtQueryCallBack.m_m_pairBuffer.p_Get(t_i2);
		var t_userDataA=this.m_m_tree.p_GetUserData(t_primaryPair.m_proxyA);
		var t_userDataB=this.m_m_tree.p_GetUserData(t_primaryPair.m_proxyB);
		t_callback.p_Callback(t_userDataA,t_userDataB);
		t_i2+=1;
		while(t_i2<this.m_dtQueryCallBack.m_m_pairCount){
			var t_pair=this.m_dtQueryCallBack.m_m_pairBuffer.p_Get(t_i2);
			if(t_pair.m_proxyA!=t_primaryPair.m_proxyA || t_pair.m_proxyB!=t_primaryPair.m_proxyB){
				break;
			}
			t_i2+=1;
		}
	}
}
function c_UpdatePairsCallback(){
	Object.call(this);
}
c_UpdatePairsCallback.m_new=function(){
	return this;
}
c_UpdatePairsCallback.prototype.p_Callback=function(t_a,t_b){
}
function c_CMUpdatePairsCallback(){
	c_UpdatePairsCallback.call(this);
	this.m_cm=null;
}
c_CMUpdatePairsCallback.prototype=extend_class(c_UpdatePairsCallback);
c_CMUpdatePairsCallback.m_new=function(t_cm){
	c_UpdatePairsCallback.m_new.call(this);
	this.m_cm=t_cm;
	return this;
}
c_CMUpdatePairsCallback.m_new2=function(){
	c_UpdatePairsCallback.m_new.call(this);
	return this;
}
c_CMUpdatePairsCallback.prototype.p_Callback=function(t_a,t_b){
	this.m_cm.p_AddPair(t_a,t_b);
}
function c_b2BodyDef(){
	Object.call(this);
	this.m_userData=null;
	this.m_position=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_angle=.0;
	this.m_linearVelocity=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_angularVelocity=.0;
	this.m_linearDamping=.0;
	this.m_angularDamping=.0;
	this.m_allowSleep=false;
	this.m_awake=false;
	this.m_fixedRotation=false;
	this.m_bullet=false;
	this.m_type=0;
	this.m_active=false;
	this.m_inertiaScale=.0;
}
c_b2BodyDef.m_new=function(){
	this.m_userData=null;
	this.m_position.p_Set2(0.0,0.0);
	this.m_angle=0.0;
	this.m_linearVelocity.p_Set2(0.0,0.0);
	this.m_angularVelocity=0.0;
	this.m_linearDamping=0.0;
	this.m_angularDamping=0.0;
	this.m_allowSleep=true;
	this.m_awake=true;
	this.m_fixedRotation=false;
	this.m_bullet=false;
	this.m_type=0;
	this.m_active=true;
	this.m_inertiaScale=1.0;
	return this;
}
function c_b2Transform(){
	Object.call(this);
	this.m_position=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_R=c_b2Mat22.m_new.call(new c_b2Mat22);
}
c_b2Transform.m_new=function(t_pos,t_r){
	if((t_pos)!=null){
		this.m_position.p_SetV(t_pos);
		this.m_R.p_SetM(t_r);
	}
	return this;
}
function c_b2Mat22(){
	Object.call(this);
	this.m_col2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_col1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2Mat22.m_new=function(){
	this.m_col2.m_y=1.0;
	this.m_col1.m_x=1.0;
	return this;
}
c_b2Mat22.prototype.p_SetM=function(t_m){
	this.m_col1.m_x=t_m.m_col1.m_x;
	this.m_col1.m_y=t_m.m_col1.m_y;
	this.m_col2.m_x=t_m.m_col2.m_x;
	this.m_col2.m_y=t_m.m_col2.m_y;
}
c_b2Mat22.prototype.p_Set6=function(t_angle){
	var t_c=Math.cos(t_angle);
	var t_s=Math.sin(t_angle);
	this.m_col1.m_x=t_c;
	this.m_col2.m_x=-t_s;
	this.m_col1.m_y=t_s;
	this.m_col2.m_y=t_c;
}
c_b2Mat22.prototype.p_SetZero=function(){
	this.m_col1.m_x=0.0;
	this.m_col2.m_x=0.0;
	this.m_col1.m_y=0.0;
	this.m_col2.m_y=0.0;
}
c_b2Mat22.prototype.p_GetInverse=function(t_out){
	var t_a=this.m_col1.m_x;
	var t_b=this.m_col2.m_x;
	var t_c=this.m_col1.m_y;
	var t_d=this.m_col2.m_y;
	var t_det=t_a*t_d-t_b*t_c;
	if(t_det!=0.0){
		t_det=1.0/t_det;
	}
	t_out.m_col1.m_x=t_det*t_d;
	t_out.m_col2.m_x=-t_det*t_b;
	t_out.m_col1.m_y=-t_det*t_c;
	t_out.m_col2.m_y=t_det*t_a;
	return t_out;
}
c_b2Mat22.prototype.p_AddM=function(t_m){
	this.m_col1.m_x+=t_m.m_col1.m_x;
	this.m_col1.m_y+=t_m.m_col1.m_y;
	this.m_col2.m_x+=t_m.m_col2.m_x;
	this.m_col2.m_y+=t_m.m_col2.m_y;
}
c_b2Mat22.m_FromAngle=function(t_angle){
	var t_mat=c_b2Mat22.m_new.call(new c_b2Mat22);
	t_mat.p_Set6(t_angle);
	return t_mat;
}
c_b2Mat22.prototype.p_Solve2=function(t_out,t_bX,t_bY){
	var t_a11=this.m_col1.m_x;
	var t_a12=this.m_col2.m_x;
	var t_a21=this.m_col1.m_y;
	var t_a22=this.m_col2.m_y;
	var t_det=t_a11*t_a22-t_a12*t_a21;
	if(t_det!=0.0){
		t_det=1.0/t_det;
	}
	t_out.m_x=t_det*(t_a22*t_bX-t_a12*t_bY);
	t_out.m_y=t_det*(t_a11*t_bY-t_a21*t_bX);
	return t_out;
}
function c_b2Sweep(){
	Object.call(this);
	this.m_localCenter=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_t0=.0;
	this.m_a0=.0;
	this.m_a=.0;
	this.m_c=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_c0=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2Sweep.m_new=function(){
	return this;
}
c_b2Sweep.prototype.p_Advance=function(t_t){
	if(this.m_t0<t_t && 1.0-this.m_t0>1e-15){
		var t_alpha=(t_t-this.m_t0)/(1.0-this.m_t0);
		this.m_c0.m_x=(1.0-t_alpha)*this.m_c0.m_x+t_alpha*this.m_c.m_x;
		this.m_c0.m_y=(1.0-t_alpha)*this.m_c0.m_y+t_alpha*this.m_c.m_y;
		this.m_a0=(1.0-t_alpha)*this.m_a0+t_alpha*this.m_a;
		this.m_t0=t_t;
	}
}
c_b2Sweep.prototype.p_GetTransform2=function(t_xf,t_alpha){
	t_xf.m_position.m_x=(1.0-t_alpha)*this.m_c0.m_x+t_alpha*this.m_c.m_x;
	t_xf.m_position.m_y=(1.0-t_alpha)*this.m_c0.m_y+t_alpha*this.m_c.m_y;
	var t_angle=(1.0-t_alpha)*this.m_a0+t_alpha*this.m_a;
	t_xf.m_R.p_Set6(t_angle);
	var t_tMat=t_xf.m_R;
	t_xf.m_position.m_x-=t_tMat.m_col1.m_x*this.m_localCenter.m_x+t_tMat.m_col2.m_x*this.m_localCenter.m_y;
	t_xf.m_position.m_y-=t_tMat.m_col1.m_y*this.m_localCenter.m_x+t_tMat.m_col2.m_y*this.m_localCenter.m_y;
}
c_b2Sweep.prototype.p_Set7=function(t_other){
	this.m_localCenter.p_SetV(t_other.m_localCenter);
	this.m_c0.p_SetV(t_other.m_c0);
	this.m_c.p_SetV(t_other.m_c);
	this.m_a0=t_other.m_a0;
	this.m_a=t_other.m_a;
	this.m_t0=t_other.m_t0;
}
function c_b2JointEdge(){
	Object.call(this);
	this.m_joint=null;
	this.m_other=null;
	this.m_prevItem=null;
	this.m_nextItem=null;
}
c_b2JointEdge.m_new=function(){
	return this;
}
function c_b2ControllerEdge(){
	Object.call(this);
}
function c_b2ContactEdge(){
	Object.call(this);
	this.m_other=null;
	this.m_contact=null;
	this.m_nextItem=null;
	this.m_prevItem=null;
}
c_b2ContactEdge.m_new=function(){
	return this;
}
function c_b2Fixture(){
	Object.call(this);
	this.m_m_aabb=null;
	this.m_m_userData=null;
	this.m_m_body=null;
	this.m_m_next=null;
	this.m_m_shape=null;
	this.m_m_density=.0;
	this.m_m_friction=.0;
	this.m_m_restitution=.0;
	this.m_m_filter=c_b2FilterData.m_new.call(new c_b2FilterData);
	this.m_m_isSensor=false;
	this.m_m_proxy=null;
}
c_b2Fixture.m_new=function(){
	this.m_m_aabb=c_b2AABB.m_new.call(new c_b2AABB);
	this.m_m_userData=null;
	this.m_m_body=null;
	this.m_m_next=null;
	this.m_m_shape=null;
	this.m_m_density=0.0;
	this.m_m_friction=0.0;
	this.m_m_restitution=0.0;
	return this;
}
c_b2Fixture.prototype.p_Create3=function(t_body,t_xf,t_def){
	this.m_m_userData=t_def.m_userData;
	this.m_m_friction=t_def.m_friction;
	this.m_m_restitution=t_def.m_restitution;
	this.m_m_body=t_body;
	this.m_m_next=null;
	this.m_m_filter=t_def.m_filter.p_Copy();
	this.m_m_isSensor=t_def.m_isSensor;
	this.m_m_shape=t_def.m_shape.p_Copy();
	this.m_m_density=t_def.m_density;
}
c_b2Fixture.prototype.p_CreateProxy2=function(t_broadPhase,t_xf){
	this.m_m_shape.p_ComputeAABB(this.m_m_aabb,t_xf);
	this.m_m_proxy=t_broadPhase.p_CreateProxy(this.m_m_aabb,(this));
}
c_b2Fixture.prototype.p_GetMassData=function(t_massData){
	if(t_massData==null){
		t_massData=c_b2MassData.m_new.call(new c_b2MassData);
	}
	this.m_m_shape.p_ComputeMass(t_massData,this.m_m_density);
	return t_massData;
}
c_b2Fixture.prototype.p_GetBody=function(){
	return this.m_m_body;
}
c_b2Fixture.prototype.p_GetType=function(){
	return this.m_m_shape.p_GetType();
}
c_b2Fixture.prototype.p_GetFilterData=function(){
	return this.m_m_filter.p_Copy();
}
c_b2Fixture.prototype.p_GetShape=function(){
	return this.m_m_shape;
}
c_b2Fixture.prototype.p_GetFriction=function(){
	return this.m_m_friction;
}
c_b2Fixture.prototype.p_GetRestitution=function(){
	return this.m_m_restitution;
}
c_b2Fixture.m_tmpAABB1=null;
c_b2Fixture.m_tmpAABB2=null;
c_b2Fixture.m_tmpVec=null;
c_b2Fixture.prototype.p_Synchronize=function(t_broadPhase,t_transform1,t_transform2){
	if(!((this.m_m_proxy)!=null)){
		return;
	}
	this.m_m_shape.p_ComputeAABB(c_b2Fixture.m_tmpAABB1,t_transform1);
	this.m_m_shape.p_ComputeAABB(c_b2Fixture.m_tmpAABB2,t_transform2);
	this.m_m_aabb.p_Combine(c_b2Fixture.m_tmpAABB1,c_b2Fixture.m_tmpAABB2);
	c_b2Math.m_SubtractVV(t_transform2.m_position,t_transform1.m_position,c_b2Fixture.m_tmpVec);
	t_broadPhase.p_MoveProxy(this.m_m_proxy,this.m_m_aabb,c_b2Fixture.m_tmpVec);
}
c_b2Fixture.prototype.p_GetAABB=function(){
	return this.m_m_aabb;
}
c_b2Fixture.prototype.p_IsSensor=function(){
	return this.m_m_isSensor;
}
var bb_main_WORLD_WIDTH=0;
var bb_main_WORLD_HEIGHT=0;
function c_b2PolygonShape(){
	c_b2Shape.call(this);
	this.m_m_centroid=null;
	this.m_m_vertices=[];
	this.m_m_depths=[];
	this.m_m_normals=[];
	this.m_m_vertexCount=0;
}
c_b2PolygonShape.prototype=extend_class(c_b2Shape);
c_b2PolygonShape.prototype.p_Reserve=function(t_count){
	if(this.m_m_vertices.length==0){
		this.m_m_depths=new_number_array(t_count);
	}
	if(this.m_m_vertices.length<t_count){
		var t_startLength=this.m_m_vertices.length;
		this.m_m_depths=resize_number_array(this.m_m_depths,t_count);
		this.m_m_vertices=resize_object_array(this.m_m_vertices,t_count);
		this.m_m_normals=resize_object_array(this.m_m_normals,t_count);
		for(var t_i=t_startLength;t_i<t_count;t_i=t_i+1){
			this.m_m_vertices[t_i]=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
			this.m_m_normals[t_i]=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
		}
	}
}
c_b2PolygonShape.m_new=function(){
	c_b2Shape.m_new.call(this);
	this.m_m_type=1;
	this.m_m_centroid=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.p_Reserve(4);
	return this;
}
c_b2PolygonShape.prototype.p_SetAsBox=function(t_hx,t_hy){
	this.m_m_vertexCount=4;
	this.p_Reserve(4);
	this.m_m_vertices[0].p_Set2(-t_hx,-t_hy);
	this.m_m_vertices[1].p_Set2(t_hx,-t_hy);
	this.m_m_vertices[2].p_Set2(t_hx,t_hy);
	this.m_m_vertices[3].p_Set2(-t_hx,t_hy);
	this.m_m_normals[0].p_Set2(0.0,-1.0);
	this.m_m_normals[1].p_Set2(1.0,0.0);
	this.m_m_normals[2].p_Set2(0.0,1.0);
	this.m_m_normals[3].p_Set2(-1.0,0.0);
	this.m_m_centroid.p_SetZero();
}
c_b2PolygonShape.m_ComputeCentroid=function(t_vs,t_count){
	var t_c=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	var t_area=0.0;
	var t_p1X=0.0;
	var t_p1Y=0.0;
	var t_inv3=0.33333333333333331;
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		var t_p2=t_vs[t_i];
		var t_p3=t_vs[0];
		if(t_i+1<t_count){
			t_p3=t_vs[t_i+1];
		}
		var t_e1X=t_p2.m_x-t_p1X;
		var t_e1Y=t_p2.m_y-t_p1Y;
		var t_e2X=t_p3.m_x-t_p1X;
		var t_e2Y=t_p3.m_y-t_p1Y;
		var t_D=t_e1X*t_e2Y-t_e1Y*t_e2X;
		var t_triangleArea=0.5*t_D;
		t_area+=t_triangleArea;
		t_c.m_x+=t_triangleArea*t_inv3*(t_p1X+t_p2.m_x+t_p3.m_x);
		t_c.m_y+=t_triangleArea*t_inv3*(t_p1Y+t_p2.m_y+t_p3.m_y);
	}
	t_c.m_x*=1.0/t_area;
	t_c.m_y*=1.0/t_area;
	return t_c;
}
c_b2PolygonShape.prototype.p_SetAsArray=function(t_vertices,t_vertexCount){
	if(t_vertexCount==0.0){
		t_vertexCount=(t_vertices.length);
	}
	c_b2Settings.m_B2Assert(2.0<=t_vertexCount);
	this.m_m_vertexCount=((t_vertexCount)|0);
	this.p_Reserve((t_vertexCount)|0);
	var t_i=0;
	for(var t_i2=0;t_i2<this.m_m_vertexCount;t_i2=t_i2+1){
		this.m_m_vertices[t_i2].p_SetV(t_vertices[t_i2]);
	}
	for(var t_i3=0;t_i3<this.m_m_vertexCount;t_i3=t_i3+1){
		var t_i1=t_i3;
		var t_i22=0;
		if(t_i3+1<this.m_m_vertexCount){
			t_i22=t_i3+1;
		}
		var t_edge=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
		c_b2Math.m_SubtractVV(this.m_m_vertices[t_i22],this.m_m_vertices[t_i1],t_edge);
		c_b2Settings.m_B2Assert(t_edge.p_LengthSquared()>1e-15);
		c_b2Math.m_CrossVF(t_edge,1.0,this.m_m_normals[t_i3]);
		this.m_m_normals[t_i3].p_Normalize();
	}
	this.m_m_centroid=c_b2PolygonShape.m_ComputeCentroid(this.m_m_vertices,this.m_m_vertexCount);
}
c_b2PolygonShape.prototype.p_GetVertices=function(){
	return this.m_m_vertices;
}
c_b2PolygonShape.prototype.p_Set5=function(t_other){
	c_b2Shape.prototype.p_Set5.call(this,t_other);
	if((object_downcast((t_other),c_b2PolygonShape))!=null){
		var t_other2=object_downcast((t_other),c_b2PolygonShape);
		this.m_m_centroid.p_SetV(t_other2.m_m_centroid);
		this.m_m_vertexCount=t_other2.m_m_vertexCount;
		this.p_Reserve(this.m_m_vertexCount);
		for(var t_i=0;t_i<this.m_m_vertexCount;t_i=t_i+1){
			this.m_m_vertices[t_i].p_SetV(t_other2.m_m_vertices[t_i]);
			this.m_m_normals[t_i].p_SetV(t_other2.m_m_normals[t_i]);
		}
	}
}
c_b2PolygonShape.prototype.p_Copy=function(){
	var t_s=c_b2PolygonShape.m_new.call(new c_b2PolygonShape);
	t_s.p_Set5(this);
	return (t_s);
}
c_b2PolygonShape.prototype.p_ComputeAABB=function(t_aabb,t_xf){
	var t_tMat=t_xf.m_R;
	var t_tVec=this.m_m_vertices[0];
	var t_lowerX=t_xf.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	var t_lowerY=t_xf.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	var t_upperX=t_lowerX;
	var t_upperY=t_lowerY;
	for(var t_i=1;t_i<this.m_m_vertexCount;t_i=t_i+1){
		t_tVec=this.m_m_vertices[t_i];
		var t_vX=t_xf.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
		var t_vY=t_xf.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
		if(t_lowerX>t_vX){
			t_lowerX=t_vX;
		}
		if(t_lowerY>t_vY){
			t_lowerY=t_vY;
		}
		if(t_upperX<t_vX){
			t_upperX=t_vX;
		}
		if(t_upperY<t_vY){
			t_upperY=t_vY;
		}
	}
	t_aabb.m_lowerBound.m_x=t_lowerX-this.m_m_radius;
	t_aabb.m_lowerBound.m_y=t_lowerY-this.m_m_radius;
	t_aabb.m_upperBound.m_x=t_upperX+this.m_m_radius;
	t_aabb.m_upperBound.m_y=t_upperY+this.m_m_radius;
}
c_b2PolygonShape.prototype.p_ComputeMass=function(t_massData,t_density){
	if(this.m_m_vertexCount==2){
		t_massData.m_center.m_x=0.5*(this.m_m_vertices[0].m_x+this.m_m_vertices[1].m_x);
		t_massData.m_center.m_y=0.5*(this.m_m_vertices[0].m_y+this.m_m_vertices[1].m_y);
		t_massData.m_mass=0.0;
		t_massData.m_I=0.0;
		return;
	}
	var t_centerX=0.0;
	var t_centerY=0.0;
	var t_area=0.0;
	var t_I=0.0;
	var t_p1X=0.0;
	var t_p1Y=0.0;
	var t_k_inv3=0.33333333333333331;
	for(var t_i2=0;t_i2<this.m_m_vertexCount;t_i2=t_i2+1){
		var t_p2=this.m_m_vertices[t_i2];
		var t_p3=this.m_m_vertices[0];
		if(t_i2+1<this.m_m_vertexCount){
			t_p3=this.m_m_vertices[t_i2+1];
		}
		var t_e1X=t_p2.m_x-t_p1X;
		var t_e1Y=t_p2.m_y-t_p1Y;
		var t_e2X=t_p3.m_x-t_p1X;
		var t_e2Y=t_p3.m_y-t_p1Y;
		var t_D=t_e1X*t_e2Y-t_e1Y*t_e2X;
		var t_triangleArea=0.5*t_D;
		t_area+=t_triangleArea;
		t_centerX+=t_triangleArea*t_k_inv3*(t_p1X+t_p2.m_x+t_p3.m_x);
		t_centerY+=t_triangleArea*t_k_inv3*(t_p1Y+t_p2.m_y+t_p3.m_y);
		var t_px=t_p1X;
		var t_py=t_p1Y;
		var t_ex1=t_e1X;
		var t_ey1=t_e1Y;
		var t_ex2=t_e2X;
		var t_ey2=t_e2Y;
		var t_intx2=t_k_inv3*(0.25*(t_ex1*t_ex1+t_ex2*t_ex1+t_ex2*t_ex2)+(t_px*t_ex1+t_px*t_ex2))+0.5*t_px*t_px;
		var t_inty2=t_k_inv3*(0.25*(t_ey1*t_ey1+t_ey2*t_ey1+t_ey2*t_ey2)+(t_py*t_ey1+t_py*t_ey2))+0.5*t_py*t_py;
		t_I+=t_D*(t_intx2+t_inty2);
	}
	t_massData.m_mass=t_density*t_area;
	t_centerX*=1.0/t_area;
	t_centerY*=1.0/t_area;
	t_massData.m_center.p_Set2(t_centerX,t_centerY);
	t_massData.m_I=t_density*t_I;
}
function c_b2Settings(){
	Object.call(this);
}
c_b2Settings.m_B2Assert=function(t_a){
	if(!t_a){
		print("Assertion Failed");
	}
}
c_b2Settings.m_B2MixFriction=function(t_friction1,t_friction2){
	return Math.sqrt(t_friction1*t_friction2);
}
c_b2Settings.m_B2MixRestitution=function(t_restitution1,t_restitution2){
	if(t_restitution1>t_restitution2){
		return t_restitution1;
	}else{
		return t_restitution2;
	}
}
function c_Physics(){
	Object.call(this);
}
function c_b2FixtureDef(){
	Object.call(this);
	this.m_shape=null;
	this.m_userData=null;
	this.m_friction=.0;
	this.m_restitution=.0;
	this.m_density=.0;
	this.m_filter=c_b2FilterData.m_new.call(new c_b2FilterData);
	this.m_isSensor=false;
}
c_b2FixtureDef.m_new=function(){
	this.m_shape=null;
	this.m_userData=null;
	this.m_friction=0.2;
	this.m_restitution=0.0;
	this.m_density=0.0;
	this.m_filter.m_categoryBits=1;
	this.m_filter.m_maskBits=65535;
	this.m_filter.m_groupIndex=0;
	this.m_isSensor=false;
	return this;
}
function c_b2FilterData(){
	Object.call(this);
	this.m_categoryBits=1;
	this.m_maskBits=65535;
	this.m_groupIndex=0;
}
c_b2FilterData.m_new=function(){
	return this;
}
c_b2FilterData.prototype.p_Copy=function(){
	var t_copy=c_b2FilterData.m_new.call(new c_b2FilterData);
	t_copy.m_categoryBits=this.m_categoryBits;
	t_copy.m_maskBits=this.m_maskBits;
	t_copy.m_groupIndex=this.m_groupIndex;
	return t_copy;
}
function c_b2MassData(){
	Object.call(this);
	this.m_mass=0.0;
	this.m_center=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_I=0.0;
}
c_b2MassData.m_new=function(){
	return this;
}
function c_b2Math(){
	Object.call(this);
}
c_b2Math.m_MulMV=function(t_A,t_v,t_out){
	var t_tmp=t_A.m_col1.m_y*t_v.m_x+t_A.m_col2.m_y*t_v.m_y;
	t_out.m_x=t_A.m_col1.m_x*t_v.m_x+t_A.m_col2.m_x*t_v.m_y;
	t_out.m_y=t_tmp;
}
c_b2Math.m_MulX=function(t_T,t_v,t_out){
	c_b2Math.m_MulMV(t_T.m_R,t_v,t_out);
	t_out.m_x+=t_T.m_position.m_x;
	t_out.m_y+=t_T.m_position.m_y;
}
c_b2Math.m_SubtractVV=function(t_a,t_b,t_out){
	t_out.m_x=t_a.m_x-t_b.m_x;
	t_out.m_y=t_a.m_y-t_b.m_y;
}
c_b2Math.m_CrossVF=function(t_a,t_s,t_out){
	var t_tmp=t_a.m_x;
	t_out.m_x=t_s*t_a.m_y;
	t_out.m_y=-t_s*t_tmp;
}
c_b2Math.m_Min=function(t_a,t_b){
	if(t_a<t_b){
		return t_a;
	}else{
		return t_b;
	}
}
c_b2Math.m_CrossVV=function(t_a,t_b){
	return t_a.m_x*t_b.m_y-t_a.m_y*t_b.m_x;
}
c_b2Math.m_Dot=function(t_a,t_b){
	return t_a.m_x*t_b.m_x+t_a.m_y*t_b.m_y;
}
c_b2Math.m_CrossFV=function(t_s,t_a,t_out){
	var t_tmp=t_a.m_x;
	t_out.m_x=-t_s*t_a.m_y;
	t_out.m_y=t_s*t_tmp;
}
c_b2Math.m_MulTMV=function(t_A,t_v,t_out){
	var t_tmp=c_b2Math.m_Dot(t_v,t_A.m_col2);
	t_out.m_x=c_b2Math.m_Dot(t_v,t_A.m_col1);
	t_out.m_y=t_tmp;
}
c_b2Math.m_Max=function(t_a,t_b){
	if(t_a>t_b){
		return t_a;
	}else{
		return t_b;
	}
}
c_b2Math.m_Clamp=function(t_a,t_low,t_high){
	if(t_a<t_low){
		return t_low;
	}else{
		if(t_a>t_high){
			return t_high;
		}else{
			return t_a;
		}
	}
}
c_b2Math.m_AddVV=function(t_a,t_b,t_out){
	t_out.m_x=t_a.m_x+t_b.m_x;
	t_out.m_y=t_a.m_y+t_b.m_y;
}
c_b2Math.m_Abs=function(t_a){
	if(t_a>0.0){
		return t_a;
	}else{
		return -t_a;
	}
}
function c_MyContactListener(){
	Object.call(this);
	this.implments={c_b2ContactListenerInterface:1};
}
c_MyContactListener.m_new=function(){
	return this;
}
c_MyContactListener.prototype.p_BeginContact=function(t_contact){
	if(t_contact.p_IsTouching()){
		var t_=bb_main_APP.m_dwarves;
		var t_2=0;
		while(t_2<t_.length){
			var t_dwarf=t_[t_2];
			t_2=t_2+1;
			for(var t_n=0;t_n<=1;t_n=t_n+1){
				if(t_contact.p_GetFixtureA()==t_dwarf.m_hit[t_n]){
					t_dwarf.p_OnBeginHit(t_n,t_contact.p_GetFixtureB());
				}else{
					if(t_contact.p_GetFixtureB()==t_dwarf.m_hit[t_n]){
						t_dwarf.p_OnBeginHit(t_n,t_contact.p_GetFixtureA());
					}
				}
			}
			if(t_contact.p_GetFixtureA()==t_dwarf.m_feet || t_contact.p_GetFixtureB()==t_dwarf.m_feet){
				t_dwarf.p_OnBeginContact();
			}
		}
	}
}
c_MyContactListener.prototype.p_EndContact=function(t_contact){
	var t_=bb_main_APP.m_dwarves;
	var t_2=0;
	while(t_2<t_.length){
		var t_dwarf=t_[t_2];
		t_2=t_2+1;
		for(var t_n=0;t_n<=1;t_n=t_n+1){
			if(t_contact.p_GetFixtureA()==t_dwarf.m_hit[t_n]){
				t_dwarf.p_OnEndHit(t_n,t_contact.p_GetFixtureB());
			}else{
				if(t_contact.p_GetFixtureB()==t_dwarf.m_hit[t_n]){
					t_dwarf.p_OnEndHit(t_n,t_contact.p_GetFixtureA());
				}
			}
		}
		if(t_contact.p_GetFixtureA()==t_dwarf.m_feet || t_contact.p_GetFixtureB()==t_dwarf.m_feet){
			t_dwarf.p_OnEndContact();
		}
	}
}
c_MyContactListener.prototype.p_PreSolve=function(t_contact,t_oldManifold){
}
c_MyContactListener.prototype.p_PostSolve=function(t_contact,t_impulse){
}
function c_JSONDataItem(){
	Object.call(this);
	this.m_dataType=7;
}
c_JSONDataItem.m_new=function(){
	return this;
}
c_JSONDataItem.prototype.p_ToString=function(){
}
c_JSONDataItem.prototype.p_ToInt=function(){
	print("Unsupported conversion to Int for "+this.p_ToString());
	return -1;
}
c_JSONDataItem.prototype.p_ToFloat=function(){
	print("Unsupported conversion to Float for "+this.p_ToString());
	return -1.0;
}
c_JSONDataItem.prototype.p_ToBool=function(){
	print("Unsupported conversion to Bool for "+this.p_ToString());
	return false;
}
function c_JSONObject(){
	c_JSONDataItem.call(this);
	this.m_values=c_StringMap.m_new.call(new c_StringMap);
}
c_JSONObject.prototype=extend_class(c_JSONDataItem);
c_JSONObject.m_new=function(){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=1;
	return this;
}
c_JSONObject.prototype.p_AddItem=function(t_name,t_dataItem){
	this.m_values.p_Set8(t_name,t_dataItem);
}
c_JSONObject.prototype.p_GetItem=function(t_name){
	return this.m_values.p_Get2(t_name);
}
c_JSONObject.prototype.p_GetItem2=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToString());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem3=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToInt());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem4=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToFloat());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem5=function(t_name,t_defaultValue){
	var t_item=this.m_values.p_Get2(t_name);
	if(t_item!=null){
		return (t_item.p_ToBool());
	}
	return t_defaultValue;
}
c_JSONObject.prototype.p_ToString=function(){
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*5+5);
	var t_first=true;
	t_retString.p_AddString("{");
	var t_=this.m_values.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_v=t_.p_NextObject();
		if(t_first){
			t_first=false;
		}else{
			t_retString.p_AddString(",");
		}
		t_retString.p_AddString("\"");
		t_retString.p_AddString(t_v.p_Key());
		t_retString.p_AddString("\":");
		t_retString.p_AddString(t_v.p_Value().p_ToString());
	}
	t_retString.p_AddString("}");
	return t_retString.p_ToString();
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function c_JSONData(){
	Object.call(this);
}
c_JSONData.m_GetJSONObject=function(t_tokeniser){
	var t_jsonObject=c_JSONObject.m_new.call(new c_JSONObject);
	var t_data1=null;
	var t_data2=null;
	t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	if(t_data1.m_dataType==9 && object_downcast((t_data1),c_JSONNonData).m_value.m_tokenType==2){
		return (t_jsonObject);
	}
	do{
		if(t_data1.m_dataType!=5){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item name, got "+(t_data1.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data2.m_dataType!=9){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}else{
			if(object_downcast((t_data2),c_JSONNonData).m_value.m_tokenType!=6){
				return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(object_downcast((t_data2),c_JSONNonData).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			}
		}
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data2.m_dataType==-1){
			return t_data2;
		}else{
			if(t_data2.m_dataType==9){
				return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item value, got "+(object_downcast((t_data2),c_JSONNonData).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			}
		}
		t_jsonObject.p_AddItem(object_downcast((t_data1),c_JSONString).m_value,t_data2);
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data2.m_dataType!=9){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}else{
			if(object_downcast((t_data2),c_JSONNonData).m_value.m_tokenType==2){
				break;
			}else{
				if(object_downcast((t_data2),c_JSONNonData).m_value.m_tokenType!=0){
					return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(object_downcast((t_data2),c_JSONNonData).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				}
			}
		}
		t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	}while(!(false));
	return (t_jsonObject);
}
c_JSONData.m_GetJSONArray=function(t_tokeniser){
	var t_jsonArray=c_JSONArray.m_new.call(new c_JSONArray);
	var t_data=null;
	t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	if(t_data.m_dataType==9 && object_downcast((t_data),c_JSONNonData).m_value.m_tokenType==4){
		return (t_jsonArray);
	}
	do{
		if(t_data.m_dataType==9){
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected data value, got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}else{
			if(t_data.m_dataType==-1){
				return t_data;
			}
		}
		t_jsonArray.p_AddItem2(t_data);
		t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		if(t_data.m_dataType==9){
			var t_token=object_downcast((t_data),c_JSONNonData).m_value;
			if(t_token.m_tokenType==0){
				t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
				continue;
			}else{
				if(t_token.m_tokenType==4){
					break;
				}else{
					return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_token.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				}
			}
		}else{
			return (c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
		}
	}while(!(false));
	return (t_jsonArray);
}
c_JSONData.m_HexCharToInt=function(t_char){
	if(t_char>=48 && t_char<=57){
		return t_char-48;
	}else{
		if(t_char>=65 && t_char<=70){
			return t_char-55;
		}else{
			if(t_char>=97 && t_char<=102){
				return t_char-87;
			}
		}
	}
	return 0;
}
c_JSONData.m_UnEscapeUnicode=function(t_hexString){
	var t_charCode=0;
	for(var t_i=0;t_i<4;t_i=t_i+1){
		t_charCode<<=4;
		t_charCode+=c_JSONData.m_HexCharToInt(t_hexString.charCodeAt(t_i));
	}
	return String.fromCharCode(t_charCode);
}
c_JSONData.m_UnEscapeJSON=function(t_input){
	var t_escIndex=t_input.indexOf("\\",0);
	if(t_escIndex==-1){
		return t_input;
	}
	var t_copyStartIndex=0;
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,t_input.length);
	while(t_escIndex!=-1){
		t_retString.p_AddString(t_input.slice(t_copyStartIndex,t_escIndex));
		var t_2=t_input.charCodeAt(t_escIndex+1);
		if(t_2==110){
			t_retString.p_AddString("\n");
		}else{
			if(t_2==34){
				t_retString.p_AddString("\"");
			}else{
				if(t_2==116){
					t_retString.p_AddString("\t");
				}else{
					if(t_2==92){
						t_retString.p_AddString("\\");
					}else{
						if(t_2==47){
							t_retString.p_AddString("/");
						}else{
							if(t_2==114){
								t_retString.p_AddString("\r");
							}else{
								if(t_2==102){
									t_retString.p_AddString(String.fromCharCode(12));
								}else{
									if(t_2==98){
										t_retString.p_AddString(String.fromCharCode(8));
									}else{
										if(t_2==117){
											t_retString.p_AddString(c_JSONData.m_UnEscapeUnicode(t_input.slice(t_escIndex+2,t_escIndex+6)));
											t_escIndex+=4;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		t_copyStartIndex=t_escIndex+2;
		t_escIndex=t_input.indexOf("\\",t_copyStartIndex);
	}
	if(t_copyStartIndex<t_input.length){
		t_retString.p_AddString(t_input.slice(t_copyStartIndex));
	}
	return t_retString.p_ToString();
}
c_JSONData.m_GetJSONDataItem=function(t_tokeniser){
	var t_token=t_tokeniser.p_NextToken();
	var t_1=t_token.m_tokenType;
	if(t_1==1){
		return c_JSONData.m_GetJSONObject(t_tokeniser);
	}else{
		if(t_1==3){
			return c_JSONData.m_GetJSONArray(t_tokeniser);
		}else{
			if(t_1==10){
				return (c_JSONString.m_new.call(new c_JSONString,(object_downcast((t_token.m_value),c_StringObject).p_ToString()),false));
			}else{
				if(t_1==11){
					return (c_JSONFloat.m_new.call(new c_JSONFloat,object_downcast((t_token.m_value),c_FloatObject).p_ToFloat()));
				}else{
					if(t_1==12){
						return (c_JSONFloat.m_new2.call(new c_JSONFloat,object_downcast((t_token.m_value),c_StringObject).p_ToString()));
					}else{
						if(t_1==13){
							return (c_JSONInteger.m_new.call(new c_JSONInteger,(object_downcast((t_token.m_value),c_IntObject).p_ToInt())));
						}else{
							if(t_1==7){
								return (c_JSONBool.m_new.call(new c_JSONBool,true));
							}else{
								if(t_1==8){
									return (c_JSONBool.m_new.call(new c_JSONBool,false));
								}else{
									if(t_1==9){
										return (c_JSONNull.m_new.call(new c_JSONNull));
									}else{
										return (c_JSONNonData.m_new.call(new c_JSONNonData,t_token));
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
c_JSONData.m_ReadJSON=function(t_jsonString){
	var t_tokeniser=c_JSONTokeniser.m_new.call(new c_JSONTokeniser,t_jsonString,false);
	var t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	if(t_data==null){
		return (c_JSONDataError.m_new.call(new c_JSONDataError,"Unknown JSON error.",t_tokeniser.p_GetCurrentSectionString(20,20)));
	}else{
		if(t_data.m_dataType==-1){
			print(t_data.p_ToString());
		}else{
			if(t_data.m_dataType!=1 && t_data.m_dataType!=2){
				return (c_JSONDataError.m_new.call(new c_JSONDataError,"JSON Document malformed. Root node is not an object or an array",t_tokeniser.p_GetCurrentSectionString(20,20)));
			}
		}
	}
	return t_data;
}
function c_JSONTokeniser(){
	Object.call(this);
	this.m_silent=false;
	this.m_jsonString="";
	this.m_stringIndex=0;
	this.m_char=0;
}
c_JSONTokeniser.prototype.p_NextChar=function(){
	if(this.m_stringIndex>=this.m_jsonString.length){
		this.m_char=0;
		return this.m_char;
	}
	this.m_char=this.m_jsonString.charCodeAt(this.m_stringIndex);
	this.m_stringIndex+=1;
	return this.m_char;
}
c_JSONTokeniser.m_new=function(t_jsonString,t_silent){
	this.m_silent=t_silent;
	this.m_jsonString=t_jsonString;
	this.p_NextChar();
	return this;
}
c_JSONTokeniser.m_new2=function(){
	return this;
}
c_JSONTokeniser.prototype.p_SkipWhitespace=function(){
	var t_index=this.m_stringIndex;
	while(this.m_char<=32 && this.m_char!=0){
		this.p_NextChar();
	}
	return this.m_stringIndex-t_index;
}
c_JSONTokeniser.prototype.p_GetCurrentSectionString=function(t_backwards,t_forwards){
	return "Section: "+this.m_jsonString.slice(bb_math_Max(this.m_stringIndex-t_backwards,0),bb_math_Min(this.m_stringIndex+t_forwards,this.m_jsonString.length));
}
c_JSONTokeniser.prototype.p_ParseFailure=function(t_description){
	if(this.m_silent){
		return;
	}
	print("JSON parse error at index: "+String(this.m_stringIndex));
	print(t_description);
	print(this.p_GetCurrentSectionString(20,20));
	this.m_stringIndex=this.m_jsonString.length;
}
c_JSONTokeniser.prototype.p_SkipComments=function(){
	var t_index=this.m_stringIndex;
	if(this.m_char==47){
		this.p_NextChar();
		if(this.m_char==47){
			while(this.m_char!=13 && this.m_char!=10 && this.m_char!=0){
				this.p_NextChar();
			}
		}else{
			if(this.m_char==42){
				do{
					this.p_NextChar();
					if(this.m_char==42){
						this.p_NextChar();
						if(this.m_char==47){
							break;
						}
					}
					if(this.m_char==0){
						this.p_ParseFailure("Unterminated comment");
						break;
					}
				}while(!(false));
			}else{
				this.p_ParseFailure("Unrecognised comment opening");
			}
		}
		this.p_NextChar();
	}
	return this.m_stringIndex-t_index;
}
c_JSONTokeniser.prototype.p_SkipIgnored=function(){
	var t_ignoredCount=0;
	do{
		t_ignoredCount=0;
		t_ignoredCount+=this.p_SkipWhitespace();
		t_ignoredCount+=this.p_SkipComments();
	}while(!(t_ignoredCount==0));
}
c_JSONTokeniser.prototype.p_IsDigit=function(t_char){
	return t_char>=48 && t_char<=58;
}
c_JSONTokeniser.prototype.p_ParseInteger=function(t_str){
	return parseInt((t_str),10);
}
c_JSONTokeniser.prototype.p_ParseNumberToken=function(t_firstChar){
	var t_index=this.m_stringIndex-1;
	while(this.m_char!=32 && this.m_char!=44 && this.m_char!=125 && this.m_char!=93 && this.m_char!=0){
		this.p_NextChar();
	}
	if(this.m_char==0){
		this.p_ParseFailure("Unterminated Number");
		return c_JSONToken.m_CreateToken4(-1,null);
	}
	var t_numberString=this.m_jsonString.slice(t_index,this.m_stringIndex-1);
	if(t_numberString.indexOf(".",0)!=-1 || t_numberString.indexOf("e",0)!=-1 || t_numberString.indexOf("E",0)!=-1){
		return c_JSONToken.m_CreateToken3(12,t_numberString);
	}else{
		var t_value=this.p_ParseInteger(t_numberString);
		return c_JSONToken.m_CreateToken2(13,t_value);
	}
}
c_JSONTokeniser.prototype.p_NextToken=function(){
	var t_retToken=null;
	this.p_SkipIgnored();
	var t_2=this.m_char;
	if(t_2==123){
		t_retToken=c_JSONToken.m_CreateToken3(1,"{");
	}else{
		if(t_2==125){
			t_retToken=c_JSONToken.m_CreateToken3(2,"}");
		}else{
			if(t_2==91){
				t_retToken=c_JSONToken.m_CreateToken3(3,"[");
			}else{
				if(t_2==93){
					t_retToken=c_JSONToken.m_CreateToken3(4,"]");
				}else{
					if(t_2==44){
						t_retToken=c_JSONToken.m_CreateToken3(0,",");
					}else{
						if(t_2==58){
							t_retToken=c_JSONToken.m_CreateToken3(6,":");
						}else{
							if(t_2==116){
								if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"rue")==0){
									this.m_stringIndex+=3;
									t_retToken=c_JSONToken.m_CreateToken3(7,"true");
								}
							}else{
								if(t_2==102){
									if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+4),"alse")==0){
										this.m_stringIndex+=4;
										t_retToken=c_JSONToken.m_CreateToken3(8,"false");
									}
								}else{
									if(t_2==110){
										if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"ull")==0){
											this.m_stringIndex+=3;
											t_retToken=c_JSONToken.m_CreateToken3(9,"null");
										}
									}else{
										if(t_2==34){
											var t_startIndex=this.m_stringIndex;
											var t_endIndex=this.m_jsonString.indexOf("\"",this.m_stringIndex);
											while(t_endIndex!=-1 && this.m_jsonString.charCodeAt(t_endIndex-1)==92){
												t_endIndex=this.m_jsonString.indexOf("\"",t_endIndex+1);
											}
											if(t_endIndex==-1){
												this.p_ParseFailure("Unterminated string");
											}
											t_retToken=c_JSONToken.m_CreateToken3(10,this.m_jsonString.slice(t_startIndex,t_endIndex));
											this.m_stringIndex=t_endIndex+1;
										}else{
											if(this.m_char==45 || this.p_IsDigit(this.m_char)){
												return this.p_ParseNumberToken(this.m_char);
											}else{
												if(this.m_char==0){
													t_retToken=null;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(t_retToken==null){
		this.p_ParseFailure("Unknown token, char: "+String.fromCharCode(this.m_char));
		t_retToken=c_JSONToken.m_CreateToken4(-1,null);
	}else{
		this.p_NextChar();
	}
	return t_retToken;
}
function c_ASCIICodes(){
	Object.call(this);
}
function c_JSONToken(){
	Object.call(this);
	this.m_tokenType=0;
	this.m_value=null;
}
c_JSONToken.m_new=function(t_tokenType,t_value){
	this.m_tokenType=t_tokenType;
	this.m_value=t_value;
	return this;
}
c_JSONToken.m_new2=function(){
	return this;
}
c_JSONToken.m_reusableToken=null;
c_JSONToken.m_CreateToken=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=(c_FloatObject.m_new2.call(new c_FloatObject,t_value));
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken2=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=(c_IntObject.m_new.call(new c_IntObject,t_value));
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken3=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=(c_StringObject.m_new3.call(new c_StringObject,t_value));
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken4=function(t_tokenType,t_value){
	c_JSONToken.m_reusableToken.m_tokenType=t_tokenType;
	c_JSONToken.m_reusableToken.m_value=t_value;
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.prototype.p_GetValueString=function(){
	var t_1=this.m_tokenType;
	if(t_1==11){
		return ""+(object_downcast((this.m_value),c_FloatObject).p_ToString());
	}else{
		if(t_1==13){
			return ""+(object_downcast((this.m_value),c_IntObject).p_ToString());
		}else{
			if(t_1==9){
				return "NULL";
			}else{
				if((this.m_value)!=null){
					return (object_downcast((this.m_value),c_StringObject).p_ToString());
				}else{
					return "Null value";
				}
			}
		}
	}
}
c_JSONToken.prototype.p_ToString=function(){
	return "JSONToken - type: "+String(this.m_tokenType)+", value: "+this.p_GetValueString();
}
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function c_FloatObject(){
	Object.call(this);
	this.m_value=.0;
}
c_FloatObject.m_new=function(t_value){
	this.m_value=(t_value);
	return this;
}
c_FloatObject.m_new2=function(t_value){
	this.m_value=t_value;
	return this;
}
c_FloatObject.m_new3=function(){
	return this;
}
c_FloatObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_FloatObject.prototype.p_ToFloat=function(){
	return this.m_value;
}
function c_IntObject(){
	Object.call(this);
	this.m_value=0;
}
c_IntObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_IntObject.m_new2=function(t_value){
	this.m_value=((t_value)|0);
	return this;
}
c_IntObject.m_new3=function(){
	return this;
}
c_IntObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_IntObject.prototype.p_ToInt=function(){
	return this.m_value;
}
function c_StringObject(){
	Object.call(this);
	this.m_value="";
}
c_StringObject.m_new=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new2=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new3=function(t_value){
	this.m_value=t_value;
	return this;
}
c_StringObject.m_new4=function(){
	return this;
}
c_StringObject.prototype.p_ToString=function(){
	return this.m_value;
}
function c_JSONDataType(){
	Object.call(this);
}
function c_JSONNonData(){
	c_JSONDataItem.call(this);
	this.m_value=null;
}
c_JSONNonData.prototype=extend_class(c_JSONDataItem);
c_JSONNonData.m_new=function(t_token){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=9;
	this.m_value=t_token;
	return this;
}
c_JSONNonData.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONNonData.prototype.p_ToString=function(){
	return "Non Data";
}
function c_JSONDataError(){
	c_JSONDataItem.call(this);
	this.m_value="";
}
c_JSONDataError.prototype=extend_class(c_JSONDataItem);
c_JSONDataError.m_new=function(t_errorDescription,t_location){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=-1;
	this.m_value=t_errorDescription+"\nJSON Location: "+t_location;
	return this;
}
c_JSONDataError.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONDataError.prototype.p_ToString=function(){
	return this.m_value;
}
function c_JSONString(){
	c_JSONDataItem.call(this);
	this.m_value="";
	this.m_jsonReady="";
}
c_JSONString.prototype=extend_class(c_JSONDataItem);
c_JSONString.m_new=function(t_value,t_isMonkeyString){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=5;
	if(!t_isMonkeyString){
		this.m_value=c_JSONData.m_UnEscapeJSON(t_value);
		this.m_jsonReady="\""+t_value+"\"";
	}else{
		this.m_value=t_value;
	}
	return this;
}
c_JSONString.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONString.prototype.p_ToString=function(){
	return this.m_value;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Set8=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map2.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map2.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map2.prototype.p_Count=function(){
	if((this.m_root)!=null){
		return this.m_root.p_Count2(0);
	}
	return 0;
}
c_Map2.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map2.prototype.p_ObjectEnumerator=function(){
	return c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node2(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
c_Node2.prototype.p_Count2=function(t_n){
	if((this.m_left)!=null){
		t_n=this.m_left.p_Count2(t_n);
	}
	if((this.m_right)!=null){
		t_n=this.m_right.p_Count2(t_n);
	}
	return t_n+1;
}
c_Node2.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
c_Node2.prototype.p_Key=function(){
	return this.m_key;
}
c_Node2.prototype.p_Value=function(){
	return this.m_value;
}
function c_JSONArray(){
	c_JSONDataItem.call(this);
	this.m_values=c_List.m_new.call(new c_List);
}
c_JSONArray.prototype=extend_class(c_JSONDataItem);
c_JSONArray.m_new=function(){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=2;
	return this;
}
c_JSONArray.prototype.p_AddItem2=function(t_dataItem){
	this.m_values.p_AddLast2(t_dataItem);
}
c_JSONArray.prototype.p_ObjectEnumerator=function(){
	return this.m_values.p_ObjectEnumerator();
}
c_JSONArray.prototype.p_ToString=function(){
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*2+5);
	var t_first=true;
	t_retString.p_AddString("[");
	var t_=this.m_values.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_v=t_.p_NextObject();
		if(t_first){
			t_first=false;
		}else{
			t_retString.p_AddString(",");
		}
		t_retString.p_AddString(t_v.p_ToString());
	}
	t_retString.p_AddString("]");
	return t_retString.p_ToString();
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	return this;
}
c_List.prototype.p_AddLast2=function(t_data){
	return c_Node3.m_new.call(new c_Node3,this.m__head,this.m__head.m__pred,t_data);
}
c_List.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast2(t_t);
	}
	return this;
}
c_List.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
c_List.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
function c_Node3(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node3.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
function c_HeadNode(){
	c_Node3.call(this);
}
c_HeadNode.prototype=extend_class(c_Node3);
c_HeadNode.m_new=function(){
	c_Node3.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_StringBuilder(){
	Object.call(this);
	this.m_retStrings=[];
	this.m_index=0;
}
c_StringBuilder.m_new=function(t_initialSize){
	if(t_initialSize<1){
		t_initialSize=1;
	}
	this.m_retStrings=new_string_array(t_initialSize);
	return this;
}
c_StringBuilder.prototype.p_AddString=function(t_add){
	if(this.m_index==this.m_retStrings.length){
		this.m_retStrings=resize_string_array(this.m_retStrings,this.m_retStrings.length*2);
	}
	this.m_retStrings[this.m_index]=t_add;
	this.m_index+=1;
}
c_StringBuilder.prototype.p_ToString=function(){
	if(this.m_index<2){
		return this.m_retStrings[0];
	}else{
		return this.m_retStrings.slice(0,this.m_index).join("");
	}
}
function c_JSONFloat(){
	c_JSONDataItem.call(this);
	this.m_value=.0;
	this.m_unparsedStr="";
	this.m_unparsed=false;
}
c_JSONFloat.prototype=extend_class(c_JSONDataItem);
c_JSONFloat.m_new=function(t_value){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=3;
	this.m_value=t_value;
	return this;
}
c_JSONFloat.m_new2=function(t_unparsedStr){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=3;
	this.m_unparsedStr=t_unparsedStr;
	this.m_unparsed=true;
	return this;
}
c_JSONFloat.m_new3=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONFloat.prototype.p_Parse=function(){
	if(this.m_unparsed){
		this.m_value=parseFloat(this.m_unparsedStr);
		this.m_unparsed=false;
	}
}
c_JSONFloat.prototype.p_ToInt=function(){
	this.p_Parse();
	return ((this.m_value)|0);
}
c_JSONFloat.prototype.p_ToFloat=function(){
	this.p_Parse();
	return this.m_value;
}
c_JSONFloat.prototype.p_ToString=function(){
	this.p_Parse();
	return String(this.m_value);
}
function c_JSONInteger(){
	c_JSONDataItem.call(this);
	this.m_value=0;
}
c_JSONInteger.prototype=extend_class(c_JSONDataItem);
c_JSONInteger.m_new=function(t_value){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=4;
	this.m_value=t_value;
	return this;
}
c_JSONInteger.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONInteger.prototype.p_ToInt=function(){
	return this.m_value;
}
c_JSONInteger.prototype.p_ToFloat=function(){
	return (this.m_value);
}
c_JSONInteger.prototype.p_ToString=function(){
	return String(this.m_value);
}
function c_JSONBool(){
	c_JSONDataItem.call(this);
	this.m_value=false;
}
c_JSONBool.prototype=extend_class(c_JSONDataItem);
c_JSONBool.m_new=function(t_value){
	c_JSONDataItem.m_new.call(this);
	this.m_dataType=6;
	this.m_value=t_value;
	return this;
}
c_JSONBool.m_new2=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONBool.prototype.p_ToBool=function(){
	return this.m_value;
}
c_JSONBool.prototype.p_ToString=function(){
	if(this.m_value){
		return "True";
	}else{
		return "False";
	}
}
function c_JSONNull(){
	c_JSONDataItem.call(this);
}
c_JSONNull.prototype=extend_class(c_JSONDataItem);
c_JSONNull.m_new=function(){
	c_JSONDataItem.m_new.call(this);
	return this;
}
c_JSONNull.prototype.p_ToString=function(){
	this.m_dataType=7;
	return "NULL";
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.m_new=function(){
	return this;
}
c_List2.prototype.p_AddLast3=function(t_data){
	return c_Node4.m_new.call(new c_Node4,this.m__head,this.m__head.m__pred,t_data);
}
c_List2.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast3(t_t);
	}
	return this;
}
c_List2.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List2.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
}
c_List2.prototype.p_ToArray=function(){
	var t_arr=new_number_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_FloatList(){
	c_List2.call(this);
}
c_FloatList.prototype=extend_class(c_List2);
c_FloatList.m_new=function(t_data){
	c_List2.m_new2.call(this,t_data);
	return this;
}
c_FloatList.m_new2=function(){
	c_List2.m_new.call(this);
	return this;
}
function c_Node4(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=0;
}
c_Node4.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
function c_HeadNode2(){
	c_Node4.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node4);
c_HeadNode2.m_new=function(){
	c_Node4.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator2(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator2.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator2.m_new2=function(){
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator2.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Constants(){
	Object.call(this);
}
function c_Brick(){
	Object.call(this);
	this.m_body=null;
	this.m_polygon=[];
}
c_Brick.m_new=function(t_body,t_polygon){
	this.m_body=t_body;
	this.m_polygon=t_polygon;
	return this;
}
c_Brick.m_new2=function(){
	return this;
}
c_Brick.prototype.p_OnRender=function(){
	bb_graphics_PushMatrix();
	bb_graphics_Translate(bb_glue_MetersToPixels(this.m_body.p_GetWorldCenter().m_x),bb_glue_MetersToPixels(this.m_body.p_GetWorldCenter().m_y));
	bb_graphics_Rotate(-bb_glue_RadiansToDegrees(this.m_body.p_GetAngle()));
	bb_graphics_DrawPoly(this.m_polygon);
	if(this.m_body.p_GetType()!=0){
		bb_graphics_Scale(0.9,0.9);
		bb_graphics_SetColor(100.0,60.0,10.0);
		bb_graphics_DrawPoly(this.m_polygon);
		bb_graphics_SetColor(255.0,255.0,255.0);
	}
	bb_graphics_PopMatrix();
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	return this;
}
c_List3.prototype.p_AddLast4=function(t_data){
	return c_Node5.m_new.call(new c_Node5,this.m__head,this.m__head.m__pred,t_data);
}
c_List3.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast4(t_t);
	}
	return this;
}
c_List3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator5.m_new.call(new c_Enumerator5,this);
}
function c_Node5(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node5.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node5.m_new2=function(){
	return this;
}
function c_HeadNode3(){
	c_Node5.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node5);
c_HeadNode3.m_new=function(){
	c_Node5.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function bb_rubeloader_LoadRube(t_path,t__world){
	var t_data=object_downcast((c_JSONData.m_ReadJSON(bb_app_LoadString(t_path))),c_JSONObject);
	var t_bodies=object_downcast((t_data.p_GetItem("body")),c_JSONArray);
	var t_=t_bodies.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_datum=t_.p_NextObject();
		var t_bodyData=object_downcast((t_datum),c_JSONObject);
		var t_bodyDef=c_b2BodyDef.m_new.call(new c_b2BodyDef);
		var t_bodyType=t_bodyData.p_GetItem3("type",0);
		var t_1=t_bodyType;
		if(t_1==0){
			t_bodyDef.m_type=0;
		}else{
			if(t_1==1){
				t_bodyDef.m_type=1;
			}else{
				if(t_1==2){
					t_bodyDef.m_type=2;
				}
			}
		}
		var t_body=t__world.p_CreateBody2(t_bodyDef);
		var t_fixtures=object_downcast((t_bodyData.p_GetItem("fixture")),c_JSONArray);
		var t_2=t_fixtures.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_datum2=t_2.p_NextObject();
			var t_fixtureData=object_downcast((t_datum2),c_JSONObject);
			var t_fixtureDef=c_b2FixtureDef.m_new.call(new c_b2FixtureDef);
			t_fixtureDef.m_density=0.5;
			t_fixtureDef.m_friction=0.3;
			t_fixtureDef.m_restitution=0.0;
			var t_shapeData=object_downcast((t_fixtureData.p_GetItem("polygon")),c_JSONObject);
			var t_verticesData=object_downcast((t_shapeData.p_GetItem("vertices")),c_JSONObject);
			var t_xData=object_downcast((t_verticesData.p_GetItem("x")),c_JSONArray);
			var t_yData=object_downcast((t_verticesData.p_GetItem("y")),c_JSONArray);
			var t_xList=c_FloatList.m_new2.call(new c_FloatList);
			var t_yList=c_FloatList.m_new2.call(new c_FloatList);
			var t_3=t_xData.p_ObjectEnumerator();
			while(t_3.p_HasNext()){
				var t_datum3=t_3.p_NextObject();
				t_xList.p_AddLast3(t_datum3.p_ToFloat()+10.666666666666666);
			}
			var t_4=t_yData.p_ObjectEnumerator();
			while(t_4.p_HasNext()){
				var t_datum32=t_4.p_NextObject();
				t_yList.p_AddLast3(t_datum32.p_ToFloat()+16.0);
			}
			var t_xArray=t_xList.p_ToArray();
			var t_yArray=t_yList.p_ToArray();
			var t_b2Vec2Array=new_object_array(t_xArray.length);
			for(var t_n=0;t_n<t_xArray.length;t_n=t_n+1){
				t_b2Vec2Array[t_n]=c_b2Vec2.m_new.call(new c_b2Vec2,t_xArray[t_n],t_yArray[t_n]);
			}
			var t_shapeDef=c_b2PolygonShape.m_new.call(new c_b2PolygonShape);
			t_shapeDef.p_SetAsArray(t_b2Vec2Array,(t_xArray.length));
			t_fixtureDef.m_shape=(t_shapeDef);
			t_body.p_CreateFixture(t_fixtureDef);
			var t_polygon=new_number_array(t_xArray.length*2);
			for(var t_n2=0;t_n2<t_xArray.length;t_n2=t_n2+1){
				var t_xCenter=t_body.p_GetWorldCenter().m_x;
				var t_yCenter=t_body.p_GetWorldCenter().m_y;
				t_polygon[t_n2*2]=(t_xArray[t_n2]-t_xCenter)*30.0;
				t_polygon[t_n2*2+1]=(t_yArray[t_n2]-t_yCenter)*30.0;
			}
			bb_main_APP.m_bricks.p_AddLast4(c_Brick.m_new.call(new c_Brick,t_body,t_polygon));
		}
	}
}
function c_b2CircleShape(){
	c_b2Shape.call(this);
	this.m_m_p=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2CircleShape.prototype=extend_class(c_b2Shape);
c_b2CircleShape.m_new=function(t_radius){
	c_b2Shape.m_new.call(this);
	this.m_m_type=0;
	this.m_m_radius=t_radius;
	return this;
}
c_b2CircleShape.prototype.p_SetLocalPosition=function(t_position){
	this.m_m_p.p_SetV(t_position);
}
c_b2CircleShape.prototype.p_Copy=function(){
	var t_s=(c_b2CircleShape.m_new.call(new c_b2CircleShape,this.m_m_radius));
	t_s.p_Set5(this);
	return t_s;
}
c_b2CircleShape.prototype.p_Set5=function(t_other){
	c_b2Shape.prototype.p_Set5.call(this,t_other);
	if((object_downcast((t_other),c_b2CircleShape))!=null){
		var t_other2=object_downcast((t_other),c_b2CircleShape);
		this.m_m_p.p_SetV(t_other2.m_m_p);
	}
}
c_b2CircleShape.prototype.p_ComputeAABB=function(t_aabb,t_transform){
	var t_tMat=t_transform.m_R;
	var t_pX=t_transform.m_position.m_x+(t_tMat.m_col1.m_x*this.m_m_p.m_x+t_tMat.m_col2.m_x*this.m_m_p.m_y);
	var t_pY=t_transform.m_position.m_y+(t_tMat.m_col1.m_y*this.m_m_p.m_x+t_tMat.m_col2.m_y*this.m_m_p.m_y);
	t_aabb.m_lowerBound.p_Set2(t_pX-this.m_m_radius,t_pY-this.m_m_radius);
	t_aabb.m_upperBound.p_Set2(t_pX+this.m_m_radius,t_pY+this.m_m_radius);
}
c_b2CircleShape.prototype.p_ComputeMass=function(t_massData,t_density){
	t_massData.m_mass=t_density*3.14159265*this.m_m_radius*this.m_m_radius;
	t_massData.m_center.p_SetV(this.m_m_p);
	t_massData.m_I=t_massData.m_mass*(0.5*this.m_m_radius*this.m_m_radius+(this.m_m_p.m_x*this.m_m_p.m_x+this.m_m_p.m_y*this.m_m_p.m_y));
}
function c_b2JointDef(){
	Object.call(this);
	this.m_type=0;
	this.m_userData=null;
	this.m_bodyA=null;
	this.m_bodyB=null;
	this.m_collideConnected=false;
}
c_b2JointDef.m_new=function(){
	this.m_type=0;
	this.m_userData=null;
	this.m_bodyA=null;
	this.m_bodyB=null;
	this.m_collideConnected=false;
	return this;
}
function c_b2RevoluteJointDef(){
	c_b2JointDef.call(this);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_referenceAngle=.0;
	this.m_lowerAngle=.0;
	this.m_upperAngle=.0;
	this.m_maxMotorTorque=.0;
	this.m_motorSpeed=.0;
	this.m_enableLimit=false;
	this.m_enableMotor=false;
}
c_b2RevoluteJointDef.prototype=extend_class(c_b2JointDef);
c_b2RevoluteJointDef.m_new=function(){
	c_b2JointDef.m_new.call(this);
	this.m_type=1;
	this.m_localAnchorA.p_Set2(0.0,0.0);
	this.m_localAnchorB.p_Set2(0.0,0.0);
	this.m_referenceAngle=0.0;
	this.m_lowerAngle=0.0;
	this.m_upperAngle=0.0;
	this.m_maxMotorTorque=0.0;
	this.m_motorSpeed=0.0;
	this.m_enableLimit=false;
	this.m_enableMotor=false;
	return this;
}
function bb_glue_DegreesToRadians(t_degrees){
	return t_degrees*3.1415/180.0;
}
function c_b2DistanceJoint(){
	c_b2Joint.call(this);
	this.m_m_localAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_length=.0;
	this.m_m_frequencyHz=.0;
	this.m_m_dampingRatio=.0;
	this.m_m_impulse=.0;
	this.m_m_gamma=.0;
	this.m_m_bias=.0;
	this.m_m_u=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_mass=.0;
}
c_b2DistanceJoint.prototype=extend_class(c_b2Joint);
c_b2DistanceJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	var t_tMat=null;
	var t_tX=.0;
	var t_tY=.0;
	this.m_m_localAnchor1.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchor2.p_SetV(t_def.m_localAnchorB);
	this.m_m_length=t_def.m_Length;
	this.m_m_frequencyHz=t_def.m_frequencyHz;
	this.m_m_dampingRatio=t_def.m_dampingRatio;
	this.m_m_impulse=0.0;
	this.m_m_gamma=0.0;
	this.m_m_bias=0.0;
	return this;
}
c_b2DistanceJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2DistanceJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_tMat=null;
	var t_tX=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	this.m_m_u.m_x=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
	this.m_m_u.m_y=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	var t_length=Math.sqrt(this.m_m_u.m_x*this.m_m_u.m_x+this.m_m_u.m_y*this.m_m_u.m_y);
	if(t_length>0.005){
		this.m_m_u.p_Multiply(1.0/t_length);
	}else{
		this.m_m_u.p_SetZero();
	}
	var t_cr1u=t_r1X*this.m_m_u.m_y-t_r1Y*this.m_m_u.m_x;
	var t_cr2u=t_r2X*this.m_m_u.m_y-t_r2Y*this.m_m_u.m_x;
	var t_invMass=t_bA.m_m_invMass+t_bA.m_m_invI*t_cr1u*t_cr1u+t_bB.m_m_invMass+t_bB.m_m_invI*t_cr2u*t_cr2u;
	if(t_invMass!=0.0){
		this.m_m_mass=1.0/t_invMass;
	}else{
		this.m_m_mass=0.0;
	}
	if(this.m_m_frequencyHz>0.0){
		var t_C=t_length-this.m_m_length;
		var t_omega=6.2831853000000004*this.m_m_frequencyHz;
		var t_d=2.0*this.m_m_mass*this.m_m_dampingRatio*t_omega;
		var t_k=this.m_m_mass*t_omega*t_omega;
		this.m_m_gamma=t_timeStep.m_dt*(t_d+t_timeStep.m_dt*t_k);
		if(this.m_m_gamma!=0.0){
			this.m_m_gamma=1.0/this.m_m_gamma;
		}else{
			this.m_m_gamma=0.0;
		}
		this.m_m_bias=t_C*t_timeStep.m_dt*t_k*this.m_m_gamma;
		this.m_m_mass=t_invMass+this.m_m_gamma;
		if(this.m_m_mass!=0.0){
			this.m_m_mass=1.0/this.m_m_mass;
		}else{
			this.m_m_mass=0.0;
		}
	}
	if(t_timeStep.m_warmStarting){
		this.m_m_impulse*=t_timeStep.m_dtRatio;
		var t_PX=this.m_m_impulse*this.m_m_u.m_x;
		var t_PY=this.m_m_impulse*this.m_m_u.m_y;
		t_bA.m_m_linearVelocity.m_x-=t_bA.m_m_invMass*t_PX;
		t_bA.m_m_linearVelocity.m_y-=t_bA.m_m_invMass*t_PY;
		t_bA.m_m_angularVelocity-=t_bA.m_m_invI*(t_r1X*t_PY-t_r1Y*t_PX);
		t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_PX;
		t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_PY;
		t_bB.m_m_angularVelocity+=t_bB.m_m_invI*(t_r2X*t_PY-t_r2Y*t_PX);
	}else{
		this.m_m_impulse=0.0;
	}
}
c_b2DistanceJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_tMat=null;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	var t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_v1X=t_bA.m_m_linearVelocity.m_x+-t_bA.m_m_angularVelocity*t_r1Y;
	var t_v1Y=t_bA.m_m_linearVelocity.m_y+t_bA.m_m_angularVelocity*t_r1X;
	var t_v2X=t_bB.m_m_linearVelocity.m_x+-t_bB.m_m_angularVelocity*t_r2Y;
	var t_v2Y=t_bB.m_m_linearVelocity.m_y+t_bB.m_m_angularVelocity*t_r2X;
	var t_Cdot=this.m_m_u.m_x*(t_v2X-t_v1X)+this.m_m_u.m_y*(t_v2Y-t_v1Y);
	var t_impulse=-this.m_m_mass*(t_Cdot+this.m_m_bias+this.m_m_gamma*this.m_m_impulse);
	this.m_m_impulse+=t_impulse;
	var t_PX=t_impulse*this.m_m_u.m_x;
	var t_PY=t_impulse*this.m_m_u.m_y;
	t_bA.m_m_linearVelocity.m_x-=t_bA.m_m_invMass*t_PX;
	t_bA.m_m_linearVelocity.m_y-=t_bA.m_m_invMass*t_PY;
	t_bA.m_m_angularVelocity-=t_bA.m_m_invI*(t_r1X*t_PY-t_r1Y*t_PX);
	t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_PX;
	t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_PY;
	t_bB.m_m_angularVelocity+=t_bB.m_m_invI*(t_r2X*t_PY-t_r2Y*t_PX);
}
c_b2DistanceJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_tMat=null;
	if(this.m_m_frequencyHz>0.0){
		return true;
	}
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	var t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_dX=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
	var t_dY=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	var t_length=Math.sqrt(t_dX*t_dX+t_dY*t_dY);
	t_dX/=t_length;
	t_dY/=t_length;
	var t_C=t_length-this.m_m_length;
	t_C=c_b2Math.m_Clamp(t_C,-0.2,0.2);
	var t_impulse=-this.m_m_mass*t_C;
	this.m_m_u.p_Set2(t_dX,t_dY);
	var t_PX=t_impulse*this.m_m_u.m_x;
	var t_PY=t_impulse*this.m_m_u.m_y;
	t_bA.m_m_sweep.m_c.m_x-=t_bA.m_m_invMass*t_PX;
	t_bA.m_m_sweep.m_c.m_y-=t_bA.m_m_invMass*t_PY;
	t_bA.m_m_sweep.m_a-=t_bA.m_m_invI*(t_r1X*t_PY-t_r1Y*t_PX);
	t_bB.m_m_sweep.m_c.m_x+=t_bB.m_m_invMass*t_PX;
	t_bB.m_m_sweep.m_c.m_y+=t_bB.m_m_invMass*t_PY;
	t_bB.m_m_sweep.m_a+=t_bB.m_m_invI*(t_r2X*t_PY-t_r2Y*t_PX);
	t_bA.p_SynchronizeTransform();
	t_bB.p_SynchronizeTransform();
	return c_b2Math.m_Abs(t_C)<0.005;
}
function c_b2DistanceJointDef(){
	c_b2JointDef.call(this);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_Length=.0;
	this.m_frequencyHz=.0;
	this.m_dampingRatio=.0;
}
c_b2DistanceJointDef.prototype=extend_class(c_b2JointDef);
function c_b2MouseJoint(){
	c_b2Joint.call(this);
	this.m_m_target=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_maxForce=.0;
	this.m_m_impulse=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_frequencyHz=.0;
	this.m_m_dampingRatio=.0;
	this.m_m_beta=.0;
	this.m_m_gamma=.0;
	this.m_K1=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_K2=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_K=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_m_mass=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_m_C=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2MouseJoint.prototype=extend_class(c_b2Joint);
c_b2MouseJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	this.m_m_target.p_SetV(t_def.m_target);
	var t_tX=this.m_m_target.m_x-this.m_m_bodyB.m_m_xf.m_position.m_x;
	var t_tY=this.m_m_target.m_y-this.m_m_bodyB.m_m_xf.m_position.m_y;
	var t_tMat=this.m_m_bodyB.m_m_xf.m_R;
	this.m_m_localAnchor.m_x=t_tX*t_tMat.m_col1.m_x+t_tY*t_tMat.m_col1.m_y;
	this.m_m_localAnchor.m_y=t_tX*t_tMat.m_col2.m_x+t_tY*t_tMat.m_col2.m_y;
	this.m_m_maxForce=t_def.m_maxForce;
	this.m_m_impulse.p_SetZero();
	this.m_m_frequencyHz=t_def.m_frequencyHz;
	this.m_m_dampingRatio=t_def.m_dampingRatio;
	this.m_m_beta=0.0;
	this.m_m_gamma=0.0;
	return this;
}
c_b2MouseJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2MouseJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_b=this.m_m_bodyB;
	var t_mass=t_b.p_GetMass();
	var t_omega=6.2831853000000004*this.m_m_frequencyHz;
	var t_d=2.0*t_mass*this.m_m_dampingRatio*t_omega;
	var t_k=t_mass*t_omega*t_omega;
	this.m_m_gamma=t_timeStep.m_dt*(t_d+t_timeStep.m_dt*t_k);
	if(this.m_m_gamma!=0.0){
		this.m_m_gamma=1.0/this.m_m_gamma;
	}else{
		this.m_m_gamma=0.0;
	}
	this.m_m_beta=t_timeStep.m_dt*t_k*this.m_m_gamma;
	var t_tMat=null;
	t_tMat=t_b.m_m_xf.m_R;
	var t_rX=this.m_m_localAnchor.m_x-t_b.m_m_sweep.m_localCenter.m_x;
	var t_rY=this.m_m_localAnchor.m_y-t_b.m_m_sweep.m_localCenter.m_y;
	var t_tX=t_tMat.m_col1.m_x*t_rX+t_tMat.m_col2.m_x*t_rY;
	t_rY=t_tMat.m_col1.m_y*t_rX+t_tMat.m_col2.m_y*t_rY;
	t_rX=t_tX;
	var t_invMass=t_b.m_m_invMass;
	var t_invI=t_b.m_m_invI;
	this.m_K1.m_col1.m_x=t_invMass;
	this.m_K1.m_col2.m_x=0.0;
	this.m_K1.m_col1.m_y=0.0;
	this.m_K1.m_col2.m_y=t_invMass;
	this.m_K2.m_col1.m_x=t_invI*t_rY*t_rY;
	this.m_K2.m_col2.m_x=-t_invI*t_rX*t_rY;
	this.m_K2.m_col1.m_y=-t_invI*t_rX*t_rY;
	this.m_K2.m_col2.m_y=t_invI*t_rX*t_rX;
	this.m_K.p_SetM(this.m_K1);
	this.m_K.p_AddM(this.m_K2);
	this.m_K.m_col1.m_x+=this.m_m_gamma;
	this.m_K.m_col2.m_y+=this.m_m_gamma;
	this.m_K.p_GetInverse(this.m_m_mass);
	this.m_m_C.m_x=t_b.m_m_sweep.m_c.m_x+t_rX-this.m_m_target.m_x;
	this.m_m_C.m_y=t_b.m_m_sweep.m_c.m_y+t_rY-this.m_m_target.m_y;
	t_b.m_m_angularVelocity*=0.98;
	this.m_m_impulse.m_x*=t_timeStep.m_dtRatio;
	this.m_m_impulse.m_y*=t_timeStep.m_dtRatio;
	t_b.m_m_linearVelocity.m_x+=t_invMass*this.m_m_impulse.m_x;
	t_b.m_m_linearVelocity.m_y+=t_invMass*this.m_m_impulse.m_y;
	t_b.m_m_angularVelocity+=t_invI*(t_rX*this.m_m_impulse.m_y-t_rY*this.m_m_impulse.m_x);
}
c_b2MouseJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_b=this.m_m_bodyB;
	var t_tMat=null;
	var t_tX=.0;
	var t_tY=.0;
	t_tMat=t_b.m_m_xf.m_R;
	var t_rX=this.m_m_localAnchor.m_x-t_b.m_m_sweep.m_localCenter.m_x;
	var t_rY=this.m_m_localAnchor.m_y-t_b.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rX+t_tMat.m_col2.m_x*t_rY;
	t_rY=t_tMat.m_col1.m_y*t_rX+t_tMat.m_col2.m_y*t_rY;
	t_rX=t_tX;
	var t_CdotX=t_b.m_m_linearVelocity.m_x+-t_b.m_m_angularVelocity*t_rY;
	var t_CdotY=t_b.m_m_linearVelocity.m_y+t_b.m_m_angularVelocity*t_rX;
	t_tMat=this.m_m_mass;
	t_tX=t_CdotX+this.m_m_beta*this.m_m_C.m_x+this.m_m_gamma*this.m_m_impulse.m_x;
	t_tY=t_CdotY+this.m_m_beta*this.m_m_C.m_y+this.m_m_gamma*this.m_m_impulse.m_y;
	var t_impulseX=-(t_tMat.m_col1.m_x*t_tX+t_tMat.m_col2.m_x*t_tY);
	var t_impulseY=-(t_tMat.m_col1.m_y*t_tX+t_tMat.m_col2.m_y*t_tY);
	var t_oldImpulseX=this.m_m_impulse.m_x;
	var t_oldImpulseY=this.m_m_impulse.m_y;
	this.m_m_impulse.m_x+=t_impulseX;
	this.m_m_impulse.m_y+=t_impulseY;
	var t_maxImpulse=t_timeStep.m_dt*this.m_m_maxForce;
	if(this.m_m_impulse.p_LengthSquared()>t_maxImpulse*t_maxImpulse){
		this.m_m_impulse.p_Multiply(t_maxImpulse/this.m_m_impulse.p_Length());
	}
	t_impulseX=this.m_m_impulse.m_x-t_oldImpulseX;
	t_impulseY=this.m_m_impulse.m_y-t_oldImpulseY;
	t_b.m_m_linearVelocity.m_x+=t_b.m_m_invMass*t_impulseX;
	t_b.m_m_linearVelocity.m_y+=t_b.m_m_invMass*t_impulseY;
	t_b.m_m_angularVelocity+=t_b.m_m_invI*(t_rX*t_impulseY-t_rY*t_impulseX);
}
c_b2MouseJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	return true;
}
function c_b2MouseJointDef(){
	c_b2JointDef.call(this);
	this.m_target=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_maxForce=.0;
	this.m_frequencyHz=.0;
	this.m_dampingRatio=.0;
}
c_b2MouseJointDef.prototype=extend_class(c_b2JointDef);
function c_b2PrismaticJoint(){
	c_b2Joint.call(this);
	this.m_m_localAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localXAxis1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localYAxis1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_refAngle=.0;
	this.m_m_impulse=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_m_motorMass=.0;
	this.m_m_motorImpulse=.0;
	this.m_m_lowerTranslation=.0;
	this.m_m_upperTranslation=.0;
	this.m_m_maxMotorForce=.0;
	this.m_m_motorSpeed=.0;
	this.m_m_enableLimit=false;
	this.m_m_enableMotor=false;
	this.m_m_limitState=0;
	this.m_m_axis=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_perp=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_tmpVec1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_tmpVec2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_a1=.0;
	this.m_m_a2=.0;
	this.m_m_s1=.0;
	this.m_m_s2=.0;
	this.m_m_K=c_b2Mat33.m_new.call(new c_b2Mat33,null,null,null);
}
c_b2PrismaticJoint.prototype=extend_class(c_b2Joint);
c_b2PrismaticJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	var t_tMat=null;
	var t_tX=.0;
	var t_tY=.0;
	this.m_m_localAnchor1.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchor2.p_SetV(t_def.m_localAnchorB);
	this.m_m_localXAxis1.p_SetV(t_def.m_localAxisA);
	this.m_m_localYAxis1.m_x=-this.m_m_localXAxis1.m_y;
	this.m_m_localYAxis1.m_y=this.m_m_localXAxis1.m_x;
	this.m_m_refAngle=t_def.m_referenceAngle;
	this.m_m_impulse.p_SetZero();
	this.m_m_motorMass=0.0;
	this.m_m_motorImpulse=0.0;
	this.m_m_lowerTranslation=t_def.m_lowerTranslation;
	this.m_m_upperTranslation=t_def.m_upperTranslation;
	this.m_m_maxMotorForce=t_def.m_maxMotorForce;
	this.m_m_motorSpeed=t_def.m_motorSpeed;
	this.m_m_enableLimit=t_def.m_enableLimit;
	this.m_m_enableMotor=t_def.m_enableMotor;
	this.m_m_limitState=0;
	this.m_m_axis.p_SetZero();
	this.m_m_perp.p_SetZero();
	return this;
}
c_b2PrismaticJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2PrismaticJoint.prototype.p_GetJointTranslation=function(){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	t_bA.p_GetWorldPoint(this.m_m_localAnchor1,this.m_tmpVec1);
	t_bB.p_GetWorldPoint(this.m_m_localAnchor2,this.m_tmpVec2);
	this.m_tmpVec2.p_Subtract(this.m_tmpVec1);
	t_bA.p_GetWorldVector(this.m_m_localXAxis1,this.m_tmpVec1);
	var t_translation=this.m_tmpVec1.m_x*this.m_tmpVec2.m_x+this.m_tmpVec1.m_y*this.m_tmpVec2.m_y;
	return t_translation;
}
c_b2PrismaticJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	var t_tX=.0;
	this.m_m_localCenterA.p_SetV(t_bA.p_GetLocalCenter());
	this.m_m_localCenterB.p_SetV(t_bB.p_GetLocalCenter());
	var t_xf1=t_bA.p_GetTransform();
	var t_xf2=t_bB.p_GetTransform();
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-this.m_m_localCenterA.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-this.m_m_localCenterA.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-this.m_m_localCenterB.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-this.m_m_localCenterB.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_dX=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
	var t_dY=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	this.m_m_invMassA=t_bA.m_m_invMass;
	this.m_m_invMassB=t_bB.m_m_invMass;
	this.m_m_invIA=t_bA.m_m_invI;
	this.m_m_invIB=t_bB.m_m_invI;
	c_b2Math.m_MulMV(t_xf1.m_R,this.m_m_localXAxis1,this.m_m_axis);
	this.m_m_a1=(t_dX+t_r1X)*this.m_m_axis.m_y-(t_dY+t_r1Y)*this.m_m_axis.m_x;
	this.m_m_a2=t_r2X*this.m_m_axis.m_y-t_r2Y*this.m_m_axis.m_x;
	this.m_m_motorMass=this.m_m_invMassA+this.m_m_invMassB+this.m_m_invIA*this.m_m_a1*this.m_m_a1+this.m_m_invIB*this.m_m_a2*this.m_m_a2;
	if(this.m_m_motorMass>1e-15){
		this.m_m_motorMass=1.0/this.m_m_motorMass;
	}
	c_b2Math.m_MulMV(t_xf1.m_R,this.m_m_localYAxis1,this.m_m_perp);
	this.m_m_s1=(t_dX+t_r1X)*this.m_m_perp.m_y-(t_dY+t_r1Y)*this.m_m_perp.m_x;
	this.m_m_s2=t_r2X*this.m_m_perp.m_y-t_r2Y*this.m_m_perp.m_x;
	var t_m1=this.m_m_invMassA;
	var t_m2=this.m_m_invMassB;
	var t_i1=this.m_m_invIA;
	var t_i2=this.m_m_invIB;
	this.m_m_K.m_col1.m_x=t_m1+t_m2+t_i1*this.m_m_s1*this.m_m_s1+t_i2*this.m_m_s2*this.m_m_s2;
	this.m_m_K.m_col1.m_y=t_i1*this.m_m_s1+t_i2*this.m_m_s2;
	this.m_m_K.m_col1.m_z=t_i1*this.m_m_s1*this.m_m_a1+t_i2*this.m_m_s2*this.m_m_a2;
	this.m_m_K.m_col2.m_x=this.m_m_K.m_col1.m_y;
	this.m_m_K.m_col2.m_y=t_i1+t_i2;
	this.m_m_K.m_col2.m_z=t_i1*this.m_m_a1+t_i2*this.m_m_a2;
	this.m_m_K.m_col3.m_x=this.m_m_K.m_col1.m_z;
	this.m_m_K.m_col3.m_y=this.m_m_K.m_col2.m_z;
	this.m_m_K.m_col3.m_z=t_m1+t_m2+t_i1*this.m_m_a1*this.m_m_a1+t_i2*this.m_m_a2*this.m_m_a2;
	if(this.m_m_enableLimit){
		var t_jointTransition=this.m_m_axis.m_x*t_dX+this.m_m_axis.m_y*t_dY;
		if(c_b2Math.m_Abs(this.m_m_upperTranslation-this.m_m_lowerTranslation)<0.01){
			this.m_m_limitState=3;
		}else{
			if(t_jointTransition<=this.m_m_lowerTranslation){
				if(this.m_m_limitState!=1){
					this.m_m_limitState=1;
					this.m_m_impulse.m_z=0.0;
				}
			}else{
				if(t_jointTransition>=this.m_m_upperTranslation){
					if(this.m_m_limitState!=2){
						this.m_m_limitState=2;
						this.m_m_impulse.m_z=0.0;
					}
				}else{
					this.m_m_limitState=0;
					this.m_m_impulse.m_z=0.0;
				}
			}
		}
	}else{
		this.m_m_limitState=0;
	}
	if(this.m_m_enableMotor==false){
		this.m_m_motorImpulse=0.0;
	}
	if(t_timeStep.m_warmStarting){
		this.m_m_impulse.m_x*=t_timeStep.m_dtRatio;
		this.m_m_impulse.m_y*=t_timeStep.m_dtRatio;
		this.m_m_motorImpulse*=t_timeStep.m_dtRatio;
		var t_PX=this.m_m_impulse.m_x*this.m_m_perp.m_x+(this.m_m_motorImpulse+this.m_m_impulse.m_z)*this.m_m_axis.m_x;
		var t_PY=this.m_m_impulse.m_x*this.m_m_perp.m_y+(this.m_m_motorImpulse+this.m_m_impulse.m_z)*this.m_m_axis.m_y;
		var t_L1=this.m_m_impulse.m_x*this.m_m_s1+this.m_m_impulse.m_y+(this.m_m_motorImpulse+this.m_m_impulse.m_z)*this.m_m_a1;
		var t_L2=this.m_m_impulse.m_x*this.m_m_s2+this.m_m_impulse.m_y+(this.m_m_motorImpulse+this.m_m_impulse.m_z)*this.m_m_a2;
		t_bA.m_m_linearVelocity.m_x-=this.m_m_invMassA*t_PX;
		t_bA.m_m_linearVelocity.m_y-=this.m_m_invMassA*t_PY;
		t_bA.m_m_angularVelocity-=this.m_m_invIA*t_L1;
		t_bB.m_m_linearVelocity.m_x+=this.m_m_invMassB*t_PX;
		t_bB.m_m_linearVelocity.m_y+=this.m_m_invMassB*t_PY;
		t_bB.m_m_angularVelocity+=this.m_m_invIB*t_L2;
	}else{
		this.m_m_impulse.p_SetZero();
		this.m_m_motorImpulse=0.0;
	}
}
c_b2PrismaticJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_v1=t_bA.m_m_linearVelocity;
	var t_w1=t_bA.m_m_angularVelocity;
	var t_v2=t_bB.m_m_linearVelocity;
	var t_w2=t_bB.m_m_angularVelocity;
	var t_PX=.0;
	var t_PY=.0;
	var t_L1=.0;
	var t_L2=.0;
	if(this.m_m_enableMotor && this.m_m_limitState!=3){
		var t_Cdot=this.m_m_axis.m_x*(t_v2.m_x-t_v1.m_x)+this.m_m_axis.m_y*(t_v2.m_y-t_v1.m_y)+this.m_m_a2*t_w2-this.m_m_a1*t_w1;
		var t_impulse=this.m_m_motorMass*(this.m_m_motorSpeed-t_Cdot);
		var t_oldImpulse=this.m_m_motorImpulse;
		var t_maxImpulse=t_timeStep.m_dt*this.m_m_maxMotorForce;
		this.m_m_motorImpulse=c_b2Math.m_Clamp(this.m_m_motorImpulse+t_impulse,-t_maxImpulse,t_maxImpulse);
		t_impulse=this.m_m_motorImpulse-t_oldImpulse;
		t_PX=t_impulse*this.m_m_axis.m_x;
		t_PY=t_impulse*this.m_m_axis.m_y;
		t_L1=t_impulse*this.m_m_a1;
		t_L2=t_impulse*this.m_m_a2;
		t_v1.m_x-=this.m_m_invMassA*t_PX;
		t_v1.m_y-=this.m_m_invMassA*t_PY;
		t_w1-=this.m_m_invIA*t_L1;
		t_v2.m_x+=this.m_m_invMassB*t_PX;
		t_v2.m_y+=this.m_m_invMassB*t_PY;
		t_w2+=this.m_m_invIB*t_L2;
	}
	var t_Cdot1X=this.m_m_perp.m_x*(t_v2.m_x-t_v1.m_x)+this.m_m_perp.m_y*(t_v2.m_y-t_v1.m_y)+this.m_m_s2*t_w2-this.m_m_s1*t_w1;
	var t_Cdot1Y=t_w2-t_w1;
	if(this.m_m_enableLimit && this.m_m_limitState!=0){
		var t_Cdot2=this.m_m_axis.m_x*(t_v2.m_x-t_v1.m_x)+this.m_m_axis.m_y*(t_v2.m_y-t_v1.m_y)+this.m_m_a2*t_w2-this.m_m_a1*t_w1;
		var t_f1=this.m_m_impulse.p_Copy();
		var t_df=this.m_m_K.p_Solve33(c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0),-t_Cdot1X,-t_Cdot1Y,-t_Cdot2);
		this.m_m_impulse.p_Add2(t_df);
		if(this.m_m_limitState==1){
			this.m_m_impulse.m_z=c_b2Math.m_Max(this.m_m_impulse.m_z,0.0);
		}else{
			if(this.m_m_limitState==2){
				this.m_m_impulse.m_z=c_b2Math.m_Min(this.m_m_impulse.m_z,0.0);
			}
		}
		var t_bX=-t_Cdot1X-(this.m_m_impulse.m_z-t_f1.m_z)*this.m_m_K.m_col3.m_x;
		var t_bY=-t_Cdot1Y-(this.m_m_impulse.m_z-t_f1.m_z)*this.m_m_K.m_col3.m_y;
		var t_f2r=this.m_m_K.p_Solve22(c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0),t_bX,t_bY);
		t_f2r.m_x+=t_f1.m_x;
		t_f2r.m_y+=t_f1.m_y;
		this.m_m_impulse.m_x=t_f2r.m_x;
		this.m_m_impulse.m_y=t_f2r.m_y;
		t_df.m_x=this.m_m_impulse.m_x-t_f1.m_x;
		t_df.m_y=this.m_m_impulse.m_y-t_f1.m_y;
		t_df.m_z=this.m_m_impulse.m_z-t_f1.m_z;
		t_PX=t_df.m_x*this.m_m_perp.m_x+t_df.m_z*this.m_m_axis.m_x;
		t_PY=t_df.m_x*this.m_m_perp.m_y+t_df.m_z*this.m_m_axis.m_y;
		t_L1=t_df.m_x*this.m_m_s1+t_df.m_y+t_df.m_z*this.m_m_a1;
		t_L2=t_df.m_x*this.m_m_s2+t_df.m_y+t_df.m_z*this.m_m_a2;
		t_v1.m_x-=this.m_m_invMassA*t_PX;
		t_v1.m_y-=this.m_m_invMassA*t_PY;
		t_w1-=this.m_m_invIA*t_L1;
		t_v2.m_x+=this.m_m_invMassB*t_PX;
		t_v2.m_y+=this.m_m_invMassB*t_PY;
		t_w2+=this.m_m_invIB*t_L2;
	}else{
		var t_df2=this.m_m_K.p_Solve22(c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0),-t_Cdot1X,-t_Cdot1Y);
		this.m_m_impulse.m_x+=t_df2.m_x;
		this.m_m_impulse.m_y+=t_df2.m_y;
		t_PX=t_df2.m_x*this.m_m_perp.m_x;
		t_PY=t_df2.m_x*this.m_m_perp.m_y;
		t_L1=t_df2.m_x*this.m_m_s1+t_df2.m_y;
		t_L2=t_df2.m_x*this.m_m_s2+t_df2.m_y;
		t_v1.m_x-=this.m_m_invMassA*t_PX;
		t_v1.m_y-=this.m_m_invMassA*t_PY;
		t_w1-=this.m_m_invIA*t_L1;
		t_v2.m_x+=this.m_m_invMassB*t_PX;
		t_v2.m_y+=this.m_m_invMassB*t_PY;
		t_w2+=this.m_m_invIB*t_L2;
	}
	t_bA.m_m_linearVelocity.p_SetV(t_v1);
	t_bA.m_m_angularVelocity=t_w1;
	t_bB.m_m_linearVelocity.p_SetV(t_v2);
	t_bB.m_m_angularVelocity=t_w2;
}
c_b2PrismaticJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_limitC=.0;
	var t_oldLimitImpulse=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_c1=t_bA.m_m_sweep.m_c;
	var t_a1=t_bA.m_m_sweep.m_a;
	var t_c2=t_bB.m_m_sweep.m_c;
	var t_a2=t_bB.m_m_sweep.m_a;
	var t_tMat=null;
	var t_tX=.0;
	var t_m1=.0;
	var t_m2=.0;
	var t_i1=.0;
	var t_i2=.0;
	var t_linearError=0.0;
	var t_angularError=0.0;
	var t_active=false;
	var t_C22=0.0;
	var t_R1=c_b2Mat22.m_FromAngle(t_a1);
	var t_R2=c_b2Mat22.m_FromAngle(t_a2);
	t_tMat=t_R1;
	var t_r1X=this.m_m_localAnchor1.m_x-this.m_m_localCenterA.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-this.m_m_localCenterA.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_R2;
	var t_r2X=this.m_m_localAnchor2.m_x-this.m_m_localCenterB.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-this.m_m_localCenterB.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_dX=t_c2.m_x+t_r2X-t_c1.m_x-t_r1X;
	var t_dY=t_c2.m_y+t_r2Y-t_c1.m_y-t_r1Y;
	if(this.m_m_enableLimit){
		c_b2Math.m_MulMV(t_R1,this.m_m_localXAxis1,this.m_m_axis);
		this.m_m_a1=(t_dX+t_r1X)*this.m_m_axis.m_y-(t_dY+t_r1Y)*this.m_m_axis.m_x;
		this.m_m_a2=t_r2X*this.m_m_axis.m_y-t_r2Y*this.m_m_axis.m_x;
		var t_translation=this.m_m_axis.m_x*t_dX+this.m_m_axis.m_y*t_dY;
		if(c_b2Math.m_Abs(this.m_m_upperTranslation-this.m_m_lowerTranslation)<0.01){
			t_C22=c_b2Math.m_Clamp(t_translation,-0.2,0.2);
			t_linearError=c_b2Math.m_Abs(t_translation);
			t_active=true;
		}else{
			if(t_translation<=this.m_m_lowerTranslation){
				t_C22=c_b2Math.m_Clamp(t_translation-this.m_m_lowerTranslation+0.005,-0.2,0.0);
				t_linearError=this.m_m_lowerTranslation-t_translation;
				t_active=true;
			}else{
				if(t_translation>=this.m_m_upperTranslation){
					t_C22=c_b2Math.m_Clamp(t_translation-this.m_m_upperTranslation+0.005,0.0,0.2);
					t_linearError=t_translation-this.m_m_upperTranslation;
					t_active=true;
				}
			}
		}
	}
	c_b2Math.m_MulMV(t_R1,this.m_m_localYAxis1,this.m_m_perp);
	this.m_m_s1=(t_dX+t_r1X)*this.m_m_perp.m_y-(t_dY+t_r1Y)*this.m_m_perp.m_x;
	this.m_m_s2=t_r2X*this.m_m_perp.m_y-t_r2Y*this.m_m_perp.m_x;
	var t_impulse=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	var t_C1X=this.m_m_perp.m_x*t_dX+this.m_m_perp.m_y*t_dY;
	var t_C1Y=t_a2-t_a1-this.m_m_refAngle;
	t_linearError=c_b2Math.m_Max(t_linearError,c_b2Math.m_Abs(t_C1X));
	t_angularError=c_b2Math.m_Abs(t_C1Y);
	if(t_active){
		t_m1=this.m_m_invMassA;
		t_m2=this.m_m_invMassB;
		t_i1=this.m_m_invIA;
		t_i2=this.m_m_invIB;
		this.m_m_K.m_col1.m_x=t_m1+t_m2+t_i1*this.m_m_s1*this.m_m_s1+t_i2*this.m_m_s2*this.m_m_s2;
		this.m_m_K.m_col1.m_y=t_i1*this.m_m_s1+t_i2*this.m_m_s2;
		this.m_m_K.m_col1.m_z=t_i1*this.m_m_s1*this.m_m_a1+t_i2*this.m_m_s2*this.m_m_a2;
		this.m_m_K.m_col2.m_x=this.m_m_K.m_col1.m_y;
		this.m_m_K.m_col2.m_y=t_i1+t_i2;
		this.m_m_K.m_col2.m_z=t_i1*this.m_m_a1+t_i2*this.m_m_a2;
		this.m_m_K.m_col3.m_x=this.m_m_K.m_col1.m_z;
		this.m_m_K.m_col3.m_y=this.m_m_K.m_col2.m_z;
		this.m_m_K.m_col3.m_z=t_m1+t_m2+t_i1*this.m_m_a1*this.m_m_a1+t_i2*this.m_m_a2*this.m_m_a2;
		this.m_m_K.p_Solve33(t_impulse,-t_C1X,-t_C1Y,-t_C22);
	}else{
		t_m1=this.m_m_invMassA;
		t_m2=this.m_m_invMassB;
		t_i1=this.m_m_invIA;
		t_i2=this.m_m_invIB;
		var t_k11=t_m1+t_m2+t_i1*this.m_m_s1*this.m_m_s1+t_i2*this.m_m_s2*this.m_m_s2;
		var t_k12=t_i1*this.m_m_s1+t_i2*this.m_m_s2;
		var t_k22=t_i1+t_i2;
		this.m_m_K.m_col1.p_Set9(t_k11,t_k12,0.0);
		this.m_m_K.m_col2.p_Set9(t_k12,t_k22,0.0);
		var t_impulse1=this.m_m_K.p_Solve22(c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0),-t_C1X,-t_C1Y);
		t_impulse.m_x=t_impulse1.m_x;
		t_impulse.m_y=t_impulse1.m_y;
		t_impulse.m_z=0.0;
	}
	var t_PX=t_impulse.m_x*this.m_m_perp.m_x+t_impulse.m_z*this.m_m_axis.m_x;
	var t_PY=t_impulse.m_x*this.m_m_perp.m_y+t_impulse.m_z*this.m_m_axis.m_y;
	var t_L1=t_impulse.m_x*this.m_m_s1+t_impulse.m_y+t_impulse.m_z*this.m_m_a1;
	var t_L2=t_impulse.m_x*this.m_m_s2+t_impulse.m_y+t_impulse.m_z*this.m_m_a2;
	t_c1.m_x-=this.m_m_invMassA*t_PX;
	t_c1.m_y-=this.m_m_invMassA*t_PY;
	t_a1-=this.m_m_invIA*t_L1;
	t_c2.m_x+=this.m_m_invMassB*t_PX;
	t_c2.m_y+=this.m_m_invMassB*t_PY;
	t_a2+=this.m_m_invIB*t_L2;
	t_bA.m_m_sweep.m_a=t_a1;
	t_bB.m_m_sweep.m_a=t_a2;
	t_bA.p_SynchronizeTransform();
	t_bB.p_SynchronizeTransform();
	return t_linearError<=0.005 && t_angularError<=0.034906585000000004;
}
function c_b2PrismaticJointDef(){
	c_b2JointDef.call(this);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAxisA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_referenceAngle=.0;
	this.m_lowerTranslation=.0;
	this.m_upperTranslation=.0;
	this.m_maxMotorForce=.0;
	this.m_motorSpeed=.0;
	this.m_enableLimit=false;
	this.m_enableMotor=false;
}
c_b2PrismaticJointDef.prototype=extend_class(c_b2JointDef);
function c_b2Vec3(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
	this.m_z=.0;
}
c_b2Vec3.m_new=function(t_x,t_y,t_z){
	this.m_x=t_x;
	this.m_y=t_y;
	this.m_z=t_z;
	return this;
}
c_b2Vec3.prototype.p_SetZero=function(){
	this.m_x=0.0;
	this.m_y=0.0;
	this.m_z=0.0;
}
c_b2Vec3.prototype.p_SetV2=function(t_v){
	this.m_x=t_v.m_x;
	this.m_y=t_v.m_y;
	this.m_z=t_v.m_z;
}
c_b2Vec3.prototype.p_Copy=function(){
	return c_b2Vec3.m_new.call(new c_b2Vec3,this.m_x,this.m_y,this.m_z);
}
c_b2Vec3.prototype.p_Add2=function(t_v){
	this.m_x+=t_v.m_x;
	this.m_y+=t_v.m_y;
	this.m_z+=t_v.m_z;
}
c_b2Vec3.prototype.p_Set9=function(t_x,t_y,t_z){
	this.m_x=t_x;
	this.m_y=t_y;
	this.m_z=t_z;
}
function c_b2RevoluteJoint(){
	c_b2Joint.call(this);
	this.m_m_localAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_referenceAngle=.0;
	this.m_m_impulse=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_m_motorImpulse=.0;
	this.m_m_lowerAngle=.0;
	this.m_m_upperAngle=.0;
	this.m_m_maxMotorTorque=.0;
	this.m_m_motorSpeed=.0;
	this.m_m_enableLimit=false;
	this.m_m_enableMotor=false;
	this.m_m_limitState=0;
	this.m_m_mass=c_b2Mat33.m_new.call(new c_b2Mat33,null,null,null);
	this.m_m_motorMass=.0;
	this.m_impulse3=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_reduced=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_impulse2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_K1=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_K2=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_K3=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_K=c_b2Mat22.m_new.call(new c_b2Mat22);
}
c_b2RevoluteJoint.prototype=extend_class(c_b2Joint);
c_b2RevoluteJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	this.m_m_localAnchor1.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchor2.p_SetV(t_def.m_localAnchorB);
	this.m_m_referenceAngle=t_def.m_referenceAngle;
	this.m_m_impulse.p_SetZero();
	this.m_m_motorImpulse=0.0;
	this.m_m_lowerAngle=t_def.m_lowerAngle;
	this.m_m_upperAngle=t_def.m_upperAngle;
	this.m_m_maxMotorTorque=t_def.m_maxMotorTorque;
	this.m_m_motorSpeed=t_def.m_motorSpeed;
	this.m_m_enableLimit=t_def.m_enableLimit;
	this.m_m_enableMotor=t_def.m_enableMotor;
	this.m_m_limitState=0;
	return this;
}
c_b2RevoluteJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2RevoluteJoint.prototype.p_GetJointAngle=function(){
	return this.m_m_bodyB.m_m_sweep.m_a-this.m_m_bodyA.m_m_sweep.m_a-this.m_m_referenceAngle;
}
c_b2RevoluteJoint.prototype.p_GetJointSpeed=function(){
	return this.m_m_bodyB.m_m_angularVelocity-this.m_m_bodyA.m_m_angularVelocity;
}
c_b2RevoluteJoint.prototype.p_SetMotorSpeed=function(t_speed){
	this.m_m_bodyA.p_SetAwake(true);
	this.m_m_bodyB.p_SetAwake(true);
	this.m_m_motorSpeed=t_speed;
}
c_b2RevoluteJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	var t_tX=.0;
	if(this.m_m_enableMotor || this.m_m_enableLimit){
	}
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_m1=t_bA.m_m_invMass;
	var t_m2=t_bB.m_m_invMass;
	var t_i1=t_bA.m_m_invI;
	var t_i2=t_bB.m_m_invI;
	this.m_m_mass.m_col1.m_x=t_m1+t_m2+t_r1Y*t_r1Y*t_i1+t_r2Y*t_r2Y*t_i2;
	this.m_m_mass.m_col2.m_x=-t_r1Y*t_r1X*t_i1-t_r2Y*t_r2X*t_i2;
	this.m_m_mass.m_col3.m_x=-t_r1Y*t_i1-t_r2Y*t_i2;
	this.m_m_mass.m_col1.m_y=this.m_m_mass.m_col2.m_x;
	this.m_m_mass.m_col2.m_y=t_m1+t_m2+t_r1X*t_r1X*t_i1+t_r2X*t_r2X*t_i2;
	this.m_m_mass.m_col3.m_y=t_r1X*t_i1+t_r2X*t_i2;
	this.m_m_mass.m_col1.m_z=this.m_m_mass.m_col3.m_x;
	this.m_m_mass.m_col2.m_z=this.m_m_mass.m_col3.m_y;
	this.m_m_mass.m_col3.m_z=t_i1+t_i2;
	this.m_m_motorMass=1.0/(t_i1+t_i2);
	if(this.m_m_enableMotor==false){
		this.m_m_motorImpulse=0.0;
	}
	if(this.m_m_enableLimit){
		var t_jointAngle=t_bB.m_m_sweep.m_a-t_bA.m_m_sweep.m_a-this.m_m_referenceAngle;
		if(c_b2Math.m_Abs(this.m_m_upperAngle-this.m_m_lowerAngle)<0.069813170000000008){
			this.m_m_limitState=3;
		}else{
			if(t_jointAngle<=this.m_m_lowerAngle){
				if(this.m_m_limitState!=1){
					this.m_m_impulse.m_z=0.0;
				}
				this.m_m_limitState=1;
			}else{
				if(t_jointAngle>=this.m_m_upperAngle){
					if(this.m_m_limitState!=2){
						this.m_m_impulse.m_z=0.0;
					}
					this.m_m_limitState=2;
				}else{
					this.m_m_limitState=0;
					this.m_m_impulse.m_z=0.0;
				}
			}
		}
	}else{
		this.m_m_limitState=0;
	}
	if(t_timeStep.m_warmStarting){
		this.m_m_impulse.m_x*=t_timeStep.m_dtRatio;
		this.m_m_impulse.m_y*=t_timeStep.m_dtRatio;
		this.m_m_motorImpulse*=t_timeStep.m_dtRatio;
		var t_PX=this.m_m_impulse.m_x;
		var t_PY=this.m_m_impulse.m_y;
		t_bA.m_m_linearVelocity.m_x-=t_m1*t_PX;
		t_bA.m_m_linearVelocity.m_y-=t_m1*t_PY;
		t_bA.m_m_angularVelocity-=t_i1*(t_r1X*t_PY-t_r1Y*t_PX+this.m_m_motorImpulse+this.m_m_impulse.m_z);
		t_bB.m_m_linearVelocity.m_x+=t_m2*t_PX;
		t_bB.m_m_linearVelocity.m_y+=t_m2*t_PY;
		t_bB.m_m_angularVelocity+=t_i2*(t_r2X*t_PY-t_r2Y*t_PX+this.m_m_motorImpulse+this.m_m_impulse.m_z);
	}else{
		this.m_m_impulse.p_SetZero();
		this.m_m_motorImpulse=0.0;
	}
}
c_b2RevoluteJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	var t_tX=.0;
	var t_newImpulse=.0;
	var t_r1X=.0;
	var t_r1Y=.0;
	var t_r2X=.0;
	var t_r2Y=.0;
	var t_v1=t_bA.m_m_linearVelocity;
	var t_w1=t_bA.m_m_angularVelocity;
	var t_v2=t_bB.m_m_linearVelocity;
	var t_w2=t_bB.m_m_angularVelocity;
	var t_m1=t_bA.m_m_invMass;
	var t_m2=t_bB.m_m_invMass;
	var t_i1=t_bA.m_m_invI;
	var t_i2=t_bB.m_m_invI;
	if(this.m_m_enableMotor && this.m_m_limitState!=3){
		var t_Cdot=t_w2-t_w1-this.m_m_motorSpeed;
		var t_impulse=this.m_m_motorMass*-t_Cdot;
		var t_oldImpulse=this.m_m_motorImpulse;
		var t_maxImpulse=t_timeStep.m_dt*this.m_m_maxMotorTorque;
		this.m_m_motorImpulse=c_b2Math.m_Clamp(this.m_m_motorImpulse+t_impulse,-t_maxImpulse,t_maxImpulse);
		t_impulse=this.m_m_motorImpulse-t_oldImpulse;
		t_w1-=t_i1*t_impulse;
		t_w2+=t_i2*t_impulse;
	}
	if(this.m_m_enableLimit && this.m_m_limitState!=0){
		t_tMat=t_bA.m_m_xf.m_R;
		t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
		t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
		t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
		t_r1X=t_tX;
		t_tMat=t_bB.m_m_xf.m_R;
		t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
		t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
		t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
		t_r2X=t_tX;
		var t_Cdot1X=t_v2.m_x+t_w2*-t_r2Y-t_v1.m_x-t_w1*-t_r1Y;
		var t_Cdot1Y=t_v2.m_y+t_w2*t_r2X-t_v1.m_y-t_w1*t_r1X;
		var t_Cdot2=t_w2-t_w1;
		this.m_m_mass.p_Solve33(this.m_impulse3,-t_Cdot1X,-t_Cdot1Y,-t_Cdot2);
		if(this.m_m_limitState==3){
			this.m_m_impulse.p_Add2(this.m_impulse3);
		}else{
			if(this.m_m_limitState==1){
				t_newImpulse=this.m_m_impulse.m_z+this.m_impulse3.m_z;
				if(t_newImpulse<0.0){
					this.m_m_mass.p_Solve22(this.m_reduced,-t_Cdot1X,-t_Cdot1Y);
					this.m_impulse3.m_x=this.m_reduced.m_x;
					this.m_impulse3.m_y=this.m_reduced.m_y;
					this.m_impulse3.m_z=-this.m_m_impulse.m_z;
					this.m_m_impulse.m_x+=this.m_reduced.m_x;
					this.m_m_impulse.m_y+=this.m_reduced.m_y;
					this.m_m_impulse.m_z=0.0;
				}
			}else{
				if(this.m_m_limitState==2){
					t_newImpulse=this.m_m_impulse.m_z+this.m_impulse3.m_z;
					if(t_newImpulse>0.0){
						this.m_m_mass.p_Solve22(this.m_reduced,-t_Cdot1X,-t_Cdot1Y);
						this.m_impulse3.m_x=this.m_reduced.m_x;
						this.m_impulse3.m_y=this.m_reduced.m_y;
						this.m_impulse3.m_z=-this.m_m_impulse.m_z;
						this.m_m_impulse.m_x+=this.m_reduced.m_x;
						this.m_m_impulse.m_y+=this.m_reduced.m_y;
						this.m_m_impulse.m_z=0.0;
					}
				}
			}
		}
		t_v1.m_x-=t_m1*this.m_impulse3.m_x;
		t_v1.m_y-=t_m1*this.m_impulse3.m_y;
		t_w1-=t_i1*(t_r1X*this.m_impulse3.m_y-t_r1Y*this.m_impulse3.m_x+this.m_impulse3.m_z);
		t_v2.m_x+=t_m2*this.m_impulse3.m_x;
		t_v2.m_y+=t_m2*this.m_impulse3.m_y;
		t_w2+=t_i2*(t_r2X*this.m_impulse3.m_y-t_r2Y*this.m_impulse3.m_x+this.m_impulse3.m_z);
	}else{
		t_tMat=t_bA.m_m_xf.m_R;
		t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
		t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
		t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
		t_r1X=t_tX;
		t_tMat=t_bB.m_m_xf.m_R;
		t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
		t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
		t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
		t_r2X=t_tX;
		var t_CdotX=t_v2.m_x+t_w2*-t_r2Y-t_v1.m_x-t_w1*-t_r1Y;
		var t_CdotY=t_v2.m_y+t_w2*t_r2X-t_v1.m_y-t_w1*t_r1X;
		this.m_m_mass.p_Solve22(this.m_impulse2,-t_CdotX,-t_CdotY);
		this.m_m_impulse.m_x+=this.m_impulse2.m_x;
		this.m_m_impulse.m_y+=this.m_impulse2.m_y;
		t_v1.m_x-=t_m1*this.m_impulse2.m_x;
		t_v1.m_y-=t_m1*this.m_impulse2.m_y;
		t_w1-=t_i1*(t_r1X*this.m_impulse2.m_y-t_r1Y*this.m_impulse2.m_x);
		t_v2.m_x+=t_m2*this.m_impulse2.m_x;
		t_v2.m_y+=t_m2*this.m_impulse2.m_y;
		t_w2+=t_i2*(t_r2X*this.m_impulse2.m_y-t_r2Y*this.m_impulse2.m_x);
	}
	t_bA.m_m_linearVelocity.p_SetV(t_v1);
	t_bA.m_m_angularVelocity=t_w1;
	t_bB.m_m_linearVelocity.p_SetV(t_v2);
	t_bB.m_m_angularVelocity=t_w2;
}
c_b2RevoluteJoint.m_tImpulse=null;
c_b2RevoluteJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_oldLimitImpulse=.0;
	var t_C=.0;
	var t_tMat=null;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_angularError=0.0;
	var t_positionError=0.0;
	var t_tX=.0;
	var t_impulseX=.0;
	var t_impulseY=.0;
	if(this.m_m_enableLimit && this.m_m_limitState!=0){
		var t_angle=t_bB.m_m_sweep.m_a-t_bA.m_m_sweep.m_a-this.m_m_referenceAngle;
		var t_limitImpulse=0.0;
		if(this.m_m_limitState==3){
			t_C=c_b2Math.m_Clamp(t_angle-this.m_m_lowerAngle,-0.13962634000000002,0.13962634000000002);
			t_limitImpulse=-this.m_m_motorMass*t_C;
			t_angularError=c_b2Math.m_Abs(t_C);
		}else{
			if(this.m_m_limitState==1){
				t_C=t_angle-this.m_m_lowerAngle;
				t_angularError=-t_C;
				t_C=c_b2Math.m_Clamp(t_C+0.034906585000000004,-0.13962634000000002,0.0);
				t_limitImpulse=-this.m_m_motorMass*t_C;
			}else{
				if(this.m_m_limitState==2){
					t_C=t_angle-this.m_m_upperAngle;
					t_angularError=t_C;
					t_C=c_b2Math.m_Clamp(t_C-0.034906585000000004,0.0,0.13962634000000002);
					t_limitImpulse=-this.m_m_motorMass*t_C;
				}
			}
		}
		t_bA.m_m_sweep.m_a-=t_bA.m_m_invI*t_limitImpulse;
		t_bB.m_m_sweep.m_a+=t_bB.m_m_invI*t_limitImpulse;
		t_bA.p_SynchronizeTransform();
		t_bB.p_SynchronizeTransform();
	}
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_CX=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
	var t_CY=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	var t_CLengthSquared=t_CX*t_CX+t_CY*t_CY;
	var t_CLength=Math.sqrt(t_CLengthSquared);
	t_positionError=t_CLength;
	var t_invMass1=t_bA.m_m_invMass;
	var t_invMass2=t_bB.m_m_invMass;
	var t_invI1=t_bA.m_m_invI;
	var t_invI2=t_bB.m_m_invI;
	if(t_CLengthSquared>0.0025000000000000005){
		var t_uX=t_CX/t_CLength;
		var t_uY=t_CY/t_CLength;
		var t_k=t_invMass1+t_invMass2;
		var t_m=1.0/t_k;
		t_impulseX=t_m*-t_CX;
		t_impulseY=t_m*-t_CY;
		t_bA.m_m_sweep.m_c.m_x-=0.5*t_invMass1*t_impulseX;
		t_bA.m_m_sweep.m_c.m_y-=0.5*t_invMass1*t_impulseY;
		t_bB.m_m_sweep.m_c.m_x+=0.5*t_invMass2*t_impulseX;
		t_bB.m_m_sweep.m_c.m_y+=0.5*t_invMass2*t_impulseY;
		t_CX=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
		t_CY=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	}
	this.m_K1.m_col1.m_x=t_invMass1+t_invMass2;
	this.m_K1.m_col2.m_x=0.0;
	this.m_K1.m_col1.m_y=0.0;
	this.m_K1.m_col2.m_y=t_invMass1+t_invMass2;
	this.m_K2.m_col1.m_x=t_invI1*t_r1Y*t_r1Y;
	this.m_K2.m_col2.m_x=-t_invI1*t_r1X*t_r1Y;
	this.m_K2.m_col1.m_y=-t_invI1*t_r1X*t_r1Y;
	this.m_K2.m_col2.m_y=t_invI1*t_r1X*t_r1X;
	this.m_K3.m_col1.m_x=t_invI2*t_r2Y*t_r2Y;
	this.m_K3.m_col2.m_x=-t_invI2*t_r2X*t_r2Y;
	this.m_K3.m_col1.m_y=-t_invI2*t_r2X*t_r2Y;
	this.m_K3.m_col2.m_y=t_invI2*t_r2X*t_r2X;
	this.m_K.p_SetM(this.m_K1);
	this.m_K.p_AddM(this.m_K2);
	this.m_K.p_AddM(this.m_K3);
	this.m_K.p_Solve2(c_b2RevoluteJoint.m_tImpulse,-t_CX,-t_CY);
	t_impulseX=c_b2RevoluteJoint.m_tImpulse.m_x;
	t_impulseY=c_b2RevoluteJoint.m_tImpulse.m_y;
	t_bA.m_m_sweep.m_c.m_x-=t_bA.m_m_invMass*t_impulseX;
	t_bA.m_m_sweep.m_c.m_y-=t_bA.m_m_invMass*t_impulseY;
	t_bA.m_m_sweep.m_a-=t_bA.m_m_invI*(t_r1X*t_impulseY-t_r1Y*t_impulseX);
	t_bB.m_m_sweep.m_c.m_x+=t_bB.m_m_invMass*t_impulseX;
	t_bB.m_m_sweep.m_c.m_y+=t_bB.m_m_invMass*t_impulseY;
	t_bB.m_m_sweep.m_a+=t_bB.m_m_invI*(t_r2X*t_impulseY-t_r2Y*t_impulseX);
	t_bA.p_SynchronizeTransform();
	t_bB.p_SynchronizeTransform();
	return t_positionError<=0.005 && t_angularError<=0.034906585000000004;
}
function c_b2PulleyJoint(){
	c_b2Joint.call(this);
	this.m_m_ground=null;
	this.m_m_groundAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_groundAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_ratio=.0;
	this.m_m_constant=.0;
	this.m_m_maxLength1=.0;
	this.m_m_maxLength2=.0;
	this.m_m_impulse=.0;
	this.m_m_limitImpulse1=.0;
	this.m_m_limitImpulse2=.0;
	this.m_m_u1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_u2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_state=0;
	this.m_m_limitState1=0;
	this.m_m_limitState2=0;
	this.m_m_limitMass1=.0;
	this.m_m_limitMass2=.0;
	this.m_m_pulleyMass=.0;
}
c_b2PulleyJoint.prototype=extend_class(c_b2Joint);
c_b2PulleyJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	var t_tMat=null;
	var t_tX=.0;
	var t_tY=.0;
	this.m_m_ground=this.m_m_bodyA.m_m_world.m_m_groundBody;
	this.m_m_groundAnchor1.m_x=t_def.m_groundAnchorA.m_x-this.m_m_ground.m_m_xf.m_position.m_x;
	this.m_m_groundAnchor1.m_y=t_def.m_groundAnchorA.m_y-this.m_m_ground.m_m_xf.m_position.m_y;
	this.m_m_groundAnchor2.m_x=t_def.m_groundAnchorB.m_x-this.m_m_ground.m_m_xf.m_position.m_x;
	this.m_m_groundAnchor2.m_y=t_def.m_groundAnchorB.m_y-this.m_m_ground.m_m_xf.m_position.m_y;
	this.m_m_localAnchor1.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchor2.p_SetV(t_def.m_localAnchorB);
	this.m_m_ratio=t_def.m_ratio;
	this.m_m_constant=t_def.m_lengthA+this.m_m_ratio*t_def.m_lengthB;
	this.m_m_maxLength1=c_b2Math.m_Min(t_def.m_maxLengthA,this.m_m_constant-this.m_m_ratio*2.0);
	this.m_m_maxLength2=c_b2Math.m_Min(t_def.m_maxLengthB,(this.m_m_constant-2.0)/this.m_m_ratio);
	this.m_m_impulse=0.0;
	this.m_m_limitImpulse1=0.0;
	this.m_m_limitImpulse2=0.0;
	return this;
}
c_b2PulleyJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2PulleyJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	var t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_p1X=t_bA.m_m_sweep.m_c.m_x+t_r1X;
	var t_p1Y=t_bA.m_m_sweep.m_c.m_y+t_r1Y;
	var t_p2X=t_bB.m_m_sweep.m_c.m_x+t_r2X;
	var t_p2Y=t_bB.m_m_sweep.m_c.m_y+t_r2Y;
	var t_s1X=this.m_m_ground.m_m_xf.m_position.m_x+this.m_m_groundAnchor1.m_x;
	var t_s1Y=this.m_m_ground.m_m_xf.m_position.m_y+this.m_m_groundAnchor1.m_y;
	var t_s2X=this.m_m_ground.m_m_xf.m_position.m_x+this.m_m_groundAnchor2.m_x;
	var t_s2Y=this.m_m_ground.m_m_xf.m_position.m_y+this.m_m_groundAnchor2.m_y;
	this.m_m_u1.p_Set2(t_p1X-t_s1X,t_p1Y-t_s1Y);
	this.m_m_u2.p_Set2(t_p2X-t_s2X,t_p2Y-t_s2Y);
	var t_length1=this.m_m_u1.p_Length();
	var t_length2=this.m_m_u2.p_Length();
	if(t_length1>0.005){
		this.m_m_u1.p_Multiply(1.0/t_length1);
	}else{
		this.m_m_u1.p_SetZero();
	}
	if(t_length2>0.005){
		this.m_m_u2.p_Multiply(1.0/t_length2);
	}else{
		this.m_m_u2.p_SetZero();
	}
	var t_C=this.m_m_constant-t_length1-this.m_m_ratio*t_length2;
	if(t_C>0.0){
		this.m_m_state=0;
		this.m_m_impulse=0.0;
	}else{
		this.m_m_state=2;
	}
	if(t_length1<this.m_m_maxLength1){
		this.m_m_limitState1=0;
		this.m_m_limitImpulse1=0.0;
	}else{
		this.m_m_limitState1=2;
	}
	if(t_length2<this.m_m_maxLength2){
		this.m_m_limitState2=0;
		this.m_m_limitImpulse2=0.0;
	}else{
		this.m_m_limitState2=2;
	}
	var t_cr1u1=t_r1X*this.m_m_u1.m_y-t_r1Y*this.m_m_u1.m_x;
	var t_cr2u2=t_r2X*this.m_m_u2.m_y-t_r2Y*this.m_m_u2.m_x;
	this.m_m_limitMass1=t_bA.m_m_invMass+t_bA.m_m_invI*t_cr1u1*t_cr1u1;
	this.m_m_limitMass2=t_bB.m_m_invMass+t_bB.m_m_invI*t_cr2u2*t_cr2u2;
	this.m_m_pulleyMass=this.m_m_limitMass1+this.m_m_ratio*this.m_m_ratio*this.m_m_limitMass2;
	this.m_m_limitMass1=1.0/this.m_m_limitMass1;
	this.m_m_limitMass2=1.0/this.m_m_limitMass2;
	this.m_m_pulleyMass=1.0/this.m_m_pulleyMass;
	if(t_timeStep.m_warmStarting){
		this.m_m_impulse*=t_timeStep.m_dtRatio;
		this.m_m_limitImpulse1*=t_timeStep.m_dtRatio;
		this.m_m_limitImpulse2*=t_timeStep.m_dtRatio;
		var t_P1X2=(-this.m_m_impulse-this.m_m_limitImpulse1)*this.m_m_u1.m_x;
		var t_P1Y2=(-this.m_m_impulse-this.m_m_limitImpulse1)*this.m_m_u1.m_y;
		var t_P2X2=(-this.m_m_ratio*this.m_m_impulse-this.m_m_limitImpulse2)*this.m_m_u2.m_x;
		var t_P2Y2=(-this.m_m_ratio*this.m_m_impulse-this.m_m_limitImpulse2)*this.m_m_u2.m_y;
		t_bA.m_m_linearVelocity.m_x+=t_bA.m_m_invMass*t_P1X2;
		t_bA.m_m_linearVelocity.m_y+=t_bA.m_m_invMass*t_P1Y2;
		t_bA.m_m_angularVelocity+=t_bA.m_m_invI*(t_r1X*t_P1Y2-t_r1Y*t_P1X2);
		t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_P2X2;
		t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_P2Y2;
		t_bB.m_m_angularVelocity+=t_bB.m_m_invI*(t_r2X*t_P2Y2-t_r2Y*t_P2X2);
	}else{
		this.m_m_impulse=0.0;
		this.m_m_limitImpulse1=0.0;
		this.m_m_limitImpulse2=0.0;
	}
}
c_b2PulleyJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	var t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_v1X=.0;
	var t_v1Y=.0;
	var t_v2X=.0;
	var t_v2Y=.0;
	var t_P1X=.0;
	var t_P1Y=.0;
	var t_P2X=.0;
	var t_P2Y=.0;
	var t_Cdot=.0;
	var t_impulse=.0;
	var t_oldImpulse=.0;
	if(this.m_m_state==2){
		t_v1X=t_bA.m_m_linearVelocity.m_x+-t_bA.m_m_angularVelocity*t_r1Y;
		t_v1Y=t_bA.m_m_linearVelocity.m_y+t_bA.m_m_angularVelocity*t_r1X;
		t_v2X=t_bB.m_m_linearVelocity.m_x+-t_bB.m_m_angularVelocity*t_r2Y;
		t_v2Y=t_bB.m_m_linearVelocity.m_y+t_bB.m_m_angularVelocity*t_r2X;
		t_Cdot=-(this.m_m_u1.m_x*t_v1X+this.m_m_u1.m_y*t_v1Y)-this.m_m_ratio*(this.m_m_u2.m_x*t_v2X+this.m_m_u2.m_y*t_v2Y);
		t_impulse=this.m_m_pulleyMass*-t_Cdot;
		t_oldImpulse=this.m_m_impulse;
		this.m_m_impulse=c_b2Math.m_Max(0.0,this.m_m_impulse+t_impulse);
		t_impulse=this.m_m_impulse-t_oldImpulse;
		t_P1X=-t_impulse*this.m_m_u1.m_x;
		t_P1Y=-t_impulse*this.m_m_u1.m_y;
		t_P2X=-this.m_m_ratio*t_impulse*this.m_m_u2.m_x;
		t_P2Y=-this.m_m_ratio*t_impulse*this.m_m_u2.m_y;
		t_bA.m_m_linearVelocity.m_x+=t_bA.m_m_invMass*t_P1X;
		t_bA.m_m_linearVelocity.m_y+=t_bA.m_m_invMass*t_P1Y;
		t_bA.m_m_angularVelocity+=t_bA.m_m_invI*(t_r1X*t_P1Y-t_r1Y*t_P1X);
		t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_P2X;
		t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_P2Y;
		t_bB.m_m_angularVelocity+=t_bB.m_m_invI*(t_r2X*t_P2Y-t_r2Y*t_P2X);
	}
	if(this.m_m_limitState1==2){
		t_v1X=t_bA.m_m_linearVelocity.m_x+-t_bA.m_m_angularVelocity*t_r1Y;
		t_v1Y=t_bA.m_m_linearVelocity.m_y+t_bA.m_m_angularVelocity*t_r1X;
		t_Cdot=-(this.m_m_u1.m_x*t_v1X+this.m_m_u1.m_y*t_v1Y);
		t_impulse=-this.m_m_limitMass1*t_Cdot;
		t_oldImpulse=this.m_m_limitImpulse1;
		this.m_m_limitImpulse1=c_b2Math.m_Max(0.0,this.m_m_limitImpulse1+t_impulse);
		t_impulse=this.m_m_limitImpulse1-t_oldImpulse;
		t_P1X=-t_impulse*this.m_m_u1.m_x;
		t_P1Y=-t_impulse*this.m_m_u1.m_y;
		t_bA.m_m_linearVelocity.m_x+=t_bA.m_m_invMass*t_P1X;
		t_bA.m_m_linearVelocity.m_y+=t_bA.m_m_invMass*t_P1Y;
		t_bA.m_m_angularVelocity+=t_bA.m_m_invI*(t_r1X*t_P1Y-t_r1Y*t_P1X);
	}
	if(this.m_m_limitState2==2){
		t_v2X=t_bB.m_m_linearVelocity.m_x+-t_bB.m_m_angularVelocity*t_r2Y;
		t_v2Y=t_bB.m_m_linearVelocity.m_y+t_bB.m_m_angularVelocity*t_r2X;
		t_Cdot=-(this.m_m_u2.m_x*t_v2X+this.m_m_u2.m_y*t_v2Y);
		t_impulse=-this.m_m_limitMass2*t_Cdot;
		t_oldImpulse=this.m_m_limitImpulse2;
		this.m_m_limitImpulse2=c_b2Math.m_Max(0.0,this.m_m_limitImpulse2+t_impulse);
		t_impulse=this.m_m_limitImpulse2-t_oldImpulse;
		t_P2X=-t_impulse*this.m_m_u2.m_x;
		t_P2Y=-t_impulse*this.m_m_u2.m_y;
		t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_P2X;
		t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_P2Y;
		t_bB.m_m_angularVelocity+=t_bB.m_m_invI*(t_r2X*t_P2Y-t_r2Y*t_P2X);
	}
}
c_b2PulleyJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	var t_s1X=this.m_m_ground.m_m_xf.m_position.m_x+this.m_m_groundAnchor1.m_x;
	var t_s1Y=this.m_m_ground.m_m_xf.m_position.m_y+this.m_m_groundAnchor1.m_y;
	var t_s2X=this.m_m_ground.m_m_xf.m_position.m_x+this.m_m_groundAnchor2.m_x;
	var t_s2Y=this.m_m_ground.m_m_xf.m_position.m_y+this.m_m_groundAnchor2.m_y;
	var t_r1X=.0;
	var t_r1Y=.0;
	var t_r2X=.0;
	var t_r2Y=.0;
	var t_p1X=.0;
	var t_p1Y=.0;
	var t_p2X=.0;
	var t_p2Y=.0;
	var t_length1=.0;
	var t_length2=.0;
	var t_C=.0;
	var t_impulse=.0;
	var t_oldImpulse=.0;
	var t_oldLimitPositionImpulse=.0;
	var t_tX=.0;
	var t_linearError=0.0;
	if(this.m_m_state==2){
		t_tMat=t_bA.m_m_xf.m_R;
		t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
		t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
		t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
		t_r1X=t_tX;
		t_tMat=t_bB.m_m_xf.m_R;
		t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
		t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
		t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
		t_r2X=t_tX;
		t_p1X=t_bA.m_m_sweep.m_c.m_x+t_r1X;
		t_p1Y=t_bA.m_m_sweep.m_c.m_y+t_r1Y;
		t_p2X=t_bB.m_m_sweep.m_c.m_x+t_r2X;
		t_p2Y=t_bB.m_m_sweep.m_c.m_y+t_r2Y;
		this.m_m_u1.p_Set2(t_p1X-t_s1X,t_p1Y-t_s1Y);
		this.m_m_u2.p_Set2(t_p2X-t_s2X,t_p2Y-t_s2Y);
		t_length1=this.m_m_u1.p_Length();
		t_length2=this.m_m_u2.p_Length();
		if(t_length1>0.005){
			this.m_m_u1.p_Multiply(1.0/t_length1);
		}else{
			this.m_m_u1.p_SetZero();
		}
		if(t_length2>0.005){
			this.m_m_u2.p_Multiply(1.0/t_length2);
		}else{
			this.m_m_u2.p_SetZero();
		}
		t_C=this.m_m_constant-t_length1-this.m_m_ratio*t_length2;
		t_linearError=c_b2Math.m_Max(t_linearError,-t_C);
		t_C=c_b2Math.m_Clamp(t_C+0.005,-0.2,0.0);
		t_impulse=-this.m_m_pulleyMass*t_C;
		t_p1X=-t_impulse*this.m_m_u1.m_x;
		t_p1Y=-t_impulse*this.m_m_u1.m_y;
		t_p2X=-this.m_m_ratio*t_impulse*this.m_m_u2.m_x;
		t_p2Y=-this.m_m_ratio*t_impulse*this.m_m_u2.m_y;
		t_bA.m_m_sweep.m_c.m_x+=t_bA.m_m_invMass*t_p1X;
		t_bA.m_m_sweep.m_c.m_y+=t_bA.m_m_invMass*t_p1Y;
		t_bA.m_m_sweep.m_a+=t_bA.m_m_invI*(t_r1X*t_p1Y-t_r1Y*t_p1X);
		t_bB.m_m_sweep.m_c.m_x+=t_bB.m_m_invMass*t_p2X;
		t_bB.m_m_sweep.m_c.m_y+=t_bB.m_m_invMass*t_p2Y;
		t_bB.m_m_sweep.m_a+=t_bB.m_m_invI*(t_r2X*t_p2Y-t_r2Y*t_p2X);
		t_bA.p_SynchronizeTransform();
		t_bB.p_SynchronizeTransform();
	}
	if(this.m_m_limitState1==2){
		t_tMat=t_bA.m_m_xf.m_R;
		t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
		t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
		t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
		t_r1X=t_tX;
		t_p1X=t_bA.m_m_sweep.m_c.m_x+t_r1X;
		t_p1Y=t_bA.m_m_sweep.m_c.m_y+t_r1Y;
		this.m_m_u1.p_Set2(t_p1X-t_s1X,t_p1Y-t_s1Y);
		t_length1=this.m_m_u1.p_Length();
		if(t_length1>0.005){
			this.m_m_u1.m_x*=1.0/t_length1;
			this.m_m_u1.m_y*=1.0/t_length1;
		}else{
			this.m_m_u1.p_SetZero();
		}
		t_C=this.m_m_maxLength1-t_length1;
		t_linearError=c_b2Math.m_Max(t_linearError,-t_C);
		t_C=c_b2Math.m_Clamp(t_C+0.005,-0.2,0.0);
		t_impulse=-this.m_m_limitMass1*t_C;
		t_p1X=-t_impulse*this.m_m_u1.m_x;
		t_p1Y=-t_impulse*this.m_m_u1.m_y;
		t_bA.m_m_sweep.m_c.m_x+=t_bA.m_m_invMass*t_p1X;
		t_bA.m_m_sweep.m_c.m_y+=t_bA.m_m_invMass*t_p1Y;
		t_bA.m_m_sweep.m_a+=t_bA.m_m_invI*(t_r1X*t_p1Y-t_r1Y*t_p1X);
		t_bA.p_SynchronizeTransform();
	}
	if(this.m_m_limitState2==2){
		t_tMat=t_bB.m_m_xf.m_R;
		t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
		t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
		t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
		t_r2X=t_tX;
		t_p2X=t_bB.m_m_sweep.m_c.m_x+t_r2X;
		t_p2Y=t_bB.m_m_sweep.m_c.m_y+t_r2Y;
		this.m_m_u2.p_Set2(t_p2X-t_s2X,t_p2Y-t_s2Y);
		t_length2=this.m_m_u2.p_Length();
		if(t_length2>0.005){
			this.m_m_u2.m_x*=1.0/t_length2;
			this.m_m_u2.m_y*=1.0/t_length2;
		}else{
			this.m_m_u2.p_SetZero();
		}
		t_C=this.m_m_maxLength2-t_length2;
		t_linearError=c_b2Math.m_Max(t_linearError,-t_C);
		t_C=c_b2Math.m_Clamp(t_C+0.005,-0.2,0.0);
		t_impulse=-this.m_m_limitMass2*t_C;
		t_p2X=-t_impulse*this.m_m_u2.m_x;
		t_p2Y=-t_impulse*this.m_m_u2.m_y;
		t_bB.m_m_sweep.m_c.m_x+=t_bB.m_m_invMass*t_p2X;
		t_bB.m_m_sweep.m_c.m_y+=t_bB.m_m_invMass*t_p2Y;
		t_bB.m_m_sweep.m_a+=t_bB.m_m_invI*(t_r2X*t_p2Y-t_r2Y*t_p2X);
		t_bB.p_SynchronizeTransform();
	}
	return t_linearError<0.005;
}
function c_b2PulleyJointDef(){
	c_b2JointDef.call(this);
	this.m_groundAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_groundAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_ratio=.0;
	this.m_lengthA=.0;
	this.m_lengthB=.0;
	this.m_maxLengthA=.0;
	this.m_maxLengthB=.0;
}
c_b2PulleyJointDef.prototype=extend_class(c_b2JointDef);
function c_b2GearJoint(){
	c_b2Joint.call(this);
	this.m_m_revolute1=null;
	this.m_m_prismatic1=null;
	this.m_m_revolute2=null;
	this.m_m_prismatic2=null;
	this.m_m_ground1=null;
	this.m_m_groundAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_ground2=null;
	this.m_m_groundAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_ratio=.0;
	this.m_m_constant=.0;
	this.m_m_impulse=.0;
	this.m_m_J=c_b2Jacobian.m_new.call(new c_b2Jacobian);
	this.m_m_mass=.0;
}
c_b2GearJoint.prototype=extend_class(c_b2Joint);
c_b2GearJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	var t_type1=t_def.m_joint1.m_m_type;
	var t_type2=t_def.m_joint2.m_m_type;
	this.m_m_revolute1=null;
	this.m_m_prismatic1=null;
	this.m_m_revolute2=null;
	this.m_m_prismatic2=null;
	var t_coordinate1=.0;
	var t_coordinate2=.0;
	this.m_m_ground1=t_def.m_joint1.p_GetBodyA();
	this.m_m_bodyA=t_def.m_joint1.p_GetBodyB();
	if(t_type1==1){
		this.m_m_revolute1=object_downcast((t_def.m_joint1),c_b2RevoluteJoint);
		this.m_m_groundAnchor1.p_SetV(this.m_m_revolute1.m_m_localAnchor1);
		this.m_m_localAnchor1.p_SetV(this.m_m_revolute1.m_m_localAnchor2);
		t_coordinate1=this.m_m_revolute1.p_GetJointAngle();
	}else{
		this.m_m_prismatic1=object_downcast((t_def.m_joint1),c_b2PrismaticJoint);
		this.m_m_groundAnchor1.p_SetV(this.m_m_prismatic1.m_m_localAnchor1);
		this.m_m_localAnchor1.p_SetV(this.m_m_prismatic1.m_m_localAnchor2);
		t_coordinate1=this.m_m_prismatic1.p_GetJointTranslation();
	}
	this.m_m_ground2=t_def.m_joint2.p_GetBodyA();
	this.m_m_bodyB=t_def.m_joint2.p_GetBodyB();
	if(t_type2==1){
		this.m_m_revolute2=object_downcast((t_def.m_joint2),c_b2RevoluteJoint);
		this.m_m_groundAnchor2.p_SetV(this.m_m_revolute2.m_m_localAnchor1);
		this.m_m_localAnchor2.p_SetV(this.m_m_revolute2.m_m_localAnchor2);
		t_coordinate2=this.m_m_revolute2.p_GetJointAngle();
	}else{
		this.m_m_prismatic2=object_downcast((t_def.m_joint2),c_b2PrismaticJoint);
		this.m_m_groundAnchor2.p_SetV(this.m_m_prismatic2.m_m_localAnchor1);
		this.m_m_localAnchor2.p_SetV(this.m_m_prismatic2.m_m_localAnchor2);
		t_coordinate2=this.m_m_prismatic2.p_GetJointTranslation();
	}
	this.m_m_ratio=t_def.m_ratio;
	this.m_m_constant=t_coordinate1+this.m_m_ratio*t_coordinate2;
	this.m_m_impulse=0.0;
	return this;
}
c_b2GearJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2GearJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_g1=this.m_m_ground1;
	var t_g2=this.m_m_ground2;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_ugX=.0;
	var t_ugY=.0;
	var t_rX=.0;
	var t_rY=.0;
	var t_tMat=null;
	var t_tVec=null;
	var t_crug=.0;
	var t_tX=.0;
	var t_K=0.0;
	this.m_m_J.p_SetZero();
	if((this.m_m_revolute1)!=null){
		this.m_m_J.m_angularA=-1.0;
		t_K+=t_bA.m_m_invI;
	}else{
		t_tMat=t_g1.m_m_xf.m_R;
		t_tVec=this.m_m_prismatic1.m_m_localXAxis1;
		t_ugX=t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
		t_ugY=t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
		t_tMat=t_bA.m_m_xf.m_R;
		t_rX=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
		t_rY=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_rX+t_tMat.m_col2.m_x*t_rY;
		t_rY=t_tMat.m_col1.m_y*t_rX+t_tMat.m_col2.m_y*t_rY;
		t_rX=t_tX;
		t_crug=t_rX*t_ugY-t_rY*t_ugX;
		this.m_m_J.m_linearA.p_Set2(-t_ugX,-t_ugY);
		this.m_m_J.m_angularA=-t_crug;
		t_K+=t_bA.m_m_invMass+t_bA.m_m_invI*t_crug*t_crug;
	}
	if((this.m_m_revolute2)!=null){
		this.m_m_J.m_angularB=-this.m_m_ratio;
		t_K+=this.m_m_ratio*this.m_m_ratio*t_bB.m_m_invI;
	}else{
		t_tMat=t_g2.m_m_xf.m_R;
		t_tVec=this.m_m_prismatic2.m_m_localXAxis1;
		t_ugX=t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
		t_ugY=t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
		t_tMat=t_bB.m_m_xf.m_R;
		t_rX=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
		t_rY=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
		t_tX=t_tMat.m_col1.m_x*t_rX+t_tMat.m_col2.m_x*t_rY;
		t_rY=t_tMat.m_col1.m_y*t_rX+t_tMat.m_col2.m_y*t_rY;
		t_rX=t_tX;
		t_crug=t_rX*t_ugY-t_rY*t_ugX;
		this.m_m_J.m_linearB.p_Set2(-this.m_m_ratio*t_ugX,-this.m_m_ratio*t_ugY);
		this.m_m_J.m_angularB=-this.m_m_ratio*t_crug;
		t_K+=this.m_m_ratio*this.m_m_ratio*(t_bB.m_m_invMass+t_bB.m_m_invI*t_crug*t_crug);
	}
	if(t_K>0.0){
		this.m_m_mass=1.0/t_K;
	}else{
		this.m_m_mass=0.0;
	}
	if(t_timeStep.m_warmStarting){
		t_bA.m_m_linearVelocity.m_x+=t_bA.m_m_invMass*this.m_m_impulse*this.m_m_J.m_linearA.m_x;
		t_bA.m_m_linearVelocity.m_y+=t_bA.m_m_invMass*this.m_m_impulse*this.m_m_J.m_linearA.m_y;
		t_bA.m_m_angularVelocity+=t_bA.m_m_invI*this.m_m_impulse*this.m_m_J.m_angularA;
		t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*this.m_m_impulse*this.m_m_J.m_linearB.m_x;
		t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*this.m_m_impulse*this.m_m_J.m_linearB.m_y;
		t_bB.m_m_angularVelocity+=t_bB.m_m_invI*this.m_m_impulse*this.m_m_J.m_angularB;
	}else{
		this.m_m_impulse=0.0;
	}
}
c_b2GearJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_Cdot=this.m_m_J.p_Compute(t_bA.m_m_linearVelocity,t_bA.m_m_angularVelocity,t_bB.m_m_linearVelocity,t_bB.m_m_angularVelocity);
	var t_impulse=-this.m_m_mass*t_Cdot;
	this.m_m_impulse+=t_impulse;
	t_bA.m_m_linearVelocity.m_x+=t_bA.m_m_invMass*t_impulse*this.m_m_J.m_linearA.m_x;
	t_bA.m_m_linearVelocity.m_y+=t_bA.m_m_invMass*t_impulse*this.m_m_J.m_linearA.m_y;
	t_bA.m_m_angularVelocity+=t_bA.m_m_invI*t_impulse*this.m_m_J.m_angularA;
	t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_impulse*this.m_m_J.m_linearB.m_x;
	t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_impulse*this.m_m_J.m_linearB.m_y;
	t_bB.m_m_angularVelocity+=t_bB.m_m_invI*t_impulse*this.m_m_J.m_angularB;
}
c_b2GearJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_linearError=0.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_coordinate1=.0;
	var t_coordinate2=.0;
	if((this.m_m_revolute1)!=null){
		t_coordinate1=this.m_m_revolute1.p_GetJointAngle();
	}else{
		t_coordinate1=this.m_m_prismatic1.p_GetJointTranslation();
	}
	if((this.m_m_revolute2)!=null){
		t_coordinate2=this.m_m_revolute2.p_GetJointAngle();
	}else{
		t_coordinate2=this.m_m_prismatic2.p_GetJointTranslation();
	}
	var t_C=this.m_m_constant-(t_coordinate1+this.m_m_ratio*t_coordinate2);
	var t_impulse=-this.m_m_mass*t_C;
	t_bA.m_m_sweep.m_c.m_x+=t_bA.m_m_invMass*t_impulse*this.m_m_J.m_linearA.m_x;
	t_bA.m_m_sweep.m_c.m_y+=t_bA.m_m_invMass*t_impulse*this.m_m_J.m_linearA.m_y;
	t_bA.m_m_sweep.m_a+=t_bA.m_m_invI*t_impulse*this.m_m_J.m_angularA;
	t_bB.m_m_sweep.m_c.m_x+=t_bB.m_m_invMass*t_impulse*this.m_m_J.m_linearB.m_x;
	t_bB.m_m_sweep.m_c.m_y+=t_bB.m_m_invMass*t_impulse*this.m_m_J.m_linearB.m_y;
	t_bB.m_m_sweep.m_a+=t_bB.m_m_invI*t_impulse*this.m_m_J.m_angularB;
	t_bA.p_SynchronizeTransform();
	t_bB.p_SynchronizeTransform();
	return t_linearError<0.005;
}
function c_b2GearJointDef(){
	c_b2JointDef.call(this);
	this.m_joint1=null;
	this.m_joint2=null;
	this.m_ratio=.0;
}
c_b2GearJointDef.prototype=extend_class(c_b2JointDef);
function c_b2LineJoint(){
	c_b2Joint.call(this);
	this.m_m_localAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localXAxis1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localYAxis1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_impulse=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_motorMass=.0;
	this.m_m_motorImpulse=.0;
	this.m_m_lowerTranslation=.0;
	this.m_m_upperTranslation=.0;
	this.m_m_maxMotorForce=.0;
	this.m_m_motorSpeed=.0;
	this.m_m_enableLimit=false;
	this.m_m_enableMotor=false;
	this.m_m_limitState=0;
	this.m_m_axis=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_perp=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_a1=.0;
	this.m_m_a2=.0;
	this.m_m_s1=.0;
	this.m_m_s2=.0;
	this.m_m_K=c_b2Mat22.m_new.call(new c_b2Mat22);
}
c_b2LineJoint.prototype=extend_class(c_b2Joint);
c_b2LineJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	var t_tMat=null;
	var t_tX=.0;
	var t_tY=.0;
	this.m_m_localAnchor1.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchor2.p_SetV(t_def.m_localAnchorB);
	this.m_m_localXAxis1.p_SetV(t_def.m_localAxisA);
	this.m_m_localYAxis1.m_x=-this.m_m_localXAxis1.m_y;
	this.m_m_localYAxis1.m_y=this.m_m_localXAxis1.m_x;
	this.m_m_impulse.p_SetZero();
	this.m_m_motorMass=0.0;
	this.m_m_motorImpulse=0.0;
	this.m_m_lowerTranslation=t_def.m_lowerTranslation;
	this.m_m_upperTranslation=t_def.m_upperTranslation;
	this.m_m_maxMotorForce=t_def.m_maxMotorForce;
	this.m_m_motorSpeed=t_def.m_motorSpeed;
	this.m_m_enableLimit=t_def.m_enableLimit;
	this.m_m_enableMotor=t_def.m_enableMotor;
	this.m_m_limitState=0;
	this.m_m_axis.p_SetZero();
	this.m_m_perp.p_SetZero();
	return this;
}
c_b2LineJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2LineJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_tMat=null;
	var t_tX=.0;
	this.m_m_localCenterA.p_SetV(t_bA.p_GetLocalCenter());
	this.m_m_localCenterB.p_SetV(t_bB.p_GetLocalCenter());
	var t_xf1=t_bA.p_GetTransform();
	var t_xf2=t_bB.p_GetTransform();
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-this.m_m_localCenterA.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-this.m_m_localCenterA.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-this.m_m_localCenterB.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-this.m_m_localCenterB.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_dX=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
	var t_dY=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	this.m_m_invMassA=t_bA.m_m_invMass;
	this.m_m_invMassB=t_bB.m_m_invMass;
	this.m_m_invIA=t_bA.m_m_invI;
	this.m_m_invIB=t_bB.m_m_invI;
	c_b2Math.m_MulMV(t_xf1.m_R,this.m_m_localXAxis1,this.m_m_axis);
	this.m_m_a1=(t_dX+t_r1X)*this.m_m_axis.m_y-(t_dY+t_r1Y)*this.m_m_axis.m_x;
	this.m_m_a2=t_r2X*this.m_m_axis.m_y-t_r2Y*this.m_m_axis.m_x;
	this.m_m_motorMass=this.m_m_invMassA+this.m_m_invMassB+this.m_m_invIA*this.m_m_a1*this.m_m_a1+this.m_m_invIB*this.m_m_a2*this.m_m_a2;
	if(this.m_m_motorMass>1e-15){
		this.m_m_motorMass=1.0/this.m_m_motorMass;
	}else{
		this.m_m_motorMass=0.0;
	}
	c_b2Math.m_MulMV(t_xf1.m_R,this.m_m_localYAxis1,this.m_m_perp);
	this.m_m_s1=(t_dX+t_r1X)*this.m_m_perp.m_y-(t_dY+t_r1Y)*this.m_m_perp.m_x;
	this.m_m_s2=t_r2X*this.m_m_perp.m_y-t_r2Y*this.m_m_perp.m_x;
	var t_m1=this.m_m_invMassA;
	var t_m2=this.m_m_invMassB;
	var t_i1=this.m_m_invIA;
	var t_i2=this.m_m_invIB;
	this.m_m_K.m_col1.m_x=t_m1+t_m2+t_i1*this.m_m_s1*this.m_m_s1+t_i2*this.m_m_s2*this.m_m_s2;
	this.m_m_K.m_col1.m_y=t_i1*this.m_m_s1*this.m_m_a1+t_i2*this.m_m_s2*this.m_m_a2;
	this.m_m_K.m_col2.m_x=this.m_m_K.m_col1.m_y;
	this.m_m_K.m_col2.m_y=t_m1+t_m2+t_i1*this.m_m_a1*this.m_m_a1+t_i2*this.m_m_a2*this.m_m_a2;
	if(this.m_m_enableLimit){
		var t_jointTransition=this.m_m_axis.m_x*t_dX+this.m_m_axis.m_y*t_dY;
		if(c_b2Math.m_Abs(this.m_m_upperTranslation-this.m_m_lowerTranslation)<0.01){
			this.m_m_limitState=3;
		}else{
			if(t_jointTransition<=this.m_m_lowerTranslation){
				if(this.m_m_limitState!=1){
					this.m_m_limitState=1;
					this.m_m_impulse.m_y=0.0;
				}
			}else{
				if(t_jointTransition>=this.m_m_upperTranslation){
					if(this.m_m_limitState!=2){
						this.m_m_limitState=2;
						this.m_m_impulse.m_y=0.0;
					}
				}else{
					this.m_m_limitState=0;
					this.m_m_impulse.m_y=0.0;
				}
			}
		}
	}else{
		this.m_m_limitState=0;
	}
	if(this.m_m_enableMotor==false){
		this.m_m_motorImpulse=0.0;
	}
	if(t_timeStep.m_warmStarting){
		this.m_m_impulse.m_x*=t_timeStep.m_dtRatio;
		this.m_m_impulse.m_y*=t_timeStep.m_dtRatio;
		this.m_m_motorImpulse*=t_timeStep.m_dtRatio;
		var t_PX=this.m_m_impulse.m_x*this.m_m_perp.m_x+(this.m_m_motorImpulse+this.m_m_impulse.m_y)*this.m_m_axis.m_x;
		var t_PY=this.m_m_impulse.m_x*this.m_m_perp.m_y+(this.m_m_motorImpulse+this.m_m_impulse.m_y)*this.m_m_axis.m_y;
		var t_L1=this.m_m_impulse.m_x*this.m_m_s1+(this.m_m_motorImpulse+this.m_m_impulse.m_y)*this.m_m_a1;
		var t_L2=this.m_m_impulse.m_x*this.m_m_s2+(this.m_m_motorImpulse+this.m_m_impulse.m_y)*this.m_m_a2;
		t_bA.m_m_linearVelocity.m_x-=this.m_m_invMassA*t_PX;
		t_bA.m_m_linearVelocity.m_y-=this.m_m_invMassA*t_PY;
		t_bA.m_m_angularVelocity-=this.m_m_invIA*t_L1;
		t_bB.m_m_linearVelocity.m_x+=this.m_m_invMassB*t_PX;
		t_bB.m_m_linearVelocity.m_y+=this.m_m_invMassB*t_PY;
		t_bB.m_m_angularVelocity+=this.m_m_invIB*t_L2;
	}else{
		this.m_m_impulse.p_SetZero();
		this.m_m_motorImpulse=0.0;
	}
}
c_b2LineJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_v1=t_bA.m_m_linearVelocity;
	var t_w1=t_bA.m_m_angularVelocity;
	var t_v2=t_bB.m_m_linearVelocity;
	var t_w2=t_bB.m_m_angularVelocity;
	var t_PX=.0;
	var t_PY=.0;
	var t_L1=.0;
	var t_L2=.0;
	if(this.m_m_enableMotor && this.m_m_limitState!=3){
		var t_Cdot=this.m_m_axis.m_x*(t_v2.m_x-t_v1.m_x)+this.m_m_axis.m_y*(t_v2.m_y-t_v1.m_y)+this.m_m_a2*t_w2-this.m_m_a1*t_w1;
		var t_impulse=this.m_m_motorMass*(this.m_m_motorSpeed-t_Cdot);
		var t_oldImpulse=this.m_m_motorImpulse;
		var t_maxImpulse=t_timeStep.m_dt*this.m_m_maxMotorForce;
		this.m_m_motorImpulse=c_b2Math.m_Clamp(this.m_m_motorImpulse+t_impulse,-t_maxImpulse,t_maxImpulse);
		t_impulse=this.m_m_motorImpulse-t_oldImpulse;
		t_PX=t_impulse*this.m_m_axis.m_x;
		t_PY=t_impulse*this.m_m_axis.m_y;
		t_L1=t_impulse*this.m_m_a1;
		t_L2=t_impulse*this.m_m_a2;
		t_v1.m_x-=this.m_m_invMassA*t_PX;
		t_v1.m_y-=this.m_m_invMassA*t_PY;
		t_w1-=this.m_m_invIA*t_L1;
		t_v2.m_x+=this.m_m_invMassB*t_PX;
		t_v2.m_y+=this.m_m_invMassB*t_PY;
		t_w2+=this.m_m_invIB*t_L2;
	}
	var t_Cdot1=this.m_m_perp.m_x*(t_v2.m_x-t_v1.m_x)+this.m_m_perp.m_y*(t_v2.m_y-t_v1.m_y)+this.m_m_s2*t_w2-this.m_m_s1*t_w1;
	if(this.m_m_enableLimit && this.m_m_limitState!=0){
		var t_Cdot2=this.m_m_axis.m_x*(t_v2.m_x-t_v1.m_x)+this.m_m_axis.m_y*(t_v2.m_y-t_v1.m_y)+this.m_m_a2*t_w2-this.m_m_a1*t_w1;
		var t_f1=this.m_m_impulse.p_Copy();
		var t_df=this.m_m_K.p_Solve2(c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0),-t_Cdot1,-t_Cdot2);
		this.m_m_impulse.p_Add(t_df);
		if(this.m_m_limitState==1){
			this.m_m_impulse.m_y=c_b2Math.m_Max(this.m_m_impulse.m_y,0.0);
		}else{
			if(this.m_m_limitState==2){
				this.m_m_impulse.m_y=c_b2Math.m_Min(this.m_m_impulse.m_y,0.0);
			}
		}
		var t_b=-t_Cdot1-(this.m_m_impulse.m_y-t_f1.m_y)*this.m_m_K.m_col2.m_x;
		var t_f2r=.0;
		if(this.m_m_K.m_col1.m_x!=0.0){
			t_f2r=t_b/this.m_m_K.m_col1.m_x+t_f1.m_x;
		}else{
			t_f2r=t_f1.m_x;
		}
		this.m_m_impulse.m_x=t_f2r;
		t_df.m_x=this.m_m_impulse.m_x-t_f1.m_x;
		t_df.m_y=this.m_m_impulse.m_y-t_f1.m_y;
		t_PX=t_df.m_x*this.m_m_perp.m_x+t_df.m_y*this.m_m_axis.m_x;
		t_PY=t_df.m_x*this.m_m_perp.m_y+t_df.m_y*this.m_m_axis.m_y;
		t_L1=t_df.m_x*this.m_m_s1+t_df.m_y*this.m_m_a1;
		t_L2=t_df.m_x*this.m_m_s2+t_df.m_y*this.m_m_a2;
		t_v1.m_x-=this.m_m_invMassA*t_PX;
		t_v1.m_y-=this.m_m_invMassA*t_PY;
		t_w1-=this.m_m_invIA*t_L1;
		t_v2.m_x+=this.m_m_invMassB*t_PX;
		t_v2.m_y+=this.m_m_invMassB*t_PY;
		t_w2+=this.m_m_invIB*t_L2;
	}else{
		var t_df2=.0;
		if(this.m_m_K.m_col1.m_x!=0.0){
			t_df2=-t_Cdot1/this.m_m_K.m_col1.m_x;
		}else{
			t_df2=0.0;
		}
		this.m_m_impulse.m_x+=t_df2;
		t_PX=t_df2*this.m_m_perp.m_x;
		t_PY=t_df2*this.m_m_perp.m_y;
		t_L1=t_df2*this.m_m_s1;
		t_L2=t_df2*this.m_m_s2;
		t_v1.m_x-=this.m_m_invMassA*t_PX;
		t_v1.m_y-=this.m_m_invMassA*t_PY;
		t_w1-=this.m_m_invIA*t_L1;
		t_v2.m_x+=this.m_m_invMassB*t_PX;
		t_v2.m_y+=this.m_m_invMassB*t_PY;
		t_w2+=this.m_m_invIB*t_L2;
	}
	t_bA.m_m_linearVelocity.p_SetV(t_v1);
	t_bA.m_m_angularVelocity=t_w1;
	t_bB.m_m_linearVelocity.p_SetV(t_v2);
	t_bB.m_m_angularVelocity=t_w2;
}
c_b2LineJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_limitC=.0;
	var t_oldLimitImpulse=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_c1=t_bA.m_m_sweep.m_c;
	var t_a1=t_bA.m_m_sweep.m_a;
	var t_c2=t_bB.m_m_sweep.m_c;
	var t_a2=t_bB.m_m_sweep.m_a;
	var t_tMat=null;
	var t_tX=.0;
	var t_m1=.0;
	var t_m2=.0;
	var t_i1=.0;
	var t_i2=.0;
	var t_linearError=0.0;
	var t_angularError=0.0;
	var t_active=false;
	var t_C22=0.0;
	var t_R1=c_b2Mat22.m_FromAngle(t_a1);
	var t_R2=c_b2Mat22.m_FromAngle(t_a2);
	t_tMat=t_R1;
	var t_r1X=this.m_m_localAnchor1.m_x-this.m_m_localCenterA.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-this.m_m_localCenterA.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_R2;
	var t_r2X=this.m_m_localAnchor2.m_x-this.m_m_localCenterB.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-this.m_m_localCenterB.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_dX=t_c2.m_x+t_r2X-t_c1.m_x-t_r1X;
	var t_dY=t_c2.m_y+t_r2Y-t_c1.m_y-t_r1Y;
	if(this.m_m_enableLimit){
		c_b2Math.m_MulMV(t_R1,this.m_m_localXAxis1,this.m_m_axis);
		this.m_m_a1=(t_dX+t_r1X)*this.m_m_axis.m_y-(t_dY+t_r1Y)*this.m_m_axis.m_x;
		this.m_m_a2=t_r2X*this.m_m_axis.m_y-t_r2Y*this.m_m_axis.m_x;
		var t_translation=this.m_m_axis.m_x*t_dX+this.m_m_axis.m_y*t_dY;
		if(c_b2Math.m_Abs(this.m_m_upperTranslation-this.m_m_lowerTranslation)<0.01){
			t_C22=c_b2Math.m_Clamp(t_translation,-0.2,0.2);
			t_linearError=c_b2Math.m_Abs(t_translation);
			t_active=true;
		}else{
			if(t_translation<=this.m_m_lowerTranslation){
				t_C22=c_b2Math.m_Clamp(t_translation-this.m_m_lowerTranslation+0.005,-0.2,0.0);
				t_linearError=this.m_m_lowerTranslation-t_translation;
				t_active=true;
			}else{
				if(t_translation>=this.m_m_upperTranslation){
					t_C22=c_b2Math.m_Clamp(t_translation-this.m_m_upperTranslation+0.005,0.0,0.2);
					t_linearError=t_translation-this.m_m_upperTranslation;
					t_active=true;
				}
			}
		}
	}
	c_b2Math.m_MulMV(t_R1,this.m_m_localYAxis1,this.m_m_perp);
	this.m_m_s1=(t_dX+t_r1X)*this.m_m_perp.m_y-(t_dY+t_r1Y)*this.m_m_perp.m_x;
	this.m_m_s2=t_r2X*this.m_m_perp.m_y-t_r2Y*this.m_m_perp.m_x;
	var t_impulse=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	var t_C12=this.m_m_perp.m_x*t_dX+this.m_m_perp.m_y*t_dY;
	t_linearError=c_b2Math.m_Max(t_linearError,c_b2Math.m_Abs(t_C12));
	t_angularError=0.0;
	if(t_active){
		t_m1=this.m_m_invMassA;
		t_m2=this.m_m_invMassB;
		t_i1=this.m_m_invIA;
		t_i2=this.m_m_invIB;
		this.m_m_K.m_col1.m_x=t_m1+t_m2+t_i1*this.m_m_s1*this.m_m_s1+t_i2*this.m_m_s2*this.m_m_s2;
		this.m_m_K.m_col1.m_y=t_i1*this.m_m_s1*this.m_m_a1+t_i2*this.m_m_s2*this.m_m_a2;
		this.m_m_K.m_col2.m_x=this.m_m_K.m_col1.m_y;
		this.m_m_K.m_col2.m_y=t_m1+t_m2+t_i1*this.m_m_a1*this.m_m_a1+t_i2*this.m_m_a2*this.m_m_a2;
		this.m_m_K.p_Solve2(t_impulse,-t_C12,-t_C22);
	}else{
		t_m1=this.m_m_invMassA;
		t_m2=this.m_m_invMassB;
		t_i1=this.m_m_invIA;
		t_i2=this.m_m_invIB;
		var t_k11=t_m1+t_m2+t_i1*this.m_m_s1*this.m_m_s1+t_i2*this.m_m_s2*this.m_m_s2;
		var t_impulse1=.0;
		if(t_k11!=0.0){
			t_impulse1=-t_C12/t_k11;
		}else{
			t_impulse1=0.0;
		}
		t_impulse.m_x=t_impulse1;
		t_impulse.m_y=0.0;
	}
	var t_PX=t_impulse.m_x*this.m_m_perp.m_x+t_impulse.m_y*this.m_m_axis.m_x;
	var t_PY=t_impulse.m_x*this.m_m_perp.m_y+t_impulse.m_y*this.m_m_axis.m_y;
	var t_L1=t_impulse.m_x*this.m_m_s1+t_impulse.m_y*this.m_m_a1;
	var t_L2=t_impulse.m_x*this.m_m_s2+t_impulse.m_y*this.m_m_a2;
	t_c1.m_x-=this.m_m_invMassA*t_PX;
	t_c1.m_y-=this.m_m_invMassA*t_PY;
	t_a1-=this.m_m_invIA*t_L1;
	t_c2.m_x+=this.m_m_invMassB*t_PX;
	t_c2.m_y+=this.m_m_invMassB*t_PY;
	t_a2+=this.m_m_invIB*t_L2;
	t_bA.m_m_sweep.m_a=t_a1;
	t_bB.m_m_sweep.m_a=t_a2;
	t_bA.p_SynchronizeTransform();
	t_bB.p_SynchronizeTransform();
	return t_linearError<=0.005 && t_angularError<=0.034906585000000004;
}
function c_b2LineJointDef(){
	c_b2JointDef.call(this);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAxisA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_lowerTranslation=.0;
	this.m_upperTranslation=.0;
	this.m_maxMotorForce=.0;
	this.m_motorSpeed=.0;
	this.m_enableLimit=false;
	this.m_enableMotor=false;
}
c_b2LineJointDef.prototype=extend_class(c_b2JointDef);
function c_b2WeldJoint(){
	c_b2Joint.call(this);
	this.m_m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_referenceAngle=.0;
	this.m_m_impulse=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_m_mass=c_b2Mat33.m_new.call(new c_b2Mat33,null,null,null);
}
c_b2WeldJoint.prototype=extend_class(c_b2Joint);
c_b2WeldJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	this.m_m_localAnchorA.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchorB.p_SetV(t_def.m_localAnchorB);
	this.m_m_referenceAngle=t_def.m_referenceAngle;
	this.m_m_impulse.p_SetZero();
	this.m_m_mass=c_b2Mat33.m_new.call(new c_b2Mat33,null,null,null);
	return this;
}
c_b2WeldJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2WeldJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_tMat=null;
	var t_tX=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_rAX=this.m_m_localAnchorA.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_rAY=this.m_m_localAnchorA.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rAX+t_tMat.m_col2.m_x*t_rAY;
	t_rAY=t_tMat.m_col1.m_y*t_rAX+t_tMat.m_col2.m_y*t_rAY;
	t_rAX=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_rBX=this.m_m_localAnchorB.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_rBY=this.m_m_localAnchorB.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rBX+t_tMat.m_col2.m_x*t_rBY;
	t_rBY=t_tMat.m_col1.m_y*t_rBX+t_tMat.m_col2.m_y*t_rBY;
	t_rBX=t_tX;
	var t_mA=t_bA.m_m_invMass;
	var t_mB=t_bB.m_m_invMass;
	var t_iA=t_bA.m_m_invI;
	var t_iB=t_bB.m_m_invI;
	this.m_m_mass.m_col1.m_x=t_mA+t_mB+t_rAY*t_rAY*t_iA+t_rBY*t_rBY*t_iB;
	this.m_m_mass.m_col2.m_x=-t_rAY*t_rAX*t_iA-t_rBY*t_rBX*t_iB;
	this.m_m_mass.m_col3.m_x=-t_rAY*t_iA-t_rBY*t_iB;
	this.m_m_mass.m_col1.m_y=this.m_m_mass.m_col2.m_x;
	this.m_m_mass.m_col2.m_y=t_mA+t_mB+t_rAX*t_rAX*t_iA+t_rBX*t_rBX*t_iB;
	this.m_m_mass.m_col3.m_y=t_rAX*t_iA+t_rBX*t_iB;
	this.m_m_mass.m_col1.m_z=this.m_m_mass.m_col3.m_x;
	this.m_m_mass.m_col2.m_z=this.m_m_mass.m_col3.m_y;
	this.m_m_mass.m_col3.m_z=t_iA+t_iB;
	if(t_timeStep.m_warmStarting){
		this.m_m_impulse.m_x*=t_timeStep.m_dtRatio;
		this.m_m_impulse.m_y*=t_timeStep.m_dtRatio;
		this.m_m_impulse.m_z*=t_timeStep.m_dtRatio;
		t_bA.m_m_linearVelocity.m_x-=t_mA*this.m_m_impulse.m_x;
		t_bA.m_m_linearVelocity.m_y-=t_mA*this.m_m_impulse.m_y;
		t_bA.m_m_angularVelocity-=t_iA*(t_rAX*this.m_m_impulse.m_y-t_rAY*this.m_m_impulse.m_x+this.m_m_impulse.m_z);
		t_bB.m_m_linearVelocity.m_x+=t_mB*this.m_m_impulse.m_x;
		t_bB.m_m_linearVelocity.m_y+=t_mB*this.m_m_impulse.m_y;
		t_bB.m_m_angularVelocity+=t_iB*(t_rBX*this.m_m_impulse.m_y-t_rBY*this.m_m_impulse.m_x+this.m_m_impulse.m_z);
	}else{
		this.m_m_impulse.p_SetZero();
	}
}
c_b2WeldJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_tMat=null;
	var t_tX=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_vA=t_bA.m_m_linearVelocity;
	var t_wA=t_bA.m_m_angularVelocity;
	var t_vB=t_bB.m_m_linearVelocity;
	var t_wB=t_bB.m_m_angularVelocity;
	var t_mA=t_bA.m_m_invMass;
	var t_mB=t_bB.m_m_invMass;
	var t_iA=t_bA.m_m_invI;
	var t_iB=t_bB.m_m_invI;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_rAX=this.m_m_localAnchorA.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_rAY=this.m_m_localAnchorA.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rAX+t_tMat.m_col2.m_x*t_rAY;
	t_rAY=t_tMat.m_col1.m_y*t_rAX+t_tMat.m_col2.m_y*t_rAY;
	t_rAX=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_rBX=this.m_m_localAnchorB.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_rBY=this.m_m_localAnchorB.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rBX+t_tMat.m_col2.m_x*t_rBY;
	t_rBY=t_tMat.m_col1.m_y*t_rBX+t_tMat.m_col2.m_y*t_rBY;
	t_rBX=t_tX;
	var t_Cdot1X=t_vB.m_x-t_wB*t_rBY-t_vA.m_x+t_wA*t_rAY;
	var t_Cdot1Y=t_vB.m_y+t_wB*t_rBX-t_vA.m_y-t_wA*t_rAX;
	var t_Cdot2=t_wB-t_wA;
	var t_impulse=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_m_mass.p_Solve33(t_impulse,-t_Cdot1X,-t_Cdot1Y,-t_Cdot2);
	this.m_m_impulse.p_Add2(t_impulse);
	t_vA.m_x-=t_mA*t_impulse.m_x;
	t_vA.m_y-=t_mA*t_impulse.m_y;
	t_wA-=t_iA*(t_rAX*t_impulse.m_y-t_rAY*t_impulse.m_x+t_impulse.m_z);
	t_vB.m_x+=t_mB*t_impulse.m_x;
	t_vB.m_y+=t_mB*t_impulse.m_y;
	t_wB+=t_iB*(t_rBX*t_impulse.m_y-t_rBY*t_impulse.m_x+t_impulse.m_z);
	t_bA.m_m_angularVelocity=t_wA;
	t_bB.m_m_angularVelocity=t_wB;
}
c_b2WeldJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_tMat=null;
	var t_tX=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_rAX=this.m_m_localAnchorA.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_rAY=this.m_m_localAnchorA.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rAX+t_tMat.m_col2.m_x*t_rAY;
	t_rAY=t_tMat.m_col1.m_y*t_rAX+t_tMat.m_col2.m_y*t_rAY;
	t_rAX=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_rBX=this.m_m_localAnchorB.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_rBY=this.m_m_localAnchorB.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rBX+t_tMat.m_col2.m_x*t_rBY;
	t_rBY=t_tMat.m_col1.m_y*t_rBX+t_tMat.m_col2.m_y*t_rBY;
	t_rBX=t_tX;
	var t_mA=t_bA.m_m_invMass;
	var t_mB=t_bB.m_m_invMass;
	var t_iA=t_bA.m_m_invI;
	var t_iB=t_bB.m_m_invI;
	var t_C1X=t_bB.m_m_sweep.m_c.m_x+t_rBX-t_bA.m_m_sweep.m_c.m_x-t_rAX;
	var t_C1Y=t_bB.m_m_sweep.m_c.m_y+t_rBY-t_bA.m_m_sweep.m_c.m_y-t_rAY;
	var t_C2=t_bB.m_m_sweep.m_a-t_bA.m_m_sweep.m_a-this.m_m_referenceAngle;
	var t_k_allowedStretch=0.050000000000000003;
	var t_positionError=Math.sqrt(t_C1X*t_C1X+t_C1Y*t_C1Y);
	var t_angularError=c_b2Math.m_Abs(t_C2);
	if(t_positionError>t_k_allowedStretch){
		t_iA*=1.0;
		t_iB*=1.0;
	}
	this.m_m_mass.m_col1.m_x=t_mA+t_mB+t_rAY*t_rAY*t_iA+t_rBY*t_rBY*t_iB;
	this.m_m_mass.m_col2.m_x=-t_rAY*t_rAX*t_iA-t_rBY*t_rBX*t_iB;
	this.m_m_mass.m_col3.m_x=-t_rAY*t_iA-t_rBY*t_iB;
	this.m_m_mass.m_col1.m_y=this.m_m_mass.m_col2.m_x;
	this.m_m_mass.m_col2.m_y=t_mA+t_mB+t_rAX*t_rAX*t_iA+t_rBX*t_rBX*t_iB;
	this.m_m_mass.m_col3.m_y=t_rAX*t_iA+t_rBX*t_iB;
	this.m_m_mass.m_col1.m_z=this.m_m_mass.m_col3.m_x;
	this.m_m_mass.m_col2.m_z=this.m_m_mass.m_col3.m_y;
	this.m_m_mass.m_col3.m_z=t_iA+t_iB;
	var t_impulse=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_m_mass.p_Solve33(t_impulse,-t_C1X,-t_C1Y,-t_C2);
	t_bA.m_m_sweep.m_c.m_x-=t_mA*t_impulse.m_x;
	t_bA.m_m_sweep.m_c.m_y-=t_mA*t_impulse.m_y;
	t_bA.m_m_sweep.m_a-=t_iA*(t_rAX*t_impulse.m_y-t_rAY*t_impulse.m_x+t_impulse.m_z);
	t_bB.m_m_sweep.m_c.m_x+=t_mB*t_impulse.m_x;
	t_bB.m_m_sweep.m_c.m_y+=t_mB*t_impulse.m_y;
	t_bB.m_m_sweep.m_a+=t_iB*(t_rBX*t_impulse.m_y-t_rBY*t_impulse.m_x+t_impulse.m_z);
	t_bA.p_SynchronizeTransform();
	t_bB.p_SynchronizeTransform();
	return t_positionError<=0.005 && t_angularError<=0.034906585000000004;
}
function c_b2WeldJointDef(){
	c_b2JointDef.call(this);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_referenceAngle=.0;
}
c_b2WeldJointDef.prototype=extend_class(c_b2JointDef);
function c_b2Mat33(){
	Object.call(this);
	this.m_col1=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_col2=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
	this.m_col3=c_b2Vec3.m_new.call(new c_b2Vec3,0.0,0.0,0.0);
}
c_b2Mat33.m_new=function(t_c1,t_c2,t_c3){
	if(!((t_c1)!=null) && !((t_c2)!=null) && !((t_c3)!=null)){
		this.m_col1.p_SetZero();
		this.m_col2.p_SetZero();
		this.m_col3.p_SetZero();
	}else{
		this.m_col1.p_SetV2(t_c1);
		this.m_col2.p_SetV2(t_c2);
		this.m_col3.p_SetV2(t_c3);
	}
	return this;
}
c_b2Mat33.prototype.p_Solve33=function(t_out,t_bX,t_bY,t_bZ){
	var t_a11=this.m_col1.m_x;
	var t_a21=this.m_col1.m_y;
	var t_a31=this.m_col1.m_z;
	var t_a12=this.m_col2.m_x;
	var t_a22=this.m_col2.m_y;
	var t_a32=this.m_col2.m_z;
	var t_a13=this.m_col3.m_x;
	var t_a23=this.m_col3.m_y;
	var t_a33=this.m_col3.m_z;
	var t_det=t_a11*(t_a22*t_a33-t_a32*t_a23)+t_a21*(t_a32*t_a13-t_a12*t_a33)+t_a31*(t_a12*t_a23-t_a22*t_a13);
	if(t_det!=0.0){
		t_det=1.0/t_det;
	}
	t_out.m_x=t_det*(t_bX*(t_a22*t_a33-t_a32*t_a23)+t_bY*(t_a32*t_a13-t_a12*t_a33)+t_bZ*(t_a12*t_a23-t_a22*t_a13));
	t_out.m_y=t_det*(t_a11*(t_bY*t_a33-t_bZ*t_a23)+t_a21*(t_bZ*t_a13-t_bX*t_a33)+t_a31*(t_bX*t_a23-t_bY*t_a13));
	t_out.m_z=t_det*(t_a11*(t_a22*t_bZ-t_a32*t_bY)+t_a21*(t_a32*t_bX-t_a12*t_bZ)+t_a31*(t_a12*t_bY-t_a22*t_bX));
	return t_out;
}
c_b2Mat33.prototype.p_Solve22=function(t_out,t_bX,t_bY){
	var t_a11=this.m_col1.m_x;
	var t_a12=this.m_col2.m_x;
	var t_a21=this.m_col1.m_y;
	var t_a22=this.m_col2.m_y;
	var t_det=t_a11*t_a22-t_a12*t_a21;
	if(t_det!=0.0){
		t_det=1.0/t_det;
	}
	t_out.m_x=t_det*(t_a22*t_bX-t_a12*t_bY);
	t_out.m_y=t_det*(t_a11*t_bY-t_a21*t_bX);
	return t_out;
}
function c_b2FrictionJoint(){
	c_b2Joint.call(this);
	this.m_m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_linearMass=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_m_angularMass=.0;
	this.m_m_linearImpulse=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_angularImpulse=.0;
	this.m_m_maxForce=.0;
	this.m_m_maxTorque=.0;
}
c_b2FrictionJoint.prototype=extend_class(c_b2Joint);
c_b2FrictionJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	this.m_m_localAnchorA.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchorB.p_SetV(t_def.m_localAnchorB);
	this.m_m_linearMass.p_SetZero();
	this.m_m_angularMass=0.0;
	this.m_m_linearImpulse.p_SetZero();
	this.m_m_angularImpulse=0.0;
	this.m_m_maxForce=t_def.m_maxForce;
	this.m_m_maxTorque=t_def.m_maxTorque;
	return this;
}
c_b2FrictionJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2FrictionJoint.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_tMat=null;
	var t_tX=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_rAX=this.m_m_localAnchorA.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_rAY=this.m_m_localAnchorA.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rAX+t_tMat.m_col2.m_x*t_rAY;
	t_rAY=t_tMat.m_col1.m_y*t_rAX+t_tMat.m_col2.m_y*t_rAY;
	t_rAX=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_rBX=this.m_m_localAnchorB.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_rBY=this.m_m_localAnchorB.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rBX+t_tMat.m_col2.m_x*t_rBY;
	t_rBY=t_tMat.m_col1.m_y*t_rBX+t_tMat.m_col2.m_y*t_rBY;
	t_rBX=t_tX;
	var t_mA=t_bA.m_m_invMass;
	var t_mB=t_bB.m_m_invMass;
	var t_iA=t_bA.m_m_invI;
	var t_iB=t_bB.m_m_invI;
	var t_K=c_b2Mat22.m_new.call(new c_b2Mat22);
	t_K.m_col1.m_x=t_mA+t_mB;
	t_K.m_col2.m_x=0.0;
	t_K.m_col1.m_y=0.0;
	t_K.m_col2.m_y=t_mA+t_mB;
	t_K.m_col1.m_x+=t_iA*t_rAY*t_rAY;
	t_K.m_col2.m_x+=-t_iA*t_rAX*t_rAY;
	t_K.m_col1.m_y+=-t_iA*t_rAX*t_rAY;
	t_K.m_col2.m_y+=t_iA*t_rAX*t_rAX;
	t_K.m_col1.m_x+=t_iB*t_rBY*t_rBY;
	t_K.m_col2.m_x+=-t_iB*t_rBX*t_rBY;
	t_K.m_col1.m_y+=-t_iB*t_rBX*t_rBY;
	t_K.m_col2.m_y+=t_iB*t_rBX*t_rBX;
	t_K.p_GetInverse(this.m_m_linearMass);
	this.m_m_angularMass=t_iA+t_iB;
	if(this.m_m_angularMass>0.0){
		this.m_m_angularMass=1.0/this.m_m_angularMass;
	}
	if(t_timeStep.m_warmStarting){
		this.m_m_linearImpulse.m_x*=t_timeStep.m_dtRatio;
		this.m_m_linearImpulse.m_y*=t_timeStep.m_dtRatio;
		this.m_m_angularImpulse*=t_timeStep.m_dtRatio;
		var t_P=this.m_m_linearImpulse;
		t_bA.m_m_linearVelocity.m_x-=t_mA*t_P.m_x;
		t_bA.m_m_linearVelocity.m_y-=t_mA*t_P.m_y;
		t_bA.m_m_angularVelocity-=t_iA*(t_rAX*t_P.m_y-t_rAY*t_P.m_x+this.m_m_angularImpulse);
		t_bB.m_m_linearVelocity.m_x+=t_mB*t_P.m_x;
		t_bB.m_m_linearVelocity.m_y+=t_mB*t_P.m_y;
		t_bB.m_m_angularVelocity+=t_iB*(t_rBX*t_P.m_y-t_rBY*t_P.m_x+this.m_m_angularImpulse);
	}else{
		this.m_m_linearImpulse.p_SetZero();
		this.m_m_angularImpulse=0.0;
	}
}
c_b2FrictionJoint.prototype.p_SolveVelocityConstraints=function(t_timeStep){
	var t_tMat=null;
	var t_tX=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	var t_vA=t_bA.m_m_linearVelocity;
	var t_wA=t_bA.m_m_angularVelocity;
	var t_vB=t_bB.m_m_linearVelocity;
	var t_wB=t_bB.m_m_angularVelocity;
	var t_mA=t_bA.m_m_invMass;
	var t_mB=t_bB.m_m_invMass;
	var t_iA=t_bA.m_m_invI;
	var t_iB=t_bB.m_m_invI;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_rAX=this.m_m_localAnchorA.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_rAY=this.m_m_localAnchorA.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rAX+t_tMat.m_col2.m_x*t_rAY;
	t_rAY=t_tMat.m_col1.m_y*t_rAX+t_tMat.m_col2.m_y*t_rAY;
	t_rAX=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_rBX=this.m_m_localAnchorB.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_rBY=this.m_m_localAnchorB.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_rBX+t_tMat.m_col2.m_x*t_rBY;
	t_rBY=t_tMat.m_col1.m_y*t_rBX+t_tMat.m_col2.m_y*t_rBY;
	t_rBX=t_tX;
	var t_maxImpulse=.0;
	var t_Cdot=t_wB-t_wA;
	var t_impulse=-this.m_m_angularMass*t_Cdot;
	var t_oldImpulse=this.m_m_angularImpulse;
	t_maxImpulse=t_timeStep.m_dt*this.m_m_maxTorque;
	this.m_m_angularImpulse=c_b2Math.m_Clamp(this.m_m_angularImpulse+t_impulse,-t_maxImpulse,t_maxImpulse);
	t_impulse=this.m_m_angularImpulse-t_oldImpulse;
	t_wA-=t_iA*t_impulse;
	t_wB+=t_iB*t_impulse;
	var t_CdotX=t_vB.m_x-t_wB*t_rBY-t_vA.m_x+t_wA*t_rAY;
	var t_CdotY=t_vB.m_y+t_wB*t_rBX-t_vA.m_y-t_wA*t_rAX;
	var t_impulseV=c_b2Vec2.m_new.call(new c_b2Vec2,-t_CdotX,-t_CdotY);
	c_b2Math.m_MulMV(this.m_m_linearMass,t_impulseV,t_impulseV);
	var t_oldImpulseV=this.m_m_linearImpulse.p_Copy();
	this.m_m_linearImpulse.p_Add(t_impulseV);
	t_maxImpulse=t_timeStep.m_dt*this.m_m_maxForce;
	if(this.m_m_linearImpulse.p_LengthSquared()>t_maxImpulse*t_maxImpulse){
		this.m_m_linearImpulse.p_Normalize();
		this.m_m_linearImpulse.p_Multiply(t_maxImpulse);
	}
	c_b2Math.m_SubtractVV(this.m_m_linearImpulse,t_oldImpulseV,t_impulseV);
	t_vA.m_x-=t_mA*t_impulseV.m_x;
	t_vA.m_y-=t_mA*t_impulseV.m_y;
	t_wA-=t_iA*(t_rAX*t_impulseV.m_y-t_rAY*t_impulseV.m_x);
	t_vB.m_x+=t_mB*t_impulseV.m_x;
	t_vB.m_y+=t_mB*t_impulseV.m_y;
	t_wB+=t_iB*(t_rBX*t_impulseV.m_y-t_rBY*t_impulseV.m_x);
	t_bA.m_m_angularVelocity=t_wA;
	t_bB.m_m_angularVelocity=t_wB;
}
c_b2FrictionJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	return true;
}
function c_b2FrictionJointDef(){
	c_b2JointDef.call(this);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_maxForce=.0;
	this.m_maxTorque=.0;
}
c_b2FrictionJointDef.prototype=extend_class(c_b2JointDef);
function c_b2RopeJoint(){
	c_b2Joint.call(this);
	this.m_m_localAnchor1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localAnchor2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_length=.0;
	this.m_m_mass=.0;
	this.m_m_maxLength=.0;
	this.m_m_impulse=.0;
	this.m_m_state=0;
	this.m_m_u=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2RopeJoint.prototype=extend_class(c_b2Joint);
c_b2RopeJoint.m_new=function(t_def){
	c_b2Joint.m_new.call(this,(t_def));
	var t_tMat=null;
	var t_tX=.0;
	var t_tY=.0;
	this.m_m_localAnchor1.p_SetV(t_def.m_localAnchorA);
	this.m_m_localAnchor2.p_SetV(t_def.m_localAnchorB);
	this.m_m_length=0.0;
	this.m_m_mass=0.0;
	this.m_m_maxLength=t_def.m_maxLength;
	this.m_m_impulse=0.0;
	this.m_m_state=0;
	return this;
}
c_b2RopeJoint.m_new2=function(){
	c_b2Joint.m_new2.call(this);
	return this;
}
c_b2RopeJoint.prototype.p_InitVelocityConstraints=function(t_tStep){
	var t_tMat=null;
	var t_tX=.0;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	this.m_m_u.m_x=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
	this.m_m_u.m_y=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	this.m_m_length=Math.sqrt(this.m_m_u.m_x*this.m_m_u.m_x+this.m_m_u.m_y*this.m_m_u.m_y);
	var t_c=this.m_m_length-this.m_m_maxLength;
	if(t_c>0.0){
		this.m_m_state=2;
	}else{
		this.m_m_state=0;
	}
	if(this.m_m_length>0.005){
		this.m_m_u.p_Multiply(1.0/this.m_m_length);
	}else{
		this.m_m_u.p_SetZero();
		this.m_m_mass=0.0;
		this.m_m_impulse=0.0;
		return;
	}
	var t_crA=t_r1X*this.m_m_u.m_y-t_r1Y*this.m_m_u.m_x;
	var t_crB=t_r2X*this.m_m_u.m_y-t_r2Y*this.m_m_u.m_x;
	var t_invMass=t_bA.m_m_invMass+t_bA.m_m_invI*t_crA*t_crA+t_bB.m_m_invMass+t_bB.m_m_invI*t_crB*t_crB;
	if(t_invMass!=0.0){
		this.m_m_mass=1.0/t_invMass;
	}else{
		this.m_m_mass=0.0;
	}
	if(t_tStep.m_warmStarting){
		this.m_m_impulse*=t_tStep.m_dtRatio;
		var t_PX=this.m_m_impulse*this.m_m_u.m_x;
		var t_PY=this.m_m_impulse*this.m_m_u.m_y;
		t_bA.m_m_linearVelocity.m_x-=t_bA.m_m_invMass*t_PX;
		t_bA.m_m_linearVelocity.m_y-=t_bA.m_m_invMass*t_PY;
		t_bA.m_m_angularVelocity-=t_bA.m_m_invI*(t_r1X*t_PY-t_r1Y*t_PX);
		t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_PX;
		t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_PY;
		t_bB.m_m_angularVelocity+=t_bB.m_m_invI*(t_r2X*t_PY-t_r2Y*t_PX);
	}
}
c_b2RopeJoint.prototype.p_SolveVelocityConstraints=function(t_tStep){
	var t_tMat=null;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	var t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_v1X=t_bA.m_m_linearVelocity.m_x+-t_bA.m_m_angularVelocity*t_r1Y;
	var t_v1Y=t_bA.m_m_linearVelocity.m_y+t_bA.m_m_angularVelocity*t_r1X;
	var t_v2X=t_bB.m_m_linearVelocity.m_x+-t_bB.m_m_angularVelocity*t_r2Y;
	var t_v2Y=t_bB.m_m_linearVelocity.m_y+t_bB.m_m_angularVelocity*t_r2X;
	var t_C=this.m_m_length-this.m_m_maxLength;
	var t_Cdot=this.m_m_u.m_x*(t_v2X-t_v1X)+this.m_m_u.m_y*(t_v2Y-t_v1Y);
	if(t_C<0.0){
		t_Cdot+=t_tStep.m_inv_dt*t_C;
	}
	var t_impulse=-this.m_m_mass*t_Cdot;
	var t_oldImpulse=this.m_m_impulse;
	this.m_m_impulse=c_b2Math.m_Min(0.0,this.m_m_impulse+t_impulse);
	t_impulse=this.m_m_impulse-t_oldImpulse;
	var t_PX=t_impulse*this.m_m_u.m_x;
	var t_PY=t_impulse*this.m_m_u.m_y;
	t_bA.m_m_linearVelocity.m_x-=t_bA.m_m_invMass*t_PX;
	t_bA.m_m_linearVelocity.m_y-=t_bA.m_m_invMass*t_PY;
	t_bA.m_m_angularVelocity-=t_bA.m_m_invI*(t_r1X*t_PY-t_r1Y*t_PX);
	t_bB.m_m_linearVelocity.m_x+=t_bB.m_m_invMass*t_PX;
	t_bB.m_m_linearVelocity.m_y+=t_bB.m_m_invMass*t_PY;
	t_bB.m_m_angularVelocity+=t_bB.m_m_invI*(t_r2X*t_PY-t_r2Y*t_PX);
}
c_b2RopeJoint.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_tMat=null;
	var t_bA=this.m_m_bodyA;
	var t_bB=this.m_m_bodyB;
	t_tMat=t_bA.m_m_xf.m_R;
	var t_r1X=this.m_m_localAnchor1.m_x-t_bA.m_m_sweep.m_localCenter.m_x;
	var t_r1Y=this.m_m_localAnchor1.m_y-t_bA.m_m_sweep.m_localCenter.m_y;
	var t_tX=t_tMat.m_col1.m_x*t_r1X+t_tMat.m_col2.m_x*t_r1Y;
	t_r1Y=t_tMat.m_col1.m_y*t_r1X+t_tMat.m_col2.m_y*t_r1Y;
	t_r1X=t_tX;
	t_tMat=t_bB.m_m_xf.m_R;
	var t_r2X=this.m_m_localAnchor2.m_x-t_bB.m_m_sweep.m_localCenter.m_x;
	var t_r2Y=this.m_m_localAnchor2.m_y-t_bB.m_m_sweep.m_localCenter.m_y;
	t_tX=t_tMat.m_col1.m_x*t_r2X+t_tMat.m_col2.m_x*t_r2Y;
	t_r2Y=t_tMat.m_col1.m_y*t_r2X+t_tMat.m_col2.m_y*t_r2Y;
	t_r2X=t_tX;
	var t_dX=t_bB.m_m_sweep.m_c.m_x+t_r2X-t_bA.m_m_sweep.m_c.m_x-t_r1X;
	var t_dY=t_bB.m_m_sweep.m_c.m_y+t_r2Y-t_bA.m_m_sweep.m_c.m_y-t_r1Y;
	var t_length=Math.sqrt(t_dX*t_dX+t_dY*t_dY);
	if(t_length==0.0){
		t_length=1.0;
	}
	t_dX/=t_length;
	t_dY/=t_length;
	var t_C=t_length-this.m_m_maxLength;
	t_C=c_b2Math.m_Clamp(t_C,0.0,0.2);
	var t_impulse=-this.m_m_mass*t_C;
	this.m_m_u.p_Set2(t_dX,t_dY);
	var t_PX=t_impulse*this.m_m_u.m_x;
	var t_PY=t_impulse*this.m_m_u.m_y;
	t_bA.m_m_sweep.m_c.m_x-=t_bA.m_m_invMass*t_PX;
	t_bA.m_m_sweep.m_c.m_y-=t_bA.m_m_invMass*t_PY;
	t_bA.m_m_sweep.m_a-=t_bA.m_m_invI*(t_r1X*t_PY-t_r1Y*t_PX);
	t_bB.m_m_sweep.m_c.m_x+=t_bB.m_m_invMass*t_PX;
	t_bB.m_m_sweep.m_c.m_y+=t_bB.m_m_invMass*t_PY;
	t_bB.m_m_sweep.m_a+=t_bB.m_m_invI*(t_r2X*t_PY-t_r2Y*t_PX);
	t_bA.p_SynchronizeTransform();
	t_bB.p_SynchronizeTransform();
	return t_length-this.m_m_maxLength<0.005;
}
function c_b2RopeJointDef(){
	c_b2JointDef.call(this);
	this.m_localAnchorA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localAnchorB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_maxLength=.0;
}
c_b2RopeJointDef.prototype=extend_class(c_b2JointDef);
function c_Arrays(){
	Object.call(this);
}
c_Arrays.m_Reverse=function(t_a){
	var t_b=new_object_array(t_a.length);
	for(var t_n=0;t_n<t_a.length;t_n=t_n+1){
		var t_m=t_a.length-1-t_n;
		t_b[t_m]=t_a[t_n];
	}
	return t_b;
}
function c_AnimationDelegate(){
	Object.call(this);
	this.m_parent=null;
	this.m_link=null;
	this.m_animations=null;
	this.m__currentAnimation=null;
	this.m_accumulation=.0;
	this.m_index=0;
	this.m_loopCount=0;
	this.m_stopped=false;
	this.implments={c_IAnimationObject:1};
}
c_AnimationDelegate.m_new=function(t_parent){
	this.m_parent=t_parent;
	if(bb_abuanimation_autoManageAnimations){
		this.m_link=bb_abuanimation_animationJuggler.p_Add3(this);
	}
	this.m_animations=c_StringMap2.m_new.call(new c_StringMap2);
	return this;
}
c_AnimationDelegate.prototype.p_AddAnimation=function(t_name,t_sequence,t_duration,t_loop){
	this.m_animations.p_Set10(t_name,c_AnimationInfo.m_new.call(new c_AnimationInfo,t_name,t_sequence,c_Arrays2.m_Fill(t_duration,t_sequence.length),t_loop));
}
c_AnimationDelegate.prototype.p_AddAnimation2=function(t_name,t_sequence,t_durationSequence,t_loop){
	this.m_animations.p_Set10(t_name,c_AnimationInfo.m_new.call(new c_AnimationInfo,t_name,t_sequence,t_durationSequence,t_loop));
}
c_AnimationDelegate.prototype.p_ResetAnimation=function(){
	this.m_accumulation=0.0;
	this.m_index=0;
	this.m_loopCount=0;
	this.m_stopped=false;
}
c_AnimationDelegate.prototype.p_PlayAnimation=function(t_name){
	if(this.m__currentAnimation!=null){
		if(this.m__currentAnimation.m_name==t_name){
			if(!this.m__currentAnimation.m_loop){
				this.p_ResetAnimation();
			}
		}else{
			this.p_ResetAnimation();
		}
	}
	this.m__currentAnimation=this.m_animations.p_Get2(t_name);
}
c_AnimationDelegate.prototype.p_currentFrame=function(){
	return this.m__currentAnimation.m_sequence[this.m_index];
}
c_AnimationDelegate.prototype.p__OnAnimationLoop=function(t_name){
	var t_iOnAnimationLoop=object_implements((this.m_parent),"c_IOnAnimationLoop");
	if(t_iOnAnimationLoop!=null){
		t_iOnAnimationLoop.p_OnAnimationLoop(t_name);
	}
}
c_AnimationDelegate.prototype.p__OnAnimationEnd=function(t_name){
	var t_iOnAnimationEnd=object_implements((this.m_parent),"c_IOnAnimationEnd");
	if(t_iOnAnimationEnd!=null){
		t_iOnAnimationEnd.p_OnAnimationEnd(t_name);
	}
}
c_AnimationDelegate.prototype.p__OnAnimationFrameChange=function(t_name,t_frame,t_framePrevious){
	var t_iOnAnimationFrameChange=object_implements((this.m_parent),"c_IOnAnimationFrameChange");
	if(t_iOnAnimationFrameChange!=null){
		t_iOnAnimationFrameChange.p_OnAnimationFrameChange(t_name,t_frame,t_framePrevious);
	}
}
c_AnimationDelegate.prototype.p__IncrementIndex=function(){
	var t_framePrevious=this.m__currentAnimation.m_sequence[this.m_index];
	this.m_index+=1;
	if(this.m_index==this.m__currentAnimation.m_sequence.length){
		if(this.m__currentAnimation.m_loop){
			this.m_index=0;
			this.m_loopCount+=1;
			this.p__OnAnimationLoop(this.m__currentAnimation.m_name);
		}else{
			this.m_index=this.m__currentAnimation.m_sequence.length-1;
			this.m_loopCount=1;
			this.m_stopped=true;
			this.p__OnAnimationEnd(this.m__currentAnimation.m_name);
			return true;
		}
	}
	this.p__OnAnimationFrameChange(this.m__currentAnimation.m_name,this.m__currentAnimation.m_sequence[this.m_index],t_framePrevious);
	return false;
}
c_AnimationDelegate.prototype.p_UpdateAnimation=function(t_timeElapsed){
	if(this.m__currentAnimation==null){
		return;
	}
	this.m_accumulation+=t_timeElapsed;
	while(this.m_accumulation>=this.m__currentAnimation.m_duration[this.m_index]){
		this.m_accumulation-=this.m__currentAnimation.m_duration[this.m_index];
		if(this.p__IncrementIndex()){
			return;
		}
	}
}
var bb_abuanimation_autoManageAnimations=false;
function c_JugglerGeneric(){
	Object.call(this);
	this.m_pins=c_List4.m_new.call(new c_List4);
	this.m_paused=false;
}
c_JugglerGeneric.m_new=function(){
	return this;
}
c_JugglerGeneric.prototype.p_Add3=function(t_pin){
	return this.m_pins.p_AddLast5(t_pin);
}
c_JugglerGeneric.prototype.p_UpdatePin=function(t_pin,t_timeElapsed){
}
c_JugglerGeneric.prototype.p_Update2=function(t_timeElapsed){
	if(this.m_paused){
		return;
	}
	var t_=this.m_pins.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_pin=t_.p_NextObject();
		this.p_UpdatePin(t_pin,t_timeElapsed);
	}
}
function c_AnimationJuggler(){
	c_JugglerGeneric.call(this);
}
c_AnimationJuggler.prototype=extend_class(c_JugglerGeneric);
c_AnimationJuggler.m_new=function(){
	c_JugglerGeneric.m_new.call(this);
	return this;
}
c_AnimationJuggler.prototype.p_UpdatePin=function(t_pin,t_timeElapsed){
	t_pin.p_UpdateAnimation(t_timeElapsed);
}
var bb_abuanimation_animationJuggler=null;
function c_Node6(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node6.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node6.m_new2=function(){
	return this;
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	return this;
}
c_List4.prototype.p_AddLast5=function(t_data){
	return c_Node6.m_new.call(new c_Node6,this.m__head,this.m__head.m__pred,t_data);
}
c_List4.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast5(t_t);
	}
	return this;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator3.m_new.call(new c_Enumerator3,this);
}
function c_HeadNode4(){
	c_Node6.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node6);
c_HeadNode4.m_new=function(){
	c_Node6.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_AnimationInfo(){
	Object.call(this);
	this.m_name="";
	this.m_sequence=[];
	this.m_duration=[];
	this.m_loop=false;
}
c_AnimationInfo.m_new=function(t_name,t_sequence,t_duration,t_loop){
	this.m_name=t_name;
	this.m_sequence=t_sequence;
	this.m_duration=t_duration;
	this.m_loop=t_loop;
	return this;
}
c_AnimationInfo.m_new2=function(){
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set10=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node7.m_new.call(new c_Node7,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map3.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap2(){
	c_Map3.call(this);
}
c_StringMap2.prototype=extend_class(c_Map3);
c_StringMap2.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_StringMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Arrays2(){
	Object.call(this);
}
c_Arrays2.m_Fill=function(t_value,t_length){
	var t_arr=new_number_array(t_length);
	for(var t_n=0;t_n<t_length;t_n=t_n+1){
		t_arr[t_n]=t_value;
	}
	return t_arr;
}
function c_Node7(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node7.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node7.m_new2=function(){
	return this;
}
function c_List5(){
	Object.call(this);
	this.m__head=(c_HeadNode5.m_new.call(new c_HeadNode5));
}
c_List5.m_new=function(){
	return this;
}
c_List5.prototype.p_AddLast6=function(t_data){
	return c_Node8.m_new.call(new c_Node8,this.m__head,this.m__head.m__pred,t_data);
}
c_List5.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast6(t_t);
	}
	return this;
}
c_List5.prototype.p_Equals=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List5.prototype.p_Contains3=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		if(this.p_Equals(t_node.m__data,t_value)){
			return true;
		}
		t_node=t_node.m__succ;
	}
	return false;
}
c_List5.prototype.p_RemoveEach=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		var t_succ=t_node.m__succ;
		if(this.p_Equals(t_node.m__data,t_value)){
			t_node.p_Remove();
		}
		t_node=t_succ;
	}
	return 0;
}
c_List5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator6.m_new.call(new c_Enumerator6,this);
}
function c_Node8(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node8.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node8.m_new2=function(){
	return this;
}
c_Node8.prototype.p_Remove=function(){
	this.m__succ.m__pred=this.m__pred;
	this.m__pred.m__succ=this.m__succ;
	return 0;
}
function c_HeadNode5(){
	c_Node8.call(this);
}
c_HeadNode5.prototype=extend_class(c_Node8);
c_HeadNode5.m_new=function(){
	c_Node8.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Clock(){
	Object.call(this);
}
c_Clock.m_timeCurrent=0;
c_Clock.m_timePrevious=0;
c_Clock.m_timeElapsed=0;
c_Clock.m_Update=function(){
	c_Clock.m_timeCurrent=bb_app_Millisecs();
	if(c_Clock.m_timePrevious==-1){
		c_Clock.m_timePrevious=c_Clock.m_timeCurrent;
	}
	c_Clock.m_timeElapsed=c_Clock.m_timeCurrent-c_Clock.m_timePrevious;
	c_Clock.m_timePrevious=c_Clock.m_timeCurrent;
}
c_Clock.m_timeStep=0;
c_Clock.m_Tick=function(){
	if(c_Clock.m_timeStep!=-1){
		return (c_Clock.m_timeStep);
	}
	return (c_Clock.m_timeElapsed);
}
function bb_app_Millisecs(){
	return bb_app__game.Millisecs();
}
function c_b2TimeStep(){
	Object.call(this);
	this.m_dt=.0;
	this.m_velocityIterations=0;
	this.m_positionIterations=0;
	this.m_inv_dt=.0;
	this.m_dtRatio=.0;
	this.m_warmStarting=false;
}
c_b2TimeStep.m_new=function(){
	return this;
}
c_b2TimeStep.prototype.p_Set11=function(t_timeStep){
	this.m_dt=t_timeStep.m_dt;
	this.m_inv_dt=t_timeStep.m_inv_dt;
	this.m_positionIterations=t_timeStep.m_positionIterations;
	this.m_velocityIterations=t_timeStep.m_velocityIterations;
	this.m_warmStarting=t_timeStep.m_warmStarting;
}
function c_b2Manifold(){
	Object.call(this);
	this.m_m_points=[];
	this.m_m_localPlaneNormal=null;
	this.m_m_localPoint=null;
	this.m_m_pointCount=0;
	this.m_m_type=0;
}
c_b2Manifold.m_new=function(){
	this.m_m_points=new_object_array(2);
	for(var t_i=0;t_i<2;t_i=t_i+1){
		this.m_m_points[t_i]=c_b2ManifoldPoint.m_new.call(new c_b2ManifoldPoint);
	}
	this.m_m_localPlaneNormal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localPoint=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	return this;
}
function c_b2ManifoldPoint(){
	Object.call(this);
	this.m_m_localPoint=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_normalImpulse=.0;
	this.m_m_tangentImpulse=.0;
	this.m_m_id=c_b2ContactID.m_new.call(new c_b2ContactID);
}
c_b2ManifoldPoint.prototype.p_Reset2=function(){
	this.m_m_localPoint.p_SetZero();
	this.m_m_normalImpulse=0.0;
	this.m_m_tangentImpulse=0.0;
	this.m_m_id.p_Key2(0);
}
c_b2ManifoldPoint.m_new=function(){
	this.p_Reset2();
	return this;
}
function c_b2ContactID(){
	Object.call(this);
	this.m_features=c_Features.m_new.call(new c_Features);
	this.m__key=0;
}
c_b2ContactID.m_new=function(){
	this.m_features.m__m_id=this;
	return this;
}
c_b2ContactID.prototype.p_Key=function(){
	return this.m__key;
}
c_b2ContactID.prototype.p_Key2=function(t_value){
	this.m__key=t_value;
	this.m_features.m__referenceEdge=this.m__key&255;
	this.m_features.m__incidentEdge=(this.m__key&65280)>>8&255;
	this.m_features.m__incidentVertex=(this.m__key&16711680)>>16&255;
	this.m_features.m__flip=(this.m__key&-16777216)>>24&255;
}
c_b2ContactID.prototype.p_Set12=function(t_id){
	this.p_Key2(t_id.m__key);
}
function c_Features(){
	Object.call(this);
	this.m__m_id=null;
	this.m__referenceEdge=0;
	this.m__incidentEdge=0;
	this.m__incidentVertex=0;
	this.m__flip=0;
}
c_Features.m_new=function(){
	return this;
}
c_Features.prototype.p_ReferenceEdge=function(){
	return this.m__referenceEdge;
}
c_Features.prototype.p_ReferenceEdge2=function(t_value){
	this.m__referenceEdge=t_value;
	this.m__m_id.m__key=this.m__m_id.m__key&-256|this.m__referenceEdge&255;
}
c_Features.prototype.p_IncidentEdge=function(){
	return this.m__incidentEdge;
}
c_Features.prototype.p_IncidentEdge2=function(t_value){
	this.m__incidentEdge=t_value;
	this.m__m_id.m__key=this.m__m_id.m__key&-65281|this.m__incidentEdge<<8&65280;
}
c_Features.prototype.p_IncidentVertex=function(){
	return this.m__incidentVertex;
}
c_Features.prototype.p_IncidentVertex2=function(t_value){
	this.m__incidentVertex=t_value;
	this.m__m_id.m__key=this.m__m_id.m__key&-16711681|this.m__incidentVertex<<16&16711680;
}
c_Features.prototype.p_Flip=function(){
	return this.m__flip;
}
c_Features.prototype.p_Flip2=function(t_value){
	this.m__flip=t_value;
	this.m__m_id.m__key=this.m__m_id.m__key&16777215|this.m__flip<<24&-16777216;
}
function c_b2DistanceInput(){
	Object.call(this);
	this.m_proxyA=null;
	this.m_proxyB=null;
	this.m_transformA=null;
	this.m_transformB=null;
	this.m_useRadii=false;
}
c_b2DistanceInput.m_new=function(){
	return this;
}
function c_b2DistanceProxy(){
	Object.call(this);
	this.m_m_vertices=[];
	this.m_m_count=0;
	this.m_m_radius=.0;
}
c_b2DistanceProxy.m_new=function(){
	return this;
}
c_b2DistanceProxy.prototype.p_Set5=function(t_shape){
	var t_1=t_shape.p_GetType();
	if(t_1==0){
		var t_circle=object_downcast((t_shape),c_b2CircleShape);
		this.m_m_vertices=new_object_array(1);
		this.m_m_vertices[0]=t_circle.m_m_p;
		this.m_m_count=1;
		this.m_m_radius=t_circle.m_m_radius;
	}else{
		if(t_1==1){
			var t_polygon=object_downcast((t_shape),c_b2PolygonShape);
			this.m_m_vertices=t_polygon.m_m_vertices;
			this.m_m_count=t_polygon.m_m_vertexCount;
			this.m_m_radius=t_polygon.m_m_radius;
		}else{
			c_b2Settings.m_B2Assert(false);
		}
	}
}
c_b2DistanceProxy.prototype.p_GetVertex=function(t_index){
	c_b2Settings.m_B2Assert(0<=t_index && t_index<this.m_m_count);
	return this.m_m_vertices[t_index];
}
c_b2DistanceProxy.prototype.p_GetSupport=function(t_d){
	var t_bestIndex=0;
	var t_bestValue=this.m_m_vertices[0].m_x*t_d.m_x+this.m_m_vertices[0].m_y*t_d.m_y;
	for(var t_i=1;t_i<this.m_m_count;t_i=t_i+1){
		var t_value=this.m_m_vertices[t_i].m_x*t_d.m_x+this.m_m_vertices[t_i].m_y*t_d.m_y;
		if(t_value>t_bestValue){
			t_bestIndex=t_i;
			t_bestValue=t_value;
		}
	}
	return (t_bestIndex);
}
c_b2DistanceProxy.prototype.p_GetSupportVertex=function(t_d){
	var t_bestIndex=0;
	var t_bestValue=this.m_m_vertices[0].m_x*t_d.m_x+this.m_m_vertices[0].m_y*t_d.m_y;
	for(var t_i=1;t_i<this.m_m_count;t_i=t_i+1){
		var t_value=this.m_m_vertices[t_i].m_x*t_d.m_x+this.m_m_vertices[t_i].m_y*t_d.m_y;
		if(t_value>t_bestValue){
			t_bestIndex=t_i;
			t_bestValue=t_value;
		}
	}
	return this.m_m_vertices[t_bestIndex];
}
function c_b2SimplexCache(){
	Object.call(this);
	this.m_count=0;
	this.m_indexA=new_number_array(3);
	this.m_indexB=new_number_array(3);
	this.m_metric=.0;
}
c_b2SimplexCache.m_new=function(){
	return this;
}
function c_b2DistanceOutput(){
	Object.call(this);
	this.m_pointA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_pointB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_distance=.0;
	this.m_iterations=0;
}
c_b2DistanceOutput.m_new=function(){
	return this;
}
function c_b2Distance(){
	Object.call(this);
}
c_b2Distance.m_b2_gjkCalls=0;
c_b2Distance.m_s_simplex=null;
c_b2Distance.m_s_saveA=[];
c_b2Distance.m_s_saveB=[];
c_b2Distance.m_tmpVec1=null;
c_b2Distance.m_tmpVec2=null;
c_b2Distance.m_b2_gjkIters=0;
c_b2Distance.m_b2_gjkMaxIters=0;
c_b2Distance.m_Distance=function(t_output,t_cache,t_input){
	c_b2Distance.m_b2_gjkCalls+=1;
	var t_proxyA=t_input.m_proxyA;
	var t_proxyB=t_input.m_proxyB;
	var t_transformA=t_input.m_transformA;
	var t_transformB=t_input.m_transformB;
	var t_simplex=c_b2Distance.m_s_simplex;
	t_simplex.p_ReadCache(t_cache,t_proxyA,t_transformA,t_proxyB,t_transformB);
	var t_vertices=t_simplex.m_m_vertices;
	var t_saveA=c_b2Distance.m_s_saveA;
	var t_saveB=c_b2Distance.m_s_saveB;
	var t_saveCount=0;
	t_simplex.p_GetClosestPoint(c_b2Distance.m_tmpVec1);
	var t_distanceSqr1=c_b2Distance.m_tmpVec1.p_LengthSquared();
	var t_distanceSqr2=t_distanceSqr1;
	var t_i=0;
	var t_iter=0;
	while(t_iter<20){
		t_saveCount=t_simplex.m_m_count;
		for(var t_i2=0;t_i2<t_saveCount;t_i2=t_i2+1){
			t_saveA[t_i2]=t_vertices[t_i2].m_indexA;
			t_saveB[t_i2]=t_vertices[t_i2].m_indexB;
		}
		var t_1=t_simplex.m_m_count;
		if(t_1==1){
		}else{
			if(t_1==2){
				t_simplex.p_Solve23();
			}else{
				if(t_1==3){
					t_simplex.p_Solve3();
				}else{
					c_b2Settings.m_B2Assert(false);
				}
			}
		}
		if(t_simplex.m_m_count==3){
			break;
		}
		t_simplex.p_GetClosestPoint(c_b2Distance.m_tmpVec1);
		t_distanceSqr2=c_b2Distance.m_tmpVec1.p_LengthSquared();
		if(t_distanceSqr2>t_distanceSqr1){
		}
		t_distanceSqr1=t_distanceSqr2;
		t_simplex.p_GetSearchDirection(c_b2Distance.m_tmpVec1);
		var t_d=c_b2Distance.m_tmpVec1;
		if(t_d.p_LengthSquared()<1.0000000000000001e-030){
			break;
		}
		var t_vertex=t_vertices[t_simplex.m_m_count];
		t_d.p_GetNegative(c_b2Distance.m_tmpVec2);
		c_b2Math.m_MulTMV(t_transformA.m_R,c_b2Distance.m_tmpVec2,c_b2Distance.m_tmpVec2);
		t_vertex.m_indexA=((t_proxyA.p_GetSupport(c_b2Distance.m_tmpVec2))|0);
		c_b2Math.m_MulX(t_transformA,t_proxyA.p_GetVertex(t_vertex.m_indexA),t_vertex.m_wA);
		c_b2Math.m_MulTMV(t_transformB.m_R,t_d,c_b2Distance.m_tmpVec2);
		t_vertex.m_indexB=((t_proxyB.p_GetSupport(c_b2Distance.m_tmpVec2))|0);
		c_b2Math.m_MulX(t_transformB,t_proxyB.p_GetVertex(t_vertex.m_indexB),t_vertex.m_wB);
		c_b2Math.m_SubtractVV(t_vertex.m_wB,t_vertex.m_wA,t_vertex.m_w);
		t_iter+=1;
		c_b2Distance.m_b2_gjkIters+=1;
		var t_duplicate=false;
		for(var t_i3=0;t_i3<t_saveCount;t_i3=t_i3+1){
			if(t_vertex.m_indexA==t_saveA[t_i3] && t_vertex.m_indexB==t_saveB[t_i3]){
				t_duplicate=true;
				break;
			}
		}
		if(t_duplicate){
			break;
		}
		t_simplex.m_m_count+=1;
	}
	c_b2Distance.m_b2_gjkMaxIters=((c_b2Math.m_Max((c_b2Distance.m_b2_gjkMaxIters),(t_iter)))|0);
	t_simplex.p_GetWitnessPoints(t_output.m_pointA,t_output.m_pointB);
	c_b2Math.m_SubtractVV(t_output.m_pointA,t_output.m_pointB,c_b2Distance.m_tmpVec2);
	t_output.m_distance=c_b2Distance.m_tmpVec2.p_Length();
	t_output.m_iterations=t_iter;
	t_simplex.p_WriteCache(t_cache);
	if(t_input.m_useRadii){
		var t_rA=t_proxyA.m_m_radius;
		var t_rB=t_proxyB.m_m_radius;
		if(t_output.m_distance>t_rA+t_rB && t_output.m_distance>1e-15){
			t_output.m_distance-=t_rA+t_rB;
			var t_normal=c_b2Distance.m_tmpVec2;
			c_b2Math.m_SubtractVV(t_output.m_pointB,t_output.m_pointA,t_normal);
			t_normal.p_Normalize();
			t_output.m_pointA.m_x+=t_rA*t_normal.m_x;
			t_output.m_pointA.m_y+=t_rA*t_normal.m_y;
			t_output.m_pointB.m_x-=t_rB*t_normal.m_x;
			t_output.m_pointB.m_y-=t_rB*t_normal.m_y;
		}else{
			c_b2Distance.m_tmpVec2.m_x=0.5*(t_output.m_pointA.m_x+t_output.m_pointB.m_x);
			c_b2Distance.m_tmpVec2.m_y=0.5*(t_output.m_pointA.m_y+t_output.m_pointB.m_y);
			t_output.m_pointA.m_x=c_b2Distance.m_tmpVec2.m_x;
			t_output.m_pointB.m_x=t_output.m_pointA.m_x;
			t_output.m_pointA.m_y=c_b2Distance.m_tmpVec2.m_y;
			t_output.m_pointB.m_y=t_output.m_pointA.m_y;
			t_output.m_distance=0.0;
		}
	}
}
function c_b2Simplex(){
	Object.call(this);
	this.m_m_v1=c_b2SimplexVertex.m_new.call(new c_b2SimplexVertex);
	this.m_m_vertices=new_object_array(3);
	this.m_m_v2=c_b2SimplexVertex.m_new.call(new c_b2SimplexVertex);
	this.m_m_v3=c_b2SimplexVertex.m_new.call(new c_b2SimplexVertex);
	this.m_m_count=0;
}
c_b2Simplex.m_new=function(){
	this.m_m_vertices[0]=this.m_m_v1;
	this.m_m_vertices[1]=this.m_m_v2;
	this.m_m_vertices[2]=this.m_m_v3;
	return this;
}
c_b2Simplex.m_tmpVec1=null;
c_b2Simplex.m_tmpVec2=null;
c_b2Simplex.prototype.p_GetMetric=function(){
	var t_4=this.m_m_count;
	if(t_4==0){
		c_b2Settings.m_B2Assert(false);
		return 0.0;
	}else{
		if(t_4==1){
			return 0.0;
		}else{
			if(t_4==2){
				c_b2Math.m_SubtractVV(this.m_m_v1.m_w,this.m_m_v2.m_w,c_b2Simplex.m_tmpVec1);
				return c_b2Simplex.m_tmpVec1.p_Length();
			}else{
				if(t_4==3){
					c_b2Math.m_SubtractVV(this.m_m_v2.m_w,this.m_m_v1.m_w,c_b2Simplex.m_tmpVec1);
					c_b2Math.m_SubtractVV(this.m_m_v3.m_w,this.m_m_v1.m_w,c_b2Simplex.m_tmpVec2);
					return c_b2Math.m_CrossVV(c_b2Simplex.m_tmpVec1,c_b2Simplex.m_tmpVec2);
				}else{
					c_b2Settings.m_B2Assert(false);
					return 0.0;
				}
			}
		}
	}
}
c_b2Simplex.prototype.p_ReadCache=function(t_cache,t_proxyA,t_transformA,t_proxyB,t_transformB){
	var t_wALocal=null;
	var t_wBLocal=null;
	var t_v=null;
	this.m_m_count=t_cache.m_count;
	var t_vertices=this.m_m_vertices;
	for(var t_i=0;t_i<this.m_m_count;t_i=t_i+1){
		t_v=t_vertices[t_i];
		t_v.m_indexA=t_cache.m_indexA[t_i];
		t_v.m_indexB=t_cache.m_indexB[t_i];
		t_wALocal=t_proxyA.p_GetVertex(t_v.m_indexA);
		t_wBLocal=t_proxyB.p_GetVertex(t_v.m_indexB);
		c_b2Math.m_MulX(t_transformA,t_wALocal,t_v.m_wA);
		c_b2Math.m_MulX(t_transformB,t_wBLocal,t_v.m_wB);
		c_b2Math.m_SubtractVV(t_v.m_wB,t_v.m_wA,t_v.m_w);
		t_v.m_a=0.0;
	}
	if(this.m_m_count>1){
		var t_metric1=t_cache.m_metric;
		var t_metric2=this.p_GetMetric();
		if(t_metric2<0.5*t_metric1 || 2.0*t_metric1<t_metric2 || t_metric2<1e-15){
			this.m_m_count=0;
		}
	}
	if(this.m_m_count==0){
		t_v=t_vertices[0];
		t_v.m_indexA=0;
		t_v.m_indexB=0;
		t_wALocal=t_proxyA.p_GetVertex(0);
		t_wBLocal=t_proxyB.p_GetVertex(0);
		c_b2Math.m_MulX(t_transformA,t_wALocal,t_v.m_wA);
		c_b2Math.m_MulX(t_transformB,t_wBLocal,t_v.m_wB);
		c_b2Math.m_SubtractVV(t_v.m_wB,t_v.m_wA,t_v.m_w);
		this.m_m_count=1;
	}
}
c_b2Simplex.prototype.p_GetClosestPoint=function(t_out){
	var t_2=this.m_m_count;
	if(t_2==0){
		c_b2Settings.m_B2Assert(false);
		t_out.m_x=0.0;
		t_out.m_y=0.0;
	}else{
		if(t_2==1){
			t_out.m_x=this.m_m_v1.m_w.m_x;
			t_out.m_y=this.m_m_v1.m_w.m_y;
		}else{
			if(t_2==2){
				t_out.m_x=this.m_m_v1.m_a*this.m_m_v1.m_w.m_x+this.m_m_v2.m_a*this.m_m_v2.m_w.m_x;
				t_out.m_y=this.m_m_v1.m_a*this.m_m_v1.m_w.m_y+this.m_m_v2.m_a*this.m_m_v2.m_w.m_y;
			}else{
				c_b2Settings.m_B2Assert(false);
				t_out.m_x=0.0;
				t_out.m_y=0.0;
			}
		}
	}
}
c_b2Simplex.prototype.p_Solve23=function(){
	var t_w1=this.m_m_v1.m_w;
	var t_w2=this.m_m_v2.m_w;
	c_b2Math.m_SubtractVV(t_w2,t_w1,c_b2Simplex.m_tmpVec1);
	var t_e12=c_b2Simplex.m_tmpVec1;
	var t_d12_2=-(t_w1.m_x*t_e12.m_x+t_w1.m_y*t_e12.m_y);
	if(t_d12_2<=0.0){
		this.m_m_v1.m_a=1.0;
		this.m_m_count=1;
		return;
	}
	var t_d12_1=t_w2.m_x*t_e12.m_x+t_w2.m_y*t_e12.m_y;
	if(t_d12_1<=0.0){
		this.m_m_v2.m_a=1.0;
		this.m_m_count=1;
		this.m_m_v1.p_Set13(this.m_m_v2);
		return;
	}
	var t_inv_d12=1.0/(t_d12_1+t_d12_2);
	this.m_m_v1.m_a=t_d12_1*t_inv_d12;
	this.m_m_v2.m_a=t_d12_2*t_inv_d12;
	this.m_m_count=2;
}
c_b2Simplex.m_tmpVec3=null;
c_b2Simplex.prototype.p_Solve3=function(){
	var t_w1=this.m_m_v1.m_w;
	var t_w2=this.m_m_v2.m_w;
	var t_w3=this.m_m_v3.m_w;
	c_b2Math.m_SubtractVV(t_w2,t_w1,c_b2Simplex.m_tmpVec1);
	var t_e12=c_b2Simplex.m_tmpVec1;
	var t_w1e12=c_b2Math.m_Dot(t_w1,t_e12);
	var t_w2e12=c_b2Math.m_Dot(t_w2,t_e12);
	var t_d12_1=t_w2e12;
	var t_d12_2=-t_w1e12;
	c_b2Math.m_SubtractVV(t_w3,t_w1,c_b2Simplex.m_tmpVec2);
	var t_e13=c_b2Simplex.m_tmpVec2;
	var t_w1e13=c_b2Math.m_Dot(t_w1,t_e13);
	var t_w3e13=c_b2Math.m_Dot(t_w3,t_e13);
	var t_d13_1=t_w3e13;
	var t_d13_2=-t_w1e13;
	c_b2Math.m_SubtractVV(t_w3,t_w2,c_b2Simplex.m_tmpVec3);
	var t_e23=c_b2Simplex.m_tmpVec3;
	var t_w2e23=c_b2Math.m_Dot(t_w2,t_e23);
	var t_w3e23=c_b2Math.m_Dot(t_w3,t_e23);
	var t_d23_1=t_w3e23;
	var t_d23_2=-t_w2e23;
	var t_n123=c_b2Math.m_CrossVV(t_e12,t_e13);
	var t_d123_1=t_n123*c_b2Math.m_CrossVV(t_w2,t_w3);
	var t_d123_2=t_n123*c_b2Math.m_CrossVV(t_w3,t_w1);
	var t_d123_3=t_n123*c_b2Math.m_CrossVV(t_w1,t_w2);
	if(t_d12_2<=0.0 && t_d13_2<=0.0){
		this.m_m_v1.m_a=1.0;
		this.m_m_count=1;
		return;
	}
	if(t_d12_1>0.0 && t_d12_2>0.0 && t_d123_3<=0.0){
		var t_inv_d12=1.0/(t_d12_1+t_d12_2);
		this.m_m_v1.m_a=t_d12_1*t_inv_d12;
		this.m_m_v2.m_a=t_d12_2*t_inv_d12;
		this.m_m_count=2;
		return;
	}
	if(t_d13_1>0.0 && t_d13_2>0.0 && t_d123_2<=0.0){
		var t_inv_d13=1.0/(t_d13_1+t_d13_2);
		this.m_m_v1.m_a=t_d13_1*t_inv_d13;
		this.m_m_v3.m_a=t_d13_2*t_inv_d13;
		this.m_m_count=2;
		this.m_m_v2.p_Set13(this.m_m_v3);
		return;
	}
	if(t_d12_1<=0.0 && t_d23_2<=0.0){
		this.m_m_v2.m_a=1.0;
		this.m_m_count=1;
		this.m_m_v1.p_Set13(this.m_m_v2);
		return;
	}
	if(t_d13_1<=0.0 && t_d23_1<=0.0){
		this.m_m_v3.m_a=1.0;
		this.m_m_count=1;
		this.m_m_v1.p_Set13(this.m_m_v3);
		return;
	}
	if(t_d23_1>0.0 && t_d23_2>0.0 && t_d123_1<=0.0){
		var t_inv_d23=1.0/(t_d23_1+t_d23_2);
		this.m_m_v2.m_a=t_d23_1*t_inv_d23;
		this.m_m_v3.m_a=t_d23_2*t_inv_d23;
		this.m_m_count=2;
		this.m_m_v1.p_Set13(this.m_m_v3);
		return;
	}
	var t_inv_d123=1.0/(t_d123_1+t_d123_2+t_d123_3);
	this.m_m_v1.m_a=t_d123_1*t_inv_d123;
	this.m_m_v2.m_a=t_d123_2*t_inv_d123;
	this.m_m_v3.m_a=t_d123_3*t_inv_d123;
	this.m_m_count=3;
}
c_b2Simplex.prototype.p_GetSearchDirection=function(t_out){
	var t_1=this.m_m_count;
	if(t_1==1){
		this.m_m_v1.m_w.p_GetNegative(t_out);
	}else{
		if(t_1==2){
			c_b2Math.m_SubtractVV(this.m_m_v2.m_w,this.m_m_v1.m_w,t_out);
			this.m_m_v1.m_w.p_GetNegative(c_b2Simplex.m_tmpVec1);
			var t_sgn=c_b2Math.m_CrossVV(t_out,c_b2Simplex.m_tmpVec1);
			if(t_sgn>0.0){
				c_b2Math.m_CrossFV(1.0,t_out,t_out);
			}else{
				c_b2Math.m_CrossVF(t_out,1.0,t_out);
			}
		}else{
			c_b2Settings.m_B2Assert(false);
			t_out.p_Set2(0.0,0.0);
		}
	}
}
c_b2Simplex.prototype.p_GetWitnessPoints=function(t_pA,t_pB){
	var t_3=this.m_m_count;
	if(t_3==0){
		c_b2Settings.m_B2Assert(false);
	}else{
		if(t_3==1){
			t_pA.p_SetV(this.m_m_v1.m_wA);
			t_pB.p_SetV(this.m_m_v1.m_wB);
		}else{
			if(t_3==2){
				t_pA.m_x=this.m_m_v1.m_a*this.m_m_v1.m_wA.m_x+this.m_m_v2.m_a*this.m_m_v2.m_wA.m_x;
				t_pA.m_y=this.m_m_v1.m_a*this.m_m_v1.m_wA.m_y+this.m_m_v2.m_a*this.m_m_v2.m_wA.m_y;
				t_pB.m_x=this.m_m_v1.m_a*this.m_m_v1.m_wB.m_x+this.m_m_v2.m_a*this.m_m_v2.m_wB.m_x;
				t_pB.m_y=this.m_m_v1.m_a*this.m_m_v1.m_wB.m_y+this.m_m_v2.m_a*this.m_m_v2.m_wB.m_y;
			}else{
				if(t_3==3){
					t_pA.m_x=this.m_m_v1.m_a*this.m_m_v1.m_wA.m_x+this.m_m_v2.m_a*this.m_m_v2.m_wA.m_x+this.m_m_v3.m_a*this.m_m_v3.m_wA.m_x;
					t_pB.m_x=t_pA.m_x;
					t_pA.m_y=this.m_m_v1.m_a*this.m_m_v1.m_wA.m_y+this.m_m_v2.m_a*this.m_m_v2.m_wA.m_y+this.m_m_v3.m_a*this.m_m_v3.m_wA.m_y;
					t_pB.m_y=t_pA.m_y;
				}else{
					c_b2Settings.m_B2Assert(false);
				}
			}
		}
	}
}
c_b2Simplex.prototype.p_WriteCache=function(t_cache){
	t_cache.m_metric=this.p_GetMetric();
	t_cache.m_count=this.m_m_count;
	var t_vertices=this.m_m_vertices;
	for(var t_i=0;t_i<this.m_m_count;t_i=t_i+1){
		t_cache.m_indexA[t_i]=t_vertices[t_i].m_indexA;
		t_cache.m_indexB[t_i]=t_vertices[t_i].m_indexB;
	}
}
function c_b2SimplexVertex(){
	Object.call(this);
	this.m_indexA=0;
	this.m_indexB=0;
	this.m_wA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_wB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_w=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_a=.0;
}
c_b2SimplexVertex.m_new=function(){
	return this;
}
c_b2SimplexVertex.prototype.p_Set13=function(t_other){
	this.m_wA.p_SetV(t_other.m_wA);
	this.m_wB.p_SetV(t_other.m_wB);
	this.m_w.p_SetV(t_other.m_w);
	this.m_a=t_other.m_a;
	this.m_indexA=t_other.m_indexA;
	this.m_indexB=t_other.m_indexB;
}
function c_b2Island(){
	Object.call(this);
	this.m_m_bodyCapacity=0;
	this.m_m_bodies=[];
	this.m_m_contactCapacity=0;
	this.m_m_contacts=[];
	this.m_m_jointCapacity=0;
	this.m_m_joints=[];
	this.m_m_bodyCount=0;
	this.m_m_contactCount=0;
	this.m_m_jointCount=0;
	this.m_m_allocator=null;
	this.m_m_listener=null;
	this.m_m_contactSolver=null;
}
c_b2Island.m_new=function(){
	return this;
}
c_b2Island.prototype.p_Initialize=function(t_bodyCapacity,t_contactCapacity,t_jointCapacity,t_allocator,t_listener,t_contactSolver){
	var t_i=0;
	this.m_m_bodyCapacity=t_bodyCapacity;
	if(this.m_m_bodies.length<this.m_m_bodyCapacity){
		this.m_m_bodies=resize_object_array(this.m_m_bodies,this.m_m_bodyCapacity);
	}
	this.m_m_contactCapacity=t_contactCapacity;
	if(this.m_m_contacts.length<this.m_m_contactCapacity){
		this.m_m_contacts=resize_object_array(this.m_m_contacts,this.m_m_contactCapacity);
	}
	this.m_m_jointCapacity=t_jointCapacity;
	if(this.m_m_joints.length<this.m_m_jointCapacity){
		this.m_m_joints=resize_object_array(this.m_m_joints,this.m_m_jointCapacity);
	}
	this.m_m_bodyCount=0;
	this.m_m_contactCount=0;
	this.m_m_jointCount=0;
	this.m_m_allocator=t_allocator;
	this.m_m_listener=t_listener;
	this.m_m_contactSolver=t_contactSolver;
	for(var t_i2=this.m_m_bodies.length;t_i2<t_bodyCapacity;t_i2=t_i2+1){
		this.m_m_bodies[t_i2]=null;
	}
	for(var t_i3=this.m_m_contacts.length;t_i3<t_contactCapacity;t_i3=t_i3+1){
		this.m_m_contacts[t_i3]=null;
	}
	for(var t_i4=this.m_m_joints.length;t_i4<t_jointCapacity;t_i4=t_i4+1){
		this.m_m_joints[t_i4]=null;
	}
}
c_b2Island.prototype.p_Clear=function(){
	this.m_m_bodyCount=0;
	this.m_m_contactCount=0;
	this.m_m_jointCount=0;
}
c_b2Island.prototype.p_AddBody=function(t_body){
	t_body.m_m_islandIndex=this.m_m_bodyCount;
	this.m_m_bodies[this.m_m_bodyCount]=t_body;
	this.m_m_bodyCount+=1;
}
c_b2Island.prototype.p_AddContact=function(t_contact){
	this.m_m_contacts[this.m_m_contactCount]=t_contact;
	this.m_m_contactCount+=1;
}
c_b2Island.prototype.p_AddJoint=function(t_joint){
	this.m_m_joints[this.m_m_jointCount]=t_joint;
	this.m_m_jointCount+=1;
}
c_b2Island.m_s_impulse=null;
c_b2Island.prototype.p_Report=function(t_constraints){
	if(this.m_m_listener==null){
		return;
	}
	for(var t_i=0;t_i<this.m_m_contactCount;t_i=t_i+1){
		var t_c=this.m_m_contacts[t_i];
		var t_cc=t_constraints[t_i];
		for(var t_j=0;t_j<t_cc.m_pointCount;t_j=t_j+1){
			c_b2Island.m_s_impulse.m_normalImpulses[t_j]=t_cc.m_points[t_j].m_normalImpulse;
			c_b2Island.m_s_impulse.m_tangentImpulses[t_j]=t_cc.m_points[t_j].m_tangentImpulse;
		}
		this.m_m_listener.p_PostSolve(t_c,c_b2Island.m_s_impulse);
	}
}
c_b2Island.prototype.p_Solve4=function(t_timeStep,t_gravity,t_allowSleep){
	var t_i=0;
	var t_j=0;
	var t_b=null;
	var t_joint=null;
	for(var t_i2=0;t_i2<this.m_m_bodyCount;t_i2=t_i2+1){
		t_b=this.m_m_bodies[t_i2];
		if(t_b.m_m_type!=2){
			continue;
		}
		t_b.m_m_linearVelocity.m_x+=t_timeStep.m_dt*(t_gravity.m_x+t_b.m_m_invMass*t_b.m_m_force.m_x);
		t_b.m_m_linearVelocity.m_y+=t_timeStep.m_dt*(t_gravity.m_y+t_b.m_m_invMass*t_b.m_m_force.m_y);
		t_b.m_m_angularVelocity+=t_timeStep.m_dt*t_b.m_m_invI*t_b.m_m_torque;
		t_b.m_m_linearVelocity.p_Multiply(c_b2Math.m_Clamp(1.0-t_timeStep.m_dt*t_b.m_m_linearDamping,0.0,1.0));
		t_b.m_m_angularVelocity*=c_b2Math.m_Clamp(1.0-t_timeStep.m_dt*t_b.m_m_angularDamping,0.0,1.0);
	}
	this.m_m_contactSolver.p_Initialize2(t_timeStep,this.m_m_contacts,this.m_m_contactCount,this.m_m_allocator);
	var t_contactSolver=this.m_m_contactSolver;
	t_contactSolver.p_InitVelocityConstraints(t_timeStep);
	for(var t_i3=0;t_i3<this.m_m_jointCount;t_i3=t_i3+1){
		t_joint=this.m_m_joints[t_i3];
		t_joint.p_InitVelocityConstraints(t_timeStep);
	}
	for(var t_i4=0;t_i4<t_timeStep.m_velocityIterations;t_i4=t_i4+1){
		for(var t_j2=0;t_j2<this.m_m_jointCount;t_j2=t_j2+1){
			t_joint=this.m_m_joints[t_j2];
			t_joint.p_SolveVelocityConstraints(t_timeStep);
		}
		t_contactSolver.p_SolveVelocityConstraints2();
	}
	for(var t_i5=0;t_i5<this.m_m_jointCount;t_i5=t_i5+1){
		t_joint=this.m_m_joints[t_i5];
		t_joint.p_FinalizeVelocityConstraints();
	}
	t_contactSolver.p_FinalizeVelocityConstraints();
	for(var t_i6=0;t_i6<this.m_m_bodyCount;t_i6=t_i6+1){
		t_b=this.m_m_bodies[t_i6];
		if(t_b.m_m_type==0){
			continue;
		}
		var t_translationX=t_timeStep.m_dt*t_b.m_m_linearVelocity.m_x;
		var t_translationY=t_timeStep.m_dt*t_b.m_m_linearVelocity.m_y;
		if(t_translationX*t_translationX+t_translationY*t_translationY>4.0){
			t_b.m_m_linearVelocity.p_Normalize();
			t_b.m_m_linearVelocity.m_x*=2.0*t_timeStep.m_inv_dt;
			t_b.m_m_linearVelocity.m_y*=2.0*t_timeStep.m_inv_dt;
		}
		var t_rotation=t_timeStep.m_dt*t_b.m_m_angularVelocity;
		if(t_rotation*t_rotation>2.4674010946335061){
			if(t_b.m_m_angularVelocity<0.0){
				t_b.m_m_angularVelocity=-1.5707963250000001*t_timeStep.m_inv_dt;
			}else{
				t_b.m_m_angularVelocity=1.5707963250000001*t_timeStep.m_inv_dt;
			}
		}
		t_b.m_m_sweep.m_c0.p_SetV(t_b.m_m_sweep.m_c);
		t_b.m_m_sweep.m_a0=t_b.m_m_sweep.m_a;
		t_b.m_m_sweep.m_c.m_x+=t_timeStep.m_dt*t_b.m_m_linearVelocity.m_x;
		t_b.m_m_sweep.m_c.m_y+=t_timeStep.m_dt*t_b.m_m_linearVelocity.m_y;
		t_b.m_m_sweep.m_a+=t_timeStep.m_dt*t_b.m_m_angularVelocity;
		t_b.p_SynchronizeTransform();
	}
	for(var t_i7=0;t_i7<t_timeStep.m_positionIterations;t_i7=t_i7+1){
		var t_contactsOkay=t_contactSolver.p_SolvePositionConstraints(0.2);
		var t_jointsOkay=true;
		for(var t_j3=0;t_j3<this.m_m_jointCount;t_j3=t_j3+1){
			t_joint=this.m_m_joints[t_j3];
			var t_jointOkay=t_joint.p_SolvePositionConstraints(0.2);
			t_jointsOkay=t_jointsOkay && t_jointOkay;
		}
		if(t_contactsOkay && t_jointsOkay){
			break;
		}
	}
	this.p_Report(t_contactSolver.m_m_constraints);
	if(t_allowSleep){
		var t_minSleepTime=3.4e38;
		var t_linTolSqr=0.0001;
		var t_angTolSqr=0.0012184696763622254;
		for(var t_i8=0;t_i8<this.m_m_bodyCount;t_i8=t_i8+1){
			t_b=this.m_m_bodies[t_i8];
			if(t_b.m_m_type==0){
				continue;
			}
			if((t_b.m_m_flags&4)==0){
				t_b.m_m_sleepTime=0.0;
				t_minSleepTime=0.0;
			}
			if((t_b.m_m_flags&4)==0 || t_b.m_m_angularVelocity*t_b.m_m_angularVelocity>t_angTolSqr || c_b2Math.m_Dot(t_b.m_m_linearVelocity,t_b.m_m_linearVelocity)>t_linTolSqr){
				t_b.m_m_sleepTime=0.0;
				t_minSleepTime=0.0;
			}else{
				t_b.m_m_sleepTime+=t_timeStep.m_dt;
				t_minSleepTime=c_b2Math.m_Min(t_minSleepTime,t_b.m_m_sleepTime);
			}
		}
		if(t_minSleepTime>=0.5){
			for(var t_i9=0;t_i9<this.m_m_bodyCount;t_i9=t_i9+1){
				t_b=this.m_m_bodies[t_i9];
				t_b.p_SetAwake(false);
			}
		}
	}
}
c_b2Island.prototype.p_SolveTOI=function(t_subStep){
	var t_i=0;
	var t_j=0;
	this.m_m_contactSolver.p_Initialize2(t_subStep,this.m_m_contacts,this.m_m_contactCount,this.m_m_allocator);
	var t_contactSolver=this.m_m_contactSolver;
	for(var t_i2=0;t_i2<this.m_m_jointCount;t_i2=t_i2+1){
		this.m_m_joints[t_i2].p_InitVelocityConstraints(t_subStep);
	}
	for(var t_i3=0;t_i3<t_subStep.m_velocityIterations;t_i3=t_i3+1){
		t_contactSolver.p_SolveVelocityConstraints2();
		for(var t_j2=0;t_j2<this.m_m_jointCount;t_j2=t_j2+1){
			this.m_m_joints[t_j2].p_SolveVelocityConstraints(t_subStep);
		}
	}
	for(var t_i4=0;t_i4<this.m_m_bodyCount;t_i4=t_i4+1){
		var t_b=this.m_m_bodies[t_i4];
		if(t_b.m_m_type==0){
			continue;
		}
		var t_translationX=t_subStep.m_dt*t_b.m_m_linearVelocity.m_x;
		var t_translationY=t_subStep.m_dt*t_b.m_m_linearVelocity.m_y;
		if(t_translationX*t_translationX+t_translationY*t_translationY>4.0){
			t_b.m_m_linearVelocity.p_Normalize();
			t_b.m_m_linearVelocity.m_x*=2.0*t_subStep.m_inv_dt;
			t_b.m_m_linearVelocity.m_y*=2.0*t_subStep.m_inv_dt;
		}
		var t_rotation=t_subStep.m_dt*t_b.m_m_angularVelocity;
		if(t_rotation*t_rotation>2.4674010946335061){
			if(t_b.m_m_angularVelocity<0.0){
				t_b.m_m_angularVelocity=-1.5707963250000001*t_subStep.m_inv_dt;
			}else{
				t_b.m_m_angularVelocity=1.5707963250000001*t_subStep.m_inv_dt;
			}
		}
		t_b.m_m_sweep.m_c0.p_SetV(t_b.m_m_sweep.m_c);
		t_b.m_m_sweep.m_a0=t_b.m_m_sweep.m_a;
		t_b.m_m_sweep.m_c.m_x+=t_subStep.m_dt*t_b.m_m_linearVelocity.m_x;
		t_b.m_m_sweep.m_c.m_y+=t_subStep.m_dt*t_b.m_m_linearVelocity.m_y;
		t_b.m_m_sweep.m_a+=t_subStep.m_dt*t_b.m_m_angularVelocity;
		t_b.p_SynchronizeTransform();
	}
	var t_k_toiBaumgarte=0.75;
	for(var t_i5=0;t_i5<t_subStep.m_positionIterations;t_i5=t_i5+1){
		var t_contactsOkay=t_contactSolver.p_SolvePositionConstraints(t_k_toiBaumgarte);
		var t_jointsOkay=true;
		for(var t_j3=0;t_j3<this.m_m_jointCount;t_j3=t_j3+1){
			var t_jointOkay=this.m_m_joints[t_j3].p_SolvePositionConstraints(0.2);
			t_jointsOkay=t_jointsOkay && t_jointOkay;
		}
		if(t_contactsOkay && t_jointsOkay){
			break;
		}
	}
	this.p_Report(t_contactSolver.m_m_constraints);
}
function c_b2ContactSolver(){
	Object.call(this);
	this.m_constraintCapacity=1000;
	this.m_m_constraints=[];
	this.m_m_step=c_b2TimeStep.m_new.call(new c_b2TimeStep);
	this.m_m_allocator=null;
	this.m_m_constraintCount=0;
}
c_b2ContactSolver.m_new=function(){
	this.m_m_constraints=new_object_array(this.m_constraintCapacity);
	for(var t_i=0;t_i<this.m_constraintCapacity;t_i=t_i+1){
		this.m_m_constraints[t_i]=c_b2ContactConstraint.m_new.call(new c_b2ContactConstraint);
	}
	return this;
}
c_b2ContactSolver.m_s_worldManifold=null;
c_b2ContactSolver.prototype.p_Initialize2=function(t_timeStep,t_contacts,t_contactCount,t_allocator){
	var t_contact=null;
	this.m_m_step.p_Set11(t_timeStep);
	this.m_m_allocator=t_allocator;
	var t_i=0;
	var t_tVec=null;
	var t_tMat=null;
	this.m_m_constraintCount=t_contactCount;
	if(this.m_m_constraintCount>this.m_constraintCapacity){
		this.m_m_constraints=resize_object_array(this.m_m_constraints,this.m_m_constraintCount);
		for(var t_i2=this.m_constraintCapacity;t_i2<this.m_m_constraintCount;t_i2=t_i2+1){
			this.m_m_constraints[t_i2]=c_b2ContactConstraint.m_new.call(new c_b2ContactConstraint);
		}
		this.m_constraintCapacity=this.m_m_constraintCount;
	}
	for(var t_i3=0;t_i3<t_contactCount;t_i3=t_i3+1){
		t_contact=t_contacts[t_i3];
		var t_fixtureA=t_contact.m_m_fixtureA;
		var t_fixtureB=t_contact.m_m_fixtureB;
		var t_shapeA=t_fixtureA.m_m_shape;
		var t_shapeB=t_fixtureB.m_m_shape;
		var t_radiusA=t_shapeA.m_m_radius;
		var t_radiusB=t_shapeB.m_m_radius;
		var t_bodyA=t_fixtureA.m_m_body;
		var t_bodyB=t_fixtureB.m_m_body;
		var t_manifold=t_contact.p_GetManifold();
		var t_friction=c_b2Settings.m_B2MixFriction(t_fixtureA.p_GetFriction(),t_fixtureB.p_GetFriction());
		var t_restitution=c_b2Settings.m_B2MixRestitution(t_fixtureA.p_GetRestitution(),t_fixtureB.p_GetRestitution());
		var t_vAX=t_bodyA.m_m_linearVelocity.m_x;
		var t_vAY=t_bodyA.m_m_linearVelocity.m_y;
		var t_vBX=t_bodyB.m_m_linearVelocity.m_x;
		var t_vBY=t_bodyB.m_m_linearVelocity.m_y;
		var t_wA=t_bodyA.m_m_angularVelocity;
		var t_wB=t_bodyB.m_m_angularVelocity;
		c_b2ContactSolver.m_s_worldManifold.p_Initialize3(t_manifold,t_bodyA.m_m_xf,t_radiusA,t_bodyB.m_m_xf,t_radiusB);
		var t_normalX=c_b2ContactSolver.m_s_worldManifold.m_m_normal.m_x;
		var t_normalY=c_b2ContactSolver.m_s_worldManifold.m_m_normal.m_y;
		var t_cc=this.m_m_constraints[t_i3];
		t_cc.m_bodyA=t_bodyA;
		t_cc.m_bodyB=t_bodyB;
		t_cc.m_manifold=t_manifold;
		t_cc.m_normal.m_x=t_normalX;
		t_cc.m_normal.m_y=t_normalY;
		t_cc.m_pointCount=t_manifold.m_m_pointCount;
		t_cc.m_friction=t_friction;
		t_cc.m_restitution=t_restitution;
		t_cc.m_localPlaneNormal.m_x=t_manifold.m_m_localPlaneNormal.m_x;
		t_cc.m_localPlaneNormal.m_y=t_manifold.m_m_localPlaneNormal.m_y;
		t_cc.m_localPoint.m_x=t_manifold.m_m_localPoint.m_x;
		t_cc.m_localPoint.m_y=t_manifold.m_m_localPoint.m_y;
		t_cc.m_radius=t_radiusA+t_radiusB;
		t_cc.m_type=t_manifold.m_m_type;
		for(var t_k=0;t_k<t_cc.m_pointCount;t_k=t_k+1){
			var t_cp=t_manifold.m_m_points[t_k];
			var t_ccp=t_cc.m_points[t_k];
			t_ccp.m_normalImpulse=t_cp.m_m_normalImpulse;
			t_ccp.m_tangentImpulse=t_cp.m_m_tangentImpulse;
			t_ccp.m_localPoint.m_x=t_cp.m_m_localPoint.m_x;
			t_ccp.m_localPoint.m_y=t_cp.m_m_localPoint.m_y;
			t_ccp.m_rA.m_x=c_b2ContactSolver.m_s_worldManifold.m_m_points[t_k].m_x-t_bodyA.m_m_sweep.m_c.m_x;
			var t_rAX=t_ccp.m_rA.m_x;
			t_ccp.m_rA.m_y=c_b2ContactSolver.m_s_worldManifold.m_m_points[t_k].m_y-t_bodyA.m_m_sweep.m_c.m_y;
			var t_rAY=t_ccp.m_rA.m_y;
			t_ccp.m_rB.m_x=c_b2ContactSolver.m_s_worldManifold.m_m_points[t_k].m_x-t_bodyB.m_m_sweep.m_c.m_x;
			var t_rBX=t_ccp.m_rB.m_x;
			t_ccp.m_rB.m_y=c_b2ContactSolver.m_s_worldManifold.m_m_points[t_k].m_y-t_bodyB.m_m_sweep.m_c.m_y;
			var t_rBY=t_ccp.m_rB.m_y;
			var t_rnA=t_rAX*t_normalY-t_rAY*t_normalX;
			var t_rnB=t_rBX*t_normalY-t_rBY*t_normalX;
			t_rnA*=t_rnA;
			t_rnB*=t_rnB;
			var t_kNormal=t_bodyA.m_m_invMass+t_bodyB.m_m_invMass+t_bodyA.m_m_invI*t_rnA+t_bodyB.m_m_invI*t_rnB;
			t_ccp.m_normalMass=1.0/t_kNormal;
			var t_kEqualized=t_bodyA.m_m_mass*t_bodyA.m_m_invMass+t_bodyB.m_m_mass*t_bodyB.m_m_invMass;
			t_kEqualized+=t_bodyA.m_m_mass*t_bodyA.m_m_invI*t_rnA+t_bodyB.m_m_mass*t_bodyB.m_m_invI*t_rnB;
			t_ccp.m_equalizedMass=1.0/t_kEqualized;
			var t_tangentX=t_normalY;
			var t_tangentY=-t_normalX;
			var t_rtA=t_rAX*t_tangentY-t_rAY*t_tangentX;
			var t_rtB=t_rBX*t_tangentY-t_rBY*t_tangentX;
			t_rtA*=t_rtA;
			t_rtB*=t_rtB;
			var t_kTangent=t_bodyA.m_m_invMass+t_bodyB.m_m_invMass+t_bodyA.m_m_invI*t_rtA+t_bodyB.m_m_invI*t_rtB;
			t_ccp.m_tangentMass=1.0/t_kTangent;
			t_ccp.m_velocityBias=0.0;
			var t_tX=t_vBX+t_wB*-t_rBY-t_vAX-t_wA*-t_rAY;
			var t_tY=t_vBY+t_wB*t_rBX-t_vAY-t_wA*t_rAX;
			var t_vRel=t_cc.m_normal.m_x*t_tX+t_cc.m_normal.m_y*t_tY;
			if(t_vRel<-1.0){
				t_ccp.m_velocityBias+=-t_cc.m_restitution*t_vRel;
			}
		}
		if(t_cc.m_pointCount==2){
			var t_ccp1=t_cc.m_points[0];
			var t_ccp2=t_cc.m_points[1];
			var t_invMassA=t_bodyA.m_m_invMass;
			var t_invIA=t_bodyA.m_m_invI;
			var t_invMassB=t_bodyB.m_m_invMass;
			var t_invIB=t_bodyB.m_m_invI;
			var t_rn1A=t_ccp1.m_rA.m_x*t_normalY-t_ccp1.m_rA.m_y*t_normalX;
			var t_rn1B=t_ccp1.m_rB.m_x*t_normalY-t_ccp1.m_rB.m_y*t_normalX;
			var t_rn2A=t_ccp2.m_rA.m_x*t_normalY-t_ccp2.m_rA.m_y*t_normalX;
			var t_rn2B=t_ccp2.m_rB.m_x*t_normalY-t_ccp2.m_rB.m_y*t_normalX;
			var t_k11=t_invMassA+t_invMassB+t_invIA*t_rn1A*t_rn1A+t_invIB*t_rn1B*t_rn1B;
			var t_k22=t_invMassA+t_invMassB+t_invIA*t_rn2A*t_rn2A+t_invIB*t_rn2B*t_rn2B;
			var t_k12=t_invMassA+t_invMassB+t_invIA*t_rn1A*t_rn2A+t_invIB*t_rn1B*t_rn2B;
			var t_k_maxConditionNumber=100.0;
			if(t_k11*t_k11<t_k_maxConditionNumber*(t_k11*t_k22-t_k12*t_k12)){
				t_cc.m_K.m_col1.m_x=t_k11;
				t_cc.m_K.m_col1.m_y=t_k12;
				t_cc.m_K.m_col2.m_x=t_k12;
				t_cc.m_K.m_col2.m_y=t_k22;
				t_cc.m_K.p_GetInverse(t_cc.m_normalMass);
			}else{
				t_cc.m_pointCount=1;
			}
		}
	}
}
c_b2ContactSolver.prototype.p_InitVelocityConstraints=function(t_timeStep){
	var t_tVec=null;
	var t_tVec2=null;
	var t_tMat=null;
	for(var t_i=0;t_i<this.m_m_constraintCount;t_i=t_i+1){
		var t_c=this.m_m_constraints[t_i];
		var t_bodyA=t_c.m_bodyA;
		var t_bodyB=t_c.m_bodyB;
		var t_invMassA=t_bodyA.m_m_invMass;
		var t_invIA=t_bodyA.m_m_invI;
		var t_invMassB=t_bodyB.m_m_invMass;
		var t_invIB=t_bodyB.m_m_invI;
		var t_normalX=t_c.m_normal.m_x;
		var t_normalY=t_c.m_normal.m_y;
		var t_tangentX=t_normalY;
		var t_tangentY=-t_normalX;
		var t_tX=.0;
		var t_j=0;
		var t_tCount=0;
		if(t_timeStep.m_warmStarting){
			t_tCount=t_c.m_pointCount;
			for(var t_j2=0;t_j2<t_tCount;t_j2=t_j2+1){
				var t_ccp=t_c.m_points[t_j2];
				t_ccp.m_normalImpulse*=t_timeStep.m_dtRatio;
				t_ccp.m_tangentImpulse*=t_timeStep.m_dtRatio;
				var t_PX=t_ccp.m_normalImpulse*t_normalX+t_ccp.m_tangentImpulse*t_tangentX;
				var t_PY=t_ccp.m_normalImpulse*t_normalY+t_ccp.m_tangentImpulse*t_tangentY;
				t_bodyA.m_m_angularVelocity-=t_invIA*(t_ccp.m_rA.m_x*t_PY-t_ccp.m_rA.m_y*t_PX);
				t_bodyA.m_m_linearVelocity.m_x-=t_invMassA*t_PX;
				t_bodyA.m_m_linearVelocity.m_y-=t_invMassA*t_PY;
				t_bodyB.m_m_angularVelocity+=t_invIB*(t_ccp.m_rB.m_x*t_PY-t_ccp.m_rB.m_y*t_PX);
				t_bodyB.m_m_linearVelocity.m_x+=t_invMassB*t_PX;
				t_bodyB.m_m_linearVelocity.m_y+=t_invMassB*t_PY;
			}
		}else{
			t_tCount=t_c.m_pointCount;
			for(var t_j3=0;t_j3<t_tCount;t_j3=t_j3+1){
				var t_ccp2=t_c.m_points[t_j3];
				t_ccp2.m_normalImpulse=0.0;
				t_ccp2.m_tangentImpulse=0.0;
			}
		}
	}
}
c_b2ContactSolver.prototype.p_SolveVelocityConstraints2=function(){
	var t_j=0;
	var t_ccp=null;
	var t_rAX=.0;
	var t_rAY=.0;
	var t_rBX=.0;
	var t_rBY=.0;
	var t_dvX=.0;
	var t_dvY=.0;
	var t_vn=.0;
	var t_vt=.0;
	var t_lambda=.0;
	var t_maxFriction=.0;
	var t_newImpulse=.0;
	var t_PX=.0;
	var t_PY=.0;
	var t_dX=.0;
	var t_dY=.0;
	var t_P1X=.0;
	var t_P1Y=.0;
	var t_P2X=.0;
	var t_P2Y=.0;
	var t_tMat=null;
	var t_tVec=null;
	for(var t_i=0;t_i<this.m_m_constraintCount;t_i=t_i+1){
		var t_c=this.m_m_constraints[t_i];
		var t_bodyA=t_c.m_bodyA;
		var t_bodyB=t_c.m_bodyB;
		var t_wA=t_bodyA.m_m_angularVelocity;
		var t_wB=t_bodyB.m_m_angularVelocity;
		var t_vA=t_bodyA.m_m_linearVelocity;
		var t_vB=t_bodyB.m_m_linearVelocity;
		var t_invMassA=t_bodyA.m_m_invMass;
		var t_invIA=t_bodyA.m_m_invI;
		var t_invMassB=t_bodyB.m_m_invMass;
		var t_invIB=t_bodyB.m_m_invI;
		var t_normalX=t_c.m_normal.m_x;
		var t_normalY=t_c.m_normal.m_y;
		var t_tangentX=t_normalY;
		var t_tangentY=-t_normalX;
		var t_friction=t_c.m_friction;
		var t_tX=.0;
		for(var t_j2=0;t_j2<t_c.m_pointCount;t_j2=t_j2+1){
			t_ccp=t_c.m_points[t_j2];
			t_dvX=t_vB.m_x-t_wB*t_ccp.m_rB.m_y-t_vA.m_x+t_wA*t_ccp.m_rA.m_y;
			t_dvY=t_vB.m_y+t_wB*t_ccp.m_rB.m_x-t_vA.m_y-t_wA*t_ccp.m_rA.m_x;
			t_vt=t_dvX*t_tangentX+t_dvY*t_tangentY;
			t_lambda=t_ccp.m_tangentMass*-t_vt;
			t_maxFriction=t_friction*t_ccp.m_normalImpulse;
			t_newImpulse=t_ccp.m_tangentImpulse+t_lambda;
			if(t_newImpulse<-t_maxFriction){
				t_newImpulse=-t_maxFriction;
			}else{
				if(t_newImpulse>t_maxFriction){
					t_newImpulse=t_maxFriction;
				}
			}
			t_lambda=t_newImpulse-t_ccp.m_tangentImpulse;
			t_PX=t_lambda*t_tangentX;
			t_PY=t_lambda*t_tangentY;
			t_vA.m_x-=t_invMassA*t_PX;
			t_vA.m_y-=t_invMassA*t_PY;
			t_wA-=t_invIA*(t_ccp.m_rA.m_x*t_PY-t_ccp.m_rA.m_y*t_PX);
			t_vB.m_x+=t_invMassB*t_PX;
			t_vB.m_y+=t_invMassB*t_PY;
			t_wB+=t_invIB*(t_ccp.m_rB.m_x*t_PY-t_ccp.m_rB.m_y*t_PX);
			t_ccp.m_tangentImpulse=t_newImpulse;
		}
		var t_tCount=t_c.m_pointCount;
		if(t_c.m_pointCount==1){
			t_ccp=t_c.m_points[0];
			var t_ccpRa=t_ccp.m_rA;
			var t_ccpRb=t_ccp.m_rB;
			t_dvX=t_vB.m_x+t_wB*-t_ccpRb.m_y-t_vA.m_x-t_wA*-t_ccpRa.m_y;
			t_dvY=t_vB.m_y+t_wB*t_ccpRb.m_x-t_vA.m_y-t_wA*t_ccpRa.m_x;
			t_vn=t_dvX*t_normalX+t_dvY*t_normalY;
			t_lambda=-t_ccp.m_normalMass*(t_vn-t_ccp.m_velocityBias);
			t_newImpulse=t_ccp.m_normalImpulse+t_lambda;
			if(t_newImpulse<0.0){
				t_newImpulse=0.0;
			}
			t_lambda=t_newImpulse-t_ccp.m_normalImpulse;
			t_PX=t_lambda*t_normalX;
			t_PY=t_lambda*t_normalY;
			t_vA.m_x-=t_invMassA*t_PX;
			t_vA.m_y-=t_invMassA*t_PY;
			t_wA-=t_invIA*(t_ccpRa.m_x*t_PY-t_ccpRa.m_y*t_PX);
			t_vB.m_x+=t_invMassB*t_PX;
			t_vB.m_y+=t_invMassB*t_PY;
			t_wB+=t_invIB*(t_ccpRb.m_x*t_PY-t_ccpRb.m_y*t_PX);
			t_ccp.m_normalImpulse=t_newImpulse;
		}else{
			var t_cp1=t_c.m_points[0];
			var t_cp1rA=t_cp1.m_rA;
			var t_cp1rB=t_cp1.m_rB;
			var t_cp2=t_c.m_points[1];
			var t_cp2rA=t_cp2.m_rA;
			var t_cp2rB=t_cp2.m_rB;
			var t_aX=t_cp1.m_normalImpulse;
			var t_aY=t_cp2.m_normalImpulse;
			var t_dv1X=t_vB.m_x-t_wB*t_cp1rB.m_y-t_vA.m_x+t_wA*t_cp1rA.m_y;
			var t_dv1Y=t_vB.m_y+t_wB*t_cp1rB.m_x-t_vA.m_y-t_wA*t_cp1rA.m_x;
			var t_dv2X=t_vB.m_x-t_wB*t_cp2rB.m_y-t_vA.m_x+t_wA*t_cp2rA.m_y;
			var t_dv2Y=t_vB.m_y+t_wB*t_cp2rB.m_x-t_vA.m_y-t_wA*t_cp2rA.m_x;
			var t_vn1=t_dv1X*t_normalX+t_dv1Y*t_normalY;
			var t_vn2=t_dv2X*t_normalX+t_dv2Y*t_normalY;
			var t_bX=t_vn1-t_cp1.m_velocityBias;
			var t_bY=t_vn2-t_cp2.m_velocityBias;
			t_tMat=t_c.m_K;
			t_bX-=t_tMat.m_col1.m_x*t_aX+t_tMat.m_col2.m_x*t_aY;
			t_bY-=t_tMat.m_col1.m_y*t_aX+t_tMat.m_col2.m_y*t_aY;
			var t_k_errorTol=0.001;
			while(true){
				t_tMat=t_c.m_normalMass;
				var t_xX=-(t_tMat.m_col1.m_x*t_bX+t_tMat.m_col2.m_x*t_bY);
				var t_xY=-(t_tMat.m_col1.m_y*t_bX+t_tMat.m_col2.m_y*t_bY);
				if(t_xX>=0.0 && t_xY>=0.0){
					t_dX=t_xX-t_aX;
					t_dY=t_xY-t_aY;
					t_P1X=t_dX*t_normalX;
					t_P1Y=t_dX*t_normalY;
					t_P2X=t_dY*t_normalX;
					t_P2Y=t_dY*t_normalY;
					t_vA.m_x-=t_invMassA*(t_P1X+t_P2X);
					t_vA.m_y-=t_invMassA*(t_P1Y+t_P2Y);
					t_wA-=t_invIA*(t_cp1rA.m_x*t_P1Y-t_cp1rA.m_y*t_P1X+t_cp2rA.m_x*t_P2Y-t_cp2rA.m_y*t_P2X);
					t_vB.m_x+=t_invMassB*(t_P1X+t_P2X);
					t_vB.m_y+=t_invMassB*(t_P1Y+t_P2Y);
					t_wB+=t_invIB*(t_cp1rB.m_x*t_P1Y-t_cp1rB.m_y*t_P1X+t_cp2rB.m_x*t_P2Y-t_cp2rB.m_y*t_P2X);
					t_cp1.m_normalImpulse=t_xX;
					t_cp2.m_normalImpulse=t_xY;
					break;
				}
				t_xX=-t_cp1.m_normalMass*t_bX;
				t_xY=0.0;
				t_vn1=0.0;
				t_vn2=t_c.m_K.m_col1.m_y*t_xX+t_bY;
				if(t_xX>=0.0 && t_vn2>=0.0){
					t_dX=t_xX-t_aX;
					t_dY=t_xY-t_aY;
					t_P1X=t_dX*t_normalX;
					t_P1Y=t_dX*t_normalY;
					t_P2X=t_dY*t_normalX;
					t_P2Y=t_dY*t_normalY;
					t_vA.m_x-=t_invMassA*(t_P1X+t_P2X);
					t_vA.m_y-=t_invMassA*(t_P1Y+t_P2Y);
					t_wA-=t_invIA*(t_cp1rA.m_x*t_P1Y-t_cp1rA.m_y*t_P1X+t_cp2rA.m_x*t_P2Y-t_cp2rA.m_y*t_P2X);
					t_vB.m_x+=t_invMassB*(t_P1X+t_P2X);
					t_vB.m_y+=t_invMassB*(t_P1Y+t_P2Y);
					t_wB+=t_invIB*(t_cp1rB.m_x*t_P1Y-t_cp1rB.m_y*t_P1X+t_cp2rB.m_x*t_P2Y-t_cp2rB.m_y*t_P2X);
					t_cp1.m_normalImpulse=t_xX;
					t_cp2.m_normalImpulse=t_xY;
					break;
				}
				t_xX=0.0;
				t_xY=-t_cp2.m_normalMass*t_bY;
				t_vn1=t_c.m_K.m_col2.m_x*t_xY+t_bX;
				t_vn2=0.0;
				if(t_xY>=0.0 && t_vn1>=0.0){
					t_dX=t_xX-t_aX;
					t_dY=t_xY-t_aY;
					t_P1X=t_dX*t_normalX;
					t_P1Y=t_dX*t_normalY;
					t_P2X=t_dY*t_normalX;
					t_P2Y=t_dY*t_normalY;
					t_vA.m_x-=t_invMassA*(t_P1X+t_P2X);
					t_vA.m_y-=t_invMassA*(t_P1Y+t_P2Y);
					t_wA-=t_invIA*(t_cp1rA.m_x*t_P1Y-t_cp1rA.m_y*t_P1X+t_cp2rA.m_x*t_P2Y-t_cp2rA.m_y*t_P2X);
					t_vB.m_x+=t_invMassB*(t_P1X+t_P2X);
					t_vB.m_y+=t_invMassB*(t_P1Y+t_P2Y);
					t_wB+=t_invIB*(t_cp1rB.m_x*t_P1Y-t_cp1rB.m_y*t_P1X+t_cp2rB.m_x*t_P2Y-t_cp2rB.m_y*t_P2X);
					t_cp1.m_normalImpulse=t_xX;
					t_cp2.m_normalImpulse=t_xY;
					break;
				}
				t_xX=0.0;
				t_xY=0.0;
				t_vn1=t_bX;
				t_vn2=t_bY;
				if(t_vn1>=0.0 && t_vn2>=0.0){
					t_dX=t_xX-t_aX;
					t_dY=t_xY-t_aY;
					t_P1X=t_dX*t_normalX;
					t_P1Y=t_dX*t_normalY;
					t_P2X=t_dY*t_normalX;
					t_P2Y=t_dY*t_normalY;
					t_vA.m_x-=t_invMassA*(t_P1X+t_P2X);
					t_vA.m_y-=t_invMassA*(t_P1Y+t_P2Y);
					t_wA-=t_invIA*(t_cp1rA.m_x*t_P1Y-t_cp1rA.m_y*t_P1X+t_cp2rA.m_x*t_P2Y-t_cp2rA.m_y*t_P2X);
					t_vB.m_x+=t_invMassB*(t_P1X+t_P2X);
					t_vB.m_y+=t_invMassB*(t_P1Y+t_P2Y);
					t_wB+=t_invIB*(t_cp1rB.m_x*t_P1Y-t_cp1rB.m_y*t_P1X+t_cp2rB.m_x*t_P2Y-t_cp2rB.m_y*t_P2X);
					t_cp1.m_normalImpulse=t_xX;
					t_cp2.m_normalImpulse=t_xY;
					break;
				}
				break;
			}
		}
		t_bodyA.m_m_angularVelocity=t_wA;
		t_bodyB.m_m_angularVelocity=t_wB;
	}
}
c_b2ContactSolver.prototype.p_FinalizeVelocityConstraints=function(){
	for(var t_i=0;t_i<this.m_m_constraintCount;t_i=t_i+1){
		var t_c=this.m_m_constraints[t_i];
		var t_m=t_c.m_manifold;
		for(var t_j=0;t_j<t_c.m_pointCount;t_j=t_j+1){
			var t_point1=t_m.m_m_points[t_j];
			var t_point2=t_c.m_points[t_j];
			t_point1.m_m_normalImpulse=t_point2.m_normalImpulse;
			t_point1.m_m_tangentImpulse=t_point2.m_tangentImpulse;
		}
	}
}
c_b2ContactSolver.m_s_psm=null;
c_b2ContactSolver.prototype.p_SolvePositionConstraints=function(t_baumgarte){
	var t_minSeparation=0.0;
	for(var t_i=0;t_i<this.m_m_constraintCount;t_i=t_i+1){
		var t_c=this.m_m_constraints[t_i];
		var t_bodyA=t_c.m_bodyA;
		var t_bodyB=t_c.m_bodyB;
		var t_invMassA=t_bodyA.m_m_mass*t_bodyA.m_m_invMass;
		var t_invIA=t_bodyA.m_m_mass*t_bodyA.m_m_invI;
		var t_invMassB=t_bodyB.m_m_mass*t_bodyB.m_m_invMass;
		var t_invIB=t_bodyB.m_m_mass*t_bodyB.m_m_invI;
		c_b2ContactSolver.m_s_psm.p_Initialize4(t_c);
		var t_normal=c_b2ContactSolver.m_s_psm.m_m_normal;
		var t_ba_sweep=t_bodyA.m_m_sweep;
		var t_ba_sweepc=t_ba_sweep.m_c;
		var t_ba_xf=t_bodyA.m_m_xf;
		var t_ba_xfPos=t_ba_xf.m_position;
		var t_ba_tMat=t_ba_xf.m_R;
		var t_ba_tMat_col1=t_ba_tMat.m_col1;
		var t_ba_tMat_col2=t_ba_tMat.m_col2;
		var t_ba_tVec=t_ba_sweep.m_localCenter;
		var t_bb_sweep=t_bodyB.m_m_sweep;
		var t_bb_sweepc=t_bb_sweep.m_c;
		var t_bb_xf=t_bodyB.m_m_xf;
		var t_bb_xfPos=t_bb_xf.m_position;
		var t_bb_tMat=t_bb_xf.m_R;
		var t_bb_tMat_col1=t_bb_tMat.m_col1;
		var t_bb_tMat_col2=t_bb_tMat.m_col2;
		var t_bb_tVec=t_bb_sweep.m_localCenter;
		for(var t_j=0;t_j<t_c.m_pointCount;t_j=t_j+1){
			var t_ccp=t_c.m_points[t_j];
			var t_point=c_b2ContactSolver.m_s_psm.m_m_points[t_j];
			var t_separation=c_b2ContactSolver.m_s_psm.m_m_separations[t_j];
			var t_rAX=t_point.m_x-t_ba_sweepc.m_x;
			var t_rAY=t_point.m_y-t_ba_sweepc.m_y;
			var t_rBX=t_point.m_x-t_bb_sweepc.m_x;
			var t_rBY=t_point.m_y-t_bb_sweepc.m_y;
			if(t_minSeparation<t_separation){
				t_minSeparation=t_minSeparation;
			}else{
				t_minSeparation=t_separation;
			}
			var t_C2=t_baumgarte*(t_separation+0.005);
			if(t_C2<-0.2){
				t_C2=-0.2;
			}else{
				if(t_C2>0.0){
					t_C2=0.0;
				}
			}
			var t_impulse=-t_ccp.m_equalizedMass*t_C2;
			var t_PX=t_impulse*t_normal.m_x;
			var t_PY=t_impulse*t_normal.m_y;
			t_ba_sweepc.m_x-=t_invMassA*t_PX;
			t_ba_sweepc.m_y-=t_invMassA*t_PY;
			t_ba_sweep.m_a-=t_invIA*(t_rAX*t_PY-t_rAY*t_PX);
			var t_c3=Math.cos(t_ba_sweep.m_a);
			var t_s=Math.sin(t_ba_sweep.m_a);
			t_ba_tMat_col1.m_x=t_c3;
			t_ba_tMat_col2.m_x=-t_s;
			t_ba_tMat_col1.m_y=t_s;
			t_ba_tMat_col2.m_y=t_c3;
			t_ba_xfPos.m_x=t_ba_sweepc.m_x-(t_ba_tMat_col1.m_x*t_ba_tVec.m_x+t_ba_tMat_col2.m_x*t_ba_tVec.m_y);
			t_ba_xfPos.m_y=t_ba_sweepc.m_y-(t_ba_tMat_col1.m_y*t_ba_tVec.m_x+t_ba_tMat_col2.m_y*t_ba_tVec.m_y);
			t_bb_sweepc.m_x+=t_invMassB*t_PX;
			t_bb_sweepc.m_y+=t_invMassB*t_PY;
			t_bb_sweep.m_a+=t_invIB*(t_rBX*t_PY-t_rBY*t_PX);
			t_c3=Math.cos(t_bb_sweep.m_a);
			t_s=Math.sin(t_bb_sweep.m_a);
			t_bb_tMat_col1.m_x=t_c3;
			t_bb_tMat_col2.m_x=-t_s;
			t_bb_tMat_col1.m_y=t_s;
			t_bb_tMat_col2.m_y=t_c3;
			t_bb_xfPos.m_x=t_bb_sweepc.m_x-(t_bb_tMat_col1.m_x*t_bb_tVec.m_x+t_bb_tMat_col2.m_x*t_bb_tVec.m_y);
			t_bb_xfPos.m_y=t_bb_sweepc.m_y-(t_bb_tMat_col1.m_y*t_bb_tVec.m_x+t_bb_tMat_col2.m_y*t_bb_tVec.m_y);
		}
	}
	return t_minSeparation>-0.0074999999999999997;
}
function c_b2ContactConstraint(){
	Object.call(this);
	this.m_points=[];
	this.m_bodyA=null;
	this.m_bodyB=null;
	this.m_manifold=null;
	this.m_normal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_pointCount=0;
	this.m_friction=.0;
	this.m_restitution=.0;
	this.m_localPlaneNormal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_localPoint=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_radius=.0;
	this.m_type=0;
	this.m_K=c_b2Mat22.m_new.call(new c_b2Mat22);
	this.m_normalMass=c_b2Mat22.m_new.call(new c_b2Mat22);
}
c_b2ContactConstraint.m_new=function(){
	this.m_points=new_object_array(2);
	for(var t_i=0;t_i<2;t_i=t_i+1){
		this.m_points[t_i]=c_b2ContactConstraintPoint.m_new.call(new c_b2ContactConstraintPoint);
	}
	return this;
}
function c_b2ContactConstraintPoint(){
	Object.call(this);
	this.m_normalImpulse=.0;
	this.m_tangentImpulse=.0;
	this.m_localPoint=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_rA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_rB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_normalMass=.0;
	this.m_equalizedMass=.0;
	this.m_tangentMass=.0;
	this.m_velocityBias=.0;
}
c_b2ContactConstraintPoint.m_new=function(){
	return this;
}
function c_b2WorldManifold(){
	Object.call(this);
	this.m_m_points=[];
	this.m_m_normal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2WorldManifold.m_new=function(){
	this.m_m_points=new_object_array(2);
	for(var t_i=0;t_i<2;t_i=t_i+1){
		this.m_m_points[t_i]=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	}
	return this;
}
c_b2WorldManifold.prototype.p_Initialize3=function(t_manifold,t_xfA,t_radiusA,t_xfB,t_radiusB){
	if(t_manifold.m_m_pointCount==0){
		return;
	}
	var t_i=0;
	var t_tVec=null;
	var t_tMat=null;
	var t_normalX=.0;
	var t_normalY=.0;
	var t_planePointX=.0;
	var t_planePointY=.0;
	var t_clipPointX=.0;
	var t_clipPointY=.0;
	var t_1=t_manifold.m_m_type;
	if(t_1==1){
		t_tMat=t_xfA.m_R;
		t_tVec=t_manifold.m_m_localPoint;
		var t_pointAX=t_xfA.m_position.m_x+t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
		var t_pointAY=t_xfA.m_position.m_y+t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
		t_tMat=t_xfB.m_R;
		t_tVec=t_manifold.m_m_points[0].m_m_localPoint;
		var t_pointBX=t_xfB.m_position.m_x+t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
		var t_pointBY=t_xfB.m_position.m_y+t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
		var t_dX=t_pointBX-t_pointAX;
		var t_dY=t_pointBY-t_pointAY;
		var t_d2=t_dX*t_dX+t_dY*t_dY;
		if(t_d2>1.0000000000000001e-030){
			var t_d=Math.sqrt(t_d2);
			this.m_m_normal.m_x=t_dX/t_d;
			this.m_m_normal.m_y=t_dY/t_d;
		}else{
			this.m_m_normal.m_x=1.0;
			this.m_m_normal.m_y=0.0;
		}
		var t_cAX=t_pointAX+t_radiusA*this.m_m_normal.m_x;
		var t_cAY=t_pointAY+t_radiusA*this.m_m_normal.m_y;
		var t_cBX=t_pointBX-t_radiusB*this.m_m_normal.m_x;
		var t_cBY=t_pointBY-t_radiusB*this.m_m_normal.m_y;
		this.m_m_points[0].m_x=0.5*(t_cAX+t_cBX);
		this.m_m_points[0].m_y=0.5*(t_cAY+t_cBY);
	}else{
		if(t_1==2){
			t_tMat=t_xfA.m_R;
			t_tVec=t_manifold.m_m_localPlaneNormal;
			t_normalX=t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
			t_normalY=t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
			t_tMat=t_xfA.m_R;
			t_tVec=t_manifold.m_m_localPoint;
			t_planePointX=t_xfA.m_position.m_x+t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
			t_planePointY=t_xfA.m_position.m_y+t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
			this.m_m_normal.m_x=t_normalX;
			this.m_m_normal.m_y=t_normalY;
			for(var t_i2=0;t_i2<t_manifold.m_m_pointCount;t_i2=t_i2+1){
				t_tMat=t_xfB.m_R;
				t_tVec=t_manifold.m_m_points[t_i2].m_m_localPoint;
				t_clipPointX=t_xfB.m_position.m_x+t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
				t_clipPointY=t_xfB.m_position.m_y+t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
				this.m_m_points[t_i2].m_x=t_clipPointX+0.5*(t_radiusA-(t_clipPointX-t_planePointX)*t_normalX-(t_clipPointY-t_planePointY)*t_normalY-t_radiusB)*t_normalX;
				this.m_m_points[t_i2].m_y=t_clipPointY+0.5*(t_radiusA-(t_clipPointX-t_planePointX)*t_normalX-(t_clipPointY-t_planePointY)*t_normalY-t_radiusB)*t_normalY;
			}
		}else{
			if(t_1==4){
				t_tMat=t_xfB.m_R;
				t_tVec=t_manifold.m_m_localPlaneNormal;
				t_normalX=t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
				t_normalY=t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
				t_tMat=t_xfB.m_R;
				t_tVec=t_manifold.m_m_localPoint;
				t_planePointX=t_xfB.m_position.m_x+t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
				t_planePointY=t_xfB.m_position.m_y+t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
				this.m_m_normal.m_x=-t_normalX;
				this.m_m_normal.m_y=-t_normalY;
				for(var t_i3=0;t_i3<t_manifold.m_m_pointCount;t_i3=t_i3+1){
					t_tMat=t_xfA.m_R;
					t_tVec=t_manifold.m_m_points[t_i3].m_m_localPoint;
					t_clipPointX=t_xfA.m_position.m_x+t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
					t_clipPointY=t_xfA.m_position.m_y+t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
					this.m_m_points[t_i3].m_x=t_clipPointX+0.5*(t_radiusB-(t_clipPointX-t_planePointX)*t_normalX-(t_clipPointY-t_planePointY)*t_normalY-t_radiusA)*t_normalX;
					this.m_m_points[t_i3].m_y=t_clipPointY+0.5*(t_radiusB-(t_clipPointX-t_planePointX)*t_normalX-(t_clipPointY-t_planePointY)*t_normalY-t_radiusA)*t_normalY;
				}
			}
		}
	}
}
function c_b2PositionSolverManifold(){
	Object.call(this);
	this.m_m_normal=null;
	this.m_m_separations=[];
	this.m_m_points=[];
}
c_b2PositionSolverManifold.m_new=function(){
	this.m_m_normal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_separations=new_number_array(2);
	this.m_m_points=new_object_array(2);
	for(var t_i=0;t_i<this.m_m_points.length;t_i=t_i+1){
		this.m_m_points[t_i]=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	}
	return this;
}
c_b2PositionSolverManifold.prototype.p_Initialize4=function(t_cc){
	var t_i=0;
	var t_pointCount=t_cc.m_pointCount;
	var t_clipPointX=.0;
	var t_clipPointY=.0;
	var t_tTrans=null;
	var t_tMat=null;
	var t_tVec=null;
	var t_tmpPos=null;
	var t_planePointX=.0;
	var t_planePointY=.0;
	var t_1=t_cc.m_type;
	if(t_1==1){
		t_tTrans=t_cc.m_bodyA.m_m_xf;
		t_tMat=t_tTrans.m_R;
		t_tVec=t_cc.m_localPoint;
		t_tmpPos=t_tTrans.m_position;
		var t_pointAX=t_tmpPos.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
		var t_pointAY=t_tmpPos.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
		t_tTrans=t_cc.m_bodyB.m_m_xf;
		t_tMat=t_tTrans.m_R;
		t_tVec=t_cc.m_points[0].m_localPoint;
		t_tmpPos=t_tTrans.m_position;
		var t_pointBX=t_tmpPos.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
		var t_pointBY=t_tmpPos.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
		var t_dX=t_pointBX-t_pointAX;
		var t_dY=t_pointBY-t_pointAY;
		var t_d2=t_dX*t_dX+t_dY*t_dY;
		if(t_d2>1.0000000000000001e-030){
			var t_d=Math.sqrt(t_d2);
			this.m_m_normal.m_x=t_dX/t_d;
			this.m_m_normal.m_y=t_dY/t_d;
		}else{
			this.m_m_normal.m_x=1.0;
			this.m_m_normal.m_y=0.0;
		}
		this.m_m_points[0].m_x=0.5*(t_pointAX+t_pointBX);
		this.m_m_points[0].m_y=0.5*(t_pointAY+t_pointBY);
		this.m_m_separations[0]=t_dX*this.m_m_normal.m_x+t_dY*this.m_m_normal.m_y-t_cc.m_radius;
	}else{
		if(t_1==2){
			t_tTrans=t_cc.m_bodyA.m_m_xf;
			t_tMat=t_tTrans.m_R;
			t_tVec=t_cc.m_localPlaneNormal;
			t_tmpPos=t_tTrans.m_position;
			var t_tMatCol1=t_tMat.m_col1;
			var t_tMatCol2=t_tMat.m_col2;
			var t_mc1X=t_tMatCol1.m_x;
			var t_mc1Y=t_tMatCol1.m_y;
			var t_mc2X=t_tMatCol2.m_x;
			var t_mc2Y=t_tMatCol2.m_y;
			this.m_m_normal.m_x=t_mc1X*t_tVec.m_x+t_mc2X*t_tVec.m_y;
			this.m_m_normal.m_y=t_mc1Y*t_tVec.m_x+t_mc2Y*t_tVec.m_y;
			t_tVec=t_cc.m_localPoint;
			t_planePointX=t_tmpPos.m_x+(t_mc1X*t_tVec.m_x+t_mc2X*t_tVec.m_y);
			t_planePointY=t_tmpPos.m_y+(t_mc1Y*t_tVec.m_x+t_mc2Y*t_tVec.m_y);
			t_tTrans=t_cc.m_bodyB.m_m_xf;
			t_tMat=t_tTrans.m_R;
			t_tmpPos=t_tTrans.m_position;
			t_tMatCol1=t_tMat.m_col1;
			t_tMatCol2=t_tMat.m_col2;
			var t_normX=this.m_m_normal.m_x;
			var t_normY=this.m_m_normal.m_y;
			var t_ccRad=t_cc.m_radius;
			t_mc1X=t_tMatCol1.m_x;
			t_mc1Y=t_tMatCol1.m_y;
			t_mc2X=t_tMatCol2.m_x;
			t_mc2Y=t_tMatCol2.m_y;
			var t_tmpX=t_tmpPos.m_x;
			var t_tmpY=t_tmpPos.m_y;
			for(var t_i2=0;t_i2<t_pointCount;t_i2=t_i2+1){
				t_tVec=t_cc.m_points[t_i2].m_localPoint;
				t_clipPointX=t_tmpX+(t_mc1X*t_tVec.m_x+t_mc2X*t_tVec.m_y);
				t_clipPointY=t_tmpY+(t_mc1Y*t_tVec.m_x+t_mc2Y*t_tVec.m_y);
				this.m_m_separations[t_i2]=(t_clipPointX-t_planePointX)*t_normX+(t_clipPointY-t_planePointY)*t_normY-t_ccRad;
				this.m_m_points[t_i2].m_x=t_clipPointX;
				this.m_m_points[t_i2].m_y=t_clipPointY;
			}
		}else{
			if(t_1==4){
				t_tTrans=t_cc.m_bodyB.m_m_xf;
				t_tMat=t_tTrans.m_R;
				t_tmpPos=t_tTrans.m_position;
				t_tVec=t_cc.m_localPlaneNormal;
				var t_tMatCol12=t_tMat.m_col1;
				var t_tMatCol22=t_tMat.m_col2;
				var t_mc1X2=t_tMatCol12.m_x;
				var t_mc1Y2=t_tMatCol12.m_y;
				var t_mc2X2=t_tMatCol22.m_x;
				var t_mc2Y2=t_tMatCol22.m_y;
				this.m_m_normal.m_x=t_mc1X2*t_tVec.m_x+t_mc2X2*t_tVec.m_y;
				this.m_m_normal.m_y=t_mc1Y2*t_tVec.m_x+t_mc2Y2*t_tVec.m_y;
				t_tVec=t_cc.m_localPoint;
				t_planePointX=t_tmpPos.m_x+(t_mc1X2*t_tVec.m_x+t_mc2X2*t_tVec.m_y);
				t_planePointY=t_tmpPos.m_y+(t_mc1Y2*t_tVec.m_x+t_mc2Y2*t_tVec.m_y);
				t_tTrans=t_cc.m_bodyA.m_m_xf;
				t_tMat=t_tTrans.m_R;
				t_tmpPos=t_tTrans.m_position;
				t_tMatCol12=t_tMat.m_col1;
				t_tMatCol22=t_tMat.m_col2;
				var t_normX2=this.m_m_normal.m_x;
				var t_normY2=this.m_m_normal.m_y;
				var t_ccRad2=t_cc.m_radius;
				t_mc1X2=t_tMatCol12.m_x;
				t_mc1Y2=t_tMatCol12.m_y;
				t_mc2X2=t_tMatCol22.m_x;
				t_mc2Y2=t_tMatCol22.m_y;
				var t_tmpX2=t_tmpPos.m_x;
				var t_tmpY2=t_tmpPos.m_y;
				for(var t_i3=0;t_i3<t_pointCount;t_i3=t_i3+1){
					t_tVec=t_cc.m_points[t_i3].m_localPoint;
					t_clipPointX=t_tmpX2+(t_mc1X2*t_tVec.m_x+t_mc2X2*t_tVec.m_y);
					t_clipPointY=t_tmpY2+(t_mc1Y2*t_tVec.m_x+t_mc2Y2*t_tVec.m_y);
					this.m_m_separations[t_i3]=(t_clipPointX-t_planePointX)*t_normX2+(t_clipPointY-t_planePointY)*t_normY2-t_ccRad2;
					this.m_m_points[t_i3].m_x=t_clipPointX;
					this.m_m_points[t_i3].m_y=t_clipPointY;
				}
				this.m_m_normal.m_x=this.m_m_normal.m_x*-1.0;
				this.m_m_normal.m_y=this.m_m_normal.m_y*-1.0;
			}
		}
	}
}
function c_b2ContactImpulse(){
	Object.call(this);
	this.m_normalImpulses=new_number_array(2);
	this.m_tangentImpulses=new_number_array(2);
}
c_b2ContactImpulse.m_new=function(){
	return this;
}
function c_b2TOIInput(){
	Object.call(this);
	this.m_proxyA=c_b2DistanceProxy.m_new.call(new c_b2DistanceProxy);
	this.m_proxyB=c_b2DistanceProxy.m_new.call(new c_b2DistanceProxy);
	this.m_sweepA=c_b2Sweep.m_new.call(new c_b2Sweep);
	this.m_sweepB=c_b2Sweep.m_new.call(new c_b2Sweep);
	this.m_tolerance=.0;
}
c_b2TOIInput.m_new=function(){
	return this;
}
function c_b2TimeOfImpact(){
	Object.call(this);
}
c_b2TimeOfImpact.m_b2_toiCalls=0;
c_b2TimeOfImpact.m_s_cache=null;
c_b2TimeOfImpact.m_s_distanceInput=null;
c_b2TimeOfImpact.m_s_xfA=null;
c_b2TimeOfImpact.m_s_xfB=null;
c_b2TimeOfImpact.m_s_distanceOutput=null;
c_b2TimeOfImpact.m_s_fcn=null;
c_b2TimeOfImpact.m_b2_toiRootIters=0;
c_b2TimeOfImpact.m_b2_toiMaxRootIters=0;
c_b2TimeOfImpact.m_b2_toiIters=0;
c_b2TimeOfImpact.m_b2_toiMaxIters=0;
c_b2TimeOfImpact.m_TimeOfImpact=function(t_input){
	c_b2TimeOfImpact.m_b2_toiCalls+=1;
	var t_proxyA=t_input.m_proxyA;
	var t_proxyB=t_input.m_proxyB;
	var t_sweepA=t_input.m_sweepA;
	var t_sweepB=t_input.m_sweepB;
	var t_radius=t_proxyA.m_m_radius+t_proxyB.m_m_radius;
	var t_tolerance=t_input.m_tolerance;
	var t_alpha=0.0;
	var t_iter=0;
	var t_target=0.0;
	c_b2TimeOfImpact.m_s_cache.m_count=0;
	c_b2TimeOfImpact.m_s_distanceInput.m_useRadii=false;
	while(true){
		t_sweepA.p_GetTransform2(c_b2TimeOfImpact.m_s_xfA,t_alpha);
		t_sweepB.p_GetTransform2(c_b2TimeOfImpact.m_s_xfB,t_alpha);
		c_b2TimeOfImpact.m_s_distanceInput.m_proxyA=t_proxyA;
		c_b2TimeOfImpact.m_s_distanceInput.m_proxyB=t_proxyB;
		c_b2TimeOfImpact.m_s_distanceInput.m_transformA=c_b2TimeOfImpact.m_s_xfA;
		c_b2TimeOfImpact.m_s_distanceInput.m_transformB=c_b2TimeOfImpact.m_s_xfB;
		c_b2Distance.m_Distance(c_b2TimeOfImpact.m_s_distanceOutput,c_b2TimeOfImpact.m_s_cache,c_b2TimeOfImpact.m_s_distanceInput);
		if(c_b2TimeOfImpact.m_s_distanceOutput.m_distance<=0.0){
			t_alpha=1.0;
			break;
		}
		c_b2TimeOfImpact.m_s_fcn.p_Initialize5(c_b2TimeOfImpact.m_s_cache,t_proxyA,t_sweepA,t_proxyB,t_sweepB,t_alpha);
		var t_separation=c_b2TimeOfImpact.m_s_fcn.p_Evaluate2(c_b2TimeOfImpact.m_s_xfA,c_b2TimeOfImpact.m_s_xfB);
		if(t_separation<=0.0){
			t_alpha=1.0;
			break;
		}
		if(t_iter==0){
			if(t_separation>t_radius){
				t_target=c_b2Math.m_Max(t_radius-t_tolerance,0.75*t_radius);
			}else{
				t_target=c_b2Math.m_Max(t_separation-t_tolerance,0.02*t_radius);
			}
		}
		if(t_separation-t_target<0.5*t_tolerance){
			if(t_iter==0){
				t_alpha=1.0;
				break;
			}
			break;
		}
		var t_newAlpha=t_alpha;
		var t_x1=t_alpha;
		var t_x2=1.0;
		var t_f1=t_separation;
		t_sweepA.p_GetTransform2(c_b2TimeOfImpact.m_s_xfA,t_x2);
		t_sweepB.p_GetTransform2(c_b2TimeOfImpact.m_s_xfB,t_x2);
		var t_f2=c_b2TimeOfImpact.m_s_fcn.p_Evaluate2(c_b2TimeOfImpact.m_s_xfA,c_b2TimeOfImpact.m_s_xfB);
		if(t_f2>=t_target){
			t_alpha=1.0;
			break;
		}
		var t_rootIterCount=0;
		while(true){
			var t_x=.0;
			if((t_rootIterCount&1)!=0){
				t_x=t_x1+(t_target-t_f1)*(t_x2-t_x1)/(t_f2-t_f1);
			}else{
				t_x=0.5*(t_x1+t_x2);
			}
			t_sweepA.p_GetTransform2(c_b2TimeOfImpact.m_s_xfA,t_x);
			t_sweepB.p_GetTransform2(c_b2TimeOfImpact.m_s_xfB,t_x);
			var t_f=c_b2TimeOfImpact.m_s_fcn.p_Evaluate2(c_b2TimeOfImpact.m_s_xfA,c_b2TimeOfImpact.m_s_xfB);
			if(c_b2Math.m_Abs(t_f-t_target)<0.025*t_tolerance){
				t_newAlpha=t_x;
				break;
			}
			if(t_f>t_target){
				t_x1=t_x;
				t_f1=t_f;
			}else{
				t_x2=t_x;
				t_f2=t_f;
			}
			t_rootIterCount+=1;
			c_b2TimeOfImpact.m_b2_toiRootIters+=1;
			if(t_rootIterCount==50){
				break;
			}
		}
		c_b2TimeOfImpact.m_b2_toiMaxRootIters=((c_b2Math.m_Max((c_b2TimeOfImpact.m_b2_toiMaxRootIters),(t_rootIterCount)))|0);
		if(t_newAlpha<1.0000000000000999*t_alpha){
			break;
		}
		t_alpha=t_newAlpha;
		t_iter+=1;
		c_b2TimeOfImpact.m_b2_toiIters+=1;
		if(t_iter==1000){
			break;
		}
	}
	c_b2TimeOfImpact.m_b2_toiMaxIters=((c_b2Math.m_Max((c_b2TimeOfImpact.m_b2_toiMaxIters),(t_iter)))|0);
	return t_alpha;
}
function c_b2SeparationFunction(){
	Object.call(this);
	this.m_m_proxyA=null;
	this.m_m_proxyB=null;
	this.m_m_sweepA=null;
	this.m_m_sweepB=null;
	this.m_m_type=0;
	this.m_m_axis=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_localPoint=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2SeparationFunction.m_new=function(){
	return this;
}
c_b2SeparationFunction.m_tmpTransA=null;
c_b2SeparationFunction.m_tmpTransB=null;
c_b2SeparationFunction.m_tmpVec1=null;
c_b2SeparationFunction.m_tmpVec2=null;
c_b2SeparationFunction.m_tmpVec3=null;
c_b2SeparationFunction.prototype.p_Initialize5=function(t_cache,t_proxyA,t_sweepA,t_proxyB,t_sweepB,t_alpha){
	this.m_m_proxyA=t_proxyA;
	this.m_m_proxyB=t_proxyB;
	var t_count=t_cache.m_count;
	this.m_m_sweepA=t_sweepA;
	this.m_m_sweepB=t_sweepB;
	var t_xfA=c_b2SeparationFunction.m_tmpTransA;
	var t_xfB=c_b2SeparationFunction.m_tmpTransB;
	this.m_m_sweepA.p_GetTransform2(t_xfA,t_alpha);
	this.m_m_sweepB.p_GetTransform2(t_xfB,t_alpha);
	if(t_count==1){
		this.m_m_type=1;
		var t_localPointA=this.m_m_proxyA.p_GetVertex(t_cache.m_indexA[0]);
		var t_localPointB=this.m_m_proxyB.p_GetVertex(t_cache.m_indexB[0]);
		c_b2Math.m_MulX(t_xfA,t_localPointA,c_b2SeparationFunction.m_tmpVec1);
		c_b2Math.m_MulX(t_xfB,t_localPointB,c_b2SeparationFunction.m_tmpVec2);
		c_b2Math.m_SubtractVV(c_b2SeparationFunction.m_tmpVec2,c_b2SeparationFunction.m_tmpVec1,this.m_m_axis);
		this.m_m_axis.p_Normalize();
	}else{
		if(t_cache.m_indexA[0]==t_cache.m_indexA[1]){
			this.m_m_type=4;
			var t_localPointB1=t_proxyB.p_GetVertex(t_cache.m_indexB[0]);
			var t_localPointB2=t_proxyB.p_GetVertex(t_cache.m_indexB[1]);
			c_b2Math.m_SubtractVV(t_localPointB2,t_localPointB1,this.m_m_axis);
			c_b2Math.m_CrossVF(this.m_m_axis,1.0,this.m_m_axis);
			this.m_m_axis.p_Normalize();
			var t_normal=c_b2SeparationFunction.m_tmpVec1;
			c_b2Math.m_MulMV(t_xfB.m_R,this.m_m_axis,t_normal);
			c_b2Math.m_AddVV(t_localPointB1,t_localPointB2,this.m_m_localPoint);
			this.m_m_localPoint.p_Multiply(0.5);
			c_b2Math.m_MulX(t_xfB,this.m_m_localPoint,c_b2SeparationFunction.m_tmpVec2);
			var t_localPointA2=t_proxyA.p_GetVertex(t_cache.m_indexA[0]);
			c_b2Math.m_MulX(t_xfA,t_localPointA2,c_b2SeparationFunction.m_tmpVec3);
			c_b2Math.m_SubtractVV(c_b2SeparationFunction.m_tmpVec3,c_b2SeparationFunction.m_tmpVec2,c_b2SeparationFunction.m_tmpVec3);
			var t_s=c_b2Math.m_Dot(c_b2SeparationFunction.m_tmpVec3,t_normal);
			if(t_s<0.0){
				this.m_m_axis.p_NegativeSelf();
				t_s=-t_s;
			}
		}else{
			this.m_m_type=2;
			var t_localPointA1=this.m_m_proxyA.p_GetVertex(t_cache.m_indexA[0]);
			var t_localPointA22=this.m_m_proxyA.p_GetVertex(t_cache.m_indexA[1]);
			c_b2Math.m_SubtractVV(t_localPointA22,t_localPointA1,this.m_m_axis);
			c_b2Math.m_CrossVF(this.m_m_axis,1.0,this.m_m_axis);
			this.m_m_axis.p_Normalize();
			var t_normal2=c_b2SeparationFunction.m_tmpVec3;
			c_b2Math.m_MulMV(t_xfA.m_R,this.m_m_axis,t_normal2);
			c_b2Math.m_AddVV(t_localPointA1,t_localPointA22,this.m_m_localPoint);
			this.m_m_localPoint.p_Multiply(0.5);
			c_b2Math.m_MulX(t_xfA,this.m_m_localPoint,c_b2SeparationFunction.m_tmpVec1);
			var t_localPointB3=this.m_m_proxyB.p_GetVertex(t_cache.m_indexB[0]);
			c_b2Math.m_MulX(t_xfB,t_localPointB3,c_b2SeparationFunction.m_tmpVec2);
			c_b2Math.m_SubtractVV(c_b2SeparationFunction.m_tmpVec2,c_b2SeparationFunction.m_tmpVec1,c_b2SeparationFunction.m_tmpVec1);
			var t_s2=c_b2Math.m_Dot(c_b2SeparationFunction.m_tmpVec1,t_normal2);
			if(t_s2<0.0){
				this.m_m_axis.p_NegativeSelf();
				t_s2=-t_s2;
			}
		}
	}
}
c_b2SeparationFunction.prototype.p_Evaluate2=function(t_transformA,t_transformB){
	var t_axisA=null;
	var t_axisB=null;
	var t_localPointA=null;
	var t_localPointB=null;
	var t_pointA=null;
	var t_pointB=null;
	var t_separation=.0;
	var t_normal=null;
	var t_1=this.m_m_type;
	if(t_1==1){
		t_axisA=c_b2SeparationFunction.m_tmpVec1;
		t_axisB=c_b2SeparationFunction.m_tmpVec2;
		c_b2Math.m_MulTMV(t_transformA.m_R,this.m_m_axis,t_axisA);
		this.m_m_axis.p_GetNegative(t_axisB);
		c_b2Math.m_MulTMV(t_transformB.m_R,t_axisB,t_axisB);
		t_localPointA=this.m_m_proxyA.p_GetSupportVertex(t_axisA);
		t_localPointB=this.m_m_proxyB.p_GetSupportVertex(t_axisB);
		t_pointA=c_b2SeparationFunction.m_tmpVec1;
		t_pointB=c_b2SeparationFunction.m_tmpVec2;
		c_b2Math.m_MulX(t_transformA,t_localPointA,t_pointA);
		c_b2Math.m_MulX(t_transformB,t_localPointB,t_pointB);
		t_separation=(t_pointB.m_x-t_pointA.m_x)*this.m_m_axis.m_x+(t_pointB.m_y-t_pointA.m_y)*this.m_m_axis.m_y;
		return t_separation;
	}else{
		if(t_1==2){
			t_normal=c_b2SeparationFunction.m_tmpVec1;
			t_pointA=c_b2SeparationFunction.m_tmpVec2;
			t_axisB=c_b2SeparationFunction.m_tmpVec3;
			c_b2Math.m_MulMV(t_transformA.m_R,this.m_m_axis,t_normal);
			c_b2Math.m_MulX(t_transformA,this.m_m_localPoint,t_pointA);
			t_normal.p_GetNegative(t_axisB);
			c_b2Math.m_MulTMV(t_transformB.m_R,t_axisB,t_axisB);
			t_localPointB=this.m_m_proxyB.p_GetSupportVertex(t_axisB);
			t_pointB=c_b2SeparationFunction.m_tmpVec3;
			c_b2Math.m_MulX(t_transformB,t_localPointB,t_pointB);
			t_separation=(t_pointB.m_x-t_pointA.m_x)*t_normal.m_x+(t_pointB.m_y-t_pointA.m_y)*t_normal.m_y;
			return t_separation;
		}else{
			if(t_1==4){
				t_normal=c_b2SeparationFunction.m_tmpVec1;
				t_pointB=c_b2SeparationFunction.m_tmpVec2;
				t_axisA=c_b2SeparationFunction.m_tmpVec3;
				c_b2Math.m_MulMV(t_transformB.m_R,this.m_m_axis,t_normal);
				c_b2Math.m_MulX(t_transformB,this.m_m_localPoint,t_pointB);
				t_normal.p_GetNegative(t_axisA);
				c_b2Math.m_MulTMV(t_transformA.m_R,t_axisA,t_axisA);
				t_localPointA=this.m_m_proxyA.p_GetSupportVertex(t_axisA);
				t_pointA=c_b2SeparationFunction.m_tmpVec3;
				c_b2Math.m_MulX(t_transformA,t_localPointA,t_pointA);
				t_separation=(t_pointA.m_x-t_pointB.m_x)*t_normal.m_x+(t_pointA.m_y-t_pointB.m_y)*t_normal.m_y;
				return t_separation;
			}else{
				c_b2Settings.m_B2Assert(false);
				return 0.0;
			}
		}
	}
}
function c_Enumerator3(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator3.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator3.m_new2=function(){
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator3.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Glitch(){
	Object.call(this);
	this.m_name="";
	this.m_state=false;
	this.m_sound=null;
}
c_Glitch.m_new=function(){
	return this;
}
c_Glitch.m_JETPACK=null;
c_Glitch.m_TUMBLEWEED=null;
c_Glitch.m_HEADLESS=null;
c_Glitch.m_SPACE=null;
c_Glitch.m_ALL=[];
c_Glitch.prototype.p_OnStart=function(){
}
c_Glitch.prototype.p_OnFinish=function(){
}
c_Glitch.m_ToggleGlitchById=function(t_id,t_state){
	if(c_Glitch.m_ALL[t_id].m_state==t_state){
		return;
	}
	c_Glitch.m_ALL[t_id].m_state=t_state;
	if(c_Glitch.m_ALL[t_id].m_state==true){
		c_Glitch.m_ALL[t_id].p_OnStart();
		if(c_Glitch.m_ALL[t_id].m_sound!=null){
			bb_audio_PlaySound(c_Glitch.m_ALL[t_id].m_sound,0,0);
		}
		print(c_Glitch.m_ALL[t_id].m_name+" ON");
	}else{
		c_Glitch.m_ALL[t_id].p_OnFinish();
		print(c_Glitch.m_ALL[t_id].m_name+" OFF");
	}
}
c_Glitch.m_SEVERITY_PHASES=[];
c_Glitch.m_severityPrevious=0;
c_Glitch.m_COUNT=[];
c_Glitch.m_whichPrevious=null;
c_Glitch.m_Update=function(){
	var t_damageTotal=200-bb_main_APP.m_hud.m_health[0]-bb_main_APP.m_hud.m_health[0];
	var t_severity=0;
	for(var t_n=0;t_n<c_Glitch.m_SEVERITY_PHASES.length;t_n=t_n+1){
		if(t_damageTotal>c_Glitch.m_SEVERITY_PHASES[t_n]){
			t_severity=t_n;
		}
	}
	if(t_severity>c_Glitch.m_severityPrevious){
		var t_which=c_IntList.m_new2.call(new c_IntList);
		var t_valid=false;
		do{
			do{
				var t_choice=((bb_random_Rnd3(4.0))|0);
				if(!t_which.p_Contains(t_choice)){
					t_which.p_AddLast7(t_choice);
				}
			}while(!(t_which.p_Count()==c_Glitch.m_COUNT[t_severity]));
			if(c_Glitch.m_whichPrevious==null){
				t_valid=true;
			}else{
				var t_=t_which.p_ObjectEnumerator();
				while(t_.p_HasNext()){
					var t_i=t_.p_NextObject();
					if(!c_Glitch.m_whichPrevious.p_Contains(t_i)){
						t_valid=true;
					}
				}
			}
			c_Glitch.m_whichPrevious=t_which;
		}while(!(t_valid==true));
		for(var t_n2=0;t_n2<c_Glitch.m_ALL.length;t_n2=t_n2+1){
			if(t_which.p_Contains(t_n2)){
				c_Glitch.m_ToggleGlitchById(t_n2,true);
			}else{
				c_Glitch.m_ToggleGlitchById(t_n2,false);
			}
		}
		bb_main_APP.m_hud.p_EnablePopup();
	}
	c_Glitch.m_severityPrevious=t_severity;
}
function c_JetpackGlitch(){
	c_Glitch.call(this);
}
c_JetpackGlitch.prototype=extend_class(c_Glitch);
c_JetpackGlitch.m_new=function(){
	c_Glitch.m_new.call(this);
	this.m_name="JETPACK";
	return this;
}
c_JetpackGlitch.prototype.p_OnStart=function(){
}
c_JetpackGlitch.prototype.p_OnFinish=function(){
}
var bb_dwarf_CONTROL_SCHEME_WASD=[];
var bb_dwarf_CONTROL_SCHEME_ARROWS=[];
var bb_dwarf_CONTROL_SCHEMES=[];
function bb_input_KeyHit(t_key){
	return bb_input_device.p_KeyHit(t_key);
}
function bb_input_KeyDown(t_key){
	return ((bb_input_device.p_KeyDown(t_key))?1:0);
}
function c_TumbleweedGlitch(){
	c_Glitch.call(this);
}
c_TumbleweedGlitch.prototype=extend_class(c_Glitch);
c_TumbleweedGlitch.m_new=function(){
	c_Glitch.m_new.call(this);
	this.m_name="TUMBLEWEED";
	return this;
}
c_TumbleweedGlitch.prototype.p_OnStart=function(){
}
c_TumbleweedGlitch.prototype.p_OnFinish=function(){
}
function bb_glue_RadiansToDegrees(t_radians){
	return t_radians/3.1415*180.0;
}
function bb_glue_ApplyImpulseToBody3(t_body,t_point,t_magnitude,t_angle){
	var t_x=Math.cos((bb_glue_RadiansToDegrees(t_angle)+90.0)*D2R)*t_magnitude;
	var t_y=Math.sin((bb_glue_RadiansToDegrees(t_angle)+90.0)*D2R)*t_magnitude;
	t_body.p_ApplyImpulse(c_b2Vec2.m_new.call(new c_b2Vec2,t_x,t_y),t_point);
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function c_HeadlessGlitch(){
	c_Glitch.call(this);
}
c_HeadlessGlitch.prototype=extend_class(c_Glitch);
c_HeadlessGlitch.m_new=function(){
	c_Glitch.m_new.call(this);
	this.m_name="HEADLESS";
	return this;
}
c_HeadlessGlitch.prototype.p_OnStart=function(){
	var t_=bb_main_APP.m_dwarves;
	var t_2=0;
	while(t_2<t_.length){
		var t_dwarf=t_[t_2];
		t_2=t_2+1;
		bb_main_APP.m_world.m__world.p_DestroyJoint(t_dwarf.m_neck);
		t_dwarf.m_neck=null;
		t_dwarf.m_headlessFacing=(t_dwarf.m_facing);
		t_dwarf.m_head.p_SetBullet(true);
	}
}
c_HeadlessGlitch.prototype.p_OnFinish=function(){
	var t_=bb_main_APP.m_dwarves;
	var t_2=0;
	while(t_2<t_.length){
		var t_dwarf=t_[t_2];
		t_2=t_2+1;
		t_dwarf.p_CreateNeck();
	}
}
function c_SpaceGlitch(){
	c_Glitch.call(this);
}
c_SpaceGlitch.prototype=extend_class(c_Glitch);
c_SpaceGlitch.m_new=function(){
	c_Glitch.m_new.call(this);
	this.m_name="SPACE";
	return this;
}
c_SpaceGlitch.prototype.p_OnStart=function(){
	bb_main_APP.m_world.m__world.p_SetGravity(c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0));
}
c_SpaceGlitch.prototype.p_OnFinish=function(){
	bb_main_APP.m_world.m__world.p_SetGravity(c_b2Vec2.m_new.call(new c_b2Vec2,0.0,30.0));
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	if(((t_sound)!=null) && ((t_sound.m_sample)!=null)){
		bb_audio_device.PlaySample(t_sound.m_sample,t_channel,t_flags);
	}
	return 0;
}
function c_List6(){
	Object.call(this);
	this.m__head=(c_HeadNode6.m_new.call(new c_HeadNode6));
}
c_List6.m_new=function(){
	return this;
}
c_List6.prototype.p_AddLast7=function(t_data){
	return c_Node9.m_new.call(new c_Node9,this.m__head,this.m__head.m__pred,t_data);
}
c_List6.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast7(t_t);
	}
	return this;
}
c_List6.prototype.p_Equals2=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List6.prototype.p_Contains=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		if(this.p_Equals2(t_node.m__data,t_value)){
			return true;
		}
		t_node=t_node.m__succ;
	}
	return false;
}
c_List6.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List6.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator4.m_new.call(new c_Enumerator4,this);
}
function c_IntList(){
	c_List6.call(this);
}
c_IntList.prototype=extend_class(c_List6);
c_IntList.m_new=function(t_data){
	c_List6.m_new2.call(this,t_data);
	return this;
}
c_IntList.m_new2=function(){
	c_List6.m_new.call(this);
	return this;
}
c_IntList.prototype.p_Equals2=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
function c_Node9(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=0;
}
c_Node9.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node9.m_new2=function(){
	return this;
}
function c_HeadNode6(){
	c_Node9.call(this);
}
c_HeadNode6.prototype=extend_class(c_Node9);
c_HeadNode6.m_new=function(){
	c_Node9.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function c_Enumerator4(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator4.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator4.m_new2=function(){
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator4.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_DrawOval(t_x,t_y,t_w,t_h){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawOval(t_x,t_y,t_w,t_h);
	return 0;
}
function bb_graphics_DrawLine(t_x1,t_y1,t_x2,t_y2){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawLine(t_x1,t_y1,t_x2,t_y2);
	return 0;
}
function bb_graphics_TextWidth(t_text){
	if((bb_graphics_context.m_font)!=null){
		return (t_text.length*bb_graphics_context.m_font.p_Width());
	}
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	if(!((bb_graphics_context.m_font)!=null)){
		return 0;
	}
	var t_w=bb_graphics_context.m_font.p_Width();
	var t_h=bb_graphics_context.m_font.p_Height();
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	t_y-=Math.floor((t_h)*t_yalign);
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		var t_ch=t_text.charCodeAt(t_i)-bb_graphics_context.m_firstChar;
		if(t_ch>=0 && t_ch<bb_graphics_context.m_font.p_Frames()){
			bb_graphics_DrawImage(bb_graphics_context.m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	return 0;
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,-t_image.m_tx+t_x,-t_image.m_ty+t_y,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_srcX+t_f.m_x,t_srcY+t_f.m_y,t_srcWidth,t_srcHeight);
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	return 0;
}
function c_Enumerator5(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator5.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator5.m_new2=function(){
	return this;
}
c_Enumerator5.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator5.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_glue_MetersToPixels(t_meters){
	return t_meters*30.0;
}
function bb_graphics_DrawPoly(t_verts){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawPoly(t_verts);
	return 0;
}
function bb_graphics_DrawPoly2(t_verts,t_image,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_renderDevice.DrawPoly2(t_verts,t_image.m_surface,t_f.m_x,t_f.m_y);
	return 0;
}
function c_b2DynamicTreeNode(){
	Object.call(this);
	this.m_parent=null;
	this.m_child1=null;
	this.m_child2=null;
	this.m_id=0;
	this.m_aabb=c_b2AABB.m_new.call(new c_b2AABB);
	this.m_userData=null;
}
c_b2DynamicTreeNode.m_idCount=0;
c_b2DynamicTreeNode.m_new=function(){
	this.m_id=c_b2DynamicTreeNode.m_idCount;
	c_b2DynamicTreeNode.m_idCount+=1;
	return this;
}
function c_b2DynamicTree(){
	Object.call(this);
	this.m_m_root=null;
	this.m_m_freeList=null;
	this.m_m_path=0;
	this.m_m_insertionCount=0;
	this.m_nodeStack=new_object_array(128);
}
c_b2DynamicTree.m_new=function(){
	this.m_m_root=null;
	this.m_m_freeList=null;
	this.m_m_path=0;
	this.m_m_insertionCount=0;
	return this;
}
c_b2DynamicTree.prototype.p_AllocateNode=function(){
	if((this.m_m_freeList)!=null){
		var t_node=this.m_m_freeList;
		this.m_m_freeList=t_node.m_parent;
		t_node.m_parent=null;
		t_node.m_child1=null;
		t_node.m_child2=null;
		return t_node;
	}
	return c_b2DynamicTreeNode.m_new.call(new c_b2DynamicTreeNode);
}
c_b2DynamicTree.m_shared_aabbCenter=null;
c_b2DynamicTree.prototype.p_InsertLeaf=function(t_leaf){
	this.m_m_insertionCount+=1;
	if(this.m_m_root==null){
		this.m_m_root=t_leaf;
		this.m_m_root.m_parent=null;
		return;
	}
	t_leaf.m_aabb.p_GetCenter(c_b2DynamicTree.m_shared_aabbCenter);
	var t_centerX=c_b2DynamicTree.m_shared_aabbCenter.m_x;
	var t_centerY=c_b2DynamicTree.m_shared_aabbCenter.m_y;
	var t_sibling=this.m_m_root;
	if(t_sibling.m_child1!=null){
		do{
			var t_child1=t_sibling.m_child1;
			var t_child2=t_sibling.m_child2;
			var t_aabb1=t_child1.m_aabb;
			var t_aabb2=t_child2.m_aabb;
			var t_lowerBound=t_aabb1.m_lowerBound;
			var t_upperBound=t_aabb1.m_upperBound;
			var t_midX=(t_lowerBound.m_x+t_upperBound.m_x)*0.5-t_centerX;
			if(t_midX<0.0){
				t_midX=-t_midX;
			}
			var t_midY=(t_lowerBound.m_y+t_upperBound.m_y)*0.5-t_centerY;
			if(t_midY<0.0){
				t_midY=-t_midY;
			}
			var t_norm1=t_midX+t_midY;
			t_lowerBound=t_aabb2.m_lowerBound;
			t_upperBound=t_aabb2.m_upperBound;
			t_midX=(t_lowerBound.m_x+t_upperBound.m_x)*0.5-t_centerX;
			if(t_midX<0.0){
				t_midX=-t_midX;
			}
			t_midY=(t_lowerBound.m_y+t_upperBound.m_y)*0.5-t_centerY;
			if(t_midY<0.0){
				t_midY=-t_midY;
			}
			var t_norm2=t_midX+t_midY;
			if(t_norm1<t_norm2){
				t_sibling=t_child1;
			}else{
				t_sibling=t_child2;
			}
		}while(!(t_sibling.m_child1==null));
	}
	var t_node1=t_sibling.m_parent;
	var t_node2=this.p_AllocateNode();
	t_node2.m_parent=t_node1;
	t_node2.m_userData=null;
	t_node2.m_aabb.p_Combine(t_leaf.m_aabb,t_sibling.m_aabb);
	if((t_node1)!=null){
		if(t_sibling.m_parent.m_child1==t_sibling){
			t_node1.m_child1=t_node2;
		}else{
			t_node1.m_child2=t_node2;
		}
		t_node2.m_child1=t_sibling;
		t_node2.m_child2=t_leaf;
		t_sibling.m_parent=t_node2;
		t_leaf.m_parent=t_node2;
		do{
			if(t_node1.m_aabb.p_Contains2(t_node2.m_aabb)){
				break;
			}
			t_node1.m_aabb.p_Combine(t_node1.m_child1.m_aabb,t_node1.m_child2.m_aabb);
			t_node2=t_node1;
			t_node1=t_node1.m_parent;
		}while(!(t_node1==null));
	}else{
		t_node2.m_child1=t_sibling;
		t_node2.m_child2=t_leaf;
		t_sibling.m_parent=t_node2;
		t_leaf.m_parent=t_node2;
		this.m_m_root=t_node2;
	}
}
c_b2DynamicTree.prototype.p_CreateProxy=function(t_aabb,t_userData){
	var t_node=this.p_AllocateNode();
	var t_extendX=0.1;
	var t_extendY=0.1;
	t_node.m_aabb.m_lowerBound.m_x=t_aabb.m_lowerBound.m_x-t_extendX;
	t_node.m_aabb.m_lowerBound.m_y=t_aabb.m_lowerBound.m_y-t_extendY;
	t_node.m_aabb.m_upperBound.m_x=t_aabb.m_upperBound.m_x+t_extendX;
	t_node.m_aabb.m_upperBound.m_y=t_aabb.m_upperBound.m_y+t_extendY;
	t_node.m_userData=t_userData;
	this.p_InsertLeaf(t_node);
	return t_node;
}
c_b2DynamicTree.prototype.p_FreeNode=function(t_node){
	t_node.m_parent=this.m_m_freeList;
	this.m_m_freeList=t_node;
}
c_b2DynamicTree.prototype.p_RemoveLeaf=function(t_leaf){
	if(t_leaf==this.m_m_root){
		this.m_m_root=null;
		return;
	}
	var t_node2=t_leaf.m_parent;
	var t_node1=t_node2.m_parent;
	var t_sibling=null;
	if(t_node2.m_child1==t_leaf){
		t_sibling=t_node2.m_child2;
	}else{
		t_sibling=t_node2.m_child1;
	}
	if((t_node1)!=null){
		if(t_node1.m_child1==t_node2){
			t_node1.m_child1=t_sibling;
		}else{
			t_node1.m_child2=t_sibling;
		}
		t_sibling.m_parent=t_node1;
		this.p_FreeNode(t_node2);
		while((t_node1)!=null){
			var t_oldAABB=t_node1.m_aabb;
			t_node1.m_aabb=c_b2AABB.m_StaticCombine(t_node1.m_child1.m_aabb,t_node1.m_child2.m_aabb);
			if(t_oldAABB.p_Contains2(t_node1.m_aabb)){
				break;
			}
			t_node1=t_node1.m_parent;
		}
	}else{
		this.m_m_root=t_sibling;
		t_sibling.m_parent=null;
		this.p_FreeNode(t_node2);
	}
}
c_b2DynamicTree.prototype.p_MoveProxy2=function(t_proxy,t_aabb,t_displacement){
	if(t_proxy.m_aabb.p_Contains2(t_aabb)){
		return false;
	}
	this.p_RemoveLeaf(t_proxy);
	var t_extendX=-t_displacement.m_x;
	if(t_displacement.m_x>0.0){
		t_extendX=t_displacement.m_x;
	}
	t_extendX*=2.0;
	t_extendX+=0.1;
	var t_extendY=-t_displacement.m_y;
	if(t_displacement.m_y>0.0){
		t_extendY=t_displacement.m_y;
	}
	t_extendY*=2.0;
	t_extendY+=0.1;
	t_proxy.m_aabb.m_lowerBound.m_x=t_aabb.m_lowerBound.m_x-t_extendX;
	t_proxy.m_aabb.m_lowerBound.m_y=t_aabb.m_lowerBound.m_y-t_extendY;
	t_proxy.m_aabb.m_upperBound.m_x=t_aabb.m_upperBound.m_x+t_extendX;
	t_proxy.m_aabb.m_upperBound.m_y=t_aabb.m_upperBound.m_y+t_extendY;
	this.p_InsertLeaf(t_proxy);
	return true;
}
c_b2DynamicTree.prototype.p_GetFatAABB=function(t_proxy){
	return t_proxy.m_aabb;
}
c_b2DynamicTree.prototype.p_Query=function(t_callback,t_aabb){
	if(this.m_m_root==null){
		return;
	}
	var t_count=0;
	var t_nodeStackLength=this.m_nodeStack.length;
	this.m_nodeStack[t_count]=this.m_m_root;
	t_count+=1;
	while(t_count>0){
		t_count-=1;
		var t_node=this.m_nodeStack[t_count];
		var t_overlap=true;
		var t_upperBound=t_node.m_aabb.m_upperBound;
		var t_otherLowerBound=t_aabb.m_lowerBound;
		if(t_otherLowerBound.m_x>t_upperBound.m_x){
			t_overlap=false;
		}else{
			if(t_otherLowerBound.m_y>t_upperBound.m_y){
				t_overlap=false;
			}else{
				var t_otherUpperBound=t_aabb.m_upperBound;
				var t_lowerBound=t_node.m_aabb.m_lowerBound;
				if(t_lowerBound.m_x>t_otherUpperBound.m_x){
					t_overlap=false;
				}else{
					if(t_lowerBound.m_y>t_otherUpperBound.m_y){
						t_overlap=false;
					}
				}
			}
		}
		if(t_overlap){
			if(t_node.m_child1==null){
				var t_proceed=t_callback.p_Callback2(t_node);
				if(!t_proceed){
					return;
				}
			}else{
				if(t_count+2>=t_nodeStackLength){
					this.m_nodeStack=resize_object_array(this.m_nodeStack,t_count*2);
					t_nodeStackLength=t_count*2;
				}
				this.m_nodeStack[t_count]=t_node.m_child1;
				t_count+=1;
				this.m_nodeStack[t_count]=t_node.m_child2;
				t_count+=1;
			}
		}
	}
}
c_b2DynamicTree.prototype.p_GetUserData=function(t_proxy){
	return t_proxy.m_userData;
}
function c_FlashArray3(){
	Object.call(this);
	this.m_length=0;
	this.m_arrLength=100;
	this.m_arr=new_object_array(100);
}
c_FlashArray3.prototype.p_Length=function(){
	return this.m_length;
}
c_FlashArray3.prototype.p_Length2=function(t_value){
	this.m_length=t_value;
	if(this.m_length>this.m_arrLength){
		this.m_arrLength=this.m_length;
		this.m_arr=resize_object_array(this.m_arr,this.m_length);
	}
}
c_FlashArray3.m_new=function(t_length){
	this.p_Length2(t_length);
	return this;
}
c_FlashArray3.m_new2=function(t_vals){
	this.m_arr=t_vals;
	this.m_arrLength=this.m_arr.length;
	this.m_length=this.m_arrLength;
	return this;
}
c_FlashArray3.m_new3=function(){
	return this;
}
c_FlashArray3.prototype.p_Set14=function(t_index,t_item){
	if(t_index>=this.m_arrLength){
		this.m_arrLength=t_index+100;
		this.m_arr=resize_object_array(this.m_arr,this.m_arrLength);
	}
	this.m_arr[t_index]=t_item;
	if(t_index>=this.m_length){
		this.m_length=t_index+1;
	}
}
c_FlashArray3.prototype.p_BackingArray=function(){
	return this.m_arr;
}
function c_QueryCallback(){
	Object.call(this);
}
c_QueryCallback.m_new=function(){
	return this;
}
c_QueryCallback.prototype.p_Callback2=function(t_a){
}
function c_TreeQueryCallback(){
	c_QueryCallback.call(this);
}
c_TreeQueryCallback.prototype=extend_class(c_QueryCallback);
c_TreeQueryCallback.m_new=function(){
	c_QueryCallback.m_new.call(this);
	return this;
}
c_TreeQueryCallback.prototype.p_Callback2=function(t_proxy){
}
function c_DTQueryCallback(){
	c_TreeQueryCallback.call(this);
	this.m_m_pairCount=0;
	this.m_queryProxy=null;
	this.m_m_pairBuffer=c_FlashArray4.m_new3.call(new c_FlashArray4);
}
c_DTQueryCallback.prototype=extend_class(c_TreeQueryCallback);
c_DTQueryCallback.m_new=function(){
	c_TreeQueryCallback.m_new.call(this);
	return this;
}
c_DTQueryCallback.prototype.p_Callback2=function(t_a){
	var t_proxy=object_downcast((t_a),c_b2DynamicTreeNode);
	if(t_proxy==this.m_queryProxy){
		return true;
	}
	if(this.m_m_pairCount==this.m_m_pairBuffer.p_Length()){
		this.m_m_pairBuffer.p_Set15(this.m_m_pairCount,c_b2DynamicTreePair.m_new.call(new c_b2DynamicTreePair));
	}
	var t_pair=this.m_m_pairBuffer.p_Get(this.m_m_pairCount);
	if(t_proxy.m_id<this.m_queryProxy.m_id){
		t_pair.m_proxyA=t_proxy;
		t_pair.m_proxyB=this.m_queryProxy;
	}else{
		t_pair.m_proxyA=this.m_queryProxy;
		t_pair.m_proxyB=t_proxy;
	}
	this.m_m_pairCount+=1;
	return true;
}
function c_b2DynamicTreePair(){
	Object.call(this);
	this.m_proxyA=null;
	this.m_proxyB=null;
}
c_b2DynamicTreePair.m_new=function(){
	return this;
}
function c_FlashArray4(){
	Object.call(this);
	this.m_length=0;
	this.m_arrLength=100;
	this.m_arr=new_object_array(100);
}
c_FlashArray4.prototype.p_Length=function(){
	return this.m_length;
}
c_FlashArray4.prototype.p_Length2=function(t_value){
	this.m_length=t_value;
	if(this.m_length>this.m_arrLength){
		this.m_arrLength=this.m_length;
		this.m_arr=resize_object_array(this.m_arr,this.m_length);
	}
}
c_FlashArray4.m_new=function(t_length){
	this.p_Length2(t_length);
	return this;
}
c_FlashArray4.m_new2=function(t_vals){
	this.m_arr=t_vals;
	this.m_arrLength=this.m_arr.length;
	this.m_length=this.m_arrLength;
	return this;
}
c_FlashArray4.m_new3=function(){
	return this;
}
c_FlashArray4.prototype.p_Get=function(t_index){
	if(t_index>=0 && this.m_length>t_index){
		return this.m_arr[t_index];
	}else{
		return null;
	}
}
c_FlashArray4.prototype.p_Set15=function(t_index,t_item){
	if(t_index>=this.m_arrLength){
		this.m_arrLength=t_index+100;
		this.m_arr=resize_object_array(this.m_arr,this.m_arrLength);
	}
	this.m_arr[t_index]=t_item;
	if(t_index>=this.m_length){
		this.m_length=t_index+1;
	}
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_NodeEnumerator.m_new2=function(){
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t;
}
function c_b2Jacobian(){
	Object.call(this);
	this.m_linearA=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_angularA=.0;
	this.m_linearB=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_angularB=.0;
}
c_b2Jacobian.m_new=function(){
	return this;
}
c_b2Jacobian.prototype.p_SetZero=function(){
	this.m_linearA.p_SetZero();
	this.m_angularA=0.0;
	this.m_linearB.p_SetZero();
	this.m_angularB=0.0;
}
c_b2Jacobian.prototype.p_Compute=function(t_x1,t_a1,t_x2,t_a2){
	return this.m_linearA.m_x*t_x1.m_x+this.m_linearA.m_y*t_x1.m_y+this.m_angularA*t_a1+(this.m_linearB.m_x*t_x2.m_x+this.m_linearB.m_y*t_x2.m_y)+this.m_angularB*t_a2;
}
function c_b2CircleContact(){
	c_b2Contact.call(this);
}
c_b2CircleContact.prototype=extend_class(c_b2Contact);
c_b2CircleContact.m_new=function(){
	c_b2Contact.m_new.call(this);
	return this;
}
c_b2CircleContact.prototype.p_Reset=function(t_fixtureA,t_fixtureB){
	c_b2Contact.prototype.p_Reset.call(this,t_fixtureA,t_fixtureB);
}
c_b2CircleContact.prototype.p_Evaluate=function(){
	var t_bA=this.m_m_fixtureA.p_GetBody();
	var t_bB=this.m_m_fixtureB.p_GetBody();
	c_b2Collision.m_CollideCircles(this.m_m_manifold,object_downcast((this.m_m_fixtureA.p_GetShape()),c_b2CircleShape),t_bA.m_m_xf,object_downcast((this.m_m_fixtureB.p_GetShape()),c_b2CircleShape),t_bB.m_m_xf);
}
function c_b2PolyAndCircleContact(){
	c_b2Contact.call(this);
}
c_b2PolyAndCircleContact.prototype=extend_class(c_b2Contact);
c_b2PolyAndCircleContact.m_new=function(){
	c_b2Contact.m_new.call(this);
	return this;
}
c_b2PolyAndCircleContact.prototype.p_Reset=function(t_fixtureA,t_fixtureB){
	c_b2Contact.prototype.p_Reset.call(this,t_fixtureA,t_fixtureB);
}
c_b2PolyAndCircleContact.prototype.p_Evaluate=function(){
	var t_bA=this.m_m_fixtureA.m_m_body;
	var t_bB=this.m_m_fixtureB.m_m_body;
	c_b2Collision.m_CollidePolygonAndCircle(this.m_m_manifold,object_downcast((this.m_m_fixtureA.p_GetShape()),c_b2PolygonShape),t_bA.m_m_xf,object_downcast((this.m_m_fixtureB.p_GetShape()),c_b2CircleShape),t_bB.m_m_xf);
}
function c_b2PolygonContact(){
	c_b2Contact.call(this);
}
c_b2PolygonContact.prototype=extend_class(c_b2Contact);
c_b2PolygonContact.m_new=function(){
	c_b2Contact.m_new.call(this);
	return this;
}
c_b2PolygonContact.prototype.p_Reset=function(t_fixtureA,t_fixtureB){
	c_b2Contact.prototype.p_Reset.call(this,t_fixtureA,t_fixtureB);
}
c_b2PolygonContact.prototype.p_Evaluate=function(){
	var t_bA=this.m_m_fixtureA.p_GetBody();
	var t_bB=this.m_m_fixtureB.p_GetBody();
	c_b2Collision.m_CollidePolygons(this.m_m_manifold,object_downcast((this.m_m_fixtureA.p_GetShape()),c_b2PolygonShape),t_bA.m_m_xf,object_downcast((this.m_m_fixtureB.p_GetShape()),c_b2PolygonShape),t_bB.m_m_xf);
}
function c_b2EdgeAndCircleContact(){
	c_b2Contact.call(this);
}
c_b2EdgeAndCircleContact.prototype=extend_class(c_b2Contact);
c_b2EdgeAndCircleContact.m_new=function(){
	c_b2Contact.m_new.call(this);
	return this;
}
c_b2EdgeAndCircleContact.prototype.p_Reset=function(t_fixtureA,t_fixtureB){
	c_b2Contact.prototype.p_Reset.call(this,t_fixtureA,t_fixtureB);
}
c_b2EdgeAndCircleContact.prototype.p_B2CollideEdgeAndCircle=function(t_manifold,t_edge,t_xf1,t_circle,t_xf2){
}
c_b2EdgeAndCircleContact.prototype.p_Evaluate=function(){
	var t_bA=this.m_m_fixtureA.p_GetBody();
	var t_bB=this.m_m_fixtureB.p_GetBody();
	this.p_B2CollideEdgeAndCircle(this.m_m_manifold,object_downcast((this.m_m_fixtureA.p_GetShape()),c_b2EdgeShape),t_bA.m_m_xf,object_downcast((this.m_m_fixtureB.p_GetShape()),c_b2CircleShape),t_bB.m_m_xf);
}
function c_b2PolyAndEdgeContact(){
	c_b2Contact.call(this);
}
c_b2PolyAndEdgeContact.prototype=extend_class(c_b2Contact);
c_b2PolyAndEdgeContact.m_new=function(){
	c_b2Contact.m_new.call(this);
	return this;
}
c_b2PolyAndEdgeContact.prototype.p_Reset=function(t_fixtureA,t_fixtureB){
	c_b2Contact.prototype.p_Reset.call(this,t_fixtureA,t_fixtureB);
}
c_b2PolyAndEdgeContact.prototype.p_B2CollidePolyAndEdge=function(t_manifold,t_polygon,t_xf1,t_edge,t_xf2){
}
c_b2PolyAndEdgeContact.prototype.p_Evaluate=function(){
	var t_bA=this.m_m_fixtureA.p_GetBody();
	var t_bB=this.m_m_fixtureB.p_GetBody();
	this.p_B2CollidePolyAndEdge(this.m_m_manifold,object_downcast((this.m_m_fixtureA.p_GetShape()),c_b2PolygonShape),t_bA.m_m_xf,object_downcast((this.m_m_fixtureB.p_GetShape()),c_b2EdgeShape),t_bB.m_m_xf);
}
function c_b2Collision(){
	Object.call(this);
}
c_b2Collision.m_CollideCircles=function(t_manifold,t_circle1,t_xf1,t_circle2,t_xf2){
	t_manifold.m_m_pointCount=0;
	var t_tMat=null;
	var t_tVec=null;
	t_tMat=t_xf1.m_R;
	t_tVec=t_circle1.m_m_p;
	var t_p1X=t_xf1.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	var t_p1Y=t_xf1.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	t_tMat=t_xf2.m_R;
	t_tVec=t_circle2.m_m_p;
	var t_p2X=t_xf2.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	var t_p2Y=t_xf2.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	var t_dX=t_p2X-t_p1X;
	var t_dY=t_p2Y-t_p1Y;
	var t_distSqr=t_dX*t_dX+t_dY*t_dY;
	var t_radius=t_circle1.m_m_radius+t_circle2.m_m_radius;
	if(t_distSqr>t_radius*t_radius){
		return;
	}
	t_manifold.m_m_type=1;
	t_manifold.m_m_localPoint.p_SetV(t_circle1.m_m_p);
	t_manifold.m_m_localPlaneNormal.p_SetZero();
	t_manifold.m_m_pointCount=1;
	t_manifold.m_m_points[0].m_m_localPoint.p_SetV(t_circle2.m_m_p);
	t_manifold.m_m_points[0].m_m_id.p_Key2(0);
}
c_b2Collision.m_CollidePolygonAndCircle=function(t_manifold,t_polygon,t_xf1,t_circle,t_xf2){
	t_manifold.m_m_pointCount=0;
	var t_tPoint=null;
	var t_dX=.0;
	var t_dY=.0;
	var t_positionX=.0;
	var t_positionY=.0;
	var t_tVec=null;
	var t_tMat=null;
	t_tMat=t_xf2.m_R;
	t_tVec=t_circle.m_m_p;
	var t_cX=t_xf2.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	var t_cY=t_xf2.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	t_dX=t_cX-t_xf1.m_position.m_x;
	t_dY=t_cY-t_xf1.m_position.m_y;
	t_tMat=t_xf1.m_R;
	var t_cLocalX=t_dX*t_tMat.m_col1.m_x+t_dY*t_tMat.m_col1.m_y;
	var t_cLocalY=t_dX*t_tMat.m_col2.m_x+t_dY*t_tMat.m_col2.m_y;
	var t_dist=.0;
	var t_normalIndex=0;
	var t_separation=-3.4e38;
	var t_radius=t_polygon.m_m_radius+t_circle.m_m_radius;
	var t_vertexCount=t_polygon.m_m_vertexCount;
	var t_vertices=t_polygon.m_m_vertices;
	var t_normals=t_polygon.m_m_normals;
	for(var t_i=0;t_i<t_vertexCount;t_i=t_i+1){
		t_tVec=t_vertices[t_i];
		t_dX=t_cLocalX-t_tVec.m_x;
		t_dY=t_cLocalY-t_tVec.m_y;
		t_tVec=t_normals[t_i];
		var t_s=t_tVec.m_x*t_dX+t_tVec.m_y*t_dY;
		if(t_s>t_radius){
			return;
		}
		if(t_s>t_separation){
			t_separation=t_s;
			t_normalIndex=t_i;
		}
	}
	var t_vertIndex1=t_normalIndex;
	var t_vertIndex2=0;
	if(t_vertIndex1+1<t_vertexCount){
		t_vertIndex2=t_vertIndex1+1;
	}
	var t_v1=t_vertices[t_vertIndex1];
	var t_v2=t_vertices[t_vertIndex2];
	if(t_separation<1e-15){
		t_manifold.m_m_pointCount=1;
		t_manifold.m_m_type=2;
		t_manifold.m_m_localPlaneNormal.p_SetV(t_normals[t_normalIndex]);
		t_manifold.m_m_localPoint.m_x=0.5*(t_v1.m_x+t_v2.m_x);
		t_manifold.m_m_localPoint.m_y=0.5*(t_v1.m_y+t_v2.m_y);
		t_manifold.m_m_points[0].m_m_localPoint.p_SetV(t_circle.m_m_p);
		t_manifold.m_m_points[0].m_m_id.p_Key2(0);
		return;
	}
	var t_u1=(t_cLocalX-t_v1.m_x)*(t_v2.m_x-t_v1.m_x)+(t_cLocalY-t_v1.m_y)*(t_v2.m_y-t_v1.m_y);
	var t_u2=(t_cLocalX-t_v2.m_x)*(t_v1.m_x-t_v2.m_x)+(t_cLocalY-t_v2.m_y)*(t_v1.m_y-t_v2.m_y);
	if(t_u1<=0.0){
		if((t_cLocalX-t_v1.m_x)*(t_cLocalX-t_v1.m_x)+(t_cLocalY-t_v1.m_y)*(t_cLocalY-t_v1.m_y)>t_radius*t_radius){
			return;
		}
		t_manifold.m_m_pointCount=1;
		t_manifold.m_m_type=2;
		t_manifold.m_m_localPlaneNormal.m_x=t_cLocalX-t_v1.m_x;
		t_manifold.m_m_localPlaneNormal.m_y=t_cLocalY-t_v1.m_y;
		t_manifold.m_m_localPlaneNormal.p_Normalize();
		t_manifold.m_m_localPoint.p_SetV(t_v1);
		t_manifold.m_m_points[0].m_m_localPoint.p_SetV(t_circle.m_m_p);
		t_manifold.m_m_points[0].m_m_id.p_Key2(0);
	}else{
		if(t_u2<=0.0){
			if((t_cLocalX-t_v2.m_x)*(t_cLocalX-t_v2.m_x)+(t_cLocalY-t_v2.m_y)*(t_cLocalY-t_v2.m_y)>t_radius*t_radius){
				return;
			}
			t_manifold.m_m_pointCount=1;
			t_manifold.m_m_type=2;
			t_manifold.m_m_localPlaneNormal.m_x=t_cLocalX-t_v2.m_x;
			t_manifold.m_m_localPlaneNormal.m_y=t_cLocalY-t_v2.m_y;
			t_manifold.m_m_localPlaneNormal.p_Normalize();
			t_manifold.m_m_localPoint.p_SetV(t_v2);
			t_manifold.m_m_points[0].m_m_localPoint.p_SetV(t_circle.m_m_p);
			t_manifold.m_m_points[0].m_m_id.p_Key2(0);
		}else{
			var t_faceCenterX=0.5*(t_v1.m_x+t_v2.m_x);
			var t_faceCenterY=0.5*(t_v1.m_y+t_v2.m_y);
			t_separation=(t_cLocalX-t_faceCenterX)*t_normals[t_vertIndex1].m_x+(t_cLocalY-t_faceCenterY)*t_normals[t_vertIndex1].m_y;
			if(t_separation>t_radius){
				return;
			}
			t_manifold.m_m_pointCount=1;
			t_manifold.m_m_type=2;
			t_manifold.m_m_localPlaneNormal.m_x=t_normals[t_vertIndex1].m_x;
			t_manifold.m_m_localPlaneNormal.m_y=t_normals[t_vertIndex1].m_y;
			t_manifold.m_m_localPlaneNormal.p_Normalize();
			t_manifold.m_m_localPoint.p_Set2(t_faceCenterX,t_faceCenterY);
			t_manifold.m_m_points[0].m_m_localPoint.p_SetV(t_circle.m_m_p);
			t_manifold.m_m_points[0].m_m_id.p_Key2(0);
		}
	}
}
c_b2Collision.m_s_edgeAO=[];
c_b2Collision.m_EdgeSeparation=function(t_poly1,t_xf1,t_edge1,t_poly2,t_xf2){
	var t_count1=t_poly1.m_m_vertexCount;
	var t_vertices1=t_poly1.m_m_vertices;
	var t_normals1=t_poly1.m_m_normals;
	var t_count2=t_poly2.m_m_vertexCount;
	var t_vertices2=t_poly2.m_m_vertices;
	var t_tMat=null;
	var t_tVec=null;
	t_tMat=t_xf1.m_R;
	t_tVec=t_normals1[t_edge1];
	var t_normal1WorldX=t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
	var t_normal1WorldY=t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
	t_tMat=t_xf2.m_R;
	var t_normal1X=t_tMat.m_col1.m_x*t_normal1WorldX+t_tMat.m_col1.m_y*t_normal1WorldY;
	var t_normal1Y=t_tMat.m_col2.m_x*t_normal1WorldX+t_tMat.m_col2.m_y*t_normal1WorldY;
	var t_index=0;
	var t_minDot=3.4e38;
	for(var t_i=0;t_i<t_count2;t_i=t_i+1){
		t_tVec=t_vertices2[t_i];
		var t_dot=t_tVec.m_x*t_normal1X+t_tVec.m_y*t_normal1Y;
		if(t_dot<t_minDot){
			t_minDot=t_dot;
			t_index=t_i;
		}
	}
	t_tVec=t_vertices1[t_edge1];
	t_tMat=t_xf1.m_R;
	var t_v1X=t_xf1.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	var t_v1Y=t_xf1.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	t_tVec=t_vertices2[t_index];
	t_tMat=t_xf2.m_R;
	var t_v2X=t_xf2.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	var t_v2Y=t_xf2.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	t_v2X-=t_v1X;
	t_v2Y-=t_v1Y;
	var t_separation=t_v2X*t_normal1WorldX+t_v2Y*t_normal1WorldY;
	return t_separation;
}
c_b2Collision.m_FindMaxSeparation=function(t_edgeIndex,t_poly1,t_xf1,t_poly2,t_xf2){
	var t_count1=t_poly1.m_m_vertexCount;
	var t_normals1=t_poly1.m_m_normals;
	var t_tVec=null;
	var t_tMat=null;
	t_tMat=t_xf2.m_R;
	t_tVec=t_poly2.m_m_centroid;
	var t_dX=t_xf2.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	var t_dY=t_xf2.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	t_tMat=t_xf1.m_R;
	t_tVec=t_poly1.m_m_centroid;
	t_dX-=t_xf1.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	t_dY-=t_xf1.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	var t_dLocal1X=t_dX*t_xf1.m_R.m_col1.m_x+t_dY*t_xf1.m_R.m_col1.m_y;
	var t_dLocal1Y=t_dX*t_xf1.m_R.m_col2.m_x+t_dY*t_xf1.m_R.m_col2.m_y;
	var t_edge=0;
	var t_maxDot=-3.4e38;
	for(var t_i=0;t_i<t_count1;t_i=t_i+1){
		t_tVec=t_normals1[t_i];
		var t_dot=t_tVec.m_x*t_dLocal1X+t_tVec.m_y*t_dLocal1Y;
		if(t_dot>t_maxDot){
			t_maxDot=t_dot;
			t_edge=t_i;
		}
	}
	var t_s=c_b2Collision.m_EdgeSeparation(t_poly1,t_xf1,t_edge,t_poly2,t_xf2);
	var t_prevEdge=t_count1-1;
	if(t_edge-1>=0){
		t_prevEdge=t_edge-1;
	}
	var t_sPrev=c_b2Collision.m_EdgeSeparation(t_poly1,t_xf1,t_prevEdge,t_poly2,t_xf2);
	var t_nextEdge=0;
	if(t_edge+1<t_count1){
		t_nextEdge=t_edge+1;
	}
	var t_sNext=c_b2Collision.m_EdgeSeparation(t_poly1,t_xf1,t_nextEdge,t_poly2,t_xf2);
	var t_bestEdge=0;
	var t_bestSeparation=.0;
	var t_increment=0;
	if(t_sPrev>t_s && t_sPrev>t_sNext){
		t_increment=-1;
		t_bestEdge=t_prevEdge;
		t_bestSeparation=t_sPrev;
	}else{
		if(t_sNext>t_s){
			t_increment=1;
			t_bestEdge=t_nextEdge;
			t_bestSeparation=t_sNext;
		}else{
			t_edgeIndex[0]=t_edge;
			return t_s;
		}
	}
	while(true){
		if(t_increment==-1){
			if(t_bestEdge-1>=0){
				t_edge=t_bestEdge-1;
			}else{
				t_edge=t_count1-1;
			}
		}else{
			if(t_bestEdge+1<t_count1){
				t_edge=t_bestEdge+1;
			}else{
				t_edge=0;
			}
		}
		t_s=c_b2Collision.m_EdgeSeparation(t_poly1,t_xf1,t_edge,t_poly2,t_xf2);
		if(t_s>t_bestSeparation){
			t_bestEdge=t_edge;
			t_bestSeparation=t_s;
		}else{
			break;
		}
	}
	t_edgeIndex[0]=t_bestEdge;
	return t_bestSeparation;
}
c_b2Collision.m_s_edgeBO=[];
c_b2Collision.m_MakeClipPointVector=function(){
	return [c_ClipVertex.m_new.call(new c_ClipVertex),c_ClipVertex.m_new.call(new c_ClipVertex)];
}
c_b2Collision.m_s_incidentEdge=[];
c_b2Collision.m_FindIncidentEdge=function(t_c,t_poly1,t_xf1,t_edge1,t_poly2,t_xf2){
	var t_count1=t_poly1.m_m_vertexCount;
	var t_normals1=t_poly1.m_m_normals;
	var t_count2=t_poly2.m_m_vertexCount;
	var t_vertices2=t_poly2.m_m_vertices;
	var t_normals2=t_poly2.m_m_normals;
	var t_tMat=null;
	var t_tVec=null;
	t_tMat=t_xf1.m_R;
	t_tVec=t_normals1[t_edge1];
	var t_normal1X=t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y;
	var t_normal1Y=t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y;
	t_tMat=t_xf2.m_R;
	var t_tX=t_tMat.m_col1.m_x*t_normal1X+t_tMat.m_col1.m_y*t_normal1Y;
	t_normal1Y=t_tMat.m_col2.m_x*t_normal1X+t_tMat.m_col2.m_y*t_normal1Y;
	t_normal1X=t_tX;
	var t_index=0;
	var t_minDot=3.4e38;
	for(var t_i=0;t_i<t_count2;t_i=t_i+1){
		t_tVec=t_normals2[t_i];
		var t_dot=t_normal1X*t_tVec.m_x+t_normal1Y*t_tVec.m_y;
		if(t_dot<t_minDot){
			t_minDot=t_dot;
			t_index=t_i;
		}
	}
	var t_tClip=null;
	var t_i1=t_index;
	var t_i2=0;
	if(t_i1+1<t_count2){
		t_i2=t_i1+1;
	}
	t_tClip=t_c[0];
	t_tVec=t_vertices2[t_i1];
	t_tMat=t_xf2.m_R;
	t_tClip.m_v.m_x=t_xf2.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	t_tClip.m_v.m_y=t_xf2.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	t_tClip.m_id.m_features.p_ReferenceEdge2(t_edge1);
	t_tClip.m_id.m_features.p_IncidentEdge2(t_i1);
	t_tClip.m_id.m_features.p_IncidentVertex2(0);
	t_tClip=t_c[1];
	t_tVec=t_vertices2[t_i2];
	t_tMat=t_xf2.m_R;
	t_tClip.m_v.m_x=t_xf2.m_position.m_x+(t_tMat.m_col1.m_x*t_tVec.m_x+t_tMat.m_col2.m_x*t_tVec.m_y);
	t_tClip.m_v.m_y=t_xf2.m_position.m_y+(t_tMat.m_col1.m_y*t_tVec.m_x+t_tMat.m_col2.m_y*t_tVec.m_y);
	t_tClip.m_id.m_features.p_ReferenceEdge2(t_edge1);
	t_tClip.m_id.m_features.p_IncidentEdge2(t_i2);
	t_tClip.m_id.m_features.p_IncidentVertex2(1);
}
c_b2Collision.m_s_localTangent=null;
c_b2Collision.m_s_localNormal=null;
c_b2Collision.m_s_planePoint=null;
c_b2Collision.m_s_tangent=null;
c_b2Collision.m_s_tangent2=null;
c_b2Collision.m_s_normal=null;
c_b2Collision.m_s_v11=null;
c_b2Collision.m_s_v12=null;
c_b2Collision.m_s_clipPoints1=[];
c_b2Collision.m_s_clipPoints2=[];
c_b2Collision.m_ClipSegmentToLine=function(t_vOut,t_vIn,t_normal,t_offset){
	var t_cv=null;
	var t_numOut=0;
	t_cv=t_vIn[0];
	var t_vIn0=t_cv.m_v;
	t_cv=t_vIn[1];
	var t_vIn1=t_cv.m_v;
	var t_distance0=t_normal.m_x*t_vIn0.m_x+t_normal.m_y*t_vIn0.m_y-t_offset;
	var t_distance1=t_normal.m_x*t_vIn1.m_x+t_normal.m_y*t_vIn1.m_y-t_offset;
	if(t_distance0<=0.0){
		t_vOut[t_numOut].p_Set16(t_vIn[0]);
		t_numOut+=1;
	}
	if(t_distance1<=0.0){
		t_vOut[t_numOut].p_Set16(t_vIn[1]);
		t_numOut+=1;
	}
	if(t_distance0*t_distance1<0.0){
		var t_interp=t_distance0/(t_distance0-t_distance1);
		t_cv=t_vOut[t_numOut];
		var t_tVec=t_cv.m_v;
		t_tVec.m_x=t_vIn0.m_x+t_interp*(t_vIn1.m_x-t_vIn0.m_x);
		t_tVec.m_y=t_vIn0.m_y+t_interp*(t_vIn1.m_y-t_vIn0.m_y);
		t_cv=t_vOut[t_numOut];
		var t_cv2=null;
		if(t_distance0>0.0){
			t_cv2=t_vIn[0];
			t_cv.m_id=t_cv2.m_id;
		}else{
			t_cv2=t_vIn[1];
			t_cv.m_id=t_cv2.m_id;
		}
		t_numOut+=1;
	}
	return t_numOut;
}
c_b2Collision.m_CollidePolygons=function(t_manifold,t_polyA,t_xfA,t_polyB,t_xfB){
	var t_cv=null;
	t_manifold.m_m_pointCount=0;
	var t_totalRadius=t_polyA.m_m_radius+t_polyB.m_m_radius;
	var t_edgeA=0;
	c_b2Collision.m_s_edgeAO[0]=t_edgeA;
	var t_separationA=c_b2Collision.m_FindMaxSeparation(c_b2Collision.m_s_edgeAO,t_polyA,t_xfA,t_polyB,t_xfB);
	t_edgeA=c_b2Collision.m_s_edgeAO[0];
	if(t_separationA>t_totalRadius){
		return;
	}
	var t_edgeB=0;
	c_b2Collision.m_s_edgeBO[0]=t_edgeB;
	var t_separationB=c_b2Collision.m_FindMaxSeparation(c_b2Collision.m_s_edgeBO,t_polyB,t_xfB,t_polyA,t_xfA);
	t_edgeB=c_b2Collision.m_s_edgeBO[0];
	if(t_separationB>t_totalRadius){
		return;
	}
	var t_poly1=null;
	var t_poly2=null;
	var t_xf1=null;
	var t_xf2=null;
	var t_edge1=0;
	var t_flip=0;
	var t_tMat=null;
	if(t_separationB>0.98*t_separationA+0.001){
		t_poly1=t_polyB;
		t_poly2=t_polyA;
		t_xf1=t_xfB;
		t_xf2=t_xfA;
		t_edge1=t_edgeB;
		t_manifold.m_m_type=4;
		t_flip=1;
	}else{
		t_poly1=t_polyA;
		t_poly2=t_polyB;
		t_xf1=t_xfA;
		t_xf2=t_xfB;
		t_edge1=t_edgeA;
		t_manifold.m_m_type=2;
		t_flip=0;
	}
	var t_incidentEdge=c_b2Collision.m_s_incidentEdge;
	c_b2Collision.m_FindIncidentEdge(t_incidentEdge,t_poly1,t_xf1,t_edge1,t_poly2,t_xf2);
	var t_count1=t_poly1.m_m_vertexCount;
	var t_vertices1=t_poly1.m_m_vertices;
	var t_local_v11=t_vertices1[t_edge1];
	var t_local_v12=null;
	if(t_edge1+1<t_count1){
		t_local_v12=t_vertices1[t_edge1+1];
	}else{
		t_local_v12=t_vertices1[0];
	}
	var t_localTangent=c_b2Collision.m_s_localTangent;
	t_localTangent.m_x=t_local_v12.m_x-t_local_v11.m_x;
	t_localTangent.m_y=t_local_v12.m_y-t_local_v11.m_y;
	t_localTangent.p_Normalize();
	var t_localNormal=c_b2Collision.m_s_localNormal;
	t_localNormal.m_x=t_localTangent.m_y;
	t_localNormal.m_y=-t_localTangent.m_x;
	var t_planePoint=c_b2Collision.m_s_planePoint;
	t_planePoint.m_x=0.5*(t_local_v11.m_x+t_local_v12.m_x);
	t_planePoint.m_y=0.5*(t_local_v11.m_y+t_local_v12.m_y);
	var t_tangent=c_b2Collision.m_s_tangent;
	t_tMat=t_xf1.m_R;
	t_tangent.m_x=t_tMat.m_col1.m_x*t_localTangent.m_x+t_tMat.m_col2.m_x*t_localTangent.m_y;
	t_tangent.m_y=t_tMat.m_col1.m_y*t_localTangent.m_x+t_tMat.m_col2.m_y*t_localTangent.m_y;
	var t_tangent2=c_b2Collision.m_s_tangent2;
	t_tangent2.m_x=-t_tangent.m_x;
	t_tangent2.m_y=-t_tangent.m_y;
	var t_normal=c_b2Collision.m_s_normal;
	t_normal.m_x=t_tangent.m_y;
	t_normal.m_y=-t_tangent.m_x;
	var t_v11=c_b2Collision.m_s_v11;
	var t_v12=c_b2Collision.m_s_v12;
	t_v11.m_x=t_xf1.m_position.m_x+(t_tMat.m_col1.m_x*t_local_v11.m_x+t_tMat.m_col2.m_x*t_local_v11.m_y);
	t_v11.m_y=t_xf1.m_position.m_y+(t_tMat.m_col1.m_y*t_local_v11.m_x+t_tMat.m_col2.m_y*t_local_v11.m_y);
	t_v12.m_x=t_xf1.m_position.m_x+(t_tMat.m_col1.m_x*t_local_v12.m_x+t_tMat.m_col2.m_x*t_local_v12.m_y);
	t_v12.m_y=t_xf1.m_position.m_y+(t_tMat.m_col1.m_y*t_local_v12.m_x+t_tMat.m_col2.m_y*t_local_v12.m_y);
	var t_frontOffset=t_normal.m_x*t_v11.m_x+t_normal.m_y*t_v11.m_y;
	var t_sideOffset1=-t_tangent.m_x*t_v11.m_x-t_tangent.m_y*t_v11.m_y+t_totalRadius;
	var t_sideOffset2=t_tangent.m_x*t_v12.m_x+t_tangent.m_y*t_v12.m_y+t_totalRadius;
	var t_clipPoints1=c_b2Collision.m_s_clipPoints1;
	var t_clipPoints2=c_b2Collision.m_s_clipPoints2;
	var t_np=0;
	t_np=c_b2Collision.m_ClipSegmentToLine(t_clipPoints1,t_incidentEdge,t_tangent2,t_sideOffset1);
	if(t_np<2){
		return;
	}
	t_np=c_b2Collision.m_ClipSegmentToLine(t_clipPoints2,t_clipPoints1,t_tangent,t_sideOffset2);
	if(t_np<2){
		return;
	}
	t_manifold.m_m_localPlaneNormal.p_SetV(t_localNormal);
	t_manifold.m_m_localPoint.p_SetV(t_planePoint);
	var t_pointCount=0;
	for(var t_i=0;t_i<2;t_i=t_i+1){
		t_cv=t_clipPoints2[t_i];
		var t_separation=t_normal.m_x*t_cv.m_v.m_x+t_normal.m_y*t_cv.m_v.m_y-t_frontOffset;
		if(t_separation<=t_totalRadius){
			var t_cp=t_manifold.m_m_points[t_pointCount];
			t_tMat=t_xf2.m_R;
			var t_tX=t_cv.m_v.m_x-t_xf2.m_position.m_x;
			var t_tY=t_cv.m_v.m_y-t_xf2.m_position.m_y;
			t_cp.m_m_localPoint.m_x=t_tX*t_tMat.m_col1.m_x+t_tY*t_tMat.m_col1.m_y;
			t_cp.m_m_localPoint.m_y=t_tX*t_tMat.m_col2.m_x+t_tY*t_tMat.m_col2.m_y;
			t_cp.m_m_id.p_Set12(t_cv.m_id);
			t_cp.m_m_id.m_features.p_Flip2(t_flip);
			t_pointCount+=1;
		}
	}
	t_manifold.m_m_pointCount=t_pointCount;
}
function c_ClipVertex(){
	Object.call(this);
	this.m_v=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_id=c_b2ContactID.m_new.call(new c_b2ContactID);
}
c_ClipVertex.m_new=function(){
	return this;
}
c_ClipVertex.prototype.p_Set16=function(t_other){
	this.m_v.m_x=t_other.m_v.m_x;
	this.m_v.m_y=t_other.m_v.m_y;
	this.m_id.p_Set12(t_other.m_id);
}
function c_b2EdgeShape(){
	c_b2Shape.call(this);
	this.m_m_v1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_v2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_prevEdge=null;
	this.m_m_nextEdge=null;
	this.m_m_direction=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_length=.0;
	this.m_m_normal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_coreV1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_coreV2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_cornerDir1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	this.m_m_cornerDir2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
}
c_b2EdgeShape.prototype=extend_class(c_b2Shape);
c_b2EdgeShape.prototype.p_ComputeAABB=function(t_aabb,t_transform){
	var t_tMat=t_transform.m_R;
	var t_v1X=t_transform.m_position.m_x+(t_tMat.m_col1.m_x*this.m_m_v1.m_x+t_tMat.m_col2.m_x*this.m_m_v1.m_y);
	var t_v1Y=t_transform.m_position.m_y+(t_tMat.m_col1.m_y*this.m_m_v1.m_x+t_tMat.m_col2.m_y*this.m_m_v1.m_y);
	var t_v2X=t_transform.m_position.m_x+(t_tMat.m_col1.m_x*this.m_m_v2.m_x+t_tMat.m_col2.m_x*this.m_m_v2.m_y);
	var t_v2Y=t_transform.m_position.m_y+(t_tMat.m_col1.m_y*this.m_m_v2.m_x+t_tMat.m_col2.m_y*this.m_m_v2.m_y);
	if(t_v1X<t_v2X){
		t_aabb.m_lowerBound.m_x=t_v1X;
		t_aabb.m_upperBound.m_x=t_v2X;
	}else{
		t_aabb.m_lowerBound.m_x=t_v2X;
		t_aabb.m_upperBound.m_x=t_v1X;
	}
	if(t_v1Y<t_v2Y){
		t_aabb.m_lowerBound.m_y=t_v1Y;
		t_aabb.m_upperBound.m_y=t_v2Y;
	}else{
		t_aabb.m_lowerBound.m_y=t_v2Y;
		t_aabb.m_upperBound.m_y=t_v1Y;
	}
}
c_b2EdgeShape.prototype.p_ComputeMass=function(t_massData,t_density){
	t_massData.m_mass=0.0;
	t_massData.m_center.p_SetV(this.m_m_v1);
	t_massData.m_I=0.0;
}
c_b2EdgeShape.m_new=function(t_v1,t_v2){
	c_b2Shape.m_new.call(this);
	this.m_m_type=2;
	this.m_m_prevEdge=null;
	this.m_m_nextEdge=null;
	this.m_m_v1=t_v1;
	this.m_m_v2=t_v2;
	this.m_m_direction.p_Set2(this.m_m_v2.m_x-this.m_m_v1.m_x,this.m_m_v2.m_y-this.m_m_v1.m_y);
	this.m_m_length=this.m_m_direction.p_Normalize();
	this.m_m_normal.p_Set2(this.m_m_direction.m_y,-this.m_m_direction.m_x);
	this.m_m_coreV1.p_Set2(-0.040000000000000001*(this.m_m_normal.m_x-this.m_m_direction.m_x)+this.m_m_v1.m_x,-0.040000000000000001*(this.m_m_normal.m_y-this.m_m_direction.m_y)+this.m_m_v1.m_y);
	this.m_m_coreV2.p_Set2(-0.040000000000000001*(this.m_m_normal.m_x+this.m_m_direction.m_x)+this.m_m_v2.m_x,-0.040000000000000001*(this.m_m_normal.m_y+this.m_m_direction.m_y)+this.m_m_v2.m_y);
	this.m_m_cornerDir1=this.m_m_normal;
	this.m_m_cornerDir2.p_Set2(-this.m_m_normal.m_x,-this.m_m_normal.m_y);
	return this;
}
c_b2EdgeShape.m_new2=function(){
	c_b2Shape.m_new.call(this);
	return this;
}
c_b2EdgeShape.prototype.p_Copy=function(){
	var t_s=c_b2EdgeShape.m_new.call(new c_b2EdgeShape,this.m_m_v1.p_Copy(),this.m_m_v2.p_Copy());
	return (t_s);
}
function c_List7(){
	Object.call(this);
	this.m__head=(c_HeadNode7.m_new.call(new c_HeadNode7));
}
c_List7.m_new=function(){
	return this;
}
c_List7.prototype.p_AddLast8=function(t_data){
	return c_Node10.m_new.call(new c_Node10,this.m__head,this.m__head.m__pred,t_data);
}
c_List7.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast8(t_t);
	}
	return this;
}
c_List7.prototype.p_Equals3=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_List7.prototype.p_Contains4=function(t_value){
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		if(this.p_Equals3(t_node.m__data,t_value)){
			return true;
		}
		t_node=t_node.m__succ;
	}
	return false;
}
c_List7.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator7.m_new.call(new c_Enumerator7,this);
}
c_List7.prototype.p_IsEmpty=function(){
	return this.m__head.m__succ==this.m__head;
}
function c_Node10(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node10.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node10.m_new2=function(){
	return this;
}
function c_HeadNode7(){
	c_Node10.call(this);
}
c_HeadNode7.prototype=extend_class(c_Node10);
c_HeadNode7.m_new=function(){
	c_Node10.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator6(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator6.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator6.m_new2=function(){
	return this;
}
c_Enumerator6.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator6.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_main_OtherDwarf(t_dwarf){
	return bb_main_APP.m_dwarves[1-t_dwarf.m_player];
}
function c_Enumerator7(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator7.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator7.m_new2=function(){
	return this;
}
c_Enumerator7.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator7.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_main_APP=null;
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	c_Dwarf.m_sheet=null;
	c_Dwarf.m_sheet2=null;
	c_b2World.m_m_warmStarting=false;
	c_b2World.m_m_continuousPhysics=false;
	c_b2ContactFilter.m_b2_defaultFilter=c_b2ContactFilter.m_new.call(new c_b2ContactFilter);
	c_b2ContactListener.m_b2_defaultListener=(c_b2ContactListener.m_new.call(new c_b2ContactListener));
	c_b2DebugDraw.m_e_shapeBit=1;
	c_b2DebugDraw.m_e_jointBit=2;
	bb_main_WORLD_WIDTH=640.0;
	bb_main_WORLD_HEIGHT=480;
	c_JSONToken.m_reusableToken=c_JSONToken.m_new.call(new c_JSONToken,-1,null);
	c_b2Body.m_tmpVec1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	bb_abuanimation_autoManageAnimations=false;
	bb_abuanimation_animationJuggler=c_AnimationJuggler.m_new.call(new c_AnimationJuggler);
	c_Clock.m_timeCurrent=0;
	c_Clock.m_timePrevious=-1;
	c_Clock.m_timeElapsed=0;
	c_b2World.m_s_timestep2=c_b2TimeStep.m_new.call(new c_b2TimeStep);
	c_b2Distance.m_b2_gjkCalls=0;
	c_b2Distance.m_s_simplex=c_b2Simplex.m_new.call(new c_b2Simplex);
	c_b2Simplex.m_tmpVec1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Simplex.m_tmpVec2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Distance.m_s_saveA=new_number_array(3);
	c_b2Distance.m_s_saveB=new_number_array(3);
	c_b2Distance.m_tmpVec1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Simplex.m_tmpVec3=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Distance.m_tmpVec2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Distance.m_b2_gjkIters=0;
	c_b2Distance.m_b2_gjkMaxIters=0;
	c_b2ContactSolver.m_s_worldManifold=c_b2WorldManifold.m_new.call(new c_b2WorldManifold);
	c_b2ContactSolver.m_s_psm=c_b2PositionSolverManifold.m_new.call(new c_b2PositionSolverManifold);
	c_b2Island.m_s_impulse=c_b2ContactImpulse.m_new.call(new c_b2ContactImpulse);
	c_b2Body.m_s_xf1=c_b2Transform.m_new.call(new c_b2Transform,null,null);
	c_b2Fixture.m_tmpAABB1=c_b2AABB.m_new.call(new c_b2AABB);
	c_b2Fixture.m_tmpAABB2=c_b2AABB.m_new.call(new c_b2AABB);
	c_b2Fixture.m_tmpVec=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2World.m_s_queue=new_object_array(256);
	c_b2Contact.m_s_input=c_b2TOIInput.m_new.call(new c_b2TOIInput);
	c_b2TimeOfImpact.m_b2_toiCalls=0;
	c_b2TimeOfImpact.m_s_cache=c_b2SimplexCache.m_new.call(new c_b2SimplexCache);
	c_b2TimeOfImpact.m_s_distanceInput=c_b2DistanceInput.m_new.call(new c_b2DistanceInput);
	c_b2TimeOfImpact.m_s_xfA=c_b2Transform.m_new.call(new c_b2Transform,null,null);
	c_b2TimeOfImpact.m_s_xfB=c_b2Transform.m_new.call(new c_b2Transform,null,null);
	c_b2TimeOfImpact.m_s_distanceOutput=c_b2DistanceOutput.m_new.call(new c_b2DistanceOutput);
	c_b2TimeOfImpact.m_s_fcn=c_b2SeparationFunction.m_new.call(new c_b2SeparationFunction);
	c_b2SeparationFunction.m_tmpTransA=c_b2Transform.m_new.call(new c_b2Transform,null,null);
	c_b2SeparationFunction.m_tmpTransB=c_b2Transform.m_new.call(new c_b2Transform,null,null);
	c_b2SeparationFunction.m_tmpVec1=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2SeparationFunction.m_tmpVec2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2SeparationFunction.m_tmpVec3=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2TimeOfImpact.m_b2_toiRootIters=0;
	c_b2TimeOfImpact.m_b2_toiMaxRootIters=0;
	c_b2TimeOfImpact.m_b2_toiIters=0;
	c_b2TimeOfImpact.m_b2_toiMaxIters=0;
	c_b2World.m_s_backupA=c_b2Sweep.m_new.call(new c_b2Sweep);
	c_b2World.m_s_backupB=c_b2Sweep.m_new.call(new c_b2Sweep);
	c_b2World.m_s_timestep=c_b2TimeStep.m_new.call(new c_b2TimeStep);
	c_Clock.m_timeStep=-1;
	c_Glitch.m_JETPACK=(c_JetpackGlitch.m_new.call(new c_JetpackGlitch));
	bb_dwarf_CONTROL_SCHEME_WASD=[87,68,83,65,84];
	bb_dwarf_CONTROL_SCHEME_ARROWS=[38,39,40,37,188];
	bb_dwarf_CONTROL_SCHEMES=[bb_dwarf_CONTROL_SCHEME_WASD,bb_dwarf_CONTROL_SCHEME_ARROWS];
	c_Glitch.m_TUMBLEWEED=(c_TumbleweedGlitch.m_new.call(new c_TumbleweedGlitch));
	c_Glitch.m_HEADLESS=(c_HeadlessGlitch.m_new.call(new c_HeadlessGlitch));
	c_Glitch.m_SPACE=(c_SpaceGlitch.m_new.call(new c_SpaceGlitch));
	c_Glitch.m_ALL=[c_Glitch.m_HEADLESS,c_Glitch.m_JETPACK,c_Glitch.m_SPACE,c_Glitch.m_TUMBLEWEED];
	c_Glitch.m_SEVERITY_PHASES=[0,25,40,50,60,100,125,140,150,160,180,190,200];
	c_Glitch.m_severityPrevious=0;
	bb_random_Seed=1234;
	c_Glitch.m_COUNT=[0,1,1,1,1,2,2,2,2,3,3,3,4];
	c_Glitch.m_whichPrevious=null;
	c_Dwarf.m_FRAME_START=[0,60];
	c_b2DynamicTreeNode.m_idCount=0;
	c_b2DynamicTree.m_shared_aabbCenter=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2RevoluteJoint.m_tImpulse=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_edgeAO=new_number_array(1);
	c_b2Collision.m_s_edgeBO=new_number_array(1);
	c_b2Collision.m_s_incidentEdge=c_b2Collision.m_MakeClipPointVector();
	c_b2Collision.m_s_localTangent=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_localNormal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_planePoint=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_tangent=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_tangent2=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_normal=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_v11=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_v12=c_b2Vec2.m_new.call(new c_b2Vec2,0.0,0.0);
	c_b2Collision.m_s_clipPoints1=c_b2Collision.m_MakeClipPointVector();
	c_b2Collision.m_s_clipPoints2=c_b2Collision.m_MakeClipPointVector();
}
//${TRANSCODE_END}
