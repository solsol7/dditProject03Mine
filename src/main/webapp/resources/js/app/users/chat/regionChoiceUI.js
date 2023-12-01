/**
 * 
 */


$(function(){
	

	const nameList=["홍길동","이순신","강감찬","성춘향","이몽룡"];
	
	let cPath = this.body.dataset.contextPath;

	/* 지역 선택했을 때 이벤트 */
	$('.regionBtn').on("click",function(){
		let region = $(this).attr("id");
		console.log(region);
		location.href = `${cPath}/chat/chatRoom?region=${region}`;
	})
	
	/* 채팅방에서 지역선택 클릭했을 때 이벤트 */
	$("#regionChoiceBtn").on("click",function(){
		$(".chat-area[data-tab-idx=1]").attr("style","display:none");
		$(".chat-area[data-tab-idx=2]").attr("style","display:block");
	})
	
	/* 채팅방 - 지역선택 창에서 돌아가기 클릭했을 때 이벤트 */
	$("#chatReturnBtn").on("click",function(){
		$(".chat-area[data-tab-idx=2]").attr("style","display:none");
		$(".chat-area[data-tab-idx=1]").attr("style","display:block");
	})


})