const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;
const _ = require('lodash');
const port = process.env.PORT || 3000
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://jorgeTrejo:090901.Jt.090901@resumeprojects.n5likbk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

// To-Do List Routing

const itemSchema = new Schema({
  name: String
});

const listSchema = new Schema({
  name: String,
  items: [itemSchema]
});

const List = mongoose.model('List', listSchema)
const Item = mongoose.model('Item', itemSchema)

// these default items always present themselves
// whenever all items disappear these reappear
const item1 = new Item({
  name: "Welcome to your to-do list"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to cross out an item"
});

const defaultItems = [item1, item2, item3]

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    if (req.body.hasOwnProperty("toDo")){
        res.redirect('/todo')
    } else {
        console.log("other website")
    } 
})

// get all items from database
app.get("/todo", (req, res) => {

  Item.find((err, items) => {
    if (err) {
      console.log(err);
    } else if (items.length == 0) {
      Item.insertMany(defaultItems, (error) => {
        if (error) {
          console.log(error);
        }
      });
      res.redirect('/todo');
    } else {
      res.render("list", {listTitle: "Today", newListItems: items});
    }
  });
});

// making individual unique lists
app.get('/todo/:listName', (req, res) => {
  const listName = _.capitalize(req.params.listName);

  List.findOne({name: listName}, async (err, list) => {
    if (err) {
      console.log(err);
    } else if (!list) {
      const list = new List({
        name: listName,
        items: defaultItems
      });
      
      await list.save();

      res.redirect('/todo' + listName);
    } else {
      res.render('list', {listTitle: listName, newListItems: list.items});
    }
  });
});

// post method for adding items to list
app.post("/todo", async (req, res) => {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName == "Today") {
    await item.save();
    res.redirect('/todo');
  } else {
    List.findOne({name: listName}, async (err, list) => {
      if (err) {
        console.log(err);
      } else {
        list.items.push(item);
        await list.save();
        res.redirect("/todo" + listName);
      }
    });
  }
});

// post method to delete an item once checked off
app.post('/todo/delete', async (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName == 'Today') {
    await Item.findByIdAndDelete(checkedItemId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  
    res.redirect('/todo');
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, async (err, list) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/todo' + listName);
      }
    });
  }
});

// Blog Web App Routing

app.listen(port, () => {
  console.log(`Web app listening on port ${port}`)
})
