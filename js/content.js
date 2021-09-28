console.log('content.js');

let wrapper = null

// 生成二维码弹框
function genQrCode(request) {
  if (wrapper) {
    wrapper.remove();
  }

  wrapper = document.createElement('div');
  wrapper.classList.add('quick-gen-wrapper');
  wrapper.innerHTML = `
    <div class="quick-gen-box">
      <div class="quick-gen-close">×</div>
      <h4 class="quick-gen-title">${request.text}</h4>
      <img class="quick-gen-img" src="${request.qrcode}" />
    </div>
  `;

  document.body.appendChild(wrapper);

  const closeBtn = wrapper.querySelector('.quick-gen-close');

  closeBtn.addEventListener('click', function() {
    wrapper.remove();
    wrapper = null;
  }, { once: true });
}

// 创建二维码
function createCode(val, callback) {
  const qrcodeUrl = jrQrcode.getQrBase64(val.trim(), {
    padding: 0,
    correctLevel: 1
  })

  callback && callback(qrcodeUrl)
}

// 监听消息
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.errMsg) {
    alert(request.errMsg);
  } else {
    console.log(request.text);
    createCode(request.text, function(qrcode) {
      genQrCode({
        text: request.text,
        qrcode
      });
    });
  }
})