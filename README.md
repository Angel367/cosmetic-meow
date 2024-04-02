# cosmetic-meow
5 0 0

---
### dump data from the file
```bash
python -Xutf8 manage.py dumpdata -o db.json
```
### load data from the file
```bash
python manage.py loaddata db.json
```
###
https://phoenixnap.com/kb/letsencrypt-docker
docker-compose run --rm certbot renew --force-renewal
docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d licsideris.online -d dr-sechenov.ru -d dr-sechenov.online -d xn----htbdjbcjg5cgf.xn--p1ai -d licsideris.ru
#### for future
https://codewithstein.com/django-tip-transfering-data-from-sqlite-to-other-databases-mysql-postgresql-etc/
