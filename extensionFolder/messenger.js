let val = 'null';
let data = 'null'

chrome.storage.local.get(['messengerSetting'], function(result) {
    val= result.messengerSetting || 'def';
    console.log("Received value:", val);
    choice(val, data);
});
let microaggression = true;
function choice(val, data) {
  fetch('http://localhost:5000/data')
  .then(response => response.json())
  .then(data => {
      console.log('Data received:', data);
  })
  console.log(data);
    if (val === 'def') {
        console.log("Default Function");
        function handleKeyPress(event) {
          if (event.key === "Enter" && !event.shiftKey) {
            tweetTextarea = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
            if (data == 1) {
            console.log("detecting microaggression...");
            const userConfirmed = confirm("This message contains microaggressions. Are you sure you want to send it?");
            if (!userConfirmed) {
                event.preventDefault();
                event.stopPropagation();
            }
            }
            if (data == 2) {
            console.log("detecting microaggression...");
            const userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
            if (!userConfirmed) {
                event.preventDefault();
                event.stopPropagation();
            }
            }
            if (data == 3) {
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
      }
      
        function addInputFieldListener() {
          const inputField = document.querySelector('div[aria-label="Message"]');
          if (inputField) {
            inputField.addEventListener('keydown', handleKeyPress, true);
          }
        }

        const observer = new MutationObserver(addInputFieldListener);
        observer.observe(document.body, { childList: true, subtree: true });
        document.addEventListener("DOMContentLoaded", addInputFieldListener);

        function trackMessage() {
          const tweetTextarea = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
          console.log('Tweet Textarea:', tweetTextarea);
          if (data == 3) {
            tweetTextarea.style.color = '8B0000';
          } else if (data == 2 || 1) {
            tweetTextarea.style.color = 'red';
          } else {
            console.log('no text change needed')
          }
          console.log('Tweet Textarea:', tweetTextarea);
          if (tweetTextarea) {
            const tweetInput = tweetTextarea.innerText;
            chrome.storage.local.set({ tweetInput: tweetInput}, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error:', chrome.runtime.lastError);
                } else {
                    console.log('Tweet saved:', tweetInput);
                    chrome.runtime.sendMessage({ type: "log", data: tweetInput });
                    chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput});
                    choice(val, data);
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
                    trackMessage();
                }, 10);
            }
        });

        window.addEventListener('keypress', function(event) {
            console.log("Key pressed"); 
            setTimeout(function() {
                trackMessage();
            }, 10);
            });


    } else if (val ==='0') {
        console.log("Function 0")
        console.log("Tracking Disabled")


    } else if (val === '1') {
        console.log("Function 1");
        function trackMessage1() {
          const tweetTextarea1 = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
          console.log('Tweet Textarea:', tweetTextarea1);
          if (data == 3) {
            tweetTextarea1.style.color = '8B0000';
          } else if (data == 2 || 1) {
            tweetTextarea1.style.color = 'red';
          } else {
            console.log('no text change needed')
          }
          console.log('Tweet Textarea:', tweetTextarea1);
          if (tweetTextarea1) {
            const tweetInput1 = tweetTextarea1.innerText;
            chrome.storage.local.set({ tweetInput1: tweetInput1}, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error:', chrome.runtime.lastError);
                } else {
                    console.log('Tweet saved:', tweetInput1);
                    chrome.runtime.sendMessage({ type: "log", data: tweetInput1 });
                    chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput1});
                    choice(val, data);
                }
            });
          } else {
            console.log('Tweet text not found.');
          }
        }

        window.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace') {
                console.log("Backspace key pressed");
                setTimeout(function() {   
                    trackMessage1();
                }, 10);
            }
        });

        window.addEventListener('keypress', function() {
            console.log("Key pressed"); 
            setTimeout(function() {
                trackMessage1();
            }, 10);
        });
    
    } else if (val === '2') {
        console.log("Function 2")
        function handleKeyPress2(event) {
          if (event.key === "Enter" && !event.shiftKey) {
            tweetTextarea2 = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
            if (data == 1) {
                console.log("detecting microaggression...");
                userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
                event.preventDefault();
                event.stopPropagation();
            } else if (data == 2) {
                console.log("detecting microaggression...");
                userConfirmed = confirm("This message contains microaggressions. Are you sure you want to send it?");
                event.preventDefault();
                event.stopPropagation();
            } else if (data == 3) {
                console.log("detecting aggression...");
                userConfirmed = confirm("This message contains hate speech. Are you sure you want to send it?");
                event.preventDefault();
                event.stopPropagation();
            } else {
                console.log("nothing detected...");
            }
        }
      }
      
        function addInputFieldListener2() {
          const inputField2 = document.querySelector('div[aria-label="Message"]');
          if (inputField2) {
            inputField2.addEventListener('keydown', handleKeyPress2, true);
          }
        }
        const observer2 = new MutationObserver(addInputFieldListener2);
        observer2.observe(document.body, { childList: true, subtree: true });
        document.addEventListener("DOMContentLoaded", addInputFieldListener2);
        

        function trackMessage2() {
          const tweetTextarea2 = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
          console.log('Tweet Textarea:', tweetTextarea2);
          if (data == 3) {
            tweetTextarea2.style.color = '8B0000';
          } else if (data == 2 || 1) {
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
                    chrome.runtime.sendMessage({ type: "log", data: tweetInpu2 });
                    chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Twitter message: ' + tweetInput2});
                    choice(val, data);
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
                    trackMessage2();
                }, 10);
            }
        });

        window.addEventListener('keypress', function(event) {
            console.log("Key pressed"); 
            setTimeout(function() {
                trackMessage2();
            }, 10);
        });
    }
}

