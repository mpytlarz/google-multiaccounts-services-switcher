var trigger = document.getElementsByClassName('gb_Ia');
if(trigger.length){
  trigger[0].addEventListener("click", app.run);
}

app.syncConfig(function(storage){
  if(!storage.iconsList){
    app.setDefaultIconsList();
  }
})
