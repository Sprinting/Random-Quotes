//effects
var Qurl="http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&_jsonp=";

function getNewQuote(url)
{
  return new Promise((resolve,reject) => {
    var request =new XMLHttpRequest();
    request.open('GET',url)
    request.onload= () =>{
      if(request.status==200  )
      {

        resolve(request);
        console.log("request resovled");
      } //everything's fine
      else {
        reject(Error(request.statusText));
      }
    };
      setTimeout(request.onerror,5000);
      request.onerror = () =>{ reject(Error("Network Error"));};
      console.log("request","sent");
    request.send();
    console.log("request sent confirmed");
  });
};

function requestQuote()
{
  var json=arguments[0];
  console.log(json);
  console.log(json[0].content,"<--Quote");
  console.log(json[0].title,"<--Author");
  return json;
}



$(document).ready(function()
{

    var quote_content="";
    var uri=Qurl+'requestQuote'+'&preventCache='+Math.random()*(10000-500+1);

    $('#new_quote').click(() => {
      let quotePromise= getNewQuote(uri);
      quotePromise.then((value) => {
        console.log('success:','requestQuote should have been called',value.response);
        quote_content=eval(value.response);
        console.log(quote_content);

        $('.quote').html(quote_content[0].content);
        $('.quote-author').html(quote_content[0].title);
      });
      quotePromise.catch((err) => {
        quote_content=err.statusText;
        console.log("Error: ",err);
      });
    })

    let quotePromise= getNewQuote(uri);
    quotePromise.then((value) => {
      console.log('success:','requestQuote should have been called',value.response);
      quote_content=eval(value.response);
      console.log(quote_content);

      $('.quote').html(quote_content[0].content);
      $('.quote-author').html(quote_content[0].title);
    });
    quotePromise.catch((err) => {
      quote_content=err.statusText;
      console.log("Error: ",err);
    });


});


//effect.js
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
