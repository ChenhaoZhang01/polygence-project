window.onload = function(){ 
document.getElementById("SubmitButton").addEventListener("click", myFunction);
function myFunction() {
    message = document.getElementById("InputText").value;
    document.getElementById("output").innerHTML = message;
    const url = new URL('http://127.0.0.1:5000/echo');
    url.searchParams.set('message', message);
    chrome.tabs.create({ url: url.toString() });
   }
};