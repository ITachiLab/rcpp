import Archiver from "./Archiver.js";

class ShallowHtmlArchiver extends Archiver {
  constructor() {
    super();
    this.doc = document.implementation.createHTMLDocument("Backup");
    this.htmlStyle = 'body { font-family: sans-serif; } * { font-size: 14px; } table { width: 50%; margin-bottom: 20px; border-collapse: collapse; background-color: #eee; } table td { border: 1px solid; padding: 8px; } table td.date { text-align: right; width: 200px; } table td.author { font-weight: bold; } .post-image { width: 300px; height: auto; } pre.snippet { border: dashed 1px grey; padding: 10px; background-color: #f8f8f8; } table tr.reply { box-shadow: 3px 0px 0px 0px black inset; } table td.message-content { white-space: pre-wrap; }';
  }

  getBlob() {
    return Promise.resolve(new Blob([this.doc.documentElement.outerHTML],
        {type: "text/html;charset=utf-8"}));
  }

  visitConversation() {
    const style = document.createElement("style");
    style.textContent = this.htmlStyle;
    this.doc.head.appendChild(style);
  }

  visitMessage(msg) {
    this.table = this.doc.createElement("table");
    this.doc.body.appendChild(this.table);

    this.__initMessageEntry();
    this.__appendMessageContent(msg);
  }

  visitReply(reply) {
    this.__initMessageEntry();

    this.infoRow.className = "reply";
    this.contentRow.className = "reply";

    this.__appendMessageContent(reply);
  }

  visitAuthor(profile) {
    this.authorCell.textContent = profile.display_name;
    this.authorCell.className = "author";
  }

  visitItemFile(url, name, fileType) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    this.msgContainer.appendChild(link);

    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      const image = document.createElement("img");
      image.src = url;
      image.className = "post-image";
      link.appendChild(image);
    } else {
      link.innerText = name;
    }
  }

  visitItemCodeSnippet(name, content, mimeType) {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    pre.appendChild(code);

    pre.className = "snippet";
    code.innerText = content;
    this.msgContainer.appendChild(pre);
  }

  __appendMessageContent(msg) {
    this.dateCell.textContent = new Date(msg.created_at).toLocaleString();
    this.dateCell.className = "date";

    let content;
    if (msg.hasOwnProperty("activity")) {
      content = msg.activity;
    } else {
      content = msg.text;
    }

    const msgContent = this.doc.createElement("span");
    msgContent.textContent = content;

    this.msgContainer.appendChild(msgContent);
  }

  __initMessageEntry() {
    this.infoRow = this.doc.createElement("tr");
    this.contentRow = this.doc.createElement("tr");
    this.msgContainer = this.doc.createElement("div");

    this.contentCell = this.doc.createElement("td");
    this.contentCell.colSpan = 2;
    this.contentCell.className = "message-content";

    this.authorCell = this.doc.createElement("td");
    this.infoRow.appendChild(this.authorCell);

    this.dateCell = this.doc.createElement("td");
    this.infoRow.appendChild(this.dateCell);

    this.table.appendChild(this.infoRow);
    this.table.appendChild(this.contentRow);
    this.contentRow.appendChild(this.contentCell);
    this.contentCell.appendChild(this.msgContainer);
  }
}

export default ShallowHtmlArchiver;