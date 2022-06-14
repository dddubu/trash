

let dataServer;
let pubKey = "pub-c-c0459111-434c-403a-980e-2eff7fc61d04";
let subKey = "sub-c-e1f3336e-ce21-49d5-a2da-29da7dcd2741";
let secretKey = "sec-c-ZTgyOGY0YTktYThjYS00MzBiLWIwNDItMzM2ZjEwNjJkM2Ex";

let occupancy = 0; 

let channelName = "presenceTest";

let allowMessage = false;

  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Your Name Here",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() {
 
 // make something visible for more people 


 if (occupancy > 2) {
  background(255);


  textSize(20)
  text("dubu </3 u", windowWidth/2, windowHeight/2);


  textSize(400)
  text("</3",300,550);

  allowMessage = false;

 } else if (occupancy > 1) {

  sendTheMessage();
  allowMessage = true;
  
 } else {
  background(255);

  textSize(20);
  text("dubu <3 u", windowWidth/2, windowHeight/2); 
  
  textSize(400)
  text("<3",300,550);
  allowmessage = false;

  }
}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY
    },
  });
}

function readIncoming(inMessage) {

  if (allowMessage == true) { // if there is less than 10 people on the page draw circles then show the messages that are sent. 
 
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }

    
  } 
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

}