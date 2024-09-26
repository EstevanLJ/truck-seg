FROM ubuntu:20.04

ENV GOSU_VERSION=1.7 \
    GPG_KEY=B42F6819007F00F88E364FD4036A9C25BF357DD4

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates wget

RUN set -x \
    && apt-get update \
    && apt-get install -y software-properties-common zip unzip curl uuid-runtime \
    && LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php \
    && apt-get update \
    # Install gosu
    && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$(dpkg --print-architecture)" \
    && wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$(dpkg --print-architecture).asc" \
    && export GNUPGHOME="$(mktemp -d)" \
    && ( gpg --keyserver keyserver.ubuntu.com --recv-keys "$GPG_KEY" \
         || gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$GPG_KEY" \
         || gpg --keyserver ipv4.pool.sks-keyservers.net --recv-keys "$GPG_KEY" \
         || gpg --keyserver ha.pool.sks-keyservers.net.mit.edu --recv-keys "$GPG_KEY" \
         || gpg --keyserver pgp.mit.edu --recv-keys "$GPG_KEY" \
         || gpg --keyserver keyserver.pgp.com --recv-keys "$GPG_KEY" ) \
    && gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
    && rm -rf "$GNUPGHOME" /usr/local/bin/gosu.asc \
    && chmod +x /usr/local/bin/gosu \
    && gosu nobody true \
    # Install relevant PHP packages
    && apt-get install -y php8.0-fpm php8.0-dev php8.0-cli \
      php8.0-mysqlnd php8.0-pdo php8.0-xml php8.0-mbstring php8.0-sqlite3 \
      php8.0-opcache php8.0-curl php8.0-zip php8.0-xdebug pkg-config \
    && rm -rf /tmp/pear \
    # Clean caches to shrink layer
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/*

# Install Dev Tools
RUN curl -sS -o composer-setup.php https://getcomposer.org/installer \
    && php composer-setup.php \
    && mv composer.phar /usr/local/bin/composer \
    && composer config --global process-timeout 600 \
    && curl -sS -o /usr/bin/phpunit https://phar.phpunit.de/phpunit-4.4.5.phar \
    && chmod +x /usr/bin/phpunit \
    && apt update \
    && apt install git rsync grsync -y \
    && apt clean all

# Set lower SSL security level
RUN sed -i '1s/^/openssl_conf = default_conf\n/' /etc/ssl/openssl.cnf
RUN printf "\
[ default_conf ]\n\
ssl_conf = ssl_sect\n\
[ ssl_sect ]\n\
system_default = system_default_sect\n\
[ system_default_sect ]\n\
MinProtocol = TLSv1.2\n\
CipherString = DEFAULT@SECLEVEL=1\n" >> /etc/ssl/openssl.cnf

EXPOSE 8000

WORKDIR /opt/app
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]