//    Main menu Navigation
    var char8Name = document.getElementById("char8Name");
    var startBtn = document.getElementById("startBtn");
    var header = document.getElementById("header");
    var container1 = document.getElementById("container1");
    var container2 = document.getElementById("container2");
    var menuA = document.getElementById("menuA");
    var menuB = document.getElementById("menuB");
    var menuC = document.getElementById("menuC");
    var mMenu = document.getElementById("mMenu");
    var jMenu = document.getElementById("jMenu");
    var hMenu = document.getElementById("hMenu");
    var join1 = document.getElementById("join1");
    var join2 = document.getElementById("join2");
    var host1 = document.getElementById("host1");
    var host2 = document.getElementById("host2");
    var charMenu = document.getElementById("charMenu");
    var signIn = document.getElementById("signIn");
    var mMaking = document.getElementById("mMaking");
    var readyP = document.getElementById("readyP");
    var back1 = document.getElementById("back1");
    var back2 = document.getElementById("back2");
    var back3 = document.getElementById("back3");
    var back4 = document.getElementById("back4");
    var back5 = document.getElementById("back5");
    var back6 = document.getElementById("back6");
    var chars1 = document.getElementById("chars1");
    var chars2 = document.getElementById("chars2");
    var chars3 = document.getElementById("chars3"); 
    var chars4 = document.getElementById("chars4");
    var chars5 = document.getElementById("chars5"); 
    var chars6 = document.getElementById("chars6");
    var chars7 = document.getElementById("chars7");
    var chars8 = document.getElementById("chars8");
    var charContainer = document.getElementById("charContainer");
    
    signIn.addEventListener("click", function(){
        menuA.style.display = "none";
        menuB.style.display = "block";
    });
    
    mMaking.addEventListener("click", function(){
        menuA.style.display = "none";
        menuC.style.display = "block";
    });
    
     back2.addEventListener("click", function(){
        menuA.style.display = "block";
        menuB.style.display = "none";
    });
    
    back3.addEventListener("click", function(){
        menuA.style.display = "block";
        menuC.style.display = "none";
    });
    
    join1.addEventListener("click", function(){
        jMenu.style.display = "block";
        mMenu.style.display = "none";
    });
    
    
    back4.addEventListener("click", function(){
        jMenu.style.display = "none";
        mMenu.style.display = "block";
    });
    
    host1.addEventListener("click", function(){
       mMenu.style.display = "none";
        hMenu.style.display = "block";
    });
    
      back5.addEventListener("click", function(){
        hMenu.style.display = "none";
          mMenu.style.display = "block";
          menuC.style.display = "block";
    });

      host2.addEventListener("click", function(){
        hMenu.style.display = "none";
        charMenu.style.display = "block";
      });

      join2.addEventListener("click", function(){
        jMenu.style.display = "none";
        charMenu.style.display = "block";
      });

      readyP.addEventListener("click", function(){
        container1.style.display = "none";
        container2.style.display = "block";
      });

       back6.addEventListener("click", function(){
       charMenu.style.display = "none";
        mMenu.style.display = "block";
          menuC.style.display = "block";
    });
    


//Websocket variable

var f_socket = io.connect('localhost:4000');
var gameObj = null;
var start = false;
// Link to app on heorku later
// var f_socket = io.connect('https://bcit-for-glory.herokuapp.com/');

// Socket variable to connect to the server
    
// Class Variables
var commander = document.getElementsByClassName("commander"),
    leftField = document.getElementsByClassName("left-field"),
    rightField = document.getElementsByClassName("right-field"),
    dropArea = document.getElementsByClassName("dropArea"),

    lightMins = document.getElementsByClassName("light-mins"),
    darkMins = document.getElementsByClassName("dark-mins"),

    cards = document.getElementsByClassName("cards"),
    smallCards = document.getElementsByClassName("small-cards");

