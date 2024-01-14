# You must use 'aws configure' to configure credentials before this will work properly.
# You may also use environment variables to configure your credentials.
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

resource "aws_cognito_user_pool" "sweep_users" {
  name                = "sweep-users"
  deletion_protection = "INACTIVE"

  # Account
  alias_attributes         = ["email", "preferred_username"]
  auto_verified_attributes = ["email"]
  username_configuration {
    case_sensitive = true
  }
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
  user_attribute_update_settings {
    attributes_require_verification_before_update = ["email"]
  }

  # Email
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  # Verification
  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_message        = "Welcome to Sweep! You're email verification code is {####}."
    email_subject        = "Verify your email for Sweep"
  }

  # Password
  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 7
  }
  device_configuration {
    challenge_required_on_new_device      = true
    device_only_remembered_on_user_prompt = true
  }

  # MFA
  mfa_configuration = "ON"
  software_token_mfa_configuration {
    enabled = true
  }

  # Tags
  tags = {
    app     = "sweep"
    service = "api"
  }
}
