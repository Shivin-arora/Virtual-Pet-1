//Create variables here
var dog,happyDog,food,foodStock,database,foodr;
var hdimg,dimg;
var data;

function preload()
{
  dimg = loadImage("images/d.png");
  hdimg= loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250,20,20);
  dog.addImage(dimg);

  dog.scale = 0.3;

 database=firebase.database();
 foodStock=database.ref('Food');
 foodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(foodr!==undefined){
    if(keyWentDown(UP_ARROW)){
     
     foodr -= 1;
      writeStock(foodr);
    
      dog.addImage(hdimg);
    }
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dimg);
    }
  }  
  //add styles here

  fill("white");
  textSize(20);
  stroke(10);
  text("Food Stock: "+foodr,10,150);

  fill("yellow");
  textSize(20);
  stroke(10);
  text("Note: Press 'UP ARROW' to feed the dog !",70,50);

  drawSprites();

  if(foodr<0){
    foodr=20;
    writeStock(foodr);
  }

}



function readStock(data){
  foodr = data.val();
}


function writeStock(data){
  database.ref('/').update({
    Food:data
  })
}