// ID Variables
var lightCommander = document.getElementById("lightCommander"),
    lightDog= document.getElementById("lightDog"),
    lightSoldier = document.getElementById("lightSoldier"),
    lightArcher = document.getElementById("lightArcher"),

    darkCommander = document.getElementById("darkCommander"),
    darkWizard = document.getElementById("darkWizard"),
    darkGrunt = document.getElementById("darkGrunt"),
    darkDog = document.getElementById("darkDog"),

    card1 = document.getElementById("card1"),
    card2 = document.getElementById("card2"),
    card3 = document.getElementById("card3"),

    menu = document.getElementById("main-menu"),
    cName = document.getElementById("cName"),
    cHp = document.getElementById("cHp"),
    cAtk = document.getElementById("cAtk"),
    
    
    ntCommanders = document.getElementsByClassName("nameTagCommanders"),
    ntMinions = document.getElementsByClassName("nameTagMinions"),
    
    ntlightCommander = document.getElementById("ntlightCommander"),
    ntlightArcher = document.getElementById("ntlightArcher"),
    ntlightSoldier = document.getElementById("ntlightSoldier"),
    ntlightDog = document.getElementById("ntlightDog"),
    
    ntdarkCommander = document.getElementById("ntdarkCommander"),
    ntdarkWizard = document.getElementById("ntdarkWizard"),
    ntdarkGrunt = document.getElementById("ntdarkGrunt"),
    ntdarkDog = document.getElementById("ntdarkDog"),
    nameTag = document.getElementsByClassName("nameTag"),
    ntActive = document.getElementsByClassName("nameTag-Active"),
    discardPile = document.getElementById("discard-pile"),
    roomDiv = document.getElementById("roomDiv");
    deckPile = document.getElementById("deck-pile");
    
    // ROOMS STUFF
var curroom = "";
    

f_socket.on('new_room', function (data) {
    console.log(data);
    // this loop populates the roomlist div
    for (var i in data) {
        
        var ndiv = document.createElement("div");
        // makes the inner html of the room the div
        ndiv.innerHTML = data[i].room;
        
        roomDiv.appendChild(ndiv);
        // gives the room a div id which matches the name of the room
        
        ndiv.id = data[i].room;
        // this adds an event listener to the new div created
        
        ndiv.addEventListener("click", function () {
         // variable contains the id of the div
        
         var roomname = this.id;
        
        console.log("This room's id is " + roomname)
        // this emit sends the variable we just created over to the server so that we can use the data to make the user join their selected room
        
        f_socket.emit("join_room", roomname);
        // this sets a local variable to be used for sending events back and forth
            
        curroom = roomname;
        });
    }
});

    host2.addEventListener("click", function() {
    
    var hostInput = document.getElementById("hostInput").value;    
    
        f_socket.emit('new_room', {

        room: hostInput
        });

    curroom = hostInput
        console.log(hostInput);
        console.log(curroom);
    });
    



// Dropping the cards 
var updateObj = {
    card: "",
    monster: ""
};



/* ___  ___    _ ___ ___ _____ ___ _ 
  / _ \| _ )_ | | __/ __|_   _/ __| |
 | (_) | _ \ || | _| (__  | | \__ \_|
  \___/|___/\__/|___\___| |_| |___(_)
  */

function changeDiv(id, type){

    var mon = null;
    
    if(type == "dark"){
        mon = gameObj.drkSide[id];
    } else if (type == "light"){
        mon = gameObj.lghtSide[id];
    }

    /*cName.innerHTML = gameObj.lghtSide[id].name;
    cHp.innerHTML = "Health: " + gameObj.lghtSide[id].health;
    cAtk.innerHTML = "ATK: " + gameObj.lghtSide[id].atk;*/
    //innerHTML stuff
}

//monStats = document.getElementsByClassName("allMins");


// SETTING THE STATES




/*   
_____ _   _ _   _  ____ _____ ___ ___  _   _ ____  
|  ___| | | | \ | |/ ___|_   _|_ _/ _ \| \ | / ___| 
| |_  | | | |  \| | |     | |  | | | | |  \| \___ \ 
|  _| | |_| | |\  | |___  | |  | | |_| | |\  |___) |
|_|    \___/|_| \_|\____| |_| |___\___/|_| \_|____/      
*/



