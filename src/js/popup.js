var extraConfigFields = function(){
  var redirectCheckbox = document.getElementById("redirectToGoogle");
  var openTargetBlank = document.getElementById("openTargetBlank");
  var reset = document.getElementById("resetToDefaults");

  chrome.storage.sync.get("redirectToGoogle", function(storage) {
    redirectCheckbox.checked = storage.redirectToGoogle;
  });
  chrome.storage.sync.get("openTargetBlank", function(storage) {
    openTargetBlank.checked = storage.openTargetBlank;
  });

  redirectCheckbox.addEventListener("click", function() {
   chrome.storage.sync.set({ redirectToGoogle: redirectCheckbox.checked });
  });
  openTargetBlank.addEventListener("click", function() {
   chrome.storage.sync.set({ openTargetBlank: openTargetBlank.checked });
  });
  reset.addEventListener("click", function() {
    chrome.storage.sync.set({ iconsList: config.defaultIconsList, redirectToGoogle: true, openTargetBlank: false }, function(){
      runPopup();
    });
  });
}

var iconsFields = function(){
  chrome.storage.sync.get("iconsList", function(storage) {
    var icons = document.getElementsByClassName("iconCheckbox");
    for(key in icons){
      var icon = icons[key];
      if(!icon){
        continue;
      }
      var iconName = icon.name;
      icon.checked = storage.iconsList[iconName].show;

      icon.addEventListener("click", function(icon) {
       storage.iconsList[icon.srcElement.name].show = icon.srcElement.checked;
       chrome.storage.sync.set({ iconsList: storage.iconsList });
     });
    }
  });
}

var runPopup = function(){
  extraConfigFields();
  iconsFields();
};

document.addEventListener('DOMContentLoaded', runPopup);
