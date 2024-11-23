import ShallowHtmlArchiver from "./ShallowHtmlArchiver.js";
import {TarWriter} from "@gera2ld/tarjs";

class TarArchiver extends ShallowHtmlArchiver {
  constructor() {
    super();
    this.tarWriter = new TarWriter();
    this.tarWriter.addFolder("assets");
    this.promises = [];
  }

  getBlob() {
    return Promise.all(this.promises).then(() => {
      this.tarWriter.addFile("index.html", new Blob(
          [this.doc.documentElement.outerHTML],
          {type: "text/html;charset=utf-8"}));
      return this.tarWriter.write();
    });
  }

  visitItemFile(url, name, fileType) {
    const container = this.msgContainer;

    // The "no-cache" is to avoid CORS errors.
    // https://serverfault.com/questions/856904/chrome-s3-cloudfront-no-access-control-allow-origin-header-on-initial-xhr-req/856948#856948
    const promise = fetch(url, {cache: "no-cache"})
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement("a");
          link.href = `assets/${Date.now()}_${name}`;
          container.appendChild(link);

          this.tarWriter.addFile(link.href, blob);

          if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
            const image = document.createElement("img");
            image.src = link.href;
            image.className = "post-image";
            link.appendChild(image);
          } else {
            link.innerText = name;
          }
        });

    this.promises.push(promise);
  }
}

export default TarArchiver;