i18n-translate-light
====================

i18n-translate-light is a light-weight translation library without any frills, for JS apps in the browser.  This library ONLY translates strings for different locales, without providing heavy weight formatting or interpolation.  If you require number/date formatting, interpolation, or advanced features I recommend a more mature I18N library.

This library was built for a small, embedded JS application where code weight and load time matter.  The user's locale can be auto-detected from the browser or manually set.  Translations are resolved on a best-match basis from an exact match up the chain to the default language.

The JS library is provided as a `Ruby gem` for use in Rails applications, or stand-alone as a JS file.

## Usage

This library loads local translations for multiple i18n locales.  It can either auto-detect the active locale within the browser (`autoDetectLocale()`) or set it manually (`setLocale()`).  Translations can be looked up by key for the best match between available translations and the user's language.

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
* `userLocale` - Return current user locale

## Installing

This JS library can be used directly, or as a Rails gem.

* Add to Bundler `Gemfile`:
```ruby
gem "i18n-translate-light"
```
* Install as a Ruby gem directly:
```bash
> gem install i18n-translate-light
```
* Download JS file directly:
```bash
> cd lib/assets/javascripts # Rails JS assets directory
> wget "https://raw2.github.com/wpeterson/i18n-translate-light/master/i18n-translate-light.js"
```

## Contributing

1. Fork it
2. Bundle Install (`bundle install`)
3. Run the Tests (`rake jasmine:ci`)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
