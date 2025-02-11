const iconElement = document.createElement("img");
iconElement.id = "extension-icon";
iconElement.src = chrome.runtime.getURL("images/icon-48.png");
iconElement.style.position = "absolute";
iconElement.style.cursor = "pointer";
iconElement.style.display = "none";
document.body.appendChild(iconElement);

const popupElement = document.createElement("div");
popupElement.id = "popup-element";
popupElement.style.display = "none";
popupElement.style.position = "absolute";
popupElement.style.width = "300px";
popupElement.style.height = "200px";
popupElement.style.boxShadow = "0px 2px 1px rgba(0, 0, 0, 0.10)";
popupElement.style.borderRadius = "10px";
popupElement.style.border = "0.50px #4B4BA4 solid";
popupElement.style.backgroundColor = "#ffffff";

// 팝업 콘텐츠 추가
popupElement.innerHTML = `
  <div style="width: 100%; height: 35px; background: rgba(233, 233, 255, 0.40); border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center;">
      <img style="padding-left: 5px; padding-right:5px;" src="${chrome.runtime.getURL("images/gen-icon.svg")}" alt="Gen-Icon" />
      <div style="color: #3F3F46; font-size: 11px; font-weight: 500; word-wrap: break-word">질문 분석 및 자소서 탐색 중...</div>
    </div>
  </div>
  <div style="display:grid; place-items: center; place-content: center; height:165px;">
    <img src="${chrome.runtime.getURL("images/slime.svg")}" alt="Slime-icon"/>
    <div style="text-align: center; color: #3F3F46; font-size: 12px; font-family: Pretendard; font-weight: 500; word-wrap: break-word">
      당신의 자소서 탐색을 시작합니다!<br/> 질문에 맞는 완벽한 답변을 찾아볼게요.
    </div>
  </div>
`;

const resultElement = document.createElement("div");
resultElement.id = "result-element";
resultElement.style.display = "none";
resultElement.style.position = "absolute";
resultElement.style.width = "300px";
resultElement.style.height = "250px";
resultElement.style.boxShadow = "0px 2px 1px rgba(0, 0, 0, 0.10)";
resultElement.style.borderRadius = "10px";
resultElement.style.border = "0.50px #4B4BA4 solid";
resultElement.style.backgroundColor = "#ffffff";

resultElement.innerHTML = `
  <div style="width: 100%; height: 14%; background: rgba(233, 233, 255, 0.40); border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center;">
      <img style="padding-left: 5px; padding-right:5px;" src="${chrome.runtime.getURL("images/gen-icon.svg")}" alt="Gen-Icon" />
      <div style="color: #3F3F46; font-size: 11px; font-weight: 500; word-wrap: break-word">질문 분석 완료. 자소서 유사 답변을 확인하세요.</div>
    </div>
    <img style="padding-right: 5px; cursor: pointer;" src="${chrome.runtime.getURL("images/close-icon.svg")}" alt="Close-icon" />
  </div>
  <div style="padding: 5px; display: grid; grid-gap: 10px; height: 70%">
    <div>
      <div style="color: black; font-size: 14px; font-weight: 600;">검색된 자소서</div>
      <div style="width: 68px; height: 16px; background: #E9E9FF; border-radius: 10px"></div>
    </div>
    <div style="color: black; font-size: 14px; font-weight: 600;">답변</div>
    <div style="height: calc(120px - 14%); overflow-y: auto;">
      <div id="result-content" style="width: 100%; height: auto; color: #3F3F46; font-size: 11px; font-weight: 500; word-wrap: break-word">
        디지털 금융 혁신을 선도하는 우리은행에서 IT 직무 인턴으로 성장하고 싶습니다. 특히, 우리은행이 추진하는 디지털 금융 플랫폼 강화와 빅데이터 기반 고객 맞춤형 서비스에 관심을 가지게 되었습니다. 고객 중심의 디지털 서비스를 제공하기 위해 IT 기술을 적극 활용하는 우리은행의 비전은 저의 목표와 일치합니다.
        <br/><br/>
        대학교에서 IT 관련 전공을 공부하며, 데이터 분석 프로젝트와 금융 데이터 관리 시스템 설계를 경험했습니다. 이 과정에서 얻은 기술적 역량과 문제 해결 능력을 바탕으로, 금융 서비스의 효율성을 높이고 고객 경험을 혁신할 수 있는 아이디어를 제안하고 싶습니다.
        <br/>
      </div>
    </div>
  </div>
  <div style="margin-left: 5px; width: 76px; height: 19px; background: #8787F2; border-radius: 5px; display: flex; align-items: center; justify-content: center;">
    <img src="${chrome.runtime.getURL("images/copy-icon.svg")}" alt="Copy-icon" />
    <div style="color: white; font-size: 8px; font-weight: 500; word-wrap: break-word; padding-left: 5px;">답변 복사하기</div>
  </div>
`;

document.body.appendChild(resultElement);
document.body.appendChild(popupElement);

iconElement.addEventListener("click", (event) => {
  onIconClick(event);
});

const closeIcon = resultElement.querySelector("img[alt='Close-icon']");
if (closeIcon) {
  closeIcon.addEventListener("click", () => {
    resultElement.style.display = "none";
  });
}

let selectedText = "";

document.addEventListener("mouseup", (event) => {
  const selection = window.getSelection();
  const text = selection.toString().trim();

  if (iconElement.style.display === "block") {
    iconElement.style.display = "none";
    popupElement.style.display = "none"; // 팝업 숨김
  }

  if (text.length > 0) {
    selectedText = text;
    const range = selection.getRangeAt(0);
    const { x, y, width } = range.getBoundingClientRect();
    iconElement.style.top = window.scrollY + y - 40 + "px"; // 아이콘 위치 조정
    iconElement.style.left = window.scrollX + x + width / 2 + "px";
    iconElement.style.display = "block";
  }
});

function onIconClick(event) {
  if (!selectedText) return;

  // 아이콘 아래 팝업 표시
  const iconRect = iconElement.getBoundingClientRect();
  popupElement.style.top = window.scrollY + iconRect.bottom + "px"; // 아이콘 아래에 배치
  popupElement.style.left = window.scrollX + iconRect.left + "px";
  popupElement.style.display = "block";

  resultElement.style.top = window.scrollY + iconRect.bottom + "px";
  resultElement.style.left = window.scrollX + iconRect.left + "px";

  try {
    chrome.runtime.sendMessage({
      type : "SEND_TEXT_TO_BACKEND",
      payload : {text:selectedText},
    },(response) => {
      if (response && response.status === "success") {
        console.log(response.data); // TODO - 이 데이터를 이제 resultElement 에 넣어야 함
        popupElement.style.display = "none";
        resultElement.style.display = "block";
      } else {
        popupElement.style.display = "none";
        resultElement.style.display = "block";
      }
    })
  } catch (error) {
    console.error(error);
  }
}