// jQuery for dragging and dropping

var dragid = "";

$(document).ready(function () {

var movementStrength = 25;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
/*setInterval(()=>{
    var mtop = parseInt($('.bgScroll').css("top"))+1;
    var mleft = parseInt($('.bgScroll').css("left"))-1;
    $('.bgScroll').css({"top" : mtop+"px", "left" : mleft+"px"});
},16)*/

$(".bgScroll").mousemove(function(e){
          var pageX = e.pageX - ($(window).width() / 2);
          var pageY = e.pageY - ($(window).height() / 2);
          var newvalueX = width * pageX * -1 -25;
          var newvalueY = height * pageY * -1;
          $('.bgScroll').css({"top" : newvalueY+"px", "left" : newvalueX+"px"});
});





    $(".cards").draggable({
        opacity: .3,
        containment: "#container2",
        scroll: false,  
        /* Fix snapping to mins, and back to place */
   
        /* Fix this for UX purposes */
        // How to change height/width of clicked object
        // Function starts here 
        
        start: function( event, ui ) {
            dragid = $(this).attr("id");
            // Changing card value to picked up card 
            updateObj.card = dragid;

        }
    });

    // When you drop card; change dark minion value

    $(".dark-mins").droppable ({
        drop: function (event, ui) {
            var dropid = $(this).attr("id");
    
            console.log(dropid);
            updateObj.monster = dropid
            // Turning object from backend into a variable
            console.log(updateObj);

            $(".attackUpSpSh").appendTo(this);

            // Update server with drop function
            f_socket.emit('updateDarkMin', updateObj);


        }
        // Ask Henry why no choose other ID
    });
    
    // When you drop card; change light minion value

    $(".light-mins").droppable({
        drop: function (event, ui) {
            var dropid = $(this).attr("id");

            console.log(dropid);
            updateObj.monster = dropid;

            console.log(updateObj);
            // Update server with drop function
            f_socket.emit('updateLightMin', updateObj);
            $(".attackUpSpSh").appendTo(this);

            }
    });

    // Main menu toggle

    // Maybe make a lock div for this
})

// End jQuery

// receiving events from the server
// Calling gameObj via sockets
    
