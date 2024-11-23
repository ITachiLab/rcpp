import Bulk from "./Bulk.js";

class Downloader {
  constructor(accessToken) {
    this.headers = {
      "X-User-Agent": "RCAppWeb/24.4.20 (RingCentral; Linux/x86_64; build.1439; rev.322c52875)",
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
    this.profileUrl = `https://app-gamma.glip.com/api/person/`;
  }

  async downloadMessages(groupId) {
    const result = new Bulk();

    let data = {
      "limit": 80,
      "direction": "older",
      "group_id": groupId,
      "with_items": true,
      "mode": "scroll",
      "replies_desired": 20
    }
    let chunk;

    ({data, chunk} = {...await this.__getNextChunk(data)});

    while (chunk != null) {
      for (let msg of chunk.content) {
        let profileId = msg.creator_id.toString();
        if (!result.hasProfile(profileId)) {
          result.addProfile(profileId,
              await fetch(`${this.profileUrl}${profileId}`, {headers: this.headers})
                  .then(response => response.json()));
        }
      }

      result.appendContent(chunk.content);
      result.appendItems(chunk.items);
      result.appendParentPosts(chunk.parent_posts);
      result.appendReplies(chunk.replies);

      ({data, chunk} = {...await this.__getNextChunk(data)});
    }

    console.log(result);
    return result;
  }

  async __getNextChunk(inputData) {
    const data = {
      ...inputData,
      request_id: `${Date.now()}`
    }

    const postUrl = `https://app-gamma.glip.com/api/group/${data.group_id}/content`;
    const queryString = new URLSearchParams(data).toString();

    let chunk = await fetch(`${postUrl}?${queryString}`, {headers: this.headers})
        .then(res => res.json());

    if (chunk.content.length === 0) {
      return null;
    }


    let lastPost = chunk.content.slice(-1)[0];
    data.post_id = lastPost._id;

    return {data, chunk}
  }
}

export default Downloader;