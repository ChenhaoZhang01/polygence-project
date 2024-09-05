document.addEventListener('DOMContentLoaded', function() {
    const tweetDisplayDiv = document.getElementById('tweetDisplay');
    const refreshBtn = document.getElementById('refreshBtn');
    chrome.storage.local.get('tweetInput', function(result) {
        console.log("refreshing tweet");
        tweetDisplayDiv.textContent = ("Currently Tracking: " + result.tweetInput) || 'No tweet tracked.';
    });

    refreshBtn.addEventListener('click', function() {
        console.log("refreshing tweet");
        chrome.storage.local.get('tweetInput', function(result) {
            tweetDisplayDiv.textContent = ("Currently Tracking: " + result.tweetInput) || 'No tweet tracked.';
        });
    });


    const twitterSelect = document.getElementById('twitterSelect');
    const facebookSelect = document.getElementById('facebookSelect');
    const instagramSelect = document.getElementById('instagramSelect');
    const messengerSelect = document.getElementById('messengerSelect');
    const discordSelect = document.getElementById('discordSelect');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const submitButton = document.getElementById('SubmitButton');
    const inputText = document.getElementById('InputText');

    if (!twitterSelect || !facebookSelect || !instagramSelect || !messengerSelect || !discordSelect || !darkModeToggle || !submitButton || !inputText) {
        console.error('No Element Found');
        return;
    }

    chrome.storage.local.get(['twitterSetting', 'facebookSetting', 'instagramSetting', 'messengerSetting', 'discordSetting', 'darkMode', 'checkedText'], function(result) {
        twitterSelect.value = result.twitterSetting || 'def';
        facebookSelect.value = result.facebookSetting || 'def';
        instagramSelect.value = result.instagramSetting || 'def';
        messengerSelect.value = result.messengerSetting || 'def';
        discordSelect.value = result.discordSetting || 'def';

        if (result.darkMode) document.body.classList.add('dark-mode');
        if (result.checkedText) inputText.value = result.checkedText;

    });

    twitterSelect.addEventListener('change', function() {
        chrome.storage.local.set({ 'twitterSetting': twitterSelect.value });
    });

    facebookSelect.addEventListener('change', function() {
        chrome.storage.local.set({ 'facebookSetting': facebookSelect.value });
    });

    instagramSelect.addEventListener('change', function() {
        chrome.storage.local.set({ 'instagramSetting': instagramSelect.value });
    });

    messengerSelect.addEventListener('change', function() {
        chrome.storage.local.set({ 'messengerSetting': messengerSelect.value });
    });

    discordSelect.addEventListener('change', function() {
        chrome.storage.local.set({ 'discordSetting': discordSelect.value });
    });

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        chrome.storage.local.set({ 'darkMode': document.body.classList.contains('dark-mode') });
    });

    submitButton.addEventListener('click', function() {
        var CheckedText = inputText.value;
        console.log('Submitted', CheckedText);
        chrome.storage.local.set({ 'checkedText': CheckedText });
    });

    resetDefaults.addEventListener('click', function() {
        twitterSelect.value = 'def';
        facebookSelect.value = 'def';
        instagramSelect.value = 'def';
        messengerSelect.value = 'def';
        discordSelect.value = 'def';
        document.body.classList.remove('dark-mode');
        chrome.storage.local.set({
            'twitterSetting': 'def',
            'facebookSetting': 'def',
            'instagramSetting': 'def',
            'messengerSetting': 'def',
            'discordSetting': 'def',
            'darkMode': false
        });
    });
});





















// document.getElementById('twitterSelect').addEventListener('change', () => switchScript('twitter'));
// document.getElementById('facebookSelect').addEventListener('change', () => switchScript('facebook'));
// document.getElementById('instagramSelect').addEventListener('change', () => switchScript('instagram'));
// document.getElementById('messengerSelect').addEventListener('change', () => switchScript('messenger'));
// document.getElementById('discordSelect').addEventListener('change', () => switchScript('discord'));

// function switchScript(platform) {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         let val = null;
//         if (platform == 'twitter') {
//             val = document.getElementById('twitterSelect').value;
//         } else if (platform == 'facebook') {
//             val = document.getElementById('facebookSelect').value;
//         } else if (platform == 'instagram') {
//             val = document.getElementById('instagramSelect').value;
//         } else if (platform == 'messenger') {
//             val = document.getElementById('messengerSelect').value;
//         } else if (platform == 'discord') {
//             val = document.getElementById('discordSelect').value;
//         }
//         const send = (s) => {
//             chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//                 chrome.tabs.sendMessage(tabs[0].id, s);
//             });
//         }
//         send(val);            
// })
// };
        // if (selectedValue === '0') {
        //     scriptPath = `scripts/${platform}0.js`;
        //     ver='0';
        // } else if (selectedValue === '1') {
        //     scriptPath = `scripts/${platform}1.js`;
        //     ver='1';
        // } else if (selectedValue === '3') {
        //     scriptPath = `scripts/${platform}2.js`;
        //     ver='2';
        // } else if (selectedValue === 'def') {
        //     scriptPath = `scripts/${platform}.js`;
        //     ver='Def';
        // }   
        // function removeOldScript(scriptId) {
            
        //     console.log("removing script...");
            
        // }   
        // if (scriptPath) {
        // chrome.scripting.executeScript({
        //     target: {tabId: currentTab.id},
        //     files: [scriptPath]
        // });
        // console.log("script attached")
        // removeOldScript(platform + ver);
        // }
//     });
// }

