// Copyright (c) 2014 Winfield Peterson
// http://github.com/wpeterson/i18n-translate-light
// MIT License (See LICENSE.txt)

var I18NTranslateLight = (function($) {
  this.dict             = {};
  this.defaultLocale    = 'en';
  this.activeLocales    = [ this.defaultLocale ];

  var setLocale = function(locale) {
    this.activeLocales = expandLocales(locale);
  };

  var autoDetectLocale = function() {
    var detectedLocale = detectBrowserLocale();

    this.setLocale(detectedLocale);
  };

  var detectBrowserLocale = function() {
    return navigator.userLanguage || navigator.language;
  };

  var addTranslations = function(locale, data) {
    this.dict[locale] = this.dict[locale] || {};

    var deepMerge = true; //Merge data into top-level locale key
    this.dict[locale] = $.extend(deepMerge, {}, this.dict[locale], data);
  };

  var expandLocales = function(targetLocale) {
    if (!targetLocale ||
         targetLocale == '' ||
         this.defaultLocale == targetLocale) { 
      return parseLocale(this.defaultLocale);
    }

    var defaultLocales  = parseLocale(this.defaultLocale);
    var targetLocales   = parseLocale(targetLocale);
    var allLocales      = targetLocales.concat(defaultLocales);
    var uniqueLocales   = [];

    $.each(allLocales, function(i, locale) {
      if ($.inArray(locale, uniqueLocales) == -1) uniqueLocales.push(locale);
    });
    return uniqueLocales;
  };

  var parseLocale = function(locale) {
    if (!locale) return [];

    var parsedLocale = locale.match(/(\w+)-(\w+)/);
    if (parsedLocale) {
      return [ parsedLocale[0], parsedLocale[1] ];
    } else {
      return [ locale ];
    }
  };

  var translate = function(key) {
    for(var i=0; i < this.activeLocales.length; i++) {
      var locale = this.activeLocales[i];
      var translation = this.dict[locale] && this.dict[locale][key];
      if (translation) return translation
    }

    return null;
  };


  ///////////////////////////////////////////////////////////
  // Exports
  ///////////////////////////////////////////////////////////
  return {
    dict:                 this.dict,
    activeLocales:        this.activeLocales,
    defaultLocale:        this.defaultLocale,
    resetDict:            function() { this.dict = {}; },
    detectBrowserLocale:  detectBrowserLocale,
    setLocale:            setLocale,
    autoDetectLocale:     autoDetectLocale,
    expandLocales:        expandLocales,
    parseLocale:          parseLocale,
    addTranslations:      addTranslations,
    translate:            translate,
    _t:                   translate
  };
})(jQuery);
