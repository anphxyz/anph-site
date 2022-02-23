---
title: Đùa nghịch với Docker trong 5 phút
date: 2019-01-03 17:34:40
tags: docker
category: docker
---
![](/images/docker_logo.png)
# Docker là gì?
Định nghĩa cũng tràn lan trên mạng rồi nên tôi cũng không cần phải copy lại chi cho mệt ha. Giờ tôi sẽ giải thích một cách đơn giản và dân dã nhất để cho ai cũng có thể hiểu được!

Đầu tiên cùng tưởng tượng rằng bạn và đồng nghiệp của mình đang cùng làm việc trên cùng một dự án. Một ngày đẹp trời đồng nghiệp của bạn bỗng nhiên chạy source code để debug nhưng kết quả lại khác với kết quả trên máy của bạn khi chạy với cùng dữ liệu như nhau.

# Vậy câu hỏi đặt ra là nguyên nhân do đâu?

Có thể có một số nguyên nhân ví dụ như hệ điều hành của bạn và đồng nghiệp không giống nhau, verison của library trên máy bạn và trên máy của đồng nghiệp khác nhau, etc.

Docker sinh ra để giải quyết những vấn đề giống giống vậy. Hiểu một cách đơn giản, Docker container có thể được coi như là một cái “máy tính” nằm bên trong cái máy tính của bạn. Điều hay ho là bạn có thể gửi cái “máy tính” đó cho bạn bè, đồng nghiệp của mình để họ có thể bật nó lên và chạy code mà kết quả sẽ giống y hệt với kết quả mà bạn thấy trên máy của mình.

Tóm lại, Docker giúp cho bạn gói gém tất cả môi trường máy tính của bạn, tạo thành một “image” và mang nó chạy trên một máy tính khác một cách dễ dàng. Image khi được chạy lên thì tạo nên một instance của image đó và nó được gọi là “container”. Image và Container chính là hai từ khoá quan trọng mà bạn phải nhớ trong xuyên suốt bài viết này, cũng như trong quá trình làm việc với Docker.

# Docker compose là gì?
Docker-compose là một công cụ để định nghĩa và chạy những Docker container. Một trong những trường hợp cụ thể mà bạn cần sử dụng tới Docker-compose đó là khi bạn muốn giả lập một môi trường giống hệt môi trường thực tế của ứng dụng ví dụ như kết nối database, gọi cache server hay những service khác, etc. Một trường hợp khác nữa mà tôi có thể kể tới ví dụ như các bạn muốn thực hiện automation testing cho hệ thống của mình, và đảm bảo rằng mọi thứ được thực hiện tách biệt với những môi trường khác từ server, database, cache, etc.

Cùng làm chung với nhau phần này nhé!
Chuẩn bị
Để tiến hành “đùa nghịch” thì các bạn nhớ chuẩn bị sẵn những công cụ sau đây.
```
Git
Docker
Docker-compose
```
Hướng dẫn cài đặt mấy thứ này thì cũng tràn lan trên mạng và thời gian cài đặt sẽ từ khoảng 5 đến 15 phút tuỳ trình độ cũng như tốc độ mạng của các bạn!

Setup ứng dụng NodeJS cơ bản
Đầu tiên là tiền đâu, à không, đầu tiên là setup một ứng dụng NodeJS đơn giản sử dụng MongoDB, lại một lần nữa, mấy cái hướng dẫn này cũng tràn lan trên mạng luôn.

Và để cho các bạn có thể thoả sức nghịch Docker thì tôi làm sẵn luôn một ứng dụng NodeJS cơ bản. Các bạn có thể checkout code như sau.

git clone https://github.com/codeaholicguy/nodejs-mongodb-docker-example.git

Giới thiệu sơ qua thì đây là RESTful API lưu danh bạ gồm 2 endpoint chính là hàm POST để lưu danh bạ và hàm GET để lấy danh bạ (như hình). Các bạn có thể nghịch thêm gì tùy ý.

À quên, các bạn có thể config mongo url bằng cách thêm environment variable MONGO_URL hay dùng file .env đã được setup sẵn.

Build docker image của ứng dụng NodeJS vừa được setup
Đây mới là phần chính của bài viết nè!

