let val = 'null';
let globalData;
let listener = false;

function start() {
  chrome.storage.local.get(['messengerSetting'], function(result) {
      val= result.messengerSetting;
      choice(val);
  });
}
start()

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateData') {
      globalData = message.data;
  }
});
function choice(val){
if (val === 'def') {
      console.log("Default Function");
      function handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
          tweetTextarea = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
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
        if (tweetTextarea) {
          const tweetInput = tweetTextarea.innerText;
          chrome.storage.local.set({ tweetInput: tweetInput}, function() {
              if (chrome.runtime.lastError) {
                  console.error('Error:', chrome.runtime.lastError);
              } else {
                  console.log('Tweet saved:', tweetInput);
                  chrome.runtime.sendMessage({ type: "log", data: tweetInput });
                  chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: tweetInput});
              }
          });
        } else {
          console.log('Tweet text not found.');
        }
      }


      setInterval(() => {
        const tweetTextarea = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
        if (globalData == 3) {
            tweetTextarea.style.color = '8B0000';
        } else if (globalData == 2) {
            tweetTextarea.style.color = 'red';
        } else if (globalData == 1) {
            tweetTextarea.style.color = 'red';
        } else if (globalData == 0) {
            tweetTextarea.style.color = 'white';
        } else if (globalData == 'none') {
            tweetTextarea.style.color = 'white';
        }
        },200);


      //keydown code
      if (!listener) {
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace') {
                setTimeout(function() {   
                    trackMessage();
                }, 10);
            }
            else{

            }
        });

        window.addEventListener('keypress', function() {
            setTimeout(function() {
                trackMessage();
            }, 10);
        });
        listener=true;
    }


  } else if (val ==='0') {
      console.log("Function 0")
      console.log("Tracking Disabled")


  } else if (val === '1') {
      console.log("Function 1");
      function trackMessage1() {
        const tweetTextarea1 = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
        if (tweetTextarea1) {
          const tweetInput1 = tweetTextarea1.innerText;
          chrome.storage.local.set({ tweetInput1: tweetInput1}, function() {
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
      setInterval(() => {
        const tweetTextarea = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
        if (globalData == 3) {
            tweetTextarea.style.color = '8B0000';
        } else if (globalData == 2) {
            tweetTextarea.style.color = 'red';
        } else if (globalData == 1) {
            tweetTextarea.style.color = 'red';
        } else if (globalData == 0) {
            tweetTextarea.style.color = 'white';
        } else if (globalData == 'none') {
            tweetTextarea.style.color = 'white';
        }
        },200);

        if (!listener) {
          window.addEventListener('keydown', function(event) {
              if (event.key === 'Backspace') {
                  setTimeout(function() {   
                      trackMessage1();
                  }, 10);
              }
              else{

              }
          });

          window.addEventListener('keypress', function() {
              setTimeout(function() {
                  trackMessage1();
              }, 10);
          });
          listener=true;
      }
  
  } else if (val === '2') {
      console.log("Function 2")
      function handleKeyPress2(event) {
        if (event.key === "Enter" && !event.shiftKey) {
          tweetTextarea2 = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
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
      setInterval(() => {
        const tweetTextarea = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
        if (globalData == 3) {
            tweetTextarea.style.color = '8B0000';
        } else if (globalData == 2) {
            tweetTextarea.style.color = 'red';
        } else if (globalData == 1) {
            tweetTextarea.style.color = 'red';
        } else if (globalData == 0) {
            tweetTextarea.style.color = 'white';
        } else if (globalData == 'none') {
            tweetTextarea.style.color = 'white';
        }
        },200);

      //keydown code
      if (!listener) {
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace') {
                setTimeout(function() {   
                    trackMessage2();
                }, 10);
            }
            else{

            }
        });

        window.addEventListener('keypress', function() {
            setTimeout(function() {
                trackMessage2();
            }, 10);
        });
        listener=true;
    }
  }
}