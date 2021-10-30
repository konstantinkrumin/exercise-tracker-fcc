# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

Stack: **Javascript**, **Node.JS**, **Express**, **MongoDB**, **Mongoose**

| API                                                  | HTTP Method | Description                                            |
| ---------------------------------------------------- | ----------- | ------------------------------------------------------ |
| /                                                    | GET         | shows main page                                        |
| /api/users                                           | POST        | adds a new user to the database                        |
| /api/users                                           | GET         | shows all users                                        |
| /api/users/:\_id/exercises                           | POST        | adds a new exercise entry related to a particular user |
| /api/users/:\_id/logs?from=DATE&to=DATE&limit=NUMBER | GET         | shows the log of a user's exercises                    |

![App Image](https://i.imgur.com/mWbBZZv.png)
