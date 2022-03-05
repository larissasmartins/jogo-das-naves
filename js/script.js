// start game function

function start() {

    $("#startGame").hide();

    $("#bgGame").append("<div id='player' class='anima1'></div>");
    $("#bgGame").append("<div id='enemy1' class='anima2'></div>");
    $("#bgGame").append("<div id='enemy2'></div>");
    $("#bgGame").append("<div id='friend' class='anima3'></div>");

    // main var on the game
    var game = {};
    var speedEnemy = 5;
    var positionY = parseInt(Math.random() * 334);
    var keyGame = {
    W: 87,
    S: 83,
    D: 68
    }

    game.pressed = [];

    // to verify if the user pressed any key
    $(document).keydown(function(e) {
    game.pressed[e.which] = true;
    });

    $(document).keyup(function(e) {
    game.pressed[e.which] = false;
    });


    // game looping
    game.timer = setInterval(loop, 30);

    function loop() {

    movebg();
    moveplayer();
    moveenemy1();
    moveenemy2();
    movefriend();

    } 
    

    // background animation moviment
    function movebg() {

        left = parseInt($("#bgGame").css("background-position"));
        $("#bgGame").css("background-position", left-1);
    }


    // player animation moviment
    function moveplayer() {
    
    if (game.pressed[keyGame.W]) {
        var TOP = parseInt($("#player").css("top"));
        $("#player").css("top", TOP-10);

            if (TOP <= 0) {
            $("#player").css("top", TOP+10);
            }
    }

    if (game.pressed[keyGame.S]) {
        var TOP = parseInt($("#player").css("top"));
        $("#player").css("top", TOP+10);

            if (TOP >= 434) {
            $("#player").css("top", TOP-10);
            }
    }

    // shotting function
    if (game.pressed[keyGame.D]) {
        

    }
        
    }

    // move enemy1 function
    function moveenemy1() {
    
    positionX = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", positionX-speedEnemy);
    $("#enemy1").css("top", positionY);

        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", positionY);
        }

    }

    // move enemy2 function
    function moveenemy2() {

    positionX = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", positionX-3);

        if (positionX <= 0) {
            $("#enemy2").css("left", 775);
        }
    }

    // move friend function
    function movefriend() {

    positionX = parseInt($("#friend").css("left"));
    $("#friend").css("left", positionX+1);

        if (positionX > 906) {
            $("#friend").css("left", 0);
        }
    }

} // fim da function start