(function (scope){
	function App(){
		
		this.arrayNotas=[];
		this.cargarNotas();
		//this.cargarNotasHandlebars();
		this.contador=0;
		this.cargarContador();
	}
	//App.prototype.arrayNotas = 'Array Notas';

	App.prototype.crearNota = function(pId,pContenido,pAncho,pAlto,pLeft,pTop,pColor){
		// Instancia de la clase estructural <<Nota> ruta = js/Nota.js>
		var nota = new Nota(pId,pContenido,pAncho,pAlto,pLeft,pTop,pColor);	
		this.arrayNotas.push(nota);
		App.prototype.dibujarNota(nota);
		this.contador++;
		this.guardarContador(this.contador);
		return nota;
	};

	App.prototype.eliminarNota = function(pId){
		var notaAux = this.buscarNota(pId);
		//this.arrayNotas.splice(notaAux,1);
		var indice = this.buscarIndiceNota(pId);
		this.arrayNotas.splice(indice,1);
		this.guardarInformacion();
		
	};

	App.prototype.dibujarNota = function(nota){
		//USANDO  PLANTILLAS de HANDLEBARS JS PARA INSERTAR PORCIONES DE HTML EN EL DOM
		var fuente = $('#plantilla-nota').html();
		var plantilla = Handlebars.compile(fuente);

		var datos = {id : nota.id,contenido:nota.contenido};
		var html = plantilla(datos);

		$('#contenedorNotas').append(html);


		//$("#contenedorNotas").append(' <div class="nota" '+"id="+nota.id+'> <a class="x">x<a/><textarea>'+nota.contenido+'</textarea>  </div>');
		var n = $("#"+nota.id);
		n.css("position","absolute").css("left",nota.left).css("top",nota.top).css("background-color",nota.color).css("width",nota.ancho).css("height",nota.alto);

		this.agregarEventosNota(nota);
	};

	App.prototype.agregarEventosNota = function( nota){
		$("#"+nota.id+" .x").on("click",function(e){
		var nota = $(this).parent();
		nota.fadeOut("fast",function(){
		nota.remove();
		});		
		
		window.app.eliminarNota(nota.attr("id"));

		});

		$("#"+nota.id+" textarea").on("keyup",function(e){
		var idNot = $(this).parent().attr("id");			
		extarerInfoDOM(idNot);		
		});	

		$("#"+nota.id).draggable({
			 stop: function() {
			 	var idNot = $(this).attr("id");		
			 	extarerInfoDOM(idNot);
			 	
	        },
	        cursor: "crosshair",
	        distance: 0.001,
	      	grid: [ 4, 4 ],
	      	opacity: 0.9,
	      	scroll: true
		}).on("mouseover",function(){
			var i = $(this);
			$("#"+i.attr("id")+" .x").addClass("mostrar").removeClass("ocultar");
			$("#"+i.attr("id")+" .colores").addClass("mostrar").removeClass("ocultar");
		}).on("mouseout",function(){
			var i = $(this);
			$("#"+i.attr("id")+" .x").addClass("ocultar").removeClass("mostrar");
			$("#"+i.attr("id")+" .colores").addClass("ocultar").removeClass("mostrar");

		}).resizable({
			//alsoResize: ".nota",
			//ghost: true ,
			//grid: [ 20, 10 ],
			//handles: "n, e, s, w",
			autoHide: true,
			
			stop: function() {
			 	var idNot = $(this).attr("id");		
			 	extarerInfoDOM(idNot);
			 	
	        }
		}).on("mousedown",function(){
			$(".nota").css("z-index","0");
			$(this).css("z-index","100");

		});
		//USANDO  PLANTILLAS de HANDLEBARS JS PARA INSERTAR PORCIONES DE HTML EN EL DOM
		 fuente = $('#plantilla-colores').html();
		 plantilla = Handlebars.compile(fuente);
		
		 html = plantilla();

		$("#"+nota.id).prepend(html);

		//$("#"+nota.id).prepend("<img src=img/color.png class='colores'> <div class=selColores> <div class=blanco></div> <div class=verde></div> <div class=amarillo></div> <div class=azul></div> <div class=rojo></div> <div class=naranja></div>  </div>");
		$("#"+nota.id+" .selColores div").on("click",function(){
			var color = $(this).css("background-color");
			var imagen = $(this).css("background-image");
			$("#"+nota.id).css("background-color",color).css("background-image",imagen);
			
			extarerInfoDOM(nota.id);
		});
		$("#"+nota.id+" .colores").on("click",function(){
			$("#"+nota.id+" .selColores").slideDown("fast");
		});

		$("#"+nota.id+" .selColores").on("mouseleave",function(){
			$(this).slideUp("fast");
		});

		$("#"+nota.id).on("mouseleave",function(){
			$("#"+nota.id+" .selColores").slideUp("fast");
		});

	};

	
	App.prototype.guardarInformacion = function(){
		var objSerialized = JSON.stringify(this.arrayNotas);
		localStorage.setItem("arrayNotas", objSerialized);
	};

	App.prototype.guardarContador = function(pContador){
		var objSerialized = JSON.stringify(pContador);
		localStorage.setItem("contador", objSerialized);
	};

	App.prototype.buscarNota = function(pId){
		var notaRetorno = null;
		for (var i = 0; i<this.arrayNotas.length; i++){
			if(this.arrayNotas[i].id==pId){
				notaRetorno=this.arrayNotas[i];
			}
		}
		return  notaRetorno;
	};

	App.prototype.buscarIndiceNota = function(pId){
		var notaRetorno = null;
		for (var i = 0; i<this.arrayNotas.length; i++){
			if(this.arrayNotas[i].id==pId){
				notaRetorno=i;
			}
		}
		return  parseInt(notaRetorno);
	};

	App.prototype.cambiarInformacion = function(pNota){
		for(var i=0; i<this.arrayNotas.length;i++){
			if(this.arrayNotas[i].id==pNota.id){
				this.arrayNotas[i] = pNota;
			}
		}
		var objSerialized = JSON.stringify(this.arrayNotas);
		localStorage.setItem("arrayNotas", objSerialized);
	};

	App.prototype.cargarNotas = function(pNota){
		var objSerialized = localStorage.getItem("arrayNotas");
		if(objSerialized!=null){
			var array= JSON.parse(objSerialized);
			this.arrayNotas=array;
			for(var i = 0; i<array.length;i++){
				var nota = array[i];			
				App.prototype.dibujarNota(nota);

			}
			
		}
	
	};
	App.prototype.cargarNotasHandlebars = function(pNota){
		var objSerialized = localStorage.getItem("arrayNotas");
		if(objSerialized!=null){
			var array= JSON.parse(objSerialized);
			var fuente = $('#plantilla-notas').html();
			var plantilla = Handlebars.compile(fuente);

			var datos = array;
			var html = plantilla(datos);
			
			$('#contenedorNotas').append(html);		
			
		}
	
	};

	App.prototype.cargarContador = function(){
		var objSerialized = localStorage.getItem("contador");
		if(objSerialized!=null){
			var contador= JSON.parse(objSerialized);
			this.contador=contador;		
			
		}
	
	};

	scope.App = App;
}(window));


