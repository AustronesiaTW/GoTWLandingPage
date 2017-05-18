$(document).ready(function() {
	WebFont.load({
	    google: {
	      families: ['Noto Sans TC', 'Open Sans']
	    }
	  });
	
	i18nHelper.Init();
	//Get browser language 
	var userLang = navigator.language || navigator.userLanguage; 
	var selection = 'en';
	
	$('#dropdown-lang option').each(function(){
		if($(this).data().lang == userLang){
			$(this).attr('selected',true);
			selection = userLang.replace('-','_');		
			$('#mainDiv [lang]').attr('lang',userLang);
		}
	});
	
	i18nHelper.LoadBundles(selection);	

	//Pace on done
	Pace.on('done',function(){
		$('#mainDiv').fadeIn(500);	
	});

});

var i18nHelper = {
	Init: function(){
		$('#dropdown-lang').change(function() {
			var selection = $('#dropdown-lang option:selected').data().lang;
			i18nHelper.LoadBundles(selection.replace('-','_'));
			$('#mainDiv [lang]').attr('lang',selection);
			
			//Bind smartphone size langList click event
			if($('#mainDiv .navbar-toggle:visible').length > 0){
				$('.navbar-toggle').click();
			}			
		});
	},
	LoadBundles: function(lang){
		$.i18n.properties({
			name:'Messages', 
			path:'lib/jquery-i18n/bundle/', 
			mode:'both',
			language:lang, 
			callback: function() {
				i18nHelper.UpdateMessages();
			}
		});
	},
	UpdateMessages: function(){
		$('[data-msg]').each(function(){
        		var msg = $(this).data().msg;
        		$(this).html(eval(msg));
      		});	
	
	}
}


		
