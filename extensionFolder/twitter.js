let offsetkey=null;
let microaggression = true;

function handleTweetClick(event) {
  if (microaggression) {
    const userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
    if (!userConfirmed) {
        event.preventDefault();
        event.stopPropagation();
    }
  }
}

function ButtonListener() {
  const tweetButton = document.querySelector('[data-testid="tweetButtonInline"]');
  if (tweetButton) {
    tweetButton.addEventListener('click', handleTweetClick, true);
    console.log("Tweet button found.");
  } else {
    console.log("Tweet button not found.");
  }
}

const observer = new MutationObserver(ButtonListener);
observer.observe(document.body, { childList: true, subtree: true });
document.addEventListener("DOMContentLoaded", ButtonListener);


document.addEventListener('click', function(event) {
    var clickedElement = event.target;
    if (clickedElement.hasAttribute('data-offset-key')) {
        offsetkey = clickedElement.getAttribute('data-offset-key');
        console.log('Data Offset Key:', offsetkey);
    } else {
        console.log('No data-offset-key found on the clicked element.');
    }
});

function trackTweet(offsetkey) {
    const tweetTextarea = document.querySelector(`span[data-offset-key="${offsetkey}"]`);
    console.log('Tweet Textarea:', tweetTextarea);
    if (tweetTextarea) {
        const tweetInput = tweetTextarea.innerText;
        chrome.storage.local.set({ tweetInput: tweetInput }, function() {
            if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError);
            } else {
                console.log('Tweet saved:', tweetInput);
            }
        });
    } else {
        console.log('Tweet text not found.');
    }
}


//keydown code
window.addEventListener('keypress', function(event) {
    console.log("Key pressed"); 
    if (offsetkey) {
        trackTweet(offsetkey);
    } else {
        console.log('No offset key available to track the tweet.');
    }
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