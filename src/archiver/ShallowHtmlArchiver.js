import Archiver from "./Archiver.js";

class ShallowHtmlArchiver extends Archiver {
  constructor() {
    super();
    this.doc = document.implementation.createHTMLDocument("Backup");
    this.htmlStyle = 'body { font-family: sans-serif; } * { font-size: 14px; } table { width: 50%; margin-bottom: 20px; border-collapse: collapse; background-color: #eee; } table td { border: 1px solid; padding: 8px; } table td.date { text-align: right; width: 0; } table td.author { font-weight: bold; } .post-image { width: 300px; height: auto; } pre.snippet { border: dashed 1px grey; padding: 10px; background-color: #f8f8f8; } table tr.reply { box-shadow: 3px 0px 0px 0px black inset; } table td.message-content { white-space: pre-wrap; }';
    this.trClass = "";
  }

  getBlob() {
    return Promise.resolve(new Blob([this.doc.documentElement.outerHTML],
        {type: "text/html;charset=utf-8"}));
  }

  enterConversation() {
    let style = document.createElement("style");
    style.textContent = this.htmlStyle;
    this.doc.head.appendChild(style);
  }

  enterMessage() {
    this.table = this.doc.createElement("table");
  }

  exitMessage() {
    this.doc.body.appendChild(this.table);
  }

  enterReply() {
    this.trClass = "reply";
  }

  exitReply() {
    this.trClass = "";
  }

  visitAuthor(profile) {
    this.entryHeader = this.doc.createElement("tr");
    this.entryHeader.className = this.trClass;
    let author = this.doc.createElement("td");
    author.textContent = profile.display_name;
    author.className = "author";

    this.entryHeader.appendChild(author);
    this.table.appendChild(this.entryHeader);
  }

  visitDate(date) {
    let dateCell = this.doc.createElement("td");
    dateCell.textContent = new Date(date).toLocaleString();
    dateCell.className = "date";
    this.entryHeader.appendChild(dateCell);
  }

  visitMessageContent(content) {
    let contentRow = this.doc.createElement("tr");
    contentRow.className = this.trClass;

    let contentCell = this.doc.createElement("td");
    contentCell.colSpan = 2;
    contentCell.className = "message-content";

    this.msgContainer = this.doc.createElement("div");

    let msgContent = this.doc.createElement("span");
    msgContent.textContent = content;

    this.msgContainer.appendChild(msgContent);
    contentRow.appendChild(contentCell);
    contentCell.appendChild(this.msgContainer);
    this.table.appendChild(contentRow);
  }

  visitItemFile(url, name, fileType) {
    let link = document.createElement("a");
    link.href = url;
    this.msgContainer.appendChild(link);

    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      let image = document.createElement("img");
      image.src = url;
      image.className = "post-image";
      link.appendChild(image);
    } else {
      link.innerText = name;
    }
  }

  visitItemCodeSnippet(name, content, mimeType) {
    let pre = document.createElement("pre");
    let code = document.createElement("code");
    pre.appendChild(code);

    pre.className = "snippet";
    code.innerText = content;
    this.msgContainer.appendChild(pre);
  }
}

export default ShallowHtmlArchiver;