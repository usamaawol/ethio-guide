# Ethio Guide

Build a modern, responsive web application called:

# UNIVERSITY GUIDE FOR ETHIOPIAN STUDENTS 🇪🇹

The purpose of this platform is to help Ethiopian students discover, explore, compare, and understand universities in Ethiopia.

This is NOT supposed to be just a simple university listing website.

It should eventually become an intelligent university discovery and AI guidance platform where a student can ask questions such as:

"I want to study Software Engineering. Which universities in Ethiopia offer it?"

"I want to study medicine. Which universities should I consider?"

"Which universities are in Oromia?"

"Which universities are closest to Addis Ababa?"

"What colleges and departments does Haramaya University have?"

"Show me universities that offer computer-related programs."

The AI should eventually use the application's verified university database to answer these questions and recommend universities. However, for this first version, build the architecture so that AI can easily be integrated later.

==================================================

1. CORE PRODUCT IDEA

==================================================

Create a platform where Ethiopian students can:

- Explore Ethiopian universities

- Browse universities by generation

- Browse universities by region

- Search universities

- Filter universities

- View detailed university profiles

- View university location on Google Maps

- Explore campus locations

- View available Google Street View imagery where available

- View university buildings and campus photos

- Explore colleges

- Explore schools/institutes

- Explore departments

- Explore academic programs

- See university history

- See university mission and vision

- See university values

- See facilities

- See important university information

- Compare universities

- Eventually interact with an AI university advisor

The application must be designed mobile-first and work beautifully on:

- Mobile

- Tablet

- Desktop

==================================================

2. BRANDING

==================================================

Application name:

University Guide for Ethiopian Students

Suggested short name:

UGES

Use a professional Ethiopian education-focused visual identity.

The design should communicate:

- Education

- Trust

- Modern technology

- Ethiopian identity

- Academic excellence

- Student guidance

Use a clean modern interface with:

- Deep blue

- Green

- White

- Subtle gold/orange accents

Do NOT make the design look like an old government website.

It should feel like a modern startup/education platform.

Use:

- Rounded cards

- Subtle shadows

- Clean typography

- Modern spacing

- Clear hierarchy

- Smooth animations

- Accessible contrast

- Professional icons

Avoid excessive animations.

==================================================

3. MAIN NAVIGATION

==================================================

Create a responsive navigation bar.

Desktop navigation:

Logo:

University Guide 🇪🇹

Navigation:

Home

Universities

Generations

Regions

Programs

Compare

AI Advisor

About

Include:

- Search icon

- Mobile hamburger menu

The navigation should become a mobile drawer on smaller screens.

==================================================

4. HOMEPAGE

==================================================

Create a visually strong homepage.

Hero section:

Headline:

"Find the Right University for Your Future"

Subheading:

"Explore Ethiopian universities, discover programs, compare institutions, and make informed decisions about your education."

Large search bar:

"Search universities, programs, colleges, departments..."

Buttons:

[Explore Universities]

[Ask AI Advisor]

Add a visually appealing Ethiopian education/campus background.

Do not use fake statistics.

Use only statistics that exist in the database.

==================================================

5. HOMEPAGE SECTIONS

==================================================

After the hero section create:

SECTION 1:

"Explore Ethiopian Universities"

Show university cards.

Each card should contain:

- University logo

- University name

- Short name

- Region

- City

- Generation

- University type

- Short description

- View University button

- View Map button

SECTION 2:

"Explore by Generation"

Create visual generation cards.

Example:

First Generation

Second Generation

Third Generation

Fourth Generation

...

IMPORTANT:

Do NOT invent which university belongs to which generation.

The generation field must come from the database.

If a university's generation is unknown, display:

"Generation information unavailable"

The architecture must support future generation categories.

SECTION 3:

"Explore by Region"

Create region cards for Ethiopian regions and administrative cities.

Examples:

Oromia

Amhara

Addis Ababa

Tigray

Somali

Afar

Benishangul-Gumuz

Gambela

Harari

Sidama

South Ethiopia Regional State

Central Ethiopia Regional State

South West Ethiopia Peoples' Region

Dire Dawa

etc.

