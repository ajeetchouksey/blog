---
layout: post
title: Branch Protection as Code Enforce GitHub Security at Scale
description: "Best Practices for Automating Branch Protection in GitHub"
modified: 2025-07-10
tags: [GitHub, Automation, Branch Protection, DevOps, Security, Best Practices]
categories: [ GitHub ]
author: Ajeet
---

In today’s fast-paced DevOps world, manual branch protection is a recipe for drift, inconsistency, and risk. As teams and codebases scale, relying on the GitHub portal for configuration becomes unmanageable and error-prone. Automation ensures every repository—old or new—remains secure, compliant, and up-to-date, with zero manual effort.
<!--more-->
>
> **Automated branch protection means:**
> - No more “oops, forgot to set protection on that new repo.”
> - No more tedious clicking through the UI for every branch or repo.
> - No more configuration drift or accidental overrides.
> - Every change is tracked, auditable, and repeatable (Infrastructure as Code for your policies).
>
> **Bottom line:** If you care about security, compliance, and developer velocity, automate your branch protection. The portal is for demos—automation is for real-world scale.

---

## 🚦 What is Branch Protection?
Branch protection rules in GitHub help you:
- Prevent direct pushes to critical branches (like `main`)
- Require pull request reviews and passing CI checks
- Enforce linear history and prevent force pushes

Automating these rules means every repo stays compliant, even as your team and codebase grow.

---

## ⚡ Automate with GitHub Actions

You can automate branch protection using the [GitHub CLI](https://cli.github.com/) (`gh`) or the [GitHub REST API](https://docs.github.com/en/rest/branches/branch-protection) inside a GitHub Actions workflow. This lets you enforce policies as code (IaC) and keep your repos self-healing.

### Example: Enforcing Branch Protection via GitHub Actions

Create a workflow file (e.g., `.github/workflows/branch-protection.yml`):

```yaml
name: Enforce Branch Protection
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  protect:
    runs-on: ubuntu-latest
    steps:
      - name: Set up GitHub CLI
        uses: cli/cli-action@v2
      - name: Enforce branch protection
        run: |
          gh api \
            -X PUT \
            -H "Accept: application/vnd.github+json" \
            /repos/${{ github.repository }}/branches/main/protection \
            -f required_status_checks.strict=true \
            -f required_status_checks.contexts[]='ci/test' \
            -f enforce_admins=true \
            -f required_pull_request_reviews.dismiss_stale_reviews=true \
            -f required_pull_request_reviews.required_approving_review_count=2 \
            -f restrictions=null
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🛠️ Branch Protection Configuration Table

| Option/Parameter                | Description                                                      | Example Value(s)                |
|---------------------------------|------------------------------------------------------------------|---------------------------------|
| required_status_checks          | Require specific CI checks to pass before merging                | contexts: ['ci/test']           |
| enforce_admins                  | Apply rules to admins as well as contributors                    | true / false                    |
| required_pull_request_reviews   | Require reviews before merging (set number, dismiss stale, etc.) | required_approving_review_count: 2, dismiss_stale_reviews: true |
| restrictions                    | Limit who can push to the branch (teams/users/apps)              | users: ['alice'], teams: ['devs'] |
| allow_force_pushes              | Allow/disallow force pushes                                      | true / false                    |
| allow_deletions                 | Allow/disallow branch deletion                                   | true / false                    |
| require_linear_history          | Enforce linear commit history (no merge commits)                 | true / false                    |
| lock_branch                     | Lock branch (disables all pushes)                                | true / false                    |

> **Tip:** Not all options are required—choose those that fit your team's workflow and compliance needs.

---

## 💡 Why Automate? (Pros & Cons)

### Pros
- **Consistency:** Enforces the same rules across all repos automatically
- **Auditability:** Changes are tracked in code (IaC for branch protection)
- **Self-healing:** If someone changes protection manually, the workflow can reset it
- **Scalability:** Manage many repos/orgs with a single workflow or reusable action

### Cons
- **Complexity:** Requires knowledge of GitHub Actions, API, and permissions
- **Permissions:** Needs `repo` or `admin:repo_hook` scope for some settings (the default `GITHUB_TOKEN` is usually sufficient for the current repo)
- **Race Conditions:** If multiple workflows or admins change protection at the same time, settings may conflict
- **Limited UI Feedback:** Errors in the workflow may not be obvious to non-technical users

---

## 🔁 Using Reusable Workflows for Branch Protection

A scalable way to enforce branch protection across many repositories is to use [reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows) in GitHub Actions. This approach lets you define your branch protection logic once and call it from any repo, ensuring consistency and reducing maintenance.

### Step 1: Create a Central Reusable Workflow

In your central or template repository, add a workflow file at `.github/workflows/branch-protection-reusable.yml`:

```yaml
name: Branch Protection Reusable
on:
  workflow_call:
    inputs:
      branch:
        required: true
        type: string
jobs:
  protect:
    runs-on: ubuntu-latest
    steps:
      - name: Set up GitHub CLI
        uses: cli/cli-action@v2
      - name: Enforce branch protection
        run: |
          gh api \
            -X PUT \
            -H "Accept: application/vnd.github+json" \
            /repos/${{ github.repository }}/branches/${{ inputs.branch }}/protection \
            -f required_status_checks.strict=true \
            -f required_status_checks.contexts[]='ci/test' \
            -f enforce_admins=true \
            -f required_pull_request_reviews.dismiss_stale_reviews=true \
            -f required_pull_request_reviews.required_approving_review_count=2 \
            -f restrictions=null
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Step 2: Call the Reusable Workflow from Any Repository

In each target repository, create a workflow that calls the central workflow:

```yaml
name: Enforce Branch Protection (via Reusable)
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  call-branch-protection:
    uses: org-or-user/repo-name/.github/workflows/branch-protection-reusable.yml@main
    with:
      branch: main
```
- Replace `org-or-user/repo-name` with the actual owner and repository name where the reusable workflow lives.
- You can pass different branch names as needed.

### Example Folder Structure

```
central-policy-repo/
└── .github/
    └── workflows/
        └── branch-protection-reusable.yml   # The central reusable workflow

my-app-repo/
└── .github/
    └── workflows/
        └── enforce-branch-protection.yml    # Calls the reusable workflow from central-policy-repo
```

> **Tip:** You can use any repo name for your central-policy-repo, but keep it descriptive (e.g., `org-security-workflows`, `workflow-templates`, etc.).

---

## 🏁 Alternatives
- Use [Terraform GitHub Provider](https://registry.terraform.io/providers/integrations/github/latest/docs/resources/branch_protection) for full IaC management
- Use [Probot Apps](https://probot.github.io/apps/) or custom bots for advanced automation
- Manual configuration via GitHub UI (not recommended for large orgs)

---

## 📚 References
- [GitHub REST API: Branch Protection](https://docs.github.com/en/rest/branches/branch-protection)
- [GitHub CLI: gh api](https://cli.github.com/manual/gh_api)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
