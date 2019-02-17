========================
REST API Documentation
========================

The Admin REST API lives at ``/admin/api`` endpoint, responds to GET, POST and DELETE and requires admin token authorization.

The ``/api/app-date`` endpoint responds to GET and requires authorization token with at least user privileges.

The ``/api/login`` and ``api/register`` responds to POST as urlencoded form. Token is not required.

The others ``/api/`` endpoints don't require authorization.

Authentication method
---------------------

To authenticate, you have to send a valid access token in the Authorization header.

.. code-block:: text

    Authorization: token eyJhzUxMiJ9.eyJfQ.mEVs_ZtJyHMfcn8qw

Authentication token
--------------------

.. code-block:: text

    /api/login

POST 
++++++

Returns Authorization token

.. code-block:: bash

   curl "/api/login" \
   --data-urlencode "username=user"  \
   --data-urlencode "password=user"

.. code-block:: js

   {
	    "token": "eyUxMiJ9.eyJpZCI6Ij4ifQ.5ZgOvtSiuhnUQQc9Mz6oro7ew"
   }



Path
----

The Path resource represents  a particular set of events with similar topics occurring one after another.

========   ===============
Property   Description
========   ===============
id	       The unique identifier by which to identify the path
name       The name of the path
info       The additional information about path
active     Boolean defines whether the path is active
========   ===============

List Resource
+++++++++++++

.. code-block:: text

    /admin/api/paths

GET
+++

Returns a list of all paths.

.. code-block:: bash

   curl --header "Authorization: token eyiJ9.eyJnVzZXjWRtaW4ifQ.cEvSYhg4zZdlqxaQ" /admin/api/paths

.. code-block:: js


	[
	    {
	        "id": 1,
	        "name": "Sciezka 1",
	        "info": "Sciezka 1",
	        "active": false
	    },
	    {
	        "id": 2,
	        "name": "Sciezka 2",
	        "info": "Sciezka 2",
	        "active": true
	    }
	]



POST 
++++++

Creates a new path

==============   ===============
Param            Description
==============   ===============
name             Name of the path 
info      		 The additional information about path
==============   ===============



.. code-block:: bash

   curl -X POST /admin/api/paths \
   -H 'Authorization: token eyJh.eyJW4ifQ.mJnN6A' \
   -H "Content-Type: application/json" \
   -d '{"name": "Sciezka 3","info": "Sciezka 3","active": false}'


Instance Resource
~~~~~~~~~~~~~~~~~~

.. code-block:: text

    /admin/api/paths/{path_id}


DELETE
+++++++

Deletes a path

.. code-block:: bash

    curl -X DELETE /admin/api/paths/{path_id} \
    -H 'Authorization: token eyJh.eyJW4ifQ.mJnN6A' 



Place
------

The Place resource represents an interesting place related to labday.

=========   ===============
Property    Description
=========   ===============
id          The unique identifier
type        Integer represents one of the types of places
name        Name of the place
img         url with picture of the place
info        The additional information
latitude    latutude of place
longitude   longitude of place
=========   ===============

Types of places:

- 0 - NOT SET
- 1 - INFO
- 2 - FOOD
- 3 - REST

List Resource
+++++++++++++

.. code-block:: text

    /admin/api/places

GET
+++++

Returns a list of all paths.

.. code-block:: bash

   curl --header "Authorization: token eyiJ9.eyJnVzZXjWRtaW4ifQ.cEvSYhg4zZdlqxaQ" /admin/api/places

.. code-block:: js


	[
        {
            "id": 1,
            "type": 2,
            "name": "Bar Bazylia",
            "info": "Bar Bazylia w budynku C-13 Politechniki Wroclawskiej to stołówka stworzona z myślą o studentach i specjalnie dla nich.",
            "img": "https://i.imgur.com/fdaYDDh.jpg",
            "latitude": "51.107402176013075",
            "longitude": "17.05905854701996"
        },
        {
            "id": 2,
            "type": 2,
            "name": "SKS",
            "info": "Strefa Kultury Studenckiej\r\n- stołówka, kawiarnia, miejsce spotkań oraz wydarzeń kulturalnych",
            "img": "https://i.imgur.com/ODm8OaI.jpg",
            "latitude": "51.10886054765045",
            "longitude": "17.056875228881836"
        }
	]



POST 
++++++

Creates a new Place

==============   ===============
Param            Description
==============   ===============
id	             The unique identifier
type             Integer represents one of the types of places
name             Name of the place
img              url with picture of the place
info             The additional information
latitude         latutude of place
longitude        longitude of place
==============   ===============



.. code-block:: bash

   curl -X POST /admin/api/places \
   -H 'Authorization: token eyJh.eyJW4ifQ.mJnN6A' \
   -H "Content-Type: application/json" \
   -d '{"type": 2, "name": "SKS", "info": "Strefa Kultury Studenckiej\r\n- stołówka, kawiarnia, miejsce spotkań oraz wydarzeń kulturalnych", "img": "https://i.imgur.com/ODm8OaI.jpg", "latitude": "51.10886054765045", "longitude": "17.056875228881836"}'


Instance Resource
~~~~~~~~~~~~~~~~~~

.. code-block:: text

    /admin/api/places/{place_id}


DELETE
+++++++

Deletes a place

.. code-block:: bash

    curl -X DELETE /admin/api/places/{place_id} \
    -H 'Authorization: token eyJh.eyJW4ifQ.mJnN6A' 


Speaker
-------

The Speaker resource represents an interesting place related to labday.

========   ===============
Property	Description
========   ===============
id	       The unique identifier
name       Firstname and lastname of speaker
img        url with picture of the speaker
info       The additional information
========   ===============

List Resource
+++++++++++++

.. code-block:: text

    /admin/api/speakers

GET
+++++

Returns a list of all speakers.

.. code-block:: bash

   curl --header "Authorization: token eyiJ9.eyJnVzZXjWRtaW4ifQ.cEvSYhg4zZdlqxaQ" /admin/api/speakers

.. code-block:: js


	[
	    {
	        "id": 8,
	        "name": "NaS",
	        "info": "Not a Speaker - for registry and opening",
	        "img": ""
	    }
	]



POST 
++++++

Creates a new Speaker

==============   ===============
Param            Description
==============   ===============
id	             The unique identifier
name             Firstname and lastname of speaker
img              url with picture of the speaker
info             The additional information
==============   ===============



.. code-block:: bash

   curl -X POST /admin/api/speakers \
   -H 'Authorization: token eyJh.eyJW4ifQ.mJnN6A' \
   -H "Content-Type: application/json" \
   -d '{name":"NaS","info":"Not a Speaker - for registry and opening","img":""}'


Instance Resource
~~~~~~~~~~~~~~~~~~

.. code-block:: text

    /admin/api/places/{place_id}


DELETE
+++++++

Deletes a place

.. code-block:: bash

    curl -X DELETE /admin/api/speakers/{speaker_id} \
    -H 'Authorization: token eyJh.eyJW4ifQ.mJnN6A' 

