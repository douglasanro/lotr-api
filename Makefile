.PHONY: help up build recreate down

UID := $(shell id -u)
GID := $(shell id -g)

help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "[32m%-20s[0m %s\n", $$1, $$2}'

up: ## Up docker containers
	@yarn install && env UID=$(UID) GID=$(GID) docker-compose up

build: ## Build app and database containers
	@env UID=$(UID) GID=$(GID) docker-compose build

recreate: ## Recreate app and database containers
	@env UID=$(UID) GID=$(GID) docker-compose up --force-recreate

down: ## Down docker containers
	@env UID=$(UID) GID=$(GID) docker-compose down