Do not hardcode inaccurate university-region relationships.

SECTION 4:

"Find Your Program"

Large program search.

Example:

"I want to study..."

Search:

Software Engineering

Computer Science

Medicine

Law

Agriculture

Business

Economics

Engineering

Education

Veterinary Medicine

etc.

When the user selects a program, show universities that have that program in the verified database.

SECTION 5:

"AI University Advisor"

Create a large promotional section.

Example:

"Not sure which university is right for you?"

"Ask our AI advisor."

Button:

[Start AI Guidance]

For the first version this can lead to an AI page with an interface placeholder, but design the architecture so a real AI backend can be connected later.

==================================================

6. UNIVERSITY DIRECTORY

==================================================

Create:

/universities

This page should contain:

- Search bar

- Region filter

- Generation filter

- University type filter

- Program filter

- Sorting

- Grid/list view

University cards must be responsive.

Allow users to sort by:

- Name

- Location

- Generation

- Recently verified

Do NOT rank universities by quality unless there is verified data.

Avoid arbitrary claims such as:

"Best university"

unless backed by a specific verified ranking source.

==================================================

7. UNIVERSITY PROFILE PAGE

==================================================

Each university should have its own page:

/universities/:slug

The page should be extremely informative.

Create the following sections:

1. Overview

2. History

3. Mission

4. Vision

5. Values

6. Academic Structure

7. Colleges

8. Schools

9. Institutes

10. Departments

11. Programs

12. Popular/commonly studied programs

13. Campus

14. Facilities

15. Location

16. Map

17. Campus exploration

18. Photos

19. Contact

20. Official website

21. Sources

22. Last verified date

==================================================

8. UNIVERSITY HEADER

==================================================

University profile header should display:

University logo

University name

Short name

Region

City/location

University type

Generation

Official website button

View on Google Maps button

Explore Campus button

Share button

Example:

Haramaya University

HU

Public Research University

Oromia Region · Haramaya

[Official Website]

[View on Map]

[Explore Campus]

==================================================

9. UNIVERSITY HISTORY

==================================================

Create a beautiful timeline component.

For example:

1954

Institution established

1957

First graduates completed their studies

1958

Convocation and campus milestone

...

Use only verified information supplied by the database.

Do not invent historical events.

==================================================

10. ACADEMIC STRUCTURE

==================================================

This is one of the most important features.

Create an interactive academic hierarchy.

Example:

University

    ↓

College

    ↓

Department

    ↓

Program

Allow users to expand/collapse each level.

Example:

College of Computing & Informatics

    ├── Computer Science

    ├── Information Technology

    └── Other verified departments/programs

The database must support:

Universities

    ├── Colleges

    │      ├── Schools

    │      ├── Departments

    │      └── Programs

    ├── Institutes

    ├── Research centers

    └── Other academic units

Do not force every university into exactly the same academic hierarchy because universities may organize their academic units differently.

==================================================

11. PROGRAM SEARCH

==================================================

Create:

/programs

Students should be able to search:

Software Engineering

Computer Science

Information Technology

Medicine

Nursing

Law

Agriculture

Veterinary Medicine

Business

Economics

Engineering

Education

etc.

When a program is selected:

Show:

Program name

Universities offering it

Region

College/school

Department

Degree level if known

Campus

Official source

Last verified date

==================================================

12. GOOGLE MAPS INTEGRATION

==================================================

The website must integrate Google Maps.

Each university needs:

- Latitude

- Longitude

- Address/location

- Region

- City

- Campus locations

Do NOT invent coordinates.

Use environment variables for Google Maps credentials.

Example:

VITE_GOOGLE_MAPS_API_KEY

Never hardcode the API key directly in source code.

The university profile should have a large interactive map.

Map features:

- University marker

- Campus markers where available

- Zoom

- Satellite view

- Directions link

- Open in Google Maps

==================================================

13. CAMPUS EXPLORATION

==================================================

Create a "Explore Campus" feature.

The goal is to allow a student to visually explore university campuses.

Where Google Street View coverage is available:

Use Google Street View.

Where Street View is NOT available:

Show:

- Satellite map

