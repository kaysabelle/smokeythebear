"""
Python script that scraps the weather information
Writes directly to index.html
"""
from bs4 import BeautifulSoup, NavigableString

try:
    from urllib2 import urlopen
except ImportError:
    from urllib.request import urlopen # py3k

# Parse out weather information we need, stored in text
url = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44904&sig=&type=&start=7-APR-15&end=7-APR-15&time=&user=4e1&priority="
soup = BeautifulSoup(urlopen(url))

invalid_tags = ['html', 'body']

for tag in invalid_tags:
	for match in soup.findAll(tag):
		match.replaceWithChildren()

text = soup.prettify()

# Writes over the HTMl
with open("data.xml", "wb") as file:
	file.write(bytes(text))