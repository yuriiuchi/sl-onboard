FROM docker.totvs.io/sl_ci/nodechromejdk:latest

ADD ["package.json", "package-lock.json" , "/sources/"]

WORKDIR /sources

RUN npm ci

ADD ./ /sources
ADD ./ci/ci.sonar-project.properties /sources/sonar-project.properties
ADD ./ci/ci.entry.sh /entry.sh

RUN ["chmod", "+x", "/entry.sh"]

ENTRYPOINT ["/entry.sh"]