- Campus photos

- Building gallery

- University-provided images

- Important campus locations

Do NOT pretend that Street View exists when it does not.

Create a graceful fallback.

Example:

"Street View is unavailable for this location. Explore campus photos instead."

==================================================

14. CAMPUS BUILDINGS

==================================================

The data model should support campus buildings.

Example:

Main Library

Administration Building

College of Computing

College of Agriculture

Dormitories

Laboratories

Sports Center

Cafeteria

Hospital

Main Gate

ICT Center

Each building may contain:

- Name

- Description

- Building type

- Coordinates

- Photos

- Related college/department

- Map marker

Do not add buildings unless their information has been verified.

==================================================

15. UNIVERSITY COMPARISON

==================================================

Create:

/compare

Allow the user to select multiple universities.

Comparison should show:

University name

Generation

Region

City

Year established

University type

Colleges

Institutes

Programs

Facilities

Campus information

Official website

Map location

Only display comparison fields where reliable data exists.

Do not calculate fake scores.

==================================================

16. AI ADVISOR

==================================================

Create:

/ai-advisor

UI should look like a modern AI chat assistant.

Header:

"University AI Advisor"

Subtitle:

"Tell me what you want to study, and I'll help you explore Ethiopian universities."

Example prompts:

"I want to study Software Engineering."

"Which universities offer Medicine?"

"I want a computer-related degree."

"Which universities are in Oromia?"

"Show me universities offering Law."

"Compare Haramaya University and Jimma University."

The AI architecture must be designed so that the AI retrieves information from the university database rather than inventing facts.

IMPORTANT:

The AI MUST NOT hallucinate university information.

If information doesn't exist in the database:

"I don't currently have verified information about that."

The AI should be capable of:

1. Searching universities

2. Searching programs

3. Filtering by region

4. Filtering by generation

5. Finding universities offering a program

6. Comparing universities

7. Explaining university information

8. Suggesting universities based on student preferences

Future recommendation flow:

Student:

"I want to study software engineering."

AI:

"Which region do you prefer?"

Student:

"Oromia."

AI:

"Do you prefer a public or private university?"

Student:

"Public."

AI:

"Here are universities matching your preferences."

This should be designed into the architecture, even if the actual AI integration is connected later.

==================================================

17. AI DATA SAFETY

==================================================

The AI should always prioritize database information.

Recommended architecture:

User

 ↓

AI

 ↓

Query understanding

 ↓

University database

 ↓

Verified records

 ↓

AI response

Do NOT allow the AI to simply make up information.

Every AI recommendation should ideally be based on actual database records.

Responses should be able to include:

University

Program

Region

College

Department

Source

Last verified date

==================================================

18. TRUST AND DATA SOURCES

==================================================

This is very important.

Every university record should support:

source_url

source_name

source_type

last_verified

verification_status

Example:

Source:

Haramaya University official website

Last verified:

August 2026

Status:

Verified

The UI should show this information on university profiles.

Create a small section:

"Information Sources"

with links to official university websites.

==================================================

19. DATA CONFIDENCE

==================================================

Add support for:

Verified

Partially verified

Needs verification

Do not present uncertain data as fact.

Example:

✅ Verified information

⚠️ Information needs verification

==================================================

20. DATABASE ARCHITECTURE

==================================================

Design the database to be scalable.

Suggested entities:

University

UniversityProfile

Campus

Building

College

School

Institute

Department

Program

Facility

UniversityPhoto

Region

Source

UniversityHistory

UniversityStatistics

Generation

UniversityContact

This should support hundreds of universities eventually.

A university should be linked to its:

- region

- generation

- campuses

- colleges

- institutes

- departments

- programs

- sources

- photos

==================================================

21. INITIAL DATABASE CONTENT

==================================================

Seed the application with the following three universities:

1. Haramaya University

2. Jimma University

3. Addis Ababa University

IMPORTANT:

The information below is user-provided source material.

Do not invent additional facts.

Where information is missing, leave the field empty or mark it:

"Information not yet added"

==================================================

22. HARAMAYA UNIVERSITY DATA

==================================================

University:

Haramaya University

Short name:

HU

