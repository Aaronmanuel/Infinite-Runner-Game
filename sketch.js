var drone,pathImg, droneImg
var path;
var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;
var circle, special
var circleG, specialG
var obstacle, obstacleImg
var gameOverImg

function preload(){
pathImg = loadImage("1.webp");
droneImg = loadImage("Drone.png");
circleImg = loadImage("bluecircle.png");
specialImg = loadImage("circle.png");
obstacleImg = loadImage("obstacle.png");
gameOverImg = loadImage("gameOver.png")
}

function setup() {
 createCanvas(600, 600)
path=createSprite(windowHeight, windowWidth);
path=createSprite(300, 150);
path.scale= 1.5;
path.addImage(pathImg);
path.velocityY = 4;

drone= createSprite(70,550,20,20);
drone.addImage(droneImg);
drone.scale= 0.2;

circleG = new Group();
specialG = new Group();
obstacleG= new Group();

}


function draw() {

        if(gameState===PLAY){
        background(0);
        drone.x = World.mouseX;
        
        edges= createEdgeSprites();
        drone.collide(edges);
        
        //code to reset the background
        if(path.y > 360 ){
          path.y = height/2;
        }
        
        createCircle();
        createSpecial();
        createObstacle();
        drawSprites();
      
          if (circleG.isTouching(drone)) {
            circleG.destroyEach();
            score=score+50;
          }
          else if (specialG.isTouching(drone)) {
            specialG.destroyEach();
            score=score+100;
            
          }else{
            if(obstacleG.isTouching(drone)) {
              gameState=END;
            gameOver=createSprite(300, 150);
            gameOver.addImage(gameOverImg);

              
               circleG.destroyEach();
               specialG.destroyEach();
               obstacleG.destroyEach();
              

              circleG.setVelocityYEach(0);
              specialG.setVelocityYEach(0);
              obstacleG.setVelocityYEach(0);
           
          }
        }
        
        drawSprites();
        textSize(20);
        fill(255);
        text("Score: " + score,10,30);
        }
      
      }
      
      function createCircle() {
        if (World.frameCount % 200 == 0) {
        var circle = createSprite(Math.round(random(50, 350),40, 500, 200));
        circle.addImage(circleImg);
        circle.scale=0.12;
        circle.velocityY = 3;
        circle.lifetime = 150;
        circleG.add(circle);
        }
      }
      
      function createSpecial() {
        if (World.frameCount % 320 == 0) {
        var special = createSprite(Math.round(random(50, 350),40, 10, 10));
        special.addImage(specialImg);
        special.scale=0.1;
        special.velocityY = 3;
        special.lifetime = 150;
        specialG.add(special);
      }
      }
      

      function createObstacle(){
        if (World.frameCount % 100 == 0) {
        var obstacle = createSprite(Math.round(random(50, 350),200, 10, 10));
        obstacle.addImage(obstacleImg);
        obstacle.scale=0.4;
        obstacle.velocityY = 3;
        obstacle.lifetime = 150;
        obstacleG.add(obstacle);
        }
      }