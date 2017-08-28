#
# Search for phrases in a file using grep
# 
# Usage:
#         grep-file-fir-words.bash <tweets-file> <phrases-file>
#

PHRASES=$2
while read  p; do
  LINE=$p
  TRIMMED="$(echo -e "${LINE}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
  echo $TRIMMED `grep $TRIMMED $1 | wc -l`
done < $PHRASES