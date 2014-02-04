i18n-translate-light
====================

i18n-translate-light is a light-weight translation library without any frills, for JS apps in the browser.  This library ONLY translates strings for different locales, without providing heavy weight formatting or interpolation.  If you require number/date formatting, interpolation, or advanced features I recommend a more mature I18N library.

This library was built for a small, embedded JS application where code weight and load time matter.

## Usage

This gem allows loaded local translations for multiple i18n locales.  It also allows auto-detecting the active locale within the browser or manually setting it.  Translations can be looked up by keep for the best match between available translations and the user's language.

Here's an example to load English (`en`) and German (`de`) translations for simple text and auto-detect user's locale.

```javascript
I18NTranslateLight.autoDetectLocale();

I18NTranslateLight.addTranslations("en", {
  choice_or: "OR",
  vote: "Vote!"
});

I18NTranslateLight.addTranslations('de', {
  choice_or: "ODER",
  vote: "Wählen!"
});

I18NTranslateLight.translate('choice_or');
// => Returns 'OR'

I18NTranslateLight.setLocale('de-AT');
I18NTranslateLight.translate('choice_or');
// => Returns 'ODER'

```

API:
----
Here are the following APIs for the I18NTranslateLight singleton:

* `setLocale(locale)` - Manually set active user locale string, eg: `en-US`.
* `autoDetectLocale()` - Auto detect user locale from Browser settings, sets active locale.
* `addTranslations(locale, locationHash)` - Add a translations for locale (eg: `en-US`) as a hash of key/string pairs (eg: `{ "ui.dialog.cancel": "Cancel" }`)
* `translate(key)` / `_t(key)` - Return translated text for key


## Contributing

1. Fork it
2. Bundle Install (`bundle install`)
3. Run the Tests (`rake test`)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
