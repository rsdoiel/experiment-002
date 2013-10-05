
# experiment 001

Practice JavaScript programming based on parsing CSV data.

* modules.js
* csv.js
* csv_test.js

# Setup

These are the steps taken on my Raspberry Pi running Raspbian.
I uses create a virtual host on one of the loop back ports (e.g.
127.0.0.*) to test with. That way I can see how things works
without exposing my mistakes to crackers.

1. create your sites directory and go to it.

```shell
    mkdir /sites
    cd /sites
````

2. Clone this repository and add to your Nginx sites enabled
    a. clone into /sites/experiment-002.local
    b. change to the cloned project
    c. copy nginx-config-example to experiment-002.local
    d. Edit to match your system's requirements
    the configuration to your Nginx sites-enable folder
    e. test your nginx configuration, re-edit if needed
    f. update hosts file if needed
    g. restart Nginx

```shell
    git clone https://github.com/rsdoiel/experiment-002.git experiment-002.local
    cd experiment-002.local
    cp nginx-config-example /etc/nginx/sites-enabled/experiment-002.local
    nano /etc/nginx/sites-enable/experiment-002.local
    nginx -t
    nano /etc/hosts
    /etc/init.d/nginx restart
```

Example /etc/hosts entry

```
    127.0.0.10 experiment-002.local
```

Example /etc/nginx/sites-enable/experiment-002.local

```
    #
    # Static web services via 127.0.0.*
    #
    server {
        listen experiment-002.local:80;
        server_name experiment-002.local;
        root  /sites/experiment-002.local/www;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
```
