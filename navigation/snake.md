---
layout: base
title: Snake 2.0
permalink: /snake/
---

<style>

    body{
    }
    .wrap{
        margin-left: auto;
        margin-right: auto;
    }
    button{
        border-style: solid;
        border-width: 4px;
        border-color: rgb(0, 0, 0);
        background-color: rgb(50, 50, 50);
        color: rgb(255, 255, 255);
        padding: 10px 21px;
        font-size: 15px;
        text-align: center;
    }
    canvas{
        display: none;
        border-style: solid;
        border-width: 10px;
        border-color:rgb(255, 0, 0);
        box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.8);
    }
    canvas:focus{
        outline: none;
    }

    /* All screens style */
    #gameover p, #setting p, #menu p{
        font-size: 20px;
        
    }

    #gameover a, #setting a, #menu a{
        font-size: 30px;
        display: block;
    }

    #gameover a:hover, #setting a:hover, #menu a:hover{
        cursor: pointer;
    }

    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{
        content: ">";
        margin-right: 10px;
    }

    #menu{
        display: block;
    }

    #gameover{
        display: none;
    }

    #setting{
        display: none;
    }

    #setting input{
        display:none;
    }

    #setting label{
        cursor: pointer;
    }

    #setting input:checked + label{
        background-color: #FF0000;
        color:rgb(0, 0, 0);
    }
</style>


<h2><span font-size="36pt">Snake</span></h2>
<div class="container">
    <header class="pb-3 mb-4 border-bottom border-primary text-dark">
        <p class="fs-4">Score: <span id="score_value">0</span></p>
    </header>
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Snake "2.0" <br>Press <span style="background-color:rgb(0, 0, 0); color:rgb(214, 20, 15)">Space</span></p>
            <a id="new_game" class="link-alert">new game</a>
            <a id="setting_menu" class="link-alert">settings</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Sucks to Suck! Restart with <span style="background-color:rgb(0, 0, 0); color: rgb(214, 20, 15)">Space</span></p>
            <a id="new_game1" class="link-alert">We Go Again!</a>
            <a id="setting_menu1" class="link-alert">Difficulty Select/Settings</a>
        </div>
        <!-- Play Screen -->
        <canvas id="snake" class="wrap" width="720" height="720" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings <br><span style="background-color:rgb(0, 0, 0); color: rgb(214, 20, 15)">Click Start to Return</span>
            <a id="new_game2" class="link-alert">Start</a>
            <br>
            <h1><span style="color: rgb(214,20,15)" font-size="80.0pt">Difficulty Select</span></h1><br>
            <p> <input id="speed1" type="radio" name="speed" value="120" checked/>
                <label for="speed1">Baby Mode</label><br>
                <input id="speed2" type="radio" name="speed" value="100" checked/>
                <label for="speed2">Slightly Less Boring Mode</label><br>
                <input id="speed3" type="radio" name="speed" value="85" checked/>
                <label for="speed3">Training Wheels</label><br>
                <input id="speed4" type="radio" name="speed" value="70"/>
                <label for="speed4">As God Intended</label><br>
                <input id="speed5" type="radio" name="speed" value="35"/>
                <label for="speed5">NOW THIS! THIS IS REAL FIREPOWER!</label><br>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked/>
                <label for="wallon">On</label><br>
                <input id="walloff" type="radio" name="wall" value="1"/>
                <label for="walloff">The Illusion of Choice</label>
            </p>
            <p>Select Background Color:
            <div id="color-selector">
            <button data-color="red">Red</button>
            <button data-color="royalblue">Original Blue</button>
            <button data-color="green">Green</button>
            <button data-color="gold">Gold</button>
            <button data-color="purple">Purple</button>
            <button data-color="black">Black</button>
            <button data-color="white">White</button>
            </div>
            </p>
            <p>Select Snake Color:
            <div id="snake-color-selector">
            <button class="snake-button" data-color-snake="#FFFFFF">White</button>
            <button class="snake-button" data-color-snake="#000000">Black</button>
            <button class="snake-button" data-color-snake="#808080">Gray</button>
            <button class="snake-button" data-color-snake="#00FFFF">Blue</button>
            <button class="snake-button" data-color-snake="#FFD700">Gold</button>
            </div>
            </p>
<script>
    // Variable to store the selected color
    let selectedColorBG = "gray";
    // Add event listeners to all buttons
    document.getElementById("color-selector").addEventListener("click", function(event) {
        // Check if a button was clicked
        if (event.target.tagName === "BUTTON") {
            // Retrieve the data-color attribute
            selectedColorBG = event.target.getAttribute("data-color");
            // Confirm selection (for testing purposes)
            console.log("Selected BG color:", selectedColorBG);
            // Example: Use the color later
        }
    });
