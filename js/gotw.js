$(document).ready(function() {
	//Pace on done
	Pace.on('done',function(){
		$('#mainDiv').fadeIn(500);	
	});

	i18nHelper.Init();
	//Get browser language 
	var userLang = navigator.language || navigator.userLanguage; 
	var selection = 'en_US';
	
	var lang_list = [];
	
	$('#dropdown-lang option').each(function(){
		if($(this).data().lang == userLang.replace('-','_')){
			$(this).attr('selected',true);
			selection = userLang;		
			$('[lang]').attr('lang',userLang);
		}
	});
	
	i18nHelper.LoadBundles(selection);


});

var i18nHelper = {
	Init: function(){
		$('#dropdown-lang').change(function() {
			var selection = $('#dropdown-lang option:selected').data().lang;
			i18nHelper.LoadBundles(selection);
			$('[lang]').attr('lang',userLang)
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


		
