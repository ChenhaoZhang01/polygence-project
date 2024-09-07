chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'PRINT_MESSAGE') {
        fetch('http://127.0.0.1:5000/print', {
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

chrome.runtime.onMessage.addListener((message,) => {
    if (message.action === 'requestData') {
        fetch('http://127.0.0.1:5000/data')
            .then(response => response.json())
            .then(data => {
                console.log('Data received:', data);
                const data1 = data.data1;

                chrome.tabs.query({}, (tabs) => {
                    tabs.forEach((tab) => {
                        chrome.tabs.sendMessage(tab.id, { action: 'updateData', data: data1 });
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

