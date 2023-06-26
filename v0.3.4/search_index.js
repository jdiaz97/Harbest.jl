var documenterSearchIndex = {"docs":
[{"location":"lib/docstrings/#Docstrings","page":"Docstrings","title":"Docstrings","text":"","category":"section"},{"location":"lib/docstrings/","page":"Docstrings","title":"Docstrings","text":"In development","category":"page"},{"location":"#Harbest.jl","page":"Home","title":"Harbest.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Web Scraping is a technique to get data from the internet. In this package you can do this to get data from an static HTML.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is a port form tidyverse/Rvest","category":"page"},{"location":"#Functions","page":"Home","title":"Functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"read_html(url)\nhtmlelements(html,string) or htmlelements(html,strings)\nhtmlattrs(html,string) or htmlattrs(html)\nhtmltext(html) or htmltext2(html) or html_text3(html)","category":"page"},{"location":"#Tutorial","page":"Home","title":"Tutorial","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"First, we import","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Harbest, DataFrames, PlotlyJS","category":"page"},{"location":"","page":"Home","title":"Home","text":"Then, scrape the data with html_elements, html_attrs and html_text3","category":"page"},{"location":"","page":"Home","title":"Home","text":"function get_scores(html)\r\n    score = html_elements(html,\".ipl-rating-star__rating\") |> html_text3 ## Read scores from HTML\r\n    score = score[score .!= \"Rate\" .&& occursin.(\".\",score)]  ## Get actual scores\r\n    scores::Vector{Float64} = parse.(Float64,score)    \r\n    return scores\r\nend\r\n\r\nfunction get_names(html)\r\n    names::Vector{String} = html_elements(html,[\".info\",\"strong\"]) |> html_text3 \r\n    return names\r\nend\r\n\r\nfunction get_imgs(html)\r\n    data = html_elements(html,[\"img\",\".zero-z-index\"])\r\n    imgs::Vector{String} = html_attrs(data,\"src\")\r\n    return imgs\r\nend\r\n\r\nfunction get_n_season(html)\r\n    data = read_html(html)\r\n    data = html_elements(data,[\"select\",\"option\"])[2] |> html_text3\r\n    n_season::Int = parse(Int,data)\r\n    return n_season\r\nend\r\n\r\nfunction get_df(url)\r\n    df::DataFrame = DataFrame()\r\n    n_seasons = get_n_season(url)\r\n    urls = url.*\"episodes?season=\".*string.(1:n_seasons)\r\n    for i in eachindex(urls)\r\n        html = read_html(urls[i])\r\n        temp_df = DataFrame(scores = get_scores(html),\r\n                  names = get_names(html),\r\n                  season = i,\r\n                  images = get_imgs(html))\r\n        df = [df;temp_df]\r\n    end\r\n    df[!,\"N\"]= rownumber.(eachrow(df))\r\n    return df\r\nend\r\n\r\nfunction plot_df(df,title)\r\n    return plot(df,\r\n                x = :N,\r\n                y = :scores,\r\n                text = :names,\r\n                color = :season, \r\n                mode = \"lines\",\r\n                labels=Dict(\r\n                    :N => \"Episode number\",\r\n                    :scores => \"Score\",\r\n                    :season => \"Season\"\r\n                ),\r\n                Layout(title = title* \" score on IMDb\")\r\n                )\r\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"community_df = get_df(\"https://www.imdb.com/title/tt1439629/\")\r\nplot_df(community_df,\"Community\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"<iframe src=\"plot_community.html\" style=\"height:500px;width:100%;\"></iframe>","category":"page"},{"location":"","page":"Home","title":"Home","text":"bojack_df = get_df(\"https://www.imdb.com/title/tt3398228/\")\r\nplot_df(bojack_df,\"Bojack Horseman\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"<iframe src=\"plot_bojack.html\" style=\"height:500px;width:100%;\"></iframe>","category":"page"}]
}