Official website:

https://www.haramaya.edu.et

Academic overview:

Haramaya University (HU) is one of Ethiopia’s largest and oldest public research universities, originally founded in 1954 with a strong focus on agricultural science, and later expanding into a comprehensive, multi-disciplinary institution.

The provided information states that it currently enrolls over 30,000 students across various fields.

Academic excellence information:

"Haramaya University aspirations and ambitions can be seen in development activity throughout the campus and in every department and discipline. Through the dedicated efforts of its staff and faculty, long term strategic planning, investment and with a dedication to the development of its student body, Haramaya University is positioning itself to achieve greater academic excellence."

Main colleges provided:

College of Agriculture & Environmental Sciences

College of Business & Economics

College of Computing & Informatics

College of Education & Behavioural Sciences

College of Health & Medical Sciences

College of Law

College of Natural & Computational Sciences

College of Social Sciences & Humanities

College of Veterinary Medicine

Institute:

Haramaya Institute of Technology (HIT)

HIT offers engineering and technology programs.

Historical information:

The Haramaya University College of Agriculture, formerly the Alemaya College of Agriculture, was established in 1954.

The first eleven graduates completed their studies in the summer of 1957 and were granted BSc degrees in general agriculture at a convocation ceremony held at Alemaya Campus in January 1958.

Emperor Haile Selassie I inaugurated Alemaya Campus in January 1958.

DO NOT add other historical information unless later provided or verified.

==================================================

23. HARAMAYA UNIVERSITY ORGANIZATIONAL STRUCTURE

==================================================

Use the uploaded organizational structure image as a visual reference.

The provided image shows an organizational structure containing elements such as:

Ministry Education

University Board

President

Managing Council

University Council

Academic Senate

Institutional Quality Assurance Director

Internal Audit

Ethics and Anti-Corruption Director

University Protection and Campus Security Director

Women, Children and Youth Affairs

Liaison Officer

Construction Project Officer

Public and International Relations Director

Legal Services

Strategic Planning, Monitoring and Evaluation Director

Good Governance and Reform Director

Information Communication Technology Director

Vice President for Academic Affairs

Vice President for Research and Community Engagement

Vice President for Administration and Development

Haramaya Institute of Technology leadership

CHMS executive leadership

Use the uploaded image as a reference for the university's organizational structure.

Do NOT automatically treat every visible organizational office as an academic department.

Keep:

Organizational Structure

separate from:

Academic Structure.

==================================================

24. JIMMA UNIVERSITY DATA

==================================================

University:

Jimma University

Short name:

JU

Official website:

https://ju.edu.et

Vision:

"Aspires to be one of the Leading Community Based Research Universities in Africa and Renowned in the World by 2030."

Mission:

"Jimma University is committed to Engaging in Core Functions of Innovative Teaching, Research and Community Services Through its Cherished and Innovative Community Based Education (CBE)."

Goals:

- To build culture of academic excellence that champions students' success in intellectual expertise, graduation and employability.

- To develop highest standards of research that gives solutions to the pressing national and global challenges.

- To empower the community to resolve their own issues through our creative and responsive services.

- To build a diverse global network in intercultural, curricular and co-curricular opportunities that make students globally competent.

- To create mutual partnership for reputation, financial sustainability and maximizing investment.

Welcome information:

Jimma University's motto is:

"We are in the Community!"

Jimma University emphasizes inclusivity, accessibility, openness, and responsiveness.

The provided source describes ongoing development including:

- Administrative buildings

- Sports facilities

- Laboratories

- ICT centers

- Hotel

- Additional classrooms

The university emphasizes gender equality and support for female students.

The university also emphasizes inclusion of marginalized groups and people with disabilities.

The provided source states that students come from all regions of Ethiopia, including Afar, Gambella and Somali regions.

International students and collaborations are also part of the university's internationalization effort.

The university emphasizes public-private partnerships to prepare students for industry.

==================================================

25. JIMMA UNIVERSITY HISTORY

==================================================

According to the supplied information:

Jimma University was founded through the amalgamation of:

Jimma Institute of Health Sciences

and

Jimma College of Agriculture

in the 1980s.

