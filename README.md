# Approval workflow challenge submission
This submission utilises a simple state machine approach to effectively traverse decision nodes and arrive at an eventual action, in this case a notification being sent on an invoice capture. The traversal tree is constructed statically using decision and action nodes, with modifications made easy by the node structure.

The backend utilises Express and TypeScript for a lightweight and simple server. A router with the accessible endpoint takes in three parameters, namely the invoice amount, the department the invoice is being captured for, and whether the approval requires management approaval. The state machine is then run on the server side, before the outcome notification is sent back to the frontend for display.

The frontend utilises React, TypeScript, and the MUI component library to render a simple UI for the invoice details capture. State is stored in the main App component, with the invoiceCaptureComponent calling state update hooks when respective values change. A helper function for the API call is also provided, as a means to make the application easier to extend as more endpoints become available.

## Database Schema
For this solution alone, there would ideally be two tables. One would store all captured invoices, with details of the parameters sent and the decision of the state machine (who a notification was sent to) for audit purposes. A second to store scheduled notifications so that these can be processed in batches for load balancing purposes. An optional priority flag can be included to instantly send the notification depending on certain parameters (such as the importance of the recipient). 

The schema below outlines how this data might be stored:
<img width="1860" height="1047" alt="Light Challenge UML" src="https://github.com/user-attachments/assets/8a4eb9c0-2cff-464a-b75b-53ae7abec828" />

## Potential Improvements
- The nodes that the state machine utilises are statically defined at compile time, which makes changing them once deployed a slow process, while also preventing quick edits in emergencies. In a real-world scenario it might be better to store this configuration on a database so that the flow can be edited in real-time without deployment, which makes the overall system far more reactive.

- While contact address and notification methods are specified statically in this example, in a real-world scenario these would be fetched from a database table with an employee or contact directory, as well as preferred notification method and address.

- The solution lacks authetication between the frontend and backend services, which would be required in a real-world scenario in order to prevent injection attacks. This would also require some form of token exchange between to frontend and backend services, such as a session token, so that the authenticity of the recieved parameters can be checked.

- The endpoint also lacks any unit testing which should be implemented to prevent unwanted behaviour when/if the state machine is changed -- either by the parameters it ingests or the output it sends back as a response.

- The frontend UI is basic and lacks much functionality outside of the single purpose of sending an invoice with these three specific parameters. 

- A packages component could be added to the repo to store shared types between the frontend and backend, streamlining the definition of these types and avoid potential mismatches when changes are made.

### How to build & run

## Backend

```sh
cd backend
pnpm i
pnpm build-and-start
```

## Frontend

```sh
cd frontend
pnpm i
pnpm start
```

The frontend is configured to run on port 3000, while the backend runs on port 8080.
