require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name          = "RNSearchBar"
  s.version       = package["version"]
  s.source_files  = "ios/**/*.{h,m}"
  s.platform      = :ios, "8.0"
  s.authors       = { "umhan" => "" }
  s.license       = package["license"]
  s.summary       = package["description"]
  s.homepage      = package["homepage"]
  s.source        = { :git => package["repository"]["url"] }
  s.requires_arc  = true
  s.preserve_paths= "package.json", "LICENSE"
  s.dependency 'React'
end