The provided source states that both institutions had been national leaders in their respective fields.

The merger contributed to the development of a multifaceted and development-oriented institution.

The provided information describes Jimma University as an institution that expanded programs and strengthened academic activity over time.

The provided source also references:

"Reg No. 63-1999 Jimma University Establishment Regulation"

Official document:

https://ju.edu.et/wp-content/uploads/2024/04/Reg-No.-63-1999-Jimma-University-EstablishmenRegulation.pdf

DO NOT make historical claims beyond the supplied information.

==================================================

26. JIMMA UNIVERSITY ACADEMIC STRUCTURE

==================================================

Based on the supplied screenshot/reference, the following academic units are visible:

College of Law & Governance

College of Business & Economics

College of Education & Behavioral Science

College of Agriculture and Veterinary Medicine

College of Natural Sciences

College of Social Sciences & Humanities

Sport Academy

Agro Campus

The screenshot also shows:

About Academics

Colleges

Institute & Schools

Registrar

CDE & E-Learning

Professional Development

For the first version, clearly distinguish academic colleges from administrative services.

Use the screenshot as the UI/data reference.

Do not invent departments/programs that were not supplied.

==================================================

27. ADDIS ABABA UNIVERSITY DATA

==================================================

University:

Addis Ababa University

Short name:

AAU

Official website:

https://www.aau.edu.et

History:

Addis Ababa University is a pioneer university in Ethiopia located in Addis Ababa, the capital city of Ethiopia.

The supplied source describes AAU as one of Ethiopia's major national universities.

It commenced as the University College of Addis Ababa in 1950.

Initially it consisted of the Faculties of Arts and Science.

It obtained chartered college status in 1954.

In February 1961, various colleges including the Theological College formed Haile Selassie I University.

The emperor offered Guenete Leul Palace, located at the heart of the Sidist Kilo main campus, to serve as the nucleus of administration.

Following the 1974 Ethiopian Revolution, the institution was briefly renamed the University of Ethiopia (National University), before assuming its present name, Addis Ababa University, in 1975.

AAU opened its first master's programs in 1979.

Its first PhD programs began in 1987.

The supplied information describes subsequent expansion across academic fields.

==================================================

28. AAU PRESENT STATUS

==================================================

The supplied information states:

The Council of Ministers of the Federal Democratic Republic of Ethiopia approved an autonomous establishment draft regulation for Addis Ababa University during its 23rd regular meeting on 4 August 2023.

The supplied information says the federal government issued a University Autonomy Proclamation concerning higher education institutional academic independence.

Since September 2023, AAU has been carrying out technical and professional tasks related to the reform process.

The provided source describes AAU's goal of becoming a self-governing/autonomous university.

==================================================

29. AAU STRATEGIC PLAN

==================================================

The supplied information states that AAU prepared a five-year Strategic Plan for 2024-2028.

The plan is intended to maintain the university's position and support progress toward full autonomy.

It addresses nine strategic themes and initiatives.

==================================================

30. AAU MISSION

==================================================

Use:

"To pursue transformative education, cutting-edge research and innovation, and impactful services and engagement in advancing socio-economic, cultural, and technological needs and interests."

==================================================

31. AAU VISION

==================================================

Use:

"To become a leading research university in Africa, to advance national needs and be responsive to global development."

==================================================

32. AAU VALUES

==================================================

Add these values:

Excellence

Academic Freedom

Integrity and Accountability

Diversity, Equity, and Inclusion

Collaboration

Care

Descriptions should use the supplied source material.

==================================================

33. UPLOADED IMAGES

==================================================

The user has supplied visual references for:

1. Haramaya University organizational structure

2. Jimma University website/interface

3. Jimma University academic navigation and colleges

4. Addis Ababa University website/interface

5. Addis Ababa University content/design

Use the images as visual/content references.

Do NOT copy their entire websites.

The new application must have its own modern identity.

Do not reproduce copyrighted layouts exactly.

==================================================

34. IMAGE HANDLING

==================================================

University profiles should support:

- Logo

- Hero image

- Campus images

- Building images

- Gallery

Use placeholder image components when real images have not been supplied.

