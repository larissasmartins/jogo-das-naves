// start game function

function start() {

    $("#startGame").hide();

    $("#bgGame").append("<div id='player' class='anima1'></div>");
    $("#bgGame").append("<div id='enemy1' class='anima2'></div>");
    $("#bgGame").append("<div id='enemy2'></div>");
    $("#bgGame").append("<div id='friend' class='anima3'></div>");
    $("#bgGame").append("<div id='scoreboard'></div>");
    $("#bgGame").append("<div id='energy'></div>");

    // main var on the game
    var startShot = true;
    var endGame = false;
    var score = 0;
    var saved = 0;
    var lost = 0;
    var actualEnergy = 3;    
    var game = {};
    var speedEnemy = 5;
    var positionY = parseInt(Math.random() * 334);
    var keyGame = {
    W: 87,
    S: 83,
    D: 68
    }

    game.pressed = [];

    var shottingSound = document.getElementById("shottingSound");
    var explosionSound = document.getElementById("explosionSound");
    var music = document.getElementById("music");
    var gameoverSound = document.getElementById("gameoverSound");
    var lostSound = document.getElementById("lostSound");
    var savedSound = document.getElementById("savedSound");

    // Music looping
    music.addEventListener("ended", function(){ music.currentTime = 0; music.play(); }, false);
    music.play();


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
    scoreboard();
    energy();

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

    shottingSound.play();    
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

    if (crash1.length > 0) { // player with enemy1
    
    enemy1X = parseInt($("#enemy1").css("left"));
    enemy1Y = parseInt($("#enemy1").css("top"));
    explosion1(enemy1X, enemy1Y);

    positionY = parseInt(Math.random() * 334);
    $("enemy1").css("left", 694);
    $("enemy1").css("top", positionY);

        }
    
    if (crash2.length > 0) { // player with enemy2

    actualEnergy --;
    enemy2X = parseInt($("#enemy2").css("left"));
    enemy2Y = parseInt($("#enemy2").css("top"));
    explosion2(enemy2X, enemy2Y);

    $("#enemy2").remove();

    repositionEnemy2();

        }

    if (crash3.length > 0) { // shot enemy1

        speedEnemy = speedEnemy + 0.2;
        score = score + 100;
        enemy1X = parseInt($("#enemy1").css("left"));
        enemy1Y = parseInt($("#enemy1").css("top"));
        explosion1(enemy1X, enemy1Y)

        explosion1(enemy1X, enemy1Y);
        $("shotting").css("left", 950);
    
        positionY = parseInt(Math.random() * 334);
        $("enemy1").css("left", 694);
        $("enemy1").css("top", positionY);
    
        }

    if (crash4.length > 0) { // shot enemy2
    
        score = score + 50;
        enemy2X = parseInt($("#enemy2").css("left"));
        enemy2Y = parseInt($("#enemy2").css("top"));
        $("#enemy2").remove();

        explosion2(enemy2X, enemy2Y);
        $("shotting").css("left", 950);
    
        repositionEnemy2();
    
        }

    if (crash5.length > 0) { // crash player with friend
        
        saved++;
        savedSound.play();
        repositionFriend();
        $("#amigo").remove();

        }

    if (crash6.length > 0) {
    
        lost++;
        friendX = parseInt($("#friend").css("left"));
        friendY = parseInt($("#friend").css("top"));
        explosion3(friendX, friendY);
        $("#friend").remove();

        repositionFriend();
    
        }
    
    }


    // explosion1 function 
    function explosion1(enemy1X,enemy1Y) {
        explosionSound.play();
        $("#bgGame").append("<div id='explosion1'></div");
        $("#explosion1").css("background-image", "url(images/explosao.png)");
        var boom = $("#explosion1");
        boom.css("top", enemy1Y);
        boom.css("left", enemy1X);
        boom.animate({width:200, opacity:0}, "slow");
        
        var explosionTime = window.setInterval(removeExplosion, 1000);
        
            function removeExplosion() {
                
                boom.remove();
                window.clearInterval(explosionTime);
                explosionTime = null;
                
            }
   

    }

    // explosion2 function
    function explosion2(enemy2X,enemy2Y) {
        explosionSound.play();
        $("#bgGame").append("<div id='explosion2'></div");
        $("#explosion2").css("background-image", "url(images/explosao.png)");
        var boom2 = $("#explosion2");
        boom2.css("top", enemy2Y);
        boom2.css("left", enemy2X);
        boom2.animate({width:200, opacity:0}, "slow");
        
        var explosionTime2 = window.setInterval(removeExplosion2, 1000);
        
            function removeExplosion2() {
                
                boom2.remove();
                window.clearInterval(explosionTime2);
                explosionTime2 = null;
                
            }
            

    }

    // reposition friend function
    function repositionFriend() {
    
    var friendTime = window.setInterval(reposition6, 6000);
        
        function reposition6() {
            window.clearInterval(friendTime);
            friendTime = null;

            if (endGame == false) {

            $("#bgGame").append("<div id ='friend' class = 'anima3'></div>")
            }
        }
    }

    // explosion3 function
    function explosion3(friendX,friendY) {
        lostSound.play();
        $("#bgGame").append("<div id='explosion3' class='anima4'></div");
        $("#explosion3").css("top", friendY);
        $("#explosion3").css("left", friendX);

        var explosionTime3 = window.setInterval(removeExplosion3, 1000);
        
            function removeExplosion3() {
                
                $("#explosion3").remove();
                window.clearInterval(explosionTime3);
                explosionTime3 = null;
                
            }
            

    }

    // scoreboard function
    function scoreboard() {
	
        $("#scoreboard").html("<h2> Pontos: " + score + " Salvos: " + saved + " Perdidos: " + lost + "</h2>");
        
    }
    
    // energy function
    function energy() {
	
		if (actualEnergy == 3) {
			
			$("#energy").css("background-image", "url(images/energia3.png)");
		}
	
		if (actualEnergy == 2) {
			
			$("#energy").css("background-image", "url(images/energia2.png)");
		}
	
		if (actualEnergy == 1) {
			
			$("#energy").css("background-image", "url(images/energia1.png)");
		}
	
		if (actualEnergy == 0) {
			
			$("#energy").css("background-image", "url(images/energia0.png)");

            gameOver()
			
		}
	
	}    
    

    // reposition enemy2 function
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

    // game over function
	function gameOver() {
        endGame = true;
        music.pause();
        gameoverSound.play();
        
        window.clearInterval(game.timer);
        game.timer = null;
        
        $("#player").remove();
        $("#enemy1").remove();
        $("#enemy2").remove();
        $("#friend").remove();
        
        $("#bgGame").append("<div id='endGame'></div>");
        
        $("#endGame").html("<h1> Game Over </h1><p>Sua pontuação foi: " + score + "</p>" + "<div id='restart' onClick=restartGame()><h3>Jogar Novamente</h3></div>");
        } 
    

} // the end function start