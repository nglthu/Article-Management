#!/bin/bash
docker build -f Dockerfile.prod -t hemisphere/iticket . 
docker push hemisphere/iticket:latest


# ssh hmsnz@52.187.212.57 << EOF
# docker pull hemisphere/iticket:latest
# docker stop web || true
# docker rm web || true
# docker rmi hemisphere/iticket:current || true
# docker tag hemisphere/iticket:latest hemisphere/iticket:current
# docker network create app
# docker run -d --net app --restart always --name web -p 80:3000 hemisphere/iticket
# EOF