Do not use random AI-generated images as factual representations of universities.

Clearly distinguish:

Official university images

from

Generic placeholder images.

==================================================

35. ADMIN / DATA MANAGEMENT ARCHITECTURE

==================================================

Prepare the app for an admin dashboard.

Later admins should be able to:

- Add university

- Edit university

- Delete university

- Add college

- Add department

- Add program

- Add campus

- Add building

- Add photos

- Add historical events

- Add sources

- Update verification status

- Update last verified date

For now, the frontend may use seeded local/sample database data, but structure the code cleanly so the backend can be connected later.

==================================================

36. FIREBASE PREPARATION

==================================================

Use Firebase as the planned backend.

Structure the application so it can use:

Firebase Authentication

Firestore

Firebase Storage

Do NOT hardcode Firebase secrets.

Use environment variables.

Example:

VITE_FIREBASE_API_KEY

VITE_FIREBASE_AUTH_DOMAIN

VITE_FIREBASE_PROJECT_ID

VITE_FIREBASE_STORAGE_BUCKET

VITE_FIREBASE_MESSAGING_SENDER_ID

VITE_FIREBASE_APP_ID

==================================================

37. GOOGLE MAP API SECURITY

==================================================

Use environment variables for Google Maps.

Example:

VITE_GOOGLE_MAPS_API_KEY

Never place secret credentials directly into components.

==================================================

38. TECH STACK

==================================================

Use:

React

TypeScript

Vite

Tailwind CSS

Modern component architecture

React Router

Firebase-ready architecture

Google Maps integration

Lucide React or another modern icon library

Use reusable components.

Suggested components:

Navbar

Footer

SearchBar

UniversityCard

UniversityGrid

UniversityFilters

UniversityHeader

UniversityTimeline

AcademicStructure

CollegeCard

DepartmentCard

ProgramCard

MapSection

CampusExplorer

BuildingCard

PhotoGallery

SourceBadge

VerificationBadge

CompareTable

AIChat

RegionCard

GenerationCard

==================================================

39. ROUTING

==================================================

Create:

/

/universities

/universities/:slug

/generations

/regions

/programs

/compare

/ai-advisor

/about

Potential future routes:

/admin

/admin/universities

/admin/programs

/admin/colleges

==================================================

40. RESPONSIVE DESIGN

==================================================

Mobile-first.

On mobile:

- Bottom-friendly buttons

- Collapsible filters

- Horizontal card scrolling where appropriate

- Responsive maps

- Mobile-friendly AI chat

- Sticky actions where useful

On desktop:

- Large information layouts

- Sidebar filters

- Multi-column university cards

- Large interactive maps

==================================================

41. ACCESSIBILITY

==================================================

Follow modern accessibility practices.

Use:

- Semantic HTML

- Proper labels

- Keyboard navigation

- Accessible buttons

- Alt text

- Good color contrast

- Focus states

==================================================

42. SEARCH EXPERIENCE

==================================================

Search should support:

University names

Short names

Programs

Colleges

Departments

Regions

Cities

Example:

Searching:

"software"

could eventually find:

Software Engineering

Computer Science

Information Technology

and universities that contain those programs.

==================================================

43. UNIVERSITY RECOMMENDATION ARCHITECTURE

==================================================

Prepare a recommendation engine.

Possible inputs:

Desired program

Preferred region

University type

Distance

Student preferences

Academic interest

Degree level

Recommendation output:

University

Why it matches

Program

College

Department

Location

Source

Verification date

Example:

"Recommended because this university has a verified Software Engineering program and matches your preferred region."

Never claim:

"this is the best university"

unless a trusted ranking/source is provided.

==================================================

44. DATA MODEL PRINCIPLES

==================================================

Important:

Do not store all university information in one giant JSON object.

Use normalized, scalable structures.

Example:

University

   |

   ├── Campuses

   |

   ├── Colleges

   |      ├── Departments

   |      |      └── Programs

   |

   ├── Institutes

   |

   ├── Facilities

   |

   ├── Buildings

   |

   ├── Photos

   |

   ├── History

   |

   └── Sources

This will make the future AI recommendation and search systems much easier.

