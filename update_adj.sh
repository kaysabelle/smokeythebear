echo getting new data...
python triplescraper.py
mv -f *.xml xml

echo committing...
git add -A
git commit -m "Update adjective fire danger rating"
git push
