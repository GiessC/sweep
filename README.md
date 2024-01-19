# sweep
## What is sweep?
Sweep is an MIT-licensed, open-source social media app. Currently, sweep is being developed with an Express.js API in TypeScript and a Next.js + TypeScript + tailwindcss web app. For a full list of the technologies we use, please check [here](#technologies-used).

We invite you to [contribute](#how-to-contribute) or watch our progress! Thanks!

## How to Contribute
### Prerequisites
1. Install **[Node.js](https://nodejs.org/en)**. Use the Recommended LTS.

### Let's Start Contributing!
1. [Fork](https://guides.github.com/activities/forking/) the repository.
2. Clone your fork locally - `git clone <fork-url>`
3. Check out the 'main' branch - `git checkout main`
4. Create a branch for your edits - `git checkout -b <branch-name>` 
> Note: Branch names should be **hyphenated** (i.e. `this-is-a-branch-name`).
5. Make some changes (it does **NOT** have to be all of them...)
6. Commit and push your changes 
    - `git add .` 
    - `git commit -m "short description"` 
    - `git push --set-upstream origin <branch-name>`
> Note: you only have to specify `--set-upstream origin <branch-name>` one time. From now on, you can use `git push`
7. Go to the **[repo on GitHub](https://github.com/GiessC/sweep)**
8. Go to **[Pull requests](https://github.com/GiessC/sweep/pulls)**
9. Click **[New pull request](https://github.com/GiessC/sweep/compare)**
10. Click **compare across forks**
11. Choose `GiessC/sweep` for **base repository** and `main` for **base**
12. Choose `<your-username>/<your-forked-repo>` for **head repository** and `<your-branch-name>` for **base**
13. Click **Create pull request**
14. For the **title**, use [these rules](#pull-request-pr-title)
15. For the **description**, please use the format provided [here](#description-format)
16. On the right side, click **assign yourself** under `Assignees`
17. Look at the options for labels and see if they are applicable (these can be very useful if used properly). If you are not finished with your additions, be sure to add the **WIP** label
18. a. If you are finished with your additions, click **Create pull request**
<br />b. If you are not finished with your additions, click the down arrow to the right of **Create pull request**, then click **Create draft pull request**. Finally, click **Draft pull request**
19. If you did not use WIP, skip to step 21
20. If you used WIP and created a draft pull request, go to your pull request, remove the **WIP** label, remove `[WIP]` from your title, and click **Ready to review** when you are finished with your additions.
21. You are done. Someone (or more than one) will review your pull request and may prompt you for explanations or offer feedback. Once you have resolved all useful suggestions and you have been approved, you are free to merge your pull request in (this will be automatic in the future)

### Pull Request (PR) Title
Your title should always be formatted like so `[tag1] [tag2] [...] [tagX] Feature title goes here, short and sweet`

#### Tags?
Here is a table of every tag and their descriptions. This table may change at any time, so check back regularly for updates.

| **Tag** | **Description** |
----------|-----------------|
| WIP | Work In-Progress. Use this if you are creating a draft PR and haven't finished your contribution yet. |

### Pull Request (PR) Description
Use [this](reference/pr_description.txt) as a template.

## Special Thanks
### Technologies Used
#### Web App
- Node.js
- Next.js
- tailwindcss

### API
- Express.js
- cors
- dotenv
- pg-promise
- postgres
- kysely
- kysely-postgres-js
- Prisma
- prisma-kysely