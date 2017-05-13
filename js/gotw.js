$(document).ready(function() {
	i18nHelper.Init();
	//Get browser language 
	var userLang = navigator.language || navigator.userLanguage; 
	
	var lang_list = [];
	
	$('#dropdown-lang option').each(function(){
		lang_list.push($(this).data().lang);
	});
	
	if($.inArray(userLang,lang_list)){
		$('#dropdown-lang option[data-lang="' + userLang + '"]').attr("selected",true);
		i18nHelper.LoadBundles(userLang);
	}else{
		i18nHelper.LoadBundles('en_US');
	}		
	
});

var i18nHelper = {
	Init: function(){
		$('#dropdown-lang').change(function() {
			var selection = $('#dropdown-lang option:selected').data().lang;
			i18nHelper.LoadBundles(selection);
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


		
