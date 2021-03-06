"""
Python script that scraps the adjective fire danger information
"""
from bs4 import BeautifulSoup, NavigableString
import datetime

try:
    from urllib2 import urlopen
except ImportError:
    from urllib.request import urlopen # py3k

# Get the report for the current date
today = datetime.date.today()
todaysdate = today.strftime('%d') + today.strftime('%b').upper() + today.strftime('%y')

#lapanza = "44905"
#lastablas = "44904"
#arroyogrande = "44915"

url_lt = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44904&start=" + todaysdate + "&end=" + todaysdate + "&user=4e1"
print "Getting Las Tablas data from %s" %url_lt 
soup_lt = BeautifulSoup(urlopen(url_lt))

url_lp = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44905&start=" + todaysdate + "&end=" + todaysdate + "&user=4e1"
print "Getting La Panza data from %s" %url_lp 
soup_lp = BeautifulSoup(urlopen(url_lp))

url_ag = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44915&start=" + todaysdate + "&end=" + todaysdate + "&user=4e1"
print "Getting Arroyo Grande data from %s" %url_ag 
soup_ag = BeautifulSoup(urlopen(url_ag)) 

# Remove unnecessary html tags to get clean xml
invalid_tags = ['html', 'body']

for tag in invalid_tags:
	for match in soup_lt.findAll(tag):
		match.replaceWithChildren()
	for match in soup_lp.findAll(tag):
		match.replaceWithChildren()
	for match in soup_ag.findAll(tag):
		match.replaceWithChildren()

# Write to file
with open("lastablas.xml", "wb") as file:
	file.write(bytes(soup_lt))

with open("lapanza.xml", "wb") as file:
	file.write(bytes(soup_lp))

with open("arroyogrande.xml", "wb") as file:
	file.write(bytes(soup_ag))