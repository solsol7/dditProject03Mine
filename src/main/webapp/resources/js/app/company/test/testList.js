/**
 * 
 */

$(function(){
	
	const cPath = this.body.dataset.contextPath;
	
	/*datepicker - 날짜선택 api*/

	$("#sDate").datepicker({
           dateFormat: 'yy-mm-dd' //달력 날짜 형태
           ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
           ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
           ,changeYear: true //option값 년 선택 가능
           ,changeMonth: true //option값  월 선택 가능                
           ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
           ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
           ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
           ,buttonText: "선택" //버튼 호버 텍스트              
           ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
           ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
           ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
           ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
           ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
           ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
           ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
       });

	$('#sDate').datepicker('setDate', 'today');

	$("#eDate").datepicker({
           dateFormat: 'yy-mm-dd' //달력 날짜 형태
           ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
           ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
           ,changeYear: true //option값 년 선택 가능
           ,changeMonth: true //option값  월 선택 가능                
           ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
           ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
           ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
           ,buttonText: "선택" //버튼 호버 텍스트              
           ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
           ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
           ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
           ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
           ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
           ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
           ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
       });

	$('#eDate').datepicker('setDate', 'today');



	/* 탭 클릭 이벤트 */
	$('.testClass').on("click",function(){
		
		$('#searchForm').find('input[name]').val("");
		
		let testType = $(this).attr('id');
		let order = $(this).data("tabOrder");
		
		$('#searchForm').find('input[name=testType]').val(testType)
		
		$.ajax({
			url:`${cPath}/company/test`,
			type : "get",
			data : $('#searchForm').serialize(),
			dataType :"json",
			success : function(resp){
				console.log(resp);
				result = ``;
				if(resp.dataList.length>0){
					$.each(resp.dataList,function(i,v){
						result += `
									<tr>
										<td><a href="javascript:;" onclick="testDetail('${v.testType}','${v.testNo}');">${v.testTitle}</a></td>
										<td>${v.testDate}</td>
									</tr>
								`;
					})
				}else{
					result += `
							<tr>
		                        <td colspan="2" style="padding: 20">
		                        	검색 결과가 없습니다.
		                        </td>
		                     </tr>
							`;
				}
				$(`.test-tbody[data-list-order=${order}]`).html(result);
				
				let paging = resp.pagingHTML;
				$('#paging').html(paging);
				
			},
			error : function(xhr){
				console.log("상태 : ",xhr.status);
			}
		})	// ajax 끝
		
		$('.tabList').children('.select').removeClass('select')
		$(this).addClass("select")

		$('.test-tbody').attr('style','display:none');
		
		$(`.test-tbody[data-list-order=${order}]`).attr('style','display:');
		

		
	})
	
	/* 페이지 로딩 직후 적성검사 클릭 이벤트 발생 */
	$('.testClass').eq(0).trigger('click');


	/* 시험지 상세보기 페이지 이동 */
	testDetail = (testType,testNo) => {
		location.href=`${cPath}/company/test/${testType}/${testNo}`;
	}
	
	
	/* 페이지 처리 */
	fn_paging = (currentPage) => {
		$('#searchForm').find('input[name=page]').val(currentPage);
		$('#searchForm').submit();
		$('#searchForm').find('input[name=page]').val("");
	}
	
	
	/* 검색버튼 클릭 이벤트 */
	$('#testSearchBtn').on("click",function(){
		inputs = $(this).parents("#searchUI").find(":input[name]");
		$.each(inputs, function(i, v){
			let name = v.name;
			let value = v.value;
			
			$(searchForm).find(`:input[name=${name}]`).val(value);
		})
		$(searchForm).submit();
	})
	
	
	/* 페이지 처리 또는 검색버튼 클릭 시 submit 이벤트 */
	$(searchForm).on("submit",function(event){
		event.preventDefault();
		let data = $(this).serialize();
		$.ajax({
			url:`${cPath}/company/test`,
			type : "get",
			data : $('#searchForm').serialize(),
			dataType :"json",
			success : function(resp){
				console.log(resp);
				result = ``;
				if(resp.dataList.length>0){
					$.each(resp.dataList,function(i,v){
						result += `
									<tr>
										<td><a href="javascript:;" onclick="testDetail('${v.testType}','${v.testNo}');">${v.testTitle}</a></td>
										<td>${v.testDate}</td>
									</tr>
								`;
					})
				}else{
					result += `
							<tr>
		                        <td colspan="2" style="padding: 20">
		                        	검색 결과가 없습니다.
		                        </td>
		                     </tr>
							`;
				}
				
				let testType = $('#searchForm').find('input[name=testType]').val();
				let listOrder = $('#'+testType).data("tabOrder");
				
				$(`.test-tbody[data-list-order=${listOrder}]`).html(result);
				
				let paging = resp.pagingHTML;
				$('#paging').html(paging);
				
			},
			error : function(xhr){
				console.log("상태 : ",xhr.status);
			}
		});	// ajax 끝
	})

	/* 시험지 생성 */
	addAptTest = (testType) => {
		location.href = `${cPath}/company/test/new/${testType}`;
	}
	
	
})