//Metodo Main Global
window.onload = function(){
	this.app = new App();	
	
	$("#btnCrear").on("click",function(e){		
		window.app.crearNota(window.app.contador,"","","","","","");
	});

	$("#btnGuardar").on("click",function(e){
		
		
	});

	$("#btnPrueba").on("click",function(e){
		alert(window.app.arrayNotas.length);
		
	});

	$(".colorFondo").on("click",function(){
		var colorF = $(this).css("background-color");
		var imagen = $(this).css("background-image");
		$("#contenedorNotas").css("background-color",colorF).css("background-image",imagen).css("-webkit-transition","all 0.4s ease-in-out").css("-moz-transition","all 0.4s ease-in-out");
	});

	$(".estilo").on("click",function(){
		var imagen = $(this).css("background-image");
		$(".colorFondo").css("background-image",imagen).css("background-size","50%");
	});

	/*var pets = '{"pets":[{"name":"jack","apellido":"aa"},{"name":"john"},{"name":"joe"}]}';
	var arr = JSON.parse(pets);
	alert(arr.pets[0].apellido);*/


	//PRUEBAS __________________________

	$(".mascota").draggable({
		 axis: "x",
		 containment: "parent"
	});


}

function extarerInfoDOM(idNot){
	var nuevoCont = $("#"+idNot+" textarea").val();				 
 	var notaDOM = $("#"+idNot);

 	var nuevoAncho = notaDOM.width();
 	var nuevoAlto = notaDOM.height();
 	var posicion = notaDOM.position();
 	var nuevoLeft =posicion.left;
 	var nuevoTop = posicion.top;	
 	var nuevoColor = notaDOM.css("background-color");
 	
	var notAux = window.app.buscarNota(idNot);
	if(notAux!=null){
		notAux.contenido = nuevoCont;	 	
		notAux.ancho = nuevoAncho;
		notAux.alto = nuevoAlto;
		notAux.left = nuevoLeft;
		notAux.top = nuevoTop;
		notAux.color = nuevoColor;
		window.app.cambiarInformacion(notAux);
				
		}
	
}

