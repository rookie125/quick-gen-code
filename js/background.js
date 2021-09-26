console.log('background.js');

function createCode(val, callback) {
  const qrcodeUrl = jrQrcode.getQrBase64(val.trim(), {
    padding: 0,
    correctLevel: 1
  })

  callback && callback(qrcodeUrl)
}

function handleGenQrcode({ selectionText }, tab) {
  createCode(selectionText, function(qrcode) {
    chrome.tabs.sendMessage(tab.id, {
      text: selectionText,
      qrcode
    })
  })
}

chrome.contextMenus.create({
  title: '生成二维码',
  contexts: ['all'],
  onclick: handleGenQrcode
})