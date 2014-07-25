# Require any additional compass plugins here.
#require 'compass/import-once/activate'
#require 'animation' # not need anymore (compass 1.0.16 ~)
require 'susy' # Susy was built to be part of the Compass ecosystem.
require 'breakpoint' # Help with writing media queries.

# Set this to the root of your project when deployed:
http_path = "/"
http_images_path = "../images"
css_dir = "app/styles"
sass_dir = "app/styles/sass"
images_dir = "app/images"
javascripts_dir = "app/styles"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Enable CSS source maps
sourcemap = true

# Set cash busting function with MD5 hash
asset_cache_buster do |http_path, real_path|
  if File.exists?(real_path)
    Digest::MD5.file(real_path.path).hexdigest[0,8]
  end
end