IMAGE ?= loves2splug/planbsecurity-www
TAG   ?= latest
PORT  ?= 8080

export IMAGE TAG PORT

.PHONY: help build push release run login deploy rollout ship status logs pull-secret delete

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

# ── Image ───────────────────────────────────────────────────────────────────
build: ## Build the image (compiles the static site inside Docker)
	./scripts/build.sh $(TAG)

push: ## Push the image to Docker Hub
	./scripts/push.sh $(TAG)

release: build push ## Build then push

run: ## Run the image locally on $(PORT)
	./scripts/run.sh $(TAG)

login: ## Log in to Docker Hub
	docker login

# ── Kubernetes (containerized kubectl; KUBECONFIG is referenced, not committed) ─
NAMESPACE   ?= planb
KUBECONFIG  ?= $(HOME)/dcs-pro1-kubeconfig.yaml
KUBECTL_IMG ?= bitnami/kubectl:latest
KUBECTL = docker run --rm -i -v $(KUBECONFIG):/kc.yaml:ro -v $(CURDIR):/work:ro -w /work $(KUBECTL_IMG) --kubeconfig /kc.yaml

deploy: ## Apply the k8s manifests (Deployment, Service, Gateway, VirtualService, Certificate)
	$(KUBECTL) apply -f k8s/deploy.yaml

rollout: ## Restart the deployment to pull the latest image
	$(KUBECTL) -n $(NAMESPACE) rollout restart deploy/www
	$(KUBECTL) -n $(NAMESPACE) rollout status  deploy/www

ship: release rollout ## Build + push, then restart to pull the new image

status: ## Show pods and TLS certificate status
	$(KUBECTL) -n $(NAMESPACE) get pods -o wide
	$(KUBECTL) -n istio-system get certificate $(NAMESPACE)-tls

logs: ## Tail logs from the site pods
	$(KUBECTL) -n $(NAMESPACE) logs -l app=www --tail=80 -f

pull-secret: ## One-time: create the Docker Hub image-pull secret (needs DOCKERHUB_USER, DOCKERHUB_TOKEN)
	$(KUBECTL) -n $(NAMESPACE) create secret docker-registry dockerhub-pull \
		--docker-server=https://index.docker.io/v1/ \
		--docker-username="$(DOCKERHUB_USER)" --docker-password="$(DOCKERHUB_TOKEN)" \
		--dry-run=client -o yaml | $(KUBECTL) apply -f -

delete: ## Remove this site's k8s resources
	$(KUBECTL) delete -f k8s/deploy.yaml --ignore-not-found
