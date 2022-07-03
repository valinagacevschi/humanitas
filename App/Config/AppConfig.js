// Simple React Native specific changes

import '../I18n/I18n';

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: false
};

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

window.fix = (image) => {
  if (!image) return `${image}`;
  if (image.startsWith('/')) {
    if (__DEV__ && false) {
      return `http://localhost:3000${encodeURI(image)}`;
    }
    return `https://example.com${encodeURI(image)}`;
  }
  return image;
};

Array.prototype.same = function(b) {
  if (this === b) return true;
  if (this == null || b == null) return false;
  if (this.length !== b.length) return false;
  return true;
};