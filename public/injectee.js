window.postMessage({
  "accessToken": window
      ._moduleManager
      ._context
      ._networkManager
      .handlers.get("GLIP_ACCOUNT.GLIP_SERVER").config.tokenHandler.accessToken()
})
