# Installation



## Demonstration

Most of the components in this library can be seen in the demonstration app. To start it, rull the following commands
to build the library and to start the components sandbox app.



```bash
npx ng build ng-hpo-uikit
npx ng serve components-sandbox
```

You will see a link to a server on local host at port 4200 (by default).

To stop the development server (this is needed to run the above commands more than once), enter the following to
terminate the server:

```bash
kill -9 $(lsof -t -i:4200)
```
