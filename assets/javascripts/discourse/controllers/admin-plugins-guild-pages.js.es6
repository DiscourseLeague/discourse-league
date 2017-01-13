import GuildPage from '../models/guild-page';

export default Ember.Controller.extend({

  pageURL: document.location.origin + "/guild/p/",

  baseDGPage: function() {
    var a = [];
    a.set('title', I18n.t('admin.guild.pages.new_title'));
    a.set('active', false);
    return a;
  }.property('model.@each.id'),

  removeSelected: function() {
    this.get('model').removeObject(this.get('selectedItem'));
    this.set('selectedItem', null);
  },

  changed: function(){
    if (!this.get('originals') || !this.get('selectedItem')) {this.set('disableSave', true); return;}
    if (((this.get('originals').title == this.get('selectedItem').title) &&
      (this.get('originals').slug == this.get('selectedItem').slug) &&
      (this.get('originals').raw == this.get('selectedItem').raw) &&
      (this.get('originals').cooked == this.get('selectedItem').cooked)) ||
      (!this.get('selectedItem').title) ||
      (!this.get('selectedItem').raw)
      ) {
        this.set('disableSave', true); 
        return;
      }
      else{
        this.set('disableSave', false);
      }
  }.observes('selectedItem.title', 'selectedItem.slug', 'selectedItem.raw'),

  actions: {
    selectDGPage: function(dgPage) {
      if (this.get('selectedItem')) { this.get('selectedItem').set('selected', false); };
      this.set('originals', {
        title: dgPage.title,
        active: dgPage.active,
        slug: dgPage.slug,
        raw: dgPage.raw,
        cooked: dgPage.cooked
      });
      this.set('disableSave', true);
      this.set('selectedItem', dgPage);
      dgPage.set('savingStatus', null);
      dgPage.set('selected', true);
    },

    newDGPage: function() {
      const newDGPage = Em.copy(this.get('baseDGPage'), true);
      newDGPage.set('title', I18n.t('admin.guild.pages.new_title'));
      this.get('model').pushObject(newDGPage);
      this.send('selectDGPage', newDGPage);
    },

    toggleEnabled: function() {
      var selectedItem = this.get('selectedItem');
      selectedItem.toggleProperty('active');
      GuildPage.save(this.get('selectedItem'), true);
    },

    disableEnable: function() {
      return !this.get('id') || this.get('saving');
    }.property('id', 'saving'),

    newRecord: function() {
      return (!this.get('id'));
    }.property('id'),

    save: function() {
      GuildPage.save(this.get('selectedItem'));
    },

    copy: function(dgPage) {
      var newDGPage = GuildPage.copy(dgPage);
      newDGPage.set('title', I18n.t('admin.customize.colors.copy_name_prefix') + ' ' + dgPage.get('title'));
      this.get('model').pushObject(newDGPage);
      this.send('selectDGPage', newDGPage);
    },

    destroy: function() {
      var self = this,
          item = self.get('selectedItem');

      return bootbox.confirm(I18n.t("admin.guild.pages.delete_confirm"), I18n.t("no_value"), I18n.t("yes_value"), function(result) {
        if (result) {
          if (item.get('newRecord')) {
            self.removeSelected();
          } else {
            GuildPage.destroy(self.get('selectedItem')).then(function(){ self.removeSelected(); });
          }
        }
      });
    }
  }
});