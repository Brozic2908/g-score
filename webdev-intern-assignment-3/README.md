# G-Scores

This is the instruction for web developer intern assignment at [Golden Owl](https://goldenowl.asia). You will build a simple web.

Web template example. Hope you will make it more beautiful !!!

![template example](./screenshots/mockup-ui.png) 
# Requirements
1. From the raw data file ([diem_thi_thpt_2024.csv](./dataset/diem_thi_thpt_2024.csv)) save it into the database with the appropriate structure

2. Your application should have at least features in [Must have](#must-have), things in [Nice to have](#nice-to-have) is optional (but yeah, it's attractive if you have).

### Must have:
- The conversion of raw data into the database must be coded and located in this source code. (**hint**: recommend use migration and seeder)
- Write a feature to check score from registration number input
- Write a feature report. There will be 4 levels including: >=8 points, 8 points > && >=6 points, 6 points > && >= 4 points, < 4 points
    - Statistics of the number of students with scores in the above 4 levels by subjects. (Chart)
- List top 10 students of group A including (math, physics, chemistry)
### Nice to have:

- Responsive design (look good on all devices: desktops, tablets & mobile phones).
- Setup project use Docker.
- Deploy the application to go live.

# Technical Requirements

### Frontend
You can use any front-end library/framework like React, Angular, Vue, ... or just simple things with HTML + CSS + Javascript (JQuery).
- For JS intern use React you need to have: 
  * React Hooks
- Fonts (optional);
  - [https://fonts.google.com/specimen/Rubik?query=Rubik](https://fonts.google.com/specimen/Rubik?query=Rubik)
- You can use some available interfaces such as: [AdminLTe](https://adminlte.io/), [TailAdmin](https://tailadmin.com/)...
  
### Backend: 
Choose one of your applied back-end libraries/frameworks: Maybe Laravel(PHP), Ruby on Rails, NestJS (NodeJs), Django (Python), unlimited framework... or a structure that you come up with yourselt. 
- **Mandatory** use of **OOP programming** for managing subjects.
- Need form validation and logic tightening.
- For NodeJs, use TypeScript is a plus.
- Use ORM for interacting with Database.
- Database: You can use postgreSQL, Mysql, mongoDB... to manage or cache the data. 

### Deployment
Some providers allow free deployment for the trial version  (note: Maybe some suppliers will update their policies and prices)

- Heroku - https://heroku.com - Deploying Front & Backend
- Vercel (Zeit) - https://vercel.com - Deploying Front & Backend apps at free of cost
- Fly - https://fly.io - Deploying Front & Backend apps at free of cost
- Deta - https://deta.sh - Deploying Node.js and Python apps and APIs. They support most web frameworks like Express, Koa, Flask, and FastAPI. They also provide a very fast and powerful NoSQL database for free.
- Heliohost - https://heliohost.org - PHP, Ruby on rails, perl, django, java(jsp)
- `...`
# Submission

After completing the assignment, please push the source code to remote repository (github/gitlab), then send us the link to your repository.

Don't forget to add `README.md` which includes guide to run your project locally and demo link.


**GOOD LUCK!!!**

![Your Code Work](./screenshots/meme.png)

# Contributors

- Edric Cao (from GO)