// GAMEOBJ TO COMMUNICATE WITH BACK END 
f_socket.on('gameStatus', function (tgameObj) {
    if (gameObj == null && start == false) {
        start = true;
        monStats = document.getElementsByClassName("allMins");

        // Click Monster Loop
        for (var i = 0; i < monStats.length; i++) {
            monStats[i].addEventListener("click", function () {

                var curMon = null;
                console.log(atkState);
                // Confirming if light side
                if (gameObj.lghtSide[this.id]) {
                    curMon = gameObj.lghtSide[this.id];
                    monIdOne = [this.id];

                    // Confirming if dark side
                } else {
                    curMon = gameObj.drkSide[this.id];
                    monIdOne = [this.id];
                }
                // vvvvvv FIRST CLICK vvvvvvvvv

                if (atkState.clickState == 0) {

                    atkState.minOne = curMon;
                    // ClickState = 1 unit has been selected
                    atkState.clickState = 1;
                    //Confirming everything
                    console.log("State: " + atkState.clickState);

                    atkState.monIdOne = [this.id];
                    console.log(atkState.monIdOne);


                }


                // Click state 2 is when minion is confirmed not same minion type vvvvvvv SECOND CLICK HERE vvvvvvv

                else if (atkState.clickState == 1 && atkState.minOne.minType != curMon.minType) {

                    // 2nd clickstate
                    atkState.clickState = 2;
                    atkState.minTwo = curMon;
                    console.log("Click State is on state: "
                        + atkState.clickState);
                    console.log(atkState.minTwo);
                    console.log("Curmon: " + curMon);

                    atkState.monIdTwo = [this.id];
                    console.log(atkState.monIdTwo);

                    //Send atkState to backend
                    f_socket.emit('updateStatus', atkState)
                }
                // Error log
                else {
                    console.log("Invalid");
                }
            })
        }
    }
    atkState = {
        clickState: 0,
        minOne: null,
        minTwo: null
    }
    gameObj = tgameObj;
    
    var removeMinCountLight = 0;
    var removeMinCountDark = 0;

    for (var i in gameObj.lghtSide) {
        if (gameObj.lghtSide[i].health <= 0) {
            $("#"+i).remove();
            removeMinCountLight++;
            console.log(removeMinCountLight);
                if (removeMinCountLight == 4) {
                    removeMinCountLight = 0;
                    console.log("Add reset function here");
                }
        }
    }
    for (var i in gameObj.lghtSide) {
        if (gameObj.lghtSide[i].health <= 0){
            $("#nt"+i).remove();
            
        }
    }

    for (var i in gameObj.drkSide) {
        if (gameObj.drkSide[i].health <= 0) {
            $("#" + i).remove();
            
            console.log(i);

            removeMinCountDark++;
            console.log(removeMinCountDark);
            if (removeMinCountDark == 4) {
                removeMinCountDark = 0;
                console.log("Add reset function here");
            }
        }
    }
    for (var i in gameObj.drkSide) {
        if (gameObj.drkSide[i].health <= 0) {
            $("#nt" + i).remove();
        }
    }


    //LIGHT SIDE SERVER SIDE
    ntlightCommander.innerHTML = "<div style='left: 30px; top: 10px; position: relative; display: block; font-size: 2em; color: white'>" + gameObj.lghtSide.lightCommander.name + "</div>" + "<div style='left: 220px; top: 55px; position: absolute; font-size: 1.1em; color: white'>" + gameObj.lghtSide.lightCommander.health + "</div>" + "<div style='left: 265px; top: 55px; position: absolute; font-size: 1.1em; color: white'>"+  gameObj.lghtSide.lightCommander.atk;
    
    ntlightDog.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.lghtSide.lightDog.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightDog.health + "</div>" +  "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightDog.atk + "</div>" ;
    
    ntlightSoldier.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.lghtSide.lightSoldier.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightSoldier.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightSoldier.atk + "</div>";
    
    ntlightArcher.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.lghtSide.lightArcher.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightArcher.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.lghtSide.lightArcher.atk + "</div>";
    
    // DARK SIDE 
    ntdarkCommander.innerHTML = gameObj.drkSide.darkCommander.name  + "<div style='left: 220px; top: 55px; position: absolute; font-size: 1.1em; color: white'>" + gameObj.drkSide.darkCommander.health + "</div>" + "<div style='left: 265px; top: 55px; position: absolute; font-size: 1.1em; color: white'>"+ gameObj.drkSide.darkCommander.atk + "</div>";
    
    ntdarkDog.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.drkSide.darkDog.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkDog.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkDog.atk + "</div>";
    
    ntdarkGrunt.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.drkSide.darkGrunt.name + "</div>" + "<div style='left: 145px; top: 10px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkGrunt.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" +  gameObj.drkSide.darkGrunt.atk + "</div>"; 
    
    ntdarkWizard.innerHTML = "<div style='left: 65px; top: 5px; position: relative; display: block; font-size: 1.2em; color: white'>" + gameObj.drkSide.darkWizard.name + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkWizard.health + "</div>" + "<div style='left: 180px; top: -5px; position: relative; font-size: 0.7em; color: white'>" + gameObj.drkSide.darkWizard.atk + "</div>";
});
// CLICKABLE LOOPS

    var atkState = {
        //Setting state for clicking, starts at 0
        clickState: 0,
        // First minion clicked
        minOne: null,
        // Second minion
        minTwo: null,
        monIdOne: null,
        monIdTwo:null
    };

   

    // clickState = 1 is when set minion is chosen

    function attackFunc(){

        var attacker = atkState.minOne.atk; 
        var victim = atkState.minTwo.health;
        var result = victim - attacker;
        atkState.minTwo.health = result;
        console.log(atkState.minTwo);
        //console.log(gameObj.lghtSide.lightSoldier.health);

        // resetting the atkState
        atkState = {
            clickState: 0,
            minOne: null,
            minTwo: null
        }
        console.log(atkState.clickState);
    }

 // <--- this allows gameObj from backend to read to frontend 


