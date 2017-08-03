---
layout: post
title: Git with VSTS - Git Repo
description: "Git and VSTS"
modified: 2017-07-27
tags: [VSTS, Git]
categories: [DevOps]
author: Ajeet
---

Depending upon the requirement you can have one or more repo inside your project. You can create repos by using
	
	1. 	Web (VSTS)
	2.	CLI
	3.	Visual Studio
	4.	IntelliJ
	5. 	Xcode
	6.	Eclipse
	
We will discuss first 3.

## Create repo using Web

Navigate to code section -> click on project  -> New repository
![### New repository](/images/posts/gitwithvsts/createrepo.JPG)

Add a .gitignore file

![](/images/posts/gitwithvsts/repo1.JPG)

![](/images/posts/gitwithvsts/repo2.JPG)

A new empty git repo is now created in your team project. 

## Create local repo using CLI

	• [Download git for Windows] (https://git-scm.com/download/win)
	• Open git bash or git cmd. Navigate to path where you would like to create repo.

```PowerShell
	git init .
```
## Cloning Repo

Get remote repo URL

![](/images/posts/gitwithvsts/gitclonerepo1.JPG)

Use following cmd to clone remote repo

```PowerShell
git remote add origin  <<URL>>
```

![](/images/posts/gitwithvsts/gitreporemote1.JPG)


*See git related post for  workflow, branches, authentication and pull request.*