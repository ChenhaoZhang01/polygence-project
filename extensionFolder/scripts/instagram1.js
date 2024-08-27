let microaggression = true;

document.addEventListener("DOMContentLoaded", addInputFieldListener);






function trackMessage() {
    const tweetTextarea = document.querySelector(`span.x3jgonx[data-lexical-text="true"]`);
    console.log('Tweet Textarea:', tweetTextarea);
    if (microaggression) {
      tweetTextarea.style.color = 'red';
    }
    if (tweetTextarea) {
        const tweetInput = tweetTextarea.innerText;
        chrome.storage.local.set({ tweetInput: tweetInput }, function() {
            if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError);
            } else {
                console.log('Tweet saved:', tweetInput);
                chrome.runtime.sendMessage({ type: "log", data: tweetInput });
                chrome.runtime.sendMessage({type: 'PRINT_MESSAGE', message: 'Instagram message: ' + tweetInput});
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