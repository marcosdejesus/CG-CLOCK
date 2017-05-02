vertexShaderText = 
[
'attribute vec2 vertPosition;',
'attribute vec3 colorPosition;',
'varying vec3 fragColor;',
'void main()',
'{',
'	gl_Position = vec4(vertPosition, 0.0, 1.0);',
'	fragColor = colorPosition;',
'}'
].join('\n');

fragmentShaderText = 
[
'precision mediump float;',
'varying vec3 fragColor;',
'void main()',
'{',
'	gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var resize = function(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  != displayWidth ||
        canvas.height != displayHeight) {

      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    };
}

var createShader = function(gl, type, source){
 		
 	var shader = gl.createShader(type);
 	gl.shaderSource(shader, source);
 	gl.compileShader(shader);
 	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
 		console.log("error compiling shader!", gl.getShaderInfoLog(shader));
 		return;
 	}
 	console.log("shadercriado");
 	return shader;
 };

var createProgram = function(gl, vertexShader, fragmentShader){

 	var program = gl.createProgram();
 	gl.attachShader(program, vertexShader);
 	gl.attachShader(program, fragmentShader);
 	gl.linkProgram(program);
 	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
 	if(success){
 		console.log("criando programa");
 		return program;

 	}
 	console.log(gl.getProgramInfoLog());
 	gl.deleteProgram(program);

 };


var InitProg = function(){

	var canvas = document.getElementById("canvas");
	console.log("hello world");

	var gl = canvas.getContext('webgl');
	if(!gl){
		return;
	}
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// criando os shaders
	var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);

	//criando programa, attaching shaders, linking shaders
	
	var program = createProgram(gl, vertexShader, fragmentShader);

	//localizando os atributos
	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'colorPosition');
	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	/*
		@@@@@@@@@@@ BORDAS DO RELÓGIO @@@@@@@@@@@@ 
	*/	
	var borderColor = [];
	for(var i  = 0 ; i< 100; i ++){
		borderColor.push(1.0, 1.0, 1.0);
	}
	var borderColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, borderColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(borderColor), gl.STATIC_DRAW);
	gl.vertexAttribPointer( colorAttribLocation, 3, gl.FLOAT, false, 0, 0);

	var circulo = [];
	for (var i = 0; i<100; i++){
		circulo.push(0.9*Math.sin((i*Math.PI*3.6)/180), 0.9*Math.cos((i*Math.PI*3.6)/180));	
	}
	var circuloBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, circuloBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circulo), gl.STATIC_DRAW);
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);

	gl.useProgram(program);
	gl.drawArrays(gl.LINE_LOOP, 0, 100);

	/*
		@@@@@@@@@@@ MARCAÇÃO DOS MINUTOS @@@@@@@@@@@@ 
	*/
	
	var minMarkColor = [];
	for(var i = 0; i<120; i++){
		minMarkColor.push(1.0, 1.0, 1.0);
	}
	var minMarkColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, minMarkColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(minMarkColor), gl.STATIC_DRAW);
	gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 0,0);

	var minMark = [];
	for(var i =0; i< 60; i++){
		minMark.push(0.85*Math.sin((i*Math.PI*6)/180), 0.85*Math.cos((i*Math.PI*6)/180));
		minMark.push(0.80*Math.sin((i*Math.PI*6)/180), 0.80*Math.cos((i*Math.PI*6)/180));
	}
	var minMarkBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, minMarkBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(minMark), gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.LINES, 0, 120);

	/*
		@@@@@@@@@@@ MARCAÇÃO DAS HORAS @@@@@@@@@@@@ 
	*/
	
	var hourMarkColor = [];
	for(var i = 0; i<24; i++){
		hourMarkColor.push(1.0, 1.0, 1.0);
	}
	var hourMarkColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, hourMarkColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hourMarkColor), gl.STATIC_DRAW);
	gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false , 0 , 0);

	var hourMark = [];
	for (var i = 0; i<12; i++){
		hourMark.push(0.75*Math.sin((i*Math.PI*30)/180), 0.75*Math.cos((i*Math.PI*30)/180));
		hourMark.push(0.60*Math.sin((i*Math.PI*30)/180), 0.60*Math.cos((i*Math.PI*30)/180));
	}
	var hourMarkBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, hourMarkBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hourMark), gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.LINES, 0, 24);

	/*
		@@@@@@@@@@@ PONTEIRO DAS HORAS @@@@@@@@@@@@ 
	*/

	var hourPointerColor = [];
	for(var i =0; i<6; i++){
		hourPointerColor.push(1.0,1.0,1.0);
	}
	var hourPointerColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, hourPointerColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hourPointerColor), gl.STATIC_DRAW);
	gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 0, 0);

	var hourPointer = [
		0.0, 0.02,
		0.55, 0.02, //HORA
		0.0, -0.02,
		0.55, 0.02,
		0.0, -0.02,
		0.55, -0.02
	];

	var hourPointerBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, hourPointerBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hourPointer), gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 6);	

	/*
		@@@@@@@@@@@ PONTEIRO DOS MINUTOS @@@@@@@@@@@@ 
	*/
	
	var minPointerColor = [];
	for(var i =0; i<6; i++){
		minPointerColor.push(1.0,1.0,1.0);
	}
	var minPointerColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, minPointerColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(minPointerColor), gl.STATIC_DRAW);
	gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 0, 0);

	var minPointer = [
		-0.02, 0.0, 
		-0.02, 0.8, //MINUTO
		0.02, 0.8,
		-0.02, 0.0,
		0.02, 0.8,
		0.02, 0.0,
	];
	var minPointerBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, minPointerBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(minPointer), gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 6);

	/*
		@@@@@@@@@@@ PONTEIRO DOS SEGUNDOS @@@@@@@@@@@@ 
	*/	

	var segPointerColor =[
		1.0,0.0, 0.0,
		1.0,0.0, 0.0,
		1.0,0.0, 0.0,
		1.0,0.0, 0.0
	];
	var segPointerColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, segPointerColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segPointerColor), gl.STATIC_DRAW);
	gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, gl.FALSE, 0, 0);
	var segPointer = [
		0.0, 0.0,
		0.0, -0.8
	];
	var segPointerBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, segPointerBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segPointer), gl.STATIC_DRAW);
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);

	gl.drawArrays(gl.LINES, 0, 2);
};
