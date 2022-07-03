import { Platform } from 'react-native';
import StaticServer from 'react-native-static-server';
import RNFetchBlob from 'react-native-fetch-blob';
import { unzip } from 'react-native-zip-archive';
// import { join } from 'path';
// import { readFileSync } from 'fs';

const docDir = Platform.OS === 'ios' ?
  RNFetchBlob.fs.dirs.DocumentDir :
  RNFetchBlob.fs.dirs.DownloadDir;
const locDir = RNFetchBlob.fs.dirs.DocumentDir;

if (!global.Blob) {
  global.Blob = RNFetchBlob.polyfill.Blob;
}

const Uri = require('epubjs/lib/utils/url');

export default class Streamer {
  constructor(opts) {
    opts = opts || {};
    this.port = opts.port || 0;
    this.root = opts.root || 'www';
    this.server = new StaticServer(this.port, this.root, { localOnly: true });

    this.serverOrigin = 'file://';

    this.urls = [];
    this.locals = [];
    this.paths = [];

    this.started = false;
    this.cache = false;
  }

  start(options = {}) {
    this.started = true;
    this.cache = !!options.cache;
    return this.server.start().then((url) => {
      this.serverOrigin = url;
      return url;
    });
  }

  stop() {
    this.started = false;
    if (this.server) {
      this.server.stop();
    }
  }

  kill() {
    this.started = false;
    if (this.server) {
      this.server.kill();
    }
  }

  add(bookUrl) {
    const uri = new Uri(bookUrl);
    return RNFetchBlob
      .config({
        fileCache: true,
        path: `${docDir}/${uri.filename}`,
      })
      .fetch('GET', bookUrl)
      .then((res) => {
        const sourcePath = res.path();
        const filename = this.filename(bookUrl);
        const targetPath = `${locDir}/${this.root}/${filename}`;
        const url = `${this.serverOrigin}/${filename}/`;
        return unzip(sourcePath, targetPath)
          .then((path) => {
            this.urls.push(bookUrl);
            this.locals.push(url);
            this.paths.push(path);
            if (!this.cache) res.flush();
            return { url, sourcePath };
          });
      });
  }

  check(bookUrl) {
    const filename = this.filename(bookUrl);
    const targetPath = `${locDir}/${this.root}/${filename}`;
    // const targetPath = `${docDir}/${filename}`;
    return RNFetchBlob.fs.exists(targetPath);
  }

  get(bookUrl) {
    return this.check(bookUrl)
      .then((exists) => {
        __DEV__ && console.log('exists:', exists, bookUrl);
        if (exists) {
          const filename = this.filename(bookUrl);
          const sourcePath = `${docDir}/${filename}.epub`;
          const url = `${this.serverOrigin}/${filename}/`;
          return { url, sourcePath };
        }
        return this.add(bookUrl);
      });
  }

  filename(bookUrl) {
    const uri = new Uri(bookUrl);
    return uri.filename.replace('.epub', '');
  }

  // remove(path) {
  //   return RNFetchBlob.fs.lstat(path)
  //     .then((stats) => {
  //       const index = this.paths.indexOf(path);
  //       this.paths.splice(index, 1);
  //       this.urls.splice(index, 1);
  //       this.locals.splice(index, 1);
  //     })
  //     .catch((err) => {});
  // }

  // clean() {
  //   this.paths.forEach((path) => {
  //     this.remove(path);
  //   });
  // }
}
