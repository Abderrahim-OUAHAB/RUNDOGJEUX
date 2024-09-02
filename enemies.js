import { PlantSound ,FlySound,SpiderSound} from "./effect.js";
export   class Enemy{
    constructor(){
        this.frameX=0;
        this.frameY=0;
        this.maxFrame=5;
        this.fps=10;
        this.frameTimer=0;
        this.frameInterval=1000/this.fps;
        this.markForDeletion=false;
        
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);

    }

    update(deltaTime){
        this.x-=this.speedX+this.game.speed;
        this.y+=this.speedY;
        if(this.frameTimer>this.frameInterval){
            this.frameTimer=0;
            if(this.frameX>=this.maxFrame) this.frameX=0;
            else this.frameX++;
          
        }else{
            this.frameTimer+=deltaTime;
        }
        if(this.x+this.width<0) this.markForDeletion=true;
       
    }

}


export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=60;
        this.height=44;
        this.image=flyer;
        this.x=this.game.width+Math.random()*this.game.width*0.5;
        this.y=Math.random()*this.game.height *0.5;
        this.speedX=Math.random()+1;
        this.speedY=0;
        this.maxFrame=5;
        this.angle=0;
        this.va=Math.random()* 0.1+0.1;
        this.game.effects.push(new FlySound(this.game));

    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle+=this.va;
        this.y+=Math.sin(this.angle);

    }
    draw(ctx){
        super.draw(ctx)
    }

}


export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=60;
        this.height=87;
        this.x=this.game.width;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.image=plant;
        this.speedX=0;
        this.speedY=0;
        this.maxFrame=1;
       this.game.effects.push(new PlantSound(this.game));
    }


}


export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=120;
        this.height=144;
        this.x=this.game.width;
        this.y=Math.random()*this.game.height*0.5;
        this.image=spider;
        this.speedX=0;
        this.speedY=Math.random()>0.5 ? 1:-1;
        this.maxFrame=5;
        this.game.effects.push(new SpiderSound(this.game));

    }

    update(deltaTime){
        super.update(deltaTime);
        if(this.y>this.game.height-this.height-this.game.groundMargin) this.speedY*=-1;
        if(this.y<-this.height) this.markForDeletion=true;
    }
    draw(ctx){
        super.draw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.x+this.width/2,0);
        ctx.lineTo(this.x+this.width/2,this.y+100);
        ctx.stroke();
    }
}

export class DodaEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=80.33;
        this.height=60;
        this.x=this.game.width;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.image=doda;
        this.speedX=0;
        this.speedY=0;
        this.maxFrame=5;
       this.game.effects.push(new PlantSound(this.game));
    }


}


export class ElyanEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=60.16;
        this.height=70;
        this.image=elyan;
        this.x=this.game.width+Math.random()*this.game.width*0.5;
        this.y=Math.random()*this.game.height *0.5;
        this.speedX=Math.random()+1;
        this.speedY=0;
        this.maxFrame=5;
        this.angle=0;
        this.va=Math.random()* 0.1+0.1;
        this.game.effects.push(new FlySound(this.game));
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle+=this.va;
        this.y+=Math.sin(this.angle);

    }
    draw(ctx){
        super.draw(ctx)
    }

}

export class HandEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=55.75;
        this.height=80;
        this.x=this.game.width;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.image=hand;
        this.speedX=0;
        this.speedY=0;
        this.maxFrame=7;
       this.game.effects.push(new PlantSound(this.game));
    }


}

export class ZgEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=120.125;
        this.height=90;
        this.x=this.game.width;
        this.y=this.game.height-this.height-this.game.groundMargin-15;
        this.image=zg;
        this.speedX=0;
        this.speedY=0;
        this.maxFrame=7;
       this.game.effects.push(new PlantSound(this.game));
    }


}

export class GtEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=87.33;
        this.height=70;
        this.image=gt;
        this.x=this.game.width+Math.random()*this.game.width*0.5;
        this.y=Math.random()*this.game.height *0.5;
        this.speedX=Math.random()+1;
        this.speedY=0;
        this.maxFrame=5;
        this.angle=0;
        this.va=Math.random()* 0.1;
        this.game.effects.push(new FlySound(this.game));
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle+=this.va;
        this.y+=Math.sin(this.angle);

    }
    draw(ctx){
        super.draw(ctx)
    }

}

export class ZwEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=55.75;
        this.height=80;
        this.x=this.game.width;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.image=zw;
        this.speedX=0;
        this.speedY=0;
        this.maxFrame=7;
       this.game.effects.push(new PlantSound(this.game));
    }


}