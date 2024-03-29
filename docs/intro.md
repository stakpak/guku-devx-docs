---
sidebar_position: 1
---

# Introduction

DevX helps you define your own infrastructure abstractions. Why? so you don't have to write Kubernetes manifests, deal with Helm values, Terraform code, and Docker Compose manifests.

Engineering teams started scaling DevOps by building internal developer platforms (IDPs). IDPs allow developers to self-serve their infrastructure needs. But there are no standards (yet) on how these platforms are built. How do we make IDPs evolve without slowing down developers?

You can use DevX to build code-based developer interfaces for your IDP. Developers can create all the infrastructure they need, using a single tool, without leaving their code editor.

![illustration](./assets/illustration.png)

## Configuration language
We use [CUE](https://cuelang.org/) to write strongly typed configurations. You can now shift YAML typos left, instead of detecting errors after applying configurations.

[CUE](https://cuelang.org/) is the result of years of experience writing configuration languages at Google, and seeks to improve the developer experience while avoiding some nasty pitfalls. CUE looks like JSON, while making declarative data definition, generation, and validation a breeze. You can find a primer on CUE [here](https://docs.dagger.io/1215/what-is-cue/#understanding-cue).

:::tip
You can [use YAML to define devx stacks](/docs/examples/yaml).
We internally convert your YAML stacks to CUE for processing.
:::

## Definitions

![design](./assets/design.png)

**Project:** a collection of devx configuration files in a git repository. Projects have unique module identifiers like `stakpak.dev/user-service`.

**Stack:** a set of components and is how you define your workloads and its dependencies. A stack is a contract between developers and platform designers.

**Component:** represents a workload or a resource. A component has an id, a set of traits, labels, and fields. A component can be low level (e.g. RDS instance, Helm chart, Kubernetes resource) or as high level as you want (e.g. Django app, Postgres database, S3 API compatible bucket).

**Trait:** represents a capability of a component and associated fields. You add a trait to a component to make use of the platform's capabilities, or define your own. Traits add fields to the component to allow it to be configure either by the developer, the platform team, or automatically by DevX (e.g. pull data from the environment or auto-generate secrets).

**Transformer:** a data transformation function. A transformer is used to enrich components with more data until it's ready to deploy using various drivers. Transformers are used to encode your platform's best-practices and turn the abstract data defined by the stack into a form existing tools can operate on.

**Resources:** the output of devx that is applied to your favorite platform (e.g. Kubernetes manifests, Terraform code, GitLab pipelines).

**Driver:** used to write resources as configuration files to be consumed by existing tools like Kubectl, Terraform, ArgoCD, and Github Workflows.

## Getting Started


### Option 1: Install devx using Homebrew

```bash
brew tap stakpak/stakpak
brew install devx       
```

### Option 2: Download the [binary](https://github.com/stakpak/devx/releases)


### Init the project
```bash
➜ mkdir myapp
➜ cd myapp
➜ devx project init
```

### Update project dependencies
```bash
➜ devx project update
```

### Generate example
```bash
➜ devx project gen
```

This will generate a sample DevX stack and builder. You create a stack to define your workload and what it needs to run.
```cue title="stack.cue"
package main

import (
	"stakpak.dev/devx/v1"
	"stakpak.dev/devx/v1/traits"
)

stack: v1.#Stack & {
	components: {
		cowsay: {
			traits.#Workload
			containers: default: {
				image: "docker/whalesay"
				command: ["cowsay"]
				args: ["Hello DevX!"]
			}
		}
	}
}
```

You create a builder for the `dev` environment to tell DevX how to generate configurations. This step will usually be performed by platform teams or developers wishing to extend the platform.
```cue title="builder.cue"
package main

import (
	"stakpak.dev/devx/v2alpha1"
	"stakpak.dev/devx/v2alpha1/environments"
)

builders: v2alpha1.#Environments & {
	dev: environments.#Compose
}
```


### Build configurations for the dev environment
```bash
➜ devx build dev
🏗️  Loading stack...
👀 Validating stack...
🏭 Transforming stack 100% |████████████████████████| (1/1, 711 it/s)        
[compose] applied resources to "docker-compose.yml"
```
```yaml title="docker-compose.yml"
version: "3"
volumes: {}
services:
  cowsay:
    image: docker/whalesay
    environment: {}
    depends_on: []
    command:
      - cowsay
      - Hello DevX!
    restart: always
    volumes: []
```

No we run the compose file
```bash
➜ docker-compose up
[+] Running 1/0
 ⠿ Container compose-cowsay-1  Created                                                                                                  0.0s
Attaching to compose-cowsay-1
compose-cowsay-1  |  _____________ 
compose-cowsay-1  | < Hello DevX! >
compose-cowsay-1  |  ------------- 
compose-cowsay-1  |     \
compose-cowsay-1  |      \
compose-cowsay-1  |       \     
compose-cowsay-1  |                     ##        .            
compose-cowsay-1  |               ## ## ##       ==            
compose-cowsay-1  |            ## ## ## ##      ===            
compose-cowsay-1  |        /""""""""""""""""___/ ===        
compose-cowsay-1  |   ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~   
compose-cowsay-1  |        \______ o          __/            
compose-cowsay-1  |         \    \        __/             
compose-cowsay-1  |           \____\______/   
compose-cowsay-1 exited with code 0
```