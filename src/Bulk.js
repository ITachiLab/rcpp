class Bulk {
  constructor() {
    this.content = [];
    this.items = [];
    this.parentPosts = [];
    this.replies = [];
    this.profiles = {};
  }

  acceptArchiver(visitor) {
    const sorter = (a, b) => a.created_at - b.created_at;
    this.content.sort(sorter);
    this.replies.sort(sorter);

    visitor.visitConversation();
    for (const msg of this.content) {
      if (msg.hasOwnProperty("parent_post_id")) {
        continue;
      }

      visitor.visitMessage(msg);
      this.__visitMessageObject(visitor, msg);
    }
  }

  hasProfile(profileId) {
    return profileId.toString() in this.profiles;
  }

  getProfile(profileId) {
    return this.profiles[profileId.toString()];
  }

  addProfile(profileId, profile) {
    this.profiles[profileId.toString()] = profile;
  }

  appendContent(content) {
    this.content.push(...content);
  }

  appendItems(items) {
    this.items.push(...items);
  }

  appendParentPosts(parentPosts) {
    this.parentPosts.push(...parentPosts);
  }

  appendReplies(replies) {
    this.replies.push(...replies);
  }

  __visitMessageObject(visitor, msg) {
    visitor.visitAuthor(this.getProfile(msg.creator_id));

    for (const item of msg.items) {
      const itemData = this.items.find((it) => it._id === item.id);

      if (itemData.type === "giphy") {
        continue;
      }

      if (itemData.type_id === 10) {
        visitor.visitItemFile(itemData.versions.slice(-1)[0].url, itemData.name,
            itemData.type);
      } else if (itemData.type_id === 31) {
        visitor.visitItemCodeSnippet(itemData.title, itemData.body,
            itemData.mime_type);
      }
    }

    if (msg.hasOwnProperty("chain_post_type")
        && msg.chain_post_type === "parent") {
      const chainId = msg.chain_id;

      for (const reply of this.replies) {
        if (reply.chain_id === chainId) {
          visitor.visitReply(reply);
          this.__visitMessageObject(visitor, reply);
        }
      }
    }
  }
}

export default Bulk;