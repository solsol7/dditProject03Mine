package kr.or.ddit.company.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.company.service.RecruitProcedureService;
import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.paging.BootstrapPaginationRenderer;
import kr.or.ddit.paging.vo.PaginationInfo;

@Controller
@RequestMapping("/company")
public class RecruitProcedureController {
	
	@Inject
	private RecruitProcedureService service;
	
	/* 채용공고 목록 조회 */
	@GetMapping("recruitListUI")
	public String recruitListUI() {
		return "company/recruit/recruitList";
	}
	
	@ResponseBody
	@GetMapping("recruit")
	public PaginationInfo<Map<String, Object>> recruitListRetrieve(
			@RequestParam Map<String, Object> variousCondition
			,@RequestParam(value = "page", defaultValue = "1", required = false) int currentPage
	) {
		PaginationInfo<Map<String, Object>> paging = new PaginationInfo<>(3,5);
		paging.setVariousCondition(variousCondition);
		paging.setCurrentPage(currentPage);
		
		paging.setRenderer(new BootstrapPaginationRenderer());
		
		service.retrieveRecruitList(paging);
		return paging;
	}
	
	/* 채용공고 상세 조회 */
	@GetMapping("recruit/{rcrtNo}/{rprocOrder}")
	public String recruitViewRetrieve(
			@PathVariable String rcrtNo
			, @PathVariable int rprocOrder
			, Model model
	) {
		// rcrtNo 의 채용절차 정보 가져오기 -> forEach문 돌려서 채용절차정보만큼 탭 만들기, rprocOrder에 해당하는 탭에 select 주기
		List<RProcedureVO> dataList = service.retrieveRecruitProcedure(rcrtNo);
		
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("rcrtNo", rcrtNo);
		paramMap.put("rprocOrder", rprocOrder);
		RProcedureVO currProcedureInfo = service.retrieveCurrentProcedureInfo(paramMap);
		
		model.addAttribute("dataList",dataList);
		model.addAttribute("currProcedureInfo",currProcedureInfo);
		
		return "company/recruit/recruitView";
	}
	
	@ResponseBody
	@GetMapping("recruit/ajax/{rcrtNo}/{rprocOrder}")
	public PaginationInfo<AProcedureVO> recruitViewData(
			@PathVariable String rcrtNo
			, @PathVariable int rprocOrder
			, @RequestParam(value="page", defaultValue = "1", required = false) int currentPage
			, @RequestParam Map<String, Object> variousCondition
	) {
		// 채용절차유형에 따라 service에서 실행할 메소드 달라짐
		
		PaginationInfo<AProcedureVO> paging = new PaginationInfo<>();
		paging.setCurrentPage(currentPage);
		variousCondition.put("rcrtNo", rcrtNo);
		variousCondition.put("rprocOrder", rprocOrder);
		paging.setVariousCondition(variousCondition);
		paging.setRenderer(new BootstrapPaginationRenderer());
		
		service.retrieveApplicantList(paging);
		
		return paging;
		
	}
	
//	@PutMapping("recruit/")
}
