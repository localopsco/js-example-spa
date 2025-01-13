# Define variables
# make sure to install jq package before running this via
# brew install jq
PACKAGE_JSON=package.json
DOCKER_REGISTRY=public.ecr.aws/r5p6q2u1
AWS_REGION=us-east-1

# Extract version from package.json
VERSION=$(shell jq -r '.version' $(PACKAGE_JSON))
IMAGE_NAME=$(shell jq -r '.name' $(PACKAGE_JSON))

ECR_REPO_URL=${DOCKER_REGISTRY}/${IMAGE_NAME}

# Default target
all: build push

login:
	@echo "Logging into AWS account"
	aws ecr-public get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${DOCKER_REGISTRY}

logout:
	@echo "Logging out of AWS account"
	helm registry logout public.ecr.aws

# Build and deploy the docker image
deploy: login
		@echo "Building Docker image with tag $(VERSION)..."
		docker buildx build --push --provenance=false --platform linux/amd64,linux/arm64 \
		-t ${ECR_REPO_URL}:${VERSION} \
		-t ${ECR_REPO_URL}:latest .

# Clean up
clean:
		@echo "Cleaning up Docker images..."
		docker rmi $(IMAGE_NAME):$(VERSION)
		docker rmi $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(VERSION)
