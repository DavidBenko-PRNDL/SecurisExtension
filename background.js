chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        url: "https://securis-debug.herokuapp.com"
    });
});