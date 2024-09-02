  /** @type {HTMLCanvasElement} */;

import { Background, Background2, Background3 } from "./backgroud.js";
import { BackSound } from "./effect.js";
import { ClimbingEnemy, DodaEnemy, ElyanEnemy, FlyingEnemy, GroundEnemy, GtEnemy, HandEnemy, ZgEnemy } from "./enemies.js";
import InputHandler from "./input.js";
import Player from "./player.js";
import { UI } from "./UI.js";
document.addEventListener('DOMContentLoaded',function(){
    const canvas=document.getElementById("canva1");
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    const btnFullScreen=document.getElementById("fullScreen");
    function toggleFullScreen(){
      if((!document.fullscreenElement)){
          canvas.requestFullscreen().catch(err=>{
              alert(`Error, can't enable full-screen mode ${err.message}`);
          })}
      else{
          document.exitFullscreen();
      
      }
  }

  btnFullScreen.addEventListener('click',toggleFullScreen);
    class Game{
      constructor(width,height){
        this.width=width;
        this.height=height;
        this.groundMargin=70;
        this.speed=0;
        this.maxSpeed=2;
        this.maxSpeedModifier=1;
        this.background=new Background(this);
        this.background2=new Background2(this);
        this.background3=new Background3(this);
        this.player=new Player(this);
        this.input=new InputHandler(this);
        this.UI=new UI(this);
        this.enemies=[];
        this.particles=[];
        this.collisions=[];
        this.messages=[];
        this.effects=[];
        this.maxParticles=50;
        this.enemeyTimer=0;
        this.enemyInterval=1000;
        this.debug=false;
        this.score=0;
        this.winningScore=25;
        this.scoreFinal=100;
        this.stateChangeScore=25;
        this.fontColor="black";
        this.player.currentState=this.player.states[0];
        this.player.currentState.enter();
        //logique
        this.second=40;
        this.time=this.second*1000;
        this.maxTime=5000;
        this.gameOver=false;
        this.lives=3;
        this.specialAttackTime=3*1000;
      this.conditionSpecialttack=5;

         // Transition logic
         this.transitionAlpha = 0; 
         this.isTransitioning = false;
         this.transitionSpeed = 0.05;
       
        

      }

      update(deltaTime){
        //logique pour fin de jeux 
        if(this.score===this.scoreFinal) this.gameOver=true;

        // Logique de transition
    if (this.score >= this.stateChangeScore && this.score < 3 * this.stateChangeScore) {
      if (!this.isTransitioning) this.isTransitioning = true;
      if (this.transitionAlpha < 1) {
          this.transitionAlpha += this.transitionSpeed;
          if (this.transitionAlpha > 1) this.transitionAlpha = 1;
      } else {
          this.isTransitioning = false;
      }
  } else if (this.score >= 3 * this.stateChangeScore) {
      if (!this.isTransitioning) this.isTransitioning = true;
      if (this.transitionAlpha < 1) {
          this.transitionAlpha += this.transitionSpeed;
          if (this.transitionAlpha > 1) this.transitionAlpha = 1;
      } else {
          this.isTransitioning = false;
      }
  } else {
      this.transitionAlpha = 0; // Pas de transition
  }


        //Specila attack time limit
        if(this.player.currentState=== this.player.states[4]){
          this.specialAttackTime-=deltaTime;
        }
        //Recharche special attack after getting 5 pts
        if(this.score>0 && this.score%this.conditionSpecialttack===0) this.specialAttackTime=3*1000;

      //Game logique
        if(this.score>=this.winningScore){
          this.time+=this.second*1000;
          this.winningScore+=20;
        }
        //Song game over
        if(this.gameOver){
          this.effects.forEach(song=>{
            song.pause();
          })
        }
        this.effects.forEach(song=>{
          song.play();
        })

        //Timer for game
        this.time-=deltaTime;
        //game EnD
        if((this.time*0.001).toFixed(0)<=0) {
          this.gameOver=true;
          }
          //background
          if(this.score<this.stateChangeScore) this.background.update();
        else if(this.score>=this.stateChangeScore  && this.score<3*this.stateChangeScore) {
          this.background2.update(ctx);
          this.maxSpeed=this.maxSpeedModifier*1.5;
          this.groundMargin=110;
  
        }
        else if(this.score>=3*this.stateChangeScore){
          this.background3.update(ctx);
          this.maxSpeed=this.maxSpeedModifier*2;
          this.groundMargin=70;
        }
        this.player.update(this.input.keys,deltaTime);
        //handleEnemy
        if(this.enemeyTimer> this.enemyInterval){
          this.addEnemy();
          this.enemeyTimer=0;
        }else{
          this.enemeyTimer+=deltaTime;
        }
        this.enemies.forEach(enemy=>{
          enemy.update(deltaTime);
          if(enemy.markForDeletion) this.enemies.splice(this.enemies.indexOf(enemy),1);
        })
        //Handle msgs
        this.messages.forEach((message)=>{
          message.update();
      
        })
      //Handle particles
        this.particles.forEach((particle,index)=>{
          particle.update();
          if(particle.markedForDeletion) this.particles.splice(index,1);
        })
        if(this.particles.length>this.maxParticles){
          this.particles=this.particles.slice(0,this.maxParticles);
        }
        //Handle collision animation boom
        this.collisions.forEach((collision,index)=>{
          collision.update(deltaTime);
          if(collision.markedForDeletion) this.collisions.splice(index,1);
        })
        if(this.particles.length>this.maxParticles){
          this.particles.length=this.maxParticles;
        }
        //Delete 
        this.effects=this.effects.filter(effect=> !effect.markForDeletion);
        this.enemies=this.enemies.filter(enemy=> !enemy.markForDeletion);
        this.particles=this.particles.filter(prtcs=> !prtcs.markedForDeletion);
        this.collisions=this.collisions.filter(col=> !col.markedForDeletion);
        this.messages=this.messages.filter(msg=> !msg.markedForDeletion);
      

      }

      draw(ctx){
   // Dessin de l'arrière-plan avec effet de transition
   if (this.score < this.stateChangeScore) {
    this.background.draw(ctx);
} else if (this.score >= this.stateChangeScore && this.score < 3 * this.stateChangeScore) {
    if (this.isTransitioning) {
        ctx.globalAlpha = 1 - this.transitionAlpha;
        this.background.draw(ctx);
        ctx.globalAlpha = this.transitionAlpha;
        this.background2.draw(ctx);
    } else {
        this.background2.draw(ctx);
    }
} else if (this.score >= 3 * this.stateChangeScore) {
    if (this.isTransitioning) {
        ctx.globalAlpha = 1 - this.transitionAlpha;
        this.background2.draw(ctx);
        ctx.globalAlpha = this.transitionAlpha;
        this.background3.draw(ctx);
    } else {
        this.background3.draw(ctx);
    }
}

ctx.globalAlpha = 1; // Réinitialiser l'alpha par défaut

       
        //Draw enemy
        this.player.draw(ctx);
        this.enemies.forEach(enemy=>{
          enemy.draw(ctx);
        })
        //Draw particles
        this.particles.forEach(particle=>{
          particle.draw(ctx);
        
        })
        //draw collision
        this.collisions.forEach(collision=>{
          collision.draw(ctx);
        
        })
        //draw msgs
        this.messages.forEach((message)=>{
          message.draw(ctx);
      
        })
        //draw state game
        this.UI.draw(ctx);
      }


    addEnemy(){
     
      timeDiplay++;
  
      if(this.speed> 0 && this.score<this.stateChangeScore) {
       
        if( (timeDiplay).toFixed(0)%3===0 ){
          this.enemies.push(new GtEnemy(this)); 
          this.enemies.push(new GroundEnemy(this));
        }else if((timeDiplay).toFixed(0)%5===0 ){
          this.enemies.push(new GtEnemy(this)); 
          this.enemies.push(new ZgEnemy(this));
        }
      }
      if(this.speed> 0 && this.score>=this.stateChangeScore && this.score<3*this.stateChangeScore )this.enemies.push(new FlyingEnemy(this));
      if(this.speed> 0 && (timeDiplay).toFixed(0)%3===0 && this.score>=this.stateChangeScore && this.score<3*this.stateChangeScore) this.enemies.push(new DodaEnemy(this));
      if(this.speed>0 && this.score>=3*this.stateChangeScore){this.enemies.push(new ClimbingEnemy(this));
                  this.enemies.push(new ElyanEnemy(this));

                  if((timeDiplay).toFixed(0)%3===0 ){
                    this.enemies.push(new HandEnemy(this));
                  }
                }
    
    }
    
    }
    let timeDiplay=0;
    let lastTime=0;
    const game=new Game(canvas.width,canvas.height);
    const backGameSound=(new BackSound(game));
    backGameSound.audio.play();

    function animate(timeStamp){
        const deltaTime=timeStamp-lastTime;
        lastTime=timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver){requestAnimationFrame(animate);}
    }
animate(0);
});