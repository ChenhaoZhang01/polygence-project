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
    console.log("Input field found and listener attached.");
  } else {
    console.log("Input field not found.");
  }
}

const observer = new MutationObserver(addInputFieldListener);
observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", addInputFieldListener);

function trackMessage() {
    const tweetTextarea = document.querySelector(`span[data-slate-string="true"]`);
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