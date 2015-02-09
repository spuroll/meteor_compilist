LinksList = new Mongo.Collection('links');

if (Meteor.isClient) {
  
  Template.rankedLinks.helpers({
    'link': function () {
      return LinksList.find({}, {sort: {score: -1, head: 1}});
    }
  });

  Template.rankedLinks.events({
    'click tr': function () {
      Session.set('selectedLink', this._id);
    },

    'click .increment': function() {
      var selectedLink = Session.get('selectedLink');
      LinksList.update(selectedLink, {$inc: {score: 1} });
    },

    'click .decrement': function() {
      var selectedLink = Session.get('selectedLink');
      LinksList.update(selectedLink, {$inc: {score: -1} });
    },

    'click .remove': function() {
      var selectedLink = Session.get('selectedLink');
      LinksList.remove(selectedLink);
    }

  });

  Template.addLinkForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var linkHead = event.target.formHead.value;
      var siteLink = event.target.formLink.value;
      var linkInfo = event.target.formInfo.value;
      
      LinksList.insert({
        head: linkHead,
        score: 0,
        info: linkInfo,
        site: siteLink
      });
      
    },

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
