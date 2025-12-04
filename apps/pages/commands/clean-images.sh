for FILE in $(git ls-files ./public/images); do
  git grep $(basename "$FILE") > /dev/null || git rm "$FILE"
done
