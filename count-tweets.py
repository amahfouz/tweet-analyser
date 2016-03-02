'''
  Counts tweets in a file
'''

import codecs

f = codecs.open("eg-tweets.txt", "r", "utf8")
count = 0
for line in f:
	if line.startswith("------------------------"):
		count = count + 1

print count		