# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

Stack: **Javascript**, **Node.JS**, **Express**, **MongoDB**, **Mongoose**

| API                        | HTTP | Description                                            | Query Params                           |
| -------------------------- | ---- | ------------------------------------------------------ | -------------------------------------- |
| /                          | GET  | shows main page                                        |
| /api/users                 | POST | adds a new user to the database                        |
| /api/users                 | GET  | shows all users                                        |
| /api/users/:\_id/exercises | POST | adds a new exercise entry related to a particular user |
| /api/users/:\_id/logs      | GET  | shows the log of a user's exercises                    | limit=NUMBER<br> from=DATE<br> to=DATE |

This is exercise tracking microservice. In the form on left a new user can be created, JSON with user's username and assigned ID will be returned after pressing a Submit button.

On the right side it is possible to add a new exercise for this user with corresponding info (all fields except Date are required. If date left empty current date will be automatically assigned).

It is possible to look through the logs of a particular user's exercise using `/api/users/:\_id/logs?from=DATE&to=DATE&limit=NUMBER` (e.g., `/api/users/617d299f45b87333a805626/logs?from=2021-10-01&to=2021-12-01&limit=5`) (all query parameters are optional).

![App Image](https://i.imgur.com/mWbBZZv.png)
