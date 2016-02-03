/* 
Copyright © 2014 Cryptsonic, Inc. All Rights Reserved.
 */

var message_delay = 2000;  // How long to display status messages (in milliseconds)

// Init the form once the document is ready
$( init );


// Initialize the form

function init() {

  // Hide the form initially.
  // Make submitForm() the form's submit handler.
  // Position the form so it sits in the centre of the browser window.
  $('#contact_form').hide().submit( submit_form ).addClass( 'positioned' );

  // When the "Send us an email" link is clicked:
  // 1. Fade the content out
  // 2. Display the form
  // 3. Move focus to the first field
  // 4. Prevent the link being followed

  $('a[href="#contact_form"]').click( function() {
    $('#content').fadeTo( 'slow', .2 );
    $('#contact_form').fadeIn( 'slow', function() {
      $('#sender_name').focus();
    } )

    return false;
  } );
  
  // When the "Cancel" button is clicked, close the form
  $('#cancel').click( function() { 
    $('#contact_form').fadeOut();
    $('#content').fadeTo( 'slow', 1 );
  } );  

  // When the "Escape" key is pressed, close the form
  $('#contact_form').keydown( function( event ) {
    if ( event.which == 27 ) {
      $('#contact_form').fadeOut();
      $('#content').fadeTo( 'slow', 1 );
    }
  } );

}


// Submit the form via Ajax

function submit_form() {
  var contact_form = $(this);

  // Are all the fields filled in?

  if ( !$('#sender_name').val() || !$('#sender_email').val() || !$('#message').val() ) {

    // No; display a warning message and return to the form
    $('#incomplete_message').fadeIn().delay(message_delay).fadeOut();
    contact_form.fadeOut().delay(message_delay).fadeIn();

  } else {

    // Yes; submit the form to the PHP script via Ajax

    $('#sending_message').fadeIn();
    contact_form.fadeOut();

    $.ajax( {
      url: contact_form.attr( 'action' ) + "?ajax=true",
      type: contact_form.attr( 'method' ),
      data: contact_form.serialize(),
      success: submit_finished
    } );
  }

  // Prevent the default form submission occurring
  return false;
}


// Handle the Ajax response

function submit_finished( response ) {
  response = $.trim( response );
  $('#sending_message').fadeOut();

  if ( response == "success" ) {

    // Form submitted successfully:
    // 1. Display the success message
    // 2. Clear the form fields
    // 3. Fade the content back in

    $('#success_message').fadeIn().delay(message_delay).fadeOut();
    $('#sender_name').val( "" );
    $('#sender_email').val( "" );
    $('#message').val( "" );

    $('#content').delay(message_delay+500).fadeTo( 'slow', 1 );

  } else {

    // Form submission failed: Display the failure message,
    // then redisplay the form
    $('#failure_message').fadeIn().delay(message_delay).fadeOut();
    $('#contact_form').delay(message_delay+500).fadeIn();
  }
}
