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

resource "aws_cognito_user_pool" "sweep-users" {
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

  # Schema
  schema {
    name                     = "preferred_username"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      min_length = 3
      max_length = 25
    }
  }

  # Tags
  tags = {
    app     = "sweep"
    service = "web"
  }
}

resource "aws_cognito_user_pool_domain" "sweep-domain" {
  domain       = "sweep"
  user_pool_id = aws_cognito_user_pool.sweep-users.id
}

resource "aws_cognito_user_pool_client" "sweep-client" {
  name         = "sweep-client"
  user_pool_id = aws_cognito_user_pool.sweep-users.id

  supported_identity_providers = [aws_cognito_identity_provider.google_provider.provider_name]
  generate_secret              = true

  prevent_user_existence_errors = "ENABLED"

  # Tokens
  auth_session_validity   = 3
  access_token_validity   = 1
  refresh_token_validity  = 1
  enable_token_revocation = true

  # Auth
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
  ]

  # URLs
  logout_urls   = ["http://localhost:3000/logout"]
  callback_urls = ["http://localhost:3000/callback"]

  # Attributes
  read_attributes  = ["preferred_username", "email"]
  write_attributes = ["preferred_username", "email"]

  # Misc
  enable_propagate_additional_user_context_data = true
}

resource "aws_cognito_user_pool_ui_customization" "sweep-customization" {
  client_id = aws_cognito_user_pool_client.sweep-client.id

  css = ".label-customizable {font-weight: 400;}"
  # image_file = filebase64("logo.png")

  user_pool_id = aws_cognito_user_pool.sweep-users.id
}

variable "google_client_id" {
  type = string
}

variable "google_client_secret" {
  type = string
}

resource "aws_cognito_identity_provider" "google_provider" {
  user_pool_id  = aws_cognito_user_pool.sweep-users.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    authorize_scopes = "email"
    client_id        = var.google_client_id
    client_secret    = var.google_client_secret
  }
}
