export class Layer{
    constructor(game,width,height,speedModifier,image){
        this.game=game;
        this.x=0;
        this.y=0;
        this.width=width;
        this.height=height;
        this.image=image;
        this.speedModifier=speedModifier;
    
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x+this.width-1,this.y,this.width,this.height);
    }

    update(){
        if(this.x < 0-this.width){
            this.x=0;
        }else{
            this.x-=this.game.speed*this.speedModifier;
        }
   
    }
    




}



export class Background{
    constructor(game){
        this.game=game;
        this.width=this.game.width;
        this.height=this.game.height;
        this.imgLayer=forest;
        this.layer1= new Layer(this.game,this.width,this.height,1.8,this.imgLayer);
        this.backgroundLayers=[this.layer1];

    }

    update(){
        this.backgroundLayers.forEach(layer=>{
        layer.update();
        })
    }

    draw(ctx){
        this.backgroundLayers.forEach(layer=>{
            layer.draw(ctx);
        })
    }
}


export class Background2{
    constructor(game){
        this.game=game;
        this.width=this.game.width;
        this.height=this.game.height;
        this.imgLayer1=layer1;
        this.imgLayer2=layer2;
        this.imgLayer3=layer3;
        this.imgLayer4=layer4;
        this.imgLayer5=layer5;
        this.layer5= new Layer(this.game,this.width,this.height,3.8,this.imgLayer5);
        this.layer4= new Layer(this.game,this.width,this.height,3.6,this.imgLayer4);
        this.layer3= new Layer(this.game,this.width,this.height,3.4,this.imgLayer3);
        this.layer2= new Layer(this.game,this.width,this.height,3.2,this.imgLayer2);
        this.layer1= new Layer(this.game,this.width,this.height,3,this.imgLayer1);
        this.backgroundLayers=[this.layer1,this.layer2,this.layer3,this.layer4,this.layer5];

    }

    update(){
        this.backgroundLayers.forEach(layer=>{
        layer.update();
        })
    }

    draw(ctx){
        this.backgroundLayers.forEach(layer=>{
            layer.draw(ctx);
        })
    }
}


export class Background3{
    constructor(game){
        this.game=game;
        this.width=this.game.width;
        this.height=this.game.height;
        this.imgLayer1=ayer1;
        this.imgLayer2=ayer2;
        this.imgLayer3=ayer3;
        this.imgLayer4=ayer4;
        this.imgLayer5=ayer5;
        this.layer5= new Layer(this.game,this.width,this.height,3.8,this.imgLayer5);
        this.layer4= new Layer(this.game,this.width,this.height,3.6,this.imgLayer4);
        this.layer3= new Layer(this.game,this.width,this.height,3.4,this.imgLayer3);
        this.layer2= new Layer(this.game,this.width,this.height,3.2,this.imgLayer2);
        this.layer1= new Layer(this.game,this.width,this.height,3,this.imgLayer1);
        this.backgroundLayers=[this.layer1,this.layer2,this.layer3,this.layer4,this.layer5];

    }

    update(){
        this.backgroundLayers.forEach(layer=>{
        layer.update();
        })
    }

    draw(ctx){
        this.backgroundLayers.forEach(layer=>{
            layer.draw(ctx);
        })
    }
}

