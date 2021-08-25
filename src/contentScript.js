"use strict";

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
// Communicate with background file by sending a message

function sendMessage(type, message) {
  chrome.runtime.sendMessage({
    type: type,
    payload: {
      message: message,
    },
  });
}

console.log("checking");


let target = document.querySelector("#app");


let config = {
  attributes: true,
  childList: true,
  characterData: true,
};

if (target) {
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        if (mutation.addedNodes.length) {
          if (mutation.addedNodes[0].className === "main--Z1w6YvE") {
            let observer2 = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length) {
                  if (mutation.addedNodes[0].className === "overlay--Arkp5") {
                    sendMessage("NOTIFY", "hi, this is notification");
                  }
                }
              });
            });
            observer2.observe(document.querySelector(".main--Z1w6YvE"), config);
            observer.disconnect();
          }
        }
      }
    });
  });

  observer.observe(target, config);
}

// document.addEventListener('DOMContentLoaded', function() {
//  if (!Notification) {
//   alert('Desktop notifications not available in your browser. Try Chromium.');
//   return;
//  }
//
//  if (Notification.permission !== 'granted')
//   Notification.requestPermission();
// });
