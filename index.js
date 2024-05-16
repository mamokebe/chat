var countTx = 0, countRx = 0, id = 'user_' + Math.random();
  (function () {
    var pubnub = new PubNub({publishKey: 'demo', subscribeKey: 'demo', userId: id}); // Your PubNub keys here. Get them from https://dashboard.pubnub.com.
    var box = document.getElementById("outputDiv"), input = document.getElementById("input"), channel = '10chat';
    send=document.getElementById("send"), channel = '10chat';
    pubnub.subscribe({channels: [channel]}); // Subscribe to a channel.
    pubnub.addListener({
      message: function (m) {
        box.innerHTML += newRow(m.message, m.publisher);
        box.scrollTop = box.scrollHeight;
      }
    });
    function sendmessage(){
      input.addEventListener('keypress', function (e) {
        (e.keyCode || e.charCode) === 13 && input.value != "" && pubnub.publish({ // Publish new message when enter is pressed. 
          channel: channel, message: input.value, x: (input.value = '')
        });
      });
    }
    send.addEventListener('click', (e) => {
      input.value != "" && pubnub.publish({ // Publish new message when enter is pressed. 
        channel: channel, message: input.value, x: (input.value = '')
      });
    })
    sendmessage();
  })();
  
  // End count: lines of code to create a chat app with the PubNub SDK. 

  hljs.highlightAll();

  function newRow(m, publisher) {
    var date = "<br><span class='messageTime'>" + new Date().toLocaleString() + "</span>";
    var you = "";
    var messageClass = "messageThem";
    var message = ('' + m).replace(/[<>]/g, '');

    if (id === publisher) {
      you = "<span class='youText'> (You)</span>";
      messageClass = "messageYou"
      // Interactive Demo only
      actionCompleted({action: 'Send a message'});
      countTx++;
      if (countTx == 5) {
        // Interactive Demo only
        actionCompleted({action: 'Send 5 messages', debug: true});
      }
    }
    else {
      // Interactive Demo only
      actionCompleted({action: 'Open the app in another tab and receive a message'});
      countRx++;
      if (countRx == 3) {
        // Interactive Demo only
        actionCompleted({action: 'Receive 3 messages', debug: true});
      }
    }
    return "<div class='" + messageClass + "'>" + message + you + date + "</div>"
 }