import Downloader from "./Downloader.js";
import {TarArchiver, ShallowHtmlArchiver} from './archiver'

function createButton(menuWrapper) {
  const downloadButton = document.createElement("button");
  downloadButton.id = "download-button";

  const spanIcon = document.createElement("span");
  spanIcon.textContent = "💾";

  downloadButton.appendChild(spanIcon);
  downloadButton.style.borderStyle = "none";
  downloadButton.style.background = "none";
  downloadButton.style.cursor = "pointer";

  menuWrapper.appendChild(document.createElement('div'));
  menuWrapper.appendChild(downloadButton);

  return downloadButton;
}

function registerAction(button) {
  button.addEventListener("click", e => {
    let archiver;
    if (window.confirm("OK - Download a TAR archive with all attachments.\n"
        + "Cancel - Download a shallow HTML with external links to files.")) {
      archiver = new TarArchiver();
    } else {
      archiver = new ShallowHtmlArchiver();
    }

    const groupId = parseInt(document.location.pathname.split('/').slice(-1)[0]);

    button.className = "rotate-loading";

    downloader.downloadMessages(groupId)
        .then(archive => archive.acceptArchiver(archiver))
        .then(() => archiver.getBlob())
        .then(blob => {
          button.className = "";
          window.open(URL.createObjectURL(blob), "_blank");
          // let writer = new TarWriter();
          // writer.addFile("index.html", html);
          // return writer.write();
        });
  });
}

let downloader;

window.onmessage = (event) => {
  if (event.data && event.data["accessToken"]) {
    downloader = new Downloader(event.data["accessToken"]);

    let loadCheck = setInterval(() => {
      let menuWrapper = document.querySelector(
          "#conversation-header-right-wrapper");

      if (menuWrapper != null) {
        clearInterval(loadCheck);
        registerAction(createButton(menuWrapper));
      }
    }, 1000);
  }
};

function injectScript(file_path, tag) {
  let node = document.getElementsByTagName(tag)[0];
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}

injectScript(chrome.runtime.getURL('injectee.js'), 'body');