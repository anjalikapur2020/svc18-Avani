
var play, about, info
var mangoImg, mango
var pizzaImg, pizza
var waitimg
var gameState = "waitstate"
var score = 10;
var hscore = 0
var uscore = 0
var player, backgroundMusic, waitMusic;
var life = 80
function preload() {

    mangoImg = loadImage("mango.png");
    pizzaImg = loadImage("pizza.png");
    waitimg = loadImage("fat2fit.gif")

    carrotImg = loadImage("carrot.png");
    chipsImg = loadImage("chips.png");
    donutImg = loadImage("donut.png");
    orangeImg = loadImage("orange.png");
    //right images
    fitImg = loadImage("fit.png");
    mediumImg = loadImage("medium.png");
    fatImg = loadImage("fat.png");

    //left images
    leftfitImg = loadImage("fitl.png");
    leftmediumImg = loadImage("mediuml.png");
    leftfatImg = loadImage("fatl.png");


    aboutpopUp = loadImage("aboutpop.gif")
    howpopUp = loadImage("howPop.gif")

    level1img = loadImage("level1.gif")

    tile5img = loadImage("tile01.png")
    tile6img = loadImage("tile02.png")
    tile7img = loadImage("tile03.png")

    restartimg = loadImage("restart.png")

    explodeimg = loadImage("explode.gif")

    lifeImage = loadImage("life.png")
    // load sounds
    backgroundMusic = loadSound("bg_music.mp3")
    waitMusic = loadSound("waitmusic.mp3")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    // all the buttons
    play = createImg("play.png")
    play.position(width / 6 - 100, height - 200)
    play.size(250, 250)

    how = createImg("how.png")
    // how.position((width / 4 + width / 2), height - 150)
    how.position((width / 4 - 100 + width / 2), height - 150)
    how.size(250, 250)


    about = createImg("about.png")
    about.position((width / 2 - 150), height - 200)
    about.size(250, 250)



    aboutpop = createSprite(width / 2, height / 1.9)
    aboutpop.addImage(aboutpopUp)
    aboutpop.visible = false
    aboutpop.scale = 2;




    home = createImg("home.png")
    home.position(aboutpop.x - 100, height - 250)
    home.size(200, 200)



    home.hide()


    howpop = createSprite(width / 2, height / 2)
    howpop.addImage(howpopUp)
    howpop.visible = false
    howpop.scale = 2;



    player = createSprite(500, height - 50);

    player.addImage("fat", fatImg);
    player.addImage("fit", fitImg);
    player.addImage("medium", mediumImg);
    player.addImage("explode", explodeimg)

    //add left images
    player.addImage("fatleft", leftfatImg);
    player.addImage("fitleft", leftfitImg);
    player.addImage("mediumleft", leftmediumImg);

    // player.debug = true
    player.visible = false
    player.scale = .4


    healthyFoodGroup = new Group();
    UnhealthyFoodGroup = new Group();




    invisibleground = createSprite(width / 2, height - 20, width, 20)
    invisibleground.visible = false


    blockGroup = new Group

}

