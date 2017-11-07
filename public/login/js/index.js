$('input[type="submit"]').mousedown(function(){
  $(this).css('background', '#2ecc71');
});
$('input[type="submit"]').mouseup(function(){
  $(this).css('background', '#1abc9c');
});

$('#signinform').click(function(){
  $('.signin').fadeToggle('slow');
  $(this).toggleClass('green');
});


$('#signupform').click(function(){
  $('.signup').fadeToggle('slow');
  $(this).toggleClass('green');
});




$(document).mouseup(function (e)
{
    var container = $(".signin");
    var container2 = $(".signup");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
        $('#signinform').removeClass('green');
    }

    if (!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container2.hide();
        $('#signupform').removeClass('green');
    }
});
