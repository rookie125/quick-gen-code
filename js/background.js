console.log('background.js');

function handleGenQrcode({ selectionText }, tab) {
  const text = selectionText ? selectionText.trim() : '';

  if (!text) {
    chrome.tabs.sendMessage(tab.id, {
      errMsg: '请选择需要生成二维码的内容'
    })
    return;
  }

  chrome.tabs.sendMessage(tab.id, {
    text
  })
}

chrome.contextMenus.create({
  title: '生成二维码',
  contexts: ['all'],
  onclick: handleGenQrcode
})