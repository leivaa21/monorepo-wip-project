.PHONY: build start

# General commands
build:
	docker-compose build
start-d:
	docker-compose up -d
start:
	docker-compose up
stop:
	docker-compose down

# Users Service specific commands
join-users:
	docker exec -it users-service sh
logs-users:
	docker logs users-service
