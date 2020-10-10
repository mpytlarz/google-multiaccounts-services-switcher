var app = {};

app.createIcons = function(storage, account){
  var accountId = app.getAccountId(account);
  if(!accountId){
    return;
  }

  var iconTemplate = document.createElement('a');
  var iconsWrapper = document.createElement('div');
  account.classList.add('accounts_extension_wrapper');
  iconsWrapper.classList.add('accounts_extension_icons');
  iconTemplate.classList.add('accounts_extension_icon');

  for (key in storage.iconsList) {
    var icon = storage.iconsList[key];
    var newIcon = app.prepareNewIcon(iconTemplate, icon, accountId, storage.openTargetBlank);
    if(newIcon){
      iconsWrapper.appendChild(newIcon);
    }
  }

  app.manageIconsWrapperSize(iconsWrapper.childElementCount, iconsWrapper, account);

  account.appendChild(iconsWrapper);
}

app.prepareNewIcon = function(iconTemplate, iconParams, accountId, openTargetBlank){
  if(!iconParams.show){
    return;
  }
  var newIcon = iconTemplate.cloneNode(true);
  newIcon.style.backgroundPosition = "0 " + iconParams.position;
  newIcon.href = iconParams.href.replace('[ID]', accountId);
  if(openTargetBlank){
    newIcon.target = "_blank";
  }
  if(iconParams.customCss){
    for(key in iconParams.customCss){
      newIcon.style[key] = iconParams.customCss[key];
    }
  }

  return newIcon;
}

app.manageIconsWrapperSize = function(iconsCount, iconsWrapper, account){
  if(iconsCount > 7){
    iconsWrapper.classList.add('accounts_extension_icons_large');
    account.classList.add('accounts_extension_wrapper_large');
  }else{
    iconsWrapper.classList.remove('accounts_extension_icons_large');
    account.classList.remove('accounts_extension_wrapper_large');
  }
}

app.setDefaultIconsList = function(){
  chrome.storage.sync.set({ iconsList: config.defaultIconsList });
}

app.syncConfig = function(callback){
  chrome.storage.sync.get(["iconsList", "openTargetBlank"], callback);
}

app.getAccountId = function(account){
  var host = window.location.host;
  var accountHref = account.href;
  if(!accountHref){
    return false;
  }
  switch(host){
    case 'mail.google.com':
      var accountId = accountHref.split('/')[5];
    break;
    case 'drive.google.com':
      var accountId = accountHref.split('authuser=')[1];
      accountId = accountId.split('&')[0]
    break;
    default:
      var accountId = accountHref.split('authuser=')[1];
    break;
  }
  if(parseInt(accountId) != accountId){
    return false;
  }

  return accountId;
}

app.removeIcons = function(){
  var icons = document.getElementsByClassName('accounts_extension_icon');
  while (icons.length > 0) icons[0].remove();
}

app.run = function(){
    app.removeIcons();
    app.syncConfig(function(storage){
      setTimeout(function(){
        var accounts = document.getElementsByClassName('gb_Qb');
        for(key in accounts){
          app.createIcons(storage, accounts[key]);
        }
      }, 500);
    })

}
