# Publishing to Amazon ECR

This guide will walk you through the process of building, tagging, and pushing a Docker image to Amazon Elastic Container Registry (ECR).

## Prerequisites

1. **Docker**: Ensure you have Docker installed on your local machine.
2. **AWS CLI**: Ensure you have the AWS Command Line Interface (CLI) installed and configured with the necessary permissions to push to your ECR repository.

## Steps

### 1. Build the Docker Image

First, build your Docker image from your project directory. Replace `js-example-spa` with your desired image name.

```bash
docker build -t js-example-spa .
```

### 2. Authenticate Docker to Your ECR Registry

To push images to ECR, you need to authenticate Docker to your ECR registry. Use the following command, replacing `<region>` with your AWS region:

```bash
aws ecr-public get-login-password --region <region> | docker login --username AWS --password-stdin public.ecr.aws
```

### 3. Tag the Docker Images

Next, tag your Docker images so they can be pushed to your ECR repository. Replace `<id>` with your ECR repository URI and `<VERSION>` with the desired version of your image.

```bash
docker tag js-example-spa:latest public.ecr.aws/<id>/js-example-spa:v<VERSION>
docker tag js-example-spa:latest public.ecr.aws/<id>/js-example-spa:latest
```

### 4. Push the Docker Images to ECR

Finally, push the tagged Docker images to your ECR repository.

```bash
docker push public.ecr.aws/<id>/js-example-spa:v<VERSION>
docker push public.ecr.aws/<id>/js-example-spa:latest
```

## Example

Let's walk through an example where the image name is `js-example-spa`, the ECR repository URI is `public.ecr.aws/abc123`, and the version is `1.0.0`.

### 1. Build the Docker Image

```bash
docker build -t js-example-spa .
```

### 2. Authenticate Docker to Your ECR Registry

```bash
aws ecr-public get-login-password --region us-west-2 | docker login --username AWS --password-stdin public.ecr.aws
```

### 3. Tag the Docker Images

```bash
docker tag js-example-spa:latest public.ecr.aws/abc123/js-example-spa:v1.0.0
docker tag js-example-spa:latest public.ecr.aws/abc123/js-example-spa:latest
```

### 4. Push the Docker Images to ECR

```bash
docker push public.ecr.aws/abc123/js-example-spa:v1.0.0
docker push public.ecr.aws/abc123/js-example-spa:latest
```

## Notes

- **Versioning**: It's a good practice to use semantic versioning (e.g., `v1.0.0`) for your Docker images to keep track of changes and updates.
- **Region**: Ensure you specify the correct AWS region when authenticating Docker to ECR.
- **ECR URI**: Your ECR repository URI will be in the format `public.ecr.aws/<id>`. Replace `<id>` with the actual ID of your ECR repository.

By following these steps, you should be able to successfully build, tag, and push your Docker images to Amazon ECR.
