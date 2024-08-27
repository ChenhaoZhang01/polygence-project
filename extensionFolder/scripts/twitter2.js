

function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      if (microaggression) {
          userConfirmed = confirm("Message Blocked because of Microaggression Detected");
          event.preventDefault();
          event.stopPropagation();
        }
    }
}

function ButtonListener() {
  tweetButton = document.querySelector('[data-testid="tweetButtonInline"]');
  if (tweetButton) {
    tweetButton.addEventListener('click', handleTweetClick, true);
    console.log("Tweet button found.");
  } else {
    console.log("Tweet button not found.");
  }
}

observer.observe(document.body, { childList: true, subtree: true });
document.addEventListener("DOMContentLoaded", ButtonListener);


function trackTweet() {
    tweetTextarea = document.querySelector(`span[data-text="true"]`);
    if (microaggression) {
        tweetTextarea.style.color = 'red';
    }
    console.log('Tweet Textarea:', tweetTextarea);
    if (tweetTextarea) {
        tweetInput = tweetTextarea.innerText;
        chrome.storage.local.set({ tweetInput: tweetInput }, function() {
            if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError);
            } else {
                console.log('Tweet saved:', tweetInput);
                chrome.runtime.sendMessage({ type: "log", data: tweetInput });
                chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput});
            }
        });
    } else {
        console.log('Tweet text not found.');
    }
}


  

//keydown code
window.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        console.log("Backspace key pressed");
        setTimeout(function() {   
            trackTweet();
        }, 10);
    }
});

window.addEventListener('keypress', function(event) {
    console.log("Key pressed"); 
    setTimeout(function() {
        trackTweet();
    }, 10);
});

//original code
//document.getElementById("InputText").onkeypress = function() {myFunction()};
function myFunction()
{
    message = document.getElementById("InputText").value;
    document.getElementById("output").innerHTML = message;
    const url = new URL('http://127.0.0.1:5000/echo');
    url.searchParams.set('message', message);
    //fetch(url.toString())
    //.then(response => response.text())
    //.then((response) =>
    //{
    //    document.getElementById("output").innerHTML = response;
    //});

}	
//window.onload = function()
//{
//    document.getElementById("SubmitButton").addEventListener("click", myFunction);
//    function myFunction()
//    {
//        message = document.getElementById("InputText").value;
//        document.getElementById("output").innerHTML = message;
//        const url = new URL('http://127.0.0.1:5000/echo');
//        url.searchParams.set('message', message);
//        fetch(url.toString())
//        .then(response => response.text())
//        .then((response) =>
//        {
//            console.log(response);
//            document.getElementById("output").innerHTML = response;
//        });
//    };
//}