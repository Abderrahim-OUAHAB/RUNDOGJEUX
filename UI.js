import { GameOverSound ,WinSound} from "./effect.js";
export class UI{
    constructor(game){
        this.game=game;
        this.fontSize=30;
        this.fontFamily="'Press Start 2P'";
        this.livesImage=live;
       this.liveImageWidth = 30;  
       this.liveImageHeight = 30;

    }
    draw(ctx){
        ctx.save();
        ctx.shadowOffsetX=2;
        ctx.shadowOffsetY=2;
        ctx.shadowColor='white';
        ctx.shadowBlur=0;
        ctx.font=this.fontSize+"px "+this.fontFamily;
        ctx.textAlign="left";
        ctx.fillStyle=this.game.fontColor;
        // score
        ctx.fillText("Score : " +Math.abs(this.game.score),10,40);
        //timer
        ctx.font=this.fontSize*0.6+"px "+this.fontFamily;
        ctx.fillText('Time: '+Math.abs((this.game.time*0.001)).toFixed(0)+" s",10,80);
        //speciam Attack
        ctx.font=this.fontSize*0.6+"px "+this.fontFamily;
        ctx.fillText('Special : '+Math.abs((this.game.specialAttackTime*0.001)).toFixed(0)+" s",10,155);
        //lives

        for(let i=0;i<this.game.lives;i++){
            ctx.drawImage(this.livesImage, 10 + (this.liveImageWidth + 10) * i, 100, this.liveImageWidth, this.liveImageHeight);        
        }

        //game over msg
     
        if(this.game.gameOver){
      
            ctx.textAlign='center';
            ctx.font=this.fontSize*2+"px "+this.fontFamily;
            if(this.game.score===this.game.scoreFinal){
                this.game.effects.push(new WinSound(this.game))
            ctx.fillText("BOO-YAH !",this.game.width*0.5,this.game.height*0.5-20);
         
        
        }else{
            this.game.effects.push(new GameOverSound(this.game));
            ctx.shadowOffsetX=3;
            ctx.shadowOffsetY=3;
            ctx.shadowColor='black';
            ctx.shadowBlur=0;
            ctx.fillStyle="white";
            ctx.fillText("GAME OVER !",this.game.width*0.5,this.game.height*0.5-20);
           
        }
        }
        ctx.restore();
    }
}