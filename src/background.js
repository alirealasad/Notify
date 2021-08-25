'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

function notifyMe(tab) {
 if (Notification.permission !== 'granted')
  Notification.requestPermission();
 else {
  var notification = new Notification('You got a Poll', {
   icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
   body: 'Hey there! You\'ve been notified!',
  });
  notification.onclick = function() {
    chrome.tabs.update(tab, {active: true})
  };
 }
}


chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === 'NOTIFY') {
    const message = 'received';
    notifyMe(sender.tab.id);
  }
});
