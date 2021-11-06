window.onscroll = function(){
  if(document.documentElement.scrollTop > 900){
      document.querySelector('.go-top-container')
      .classList.add('show');
  }else{
      document.querySelector('.go-top-container')
      .classList.remove('show');
  }
}   

document.querySelector('.go-top-container')
.addEventListener('click', () =>{
  window.scrollTop({
      top: 0,
      behavior: 'smooth',
  });
});

$(function() {
    $('a[href*=#]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
  });