// Henry for questions 

/*
 

    Ask henry why atkState.minOne/minTwo is not communicating properly with the gameObj stuff. Brings up [object, object] if we console.log(curMon)

    drawing card concept
        card deck array in back end [?]

    hp < 0 : display: none / remove Child backend thing

    How to put different deck styles depending on dark vs light

    how to fix animations

    How to make back end result <= 0 disappear */ 



//NEWSHIT by nee

// click feedback characters

var archClicks = 0;
var lDogClicks = 0;
var lSolClicks = 0;
var lCommClicks = 0;

var wizClicks = 0;
var gruntClicks=0;
var dDogClicks = 0;
var dCommClicks = 0;

var charClicks = 0;


lightArcher.addEventListener("click",function(){
 
    archClicks ++;

console.log("arch" + archClicks);

if(archClicks ==1 ){
        lightArcher.style.filter="drop-shadow(0px 0px 10px #ffffff)";
        ntlightArcher.style.display = "block";
        lightCommander.style.filter="none";
        lightSoldier.style.filter="none";
        lightDog.style.filter="none";
        lightDog.style.filter="none";
        darkGrunt.style.filter="none";
        darkWizard.style.filter="none";
        darkCommander.style.filter="none";
ntlightCommander.style.display = "none";
ntlightSoldier.style.display = "none";
ntlightDog.style.display = "none";
ntdarkDog.style.display = "none";
ntdarkGrunt.style.display = "none";
ntdarkWizard.style.display = "none";
ntdarkCommander.style.display = "none";
       charClicks ++;
        charClicks = 0;
}

if(archClicks == 2){
    lightArcher.style.filter="none";
     ntlightArcher.style.display = "none";
      archClicks = 0;

}
});


lightCommander.addEventListener("click",function(){
 
    lCommClicks ++;

console.log("lComm" + lCommClicks);

if(lCommClicks ==1 ){
      lightCommander.style.filter="drop-shadow(0px 0px 10px #ffffff)";
    ntlightCommander.style.display = "block";
      lightArcher.style.filter="none";
      lightSoldier.style.filter="none";
       lightDog.style.filter="none";
       lightDog.style.filter="none";
        darkGrunt.style.filter="none";
        darkWizard.style.filter="none";
         darkCommander.style.filter="none";
ntlightArcher.style.display = "none";
ntlightSoldier.style.display = "none";
ntlightDog.style.display = "none";
ntdarkDog.style.display = "none";
ntdarkGrunt.style.display = "none";
ntdarkWizard.style.display = "none";
ntdarkCommander.style.display = "none";
       charClicks ++;
        charClicks = 0;
}

if(lCommClicks == 2){
    lightCommander.style.filter="none";
     ntlightCommander.style.display = "none";
      lCommClicks = 0;
}
});

lightSoldier.addEventListener("click",function(){
 
    lSolClicks ++;

console.log("lComm" + lSolClicks);

if(lSolClicks ==1 ){
      lightSoldier.style.filter="drop-shadow(0px 0px 10px #ffffff)";
      ntlightSoldier.style.display = "block";
      lightArcher.style.filter="none";
      lightCommander.style.filter="none";
       lightDog.style.filter="none";
        darkDog.style.filter="none";
         darkGrunt.style.filter="none";
         darkWizard.style.filter="none";
          darkCommander.style.filter="none";
ntlightArcher.style.display = "none";
ntlightCommander.style.display = "none";
ntlightDog.style.display = "none";
ntdarkDog.style.display = "none";
ntdarkGrunt.style.display = "none";
ntdarkWizard.style.display = "none";
ntdarkCommander.style.display = "none";
       charClicks ++;
        charClicks = 0;
}

if(lSolClicks == 2){
    lightSoldier.style.filter="none";
    ntlightSoldier.style.display = "none";
      lSolClicks = 0;
}
});


