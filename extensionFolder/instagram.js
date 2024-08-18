let microaggression = true;

function handleKeyPress(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    console.log("sending message...")
    if (microaggression) {
      event.preventDefault();
      const userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
      if (userConfirmed) {
        const inputField = event.target;
        inputField.value += "\n";
        const keyboardEvent = new KeyboardEvent('keypress', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true
        });
        inputField.dispatchEvent(keyboardEvent);
      }
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
    trackMessage();   
});