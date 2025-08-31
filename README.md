# Capstone_Project_FE
Final Frontend Web Development Project. Compulsory for graduation
# APPlai - Web App Job Application Tracker

**CAPSTONE PROJECT - FRONTEND**

APPlai is a modern, responsive web application designed to help job seekers efficiently **manage and track their job search activities**. It provides a centralized digital workspace where users can record, monitor, and analyze every stage of their job hunt—from initial application to interview follow-ups and final offers. The app is built with scalability in mind, with future extensions for mobile and desktop versions.

---

## Problem It Solves

Job searching can be chaotic and overwhelming. Many job seekers struggle to keep track of:

- Which jobs they applied for  
- Application dates  
- Documents sent  
- Interview schedules  
- Feedback received  
- Application deadlines and statuses  

Most people rely on spreadsheets or notes apps, neither of which are tailored for this task. APPlai brings structure, reminders, and clarity to the job search process.

---

## Features & Functionality

### User Management
- **User Registration**: Register with email and password  
- **User Authentication**: Google OAuth2 integration  

### Dashboard
- Summary of job stats: applied, interviewing, offers, rejections  

### Job Entry Management
- Add, edit, and delete job entries  
- Store details: company name, position, salary, location  
- Track job status: Wishlist, Applied, Interviewing, Offer, Rejected  

### Interview Scheduler
- Add interview details (date, time, contact person, notes)  
- Auto reminders (via browser notifications, ready for email/text integration)  

### Task / To-Do List
- Custom reminders for follow-ups, applications, thank-you emails  

### Filters & Search
- Filter job entries by status, company, date, role, etc.  
- Search across all fields  

### Analytics & Insights
- Charts for total applications, success rate, interviews, rejections  
- Timeline view of application history  

### Responsive Design
- Fully responsive across desktop, tablet, and mobile  

### Dark Mode
- User toggle for light/dark UI preference  

### Google Drive Storage
- Store, read, update, and delete JSON-based job data from any device  

---

## Tech Stack

**Frontend:** React, React Router, Zustand / Context API, Tailwind CSS, Headless UI  
**Charts & Analytics:** Recharts  
**Date Handling:** date-fns or dayjs  
**Optional Auth / Backend:** Firebase Auth or Clerk, Google API Client Library  
**Deployment:** Vercel or Netlify  
**Dev Tools:** ESLint, Prettier, GitHub, VS Code

