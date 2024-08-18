let microaggression = true; 

function handlePostClick(event) {
  if (microaggression) {
    event.preventDefault(); 
    const userConfirmed = confirm("This message could contain microaggressions. Are you sure you want to send it?");
    if (userConfirmed) {
      event.target.click();
    }
  }
}

function addPostButtonListener() {
  const postButton = document.querySelector('[aria-label="Post"]');
  if (postButton) {
    postButton.addEventListener('click', handlePostClick, true);
    console.log("Post button found.");
  } else {
    console.log("Post button not found.");
  }
}

const observer = new MutationObserver(addPostButtonListener);
observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", addPostButtonListener);







function trackMessage() {
    const tweetTextarea = document.querySelector(`span[data-lexical-text="true"]`);
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