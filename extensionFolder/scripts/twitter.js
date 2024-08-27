let val = 'null';
chrome.storage.local.get(['twitterSetting'], function(result) {
    val= result.twitterSetting || 'def';
    console.log("Received value:", val);
    choice(val);
});

function choice(val) {
    if (val === 'def') {
        console.log("Default Function");
        function handleTweetClick(event) {
            console.log("handletweetclick running");
            tweetTextarea = document.querySelector(`span[data-text="true"]`);
            if (microaggression) {
            console.log("detecting microaggression...");
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


        function trackTweet() {
            const tweetTextarea = document.querySelector(`span[data-text="true"]`);
            if (microaggression = true) {
                tweetTextarea.style.color = 'red';
            }
            console.log('Tweet Textarea:', tweetTextarea);
            if (tweetTextarea) {
                const tweetInput = tweetTextarea.innerText;
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
    } else if (val ==='0') {
        console.log("Function 0")
        console.log("Tracking Disabled")


    } else if (val === '1') {
        console.log("Function 1");
        function trackTweet1() {
            const tweetTextarea1 = document.querySelector(`span[data-text="true"]`);
            if (microaggression) {
                tweetTextarea1.style.color = 'red';
            }
            console.log('Tweet Textarea:', tweetTextarea1);
            if (tweetTextarea1) {
                const tweetInput1 = tweetTextarea1.innerText;
                chrome.storage.local.set({ tweetInput1: tweetInput1 }, function() {
                    if (chrome.runtime.lastError) {
                        console.error('Error:', chrome.runtime.lastError);
                    } else {
                        console.log('Tweet saved:', tweetInput1);
                        chrome.runtime.sendMessage({ type: "log", data: tweetInput1 });
                        chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput1});
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
                    trackTweet1();
                }, 10);
            }
        });

        window.addEventListener('keypress', function() {
            console.log("Key pressed"); 
            setTimeout(function() {
                trackTweet1();
            }, 10);
        });
    
    } else if (val === '2') {
        console.log("Function 2")
        function handleTweetClick2(event) {
            console.log("handletweetclick running");
            tweetTextarea2 = document.querySelector(`span[data-text="true"]`);
            if (microaggression) {
                console.log("detecting microaggression...");
                userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
                event.preventDefault();
                event.stopPropagation();
            }
            }

        function ButtonListener2() {
        const tweetButton2 = document.querySelector('[data-testid="tweetButtonInline"]');
        if (tweetButton2) {
            tweetButton2.addEventListener('click', handleTweetClick2, true);
            console.log("Tweet button found.");
        } else {
            console.log("Tweet button not found.");
        }
        }
        const observer2 = new MutationObserver(ButtonListener2);
        observer2.observe(document.body, { childList: true, subtree: true });
        document.addEventListener("DOMContentLoaded", ButtonListener2);


        function trackTweet2() {
            const tweetTextarea2 = document.querySelector(`span[data-text="true"]`);
            if (microaggression) {
                tweetTextarea2.style.color = 'red';
            }
            console.log('Tweet Textarea:', tweetTextarea2);
            if (tweetTextarea2) {
                const tweetInput2 = tweetTextarea2.innerText;
                chrome.storage.local.set({ tweetInput2: tweetInput2 }, function() {
                    if (chrome.runtime.lastError) {
                        console.error('Error:', chrome.runtime.lastError);
                    } else {
                        console.log('Tweet saved:', tweetInput2);
                        chrome.runtime.sendMessage({ type: "log", data: tweetInpu2 });
                        chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput2});
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
                    trackTweet2();
                }, 10);
            }
        });

        window.addEventListener('keypress', function(event) {
            console.log("Key pressed"); 
            setTimeout(function() {
                trackTweet2();
            }, 10);
        });
    }
}
//original code
//document.getElementById("InputText").onkeypress = function() {myFunction()};
//function myFunction()
//{
//    message = document.getElementById("InputText").value;
    //document.getElementById("output").innerHTML = message;
    //const url = new URL('http://127.0.0.1:5000/echo');
    //url.searchParams.set('message', message);
    //fetch(url.toString())
    //.then(response => response.text())
    //.then((response) =>
    //{
    //    document.getElementById("output").innerHTML = response;
    //});

//}	
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
// }