Để tạo một Docker image, chúng ta cần tạo một file gọi là Dockerfile ngay tại thư mục root của project.


``` bash
FROM node:8
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .
# Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]
```
Các lệnh khá rõ ràng và dễ hiểu, các bạn có thể đọc thêm document của Docker để biêt thêm chi tiết. Sau khi đã có Dockerfile, các bạn có thể build image bằng lệnh sau.
``` bash
$ docker build -t awesome-app .
```
Như vậy, các bạn đã có một Docker image cho source code hiện tại, và các bạn cũng có thể chạy thử image bằng lệnh
``` bash
$ docker run awesome-app
```
Tuy nhiên các bạn sẽ nhận ra là chạy không được, do ứng dụng của chúng ta cần thêm MongoDB để lưu trữ dữ liệu nữa, vậy làm thế nào để setup, cùng bước sang phần tiếp theo nhé!

Viết file docker-compose.yml
Các bạn tạo file docker-compose.yml, file này sẽ chứa thông tin của môi trường Docker.

``` yml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017
    depends_on:
      - mongo
  mongo:
    image: mongo
    ports:
      - "27017:27017"

 ```
Trong file này chúng ta định nghĩa hai Docker.

app: đây chính là ứng dụng NodeJS của chúng ta.
mongo: chính là database MongoDB map với port như định nghĩa.
Mặc định app sẽ gọi mongo bằng cách sử dụng tên của service, như các bạn có thể thấy env MONGO_URL chúng ta sử dụng mongo cho phần hostname.

Sau khi các bạn đã có file docker-compose.yml, các bạn có thể chạy nó lên bằng lệnh sau.
``` bash
$ docker-compose up
```
Giờ thử vào http://localhost:3000/directory để test xem mọi thứ đã chạy ổn chưa nhé.

# Test app

Lưu trữ dữ liệu
Với setup như trên, mỗi lần xoá mongo image và re-build lại thì dữ liệu trước đó sẽ mất hết, bởi vì dữ liệu được lưu trữ trong mongo container. Vậy làm sao để dữ liệu được giữ nguyên?

Để làm chuyện này, chúng ta sử dụng một kĩ thuật gọi là volume, để làm cho storage của container sẽ trở về một thư mục trên máy tính thật. Để làm chuyện này thì cũng khá đơn giản thôi. Các bạn chỉnh sửa file docker-compose.yml như sau.

``` yml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017
    depends_on:
      - mongo
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
 ```
Như các bạn có thể thấy, chúng ta thêm volumes vào và map nó với thư mục /data/db trong mongo container. Vậy thực sự thư mục dữ liệu này nằm ở đâu?

Các bạn chạy lệnh sau.
```
$ docker inspect -f ‘{{ .Mounts }}’ ${container_id}
[{volume nodejs-mongodb-docker-example_mongo_data /var/lib/docker/volumes/nodejs-mongodb-docker-example_mongo_data/_data /data/db local rw true }]
```
Trong đó container_id chính là id của mongo container, các bạn có thể lấy nó thông qua lệnh docker ps. Kết quả trả về các bạn có thể thấy có ba thành phần, phần đầu tiên chính là volume name, phần thứ hai chính là đường dẫn thực tế, phần thứ ba chính là mapping trên docker container file system. Cụ thể hơn các bạn có thể xem document của Docker về phần này.

Đọc xong bài viết này liệu có được tăng lương hay đậu phỏng vấn không?
Bài viết này đã giới thiệu cho các bạn về:

- Docker
- Docker-compose
- Cách lưu trữ dữ liệu khi dùng Docker

Đây chính là tất cả những thứ đơn giản nhất (những thức phức tạp còn nhiều vô số kể) để thực hiện việc Dockerize ứng dụng của các bạn và sử dụng docker-compose để chạy môi trường của ứng dụng chỉ bằng một lệnh duy nhất, cũng như việc lưu trữ lại dữ liệu ngay cả khi container bị xoá.

 Đây là bài viết được copy từ: [techtalk](https://techtalk.vn/dua-nghich-voi-docker-trong-5-phut.html) với mục đích note nhai dần không có ý ăn cắp!