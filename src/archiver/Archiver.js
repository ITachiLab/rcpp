class Archiver {
  constructor() {
  }

  /**
   * Get the final Blob of this archiver.
   *
   * This method should be used only when the archiver has already been used
   * by the message downloader. In other case, it will produce empty result.
   *
   * @returns {Promise<Blob>} The {@link Promise} resolving to a {@link Blob}
   * with data.
   */
  getBlob() {
  }

  /**
   * Invoked when entering the conversation.
   *
   * This method is always the first to be called when the visiting process
   * starts. It doesn't take any parameters (as of now), so it serves a sole
   * purpose of the visiting entry method.
   */
  visitConversation() {
  }

  /**
   * Invoked for each message which is not a reply.
   *
   * This method is guaranteed to be invoked in the same order as the messages
   * appear in the conversation (oldest first).
   *
   * The generic form of a message object is given below.
   * @example
   * {
   *   "_id": 91919191919191,
   *   "created_at": 1732109397509,
   *   "creator_id": 1234567890,
   *   "version": 1231231231231231,
   *   "model_size": 0,
   *   "is_new": true,
   *   "item_ids": [],
   *   "post_ids": [],
   *   "modified_at": 1732109397509,
   *   "deactivated": false,
   *   "company_id": 1112223334,
   *   "source": "Jupiter",
   *   "is_team_mention": false,
   *   "at_mention_non_item_ids": [],
   *   "at_mention_items": [],
   *   "unique_id": "1111111111111111",
   *   "text": "Hi!",
   *   "group_id": 112233445566,
   *   "items": [],
   *   "from_group_id": 445566778899,
   *   "function_id": "post",
   *   "model_id": "",
   *   "at_mention_item_ids": [],
   *   "expires_on": 1792589397507
   * }
   *
   * @param {Object} msg - the message object
   */
  visitMessage(msg) {
  }

  /**
   * Invoked for each message reply.
   *
   * The reply object looks almost exactly like the normal message object
   * (take a look at {@link visitMessage}), however, it also has the "chain_id"
   * property which identifies a chain of messages to which the reply belongs.
   * All replies belonging to the same thread has the same "chain_id".
   *
   * This method is guaranteed to be invoked in the same order as the replies
   * appear in the conversation (oldest first).
   *
   * @param {Object} reply - the message reply object
   * @see visitMessage
   */
  visitReply(reply) {
  }

  /**
   * Invoked for the author of the message.
   *
   * The generic form of a profile object is given below.
   * @example
   * {
   *     "_id": 1111111111111,
   *     "created_at": 1585058384517,
   *     "creator_id": 22222222222,
   *     "version": 3333333333333333,
   *     "model_size": 0,
   *     "is_new": false,
   *     "company_id": 44444444444,
   *     "email": "user@example.com",
   *     "email_friendly_abbreviation": "john.doe",
   *     "promo_code": null,
   *     "is_webmail": null,
   *     "foreign_id": null,
   *     "landing_page": null,
   *     "first_user": null,
   *     "externally_registered": "rc_signons",
   *     "is_pseudo_user": null,
   *     "glip_user_id": null,
   *     "pseudo_user_phone_number": null,
   *     "inviter_id": 55555555555,
   *     "invited_to_group_id": 66666666666,
   *     "state_id": 77777777777,
   *     "profile_id": 88888888888,
   *     "me_group_id": 999999999999,
   *     "timezone_info": { "offset": -60, "name": "Europe/Berlin" },
   *     "searchable_email": "user@example.com",
   *     "modified_at": 1732379196859,
   *     "deactivated": false,
   *     "invite_emails_sent": [ 1111111111111 ],
   *     "rc_extension_id": 6666666666,
   *     "rc_account_id": 9999999999,
   *     "first_name": "John",
   *     "last_name": "Doe",
   *     "has_bogus_email": false,
   *     "rc_extension_hidden": false,
   *     "rc_contact_mobile": null,
   *     "rc_contact_mobile_hidden": null,
   *     "searchable_first_name": "john",
   *     "searchable_last_name": "doe",
   *     "registered_at": 2222222222222,
   *     "last_meaningful_update": 3333333333333,
   *     "headshot": {},
   *     "headshot_version": 5555555555555,
   *     "model_id": "6666666666666",
   *     "away_status": "Out of office",
   *     "skip_ilm": false,
   *     "has_headshot": true,
   *     "department": "",
   *     "homepage": "",
   *     "job_title": "CEO",
   *     "location": "",
   *     "teams_at_deactivation": null,
   *     "sanitized_rc_extension": {},
   *     "sanitized_rc_first_name": "John",
   *     "sanitized_rc_last_name": "Doe",
   *     "has_rc_access_token": true,
   *     "teams_removed_from": [],
   *     "site": {},
   *     "has_registered": false,
   *     "display_name": "John Doe"
   * }
   *
   * @param {Object }profile - the profile object
   */
  visitAuthor(profile) {
  }

  /**
   * Invoked for each file item appearing in the message or reply.
   *
   * @param {String} url - the URL where the item is reachable
   * @param {String} name - the name of the file
   * @param {String} fileType - the type of the file
   */
  visitItemFile(url, name, fileType) {
  }

  /**
   * Invoked for a code snippet appearing in the message or reply.
   *
   * @param {String} name - the name of the snippet
   * @param {String} content - the raw content
   * @param {String} mimeType - the MIME type (contains snippet's language)
   */
  visitItemCodeSnippet(name, content, mimeType) {
  }
}

export default Archiver;