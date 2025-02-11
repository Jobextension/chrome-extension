const initialPage = document.getElementById("initial-page");
const mainElement = document.querySelector("main");
const myResume = document.getElementById("my-resume");
const uploadResume = document.getElementById("upload-resume");
const uploadBtn = document.getElementById("resume-upload-btn");
const myResumeBtn = document.getElementById("resume-storage-btn");
const resumeList = document.getElementById("resume-list");

uploadBtn.addEventListener("click", gotoUploadResume)
myResumeBtn.addEventListener("click", gotoMyResume)

function gotoUploadResume() {
  initialPage.classList.add('inactive');
  mainElement.classList.remove('main-initial');
  myResume.classList.add('inactive');
  uploadResume.classList.remove('inactive');
}

// TODO 나중에 실제 서버로 교체 필요
async function gotoMyResume() {
  initialPage.classList.add('inactive');
  mainElement.classList.remove('main-initial');
  uploadResume.classList.add('inactive');
  myResume.classList.remove('inactive');
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) Error('Failed to fetch data');
    const jsonArr = await response.json();

    for (let i = 0; i < jsonArr.length; i++) {
      const item = jsonArr[i];
      resumeList.innerHTML += `
      <li id=${item.id} class="resume-list-item">
        <div>${item.title}</div>
        <div class="button-container">
          <button class="resume-list-item-btn">
            <text>수정하기</text>
          </button>
          <button class="resume-list-item-btn">
            <text>삭제하기</text>
          </button>
        </div>
      </li>
      `;
    }

  } catch (error) {
    console.log(error);
  }
}

