# startup


### Elevator pitch

My restaurant, The Blast Zone Cafe, a futuristic-themed restaurant known for creative food that explodes with flavor (not literally, of course), will increase business by making customers excited to participate in deciding what new, innovative food items will be added to the menu. During the promotion, users will get to choose three new menu items from the descriptions on the restaurant’s website that they would like to see added to the regular menu. During the promotion period, the current voting statistics for each potential new menu item will be displayed. At the end of the promotion, the top three menu items with the most votes will be added to The Blast Zone Cafe menu.

### Design

![Elevator Pitch](Elevator Pitch.png)


### Key features

- Secure login over HTTPS
- Ability to select a list of potential menu items
- Display of choices
- Top-Three Voting System


### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one for voting. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, choice display, applying votes, display other users votes, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving choices
  - submitting votes
  - retrieving vote status
- **DB/Login** - Store restaurant owners live info
- **WebSocket** - As each user votes, update the votes live.
- **React** - Application ported to use the React web framework.


### Update Log: HTML Deliverable:

- HTML pages - Two HTML page that represent the ability to login and vote on the menu designs.
- Links - The login page automatically links to the ranking page and vice versa.
- Text - Each of the menu items has a text description. Currently they are placeholders
- Images - I included the images for the possible menu items
- DB/Login - Input box and submit button for login. The voting choices represent data pulled from the database.
- WebSocket - The count of menu rating results represent the tally of realtime votes.