lightDog.addEventListener("click",function(){
 
    lDogClicks ++;

console.log("lComm" + lDogClicks);

if(lDogClicks ==1 ){
      lightDog.style.filter="drop-shadow(0px 0px 10px #ffffff)";
ntlightDog.style.display = "block";
      lightArcher.style.filter="none";
      lightCommander.style.filter="none";
      lightSoldier.style.filter="none";
      darkDog.style.filter="none";
       darkGrunt.style.filter="none";
       darkWizard.style.filter="none";
        darkCommander.style.filter="none";
    ntlightArcher.style.display = "none";
    ntlightCommander.style.display = "none";
    ntlightSoldier.style.display = "none";
    ntdarkDog.style.display = "none";
    ntdarkGrunt.style.display = "none";
    ntdarkWizard.style.display = "none";
    ntdarkCommander.style.display = "none";

 ntdarkDog.style.display = "none";
       charClicks ++;
        charClicks = 0;
}

if(lDogClicks == 2){
    lightDog.style.filter="none";
    ntlightDog.style.display = "none";
      lDogClicks = 0;
}
});



darkDog.addEventListener("click",function(){
 
    dDogClicks ++;

console.log("dDogg" + dDogClicks);

if(dDogClicks ==1 ){
     darkDog.style.filter="drop-shadow(0px 0px 10px #ffffff)";
     ntdarkDog.style.display = "block";
      lightArcher.style.filter="none";
      lightSoldier.style.filter="none";
      lightCommander.style.filter="none";
      lightDog.style.filter="none";
       darkGrunt.style.filter="none";
       darkWizard.style.filter="none";
        darkCommander.style.filter="none";
    ntlightArcher.style.display = "none";
    ntlightCommander.style.display = "none";
    ntlightDog.style.display = "none";
    ntlightSoldier.style.display = "none";
    ntdarkGrunt.style.display = "none";
    ntdarkWizard.style.display = "none";
    ntdarkCommander.style.display = "none";
       charClicks ++;
        charClicks = 0;
}

if(dDogClicks == 2){
   darkDog.style.filter="none";
   ntdarkDog.style.display = "none";
     dDogClicks = 0;
}
});



darkGrunt.addEventListener("click",function(){
 
   gruntClicks ++;

console.log("dDogg" + dDogClicks);

if(gruntClicks ==1 ){
        darkGrunt.style.filter="drop-shadow(0px 0px 10px #ffffff)";
        ntdarkGrunt.style.display = "block";
        lightArcher.style.filter="none";
        lightSoldier.style.filter="none";
        lightCommander.style.filter="none";
        lightDog.style.filter="none";
        darkDog.style.filter="none";
        darkWizard.style.filter="none";
        darkCommander.style.filter="none";
    ntlightArcher.style.display = "none";
    ntlightCommander.style.display = "none";
    ntlightDog.style.display = "none";
    ntlightSoldier.style.display = "none";
    ntdarkDog.style.display = "none";
    ntdarkWizard.style.display = "none";
    ntdarkCommander.style.display = "none";
       charClicks ++;
        charClicks = 0;
}

if(gruntClicks == 2){
        darkGrunt.style.filter="none";
        ntdarkGrunt.style.display = "none";
        gruntClicks = 0;
}
});



