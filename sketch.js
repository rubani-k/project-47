

var road1, road2, road3, road4, road5, road6, roadGroup, roadImg;
var player, playerImg, player2Img;
var finishLine;
var pavementImg, treeImg, car1Img, truckImg, car2Img, motorcycleImg, treeImg;
var treeGroup, motorcycleGroup, carGroup, truckGroup;
var gameState = "START";
var restart,restartImg, winner, winnerImg;

function preload(){
 roadImg = loadImage("./images/road.png");
 playerImg = loadAnimation("./images/player1.png", "./images/player2.png");
 pavementImg = loadImage("./images/paving.jpg");
 treeImg = loadImage("./images/tree.png");
 car1Img = loadImage("./images/car1.png");
 car2Img = loadImage("./images/car2.png");
 truckImg = loadImage("./images/truck.png");
 motorcycleImg = loadImage("./images/motorbike1.png");
 restartImg = loadImage("./images/restart.png");
 winnerImg = loadImage("./images/youwin.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  road1 = createSprite(windowWidth,325,600,100);
  road1.addImage(roadImg);
  road1.scale = 2;
  //road1.velocityX = 10;

  road2 = createSprite(windowWidth, 625, 600,100);
  road2.addImage(roadImg);
  road2.scale = 2;
  //road2.velocityX = 10;

  road3 = createSprite(windowWidth ,925 , 600, 100);
  road3.addImage(roadImg);
  road3.scale = 2;
  //road3.velocityX = 10;

  player = createSprite(windowWidth/2, windowHeight - 30, 100, 50);
  player.addAnimation ("walking", playerImg);
  player.scale = 0.2;
  
  finishLine = createSprite(windowWidth/2,25, windowWidth, 15);
  finishLine.shapeColor = color(255, 255, 0);

  treeGroup = new Group();
  motorcycleGroup = new Group();
  carGroup = new Group();
  truckGroup = new Group();

  restart = createSprite(windowWidth/2, 350);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  //restart.depth = player.depth + 1;

  winner = createSprite(windowWidth/2 + 20, 600);
  winner.addImage(winnerImg);
  winner.scale = 1;
  //winner.depth = restart.depth + 5;
  
  
  createPaving(300);
  createPaving(600);
}


function draw(){
 background("white");

 if(gameState === "START")
 {
   road1.velocityX = 0;
   road2.velocityX = 0;
   road3.velocityX = 0;
   console.log("start"+gameState)
   restart.visible = false;
   winner.visible = false;
 }
 if(keyDown("space"))
 {
   gameState = "PLAY";
   console.log(gameState);
 }

 if(gameState === "PLAY")
  {  
    winner.visible = false;
    restart.visible = false; 
    road1.velocityX = 10;
    road2.velocityX = 10;
    road3.velocityX = 10;

    if(keyDown(RIGHT_ARROW))
    {
     player.x += 5;
    }

    if(keyDown(LEFT_ARROW))
    {
      player.x -= 5;
    }

   if(keyDown(UP_ARROW))
    {
     player.y -= 5;
    }

    if(keyDown(DOWN_ARROW))
    {
       player.y += 5;
     }

    if(road1.x > 1600 )
     {
      road1.x = windowWidth /3;
       console.log("l")
     }

      if(road2.x > 1600)
      {
       road2.x = width /2;
     }

    if(road3.x > 1500)
    {
     road3.x = width /2;
    }

    spawnTrees();
    spawnMotorcycles();
    spawnCars();
    spawnTrucks();
    collided();
    //console.log(windowWidth)
    //console.log(road1.width)
    //console.log(pavementImg.width)
    //console.log(roadImg.height)
    }

    if(gameState === "END")
    {
      restart.visible = true;
      winner.visible = false;
      road1.velocityX = 0;
      road2.velocityX = 0;
      road3.velocityX = 0;

      

      carGroup.destroyEach();
      treeGroup.destroyEach();
      motorcycleGroup.destroyEach();
      truckGroup.destroyEach();

      player.y = windowHeight - 30;
      player.x = windowWidth/2 ;
    }

    if(finishLine.isTouching(player))
    {
      restart.visible = true;
      winner.visible = true;
      road1.velocityX = 0;
      road2.velocityX = 0;
      road3.velocityX = 0;

      

      carGroup.destroyEach();
      treeGroup.destroyEach();
      motorcycleGroup.destroyEach();
      truckGroup.destroyEach();

      player.y = windowHeight - 30;
      player.x = windowWidth/2 ;
    }

    if(mousePressedOver(restart)) {
      reset();
    }


  

  drawSprites()
}

function createPaving(y)
{
  for(i = 0; i<11; i++)
  {
    var pavement = createSprite(165 *i, y, 50, 25)
    pavement.addImage(pavementImg);
  pavement.scale = 1.4;
  }
  player.depth = pavement.depth + 1;
  restart.depth = pavement.depth + 1;
  winner.depth = pavement.depth + 1;
}

function spawnTrees()
{
  if(frameCount % 50 === 0)
  {
    var tree = createSprite(100,300);
    tree.x = Math.round(random(20, windowWidth));
    tree.addImage(treeImg);
    tree.scale = 0.2;
    tree.lifetime = 100;
    treeGroup.add(tree);
  
  }

  if(frameCount % 70 === 0)
  {
    var tree = createSprite(100,600);
    tree.x = Math.round(random(20, windowWidth));
    tree.addImage(treeImg);
    tree.scale = 0.15;
    tree.lifetime = 100;
    treeGroup.add(tree);
  
  }
  
}

function spawnMotorcycles()
{
  if(frameCount % 100 === 0)
  {
   var motorcycle = createSprite(100,850);
   motorcycle.x = Math.round(random(20, windowWidth));
   motorcycle.y = Math.round(random(650,850));
   motorcycle.addImage(motorcycleImg);
   motorcycle.velocityX = 5;
   motorcycle.scale = 0.3;
   motorcycle.lifetime = 200;
   motorcycleGroup.add(motorcycle);

  }
}

function spawnCars()
{
  if(frameCount % 100 === 0)
  {
    var car1 = createSprite(150, 600);
    car1.x = Math.round(random(20, windowWidth));
    car1.y = Math.round(random(350, 525));
    car1.addImage(car1Img);
    car1.velocityX = 10;
    car1.scale = 0.3;
    car1.lifetime = 200;
    carGroup.add(car1);

  }

  if(frameCount % 100 === 0)
  {
    var car2 = createSprite(150, 600);
    car2.x = Math.round(random(0, windowWidth));
    car2.y = Math.round(random(350, 525));
    car2.addImage(car2Img);
    car2.velocityX = 10;
    car2.scale = 0.3;
    car2.lifetime = 200;
    carGroup.add(car2);

  }
}

function spawnTrucks()
{
  if(frameCount % 50 === 0)
  {
    var truck = createSprite(100,280);
    truck.x = Math.round(random(0, windowWidth));
    truck.y = Math.round(random(50,200));
    truck.addImage(truckImg);
    truck.velocityX = 15;
    truck.scale = 0.3;
    truck.lifetime = 200;
    truckGroup.add(truck);
  }
}

function collided()
{
  if(motorcycleGroup.isTouching(player))
  {
    gameState = "END";
    console.log("motorcycle");
  }

  if(carGroup.isTouching(player))
  {
    gameState = "END";
    console.log("car");
  }

  if(treeGroup.isTouching(player))
  {
    gameState = "END";
    console.log("tree")
  }

  if(truckGroup.isTouching(player))
  {
    gameState = "END";
    console.log("truck");
  }
}

function reset()
{
  gameState = "PLAY";
  player.y = windowHeight - 30;
  player.x = windowWidth/2 ;
}