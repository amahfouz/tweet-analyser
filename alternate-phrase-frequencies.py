'''
  Alternate (less-efficient, but simpler) way to count phrase frequencies in a text file.
  Each phrase is composed of a number of phrases spearated by space.
'''

import codecs
import sys
import re
import time

def count_occurrences(f, words):
	count = 0
	for line in f:
		parts = re.split(r'[\n\r\t-_ #]', line)
		for part_index, part in enumerate(parts):
			# are there enough remaining parts to match words?
			if len(parts) - part_index + 1 < len(words):
				break

			matched_all = True
			for word_index, word in enumerate(words):
				if word != parts[part_index + word_index]:
					matched_all = False
					break

			# matched all words 	
			if matched_all:
				count = count + 1
	return count

''' 
	Main. 
	Iterate over all phrases and find each in the file
'''

start = time.time()

reload(sys)  
sys.setdefaultencoding('utf8')

if len(sys.argv) < 3:
	print "Provide phrase filename and tweet file name as command arguments."
	sys.exit(100)

print "Counting phrase frequencies."
phrase_file = codecs.open(sys.argv[1], 'r', 'utf-8')
for phrase in phrase_file:
	if phrase.rstrip() == "":
		continue
	words = phrase.rstrip().split(" ")
	for word in phrase:
		print word
	tweets = open(sys.argv[2])
	freq = count_occurrences(tweets, words)
	print freq, phrase
	tweets.close()
print "Done counting frequencies."
phrase_file.close()

end = time.time()

print end - start, " seconds"

