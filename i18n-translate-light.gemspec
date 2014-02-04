# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |spec|
  spec.name          = "i18n-translate-light"
  spec.version       = "0.0.1"
  spec.authors       = ["Winfield Peterson"]
  spec.email         = ["winfield.peterson@gmail.com"]
  spec.summary       = %q{Light-weight I18N Translations}
  spec.description   = %q{i18n-translate-light is a light-weight translation library without any frills, for JS apps in the browser.}
  spec.homepage      = "http://github.com/wpeterson/i18n-translate-light"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "railties", ">= 3.1"

  spec.add_development_dependency "bundler", "~> 1.5"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "jasmine"
end
