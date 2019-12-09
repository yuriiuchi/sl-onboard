FROM nginx:stable-alpine

LABEL maintainer="Totvs S.A."

# Change TimeZone
RUN apk add --update tzdata
ENV TZ America/Sao_Paulo

RUN rm /etc/nginx/conf.d/*
RUN rm -Rf /usr/share/nginx
RUN rm -Rf /etc/nginx/*.default

RUN mkdir -p /sources

ADD index.html /sources
ADD nginx.conf /etc/nginx
ADD default.conf /etc/nginx/conf.d

EXPOSE 80

WORKDIR /sources
