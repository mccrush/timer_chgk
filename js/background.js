'use strict';

chrome.runtime.onInstalled.addListener(function () {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'db.chgk.info' },
      })
      ],
      actions: [new chrome.declarativeContent.RequestContentScript({ js: ["js/timer.js"] })],
    }]);
  });

});