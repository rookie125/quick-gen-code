console.log('content.js');

function genDom(request) {
  const wrapper = document.createElement('div');

  wrapper.classList.add('quick-gen-wrapper');
  wrapper.innerHTML = `
    <div class="quick-gen-box">
      <div class="quick-gen-close">×</div>
      <h4 class="quick-gen-title">${request.text}</h4>
      <img class="quick-gen-img" src="${request.qrcode}" />
    </div>
  `;

  document.body.appendChild(wrapper);
}


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  genDom(request);
})