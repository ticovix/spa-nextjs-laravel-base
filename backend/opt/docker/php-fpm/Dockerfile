FROM phpdockerio/php73-fpm:latest

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install php-memcached php7.3-mysql php7.3-pgsql php7.3-curl php-redis php7.3-sqlite3 php7.3-bcmath php7.3-bz2 php7.3-enchant php7.3-gd php7.3-gmp php7.3-imap php7.3-intl php7.3-mbstring php7.3-pspell php7.3-soap php-ssh2 php7.3-tidy php7.3-xsl php-yaml php-xdebug php-zmq \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
