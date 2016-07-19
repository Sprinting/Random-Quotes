$(document).ready(function(){
  //$("body").html("hello WOrld!");
  var scl_btn_anim="animated swing";
  $(".social-icons").on('mouseenter',function(){
    $(this).addClass(scl_btn_anim);

  });

  $(".social-icons").on('mouseleave',function(){
    $(this).removeClass(scl_btn_anim);
  });


  var ctrl_btn_anim="animated wobble"
  $(".control-icons").on('click',function(){


      $(this).addClass(ctrl_btn_anim);
      state=true;

  });

  $(".control-icons").on('mouseover',function(){


      $(this).removeClass(ctrl_btn_anim);
      state=true;

  });
  var turi="https://twitter.com/intent/tweet?text=";
  turi+=$('.quote').text();
  $('#tweet_this').click(()=>{turi+=$('.quote').text();
      turi+=' \nby '+ $('.quote-author').text()
      window.open(turi);
      console.log('tweet_url:',' ',turi)
      turi="https://twitter.com/intent/tweet?text=";
    });
});
