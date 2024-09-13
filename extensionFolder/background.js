chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'PRINT_MESSAGE') {
        fetch('http://127.0.0.1:5000/print', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: request.message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received: ', data.label);
            const data1 = data.label;
            console.log('Updated Data: ', data1);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'updateData', data: data1 });
                }
            });
        })
    }
});