+++
title = "Okta OAuth2 authentication"
description = "Grafana Okta OAuth Guide "
keywords = ["grafana", "configuration", "documentation", "oauth"]
type = "docs"
[menu.docs]
name = "Okta"
identifier = "okta_oauth2"
parent = "authentication"
weight = 3
+++

# Okta OAuth2 authentication

> Only available in Grafana v7.0+

The Okta authentication allows your Grafana users to log in by using an external Okta authorization server.

## Create an Okta application

Before you can sign a user in, you need to create an Okta application. Start by signing in to the Okta Developer Console: log in to the Okta, go to Admin and then select *Developer Console* in the top menu. Then create an application:

1. Select Applications, then Add Application. Pick Web as the platform. Enter a name for your application (or leave the default value).

1. Add the Base URI of your application, such as https://grafana.example.com.

1. Next, enter values for the Login redirect URI. Use Base URI and append it with `/login/okta`: https://grafana.example.com/login/okta.

1. Click Done to finish creating the Okta application.

## Enable Okta Oauth in Grafana

1. Add the following to the [Grafana configuration file]({{< relref "../installation/configuration.md#config-file-locations" >}}):

```ini
[auth.okta]
name = Okta
enabled = true
allow_sign_up = true
client_id = some_id
client_secret = some_secret
scopes = openid profile email groups
auth_url = https://<tenant-id>.okta.com/oauth2/v1/authorize
token_url = https://<tenant-id>.okta.com/oauth2/v1/token
api_url = https://<tenant-id>.okta.com/oauth2/v1/userinfo
allowed_domains =
allowed_groups =
role_attribute_path =
```

### Configure allowed groups and domains

To limit access to authenticated users that are members of one or more groups, set `allowed_groups`
to a comma- or space-separated list of Okta groups.

```ini
allowed_groups = Developers, Admins
```

The `allowed_domains` option limits access to the users belonging to the specific domains. Domains should be separated by space or comma.

```ini
allowed_domains = mycompany.com mycompany.org
```

### Role mapping

Grafana can attempt to do role mapping through Okta OAuth. In order to achieve this, Grafana checks for the presence of a role using the [JMESPath](http://jmespath.org/examples.html) specified via the `role_attribute_path` configuration option. The JSON used for the path lookup is the HTTP response obtained from querying the `/userinfo` endpoint. The result after evaluating the `role_attribute_path` JMESPath expression needs to be a valid Grafana role, i.e. `Viewer`, `Editor` or `Admin`. Read about how to add custom claims to the user info in Okta [docs](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/add-custom-claim/).

### Team Sync (Enterprise only)

> Only available in Grafana Enterprise v7.0+

With Team Sync you can map your Okta groups to teams in Grafana so that your users will automatically be added to
the correct teams.

Okta groups can be referenced by group name, like `Admins`.

[Learn more about Team Sync]({{< relref "team-sync.md" >}})