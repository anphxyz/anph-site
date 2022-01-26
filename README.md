I. Description

This is a simple app using JWT to authenticate and using SES to send mail by anph hosted at AWS server at https://anph.xyz

II. Install

1. Install pm2 to manage node application:

    ``` bash
    sudo npm install -g pm2
    ```

2. start this NodeJS application:

    Install all dependencies needed declare in `package.json` file

    ``` bash
    npm i
    ```

    Start app with pm2:
    ``` bash
    pm2 start ecosystem.config.json
    ```

3. Setting Up Nginx as a Reverse Proxy Server:

    a. Create nginx site 
    ```
    sudo touch /etc/nginx/sites-available/anph.xyz
    ```
    b. Copy content above to this file:

    ``` nginx
    server_name anph.xyz www.anph.xyz;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:3000/;
        proxy_redirect off;
    }

    ```
    c. link `anph.xyz` to `sites-enabled`
    ```
    sudo ln -s /etc/nginx/sites-available/anph.xyz /etc/nginx/sites-enabled/
    ```

    Make sure you didn’t introduce any syntax errors by typing

    ``` bash
    sudo nginx -t
    ```
    ..then restart nginx:


    ``` bash
    sudo systemctl restart nginx
    ``` 

III. Usage

* Note: you need to login to get `access Token` (valid for 1 hour) to access both `/user_detail` and `/analytics` routes

a. Register new account

    POST https://anph.xyz/register
    Content-Type: application/json

    {
        "email": "aanltll2992@gmail.com",
        "password": "123",
        "confirmPassword": "123",
        "phoneNumber":"0987654321"
    }

b. Active account, this is a sample link you has been got via your email at register

    GET https://anph.xyz/active?t=7%2FWNpDMp5FC7%2BLNOzt7zBBihkYDZDu2tmfrzVSIefcFkI0j7heXUvsbRqgo3RDU9DZuKsSLOjHlWu8uWlTXTURThwUCmd9sLEy%2FJbXK6YReUzURvup6OXjAbrhBSHwaw
    Content-Type: application/json

c. Login account after active success!

    POST https://anph.xyz/login
    Content-Type: application/json

    {
        "email": "aanltll2992@gmail.com",
        "password": "123"
    }
 

d. Get User detail

    POST https://anph.xyz/user_detail
    Content-Type: application/json
    Authorization: ANPH eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMDNiZTExODczMWI2MzFiN2FmODA5ZDVhNzY2YTA3IiwiZW1haWwiOiJhYW5sdGxsMjk5MkBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjA5ODc2NTQzMjEiLCJwYXNzd29yZCI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE2NDMxMjQwMTEsImV4cCI6MTY0MzEyNzYxMX0.gOJrmQDhBn6hWm5_QxeyCapIwd8hnW0JS6iFLLDTFuA


    {
        "email": "aanltll2992@gmail.com"
    }

e. User logout

    DELETE https://anph.xyz/logout
    Content-Type: application/json

    {
    "email": "aanltll2992@gmail.com"
    }

f. Use `refreshToken` from login to resfresh `accessToken`

    POST https://anph.xyz/token
    Content-Type: application/json

    {
    "email":"aanltll2992@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMDNiZTExODczMWI2MzFiN2FmODA5ZDVhNzY2YTA3IiwiZW1haWwiOiJhYW5sdGxsMjk5MkBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjA5ODc2NTQzMjEiLCJwYXNzd29yZCI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE2NDMxMjQwMTF9.X2ft874jBcQtmGfNlBKTGhH4ZdoeIa1_xl2dNTpmmBo"
    }

g. See all statistics powered by google analytics
    
    POST https://anph.xyz/analytics
    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMDNiZTExODczMWI2MzFiN2FmODA5ZDVhNzY2YTA3IiwiZW1haWwiOiJhYW5sdGxsMjk5MkBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjA5ODc2NTQzMjEiLCJwYXNzd29yZCI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE2NDMxNjg1NTcsImV4cCI6MTY0MzE3MjE1N30.l03gdlVEJF_f59X9Ps2qYkcOVwtCThQFXV76XVQr2ZQ


    {
        "view_id": "259241289"
    }
