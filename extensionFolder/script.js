function trackTweet() {
    const tweetTextarea = document.querySelector('div[aria-label="Tweet text"]');
    if (tweetTextarea) {
        const tweetInput = tweetTextarea.innerText;
        console.log('Captured tweet:', tweetInput);        
        chrome.storage.local.set({ tweetInput: tweetInput }, function() {
            if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError);
            } else {
                console.log('Tweet saved:', tweetInput);
            }
        });
    } else {
        console.log('Tweet textarea not found.');
    }
}

function observeDOMChanges() {
    console.log("stage 0");
    const targetNode = document.body;
    if (targetNode) {
        console.log("stage 1");
        const observer = new MutationObserver((mutations) => {
            console.log("stage 2");
            mutations.forEach((mutation) => {
                console.log("stage 3");
                mutation.addedNodes.forEach((node) => {
                    console.log('Node added:', node);

                    if (node.nodeType === 1) {
                        console.log('Element node detected:', node);

                        if (node.querySelector('div[aria-label="Tweet text"]')) {
                            console.log('Tweet textarea detected by MutationObserver');
                            trackTweet();
                        }
                    } else {
                        console.log('Non element node detected:', node);
                    }
                });
                if (mutation.target) {
                    console.log('Mutation target:', mutation.target);
                    if (mutation.target.querySelector('div[aria-label="Tweet text"]')) {
                        console.log('Tweet textarea detected in mutation target');
                        trackTweet();
                    }
                }
            });
        });
        const config = { childList: true, subtree: true };
        observer.observe(targetNode, config);
        console.log('MutationObserver now observing the DOM.');
    } else {
        console.error('Target node for MutationObserver not available.');
    }
}

document.addEventListener('DOMContentLoaded', observeDOMChanges);
	

//keydown code
//window.addEventListener('keypress',function(event){
//document.addEventListener('keydown', function(event) {
//    console.log("Key pressed: ${event.key}"); 
//    trackTweet(); 
//});

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