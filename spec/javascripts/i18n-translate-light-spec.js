
describe("I18NTranslateLight", function() {
  it("should set defaults", function() {
    expect( I18NTranslateLight.dict           ).toEqual({});
    expect( I18NTranslateLight.defaultLocale  ).toEqual('en');
    expect( I18NTranslateLight.activeLocales  ).toEqual(['en']);
  });

  describe("addTranslations", function() {
    it("should add new translation", function() {
      var expected = {'en': { 'oh': 'yeah '} };
      expect(I18NTranslateLight.dict).toEqual({});

      I18NTranslateLight.addTranslations( 'en', expected['en'] );
      expect(I18NTranslateLight.dict).toEqual(expected);
    });

    it("should deep merge existing and new translation", function() {
      var existing  = { en: {
        oh: 'no',
        other: 'option',
        deep: {
          keep: 'keep',
          value: 'old'
        }
      } };
      
      var newData   = { oh: 'yeah', deep: { 'value': 'new' } };
      var expected  = { en: {
        oh: 'yeah',
        other: 'option',
        deep: {
          keep: 'keep',
          value: 'new'
        }
      } };

      I18NTranslateLight.addTranslations('en', existing['en']);
      expect(I18NTranslateLight.dict).toEqual(existing);

      I18NTranslateLight.addTranslations( 'en', newData );
      expect(I18NTranslateLight.dict).toEqual(expected);
    });
  }); //addTranslations

  describe("parseLocale", function() {
    it("should expand locales in order of specificity", function() {
      expect(I18NTranslateLight.parseLocale(null)).toEqual([]);
      expect(I18NTranslateLight.parseLocale('')).toEqual([]);
      expect(I18NTranslateLight.parseLocale('en')).toEqual(['en']);
      expect(I18NTranslateLight.parseLocale('en-US')).toEqual(['en-US', 'en']);
    });
  });

  describe("expandLocales", function() {
    it("should build full locale list", function() {
      expect(I18NTranslateLight.expandLocales(null)).toEqual(     [ 'en' ]);
      expect(I18NTranslateLight.expandLocales('')).toEqual(       [ 'en' ]);
      expect(I18NTranslateLight.expandLocales('en-US')).toEqual(  [ 'en-US', 'en', ]);
      expect(I18NTranslateLight.expandLocales('es')).toEqual(     [ 'es', 'en' ]);
    });
  });

  describe("detectBrowserLocale", function() {
    it("should detect default language", function() {
      expect(I18NTranslateLight.detectBrowserLocale()).toEqual("en-US");
    });

    it("should detect IE navigator.userLanguage", function () {
      var originalNavigator = window.navigator;
      window.navigator = { userLanguage: 'es-ES', language: 'foo' };

      expect(I18NTranslateLight.detectBrowserLocale()).toEqual("es-ES");

      window.navigator = originalNavigator;
    });

    it("should detect navigator.language", function () {
      var originalNavigator = window.navigator;
      window.navigator = { language: 'es-ES' };

      expect(I18NTranslateLight.detectBrowserLocale()).toEqual("es-ES");

      window.navigator = originalNavigator;
    });
  });

  describe("setLocale", function() {
    it("should set activeLocales", function() {
      I18NTranslateLight.setLocale('en');

      expect(I18NTranslateLight.activeLocales).toEqual([ 'en' ]);

      I18NTranslateLight.setLocale('es-ES');
      expect(I18NTranslateLight.activeLocales).toEqual([ 'es-ES', 'es', 'en' ]);
    });

    it("should set userLocale", function() {
      I18NTranslateLight.setLocale('en');

      expect(I18NTranslateLight.userLocale).toEqual('en');

      I18NTranslateLight.setLocale('es-ES');
      expect(I18NTranslateLight.userLocale).toEqual('es-ES');
    });
  });

  describe("translate", function() {
    it("should resolve keys in default locale", function() {
      I18NTranslateLight.resetDict();
      I18NTranslateLight.setLocale(null);
      I18NTranslateLight.addTranslations('en', {
        key: 'en_value'
      });
      
      expect( I18NTranslateLight.translate("unknown") ).toEqual(null);
      expect( I18NTranslateLight.translate("key")     ).toEqual('en_value');
    });

    it("should resolve keys in detected locale", function() {
      I18NTranslateLight.resetDict();
      I18NTranslateLight.setLocale('es-ES');
      I18NTranslateLight.defaultLocale = 'en';
      I18NTranslateLight.addTranslations('en', {
        key: 'en_value',
        en_only: 'en_only'
      });
      I18NTranslateLight.addTranslations('es', {
        key: 'es_value'
      });

      expect( I18NTranslateLight.translate('unknown') ).toEqual(null);
      expect( I18NTranslateLight.translate('en_only') ).toEqual('en_only');
      expect( I18NTranslateLight.translate('key')     ).toEqual('es_value');
    });

  });
});
