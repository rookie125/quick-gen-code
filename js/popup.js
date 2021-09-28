const input = document.querySelector('.quick-gen-popup-input');
const button = document.querySelector('.quick-gen-popup-button');

input.onkeydown = function(evt) {
  if (evt.keyCode == 13) {
    sendMessage(input.value);
  }
}

button.onclick = function() {
  sendMessage(input.value);
}

// 给content发送消息
function sendMessage(msg) {
  const val = msg.trim();

  if (!val) {
    return;
  }

  getCurrentTagId(function(tabId) {
    chrome.tabs.sendMessage(tabId, {
      text: val
    })
  });
}

// 获取当前页签的id
function getCurrentTagId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length >= 1 && callback) {
      callback(tabs[0].id);
    }
  })
}