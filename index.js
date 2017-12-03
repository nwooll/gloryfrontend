// setting up the app to require things

var express = require('express');
var http = require('http');

// this creates the server with a port of 4000
var port = process.env.PORT || 4000;
// process.env.PORT for Heroku
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Static files to serve
app.use(express.static('public'));

server.listen(port, function () {
    console.log("The server is running.");
});

var rooms = [];



var gameObj = {
    lghtSide: {
        "lightCommander": {
            name: "Light Commander",
            health: 32,
            atk: 18,
            minType: "light"
        },
        "lightDog": {
            name: "Light Dog",
            health: 15,
            atk: 10,
            minType: "light"
        },
        "lightSoldier": {
            name: "Light Soldier",
            health: 17,
            atk: 8,
            minType: "light"
        },
        "lightArcher": {
            name: "Light Archer",
            health: 15,
            atk: 10,
            minType: "light"
        }
    },
    drkSide:{
        "darkCommander": {
            name: "Dark Commander",
            health: 26,
            atk: 24,
            minType: "dark"
        },
        "darkDog":{
            name:"Dark Dog",
            health:18,
            atk:7,
            minType: "dark"
        },
        "darkGrunt":{
            name: "Dark Grunt",
            health: 20,
            atk: 5,
            minType: "dark"
        },
        "darkWizard":{
            name: "Dark Wizard",
            health: 15,
            atk: 10,
            minType: "dark"
        }
    },
};

// COPYPASTA CARD OBJECT
var cardObj = {
    lghtSide: {
        "card3": {
            atk: 10,
            health: 33
        },
        "card2": {
            atk: 10,
            health: 3
        },
        "card1" : {
            atk: 5,
            health: 10            
        }
    },
    
    drkSide: {
        "card3": {
            atk: 10,
            health: 15,
        },
        "card2": {
            atk: 20,
            health: 3
        },
        "card1" : {
            atk: 15,
            health: 10
        }
    }
};



io.on('connection', function(socket){
    




    //Rooms
    socket.on('new_room', function(data){

        var room = data;
        // pushes the room to the server side array so everyone sees the same thing when they open the page
        rooms.push(room);
        // user joins the room upon creating it
        socket.join(data.room);
        // using the console to ensure that the join was successful.  appears in console bc it's server side.
        console.log("Joined room " + data.room)
        console.log("Data is ", data)
        // emits the rooms array back to the other sockets
        
        

        io.sockets.emit('new_room', rooms);

    })


    // this function allows a user to join their selected room with data sent by ndiv's event listener
    socket.on('join_room', function (roomname) {
        // joining the room
        socket.join(roomname);
        // using the console to ensure that the join was successful.  appears in console bc it's server side.
        console.log("Joined room " + roomname)
    });
    

    io.sockets.emit('gameStatus', gameObj, rooms);
    // when someone sends an event, update status
    
    socket.on('updateStatus', function(data){
        console.log(data);
        console.log("Min one is ", data.minOne)
        console.log("Min Two is ", data.minTwo)
        
        var attacker = data.minOne.atk;
        var victim = data.minTwo.health;
        // calculation of result
        var result = victim - attacker;
        // calculate number and set to result
        console.log("The result is "+ result);




        if (data.minTwo.minType == "dark"){
            console.log("The minion being attacked is dark");

            console.log(data.monIdTwo);

            gameObj.drkSide[data.monIdTwo].health = result;
        } 

        if (data.minTwo.minType == "light"){
            console.log("The minion being attacked is light");

            gameObj.lghtSide[data.monIdTwo].health = result;
        } 


        console.log(result);
        // Once health is below 0
        /*if (result <= 0) {
            console.log([data.minTwo.name], " has died");
            // Remove minion somehow 

            minDied = delete data.minTwo.this;
            console.log("The minioned died T/F", minDied);
            
            if (minDied == true) {
                // Do thing to destory minion
                console.log("Need to add function to destory minion");
 

            }
        }*/

        io.sockets.emit('gameStatus', gameObj);

        // atkState = {
        //     clickState: 0,
        //     minOne: null,
        //     minTwo: null
        // }
        
    });
    
    socket.on('updateDarkMin', function(data){
        
        // LINE 134 CHANGES THE ATK VALUE OF DARK BOIS
        var result = gameObj.drkSide[data.monster].atk + cardObj.drkSide[data.card].atk // DARK SIDE ATK

        // .card and .monster are from updateObj
        
        console.log(result + " DARK SIDE CHANGED");

        gameObj.drkSide[data.monster].atk = result;
        var result = gameObj.drkSide[data.monster].health + cardObj.drkSide[data.card].health// DARK SIDE ATK



        console.log(result + " DARK SIDE CHANGEd");
        gameObj.drkSide[data.monster].health = result;
        // DARK SIDE HEALTH


        io.sockets.emit('gameStatus', gameObj);
        
    });
    
    socket.on('updateLightMin', function (data) {

        var result = gameObj.lghtSide[data.monster].atk + cardObj.lghtSide[data.card].atk
        // LIGHT SIDE ATTACK 

        console.log(result + " LIGHTSIDE CHANGED");


        gameObj.lghtSide[data.monster].atk = result;
        gameObj.lghtSide[data.monster].health = result;
        io.sockets.emit('gameStatus', gameObj);

    });

    socket.on('updateAttack', function (data) {



    });

});