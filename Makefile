init:
	docker-compose up -d
	docker system prune -a -f --volumes

rebuild:
	docker-compose up -d --force-recreate --build
	docker system prune -a -f --volumes

clean:
	docker system prune -a -f --volumes

reset:
	docker rm -f $$(docker ps -a -q)
	docker system prune -a -f --volumes

.PHONY: init rebuild clean reset