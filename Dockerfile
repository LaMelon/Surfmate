FROM php:8.2-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod rewrite

# aktifkan error PHP biar kita lihat penyebab halaman kosong
RUN echo "display_errors=On" >> /usr/local/etc/php/conf.d/docker-php-errors.ini \
    && echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/docker-php-errors.ini

COPY . /var/www/html/

WORKDIR /var/www/html/

EXPOSE 80
