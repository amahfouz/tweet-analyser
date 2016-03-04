'''
  Counts tweets in a file
'''

import codecs
import sys

if len(sys.argv) < 2:
	print "Please provide filename as a command argument"
	sys.exit(100)

f = codecs.open(sys.argv[1], "r", "utf8")
count = 0
for line in f:
	if line.startswith("------------------------"):
		count = count + 1

print count		