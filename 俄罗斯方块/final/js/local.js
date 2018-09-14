var Local = function () {
    /*游戏对象*/
    var game;
    //时间间隔

    var INTERVAL=500;


    var bnt = document.getElementById("bnt");
    bnt.onclick =function () {
        var sd = document.getElementById("sd").value;
        console.log("asd");
        INTERVAL = sd;
        console.log(INTERVAL);
        return INTERVAL;
    };


    // 定时器
    var timer = null;
    //时间计数器
    var timeCount = 0;
    //时间
    var time = 0;
    var bindKeyEvent =function(){
      document.onkeydown = function (ev) {
          if (ev.keyCode === 38){  //top
              game.rotate();
          }else if (ev.keyCode === 39){   //right
              game.right();
          }else if (ev.keyCode === 40){
               game.down();
          }else if (ev.keyCode === 37){    //left
                game.left();
          }else if (ev.keyCode === 32){  //空格
              game.fall();
          }

      }
    };
    //移动
    var move =function () {
        // timeFunc();
        if (!game.down()){
            game.fixed();
           var line =  game.checkClear();
           if (line){
               game.addScore(line);
           }
           var gameOver= game.checkGameOver();
           if (gameOver){
               game.gameover(false);
               stop();
           }else {
               game.performNext(generateType(), generateDir());
           }
        }
    };
    //随机生成一个方块
    var generateType = function () {
        return Math.ceil(Math.random()*7)-1;
    };
    //随机生成一个方块的旋转次数
    var generateDir = function () {
        return Math.ceil(Math.random()*4)-1;
    };
    //开始
    var start =function () {
        var doms = {
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next'),
            timeDiv:document.getElementById('time'),
            scoreDiv:document.getElementById('score'),
            resultDiv:document.getElementById('gameOver')
        };
        game = new Game();
        game.init(doms,generateType(),generateDir());
        bindKeyEvent();
        game.performNext(generateType(),generateDir());
        timer = setInterval(move, INTERVAL);
    };
    //结束
    var stop= function () {
      if(timer){
          clearInterval(timer);
          timer =null;
      }
      document.onkeydown =null;
    };
    //导出API
    this.start =start;

};
