---
sidebar_position: 40
---

# 🩺 Shift-left validation

Everything defined with DevX is strongly typed. Validate configurations while writing.
```bash
➜ devx project validate
👌 Looks good
```

### Missing required field
```cue
stack: v1.#Stack & {
	components: {
		cowsay: {
			traits.#Workload
			containers: default: {
				command: ["cowsay"]
				args: ["Hello DevX!"]
			}
		}
	}
}
```
```bash
➜ devx project validate
Error: Invalid Components
stack.components.cowsay.containers.default.image is a required field
```

### Wrong field type
```cue
stack: v1.#Stack & {
	components: {
		cowsay: {
			traits.#Workload
			containers: default: {
				image: 123
				command: ["cowsay"]
				args: ["Hello DevX!"]
			}
		}
	}
}
```
```bash
➜ devx project validate
Error: stack.components.cowsay.containers.default.image: conflicting values string and 123 (mismatched types string and int):
    /examples/simple/cue.mod/pkg/stakpak.dev/devx/v1/traits/traits.cue:9:9
    /examples/simple/stack.cue:14:12
```


### Conflicting configurations
```cue
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
stack: components: cowsay: containers: default: image: "docker/whalesay2"
```
```bash
➜ devx project validate
Error: stack.components.cowsay.containers.default.image: conflicting values "docker/whalesay2" and "docker/whalesay":
    /examples/simple/stack.cue:14:12
    /examples/simple/stack.cue:21:56
```

### Strict mode
Enabling strict mode during build or validation allow you to make sure that all traits will be respected.
Every trait is satisfied by at least one trasformer in all environments.
```bash
➜ devx project validate -S
Error: trait is not fulfilled by any flow: 
  cowsay/#Helm in prod
```
