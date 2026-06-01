# Deploy — planb.security

Kubernetes config for the planb.security static site (DOKS, Istio ingress).
`k8s/deploy.yaml` is the full, production manifest: Namespace, Deployment (`www`),
Service, cert-manager Certificate, Istio Gateway + VirtualService, and per-host
ACME solver Services for HTTP-01.

## Make targets (run from the repo root)
| Target | Does |
|--------|------|
| `make deploy` | Apply `k8s/deploy.yaml` to the cluster |
| `make rollout` | Restart the deployment to pull the latest image |
| `make ship` | `release` (build+push) then `rollout` |
| `make status` | Show pods + TLS certificate status |
| `make logs` | Tail the site pod logs |
| `make pull-secret` | One-time: create the Docker Hub image-pull secret |
| `make delete` | Remove the site's k8s resources |

kubectl runs in a container; the kubeconfig is referenced (not committed) at
`$HOME/dcs-pro1-kubeconfig.yaml` — override with `KUBECONFIG=… make deploy`.

## One-time prerequisites (already in place on the prod cluster)
- Image-pull secret `dockerhub-pull` in the `planb` namespace (`make pull-secret`
  with `DOCKERHUB_USER`/`DOCKERHUB_TOKEN`).
- The `letsencrypt-prod-http01` ClusterIssuer must cover `planb.security`
  (its solver `selector.dnsZones` was extended on the cluster).
- DNS A records: `planb.security`, `www.planb.security` → `129.212.197.244`
  (the Istio ingress LB) — needed for traffic and HTTP-01 validation.
