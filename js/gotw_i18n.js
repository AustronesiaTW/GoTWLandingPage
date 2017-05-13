$(document).ready(function() {
	
	loadBundles('en_US');	
	
	$('#dropdown-lang').change(function() {
	var selection = $('#dropdown-lang option:selected').data().lang;
	loadBundles(selection != 'browser' ? selection : null);
	});
	
	$('.bootstrap-select>.dropdown-menu a').click(function(){
		$('.navbar-toggle')[0].click();
	});
	
});

function loadBundles(lang) {
	jQuery.i18n.properties({
		name:'Messages', 
		path:'lib/jquery-i18n/bundle/', 
		mode:'both',
		language:lang, 
		callback: function() {
			updateMessages();
		}
	});
}
		
function updateMessages() {
      $('[data-msg]').each(function(){
        var msg = $(this).data().msg;
        $(this).html(eval(msg));
      });	
}
