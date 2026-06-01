IMAGE ?= loves2splug/planbsecurity-www
TAG   ?= latest
PORT  ?= 8080

export IMAGE TAG PORT

.PHONY: help build push release run login k8s-deploy k8s-delete

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

build: ## Build the image (compiles the static site inside Docker)
	./scripts/build.sh $(TAG)

push: ## Push the image to Docker Hub
	./scripts/push.sh $(TAG)

release: build push ## Build then push

run: ## Run the image locally on $(PORT)
	./scripts/run.sh $(TAG)

login: ## Log in to Docker Hub
	docker login

k8s-deploy: ## Apply the Kubernetes manifests
	kubectl apply -k k8s

k8s-delete: ## Remove the Kubernetes resources
	kubectl delete -k k8s
