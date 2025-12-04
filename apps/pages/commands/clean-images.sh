for FILE in $(git ls-files ./public/images); do
  git grep $(basename "$FILE") -- ./public > /dev/null || git rm "$FILE"
done
