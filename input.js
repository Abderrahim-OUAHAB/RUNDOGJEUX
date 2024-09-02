export default class InputHandler{
    constructor(game){
        this.keys=[];
        this.game=game;
            window.addEventListener("keydown",event=>{
                if((event.key==='ArrowDown' || 
                    event.key==='ArrowUp' || 
                    event.key==='ArrowLeft' || 
                    event.key==='ArrowRight' ||
                    event.key==='Enter'  ) &&
                    this.keys.indexOf(event.key)===-1){
                        this.keys.push(event.key);
                    }else if(event.key==='d') this.game.debug=!this.game.debug;
                 
            });
            window.addEventListener("keyup",event=>{
                if((event.key==='ArrowDown' || 
                    event.key==='ArrowUp' || 
                    event.key==='ArrowLeft' || 
                    event.key==='ArrowRight'||
                    event.key==='Enter' )){
                        this.keys.splice(this.keys.indexOf(event.key),1);
                    }
          
            });


      
}

}