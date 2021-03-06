document.getElementById("input").addEventListener("keydown", function(event) {
if (event.keyCode === 13) {
	m = document.getElementById("input").value;
    parse(m);
	
}
});
document.getElementById("chatin").addEventListener("keydown", function(event) {
if (event.keyCode === 13) {
	chat(document.getElementById("chatin").value);
	document.getElementById("chatin").value = "";
}
});


var m;

//Text returned to Console.
var availableCommands = ["type [msg]","pin [msg/none to read]",""]
var glSubCommands = ["background [color]"]
var invalidMsg = ["Invalid command, try again",""]

//// Parsing
var a=0;



function parse(m){
	console.log("Parsing: " + m);
	if(m.substr(0,4) == "help"){
		printm(availableCommands,"green");
	}
	else if(m.substr(0,4) == "type"){
		type(m.substr(5,m.length));
	}
	else if(m.substr(0,3) == "pin"){
		pinmsg(m.substr(3,m.length));
	}
	else{
		invalid();
	}
}


////  Functions


function printm(msg,c){
if(a < msg.length){
	setTimeout(function(){a++;printm(msg);},1000);
	document.getElementById("output").value = msg[a];
	document.getElementById("output").style.color = c;
	if(msg[a]!=""){
	console.log("Returned: " + msg[a]);
	}
}
else{a=0;document.getElementById("input").style.color = "black";}
}

function spaceString(m,after,space){
return m.substr(after,m.length).split(' ')[space]
}



function invalid(){
	printm(invalidMsg,"red");
}

function type(subm){
	var audio = new Audio('keyboard_click.mp3');
	var audio2 = new Audio('keyboard_click.mp3');

	var b = 0;
	var typeloop = setInterval(
	function(){
	if(b < subm.length){
		if(b%2){
				audio.play();
			}
			else{
				audio2.play();
			}
		}
		else{
			console.log("Returned: " + subm + " :typed");
			clearInterval(typeloop);
		}
		b++;
		document.getElementById("output").value = subm.substr(0, b);
	}
	, 150);
}

function chat(msg){
	if(chatMsgs.length <= 10){
		addChat(":: " + msg.substr(0,255));
	}
	else{
		delChat();
		addChat(":: " + msg.substr(0,255));
	}
}

function pinmsg(subm){
	if(subm.substr(0,1) == " "){
		setPin(subm.substr(1,255));
	}
	else{
		getPin();
	}
}

//Database
	var config = {
		apiKey: "AIzaSyDEIx3Lp_UiBOTfJK28hGFiwhVRECDbm-w",
		authDomain: "chriswiztk.firebaseapp.com",
		databaseURL: "https://chriswiztk.firebaseio.com",
		projectId: "chriswiztk",
		storageBucket: "chriswiztk.appspot.com",
		messagingSenderId: "781761041218"
	};
	firebase.initializeApp(config);

var database = firebase.database();

var data = database.ref();
//.on listener, .once to get once
var pinnedmsg;
function getPin(){
	data.once('value', function(snapshot) {
		pinnedmsg = snapshot.val().pin;
		console.log("Returned: " + pinnedmsg);
		document.getElementById("output").value = "Pinned Msg: " + pinnedmsg;
	});
}

function setPin(string) {
	console.log("Set pin.");
  database.ref().set({
    pin: string
  });
}

var chatMsgs = [];


function getChat(){
	data.on('value', function(snapshot) {
		chatMsgs = snapshot.val().chat;
		document.getElementById("chat").value = chatMsgs.join("\n");
	});
}
	getChat();

function addChat(msg){
	chatMsgs.push(msg);
	console.log("Added chat.");
  database.ref().set({
    chat: chatMsgs
  });
}

function delChat(){
	chatMsgs.shift()
}






