// You must use 'aws configure' to configure credentials before this will work properly.
// You may also use environment variables to configure your credentials.
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.32.1"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}