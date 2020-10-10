chrome.storage.sync.get("redirectToGoogle", function(storage) {
 if(storage.redirectToGoogle) {
   chrome.tabs.update({url: "https://google.com"})
  }else{
    chrome.tabs.update({ url: "chrome-search://local-ntp/local-ntp.html" })
  }
})
