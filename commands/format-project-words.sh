# In repository root
cd "$(dirname $0)/.."

cat project-words.txt | sed -e '/^$/d' | sort --ignore-case | tr '[A-Z]' '[a-z]' | uniq > project-words.txt.tmp && mv project-words.txt.tmp project-words.txt
