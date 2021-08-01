//client library is loaded in HTML, now we can use io variable herein

const socket = io()

let name;
//to get msg from text-area
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.msg_area')


do {
    name = prompt("Enter your name:")
} while (!name);    //prompt until user give his/her name


textarea.addEventListener('keyup', function(e){

    //only to trigger if event recognised is ENTER key
    if(e.key === 'Enter'){
        sendMessage(e.target.value) //send the msg written in the textarea
    }
})

//logic of how to send the message
function sendMessage(message){

    let msg = {
        user: name,
        message: message.trim() //to trim the extra spaces in textarea
    }

    //now we have to append the msg into the box with username specifying msg type

    appendMessage(msg, 'outgoing_msg')
    textarea.value = "" //as soon as msg is sent, empty the text area
    scrollBottom()

    //send to server via web-socket
    socket.emit('message', msg)     //now this can be listen in server.js
    
}

function appendMessage(msg, type){

    let mainDiv = document.createElement('div') //this is for incoming/outgoing area
    let className = type    //type = incoming_msg/outgoing_msg
    mainDiv.classList.add(className, 'msg') //msg class as mentioned in each message

    //generating the markup <p></p>
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup  //main DIV is properly created

    messageArea.appendChild(mainDiv)
}


//Recieve the messages

socket.on('message', function(msg){
    appendMessage(msg, 'incoming_msg')
    scrollBottom()
})


//as we recieve msgs, automatic scroll happend and we see new msg
function scrollBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}