function draw() {
    if (gameState === "waitstate") {
        background("black")
        background(waitimg)


        about.show()
        play.show()
        how.show()
        home.hide()
        aboutpop.visible = false
        howpop.visible = false

        if (!waitMusic.isPlaying()) {
            waitMusic.play();
            waitMusic.setVolume(0.5);
        }



    }

    if (gameState !== "waitstate") {
        waitMusic.stop()
    }

    if (play.mousePressed(() => {
        gameState = "playstate"
        about.hide()
        play.hide()
        how.hide()
        home.hide()
        aboutpop.visible = false
        howpop.visible = false

    }))

        if (home.mousePressed(() => {
            gameState = "waitstate"


        }))




            if (how.mousePressed(() => {
                gameState = "howstate"
                home.show()
                about.hide()
                play.hide()
                how.hide()
                aboutpop.visible = false
                howpop.visible = true

            }))

                if (about.mousePressed(() => {
                    gameState = "aboutstate"



                }))



                    if (gameState === "playstate") {
                        background(level1img)
                        //displaying the score as health
                        image(lifeImage, 60, 45, 30, 30);
                        fill("black");
                        rect(100, 50, 185, 20);
                        fill("#f50057");
                        rect(100, 50, life, 20);



                        if (!backgroundMusic.isPlaying()) {
                            backgroundMusic.play();
                            backgroundMusic.setVolume(0.5);
                        }
                        textSize(40);
                        fill("black")
                        //text("Score: " + score, 100, 70);



                        if (player.x >= width) {
                            player.x = 50
                        }
                        if (player.x <= 0) {
                            player.x = width - 100
                        }
                        spawnTiles()
                        /* text("uScore: "+uscore, width-250,70);
                         text("hScore: "+hscore, width-250,150);*/


                        //pizza.visible=true

                        //SpawnHealthyFood();
                        SpawnUnhealthyFood();


                        if (keyDown("LEFT_ARROW")) {
                            player.x -= 5

                            if (hscore <= 3) {
                                player.addImage("medium", leftmediumImg)
                            }

                            if (uscore >= 4) {
                                player.addImage("fat", leftfatImg)
                            }

                            if (hscore >= 6) {
                                player.addImage("fit", leftfitImg)
                            }



                        }

                        if (keyDown("RIGHT_ARROW")) {
                            player.x += 5
                            if (hscore <= 3) {
                                player.addImage("medium", mediumImg)
                            }

                            if (uscore >= 4) {
                                player.addImage("fat", fatImg)
                            }

                            if (hscore >= 6) {
                                player.addImage("fit", fitImg)
                            }


                        }

                        if (keyDown("DOWN_ARROW")) {
                            player.y += 5
                        }

                        if (keyDown("space")) {
                            player.velocityY = -15
                            console.log("space")
                        }
                        player.velocityY += .8


                        for (i = 0; i < (UnhealthyFoodGroup.length); i++) {
                            if (player.isTouching(UnhealthyFoodGroup.get(i))) {
                                UnhealthyFoodGroup.get(i).destroy()
                                life = life - 2
                                score = score - 2;
                                uscore += 1

                            }
                        }

                        for (i = 0; i < (healthyFoodGroup.length); i++) {
                            if (player.isTouching(healthyFoodGroup.get(i))) {
                                healthyFoodGroup.get(i).destroy()
                                //  blockGroup.get(i).destroy()
                                life = life + 5

                                score = score + 1;
                                hscore += 1
                            }
                        }

                        if (hscore <= 3) {
                            player.changeImage("medium", mediumImg)
                        }

                        if (uscore >= 4) {
                            player.changeImage("fat", fatImg)
                        }

                        if (hscore >= 6) {
                            player.changeImage("fit", fitImg)
                        }

                        player.collide(invisibleground)


                        /*  if (score <= -1) {
                              gameState = "over"
  
  
                          }*/
                        if (life <= -1) {
                            gameState = "over"


                        }
                        if (life >=190) {
                            gameState = "win"


                        }


                    }

    if (gameState === "aboutstate") {
        home.show()
        about.hide()
        play.hide()
        how.hide()
        aboutpop.visible = true
        howpop.visible = false
    }

    if (gameState === "howstate") {
        home.show()
        about.hide()
        play.hide()
        how.hide()
        aboutpop.visible = false
        howpop.visible = true
    }

    if (gameState == "playstate") {
        player.visible = true

    }
    else {
        player.visible = false

    }


    if (gameState === "over") {

        healthyFoodGroup.destroyEach()
        UnhealthyFoodGroup.destroyEach()
        blockGroup.destroyEach()
        gameOver()
    }

    if (gameState === "win") {

        
        healthyFoodGroup.destroyEach()
        UnhealthyFoodGroup.destroyEach()
        blockGroup.destroyEach()
        gameWin()
    }

    drawSprites()
}



function SpawnUnhealthyFood() {
    if (frameCount % 60 == 0) {
        randomx = Math.round(random(20, width - 20))
        unhealthy = createSprite(randomx, 0);
    
        unhealthy.addImage(pizzaImg)
        unhealthy.scale = .25
        unhealthy.velocityY = 15
        //unhealthy.visible=true


        var rand1 = Math.round(random(1, 3))
        switch (rand1) {

            case 1: unhealthy.addImage(pizzaImg)
                break;

            case 2: unhealthy.addImage(donutImg)
                break;

            case 3: unhealthy.addImage(chipsImg)
                break;

            default: break


        }
        UnhealthyFoodGroup.lifetime = 10;

        //adding unhealthy food to group
        UnhealthyFoodGroup.add(unhealthy);
    }

}


function spawnTiles() {
    if (frameCount % 80 === 0) {
        randomheight = Math.round(random(10, height - height / 3.25))

        block = createSprite(0, randomheight, 100, 7)

        healthy = createSprite(block.position.x, block.position.y);
        block.velocityX = 5
        healthy.velocityX = 5
        healthy.collide(block)
        healthy.scale = .15;
        //healthy.debug=true
        //block.debug=true
        block.setCollider("rectangle", 0, 0, 0, 0)


        var rand = Math.round(random(1, 3))
        switch (rand) {
            case 1: block.addImage(tile5img)
                healthy.addImage(orangeImg)
                block.setCollider("rectangle", 0, 30, 0, 0)
                break;

            case 2: block.addImage(tile6img)
                healthy.addImage(mangoImg)
                block.setCollider("rectangle", 0, 30, 0, 0)
                break;

            case 3: block.addImage(tile7img)
                healthy.addImage(carrotImg);
                block.setCollider("rectangle", 0, 0, 0, 0)

                break;

            default: break

        }
        healthyFoodGroup.add(healthy);
        blockGroup.add(block)

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}




function gameOver() {
    swal(
        {
            title: `Game Over!!!`,
            text: "Thanks for playing!! \nEat Healthy!!\n Keep Fit!!",
            imageUrl: "restart.png",
            imageSize: "150x150",
            confirmButtonText: "Restart"
        },
        function (isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        }
    )
}

function gameWin() {
    swal(
        {
            title: `You Won!!!`,
            text: "Thanks for playing!! \nEat Healthy!!\n Keep Fit!!",
            imageUrl: "win.png",
            imageSize: "150x150",
            confirmButtonText: "Restart"
        },
        function (isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        }
    )
}
