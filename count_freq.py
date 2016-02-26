'''
  Counts word frequencies in a text file.
  Words to be counted are read from a file.
'''

import codecs
import sys

def count_occurrences(f, w):
	count = 0
	for line in f:
		index = 0
		while True:
			index = line.find(w, index)
			if (index < 0):
				break

			index = index + 1	
			count = count + 1

	return count

''' 
	Main. 
	Iterate over all words and find each in the file
'''

reload(sys)  
sys.setdefaultencoding('utf8')

word_file = codecs.open("words.txt", 'r', 'utf-8')
for word in word_file:
	f = open("eg-tweets.txt")
	print word.rstrip()
	print(count_occurrences(f, word.rstrip()))
	f.close()



