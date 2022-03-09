// start game function

function start() {

    $("#startGame").hide();

    $("#bgGame").append("<div id='player' class='anima1'></div>");
    $("#bgGame").append("<div id='enemy1' class='anima2'></div>");
    $("#bgGame").append("<div id='enemy2'></div>");
    $("#bgGame").append("<div id='friend' class='anima3'></div>");

    // main var on the game
    var startShot = true;
    var endGame = false;
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
    crash();

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

    // call shotting function
    if (game.pressed[keyGame.D]) {
        
        shotting();

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

    // start shotting function 
    function shotting() {
    
    if (startShot == true) {

    startShot = false;

    TOP = parseInt($("#player").css("top"))
    positionX = parseInt($("#player").css("left"))
    shotX = positionX + 140;
    topShot = TOP + 40;
    $("#bgGame").append("<div id='shotting'></div>");
    $("#shotting").css("top", topShot);
    $("#shotting").css("left", shotX);

    var shottingTime = window.setInterval(shottingActive, 30);

    }

        // shotting time on the display function
        function shottingActive() {
        positionX = parseInt($("#shotting").css("left"));
        $("#shotting").css("left", positionX + 15);

            if (positionX > 900) {

            window.clearInterval(shottingTime);
            shottingTime = null;
            $("#shotting").remove();
            startShot = true;
            }
        }

    }

    // collision functions 
    function crash() {
    var crash1 = ($("#player").collision($("#enemy1")));
    var crash2 = ($("#player").collision($("#enemy2")));
    var crash3 = ($("#shotting").collision($("#enemy1")));
    var crash4 = ($("#shotting").collision($("#enemy2")));
    var crash5 = ($("#player").collision($("#friend")));
    var crash6 = ($("#enemy2").collision($("#friend")));

    if (crash1.length > 0) {
    
    enemy1X = parseInt($("#enemy1").css("left"));
    enemy1Y = parseInt($("#enemy1").css("top"));
    explotion1(enemy1X, enemy1Y);

    positionY = parseInt(Math.random() * 334);
    $("enemy1").css("left", 694);
    $("enemy1").css("top", positionY);

        }
    
    if (crash2.length > 0) {
    
    enemy2X = parseInt($("#enemy2").css("left"));
    enemy2Y = parseInt($("#enemy2").css("top"));
    explotion2(enemy2X, enemy2Y);

    $("#enemy2").remove();

    repositionEnemy2();

    }

    // explotion1 function
    function explotion1(enemy1X,enemy1Y) {
        $("#bgGame").append("<div id='explotion1'></div");
        $("#explotion1").css("background-image", "url(images/explosao.png)");
        var boom = $("#explotion1");
        boom.css("top", enemy1Y);
        boom.css("left", enemy1X);
        boom.animate({width:200, opacity:0}, "slow");
        
        var explotionTime = window.setInterval(removeExplotion, 1000);
        
            function removeExplotion() {
                
                boom.remove();
                window.clearInterval(explotionTime);
                explotionTime = null;
                
            }
            
        }

    }

    // explotion2 function
    function explotion2(enemy2X,enemy2Y) {
        $("#bgGame").append("<div id='explotion2'></div");
        $("#explotion2").css("background-image", "url(images/explosao.png)");
        var boom2 = $("#explotion2");
        boom2.css("top", enemy2Y);
        boom2.css("left", enemy2X);
        boom2.animate({width:200, opacity:0}, "slow");
        
        var explotionTime2 = window.setInterval(removeExplotion2, 1000);
        
            function removeExplotion2() {
                
                boom2.remove();
                window.clearInterval(explotionTime2);
                explotionTime2 = null;
                
            }
            
        }

    }

    // resposition enemy2 function
    function repositionEnemy2() {

    var collisionTime4 = window.setInterval(resposition4, 5000);

        function resposition4() {
        window.clearInterval(collisionTime4);
        collisionTime4 = null;

            if (endGame == false) {
            
            $("#bgGame").append("<div id = enemy2></div>");

            }

        }

    }

} // the end function start