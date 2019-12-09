FROM node:10
LABEL name="node-chrome-jdk"

# Install Chrome

RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN set -x \
    && apt-get update \
    && apt-get install -y \
        google-chrome-stable

ENV CHROME_BIN /usr/bin/google-chrome

# Log versions

RUN set -x \
    && node -v \
    && npm -v \
    && google-chrome --version

# Install OpenJDK-8
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean;

# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

# Update PATH
ENV PATH $JAVA_HOME/bin:$PATH
RUN export JAVA_HOME

# TOTVS Cert (*totvs.io)
ADD ./certs /usr/certs
RUN keytool -import -alias totvs \
    -keystore $JAVA_HOME/jre/lib/security/cacerts \
    -file /usr/certs/totvs.io.cert \
    -storepass changeit \
    -trustcacerts \
    -noprompt;