</script>
<script>
    // Variable to store the selected color
    let selectedColorSnake = "#FFFFFF";
    // Add event listeners to all buttons with the class "snake-button"
    const snakeButtons = document.getElementsByClassName("snake-button");
    for (let button of snakeButtons) {
        button.addEventListener("click", function(event) {
            // Retrieve the data-color-snake attribute
            selectedColorSnake = event.target.getAttribute("data-color-snake");
            // Confirm selection (for testing purposes)
            console.log("Selected Snake color:", selectedColorSnake);
        });
    }
</script>

<script>
    (function(){
        /* Attributes of Game */
        /////////////////////////////////////////////////////////////
        // Canvas & Context
        const canvas = document.getElementById("snake");
        const ctx = canvas.getContext("2d");
        // HTML Game IDs
        const SCREEN_SNAKE = 0;
        const screen_snake = document.getElementById("snake");
        const ele_score = document.getElementById("score_value");
        const speed_setting = document.getElementsByName("speed");
        const wall_setting = document.getElementsByName("wall");
        // HTML Screen IDs (div)
        const SCREEN_MENU = -1, SCREEN_GAME_OVER=1, SCREEN_SETTING=2;
        const screen_menu = document.getElementById("menu");
        const screen_game_over = document.getElementById("gameover");
        const screen_setting = document.getElementById("setting");
        // HTML Event IDs (a tags)
        const button_new_game = document.getElementById("new_game");
        const button_new_game1 = document.getElementById("new_game1");
        const button_new_game2 = document.getElementById("new_game2");
        const button_setting_menu = document.getElementById("setting_menu");
        const button_setting_menu1 = document.getElementById("setting_menu1");
        const bgMusic = new Audio();
        bgMusic.src = "assets/bg.mp3";
        bgMusic.loop = true;
        // Game Control
        const BLOCK = 20;   // size of block rendering
        let SCREEN = SCREEN_MENU;
        let snake;
        let snake_dir;
        let snake_next_dir;
        let snake_speed;
        let food = {x: 0, y: 0};
        let score;
        let wall;
        /* Display Control */
        /////////////////////////////////////////////////////////////
        // 0 for the game
        // 1 for the main menu
        // 2 for the settings screen
        // 3 for the game over screen
        let showScreen = function(screen_opt){
            SCREEN = screen_opt;
            switch(screen_opt){
                case SCREEN_SNAKE:
                    screen_snake.style.display = "block";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "none";
                    screen_game_over.style.display = "none";
                    break;
                case SCREEN_GAME_OVER:
                    screen_snake.style.display = "block";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "none";
                    screen_game_over.style.display = "block";
                    break;
                case SCREEN_SETTING:
                    screen_snake.style.display = "none";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "block";
                    screen_game_over.style.display = "none";
                    break;
            }
        }
        // Select the audio element
        let backgroundMusic = document.getElementById("backgroundMusic");

        // Function to play the music
        let playBackgroundMusic = function() {
        backgroundMusic.play();
        }

        // Function to stop the music
        let stopBackgroundMusic = function() {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0; // Reset to the start
        }

        /* Actions and Events  */
        /////////////////////////////////////////////////////////////
        document.addEventListener("keydown", function(event) {
        // Disable the default action for arrow keys
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.key)) {
        event.preventDefault();
            }
        });
        window.onload = function(){
            // HTML Events to Functions
            button_new_game.onclick = function(){newGame();};
            button_new_game1.onclick = function(){newGame();};
            button_new_game2.onclick = function(){newGame();};
            button_setting_menu.onclick = function(){showScreen(SCREEN_SETTING);};
            button_setting_menu1.onclick = function(){showScreen(SCREEN_SETTING);};
            // speed
            setSnakeSpeed(150);
            for(let i = 0; i < speed_setting.length; i++){
                speed_setting[i].addEventListener("click", function(){
                    for(let i = 0; i < speed_setting.length; i++){
                        if(speed_setting[i].checked){
                            setSnakeSpeed(speed_setting[i].value);
                        }
                    }
                });
            }
            // wall setting
            setWall(1);
            for(let i = 0; i < wall_setting.length; i++){
                wall_setting[i].addEventListener("click", function(){
                    for(let i = 0; i < wall_setting.length; i++){
                        if(wall_setting[i].checked){
                            setWall(wall_setting[i].value);
                        }
                    }
                });
            }
            // activate window events
            window.addEventListener("keydown", function(evt) {
                // spacebar detected
                if(evt.code === "Space" && SCREEN !== SCREEN_SNAKE)
                    newGame();
            }, true);
        }
        /* Snake is on the Go (Driver Function)  */
        /////////////////////////////////////////////////////////////
        let mainLoop = function(){
            let _x = snake[0].x;
            let _y = snake[0].y;
            snake_dir = snake_next_dir;   // read async event key
            // Direction 0 - Up, 1 - Right, 2 - Down, 3 - Left
            switch(snake_dir){
                case 0: _y--; break;
                case 1: _x++; break;
                case 2: _y++; break;
                case 3: _x--; break;
            }
            snake.pop(); // tail is removed
            snake.unshift({x: _x, y: _y}); // head is new in new position/orientation
            // Wall Checker
            if(wall === 1){
                // Wall on, Game over test
                if (snake[0].x < 0 || snake[0].x === canvas.width / BLOCK || snake[0].y < 0 || snake[0].y === canvas.height / BLOCK){
                    showScreen(SCREEN_GAME_OVER);
                    stopBackgroundMusic();
                    return;
                }
            }else{
                // Wall Off, Circle around
                for(let i = 0, x = snake.length; i < x; i++){
                    if(snake[i].x < 0){
                        snake[i].x = snake[i].x + (canvas.width / BLOCK);
                    }
                    if(snake[i].x === canvas.width / BLOCK){
                        snake[i].x = snake[i].x - (canvas.width / BLOCK);
                    }
                    if(snake[i].y < 0){
                        snake[i].y = snake[i].y + (canvas.height / BLOCK);
                    }
                    if(snake[i].y === canvas.height / BLOCK){
                        snake[i].y = snake[i].y - (canvas.height / BLOCK);
                    }
                }
            }
            // Snake vs Snake checker
            for(let i = 1; i < snake.length; i++){
                // Game over test
                if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                    showScreen(SCREEN_GAME_OVER);
                    return;
                }
            }
            // Snake eats food checker
            if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)){
                snake[snake.length] = {x: snake[0].x, y: snake[0].y};
                altScore(++score);
                addFood();
                activeDot(food.x, food.y);
            }
            // Repaint canvas
            ctx.beginPath();
            ctx.fillStyle = selectedColorBG;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Paint snake
            for(let i = 0; i < snake.length; i++){
                activeDot(snake[i].x, snake[i].y);
            }
            
            // Paint food
            activeDot(food.x, food.y);
            // Debug
            //document.getElementById("debug").innerHTML = snake_dir + " " + snake_next_dir + " " + snake[0].x + " " + snake[0].y;
            // Recursive call after speed delay, déjà vu
            setTimeout(mainLoop, snake_speed);
        }
        /* New Game setup */
        /////////////////////////////////////////////////////////////
        let newGame = function(){
            // snake game screen
            showScreen(SCREEN_SNAKE);
            screen_snake.focus();
            // game score to zero
            score = 0;
            altScore(score);
            // initial snake
            snake = [];
            snake.push({x: 0, y: 15});
            snake_next_dir = 1;
            // food on canvas
            addFood();
            // activate canvas event
            canvas.onkeydown = function(evt) {
                changeDir(evt.keyCode);
            }
            mainLoop();
            bgMusic.play();
        }
        /* Key Inputs and Actions */
        /////////////////////////////////////////////////////////////
        let changeDir = function(key){
            // test key and switch direction
            switch(key) {
                case 37:    // left arrow
                    if (snake_dir !== 1)    // not right
                        snake_next_dir = 3; // then switch left
                    break;
                case 38:    // up arrow
                    if (snake_dir !== 2)    // not down
                        snake_next_dir = 0; // then switch up
                    break;
                case 39:    // right arrow
                    if (snake_dir !== 3)    // not left
                        snake_next_dir = 1; // then switch right
                    break;
                case 40:    // down arrow
                    if (snake_dir !== 0)    // not up
                        snake_next_dir = 2; // then switch down
                    break;
            }
        }
        /* Dot for Food or Snake part */
        /////////////////////////////////////////////////////////////
        let activeDot = function(x, y){
            ctx.fillStyle = selectedColorSnake;
            ctx.shadowBlur = 15;
            ctx.shadowColor = selectedColorSnake;
            ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
        }
        /* Random food placement */
        /////////////////////////////////////////////////////////////
        let addFood = function(){
            food.x = Math.floor(Math.random() * ((canvas.width / BLOCK) - 1));
            food.y = Math.floor(Math.random() * ((canvas.height / BLOCK) - 1));
            for(let i = 0; i < snake.length; i++){
                if(checkBlock(food.x, food.y, snake[i].x, snake[i].y)){
                    addFood();
                }
            }
        }
        /* Collision Detection */
        /////////////////////////////////////////////////////////////
        let checkBlock = function(x, y, _x, _y){
            return (x === _x && y === _y);
        }
        /* Update Score */
        /////////////////////////////////////////////////////////////
        let altScore = function(score_val){
            ele_score.innerHTML = String(score_val);
        }
        /////////////////////////////////////////////////////////////
        // Change the snake speed...
        // 150 = slow
        // 100 = normal
        // 50 = fast
        let setSnakeSpeed = function(speed_value){
            snake_speed = speed_value;
        }
        /////////////////////////////////////////////////////////////
        let setWall = function(wall_value){
            wall = wall_value;
            if(wall === 0){screen_snake.style.borderColor = "#606060";}
            if(wall === 1){screen_snake.style.borderColor = selectedSnakeColor;}
        }
    })();
</script>