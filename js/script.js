// start game function

function start() {

    $("#startGame").hide();

    $("#bgGame").append("<div id='player' class='anima1'></div>");
    $("#bgGame").append("<div id='enemy1' class='anima2'></div>");
    $("#bgGame").append("<div id='enemy2'></div>");
    $("#bgGame").append("<div id='friend' class='anima3'></div>");

    // main var on the game
    var game = {};
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
    if (game.pressed[KEY.D]) {
        

    }
        
    }

} // fim da function start