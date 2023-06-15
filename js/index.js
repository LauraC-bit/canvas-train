"use strict";

const main = () => {
  let canvasDom;
  let ctx;
  let countY = 0;
  let countX = 0;

  canvasDom = document.getElementById("canvas");
  canvasDom.width = window.innerWidth;
  canvasDom.height = window.innerHeight;

  ctx = canvasDom.getContext("2d");

  let circle = {
    color: "#E9A341",
    radius: 30,
    x: canvasDom.width / 2,
    y: 30,
  };

  let spaceBar = {
    color: "#E9A341",
    x: canvasDom.width / 2 - 200,
    y: canvasDom.height - 20,
    width: 450,
    height: 50,
  };

  function display() {
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    ctx.fillStyle = "#F8E8D1";
    ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
    ctx.fillStyle = circle.color;
    displayBar();
    displayCircle();
    displayText;
  }

  function displayText() {
    ctx.font = "bold 28px Verdana";
    ctx.fillStyle = "#D125E6";
    ctx.fillText(
      "Press SPACE for start the game",
      canvasDom.width / 2 - 200,
      canvasDom.height / 2
    );
  }

  function displayCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.stroke();
  }

  function displayBar() {
    ctx.fillStyle = spaceBar.color;
    ctx.fillRect(spaceBar.x, spaceBar.y, spaceBar.width, spaceBar.height);
    // ctx.strokeStyle = "#000000"; tentative de contour noir
    // ctx.stroke();
  }

  let ballDirection = {
    top: -1, //equivaut a --
    bottom: 1, //equivaut a ++ donc incrementer donc vers le bas puisque 0 est en haut;
    right: -1,
    left: 1,
  };
  let currentDirectionVertical = ballDirection.top;
  let currentDirectionHorizontal = ballDirection.right;

  const mooveCircle = () => {
    let requestID = window.requestAnimationFrame(mooveCircle);
    if (
      circle.x >= spaceBar.x &&
      circle.x <= spaceBar.x + spaceBar.width &&
      circle.y + circle.radius >= spaceBar.y
    ) {
      currentDirectionVertical = ballDirection.top;
    }
    if (circle.y >= canvasDom.height - circle.radius) {
      alert("Game over !");
      window.cancelAnimationFrame(requestID);
      document.location.reload();
    }
    if (circle.x >= canvasDom.width - circle.radius) {
      currentDirectionHorizontal = ballDirection.right;
    }
    if (circle.y <= 0 + circle.radius) {
      currentDirectionVertical = ballDirection.bottom;
    }
    if (circle.x <= 0 + circle.radius) {
      currentDirectionHorizontal = ballDirection.left;
    }
    countY = countY + 10 * currentDirectionVertical;
    countX = countX + 10 * currentDirectionHorizontal;
    circle.y = countY;
    circle.x = countX;
    display();
  };

  document.addEventListener("keydown", mooveSpaceBar);

  function mooveSpaceBar(e) {
    switch (e.key) {
      case "ArrowRight":
        if (spaceBar.x < canvasDom.width - spaceBar.width) {
          spaceBar.x = spaceBar.x + 30;
        }
        break;

      case "ArrowLeft":
        if (spaceBar.x > 0) {
          spaceBar.x = spaceBar.x - 30;
        }
        break;
    }
  }

  document.addEventListener("keypress", start);

  function start(e) {
    if (e.key === " ") {
      console.log("here");
      display();
      mooveCircle();
    }
  }
  display();
  displayText();
};

window.addEventListener("load", main);
