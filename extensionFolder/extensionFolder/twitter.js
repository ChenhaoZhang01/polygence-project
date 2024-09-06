//variables
let val = 'null';
let globalData = 10;
let timeoutId;
let listener = false;
//start
function start() {
    chrome.storage.local.get(['twitterSetting'], function(result) {
        val= result.twitterSetting || 'def';
        choice(val);
    });
}

//starting function
start();


//logic code
function choice(val) {
    fetch('http://localhost:5000/data')
        .then(response => response.json())
        .then(data => {
        globalData = data;
            console.log('Data received:', data);
        })
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        console.log('data equals ' + globalData);
        if (val === 'def') {
            console.log("Default Function");
            function handleTweetClick(event) {
                console.log("handletweetclick running");
                tweetTextarea = document.querySelector(`span[data-text="true"]`);
                if (globalData == 1) {
                console.log("detecting microaggression...");
                const userConfirmed = confirm("This message contains microaggressions. Are you sure you want to send it?");
                if (!userConfirmed) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                }
                if (globalData == 2) {
                console.log("detecting microaggression...");
                const userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
                if (!userConfirmed) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                }
                if (globalData == 3) {
                console.log("detecting microaggression...");
                const userConfirmed = confirm("This message contains hate speech. Are you sure you want to send it?");    
                if (!userConfirmed) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                }
                else {
                    console.log('no microaggressions detected');
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
                if (globalData == 3) {
                    tweetTextarea.style.color = '8B0000';
                } else if (globalData == 2) {
                    tweetTextarea.style.color = 'red';
                } else if (globalData == 1) {
                    tweetTextarea.style.color = 'red';
                } else {
                    console.log('no text change needed');
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
                            choice(val);
                        }
                    });
                } else {
                    console.log('Tweet text not found.');
                }
            }
            
            if (!listener) {
                window.addEventListener('keydown', function(event) {
                    if (event.key === 'Backspace') {
                        setTimeout(function() {   
                            trackTweet();
                        }, 10);
                    }
                });

                window.addEventListener('keypress', function(event) {
                    setTimeout(function() {
                        trackTweet();
                    }, 10);
                });
                listener=true;
            }
        } else if (val ==='0') {
            console.log("Function 0")
            console.log("Tracking Disabled")

        } else if (val === '1') {
            console.log("Function 1");
            function trackTweet1() {
                const tweetTextarea1 = document.querySelector(`span[data-text="true"]`);
                if (globalData == 3) {
                    tweetTextarea1.style.color = '8B0000';
                } else if (globalData == 2 || 1) {
                    tweetTextarea1.style.color = 'red';
                } else {
                    console.log('no text change needed')
                }
                }
                console.log('Tweet Textarea:', tweetTextarea1);
                if (tweetTextarea1) {
                    const tweetInput1 = tweetTextarea1.innerText;
                    chrome.storage.local.set({ tweetInput1: tweetInput1 }, function() {
                        if (chrome.runtime.lastError) {
                            console.error('Error:', chrome.runtime.lastError);
                        } else {
                            console.log('Tweet saved:', tweetInput1);
                            chrome.runtime.sendMessage({ type: "log", data: tweetInput });
                            chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput});
                            choice(val);
                        }
                    });
                } else {
                    console.log('Tweet text not found.');
                }
            if (!listener) {
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
                listener=true;
            }
        } else if (val === '2') {
            console.log("Function 2")
            function handleTweetClick2(event) {
                console.log("handletweetclick running");
                tweetTextarea2 = document.querySelector(`span[data-text="true"]`);
                if (globalData == 1) {
                    console.log("detecting microaggression...");
                    userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
                    event.preventDefault();
                    event.stopPropagation();
                } else if (globalData == 2) {
                    console.log("detecting microaggression...");
                    userConfirmed = confirm("This message contains microaggressions. Are you sure you want to send it?");
                    event.preventDefault();
                    event.stopPropagation();
                } else if (globalData == 3) {
                    console.log("detecting aggression...");
                    userConfirmed = confirm("This message contains hate speech. Are you sure you want to send it?");
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    console.log("nothing detected...");
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
                if (globalData == 3) {
                    tweetTextarea2.style.color = '8B0000';
                } else if (globalData == 2 || 1) {
                    tweetTextarea2.style.color = 'red';
                } else {
                    console.log('no text change needed')
                }
                console.log('Tweet Textarea:', tweetTextarea2);
                if (tweetTextarea2) {
                    const tweetInput2 = tweetTextarea2.innerText;
                    chrome.storage.local.set({ tweetInput2: tweetInput2 }, function() {
                        if (chrome.runtime.lastError) {
                            console.error('Error:', chrome.runtime.lastError);
                        } else {
                            console.log('Tweet saved:', tweetInput2);
                            chrome.runtime.sendMessage({ type: "log", data: tweetInput });
                            chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput});
                            choice(val);
                        }
                    });
                } else {
                    console.log('Tweet text not found.');
                }
            }


            

            //keydown code
            if (!listener) {
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
                listener = true;
            }
        }
    }, 10);
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