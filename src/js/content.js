app.syncConfig(function(storage){
  if(!storage.iconsList){
    app.setDefaultIconsList();
  }
})

setTimeout(function(){
  console.log('trigger found');
  var trigger = document.getElementsByClassName('gb_Ia');
  if(trigger.length){
    trigger[0].addEventListener("click", app.run);
  }
}, 100);
