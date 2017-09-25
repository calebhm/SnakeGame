/*jslint browser: true*/
/*global $, jQuery*/
/*jslint plusplus: true */

$(document).ready(function () {
    
    var canvas = document.getElementById("myCanvas"),
        ctx = canvas.getContext("2d"),
				score = document.getElementById("score"),
        newSnakeX = 0,
        newSnakeY = 0,
        speedX = 0,
        speedY = 0,
        timingInterval = 200,
        foodX = 60,
        foodY = 60,
        snakeLength = [{x: 0, y: 0}];
    
    function drawSnake() {
        for (i = snakeLength.length - 1; i >= 0; i--) {
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(snakeLength[i].x, snakeLength[i].y, 20, 20);
            ctx.strokeStyle = "black";
            ctx.strokeRect(snakeLength[i].x, snakeLength[i].y, 20, 20);
            ctx.closePath();
            
            if (snakeLength.length > 624) {
                alert("YOU WON! :) SCORE: " + snakeLength.length-1);
                document.location.reload();
            }
            
            if (i !== snakeLength.length - 1) {
                snakeLength[i + 1].x = snakeLength[i].x;
                snakeLength[i + 1].y = snakeLength[i].y;
            }
        
            if (snakeLength[i].x + speedX < canvas.width && snakeLength[i].x + speedX >= 0) {
                snakeLength[i].x += speedX;
            } else if (snakeLength[0].x + speedX > canvas.width - 20 || snakeLength[0].x + speedX < 0) {
                window.location.reload();
            }
            
            if (snakeLength[i].y + speedY < canvas.height && snakeLength[i].y + speedY >= 0) {
                snakeLength[i].y += speedY;
            } else if (snakeLength[0].y + speedY > canvas.height - 20 || snakeLength[0].y + speedY < 0) {
                window.location.reload();
            }
            // console.log(i + " " + snakeLength[i].x + " " + snakeLength[i].y); // FOR TESTING // ***************
        }
    }
    
    function drawFood() {
        ctx.beginPath();
        ctx.fillStyle = "#2299DD";
        ctx.fillRect(foodX, foodY, 20, 20);
        ctx.strokeStyle = "black";
        ctx.strokeRect(foodX, foodY, 20, 20);
        ctx.closePath();
    }
  
    function eatFood() {
        if (snakeLength[0].x === foodX && snakeLength[0].y === foodY) {
            
            snakeLength.push({x: snakeLength[0].x, y: snakeLength[0].y});
            
            foodX = 501;
            foodY = 501;
        }
        
        while (foodX % 20 !== 0 || foodY % 20 !== 0) {
            foodX = Math.floor(Math.random() * 380);
            foodY = Math.floor(Math.random() * 380);
            for (j = snakeLength.length - 1; j >= 0; j--) {
                while (foodX === snakeLength[j].x && foodY === snakeLength[j].y) {
                    foodX = Math.floor(Math.random() * 380);
                    foodY = Math.floor(Math.random() * 380);
                }
            }
        }
			
			if (snakeLength.length){
					score.textContent = snakeLength.length-1;
			}
			
    }
    
    function collisionTest() {
        for (k = snakeLength.length - 1; k >= 1; k--) {
            if (snakeLength[0].x === snakeLength[k].x &&
                    snakeLength[0].y === snakeLength[k].y) {
                window.location.reload();
            }
        }
    }
    
    function keyDownHandler(e) {
        if (e.keyCode === 39) {
            if (snakeLength.length > 1) {
                if (snakeLength[0].x + 20 !== snakeLength[1].x) {
                    speedX = 20;
                    speedY = 0;
                }
            } else {
                speedX = 20;
                speedY = 0;
            }
        } else if (e.keyCode === 37) {
            if (snakeLength.length > 1) {
                if (snakeLength[0].x - 20 !== snakeLength[1].x) {
                    speedX = -20;
                    speedY = 0;
                }
            } else {
                speedX = -20;
                speedY = 0;
            }
        } else if (e.keyCode === 38) {
            if (snakeLength.length > 1) {
                if (snakeLength[0].y - 20 !== snakeLength[1].y) {
                    speedY = -20;
                    speedX = 0;
                }
            } else {
                speedY = -20;
                speedX = 0;
            }
        } else if (e.keyCode === 40) {
            if (snakeLength.length > 1) {
                if (snakeLength[0].y + 20 !== snakeLength[1].y) {
                    speedY = 20;
                    speedX = 0;
                }
            } else {
                speedY = 20;
                speedX = 0;
            }
        } else if (e.keyCode === 90) {
            snakeLength.push({x: snakeLength[0].x, y: snakeLength[0].y}); // FOR TESTING // **************
        }
    }
    
    document.addEventListener("keydown", keyDownHandler);
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawFood();
        eatFood();
        drawSnake();
        collisionTest();
    }
    
    setInterval(draw, timingInterval);
});