darkWizard.addEventListener("click",function(){
 
   wizClicks ++;

console.log("dDogg" + dDogClicks);

if(wizClicks ==1 ){
    darkWizard.style.filter="drop-shadow(0px 0px 10px #ffffff)";
ntdarkWizard.style.display = "block";
    lightArcher.style.filter="none";
    lightSoldier.style.filter="none";
    lightCommander.style.filter="none";
    lightDog.style.filter="none";
    darkGrunt.style.filter="none";
    darkDog.style.filter="none";
    darkCommander.style.filter="none";
ntdarkGrunt.style.display = "none";
ntlightArcher.style.display = "none";
ntlightCommander.style.display = "none";
ntlightDog.style.display = "none";
ntlightSoldier.style.display = "none";
ntdarkDog.style.display = "none";
ntdarkCommander.style.display = "none";
    charClicks ++;
    charClicks = 0;
}

if(wizClicks == 2){
    darkWizard.style.filter="none";
     ntdarkWizard.style.display = "none";
    wizClicks = 0;
}
});

darkCommander.addEventListener("click",function(){
 
   dCommClicks ++;

console.log("dDogg" + dDogClicks);

if(dCommClicks ==1 ){
   darkCommander.style.filter="drop-shadow(0px 0px 10px #ffffff)";
   ntdarkCommander.style.display = "block";
    lightArcher.style.filter="none";
    lightSoldier.style.filter="none";
    lightCommander.style.filter="none";
    lightDog.style.filter="none";
    darkGrunt.style.filter="none";
    darkDog.style.filter="none";
    darkWizard.style.filter="none";
ntlightArcher.style.display = "none";
ntlightCommander.style.display = "none";
ntlightDog.style.display = "none";
ntlightSoldier.style.display = "none";
ntdarkDog.style.display = "none";
ntdarkWizard.style.display = "none";
ntdarkGrunt.style.display = "none";
    charClicks ++;
    charClicks = 0;
}

if(dCommClicks == 2){
    darkCommander.style.filter="none";
    ntdarkCommander.style.display = "none";
    dCommClicks = 0;
}
});


container2.addEventListener("click",function(){
    charClicks++;
    console.log("char" + charClicks);
       if(charClicks == 2){
    lightArcher.style.filter="none";
    lightCommander.style.filter="none";
    lightSoldier.style.filter="none";
    lightDog.style.filter="none";
    darkDog.style.filter="none";
    darkGrunt.style.filter="none";
    darkWizard.style.filter="none";
    darkCommander.style.filter="none";
    charClicks = 0;
    archClicks = 0;
    lCommClicks = 0;
    lSolClicks = 0;
    lDogClicks = 0;
    dDogClicks = 0;
    gruntClicks = 0;
    wizClicks = 0;
    dCommClicks = 0;
ntlightArcher.style.display = "none";
ntlightCommander.style.display = "none";
ntlightSoldier.style.display = "none";
ntlightDog.style.display = "none";
ntdarkDog.style.display = "none";
ntdarkGrunt.style.display = "none";
ntdarkWizard.style.display = "none";
ntdarkCommander.style.display = "none";
}
            });


// New Start Menu Stuff
  
var back7 = document.getElementById("back7");
var exitGame = document.getElementById("exitGame");
var menuBtn = document.getElementById("menuBtn");
var menuContainer = document.getElementById("menuContainer");

    menuBtn.addEventListener("click",function(){
    menuBtn.style.display = "none";
    menuContainer.style.display = "block";
});

back7.addEventListener("click",function(){
    menuContainer.style.display = "none";
    menuBtn.style.display = "block";
});



var darkBox = document.getElementById("darkBox");
var lightBox = document.getElementById("lightBox");

darkBox.addEventListener("click", function(){
    darkBox.style.filter = "drop-shadow(0px 0px 30px #000000)";
    lightBox.style.filter = "none";
});

lightBox.addEventListener("click", function(){
    lightBox.style.filter = "drop-shadow(0px 0px 30px #ffffff)";
    darkBox.style.filter = "none";
});

startBtn.addEventListener("click", function(){
   document.querySelector('#scrollHere').scrollIntoView({ behavior: 'smooth' });
    
});

back1.addEventListener("click", function(){
    document.querySelector('#startBtn').scrollIntoView({ behavior: 'smooth' });
});