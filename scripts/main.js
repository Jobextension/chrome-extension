const resumeForm = document.getElementById('resume-form');
const submitComplete = document.getElementById('submit-complete');

resumeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  uploadResume.classList.add('inactive');
  submitComplete.classList.remove('inactive');
  setTimeout(() => {
    submitComplete.style.display = 'none';
    initialPage.classList.remove('inactive');
    mainElement.classList.add('main-initial');
  },1000)
  submitComplete.style.display = 'grid';
  resumeForm.reset();
  console.log(data);
  console.log(typeof data)
  console.log(JSON.stringify(data));

  const jsonData = JSON.stringify(data);

  // TODO - 성공이나 오류에 따라 UI 다르게 보여주도록 해야함
  try {
    chrome.runtime.sendMessage({
      type : "SEND_RESUME_TO_BACKEND",
      payload : jsonData,
    },(response) => {
      if (response && response.status === "success") {
        console.log(response.data);
      } else {
        console.log(response);
      }
    })
  } catch (error) {
    console.error(error);
  }
})

const header = document.getElementById('header');
header.addEventListener('click', (e) => {
  window.open('https://example.com', '_blank');
})