
import React from 'react';

class ChatwootWidget extends React.Component {
  componentDidMount () {
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right', // This can be left or right
      locale: 'en', // Language to be set
      type: 'expanded_bubble', // [standard, expanded_bubble]
      launcherTitle: 'Contact Us',
    };

    // Paste the script from inbox settings except the <script> tag
(function(d,t) {
  var BASE_URL="https://livechat.gamequiz.live";
  var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
  g.src=BASE_URL+"/packs/js/sdk.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g,s);
  g.onload=function(){
    window.chatwootSDK.run({
      websiteToken: 'pECoDjGSY3eaYTbcF19KmEMN',
      baseUrl: BASE_URL
    })
  }
})(document,"script");

  }

  render () {
    return null;
  }
}

export default ChatwootWidget



// (function(d,t) {
//   var BASE_URL="https://livechat.gamequiz.live";
//   var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
//   g.src=BASE_URL+"/packs/js/sdk.js";
//   g.defer = true;
//   g.async = true;
//   s.parentNode.insertBefore(g,s);
//   g.onload=function(){
//     window.chatwootSDK.run({
//       websiteToken: 'pECoDjGSY3eaYTbcF19KmEMN',
//       baseUrl: BASE_URL
//     })
//   }
// })(document,"script");

// 2nd refer
// (function(d,t) {
//   var BASE_URL="https://livechat.gamequiz.live";
//   var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
//   g.src=BASE_URL+"/packs/js/sdk.js";
//   g.defer = true;
//   g.async = true;
//   s.parentNode.insertBefore(g,s);
//   g.onload=function(){
//     window.chatwootSDK.run({
//       websiteToken: 'vMbsAASzmtUEjMZW4QH3awpR',
//       baseUrl: BASE_URL
//     })
//   }
// })(document,"script");