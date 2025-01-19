from django.shortcuts import render

def home_page(request, *args, **kwargs): 
    heading = "django project"
    metadata = " This is a crush django project"
    home_title = {
        "title" : heading,
        "description": metadata 
        }
    """Returns the home page."""
    return render(request, 'home.html', home_title )