==================================================

45. EMPTY DATA HANDLING

==================================================

When information is missing:

Do not invent it.

Display:

"Information not yet available."

or

"Not yet verified."

Examples:

Exact coordinates:

"Location coordinates not yet added."

Popular program:

"Data not yet available."

Generation:

"Generation not yet verified."

==================================================

46. DESIGN DETAILS

==================================================

Create modern university cards with:

University logo

University name

Generation badge

Region badge

Location

Short overview

Programs count only when actual count is known

Buttons:

View Details

View Map

Use subtle hover effects.

University profile should have:

Hero area

Information cards

Tabbed sections where useful

Possible tabs:

Overview

Academics

Programs

Campus

Map

History

Sources

==================================================

47. MAP EXPERIENCE

==================================================

On the university profile:

Large map card:

"Explore University Location"

Show:

- Main campus

- Campus buildings where coordinates exist

- Map controls

Buttons:

Open in Google Maps

Get Directions

Satellite View

Campus explorer:

"Explore Campus"

Use Street View where available.

Otherwise:

"Campus imagery unavailable"

and show photo gallery.

==================================================

48. FUTURE FEATURES

==================================================

Architecture should make it possible to add later:

AI Advisor

Student accounts

Favorites

Saved universities

University comparison

Program recommendations

Admission information

Entrance exam information

Scholarships

Student reviews

Notifications

University news

Events

Application deadlines

Personalized recommendations

Email notifications

PWA/offline support

Multilingual support

Future languages could include:

English

Amharic

Afan Oromo

But do not implement full multilingual support unless necessary for this first version.

==================================================

49. IMPORTANT PRODUCT PRINCIPLE

==================================================

This platform should prioritize:

ACCURACY

TRUST

USEFULNESS

SIMPLICITY

Do not fill the interface with fake data.

Do not invent university statistics.

Do not invent rankings.

Do not invent departments.

Do not invent coordinates.

Do not invent admission requirements.

Do not claim something is popular unless there is data supporting it.

==================================================

50. FIRST VERSION PRIORITY

==================================================

Build a polished working MVP using the three provided universities:

Haramaya University

Jimma University

Addis Ababa University

The MVP must have:

✅ Homepage

✅ University directory

✅ Search

✅ Region filtering

✅ Generation filtering architecture

✅ University profiles

✅ Academic structure

✅ Colleges

✅ Historical information

✅ Mission/Vision

✅ University values

✅ Source information

✅ Google Maps architecture

✅ Campus exploration architecture

✅ Program search architecture

✅ University comparison

✅ AI Advisor interface

✅ Responsive design

✅ Firebase-ready architecture

✅ Clean TypeScript code

==================================================

51. FINAL UX GOAL

==================================================

The experience should feel like:

"Google Maps + University Directory + Academic Explorer + AI University Advisor"

built specifically for Ethiopian students.

A student should be able to enter the website and quickly answer:

Where is this university?

What does it teach?

What colleges does it have?

What departments does it have?

What programs does it offer?

What is its history?

What region is it in?

What does the campus look like?

Can I explore it on the map?

Which universities offer the program I want?

Which universities should I consider?

==================================================

52. IMPORTANT IMPLEMENTATION RULE

==================================================

Before building complicated features, first create the complete design system, application layout, routing structure, data models, reusable components, and seeded university data.

Then implement the pages.

Do not create a visually impressive frontend with a poorly structured data model.

The database architecture must be the foundation because this project will eventually contain information about many Ethiopian universities and power an AI advisor.

==================================================

53. FINAL RESULT

==================================================

Create a polished, production-quality MVP named:

UNIVERSITY GUIDE FOR ETHIOPIAN STUDENTS 🇪🇹

The result should look like a serious educational technology platform, not a school assignment.

Use the supplied university information as seed data.

Keep all unknown information clearly marked as unavailable/unverified.

Prepare the application for:

Firebase

Google Maps

AI/RAG-style university search

University recommendations

Scalable university data

Admin management

Build with clean, maintainable React + TypeScript architecture.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0940aa45-bbfd-436e-8256-feac39a7afe9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
