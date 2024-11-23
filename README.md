# RC++

This is a browser extension which is an extension of RingCentral functionalities. Actually, it only provides a single enhancement which is a possibility to archive chat messages. No more enhancements are needed, it's better to archive everything and just switch to a better alternative.

## Installation

The easiest way is to download a release from the releases page, which is just a ZIP file with extension's contents, unpack it, and load it into the browser as unpacked extension. This usually can be done in a few simple steps.

### Chromium based browsers

1. Navigate to: [chrome://extensions](chrome://extensions).
2. Enable the developer mode.
3. Look for "Load unpacked" button, and click it.
4. Open the directory with extension's contents.

### Firefox

1. Navigate to: [about:addons](about:addons).
2. Click on the gear icon, and select: "Debug Add-ons".
3. Click on the "Load Temporary Add-on".
4. Open the `manifest.json` from the extension's directory.

## Usage

Login to RingCentral via the webapp: [https://app.ringcentral.com](https://app.ringcentral.com). When you open any private chat or group, there should be a diskette (💾) icon in the right-hand side of the top toolbar of the chat.

> [!IMPORTANT]
> If the diskette icon is missing, try refreshing the window first.

In order to archive the current chat, click the icon, and you will see a confirmation dialog allowing you to either:
- Download a shallow copy of the chat, which is an HTML file including all messages, but with attachments (files, images, etc.) included only as links to external files (Amazon S3).
- Download a complete TAR archive, which additionally contains all attachments.

The choice is yours, however, keep in mind that the complete option will take longer to process.

Once the process is started, the diskette icon starts spinning, and will continue until the backup is ready. When it's done, your browser will either open a new tab with the generated HTML page (if you've chosen the light version), or it will initiate downloading of the TAR archive.

## INB4

- No data leaves your computer, everything is processed within the extension's code.
- GIFs from Giphy are not included.
- TAR has been chosen because it's simple, and the archiving library is pretty small.

## Development

The project uses Vite for building, so refer to Vite's manual for details regarding the configuration and building process.

### Custom archiver

You can develop your own implementations of archivers in addition to `ShallowHtmlArchiver` and `TarArchiver`. The process has been built around a visitor pattern, so your only responsibility is to react to a bunch of methods invoked by the message downloader. Take a look at the base class: `Archiver` for more details.