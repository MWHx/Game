var chessBorder =[];
var me = true;


//赢法
var wins = [];

for (var i = 0; i<15; i++){
    chessBorder[i] = [];
    for (var j = 0; j<15; j++) {
        chessBorder[i][j] = 0;
    }
}
for (var i = 0; i<15; i++){
    wins[i] = [];
    for (var j = 0; j<15; j++) {
        wins[i][j] = [];
    }
}
var count = 0;
for (var i = 0; i<15; i++){
    wins[i] = [];
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; j++) {
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

var logo = new Image();
logo.src = "img/logo.png";
logo.onload  = function (ev) {
    context.drawImage(logo,0,0,450,450);
    drawChessBoard();
};

var  drawChessBoard =function () {
    for (var i = 0; i < 15;i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,435);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(435,15+i*30);
        context.stroke();
    }
};

var oneStep = function (i,j,me) {
    context.beginPath();
    context.arc(15 + i * 30 , 15 + j * 30  , 13 , 0 , 2 * Math.PI);
    context.closePath();
    var gradient =  context.createRadialGradient(15 + i * 30 + 2 ,15 + j * 30 -2 ,13,5 + i * 30 +2 ,15 + j * 30 -2 ,0);
    if (me){
        gradient.addColorStop(0,"#0A0A0A");
        gradient.addColorStop(1,"#636766");
    }else {
        gradient.addColorStop(0,"#D1D1D1");
        gradient.addColorStop(1,"#F9F9F9");
    }

    context.fillStyle = gradient;
    context.fill();
};

chess.onclick = function (ev) {
    var x =ev.offsetX;
    var y =ev.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessBorder[i][j] === 0){
        oneStep(i, j, me);
        if (me){
            chessBorder[i][j]=1;
        }else{
            chessBorder[i][j]=2;
        }
        me = !me;
    }
};
