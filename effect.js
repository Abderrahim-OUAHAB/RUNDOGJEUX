class Sound{
    constructor(game){
        this.game=game;
        this.audio=new Audio();
        this.markForDeletion=false;
        

    }
    play(){
       this.audio.play();
        this.markForDeletion=true;
    }

    pause(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}

export class ScoreSound extends Sound{
    constructor(game){
        super(game);
     
        this.audio.src="tools/point.wav";
        this.audio.volume=0.5;
    
    }
}

export class RunSound extends Sound{
    constructor(game){
        super(game);
     
        this.audio.src="tools/run.mp3";
        this.audio.volume=0.6;
      //  this.audio.playbackRate=0;
     
   
    }
    play(){
        super.play();
      
    }
}

export class HitSound extends Sound{
    constructor(game){
        super(game);
     
        this.audio.src="tools/boom.wav";
        this.audio.volume=0.1;
     
    }}



 export class AttackSound extends Sound{
        constructor(game){
            super(game);
         
            this.audio.src="tools/special_attack.wav";
            this.audio.volume=0.1;
     
        }}


export class JumpSound extends Sound{
            constructor(game){
                super(game);
              
                this.audio.src="tools/jump.ogg";
                this.audio.volume=0.5;
           
            }}

export class BackSound extends Sound{
                constructor(game){
                    super(game);
                
                    this.audio.src="tools/back.mp4";
                    this.audio.volume=0.05;
                    this.audio.play();
          
                }}

export class GameOverSound extends Sound{
    constructor(game){
        super(game);
    
        this.audio.src="tools/gameover.wav";
        this.audio.volume=0.7;
        this.audio.play();

    }}

export class WinSound extends Sound{
        constructor(game){
            super(game);
        
            this.audio.src="tools/win.wav";
            this.audio.volume=0.7;
            this.audio.play();
    
        }}

export class PlantSound extends Sound{
            constructor(game){
                super(game);
            
                this.audio.src="tools/plant_monster.wav";
                this.audio.volume=0.07;
                
        
            }}


export class FlySound extends Sound{
                constructor(game){
                    super(game);
                
                    this.audio.src="tools/fly_monster.ogg";
                    this.audio.volume=0.04;
                    
            
                }}
        
    
export class SpiderSound extends Sound{
                    constructor(game){
                        super(game);
                    
                        this.audio.src="tools/spiderMonster.wav";
                        this.audio.volume=0.04;
                        
                
                    }}