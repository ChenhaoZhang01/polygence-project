document.addEventListener('DOMContentLoaded', function() {
    const tweetDisplayDiv = document.getElementById('tweetDisplay');
    const refreshBtn = document.getElementById('refreshBtn');

    chrome.storage.local.get('tweetInput', function(result) {
        console.log("refreshing tweet");
        tweetDisplayDiv.textContent = result.tweetInput || 'No tweet tracked.';
    });

    refreshBtn.addEventListener('click', function() {
        console.log("refreshing tweet");
        chrome.storage.local.get('tweetInput', function(result) {
            tweetDisplayDiv.textContent = result.tweetInput || 'No tweet tracked.';
        });
    });
});