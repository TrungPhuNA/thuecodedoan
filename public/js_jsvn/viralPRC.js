let viral = (function () {
    const defaultOptions = {
        campaignId: "",
        networkId: "",
        viralUrl: "",
        workspaceUrl: "",
        tokenKey: "",
        position: 1,
        backgroundColor: "#FC427B",
        textColor: "#FFFFFF",
        fontSize: "14px",
        textShare: "Chia sẻ",
        textLogin: "Đăng nhập"
    };

    const fixedOptions = {
        fullBottom: 1,
        rightBottom: 2,
        rightCenter: 3,
        leftBottom: 4,
        leftCenter: 5,
    };

    const base64CurrentUrl = btoa(window.location.href);

    const init = function (customOptions) {
        let options = Object.assign(defaultOptions, customOptions);
        const position = parseInt(options.position);
        const loginUrl = options.workspaceUrl;
        const shareUrl = `${options.viralUrl}/auth/redirect/facebook?campaign_id=${options.campaignId}&network_id=${options.networkId}&token=${options.tokenKey}&redirect_url=${base64CurrentUrl}`;
        const backgroundColor = checkValidColorCode(options.backgroundColor)
            ? options.backgroundColor
            : "#FC427B";
        const textColor = checkValidColorCode(options.textColor)
            ? options.textColor
            : "#ffffff";
        const fontSize = options.fontSize;
        const textShare = options.textShare;
        const textLogin = options.textLogin;
        // Check status code
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const errorCode = urlParams.get('error_code');
        const deepLink = urlParams.get('deep_link');

        addStyleToHead(position, shareUrl, loginUrl, backgroundColor, textColor, fontSize, textShare, textLogin, errorCode, deepLink, createButton);

        if (errorCode !== null) {
            alertError(parseInt(errorCode));
        }

        if (deepLink !== null) {
            alertShare(deepLink);
        }

    };

    function checkValidColorCode(colorCode) {
        return /^#[0-9A-F]{6}$/i.test(colorCode);
    }

    function addStyleToHead(position, shareUrl, loginUrl, backgroundColor, textColor, fontSize, textShare, textLogin, errorCode, deepLink, callback) {
        let css = `.icon-viral {
      display: inline-block;
      width: 2em;
      height: 2em;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
    }`;

        switch (position) {
            case fixedOptions.fullBottom:
                css += `#b-viral {
                  display: flex;
                  flex-wrap: wrap;
                  width: 100%;
                  justify-content: center;
                  padding: 10px;
                  background-color: ${backgroundColor};
                  color: ${textColor};
                  font-size: ${fontSize};
                  opacity: 0.95;
                  position: fixed;
                  bottom: 0;
                  z-index: 99999999;
              } .button-viral {
                  display: flex;
                  width: 30%;
                  margin-right: 10px;
                  font-weight: 400;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid transparent;
                  padding: .735rem;
                  line-height: 1.5;
                  border-radius: 5px;
                  transition: color .15s;
                  background-color: hsla(0,0%,100%,.2);
              } @media screen and (max-width: 576px) {
                  .button-viral {
                    width: 100%;
                    margin-right: 0;
                    margin-bottom: 10px;
                  }
                }`;
                break;
            case fixedOptions.rightBottom:
            case fixedOptions.rightCenter:
            case fixedOptions.leftBottom:
            case fixedOptions.leftCenter:
                css += `.button-viral {
              z-index: 99999999;
              position: fixed; 
              display: flex;
              color:${textColor};
              font-size: ${fontSize};
            } .viral-icon {
              display: flex; 
              width: 50px; 
              height: 50px; 
              font-weight: 400;
              justify-content: center;
              align-items: center;
              border: 1px solid transparent;
              border-radius: 50%;
              line-height: 1.5;
              background-color: ${backgroundColor}
            } .viral-text {
              width: 0;
              transition: width 1s ease-in-out;
              white-space: pre;
              overflow: hidden; display:flex;
              align-items: center;
              justify-content:center;
              font-size: ${fontSize};
            }`;
                break;
            default:
                css += `#b-viral {
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              justify-content: center;
              padding: 10px;
              background-color: ${backgroundColor};
              color: ${textColor};
              font-size: ${fontSize};
              opacity: 0.95;
              position: fixed;
              bottom: 0;
              z-index: 99999999;
          } 
          .button-viral {
              display: flex;
              width: 30%;
              margin-right: 10px;
              font-weight: 400;
              justify-content: center;
              align-items: center;
              border: 1px solid transparent;
              padding: .735rem;
              line-height: 1.5;
              border-radius: 5px;
              transition: color .15s;
              background-color: hsla(0,0%,100%,.2);
          } 
          @media screen and (max-width: 576px) {
              .button-viral {
                width: 100%;
                margin-right: 0;
                margin-bottom: 10px;
              }
            }`;
                break;
        }

        if (errorCode !== null || deepLink !== null) {
            css += `@keyframes showModal { 
        from {padding-top: 0;} 
        to {padding-top: 5vh;}
        } #viral-alert-modal {
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%; 
          overflow: auto; 
          background-color: rgb(0,0,0); 
          background-color: rgba(0,0,0,0.4); 
          animation: showModal 1s ease forwards;
        } .viral-alert-modal-content {
          background-color: #fefefe;
          margin: auto;padding: 20px;
          border: 1px solid #888;
          width: 50%;
          border-radius: 10px;
          border-top: solid 7px #e00c0c;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        } #input-copy-viral {
          width:85%;
        } @media screen and (max-width: 960px) {
          .viral-alert-modal-content {
            width: 95%;
          }
          #input-copy-viral {
            width:90%;
          }
        } @media screen and (max-width: 576px) {
          #input-copy-viral {
            width:80%;
          }
        }`
        }
        let head = document.getElementsByTagName("head")[0];
        let style = document.createElement("style");

        head.appendChild(style);
        style.type = "text/css";
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
            callback(position, shareUrl, loginUrl, backgroundColor, textShare, textLogin, deepLink);
        } else {
            style.appendChild(document.createTextNode(css));
            callback(position, shareUrl, loginUrl, backgroundColor, textShare, textLogin, deepLink);
        }
    }

    function createButton(position, shareUrl, loginUrl, backgroundColor, textShare, textLogin , deepLink) {
        let html = getPosition(position, shareUrl, loginUrl, textShare, textLogin, deepLink);
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(stringToDOM(html));
        // Add transaction
        const openModalShare = document.getElementById('viral-button-share');

        if (openModalShare !== null) {
            openModalShare.addEventListener('click', function () {
                document.getElementById('viral-alert-modal').style.display = 'block';
            })
        }

        if (position !== fixedOptions.fullBottom) {
            hoverTransaction(backgroundColor);
        }
    }

    function getPosition(position, shareUrl, loginUrl, textShare, textLogin, deepLink) {
        switch (position) {
            case fixedOptions.fullBottom:
                return getHTMLPositionFullBottom(shareUrl, loginUrl, textShare, textLogin, deepLink);
            case fixedOptions.rightBottom:
                return getHTMLPositionConner(position, shareUrl, loginUrl, textShare, textLogin, deepLink);
            case fixedOptions.rightCenter:
                return getHTMLPositionConner(position, shareUrl, loginUrl, textShare, textLogin, deepLink);
            case fixedOptions.leftBottom:
                return getHTMLPositionConner(position, shareUrl, loginUrl, textShare, textLogin, deepLink);
            case fixedOptions.leftCenter:
                return getHTMLPositionConner(position, shareUrl, loginUrl, textShare, textLogin, deepLink);
            default:
                return getHTMLPositionFullBottom(shareUrl, loginUrl,textShare, textLogin,deepLink);
        }
    }

    function getHTMLPositionFullBottom(shareUrl, loginUrl, textShare, textLogin, deepLink) {
        let html = `<div id="b-viral">`;
        if (deepLink !== null) {
            html += `<a class="button-viral" id="viral-button-share" style="cursor:pointer"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
      <symbol id="icon-share2" viewBox="0 0 32 32">
  <path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
  </symbol></use></svg>`;
            html += `<span style='margin-left:10px'>Chia sẻ</span></a>`;
        } else {
            html += `<a class="button-viral" href='${shareUrl}'><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
    <symbol id="icon-share2" viewBox="0 0 32 32">
<path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
</symbol></use></svg>`;
            html += `<span style='margin-left:10px'>${textShare}</span></a>`;
        }
        html += `<a class="button-viral" href='${loginUrl}'>`;
        html += `<svg class="icon-viral icon-user"><use xlink:href="#icon-user"><symbol id="icon-user" viewBox="0 0 32 32">
    <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
    </symbol></use></svg>`;
        html += `<span style='margin-left:10px'>${textLogin}</span></a></div>`;

        return html;
    }

    function getHTMLPositionConner(position, shareUrl, loginUrl, textShare, textLogin, deepLink) {
        let html = "";

        switch (position) {
            case fixedOptions.rightBottom:
                if (deepLink !== null) {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-left-radius: 25px;
          border-top-left-radius: 25px; right:0; bottom: 80px; cursor:pointer">`;
                    html += `<a class="viral-icon" id="viral-icon-share""><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
        <symbol id="icon-share2" viewBox="0 0 32 32">
    <path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
    </symbol></use></svg></a>`;
                    html += `<a class="viral-text" id="viral-text-share"><span>Chia sẻ</span></a></div>`;
                } else {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-left-radius: 25px;
          border-top-left-radius: 25px; right:0; bottom: 80px;">`;
                    html += `<a class="viral-icon" id="viral-icon-share" href="${shareUrl}"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
        <symbol id="icon-share2" viewBox="0 0 32 32">
    <path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
    </symbol></use></svg></a>`;
                    html += `<a class="viral-text" id="viral-text-share" href="${shareUrl}"><span>${textShare}</span></a></div>`;
                }
                html += `<div class="button-viral" id="viral-button-login" style="border-bottom-left-radius: 25px;
          border-top-left-radius: 25px; right:0; bottom: 20px;">`;
                html += `<a class="viral-icon" id="viral-icon-login" href="${loginUrl}"><svg class="icon-viral icon-user"><use xlink:href="#icon-user"><symbol id="icon-user" viewBox="0 0 32 32">
    <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
    </symbol></use></svg></a>`;
                html += `<a class="viral-text" id="viral-text-login" href="${loginUrl}"><span>${textLogin}</span></a></div>`;

                break;
            case fixedOptions.rightCenter:
                if (deepLink !== null) {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-left-radius: 25px;
          border-top-left-radius: 25px; right:0; bottom: 55%; cursor: pointer">`;
                    html += `<a class="viral-icon" id="viral-icon-share"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
    <symbol id="icon-share2" viewBox="0 0 32 32">
<path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
</symbol></use></svg></a>`;
                    html += `<a class="viral-text" id="viral-text-share"><span>Chia sẻ</span></a></div>`;
                } else {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-left-radius: 25px;
          border-top-left-radius: 25px; right:0; bottom: 55%;">`;
                    html += `<a class="viral-icon" id="viral-icon-share" href="${shareUrl}"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
    <symbol id="icon-share2" viewBox="0 0 32 32">
<path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
</symbol></use></svg></a>`;
                    html += `<a class="viral-text" id="viral-text-share" href="${shareUrl}"><span>${textShare}</span></a></div>`;
                }
                html += `<div class="button-viral" id="viral-button-login" style="border-bottom-left-radius: 25px;
          border-top-left-radius: 25px; right:0; bottom: 45%;">`;
                html += `<a class="viral-icon" id="viral-icon-login" href="${loginUrl}"><svg class="icon-viral icon-user"><use xlink:href="#icon-user"><symbol id="icon-user" viewBox="0 0 32 32">
    <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
    </symbol></use></svg></a>`;
                html += `<a class="viral-text" id="viral-text-login" href="${loginUrl}"><span>${textLogin}</span></a></div>`;

                break;
            case fixedOptions.leftBottom:
                if (deepLink !== null) {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-right-radius: 25px;
          border-top-right-radius: 25px; left:0; bottom: 80px; cursor: pointer"">`;
                    html += `<a class="viral-text" id="viral-text-share"><span>Chia sẻ</span></a>`;
                    html += `<a class="viral-icon" id="viral-icon-share"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
    <symbol id="icon-share2" viewBox="0 0 32 32">
<path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
</symbol></use></svg></a></div>`;
                } else {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-right-radius: 25px;
          border-top-right-radius: 25px; left:0; bottom: 80px;">`;
                    html += `<a class="viral-text" id="viral-text-share" href="${shareUrl}"><span>${textShare}</span></a>`;
                    html += `<a class="viral-icon" id="viral-icon-share" href="${shareUrl}"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
    <symbol id="icon-share2" viewBox="0 0 32 32">
<path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
</symbol></use></svg></a></div>`;
                }
                html += `<div class="button-viral" id="viral-button-login" style="border-bottom-right-radius: 25px;
          border-top-right-radius: 25px; left:0; bottom: 20px;">`;
                html += `<a class="viral-text" id="viral-text-login" href="${loginUrl}"><span>${textLogin}</span></a>`;
                html += `<a class="viral-icon" id="viral-icon-login" href="${loginUrl}"><svg class="icon-viral icon-user"><use xlink:href="#icon-user"><symbol id="icon-user" viewBox="0 0 32 32">
    <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
    </symbol></use></svg></a></div>`;

                break;
            case fixedOptions.leftCenter:
                if (deepLink !== null) {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-right-radius: 25px;
          border-top-right-radius: 25px; left:0; bottom: 55%; cursor: pointer">`;
                    html += `<a class="viral-text" id="viral-text-share"><span>Chia sẻ</span></a>`;
                    html += `<a class="viral-icon" id="viral-icon-share"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
    <symbol id="icon-share2" viewBox="0 0 32 32">
<path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
</symbol></use></svg></a></div>`;
                } else {
                    html += `<div class="button-viral" id="viral-button-share" style="border-bottom-right-radius: 25px;
          border-top-right-radius: 25px; left:0; bottom: 55%;">`;
                    html += `<a class="viral-text" id="viral-text-share" href="${shareUrl}"><span>${textShare}</span></a>`;
                    html += `<a class="viral-icon" id="viral-icon-share" href="${shareUrl}"><svg class="icon-viral icon-share2"><use xlink:href="#icon-share2">
    <symbol id="icon-share2" viewBox="0 0 32 32">
<path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
</symbol></use></svg></a></div>`;
                }
                html += `<div class="button-viral" id="viral-button-login" style="border-bottom-right-radius: 25px;
          border-top-right-radius: 25px; left:0; bottom: 45%;">`;
                html += `<a class="viral-text" id="viral-text-login" href="${loginUrl}"><span>${textLogin}</span></a>`;
                html += `<a class="viral-icon" id="viral-icon-login" href="${loginUrl}"><svg class="icon-viral icon-user"><use xlink:href="#icon-user"><symbol id="icon-user" viewBox="0 0 32 32">
    <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
    </symbol></use></svg></a></div>`;

                break;
        }

        return html;
    }

    function hoverTransaction(backgroundColor) {
        // Share button
        const buttonShare = document.getElementById("viral-button-share");
        const iconShare = document.getElementById("viral-icon-share");
        const textShare = document.getElementById("viral-text-share");

        if (buttonShare === null || buttonShare === undefined) {
            return;
        }

        buttonShare.addEventListener("mouseover", function () {
            buttonShare.style.backgroundColor = `${backgroundColor}`;
            iconShare.style.borderColor = "#e8e3e3a6";
            textShare.style.width = "220px";

            addEventListener("transitionend", function () {
                iconShare.style.borderColor = "#e8e3e3a6";
                buttonShare.style.backgroundColor = `${backgroundColor}`;
            });
        });

        buttonShare.addEventListener("mouseleave", function () {
            textShare.style.width = "0";

            addEventListener("transitionend", function () {
                buttonShare.style.backgroundColor = "";
                iconShare.style.borderColor = "transparent";
            });
        });

        // Login button
        const buttonLogin = document.getElementById("viral-button-login");
        const iconLogin = document.getElementById("viral-icon-login");
        const textLogin = document.getElementById("viral-text-login");

        if (buttonLogin === null || buttonLogin === undefined) {
            return;
        }

        buttonLogin.addEventListener("mouseover", function () {
            buttonLogin.style.backgroundColor = `${backgroundColor}`;
            iconLogin.style.borderColor = "#e8e3e3a6";
            textLogin.style.width = "220px";

            addEventListener("transitionend", function () {
                iconLogin.style.borderColor = "#e8e3e3a6";
                buttonLogin.style.backgroundColor = `${backgroundColor}`;
            });
        });

        buttonLogin.addEventListener("mouseleave", function () {
            textLogin.style.width = "0";

            addEventListener("transitionend", function () {
                iconLogin.style.borderColor = "transparent";
                buttonLogin.style.backgroundColor = "";
            });
        });
    }

    function alertError(error) {
        const errorCode = {
            tokenInvalid: 0,
            registerError: 1,
            createAdSpaceError: 2,
            joinCampaignError: 3,
            createContractError: 4,
            deepLinkError: 5,
            getCampainInfoError: 6,
            userError: 7,
            emailIsNull: 10,
        };
        let errorText;

        switch (error) {
            case errorCode.registerError:
            case errorCode.userError:
                errorText = "Đăng ký tài khoản hoặc đăng nhập không thành công.";
                break;
            case errorCode.createAdSpaceError:
                errorText = "Tạo Ad-space không thành công.";
                break;
            case errorCode.joinCampaignError:
                errorText = "Tham gia chiến dịch không thành công.";
                break;
            case errorCode.createContractError:
                errorText = "Tạo hợp đồng không thành công.";
                break;
            case errorCode.deepLinkError:
                errorText = "Tạo tracking không thành công.";
                break;
            case errorCode.getCampainInfoError:
                errorText = "Thông tin chiến dịch có lỗi phát sinh.";
                break;
            case errorText.emailIsNull:
                errorText = "Facebook của bạn chưa có thông tin email";
                break;
            default:
                errorText = "";
                break;
        }

        let modal = `<div id="viral-alert-modal">
                  <div class="viral-alert-modal-content">
                  <div style="display: flex; align-items:center"><img style="display:flex" src="https://img.icons8.com/color/48/000000/cancel--v1.png"/><span style="display:flex; margin-left: 10px; font-size: 1.735rem; font-weight: bold">Lỗi</span></div>
                  <div style="padding: 20px 10px; line-height: normal"><p style="font-size: 1rem">Rất tiếc, có lỗi trong quá trình tạo tài khoản thành viên miễn phí và chia sẻ link. Hãy thử lại 1 lần nữa nhé.</p><p style="margin-top:30px; font-size: 0.9rem; font-style:italic">${errorText}</p></div>
                  <div style="text-align:right"><button id="viral-close-modal" style="cursor:pointer; padding: .5rem 1rem;font-size:1rem;text-align: center;white-space: nowrap;vertical-align: middle;color:#fff;background-color:#e00c0c;border-radius:5px">Cancel</button></div>
                  </div>
                  </div>`
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(stringToDOM(modal));

        document.getElementById('viral-close-modal').addEventListener("click", function () {
            document.getElementById('viral-alert-modal').style.display = 'none';
        })
    }

    function stringToDOM(string) {
        String.prototype.toDOM = function () {
            var d = document,
                i,
                a = d.createElement("div"),
                b = d.createDocumentFragment();
            a.innerHTML = this;
            while ((i = a.firstChild)) b.appendChild(i);
            return b;
        };

        return string.toDOM();
    }

    function alertShare(deepLinkEnCode) {
        const deepLink = atob(deepLinkEnCode);
        const logoMessenger = 'https://pub-portal-dev.mp.directsale.vn/assets/images/socialIcon/facebook-messenger.png';
        const logoFacebook = 'https://cdn3.iconfinder.com/data/icons/happily-colored-snlogo/512/facebook.png';
        const logoSkype = 'https://pub-portal-dev.mp.directsale.vn/assets/images/socialIcon/skype.png';
        const logoTelegram = 'https://pub-portal-dev.mp.directsale.vn/assets/images/socialIcon/telegram-app.png';
        const logoZalo = 'https://pub-portal-dev.mp.directsale.vn/assets/images/socialIcon/zalo.png';

        let modal = `<div id="viral-alert-modal">
                  <div class="viral-alert-modal-content" style="border-color:#337ab7">
                  <div style="text-align: center"><p style="font-size: 1.735rem; font-weight: bold">Giới thiệu bạn bè</p>
                  <p style="font-size: 1rem; margin-top:30px;">Bạn sẽ chia sẻ qua</p></div>
                  <div style="display:flex; margin-top:20px; justify-content:center">
                  <div class="i-facebook" style="display:flex; flex-wrap: wrap;"><a href="https://www.facebook.com/sharer/sharer.php?u=${deepLink}" target="_blank"" style="display:flex;width:100%;justify-content:center"><img style="width:48px; height:48px" src="${logoFacebook}"></a></div>
                  </div>
                  <div style="margin-top:20px"><p style="font-size: 1rem; font-weight: bold;text-align: center">Hoặc link giới thiệu qua</p>
                  <div style="margin-top:10px"><input title="click to copy" id="input-copy-viral" type="text" value="${deepLink}" style="border: 1px solid #d6d5d5; padding: 10px 20px;" readonly><a id="copy-deep-link" style="cursor:pointer; border: 1px solid #d6d5d5; padding: 10px 15px;width:10%">Copy</a></div>
                  <div style="text-align:right; margin-top:30px"><button id="viral-close-modal" style="cursor:pointer; padding: .5rem 1rem;font-size:1rem;text-align: center;white-space: nowrap;vertical-align: middle;color:#fff;background-color:#337ab7;border-radius:5px">Đóng</button></div></div></div>`

        // <div class="i-facebook" style="display:flex; flex-wrap: wrap; margin-left:20px"><a href="#" style="display:flex;width:100%;justify-content:center"><img style="width:48px; height:48px" src="${logoMessenger}"></a><p style="display:flex;width:100%;justify-content:center">messenger</p></div>
        // <div class="i-facebook" style="display:flex; flex-wrap: wrap; margin-left:20px"><a href="#" style="display:flex;width:100%;justify-content:center"><img style="width:48px; height:48px" src="${logoSkype}"></a><p style="display:flex;width:100%;justify-content:center">skype</p></div>
        // <div class="i-facebook" style="display:flex; flex-wrap: wrap; margin-left:20px"><a href="#" style="display:flex;width:100%;justify-content:center"><img style="width:48px; height:48px" src="${logoTelegram}"></a><p style="display:flex;width:100%;justify-content:center">telegram</p></div>
        // <div class="i-facebook" style="display:flex; flex-wrap: wrap; margin-left:20px"><a href="#" style="display:flex;width:100%;justify-content:center"><img style="width:48px; height:48px" src="${logoZalo}"></a><p style="display:flex;width:100%;justify-content:center">zalo</p></div>
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(stringToDOM(modal));

        const inputCopyViral = document.getElementById('input-copy-viral');
        const copyDeepLink = document.getElementById('copy-deep-link');

        copyDeepLink.addEventListener("click", function () {
            inputCopyViral.select();
            document.execCommand("copy");
            copyDeepLink.innerHTML = 'Copied';
        })


        document.getElementById('viral-close-modal').addEventListener("click", function () {
            document.getElementById('viral-alert-modal').style.display = 'none';
        })
    }

    return {
        init,
    };
})();

                    //fix this for only perrin cardin shop
                        const options = {
                            campaignId: "2",
                            networkId: 13,
                            viralUrl: "https://workspace-api.scalef.com",
                            workspaceUrl: "http://pierrecardinshop-workspace.scalef.com",
                            tokenKey: "89a84c0e0f9b3604068654ca4ce77638",
                            position: "3", // ví dụ: _position = 1
                            backgroundColor: "", //  Thiết lập màu cho background
                            textColor: "", // Thiết lập màu cho text
                            fontSize: "", // Thiết lập kích thước cho text
                            textShare: "Chia Sẻ", // Thiết lập text cho nút chia sẻ
                            textLogin: "Đăng Nhập", // Thiết lập text cho nút đăng nhập
                        };
                        viral.init(options);

