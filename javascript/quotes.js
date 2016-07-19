
//new version


var Qurl="http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30&_jsonp=";
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

    request.send();
    console.log("request sent confirmed");
  });
};

function requestQuote()
{
  var json=[...arguments][0];
  console.log("json",json);
  var json_final=(json.map((x) => {return {"quote":x.content,"author":x.title};} ));
  console.log(json_final);
  return json_final;
}

var quote_content;

$(document).ready(function()
{

    var uniqueuri=Math.random()*(30-1+1);
    var seed=Math.floor(uniqueuri);
    console.log("seed: ",seed);
    var uri=Qurl+'requestQuote'+'&preventCache='+uniqueuri;

    let quotePromise= getNewQuote(uri);
    quotePromise.then((value) => {
      //console.log('success:','requestQuote should have been called',value.response);
      quote_content=eval(value.response);
      //console.log(quote_content);

      $('.quote').html(quote_content[seed]["quote"]);
      $('.quote-author').html(quote_content[seed].author);
    });
    quotePromise.catch((err) => {
      quote_content=err.statusText;
      console.log("Error: ",err);
    });

    $('#new_quote').click(() => {
      seed=Math.floor(Math.random()*30-1+1);
      console.log("seed: ",seed);

      $('.quote').html(quote_content[seed].quote);
      $('.quote-author').html(quote_content[seed].author);
    })


});
