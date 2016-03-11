'''
  Counts word frequencies in a text file.
  Words to be counted are read from a file.
'''

import codecs
import sys
import re
import time

def count_occurrences(f, words):
	count = [0] * len(words)
	for line in f:
		parts = re.split(r'[\n\r\t-_ #]', line)
		for part in parts:
			for index, word in enumerate(words):
				if (word == part):
					count[index] = count[index] + 1
					break

	return count

''' 
	Main. 
	Iterate over all words and find each in the file
'''

start = time.time()

reload(sys)  
sys.setdefaultencoding('utf8')

if len(sys.argv) < 2:
	print "Please provide filename as a command argument"
	sys.exit(100)

words = []
word_file = codecs.open("words.txt", 'r', 'utf-8')
for word in word_file:
	words.append(word.rstrip())

file = open(sys.argv[1])
print "Counting frequencies"
frequencies = count_occurrences(file, words)
print "Done counting frequencies"
file.close()

for word, freq in zip(words, frequencies):
	print word, "\t\t", freq
	
end = time.time()

print end - start, " seconds"

