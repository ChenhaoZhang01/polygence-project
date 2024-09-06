chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PRINT_MESSAGE') {
        fetch('http://localhost:5000/print', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: request.message }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
});

