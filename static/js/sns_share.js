var SNS = function(){
	var pin_page = false;
	var snsObjList = [];
	var main_url, site_name, subject, content, image_url, link_url, security_link_url;
	var api_url;
	var kakao_loaded = false;
	var kakao_message_template_id;

	var share_type;
	var social = {};
	var additional = {};

	function SnsObjects(){
		this.name = "";
		this.show = true;
		this.order = 0;
		this.iconClass = "";
		this.type = "";
	}




	var init = function(d){
		// 상품&예약 상세페이지 데이터는 고정
		if(pin_page) return false;

		var data = d;

		if (data.kakao_api_key !== undefined){
			loadKakaoApi(data.kakao_api_key);
			kakao_message_template_id = data.kakao_message_template_id;
		}

		main_url = data._main_url;
		site_name = data._site_name;
		subject = data._subject;
		content = data._body === null ? '' : makeShareContent(data._body);
		image_url = data._img;
		link_url = data._post_url;
		security_link_url = data._security_post_url;
		api_url = "https://sns.imweb.me/?url=";

		social = data._social;
		additional = data._additional;
		share_type = data._share_type;
		if(data._pin_page != undefined){
			pin_page = true;
		}
	};

	var makeShareContent = function(s){
		s = removeHtmlTag(s);

		// 공유하기에 보이는 내용에서 치환
		s = s.replace(/&nbsp;/ig, " ");
		s = s.replace(/&lt;/ig, "<");
		s = s.replace(/&gt;/ig, ">");


		//글자수가 너무 길때 처리 - 공유하기 권장 110글자
		var content_max_len = 110;
		s = (s.length > content_max_len)? s.substring(0,content_max_len) : s;
		return s;
	};

	//SNS공유 초기설정
	//var snsInit = function(_main_url, _site_name, _subject, _content, _link_url, _security_link_url, _image){
	//
	//	try{
	//		if(Kakao) Kakao.init('63e1a2ee956b3aa85ca51663ce4caccb');
	//	}catch(e){
	//
	//	}
	//
	//
	//	main_url = _main_url;
	//	site_name = _site_name != "" ? "[" + _site_name + "]" : "";
	//	api_url = "https://sns.imweb.me/?url=";
	//	subject = _subject;
	//	content = _content;
	//	image_url = _image;
	//	link_url = _link_url;
	//	security_link_url = _security_link_url;
	//};




	var getDefaultHtml = function(){

    const snsList = [];
		for(var index in snsObjList){
			const snsObj = snsObjList[index];
			if(!snsObj.show) continue;
      snsList.push(`
        <li role='' class='${snsObj.iconClass}'>
          <a href='javascript:;' onclick="SNS.setSnsApi('${snsObj.type}')\">${snsObj.name}</a>
        </li>
      `)
		}
    const html = `
      <div class='modal-header text-basic'>
        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><i class='btl bt-times'></i></button>
        <h4 class='modal-title'>${LOCALIZE.버튼_공유하기()}</h4>
        </div>
        <div class='modal-body text-basic'>
        <div class='social-btn'>
        <ul>
          ${snsList.join('')}
        </ul>
        </div>
        <div class='url-copy holder'>
          <div class='form-control-line'>
            <input type='text' id='sns_copy_url' class='_sns_copy_url form-control' value='${link_url}' readonly>
            <button type='button' class='_sns_copy_btn sns_copy_btn btn btn-default' onclick=\"SNS.copyToClipboard()\" data-clipboard-target='._sns_copy_url'>${LOCALIZE.버튼_복사()}</button>
          </div>
        </div>
        <div id='copy_complete' class='copy_complete text-center'></div>
      </div>
    `;
		return html;
	};

	var copyToClipboard = function(){
		$('#sns_copy_url').select();
		document.execCommand("Copy");
		$('#copy_complete').text(LOCALIZE.설명_URL이복사되었습니다());
		$('#copy_complete').addClass('copied');
		setTimeout(function () {
			$('#copy_complete').removeClass('copied');
		},4000);
	};

	var showDefalutSnsShareList = function(){
		//snsInit(_main_domain, _site_name, _subject, _content, _link_url, _security_link_url, _image);
		setSnsObj();
		var html = $(getDefaultHtml());
		$.cocoaDialog.open({type : 'post_social', custom_popup : html});
	};


	var setSnsApi = function(type){
		switch(type){
			case 'kakaotalk':
				shareKakaoTalk();
				break;
			case 'kakaostory':
				shareKakaoStory();
				break;
			case 'line':
				shareLine();
				break;
			case 'band':
				shareBand();
				break;
			case 'naver':
				shareNaver();
				break;
			case 'facebook':
				shareFacebook();
				break;
			case 'twitter':
				shareTwitter();
				break;
			case 'instagram':
				shareInstagram();
				break;
		}

	};


	/***
	 * 카카오톡 공유하기
	 * https://developers.kakao.com/docs/latest/ko/message/js
	 */


	/***
	 * 카카오스토리 공유하기
	 * https://developers.kakao.com/docs/js/kakaostory-share
	 */


	/***
	 * 카카오스토리 소식받기 버튼 추가하기
	 */
	var crateKakaoStoryNewsBtn = function(){
		Kakao.Story.createFollowButton({
			container : '#kakaostory-follow-button',
			id : kakao_id
		});
	};


	/***
	 * 라인 공유하기
	 */


	/***
	 * 밴드 공유하기
	 */


	function fixedEncodeURIComponent(str) {
		return encodeURIComponent(str).replace(/[\.]/g, function(c) {     return '%' + c.charCodeAt(0).toString(16);   });
	}



	/***
	 * 페이스북 공유하기
	 */


	/***
	 * 트위터 공유하기
	 */


	/***
	 * 인스타그램 공유하기
	 */
	var shareInstagram = function(){
		if(IS_MOBILE){

		}else{

		}
	};

	var shareSnsMetatag = function(type){

		switch(type){
			case 'naver':
				window.open("http://share.naver.com/web/shareView.nhn?url=" + encodeURI(encodeURIComponent(location.href)) + "&title=" + encodeURIComponent(subject));
				break;
			case 'facebook':
				window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href));
				break;
			case 'twitter':
				window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(subject) + "&url=" + encodeURIComponent(location.href));
				break;
			default:
				alert(LOCALIZE.설명_공유에실패하였습니다());
				break;
		}
	};

	return {
		showDefalutSnsShareList : function(_main_url, _site_name, _subject, _content, _link_url, _security_link_url, _image){
			return showDefalutSnsShareList(_main_url, _site_name, _subject, _content, _link_url, _security_link_url, _image);
		},
		setSnsApi : function(_type){
			return setSnsApi(_type);
		},
		shareKakaoTalk : function(_type){
			return shareKakaoTalk(_type);
		},
		shareKakaoStory : function(){
			return shareKakaoStory();
		},
		shareLine : function(){
			return shareLine();
		},
		shareBand : function(){
			return shareBand();
		},
		shareNaver : function(){
			return shareNaver();
		},
		shareFacebook : function(){
			return shareFacebook();
		},
		shareTwitter : function(){
			return shareTwitter();
		},
		copyToClipboard : function(text){
			return copyToClipboard(text);
		},
		loadKakaoApi : function(key){
			loadKakaoApi(key);
		},
		init : function(d){
			return init(d);
		}
	};

}();