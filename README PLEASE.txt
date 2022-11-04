I spent some time to make the website accessible at :

== https://kset.home.asidiras.dev/ ==

What I did is create a bunch of routes that allow me to serve
the assets by requesting :

@GET https://kset.home.asidiras.dev/assets/:id 
and making the base domain serve the HTML file