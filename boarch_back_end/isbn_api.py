import requests
from bs4 import BeautifulSoup


def get_book_name(isbn):
    result = requests.get(f"https://isbndb.com/book/{isbn}")
    soup = BeautifulSoup(result.text, 'html.parser')
    try:
        res = soup.find(text="Full Title").find_next().getText()
    except AttributeError:
        res = None
    return res
