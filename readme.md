# Harbest.jl
## Simple web scraping with Julia
This library combines HTTP, Gumbo and Cascadia for a more simple way to scrape data. 

Early version. Based on rvest from R.

## Usage

```julia
using Harbest

starwars = read_html("https://rvest.tidyverse.org/articles/starwars.html")

titles = html_elements(starwars, ["section", "h2"]) |> html_text3
titles
# 7-element Vector{String}:
#  "The Phantom Menace"
#  "Attack of the Clones"
#  "Revenge of the Sith"
#  ⋮
#  "Return of the Jedi"
#  "The Force Awakens"

html = read_html("https://en.wikipedia.org/w/index.php?title=The_Lego_Movie&oldid=998422565")
table = html_elements(html, ".tracklist") |> html_table
table
# 28×4 DataFrame
#  Row │ No.     Title                              Performer(s)                       Length 
#      │ String  String                             String                             String 
# ─────┼──────────────────────────────────────────────────────────────────────────────────────
#    1 │ 1.      "Everything Is Awesome"            Tegan and Sara featuring The Lon…  2:43   
#    2 │ 2.      "Prologue"                                                            2:28   
#    3 │ 3.      "Emmett's Morning"                                                    2:00   
#    4 │ 4.      "Emmett Falls in Love"                                                1:11   
#    5 │ 5.      "Escape"                                                              3:26
#   ⋮  │   ⋮                     ⋮                                  ⋮                    ⋮
#   25 │ 25.     "Everything Is Awesome"            Jo Li (Joshua Bartholomew and Li…  1:26
#   26 │ 26.     "Everything Is Awesome (unplugge…  Shawn Patterson and Sammy Allen    1:24
#   27 │ 27.     "Untitled Self Portrait"           Will Arnett                        1:08
#   28 │ 28.     "Everything Is Awesome (instrume…                                     2:41
#                                                                              19 rows omitted
```

## Functions

### `read_html`

Read an url

### `html_elements`

Get the elements you want from an html

### `html_text`

Get the text, you can also use `html_text2` or `html_text3` for cleaner text

### `html_attrs`

Get the content of an attribute, if string not provided it would try to get you an attribute

### `html_table`

Create a DataFrame from an HTML Table node

## Notes

- I'm actively accepting suggestions