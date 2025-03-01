Testing Dependabot for nuget
=====


This repo is for testing out nuget.

- does dependabot work?
- does NugGetAudit work?
- what config is good?

## dotnet cli

You can always ask the dotnet cli for help.

```bash
dotnet list package --include-transitive --vulnerable
```

## component discovery
 - Until [this issue is resolved](https://github.com/microsoft/component-detection/issues/1089) one can only use the project.assets.json file for discovery.
 - checking in nuget files is subpar
 - packages.config is a pre-2017 approach

## dependabot
  It's not clear how Dependabot can be configured to do transitive dependency updates.

```
2025/03/01 02:04:27 INFO <job_972462739> Job definition: 
{"job":{"allowed-updates":[{"dependency-type":"direct","update-type":"all"}],
```

(`dependency-type` should be `all`.  Not clear what sets that)