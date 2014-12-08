
    function Nota(pId,pContenido,pAncho,pAlto,pLeft,pTop,pColor){
       this.id = pId;
       this.contenido = pContenido;
       this.ancho = parseInt(pAncho);
       this.alto = parseInt(pAlto);
       this.left= parseInt(pLeft);
       this.top = parseInt(pTop);
       this.color = pColor;
    }
   
    Nota.prototype.get=function(atributo){
        switch(atributo)
        {
            case "id":
                return this.id;
            case "contenido":
                return this.contenido;
            case "ancho":
                return this.ancho;
            case "alto":
                return this.alto;    
            case "left":
                return this.left;
            case "top":
                return this.top;
            case "color":
                return this.color;                
        }
    };
    Nota.prototype.set=function(atributo,valor){
        switch(atributo)
        {
            case "id":
                this.id=valor;
                break;
            case "contenido":
               this.contenido=valor;
                break;
            case "ancho":
                this.ancho=valor;
                break;
            case "alto":
                this.alto=valor;
                break;
            case "left":
                this.left=valor;
                break;
            case "top":
                this.top=valor;
                break;
            case "color":
                this.color=valor;
                break;           
      
        }
    };
   
    Nota.prototype.metodo1=function(){
        this.atributo1+=10;
    };