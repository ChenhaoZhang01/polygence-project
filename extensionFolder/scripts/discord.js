let microaggression = true;

function handleKeyPress(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    if (microaggression) {
      event.preventDefault();
      const userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
      if (!userConfirmed) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
}

function addInputFieldListener() {
  const inputField = document.querySelector('div[role="textbox"]');
  if (inputField) {
    inputField.addEventListener('keydown', handleKeyPress, true);
    console.log("Input field found.");
  } else {
    console.log("Input field not found.");
  }
}

const observer = new MutationObserver(addInputFieldListener);
observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", addInputFieldListener);

function trackMessage() {
    const tweetTextarea = document.querySelector(`span[data-slate-string="true"]`);
    if (microaggression) {
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
                chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Discord message: ' + tweetInput});
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
      }, 20);
  }
});

window.addEventListener('keypress', function(event) {
  console.log("Key pressed"); 
  setTimeout(function() {
      trackMessage();
  }, 20);
});