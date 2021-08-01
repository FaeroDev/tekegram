const path = require("path");

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const PORT = process.env.PORT || 3001;
const app = express();

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });
// const hbs = exphbs.create({});


app.engine("handlebars", hbs.engine);
// app.engine("handlebars", )

app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(require('./controllers/'));
app.use(routes)

app.listen(PORT, () =>{
  console.log("connected")
  sequelize.sync({ force: false});
})

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// });
