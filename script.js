const services = [
  { id: "S001", name: "주민등록등본 발급", agency: "주민센터", category: "주민등록", online: "가능", deadline: 7, fee: 500 },
  { id: "S002", name: "전입신고", agency: "복지정책과", category: "주민등록", online: "불가", deadline: 1, fee: 0 },
  { id: "S003", name: "인감증명 발급", agency: "복지정책과", category: "주민등록", online: "가능", deadline: 1, fee: 0 },
  { id: "S004", name: "주민등록증 재발급", agency: "건축과", category: "주민등록", online: "가능", deadline: 0, fee: 0 },
  { id: "S005", name: "건축물대장 발급", agency: "구청 민원봉사과", category: "건축", online: "불가", deadline: 0, fee: 1000 },
  { id: "S006", name: "건축허가 신청", agency: "건축과", category: "건축", online: "불가", deadline: 1, fee: 2000 },
  { id: "S007", name: "용도변경 신고", agency: "시청 민원과", category: "건축", online: "불가", deadline: 0, fee: 0 },
  { id: "S008", name: "지방세 납부확인서", agency: "건축과", category: "세무", online: "가능", deadline: 1, fee: 1000 },
  { id: "S009", name: "취득세 신고", agency: "교통행정과", category: "세무", online: "가능", deadline: 0, fee: 0 },
  { id: "S010", name: "재산세 조회", agency: "교통행정과", category: "세무", online: "가능", deadline: 3, fee: 0 },
  { id: "S011", name: "기초연금 신청", agency: "건축과", category: "복지", online: "가능", deadline: 7, fee: 500 },
  { id: "S012", name: "복지급여 조회", agency: "시청 민원과", category: "복지", online: "가능", deadline: 14, fee: 5000 },
  { id: "S013", name: "장애인 등록", agency: "주민센터", category: "복지", online: "가능", deadline: 5, fee: 0 },
  { id: "S014", name: "자동차 등록", agency: "주민센터", category: "교통", online: "가능", deadline: 1, fee: 5000 },
  { id: "S015", name: "운전면허 갱신", agency: "교통행정과", category: "교통", online: "불가", deadline: 1, fee: 0 },
  { id: "S016", name: "주정차 위반 조회", agency: "주민센터", category: "교통", online: "가능", deadline: 7, fee: 1000 },
  { id: "S017", name: "배출시설 신고", agency: "주민센터", category: "환경", online: "가능", deadline: 1, fee: 0 },
  { id: "S018", name: "폐기물 처리 신청", agency: "시청 민원과", category: "환경", online: "가능", deadline: 14, fee: 5000 },
  { id: "S019", name: "식품영업 신고", agency: "건축과", category: "위생", online: "가능", deadline: 3, fee: 2000 },
  { id: "S020", name: "위생업소 조회", agency: "시청 민원과", category: "위생", online: "불가", deadline: 7, fee: 500 },
  { id: "S021", name: "여권 발급 신청", agency: "건축과", category: "여권", online: "가능", deadline: 7, fee: 1000 },
  { id: "S022", name: "여권 재발급", agency: "교통행정과", category: "여권", online: "가능", deadline: 1, fee: 1000 },
];

const keywordInput = document.querySelector("#keyword");
const categorySelect = document.querySelector("#category");
const resetButton = document.querySelector("#reset-button");
const serviceBody = document.querySelector("#service-body");
const resultCount = document.querySelector("#result-count strong");
const tableWrap = document.querySelector(".table-wrap");
const emptyMessage = document.querySelector("#empty-message");

const formatFee = (fee) => fee === 0 ? "무료" : `${fee.toLocaleString("ko-KR")}원`;
const formatDeadline = (days) => days === 0 ? "즉시" : `${days}일`;

function populateCategories() {
  [...new Set(services.map(({ category }) => category))].forEach((category) => {
    categorySelect.insertAdjacentHTML("beforeend", `<option value="${category}">${category}</option>`);
  });
}

function renderServices() {
  const keyword = keywordInput.value.trim().toLocaleLowerCase("ko-KR");
  const category = categorySelect.value;
  const visibleServices = services.filter((service) =>
    service.name.toLocaleLowerCase("ko-KR").includes(keyword) && (!category || service.category === category)
  );

  resultCount.textContent = visibleServices.length;
  serviceBody.innerHTML = visibleServices.map((service) => `
    <tr>
      <td>${service.name}</td>
      <td>${service.agency}</td>
      <td><span class="category-tag">${service.category}</span></td>
      <td><span class="online-tag online-tag--${service.online === "가능" ? "yes" : "no"}">${service.online}</span></td>
      <td>${formatDeadline(service.deadline)}</td>
      <td>${formatFee(service.fee)}</td>
    </tr>`).join("");

  const hasResults = visibleServices.length > 0;
  tableWrap.hidden = !hasResults;
  emptyMessage.hidden = hasResults;
}

keywordInput.addEventListener("input", renderServices);
categorySelect.addEventListener("change", renderServices);
resetButton.addEventListener("click", () => {
  keywordInput.value = "";
  categorySelect.value = "";
  renderServices();
  keywordInput.focus();
});

populateCategories();
renderServices();
