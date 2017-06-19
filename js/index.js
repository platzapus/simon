$(document).ready(function(){
  var greenSound = document.getElementById("aud1"); 
  var redSound = document.getElementById('aud2');
  var yellowSound = document.getElementById('aud3');
  var blueSound = document.getElementById('aud4');
  var temp = [];
  var pattern = [];
  var step = 19;
  var userStep = 0;
  var count = 0;
  var countj = 0;
  var userPattern = [];
  var strict = 'off';
  
  $('.colorBox').addClass('unclickable');
  
  function setPattern(){
    for(i=0;i<20;i++){
      temp[i] = Math.floor(Math.random() * 4);
      switch(temp[i]){
        case 0: 
          pattern[i] = 'green';
          break;
        case 1:
          pattern[i] = 'red';
          break;
        case 2:
          pattern[i] = 'yellow';
          break;
        case 3:
          pattern[i] = 'blue';
          break;
      }
    }
  }
  setPattern();
  $('#center').text(step);
  
  $('#start').click(function(){
    setTimeout(function(){$('.colorBox').removeClass('unclickable')},1700);
    playPattern(step);
    console.log(pattern);
  })
  
function playPattern(currentStep){
  setTimeout(function(){
    if( currentStep < 21){
      if(countj < currentStep){
        lightUp(pattern[countj]);
        countj++;
        playPattern(currentStep);
      }
    }
  },900)
  }
  
  $('.colorBox').click(function(){
   switch(this.id){
     case 'green':
       lightUp('green');
       break;
     case 'red':
       lightUp('red');
       break;
     case 'yellow':
       lightUp('yellow');
       break;
     case 'blue':
       lightUp('blue');
       break;
   }
   userPattern.push(this.id);
   userStep++;
   console.log(pattern.slice(0,step));
   console.log(userPattern);
   checkPattern();
   //If userArray.length == targetArray.length, check if arrays are identical (not necessary if every previous entry is checked correctly)
  });
  
  $('#strict').click(function(){
    if(strict == 'off'){
      strict = 'on';
      console.log('here');
      $('#strict').removeClass('strictOff').text('Strict Mode: On!');
    }
    else if(strict == 'on'){
      strict = 'off';
      console.log('also here');
      $('#strict').addClass('strictOff').text('Strict Mode: Off!');
    }
  });
  
  $('#reset').click(reset);

  function checkPattern(){
    var count = 0;
    var temp = pattern.slice(0,step);
    for(var i=0;i<userStep;i++){
      if(userPattern[i] != temp[i]){
        patternFailed();
        return;
      }
      else{
        count++;
        if(count == step){
          patternMatched();
          return;
        }
      }
    }
  }
  function patternMatched(){
    step++;
    setTimeout(function(){lightUp('blue')},1000);
    setTimeout(function(){lightUp('yellow')},1250);
    setTimeout(function(){lightUp('red')},1500);
    setTimeout(function(){lightUp('green')},1750);
    $('#center').text(step);
    
    if(step > 20){
      $('#center').text('Win!');
    }
    userPattern = [];
    countj = 0; //(Reset for next playPattern)
    userStep = 0;
    $('.colorBox').addClass('unclickable');
    setTimeout(function(){playPattern(step)},3000);
    setTimeout(function(){$('.colorBox').removeClass('unclickable')},3000 + step*900);
  }
  
  function patternFailed(){
    if(strict == 'on'){
      step =1;
      $('#center').text(step);
    }
    userStep = 0;
    setTimeout(function(){lightUp('green')},1000);
    setTimeout(function(){lightUp('red')},1250);
    setTimeout(function(){lightUp('yellow')},1500);
    setTimeout(function(){lightUp('blue')},1750);
    $('#center').text(step);
    userPattern = [];
    countj = 0;
    $('.colorBox').addClass('unclickable');
    setTimeout(function(){playPattern(step)},3000);
    setTimeout(function(){$('.colorBox').removeClass('unclickable')},4000 + step*900); // Accounts for 4 seconds + the expected runtime of the pattern for the current step.
  }
  
  function lightUp(color){
      $('#'+color).removeClass(color+'1').addClass(color+'2');
    
      switch (color){
        case 'green':
          greenSound.play();
          break;
        case 'red':
          redSound.play();
          break;
        case 'yellow':
          yellowSound.play();
          break;
        case 'blue':
          blueSound.play();
          break;
                   }
      setTimeout(function(){
        $('#'+color).addClass(color+'1').removeClass(color+'2');
      },750);

  }
  
  function reset(){
    pattern = [];
    temp = [];
    userPattern = [];
    step = 1;
    userStep =0;
    countj = 0;
    setPattern();
    $('#center').text(step);
  }
});