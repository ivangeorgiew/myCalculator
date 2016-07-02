$(document).ready(function() {
  var store = '',
      ans = '',
      equalWasClicked = false,
      dotWasClicked = false,
      operatorWasClicked = false;

  $('.ac').on('click', function(){
    dotWasClicked = false;

    $('.output').empty();
    store = '';

    $('.store').empty().append(store);
  });

  $('.c').on('click', function(){
    dotWasClicked = false;
    
    if(store !== '')
      store = store.slice(0, -($('.output').text().length));

    $('.output').empty();

    $('.store').empty().append(store);
  });
  
  $('.nums').on('click', function(){
    operatorWasClicked = false;
    var value = $(this).text(); 

    if(equalWasClicked){
      $('.output').empty();
      equalWasClicked = false;
    }
    
    if(ans === '' || $('.output').text() !== ans.toString()){
      store += value;
      $('.output').append(value);
    }

    $('.store').empty().append(store);
  });

  $('.operators').on('click', function(){
    dotWasClicked = false;
    var value = $(this).text();
    
    if($('.output').is(':empty') === false){
      if(store !== '' && !operatorWasClicked){

        if($('.output').text().slice(0, 1) === '-')
          store += ')';

        store += value;
        $('.output').empty();
        operatorWasClicked = true;
      }
    }
    else if($(this).hasClass('minus') === true){
      store += '(' + value;
      $('.output').append(value);
    }

    $('.store').empty().append(store);
  });

  $('.ans').on('click', function(){
    dotWasClicked = false;

    if((ans !== '' && $('.output').is(':empty')) || equalWasClicked === true){
      operatorWasClicked = false;
      equalWasClicked = false;

      if(ans.toString().slice(0, 1) === '-'){
        ans = '(' + ans + ')';
      }

      $('.output').empty().append(ans);
      store += ans;

      if(ans.toString().includes('.'))
        dotWasClicked = true;
    }

    $('.store').empty().append(store);
  });

  $('.dot').on('click', function(){
    var value = $(this).text();

    if(store !== '' && dotWasClicked === false && $('.output').text().slice(-1) !== ')'){
      store += value;
      $('.output').append(value);

      operatorWasClicked = true;
      dotWasClicked = true;
    }

    $('.store').empty().append(store);
  });

  $('.equal').on('click', function(){
    operatorWasClicked = false;
    dotWasClicked = false;

    var lastChar = store.slice(-1);
    var syms = ['*', '/', '+', '-', '%'];
    var notEq = false;
    for(var i = 0; i < syms.length; i++){
      if(lastChar === syms[i])
        notEq = true;
    }

    if(notEq)
      store = store.slice(0, -1);

    if($('.output').text().slice(0, 1) === '-' && $('.output').text() !== ans.toString())
      store += ')'; 

    if(equalWasClicked === false){
      if(eval(store).toString() === 'Infinity' || eval(store).toString() === '-Infinity' || eval(store).toString() === 'NaN'){
        $('.output').empty().append('NaN');
        ans = '';
        store = '';
        equalWasClicked = true;
      }
      else{
        $('.output').empty().append(eval(store).toString());
        ans = eval(store);
        store = '';
        equalWasClicked = true;
        $('.ans').trigger('click');
      }
    }
    
    $('.store').empty().append(store);
  });
});
